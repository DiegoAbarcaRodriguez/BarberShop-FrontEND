import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({ selector: '[roundTime]' })
export class RoundTimeDirective {

    private _form?: FormGroup;

    @Input()
    set form(form: FormGroup) {
        this._form = form;
    }


    constructor(private _htmlElement: ElementRef<HTMLInputElement>) { }

    @HostListener('blur', ['$event'])
    onChangeTime(event: InputEvent) {
        const hour = this._htmlElement.nativeElement.value.split(':').at(0);
        const minutes = this._htmlElement.nativeElement.value.split(':').at(1);


        if (minutes === '00') {
            const newTime = hour + ':' + minutes;
            this._htmlElement.nativeElement.value = newTime;
            this._form?.get('time')?.setValue(newTime);
            return
        }



        if (Number(minutes) < 30) {
            const newTime = hour + ':' + '00';
            this._htmlElement.nativeElement.value = newTime;
            this._form?.get('time')?.setValue(newTime);
            return
        }

        if (Number(minutes) > 30) {
            const newHour = Number(hour) === 23 ? 0 : Number(hour) + 1;
            const newTime = newHour.toString().padStart(2, '0') + ':' + '00';
            this._htmlElement.nativeElement.value = newTime;
            this._form?.get('time')?.setValue(newTime);
            return
        }



    }
}