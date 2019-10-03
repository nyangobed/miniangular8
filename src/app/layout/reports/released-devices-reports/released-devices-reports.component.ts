import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';

@Component({
    selector: 'app-released-devices-reports',
    templateUrl: './released-devices-reports.component.html',
    styleUrls: ['./released-devices-reports.component.scss'],
    animations: [routerTransition()]
})
export class ReleasedDevicesReportsComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }

}
