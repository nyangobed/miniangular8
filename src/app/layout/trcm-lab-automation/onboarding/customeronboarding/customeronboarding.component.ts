import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { customer } from '../Entities/customer-model';
import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { OnboardingserviceService } from '../onboardingservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customeronboarding',
  templateUrl: './customeronboarding.component.html',
  styleUrls: ['./customeronboarding.component.scss'],
  animations: [routerTransition()]
})

export class CustomeronboardingComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  customers;
  constructor(
    // private stewardServices: HttpStewardService<customer, customer>,
    private onboardingservices: OnboardingserviceService<customer, customer>,
      protected notify: Notify,
      protected renderer: Renderer,
      public router: Router,
      private location: Location) {

   }
  ngOnInit(): void {
    const params: Map<any, string> = new Map();
    this.dtOptions = this.onboardingservices.intiateDataTable('atlas/customers',
        [
            {
                  data: 'name', render: (d?: any) => ''
            },
            {
             title: 'Customer Name',
             data: 'name'
            },
            {
              title: 'Email Address',
              data: 'email'
            },
            {
             title: 'Address',
             data: 'address'
            },
            {
            title: 'Country',
             data: 'country'
            },
            {
            title: 'Phone Number',
            data: 'phone_number'
            },
            {
            title: 'Contact Person',
            data: 'contact_person'
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
            render: function (id: number, comp: any, entity: customer) {
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
              this.router.navigate(['/trcm-lab-automation/onboarding/customer-onboarding/' + event.target.getAttribute('edit-config-id') + '/update']);
          }

          if (event.target.hasAttribute('view-config-id')) {
              this.router.navigate(['/trcm-lab-automation/onboarding/customer-onboarding/' + event.target.getAttribute('view-config-id') + '/view']);

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
