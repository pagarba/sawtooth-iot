import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[inputNumber]'
})

export class InputNumberDirective {

    private regex: RegExp = new RegExp(/[\d\.]/);

    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Enter'];

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {

        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }

        if (!this.regex.test(event.key)) {
            event.preventDefault();
        }
    }
}
