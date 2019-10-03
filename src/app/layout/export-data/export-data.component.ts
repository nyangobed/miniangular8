import {Component, OnInit, Input} from '@angular/core';
import 'rxjs/Rx';

import { OnboardingserviceService } from '../trcm-lab-automation/onboarding/onboardingservice.service';
import { GlobalParams } from '../../shared/services/globalparams';
import { Notify } from '../../shared/classes/notify';
import { HttpStewardService } from '../../shared/services/http-steward.service';

@Component({
    selector: 'app-export-data',
    templateUrl: './export-data.component.html',
    styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent implements OnInit {
    @Input() endpoint: string;
    constructor(
      protected stewardService: HttpStewardService<any, any>,
        // protected onboardingservices: OnboardingserviceService<any, any>,
        protected notify: Notify, private globalParam: GlobalParams) {}

    ngOnInit() {
    }

    exportData(exp: string) {
         window.open(this.globalParam.baseUrl + this.endpoint + '/' + exp + '?access_token=' + localStorage.getItem('access_token'));
        // window.open(this.globalParam.baseUrl  + this.endpoint + '/' + exp + '?access_token=' + localStorage.getItem('access_token'));
    }

}
