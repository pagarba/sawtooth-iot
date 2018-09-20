import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export abstract class BaseAppService {
  constructor(http: Http, router: Router) {
    //Base
  }
}
