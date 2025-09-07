import { inject, Injectable } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({ providedIn: 'root' })
export class TimingService {

    private _subscriptionCounterAlert?: Subscription;
    private _sweetAlertService = inject(SweetAlertService);

    initializeCounterToShowAlert() {
        this._subscriptionCounterAlert = interval(110000)
            .subscribe(() => this._sweetAlertService.showRunOutTimeAlert())
    }

    counterToExpireSession() {
        return interval(1000)
            .pipe(
                map((seconds) => seconds + 1),
                map((seconds) => {
                    const minutes = Math.floor((seconds % 3600) / 60);
                    const totalSeconds = seconds % 60;
                    const time = minutes + ':' + totalSeconds.toString().padStart(2, '0');
                    return time;
                })
            )

    }


    stopCounterToShowAlert() {
        this._subscriptionCounterAlert?.unsubscribe();
    }

}