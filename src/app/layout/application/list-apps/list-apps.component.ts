import {Component, OnInit, Input, AfterViewInit, Renderer} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {DeviceModel} from '../../../entities/device-model';
import {Product} from '../../../entities/product-model';
import {DeviceMake} from '../../../entities/device-make';
import {Application} from '../../../entities/application';
import {Router} from '@angular/router';

@Component({
    selector: 'app-list-apps',
    templateUrl: './list-apps.component.html',
    styleUrls: ['./list-apps.component.scss'],
    animations: [routerTransition()]
})
export class ListAppsComponent implements OnInit, AfterViewInit {
    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<any, any>, protected renderer: Renderer, private router: Router) {
    }

    ngOnInit() {
        this.dtOptions = this.stewardService.intiateDataTable('app-management',
            [
                {
                    data: 'product',
                    render: (d: Product) => {
                        return '';
                    }
                },
                {
                    data: 'product',
                    render: (d: Product) => {
                        return d.productName;
                    }
                },
                {
                    data: 'model',
                    render: (d: DeviceModel) => {
                        return d.model;
                    }
                },
                {data: 'appName'},
                {data: 'appVersion'},
                {data: 'action'},
                {data: 'actionStatus'},
                {
                    data: 'releaseDate', render: (d: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {
                    data: 'appId', orderable: false,
                    render: function (id: number, comp: any, entity: Application) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit\' data-edit-id=\'' + id + '\' title=\'Edit\'></i>'
                            + '</div>';
                    }
                }
            ], 'appId',);
    }

    ngAfterViewInit(): void {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('data-edit-id')) {
                this.router.navigate(['application/' + event.target.getAttribute('data-edit-id') + '/update']);
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
