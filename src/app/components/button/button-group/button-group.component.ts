import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ButtonGroupModel {
    id: string;
    icon: string;
    class: string;
    caption: string;
}

@Component({
    selector: 'app-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent implements OnInit {

    @Input('Datasource') Datasource: ButtonGroupModel[];

    @Output('handleClickButtonGroup') handleClickButtonGroup = new EventEmitter<any>();

    constructor() {
        this.Datasource = [];
    }

    ngOnInit(): void {
    }

    onClickButtonGroup(buttonId: string): void {
        this.handleClickButtonGroup.emit(buttonId);
    }
}
