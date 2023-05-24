import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { beClient } from 'src/axios.client';
import { interval } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showErrorMessage: boolean = false;
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  async login() {
    try {
      if(this.email && this.password){
        const user = await beClient.post('/users/login', {
          email: this.email,
          password: this.password,
        });
        
        this.router.navigate(['/inbox']);
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      }
    } catch (error) {
      this.showErrorMessage = true;
      interval(2000).subscribe(() => {
        this.showErrorMessage = false;
      });
      console.log(error);
    }
  }
}
