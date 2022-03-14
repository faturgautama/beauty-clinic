import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { ActionButtonModel } from '../action-button/action-button.component';
import { TabItemComponent } from './tab-item/tab-item.component';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, AfterContentInit, AfterContentChecked {

    @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;

    tabItem$?: Observable<TabItemComponent[]>;

    activeTab?: TabItemComponent;

    @Output('onGetSelectedTab') onGetSelectedTab = new EventEmitter();

    @Input('ShowHeader') ShowHeader: boolean = true;

    @Output('onClickActionButton') onClickActionButton = new EventEmitter<ActionButtonModel>();

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        this.tabItem$ = this.tabs.changes
            .pipe(startWith(''))
            .pipe(delay(0))
            .pipe(map(() => this.tabs.toArray()));
    }

    ngAfterContentChecked(): void {
        if (!this.activeTab) {
            Promise.resolve().then(() => {
                this.activeTab = this.tabs.first;
            })
        }
    }

    handleSelectTab(tabItem: TabItemComponent, id: string): void {
        if (this.activeTab === tabItem) {
            return;
        }

        if (this.activeTab) {
            this.activeTab.isActive = false;
        }

        this.activeTab = tabItem;

        tabItem.isActive = true;

        this.onGetSelectedTab.emit(id);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        this.onClickActionButton.emit(args);
    }

    onNavigateTab(index: number, id: string): void {
        const tab = this.tabs.toArray();

        this.handleSelectTab(tab[index], id);
    }
}
