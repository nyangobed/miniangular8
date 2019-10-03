import {AfterViewInit, Component, OnInit, Renderer} from '@angular/core';
import {HttpStewardService} from '../../../../shared/services/http-steward.service';
import {Currency} from '../../../../entities/currency-model';
import {Notify} from '../../../../shared/classes/notify';
import {Router} from '@angular/router';
import {routerTransition} from '../../../../router.animations';
import { Regions } from '../../../../entities/regions-model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-geographical-regions',
  templateUrl: './geographical-regions.component.html',
  styleUrls: ['./geographical-regions.component.scss'],
    animations: [routerTransition()]
})
export class GeographicalRegionsComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<Regions, Regions>,
                protected notify: Notify,
                protected renderer: Renderer,
                public router: Router,
                private location: Location) {
    }

  ngOnInit(): void {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable('atlas/regions',
            [
                {
                      data: 'regionName', render: (d?: any) => ''
                },

                {
                      title: 'Region Name',
                      data: 'regionName'
                },
                {
                    title: 'Code',
                    data: 'code'
              },

                {
                    title: 'Action Status',
                    data: 'actionStatus'
              },
              {
                title: 'Created On',
                data: 'createdOn'
          },
          {
            title: 'In trash',
            data: 'intrash'
      },

                {
                    data: 'regions_id', title: 'Action', orderable: false,
                    render: function (id: number, comp: any, entity: Regions) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                            + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                            + '</div>';
                    }
                }
            ], 'regions_id', params);
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate(['/common-modules/master-data/geographical-regions/' + event.target.getAttribute('edit-config-id') + '/update']);
            }

            if (event.target.hasAttribute('view-config-id')) {
                this.router.navigate(['/common-modules/master-data/geographical-regions/' + event.target.getAttribute('view-config-id') + '/view']);

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
    
        // //( 'goBack()...' );
      }
  }
