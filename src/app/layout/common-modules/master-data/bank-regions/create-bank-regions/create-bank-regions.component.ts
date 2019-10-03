import { Component, OnInit } from "@angular/core";
import { Currency } from "../../../../../entities/currency-model";
import { HttpStewardService } from "../../../../../shared/services/http-steward.service";
import { Notify } from "../../../../../shared/classes/notify";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { routerTransition } from "../../../../../router.animations";
import { BankRegions } from "../../../../../entities/bank-regions-model";
import { Location } from "@angular/common";
@Component({
    selector: "app-create-bank-regions",
    templateUrl: "./create-bank-regions.component.html",
    styleUrls: ["./create-bank-regions.component.scss"],
    animations: [routerTransition()]
})
export class CreateBankRegionsComponent implements OnInit {
    model: BankRegions;
    public isUpdate: boolean = false;

    constructor(
        private stewardService: HttpStewardService<any, any>,
        private notify: Notify,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {
        this.model = new BankRegions();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params["id"] != null) {
                this.isUpdate = true;
                this.fetchBankRegion(params["id"]);
            }
        });
    }

    fetchBankRegion(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService
            .get("atlas/bank_regions/" + id, params)
            .subscribe(response => {
                if (response.code == 200) {
                    inst.model = response.data;
                } else {
                    this.isUpdate = false;
                    inst.notify.showWarning(response.message);
                }
            });
    }

    onCreateBankRegions(form: NgForm) {
        let inst = this;
        if (this.isUpdate) {
            this.stewardService
                .put("atlas/bank_regions", this.model)
                .subscribe(response => {
                    if (response.code == 200) {
                        inst.notify.showSuccess(response.message);
                        form.resetForm();
                        inst.router.navigate([
                            "/common-modules/master-data/bank-regions"
                        ]);
                    } else {
                        inst.notify.showWarning(response.message);
                    }
                });
        } else {
            this.stewardService
                .post("atlas/bank_regions", this.model)
                .subscribe(response => {
                    if (response.code == 200) {
                        inst.notify.showSuccess(response.message);
                        form.resetForm();
                        inst.router.navigate([
                            "/common-modules/master-data/bank-regions"
                        ]);
                    } else {
                        inst.notify.showWarning(response.message);
                    }
                });
        }
    }
    goBack() {
        this.location.back();
    }
}
