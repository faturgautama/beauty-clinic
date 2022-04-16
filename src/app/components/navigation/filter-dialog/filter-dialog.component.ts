import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { FilterModel } from '../filter/filter.component';

export interface FilterDialogProp {
    title: string;
    dynamicFilter: FilterModel;
    searchUrl: string;
    searchResultAttribute: {
        id: string;
        text: string;
    }
}

@Component({
    selector: 'app-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

    modalRef?: BsModalRef;

    @ViewChild('FilterDialog') FilterDialog!: TemplateRef<any>;

    @Input('FilterDialogProp') FilterDialogProp!: FilterDialogProp;

    Result: any[] = [];

    ChoosenResult: any;

    @Output('onChooseResult') onChooseResult = new EventEmitter<any>();

    constructor(
        private bsModalService: BsModalService,
        private httpRequestService: HttpRequestService
    ) { }

    ngOnInit(): void {

    }

    onOpenFilterDialog(): void {
        this.modalRef = this.bsModalService.show(this.FilterDialog, {
            backdrop: 'static'
        });
    }

    onSearch(searchText: string): void {
        const parameter: FilterModel[] = [
            {
                columnName: this.FilterDialogProp.dynamicFilter.columnName,
                filter: this.FilterDialogProp.dynamicFilter.filter,
                searchText: searchText,
                searchText2: this.FilterDialogProp.dynamicFilter.searchText2,
            }
        ];

        this.httpRequestService.defaultPostRequest(this.FilterDialogProp.searchUrl, parameter)
            .subscribe((result) => {
                this.Result = result.data;
            });
    }

    onClickResult(indexResult: any): void {
        const elem = document.getElementById(`result${indexResult}`) as HTMLElement;

        this.Result.forEach((item, index) => {
            const resultItem = document.getElementById(`result${index}`) as HTMLElement;

            if (index != indexResult) {
                if (resultItem.classList.contains('active')) {
                    resultItem.classList.remove('active');
                };
            } else {
                elem.classList.add('active');
                this.ChoosenResult = item;
            }
        });
    }

    onChoosenResult(data: any): void {
        this.onChooseResult.emit(data);
        this.ChoosenResult = {};
        this.onCloseFilterDialog();
    }

    onCloseFilterDialog(): void {
        this.modalRef?.hide();
    }

    onResetResult(): void {
        this.Result = [];
    }
}
