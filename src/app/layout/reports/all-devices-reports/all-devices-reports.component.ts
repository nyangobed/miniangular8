import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';

@Component({
    selector: 'app-all-devices-reports',
    templateUrl: './all-devices-reports.component.html',
    styleUrls: ['./all-devices-reports.component.scss'],
    animations: [routerTransition()]
})
export class AllDevicesReportsComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }

}
