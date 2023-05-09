import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductapiService } from '../productapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from '../data-sharing.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: any;
  mobile: any;
  loginForm!: FormGroup;
  loginApiRes: any[];
  temp: boolean = false;
  inValidCredentials: boolean = false;

  constructor(
    private router: Router,
    private apiService: ProductapiService,
    private formBuilder: FormBuilder,
    private loginDataService: DataSharingService
  ) {}

  ngOnInit() {
    this.apiService.getloginDetails().subscribe((res) => {
      console.log('Login Details', res);
      this.loginApiRes = res;
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^[1-9]\d{9}$/)],
      ],
    });
  }
  get formDetails() {
    return this.loginForm?.['controls'];
  }
  login() {
    const loginData = {
      email: this.loginForm?.['controls']?.['email'].value,
      mobile: this.loginForm?.['controls']?.['mobile'].value,
    };
    this.loginDataService.sendData(loginData);
    console.log('LoginData', loginData);
    this.loginApiRes.forEach((ele) => {
      if (
        ele.email === this.loginForm?.['controls']?.['email'].value &&
        ele.mobile === this.loginForm?.['controls']?.['mobile'].value
      ) {
        this.router.navigate(['/dashboard']);
      } else {
        this.inValidCredentials = true;
      }
    });
  }
}
