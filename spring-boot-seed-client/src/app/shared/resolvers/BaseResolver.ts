import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../services/App.service';

@Injectable()
export class BaseResolver implements Resolve<any> {
  constructor(protected appService: AppService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable((observer) => {
      this.appService.getAppInfo().subscribe(
        (appInfo: any) => {
          observer.next(null);
        }, (err: any) => {
          observer.error(err);
        }, () => {
          observer.complete();
        }, );
    });
  }
}
