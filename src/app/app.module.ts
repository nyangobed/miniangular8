import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {GlobalParams} from './shared/services/globalparams';
import {UserManagementServices} from './shared/services/usermanagement.service';
import {HttpStewardService} from './shared/services/http-steward.service';
import {CustomErrorHandler} from './shared/handlers/custom-error-handler';
import {NgHttpLoaderModule} from 'ng-http-loader/ng-http-loader.module';
import {MatSnackBarModule} from '@angular/material';
import {LocalStorageModule} from '@ngx-pwa/local-storage';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { PartsOnboardingService } from './shared/services/parts-onboarding.service';
import { PartsListingService } from './shared/services/parts-listing.service';
import { PartsHistoryService } from './shared/services/parts-history.service';
import { TestServiceService } from './layout/common-modules/test-service.service';
import { OnboardingserviceService } from './layout/trcm-lab-automation/onboarding/onboardingservice.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthGuard } from './shared/guard/auth.guard';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgHttpLoaderModule,
        NgxPermissionsModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        Ng4LoadingSpinnerModule.forRoot(),
       
        AppRoutingModule,
        MatSnackBarModule,
        LocalStorageModule,
        UiSwitchModule,
      
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        GlobalParams,
        DatePipe,
        UserManagementServices,
        HttpStewardService,
        PartsOnboardingService,
        PartsListingService,
        PartsHistoryService,
        TestServiceService,
        OnboardingserviceService,
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler
        },
        {
            provide: String,
            useValue: null
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
