import {Component, OnInit, Renderer} from '@angular/core';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Currency} from '../../../../../entities/currency-model';
import {Notify} from '../../../../../shared/classes/notify';
import {Router} from '@angular/router';
import {routerTransition} from '../../../../../router.animations';
import { BankRegions } from '../../../../../entities/bank-regions-model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-approve-bank-regions',
  templateUrl: './approve-bank-regions.component.html',
  styleUrls: ['./approve-bank-regions.component.scss'],
    animations: [routerTransition()]
})
export class ApproveBankRegionsComponent implements OnInit {
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<BankRegions, BankRegions>,
                protected notify: Notify,
                protected renderer: Renderer,
                public router: Router,
                private location: Location) {
    }

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardService.intiateDataTable('atlas/bank_regions',
            [
                {
                    data: 'bankRegions_id', render: (d?: any) => ''
                },
                {
                    title: 'Branch Name',
                    data: 'branchName'
                },
                {
                    title: 'Code',
                    data: 'code'
                },
                {
                    title: 'Created On',
                    data: 'createdOn'
              },
              {
                title: 'Action Status',
                data: 'actionStatus'
            },
              {
                title: 'Action',
                data: 'action'
          },
            ], 'bankRegions_id', params);
    }

    ngAfterViewInit() {
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
        this.location.back();
      }

}
