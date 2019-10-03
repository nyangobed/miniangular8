import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { OnboardingserviceService } from '../../trcm-lab-automation/onboarding/onboardingservice.service';
import { Notify } from '../../../shared/classes/notify';
import { manufacturer } from '../../trcm-lab-automation/onboarding/Entities/manufacturer-model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manufacturer-reports',
  templateUrl: './manufacturer-reports.component.html',
  styleUrls: ['./manufacturer-reports.component.scss'],
  animations: [routerTransition()]
})
export class ManufacturerReportsComponent implements OnInit, AfterViewInit{
  dtOptions: DataTables.Settings = {};
  Manufacturers;
  errorMsg = '';
  upload: FormGroup;
    constructor(
      //   private stewardServices: HttpStewardService<manufacturer, manufacturer>,
      private onboardingservices: OnboardingserviceService<manufacturer, manufacturer>,
      protected notify: Notify,
      protected renderer: Renderer,
      public router: Router,
      private location: Location,
      private fb: FormBuilder) {
        this.createForm() ;
     }
     createForm() {
      this.upload = this.fb.group({
        to: [''],
        from: ['']
      });
    }
   ngOnInit(): void{
      const params: Map<any, string> = new Map();
      this.dtOptions = this.onboardingservices.intiateDataTable('atlas/manufacturers',
        [
          {
            data: 'name', render: (d?: any) => ''
          },
          {
            title: 'Manufacturer Name',
            data: 'manufacturer'
          },
          {
            title: 'Email',
            data: 'email'
          },
          {
            title: 'Address',
            data: 'address'
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
            render: function (id: number, comp: any, entity: manufacturer) {
              return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                + '</div>';
            }
          }
        ], 'id', params);

    }
    ngAfterViewInit() {
      this.renderer.listenGlobal('document', 'click', (event) => {
        if (event.target.hasAttribute('edit-config-id')) {
          this.router.navigate(['/trcm-lab-automation/onboarding/manufacturer-onboarding/' + event.target.getAttribute('edit-config-id') + '/create-manufacturer']);
        }

        if (event.target.hasAttribute('view-config-id')) {
          this.router.navigate(['/trcm-lab-automation/onboarding/manufacturer-onboarding/' + event.target.getAttribute('view-config-id') + '/view']);

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
    FilterByDate() {
      // tslint:disable-next-line:prefer-const
      let inst = this;
        // Instantiate a FormData to store form fields and encode the file
      const body = new FormData();
      body.append('from', this.upload.get('from').value);
      body.append('to', this.upload.get('to').value);
      this.onboardingservices.gett('manufacturers/filterByDate', body)
        .subscribe((data) => {
          //(data);
          // tslint:disable-next-line:triple-equals
          if (data.code == 200) {
            inst.notify.showSuccess(data.message);
            // inst.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding']);
          } else {
            inst.notify.showWarning(data.message);
          }
        }, error => {
          //(error);
        });
      }
    goBack() {
      // window.history.back();
      this.location.back();

      //( 'goBack()...' );
    }
  }
