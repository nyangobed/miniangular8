import {Component, OnInit, Input, Output} from '@angular/core';
import {PosParamBase} from '../../../shared/base/PosParamBase';
import {FormGroup} from '@angular/forms';
import {PosParamControlService} from '../../../shared/services/PosParamControlService';
import {EventEmitter} from "selenium-webdriver";

@Component({
    selector: 'app-paramfile',
    templateUrl: './paramfile.component.html',
    styleUrls: ['./paramfile.component.scss']
})
export class ParamfileComponent implements OnInit {


    @Input() posparams: PosParamBase<any>[] = [];
    form: FormGroup;
    payLoad = '';   
    

    constructor(private pcs: PosParamControlService) {}

    ngOnInit() {
        this.form = this.pcs.toFormGroup(this.posparams);
    }
    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }


}
