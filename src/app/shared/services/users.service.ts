import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getUsers() {
    return this.get('users');
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}
