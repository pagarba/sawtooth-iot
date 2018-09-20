import { menuItems } from '../../config/menu.config';
import { Injectable } from '@angular/core';
import { BaseMenuService, BaseAuthenticationService } from '../../base/index';

@Injectable()
export class MenuService extends BaseMenuService {

  constructor(private autheService: BaseAuthenticationService) {
    super(autheService);
    this.routes = menuItems;
    //if (autheService.isLoggedIn) {}
  }

  getMenuItems(): Promise<any> {
    let result = new Promise<any>((resolve, reject) => {
      if (this.routes && this.routes.length > 0) {
        resolve(this.routes.filter(route => route.path !== '/').filter(route => route.path !== '/login'));
      }
    });
    return result;
  }

  getMenuItemsByPath(path: string): Promise<any> {
    let result = new Promise<any>((resolve, reject) => {
      if (this.routes && this.routes.length > 0) {
        for (let route of this.routes) {
          if (route.path === path) {
            resolve(route.title);
          } else if (route.subItems && route.subItems.length > 0) {
            for (let childRoute of route.subItems) {
              if (childRoute.path === path) {
                resolve(childRoute.title);
              }
            }
          }
        }
      }
    });
    return result;
  }
}
