import {AfterViewInit, Component, Input, OnDestroy, OnInit, Renderer, ViewChild} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {Router} from '@angular/router';
import {DeviceModel} from '../../../entities/device-model';
import {DataTableDirective} from 'angular-datatables';
import {Devices} from '../../../entities/devices-list-model';
import {DatePipe} from '@angular/common';
import { OnboardingserviceService } from '../../trcm-lab-automation/onboarding/onboardingservice.service';
import { customer } from '../../trcm-lab-automation/onboarding/Entities/customer-model';

@Component({
    selector: 'app-device-list-template',
    templateUrl: './device-list-template.component.html',
    styleUrls: ['./device-list-template.component.scss']
})
export class DeviceListTemplateComponent implements OnDestroy, OnInit, AfterViewInit {
    @Input() actionStatus: string = 'Released';
    public dtOptions: DataTables.Settings;
    minDate = new Date();
    maxDate = new Date(2020, 0, 1);

    defaultTime = {hour: 13, minute: 30};
    meridianTime = {hour: 13, minute: 30};
    meridian = true;
    seconds = true;
    fromDate: Date = new Date(2017, 0, 1);
    toDate: Date = new Date();
    redrawn: boolean = false;

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;

    constructor(
        // protected stewardService: HttpStewardService<any, any>,
        protected onboardingservices: OnboardingserviceService<any, any>,
         protected renderer: Renderer, protected notify: Notify, private router: Router, private datePipe: DatePipe) {
    }

    ngOnInit() {
        let inst = this;
        this.dtOptions = this.onboardingservices.intiateDataTable('customers',
            [
                {data: 'id', render: (d?: any) => ''},
                {data: 'name', title: 'Name'},
                {
                    data: 'email', title: 'Email',
                },
                {data: 'address', title: 'Address'},
                // {data: ' phone_number', title: 'Number'},
                {data: 'country', title: 'Country'},
                {
                    title: 'Created On',
                    data: 'creationDate'
                    },
                {
                    data: 'customerId', orderable: false,
                    render: function (id: number, comp: any, entity: customer) {
                        if (inst.actionStatus == 'all') {
                            return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                                + '<i class=\'fa fa-eye pointer\' title=\'View\' edit-config-id="' + id + '"></i>'
                                + '</div>';
                        } else {
                            return '';
                        }
                    }
                }
            ], 'customerId', null, (params: any) => {
                params.from = this.datePipe.transform(this.fromDate, 'yyyy/MM/dd');
                params.to = this.datePipe.transform(this.toDate, 'yyyy/MM/dd');
                if (this.actionStatus != 'all') {
                    params.action = this.actionStatus;
                }
            });
    }

    ngOnDestroy(): void {
        // We remove the last function in the global ext search array so we do not add the fn each time the component is drawn
        // /!\ This is not the ideal solution as other components may add other search function in this array, so be careful when
        // handling this global variable
        $.fn['dataTable'].ext.search.pop();
    }

    ngAfterViewInit() {
        const sp = this;
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate(['/devices/list/' + event.target.getAttribute('edit-config-id') + '/update']);
            }
        });
    }

    filterById(): void {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

}
