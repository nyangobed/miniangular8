import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ChangePasswordComponent} from "./change-password.component";
import {ChangePasswordRoutingModule} from "./change-password-routing.module";
import {Notify} from "../shared/classes/notify";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS, MatButtonModule, MatInputModule} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        ChangePasswordRoutingModule, ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule
    ],
    declarations: [ChangePasswordComponent],
    providers: [
        Notify,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        }, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class ChangeComponentModule {}
