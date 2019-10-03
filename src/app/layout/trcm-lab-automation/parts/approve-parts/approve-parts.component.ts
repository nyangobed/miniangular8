import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Parts } from '../entities/parts';

@Component({
  selector: 'app-approve-parts',
  templateUrl: './approve-parts.component.html',
  styleUrls: ['./approve-parts.component.scss'],
  animations: [routerTransition()]
})
export class ApprovePartsComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  constructor(protected stewardService: HttpStewardService<Parts, Parts>,
              protected notify: Notify,
              protected renderer: Renderer,
              public router: Router,
              private location: Location) {
  }
  goBack() {
    // window.history.back();
    this.location.back();
    //( 'goBack()...' );
  }
  ngOnInit(): void {
      const params: Map<any, string> = new Map();
     params.set('actionStatus', 'Unapproved');
      this.dtOptions = this.stewardService.intiateDataTable('atlas/parts',
          [
            {
                data: 'name', render: (d?: any) => ''
          },
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
            this.router.navigate(['../../../trcm-lab-automation/parts/parts-onboarding/' + event.target.getAttribute('view-config-id') + '/view']);

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
