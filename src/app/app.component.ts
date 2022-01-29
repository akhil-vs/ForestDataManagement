import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: any;
    userName: string;
    isUser: boolean = false;

    constructor(private authenticationService: AuthenticationService) {
        if(this.authenticationService.user != null) {
            this.authenticationService.user.subscribe(x => {
                this.user = x;
                this.isUser = true;
            });
            this.authenticationService.userName.subscribe(x=> {
                // console.log(x);
                this.userName = x;
            });
        }
        else {
            this.isUser = false;
        }
    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.isUser = false;
    }
}