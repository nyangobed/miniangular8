import { Component, OnInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { OnboardingserviceService } from '../../onboarding/onboardingservice.service';
import { customer } from '../../onboarding/Entities/customer-model';
import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { partsmaster } from '../../onboarding/Entities/partsmaster';
import {Location} from '@angular/common';
import { ReorderParts } from '../../onboarding/Entities/reorderparts';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
@Component({
  selector: 'app-reordering',
  templateUrl: './reordering.component.html',
  styleUrls: ['./reordering.component.scss'],
  animations: [routerTransition()]
})
export class ReorderingComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  customers;
  constructor(
    // private stewardServices: HttpStewardService<customer, customer>,
    private stewardServices: HttpStewardService<ReorderParts, ReorderParts>,
      protected notify: Notify,
      protected renderer: Renderer,
      public router: Router,
      private location: Location) {

   }
  ngOnInit(): void {
    const params: Map<any, string> = new Map();
    this.dtOptions = this.stewardServices.intiateDataTable('atlas/stocks/partsToBeReordered',
        [
            {
                  data: 'name', render: (d?: any) => ''
            },
            {
              title: 'Opening',
              data: 'openingstock'
           },
            {
               title: 'PartNo',
               data: 'partnumber'
            },
            {
              title: 'Description',
              data: 'partdescription'
            },
            {
              title: 'Stock',
              data: 'stockin'
           },
           {
            title: 'Issued',
            data: 'issuedparts'
         },
         {
          title: 'Available',
          data: 'availablestock'
        },
        {
          title: 'MaxLimit',
          data: 'maxlimit'
       },
            {
               title: 'MinLimit',
               data: 'minlimit'
            },
           
           {
            title: 'ReorderStatus',
            data: 'reoderStatus'
         },
            
            {
               title: 'InTrash',
               data: 'intrash'
            },
            {
               title: 'ActionStatus',
               data: 'actionStatus'
            },
            {
            data: 'id', title: 'Action', orderable: false,
            render: function (id: number, comp: any, entity: ReorderParts) {
                return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                        + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                        + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                        + '</div>';
                }
            }
        ], 'id', params);
}
// tslint:disable-next-line:use-life-cycle-interface
ngAfterViewInit() {
      this.renderer.listenGlobal('document', 'click', (event) => {
          if (event.target.hasAttribute('edit-config-id')) {
              this.router.navigate(['/trcm-lab-automation/parts/createstock/' + event.target.getAttribute('edit-config-id') + '/update']);
          }

          if (event.target.hasAttribute('view-config-id')) {
              this.router.navigate(['/trcm-lab-automation/parts/viewstock/' + event.target.getAttribute('view-config-id') + '/view']);

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
  goBack() {
    // window.history.back();
    this.location.back();
    console.log( 'goBack()...' );
  }
}
