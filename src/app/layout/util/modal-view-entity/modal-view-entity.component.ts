import {Component, OnInit, Input} from '@angular/core';
import { ViewParamBase } from '../../../shared/base/viewParamBase';


@Component({
    selector: 'app-modal-view-entity',
    templateUrl: './modal-view-entity.component.html',
    styleUrls: ['./modal-view-entity.component.scss']
})
export class ModalViewEntityComponent implements OnInit {
    @Input() viewparam: ViewParamBase[] = [];
    @Input() title: string;
    @Input() subtitle: string;

    constructor() {}

    ngOnInit() {
    }

}
