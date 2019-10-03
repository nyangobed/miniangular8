import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';

import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OnboardingserviceService } from '../../onboarding/onboardingservice.service';
import { test } from '../../onboarding/Entities/parts-issue';
@Component({
  selector: 'app-parts-issued',
  templateUrl: './parts-issued.component.html',
  styleUrls: ['./parts-issued.component.scss'],
  animations: [routerTransition()]
})
export class PartsIssuedComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  customers;
  constructor(
    // private stewardServices: HttpStewardService<customer, customer>,
    private onboardingservices: OnboardingserviceService<test, test>,
      protected notify: Notify,
      protected renderer: Renderer,
      public router: Router,
      private location: Location) {

   }
  ngOnInit(): void {
    const params: Map<any, string> = new Map();
    this.dtOptions = this.onboardingservices.intiateDataTable('atlas/issueParts',
        [
            {
                  data: 'id', render: (d?: any) => ''
            },
            {
              title: 'Part Number',
              data: 'partNumber'
            },
            {
             title: 'Parts Issued',
             data: 'partsIssued'
            },
           
            {
             title: 'Date Issued',
             data: 'dateIssued'
            },
            {
            title: 'Created On',
            data: 'creationDate'
            },
            {
            title: 'Intrash',
            data: 'intrash'
            },
            {
            title: 'Action Status',
            data: 'actionStatus'
            },
           {
            data: 'id', title: 'Action', orderable: false,
            render: function (id: number, comp: any, entity: test) {
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
              this.router.navigate(['/trcm-lab-automation/parts/parts-issued/edit-parts-issued/' + event.target.getAttribute('edit-config-id') + '/update']);
          }

          if (event.target.hasAttribute('view-config-id')) {
              this.router.navigate(['/trcm-lab-automation/parts/viewparts/' + event.target.getAttribute('view-config-id') + '/view']);

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
