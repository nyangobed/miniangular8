import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { OnboardingserviceService } from '../../../onboarding/onboardingservice.service';
import { customer } from '../../../onboarding/Entities/customer-model';
import { routerTransition } from '../../../../../router.animations';
import {Location} from '@angular/common';

@Component({
  selector: 'app-approveorders',
  templateUrl: './approveorders.component.html',
  styleUrls: ['./approveorders.component.scss'],
  animations: [routerTransition()]
})
export class ApproveordersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  customers;
  constructor(
        //   private stewardServices: HttpStewardService<customer, customer>,
        private onboardingservices: OnboardingserviceService<customer, customer>,
        protected notify: Notify,
        protected renderer: Renderer,
        public router: Router ,
        private location: Location) {
        //     this.onboardingservices.getCustomers().subscribe(results => this.customers = results.data.content);
  }
  ngOnInit(): void {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.onboardingservices.intiateDataTable('atlas/orders',
              [
                  {
                        data: 'name', render: (d?: any) => ''
                  },
                  {
                   title: 'Description',
                   data: 'description'
                  },
                  {
                    title: 'Purchase Order No',
                    data: 'ponumber'
                  },
                  {
                   title: 'Part No',
                   data: 'partnumber'
                  },
                  {
                  title: 'Quantity Purchased',
                   data: 'qtpurchased'
                  },
                  {
                  title: 'Quantity Received',
                  data: 'qtreceived'
                  },
                  {
                    title: 'Balance',
                    data: 'balance'
                    },

                  {
                  title: 'Date Purchased',
                  data: 'dtpurchased'
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
                    this.router.navigate(['/trcm-lab-automation/onboarding/createorders/' + event.target.getAttribute('edit-config-id') + '/update']);
              }
              if (event.target.hasAttribute('view-config-id')) {
                    this.router.navigate(['/trcm-lab-automation/onboarding/vieworders/' + event.target.getAttribute('view-config-id') + '/view']);

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
