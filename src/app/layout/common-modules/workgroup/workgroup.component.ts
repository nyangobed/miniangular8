import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { HttpStewardService } from '../../../shared/services/http-steward.service';
import { Router } from '@angular/router';
import { Workgroups } from '../../../entities/work-groups-model';
import {routerTransition} from '../../../router.animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.scss'],
  animations: [routerTransition()]
})
export class WorkgroupComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
constructor(protected stewardService: HttpStewardService<any, any>, protected renderer: Renderer, public router: Router, private location: Location) { }

  ngOnInit() {
      let params: Map<any, string> = new Map();
      this.dtOptions = this.stewardService.intiateDataTable('ufs-common-modules/api/v1/workgroup',
          [
              {data: 'groupName', render: (d?: any) => ''},
              {data: 'groupName', title: 'Name'},
              {data: 'description', title: 'Description'},
              {
                  data: 'createdOn', title: 'Created',
                  render: (d?: number) => {
                      return new Date(d).toLocaleString();
                  }
              },
              {data: 'action', title: 'Action'},
              {data: 'actionStatus', title: 'Action Status'},
              {
                  data: 'groupId', title: 'Action', orderable: false,
                  render: function (id: number, comp: any, entity: Workgroups) {
                      return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                          + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                          + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                          + '</div>';
                  }
              }
          ], 'groupId', params);
  }
  ngAfterViewInit() {
      this.renderer.listenGlobal('document', 'click', (event) => {
          if (event.target.hasAttribute('edit-config-id')) {
              this.router.navigate(['/common-modules/workgroups/' + event.target.getAttribute('edit-config-id') + '/update']);
          }

          if (event.target.hasAttribute('view-config-id')) {
              this.router.navigate(['/common-modules/workgroups/' + event.target.getAttribute('view-config-id') + '/view']);

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

    //( 'goBack()...' );
  }

}

