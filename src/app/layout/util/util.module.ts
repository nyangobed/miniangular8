import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UtilRoutingModule} from './util-routing.module';
import {DeleteComponentComponent} from './delete-component/delete-component.component';
import {DeleteDialogComponent} from './delete-component/delete-dialog/delete-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageHeaderModule, StatModule} from '../../shared/modules';
import {DataTablesModule} from 'angular-datatables';
import {TreeviewModule} from 'ngx-treeview';
import {FileDropModule} from 'ngx-file-drop';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import {CovalentChipsModule, CovalentDialogsModule, CovalentExpansionPanelModule, CovalentMessageModule} from '@covalent/core';
import {TreeModule} from 'angular-tree-component';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ModalDialogModule} from 'ngx-modal-dialog';
import {MomentModule} from 'angular2-moment';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {NgxPermissionsModule} from 'ngx-permissions';
import {CheckerActionsComponent} from './checker-actions/checker-actions.component';
import {CheckerDialogComponent} from './checker-dialog/checker-dialog.component';
import {ViewentityComponent} from './viewentity/viewentity.component';
import {CapitalizePipe} from '../../shared/pipes/capitalize.pipe';
import {ModalViewEntityComponent} from './modal-view-entity/modal-view-entity.component';
import { DeleteComponent1Component } from './delete-component1/delete-component1.component';

@NgModule({
    declarations: [
        DeleteComponentComponent,
        DeleteDialogComponent,
        CheckerActionsComponent,
        CheckerDialogComponent,
        ViewentityComponent,
        CapitalizePipe,
        ModalViewEntityComponent,
        DeleteComponent1Component,


    ],
    imports: [
        CommonModule,
        UtilRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        PageHeaderModule,
        FormsModule,
        DataTablesModule,
        NgbModule.forRoot(),
        MatRadioModule,
        MatCardModule,
        MatExpansionModule,
        TreeviewModule.forRoot(),
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        FileDropModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CovalentDynamicFormsModule,
        CovalentDialogsModule,
        TreeModule,
        CovalentMessageModule,
        CovalentMarkdownModule,
        NgxChartsModule,
        StatModule,
        CovalentExpansionPanelModule,
        MatSlideToggleModule,
        CovalentChipsModule,
        MatAutocompleteModule,
        ModalDialogModule.forRoot(),
        MomentModule,
        NgIdleKeepaliveModule.forRoot(),
        MatTabsModule,
        NgxPermissionsModule.forRoot(),
    ],
    exports: [
        DeleteComponentComponent,
        DeleteComponent1Component,
        DeleteDialogComponent,
        CheckerActionsComponent,
        CheckerDialogComponent,
        ViewentityComponent,
        ModalViewEntityComponent
    ]
})
export class UtilModule {
}
