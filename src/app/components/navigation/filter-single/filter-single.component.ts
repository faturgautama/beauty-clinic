import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { RangeEventArgs } from '@syncfusion/ej2-angular-calendars';
import { UtilityService } from 'src/app/services/utility/utility.service';

export interface FilterSingleModel {
    tanggal_mulai: Date,
    tanggal_selesai: Date
}

@Component({
    selector: 'app-filter-single',
    templateUrl: './filter-single.component.html',
    styleUrls: ['./filter-single.component.css']
})
export class FilterSingleComponent implements OnInit {

    @Input('Title') Title: string = "";

    FormFilter!: FormGroup;

    @Output('onSearchFilter') onSearchFilter = new EventEmitter<FilterSingleModel>();

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService
    ) { }

    ngOnInit(): void {
        this.FormFilter = this.formBuilder.group({
            tanggal_mulai: ['', []],
            tanggal_selesai: ['', []]
        });
    }

    handleOpenFilter(): void {
        const elem = document.getElementById('btnOpenFilter') as HTMLElement;
        elem.click();
    }

    handleChangeDateSearchText(args: RangeEventArgs): void {
        let startDate = this.utilityService.onFormatDate(args.startDate);
        this.tanggal_mulai.setValue(startDate);

        let endDate = this.utilityService.onFormatDate(args.endDate?.setHours(23, 59, 59));
        this.tanggal_selesai.setValue(endDate);
    }

    handleCloseFilter(): void {
        const elem = document.getElementById('btnCloseFilter') as HTMLElement;
        elem.click();
    }

    handleSearchFilter(FormFilter: FilterSingleModel): void {
        this.onSearchFilter.emit(FormFilter);
        setTimeout(() => {
            this.handleCloseFilter();
        }, 250);
    }

    get tanggal_mulai(): AbstractControl { return this.FormFilter.get('tanggal_mulai') as AbstractControl };
    get tanggal_selesai(): AbstractControl { return this.FormFilter.get('tanggal_selesai') as AbstractControl };
}
