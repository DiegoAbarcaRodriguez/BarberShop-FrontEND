import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { SecurityService } from './security.service';
import { AppointmentElement, AppointmentsResponse } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    private _http = inject(HttpClient);
    private _securityService = inject(SecurityService);

    private _baseURL = environment.ApiUrl + '/appointments';
    private _headers = { headers: { 'Authorization': `Bearer ${this._securityService.token}` } };

    userName = signal(localStorage.getItem('userName') || '');
    appointmentData = signal<{ date: string, time: string }>(JSON.parse(localStorage.getItem('appointmentData')!) || { time: '', date: '' });

    setUserName(name: string) {
        this.userName.set(name);
        localStorage.setItem('userName', name);
    }

    setAppointmentData(data: { date: string, time: string }) {
        this.appointmentData.set(data);
        localStorage.setItem('appointmentData', JSON.stringify(data));
    }

    clearAppointmentData() {
        this.appointmentData.set({ date: '', time: '' });
        this.userName.set('');
        localStorage.removeItem('appointmentData');
        localStorage.removeItem('userName');
    }

    getExistingAppointment(date: string, time: string): Observable<{ ok: boolean }> {
        return this._http.get<{ ok: boolean }>(`${this._baseURL}/get-one?date=${date}&time=${time}`, this._headers)
            .pipe(catchError(() => of({ ok: false })));
    }

    createAppointment(date: string, time: string): Observable<string | null> {
        return this._http.post<{ ok: boolean, appointment: { id: string } }>(`${this._baseURL}/create`, { date, time }, this._headers)
            .pipe(
                map(({ appointment }) => appointment.id)
            )
    }


    getAppointmentsByDate(date: string): Observable<AppointmentElement[]> {
        return this._http.get<AppointmentsResponse>(`${this._baseURL}?date=${date}`, this._headers)
            .pipe(
                map(({ appointments }) => appointments),
                catchError(() => of([]))
            )
    }


}