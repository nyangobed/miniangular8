import {Component, OnInit, Renderer, AfterViewInit} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {Router} from '@angular/router';
import {DeviceModel} from '../../../entities/device-model';

@Component({
    selector: 'app-devices-listing',
    templateUrl: './devices-listing.component.html',
    styleUrls: ['./devices-listing.component.scss']
})
export class DevicesListingComponent implements OnInit, AfterViewInit {
    public dtOptions: DataTables.Settings;
    constructor(protected stewardService: HttpStewardService<any, any>, protected renderer: Renderer, protected notify: Notify, private router: Router) {
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Approved');
        params.set('status', 'Active');
        this.dtOptions = this.stewardService.intiateDataTable('devices',
            [
                {data: 'partNumber', render: (d?: any) => ''},
                {data: 'serialNo', title: 'Serial Number'},
                {
                    data: 'modelId', title: 'Model',
                    render: (d?: DeviceModel) => {
                        return d.model;
                    }
                },
                {data: 'merchantName', title: 'Merchant Name', orderable: false},
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'}
            ], 'deviceId', params);
    }

    ngAfterViewInit() {
        const sp = this;
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate(['/devices/list/' + event.target.getAttribute('edit-config-id') + '/update']);
            }
        });
        $('.select-all-checkbox').click(function () {
            if ($(this).is(':checked')) {
                //@ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().select();
            } else {
                //@ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
            }
        });
    }

}
