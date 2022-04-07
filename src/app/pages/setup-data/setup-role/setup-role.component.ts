import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { IInsertSetupRoleModel, IUpdateSetupRoleModel } from 'src/app/model/setup-role.model';
import { SetupRoleService } from 'src/app/services/setup-role/setup-role.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-setup-role',
    templateUrl: './setup-role.component.html',
    styleUrls: ['./setup-role.component.css']
})
export class SetupRoleComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    FormSetupRole!: FormGroup;
    FormSetupRoleState!: 'insert' | 'update';

    modalRef?: BsModalRef;

    @ViewChild('ModalAddRole') ModalAddRole!: TemplateRef<any>;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private setupRoleService: SetupRoleService,
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'add', caption: 'Add', icon: 'fas fa-plus' },
            { id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
        ];

        this.GridAttributes = {
            column: [
                { field: 'id_role', headerName: 'ID SETUP ROLE', hide: true },
                { field: 'nama_role', headerName: 'NAMA ROLE', minWidth: 200 },
                { field: 'keterangan', headerName: 'KETERANGAN', minWidth: 100 },
            ],
            dataSource: []
        };

        this.FormSetupRole = this.formBuilder.group({
            id_role: [0, []],
            nama_role: ["", [Validators.required]],
            keterangan: ["", [Validators.required]],
            time_auto_logout: [0, [Validators.required]],
        });

        this.handleSearchFilter();
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'add':
                this.FormSetupRoleState = "insert";
                this.onOpenModalInsertUpdate();
                break;
            case 'edit':
                this.FormSetupRoleState = "update";
                this.onOpenModalInsertUpdate();
                this.id_role.setValue(this.GridSelectedData.id_role);
                this.nama_role.setValue(this.GridSelectedData.nama_role);
                this.keterangan.setValue(this.GridSelectedData.keterangan);
                this.time_auto_logout.setValue(this.GridSelectedData.time_auto_logout);
                break;
            default:
                break;
        }
    }

    handleSearchFilter(): void {
        this.setupRoleService.onGetAllRole()
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;
    }

    onOpenModalInsertUpdate(): void {
        this.modalRef = this.bsModalService.show(this.ModalAddRole, {
            backdrop: 'static'
        });

        this.onResetForm();
    }

    onSubmitForm(FormSetupRole: IInsertSetupRoleModel): void {
        let parameter: IInsertSetupRoleModel = {
            nama_role: FormSetupRole.nama_role,
            keterangan: FormSetupRole.keterangan,
            time_auto_logout: 10,
        };

        this.setupRoleService.onPostSave(parameter)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Role Berhasil Disimpan')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter();
                        });
                };
            });
    }

    onUpdateForm(FormSetupRole: IUpdateSetupRoleModel): void {
        this.setupRoleService.onPutUpdate(FormSetupRole)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Role Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter();
                            this.FormSetupRoleState = 'insert';
                        });
                };
            })
    }

    onResetForm(): void {
        this.FormSetupRole.reset();
        this.nama_role.setValue("");
        this.keterangan.setValue("");
        this.time_auto_logout.setValue(10);
    }

    get id_role(): AbstractControl { return this.FormSetupRole.get('id_role') as AbstractControl };
    get nama_role(): AbstractControl { return this.FormSetupRole.get('nama_role') as AbstractControl };
    get keterangan(): AbstractControl { return this.FormSetupRole.get('keterangan') as AbstractControl };
    get time_auto_logout(): AbstractControl { return this.FormSetupRole.get('time_auto_logout') as AbstractControl };
}
