import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '@app/_models';
import { Role } from '../_models/role';
import { UserService, AuthenticationService } from '@app/_services';
import { ApiService } from '../_services/api.service';
import { Console } from 'console';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  user: User;
  userFromApi: User;
  allUsers: User[];
  allData: any = [];
  cols: any[];
  circles: any;
  divisions: any;
  headofAccounts: any;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.user = this.authenticationService.userValue;
    if (this.user == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.cols = [
      {field: "name", header: "Name"},
      {field: "circle", header: "Circle"},
      {field: "hoa", header: "Head of Account"},
      {field: "month", header: "Month"},
      {field: "year", header: "Year"},
      {field: "submit_date", header: "Submitted on"}
    ];
    this.circles = [
        { name: 'Southern Circle - Kollam', code: 'c1' },
        { name: 'High Range Circle - Kottayam', code: 'c2' },
        { name: 'Central Circle - Thrissur', code: 'c3' },
        { name: 'Eastern Circle - Palakkad', code: 'c4' },
        { name: 'Northern Circle - Kannur', code: 'c5' },
      ];
  
      this.divisions = [
        // {name: 'Division 1', code: 'd1'},
        // {name: 'Division 2', code: 'd2'},
        // {name: 'Division 3', code: 'd3'},
        // {name: 'Division 4', code: 'd4'}
      ];
  
      this.headofAccounts = [
        { name: 'Forest Protection (Revenue)', code: 'a1' },
        { name: 'SOFB', code: 'a2' },
        // {name: 'Extension Forestry', code: 'a3'},
        { name: 'Eco Tourism', code: 'a4' },
        { name: 'NABARD', code: 'a5' },
        { name: 'Parambikulam Tiger Rreserve', code: 'a6' },
      ];
    this.loading = true;
    this.userService.getAll().subscribe(
      (res) => {this.allUsers = res;},
      (err) => {console.log(err);}
    );
    // let circles;
    this.apiService.getAllCircles().subscribe(
      (res) => {this.circles = res},
      (err) => {console.log(err)}
    );
    this.apiService.getAllHoas().subscribe(
      (res) => {this.headofAccounts = res},
      (err) => {console.log(err)}
    );
    if (this.user.role == Role.User) {
      this.router.navigate(['user']);
    } else {
      this.apiService.getAllForms().subscribe(
        (res) => {
          this.allData = res;
          for(let data of this.allData) {
            for(let circle of this.circles) {
              if(data.circle == circle.code) {
                data.circle = circle.name
              }
            }
            for(let hoa of this.headofAccounts) {
              if(data.hoa == hoa.code) {
                data.hoa = hoa.name
              }
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
      
    }
    // console.log(this.allData);
    // this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
    //     this.loading = false;
    //     this.userFromApi = user;
    // });
  }
}
