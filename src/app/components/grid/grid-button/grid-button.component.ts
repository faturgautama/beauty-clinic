import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-grid-button',
    templateUrl: './grid-button.component.html',
    styleUrls: ['./grid-button.component.css']
})
export class GridButtonComponent implements ICellRendererAngularComp {

    Params: any;

    Caption: string = "";

    Class: string = "btn-primary";

    constructor() { }

    agInit(params: ICellRendererParams): void {
        this.Params = params;
        this.Caption = this.Params.Caption || null;
        this.Class = this.Params.Class || null;
    }

    refresh(params: ICellRendererParams): boolean {
        return true;
    }

    onClick(args: any): void {
        if (this.Params.onClick instanceof Function) {
            const params = {
                event: args,
                rowData: this.Params.node.data
            }

            this.Params.onClick(params);
        }
    }
}
