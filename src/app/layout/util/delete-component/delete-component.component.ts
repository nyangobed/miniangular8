import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {CheckerActions} from '../../../entities/wrappers/checker-actions';
import {TdDialogService} from '@covalent/core/dialogs';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {MatDialog} from '@angular/material';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-delete-component',
    templateUrl: './delete-component.component.html',
    styleUrls: ['./delete-component.component.scss']
})
export class DeleteComponentComponent implements OnInit {
    @Input() checkerActions: CheckerActions<any>;
    @Input() selectedIds: Array<any>;

    @Input() deleteLabel: string;
    @Input() endpoint: string;

    @Input() addLabel: string;
    @Input() approveLabel: string;

    @Input() approveLink: string;
    @Input() addLink: string;

    constructor(private _dialogService: TdDialogService,
         private _viewContainerRef: ViewContainerRef,
          protected stewardService: HttpStewardService<any, any>, 
          protected notify: Notify, public dialog: MatDialog) {
    // tslint:disable-next-line:max-line-length
        this.checkerActions = new CheckerActions();
        this.selectedIds = new Array();
    }

    ngOnInit() {
    }

    openConfirm(): void {
        const ids: Array<any> = new Array();
        $.each($('.selected', document.getElementsByTagName('table')[0]), function (index: number, row: any) {
            ids.push($(row).attr('data-id'));
        });
        if (ids.length < 1) {
            this.notify.showWarning('Please select atleast one entry');
            return;
        }

        this.checkerActions.ids = ids;
        /*
                this._dialogService.openPrompt({
                    message: 'Are you sure you want to delete the selected record(s). Add notes below',
                    disableClose: true || false,
                    viewContainerRef: this._viewContainerRef,
                    title: 'Confirm Delete',
                    value: '',
                    cancelButton: 'Cancel',
                    acceptButton: 'Delete',
                    width: '500px',
                }).afterClosed().subscribe((newValue: string) => {
                    if (newValue) {
                        this.checkerActions.notes = newValue;
                        this.stewardService.delete(this.endpoint, this.checkerActions).subscribe((response) => {
                            if (response.code === 200) {
                                this.notify.showSuccess(response.message);
                                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                            } else {
                                this.notify.showWarning(response.message);
                            }
                        });

                    } else {
                        // DO SOMETHING ELSE
                    }
                });*/


        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {
                checkerActions: this.checkerActions,
                selectedIds: ids,
                endpoint: this.endpoint,
                addLabel: this.addLabel,
                approveLabel: this.approveLabel,
                addLink: this.addLink,
                approveLink: this.approveLink,
                deleteLabel: this.deleteLabel
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);

        });

    }
}
