import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {VerifyotpRoutingModule} from './verifyotp-routing.module';
import {VerifyotpComponent} from './verifyotp.component';
import {MatFormFieldModule, MatButtonModule, MatInputModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS, MatSnackBarModule} from "@angular/material";
import {Notify} from "../shared/classes/notify";



@NgModule({
    imports: [
        CommonModule,
        VerifyotpRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule
    ],
    declarations: [VerifyotpComponent],
    providers: [
        Notify,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        }, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class VerifyotpModule {}

