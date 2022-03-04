import { Injectable } from '@angular/core';
import { TODO } from '../classes/todoListClass';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {

  }

  addTodo(task:string): void {
    let todoPrevious = this.getTodo();
    let newTodo = new TODO(task,false);
    todoPrevious.push(newTodo);
    this.storeTodo(todoPrevious);
  }
  getTodo(): TODO[] {
    let todoList = JSON.parse(localStorage.getItem('list') || '[]');
    return todoList == null? [] : todoList;
  }
  storeTodo(todoData:TODO[]): void{
    localStorage.setItem('list', JSON.stringify(todoData));
  }
  deleteTodo(id:number): void{
    let todoData = this.getTodo();
    todoData.splice(id,1);
    localStorage.setItem('list', JSON.stringify(todoData));
  }
  updateTodo(todo:TODO,id:number){
    let todoData = this.getTodo();
    todoData.splice(id,1,todo);
    localStorage.setItem('list', JSON.stringify(todoData));
  }
}
