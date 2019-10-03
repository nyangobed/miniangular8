import {Component, OnInit, Input} from '@angular/core';
import {ViewParamBase} from '../../../shared/base/viewParamBase';

@Component({
    selector: 'app-viewentity',
    templateUrl: './viewentity.component.html',
    styleUrls: ['./viewentity.component.scss'],
})
export class ViewentityComponent implements OnInit {
    @Input() viewparam: ViewParamBase[] = [];
    @Input() title: string;
    @Input() subtitle: string;

    constructor() {}

    ngOnInit() {
    }
}
