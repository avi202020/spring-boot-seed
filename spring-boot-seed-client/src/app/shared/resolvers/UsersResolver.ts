import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../services/App.service';
import {BaseResolver} from './BaseResolver';
import {UserService} from '../services/User.service';
import {User} from '../objects/auditable/User';

@Injectable()
export class UsersResolver extends BaseResolver implements Resolve<any> {
  constructor(protected router: Router,
              protected appService: AppService,
              protected userService: UserService) {
    super(appService, router);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return new Observable((observer) => {
      super.resolve(route, state).subscribe();

      const subscription = this.userService.getAll().subscribe(
        (users: User[]) => {
          observer.next(users);
        }, (err: any) => {
          this.router.navigate(['/home']);
          observer.complete();
        }, () => {
          observer.complete();
          subscription.unsubscribe();
        }, );
    });
  }
}
