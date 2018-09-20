import { Component, Input } from '@angular/core';
import { MenuService } from '../services/index';
import { RouterModule, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-account',
  templateUrl: 'my-account.component.html',
  styleUrls: ['my-account.component.css'],
})
export class MyAccountComponent {
  modulesList: any[];

  constructor(private menuProvider: MenuService, private router: Router) {
    this.router.navigate(['login']);

    // menuProvider.getMenuItems()
    //   .then((result) => {
    //     if (result && result.length > 0) {
    //       this.modulesList = result;
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  navigate(module: any) {
    this.router.navigate([module.path]);
  }
}
