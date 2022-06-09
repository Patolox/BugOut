import {Injectable} from '@angular/core';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    // ------------------------------------------------------------------------------------

    constructor(private readonly toastr: ToastrService) {
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    show(msg: string, title?: string): ActiveToast<any> {
        return this.toastr.show(msg, title);
    }

    info(msg: string, title?: string): ActiveToast<any> {
        return this.toastr.info(msg, title);
    }

    success(msg: string, title?: string): ActiveToast<any> {
        return this.toastr.success(msg, title);
    }

    warning(msg: string, title?: string): ActiveToast<any> {
        return this.toastr.warning(msg, title);
    }

    error(msg: string, error?: HttpErrorResponse, title?: string): ActiveToast<any> {
        return this.toastr.error(error?.error?.message || error?.error?.exception || msg, title);
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    /**
     * Remove all or a single toast by id
     */
    clear(toastId?: number): void {
        this.toastr.clear(toastId);
    }

    /**
     * Remove and destroy a single toast by id
     */
    remove(toastId: number): boolean {
        return this.toastr.remove(toastId);
    }

    /**
     * Determines if toast message is already shown
     */
    findDuplicate(title: string, message: string, resetOnDuplicate: boolean, countDuplicates: boolean): ActiveToast<any> {
        return this.toastr.findDuplicate(title, message, resetOnDuplicate, countDuplicates);
    }

    // ------------------------------------------------------------------------------------

}
