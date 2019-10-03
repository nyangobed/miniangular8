import {Component, Inject, OnInit} from '@angular/core';
import {Devices} from '../../../../entities/devices-list-model';
import {Notify} from '../../../../shared/classes/notify';
import {EditDeviceDialogComponent} from '../edit-device-dialog/edit-device-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpStewardService} from '../../../../shared/services/http-steward.service';
import {CreateCustomerWrapper} from '../../../../entities/wrappers/create-customer-wrapper';
import {CreateDeviceCustomerWrapper} from '../../../../entities/wrappers/create-device-customer-wrapper';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../../../../entities/currency-model';
import {TerminalIdCurrency} from '../../../../entities/wrappers/terminal-id-currency';

@Component({
    selector: 'app-editdevicecustomer',
    templateUrl: './editdevicecustomer.component.html',
    styleUrls: ['./editdevicecustomer.component.scss']
})
export class EditdevicecustomerComponent<T> implements OnInit {
    device: Devices;
    deviceCustomer: CreateDeviceCustomerWrapper;
    public myForm: FormGroup;
    customerWrapper: CreateCustomerWrapper;
    currencies: Array<Currency>;

    constructor(public dialogRef: MatDialogRef<EditDeviceDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify, private _fb: FormBuilder) {
        this.device = data.data;
        this.deviceCustomer = new CreateDeviceCustomerWrapper();
        this.customerWrapper = new CreateCustomerWrapper();
        this.currencies = new Array();
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Approved');
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

        this.loadMerchant(this.device.deviceId);

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
        this.deviceCustomer = model.getRawValue();
        this.customerWrapper.agentMerchantId = this.deviceCustomer.merchantReference;
        this.customerWrapper.formValues = JSON.stringify(this.deviceCustomer);

        //(this.customerWrapper);
        this.stewardService.put('devices/merchant/' + this.device.deviceId, this.customerWrapper).subscribe((response) => {
            if (response.code === 200) {
                inst.notify.showWarning(response.message);
            } else {
                inst.notify.showWarning(response.message);
            }
        }, error => {
            //(error);
        });
    }

    searchMerchant() {
        this.stewardService.get('devices/merchant/' + this.deviceCustomer.merchantReference).subscribe(response => {
                if (response.code === 200) {
                    this.customerWrapper = response.data;
                    if (this.customerWrapper != null) {
                        this.deviceCustomer = JSON.parse(this.customerWrapper.formValues);
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
        this.stewardService.get('devices/params/' + agentMerchantId).subscribe(response => {
                if (response.code === 200) {
                    if (response.data != null) {
                        this.deviceCustomer = JSON.parse(response.data.values);
                        let i = 0;
                        this.deviceCustomer.multicurrency.forEach(ress => {
                            // (<FormControl>this.myForm.controls.multicurrency.controls[i]).patchValue({"merchantId": ress.merchantId, "terminalId":ress.terminalId, "currencyId":ress.currencyId});
                            this.getControls(this.myForm, 'multicurrency')[i].patchValue({'merchantId': ress.merchantId, 'terminalId': ress.terminalId, 'currencyId': ress.currencyId});
                            i++;
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

    getControls(frmGrp: FormGroup, key: string) {
        return (<FormArray>frmGrp.controls[key]).controls;
    }
}
