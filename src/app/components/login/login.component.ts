import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username
  password
  failedLogin
  constructor(public route: Router, public topbar: TopbarComponent) { }
  user = [
    { 'username': 'clokam@miraclesoft.com', 'password': 'miracle@123' },
    { 'username': 'yagnesh@miraclesoft.com', 'password': 'yagi@123' },
    { 'username': 'pavani@miraclesoft.com', 'password': 'pavani@123' },
    { 'username': 'Bhanu@miraclesoft.com', 'password': 'bhanu@123' },
    { 'username': 'John@miraclesoft.com', 'password': 'john@123' }
  ]
  ngOnInit() {
    
  }
  attemptLogin() {
    console.log(this.username)
    console.log(this.password)
    var index = this.user.findIndex(obj => obj.username === this.username)
    console.log(index)
    if (index >= 0 && this.password == this.user[index].password) {
      sessionStorage.setItem('name', this.username)
      this.route.navigateByUrl('/chatui')
    }
    else
      this.failedLogin = true

  }
}
