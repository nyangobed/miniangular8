import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {Product} from "../../../../entities/product-model";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {ITreeOptions, TreeComponent} from "angular-tree-component";
import {BusinessUnitItem} from "../../../../entities/param-business-unit-item-model";
import {CheckerActions} from "../../../../entities/wrappers/checker-actions";
import {FormGroup, FormControl, NgForm} from "@angular/forms";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ViewParamBase} from "../../../../shared/base/viewParamBase";
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material';
import {ViewBusinessUnitDialogComponent} from '../../view-business-unit-dialog/view-business-unit-dialog.component';
import {DialogActionsComponent} from '../../../dialog-actions/dialog-actions.component';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    animations: [routerTransition()]
})
export class ManageComponent implements OnInit {
    @Input() dtOptions: DataTables.Settings;
    products: Array<Product>;
    selectedValue: any = {};
    productId: number;


    options: ITreeOptions = {
        allowDrag: false,
        allowDrop: false,
        useCheckbox: false
    };

    nodes: Array<BusinessUnitItem>;

    checkerActions: CheckerActions<any>;
    formGroup: FormGroup;
    endpoint: string;
    approveLabel: string = "Approve";
    declineLabel: string = "Decline";
    editLabel: string = "Edit";
    modal: NgbModalRef;

    canActivate: boolean = false;
    isSelected: boolean = false;


    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    isEstatePresent: boolean = true;

    @ViewChild(TreeComponent)
    private tree: TreeComponent;

    constructor(public dialog: MatDialog, protected stewardService: HttpStewardService<any, any>, protected notify: Notify, protected modalService: NgbModal, protected router: Router) {
        this.products = new Array();
        this.nodes = new Array();
        this.checkerActions = new CheckerActions();
        this.checkerActions.action = 'approve';
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            action: new FormControl()
        });

        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Approved");
        params.set("sort", "productId,desc");

        let inst = this;
        this.stewardService.get("products", params).subscribe((response) => {
            if (response.code == 200) {
                inst.products = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        this.stewardService.get("business-units/unititems/parents", params).subscribe((response) => {
            if (response.code == 200) {
                inst.nodes = response.data;
                this.loadNodes(inst.nodes);
            } else {
                inst.notify.showWarning(response.message);
            }
        });

    }
    loadNodes(nodes: Array<BusinessUnitItem>) {
        //(nodes);
        let inst = this;

        ($('#take1').on("changed.jstree", function (e, data) {
            if (data.selected.length) {
                inst.canActivate = false;
                inst.isSelected = false;
                inst.viewparam = new Array();
                inst.selectedValue = data.instance.get_node(data.selected[0]).original;
                if (inst.selectedValue.actionStatus == "Unapproved") {
                    inst.canActivate = true;
                }
                let order: number = 1;
                for (let data of inst.objectKeys(inst.selectedValue)) {
                    if (inst.selectedValue[data] != '' && (typeof inst.selectedValue[data]) != 'object') {
                        inst.viewparam.push({
                            value: inst.selectedValue[data],
                            label: data.toLowerCase(),
                            order: order,
                        });
                    }
                    order++;
                }
                inst.isSelected = true;
            }
        }) as any).jstree({
            'core': {
                'multiple': false,
                'data': nodes
            }
        });
    }
    updateContent() {
        let params: Map<any, string> = new Map();
        let inst = this;
        this.isEstatePresent = true;
        this.canActivate = false;
        this.isSelected = false;

        inst.nodes = new Array();

        this.stewardService.get("business-units/unititems/product/" + this.productId, params).subscribe((response) => {
            if (response.code == 200) {
                if (response.data == null) {
                    this.isEstatePresent = false;
                } else {
                    if (response.data.length == 0) {
                        this.isEstatePresent = false;
                    } else {
                        inst.nodes = response.data;
                        this.loadNodes(inst.nodes);
                        // @ts-ignore
                        $('#take1').jstree(true).refresh();
                    }
                }
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    onEvent(event: any) {
        this.canActivate = false;
        this.isSelected = false;
        this.viewparam = new Array();
        if (event.eventName == 'focus') {
            //(event.node.data);

            this.selectedValue = event.node.data;
            if (this.selectedValue.actionStatus == "Unapproved") {
                this.canActivate = true;
            }
            let inst = this;
            let order: number = 1;
            for (let data of inst.objectKeys(inst.selectedValue)) {
                if (inst.selectedValue[data] != '' && (typeof inst.selectedValue[data]) != 'object') {
                    //(data.toLowerCase());
                    if (data.toLowerCase() != 'unititemid' || data.toLowerCase() != 'isparent' || data.toLowerCase() != 'intrash' || data.toLowerCase() != 'id') {
                        inst.viewparam.push({
                            value: inst.selectedValue[data],
                            label: data.toLowerCase(),
                            order: order,
                        });
                    }
                }
                order++;
            }
            this.isSelected = true;
        }
    }

    approve(form: NgForm) {
        const ids: Array<any> = new Array();
        ids.push(this.selectedValue.unitItemId);
        if (ids.length < 1) {
            this.notify.showWarning('Please select atleast one entry');
            return;
        }

        this.checkerActions.ids = ids;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }

        this.stewardService.put('business-units/unititems/' + this.checkerActions.action.toLowerCase() + '-actions', this.checkerActions).subscribe((response) => {
            if (response.code === 200) {
                this.modal.close();
                this.notify.showSuccess(response.message);
                this.resetForm(form);
                this.router.navigate(['/estate/manage-estate']);
            } else {
                this.notify.showWarning(response.message); 
            }

        });
    }

    resetForm(form: NgForm) {
        form.resetForm();
    }



    open(content: any, action: string) {
        /* this.checkerActions.action = action;
         this.modal = this.modalService.open(content);*/
        const ids: Array<any> = new Array();
        ids.push(this.selectedValue.unitItemId);
        this.checkerActions.ids = ids;
        this.checkerActions.action = action;
        //(this.checkerActions);
        let dialogRef = this.dialog.open(DialogActionsComponent, {
            width: '500px',
            data: {
                checkerActions: this.checkerActions,
                selectedIds: ids,
                formGroup: this.formGroup,
                endpoint: "business-units/unititems",
                approveLabel: this.approveLabel,
                declineLabel: this.declineLabel
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }

    viewUnits() {
        let dialogRef = this.dialog.open(ViewBusinessUnitDialogComponent, {
            width: '500px',
            data: {
                viewparam: this.viewparam
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }

    openEdit() {
        this.router.navigate(['/estate/unititem/' + this.selectedValue.unitItemId + '/update']);
    }

}
