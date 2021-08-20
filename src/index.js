import {
  addClass, getTargetElement, formatDate, insertAdjacentString, sanitize
} from './util';

const defaultOption = {
  holidayClass: 'assign-holiday',
  dateAttribute: 'data-assign-holiday-date',
  holidayTitleClass: 'assign-holiday-title',
  holidayTitleTag: '',
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
      const targets = element.querySelectorAll(`[${this.option.dateAttribute}]`);
      [].map.call(targets, (target) => {
        const date = target.getAttribute(this.option.dateAttribute);
        const isHoliday = this.isHoliday(date);
        const title = sanitize(typeof isHoliday[1] === 'object' ? isHoliday[1].title : isHoliday[1]);
        if (isHoliday[0]) {
          const className = typeof isHoliday[1] === 'object' && isHoliday[1].className ? isHoliday[1].className : this.option.holidayClass;
          addClass(target, sanitize(className));
          const titleElem = getTargetElement(target, this.option.holidayTitleClass);
          if (titleElem) {
            this.addHolidayTitle(titleElem, title);
          }

          const HolidayLabelElem = getTargetElement(target, this.option.weekLabelClass);
          if (this.option.addHolidayLabel && HolidayLabelElem) {
            const regex = new RegExp(`${this.option.weekLabels.join('|')}`);
            this.addHolidayLabel(HolidayLabelElem, regex);
          }
        }

        if (this.option.today && this.isToday(date)) {
          addClass(target, this.option.todayClass);
        }

        const tooltipElem = getTargetElement(target, this.option.holidayTooltipClass);
        if (tooltipElem) {
          this.addTooltip(tooltipElem, title);
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
    const tag = sanitize(this.option.holidayTitleTag);
    const html = tag ? `<${tag}>${title}</${tag}>` : title;
    titleElem.insertAdjacentHTML('beforeend', html);
  }

  addHolidayLabel(labelElem, regex) {
    switch (this.option.holidayLabelPosition) {
      case 'replace':
        labelElem.textContent = labelElem.textContent.replace(regex, this.option.holidayLabel);
        break;
      case 'before':
      case 'after':
        const i = labelElem.textContent.search(regex);
        if (i === -1) return;
        labelElem.textContent = insertAdjacentString(labelElem.textContent, this.option.holidayLabelPosition, i, this.option.holidayLabel);
        break;
      default:
        break;
    }
  }

  addTooltip(tooltipElem, text) {
    tooltipElem.insertAdjacentHTML('afterbegin', `<span class="${this.option.holidayTooltipTextClass}">${text}</span>`);
  }
}
