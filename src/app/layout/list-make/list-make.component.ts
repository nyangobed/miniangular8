import {AfterViewInit, Component, OnInit, Renderer} from '@angular/core';
import {HttpStewardService} from '../../shared/services/http-steward.service';
import {DeviceMake} from '../../entities/device-make';
import {routerTransition} from '../../router.animations';
import {Router} from '@angular/router';
import {DeviceFileExt} from '../../entities/device-file-type';

@Component({
    selector: 'app-list-make',
    templateUrl: './list-make.component.html',
    styleUrls: ['./list-make.component.scss'],
    animations: [routerTransition()]
})
export class ListMakeComponent implements OnInit, AfterViewInit {

    dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceMake, any>, protected renderer: Renderer, private router: Router) {
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable('device/make',
            [
                {data: 'make', render: (d?: any) => ''},
                {data: 'make'},
                {data: 'vendorName'},
                {data: 'description'},
                {data: 'action'},
                {data: 'actionStatus'},
                {
                    data: 'makeId',
                    render: function (id: number, comp: any, entity: DeviceMake) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit\' data-edit-id=\'' + id + '\' title=\'Edit\'></i>'
                            + '</div>';
                    }
                }
            ], 'makeId', params);
    }

    open() {

    }

    ngAfterViewInit(): void {
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
