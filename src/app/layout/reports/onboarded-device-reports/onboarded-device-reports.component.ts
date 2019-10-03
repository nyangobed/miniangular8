import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';

@Component({
    selector: 'app-onboarded-device-reports',
    templateUrl: './onboarded-device-reports.component.html',
    styleUrls: ['./onboarded-device-reports.component.scss'],
    animations: [routerTransition()]
})
export class OnboardedDeviceReportsComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }

}
