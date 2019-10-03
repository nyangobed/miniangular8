import {Component, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {AuditTrail} from '../../../entities/audit-trail-model';
import {routerTransition} from '../../../router.animations';
import {Notify} from '../../../shared/classes/notify';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ViewParamBase} from '../../../shared/base/viewParamBase';
import {Users} from '../../../entities/users-model';
import {MatDialog} from '@angular/material';
import {AuditDialogComponent} from './audit-dialog/audit-dialog.component';

@Component({
    selector: 'app-audit',
    templateUrl: './audit.component.html',
    styleUrls: ['./audit.component.scss'],
    animations: [routerTransition()]
})
export class AuditComponent implements OnInit {

    public dtOptions: DataTables.Settings;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;
    modal: NgbModalRef;
    @ViewChild('content') content: ElementRef;

    // tslint:disable-next-line:max-line-length
    constructor(public dialog: MatDialog,
        protected stewardService: HttpStewardService<AuditTrail, AuditTrail>, protected notify: Notify, protected modalService: NgbModal, protected renderer: Renderer) {
        this.viewparam = new Array();
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('sort', 'logId,desc');
        this.dtOptions = this.stewardService.intiateDataTable('atlas/audit-logs',
            [
                {data: 'logId', render: (d?: any) => ''},
                {data: 'activityType', title: 'Activity Type'},
                {
                    data: 'occurenceTime',
                    title: 'Occurence Time',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {
                    data: 'status', title: 'Status'
                },
                {
                    data: 'userId', title: 'User',
                    render: function(data) {
                        return data ? data.fullName : '';
                    }
                },
                {data: 'ipAddress', title: 'IP Address'},
                {data: 'description', title: 'Description'}
            ], 'logId', params);
    }
}
