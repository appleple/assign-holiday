"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOption = {
  holidayClass: 'assign-holiday',
  dateAttribute: 'data-assign-holiday-date',
  holidayTitleClass: 'assign-holiday-title',
  holidayTitleTag: '',
  holidayTitleAppendClass: '',
  today: false,
  todayClass: 'assign-holiday-today',
  holidayLabel: 'Hol.',
  holidayLabelPosition: 'replace',
  weekLabelClass: 'assign-holiday-week-label',
  weekLabels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
  holidayTooltipClass: 'assign-holiday-tooltip',
  holidayTooltipTextClass: 'assign-holiday-tooltip-text'
};

var AssignHoliday = /*#__PURE__*/function () {
  function AssignHoliday(elem, option) {
    _classCallCheck(this, AssignHoliday);

    this.option = _objectSpread(_objectSpread({}, defaultOption), option);
    this.elements = typeof elem === 'string' ? document.querySelectorAll(elem) : elem;
    this.data = {};
  }

  _createClass(AssignHoliday, [{
    key: "run",
    value: function run(data) {
      var _this = this;

      this.data = data || this.data;
      [].map.call(this.elements, function (element) {
        var dateAttribute = _this.option.dateAttribute;
        var targets = element.querySelectorAll("[".concat(dateAttribute, "]"));
        [].map.call(targets, function (target) {
          var today = _this.option.today;
          var date = target.getAttribute(dateAttribute);

          var isHoliday = _this.isHoliday(date);

          if (isHoliday[0]) {
            var _this$option = _this.option,
                holidayClass = _this$option.holidayClass,
                holidayTitleClass = _this$option.holidayTitleClass,
                weekLabelClass = _this$option.weekLabelClass,
                holidayTooltipClass = _this$option.holidayTooltipClass;
            var title = (0, _util.sanitize)(_typeof(isHoliday[1]) === 'object' ? isHoliday[1].title : isHoliday[1]);
            var className = _typeof(isHoliday[1]) === 'object' && isHoliday[1].className ? isHoliday[1].className : holidayClass;
            (0, _util.addClass)(target, (0, _util.sanitize)(className));
            var titleElem = (0, _util.getTargetElement)(target, holidayTitleClass);

            if (titleElem) {
              _this.addHolidayTitle(titleElem, title);
            }

            var HolidayLabelElem = (0, _util.getTargetElement)(target, weekLabelClass);

            if (HolidayLabelElem) {
              var weekLabels = _this.option.weekLabels;
              var regex = new RegExp("(".concat(weekLabels.join('|'), ")"));

              _this.addHolidayLabel(HolidayLabelElem, regex);
            }

            var tooltipElem = (0, _util.getTargetElement)(target, holidayTooltipClass);

            if (tooltipElem) {
              _this.addTooltip(tooltipElem, title);
            }
          }

          if (today && _this.isToday(date)) {
            var todayClass = _this.option.todayClass;
            (0, _util.addClass)(target, todayClass);
          }
        });
      });
    }
  }, {
    key: "isHoliday",
    value: function isHoliday(date) {
      for (var _i = 0, _Object$keys = Object.keys(this.data); _i < _Object$keys.length; _i++) {
        var i = _Object$keys[_i];

        if (i === date) {
          return [true, this.data[i]];
        }
      }

      return [false, ''];
    }
  }, {
    key: "isToday",
    value: function isToday(date) {
      var today = (0, _util.formatDate)(new Date(), 'yyyy-MM-dd');
      return today === date;
    }
  }, {
    key: "addHolidayTitle",
    value: function addHolidayTitle(titleElem, title) {
      var _this$option2 = this.option,
          holidayTitleTag = _this$option2.holidayTitleTag,
          holidayTitleAppendClass = _this$option2.holidayTitleAppendClass;
      var tag = (0, _util.sanitize)(holidayTitleTag);
      var html = tag ? "<".concat(tag).concat(holidayTitleAppendClass ? " class=\"".concat(holidayTitleAppendClass, "\"") : '', ">").concat(title, "</").concat(tag, ">") : title;
      titleElem.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: "addHolidayLabel",
    value: function addHolidayLabel(labelElem, regex) {
      var _this$option3 = this.option,
          holidayLabelPosition = _this$option3.holidayLabelPosition,
          holidayLabel = _this$option3.holidayLabel;

      switch (holidayLabelPosition) {
        case 'replace':
          labelElem.textContent = labelElem.textContent.replace(regex, holidayLabel);
          break;

        case 'before':
          labelElem.textContent = labelElem.textContent.replace(regex, "".concat(holidayLabel, "$1"));
          break;

        case 'after':
          labelElem.textContent = labelElem.textContent.replace(regex, "$1".concat(holidayLabel));
          break;

        default:
          break;
      }
    }
  }, {
    key: "addTooltip",
    value: function addTooltip(tooltipElem, text) {
      var holidayTooltipTextClass = this.option.holidayTooltipTextClass;
      tooltipElem.style.position = 'relative';
      tooltipElem.style.cursor = 'pointer';
      tooltipElem.insertAdjacentHTML('afterbegin', "<span class=\"".concat(holidayTooltipTextClass, "\">").concat(text, "</span>"));
    }
  }]);

  return AssignHoliday;
}();

exports.default = AssignHoliday;