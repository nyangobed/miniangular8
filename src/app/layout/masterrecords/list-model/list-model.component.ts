import {AfterViewInit, Component, Input, OnInit, Renderer} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {DeviceModel} from '../../../entities/device-model';
import {DeviceType} from '../../../entities/device-type';
import {DeviceMake} from '../../../entities/device-make';
import {DeviceFileExt} from '../../../entities/device-file-type';
import {Router} from '@angular/router';

@Component({
    selector: 'app-list-model',
    templateUrl: './list-model.component.html',
    styleUrls: ['./list-model.component.scss'],
    animations: [routerTransition()]
})
export class ListModelComponent implements OnInit, AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceModel, any>, protected renderer: Renderer, private router: Router) {
    }

    ngOnInit() {
        this.dtOptions = this.stewardService.intiateDataTable('device/model',
            [
                {data: 'model', render: (d?: any) => ''},
                {data: 'model'},
                {
                    data: 'deviceType',
                    render: (d?: DeviceType) => {
                        return d.type;
                    }
                },
                {
                    data: 'make',
                    render: (d?: DeviceMake) => {
                        return d.make;
                    }
                }, {
                data: 'deviceFileExt',
                render: function (entity?: DeviceFileExt) {
                    if (entity != null) {
                        return entity.paramFileExt;
                    } else {
                        return '';
                    }
                }
            },
                {data: 'description'},
                {data: 'action'},
                {data: 'actionStatus'},
                {
                    data: 'modelId', orderable: false,
                    render: function (id: number, comp: any, entity: DeviceModel) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit\' data-edit-id=\'' + id + '\' title=\'Edit\'></i>'
                            + '</div>';
                    }
                }
            ], 'modelId');
    }

    ngAfterViewInit(): void {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('data-edit-id')) {
                this.router.navigate(['masterrecords/device-model/' + event.target.getAttribute('data-edit-id') + '/update']);
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
