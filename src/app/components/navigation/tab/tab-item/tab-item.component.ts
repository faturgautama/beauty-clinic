import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabHeaderComponent } from './tab-header/tab-header.component';

@Component({
    selector: 'app-tab-item',
    templateUrl: './tab-item.component.html',
    styleUrls: ['./tab-item.component.css']
})
export class TabItemComponent implements OnInit {

    @Input() header!: string;

    @Input() isActive!: boolean;

    @ContentChild(TabHeaderComponent) headerComponent!: TabHeaderComponent;

    @ContentChild(TabBodyComponent) bodyComponent!: TabBodyComponent;

    constructor() { }

    ngOnInit(): void {
    }

}
