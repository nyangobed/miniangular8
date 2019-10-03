import {Component, OnInit, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../../router.animations';
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {BusinessUnitItem} from "../../../../entities/param-business-unit-item-model";
import {ActivatedRoute, Router} from "@angular/router";
import {TmsBusinessUnitItemWrapper} from "../../../../entities/wrappers/businesunititem-wrapper";
import {Product} from "../../../../entities/product-model";
import {BusinessItem} from "../../../../entities/param-business-unit";
import {ViewParamBase} from "../../../../shared/base/viewParamBase";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    animations: [routerTransition()]
})
export class CreateComponent implements OnInit, AfterViewInit {
    isLinear = false;
    products: Array<Product>;
    model: TmsBusinessUnitItemWrapper;
    selectedValue: number;
    isFailed = false;
    isSuccess = false;
    message: string;
    subheader: string;

    closeResult: string;
    bizzUnits: Array<BusinessUnitItem>;

    bizzUnit: BusinessItem;

    position = 'above';

    bizzUnitChild: BusinessUnitItem[];
    panelOpenState = false;


    step2: any = {
        showNext: true,
        showPrev: true
    };

    step3: any = {
        showSecret: false
    };

    data: any = {};

    isCompleted: boolean = false;


    public items;
    public AllowParentSelection = true;
    public ShowFilter = true;
    public Disabled = false;
    public FilterPlaceholder = 'Type Estate Name...';
    public MaxDisplayed = 10;
    public simpleSelected;
    unitId: number;
    createParent: boolean = false;
    hideAllSteps: boolean = false;
    isUpdate: boolean = false;

    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;


    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, protected router: Router, public snackBar: MatSnackBar) {
        this.model = new TmsBusinessUnitItemWrapper();
        this.bizzUnitChild = new Array();
        this.bizzUnits = new Array();
        this.viewparam = new Array();
        this.products = new Array();
    }


    ngOnInit() {
        let params: Map<any, string> = new Map();
        let inst = this;
        params.set("actionStatus", "Approved");
        this.stewardService.get("products", params).subscribe((response) => {
            if (response.code == 200) {
                inst.products = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        this.stewardService.get("business-units/unititems/parents", params).subscribe((response) => {
            if (response.code == 200) {
                inst.bizzUnits = response.data;
                inst.setBusinessUnit(response.data);
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.getBusinessUnitItem(params['id']);
            }
        });
    }

    ngAfterViewInit(): void {
        let inst = this;
        ($('#rootwizard') as any).bootstrapWizard({
            onTabShow: function (tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $('#rootwizard').find('.pager .next').hide();
                    $('#rootwizard').find('.pager .finish').show();
                    $('#rootwizard').find('.pager .finish').removeClass('disabled');
                } else {
                    $('#rootwizard').find('.pager .next').show();
                    $('#rootwizard').find('.pager .finish').hide();
                }

            },

            onNext: function (tab, navigation, index) {
                var form = $('form[name="step' + index + '"]');

                console.debug("Working just fine...[" + index + "]....");

                if (index != 4) {
                    (form as any).parsley().validate();

                    if (!(form as any).parsley().isValid()) {
                        return false;
                    }
                }

                if (index == 3) {
                    if (!inst.createParent) {
                        inst.model.unitId = inst.simpleSelected.unitSource.unitId;
                        inst.model.parentId = inst.simpleSelected.unitItemId;
                    } else {
                        inst.model.unitId = inst.unitId;
                    }
                    const prodct = inst.products.filter(x => x.productId == inst.model.productId)[0];

                    inst.viewparam.push({
                        value: inst.model.name,
                        label: "Name",
                        order: 1,
                    });

                    inst.viewparam.push({
                        value: inst.model.description,
                        label: "Description",
                        order: 2,
                    });
                    inst.viewparam.push({
                        value: prodct.productName,
                        label: "Business Unit",
                        order: 3,
                    });

                    inst.viewparam.push({
                        value: inst.simpleSelected.name,
                        label: "Estate",
                        order: 4,
                    });
                }
            },

            onTabClick: function (tab, navigation, index) {

                var form = $('form[name="step' + (index + 1) + '"]');
                (form as any).parsley().validate();

                if (!(form as any).parsley().isValid()) {
                    return false;
                }

            }
        });
    }

    getBusinessUnitItem(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get("business-units/unititems/" + id, params).subscribe((response) => {
            if (response.code == 200) {
                inst.model = response.data;
                inst.model.productId = response.data.unitSource.productId.productId;
                inst.simpleSelected = response.data;
            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });
    }


    onChange(value) {
        let params: Map<any, string> = new Map();
        let inst = this;
        this.stewardService.get("business-units/unititems/product/" + value.value, params).subscribe((response) => {
            if (response.code == 200) {
                if (response.data == null) {

                    ////(response);
                    inst.getUnitId(value.value);
                    this.createParent = true;
                } else {
                    if (response.data.length == 0) {
                        ////(response);
                        inst.getUnitId(value.value);
                        this.createParent = true;
                    } else {
                        this.createParent = false;
                        this.hideAllSteps = false;
                        this.setBusinessUnit(response.data);
                    }
                }
            } else {
                inst.notify.showWarning(response.message);
            }
        });

    }

    getUnitId(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        this.stewardService.get("business-units/product/" + id, params).subscribe((response) => {
            // //(response);
            if (response.code == 200) {
                if (response.data.content != null) {
                    if (response.data.content.length == 0) {
                        this.hideAllSteps = true;
                        let snackBarRef = this.snackBar.open("You havent set Business Units For the product Kindly set before you can proceed", "Create Units", {
                            duration: 5000, panelClass: "snackbar-danger", horizontalPosition: "right"
                        });
                        snackBarRef.onAction().subscribe(() => {
                            this.router.navigate(['/estate/createbusinessunit']);
                        });
                    } else {
                        this.hideAllSteps = false;
                        inst.bizzUnit = response.data.content[0];
                        inst.unitId = inst.bizzUnit.unitId;
                    }
                } else {
                    this.hideAllSteps = false;
                    this.createParent = false;
                    let snackBarRef = this.snackBar.open("You havent set Business Units For the product Kindly set before you can proceed", "Create Units", {
                        duration: 5000, panelClass: "snackbar-danger", horizontalPosition: "right"
                    });
                    snackBarRef.onAction().subscribe(() => {
                        this.router.navigate(['/estate/createbusinessunit']);
                    });
                }
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }


    getEstateParameters(bizz: BusinessItem) {
        let params: Map<any, string> = new Map();
        let inst = this;
        this.stewardService.get("business-units/unititems/" + bizz.unitId, params).subscribe((response) => {
            if (response.code == 200) {
                this.setBusinessUnit(response.data.content);
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    setBusinessUnit(items: any): void {
        this.items = items;
    }


    onStep1Next(event) {
        // //('Step1 - Next');
    }

    onStep2Next(event) {
        // //('Step2 - Next');
        this.createParent = false;
    }

    onStep3Next(event) {
        // //('Step3 - Next');
        if (!this.createParent) {
            this.model.unitId = this.simpleSelected.unitSource.unitId;
            this.model.parentId = this.simpleSelected.unitItemId;
        } else {
            this.model.unitId = this.unitId;
        }
        const prodct = this.products.filter(x => x.productId == this.model.productId)[0];

        this.viewparam.push({
            value: this.model.name,
            label: "Name",
            order: 1,
        });

        this.viewparam.push({
            value: this.model.description,
            label: "Description",
            order: 2,
        });
        this.viewparam.push({
            value: prodct.productName,
            label: "Product Name",
            order: 3,
        });

        this.viewparam.push({
            value: this.simpleSelected.name,
            label: "Estate",
            order: 4,
        });

    }

    //onComplete(event) {
    onComplete() {
        // //(this.model);
        let inst = this;
        inst.isCompleted = true;
        
        if (this.isUpdate) {
            // //(this.model)
            this.stewardService.put("business-units/unititems", this.model).subscribe((response) => {
                // //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }

            });
        } else {
            this.stewardService.post("business-units/unititems", this.model).subscribe((response) => {
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            });
        }

    }

    onStepChanged(step) {
        // //('Changed to ' + step.title);
    }
}
