import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { Notify } from '../../../shared/classes/notify';
import { OnboardingserviceService } from '../../trcm-lab-automation/onboarding/onboardingservice.service';
import { device } from '../../trcm-lab-automation/onboarding/Entities/device-model';
import { Location } from '@angular/common';
import { ByDate } from '../../trcm-lab-automation/onboarding/Entities/date-model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpStewardService } from '../../../shared/services/http-steward.service';
// import { Filter } from '../../trcm-lab-automation/onboarding/Entities/date-model';

@Component({
  selector: 'app-device-reports',
  templateUrl: './device-reports.component.html',
  styleUrls: ['./device-reports.component.scss'],
  animations: [routerTransition()]
})
export class DeviceReportsComponent implements OnInit {
      dtOptions: DataTables.Settings = {};
      customers;
      upload: FormGroup;
      device = [];
      @ViewChild('fileInput') fileInput: ElementRef;
      constructor(
          private stewardServices: HttpStewardService<any, any>,
            // private onboardingservices: OnboardingserviceService<any, any>,
            protected notify: Notify,
            protected renderer: Renderer,
            public router: Router,
            private location: Location,
            private fb: FormBuilder,
           ) {
            this.createForm() ;
  }
  createForm() {
    this.upload = this.fb.group({
      to: [''],
      from: ['']
    });
  }

  ngOnInit(): void {
      const params: Map<any, string> = new Map();
      this.dtOptions = this.stewardServices.intiateDataTable('atlas/devices',
      [
              {
      data: 'name', render: (d?: any) => ''
              },
              {
                    title: 'Serial Number',
                    data: 'serialnumber'
              },
              {
                    title: 'Part Number',
                     data: 'partnumber'
               },
               {
                    title: 'IMEI Number',
                    data: 'imeinumber'
              },
              {
                    title: 'Model',
                    data: 'deviceModels'
              },
              {
                    title: 'Device Owner',
                     data: 'deviceowner'
                },
               {
                     title: 'Creation Date',
                     data: 'creationDate'
                },
                {
                    title: 'Warranty Starts',
                     data: 'warranty_starts'
                  },
                {
                    title: 'Warranty Period',
                     data: 'warrantyperiod'
                  },
                  {
                     title: 'Warranty Expiry',
                     data: 'warrantyExpire'
                  },
                  {
                     title: 'Warranty Status',
                     data: 'deviceWarantyStatus'
                  },
                  {
                        title: 'AMC Period',
                      data: 'contractperiod'
                    },
                    {
                         title: 'Contract Starts',
                         data: 'contract_starts'
                    },
                   {
                       title: 'Contract Expiry',
                         data: 'contract_expires'
                    },
                    {
                    title: 'Contract Status',
                    data: 'deviceContractStatus'
                    },
                    {
                     title: 'Action Status',
                      data: 'actionStatus'
                    },
                     {
                  data: 'id', title: 'Action', orderable: false,
                  render: function (id: number, comp: any, entity: device) {
                      return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                           + '<i class=\'fa fa-edit pointer\' title=\'update contract period\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
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
                 this.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding/update-contractperiod/' + event.target.getAttribute('edit-config-id') + '/edit']);
            }
       if (event.target.hasAttribute('view-config-id')) {
                this.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding/' + event.target.getAttribute('view-config-id') + '/view']);

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
