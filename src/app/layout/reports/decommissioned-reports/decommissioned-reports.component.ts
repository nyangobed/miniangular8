import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';

@Component({
    selector: 'app-decommissioned-reports',
    templateUrl: './decommissioned-reports.component.html',
    styleUrls: ['./decommissioned-reports.component.scss'],
    animations: [routerTransition()]
})
export class DecommissionedReportsComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }

}
