import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../entities/product-model';
import {BusinessItem} from '../../../entities/param-business-unit';
import {MatDialog} from '@angular/material';
import {UnitDialogComponent} from '../unit-dialog/unit-dialog.component';
import {CheckerActions} from '../../../entities/wrappers/checker-actions';
import {FormGroup, FormControl} from '@angular/forms';
import {DialogActionsComponent} from '../../dialog-actions/dialog-actions.component';

@Component({
    selector: 'app-organization-hierachy',
    templateUrl: './organization-hierachy.component.html',
    styleUrls: ['./organization-hierachy.component.scss'],
    animations: [routerTransition()]
})
export class OrganizationHierachyComponent implements OnInit {
    products: Array<Product>;
    businessUnits: Array<BusinessItem>;
    selectedValue: any;
    checkerActions: CheckerActions<any>;
    selectedIds: Array<any>;
    endpoint: string;
    approveLabel: string = "Approve";
    declineLabel: string = "Decline";
    formGroup: FormGroup;

    constructor(public dialog: MatDialog, private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.products = new Array();
        this.businessUnits = new Array();
        this.checkerActions = new CheckerActions();
        this.selectedIds = new Array();
    }

    ngOnInit() {
        let inst = this;
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Approved");
        this.stewardService.get("products", params).subscribe(response => {
            if (response.code == 200) {
                this.products = response.data.content;
                if (this.products.length > 0) {
                    this.fetchBusinessUnitsByproduct(this.products[0].productId);
                }
            } else {
                //(response);
            }
        },
            error => {
                //(error);
            });

        this.formGroup = new FormGroup({
            action: new FormControl()
        });
    }

    fetchBusinessUnitsByproduct(productId: any) {
        let params: Map<any, string> = new Map();
        params.set("productId", productId);
        this.stewardService.get("business-units", params).subscribe(response => {
            if (response.code == 200) {
                this.businessUnits = response.data.content.sort((a, b) => a.levelNo - b.levelNo);
            } else {
                //(response);
            }
        },
            error => {
                //(error);
            });
    }

    updateContent() {
        this.fetchBusinessUnitsByproduct(this.selectedValue);
    }

    addBusinessUnit() {
        let inst = this;
        if (this.selectedValue == null) {
            this.notify.showWarning("Please Select a Business Units on your left !!")
        } else {
            let dialogRef = this.dialog.open(UnitDialogComponent, {
                width: '500px',
                data: {
                    product: this.products.filter(x => x.productId == this.selectedValue)[0],
                    orgComp: inst,
                    action: "add",
                    unitId: null
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (this.selectedValue != null) {
                    //('The dialog was closed');
                    let params: Map<any, string> = new Map();
                    params.set("productId", this.selectedValue);
                    this.stewardService.get("business-units", params).subscribe(response => {
                        if (response.code == 200) {
                            this.businessUnits = response.data.content.sort((a, b) => a.levelNo - b.levelNo);
                        } else {
                            //(response);
                        }
                    },
                        error => {
                            //(error);
                        });
                }
            });
        }
    }

    editBusinessUnit(unit: BusinessItem) {
        let inst = this;
        let dialogRef = this.dialog.open(UnitDialogComponent, {
            width: '500px',
            data: {
                product: this.products.filter(x => x.productId == this.selectedValue)[0],
                orgComp: inst,
                action: "update",
                unitName: unit.unitName,
                unitId: unit.unitId
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }

    perfomrAction(unit: BusinessItem, action: string) {
        const ids: Array<any> = new Array();
        ids.push(unit.unitId);
        this.checkerActions.ids = ids;
        this.checkerActions.action = action;
        //(this.checkerActions);
        let dialogRef = this.dialog.open(DialogActionsComponent, {
            width: '500px',
            data: {
                checkerActions: this.checkerActions,
                selectedIds: ids,
                formGroup: this.formGroup,
                endpoint: "business-units",
                approveLabel: this.approveLabel,
                declineLabel: this.declineLabel
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }

}
