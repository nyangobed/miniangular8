import {AfterViewInit, Component, OnInit, Renderer, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Schedule} from '../../../entities/schedules-model';
import {Product} from '../../../entities/product-model';
import {Router} from '@angular/router';
import {CheckerActions} from '../../../entities/wrappers/checker-actions';
import {TdDialogService} from '@covalent/core/dialogs';
import {Notify} from '../../../shared/classes/notify';
import {MatDialog} from '@angular/material';
import {CancelScheduleComponent} from './cancel-schedule/cancel-schedule.component';

@Component({
    selector: 'app-listschedule',
    templateUrl: './listschedule.component.html',
    styleUrls: ['./listschedule.component.scss'],
    animations: [routerTransition()]
})
export class ListscheduleComponent implements OnInit, AfterViewInit {
    public dtOptions: DataTables.Settings;
    checkerActions: CheckerActions<any>;
    selectedIds: Array<any>;

    constructor(public dialog: MatDialog, private _dialogService: TdDialogService, private _viewContainerRef: ViewContainerRef, protected stewardService: HttpStewardService<any, any>, protected renderer: Renderer, public router: Router, protected notify: Notify) {
        this.checkerActions = new CheckerActions();
        this.selectedIds = new Array();
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable('schedule',
            [
                {data: 'noFiles', render: (d?: any) => ''},
                {
                    data: 'scheduledTime',
                    title: 'Schedule Time',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {data: 'noFiles', title: 'No of Files'},
                {
                    data: 'productId', title: 'Business Unit',
                    render: (d?: Product) => {
                        return d.productName;
                    }
                },
                {
                    data: 'scheduleType', title: 'Schedule Type'
                },
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'},
                {
                    data: 'scheduleId', orderable: false,
                    render: function (id: number, comp: any, entity: Schedule) {
                        if (new Date(entity.scheduledTime) > new Date()) {
                            return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                                + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                                + '<i class=\'fa fa-close pointer\' title=\'cancel\' cancel-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                                + '</div>';
                        } else {
                            return ' ';
                        }
                    }
                }
            ], 'scheduleId', params);
    }

    ngAfterViewInit(): void {
        const inst = this;
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate(['/schedule/list/' + event.target.getAttribute('edit-config-id') + '/update']);
            } else if (event.target.hasAttribute('cancel-config-id')) {
                const ids: Array<any> = new Array();
                ids.push(event.target.getAttribute('cancel-config-id'));
                //(ids);

                inst.checkerActions.ids = ids;

                /* inst._dialogService.openPrompt({
                     message: 'Are you sure you want to Cancel the selected record(s). Add notes below',
                     disableClose: true || false,
                     viewContainerRef: inst._viewContainerRef,
                     title: 'Confirm Cancel',
                     value: '',
                     cancelButton: 'Close',
                     acceptButton: 'Cancel ',
                     width: '500px',
                 }).afterClosed().subscribe((newValue: string) => {
                     if (newValue) {
                         inst.checkerActions.notes = newValue;
                         //(inst.checkerActions);
                         inst.stewardService.put('schedule/cancel', inst.checkerActions).subscribe((response) => {
                             if (response.code === 200) {
                                 inst.notify.showSuccess(response.message);
                                 $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                             } else {
                                 inst.notify.showWarning(response.message);
                             }
                         });

                     } else {
                         // DO SOMETHING ELSE
                     }
                 });*/

                const dialogRef = this.dialog.open(CancelScheduleComponent, {
                    width: '500px',
                    data: {
                        checkerActions: this.checkerActions,
                        selectedIds: ids,
                        endpoint: 'schedule/cancel',
                        addLabel: '',
                        approveLabel: '',
                        addLink: '',
                        approveLink: '',
                        deleteLabel: 'Cancel Schedule'
                    }
                });

                dialogRef.afterClosed().subscribe(result => {
                    $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);;
                });
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
