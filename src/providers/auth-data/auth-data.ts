import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthDataProvider {

  users: any = [];

  constructor(private storage: Storage) {
    console.log('Hello AuthDataProvider Provider');
  }

  registerUser(user:any):any {
    this.storage.get('registeredUsers').then((users) => {
      if (users) {
        console.log('users', users);
        this.users = users;
        return this.registerOtherUsers(user);
      } else {
        return this.registerFirstUser(user);
      }
    })
  }

  private registerFirstUser(user:any):any {
    this.users.push(user);
    this.storage.set('registeredUsers', this.users);
    return user;
  }

  private registerOtherUsers(newUser:any):any {
    let searchResult = this.users.find( user => user.email === newUser.email );
    if (!searchResult) {
      this.users.push(newUser);
      this.storage.set('registeredUsers', this.users);
      return newUser;
    } else {
      return null;
    }
  }

}
