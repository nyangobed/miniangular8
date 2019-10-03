import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { SearchWrapper } from '../../models/search/search-wrapper';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Notify } from '../../../../shared/classes/notify';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-device-reports',
  templateUrl: './device-reports.component.html',
  styleUrls: ['./device-reports.component.scss'],
  animations: [routerTransition()]
})
export class DeviceReportsComponent implements OnInit {

  model: SearchWrapper;
  client = [];
  public dtOptions: DataTables.Settings;
  displayview: boolean = false;

  constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
      this.model = new SearchWrapper();
  }

  ngOnInit() {
    // const inst = this;
    //     this.stewardService.get('atlas/customers').subscribe(response => {
    //         if (response.code === 200) {
    //             inst.client = response.data.content;
    //         } else {
    //             inst.notify.showWarning(response.message);
    //         }
    //     });
  }

  onQueryHistory(form: NgForm) {
      let params: Map<any, string> = new Map();
      params.set('end', this.model.end);
      params.set('start', this.model.start);
      params.set('customer', this.model.customer);
      this.dtOptions = this.stewardService.intiateDataTable('atlas/repair/search',
          [
              {
                data: 'Id', 
                render: (d?: any) => ''
              },
              {
                title: 'Serial Number',
                data: 'devices',
                render: function(data: any) {
                  return data ? data.serialnumber : '';
                }
              },
              {
                title: 'Part Number',
                data: 'devices',
                render: function(data: any) {
                  return data ? data.partnumber : '';
                }
              },
              {
                title: 'Customer',
                data: 'devices',
                render: function(data: any) {
                  return data ? data.deviceowner : '';
                }
              },
              {
                title: 'Repair Centre',
                data: 'repairCentre',
                render: function(data: any) {
                  return data ? data : '';
                }
              },
              {
                title: 'Date Received',
                data: 'createdOn',
                render: function(data: any) {
                  return data ? data : '';
                }
              },
              {
                title: 'Date QA Passed',
                data: 'qaTestPassedDate',
                render: function(data: any) {
                  return data ? data : '';
                }
              },
              {
                title: 'Reported Defects',
                data: 'reportedDefects',
                render: function(data) {
                    return data ? data : '';
                }
              },
              {
                title: 'Failure Found',
                data: 'deviceErrors',
                render: function (data: Array<any>) {
                    if (data != null) {
                        try {
                            return data.map(s => s.code).join(' ');
                        } catch (e) {
                            return data;
                        }
                    }
                    return data;
                }
            },
            {
              title: 'Parts',
              data: 'parts',
              render: function (data: Array<any>) {
                  if (data != null) {
                      try {
                          return data.map(s => s.partNumber).join(', ');
                      } catch (e) {
                          return data;
                      }
                  }
                  return data;
              }
          },
              {
                title: 'Repair Status',
                data: 'repairStatus',
                render: function(data) {
                    return data ? data : '';
                }
              },
              {
                title: 'Action Status',
                data: 'actionStatus',
                render: function(data) {
                    return data ? data : '';
                }
              }
          ], 'Id', params);
      this.displayview = true;
  }

}
