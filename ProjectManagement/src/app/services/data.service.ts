import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private tasksSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentTasks=this.tasksSubject.asObservable();
  constructor() { }
  
  updateTasks(tasks: any): void {
    this.tasksSubject.next(tasks);
  }
}
