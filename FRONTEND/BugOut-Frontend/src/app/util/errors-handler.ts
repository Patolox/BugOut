import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

    constructor() {
    }

    handleError(error: Error | HttpErrorResponse): any {
        const msg = error instanceof HttpErrorResponse ?
            `${error.status} - ${error.message}` : `Name: ${error.name}\nMessage: ${error.message}`;

        console.error(msg);
        console.error(error);
    }

}
