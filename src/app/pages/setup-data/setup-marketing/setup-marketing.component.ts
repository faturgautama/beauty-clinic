import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { IInsertSetupMarketingModel, ISetupMarketingModel, IUpdateSetupMarketingModel } from 'src/app/model/setup-marketing.model';
import { SetupMarketingService } from 'src/app/services/setup-marketing/setup-marketing.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-setup-marketing',
    templateUrl: './setup-marketing.component.html',
    styleUrls: ['./setup-marketing.component.css']
})
export class SetupMarketingComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    FormSetupMarketing!: FormGroup;
    FormSetupMarketingState!: 'insert' | 'update';

    modalRef?: BsModalRef;

    @ViewChild('ModalAddMarketing') ModalAddTarif!: TemplateRef<any>;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private setupMarketingService: SetupMarketingService
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'add', caption: 'Add', icon: 'fas fa-plus' },
            { id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
            { id: 'delete', caption: 'Delete', icon: 'fas fa-trash' },
            { id: 'update_status', caption: 'Update Status', icon: 'fas fa-check' },
            { id: 'filter', caption: 'Filter', icon: 'fas fa-filter' }
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data Marketing',
            filter: [
                {
                    text: 'Nama Tarif',
                    value: 'sm.nama_marketing',
                    filter: 'like'
                }
            ]
        };

        this.GridAttributes = {
            column: [
                { field: 'id_marketing', headerName: 'ID SETUP TARIF', hide: true },
                { field: 'nama_marketing', headerName: 'NAMA MARKETING', minWidth: 200 },
                { field: 'no_hp', headerName: 'NO. HANDPHONE', minWidth: 100 },
                {
                    field: 'is_active', headerName: 'STATUS ACTIVE', headerClass: 'text-center', cellClass: 'text-center',
                    cellRenderer: (args: any) => {
                        if (args.value) {
                            return '<span><i class="fas fa-check fa-xs"></i></span>'
                        } else {
                            return '<span><i class="fas fa-times fa-xs"></i></span>'
                        }
                    },
                }
            ],
            dataSource: []
        };

        this.FormSetupMarketing = this.formBuilder.group({
            id_marketing: [0, []],
            nama_marketing: ["", [Validators.required]],
            no_hp: [0, [Validators.required]],
        });

        this.handleSearchFilter([]);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'add':
                this.FormSetupMarketingState = "insert";
                this.onOpenModalInsertUpdate();
                break;
            case 'edit':
                this.FormSetupMarketingState = "update";
                this.onOpenModalInsertUpdate();
                this.id_marketing.setValue(this.GridSelectedData.id_marketing);
                this.nama_marketing.setValue(this.GridSelectedData.nama_marketing);
                this.no_hp.setValue(this.GridSelectedData.no_hp);
                break;
            case 'delete':
                if (this.GridSelectedData) {
                    this.onDelete(this.GridSelectedData);
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Warning', 'Tidak Ada Data yg Dipilih')
                }
                break;
            case 'update_status':
                if (this.GridSelectedData) {
                    this.onUpdateStatus(this.GridSelectedData);
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Warning', 'Tidak Ada Data yg Dipilih')
                }
                break;
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.setupMarketingService.onGetAllByDynamicFilter(args)
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;
    }

    onOpenModalInsertUpdate(): void {
        this.modalRef = this.bsModalService.show(this.ModalAddTarif, {
            backdrop: 'static'
        });

        this.onResetForm();
    }

    onSubmitForm(FormSetupMarketing: IInsertSetupMarketingModel): void {
        let parameter: IInsertSetupMarketingModel = {
            nama_marketing: FormSetupMarketing.nama_marketing,
            no_hp: FormSetupMarketing.no_hp,
        };

        this.setupMarketingService.onPostSave(parameter)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Marketing Berhasil Disimpan')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            });
    }

    onUpdateForm(FormSetupMarketing: IUpdateSetupMarketingModel): void {
        this.setupMarketingService.onPutUpdate(FormSetupMarketing)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Marketing Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                            this.FormSetupMarketingState = 'insert';
                        });
                };
            })
    }

    onDelete(data: ISetupMarketingModel): void {
        this.setupMarketingService.onDelete(data.id_marketing)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Marketing Berhasil Dihapus')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            })
    }

    onUpdateStatus(data: ISetupMarketingModel): void {
        this.setupMarketingService.onPutUpdateStatusActive(data.id_marketing, data.is_active)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Marketing Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            })
    }

    onResetForm(): void {
        this.FormSetupMarketing.reset();
        this.nama_marketing.setValue("");
        this.no_hp.setValue("");
    }

    get id_marketing(): AbstractControl { return this.FormSetupMarketing.get('id_marketing') as AbstractControl };
    get nama_marketing(): AbstractControl { return this.FormSetupMarketing.get('nama_marketing') as AbstractControl };
    get no_hp(): AbstractControl { return this.FormSetupMarketing.get('no_hp') as AbstractControl };
}
