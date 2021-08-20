"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = exports.insertAdjacentString = exports.formatDate = exports.getTargetElement = exports.addClass = void 0;

var addClass = function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += " ".concat(className);
  }
};

exports.addClass = addClass;

var hasClass = function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }

  return new RegExp("(^| )".concat(className, "( |$)"), 'gi').test(el.className);
};

var getTargetElement = function getTargetElement(element, className) {
  return hasClass(element, className) ? element : element.querySelector(".".concat(className));
};

exports.getTargetElement = getTargetElement;

var formatDate = function formatDate(date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, "0".concat(date.getMonth() + 1).slice(-2));
  format = format.replace(/dd/g, "0".concat(date.getDate()).slice(-2));
  format = format.replace(/HH/g, "0".concat(date.getHours()).slice(-2));
  format = format.replace(/mm/g, "0".concat(date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, "0".concat(date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, "00".concat(date.getMilliseconds()).slice(-3));
  return format;
};

exports.formatDate = formatDate;

var insertAdjacentString = function insertAdjacentString(target, position, index, str) {
  if (position === 'before') {
    return target.slice(0, index) + str + target.slice(index);
  }

  if (position === 'after') {
    return target.slice(0, index + 1) + str + target.slice(index + 1);
  }

  return false;
};

exports.insertAdjacentString = insertAdjacentString;

var sanitize = function sanitize(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};

exports.sanitize = sanitize;