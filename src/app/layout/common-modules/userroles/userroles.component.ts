import {Component, OnInit, Renderer, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Roles} from '../../../entities/roles-modules';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
@Component({
    selector: 'app-userroles',
    templateUrl: './userroles.component.html',
    styleUrls: ['./userroles.component.scss'],
    animations: [routerTransition()]
})
export class UserrolesComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<Roles, Roles>,
         protected renderer: Renderer,
         public router: Router,
         private location: Location) {
    }

    ngOnInit() {
        let params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable('ufs-common-modules/api/v1/role',
            [
                {data: 'roleName', render: (d?: any) => ''},
                {data: 'roleName', title: 'Name'},
                {data: 'description', title: 'Role'},
                {
                    data: 'creationDate', title: 'Created',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'},
                {
                    data: 'roleId', title: 'Action', orderable: false,
                    render: function (id: number, comp: any, entity: Roles) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                            + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                            + '</div>';
                    }
                }
            ], 'roleId', params);
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate(['/common-modules/userroles/createroles/' + event.target.getAttribute('edit-config-id') + '/update']);
            }

            if (event.target.hasAttribute('view-config-id')) {
                this.router.navigate(['common-modules/roles/list/' + event.target.getAttribute('view-config-id') + '/view']);

            }
        });

        $('.select-all-checkbox').click(function () {
            if ($(this).is(':checked')) {
                //@ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().select();
            } else {
                //@ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
            }
        });
    }
    goBack() {
        // window.history.back();
        this.location.back();
    
        // //( 'goBack()...' );
      }

}
