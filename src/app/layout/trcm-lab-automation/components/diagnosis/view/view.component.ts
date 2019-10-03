import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../../../../router.animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Notify } from "../../../../../shared/classes/notify";
import { HttpStewardService } from "../../../../../shared/services/http-steward.service";
import { Errors } from "../../../models/repair/errors";

@Component({
    selector: "app-view",
    templateUrl: "./view.component.html",
    styleUrls: ["./view.component.scss"],
    animations: [routerTransition()]
})
export class ViewComponent implements OnInit {
    myForm: FormGroup;
    updateData: FormGroup;
    Repair: any;
    submitted = false;
    isUpdate = false;
    ids = [];
    part = [];
    error: Array<Errors>;
    items1: any;
    items2: any;
    errorArray: any;
    partsArray: any;

    repairCentre = ["Ingenico", "Tracom"];

    id: number;

    constructor(
        private fb: FormBuilder,
        private notify: Notify,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private httpStewardService: HttpStewardService<any, any>
    ) {}

    ngOnInit() {
        const inst = this;
        const params: Map<any, string> = new Map();
        params.set("size", "1000");

        this.httpStewardService
            .get("atlas/parts", params)
            .subscribe(response => {
                if (response.code === 200) {
                    inst.part = response.data.content;
                    let multiSort = inst.part.map(res => {
                        var allParts = {
                            id: "",
                            text: ""
                        };
                        allParts.id = res.partNumber;
                        allParts.text = res.partName;

                        return allParts;
                    });
                    this.items2 = multiSort;
                } else {
                    inst.notify.showWarning(response.message);
                }
            });

        this.httpStewardService
            .get("atlas/device_error", params)
            .subscribe(response => {
                if (response.code === 200) {
                    inst.error = response.data.content;
                    let searchSort = inst.error.map(d => {
                        var multiError = {
                            id: "",
                            text: ""
                        };
                        multiError.id = d.code;
                        multiError.text = d.description;
                        return multiError;
                    });
                    this.items1 = searchSort;
                } else {
                    inst.notify.showWarning(response.message);
                }
            });

        /** call the form function */
        this.createForm();

        this.updateData = this.fb.group({
            ids: "",
            repairModel: ""
        });

        /** Retrieve data being edited **/
        this.activatedRoute.params.subscribe(params => {
            if (params["id"] != null) {
                this.isUpdate = true;
                this.httpStewardService
                    .get("atlas/repair/" + params["id"])
                    .subscribe(form => {
                        this.id = params["id"];
                        this.Repair = form.data;
                        this.myForm
                            .get("serialnumber")
                            .setValue(this.Repair.devices.serialnumber);
                        this.myForm
                            .get("customers")
                            .setValue(this.Repair.customers);
                        this.myForm
                            .get("repairCentre")
                            .setValue(this.Repair.repairCentre);
                        this.myForm
                            .get("deviceErrors")
                            .setValue(this.Repair.deviceErrors.map(res => {
                                return res.code;
                            }));
                        this.myForm
                            .get("parts")
                            .setValue(this.Repair.parts.map(res => {
                                return res.partName;
                            }));
                        this.myForm
                            .get("comments")
                            .setValue(this.Repair.comments);
                        this.updateData.get("ids").setValue(this.Repair.Id);
                    });
            }
        });
    }

    /** Function that is used to create the update form */
    createForm() {
        this.myForm = this.fb.group({
            serialnumber: [{ value: "", disabled: true }],
            customers: [{ value: "", disabled: true }],
            repairCentre: ["", [Validators.required]],
            reportedDefects: "",
            comments: ["", [Validators.required, Validators.minLength(2)]],
            deviceErrors: ["", [Validators.required]],
            parts: [""],
            users: "",
            failureFound: "",
            qaTest: "",
            repairStatus: ""
        });
    }
    

    /** GET THE FORM CONTROLS THAT HELP TO GET VALIDATIONS AND OTHER METHODS */
    get f() {
        return this.myForm.controls;
    }

    /** SUBMIT THE FORM WITH UPDATED VALUES */
    onSubmit() {
        this.submitted = true;
        const errorData = this.myForm.get("deviceErrors").value;
        const partData = this.myForm.get("parts").value;

        const errorVal = errorData
            .map((item: any) => {
                return item.id;
            })
            .join(",");

        const partVal = partData
            .map((item: any) => {
                return item.id;
            })
            .join(",");

        this.errorArray = errorVal.split(",");
        this.partsArray = partVal.split(",");

        this.myForm.get("deviceErrors").setValue(this.errorArray);
        this.myForm.get("parts").setValue(this.partsArray);

        /** SET THE VALUE OF MYFORM TO UPDATEDATA FORM */
        this.updateData.get("repairModel").setValue(this.myForm.value);

        /** ADD THE REPAIR ID TO THE IDS ARRAY */
        this.ids.push(this.updateData.get("ids").value);

        /** SET THE IDS ARRAY TO THE IDS FIELD IN UPDATEDATA FORM */
        this.updateData.get("ids").setValue(this.ids);

        this.httpStewardService
            .put("atlas/repair/update", this.updateData.value)
            .subscribe(data => {
                if (data.code === 200) {
                    this.notify.showSuccess("Data Updated Successfully");
                } else {
                    this.notify.showWarning(
                        "Oops Something went horribly wrong! Try again later."
                    );
                    this.notify.showWarning(data.message);
                }
            });

        /** NAVIGATE TO THE DIAGNOSIS PAGE */
        this.goTo();
    }

    /**
     *
     * REDIRECT TO THE DIAGNOSIS DATATABLE AFTER UPDATE
     *
     */
    goTo() {
        this.router.navigate([
            "../../../trcm-lab-automation/components/diagnosis"
        ]);
    }
}
