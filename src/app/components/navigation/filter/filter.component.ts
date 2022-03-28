import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { RangeEventArgs } from '@syncfusion/ej2-angular-calendars';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

export interface OffcanvasFilterModel {
    title: string;
    filter: Field[];
}

interface Field {
    text: string;
    value: string;
    filter: 'like' | 'equal' | 'between';
}

export interface FilterModel {
    filterBy?: string;
    columnName: string;
    filter: 'like' | 'equal' | 'between';
    searchText: string;
    searchText2: string;
}

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

    @Input('FilterAttribute') FilterAttribute!: OffcanvasFilterModel;

    FormFilter!: FormGroup;

    @ViewChild('FilterByDropdown') FilterByDropdown!: DropDownListComponent;
    FilterByField: Object = { text: 'text', value: 'value', filter: 'filter' };

    FilterByState: 'like' | 'equal' | 'between' = 'like';

    FilterArray: FilterModel[] = [];

    @Output('onSearchFilter') onSearchFilter = new EventEmitter<FilterModel[]>();

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.onSetFormFilterAttribute();
    }

    handleOpenFilter(): void {
        const elem = document.getElementById('btnOpenFilter') as HTMLElement;
        elem.click();
    }

    onSetFormFilterAttribute(): void {
        this.FormFilter = this.formBuilder.group({
            filterBy: ['', []],
            columnName: ['', []],
            filter: ['', []],
            searchText: ['', []],
            searchText2: ['', []]
        });
    }

    handleChangeFilterBy(args: any): void {
        this.onResetFormFilter();

        const itemData = args.itemData;

        this.filterBy.setValue(itemData.text);
        this.columnName.setValue(itemData.value);
        this.filter.setValue(itemData['filter']);

        this.FilterByState = this.filter.value;
    }

    handleChangeDateSearchText(args: RangeEventArgs): void {
        this.searchText.setValue(args.startDate);
        this.searchText2.setValue(args.endDate);
    }

    onResetFormFilter(): void {
        this.filterBy.setValue('');
        this.columnName.setValue('');
        this.filter.setValue('');
        this.searchText.setValue('');
        this.searchText2.setValue('');
    }

    handleAddFilter(formFilter: FilterModel): void {
        this.FilterArray.push(formFilter);
    }

    handleCloseFilter(): void {
        const elem = document.getElementById('btnCloseFilter') as HTMLElement;
        elem.click();
    }

    handleSearchFilter(FilterArray: FilterModel[]): void {
        this.onSearchFilter.emit(FilterArray);
        setTimeout(() => {
            this.handleCloseFilter();
        }, 250);
    }

    get filterBy(): AbstractControl { return this.FormFilter.get('filterBy') as AbstractControl };
    get columnName(): AbstractControl { return this.FormFilter.get('columnName') as AbstractControl };
    get filter(): AbstractControl { return this.FormFilter.get('filter') as AbstractControl };
    get searchText(): AbstractControl { return this.FormFilter.get('searchText') as AbstractControl };
    get searchText2(): AbstractControl { return this.FormFilter.get('searchText2') as AbstractControl };
}
