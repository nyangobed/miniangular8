import {Component, OnInit, QueryList, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {BusinessItem} from '../../../entities/param-business-unit';
import {Product} from '../../../entities/product-model';
import {ParamConfig} from '../../../entities/param-template';
import {Apps} from '../../../entities/apps-model';
import {UploadEvent, UploadFile} from 'ngx-file-drop/src/lib/ngx-drop';
import {ITdDynamicElementConfig, TdDynamicFormsComponent} from '@covalent/dynamic-forms';
import {Currency} from '../../../entities/currency-model';
import {Telco} from '../../../entities/telcos-model';
import {ViewParamBase} from '../../../shared/base/viewParamBase';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {ActivatedRoute} from '@angular/router';
import {Devices} from '../../../entities/devices-list-model';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AddTaskWrapper} from '../../../entities/wrappers/AddTaskWrapper';
import {OnboardingtWrapper} from '../../../entities/wrappers/onboarding-wrapper';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {BusinessUnitItem} from '../../../entities/param-business-unit-item-model';
import {DeviceWhitelist} from '../../../entities/device-whitelist';
import {EditDeviceDialogComponent} from './edit-device-dialog/edit-device-dialog.component';
import {CheckerActions} from '../../../entities/wrappers/checker-actions';
import {TdDialogService} from '@covalent/core/dialogs';
import {DataTableDirective} from 'angular-datatables';
import {EditdevicecustomerComponent} from './editdevicecustomer/editdevicecustomer.component';
import {CancelScheduleComponent} from '../../schedule/listschedule/cancel-schedule/cancel-schedule.component';
import {CreateDeviceCustomerWrapper} from '../../../entities/wrappers/create-device-customer-wrapper';

@Component({
    selector: 'app-view-devices',
    templateUrl: './view-devices.component.html',
    styleUrls: ['./view-devices.component.scss'],
    animations: [routerTransition()]
})
export class ViewDevicesComponent implements OnInit {
    model: OnboardingtWrapper;
    paramCheck: any = {
        configureParam: false,
        attachApp: false,
        attachFiles: false
    };
    devicemodels: any[];

    public items;
    public AllowParentSelection = true;
    public ShowFilter = true;
    public Disabled = false;
    public FilterPlaceholder = 'Type Estate Name...';
    public MaxDisplayed = 10;
    products: Array<Product>;
    bizzUnits: any[];
    bizzUnit: BusinessItem;
    posparams: Array<any>;
    simpleSelected: any = {};
    params: Array<ParamConfig>;
    apps: Array<Apps>;

    filed: File[] = [];

    //for file uploads
    public files: UploadFile[] = [];

    isCompleted = false;

    elements: ITdDynamicElementConfig[] = [];

    @ViewChild('paramForm')
    _myForm: QueryList<TdDynamicFormsComponent>;

    public isUpdate = false;

    color = 'primary';
    checked = false;
    disabled = false;

    currencies: Array<Currency>;
    simcard: Array<Telco>;


    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    device: Devices;
    whiteListparam: Array<ViewParamBase>;
    estateParam: Array<ViewParamBase>;
    merchantParam: Array<ViewParamBase>;

    formGroup: FormGroup;
    modal: NgbModalRef;

    showDropandDrag = false;
    downloadType: string;
    showAppSelect = false;
    task: AddTaskWrapper;


    serialNo: string;
    deviceId: any;

    businessUnit: BusinessUnitItem;
    whitelist: DeviceWhitelist;


    checkerActions: CheckerActions<any>;
    selectedIds: Array<any>;

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;
    deviceCustomer: CreateDeviceCustomerWrapper;

    constructor(private _dialogService: TdDialogService, private _viewContainerRef: ViewContainerRef, public dialog: MatDialog, private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, protected modalService: NgbModal) {
        this.currencies = [];
        this.simcard = [];
        this.viewparam = [];
        this.device = new Devices();
        this.whiteListparam = [];
        this.estateParam = [];
        this.task = new AddTaskWrapper();
        this.model = new OnboardingtWrapper();
        this.businessUnit = new BusinessUnitItem();
        this.whitelist = new DeviceWhitelist();
        this.checkerActions = new CheckerActions();
        this.selectedIds = [];
        this.deviceCustomer = new CreateDeviceCustomerWrapper();
        this.merchantParam = [];
    }


    ngOnInit() {
        this.formGroup = new FormGroup({
            action: new FormControl()
        });

        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Approved');
        this.stewardService.get('device/model', params).subscribe(response => {
                if (response.code == 200) {
                    this.devicemodels = response.data.content;
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });

        this.stewardService.get('products', params).subscribe(response => {
                if (response.code === 200) {
                    this.products = response.data.content;
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });


        this.stewardService.get('mno', params).subscribe(response => {
                if (response.code == 200) {
                    this.simcard = response.data.content;
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });

        this.stewardService.get('currencies', params).subscribe(response => {
                if (response.code === 200) {
                    this.currencies = response.data.content;
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });

        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.deviceId = params['id'];
                this.fetchDevice(params['id']);
                this.fetchBusinessUnit(params['id']);
                this.fetchWhiteListDetails(params['id']);
                this.loadMerchant(params['id']);
            }
        });


    }

    fetchDevice(id: number): any {
        const inst = this;
        this.stewardService.get('devices/' + id).subscribe(response => {
            if (response.code == 200) {
                inst.device = response.data;
                inst.task.deviceId = inst.device.deviceId;
                inst.task.modelId = inst.device.modelId.modelId;

                inst.serialNo = inst.device.serialNo;

                inst.model.modelId = response.data.modelId.modelId;
                inst.model.partNumber = response.data.partNumber;
                inst.model.tid = response.data.tid;
                inst.model.deviceId = response.data.deviceId;

                inst.model.serialNo = response.data.serialNo;

                const order = 1;

                inst.viewparam.push({
                    value: response.data.serialNo,
                    label: 'Serial Number',
                    order: order,
                });

                inst.viewparam.push({
                    value: response.data.modelId.make.make,
                    label: 'Manufacturer',
                    order: order,
                });

                inst.viewparam.push({
                    value: response.data.modelId.deviceType.type,
                    label: 'Type',
                    order: order,
                });
                inst.viewparam.push({
                    value: response.data.modelId.model,
                    label: 'Model',
                    order: order,
                });


                const item: any[] = [];
                item.push(this.simpleSelected);
                this.items = item;

                this.setAppVersionDropdown();
            } else {
                this.notify.showWarning('Sorry record not found');
                this.isUpdate = false;
            }
        });
    }

    fetchBusinessUnit(id: any): void {
        const inst = this;
        const order = 0;
        this.stewardService.get('business-units/unititems/device/' + id).subscribe(response => {
            if (response.code == 200) {
                this.businessUnit = response.data;
                inst.estateParam.push({
                    value: this.businessUnit.unitSource.productId.productName,
                    label: 'Business Unit',
                    order: order,
                });

                inst.estateParam.push({
                    value: this.businessUnit.unitSource.unitName,
                    label: 'Estate Name',
                    order: order,
                });
                inst.estateParam.push({
                    value: this.businessUnit.description,
                    label: 'Description',
                    order: order,
                });
            } else {
                this.notify.showWarning('Sorry record not found');
                this.isUpdate = false;
            }
        });
    }


    fetchWhiteListDetails(id: any): void {
        const inst = this;
        const order = 0;
        this.stewardService.get('device/whitelist/serial/' + id).subscribe(response => {
            if (response.code === 200) {
                this.whitelist = response.data;

                inst.whiteListparam.push({
                    value: this.whitelist.serialNo,
                    label: 'Serial No',
                    order: order,
                });

                inst.whiteListparam.push({
                    value: new Date(this.whitelist.creationDate).toLocaleString(),
                    label: 'Date Whitelisted',
                    order: order,
                });
            } else {
                this.notify.showWarning('Sorry record not found');
                this.isUpdate = false;
            }
        });
    }

    addNewTask(content: any) {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '500px',
            data: {
                data: this.device,
                product: this.businessUnit.unitSource.productId
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }

    updateD(content: any) {
        // this.modal = this.modalService.open(content);
        const dialogRef = this.dialog.open(EditDeviceDialogComponent, {
            width: '500px',
            data: {
                data: this.device,
                productId: this.businessUnit.unitSource.productId.productId
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }

    updateCustomerParameters(content: any) {
        const dialogRef = this.dialog.open(EditdevicecustomerComponent, {
            width: '80%',
            hasBackdrop: true,
            height: '500px',
            data: {
                data: this.device
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }

    alterDownloadType() {
        if (this.task.downloadType == 'App and Files' || this.task.downloadType == 'Files Only') {
            this.showDropandDrag = true;
        } else {
            this.showDropandDrag = false;
        }

        if (this.task.downloadType == 'Files Only') {
            this.showAppSelect = false;
        } else {
            this.showAppSelect = true;
        }
    }


    onChange(value) {
        this.stewardService.get('business-units/unititems/product/' + value.value).subscribe(response => {
            if (response.code == 200) {
                this.setBusinessUnit(response.data);
            } else {
                //(response);
            }
        }, error => {
            //(error);
        });

    }

    saveTasks(form: NgForm) {
        this.task.file = this.filed;
        const inst = this;
        this.stewardService.postFormDataMultipart('onboarding/add-task', this.task).subscribe((response) => {
            if (response.code == 200) {
                inst.notify.showWarning(response.message);

            } else {
                inst.notify.showWarning(response.message);
            }
            inst.modal.close();
            form.resetForm();
        }, error => {
            //(error);
        });
    }

    updateDevice(form: NgForm) {
        const inst = this;
        //(this.model);
        this.stewardService.postFormDataMultipart('onboarding/update-device', this.model).subscribe((response) => {
            if (response.code == 200) {
                inst.notify.showWarning(response.message);
                inst.modal.close();
            } else {
                inst.notify.showWarning(response.message);
            }
            inst.modal.close();
            form.resetForm();
        }, error => {
            //(error);
        });
    }

    setBusinessUnit(items: any): void {
        this.items = items;

        this.simpleSelected = {};
        this.setParameter(this.model.productId);
    }

    setParameter(id: number): void {
        this.params = [];
        const that = this;

        this.stewardService.get('posparam/' + id).subscribe(response => {
            if (response.code == 200) {
                that.setParamList(response.data);
            } else {
                //(response);
            }
        }, error => {
            //(error);
        });
    }

    setParamList(params: any) {

        this.elements = [];

        this.params = params;
        let c = 0;
        this.params.forEach(res => {
            const elem: ITdDynamicElementConfig[] = [];
            JSON.parse(res.params).forEach(map => {
                if (map.controlType === 'textbox') {
                    const value: any = {
                        name: map.key,
                        label: map.label,
                        type: map.datatype,
                        required: map.required
                    };
                    elem.push(value);
                }
            });
            this.params[c].elements = elem;
            c++;
        });


    }

    setAppVersionDropdown() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('modelId', this.model.modelId.toString());

        this.stewardService.get('app-management', params).subscribe((response) => {
            if (response.code == 200) {
                if (response.data != null) {
                    inst.apps = response.data.content;
                } else {
                    inst.notify.showWarning('No Applicationns Found');
                }
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    public dropped(event: UploadEvent) {
        this.files = event.files;
        for (const file of event.files) {
            file.fileEntry.file(info => {
                ////(info);
                this.filed.push(info);
            });
        }
    }

    public fileOver(event) {
        //(event);
    }

    public fileLeave(event) {
        //(event);
    }


    openConfirm(): void {
        const ids: Array<any> = [];
        $.each($('.selected', document.getElementsByTagName('table')[0]), function (index: number, row: any) {
            ids.push($(row).attr('data-id'));
        });
        if (ids.length < 1) {
            this.notify.showWarning('Please select atleast one entry');
            return;
        }

        this.checkerActions.ids = ids;

        const dialogRef = this.dialog.open(CancelScheduleComponent, {
            width: '500px',
            data: {
                checkerActions: this.checkerActions,
                selectedIds: ids,
                endpoint: 'devices/cancel',
                addLabel: '',
                approveLabel: '',
                addLink: '',
                approveLink: '',
                deleteLabel: 'Cancel Schedule'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
        });
    }

    loadMerchant(agentMerchantId: any) {
        this.stewardService.get('devices/params/' + agentMerchantId).subscribe(response => {
                if (response.code === 200) {
                    if (response.data != null) {
                        this.deviceCustomer = JSON.parse(response.data.values);

                        this.merchantParam.push({
                            value: this.deviceCustomer.merchantReference,
                            label: 'Merchant Reference',
                            order: 1,
                        });
                        this.merchantParam.push({
                            value: this.deviceCustomer.merchantName,
                            label: 'Name',
                            order: 1,
                        });
                        this.merchantParam.push({
                            value: this.deviceCustomer.outletNumber,
                            label: 'Outlet Number',
                            order: 1,
                        });
                        this.merchantParam.push({
                            value: this.deviceCustomer.phone,
                            label: 'Phone',
                            order: 1,
                        });
                        this.merchantParam.push({
                            value: this.deviceCustomer.address,
                            label: 'Address',
                            order: 1,
                        });
                        this.merchantParam.push({
                            value: this.deviceCustomer.tmsServerIp + ':' + this.deviceCustomer.tmsServerPort,
                            label: 'TMS IP:Port',
                            order: 1,
                        });
                        this.merchantParam.push({
                            value: this.deviceCustomer.postilionIp + ':' + this.deviceCustomer.postilionPort,
                            label: 'Postilion IP:Port',
                            order: 1,
                        });

                        let x = 1;
                        this.deviceCustomer.multicurrency.forEach(curr => {
                            this.merchantParam.push({
                                value: curr.merchantId,
                                label: 'Merchant ID ' + x,
                                order: 1,
                            });
                            this.merchantParam.push({
                                value: curr.terminalId,
                                label: 'Terminal ID ' + x,
                                order: 1,
                            });
                            this.merchantParam.push({
                                value: this.currencies.find(modz => modz.currencyId == curr.currencyId).currencyName,
                                label: 'Currency ' + x,
                                order: 1,
                            });
                            x++;
                        });


                        this.merchantParam.push({
                            value: this.deviceCustomer.receiptProfile,
                            label: 'Receipt Profile',
                            order: 1,
                        });
                        this.merchantParam.push({
                            value: this.deviceCustomer.transactionCounter,
                            label: 'Transaction Counter ',
                            order: 1,
                        });
                    }
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });
    }

}
