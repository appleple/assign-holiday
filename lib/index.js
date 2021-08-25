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
  addHolidayLabel: true,
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
        var targets = element.querySelectorAll("[".concat(_this.option.dateAttribute, "]"));
        [].map.call(targets, function (target) {
          var date = target.getAttribute(_this.option.dateAttribute);

          var isHoliday = _this.isHoliday(date);

          var title = (0, _util.sanitize)(_typeof(isHoliday[1]) === 'object' ? isHoliday[1].title : isHoliday[1]);

          if (isHoliday[0]) {
            var className = _typeof(isHoliday[1]) === 'object' && isHoliday[1].className ? isHoliday[1].className : _this.option.holidayClass;
            (0, _util.addClass)(target, (0, _util.sanitize)(className));
            var titleElem = (0, _util.getTargetElement)(target, _this.option.holidayTitleClass);

            if (titleElem) {
              _this.addHolidayTitle(titleElem, title);
            }

            var HolidayLabelElem = (0, _util.getTargetElement)(target, _this.option.weekLabelClass);

            if (_this.option.addHolidayLabel && HolidayLabelElem) {
              var regex = new RegExp("".concat(_this.option.weekLabels.join('|')));

              _this.addHolidayLabel(HolidayLabelElem, regex);
            }

            var tooltipElem = (0, _util.getTargetElement)(target, _this.option.holidayTooltipClass);

            if (tooltipElem) {
              _this.addTooltip(tooltipElem, title);
            }
          }

          if (_this.option.today && _this.isToday(date)) {
            (0, _util.addClass)(target, _this.option.todayClass);
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
      var tag = (0, _util.sanitize)(this.option.holidayTitleTag);
      var html = tag ? "<".concat(tag).concat(this.option.holidayTitleAppendClass ? " class=\"".concat(this.option.holidayTitleAppendClass, "\"") : '', ">").concat(title, "</").concat(tag, ">") : title;
      titleElem.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: "addHolidayLabel",
    value: function addHolidayLabel(labelElem, regex) {
      switch (this.option.holidayLabelPosition) {
        case 'replace':
          labelElem.textContent = labelElem.textContent.replace(regex, this.option.holidayLabel);
          break;

        case 'before':
        case 'after':
          var i = labelElem.textContent.search(regex);
          if (i === -1) return;
          labelElem.textContent = (0, _util.insertAdjacentString)(labelElem.textContent, this.option.holidayLabelPosition, i, this.option.holidayLabel);
          break;

        default:
          break;
      }
    }
  }, {
    key: "addTooltip",
    value: function addTooltip(tooltipElem, text) {
      tooltipElem.style.position = 'relative';
      tooltipElem.style.cursor = 'pointer';
      tooltipElem.insertAdjacentHTML('afterbegin', "<span class=\"".concat(this.option.holidayTooltipTextClass, "\">").concat(text, "</span>"));
    }
  }]);

  return AssignHoliday;
}();

exports.default = AssignHoliday;