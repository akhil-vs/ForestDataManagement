import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '@app/_models';
import { Role } from "../_models/role";
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.user = this.authenticationService.userValue;
    }

    ngOnInit() {
        this.loading = true;
        if(this.user.role == Role.User) {
            this.router.navigate(['user']);
        }
        // this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
        //     this.loading = false;
        //     this.userFromApi = user;
        // });
    }
}