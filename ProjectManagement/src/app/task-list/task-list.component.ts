import { Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { DataService } from '../services/data.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import {MatDialog,} from '@angular/material/dialog';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  selectedProject: any;
  tasks :any;
  myTask: any;
  constructor(
    private projectServices:ProductService,
     private taskService:DataService,
     private signalRService: SignalRService,
     private dialog:MatDialog
     ) {}
  ngOnInit(): void {
  }
  ngDoCheck(){
    this.taskService.currentTasks.subscribe(selectedProject=>this.selectedProject=selectedProject)
    if (this.selectedProject) {
      this.tasks = this.selectedProject.TaskList;
    }
  }
  openDialog() {
    this.dialog.open(AddTaskComponent, {
     width:"90%",
     height:"90%"
    })
  }
  editProject(task:any){
    this.dialog.open(AddTaskComponent,{
      width:"90%",
     height:"90%",
     data:task
    })
  }
  deleteTask(id:any){
    this.projectServices.deleteTask(id).subscribe({
      next: (res) => {
        console.log(res)
        this.signalRService.notifyTaskEdit(this.tasks.TaskName);
      },
    });
  }


}
