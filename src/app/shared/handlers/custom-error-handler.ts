import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable} from '@angular/core';


@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    constructor() {
//        super();
    }

    handleError(error: any) {
        //(error);
//         if (error instanceof HttpErrorResponse) {
//             if (error.status === 401) {
//                 localStorage.clear();
//                 // window.location.href = '/login';
//             } else if (error.status === 403) {
//                 window.location.href = '/access-denied';
//             } else if (error.status === 500) {
//                 window.location.href = '/error';
//             } else {
//                 window.location.href = '/error';
//             }
//         }
// // tslint:disable-next-line: no-console
//         console.debug('Error object: ' + JSON.stringify(error));
        throw error;
    }
}
