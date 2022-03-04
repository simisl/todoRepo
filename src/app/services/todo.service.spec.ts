import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { TODO } from '../classes/todoListClass';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);

    let store: any= {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
  spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
  spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
  spyOn(localStorage, 'removeItem')
    .and.callFake(mockLocalStorage.removeItem);
  spyOn(localStorage, 'clear')
    .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the task in localStorage', () => {
    service.addTodo('go shopping');
    const data = [{"task":"go shopping","edit":false}]
    expect(localStorage.getItem('list')).toEqual(JSON.stringify(data));

  });

  it('should return the task from localStorage', () => {
    localStorage.clear();
    const data = [{"task":"buy books","edit":false}]
    localStorage.setItem('list',JSON.stringify(data));
    const todo = service.getTodo();
    expect(localStorage.getItem('list')).toEqual(JSON.stringify(todo));

  });

  it('should delete a task in localStorage', () => {
    const data = [{"task":"watch a movie","edit":false}]
    localStorage.setItem('list',JSON.stringify(data));
    service.deleteTodo(0);
    expect(localStorage.getItem('list')).toEqual('[]');
  });

  it('should edit a task in localStorage', () => {
    const data = [{"task":"watch a movie","edit":false}]
    localStorage.setItem('list',JSON.stringify(data));
    const editedData = new TODO("watch a dance show",false);
    service.updateTodo(editedData,0);
    expect(localStorage.getItem('list')).toEqual(JSON.stringify([editedData]));
  });
});
