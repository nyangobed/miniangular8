import { Component, OnInit, Renderer } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../router.animations';
import { Notify } from '../../../shared/classes/notify';
import { HttpStewardService } from '../../../shared/services/http-steward.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingenico-reports',
  templateUrl: './ingenico-reports.component.html',
  styleUrls: ['./ingenico-reports.component.scss'],
  animations: [routerTransition()]
})
export class IngenicoReportsComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};

  constructor(
    protected notify: Notify,
    protected renderer: Renderer,
    private httpStewardService: HttpStewardService<any, any>,
    public router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    const params: Map<any, string> = new Map();
    this.dtOptions = this.httpStewardService.intiateDataTable('atlas/shipped_repair',

        [
            {
              data: 'devices.id', render: (d?: any) => ''
            },
            {
              title: 'Client',
              data: 'devices.deviceowner'
            },
            {
                  title: 'PCBA P/N',
                  data: 'pcba_pn'
            },
            {
                  title: 'PCBA S/N',
                  data: 'pcba_sn'
            },
            {
                  title: 'Board Defect',
                  data: 'board_defect'
            },
            {
              title: 'Terminal S/N',
              data: 'devices.serialnumber'
            },
            {
                  title: 'Terminal P/N',
                  data: 'devices.partnumber'
            },
            {
              title: 'PKI Version',
              data: 'pki_version'
            },
            {
              title: 'Mac ID',
              data: 'mac_id'
            },
            {
              title: 'IMEI',
              data: 'devices.imeinumber'
            },
            {
              title: 'BT Address',
              data: 'bt_address'
            },
            {
              title: 'WIFI',
              data: 'wifi'
            },
            {
              title: 'Printer Type',
              data: 'printer_type'
            },
            {
              title: 'Note',
              data: 'note'
            },
            {
              title: 'Date',
              data: 'creationOn'
            },
            {
              title: 'Action Status',
              data: 'actionStatus'
            },
            // {
            //     data: 'id', title: 'Action', orderable: false,
            //     render: function (id: number, comp: any, entity: Repair) {
            //         return '<div class=\'actions-buttons right\' id=\'' + id + '\'>'
            //             + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
            //             + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
            //             + '</div>';
            //     }
            // }
        ], 'id', params);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
  //   this.renderer.listenGlobal('document', 'click', (event) => {
  //       if (event.target.hasAttribute('edit-config-id')) {
  //           this.router.navigate(['/trcm-lab-automation/components/shipped/view-shipped' + event.target.getAttribute('edit-config-id') + '/edit']);
  //       }
  // if (event.target.hasAttribute('view-config-id')) {
  //           this.router.navigate(['/trcm-lab-automation/components/shipped/view-shipped' + event.target.getAttribute('view-config-id') + '/view']);

  //       }
  //   });

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

    /** REDIRECT THE PAGE */
    goBack() {
      // window.history.back();
      this.location.back();

    }

}
