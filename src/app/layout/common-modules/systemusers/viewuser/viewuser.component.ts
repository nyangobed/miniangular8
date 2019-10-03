import {Component, OnInit, ElementRef, ViewChild, Renderer} from '@angular/core';
import {routerTransition} from '../../../../router.animations';
import {HttpStewardService} from '../../../../shared/services/http-steward.service';
import {Notify} from '../../../../shared/classes/notify';
import {ActivatedRoute} from '@angular/router';
import {CreateUserWrapper} from '../../../../entities/wrappers/create-user-wrapper';
import {ViewParamBase} from '../../../../shared/base/viewParamBase';
import {AuditTrail} from '../../../../entities/audit-trail-model';
import {NgbModalRef, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
@Component({
    selector: 'app-viewuser',
    templateUrl: './viewuser.component.html',
    styleUrls: ['./viewuser.component.scss'],
    animations: [routerTransition()]
})
export class ViewuserComponent implements OnInit {
    model: CreateUserWrapper;
    viewparam: Array<ViewParamBase>;
    dtOptions: DataTables.Settings = {};
    viewparams: Array<ViewParamBase>;
    objectKeys = Object.keys;
    modal: NgbModalRef;
    @ViewChild('content') content: ElementRef;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, 
        private route: ActivatedRoute, 
        protected modalService: NgbModal,
         protected renderer: Renderer,
         private location: Location ) {
        this.model = new CreateUserWrapper();
        this.viewparam = new Array();
        this.viewparams = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchUser(params['id']);
            }
        });
    }

    fetchUser(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get('ufs-common-modules/api/v1/user/' + id, params).subscribe((response) => {
            if (response.code == 200) {
                inst.model = response.data;

                inst.viewparam.push({
                    value: inst.model.userId,
                    label: 'User Id',
                    order: 1,
                });
                inst.viewparam.push({
                    value: inst.model.fullName,
                    label: 'Full Names',
                    order: 2,
                });
                inst.viewparam.push({
                    value: inst.model.phoneNumber,
                    label: 'Phone Number',
                    order: 3,
                });
                inst.viewparam.push({
                    value: inst.model.email,
                    label: 'Email',
                    order: 4,
                });
                // inst.viewparam.push({
                //     value: inst.model.documentType,
                //     label: 'Document Id',
                //     order: 5,
                // });

                // inst.viewparam.push({
                //     value: inst.model.documentNumber,
                //     label: 'Document Number',
                //     order: 5,
                // });

                inst.viewparam.push({
                    value: inst.model.status,
                    label: 'Account Status',
                    order: 6,
                });

            } else {
                inst.notify.showWarning(response.message);
            }
        });

        params.set('sort', 'logId,desc');
        this.dtOptions = this.stewardService.intiateDataTable('atlas/audit-logs/' + id,
            [
                {
                    data: 'activityType', render: (d?: number) => {
                        return '';
                    }
                },
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
                {data: 'entityName', title: 'Entity'},
                {data: 'ipAddress', title: 'IP Address'},
                {
                    data: 'logId', title: 'Action',
                    render: function (id: number, comp: any, entity: AuditTrail) {
                        return '<div class=\'actions-buttons center\'>'
                            + '<i (click)="viewDetails()" class=\'fa fa-eye\' title=\'View\' data-config-id=\'' + id + '\'></i></div>';
                    }
                }
            ], 'logId', params);
    }

    ngAfterViewInit() {
        let inst = this;
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('data-config-id')) {
                this.stewardService.get('atlas/audit-logs/' + event.target.getAttribute('data-config-id')).subscribe(response => {
                    if (response.code == 200) {
                        let order: number = 1;
                        inst.viewparams = new Array();
                        for (let data of inst.objectKeys(response.data)) {
                            if (response.data[data] != '' && (typeof response.data[data]) != 'object') {
                                inst.viewparams.push({
                                    value: response.data[data],
                                    label: data.toLowerCase(),
                                    order: order,
                                });
                            }
                            order++;
                        }
                        this.modal = this.modalService.open(this.content);
                    } else {
                        this.notify.showWarning(response.message);
                    }
                });
            }
        });
    }
    goBack() {
        // window.history.back();
        this.location.back();
    
        // //( 'goBack()...' );
      }

}
