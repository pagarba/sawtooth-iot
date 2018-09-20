import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';

@Injectable()
export class ResponsiveService {
    public $resizeEvent: Observable<number>;
    private mobilePoint = 768;
    private lastWidth = document.documentElement.clientWidth;
    constructor() {
        this.$resizeEvent = Observable
            .fromEvent(window, 'resize')
            .map((event: any) => event.target.document.documentElement.clientWidth)
            // .filter((currentWidth: number) => {
            //     let isNew = this.lastWidth !== currentWidth;
            //     this.lastWidth = currentWidth;
            //     return isNew;
            // })
            .debounceTime(200);
    }
    public isMobile(): boolean {
        return document.documentElement.clientWidth <= this.mobilePoint;
    }

    public getWidth(): number {
        return document.documentElement.clientWidth;
    }
}
