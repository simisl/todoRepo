import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TODO } from '../classes/todoListClass';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  taskName: string ='';
  todoList: TODO[] = [];
  arrayTodo:any[]=[];
  editData: boolean;

  constructor(private todoService: TodoService) {
    this.editData = false;
  }

  ngOnInit(): void {
    this.getList();
  }
  addToList(): void {
    if(this.taskName != ''){
      this.todoService.addTodo(this.taskName);
    }
    this.taskName = '';
    this.getList();
  }
  getList(): void {
    this.arrayTodo = []
    this.todoList = this.todoService.getTodo();
    Object.values(this.todoList).filter(obj=>{
      this.arrayTodo.push(obj);
    })
  }
  deleteTask(id:number): void{
    this.todoService.deleteTodo(id);
    this.getList();
  }
  editTask(todo:TODO): void{
    todo.edit = true;
  }
  cancelEdit(todo:TODO){
    todo.edit = false;
    this.getList();
  }
  updateTask(todo:TODO, id:number){
    todo.edit = false;
    this.todoService.updateTodo(todo,id);
    this.getList();
  }
}
