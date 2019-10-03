import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';

@Component({
    selector: 'app-access-denied',
    templateUrl: './access-denied.component.html',
    styleUrls: ['./access-denied.component.scss'],
    animations: [routerTransition()]
})
export class AccessDeniedComponent implements OnInit {

    currentYear = new Date().getFullYear();

    constructor() {}

    ngOnInit() {
    }

}
