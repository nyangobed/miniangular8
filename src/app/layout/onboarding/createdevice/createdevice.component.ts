import {AfterViewInit, Component, OnInit, QueryList, ViewChild} from '@angular/core';
import {ParamConfig} from '../../../entities/param-template';
import {Apps} from '../../../entities/apps-model';
import {UploadEvent, UploadFile} from 'ngx-file-drop';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {OnboardingtWrapper} from '../../../entities/wrappers/onboarding-wrapper';
import {ITdDynamicElementConfig, TdDynamicFormsComponent} from '@covalent/dynamic-forms';
import {ActivatedRoute} from '@angular/router';
import {routerTransition} from '../../../router.animations';
import {BusinessItem} from '../../../entities/param-business-unit';
import {BusinessUnitItem} from '../../../entities/param-business-unit-item-model';
import {Product} from '../../../entities/product-model';
import {Currency} from '../../../entities/currency-model';
import {Telco} from '../../../entities/telcos-model';
import {ViewParamBase} from '../../../shared/base/viewParamBase';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {DeviceWhitelist} from '../../../entities/device-whitelist';
import {DeviceMake} from '../../../entities/device-make';
import {MyErrorStateMatcher} from '../../../entities/MyErrorStateMatcher';
import {DeviceParameters} from '../../../entities/wrappers/device-param-fields';
import {ParamsItems} from '../../../entities/wrappers/params-items';
import {CreateDeviceCustomerWrapper} from '../../../entities/wrappers/create-device-customer-wrapper';
import {CreateCustomerWrapper} from '../../../entities/wrappers/create-customer-wrapper';


@Component({
    selector: 'app-createdevice',
    templateUrl: './createdevice.component.html',
    styleUrls: ['./createdevice.component.scss'],
    animations: [routerTransition()]
})
export class CreatedeviceComponent implements OnInit, AfterViewInit {

    model: OnboardingtWrapper;
    paramCheck: any = {
        configureParam: false,
        attachApp: false,
        attachFiles: false
    };
    devicemodels: any[];

    public items;
    public AllowParentSelection = false;
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

    // for file uploads
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


    viewparamCustomer: Array<ViewParamBase>;
    viewparamDevice: Array<ViewParamBase>;
    viewparamEstate: Array<ViewParamBase>;

    objectKeys = Object.keys;

    whiteListCtrl: FormControl;
    filteredWhiteList: Observable<any[]>;
    makes: Array<DeviceMake>;

    whitelist: Array<DeviceWhitelist>;
    merchant: Array<CreateCustomerWrapper>;

    stateCtrl = new FormControl();
    merchantControl = new FormControl();
    filteredStates: Observable<Array<DeviceWhitelist>>;
    filteredMerchants: Observable<Array<CreateCustomerWrapper>>;

    selected = new FormControl('valid', [
        Validators.required,
        Validators.pattern('valid'),
    ]);

    matcher = new MyErrorStateMatcher();
    deviceParam: DeviceParameters;
    paramItems: Array<ParamsItems>;
    deviceCustomer: CreateDeviceCustomerWrapper;
    public myForm: FormGroup;
    customerWrapper: CreateCustomerWrapper;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, private _fb: FormBuilder) {
        this.model = new OnboardingtWrapper();
        this.currencies = [];
        this.simcard = [];
        this.viewparamCustomer = [];
        this.viewparamDevice = [];
        this.viewparamEstate = [];
        this.makes = [];
        this.whitelist = [];
        this.deviceParam = new DeviceParameters();
        this.paramItems = [];
        this.deviceCustomer = new CreateDeviceCustomerWrapper();
        this.customerWrapper = new CreateCustomerWrapper();
        this.merchant = [];

        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Approved');
        this.stewardService.get('device/whitelist', params).subscribe(response => {
                if (response.code === 200) {
                    this.whitelist = response.data.content;
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });

        this.getDeviceMerchats();

        this.filteredStates = this.stateCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this._filterStates(state) : this.whitelist.slice())
            );
        this.filteredMerchants = this.merchantControl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this._filterMerchants(state) : this.merchant.slice())
            );
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        this.whiteListCtrl = new FormControl();
        this.filteredWhiteList = this.whiteListCtrl.valueChanges
            .pipe(
                startWith(''),
                map(whitelst => whitelst ? this.filterWhitelist(whitelst) : this.whitelist.slice())
            );

        params.set('actionStatus', 'Approved');
        this.stewardService.get('device/model', params).subscribe(response => {
                if (response.code === 200) {
                    this.devicemodels = response.data.content;
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

        params.set('size', '1000');
        params.set('sort', 'makeId,desc');
        // fetch device make list
        this.stewardService.get('device/make', params).subscribe((response) => {
            if (response.code === 200) {
                this.makes = response.data.content;
            } else {
                this.notify.showWarning(response.message);
            }
        });

        this.route.params.subscribe(
            (params) => {
                if (params['id'] != null) {
                    this.isUpdate = true;
                    this.fetchDevice(params['id']);
                }
            });

        this.myForm = this._fb.group({
            merchantReference: [''],
            merchantName: [''],
            outletNumber: [''],
            address: [''],
            location: [''],
            phone: [''],
            postilionIp: [''],
            postilionPort: [''],
            tmsServerIp: [''],
            tmsServerPort: [''],
            tsyncIp: [''],
            tsyncPort: [''],
            adminPassword: [''],
            merchantPassword: [''],
            receiptProfile: [''],
            transactionCounter: [''],
            multicurrency: this._fb.array([
                this.initMultiCurrency(), this.initMultiCurrency(),
            ])
        });
    }


    private _filterStates(value: string): Array<DeviceWhitelist> {
        const filterValue = value.toLowerCase();
        return this.whitelist.filter(state => state.serialNo.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterMerchants(value: string): Array<CreateCustomerWrapper> {
        const filterValue = value.toLowerCase();
        return this.merchant.filter(state => state.agentMerchantId.toLowerCase().indexOf(filterValue) === 0);
    }


    loadModels() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('size', '1000');
        params.set('sort', 'modelId,desc');
        params.set('makeId', inst.model.makeId + '');
        // fetch device make list
        this.stewardService.get('device/model', params).subscribe((response) => {
            if (response.code === 200) {
                inst.devicemodels = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    filterWhitelist(serialNo: string) {
        return this.whitelist.filter(whitelst =>
            whitelst.serialNo.toLowerCase().indexOf(serialNo.toLowerCase()) === 0);
    }

    ngAfterViewInit(): void {
        const inst = this;
        ($('#rootwizard') as any).bootstrapWizard({
            onTabShow: function (tab, navigation, index) {
                const $total = navigation.find('li').length;
                const $current = index + 1;

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $('#rootwizard').find('.pager .next').hide();
                    $('#rootwizard').find('.pager .finish').show();
                    $('#rootwizard').find('.pager .finish').removeClass('disabled');
                } else {
                    $('#rootwizard').find('.pager .next').show();
                    $('#rootwizard').find('.pager .finish').hide();
                }

            },

            onNext: function (tab, navigation, index) {
                const form = $('form[name="step' + index + '"]');
                if (index === 2 || index === 3) {
                    // @ts-ignore
                    form.parsley().validate();

                    // @ts-ignore
                    if (!form.parsley().isValid()) {
                        return false;
                    }
                }

                if (index === 4) {
                    const unititem: BusinessUnitItem = inst.simpleSelected;
                    inst.model.unitItemId = unititem.unitItemId;
                    inst.model.file = inst.filed;

                    const order = 0;
                    inst.viewparamCustomer = [];
                    inst.viewparamDevice = [];
                    inst.viewparamEstate = [];
                    /* for (const data of inst.objectKeys(inst.model)) {
                         if (inst.model[data] !== '') {
                             if (data.toLowerCase() === 'makeid') {
                                 inst.viewparamDevice.push({
                                     value: inst.makes.find(make => make.makeId == inst.model[data]),
                                     label: 'Manufacturer',
                                     order: order,
                                 });
                             } else if (data.toLowerCase() === 'productid') {
                                 inst.viewparamEstate.push({
                                     value: inst.products.find(product => product.productId == inst.model[data]).productName,
                                     label: 'Business Unit',
                                     order: order,
                                 });
                             } else if (data.toLowerCase() === 'modelid') {
                                 inst.viewparamDevice.push({
                                     value: inst.devicemodels.find(modz => modz.modelId == inst.model[data]).model,
                                     label: 'Model',
                                     order: order,
                                 });
                             } else if (data.toLowerCase() === 'unititemid') {
                                 inst.viewparamEstate.push({
                                     value: inst.simpleSelected.name,
                                     label: 'Estate',
                                     order: order,
                                 });
                             } else {
                                 inst.viewparamCustomer.push({
                                     value: inst.model[data],
                                     label: data.toLowerCase(),
                                     order: order,
                                 });
                             }
                         }
                         order++;
                     }*/

                    //(inst.deviceCustomer);


                    inst.viewparamDevice.push({
                        value: inst.makes.find(make => make.makeId == inst.model.makeId).make,
                        label: 'Manufacturer',
                        order: order,
                    });
                    //(inst.model.productId);
                    inst.viewparamEstate.push({
                        value: inst.products.find(product => product.productId == inst.model.productId).productName,
                        label: 'Business Unit',
                        order: order,
                    });

                    inst.viewparamDevice.push({
                        value: inst.model.serialNo,
                        label: 'Serial Number',
                        order: order,
                    });
                    //(inst.model.modelId);
                    inst.viewparamDevice.push({
                        value: inst.devicemodels.find(modz => modz.modelId == inst.model.modelId).model,
                        label: 'Model',
                        order: order,
                    });

                    inst.viewparamEstate.push({
                        value: inst.simpleSelected.name,
                        label: 'Estate',
                        order: order,
                    });


                    inst.viewparamCustomer.push({
                        value: inst.deviceCustomer.merchantName,
                        label: 'Merchant Name',
                        order: order,
                    });

                    inst.viewparamCustomer.push({
                        value: inst.deviceCustomer.merchantReference,
                        label: 'Merchant Reference',
                        order: order,
                    });
                    inst.viewparamCustomer.push({
                        value: inst.deviceCustomer.phone,
                        label: 'Phone',
                        order: order,
                    });
                    inst.viewparamCustomer.push({
                        value: inst.deviceCustomer.address,
                        label: 'Address',
                        order: order,
                    });

                    inst.viewparamDevice.push({
                        value: inst.deviceCustomer.tmsServerIp + ':' + inst.deviceCustomer.tmsServerPort,
                        label: 'TMS Server IP:Port',
                        order: order,
                    });

                    inst.viewparamDevice.push({
                        value: inst.deviceCustomer.receiptProfile,
                        label: 'Receipt Profile',
                        order: order,
                    });
                    inst.viewparamDevice.push({
                        value: inst.deviceCustomer.transactionCounter,
                        label: 'Transaction Counter',
                        order: order,
                    });
                    inst.viewparamDevice.push({
                        value: inst.deviceCustomer.multicurrency[0].terminalId,
                        label: 'Terminal ID 1',
                        order: order,
                    });
                    inst.viewparamDevice.push({
                        value: inst.currencies.find(modz => modz.currencyId == inst.deviceCustomer.multicurrency[0].currencyId).currencyName,
                        label: 'Currency 1',
                        order: order,
                    });

                    inst.viewparamDevice.push({
                        value: inst.deviceCustomer.multicurrency[1].terminalId,
                        label: 'Terminal ID 2',
                        order: order,
                    });
                    inst.viewparamDevice.push({
                        value: inst.currencies.find(modz => modz.currencyId == inst.deviceCustomer.multicurrency[1].currencyId).currencyName,
                        label: 'Currency 2',
                        order: order,
                    });


                }
            },

            onTabClick: function (tab, navigation, index) {
                const form = $('form[name="step' + (index + 1) + '"]');
                (form as any).parsley().validate();
                if (!(form as any).parsley().isValid()) {
                    return false;
                }
            }
        });
    }

    fetchDevice(id: number): any {
        this.stewardService.get('devices/' + id).subscribe(response => {
            if (response.code === 200) {
                this.model = response.data;
                this.model.modelId = response.data.modelId.modelId;
                this.model.productId = response.data.unitItemId.unitSource.productId.productId;

                this.simpleSelected = response.data.unitItemId;

                const item: any[] = [];
                item.push(this.simpleSelected);
                this.items = item;

                const bizz: BusinessItem = response.data.unitItemId.unitSource;

                this.setParameter(bizz.productId.productId);

                this.setAppVersionDropdown();
            } else {
                this.notify.showWarning('Sorry record not found');
                this.isUpdate = false;
            }
        });
    }

    onChange() {
        this.stewardService.get('business-units/unititems/product/' + this.model.productId).subscribe(response => {
            //(response);
            if (response.code === 200) {
                this.setBusinessUnit(response.data);
            } else {
                //(response);
            }
        }, error => {
            //(error);
        });

    }

    onStep1Next(event) {
        //(event);
    }

    onStep2Next(event) {
        //(event);
        const inst = this;
        let order = 0;
        inst.viewparamCustomer = [];
        for (const data of inst.objectKeys(inst.model)) {
            if (inst.model[data] !== '') {
                inst.viewparamCustomer.push({
                    value: inst.model[data],
                    label: data.toLowerCase(),
                    order: order,
                });
            }
            order++;
        }
    }

    onStep3Next(event) {

    }

    onStep4Next(event) {

        const unititem: BusinessUnitItem = this.simpleSelected;
        this.model.unitItemId = unititem.unitItemId;
        this.model.file = this.filed;

        //(this.model);

        const inst = this;
        let order = 0;
        inst.viewparamCustomer = [];
        for (const data of inst.objectKeys(inst.model)) {
            if (inst.model[data] !== '') {
                inst.viewparamCustomer.push({
                    value: inst.model[data],
                    label: data.toLowerCase(),
                    order: order,
                });
            }
            order++;
        }
    }

    onStep5Next(event) {
        const unititem: BusinessUnitItem = this.simpleSelected;
        this.model.unitItemId = unititem.unitItemId;
        this.model.file = this.filed;
        const inst = this;
        let order = 0;
        inst.viewparamCustomer = [];
        for (const data of inst.objectKeys(inst.model)) {
            if (inst.model[data] !== '') {
                inst.viewparamCustomer.push({
                    value: inst.model[data],
                    label: data.toLowerCase(),
                    order: order,
                });
            }
            order++;
        }
    }

    test() {
        //('finished');
    }

    submitDevice() {
        const inst = this;
        const unititem: BusinessUnitItem = inst.simpleSelected;
        inst.model.unitItemId = unititem.unitItemId;
        inst.model.file = inst.filed;

        if (inst.isUpdate) {
            inst.stewardService.postFormDataMultipart('onboarding/update-device', inst.model).subscribe((response) => {
                if (response.code === 200) {
                    inst.isCompleted = true;
                    inst.notify.showWarning(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        } else {
            inst.stewardService.postFormDataMultipart('onboarding', inst.model).subscribe((response) => {
                //(response);
                if (response.code === 200) {
                    inst.isCompleted = true;
                    inst.notify.showWarning(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        }
    }

    onComplete(event) {
        const unititem: BusinessUnitItem = this.simpleSelected;
        this.model.unitItemId = unititem.unitItemId;
        this.model.file = this.filed;

        const inst = this;

        if (this.isUpdate) {
            this.stewardService.postFormDataMultipart('onboarding/update-device', this.model).subscribe((response) => {
                if (response.code === 200) {
                    inst.isCompleted = true;
                    inst.notify.showWarning(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        } else {
            this.stewardService.postFormDataMultipart('onboarding', this.model).subscribe((response) => {
                if (response.code === 200) {
                    inst.isCompleted = true;
                    inst.notify.showWarning(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        }
    }

    onStepChanged(step) {
        // //('Changed to ' + step.title);
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
            if (response.code === 200) {
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
            if (response.code === 200) {
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
                // //(info);
                this.filed.push(info);
            });
        }
        //(this.filed);
    }

    public fileOver(event) {
        //(event);
    }

    public fileLeave(event) {
        //(event);
    }

    initMultiCurrency() {
        // initialize our terminalIds
        return this._fb.group({
            merchantId: ['', Validators.required],
            terminalId: ['', Validators.required],
            currencyId: ['', Validators.required]
        });
    }

    addMultiCurrency() {
        const control = <FormArray>this.myForm.controls['multicurrency'];
        control.push(this.initMultiCurrency());
    }

    removeMultiCurrency(i: number) {
        const control = <FormArray>this.myForm.controls['multicurrency'];
        control.removeAt(i);
    }

    saveDeviceCustomer(model: FormGroup) {
        // //(model);
        const inst = this;
        const custWrap: CreateCustomerWrapper = new CreateCustomerWrapper();

        custWrap.agentMerchantId = inst.deviceCustomer.merchantReference;
        custWrap.formValues = JSON.stringify(model.value);

        // //(inst.deviceCustomer);
        //(custWrap);

        this.stewardService.post('devices/merchant', custWrap).subscribe((response) => {
            if (response.code === 200) {
                inst.notify.showWarning(response.message);
                inst.getDeviceMerchats();
            } else {
                inst.notify.showWarning(response.message);
            }
        }, error => {
            //(error);
        });
    }

    searchMerchant() {
        this.stewardService.get('devices/merchant/' + this.deviceCustomer.merchantReference).subscribe(response => {

                //(response);
                if (response.code === 200) {
                    this.customerWrapper = response.data;
                    if (this.customerWrapper != null) {
                        this.deviceCustomer = JSON.parse(this.customerWrapper.formValues);
                        let i = 0;
                        this.deviceCustomer.multicurrency.forEach(ress => {
                            //(<FormControl>this.myForm.controls.multicurrency.controls[i]).patchValue({"merchantId": ress.merchantId, "terminalId":ress.terminalId, "currencyId":ress.currencyId});

                            this.getControls(this.myForm, 'multicurrency')[i].patchValue({'merchantId': ress.merchantId, 'terminalId': ress.terminalId, 'currencyId': ress.currencyId});

                            i++;
                        });
                        this.notify.showWarning('Merchant/Agent ID [' + this.deviceCustomer.merchantReference + '] Found');
                    } else {
                        this.notify.showWarning('Merchant/Agent ID [' + this.deviceCustomer.merchantReference + '] Not Found');
                    }
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });
    }

    loadMerchant(agentMerchantId: any) {
        //('devices/merchant/' + agentMerchantId);
        this.stewardService.get('devices/merchant/' + agentMerchantId).subscribe(response => {
                if (response.code === 200) {
                    //(response);
                    this.customerWrapper = response.data;
                    if (this.customerWrapper != null) {
                        this.deviceCustomer = JSON.parse(this.customerWrapper.formValues);
                    }
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });
    }

    private getDeviceMerchats() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Approved');
        this.stewardService.get('devices/merchant', params).subscribe(response => {
                if (response.code === 200) {
                    this.merchant = response.data.content;
                } else {
                    //(response);
                }
            },
            error => {
                //(error);
            });
    }

    getControls(frmGrp: FormGroup, key: string) {
        return (<FormArray>frmGrp.controls[key]).controls;
    }
}
