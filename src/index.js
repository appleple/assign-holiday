import {
  addClass, getTargetElement, formatDate, insertAdjacentString, sanitize
} from './util';

const defaultOption = {
  holidayClass: 'assign-holiday',
  dateAttribute: 'data-assign-holiday-date',
  holidayTitleClass: 'assign-holiday-title',
  holidayTitleTag: '',
  holidayTitleAppendClass: '',
  today: false,
  todayClass: 'assign-holiday-today',
  addHolidayLabel: true,
  holidayLabel: 'Hol.',
  holidayLabelPosition: 'replace',
  weekLabelClass: 'assign-holiday-week-label',
  weekLabels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
  holidayTooltipClass: 'assign-holiday-tooltip',
  holidayTooltipTextClass: 'assign-holiday-tooltip-text'
};

export default class AssignHoliday {
  constructor(elem, option) {
    this.option = { ...defaultOption, ...option };
    this.elements = typeof elem === 'string' ? document.querySelectorAll(elem) : elem;
    this.data = {};
  }

  run(data) {
    this.data = data || this.data;
    [].map.call(this.elements, (element) => {
      const { dateAttribute } = this.option;
      const targets = element.querySelectorAll(`[${dateAttribute}]`);
      [].map.call(targets, (target) => {
        const { today } = this.option;
        const date = target.getAttribute(dateAttribute);
        const isHoliday = this.isHoliday(date);
        const title = sanitize(typeof isHoliday[1] === 'object' ? isHoliday[1].title : isHoliday[1]);
        if (isHoliday[0]) {
          const {
            holidayClass,
            holidayTitleClass,
            weekLabelClass,
            addHolidayLabel,
            holidayTooltipClass
          } = this.option;
          const className = typeof isHoliday[1] === 'object' && isHoliday[1].className ? isHoliday[1].className : holidayClass;
          addClass(target, sanitize(className));
          const titleElem = getTargetElement(target, holidayTitleClass);
          if (titleElem) {
            this.addHolidayTitle(titleElem, title);
          }

          const HolidayLabelElem = getTargetElement(target, weekLabelClass);
          if (addHolidayLabel && HolidayLabelElem) {
            const { weekLabels } = this.option;
            const regex = new RegExp(`${weekLabels.join('|')}`);
            this.addHolidayLabel(HolidayLabelElem, regex);
          }

          const tooltipElem = getTargetElement(target, holidayTooltipClass);
          if (tooltipElem) {
            this.addTooltip(tooltipElem, title);
          }
        }

        if (today && this.isToday(date)) {
          const { todayClass } = this.option;
          addClass(target, todayClass);
        }
      });
    });
  }

  isHoliday(date) {
    for (const i of Object.keys(this.data)) {
      if (i === date) {
        return [true, this.data[i]];
      }
    }

    return [false, ''];
  }

  isToday(date) {
    const today = formatDate(new Date(), 'yyyy-MM-dd');
    return today === date;
  }

  addHolidayTitle(titleElem, title) {
    const { holidayTitleTag, holidayTitleAppendClass } = this.option;
    const tag = sanitize(holidayTitleTag);
    const html = tag ? `<${tag}${holidayTitleAppendClass ? ` class="${holidayTitleAppendClass}"` : ''}>${title}</${tag}>` : title;
    titleElem.insertAdjacentHTML('beforeend', html);
  }

  addHolidayLabel(labelElem, regex) {
    const { holidayLabelPosition, holidayLabel } = this.option;
    switch (holidayLabelPosition) {
      case 'replace':
        labelElem.textContent = labelElem.textContent.replace(regex, holidayLabel);
        break;
      case 'before':
      case 'after':
        const i = labelElem.textContent.search(regex);
        if (i === -1) return;
        labelElem.textContent = insertAdjacentString(labelElem.textContent, holidayLabelPosition, i, holidayLabel);
        break;
      default:
        break;
    }
  }

  addTooltip(tooltipElem, text) {
    const { holidayTooltipTextClass } = this.option;
    tooltipElem.style.position = 'relative';
    tooltipElem.style.cursor = 'pointer';
    tooltipElem.insertAdjacentHTML('afterbegin', `<span class="${holidayTooltipTextClass}">${text}</span>`);
  }
}
