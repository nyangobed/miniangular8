import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Parts } from '../entities/parts';
import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { routerTransition } from '../../../../router.animations';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  animations: [routerTransition()]
})
export class ToolsComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  constructor(protected stewardService: HttpStewardService<Parts, Parts>,
              protected notify: Notify,
              protected renderer: Renderer,
              public router: Router) {
  }

  ngOnInit(): void {
      const params: Map<any, string> = new Map();
      this.dtOptions = this.stewardService.intiateDataTable('atlas/parts',
          [
              {
                    data: 'name', render: (d?: any) => ''
              },
        //       {
        //         title: 'Part ID',
        //         data: 'parts_id'
        //   },
              {
                    title: 'Part Name',
                    data: 'partName'
              },
              {
                    title: 'Part Model',
                    data: 'partModel'
              },
              {
                    title: 'Part Number',
                    data: 'partNumber'
              },
              {
                    title: 'Part Description',
                    data: 'description'
              },
            //   {
            //         title: 'Quantity',
            //         data: 'quantity'
            //   },
    //   {
    //             title: ' InTrash',
    //             data: 'intrash'
    //       },
          {
            title: 'Manufacturer',
            data: 'manufacturerName'
      },
          {
            title: 'Action Status',
            data: 'actionStatus'
      },
                        {
                  data: 'parts_id', title: 'Action', orderable: false,
                  render: function (id: number, comp: any, entity: Parts) {
                      return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                          + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                          + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                          + '</div>';
                  }
              }
          ], 'parts_id', params);
  }

  ngAfterViewInit() {
      this.renderer.listenGlobal('document', 'click', (event) => {
          if (event.target.hasAttribute('edit-config-id')) {
              this.router.navigate(['../../../trcm-lab-automation/parts/parts-onboarding/' + event.target.getAttribute('edit-config-id') + '/update']);
          }

          if (event.target.hasAttribute('view-config-id')) {
              this.router.navigate(['../../../trcm-lab-automation/parts/view-parts/' + event.target.getAttribute('view-config-id') + '/view']);

          }
      });

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
}
