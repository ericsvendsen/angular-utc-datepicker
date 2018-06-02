# Angular UTC Datepicker
A simple Angular datepicker component that exclusively uses UTC.

## Install
`npm install --save angular-utc-datepicker`

## Dependencies
* Angular >= 2
* [MomentJS](http://momentjs.com)
* [Font Awesome](http://fontawesome.io)

## How to use
* Import into app module: `import { UtcDatepickerModule } from 'angular-utc-datepicker';`
* `format` option, for formatting date (and time, if necessary); defaults to `'YYYY-MM-DD'`. Uses [Moment](http://momentjs.com/docs/#/displaying/format/) formatting.
* `button` option, for showing/hiding a button which opens the calendar popup
* `buttonPosition` option, possible values are `before` and `after` (defaults to `after`)
* `dateChange` event for handling when the input text is updated or when a date is selected from the calendar popup

## Examples
```
<utc-datepicker [date]="myDate" (dateChange)="onDateChange($event)"></utc-datepicker>
```
```
<utc-datepicker [date]="myDate" [button]="true" (dateChange)="onDateChange($event)"></utc-datepicker>
```
```
<utc-datepicker [date]="myDate" [button]="true" buttonPosition="before" format="MM/DD/YYYY HH:mm:ss" (dateChange)="onDateChange($event)"></utc-datepicker>
```
