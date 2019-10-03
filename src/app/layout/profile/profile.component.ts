import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { ViewParamBase } from "../../shared/base/viewParamBase";
import { Users } from "../../entities/users-model";
import { HttpStewardService } from "../../shared/services/http-steward.service";
import { Notify } from "../../shared/classes/notify";
import { ResponseWrapper } from "../../entities/wrappers/response-wrapper";
import { ChangepassWrapper } from "../../entities/wrappers/change-pass-wrapper";
import { NgForm } from "@angular/forms";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { VerifyOtpResponse } from "../../entities/verify-otp-response";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    model: Users;
    viewparam: Array<ViewParamBase>;
    response: ResponseWrapper<any>;
    change: ChangepassWrapper;
    changepassowrd = {
        newPassword: "string",
        oldPassword: "string"
    };

    constructor(
        private stewardService: HttpStewardService<any, any>,
        private notify: Notify,
        protected locStorage: LocalStorage
    ) {
        this.model = new Users();
        this.viewparam = new Array();
        this.change = new ChangepassWrapper();
    }

    ngOnInit() {
        this.response = JSON.parse(localStorage.getItem("userData"));
        this.model = this.response.data.userDetails;

        /*this.locStorage.getItem<ResponseWrapper<VerifyOtpResponse>>('userData').subscribe((userData) => {
            this.model = userData.data.userDetails;
        });*/

        this.viewparam.push({
            value: this.model.fullName,
            label: "Full Names",
            order: 1
        });
        this.viewparam.push({
            value: this.model.msisdn,
            label: "Phone Number",
            order: 2
        });
        this.viewparam.push({
            value: this.model.username,
            label: "Email",
            order: 3
        });
        this.viewparam.push({
            value: this.model.documentType,
            label: "Document Id",
            order: 4
        });

        this.viewparam.push({
            value: this.model.documentNumber,
            label: "Document Number",
            order: 6
        });

        this.viewparam.push({
            value: this.model.status,
            label: "Account Status",
            order: 7
        });

        this.change.username = this.model.emailAddress;
    }

    changePass(form: NgForm): void {
        this.changepassowrd.oldPassword = this.change.oldPassword;
        this.changepassowrd.newPassword = this.change.newPassword;
        const inst = this;
        this.stewardService
            .postForm2(
                "ufs-common-modules/api/v1/change-password",
                this.changepassowrd
            )
            .subscribe(response => {
                if (response.code === 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                } else {
                    inst.notify.showWarning(response.message);
                }
            });
    }
}
