import { Inject, Injectable } from '@angular/core';
import { User } from '../domains/User';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst 
const STORAGE_KEY = 'local_user';
@Injectable()
export class LocalStorageService {
     anotherTodolist = [];
     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

     public storeOnLocalStorage(user: User): void {
        // insert updated array to local storage
        this.storage.set(STORAGE_KEY, user);
        console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
     }

     public getFromLocalStorage(): User {
        return <User>this.storage.get(STORAGE_KEY);
     }

}