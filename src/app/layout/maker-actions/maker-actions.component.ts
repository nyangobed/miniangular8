import {AfterViewInit, Component, Input, OnInit, Renderer, ViewChild} from '@angular/core';
import {CheckerActions} from '../../entities/wrappers/checker-actions';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MakerDialogComponent} from '../maker-dialog/maker-dialog.component';

@Component({
    selector: 'app-maker-actions',
    templateUrl: './maker-actions.component.html',
    styleUrls: ['./maker-actions.component.scss']
})
export class MakerActionsComponent<T> implements OnInit, AfterViewInit {
    checkerActions: CheckerActions<T>;
    selectedIds: Array<any>;
    @Input() deleteButton = 'Delete';
    @Input() buttonLabel: string;
    @Input() endpoint: string;
    @Input() actionEndpoint: string = '/';
    @Input() addLabel = 'Add New';
    @Input() addLink = '';
    @Input() deleteLabel = 'Delete';
    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;
    @Input() dtOptions: any;
    modal: NgbModalRef;
    @Input() approveLabel: string = 'Approve';
    @Input() approveLink: string;
    @Input() confirmLink: string;
    @Input() confirmLabel: string;
    @Input() confirm: boolean = false;

    constructor(public dialog: MatDialog, protected renderer: Renderer, private router: Router) {
        this.checkerActions = new CheckerActions();
        this.selectedIds = new Array();
    }

    ngOnInit() {
        const sp = this;
        const table = document.getElementById('list-make-table');
        table.onselect = function (event: Event) {
            sp.selectedIds = new Array();
            $.each($('.selected', table), function (index: number, row: any) {
                sp.selectedIds.push($(row).attr('data-id'));
            });
        };
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(MakerDialogComponent, {
            width: '500px',
            data: {
                checkerActions: this.checkerActions,
                selectedIds: this.selectedIds,
                deleteButton: this.deleteButton,
                buttonLabel: this.buttonLabel,
                endpoint: this.endpoint,
                actionEndpoint: this.actionEndpoint,
                addLabel: this.addLabel,
                addLink: this.addLink,
                deleteLabel: this.deleteLabel,
                datatableElement: this.datatableElement,
                dtOptions: this.dtOptions
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('data-edit-id')) {
                //                console.debug(this.actionEndpoint + "/" + event.target.getAttribute("data-edit-id") + '/update');
                this.router.navigate(['/' + this.actionEndpoint + '/' + event.target.getAttribute('data-edit-id') + '/update']);
            }
        });
    }

    /*
    constructor(protected stewardService: HttpStewardService<any, any>, protected notify: Notify, protected modalService: NgbModal, protected renderer: Renderer, private router: Router, private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef) {
        this.checkerActions = new CheckerActions();
        this.selectedIds = new Array();
    }

    ngOnInit() {
        const sp = this;
        const table = document.getElementById('list-make-table');
        table.onselect = function (event: Event) {
            sp.selectedIds = new Array();
            $.each($(".selected", table), function (index: number, row: any) {
                sp.selectedIds.push($(row).attr("data-id"));
            });
        }
    }

    public setEndpoint(endpoint: string): void {
        console.debug('Accessor value: ' + endpoint);
        this.endpoint = endpoint;
    }


    processAction(form: NgForm) {
        this.checkerActions.ids = this.selectedIds;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }
        console.debug(this.selectedIds);
        //        if (this.checkerActions.action == 'delete') {
        this.stewardService.delete(this.endpoint, this.checkerActions).subscribe((response) => {
            this.processResponse(form, response);
        });
    }

    private processResponse(form: NgForm, response: ResponseWrapper<any>) {
        if (response.code == 200) {
            this.notify.showSuccess(response.message);
            $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
            form.resetForm();
            this.modal.close();
        } else {
            this.notify.showWarning(response.message);
        }
    }

    deleteAction(form: NgForm): void {
        this.stewardService.put(this.endpoint, this.checkerActions).subscribe((response) => {
            this.processResponse(form, response);
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    open(content: any, action: string) {
        this.checkerActions.action = action;
        this.buttonLabel = action;
        this.modal = this.modalService.open(content);
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute("data-edit-id")) {
                //                console.debug(this.actionEndpoint + "/" + event.target.getAttribute("data-edit-id") + '/update');
                this.router.navigate(["/" + this.actionEndpoint + "/" + event.target.getAttribute("data-edit-id") + '/update']);
            }
        });
    }*/

}
