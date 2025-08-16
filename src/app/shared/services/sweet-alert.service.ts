import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
    constructor() { }

    showAlert(title: string, html: string) {
        return Swal.fire({ title, html });
    }

}