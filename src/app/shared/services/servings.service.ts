import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { SecurityService } from './security.service';
import { Serving } from '../interfaces';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServingsService {

    private _http = inject(HttpClient);
    private _securityService = inject(SecurityService);

    idUpdated = signal<string>('');
    updatedServings = signal<Serving[]>([]);


    private _baseUrl = `${environment.ApiUrl}/services`;



    clearServings() {
        this.updatedServings.set([]);

    }

    getServings(): Observable<Serving[]> {

        return this._http.get<{ ok: boolean, services: Serving[] }>(this._baseUrl, { headers: { 'Authorization': `Bearer ${this._securityService.token}` } })
            .pipe(
                map(({ services }) => services.map(service => ({ ...service, isSelected: false }))),
                catchError(() => of([]))
            );
    }

    getServiceById(id: string): Observable<Serving | null> {
        return this._http.get<{ ok: boolean, service: Serving }>(`${this._baseUrl}/get-one/${id}`, { headers: { 'Authorization': `Bearer ${this._securityService.token}` } })
            .pipe(
                map(({ service }) => service),
                catchError(() => of(null))
            );
    }

    createService({ name, price }: { name: string, price: string }): Observable<{ ok: boolean }> {
        return this._http.post<{ ok: boolean }>(`${this._baseUrl}/create`, { name, price }, { headers: { 'Authorization': `Bearer ${this._securityService.token}` } })

    }

    updateService(id: string, { name, price }: { name: string, price: string }): Observable<{ ok: boolean }> {
        return this._http.patch<{ ok: boolean }>(`${this._baseUrl}/update/${id}`, { name, price }, { headers: { 'Authorization': `Bearer ${this._securityService.token}` } })

    }

    deleteService(id: string): Observable<Serving> {
        return this._http.delete<{ ok: boolean, service: Serving }>(`${this._baseUrl}/delete/${id}`, { headers: { 'Authorization': `Bearer ${this._securityService.token}` } })
            .pipe(
                map(({ service }) => service))

    }

}