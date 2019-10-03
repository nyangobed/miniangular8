import {Component, OnInit, Inject} from '@angular/core';
import {CreateBusinessUnitWrapper} from '../../../entities/wrappers/create-business-wrapper';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {Product} from '../../../entities/product-model';
import {NgForm} from '@angular/forms';
import {OrganizationHierachyComponent} from '../organization-hierachy/organization-hierachy.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-unit-dialog',
    templateUrl: './unit-dialog.component.html',
    styleUrls: ['./unit-dialog.component.scss']
})
export class UnitDialogComponent<T> implements OnInit {
    model: CreateBusinessUnitWrapper;
    productId: Product;
    public isUpdate: boolean = false;
    orgComp: OrganizationHierachyComponent;
    unitId: number;
    action: string;

    constructor(public dialogRef: MatDialogRef<UnitDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify, public router: Router) {
        this.model = new CreateBusinessUnitWrapper();
        this.productId = data.product;
        this.orgComp = data.orgComp;
        this.unitId = data.unitId;
        this.action = data.action;
        if (data.action == "add") {
            this.isUpdate = false;
        } else {
            this.model.unitName = data.unitName;
            this.isUpdate = true;
        }
    }

    ngOnInit() {

    }

    submithierarchy(form: NgForm) {
        let inst = this;
        this.model.productId = this.productId;
        if (this.isUpdate) {
            this.model.unitId = this.unitId;
            this.stewardService.put("business-units", this.model).subscribe((response) => {
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);                    
                } else {
                    inst.notify.showWarning(response.message);
                }
                inst.dialogRef.close();
            }, error => {
                //(error);
            });
        } else {
            this.stewardService.post("business-units", this.model).subscribe((response) => {
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
                inst.dialogRef.close();
            }, error => {
                //(error);
            });
        }
    }

}
