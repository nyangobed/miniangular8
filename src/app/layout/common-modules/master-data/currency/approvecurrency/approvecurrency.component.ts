import {AfterViewInit, Component, OnInit, Renderer} from '@angular/core';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {Router} from '@angular/router';
import {routerTransition} from '../../../../../router.animations';
import {Currency} from '../../../../../entities/common-modules-currency-model';

@Component({
  selector: 'app-approvecurrency',
  templateUrl: './approvecurrency.component.html',
  styleUrls: ['./approvecurrency.component.scss'],
    animations: [routerTransition()]
})
export class ApprovecurrencyComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<Currency, Currency>, protected notify: Notify, protected renderer: Renderer, public router: Router) {
    }

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardService.intiateDataTable('ufs-common-modules/api/v1/currency' ,
            [
                {
                    data: 'name', render: (d?: any) => ''
                },
                {
                    title: 'Name',
                    data: 'name'
                },
                {
                    title: 'Currency Code Alpha',
                    data: 'code'
                },
                {
                    title: 'Symbol',
                    data: 'symbol'
                },
                {
                    title: 'Decimal Value',
                    data: 'decimalValue'
                },
                {
                    title: 'Currency Code Numeric',
                    data: 'numericValue'
                },
                {
                    title: 'Action Status',
                    data: 'actionStatus'
                },
                {
                    data: 'id', title: 'Action',
                    render: function (id: number, comp: any, entity: Currency) {
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
                this.router.navigate(['/common-modules/master-data/currency/' + event.target.getAttribute('edit-config-id') + '/update']);
            }

            if (event.target.hasAttribute('view-config-id')) {
                this.router.navigate(['/common-modules/master-data/currency/' + event.target.getAttribute('view-config-id') + '/view']);

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
