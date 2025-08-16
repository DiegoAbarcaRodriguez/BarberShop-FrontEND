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
    updatedServings = signal<Serving[]>(JSON.parse(localStorage.getItem('services')!) || []);


    private _baseUrl = `${environment.ApiUrl}/services`;
    private _headers = { headers: { 'Authorization': `Bearer ${this._securityService.token}` } };



    clearServings() {
        this.updatedServings.set([]);
        localStorage.removeItem('services');
    }

    getServings(): Observable<Serving[]> {

        if (localStorage.getItem('services')) {
            const services = JSON.parse(localStorage.getItem('services')!);
            return of(services);
        }

        return this._http.get<{ ok: boolean, services: Serving[] }>(this._baseUrl, this._headers)
            .pipe(
                map(({ services }) => services.map(service => ({ ...service, isSelected: false }))),
                catchError(() => of([]))
            );
    }

}