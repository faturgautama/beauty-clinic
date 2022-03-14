import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';

export interface GridAttribute {
    column: ColDef[];
    dataSource: any;
}

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {

    @Input('GridAttributes') GridAttributes!: GridAttribute;

    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };

    gridApi!: GridApi;

    private gridColumnApi!: ColumnApi;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const allColumnsId: string[] = [];

            this.gridColumnApi.getAllColumns()!.forEach((column) => {
                allColumnsId.push(column.getId());
            });

            this.gridColumnApi.autoSizeColumns(allColumnsId, false);
        }, 1);
    }

    onGridReady(args: GridReadyEvent): void {
        this.gridApi = args.api;
        this.gridColumnApi = args.columnApi;
    }

    onAddData(data: any): void {
        this.gridApi.applyTransaction({ add: [data] })!;
    }
}
