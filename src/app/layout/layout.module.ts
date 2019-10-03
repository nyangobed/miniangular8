import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {CreatebusinessunitComponent} from './estate/businessunit/createbusinessunit/createbusinessunit.component';
import {ListbusinessunitComponent} from './estate/businessunit/listbusinessunit/listbusinessunit.component';
import {ApproveComponent} from './estate/businessunit/approve/approve.component';
import {CreateComponent} from './estate/businessunititem/create/create.component';
import {ListComponent} from './estate/businessunititem/list/list.component';
import {WhitelistingComponent} from './whitelist/whitelisting/whitelisting.component';
import {PageHeaderModule, StatModule} from './../shared';
import {DeviceMakeComponent} from './masterrecords/device-make/device-make.component';
import {TelcomsComponent} from './masterrecords/telcoms/telcoms.component';
import {ListMakeComponent} from './list-make/list-make.component';
import {ApproveMakeComponent} from './approve-make/approve-make.component';
import {DataTablesModule} from 'angular-datatables';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
    ErrorStateMatcher,
    MAT_LABEL_GLOBAL_OPTIONS,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {ManageComponent} from './estate/businessunititem/manage/manage.component';
// import {CheckerActionsComponent} from './checker-actions/checker-actions.component';
import {Notify} from '../shared/classes/notify';
import {TreeviewModule} from 'ngx-treeview';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MakerActionsComponent} from './maker-actions/maker-actions.component';
import {CurrenciesComponent} from './masterrecords/currencies/currencies.component';
import {DepartmentComponent} from './masterrecords/department/department.component';
import {ProductsComponent} from './masterrecords/products/products.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {CreatedeviceComponent} from './onboarding/createdevice/createdevice.component';
import {ExpandMode, NgxTreeSelectModule} from 'ngx-tree-select';
import {PosparamComponent} from './onboarding/posparam/posparam.component';
import {ParamfileComponent} from './onboarding/paramfile/paramfile.component';
import {PosParamControlService} from '../shared/services/PosParamControlService';
import {PosParamService} from '../shared/services/posparam-service';
import {DeviceModalComponent} from './masterrecords/device-modal/device-modal.component';
import {DeviceTypeComponent} from './masterrecords/device-type/device-type.component';
import {FormWizardModule} from 'angular2-wizard';
import {GlobalConfigsComponent} from './configuration/global-configs/global-configs.component';
import {UpdateConfigsComponent} from './configuration/update-configs/update-configs.component';
import {ApproveConfigsComponent} from './configuration/approve-configs/approve-configs.component';
import {FileDropModule} from 'ngx-file-drop';
import {ApproveDeviceModelComponent} from './masterrecords/approve-device-model/approve-device-model.component';
import {ListBatchfilesComponent} from './whitelist/list-batchfiles/list-batchfiles.component';
import {ApproveDeviceTypeComponent} from './masterrecords/approve-device-type/approve-device-type.component';
import {ConfirmWhitelistComponent} from './whitelist/confirm-whitelist/confirm-whitelist.component';
import {ApproveWhitelistComponent} from './whitelist/approve-whitelist/approve-whitelist.component';
import {UploadComponent} from './application/upload/upload.component';
import {ApproveUploadComponent} from './application/approve-upload/approve-upload.component';
import {PasswordConfigComponent} from './configuration/password-config/password-config.component';
import {ListModelComponent} from './masterrecords/list-model/list-model.component';
import {ListDeviceTypeComponent} from './masterrecords/list-device-type/list-device-type.component';
import {ListWhitelistComponent} from './whitelist/list-whitelist/list-whitelist.component';
import {ListAppsComponent} from './application/list-apps/list-apps.component';
import {ListscheduleComponent} from './schedule/listschedule/listschedule.component';
import {ApprovescheduleComponent} from './schedule/approveschedule/approveschedule.component';
import {CreatescheduleComponent} from './schedule/createschedule/createschedule.component';
import {ListdevicescomponentComponent} from './onboarding/listdevicescomponent/listdevicescomponent.component';
import {ApprovedeviceComponent} from './onboarding/approvedevice/approvedevice.component';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import {PendingmanualComponent} from './onboarding/pendingmanual/pendingmanual.component';
import {CreatedepartmentComponent} from './masterrecords/department/createdepartment/createdepartment.component';
// import {ViewentityComponent} from './viewentity/viewentity.component';
import {CovalentDialogsModule} from '@covalent/core/dialogs';
import {ProfileComponent} from './profile/profile.component';
import {CheckerChangesComponent} from './checker-changes/checker-changes.component';
import {ApprovedepartmentComponent} from './masterrecords/department/approvedepartment/approvedepartment.component';
import {CreatecurrencyComponent} from './masterrecords/currencies/createcurrency/createcurrency.component';
import {ApprovecurrencyComponent} from './masterrecords/currencies/approvecurrency/approvecurrency.component';
import {ViewcurrencyComponent} from './masterrecords/currencies/viewcurrency/viewcurrency.component';
import {CreateproductComponent} from './masterrecords/products/createproduct/createproduct.component';
import {ViewproductComponent} from './masterrecords/products/viewproduct/viewproduct.component';
import {ApproveproductComponent} from './masterrecords/products/approveproduct/approveproduct.component';
import {CreatetelcomsComponent} from './masterrecords/telcoms/createtelcoms/createtelcoms.component';
import {ViewtelcomsComponent} from './masterrecords/telcoms/viewtelcoms/viewtelcoms.component';
import {ApprovetelcomsComponent} from './masterrecords/telcoms/approvetelcoms/approvetelcoms.component';
import {ViewdepartmentComponent} from './masterrecords/department/viewdepartment/viewdepartment.component';
import {CapitalizePipe} from '../shared/pipes/capitalize.pipe';
import {ViewbusinessunitComponent} from './estate/businessunit/viewbusinessunit/viewbusinessunit.component';
import {TreeModule} from 'angular-tree-component';
import {CovalentMessageModule} from '@covalent/core/message';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {ChatComponent, NotificationComponent, TimelineComponent} from './dashboard/components/index';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgxChartsModule} from '@swimlane/ngx-charts/release';
import {UserRolesPermissions} from '../shared/services/roles-permissions';
import {CovalentChipsModule} from '@covalent/core/chips';
import {AuditComponent} from './reports/audit/audit.component';
import {HeartbeatsComponent} from './reports/heartbeats/heartbeats.component';
import {DevicesreportsComponent} from './reports/devicesreports/devicesreports.component';
import {DownloadsComponent} from './reports/downloads/downloads.component';
import {ViewDevicesComponent} from './onboarding/view-devices/view-devices.component';
import {ExportDataComponent} from './export-data/export-data.component';
import {CovalentExpansionPanelModule} from '@covalent/core/expansion-panel';
import {NgxPermissionsModule} from 'ngx-permissions';
import {ViewTasksComponent} from './reports/view-tasks/view-tasks.component';
// import {ModalViewEntityComponent} from './modal-view-entity/modal-view-entity.component';
import {DevicesListingComponent} from './onboarding/devices-listing/devices-listing.component';
import {OrganizationHierachyComponent} from './estate/organization-hierachy/organization-hierachy.component';
import {ReleaseDeviceComponent} from './inventory/release-device/release-device.component';
import {DecommissionDeviceComponent} from './inventory/decommission-device/decommission-device.component';
import {DeviceHistoryComponent} from './inventory/device-history/device-history.component';
import {InventoryActionsComponent} from './inventory/inventory-actions/inventory-actions.component';
import {ModalDialogModule} from 'ngx-modal-dialog';
import {AllDevicesReportsComponent} from './reports/all-devices-reports/all-devices-reports.component';
import {WhiteListedReportsComponent} from './reports/white-listed-reports/white-listed-reports.component';
import {OnboardedDeviceReportsComponent} from './reports/onboarded-device-reports/onboarded-device-reports.component';
import {DecommissionedReportsComponent} from './reports/decommissioned-reports/decommissioned-reports.component';
import {ReleasedDevicesReportsComponent} from './reports/released-devices-reports/released-devices-reports.component';
import {CompletedDownloadsReportsComponent} from './reports/completed-downloads-reports/completed-downloads-reports.component';
import {FailedDowloadsReportsComponent} from './reports/failed-dowloads-reports/failed-dowloads-reports.component';
import {ScheduledDownloadsReportsComponent} from './reports/scheduled-downloads-reports/scheduled-downloads-reports.component';
import {AllSchedulesReportsComponent} from './reports/all-schedules-reports/all-schedules-reports.component';
import {MakerDialogComponent} from './maker-dialog/maker-dialog.component';
// import {CheckerDialogComponent} from './checker-dialog/checker-dialog.component';
import {ReleaseDialogComponent} from './inventory/release-dialog/release-dialog.component';
import {DecommisionViewComponent} from './inventory/decommision-view/decommision-view.component';
import {ConfigDialogComponent} from './configuration/config-dialog/config-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {DeviceListTemplateComponent} from './reports/device-list-template/device-list-template.component';
import {UnitDialogComponent} from './estate/unit-dialog/unit-dialog.component';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {MomentModule} from 'angular2-moment';
import {MatTabsModule} from '@angular/material/tabs';
import {TaskDialogComponent} from './onboarding/task-dialog/task-dialog.component';
import {AuditDialogComponent} from './reports/audit/audit-dialog/audit-dialog.component';
import {DeviceTasksComponent} from './onboarding/device-tasks/device-tasks.component';
import {DeviceDownloadsComponent} from './onboarding/device-downloads/device-downloads.component';
import {DeviceHeartbeatsStatsComponent} from './onboarding/device-heartbeats-stats/device-heartbeats-stats.component';
import {DeviceUpdateLogsComponent} from './onboarding/device-update-logs/device-update-logs.component';
import {EditDeviceDialogComponent} from './onboarding/view-devices/edit-device-dialog/edit-device-dialog.component';
import {DateFilterComponent} from './reports/date-filter/date-filter.component';
import {DownloadingReportsComponent} from './reports/downloading-reports/downloading-reports.component';
import {DialogActionsComponent} from './dialog-actions/dialog-actions.component';
import {ViewBusinessUnitDialogComponent} from './estate/view-business-unit-dialog/view-business-unit-dialog.component';
import {DeviceFtpLogsComponent} from './onboarding/device-ftp-logs/device-ftp-logs.component';
import {DeviceTraceViewComponent} from './onboarding/device-trace-view/device-trace-view.component';
import {AddExtensionComponent} from './masterrecords/add-extension/add-extension.component';
import {EditdevicecustomerComponent} from './onboarding/view-devices/editdevicecustomer/editdevicecustomer.component';
import {OverlayContainer} from '@angular/cdk/overlay';
import {CancelScheduleComponent} from './schedule/listschedule/cancel-schedule/cancel-schedule.component';
import {CommonModulesModule} from './common-modules/common-modules.module';
import {UtilModule} from './util/util.module';
import { CustomerReportsComponent } from './reports/customer-reports/customer-reports.component';
import { OnboardingComponent } from './reports/onboarding/onboarding.component';
import { ManufacturerReportsComponent } from './reports/manufacturer-reports/manufacturer-reports.component';
import { DeviceReportsComponent } from './reports/device-reports/device-reports.component';
import { IngenicoReportsComponent } from './reports/ingenico-reports/ingenico-reports.component';
import { RepairReportsComponent } from './reports/repair-reports/repair-reports.component';
// import {AgencyWebportalModule} from './agency-webportal/agency-webportal.module';
// import { CheckerDialogComponent } from './util/checker-dialog/checker-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        ReactiveFormsModule,
        FormWizardModule,
        TranslateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        PageHeaderModule,
        FormsModule,
        DataTablesModule,
        NgbModule.forRoot(),
        MatStepperModule,
        MatRadioModule,
        MatCardModule,
        MatExpansionModule,
        TreeviewModule.forRoot(),
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        FormWizardModule,
        FileDropModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CovalentDynamicFormsModule,
        CovalentDialogsModule,
        TreeModule,
        CovalentMessageModule,
        CovalentMarkdownModule,
        NgxChartsModule,
        StatModule,
        CovalentExpansionPanelModule,
        MatSlideToggleModule,
        CovalentChipsModule,
        MatAutocompleteModule,
        ModalDialogModule.forRoot(),
        MomentModule,
        NgIdleKeepaliveModule.forRoot(),
        MatTabsModule,
        UtilModule,
        NgxTreeSelectModule.forRoot({
            allowFilter: true,
            filterPlaceholder: 'Type your filter here...',
            maxVisibleItemCount: 10,
            idField: 'unitItemId',
            textField: 'name',
            childrenField: 'children',
            allowParentSelection: true,
            expandMode: ExpandMode.Selection
        }),
        NgxPermissionsModule.forRoot(),
        CommonModulesModule,
        // AgencyWebportalModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        CreatebusinessunitComponent,
        ListbusinessunitComponent,
        ApproveComponent,
        CreateComponent,
        ListComponent,
        TelcomsComponent,
        ManageComponent,
        WhitelistingComponent,
        DeviceMakeComponent,
        CurrenciesComponent,
        DepartmentComponent,
        ListMakeComponent,
        ProductsComponent,
        ApproveMakeComponent,
        CreatedeviceComponent,
        PosparamComponent,
        ParamfileComponent,
        // CheckerActionsComponent,
        MakerActionsComponent,
        DeviceModalComponent,
        DeviceTypeComponent,
        ApproveDeviceTypeComponent,
        ApproveDeviceModelComponent,
        ListBatchfilesComponent,
        ConfirmWhitelistComponent,
        ApproveWhitelistComponent,
        UploadComponent,
        ApproveUploadComponent,
        GlobalConfigsComponent,
        UpdateConfigsComponent,
        ApproveConfigsComponent,
        ApprovedeviceComponent,
        ListdevicescomponentComponent,
        CreatescheduleComponent,
        ApprovescheduleComponent,
        ListscheduleComponent,
        PasswordConfigComponent,
        ListModelComponent,
        ListDeviceTypeComponent,
        ListWhitelistComponent,
        ListAppsComponent,
        PendingmanualComponent,
        CreatedepartmentComponent,
        // ViewentityComponent,
        ProfileComponent,
        CheckerChangesComponent,
        ApprovedepartmentComponent,
        CreatecurrencyComponent,
        ApprovecurrencyComponent,
        ViewcurrencyComponent,
        CreateproductComponent,
        ViewproductComponent,
        ApproveproductComponent,
        CreatetelcomsComponent,
        ViewtelcomsComponent,
        ApprovetelcomsComponent,
        ViewdepartmentComponent,
        // CapitalizePipe,
        ViewbusinessunitComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        DashboardComponent,
        AuditComponent,
        HeartbeatsComponent,
        DevicesreportsComponent,
        DownloadsComponent,
        ViewDevicesComponent,
        ExportDataComponent,
        ViewTasksComponent,
        // ModalViewEntityComponent,
        DevicesListingComponent,
        OrganizationHierachyComponent,
        ReleaseDeviceComponent,
        DecommissionDeviceComponent,
        DeviceHistoryComponent,
        InventoryActionsComponent,
        AllDevicesReportsComponent,
        WhiteListedReportsComponent,
        OnboardedDeviceReportsComponent,
        DecommissionedReportsComponent,
        ReleasedDevicesReportsComponent,
        CompletedDownloadsReportsComponent,
        FailedDowloadsReportsComponent,
        ScheduledDownloadsReportsComponent,
        AllSchedulesReportsComponent,
        MakerDialogComponent,
        // CheckerDialogComponent,
        ReleaseDialogComponent,
        DecommisionViewComponent,
        ConfigDialogComponent,
        DeviceListTemplateComponent,
        UnitDialogComponent,
        TaskDialogComponent,
        AuditDialogComponent,
        DeviceTasksComponent,
        DeviceDownloadsComponent,
        DeviceHeartbeatsStatsComponent,
        DeviceUpdateLogsComponent,
        EditDeviceDialogComponent,
        DateFilterComponent,
        DownloadingReportsComponent,
        DialogActionsComponent,
        ViewBusinessUnitDialogComponent,
        DeviceFtpLogsComponent,
        DeviceTraceViewComponent,
        AddExtensionComponent,
        EditdevicecustomerComponent,
        CancelScheduleComponent,
        CustomerReportsComponent,
        OnboardingComponent,
        ManufacturerReportsComponent,
        DeviceReportsComponent,
        IngenicoReportsComponent,
        RepairReportsComponent,
    ],
    entryComponents: [
        MakerDialogComponent,
        ReleaseDialogComponent,
        ConfigDialogComponent,
        UnitDialogComponent,
        AuditDialogComponent,
        TaskDialogComponent,
        EditDeviceDialogComponent,
        DialogActionsComponent,
        ViewBusinessUnitDialogComponent,
        DeviceTraceViewComponent,
        EditdevicecustomerComponent,
        CancelScheduleComponent,
    ],
    providers: [
        PosParamControlService,
        PosParamService,
        UserRolesPermissions,
        Notify,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        }, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class LayoutModule {
    constructor(overlayContainer: OverlayContainer) {
        overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    }
}

