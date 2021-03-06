import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { RepairCentre } from '../../../../entities/repair-centre';

@Component({
  selector: 'app-repair-centre',
  templateUrl: './repair-centre.component.html',
  styleUrls: ['./repair-centre.component.scss'],
  animations: [routerTransition()]
})
export class RepairCentreComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  constructor(protected stewardService: HttpStewardService<RepairCentre, RepairCentre>,
              protected notify: Notify,
              protected renderer: Renderer,
              public router: Router) {
  }

  ngOnInit(): void {
      const params: Map<any, string> = new Map();
      this.dtOptions = this.stewardService.intiateDataTable('device_error',
          [
              {
                    data: 'name', render: (d?: any) => ''
              },
              
              {
                    title: 'Name',
                    data: 'name'
              },
              {
                    title: 'Region',
                    data: 'region'
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
                  data: 'id', title: 'Action', orderable: false,
                  render: function (id: number, comp: any, entity: RepairCentre) {
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
              this.router.navigate(['/common-modules/master-data/error-codes/' + event.target.getAttribute('edit-config-id') + '/update']);
          }

          if (event.target.hasAttribute('view-config-id')) {
              this.router.navigate(['/common-modules/master-data/error-codes/' + event.target.getAttribute('view-config-id') + '/view']);

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
}
