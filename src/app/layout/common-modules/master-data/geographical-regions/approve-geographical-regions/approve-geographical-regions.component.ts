import {AfterViewInit, Component, OnInit, Renderer} from '@angular/core';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Currency} from '../../../../../entities/currency-model';
import {Notify} from '../../../../../shared/classes/notify';
import {Router} from '@angular/router';
import {routerTransition} from '../../../../../router.animations';
import { Regions } from '../../../../../entities/regions-model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-approve-geographical-regions',
  templateUrl: './approve-geographical-regions.component.html',
  styleUrls: ['./approve-geographical-regions.component.scss'],
    animations: [routerTransition()]
})
export class ApproveGeographicalRegionsComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<Regions, Regions>,
                protected notify: Notify,
                protected renderer: Renderer, 
                public router: Router,
                private location: Location) {
    }

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardService.intiateDataTable('atlas/regions',
            [
                {
                    data: 'regions_id', render: (d?: any) => ''
                },
                {
                    title: ' Region Name',
                    data: 'regionName'
                },
                {
                    title: ' Region Code',
                    data: 'code'
                },
                {
                    title: 'Action Status',
                    data: 'actionStatus'
                },
                {
                    title: 'In trash',
                    data: 'intrash'
              }
            ], 'regions_id', params);
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
