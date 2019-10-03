
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import {
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatCheckboxModule,
  MatRadioModule,

} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';


import { TrcmLabAutomationRoutingModule } from './trcm-lab-automation-routing.module';
import { CustomeronboardingComponent } from './onboarding/customeronboarding/customeronboarding.component';
import { CreateCustomersComponent } from './onboarding/customeronboarding/create-customers/create-customers.component';
import { ApproveCustomersComponent } from './onboarding/customeronboarding/approve-customers/approve-customers.component';
import { ManufactureronboardingComponent } from './onboarding/manufactureronboarding/manufactureronboarding.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { SharedService } from '../../shared/shared.service';


import { PartsComponent } from './parts/parts.component';
import { PartsHistoryComponent } from './parts/parts-history/parts-history.component';
import { PartsOnboardingComponent } from './parts/parts-onboarding/parts-onboarding.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { PageHeaderModule } from '../../shared';
import { DeleteDialogComponent } from '../util/delete-component/delete-dialog/delete-dialog.component';
import { ApprovePartsComponent } from './parts/approve-parts/approve-parts.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReceivingComponent } from './components/receiving/receiving.component';
import { ScreeningComponent } from './components/screening/screening.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { AssigningComponent } from './components/assigning/assigning.component';
import { RepairComponent } from './components/repair/repair.component';
import { DeviceonboardingComponent } from './onboarding/deviceonboarding/deviceonboarding.component';
import { CreateManufacturersComponent } from './onboarding/manufactureronboarding/create-manufacturers/create-manufacturers.component';
import { CreateDeviceComponent } from './onboarding/deviceonboarding/create-device/create-device.component';
import { ApproveDeviceComponent } from './onboarding/deviceonboarding/approve-device/approve-device.component';
import { ApproveManufacturerComponent } from './onboarding/manufactureronboarding/approve-manufacturer/approve-manufacturer.component';



import { CodesErrorComponent } from './modules-common/codes-error/codes-error.component';
import { CreateComponent } from './components/assigning/create/create.component';
import { ApproveComponent } from './components/assigning/approve/approve.component';
import { ViewCustomersComponent } from './onboarding/customeronboarding/view-customers/view-customers.component';
import { ViewManufacturersComponent } from './onboarding/manufactureronboarding/view-manufacturers/view-manufacturers.component';
import { ViewDevicesComponent } from './onboarding/deviceonboarding/view-devices/view-devices.component';

import { DeliveryComponent } from './components/delivery/delivery.component';
import { CreateDevicesComponent } from './components/receiving/create-devices/create-devices.component';
import { UpdateContractperiodComponent } from './onboarding/deviceonboarding/update-contractperiod/update-contractperiod.component';
import { SetcontractComponent } from './onboarding/deviceonboarding/setcontract/setcontract.component';
import { SetwarrantyComponent } from './onboarding/deviceonboarding/setwarranty/setwarranty.component';

import {SelectModule} from 'ng2-select';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ApproveDevicesComponent } from './components/receiving/approve-devices/approve-devices.component';
import { EditDevicesComponent } from './components/receiving/edit-devices/edit-devices.component';
import { UpdateDevicesComponent } from './components/repair/update-devices/update-devices.component';
import { ViewComponent } from './components/diagnosis/view/view.component';
import { DisplayComponent } from './components/diagnosis/display/display.component';
import { FirstquarterComponent } from './parts/firstquarter/firstquarter.component';
import { SecondquarterComponent } from './parts/secondquarter/secondquarter.component';
import { ThirdquarterComponent } from './parts/thirdquarter/thirdquarter.component';
import { ViewPartsComponent } from './parts/view-parts/view-parts.component';
import { ReportsComponent } from './parts/reports/reports.component';
import { ToolsComponent } from './parts/tools/tools.component';
import { ToolsOnboardingComponent } from './parts/tools-onboarding/tools-onboarding.component';
import { DisplayDevicesComponent } from './components/receiving/display-devices/display-devices.component';
import { ShippedComponent } from './components/shipped/shipped.component';
import { ApproveDiagnosisComponent } from './components/diagnosis/approve-diagnosis/approve-diagnosis.component';
import { ApproveRepairComponent } from './components/repair/approve-repair/approve-repair.component';
import { ApproveScreeningComponent } from './components/screening/approve-screening/approve-screening.component';
import { ViewScreeningComponent } from './components/screening/view-screening/view-screening.component';
import { ViewShippedComponent } from './components/shipped/view-shipped/view-shipped.component';
import { ApproveShippedComponent } from './components/shipped/approve-shipped/approve-shipped.component';
import { ApproveDeliveryComponent } from './components/delivery/approve-delivery/approve-delivery.component';
import { ViewDeliveryComponent } from './components/delivery/view-delivery/view-delivery.component';
import { ViewAssigningComponent } from './components/assigning/view-assigning/view-assigning.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DeviceModelsComponent } from './onboarding/device-models/device-models.component';
import { ApprovedeviceModelsComponent } from './onboarding/device-models/approvedevice-models/approvedevice-models.component';
import { CreatedeviceModelsComponent } from './onboarding/device-models/createdevice-models/createdevice-models.component';
import { ViewDevicemodelsComponent } from './onboarding/device-models/view-devicemodels/view-devicemodels.component';
import { TechnicianComponent } from './components/technician/technician.component';
import { OneoffDevicesComponent } from './onboarding/deviceonboarding/oneoff-devices/oneoff-devices.component';
import { SingleDevicesComponent } from './onboarding/deviceonboarding/single-devices/single-devices.component';
import { FourthquarterComponent } from './parts/fourthquarter/fourthquarter.component';
import { OrderingComponent } from './parts/ordering/ordering.component';
import { PartsmasterComponent } from './parts/partsmaster/partsmaster.component';
import { ApproveordersComponent } from './parts/ordering/approveorders/approveorders.component';
import { CreateordersComponent } from './parts/ordering/createorders/createorders.component';
import { ApprovepartsmasterComponent } from './parts/partsmaster/approvepartsmaster/approvepartsmaster.component';
import { CreatepartsmasterComponent } from './parts/partsmaster/createpartsmaster/createpartsmaster.component';
import { ViewordersComponent } from './parts/ordering/vieworders/vieworders.component';
import { PartsIssuedComponent } from './parts/parts-issued/parts-issued.component';
import { CreatepartsIssuedComponent } from './parts/parts-issued/createparts-issued/createparts-issued.component';
import { ApprovepartsIssuedComponent } from './parts/parts-issued/approveparts-issued/approveparts-issued.component';
import { StockComponent } from './parts/stock/stock.component';
import { CreatestockComponent } from './parts/stock/createstock/createstock.component';
import { ApprovestockComponent } from './parts/stock/approvestock/approvestock.component';
import { ViewpartsissuedComponent } from './parts/parts-issued/viewpartsissued/viewpartsissued.component';
import { ViewstockComponent } from './parts/stock/viewstock/viewstock.component';
import { QuartersComponent } from './parts/quarters/quarters.component';
import { PartsrequsitionComponent } from './parts/partsrequsition/partsrequsition.component';
import { AssignTechComponent } from './components/assigning/assign-tech/assign-tech.component';
import { AllocateDevicesComponent } from './components/assigning/allocate-devices/allocate-devices.component';
import { AssignDialogComponent } from './components/assigning/assign-dialog/assign-dialog.component';
import { EditTechnicianComponent } from './components/technician/edit-technician/edit-technician.component';
import { UtilModule } from '../util/util.module';
import { CreatePartsrequisitionComponent } from './parts/partsrequsition/create-partsrequisition/create-partsrequisition.component';
import { ReceivedordersComponent } from './components/receivedorders/receivedorders.component';
import { InstocksComponent } from './components/instocks/instocks.component';
import { ReorderingComponent } from './components/reordering/reordering.component';
import { SentordersComponent } from './components/sentorders/sentorders.component';
import { ViewsentordersComponent } from './components/viewsentorders/viewsentorders.component';
import { ApprovePartsrequisitionComponent } from './parts/partsrequsition/approve-partsrequisition/approve-partsrequisition.component';
import { DeviceHistoryComponent } from './components/device-history/device-history.component';
import { DeviceReportsComponent } from './components/device-reports/device-reports.component';
import { EditpartrequisitionComponent } from './parts/partsrequsition/editpartrequisition/editpartrequisition.component';
import { PendingordersComponent } from './components/pendingorders/pendingorders.component';
import { ViewreceivedordersComponent } from './components/viewreceivedorders/viewreceivedorders.component';
import { AprrovependingordersComponent } from './components/pendingorders/aprrovependingorders/aprrovependingorders.component';
import { ViewPartRequisitionComponent } from './parts/partsrequsition/view-part-requisition/view-part-requisition.component';
import { EditPendingOrdersComponent } from './components/pendingorders/edit-pending-orders/edit-pending-orders.component';
import { ViewPendingOrdersComponent } from './components/pendingorders/view-pending-orders/view-pending-orders.component';
import { EditPartsIssuedComponent } from './parts/parts-issued/edit-parts-issued/edit-parts-issued.component';
import { EditPartsComponent } from './parts/parts-onboarding/edit-parts/edit-parts.component';


@NgModule({
    declarations: [
    DashboardComponent,
    ReceivingComponent,
    ScreeningComponent,
    DiagnosisComponent,
    AssigningComponent,
    RepairComponent,
    CreateComponent,
    ApproveComponent,
    ApprovePartsComponent,
    ApproveManufacturerComponent,
    CustomeronboardingComponent,
    DeviceonboardingComponent,
    CodesErrorComponent,
    CreateCustomersComponent,
    ApproveCustomersComponent,
    ManufactureronboardingComponent,
    CreateManufacturersComponent,
    DeviceonboardingComponent,
    CreateDeviceComponent,
    ApproveDeviceComponent,
    ApproveManufacturerComponent,
    ApprovePartsComponent,
    PartsComponent,
    PartsHistoryComponent,
    PartsOnboardingComponent,
    ViewCustomersComponent,
    ViewManufacturersComponent,
    ViewDevicesComponent,
    DeliveryComponent,
    CreateDevicesComponent,
    UpdateContractperiodComponent,
    SetcontractComponent,
    SetwarrantyComponent,
    ApproveDevicesComponent,
    EditDevicesComponent,
    UpdateDevicesComponent,
    ViewComponent,
    DisplayComponent,
    FirstquarterComponent,
    SecondquarterComponent,
    ThirdquarterComponent,
    ViewPartsComponent,
    ReportsComponent,
    ToolsComponent,
    ToolsOnboardingComponent,
    DisplayDevicesComponent,
    ShippedComponent,
    ApproveDiagnosisComponent,
    ApproveRepairComponent,
    ApproveScreeningComponent,
    ViewScreeningComponent,
    ViewShippedComponent,
    ApproveShippedComponent,
    ApproveDeliveryComponent,
    ViewDeliveryComponent,
    ViewAssigningComponent,
    DeviceModelsComponent,
    ApprovedeviceModelsComponent,
    CreatedeviceModelsComponent,
    ViewDevicemodelsComponent,
    TechnicianComponent,
    OneoffDevicesComponent,
    SingleDevicesComponent,
    FourthquarterComponent,
    OrderingComponent,
    PartsmasterComponent,
    ApproveordersComponent,
    CreateordersComponent,
    ApprovepartsmasterComponent,
    CreatepartsmasterComponent,
    ViewordersComponent,
    PartsIssuedComponent,
    CreatepartsIssuedComponent,
    ApprovepartsIssuedComponent,
    StockComponent,
    CreatestockComponent,
    ApprovestockComponent,
    ViewpartsissuedComponent,
    ViewstockComponent,
    QuartersComponent,
    PartsrequsitionComponent,
    AssignTechComponent,
    AllocateDevicesComponent,
    AssignDialogComponent,
    EditTechnicianComponent,
    CreatePartsrequisitionComponent,
    ReceivedordersComponent,
    InstocksComponent,
    ReorderingComponent,
    SentordersComponent,
    ViewsentordersComponent,
    ApprovePartsrequisitionComponent,
    DeviceHistoryComponent,
    DeviceReportsComponent,
    EditpartrequisitionComponent,
    PendingordersComponent,
    ViewreceivedordersComponent,
    AprrovependingordersComponent,
    ViewPartRequisitionComponent,
    EditPendingOrdersComponent,
    ViewPendingOrdersComponent,
    EditPartsIssuedComponent,
    EditPartsComponent,

  ],

  imports: [
      MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
    PageHeaderModule,
    UiSwitchModule,
    ChartsModule,
    UtilModule,
    TrcmLabAutomationRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    SelectModule
  ],

  providers: [
    SharedService
  ],

  entryComponents: [
    // CheckerDialogComponent,
    // EditDialogComponent,
      AllocateDevicesComponent,
    DeleteDialogComponent,
      AssignDialogComponent,
  ]

})
export class TrcmLabAutomationModule { }
