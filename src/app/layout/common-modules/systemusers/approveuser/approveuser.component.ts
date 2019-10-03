import {Component, OnInit, Input, Renderer, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../../router.animations';
import {HttpStewardService} from '../../../../shared/services/http-steward.service';
import {Notify} from '../../../../shared/classes/notify';
import {Users} from '../../../../entities/users-model';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-approveuser',
    templateUrl: './approveuser.component.html',
    styleUrls: ['./approveuser.component.scss'],
    animations: [routerTransition()]
})
export class ApproveuserComponent implements OnInit, AfterViewInit {
    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<Users, Users>, protected notify: Notify, 
        protected renderer: Renderer, 
        public router: Router,
        private location: Location) {
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardService.intiateDataTable('ufs-common-modules/api/v1/user',
            [{
                data: 'fullName', render: (d?: number) => {
                    return '';
                }
            },
                {data: 'fullName'},
                {data: 'email'},
                {data: 'phoneNumber'},
                {data: 'gender.gender'},
                {data: 'userType.userType'},
                {
                    data: 'creationDate', render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {data: 'actionStatus'},
                // {
                //     data: 'userId', orderable: false,
                //     render: function (id: number, comp: any, entity: Users) {
                //         if (entity.action == 'Update') {
                //             return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                //                 + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;'
                //                 + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;'
                //                 + '<i class=\'fa fa-exchange\' title=\'View Changes\' changes-config-id="' + id + '"></i>'
                //                 + '</div>';
                //         } else {
                //             return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                //                 + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                //                 + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                //                 + '</div>';
                //         }
                //     }
                // }
            ], 'userId', params);
    }

    ngAfterViewInit() {
        // this.renderer.listenGlobal('document', 'click', (event) => {
        //     if (event.target.hasAttribute('edit-config-id')) {
        //         this.router.navigate(['/system/usermanagement/listuser/' + event.target.getAttribute('edit-config-id') + '/update']);
        //     }

        //     if (event.target.hasAttribute('view-config-id')) {
        //         this.router.navigate(['/system/usermanagement/listuser/' + event.target.getAttribute('view-config-id') + '/view']);

        //     }

        //     if (event.target.hasAttribute('changes-config-id')) {
        //         this.router.navigate(['/system/usermanagement/listuser/' + event.target.getAttribute('changes-config-id') + '/changes']);

        //     }
        // });

        $('.select-all-checkbox').click(function () {
            if ($(this).is(':checked')) {
                // @ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().select();
            } else {
                // @ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
            }
        });
    }
    goBack() {
        this.location.back();
      }
}
