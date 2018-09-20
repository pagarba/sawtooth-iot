import { Component, ViewChildren, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Config } from './config/env.config';
import './operators';
import 'rxjs/operators/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { LoginComponent } from './login/login.component';
import { BaseAuthenticationService, BaseAlertService, BaseMenuService, BaseConfigService } from './base/index';
import { MessageSeverity, AlertMessage, ResponsiveService, LocalStoreManager, DBkeys } from './services/index';
import { User } from './models/index';
import * as $ from 'jquery';
import { MatDrawer } from '@angular/material';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

// This still has to be declared
declare var gtag: Function;

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  menuOpened: boolean;
  menuCollapsed: boolean;
  shouldShowLogin: boolean;
  isUserLoggedIn: boolean;
  stickyToasties: number[] = [];
  pageTitle: string;
  @ViewChildren('loginControl')
  loginControl: LoginComponent;
  isMobile: boolean;
  isUserFirstLogin: boolean;
  @ViewChild('sidenav')
  sidenav: MatDrawer;

  constructor(private authService: BaseAuthenticationService, private menuService: BaseMenuService,
              private alertService: BaseAlertService, private router: Router, private titleService: Title,
              private toastyService: ToastyService, private toastyConfig: ToastyConfig,
              private responsive: ResponsiveService,
              private localStorage: LocalStoreManager,
              private configService: BaseConfigService) {
    //console.log('Environment config', Config);
    this.menuOpened = false;
    this.menuCollapsed = false;
    this.toastyConfig.theme = 'material';
    this.toastyConfig.position = 'top-center';
    this.toastyConfig.limit = 100;
    this.toastyConfig.showClose = true;
    this.isMobile = responsive.isMobile();
  }

  ngOnInit() {
    this.isUserFirstLogin = false;
    //this.isUserLoggedIn = this.authService.isLoggedIn;
    //if (this.isUserLoggedIn) {
    //  this.isUserFirstLogin = this.authService.isUserFirstLogin;
    //}

    this.updateDrawerViewMode();

    this.alertService.getMessageEvent().subscribe(message => this.showToast(message, false));
    this.alertService.getStickyMessageEvent().subscribe(message => this.showToast(message, true));

    //this.authService.reLoginDelegate = () => this.shouldShowLogin = true;
    //this.authService.getLoginStatusEvent().subscribe((isLoggedIn: boolean) => {
    //  this.isUserLoggedIn = isLoggedIn;
    //  this.isUserFirstLogin = this.authService.isUserFirstLogin;
    //  this.updateDrawerViewMode();
    //  setTimeout(() => {
    //    if (!this.isUserLoggedIn) {
    //      this.alertService.showMessage('Session Ended!', '', MessageSeverity.default);
    //      this.authService.logout();
    //      this.authService.redirectLogoutUser();
    //    }
    //  }, 500);
   // });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        let url = (<NavigationEnd>event).url;

        if (url.toLocaleLowerCase().indexOf('login') >= 0) {
          this.isUserLoggedIn = false;
          console.log('false');
        } else {
          this.isUserLoggedIn = true;
          console.log('true');
        }
      }
      if (event instanceof NavigationEnd) {
    //    this.isUserFirstLogin = this.authService.isUserFirstLogin;
        this.isUserFirstLogin = false;
        this.updateDrawerViewMode();
        let title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.pageTitle = title;
        let url = (<NavigationEnd>event).url;

        if (url !== url.toLowerCase()) {
          this.router.navigateByUrl((<NavigationEnd>event).url.toLowerCase());
        }

        if (this.responsive.isMobile()) {
          this.sidenav.close();
        }
      }
    });

    this.router.events
      .distinctUntilChanged((previous: any, current: any) => {
        if (current instanceof NavigationEnd) {
          return previous.url === current.url;
        }
        return true;
      })
      .subscribe((x: any) => {
        gtag('config', this.configService.googleAnalitycsId, {'page_path': x.url});
      });

    this.responsive.$resizeEvent.subscribe(() => {
      this.updateDrawerViewMode();
    });
  }

  getTitle(state: any, parent: any) {
    let data: any = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  updateDrawerViewMode() {
    this.isMobile = this.responsive.isMobile();
    this.menuOpened = this.isUserLoggedIn && !this.isMobile && !this.isUserFirstLogin;
    this.menuCollapsed = !this.isMobile && this.menuCollapsed;
  }

  showToast(message: AlertMessage, isSticky: boolean) {

    if (!message) {
      for (let id of this.stickyToasties.slice(0)) {
        this.toastyService.clear(id);
      }
      return;
    }

    let toastOptions: ToastOptions = {
      title: message.summary,
      msg: message.detail,
      timeout: isSticky ? 0 : 4000
    };

    if (isSticky) {
      toastOptions.onAdd = (toast: ToastData) => this.stickyToasties.push(toast.id);

      toastOptions.onRemove = (toast: ToastData) => {
        let index = this.stickyToasties.indexOf(toast.id, 0);

        if (index > -1) {
          this.stickyToasties.splice(index, 1);
        }

        toast.onAdd = null;
        toast.onRemove = null;
      };
    }

    switch (message.severity) {
    case MessageSeverity.default: this.toastyService.default(toastOptions); break;
    case MessageSeverity.info: this.toastyService.info(toastOptions); break;
    case MessageSeverity.success: this.toastyService.success(toastOptions); break;
    case MessageSeverity.error: this.toastyService.error(toastOptions); break;
    case MessageSeverity.warn: this.toastyService.warning(toastOptions); break;
    case MessageSeverity.wait: this.toastyService.wait(toastOptions); break;
    }
  }

  onLoginModalHidden() {
    this.shouldShowLogin = false;
  }

  toggleMenuOpen() {
    this.sidenav.toggle();
  }
  toggleMenuCollapse() {
    if (this.isMobile) {
      this.toggleMenuOpen();
    } else {
      this.menuCollapsed = !this.menuCollapsed;
    }
  }
}
