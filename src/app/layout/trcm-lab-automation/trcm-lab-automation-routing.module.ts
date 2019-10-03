import { CodesErrorComponent } from './modules-common/codes-error/codes-error.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomeronboardingComponent } from './onboarding/customeronboarding/customeronboarding.component';
import { AuthGuard } from '../../shared';
import { CreateCustomersComponent } from './onboarding/customeronboarding/create-customers/create-customers.component';
import { ApproveCustomersComponent } from './onboarding/customeronboarding/approve-customers/approve-customers.component';
import { ManufactureronboardingComponent } from './onboarding/manufactureronboarding/manufactureronboarding.component';
import { CreateManufacturersComponent } from './onboarding/manufactureronboarding/create-manufacturers/create-manufacturers.component';
import { DeviceonboardingComponent } from './onboarding/deviceonboarding/deviceonboarding.component';
import { CreateDeviceComponent } from './onboarding/deviceonboarding/create-device/create-device.component';
import { ApproveDeviceComponent } from './onboarding/deviceonboarding/approve-device/approve-device.component';
import { ApproveManufacturerComponent } from './onboarding/manufactureronboarding/approve-manufacturer/approve-manufacturer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReceivingComponent } from './components/receiving/receiving.component';
import { ScreeningComponent } from './components/screening/screening.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { AssigningComponent } from './components/assigning/assigning.component';
import { RepairComponent } from './components/repair/repair.component';
import { PartsOnboardingComponent } from './parts/parts-onboarding/parts-onboarding.component';
import { PartsHistoryComponent } from './parts/parts-history/parts-history.component';
import { PartsComponent } from './parts/parts.component';
import { ApprovePartsComponent } from './parts/approve-parts/approve-parts.component';
import { FirstquarterComponent } from './parts/firstquarter/firstquarter.component';
import { SecondquarterComponent } from './parts/secondquarter/secondquarter.component';
import { ThirdquarterComponent } from './parts/thirdquarter/thirdquarter.component';
import { ViewPartsComponent } from './parts/view-parts/view-parts.component';
import { ReportsComponent } from './parts/reports/reports.component';
import { ToolsComponent } from './parts/tools/tools.component';
import { ToolsOnboardingComponent } from './parts/tools-onboarding/tools-onboarding.component';
import { ViewCustomersComponent } from './onboarding/customeronboarding/view-customers/view-customers.component';
import { ViewManufacturersComponent } from './onboarding/manufactureronboarding/view-manufacturers/view-manufacturers.component';
import { ViewDevicesComponent } from './onboarding/deviceonboarding/view-devices/view-devices.component';
import { CreateDevicesComponent } from './components/receiving/create-devices/create-devices.component';
import { UpdateContractperiodComponent } from './onboarding/deviceonboarding/update-contractperiod/update-contractperiod.component';
import { SetcontractComponent } from './onboarding/deviceonboarding/setcontract/setcontract.component';
import { SetwarrantyComponent } from './onboarding/deviceonboarding/setwarranty/setwarranty.component';
import { CreateComponent } from './components/assigning/create/create.component';
import { ApproveDevicesComponent } from './components/receiving/approve-devices/approve-devices.component';
import { EditDevicesComponent } from './components/receiving/edit-devices/edit-devices.component';
import { UpdateDevicesComponent } from './components/repair/update-devices/update-devices.component';
import { ViewComponent } from './components/diagnosis/view/view.component';
import { DisplayComponent } from './components/diagnosis/display/display.component';
import { DisplayDevicesComponent } from './components/receiving/display-devices/display-devices.component';
import { ApproveDiagnosisComponent } from './components/diagnosis/approve-diagnosis/approve-diagnosis.component';
import { ApproveComponent } from './components/assigning/approve/approve.component';
import { ApproveRepairComponent } from './components/repair/approve-repair/approve-repair.component';
import { ShippedComponent } from './components/shipped/shipped.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ViewScreeningComponent } from './components/screening/view-screening/view-screening.component';
import { ApproveScreeningComponent } from './components/screening/approve-screening/approve-screening.component';
import { ApproveShippedComponent } from './components/shipped/approve-shipped/approve-shipped.component';
import { ViewShippedComponent } from './components/shipped/view-shipped/view-shipped.component';
import { ViewDeliveryComponent } from './components/delivery/view-delivery/view-delivery.component';
import { ApproveDeliveryComponent } from './components/delivery/approve-delivery/approve-delivery.component';
import { ViewAssigningComponent } from './components/assigning/view-assigning/view-assigning.component';
import { DeviceModelsComponent } from './onboarding/device-models/device-models.component';
import { CreatedeviceModelsComponent } from './onboarding/device-models/createdevice-models/createdevice-models.component';
import { ApprovedeviceModelsComponent } from './onboarding/device-models/approvedevice-models/approvedevice-models.component';
import { ViewDevicemodelsComponent } from './onboarding/device-models/view-devicemodels/view-devicemodels.component';
import { TechnicianComponent } from './components/technician/technician.component';
import { AreaChartStackedComponent } from '@swimlane/ngx-charts';
import { OneoffDevicesComponent } from './onboarding/deviceonboarding/oneoff-devices/oneoff-devices.component';
import { SingleDevicesComponent } from './onboarding/deviceonboarding/single-devices/single-devices.component';
import { PartsmasterComponent } from './parts/partsmaster/partsmaster.component';
import { ApprovepartsmasterComponent } from './parts/partsmaster/approvepartsmaster/approvepartsmaster.component';
import { CreatepartsmasterComponent } from './parts/partsmaster/createpartsmaster/createpartsmaster.component';

import { ApproveordersComponent } from './parts/ordering/approveorders/approveorders.component';
import { PartsIssuedComponent } from './parts/parts-issued/parts-issued.component';
import { CreatepartsIssuedComponent } from './parts/parts-issued/createparts-issued/createparts-issued.component';
import { ApprovepartsIssuedComponent } from './parts/parts-issued/approveparts-issued/approveparts-issued.component';
import { OrderingComponent } from './parts/ordering/ordering.component';
import { ViewordersComponent } from './parts/ordering/vieworders/vieworders.component';
import { CreateordersComponent } from './parts/ordering/createorders/createorders.component';
import { CreatestockComponent } from './parts/stock/createstock/createstock.component';
import { ApprovestockComponent } from './parts/stock/approvestock/approvestock.component';
import { ViewpartsissuedComponent } from './parts/parts-issued/viewpartsissued/viewpartsissued.component';
import { ViewstockComponent } from './parts/stock/viewstock/viewstock.component';
import { QuartersComponent } from './parts/quarters/quarters.component';
import { StockComponent } from './parts/stock/stock.component';
import { PartsrequsitionComponent } from './parts/partsrequsition/partsrequsition.component';
import { FourthquarterComponent } from './parts/fourthquarter/fourthquarter.component';
import {AssignTechComponent} from './components/assigning/assign-tech/assign-tech.component';
import { CreatePartsrequisitionComponent } from './parts/partsrequsition/create-partsrequisition/create-partsrequisition.component';
import { ReceivedordersComponent } from './components/receivedorders/receivedorders.component';
import { InstocksComponent } from './components/instocks/instocks.component';
import { ReorderingComponent } from './components/reordering/reordering.component';
import { SentordersComponent } from './components/sentorders/sentorders.component';
import { ViewsentordersComponent } from './components/viewsentorders/viewsentorders.component';
import { ApprovePartsrequisitionComponent } from './parts/partsrequsition/approve-partsrequisition/approve-partsrequisition.component';
import { DeviceHistoryComponent } from './components/device-history/device-history.component';
import { EditTechnicianComponent } from './components/technician/edit-technician/edit-technician.component';
import { DeviceReportsComponent } from './components/device-reports/device-reports.component';
import { EditpartrequisitionComponent } from './parts/partsrequsition/editpartrequisition/editpartrequisition.component';
import { PendingordersComponent } from './components/pendingorders/pendingorders.component';
import { AprrovependingordersComponent } from './components/pendingorders/aprrovependingorders/aprrovependingorders.component';
import { ViewPartRequisitionComponent } from './parts/partsrequsition/view-part-requisition/view-part-requisition.component';
import { EditPendingOrdersComponent } from './components/pendingorders/edit-pending-orders/edit-pending-orders.component';
import { ViewPendingOrdersComponent } from './components/pendingorders/view-pending-orders/view-pending-orders.component';
import { EditPartsIssuedComponent } from './parts/parts-issued/edit-parts-issued/edit-parts-issued.component';
import { EditPartsComponent } from './parts/parts-onboarding/edit-parts/edit-parts.component';
const routes: Routes = [
    {
        path: 'components/pendingorders/aprrovependingorders',
        component:   AprrovependingordersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/parts-issued/edit-parts-issued/:id/update',
        component: EditPartsIssuedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/parts-onboarding/edit-parts/:id/update',
        component:  EditPartsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/pendingorders',
        component:   PendingordersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/partsrequsition/view-part-requisition/:id/view',
        component:   ViewPartRequisitionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/pendingorders/view-pending-orders/:id/view',
        component:   ViewPendingOrdersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/partsrequsition/approve-partsrequisition',
        component:   ApprovePartsrequisitionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/partsrequsition/editpartrequisition/:id/update',
        component: EditpartrequisitionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/pendingorders/edit-pending-orders/:id/update',
        component: EditPendingOrdersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/viewsentorders',
        component:  ViewsentordersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/reordering',
        component:  ReorderingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/sentorders',
        component:  SentordersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/receivedorders',
        component: ReceivedordersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/instocks',
        component: InstocksComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/customer-onboarding',
        component: CustomeronboardingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/customer-onboarding/create-customers',
        component: CreateCustomersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/customer-onboarding/:id/update',
        component: CreateCustomersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/customer-onboarding/approve-customers',
        component: ApproveCustomersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/customer-onboarding/:id/view',
        component: ViewCustomersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/manufacturer-onboarding',
        component: ManufactureronboardingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/manufacturer-onboarding/create-manufacturer',
        component: CreateManufacturersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/manufacturer-onboarding/:id/create-manufacturer',
        component: CreateManufacturersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/manufacturer-onboarding/:id/view',
        component: ViewManufacturersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/manufacturer-onboarding/approve-manufacturer',
        component: ApproveManufacturerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding',
        component: DeviceonboardingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-models',
        component: DeviceModelsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-models/:id/view',
        component: ViewDevicemodelsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-models/:id/update',
        component: CreatedeviceModelsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/create-models',
        component: CreatedeviceModelsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/oneoffdevices',
        component: OneoffDevicesComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'onboarding/ordering',
        component: OrderingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/approveparts',
        component: ApprovepartsmasterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/viewparts/:id/update',
        component: ViewPartsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/viewstock/:id/view',
        component: ViewstockComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/quarters',
        component: QuartersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/createstock/:id/update',
        component: CreatestockComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/createparts',
        component: CreatepartsmasterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/partsmaster',
        component: PartsmasterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/createorders',
        component: CreateordersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/createorders/:id/update',
        component: CreateordersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/vieworders/:id/view',
        component: ViewordersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/fourthquarter',
        component: FourthquarterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/approveorders',
        component: ApproveordersComponent,
        canActivate: [AuthGuard]
    },
   {
        path: 'parts/viewparts/:id/view',
        component: ViewpartsissuedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/partsIssued',
        component: PartsIssuedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/createIssuedparts',
        component: CreatepartsIssuedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/createIssuedparts/:id/update',
        component: CreatepartsIssuedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/approveIssuedparts',
        component: ApprovepartsIssuedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/oneoffrepair',
        component: OneoffDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/singledevices',
        component: SingleDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/singleDevices',
        component: SingleDevicesComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'onboarding/approve-models',
        component: ApprovedeviceModelsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/view-models',
        component: ViewDevicemodelsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/create-device',
        component: CreateDeviceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/update-contractperiod/:id/edit',
        component: UpdateContractperiodComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/approve-device',
        component: ApproveDeviceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/:id/view',
        component: ViewDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/setcontract',
        component: SetcontractComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/setwarranty',
        component: SetwarrantyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/:id/create-device',
        component: CreateDeviceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/approve-device',
        component: ApproveDeviceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'onboarding/device-onboarding/:id/view',
        component: ViewDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/receiving',
        component: ReceivingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/receiving/create-devices',
        component: CreateDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/receiving/approve-devices',
        component: ApproveDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/receiving/display-devices/:id/view',
        component: DisplayDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/receiving/edit-devices/:id/edit',
        component: EditDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/screening',
        component: ScreeningComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/screening/view-screening',
        component: ViewScreeningComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/screening/view-screening/:id/update',
        component: ViewScreeningComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/screening/view-screening/:id/view',
        component: ViewScreeningComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/screening/approve-screening',
        component: ApproveScreeningComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/diagnosis',
        component: DiagnosisComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/diagnosis/approve-diagnosis',
        component: ApproveDiagnosisComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/diagnosis/display',
        component: DisplayComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/diagnosis/display/:id/view',
        component: DisplayComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/diagnosis/update',
        component: ViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/diagnosis/update/:id/update',
        component: ViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/assigning',
        component: AssigningComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'components/assigning/assign-tech',
      component: AssignTechComponent,
      canActivate: [AuthGuard]
    },
    {
        path: 'components/assigning/create',
        component: CreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/assigning/create/:id/edit',
        component: CreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/assigning/approve',
        component: ApproveComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/assigning/view-assigning/:id/view',
        component: ViewAssigningComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/repair',
        component: RepairComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/repair/approve-repair',
        component: ApproveRepairComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/repair/update-devices',
        component: UpdateDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/repair/update-devices/:id/edit',
        component: UpdateDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/device-history',
        component: DeviceHistoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/device-reports',
        component: DeviceReportsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/technician',
        component: TechnicianComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/technician/edit-technician/:id/edit',
        component: EditTechnicianComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/shipped',
        component: ShippedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/shipped/approve-shipped',
        component: ApproveShippedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/shipped/view-shipped',
        component: ViewShippedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/shipped/view-shipped/:id/edit',
        component: ViewShippedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/shipped/view-shipped/:id/view',
        component: ViewShippedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/delivery',
        component: DeliveryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/delivery/approve-delivery',
        component: ApproveDeliveryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/delivery/view-delivery',
        component: ViewDeliveryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/delivery/view-delivery/:id/edit',
        component: ViewDeliveryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'components/delivery/view-delivery/:id/view',
        component: ViewDeliveryComponent,
        canActivate: [AuthGuard]
    },
    { path: 'parts/parts-onboarding', component: PartsOnboardingComponent },
    {
        path: 'parts/parts-onboarding/:id/update',
        component: PartsOnboardingComponent
    },
    { path: 'parts/view-parts/:id/view', component: ViewPartsComponent },
    {
        path: 'parts/parts-history',
        component: PartsHistoryComponent,
        canActivate: [AuthGuard]
    },
    { path: 'parts', component: PartsComponent, canActivate: [AuthGuard] },
    {
        path: 'parts/approve-parts',
        component: ApprovePartsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/firstquarter',
        component: FirstquarterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/secondquarter',
        component: SecondquarterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/thirdquarter',
        component: ThirdquarterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/partsrequstion',
        component: PartsrequsitionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/partsrequsition/create-partsrequisition',
        component: CreatePartsrequisitionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/reports',
        component: ReportsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/stock',
        component: StockComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/createstock',
        component: CreatestockComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/approvestock',
        component: ApprovestockComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/tools',
        component: ToolsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parts/tools-onboarding',
        component: ToolsOnboardingComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrcmLabAutomationRoutingModule {}
