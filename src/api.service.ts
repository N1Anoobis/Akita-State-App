import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Todo } from "./app/todo.model";
import { environment } from "./environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = environment.baseUrl
    constructor(private http: HttpClient) { }

    addTodo(title: string, desc: string): Observable<Todo> {
        return this.http.post<Todo>(this.baseUrl, { title, desc })
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.baseUrl).pipe(map((res) => res))
    }

    deleteTodo(id: string): Observable<Todo> {
        return this.http.delete<Todo>(`${this.baseUrl}/${id}`)
    }

    updateTodo(id: string, changes: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.baseUrl}/${id}`, changes)
    }
}
