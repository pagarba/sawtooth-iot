import { Injectable } from '@angular/core';
import { BaseAuthenticationService } from '../security/index';

@Injectable()
export abstract class BaseMenuService {

  routes: any[];

  constructor(private authService: BaseAuthenticationService) { }

  abstract getMenuItems(): Promise<any>;
  abstract getMenuItemsByPath(path: string): Promise<any>;
}
