import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecaptchaRoutingModule } from "./recaptcha-routing.module";
import { RecaptchaComponent } from "./recaptcha.component";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ErrorStateMatcher,
    ShowOnDirtyErrorStateMatcher,
    MAT_LABEL_GLOBAL_OPTIONS,
    MatSnackBarModule
} from "@angular/material";
import { Notify } from "../shared/classes/notify";

@NgModule({
    declarations: [RecaptchaComponent],
    imports: [
        CommonModule,
        RecaptchaRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule
    ],
    providers: [
        Notify,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        },
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: "always" } }
    ]
})
export class RecaptchaModule {}
