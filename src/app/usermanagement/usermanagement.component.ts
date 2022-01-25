import { Component, OnInit } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from "../_models/role";
import { newUser } from '@app/_models';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.less']
})
export class UsermanagementComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  roles: any;
  regSuccess: boolean = false;
  regMessage: string;
  allUsers: any;
  cols: any[];

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  
  ngOnInit() {
    this.cols = [
      {field: "name", header: "Name"},
      {field: "email", header: "Email"},
      {field: "role", header: "Role"}
    ];
    this.userService.getAll().subscribe(
      (res) => {this.allUsers = res;},
      (err) => {console.log(err);}
    );
    this.roles = Object.keys(Role);
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
        role: ['', Validators.required]
    }, 
    {validator: this.MustMatch('password', 'confirmPassword')});
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this.userService.register(this.form.value).subscribe(
      (res) => {this.loading = false;this.regSuccess = true; this.regMessage = "New user created Successfully !!"; this.onReset();},
      (err) => {this.regSuccess = false;this.regMessage = "Error in new user creation !!"}
    );
    
  }
  onReset() {
    this.submitted = false;
    this.form.reset();
  }

}
