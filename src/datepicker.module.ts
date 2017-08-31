import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatepickerComponent } from './datepicker.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule
	],
	providers: [],
	declarations: [DatepickerComponent],
	exports: [DatepickerComponent]
})
export class DatepickerModule { }
