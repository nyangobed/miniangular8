import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {DeviceType} from '../../../entities/device-type';

@Component({
    selector: 'app-list-device-type',
    templateUrl: './list-device-type.component.html',
    styleUrls: ['./list-device-type.component.scss'],
    animations: [routerTransition()]
})
export class ListDeviceTypeComponent implements OnInit, AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceType, any>) {}

    ngOnInit() {
        this.dtOptions = this.stewardService.intiateDataTable("device/type",
            [
                {data: 'type', render: (d?: any) => ''},
                {data: 'type'},
                {data: 'description'},
                {data: 'action'},
                {data: 'actionStatus'},
                {
                    data: "deviceTypeId", orderable: false,
                    render: function (id: number, comp: any, entity: DeviceType) {
                        return "<div class='actions-buttons center' id='" + id + "'>"
                            + "<i class='fa fa-edit' data-edit-id='" + id + "' title='Edit'></i>"
                            + "</div>";
                    }
                }
            ], 'deviceTypeId', );
    }
    
    ngAfterViewInit(): void {
        $(".select-all-checkbox").click(function () {
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
