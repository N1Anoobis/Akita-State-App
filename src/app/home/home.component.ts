import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';
import { ApiService } from 'src/api.service';
import { TodoQuery } from '../state/query';
import { TodoStore } from '../state/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false
  todos: Record<string, any>[] = []
  constructor(private router: Router, private todoQuery: TodoQuery, private todoStore: TodoStore, private apiService: ApiService) { }

  ngOnInit(): void {
    this.todoQuery.getLoading().subscribe(res => this.loading = res)
    this.todoQuery.getTodos().subscribe(res => this.todos = res)
    this.todoQuery.getLoaded().pipe(
      take(1),
      filter(res => !res),
      switchMap(() => {
        this.todoStore.setLoading(true)
        return this.apiService.getTodos()
      })
    ).subscribe(res => {
      this.todoStore.update(state => {
        return {
          todos: res,
          isLoaded: true
        }
      })
      this.todoStore.setLoading(false)
    }, err => {
      console.log(err)
      this.todoStore.setLoading(false)
    })
  }

  addTodo() {
    this.router.navigateByUrl('/addTodo')
  }

}
