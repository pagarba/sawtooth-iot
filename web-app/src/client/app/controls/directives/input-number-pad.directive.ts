import { Directive, OnInit, OnChanges, Input, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[inputNumberPad]'
})

export class InputNumberPadDirective implements OnInit {
    @Input()
    maxValue: number;
    private pad: string;
    private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'Enter' ];
    private numberRegex: RegExp = /\d+/;

    constructor(
        public control: NgModel,
        public element: ElementRef
    ) {}

    ngOnInit() {
        this.pad = Array.apply(null, Array(this.maxValue.toString().length)).map(() => '0').join('');
        this.element.nativeElement.setAttribute('maxlength', this.pad.length);
        let model = this.control.model;
        let view = this.modelToView(model);
    }

    @HostListener('blur')
    onBlur() {
        let model = this.viewToModel(this.control.value);
        let view = this.modelToView(model);

        this.control.viewToModelUpdate(model);
        this.control.valueAccessor.writeValue(view);
    }


    viewToModel(inputValue: string): number {
        if (inputValue === null || inputValue === undefined)
            return null;

        let val = parseInt(inputValue, 10);
        if (val > this.maxValue) {
            val = this.maxValue;
        }
        return val;
    }

    modelToView(inputValue: number): string {
        if (inputValue === null || inputValue === undefined)
            return '';

        return (this.pad + inputValue).substring(inputValue.toString().length);
    }

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }

        if (!this.numberRegex.test(String(event.key))) {
            event.preventDefault();
        }
    }
}
