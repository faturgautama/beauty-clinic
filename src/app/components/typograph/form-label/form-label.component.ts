import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-form-label',
    templateUrl: './form-label.component.html',
    styleUrls: ['./form-label.component.css']
})
export class FormLabelComponent implements OnInit {

    @Input('Caption') Caption: any;

    constructor() {
        this.Caption = "Form Label";
    }

    ngOnInit(): void {
    }

}
