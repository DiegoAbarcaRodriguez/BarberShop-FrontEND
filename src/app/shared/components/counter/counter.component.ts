import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TimingService } from '../../services/timing.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


@Component({
    standalone: true,
    imports: [],
    selector: 'shared-counter',
    templateUrl: 'counter.component.html',
    styleUrl: 'counter.component.scss'
})

export class CounterComponent implements OnInit, OnDestroy {

    private _timingService = inject(TimingService);
    private _subscription?: Subscription;

    time: string = '';
    mustShowAlert: boolean = false;

    ngOnInit() {
        this._subscription = this._timingService.counterToExpireSession()
            .subscribe((value) => {
                this.time = value;
                if (this.time === '1:40') {
                    this.mustShowAlert = true;
                }

                if (this.time === '2:00') {
                    window.location.href = environment.frontUrl+'?sessionExpired=true';
                    return;
                }
            })

    }

    ngOnDestroy() {
        this._subscription?.unsubscribe();
    }
}