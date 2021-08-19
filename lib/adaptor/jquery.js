"use strict";

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
  $.fn.assignHoliday = function (options) {
    var assinHoliday = new _index.default(this, options);
    return assinHoliday;
  };
})(jQuery);