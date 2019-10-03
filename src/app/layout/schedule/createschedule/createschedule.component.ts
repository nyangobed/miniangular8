import {AfterViewInit, Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {DeviceMake} from '../../../entities/device-make';
import {DeviceModel} from '../../../entities/device-model';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {UploadEvent, UploadFile} from 'ngx-file-drop';
import {BusinessItem} from '../../../entities/param-business-unit';
import {ScheduleWrapper} from '../../../entities/wrappers/schedule-wrapper';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../entities/product-model';
import {ViewParamBase} from '../../../shared/base/viewParamBase';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-createschedule',
    templateUrl: './createschedule.component.html',
    styleUrls: ['./createschedule.component.scss'],
    animations: [routerTransition()]
})
export class CreatescheduleComponent implements OnInit, AfterViewInit {
    step2: any = {
        showNext: true,
        showPrev: true
    };

    step3: any = {
        showSecret: false
    };

    isCompleted = false;

    makes: Array<DeviceMake>;
    models: Array<DeviceModel>;
    products: Array<Product>;
    apps: Array<any>;

    model: ScheduleWrapper;

    showDropandDrag = false;

    filed: File[] = [];

    // for file uploads
    public files: UploadFile[] = [];

    public items;
    public AllowParentSelection = true;
    public ShowFilter = true;
    public Disabled = false;
    public FilterPlaceholder = 'Type here to filter elements...';
    public MaxDisplayed = 5;

    public multipleSelected = [];

    minDate = new Date();
    maxDate = new Date(2020, 0, 1);

    defaultTime: any;
    meridianTime: any;
    meridian = false;
    seconds = true;
    selectDate: Date = new Date();


    public isUpdate = false;

    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;
    estates: Array<string>;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, protected router: Router, private datePipe: DatePipe) {
        this.makes = [];
        this.models = [];
        this.products = [];
        this.apps = [];
        this.model = new ScheduleWrapper();
        this.viewparam = [];
        this.estates = [];

        this.defaultTime = {hour: this.datePipe.transform(new Date(), 'HH'), minute: this.datePipe.transform(new Date(), 'mm')};
        this.meridianTime = {hour: this.datePipe.transform(new Date(), 'HH'), minute: this.datePipe.transform(new Date(), 'mm')};
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchSchedule(params['id']);
            }
        });

        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('size', '1000');
        params.set('sort', 'makeId,desc');
        // fetch device make list
        this.stewardService.get('device/make', params).subscribe((response) => {
            if (response.code === 200) {
                inst.makes = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
        params.set('sort', 'productId,desc');
        // fetch device make list
        this.stewardService.get('products', params).subscribe((response) => {
            if (response.code === 200) {
                inst.products = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
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

                //('Working just fine...[' + index + ']....');

                if (index !== 4) {
                    (form as any).parsley().validate();

                    if (!(form as any).parsley().isValid()) {
                        return false;
                    }
                }

                if (index === 3) {
                    const prodct = inst.products.filter(x => x.productId == inst.model.productId)[0];
                    const model = inst.models.filter(x => x.modelId == inst.model.modelId)[0];
                    const make = inst.makes.filter(x => x.makeId == inst.model.makeId)[0];

                    inst.viewparam.push({
                        value: make.make,
                        label: 'Manufacturer',
                        order: 1,
                    });

                    inst.viewparam.push({
                        value: model.model,
                        label: 'Model',
                        order: 2,
                    });
                    inst.viewparam.push({
                        value: prodct.productName,
                        label: 'Product Name',
                        order: 3,
                    });


                    inst.multipleSelected.forEach(res => {
                        inst.estates.push(res.name);
                    });

                    inst.viewparam.push({
                        value: inst.estates.toString(),
                        label: 'Estate(s) Selected',
                        order: 4,
                    });

                    inst.viewparam.push({
                        value: inst.model.downloadType,
                        label: 'Download Type',
                        order: 5,
                    });

                    const dateNow: string = new Date(inst.selectDate).toDateString();
                    //(dateNow);
                    const timeNow = dateNow + ' ' + inst.meridianTime.hour + ':' + inst.meridianTime.minute + ':00';
                    const dateSelected: Date = new Date(timeNow);
                    inst.model.scheduleTime = dateSelected;

                    inst.viewparam.push({
                        value: inst.model.scheduleTime,
                        label: 'Schedule Time',
                        order: 6,
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

    toggleMeridian() {
        this.meridian = !this.meridian;
    }

    fetchSchedule(id: number) {
        this.stewardService.get('schedule/' + id).subscribe(response => {
            if (response.code === 200) {
                //(response);
                this.model.scheduleId = response.data.scheduleId;
                this.model.appId = response.data.appId;
                this.model.downloadType = response.data.downloadType;
                this.model.productId = response.data.productId.productId;
                this.defaultTime = {
                    hour: this.datePipe.transform(new Date(response.data.scheduledTime), 'HH'),
                    minute: this.datePipe.transform(new Date(response.data.scheduledTime), 'mm')
                };
                this.meridianTime = {
                    hour: this.datePipe.transform(new Date(response.data.scheduledTime), 'HH'),
                    minute: this.datePipe.transform(new Date(response.data.scheduledTime), 'mm')
                };
                this.selectDate = new Date(response.data.scheduledTime);
                this.fetchBusinessUnits();
            } else {
                this.notify.showWarning('Sorry record not found');
                this.isUpdate = false;
            }
        });
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
                inst.models = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    setAppVersionDropdown() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('modelId', this.model.modelId.toString());

        this.stewardService.get('app-management', params).subscribe((response) => {
            //(response);
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

    alterDownloadType() {
        if (this.model.downloadType === 'App and Files' || this.model.downloadType === 'Files Only') {
            this.showDropandDrag = true;
        } else {
            this.showDropandDrag = false;
        }
    }

    fetchBusinessUnits() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');

        this.stewardService.get('business-units/unititems/product/' + this.model.productId, params).subscribe((response) => {
            //(response);
            if (response.code === 200) {
                // inst.apps = response.data.content;
                if (response.data != null) {
                    inst.items = response.data;
                } else {
                    inst.notify.showWarning('The selected Product has no Business Units');
                }
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    loadEstates(bizz: BusinessItem) {
        const params: Map<any, string> = new Map();
        const inst = this;
        // params.set("actionStatus", "Approved");
        this.stewardService.get('business-units/unititems/' + bizz.unitId, params).subscribe((response) => {
            if (response.code === 200) {
                inst.items = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    onStep1Next(event) {
        //('Step1 - Next');
    }

    onStep2Next(event) {
        //('Step2 - Next');
    }

    onStep3Next(event) {
        //('Step3 - Next');
        const prodct = this.products.filter(x => x.productId == this.model.productId)[0];
        const model = this.models.filter(x => x.modelId == this.model.modelId)[0];
        const make = this.makes.filter(x => x.makeId == this.model.makeId)[0];

        this.viewparam.push({
            value: make.make,
            label: 'Manufacturer',
            order: 1,
        });

        this.viewparam.push({
            value: model.model,
            label: 'Model',
            order: 2,
        });
        this.viewparam.push({
            value: prodct.productName,
            label: 'Product Name',
            order: 3,
        });


        this.multipleSelected.forEach(res => {
            this.estates.push(res.name);
        });

        this.viewparam.push({
            value: this.estates.toString(),
            label: 'Estate(s) Selected',
            order: 4,
        });

        this.viewparam.push({
            value: this.model.downloadType,
            label: 'Download Type',
            order: 5,
        });

        const dateNow: string = new Date(this.selectDate).toDateString();
        //(dateNow);
        const timeNow = dateNow + ' ' + this.meridianTime.hour + ':' + this.meridianTime.minute + ':00';
        const dateSelected: Date = new Date(timeNow);
        this.model.scheduleTime = dateSelected;

        this.viewparam.push({
            value: this.model.scheduleTime,
            label: 'Schedule Time',
            order: 6,
        });
    }

    submitSchedule() {
        this.isCompleted = false;
        this.model.file = this.filed;
        const ids: number[] = [];
        this.multipleSelected.forEach(res => {
            ids.push(res.unitItemId);
        });
        this.model.unitItemId = ids;


        const inst = this;
        //(this.model);


        if (this.isUpdate) {
            this.stewardService.postFormDataMultipart('schedule/update-schedule', this.model).subscribe((response) => {
                //(response);
                if (response.code === 200) {
                    inst.notify.showSuccess(response.message);
                    inst.isCompleted = true;
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        } else {
            this.stewardService.postFormDataMultipart('schedule', this.model).subscribe((response) => {
                //(response);
                if (response.code = 200) {
                    inst.notify.showSuccess(response.message);
                    inst.isCompleted = true;
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        }
    }

    onComplete(event) {
        this.isCompleted = false;
        this.model.file = this.filed;
        const ids: number[] = [];
        this.multipleSelected.forEach(res => {
            ids.push(res.unitItemId);
        });
        this.model.unitItemId = ids;


        const inst = this;

        if (this.isUpdate) {
            this.stewardService.postFormDataMultipart('schedule/update-schedule', this.model).subscribe((response) => {
                //(response);
                if (response.code === 200) {
                    inst.notify.showSuccess(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });

        } else {
            this.stewardService.postFormDataMultipart('schedule', this.model).subscribe((response) => {
                //(response);
                if (response.code === 200) {
                    inst.notify.showSuccess(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        }
    }

    onStepChanged(step) {
        //('Changed to ' + step.title);
    }

    public dropped(event: UploadEvent) {
        this.files = event.files;
        for (const file of event.files) {
            file.fileEntry.file(info => {
                // //(info);
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

}
