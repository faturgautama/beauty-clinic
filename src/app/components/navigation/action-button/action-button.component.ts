import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ActionButtonModel {
    tabId?: string;
    id: string;
    icon: string;
    caption: string;
}

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {

    @Input('ActionButton') ActionButton?: ActionButtonModel[] = [];

    @Output('onClickActionButton') onClickActionButton = new EventEmitter<ActionButtonModel>();

    constructor() { }

    ngOnInit(): void {
    }

    handleClickActionButton(args: ActionButtonModel): void {
        this.onClickActionButton.emit(args);
    }
}
