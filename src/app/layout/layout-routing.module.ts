import {NgModule} from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from './layout.component';
import {WhitelistingComponent} from './whitelist/whitelisting/whitelisting.component';
import {DeviceMakeComponent} from './masterrecords/device-make/device-make.component';
import {TelcomsComponent} from './masterrecords/telcoms/telcoms.component';
import {CreatebusinessunitComponent} from './estate/businessunit/createbusinessunit/createbusinessunit.component';
import {ApproveComponent} from './estate/businessunit/approve/approve.component';
import {ListbusinessunitComponent} from './estate/businessunit/listbusinessunit/listbusinessunit.component';
import {ApproveMakeComponent} from './approve-make/approve-make.component';
import {ListMakeComponent} from './list-make/list-make.component';
import {CreateComponent} from './estate/businessunititem/create/create.component';
import {ManageComponent} from './estate/businessunititem/manage/manage.component';
import {ProductsComponent} from './masterrecords/products/products.component';
// import {CurrenciesComponent} from './masterrecords/currencies/currencies.component';
import {DepartmentComponent} from './masterrecords/department/department.component';
import {CreatedeviceComponent} from './onboarding/createdevice/createdevice.component';
import {DeviceTypeComponent} from './masterrecords/device-type/device-type.component';
import {ApproveDeviceTypeComponent} from './masterrecords/approve-device-type/approve-device-type.component';
import {DeviceModalComponent} from './masterrecords/device-modal/device-modal.component';
import {ApproveDeviceModelComponent} from './masterrecords/approve-device-model/approve-device-model.component';
import {ListBatchfilesComponent} from './whitelist/list-batchfiles/list-batchfiles.component';
import {ConfirmWhitelistComponent} from './whitelist/confirm-whitelist/confirm-whitelist.component';
import {ApproveWhitelistComponent} from './whitelist/approve-whitelist/approve-whitelist.component';
import {UploadComponent} from './application/upload/upload.component';
import {ApproveUploadComponent} from './application/approve-upload/approve-upload.component';
import {GlobalConfigsComponent} from './configuration/global-configs/global-configs.component';
import {ApproveConfigsComponent} from './configuration/approve-configs/approve-configs.component';
import {ApprovedeviceComponent} from './onboarding/approvedevice/approvedevice.component';
import {ListdevicescomponentComponent} from './onboarding/listdevicescomponent/listdevicescomponent.component';
import {CreatescheduleComponent} from './schedule/createschedule/createschedule.component';
import {ApprovescheduleComponent} from './schedule/approveschedule/approveschedule.component';
import {ListscheduleComponent} from './schedule/listschedule/listschedule.component';
import {PasswordConfigComponent} from './configuration/password-config/password-config.component';
import {ListModelComponent} from './masterrecords/list-model/list-model.component';
import {ListDeviceTypeComponent} from './masterrecords/list-device-type/list-device-type.component';
import {ListWhitelistComponent} from './whitelist/list-whitelist/list-whitelist.component';
import {ListAppsComponent} from './application/list-apps/list-apps.component';
import {PendingmanualComponent} from './onboarding/pendingmanual/pendingmanual.component';
import {ProfileComponent} from './profile/profile.component';
import {CreatedepartmentComponent} from './masterrecords/department/createdepartment/createdepartment.component';
import {ApprovedepartmentComponent} from './masterrecords/department/approvedepartment/approvedepartment.component';
import {CreatecurrencyComponent} from './masterrecords/currencies/createcurrency/createcurrency.component';
import {ApprovecurrencyComponent} from './masterrecords/currencies/approvecurrency/approvecurrency.component';
import {CreateproductComponent} from './masterrecords/products/createproduct/createproduct.component';
import {ApproveproductComponent} from './masterrecords/products/approveproduct/approveproduct.component';
import {ViewproductComponent} from './masterrecords/products/viewproduct/viewproduct.component';
import {ApprovetelcomsComponent} from './masterrecords/telcoms/approvetelcoms/approvetelcoms.component';
import {CreatetelcomsComponent} from './masterrecords/telcoms/createtelcoms/createtelcoms.component';
import {ViewtelcomsComponent} from './masterrecords/telcoms/viewtelcoms/viewtelcoms.component';
import {ViewdepartmentComponent} from './masterrecords/department/viewdepartment/viewdepartment.component';
import {ViewcurrencyComponent} from './masterrecords/currencies/viewcurrency/viewcurrency.component';
import {ViewbusinessunitComponent} from './estate/businessunit/viewbusinessunit/viewbusinessunit.component';
// import {DashboardComponent} from './dashboard/dashboard.component';
import {AuditComponent} from './reports/audit/audit.component';
import {HeartbeatsComponent} from './reports/heartbeats/heartbeats.component';
import {DevicesreportsComponent} from './reports/devicesreports/devicesreports.component';
import {DownloadsComponent} from './reports/downloads/downloads.component';
import {ViewDevicesComponent} from './onboarding/view-devices/view-devices.component';
import {ViewTasksComponent} from './reports/view-tasks/view-tasks.component';
import {OrganizationHierachyComponent} from './estate/organization-hierachy/organization-hierachy.component';
import {ReleaseDeviceComponent} from './inventory/release-device/release-device.component';
import {DecommissionDeviceComponent} from './inventory/decommission-device/decommission-device.component';
import {DeviceHistoryComponent} from './inventory/device-history/device-history.component';
import {DecommisionViewComponent} from './inventory/decommision-view/decommision-view.component';
import {AllDevicesReportsComponent} from './reports/all-devices-reports/all-devices-reports.component';
import {OnboardedDeviceReportsComponent} from './reports/onboarded-device-reports/onboarded-device-reports.component';
import {WhiteListedReportsComponent} from './reports/white-listed-reports/white-listed-reports.component';
import {DecommissionedReportsComponent} from './reports/decommissioned-reports/decommissioned-reports.component';
import {ReleasedDevicesReportsComponent} from './reports/released-devices-reports/released-devices-reports.component';
import {CompletedDownloadsReportsComponent} from './reports/completed-downloads-reports/completed-downloads-reports.component';
import {FailedDowloadsReportsComponent} from './reports/failed-dowloads-reports/failed-dowloads-reports.component';
import {ScheduledDownloadsReportsComponent} from './reports/scheduled-downloads-reports/scheduled-downloads-reports.component';
import {DownloadingReportsComponent} from './reports/downloading-reports/downloading-reports.component';
import {AuthGuard} from '../shared';
import {AddExtensionComponent} from './masterrecords/add-extension/add-extension.component';
// import {CommonModulesModule} from './common-modules/common-modules.module';
// import {AgencyWebportalModule} from './agency-webportal/agency-webportal.module';
// import { TrcmLabAutomationModule } from './trcm-lab-automation/trcm-lab-automation.module';
import { CustomerReportsComponent } from './reports/customer-reports/customer-reports.component';
import { ManufacturerReportsComponent } from './reports/manufacturer-reports/manufacturer-reports.component';
import { DeviceReportsComponent } from './reports/device-reports/device-reports.component';
import { IngenicoReportsComponent } from './reports/ingenico-reports/ingenico-reports.component';
import { RepairReportsComponent } from './reports/repair-reports/repair-reports.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            // {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
            // {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
            {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/products', component: ProductsComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/createproducts', component: CreateproductComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/approveproducts', component: ApproveproductComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/products/:id/update', component: CreateproductComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/products/:id/view', component: ViewproductComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-make', component: DeviceMakeComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-make/:id/update', component: DeviceMakeComponent, canActivate: [AuthGuard]},
            {path: 'whitelist/whitelisting', component: WhitelistingComponent, canActivate: [AuthGuard]},
           // {path: 'masterrecords/currencies', component: CurrenciesComponent, canActivate: [AuthGuard]},
            {path: ' ', component: CreatecurrencyComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/currencies/:id/view', component: ViewcurrencyComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/createcurrency', component: CreatecurrencyComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/approvecurrency', component: ApprovecurrencyComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/departments', component: DepartmentComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/createdepartment', component: CreatedepartmentComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/approvedepartment', component: ApprovedepartmentComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/departments/:id/update', component: CreatedepartmentComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/departments/:id/view', component: ViewdepartmentComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/telcoms', component: TelcomsComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/add-extension', component: AddExtensionComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/approvetelcoms', component: ApprovetelcomsComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/createtelcoms', component: CreatetelcomsComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/telcoms/:id/update', component: CreatetelcomsComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/telcoms/:id/view', component: ViewtelcomsComponent, canActivate: [AuthGuard]},
            {path: 'estate/createbusinessunit', component: CreatebusinessunitComponent, canActivate: [AuthGuard]},
            {path: 'estate/approvebusinessunit', component: ApproveComponent, canActivate: [AuthGuard]},
            {path: 'estate/listbusinessunit', component: ListbusinessunitComponent, canActivate: [AuthGuard]},
            {path: 'estate/listbusinessunit/:id/update', component: CreatebusinessunitComponent, canActivate: [AuthGuard]},
            {path: 'estate/listbusinessunit/:id/view', component: ViewbusinessunitComponent, canActivate: [AuthGuard]},
            {path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule'},
            {path: 'masterrecords/device-make/approve', component: ApproveMakeComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-make/list', component: ListMakeComponent, canActivate: [AuthGuard]},
            {path: 'estate/createbusinessunititem', component: CreateComponent, canActivate: [AuthGuard]},
            {path: 'estate/manage-estate', component: ManageComponent, canActivate: [AuthGuard]},
            {path: 'estate/unititem/:id/update', component: CreateComponent, canActivate: [AuthGuard]},
            {path: 'device/add', component: CreatedeviceComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-type', component: DeviceTypeComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-type/approve', component: ApproveDeviceTypeComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-model', component: DeviceModalComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-model/:id/update', component: DeviceModalComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-model/approve', component: ApproveDeviceModelComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-model/list', component: ListModelComponent, canActivate: [AuthGuard]},
            {path: 'whitelist/batch-files', component: ListBatchfilesComponent, canActivate: [AuthGuard]},
            {path: 'whitelist/confirmation', component: ConfirmWhitelistComponent, canActivate: [AuthGuard]},
            {path: 'whitelist/approve', component: ApproveWhitelistComponent, canActivate: [AuthGuard]},
            {path: 'application/upload', component: UploadComponent, canActivate: [AuthGuard]},
            {path: 'application/upload/approve', component: ApproveUploadComponent, canActivate: [AuthGuard]},
            {path: 'configuration/system', component: GlobalConfigsComponent, canActivate: [AuthGuard]},
            {path: 'configuration/system/approve', component: ApproveConfigsComponent, canActivate: [AuthGuard]},
            {path: 'whitelist/approve', component: ApproveWhitelistComponent, canActivate: [AuthGuard]},
            {path: 'application/upload', component: UploadComponent, canActivate: [AuthGuard]},
            {path: 'application/:id/update', component: UploadComponent, canActivate: [AuthGuard]},
            {path: 'device/approve', component: ApprovedeviceComponent, canActivate: [AuthGuard]},
            {path: 'devices/list', component: ListdevicescomponentComponent, canActivate: [AuthGuard]},
            {path: 'devices/pending', component: PendingmanualComponent, canActivate: [AuthGuard]},
            {path: 'devices/list/:id/update', component: ViewDevicesComponent, canActivate: [AuthGuard]},
            {path: 'schedule/create', component: CreatescheduleComponent, canActivate: [AuthGuard]},
            {path: 'schedule/approve', component: ApprovescheduleComponent, canActivate: [AuthGuard]},
            {path: 'schedule/list', component: ListscheduleComponent, canActivate: [AuthGuard]},
            {path: 'configuration/password-complexity', component: PasswordConfigComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-type/list', component: ListDeviceTypeComponent, canActivate: [AuthGuard]},
            {path: 'whitelist/list', component: ListWhitelistComponent, canActivate: [AuthGuard]},
            {path: 'application/list', component: ListAppsComponent, canActivate: [AuthGuard]},
            {path: 'masterrecords/device-type/:id/update', component: DeviceTypeComponent, canActivate: [AuthGuard]},
            {path: 'schedule/list/:id/update', component: CreatescheduleComponent, canActivate: [AuthGuard]},
            {path: 'reports/audit', component: AuditComponent, canActivate: [AuthGuard]},
            {path: 'reports/heartbeats', component: HeartbeatsComponent, canActivate: [AuthGuard]},
            {path: 'reports/devices', component: DevicesreportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/downloads', component: DownloadsComponent, canActivate: [AuthGuard]},
            {path: 'reports/customer-reports', component: CustomerReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/manufacturer-reports', component: ManufacturerReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/device-reports', component: DeviceReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/downloads/:id/view', component: ViewTasksComponent, canActivate: [AuthGuard]},
            {path: 'reports/ingenico-reports', component: IngenicoReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/repair-reports', component: RepairReportsComponent, canActivate: [AuthGuard]},
            {path: 'organization/setup', component: OrganizationHierachyComponent, canActivate: [AuthGuard]},
            {path: 'inventory/release', component: ReleaseDeviceComponent, canActivate: [AuthGuard]},
            {path: 'inventory/decommission', component: DecommissionDeviceComponent, canActivate: [AuthGuard]},
            {path: 'inventory/history', component: DeviceHistoryComponent, canActivate: [AuthGuard]},
            {path: 'devices/list/:id/decommission', component: DecommisionViewComponent, canActivate: [AuthGuard]},
            {path: 'reports/alldevices', component: AllDevicesReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/onboarded', component: OnboardedDeviceReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/whitelisted', component: WhiteListedReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/decommissioned', component: DecommissionedReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/released', component: ReleasedDevicesReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/completed-downloads', component: CompletedDownloadsReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/pending-downloads', component: FailedDowloadsReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/downloading-downloads', component: DownloadingReportsComponent, canActivate: [AuthGuard]},
            {path: 'reports/scheduled', component: ScheduledDownloadsReportsComponent, canActivate: [AuthGuard]},
            {path: 'common-modules', loadChildren: './common-modules/common-modules.module#CommonModulesModule'},
            {path: 'trcm-lab-automation', loadChildren: './trcm-lab-automation/trcm-lab-automation.module#TrcmLabAutomationModule'}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
