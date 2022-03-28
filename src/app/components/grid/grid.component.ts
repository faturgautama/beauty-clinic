import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    @Input('FrameworkComponents') FrameworkComponents: any;

    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };

    gridApi!: GridApi;

    @Output('onSelectionChange') onSelectionChange = new EventEmitter<any>();

    private gridColumnApi!: ColumnApi;

    constructor() {
        if (this.FrameworkComponents) {
            this.FrameworkComponents = this.FrameworkComponents;
        }
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            // const allColumnsId: string[] = [];

            // this.gridColumnApi.getAllColumns()!.forEach((column) => {
            //     allColumnsId.push(column.getId());
            // });

            // this.gridColumnApi.autoSizeColumns(allColumnsId, false);
        }, 1);
    }

    onGridReady(args: GridReadyEvent): void {
        this.gridApi = args.api;
        this.gridColumnApi = args.columnApi;

        this.gridApi.sizeColumnsToFit();

        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.gridApi.sizeColumnsToFit();
            });
        })
    }

    onSelectionChanged(args: any): void {
        this.onSelectionChange.emit(this.gridApi.getSelectedRows()[0]);
    }

    onAddData(data: any): void {
        this.gridApi.applyTransaction({ add: [data] })!;
    }
}
