export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
};

const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
};

export const getTargetElement = (element, className) => (hasClass(element, className) ? element : element.querySelector(`.${className}`));

export const formatDate = (date, format) => {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, (`0${date.getMonth() + 1}`).slice(-2));
  format = format.replace(/dd/g, (`0${date.getDate()}`).slice(-2));
  format = format.replace(/HH/g, (`0${date.getHours()}`).slice(-2));
  format = format.replace(/mm/g, (`0${date.getMinutes()}`).slice(-2));
  format = format.replace(/ss/g, (`0${date.getSeconds()}`).slice(-2));
  format = format.replace(/SSS/g, (`00${date.getMilliseconds()}`).slice(-3));
  return format;
};

export const sanitize = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');
