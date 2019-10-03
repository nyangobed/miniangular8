import {Component, OnInit, Renderer, ElementRef, Input, ViewChild, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {NgbModalRef, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Notify} from '../../../shared/classes/notify';
import {SysConfig} from '../../../entities/sys-config';
import {NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ConfigDialogComponent} from '../config-dialog/config-dialog.component';

@Component({
    selector: 'app-global-configs',
    templateUrl: './global-configs.component.html',
    styleUrls: ['./global-configs.component.scss'],
    animations: [routerTransition()]
})
export class GlobalConfigsComponent implements OnInit, AfterViewInit {

    dtOptions: DataTables.Settings;
    modal: NgbModalRef;
    @ViewChild('content') content: ElementRef;
    config: SysConfig;
    filter: string = '';

    constructor(public dialog: MatDialog, private stewardService: HttpStewardService<SysConfig, any>, protected renderer: Renderer,
                protected modalService: NgbModal, protected notify: Notify, private elementRef: ElementRef) {
        this.config = new SysConfig();
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('data-config-id')) {
                this.stewardService.get('ufs-common-modules/api/v1/system-config/' + event.target.getAttribute('data-config-id')).subscribe(response => {
                    if (response.code === 200) {
                        this.config = response.data;
                        // this.modal = this.modalService.open(this.content);
                        let dialogRef = this.dialog.open(ConfigDialogComponent, {
                            width: '500px',
                            data: {
                                config: this.config
                            }
                        });

                        dialogRef.afterClosed().subscribe(result => {
                            //('The dialog was closed');
                        });
                    } else {
                        this.notify.showWarning(response.message);
                    }
                });
            }
        });
    }

    save(form: NgForm) {
        this.stewardService.put('ufs-common-modules/api/v1/system-config', this.config).subscribe(response => {
            if (response.code == 200) {
                form.resetForm();
                this.modal.close();
                this.notify.showSuccess(response.message);
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
            } else {
                this.notify.showWarning(response.message);
            }
        });
    }

    ngOnInit() {
        this.dtOptions = this.stewardService.intiateDataTable('ufs-common-modules/api/v1/system-config',
            [
                {
                    data: 'parameter', render: (d?: any) => {
                        return '';
                    }
                },
                {data: 'parameter'},
                {
                    data: 'value',
                    render: (d: string, comp: any, entity: SysConfig) => {
                        if (entity.valueType === 'PASSWORD') {
                            return '*******';
                        } else {
                            return d;
                        }
                    }
                },
                {data: 'description'},
                {
                    data: 'id',
                    render: (d: number) => {
                        return '<div class=\'actions-buttons center\'>'
                            + '<i (click)="test()" class=\'fa fa-edit edit-config\' title=\'Edit\' data-config-id=\'' + d + '\'></i></div>';
                    }
                }
            ], 'id', null, (params: any) => {
                params.entity = this.filter;
            });

    }

    getFilter() {
        $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
        //        this.stewardService.dataTableReload("sys-config?entity=" + this.filter);

    }

    open(content: any) {
        this.modal = this.modalService.open(content);
    }

}
