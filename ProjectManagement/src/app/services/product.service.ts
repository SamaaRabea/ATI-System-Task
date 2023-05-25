import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http :HttpClient) { }
  getAllProjects() {
    return this.http.get(' http://atisystems.ddns.net:53265/api/Projects/GetProjects');
  }
  getAllTeamMembers() {
    return this.http.get(' http://atisystems.ddns.net:53265/api/Projects/GetTeams');
  }
  getAllTool() {
    return this.http.get(' http://atisystems.ddns.net:53265/api/Projects/GetTools');
  }
  getTask(id:number) {
    return this.http.get('http://atisystems.ddns.net:53265/api//Projects/GetTask/'+id);
  }
  EditTask(id :number) {
    // return this.http.put('http://atisystems.ddns.net:53265/api/Projects/UpdateTask/'+id,task);
    const url = `http://atisystems.ddns.net:53265/api/Projects/UpdateTask/${id}`;
    const headers = new HttpHeaders().set('TaskID', id.toString());
    return this.http.put(url, null, { headers });
  }
  postTask(data:any) {
    return this.http.post<any>("http://atisystems.ddns.net:53265/api/Projects/SaveTask/",data);
  }
  deleteTask(id:any){
    return this.http.delete('http://atisystems.ddns.net:53265/api/Projects/DeleteTask/'+id);
  }

}
