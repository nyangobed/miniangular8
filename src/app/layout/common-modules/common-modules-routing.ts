import { ApproveRepairCentreComponent } from './master-data/repair-centre/approve-repair-centre/approve-repair-centre.component';
import { ViewRepairCentreComponent } from './master-data/repair-centre/view-repair-centre/view-repair-centre.component';
import { CreateRepairCentreComponent } from './master-data/repair-centre/create-repair-centre/create-repair-centre.component';
import { CreateErrorCodesComponent } from './master-data/error-codes/create-error-codes/create-error-codes.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guard';
import {CurrencyComponent} from './master-data/currency/currency.component';
import {OrganizationSetupComponent} from './organization-setup/organization-setup.component';
import {ManageComponent} from './businessunititem/manage/manage.component';
import {CreateComponent} from './businessunititem/create/create.component';
import {CreatecurrencyComponent} from './master-data/currency/createcurrency/createcurrency.component';
import {ViewcurrencyComponent} from './master-data/currency/viewcurrency/viewcurrency.component';
import {ApprovecurrencyComponent} from './master-data/currency/approvecurrency/approvecurrency.component';
import {BankRegionsComponent} from './master-data/bank-regions/bank-regions.component';
import {GeographicalRegionsComponent} from './master-data/geographical-regions/geographical-regions.component';
import {ApproveBankRegionsComponent} from './master-data/bank-regions/approve-bank-regions/approve-bank-regions.component';
import {CreateBankRegionsComponent} from './master-data/bank-regions/create-bank-regions/create-bank-regions.component';
import {ViewBankRegionsComponent} from './master-data/bank-regions/view-bank-regions/view-bank-regions.component';
import {CreateGeographicalRegionsComponent} from './master-data/geographical-regions/create-geographical-regions/create-geographical-regions.component';
import {ApproveGeographicalRegionsComponent} from './master-data/geographical-regions/approve-geographical-regions/approve-geographical-regions.component';
import {ViewGeographicalRegionsComponent} from './master-data/geographical-regions/view-geographical-regions/view-geographical-regions.component';
import { UserrolesComponent } from './userroles/userroles.component';
import { CreaterolesComponent } from './userroles/createroles/createroles.component';
import { EditrolesComponent } from './userroles/editroles/editroles.component';
import { ViewrolesComponent } from './userroles/viewroles/viewroles.component';
import { ApproveuserroleComponent } from './userroles/approveuserrole/approveuserrole.component';
import { CreateuserComponent } from './systemusers/createuser/createuser.component';
import { ApproveuserComponent } from './systemusers/approveuser/approveuser.component';
import { ListusersComponent } from './systemusers/listusers/listusers.component';
import { ViewuserComponent } from './systemusers/viewuser/viewuser.component';
import { ViewchangesComponent } from './viewchanges/viewchanges.component';
import { ErrorCodesComponent } from './master-data/error-codes/error-codes.component';
import { ViewErrorCodesComponent } from './master-data/error-codes/view-error-codes/view-error-codes.component';
import { ApproveErrorCodesComponent } from './master-data/error-codes/approve-error-codes/approve-error-codes.component';
import { RepairCentreComponent } from './master-data/repair-centre/repair-centre.component';
import { WorkgroupComponent } from './workgroup/workgroup.component';
import { CreateWorkgroupComponent } from './workgroup/create-workgroup/create-workgroup.component';
import { ViewWorkgroupComponent } from './workgroup/view-workgroup/view-workgroup.component';
import { ApproveWorkgroupComponent } from './workgroup/approve-workgroup/approve-workgroup.component';
import { UploadErrorCodesComponent } from './master-data/error-codes/upload-error-codes/upload-error-codes.component';


const routes: Routes = [
    {path: 'master-data/error-codes/upload-error-codes', component: UploadErrorCodesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/currency', component: CurrencyComponent, canActivate: [AuthGuard]},
    {path: 'master-data/currency/createcurrency', component: CreatecurrencyComponent, canActivate: [AuthGuard]},
    {path: 'master-data/currency/:id/update', component: CreatecurrencyComponent, canActivate: [AuthGuard]},
    {path: 'master-data/currency/:id/view', component: ViewcurrencyComponent, canActivate: [AuthGuard]},
    {path: 'master-data/currency/approvecurrency', component: ApprovecurrencyComponent, canActivate: [AuthGuard]},
    {path: 'organization-setup', component: OrganizationSetupComponent, canActivate: [AuthGuard]},
    {path: 'businessunititem/create', component: CreateComponent, canActivate: [AuthGuard]},
    {path: 'businessunititem/manage', component: ManageComponent, canActivate: [AuthGuard]},
    {path: 'master-data/bank-regions', component: BankRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/bank-regions/approve-bank-regions', component: ApproveBankRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/bank-regions/create-bank-regions', component: CreateBankRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/bank-regions/:id/view', component: ViewBankRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/bank-regions/:id/update', component: CreateBankRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/geographical-regions', component: GeographicalRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/geographical-regions/create-geographical-regions', component: CreateGeographicalRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/geographical-regions/approve-geographical-regions', component: ApproveGeographicalRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/geographical-regions/:id/view', component: ViewGeographicalRegionsComponent, canActivate: [AuthGuard]},
    {path: 'master-data/geographical-regions/:id/update', component: CreateGeographicalRegionsComponent, canActivate: [AuthGuard]},
    {path: 'userroles', component: UserrolesComponent, canActivate: [AuthGuard]},
    {path: 'userroles/createroles', component: CreaterolesComponent, canActivate: [AuthGuard]},
    {path: 'userroles/createroles/:id/update', component: CreaterolesComponent, canActivate: [AuthGuard]},
    {path: 'roles/list/:id/update', component: EditrolesComponent, canActivate: [AuthGuard]},
    {path: 'roles/list/:id/view', component: ViewrolesComponent, canActivate: [AuthGuard]},

    {path: 'systemusers/listusers', component: ListusersComponent, canActivate: [AuthGuard]},
    {path: 'userroles/approveroles', component: ApproveuserroleComponent, canActivate: [AuthGuard]},

    {path: 'systemusers/createuser', component: CreateuserComponent, canActivate: [AuthGuard]},
    {path: 'users/approveuser', component: ApproveuserComponent},
    {path: 'users/:id/update', component: CreateuserComponent, canActivate: [AuthGuard]},
    {path: 'users/:id/view', component: ViewuserComponent, canActivate: [AuthGuard]},
    {path: 'users/:id/changes', component: ViewchangesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/error-codes', component: ErrorCodesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/error-codes/:id/update', component: ErrorCodesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/error-codes/create-error-codes', component: CreateErrorCodesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/error-codes/create-error-codes/:id/update', component: CreateErrorCodesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/error-codes/view-error-codes/:id/view', component: ViewErrorCodesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/error-codes', component: ViewErrorCodesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/error-codes/approve-error-codes', component: ApproveErrorCodesComponent, canActivate: [AuthGuard]},
    {path: 'master-data/repair-centre', component: RepairCentreComponent, canActivate: [AuthGuard]},
    {path: 'master-data/repair-centre/create-repair-centre', component: CreateRepairCentreComponent, canActivate: [AuthGuard]},
    {path: 'master-data/repair-centre/view-repair-centre', component: ViewRepairCentreComponent, canActivate: [AuthGuard]},
    {path: 'master-data/repair-centre/approve-repair-centre', component: ApproveRepairCentreComponent, canActivate: [AuthGuard]},
    {path: 'workgroups/create-workgroups', component: CreateWorkgroupComponent, canActivate: [AuthGuard]},
    {path: 'workgroups/approve-workgroups', component: ApproveWorkgroupComponent, canActivate: [AuthGuard]},
    {path: 'workgroups/:id/view', component: ViewWorkgroupComponent, canActivate: [AuthGuard]},
    {path: 'workgroups/:id/update', component: CreateWorkgroupComponent, canActivate: [AuthGuard]},
    {path: 'workgroups', component: WorkgroupComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommonModulesRouting {}
