import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  constructor(
    public http: HttpClient ,
    private productServices :ProductService ,
    private taskService:DataService,
    private router: Router
    ) {}
  projects:any
  selectedProject: object | undefined
  ngOnInit(): void {
     this.getallProduct()
  }

  getallProduct() {
    this.productServices.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
  }
  transferTasks(project:any) {
    this.selectedProject = project;
    this.taskService.updateTasks(this.selectedProject);
  }

}
