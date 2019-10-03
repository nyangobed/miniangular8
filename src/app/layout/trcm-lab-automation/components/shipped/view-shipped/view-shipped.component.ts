import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../../../../router.animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Notify } from "../../../../../shared/classes/notify";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpStewardService } from "../../../../../shared/services/http-steward.service";
import { Shipped } from "../../../models/shipped/shipped";

@Component({
    selector: "app-view-shipped",
    templateUrl: "./view-shipped.component.html",
    styleUrls: ["./view-shipped.component.scss"],
    animations: [routerTransition()]
})
export class ViewShippedComponent implements OnInit {
    myForm: FormGroup;
    updateData: Shipped;
    Repair: any;
    submitted = false;
    isUpdate: boolean;
    part = [];
    id: number;

    constructor(
        private fb: FormBuilder,
        private notify: Notify,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private httpStewardService: HttpStewardService<any, any>
    ) {
        this.updateData = new Shipped();
    }

    ngOnInit() {
        /** call the form function */
        this.createForm();

        /**
         *
         * Retrieve data being edited
         *
         */
        this.activatedRoute.params.subscribe(params => {
            if (params["id"] != null) {
                this.isUpdate = true;
                this.httpStewardService
                    .get("atlas/shipped_repair/" + params["id"])
                    .subscribe(form => {
                        this.id = params["id"];
                        this.Repair = form.data;
                        this.myForm
                            .get("pcba_pn")
                            .setValue(this.Repair.pcba_pn);
                        this.myForm
                            .get("pcba_sn")
                            .setValue(this.Repair.pcba_sn);
                        this.myForm
                            .get("board_defect")
                            .setValue(this.Repair.board_defect);
                        this.myForm
                            .get("pki_version")
                            .setValue(this.Repair.pki_version);
                        this.myForm.get("mac_id").setValue(this.Repair.mac_id);
                        this.myForm
                            .get("bt_address")
                            .setValue(this.Repair.bt_address);
                        this.myForm.get("wifi").setValue(this.Repair.wifi);
                        this.myForm
                            .get("printer_type")
                            .setValue(this.Repair.printer_type);
                        this.myForm.get("note").setValue(this.Repair.note);
                        this.updateData.id = this.Repair.id
                    });
            }
        });
    }

    /** Function that is used to create the update form */
    createForm() {
        this.myForm = this.fb.group({
            pcba_pn: ["", [Validators.required]],
            pcba_sn: ["", [Validators.required]],
            board_defect: [""],
            pki_version: [""],
            mac_id: [""],
            bt_address: [""],
            wifi: [""],
            printer_type: [""],
            note: [""]
        });
    }

    /** GET THE FORM CONTROLS THAT HELP TO GET VALIDATIONS AND OTHER METHODS */
    get f() {
        return this.myForm.controls;
    }

    /** REDIRECT TO THE DIAGNOSIS DATATABLE AFTER UPDATE */
    goTo() {
        this.router.navigate([
            "../../../trcm-lab-automation/components/shipped"
        ]);
    }

    /** SUBMIT THE FORM WITH UPDATED VALUES */
    onSubmit() {
        this.submitted = true;

        /** PARSE THE FORM DATA TO THE UPDATEDATA MODEL */
        this.updateData.pcba_pn = this.myForm.get("pcba_pn").value;
        this.updateData.pcba_sn = this.myForm.get("pcba_sn").value;
        this.updateData.board_defect = this.myForm.get("board_defect").value;
        this.updateData.pki_version = this.myForm.get("pki_version").value;
        this.updateData.mac_id = this.myForm.get("mac_id").value;
        this.updateData.bt_address = this.myForm.get("bt_address").value;
        this.updateData.wifi = this.myForm.get("wifi").value;
        this.updateData.printer_type = this.myForm.get("printer_type").value;
        this.updateData.note = this.myForm.get("note").value;

        this.httpStewardService
            .put("atlas/shipped_repair", this.updateData)
            .subscribe(data => {
                if (data.code === 200) {
                    this.notify.showSuccess("Data Updated Successfully");
                } else {
                    // this.notify.showWarning(
                    //     "Oops Something went horribly wrong! Try again later."
                    // );
                    this.notify.showWarning(data.message);
                }
            });

        /** NAVIGATE TO THE DIAGNOSIS PAGE */
        this.goTo();
    }
}
