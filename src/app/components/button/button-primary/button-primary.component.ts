import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-button-primary',
    templateUrl: './button-primary.component.html',
    styleUrls: ['./button-primary.component.css']
})
export class ButtonPrimaryComponent implements OnInit {

    @Input('Caption') Caption: string;

    @Output('handleClickBtnPrimary') handleClickBtnPrimary = new EventEmitter<any>();

    constructor() {
        this.Caption = "Btn Primary";
    }

    ngOnInit(): void {
    }

    onClickBtnPrimary(args: any): void {
        this.handleClickBtnPrimary.emit(args);
    }
}
