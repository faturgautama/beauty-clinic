import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { ISetupRoleModel } from 'src/app/model/setup-role.model';
import { IInsertSetupUserModel, IUpdateSetupUserModel } from 'src/app/model/setup-user.model';
import { SetupRoleService } from 'src/app/services/setup-role/setup-role.service';
import { SetupUserService } from 'src/app/services/setup-user/setup-user.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-setup-user',
    templateUrl: './setup-user.component.html',
    styleUrls: ['./setup-user.component.css']
})
export class SetupUserComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    FormSetupUser!: FormGroup;
    FormSetupUserState!: 'insert' | 'update';

    DropdownRoleDatasource: ISetupRoleModel[] = [];
    DropdownRoleField: Object = { text: 'nama_role', value: 'id_role' };

    SeePassword: boolean = false;

    modalRef?: BsModalRef;

    @ViewChild('ModalAddUser') ModalAddUser!: TemplateRef<any>;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private setupRoleService: SetupRoleService,
        private setupUserService: SetupUserService,
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'add', caption: 'Add', icon: 'fas fa-plus' },
            { id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
            { id: 'filter', caption: 'filter', icon: 'fas fa-filter' },
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data User',
            filter: [
                {
                    text: 'Nama User',
                    value: 'mu.full_name',
                    filter: 'like'
                },
                {
                    text: 'Role User',
                    value: 'mu.nama_role',
                    filter: 'like'
                },
            ]
        };

        this.GridAttributes = {
            column: [
                { field: 'id_user', headerName: 'ID USER', hide: true },
                { field: 'full_name', headerName: 'NAMA USER', minWidth: 200 },
                { field: 'nama_role', headerName: 'ROLE', minWidth: 200 },
                { field: 'alamat_lengkap', headerName: 'ALAMAT LENGKAP', minWidth: 100 },
                { field: 'no_hp', headerName: 'NO. HANDPHONE', minWidth: 100 },
            ],
            dataSource: []
        };

        this.FormSetupUser = this.formBuilder.group({
            id_user: [0, []],
            id_role: [0, [Validators.required]],
            user_name: ["", [Validators.required]],
            password: ["", [Validators.required]],
            full_name: ["", [Validators.required]],
            alamat_lengkap: ["", [Validators.required]],
            no_hp: [0, [Validators.required]],
        });

        this.setupRoleService.onGetAllRole()
            .subscribe((result) => {
                this.DropdownRoleDatasource = result.data;
            });

        this.handleSearchFilter([]);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'add':
                this.FormSetupUserState = "insert";
                this.onOpenModalInsertUpdate();
                break;
            case 'edit':
                this.FormSetupUserState = "update";
                this.onOpenModalInsertUpdate();
                this.id_user.setValue(this.GridSelectedData.id_user);
                this.id_role.setValue(this.GridSelectedData.id_role);
                this.user_name.setValue(this.GridSelectedData.user_name);
                this.password.setValue(this.GridSelectedData.password);
                this.full_name.setValue(this.GridSelectedData.full_name);
                this.alamat_lengkap.setValue(this.GridSelectedData.alamat_lengkap);
                this.no_hp.setValue(this.GridSelectedData.no_hp);
                break;
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.setupUserService.onGetAllUserByDynamicFilter(args)
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;
    }

    onOpenModalInsertUpdate(): void {
        this.modalRef = this.bsModalService.show(this.ModalAddUser, {
            backdrop: 'static',
            class: 'modal-lg'
        });

        this.onResetForm();
    }

    onTogglePassword(SeePassword: boolean): void {
        this.SeePassword = !SeePassword;

        const passwordInputField = document.getElementById('password') as HTMLInputElement;
        const passwordToggleIcon = document.getElementById('passwordToggleIcon') as HTMLElement;

        if (this.SeePassword) {
            passwordToggleIcon.classList.remove('fa-eye');
            passwordToggleIcon.classList.add('fa-eye-slash');
            passwordInputField.type = "text";
        } else {
            passwordToggleIcon.classList.add('fa-eye');
            passwordToggleIcon.classList.remove('fa-eye-slash');
            passwordInputField.type = "password";
        }
    }

    onSubmitForm(FormSetupUser: IInsertSetupUserModel): void {
        let parameter: IInsertSetupUserModel = {
            id_role: FormSetupUser.id_role,
            user_name: FormSetupUser.user_name,
            password: FormSetupUser.password,
            full_name: FormSetupUser.full_name,
            alamat_lengkap: FormSetupUser.alamat_lengkap,
            no_hp: FormSetupUser.no_hp,
        };

        this.setupUserService.onPostSave(parameter)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup User Berhasil Disimpan')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            });
    }

    onUpdateForm(FormSetupUser: IUpdateSetupUserModel): void {
        this.setupUserService.onPutUpdate(FormSetupUser)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup User Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                            this.FormSetupUserState = 'insert';
                        });
                };
            })
    }

    onResetForm(): void {
        this.FormSetupUser.reset();
        this.id_user.setValue(0);
        this.id_role.setValue(0);
        this.user_name.setValue("");
        this.password.setValue("");
        this.full_name.setValue("");
        this.alamat_lengkap.setValue("");
        this.no_hp.setValue("");
    }

    get id_user(): AbstractControl { return this.FormSetupUser.get('id_user') as AbstractControl };
    get id_role(): AbstractControl { return this.FormSetupUser.get('id_role') as AbstractControl };
    get user_name(): AbstractControl { return this.FormSetupUser.get('user_name') as AbstractControl };
    get password(): AbstractControl { return this.FormSetupUser.get('password') as AbstractControl };
    get full_name(): AbstractControl { return this.FormSetupUser.get('full_name') as AbstractControl };
    get alamat_lengkap(): AbstractControl { return this.FormSetupUser.get('alamat_lengkap') as AbstractControl };
    get no_hp(): AbstractControl { return this.FormSetupUser.get('no_hp') as AbstractControl };
}   
