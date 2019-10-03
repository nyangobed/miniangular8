import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Notify } from '../../../../shared/classes/notify';
import { Parts } from '../entities/parts';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';

@Component({
  selector: 'app-secondquarter',
  templateUrl: './secondquarter.component.html',
  styleUrls: ['./secondquarter.component.scss'],
  animations: [routerTransition()]
})
export class SecondquarterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  filter: string;
  constructor(protected stewardService: HttpStewardService<Parts, Parts>,
              protected notify: Notify,
              protected renderer: Renderer,
              public router: Router,
              private location: Location) {
  }
  goBack() {
    // window.history.back();
    this.location.back();
    //( 'goBack()...' );
  }
ngOnInit(): void {
      const params: Map<any, string> = new Map();
      this.dtOptions = this.stewardService.intiateDataTable('atlas/orders/secondQuater',
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
      },

      ],
      // 'parts_id', params
      'id', null, (param: any) => {
          param.needle = this.filter;
      });
}
getFilter() {
  $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
  //        this.stewardService.dataTableReload("sys-config?entity=" + this.filter);
}

}

