import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../../../../router.animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Repair } from "../../../models/repair/repair";
import { Notify } from "../../../../../shared/classes/notify";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpStewardService } from "../../../../../shared/services/http-steward.service";
import { Errors } from "../../../models/repair/errors";

@Component({
    selector: "app-update-devices",
    templateUrl: "./update-devices.component.html",
    styleUrls: ["./update-devices.component.scss"],
    animations: [routerTransition()]
})
export class UpdateDevicesComponent implements OnInit {
    editForm: FormGroup;
    updateForm: FormGroup;
    Repair: any;
    submitted = false;
    errorMsg = "";
    ids = [];
    isUpdate = false;
    part = [];
    error: Array<Errors>;
    user = [];
    items1: any;
    items2: any;
    errorArray: any;
    partsArray: any;

    qaStatus = ["Passed", "Failed"];

    repairCentre = ["Ingenico", "Tracom"];

    repairStatus = ["Progress", "Pending", "Repaired", "Unrepairable"];

    response: "";
    id: number;

    constructor(
        private formBuilder: FormBuilder,
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

        this.httpStewardService
            .get("ufs-common-modules/api/v1/user/technicians", params)
            .subscribe(response => {
                if (response.code === 200) {
                    inst.user = response.data;
                } else {
                    inst.notify.showWarning(response.message);
                }
            });

        this.updateForm = this.formBuilder.group({
            ids: "",
            repairModel: ""
        });

        this.editForm = this.formBuilder.group({
            devices: this.formBuilder.group({
                serialnumber: [{ value: "", disabled: true }]
            }),
            customers: [{ value: "", disabled: true }],
            users: [""],
            repairStatus: ["", Validators.required],
            repairCentre: ["", [Validators.required]],
            qaTest: [""],
            deviceErrors: [""],
            parts: [""],
            failureFound: "",
            comments: "",
            reportedDefects: ""
        });

        this.activatedRoute.params.subscribe(params => {
            if (params["id"] != null) {
                this.isUpdate = true;
                this.httpStewardService
                    .get("atlas/repair/" + params["id"])
                    .subscribe(myForm => {
                        this.id = params["id"];
                        this.Repair = myForm.data;
                        this.editForm
                            .get("devices")
                            .get("serialnumber")
                            .setValue(this.Repair.devices.serialnumber);
                        this.editForm
                            .get("customers")
                            .setValue(this.Repair.customers);
                        this.editForm
                            .get("deviceErrors")
                            .setValue(
                                this.Repair.deviceErrors.map(res => {
                                    return res.code;
                                })
                            );
                        this.editForm
                            .get("parts")
                            .setValue(
                                this.Repair.parts.map(res => {
                                    return res.partName;
                                })
                            );
                        this.editForm
                            .get("repairStatus")
                            .setValue(this.Repair.repairStatus);
                        this.editForm
                            .get("repairCentre")
                            .setValue(this.Repair.repairCentre);
                        this.updateForm.get("ids").setValue(this.Repair.Id);
                    });
            }
        });
    }

    get f() {
        return this.editForm.controls;
    }

    goTo() {
        this.router.navigate([
            "../../../trcm-lab-automation/components/repair"
        ]);
    }

    onSubmit() {
        this.submitted = true;
        const errorData = this.editForm.get("deviceErrors").value;
        const partData = this.editForm.get("parts").value;

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

        this.editForm.get("deviceErrors").setValue(this.errorArray);
        this.editForm.get("parts").setValue(this.partsArray);

        /** SET THE VALUE OF MYFORM TO UPDATEDATA FORM */
        this.updateForm.get("repairModel").setValue(this.editForm.value);

        /** ADD THE REPAIR ID TO THE IDS ARRAY */
        this.ids.push(this.updateForm.get("ids").value);

        /** SET THE IDS ARRAY TO THE IDS FIELD IN UPDATEDATA FORM */
        this.updateForm.get("ids").setValue(this.ids);

        this.httpStewardService
            .put("atlas/repair/update", this.updateForm.value)
            .subscribe(data => {
                if (data.code === 200) {
                    this.notify.showSuccess("Data Updated Successfully");
                } else {
                    this.notify.showWarning(
                        "Oops Something went horribly wrong! Try again later."
                    );
                }
            });
        this.goTo();
    }
}
