import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {ForgotPasswordComponent} from './forgot-password.component';
import {MatFormFieldModule, MatButtonModule, MatInputModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS, MatSnackBarModule} from "@angular/material";
import {Notify} from "../shared/classes/notify";

@NgModule({
    imports: [CommonModule, ForgotPasswordRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule],
    declarations: [ForgotPasswordComponent],
    providers: [
        Notify,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        }, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class ForgotPasswordModule {
    email: string;
}


