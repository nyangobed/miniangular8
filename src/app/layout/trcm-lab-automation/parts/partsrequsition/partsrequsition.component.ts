
  import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
  import { routerTransition } from '../../../../router.animations';
  import { Router } from '@angular/router';
  import { Location } from '@angular/common';
import { OnboardingserviceService } from '../../onboarding/onboardingservice.service';
import { Notify } from '../../../../shared/classes/notify';
import { customer } from '../../onboarding/Entities/customer-model';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { PartsRequisition } from '../../../../entities/partsrequisition';

@Component({
  selector: 'app-partsrequsition',
  templateUrl: './partsrequsition.component.html',
  styleUrls: ['./partsrequsition.component.scss'], 
   animations: [routerTransition()]
})
export class PartsrequsitionComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  customers;
  constructor(
    //private stewardServices: HttpStewardService<PartsRequisition, PartsRequisition>,
    private onboardingservices: OnboardingserviceService<PartsRequisition, PartsRequisition>,
      protected notify: Notify,
      protected renderer: Renderer,
      public router: Router,
      private location: Location) {

   }
  ngOnInit(): void {
    const params: Map<any, string> = new Map();
    this.dtOptions = this.onboardingservices.intiateDataTable('atlas/requestParts',
        [
            {
                  data: 'name', render: (d?: any) => ''
            },
            {
             title: 'Part Number',
             data: 'partnumber'
            },
            {
              title: 'Quantity',
              data: 'quantity'
            },
            {
              title: 'Part Description',
              data: 'partdescription'
            },
            {
             title: 'Date Requested',
             data: 'dateRequested'
            },
            {
            title: 'Created On',
            data: 'creationDate'
            },
            {
            title: 'In trash',
            data: 'intrash'
            },
           
            {
            title: 'Action Status',
            data: 'actionStatus'
            },
            {
            data: 'id', title: 'Action', orderable: false,
            render: function (id: number, comp: any, entity: PartsRequisition) {
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
              this.router.navigate(['/trcm-lab-automation/parts/partsrequsition/editpartrequisition/' + event.target.getAttribute('edit-config-id') + '/update']);
          }

          if (event.target.hasAttribute('view-config-id')) {
              this.router.navigate(['/trcm-lab-automation/parts/partsrequsition/view-part-requisition/' + event.target.getAttribute('view-config-id') + '/view']);

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
    //( 'goBack()...' );
  }
}
