import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartModule } from 'angular-highcharts';
import { ToastrModule } from 'ngx-toastr';


import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StatisticsComponent,
    AddTaskComponent,
    ProductListComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    ChartModule,
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    //angular material modules
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
