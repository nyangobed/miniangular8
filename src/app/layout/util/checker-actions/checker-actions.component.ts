import {Component, OnInit, Input} from '@angular/core';
import {CheckerActions} from '../../../entities/wrappers/checker-actions';
import {NgForm, FormGroup, FormControl} from '@angular/forms';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material';
import {CheckerDialogComponent} from '../checker-dialog/checker-dialog.component';

@Component({
    selector: 'app-checker-actions',
    templateUrl: './checker-actions.component.html',
    styleUrls: ['./checker-actions.component.scss']
})
export class CheckerActionsComponent implements OnInit {

    @Input() checkerActions: CheckerActions<any>;
    formGroup: FormGroup;
    @Input() selectedIds: Array<any>;
    @Input() endpoint: string;
    @Input() approveLabel = 'Approve';
    @Input() declineLabel = 'Decline';
    modal: NgbModalRef;

    constructor(public dialog: MatDialog, protected stewardService: HttpStewardService<any, any>,
        protected notify: Notify, protected modalService: NgbModal) {
        this.checkerActions = new CheckerActions();
        this.checkerActions.action = 'approve';
        this.selectedIds = new Array();

    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            action: new FormControl()
        });
    }


    approve(form: NgForm) {
        const ids: Array<any> = new Array();
        $.each($('.selected', document.getElementsByTagName('table')[0]), function (index: number, row: any) {
            ids.push($(row).attr('data-id'));
        });
        if (ids.length < 1) {
            this.notify.showWarning('Please select atleast one entry');
            return;
        }
        this.checkerActions.ids = ids;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }
        this.stewardService.putNoToken(this.endpoint + '/' + this.checkerActions.action.toLowerCase() + '-actions',
        this.checkerActions).subscribe((response) => {
            if (response.code === 200) {
                this.modal.close();
                this.notify.showSuccess(response.message);
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                this.resetForm(form);
            } else {
                this.notify.showWarning(response.message);
            }
            form.resetForm();
        });
    }

    resetForm(form: NgForm) {
        form.resetForm();
    }


    open(content: any, action: string) {
        this.checkerActions.action = action;
        // this.modal = this.modalService.open(content);
        const dialogRef = this.dialog.open(CheckerDialogComponent, {
            width: '500px',
            data: {
                checkerActions: this.checkerActions,
                selectedIds: this.selectedIds,
                formGroup: this.formGroup,
                endpoint: this.endpoint,
                approveLabel: this.approveLabel,
                declineLabel: this.declineLabel
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }


}
