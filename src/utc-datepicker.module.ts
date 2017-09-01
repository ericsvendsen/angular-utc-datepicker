import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UtcDatepickerComponent } from './utc-datepicker.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule
	],
	providers: [],
	declarations: [UtcDatepickerComponent],
	exports: [UtcDatepickerComponent]
})
export class UtcDatepickerModule { }
