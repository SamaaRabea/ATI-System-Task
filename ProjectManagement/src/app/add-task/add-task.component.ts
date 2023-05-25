import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataService } from '../services/data.service';
import { ProductService } from '../services/product.service';
import { SignalRService } from '../services/signal-r.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  submitted: boolean = false;
  actionButton: string = 'Create';
  memberList: any; // to get teamMember
  toolList: any; // to get all Tools
  taskStepsList: any[] = [];
  selectedProject: any; // to store Product
  tasks: any; // for product Tasks
  seasons: string[] = ['Child of', 'Parent of'];

  constructor(
    private taskService: DataService,
    private projectService: ProductService,
    private signalRService: SignalRService,
    private alertify: AlertifyService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddTaskComponent>
  ) {}

  ngOnInit() {
    this.signalRService.connect();
    this.taskStepsList = [];
    this.createTaskForm();
    this.taskService.currentTasks.subscribe(selectedProject => (this.selectedProject = selectedProject));
    this.tasks = this.selectedProject.TaskList;
    this.getTeamMembers();
    this.getAllTools();
    if (this.editData) {
      this.actionButton = 'Update';
      this.editData.StartDate = new Date(this.editData.StartDate).toISOString().substring(0, 10);
      this.editData.EndDate = new Date(this.editData.EndDate).toISOString().substring(0, 10);
      this.taskForm.patchValue(this.editData);
      this.taskStepsList = this.editData.TaskSteps;
    }
  }

  createTaskForm() {
    this.taskForm = new FormGroup({
      TaskID: new FormControl(''),
      ParentTaskID: new FormControl(''),
      ProjectID: new FormControl(''),
      TaskName: new FormControl(null, Validators.required),
      StartDate: new FormControl('', Validators.required),
      EndDate: new FormControl('', [Validators.required, this.endDateValidator]),
      EstmateTime: new FormControl('', [Validators.required]),
      TaskSteps: new FormControl(''),
      IsActive: new FormControl(''),
      TeamMemberList: new FormControl('', [Validators.required]),
      ProjectTools: new FormControl('', [Validators.required]),
    });
  }

  getAllTools() {
    this.projectService.getAllTool().subscribe(res => {
      this.toolList = res;
    });
  }

  getTeamMembers() {
    this.projectService.getAllTeamMembers().subscribe(res => {
      this.memberList = res;
    });
  }

  onSubmit() {
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.submitted = true;
        this.taskForm.controls['TaskSteps'].setValue(this.taskStepsList);
        this.projectService.postTask(this.taskForm.value).subscribe(
          res => {
            console.log(res);
            this.taskForm.reset();
            this.dialogRef.close('Create');
            this.alertify.success(`Task created`);
            // Send a notification to the SignalR hub
            this.signalRService.notifyTaskCreated(this.taskForm.value.TaskName);
          },
          error => {
            console.error('Error while creating task:', error);
          }
        );
      } else {
        this.submitted = false;
        this.markFormGroupTouched(this.taskForm);
      }
    } else {
      this.updateTask();
    }
  }

  updateTask() {
    this.projectService.EditTask(this.taskForm.value.TaskID).subscribe({
      next: res => {
        console.log(res);
        // Send a notification to the SignalR hub
        this.signalRService.notifyTaskEdit(this.taskForm.value.TaskName);
        this.taskForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        console.log('Error while updating task');
      }
    });
  }

  // Custom validator
  endDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const startDate = control.root.get('StartDate')?.value;
    const endDate = control.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end < start) {
        return { endDateInvalid: true };
      }
    }

    return null;
  }

  // For displaying the selected name in the input select
  getSelectedDisplay(controlName: string, propertyName: string): string {
    const control = this.taskForm.get(controlName);
    const selectedItems = control?.value;
    if (selectedItems) {
      return selectedItems.map((item: any) => item[propertyName]).join(', ');
    }
    return '';
  }

  // Define a custom compareWith function to compare the selected value with the option value
  compareFn(option: any, selectedValue: any): boolean {
    return option && selectedValue && option.MemberID === selectedValue.MemberID;
  }

  addStep() {
    this.taskStepsList.push(this.taskForm.value.TaskSteps);
    this.taskForm.controls['TaskSteps'].setValue('');
    console.log(this.taskStepsList);
  }

  deleteStep(item: any) {
    const index = this.taskStepsList.indexOf(item);
    if (index !== -1) {
      this.taskStepsList.splice(index, 1);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
