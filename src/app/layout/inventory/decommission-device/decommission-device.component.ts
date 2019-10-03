import {Component, OnInit, Renderer} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {Router} from '@angular/router';
import {DeviceModel} from '../../../entities/device-model';
import {Devices} from '../../../entities/devices-list-model';

@Component({
    selector: 'app-decommission-device',
    templateUrl: './decommission-device.component.html',
    styleUrls: ['./decommission-device.component.scss'],
    animations: [routerTransition()]
})
export class DecommissionDeviceComponent implements OnInit {
    public dtOptions: DataTables.Settings;
    constructor(protected stewardService: HttpStewardService<any, any>, protected renderer: Renderer, protected notify: Notify, private router: Router) {
    }

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Approved");
        this.dtOptions = this.stewardService.intiateDataTable("devices",
            [
                {data: 'partNumber', render: (d?: any) => ''},
                {data: 'serialNo', title: 'Serial Number'},
                {
                    data: 'modelId', title: 'Model',
                    render: (d?: DeviceModel) => {
                        return d.model;
                    }
                },
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'},
                {
                    data: 'deviceId', title: 'Decomission', orderable:false,
                    render: function (id: number, comp: any, entity: Devices) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-power-off pointer\' title=\'Decomission\' edit-config-id="' + id + '"></i>'
                            + '</div>';
                    }
                }
            ], 'deviceId', params);
    }

    ngAfterViewInit() {
        const sp = this;
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute("edit-config-id")) {
                this.router.navigate(["/devices/list/" + event.target.getAttribute("edit-config-id") + "/decommission"]);
            }
        });
    }

}
