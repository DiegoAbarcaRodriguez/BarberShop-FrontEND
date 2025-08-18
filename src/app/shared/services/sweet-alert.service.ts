import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
    constructor() { }

    showAlert(title: string, html: string, isQuestionType: boolean = false) {

        if (isQuestionType) {
            return Swal.fire({
                title,
                icon: 'question',
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showCancelButton: true,
                showCloseButton: true
            });
        }

        return Swal.fire({ title, html });
    }

}