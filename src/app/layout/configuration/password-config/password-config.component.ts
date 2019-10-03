import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';

@Component({
    selector: 'app-password-config',
    templateUrl: './password-config.component.html',
    styleUrls: ['./password-config.component.scss'],
    animations: [routerTransition()]
})
export class PasswordConfigComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }

}
