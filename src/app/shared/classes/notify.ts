import {MatSnackBar} from "@angular/material";
import {Inject, forwardRef} from "@angular/core";

export class Notify {
    private title: string = "Notification";

    constructor(@Inject(forwardRef(() => MatSnackBar)) public snackBar: MatSnackBar){

    }
    /**
     * Show default notification
     */
    show(message: string, action?: string){
        this.render(message, action, "snackbar-default");
    }
    /**
     * Show warning notification
     */
    showWarning(message: string, action?: string){
        this.render(message, action, "snackbar-warning");
    }
    /**
     * Show success notification
     */
    showSuccess(message: string, action?: string){
        this.render(message, action, "snackbar-success");
    }
    /**
     * Show danger notification
     */
    showDanger(message: string, action?: string){
        this.render(message, action, "snackbar-danger");
    }

    private render(message: string, action: string, panelClass: string){
        if (action == undefined){
            action = this.title;
        }
        this.snackBar.open(message, action, {duration: 5000, panelClass: panelClass, horizontalPosition: "right"});
    }

}
