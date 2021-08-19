# Assign Holiday
Simple Liblary to added class to holiday element in a calendar


## Installation

### Vanilla (Plain JavaScript)

#### via npm
```sh
npm install assign-holiday
```

#### via yarn
```sh
yarn add assign-holiday
```

#### via cdn

```html
<script src="https://unpkg.com/assign-holiday@latest/dist/assign-holiday.js"></script>
```

### jQuery plugin
#### via cdn
```html
<script src="https://unpkg.com/assign-holiday@latest/dist/jquery-assign-holiday.js"></script>
```

## Usage

### Vanilla  (Plain JavaScript)

#### Basic Usage

```html
<table class="js-assgin-holiday">
  <tbody>
    <tr data-assign-holiday-date="2021-12-01">
      <th>1<span class="assign-holiday-week-label">Wed.</span></th>
      <td class="assign-holiday-title">
      </td>
    </tr>
    <tr data-assign-holiday-date="2021-12-02">
      <th>2<span class="assign-holiday-week-label">Teu.</span></th>
      <td class="assign-holiday-title">
      </td>
    </tr>
    ...
  </tbody>
</table>
```

```javascript
import AssignHoliday from 'assgin-holiday';

const assignHoliday = new AssignHoliday('.js-assign-holiday');
assignHoliday.run({
  '2021-12-03': 'Closed on Monday.',
  '2021-12-10': 'Closed on Monday.',
  '2021-12-17': 'Closed on Monday.',
  '2021-12-24': 'Closed on Monday.',
  '2021-12-25': {
    title: 'Closed for Christmas.',
    className: 'is-christmas',
  }
})
```

#### Example of national holidays
```javascript
import AssignHoliday from 'assgin-holiday';

fetch('https://holidays-jp.github.io/api/v1/date.json')
      .then(res => res.json())
      .then(data => {
        new AssignHoliday('.js-assgin-public-holiday').run(data);
      })
```

### jQuery

#### Basic Usage

```javascript
$(function () {
  const assignHoliday = $('.js-assgin-holiday').assignHoliday();

  assignHoliday.run({
    '2021-08-04': '定休日',
    '2021-08-11': '定休日',
    '2021-08-18': {
      title: '定休日.（任意クラス指定）',
      className: 'hoge',
    },
    '2021-08-20': {
      title: '定休日（オブジェクトでタイトルを指定）',
    }
  })
});
```

#### Example of national holidays
```javascript
$.get('https://holidays-jp.github.io/api/v1/date.json')
  .then((data) => {
    $('.js-assgin-holiday').assignHoliday().run(data);
  })
```
## Options
| name | description | default |
|:---|:---|:---|
| holidayClass | Classname to be added to holiday element. | 'assign-holiday' |
| dateAttribute | AttributeName to be set the date. | 'data-assign-holiday-date' |
| holidayTitleClass | Classname to be added to the element to which the title will be added. | 'assign-holiday-title' |
| holidayTitleTag | Tagname to be set to holiday title when adding holiday title. | '' |
| today | Whether to add a class to today's date element. | false |
| todayClass | Classname to be added to today's date element. | 'assign-holiday-today' |
| addHolidayLabel | Whether to add holiday label. | true |
| holidayLabel | Label to be replaced or inserted with labels of days of the week set in weekLabel. | 'Hol.' |
| holidayLabelPosition | Position to insert the holiday label into the label for the set day of the week. You can select 'replace', 'before' or 'after'. | 'replace' |
| weekLabelClass | Classname to be added to the element to which the holiday label will be replaced or inserted. | 'assign-holiday-today' |
| weekLabels | Day of the week labels which replaced by holiday label or inserted before and after holiday label. | ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'] |
| holidayTooltipClass | Classname to be added to the element to which the tooltip will be added. | 'assign-holiday-tooltip' |
| holidayTooltipTextClass | Classname to be added to tooltip text element. | 'assign-holiday-tooltip-text' |
