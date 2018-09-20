import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationStart, Event } from '@angular/router';
import { BaseAuthenticationService, BaseConfigService } from '../../base/index';
import { ResponsiveService, LocalStoreManager, DBkeys } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'paragba-header',
  templateUrl: 'header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [`header.component.css`]
})
export class AppHeaderComponent implements OnInit {
  @Output() onToggle = new EventEmitter();
  @Input() pageTitle: string;
  helpText: any;
  userFullName: any;
  isMobile: boolean;

  constructor(private router: Router,
    private currentRoute: ActivatedRoute,
    private authService: BaseAuthenticationService,
    private configService: BaseConfigService,
    private responsive: ResponsiveService,
    private localStorage: LocalStoreManager) {
  }

  ngOnInit() {
    this.helpText = this.configService.helpText;
    //let currentUser = this.authService.currentUser;
    //this.userFullName = currentUser.fullName;
    this.updateViewMode();
    this.responsive.$resizeEvent
      .subscribe(this.updateViewMode.bind(this));
  }

  updateViewMode() {
    this.isMobile = this.responsive.isMobile();
  }

  showHelp() {
    this.localStorage.savePermanentData(true, DBkeys.FIRST_LOGIN);
    this.redirectHome();
  }

  redirectHome() {
    this.router.navigate(['']);
  }
  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }

  //headerAction(action: any) {
  //  if (action === 'logout') {
  //    this.logout();
  //  }
  //}
}

