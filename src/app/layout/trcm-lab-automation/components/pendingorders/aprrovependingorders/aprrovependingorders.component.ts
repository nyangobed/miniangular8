import { Component, OnInit, Renderer } from '@angular/core';
import { Location } from '@angular/common';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { routerTransition } from '../../../../../router.animations';
import { PartsRequisition } from '../../../../../entities/partsrequisition';
import { Notify } from '../../../../../shared/classes/notify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aprrovependingorders',
  templateUrl: './aprrovependingorders.component.html',
  styleUrls: ['./aprrovependingorders.component.scss'],
  animations: [routerTransition()]
})
export class AprrovependingordersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  customers;
  constructor(
        //   private stewardServices: HttpStewardService<customer, customer>,
        private stewardServices: HttpStewardService<PartsRequisition, PartsRequisition>,
        protected notify: Notify,
        protected renderer: Renderer,
        public router: Router ,
        private location: Location) {
        //     this.onboardingservices.getCustomers().subscribe(results => this.customers = results.data.content);
  }
  ngOnInit(): void {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardServices.intiateDataTable('atlas/ordersReceivedd',
              [
                {
                  data: 'name', render: (d?: any) => ''
            },
            {
              title: 'PO Number',
              data: 'ponumber'
             },
            {
             title: 'Part Number',
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
             title: 'Date Received',
             data: 'datereceived'
            },
            {
              title: 'Balance',
              data: 'balance'
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
  
        console.log( 'goBack()...' );
      }
  }
