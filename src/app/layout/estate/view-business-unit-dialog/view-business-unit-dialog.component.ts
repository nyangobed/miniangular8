import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ViewParamBase} from '../../../shared/base/viewParamBase';

@Component({
    selector: 'app-view-business-unit-dialog',
    templateUrl: './view-business-unit-dialog.component.html',
    styleUrls: ['./view-business-unit-dialog.component.scss']
})
export class ViewBusinessUnitDialogComponent<T> implements OnInit {
    viewparam: Array<ViewParamBase>;
    constructor(public dialogRef: MatDialogRef<ViewBusinessUnitDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.viewparam = data.viewparam;
    }

    ngOnInit() {
    }

}
