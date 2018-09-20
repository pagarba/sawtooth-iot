import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { BaseMenuService } from '../../base/index';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'paragba-menu',
  templateUrl: 'leftmenu.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [`leftmenu.component.css`]
})

export class AppMenuComponent {
  @Input() collapsed = true;
  menulist: any;

  private targetElement: any;

  constructor(private _elementRef: ElementRef, private sanitizer: DomSanitizer,
                private router: Router, private menuService: BaseMenuService) {
      this.menuService.getMenuItems()
        .then((result) => {
          if (result && result.length > 0) {
            this.menulist = result;
            console.log('menu', result);
          }
        })
        .catch(error => {
          console.error(error);
        });
  }

  toggleSubMenu(item: any) {
    item.expand = !item.expand;
  }
  redirectHome() {
    this.router.navigate(['']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

