import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
    ErrorStateMatcher,
    MAT_LABEL_GLOBAL_OPTIONS,
    MatInputModule,
    ShowOnDirtyErrorStateMatcher,
    MatButtonModule,
    MatSnackBarModule
} from '@angular/material';
import {Notify} from "../shared/classes/notify";

@NgModule({
    imports: [CommonModule, LoginRoutingModule,
        ReactiveFormsModule,
        FormsModule,        
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule],
    declarations: [LoginComponent],
    providers: [
        Notify,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        }, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class LoginModule {}
