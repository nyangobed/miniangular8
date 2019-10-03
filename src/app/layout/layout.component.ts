import { Compiler, Component, OnInit, ViewContainerRef } from "@angular/core";
import { Keepalive } from "@ng-idle/keepalive";
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
import { TdDialogService } from "@covalent/core/dialogs";
import { Router } from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";

declare var $: any;

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
    idleState = "Not started.";
    timedOut = false;
    lastPing?: Date = null;

    constructor(
        private idle: Idle,
        private keepalive: Keepalive,
        private _dialogService: TdDialogService,
        private _viewContainerRef: ViewContainerRef,
        public router: Router,
        private _compiler: Compiler,
        private permissionsService: NgxPermissionsService
    ) {
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(7200);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(3600);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => (this.idleState = "No longer idle."));
        idle.onTimeout.subscribe(() => {
            this._dialogService.closeAll();
            this.idleState = "Timed out!";
            this.timedOut = true;
            localStorage.clear();
            this.router.navigate(["/login"]);
        });
        idle.onIdleStart.subscribe(() => {
            this._dialogService.openAlert({
                message:
                    "You will time out in " + idle.getTimeout() + " seconds!",
                disableClose: false,
                viewContainerRef: this._viewContainerRef,
                title: "Alert",
                closeButton: "Close",
                width: "400px"
            });
        });
        idle.onTimeoutWarning.subscribe(countdown => {});

        // sets the ping interval to 15 seconds
        keepalive.interval(15);

        keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    }

    ngOnInit() {
        this._compiler.clearCache();
        (window as any).refreshMenu();
        this.reset();

        const perm = JSON.parse(localStorage.getItem("perm"));

        this.permissionsService.loadPermissions(perm);
    }

    reset() {
        this.idle.watch();
        this.idleState = "Started.";
        this.timedOut = false;
    }
}
