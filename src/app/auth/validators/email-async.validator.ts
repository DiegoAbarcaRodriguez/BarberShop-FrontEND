import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { AbstractControl, AsyncValidatorFn } from "@angular/forms"
import { environment } from "../../../environments/environment.development";
import { catchError, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EmailValidator {
    private _http = inject(HttpClient);

    validate(): AsyncValidatorFn {
        return (control: AbstractControl) => {

            const email = control.value;
            const url = `${environment.ApiUrl}/auth/get-user/${email}`;


            return this._http.get(url).pipe(
                map(response => null),
                catchError(() => of({ emailTaken: true })));

        }
    }

}

