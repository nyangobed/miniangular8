import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
// import { Currency } from '../../../../../entities/common-modules-currency-model';
import { Notify } from '../../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { routerTransition } from '../../../../../router.animations';
import { ErrorCodes } from '../../../../../entities/error-codes-model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-approve-error-codes',
  templateUrl: './approve-error-codes.component.html',
  styleUrls: ['./approve-error-codes.component.scss'],
  animations: [routerTransition()]

})
export class ApproveErrorCodesComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  constructor(protected stewardService: HttpStewardService<ErrorCodes, ErrorCodes>, 
    protected notify: Notify,
     protected renderer: 
     Renderer, public router: Router,
     private location: Location) {
  }

  ngOnInit(): void {
      const params: Map<any, string> = new Map();
      params.set('actionStatus', 'Unapproved');
      this.dtOptions = this.stewardService.intiateDataTable('atlas/device_error' ,
          [
              {
                  data: 'name', render: (d?: any) => ''
              },
              {
                title: 'Code',
                data: 'code'
          },
            {
                  title: 'Code Name',
                  data: 'codeName'
            },
            {
                title: 'Level',
                data: 'level'
          },
            {
                  title: 'Description',
                  data: 'description'
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
                  data: 'id', title: 'Action',
                  render: function (id: number, comp: any, entity: ErrorCodes) {
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
              this.router.navigate(['/common-modules/master-data/error-codes/create-error-codes/' + event.target.getAttribute('edit-config-id') + '/update']);
          }

          if (event.target.hasAttribute('view-config-id')) {
              this.router.navigate(['/common-modules/master-data/error-codes/view-error-codes/' + event.target.getAttribute('view-config-id') + '/view']);

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
