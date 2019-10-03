import {Component, OnInit, Inject, Renderer} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpStewardService} from '../../../../shared/services/http-steward.service';
import {Notify} from '../../../../shared/classes/notify';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {AuditTrail} from '../../../../entities/audit-trail-model';
import {ViewParamBase} from '../../../../shared/base/viewParamBase';

@Component({
    selector: 'app-audit-dialog',
    templateUrl: './audit-dialog.component.html',
    styleUrls: ['./audit-dialog.component.scss']
})
export class AuditDialogComponent<T> implements OnInit {
    audit: AuditTrail;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    constructor(public dialogRef: MatDialogRef<AuditDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, 
    protected stewardService: HttpStewardService<any, any>, protected notify: Notify,
    protected modalService: NgbModal, protected renderer: Renderer, private router: Router) {
        this.audit = data.data;
    }

    ngOnInit() {
        let order: number = 1;
        let inst = this;
        inst.viewparam = new Array();
        for (let data of inst.objectKeys(inst.audit)) {
            //('AUDIT DATA', data);
            if (inst.audit[data] != '' && (typeof inst.audit[data]) != 'object') {
                if (data.toLowerCase()=='occurencetime'){
                    inst.viewparam.push({
                        value: new Date(inst.audit[data]).toLocaleString(),
                    label: data.toLowerCase(),
                    order: order,
                });
                }   else{
                inst.viewparam.push({
                    value: inst.audit[data],
                    label: data.toLowerCase(),
                    order: order,
                });
                }
            }
            order++;
        }
        inst.viewparam.push({
            value: inst.audit.user.fullName,
            label: "User",
            order: order,
        });
    }

}
