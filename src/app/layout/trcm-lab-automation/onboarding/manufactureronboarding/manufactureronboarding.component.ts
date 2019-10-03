import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { manufacturer } from '../Entities/manufacturer-model';
import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { OnboardingserviceService } from '../onboardingservice.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-manufactureronboarding',
  templateUrl: './manufactureronboarding.component.html',
  styleUrls: ['./manufactureronboarding.component.scss'],
  animations: [routerTransition()]
})
export class ManufactureronboardingComponent implements OnInit, AfterViewInit {
  // , AfterViewInit
  dtOptions: DataTables.Settings = {};
  Manufacturers;
  errorMsg = '';

  constructor(
    //   private stewardServices: HttpStewardService<manufacturer, manufacturer>,
    private onboardingservices: OnboardingserviceService<manufacturer, manufacturer>,
    protected notify: Notify,
    protected renderer: Renderer,
    public router: Router,
    private location: Location) {

  }

  ngOnInit(): void {
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
  goBack() {
    // window.history.back();
    this.location.back();

    //( 'goBack()...' );
  }
}
