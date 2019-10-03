import {Component, OnInit, Input} from '@angular/core';
import {PosParamBase} from '../../../shared/base/PosParamBase';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-posparam',
    templateUrl: './posparam.component.html',
    styleUrls: ['./posparam.component.scss']
})
export class PosparamComponent implements OnInit {
    @Input() posparam: PosParamBase<any>;
    @Input() form: FormGroup;
    get isValid() {return this.form.controls[this.posparam.key].valid; }
    constructor() {}

    ngOnInit() {
    }

}
