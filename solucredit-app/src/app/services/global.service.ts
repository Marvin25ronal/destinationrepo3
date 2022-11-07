import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    private profile = new Subject<any>();

    publishProfile(data: any) {
        console.log('publicando');
        this.profile.next(data);
    }

    getProfileData(): Subject<any> {
        return this.profile;
    }
}