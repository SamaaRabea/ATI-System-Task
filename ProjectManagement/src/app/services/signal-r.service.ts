
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  connection!: signalR.HubConnection;
  constructor(
    private toastr: ToastrService
  ) {}

 connect=()=> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://atisystems.ddns.net:53265/signalr/hubs',{
      })
      .build();

    this.connection.start().then(() => {
      console.log('SignalR connection established.');
      // Subscribe to events
      // this.connection.on('taskCreated', (TaskName: string) => {
      //   this.toastr.info(`Task "${TaskName}" created`);
      // });

    }).catch(error => {
      console.log('Error establishing SignalR connection:', error);
    });
  }

  notifyTaskCreated(taskName: string) {
    // Call the "NotifyTaskCreated" method on the SignalR hub
    this.connection.invoke('NotifyTaskCreated', taskName)
      .then(()=>{
        this.toastr.success(taskName)
      })
      .catch(error => {
        console.error('Error notifying task creation:', error);
      });
  }
  notifyTaskEdit(taskName: string) {
    // Call the "NotifyTaskEdit" method on the SignalR hub
    this.connection.invoke('NotifyTaskEdit', taskName)
      .catch(error => {
        console.error('Error notifying task Editing:', error);
      });
  }
  notifyTaskDelete(taskName: string) {
    // Call the "NotifyTaskDelete" method on the SignalR hub
    this.connection.invoke('NotifyTaskDelete', taskName)
      .catch(error => {
        console.error('Error notifying task Deleteing:', error);
      });
  }

}
