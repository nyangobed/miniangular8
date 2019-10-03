import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Parts } from '../entities/parts';
import { Notify } from '../../../../shared/classes/notify';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OnboardingserviceService } from '../../onboarding/onboardingservice.service';


@Component({
  selector: 'app-firstquarter',
  templateUrl: './firstquarter.component.html',
  styleUrls: ['./firstquarter.component.scss'],
  animations: [routerTransition()]
})
export class FirstquarterComponent implements OnInit{
    dtOptions: DataTables.Settings = {};
    upload: FormGroup;
    filter: string;
    countries = [];
    Year: any;
    quater = '';
    // tslint:disable-next-line:no-inferrable-types
    public isUpdate: boolean = false;
    id: Number;
    submitted = false;
    constructor(protected stewardService: HttpStewardService<Parts, Parts>,
                protected notify: Notify,
                protected renderer: Renderer,
                public router: Router,
                private location: Location,
                private fb: FormBuilder,
                private onboardingservices: OnboardingserviceService<any, any>,
                private route: ActivatedRoute,
               ) {

    }

    goBack() {
        // window.history.back();
        this.location.back();
        //( 'goBack()...' );
      }

 ngOnInit(): void {

        const params: Map<any, string> = new Map();
        // this.dtOptions = this.stewardService.intiateDataTable('orders/' + this.quater + '?Year=' + year ,
        this.dtOptions = this.stewardService.intiateDataTable('atlas/orders/firstQuater'  ,
            [
                {
                      data: 'name', render: (d?: any) => ''
                },
                {
                      title: 'Description',
                       data: 'description'
                },
                {
                      title: 'Date Purchased',
                      data:  'dtpurchased'
                },
                {
                      title: 'Purchase Order No',
                      data:  'ponumber'
                },
                {
                  title: 'Date Received',
                  data: 'datereceived',
                  render: function(data) {
                      return data ? data.serialnumber : '';
                  }
            }
                        ],
             'id', params
            );
            this.createForm();
   }

   getFilter() {
    $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
          //  this.stewardService.dataTableReload('sys-config?entity=' + this.filter);

}
  createForm() {
    this.upload = this.fb.group({
      Year: ['']
    });
  }

      get f() { return this.upload.controls; }
  }

