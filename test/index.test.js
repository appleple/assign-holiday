const path = require('path');
const minify = require('html-minifier').minify;
const mockDate = require('mockdate');
const AssignHoliday = require('../lib/index').default

let page;

beforeAll(async () => {
  page = await browser.newPage();
});

const minifyHtml = (html) => {
  return minify(html, {
    collapseWhitespace: true,
  });
};

const domTest = (testFile, message) => {
  test(message, async () => {
    await page.goto(`file://${path.resolve(__dirname, `./${testFile}.html`)}`);
    await page.waitForTimeout(1000);
    const res = await page.evaluate(() => {
      return {
        test: document.querySelector('.test').innerHTML,
        result: document.querySelector('.result').innerHTML,
      }
    });
    await expect(minifyHtml(res.result)).toEqual(minifyHtml(res.test));
  });
};

describe('js calendar test', () => {
  beforeEach(async() => {
    await page.goto(`file://${path.resolve(__dirname, './js-calendar.html')}`);
    await page.waitForTimeout(1000);
  })
  test('prev button test', async() => {
    await page.click('#previous')
    const className = await page.$eval('[data-date="2021-07-08"]', el => el.className)
    await expect(className).toBe('assign-holiday')
  })
  test('next button test', async() => {
    await page.click('#next')
    const className = await page.$eval('[data-date="2021-09-08"]', el => el.className)
    await expect(className).toBe('assign-holiday')
  })
})

describe('AssignHoliday', () => {
  const assignHoliday = new AssignHoliday();

  beforeAll(() => {
    mockDate.set('2021-08-25')
  });

  test('tooday test', () => {
    expect(assignHoliday.isToday('2021-08-25')).toBeTruthy();
    expect(assignHoliday.isToday('2021-08-26')).toBeFalsy();
  })
})





domTest('default-option', 'default option test.');
domTest('full-option', 'full option test.');
domTest('jquery-plugin', 'jquery plugin test.');
