import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoModel } from 'src/app/models/todo.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  todos: TodoModel[] = [];

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){}
  ngOnInit(): void {
    this.getAll();
  }

  logout(){
    localStorage.clear();
    this._router.navigateByUrl("/login");
  }

  getAll(){
    this._http.get<TodoModel[]>("http://localhost:3000/api/todo/getAll").subscribe({
      next: (res)=>{
        this.todos = res;
      },
      error: (err)=>{
        alert(err.error.message);
        console.log(err);
      }
    });
  }

  add(form: NgForm){
    this._http.post<any>("http://localhost:3000/api/todo/add",form.value).subscribe({
      next: (res)=>{
        this.getAll();
        form.reset();
      },  
      error: (err)=>{
        alert(err.error.message);
        console.log(err);
      }
    })
  }

  removeById(id: string){
    let model = { "_id": id};
    this._http.post<any>("http://localhost:3000/api/todo/removeById",model).subscribe({
      next: (res)=>{
        this.getAll();
      },  
      error: (err)=>{
        alert(err.error.message);
        console.log(err);
      }
    })
  }

  updateById(id: string){
    let model = { "_id": id};
    this._http.post<any>("http://localhost:3000/api/todo/updateById",model).subscribe({
      next: (res)=>{
        this.getAll();
      },  
      error: (err)=>{
        alert(err.error.message);
        console.log(err);
      }
    })
  }

  changeClassByStatus(status: boolean) {
    if(status) return "text-success"

    return "text-danger"
  }

}
