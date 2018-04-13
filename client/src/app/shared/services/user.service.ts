import { Injectable } from '@angular/core';
import {CrudInterface} from './CrudInterface';
import {Observable} from 'rxjs/Observable';
import {User} from '../objects/auditable/User';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {ResponseList} from '../objects/ResponseList';
import {Response} from '../objects/Response';
import {EventService} from './event.service';
import 'rxjs/add/operator/timeout';

@Injectable()
export class UserService extends BaseService implements CrudInterface<User> {
  private usersUrl = this.baseUrl + 'api/v1/users';

  constructor(protected http: HttpClient, protected eventService: EventService) {
    super(http, eventService);
  }

  getAll(): Observable<User[]> {
    return new Observable((observer) => {
      this.eventService.loading.next(true);

      const subscription = this.http.get<ResponseList>(this.usersUrl)
        .timeout(this.timeout)
        .subscribe(
        (rsp: ResponseList) => {
          rsp.data = (rsp.data).map((item: any) => new User(item));
          observer.next(rsp.data);
        }, (rsp: any) => {
          observer.error(this.handleError(rsp.error));
        }, () => {
          this.eventService.loading.next(false);
          observer.complete();
          subscription.unsubscribe();
        });
    });
  }

  get(id: number): Observable<User> {
    // console.log('UserService - get - id: ' + id);
    return new Observable((observer) => {
      this.eventService.loading.next(true);

      const subscription = this.http.get<Response>(this.usersUrl + '/' + id)
        .timeout(this.timeout)
        .subscribe(
        (rsp: Response) => {
          observer.next(new User(rsp.data as User));
        }, (rsp: any) => {
          observer.error(this.handleError(rsp.error));
        }, () => {
          this.eventService.loading.next(false);
          observer.complete();
          subscription.unsubscribe();
        });
    });
  }

  create(item: User): Observable<User> {
    return new Observable((observer) => {
      this.eventService.loading.next(true);

      const subscription = this.http.put<Response>(this.usersUrl, item.removeGettersSetters())
        .timeout(this.timeout)
        .subscribe(
        (rsp: Response) => {
          observer.next(new User(rsp.data as User));
        }, (rsp: any) => {
          observer.error(this.handleError(rsp.error));
        }, () => {
          this.eventService.loading.next(false);
          observer.complete();
          subscription.unsubscribe();
        });
    });
  }

  remove(id: number): Observable<void> {
    return new Observable((observer) => {
      this.eventService.loading.next(true);

      const subscription = this.http.delete<User>(this.usersUrl + '/' + id)
        .timeout(this.timeout)
        .subscribe(
        () => {
          observer.next();
        }, (rsp: any) => {
          observer.error(this.handleError(rsp.error));
        }, () => {
          this.eventService.loading.next(false);
          observer.complete();
          subscription.unsubscribe();
        });
    });
  }

  delete(id: number): Observable<void> {
    return new Observable((observer) => {
      this.eventService.loading.next(true);

      const subscription = this.http.delete<User>(this.usersUrl + '/' + id + '?delete=true')
        .timeout(this.timeout)
        .subscribe(
        () => {
          observer.next();
        }, (rsp: any) => {
          observer.error(this.handleError(rsp.error));
        }, () => {
          this.eventService.loading.next(false);
          observer.complete();
          subscription.unsubscribe();
        });
    });
  }

  update(item: User): Observable<User> {
    return new Observable((observer) => {
      this.eventService.loading.next(true);

      const subscription = this.http.post<Response>(this.usersUrl + '/' + item.id, item.removeGettersSetters())
        .timeout(this.timeout)
        .subscribe(
        (rsp: Response) => {
          observer.next(new User(rsp.data));
        }, (rsp: any) => {
          console.dir(rsp);
          observer.error(this.handleError(rsp.error));
        }, () => {
          this.eventService.loading.next(false);
          observer.complete();
          subscription.unsubscribe();
        });
    });
  }
}
