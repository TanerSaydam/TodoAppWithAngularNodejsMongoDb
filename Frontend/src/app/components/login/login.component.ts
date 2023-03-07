import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){}

  login(form: NgForm){
    this._http.post<LoginModel>("http://localhost:3000/api/auth/login", form.value).subscribe({
      next: (res)=>{
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("accessToken", res.token);
        this._router.navigateByUrl("/");
      },
      error: (err)=> {
        alert(err.error.message);
        console.log(err);
      }
    })
  }
}
