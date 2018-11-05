import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'utc-datepicker',
    template: `
        <button class="angular-utc-datepicker_button" (click)="openCalendar($event)" *ngIf="button && buttonPosition === 'before'"
                (blur)="closeCalendar()" (keydown)="keydown($event)">
            <i class="fa fa-calendar"></i>
        </button>
        <input #dateInput class="angular-utc-datepicker_input" [ngModel]="date" (ngModelChange)="onDateChange($event)"
               (focus)="openCalendar($event)" (blur)="closeCalendar()" (keydown)="keydown($event)">
        <button class="angular-utc-datepicker_button" (click)="openCalendar($event)" *ngIf="button && buttonPosition === 'after'"
                (blur)="closeCalendar()" (keydown)="keydown($event)">
            <i class="fa fa-calendar"></i>
        </button>
        <div class="angular-utc-datepicker_datepicker">
            <div class="angular-utc-datepicker_calendar-popup" ngClass="calendarPosition" [hidden]="!showCalendar"
                 (blur)="closeCalendar()" (keydown)="keydown($event)" tabindex="0">
                <div class="angular-utc-datepicker_calendar-controls">
                    <div class="angular-utc-datepicker_prev" (click)="prevMonth()" (keydown)="keydown($event)">
                        <i class="fa fa-arrow-left"></i>
                    </div>
                    <div class="angular-utc-datepicker_title">
                        {{calendarTitle}} <span class="angular-utc-datepicker_today" title="Today" (click)="selectToday()"
                                                  (keydown)="keydown($event)"><i class="fa fa-calendar-o"></i></span>
                    </div>
                    <div class="angular-utc-datepicker_next" (click)="nextMonth()" (keydown)="keydown($event)">
                        <i class="fa fa-arrow-right"></i>
                    </div>
                </div>
                <div class="angular-utc-datepicker_day-names">
                    <div class="angular-utc-datepicker_name" *ngFor="let name of dayNames">{{name}}</div>
                </div>
                <div class="angular-utc-datepicker_calendar">
                    <div class="angular-utc-datepicker_day {{day.selected}} {{day.enabled}}" *ngFor="let day of days"
                         (click)="selectDate(day)">
                        {{day.day}}
                    </div>
                    <div class="angular-utc-datepicker_clear"></div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .angular-utc-datepicker_input {
            padding: 5px;
        }
        .angular-utc-datepicker_button {
            padding: 7px;
        }
        .angular-utc-datepicker_datepicker {
            position: absolute;
            top: auto;
            left: auto;
            z-index: 1000;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-icon {
            cursor: pointer;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup {
            width: 245px;
            opacity: 0.9;
            border-left: 1px solid #888;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup.angular-utc-datepicker_above {
            margin-top: -293px;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup.angular-utc-datepicker_below {
            margin-top: 5px;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar-controls {
            box-sizing: border-box;
            background: #ccc;
            width: 100%;
            padding: 5px 0;
            text-align: center;
            color: #000;
            border-top: 1px solid #888;
            border-right: 1px solid #888;
            display: flex;
            justify-content: space-between;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar-controls .angular-utc-datepicker_prev,
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar-controls .angular-utc-datepicker_next,
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar-controls .angular-utc-datepicker_today {
            cursor: pointer;
            padding: 0 7px;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_day-names {
            background: #555;
            color: #fff;
            display: flex;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_day-names .angular-utc-datepicker_name {
            width: 35px;
            height: 15px;
            padding: 1px;
            text-align: center;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar {
            background: #fff;
            width: 245px;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar .angular-utc-datepicker_day {
            box-sizing: border-box;
            width: 35px;
            height: 35px;
            display: inline-block;
            float: left;
            padding: 2px;
            border-right: 1px solid #888;
            border-bottom: 1px solid #888;
            color: #000;
            background: #fff;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar .angular-utc-datepicker_day:hover {
            background: #ccc;
            color: #000;
            cursor: pointer;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar .angular-utc-datepicker_day:last-child {
            border-right: 1px solid #888;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar .angular-utc-datepicker_selected {
            background: #42a5f5;
            color: #fff;
        }
        .angular-utc-datepicker_datepicker .angular-utc-datepicker_calendar-popup .angular-utc-datepicker_calendar .angular-utc-datepicker_disabled {
            background: #ddd;
            color: #555;
        }
        .angular-utc-datepicker_clear {
            clear: both;
        }

    `]
})
export class UtcDatepickerComponent implements OnInit {
    @Input() date: string;
    @Output() dateChange = new EventEmitter<string>();
    @Input() format = 'YYYY-MM-DD';
    @Input() button = false;
    @Input() buttonPosition = 'after'; // either before or after
    @ViewChild('dateInput') el: ElementRef;

    inputText: string; // keep track of the actual text of the input field
    showCalendar = false;
    days: any[];
    dayNames: any[];
    calendarTitle: string;
    tempDate: any; // moment object used for keeping track while cycling through months
    calendarPosition = 'angular-utc-datepicker_below';

    constructor() {
        this.days = [];
        this.dayNames = [];
    }

    getMomentDate = (date:string) => {
        if (!moment.utc(date, this.format).isValid()) {
            date = moment.utc().format(this.format);
        }
        return moment.utc(date, this.format);
    };

    generateCalendar = (date:any) => {
        this.days = [];

        const lastMonth = moment.utc(date).subtract(1, 'M'),
            nextMonth = moment.utc(date).add(1, 'M'),
            month = moment.utc(date).month() + 1,
            year = moment.utc(date).year(),
            firstWeekDay = 1 - moment.utc(date).startOf('M').isoWeekday(),
            totalDays = (42 + firstWeekDay) - 1; // 7 columns X 6 rows

        for (let i = firstWeekDay; i <= totalDays; i++) {
            if (i > 0 && i <= moment.utc(date).endOf('M').date()) {
                // current month
                this.days.push({
                    day: i,
                    month: month,
                    year: year,
                    enabled: 'angular-utc-datepicker_enabled',
                    selected: moment.utc(this.date, this.format).isSame(moment.utc(year + '-' + month + '-' + i, 'YYYY-M-D'), 'day') ?
                        'angular-utc-datepicker_selected' :
                        'angular-utc-datepicker_unselected'
                });
            } else if (i > moment.utc(date).endOf('M').date()) {
                // next month
                this.days.push({
                    day: i - date.endOf('M').date(),
                    month: nextMonth.month() + 1,
                    year: nextMonth.year(),
                    enabled: 'angular-utc-datepicker_disabled',
                    selected: 'angular-utc-datepicker_unselected'
                });
            } else {
                // last month
                this.days.push({
                    day: lastMonth.endOf('M').date() - (0 - i),
                    month: lastMonth.month() + 1,
                    year: lastMonth.year(),
                    enabled: 'angular-utc-datepicker_disabled',
                    selected: 'angular-utc-datepicker_unselected'
                });
            }
        }
    };

    generateDayNames = () => {
        const date = moment('2017-04-02'); // sunday
        for (let i = 0; i < 7; i++) {
            this.dayNames.push(date.format('ddd'));
            date.add('1', 'd');
        }
    };

    openCalendar = (event:any) => {
        const rect = event.target.getBoundingClientRect();
        this.calendarPosition = window.innerHeight - rect.bottom < 250 ? 'angular-utc-datepicker_above' : 'angular-utc-datepicker_below';
        this.showCalendar = true;
        this.generateCalendar(this.getMomentDate(this.tempDate));
    };

    closeCalendar = () => {
        setTimeout(() => {
            if (document.activeElement) {
                this.showCalendar = document.activeElement.className.includes('angular-utc-datepicker_calendar-popup') ||
                    document.activeElement.className.includes('angular-utc-datepicker_input');
                if (!this.showCalendar) {
                    this.calendarTitle = this.getMomentDate(this.date).format('MMMM YYYY');
                    this.tempDate = this.getMomentDate(this.date);
                    if (this.inputText && this.inputText !== this.date) {
                        this.el.nativeElement.value = this.date;
                    }
                }
            }
        }, 50);
    };

    prevMonth = () => {
        this.tempDate.subtract(1, 'M');
        this.calendarTitle = this.tempDate.format('MMMM YYYY');
        this.generateCalendar(this.tempDate);
    };

    nextMonth = () => {
        this.tempDate.add(1, 'M');
        this.calendarTitle = this.tempDate.format('MMMM YYYY');
        this.generateCalendar(this.tempDate);
    };

    selectDate = (date:any) => {
        const currDate = moment.utc(this.date, this.format);
        const selectedDate = moment.utc(`${date.year}-${date.month}-${date.day} ${currDate.hour()}:${currDate.minute()}:
            ${currDate.second()}`, 'YYYY-M-D HH:mm:ss');
        this.date = selectedDate.format(this.format);
        this.tempDate = this.getMomentDate(this.date);
        this.calendarTitle = this.tempDate.format('MMMM YYYY');
        this.generateCalendar(this.tempDate);
        this.dateChange.emit(this.date);
        this.showCalendar = false;
    };

    selectToday = () => {
        const today = moment.utc();
        const date = {
            day: today.date(),
            month: today.month() + 1,
            year: today.year(),
            enabled: 'angular-utc-datepicker_enabled',
            selected: 'angular-utc-datepicker_selected'
        };
        this.selectDate(date);
    };

    keydown = (event:any) => {
        if (event.keyCode === 27) { // escape key
            this.showCalendar = false;
        }
    };

    onDateChange = (value:string) => {
        this.inputText = value;
        const isValid = moment.utc(value, this.format).format(this.format) === value;
        if (isValid) {
            this.date = value;
            this.calendarTitle = moment.utc(value, this.format).format('MMMM YYYY');
            this.generateCalendar(this.getMomentDate(value));
            this.dateChange.emit(this.date);
        }
    };

    ngOnInit() {
        if (typeof this.date === 'object') {
            // date was passed in as a JS Date object
            this.date = moment.utc(this.date).format(this.format)
        }
        this.calendarTitle = this.getMomentDate(this.date).format('MMMM YYYY');
        this.tempDate = this.getMomentDate(this.date);
        if (this.dayNames.length === 0) {
            this.generateDayNames();
        }
    }
}
