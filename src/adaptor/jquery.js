import AssignHoliday from '../index';

(($) => {
  $.fn.assignHoliday = function (options) {
    const assinHoliday = new AssignHoliday(this, options);
    return assinHoliday;
  };
})(jQuery);
