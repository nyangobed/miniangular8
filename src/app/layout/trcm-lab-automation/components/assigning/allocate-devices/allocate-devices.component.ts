import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {CheckerDialogComponent} from '../../../../util/checker-dialog/checker-dialog.component';
import {AssignAction} from '../../../models/repair/assign-action';
import {AssignDialogComponent} from '../assign-dialog/assign-dialog.component';

@Component({
  selector: 'app-allocate-devices',
  templateUrl: './allocate-devices.component.html',
  styleUrls: ['./allocate-devices.component.scss']
})
export class AllocateDevicesComponent implements OnInit {


    @Input() assignActions: AssignAction<any>;
    @Input() selectedIds: Array<any>;
    @Input() endpoint: string;
    @Input() assignLabel = 'Assign';
    modal: NgbModalRef;
    user = [];

    constructor(public dialog: MatDialog, protected stewardService: HttpStewardService<any, any>,
                protected notify: Notify, protected modalService: NgbModal) {
        this.assignActions = new AssignAction();
        this.selectedIds = new Array();

    }

    ngOnInit() {

        const inst = this;

        this.stewardService.get('ufs-common-modules/api/v1/user/technicians').subscribe(response => {

            if (response.code === 200) {
                inst.user = response.data;
            } else {
                inst.notify.showWarning('Oops Something went wrong!');
            }
        });
    }


    onSubmit(form: NgForm) {
        const ids: Array<any> = new Array();

        $.each($('.selected', document.getElementsByTagName('table')[0]), function (index: number, row: any) {
            ids.push(parseInt($(row).attr('data-id')));
        });
        if (ids.length < 1) {
            this.notify.showWarning('Please select at least one entry');
            return;
        }
        this.assignActions.ids = ids;
        if (this.assignActions.repairModel === null) {
            this.notify.showWarning('Please select at least one Technician');
        }

        let userObject = {
            ids: [], 
            repairModel: {
                users: '',
                comments: '',
                deviceErrors: [],
                failureFound: '',
                parts: [],
                qaTest: '',
                repairCentre: '',
                repairStatus: '',
                reportedDefects: '',
        }
    };
        userObject.repairModel.users = this.assignActions.repairModel;
        userObject.ids = this.assignActions.ids;

        this.stewardService.put(this.endpoint + '/' + 'update',
        userObject)
            .subscribe((response) => {
            if (response.code === 200) {
                this.modal.close();
                this.notify.showSuccess('Technician Assigned Successfully');
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                this.resetForm(form);
            } else {
                // this.notify.showWarning(response.message);
                this.notify.showWarning('Oops Something went wrong! please try again later');
            }
            form.resetForm();
        });
    }

    resetForm(form: NgForm) {
        form.resetForm();
    }


    open(content: any) {
        /*this.modal = this.modalService.open(content);*/
        const dialogRef = this.dialog.open(AssignDialogComponent, {
            width: '500px',
            data: {
                assignActions: this.assignActions,
                selectedIds: this.selectedIds,
                endpoint: this.endpoint,
                assignLabel: this.assignLabel,
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }



}
