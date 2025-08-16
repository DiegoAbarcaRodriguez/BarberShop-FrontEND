import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SecurityService } from './security.service';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class servicesAppointmentService {
    private _http = inject(HttpClient);
    private _securityService = inject(SecurityService);

    private _baseURL = environment.ApiUrl + '/service-appointment';
    private _headers = { headers: { 'Authorization': `Bearer ${this._securityService.token}` } };

    createServiceAppointmentRecord(appointmentId: string, servingsId: string[]) {
        return this._http.post<{ ok: boolean }>(`${this._baseURL}`, { service_fk: servingsId, appointment_fk: appointmentId }, this._headers)
            .pipe(
                map(({ ok }) => ok),
            );
    }

}