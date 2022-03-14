import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActionButtonModel } from '../../../action-button/action-button.component';

@Component({
    selector: 'app-tab-header',
    templateUrl: './tab-header.component.html',
    styleUrls: ['./tab-header.component.css']
})
export class TabHeaderComponent implements OnInit {

    @ViewChild(TemplateRef) tabLabel!: TemplateRef<any>;

    @Input('id') id!: string;

    @Input('ActionButton') ActionButton: ActionButtonModel[] = [];

    constructor() { }

    ngOnInit(): void {
    }

}
