import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeographicalRegionsComponent} from './master-data/geographical-regions/geographical-regions.component';
import {BankRegionsComponent} from './master-data/bank-regions/bank-regions.component';
import {CurrencyComponent} from './master-data/currency/currency.component';
import {SystemConfigurationComponent} from './system-configuration/system-configuration.component';
import {OrganizationSetupComponent} from './organization-setup/organization-setup.component';
import {ViewcurrencyComponent} from './master-data/currency/viewcurrency/viewcurrency.component';
import {CreatecurrencyComponent} from './master-data/currency/createcurrency/createcurrency.component';
import {ApprovecurrencyComponent} from './master-data/currency/approvecurrency/approvecurrency.component';
import {DataTablesModule} from 'angular-datatables';
import {PageHeaderModule} from '../../shared';
import {CommonModulesRouting} from './common-modules-routing';
import {UtilModule} from '../util/util.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
    MatAutocompleteModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormWizardModule} from 'angular2-wizard';
import {CreateComponent} from './businessunititem/create/create.component';
import {ManageComponent} from './businessunititem/manage/manage.component';
import {ViewBusinessUnitDialogComponent} from './view-business-unit-dialog/view-business-unit-dialog.component';
import {TreeviewModule} from 'ngx-treeview';
import {TreeModule} from 'angular-tree-component';
import {ExpandMode, NgxTreeSelectModule} from 'ngx-tree-select';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import {CovalentDialogsModule, CovalentMessageModule} from '@covalent/core';
import {CovalentMarkdownModule} from '@covalent/markdown';
import { ApproveBankRegionsComponent } from './master-data/bank-regions/approve-bank-regions/approve-bank-regions.component';
import {CreateBankRegionsComponent} from './master-data/bank-regions/create-bank-regions/create-bank-regions.component';
import { ViewBankRegionsComponent } from './master-data/bank-regions/view-bank-regions/view-bank-regions.component';
import { ViewGeographicalRegionsComponent } from './master-data/geographical-regions/view-geographical-regions/view-geographical-regions.component';
import { ApproveGeographicalRegionsComponent } from './master-data/geographical-regions/approve-geographical-regions/approve-geographical-regions.component';
import { CreateGeographicalRegionsComponent } from './master-data/geographical-regions/create-geographical-regions/create-geographical-regions.component';
import {TreeNgxModule} from 'tree-ngx';
import { UserrolesComponent } from './userroles/userroles.component';
import { CreaterolesComponent } from './userroles/createroles/createroles.component';
import { EditrolesComponent } from './userroles/editroles/editroles.component';
import { ViewrolesComponent } from './userroles/viewroles/viewroles.component';
import { ApproveuserroleComponent } from './userroles/approveuserrole/approveuserrole.component';
import { CheckerDialogComponent } from '../util/checker-dialog/checker-dialog.component';
import { ListusersComponent } from './systemusers/listusers/listusers.component';
import { CreateuserComponent } from './systemusers/createuser/createuser.component';
import { ApproveuserComponent } from './systemusers/approveuser/approveuser.component';
import { ViewuserComponent } from './systemusers/viewuser/viewuser.component';
import { EditDialogComponent } from './systemusers/createuser/edit-dialog/edit-dialog.component';
import { ViewchangesComponent } from './viewchanges/viewchanges.component';
import {DeleteDialogComponent} from '../util/delete-component/delete-dialog/delete-dialog.component';
import { ErrorCodesComponent } from './master-data/error-codes/error-codes.component';
import { CreateErrorCodesComponent } from './master-data/error-codes/create-error-codes/create-error-codes.component';
import { ViewErrorCodesComponent } from './master-data/error-codes/view-error-codes/view-error-codes.component';
import { ApproveErrorCodesComponent } from './master-data/error-codes/approve-error-codes/approve-error-codes.component';
import { RepairCentreComponent } from './master-data/repair-centre/repair-centre.component';
import { ApproveRepairCentreComponent } from './master-data/repair-centre/approve-repair-centre/approve-repair-centre.component';
import { CreateRepairCentreComponent } from './master-data/repair-centre/create-repair-centre/create-repair-centre.component';
import { ViewRepairCentreComponent } from './master-data/repair-centre/view-repair-centre/view-repair-centre.component';


import { BrowserModule } from '@angular/platform-browser';
import { WorkgroupComponent } from './workgroup/workgroup.component';
import { ApproveWorkgroupComponent } from './workgroup/approve-workgroup/approve-workgroup.component';
import { ViewWorkgroupComponent } from './workgroup/view-workgroup/view-workgroup.component';
import { CreateWorkgroupComponent } from './workgroup/create-workgroup/create-workgroup.component';
import { DeviceModelComponent } from './master-data/device-model/device-model.component';
import { UploadErrorCodesComponent } from './master-data/error-codes/upload-error-codes/upload-error-codes.component';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
    declarations: [
        SystemConfigurationComponent,
        OrganizationSetupComponent,
        CurrencyComponent,
        ViewcurrencyComponent,
        CreatecurrencyComponent,
        ApprovecurrencyComponent,
        CreateComponent,
        ManageComponent,
        ViewBusinessUnitDialogComponent,
        BankRegionsComponent,
        ApproveBankRegionsComponent,
        CreateBankRegionsComponent,
        ViewBankRegionsComponent,
        GeographicalRegionsComponent,
        ViewGeographicalRegionsComponent,
        ApproveGeographicalRegionsComponent,
        CreateGeographicalRegionsComponent,
        UserrolesComponent,
        DeviceModelComponent,
        CreaterolesComponent,
        EditrolesComponent,
        ViewrolesComponent,
        ApproveuserroleComponent,
        ListusersComponent,
        CreateuserComponent,
        ApproveuserComponent,
        ViewuserComponent,
        EditDialogComponent,
        ViewchangesComponent,
        ErrorCodesComponent,
        CreateErrorCodesComponent,
        ViewErrorCodesComponent,
        ApproveErrorCodesComponent,
        RepairCentreComponent,
        ApproveRepairCentreComponent,
        CreateRepairCentreComponent,
        ViewRepairCentreComponent,



        WorkgroupComponent,
        ApproveWorkgroupComponent,
        ViewWorkgroupComponent,
        CreateWorkgroupComponent,
        UploadErrorCodesComponent,
    ],

    imports: [
        TreeNgxModule,
        CommonModule,
        DataTablesModule,
        PageHeaderModule,
        CommonModulesRouting,
        UtilModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatRadioModule,
        MatCardModule,
        MatExpansionModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatTabsModule,
        NgxPermissionsModule.forRoot(),
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        FormWizardModule,
        TreeviewModule.forRoot(),
        TreeModule,
        CovalentDynamicFormsModule,
        CovalentDialogsModule,
        CovalentMessageModule,
        CovalentMarkdownModule,
        NgxTreeSelectModule.forRoot({
            allowFilter: true,
            filterPlaceholder: 'Type your filter here...',
            maxVisibleItemCount: 10,
            idField: 'unitItemId',
            textField: 'name',
            childrenField: 'children',
            allowParentSelection: true,
            expandMode: ExpandMode.Selection
        })
    ],

    entryComponents: [
        CheckerDialogComponent,
        EditDialogComponent,
        DeleteDialogComponent
    ]
})
export class CommonModulesModule {
}
