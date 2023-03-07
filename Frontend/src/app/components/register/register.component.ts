import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){}

  register(form:NgForm){
    this._http.post<LoginModel>("http://localhost:3000/api/auth/register",form.value).subscribe({
      next: (res)=>{
        localStorage.setItem("user",JSON.stringify(res.user));
        localStorage.setItem("accessToken", res.token);
        this._router.navigateByUrl("/");
      },
      error: (err)=>{
        alert(err.error.message);
        console.log(err);
      }
    })
  }
}
