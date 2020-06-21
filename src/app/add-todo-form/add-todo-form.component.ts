import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects-service';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements OnInit {

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  projects = [];
  formGroup: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.setSelectItems();
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      todo: ['', [Validators.required]],
      project: ['', [Validators.required]]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    const controls = this.formGroup.controls;
    if (this.formGroup.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.projectsService.createTodo({
      project_id: this.formGroup.value.project,
      text: this.formGroup.value.todo
    } as Todo, () => {
      this.formSubmitted.emit();
    });
  }

  setSelectItems() {
    this.projects = this.projectsService.projects.map(p => {
      return {
        value: p.id,
        text: p.title
      };
    });
    this.projects.unshift({
      value: -1,
      text: 'Новая категория'
    });
  }

  projectSelectionChange(e: MatSelectChange) {
    if (e.value === -1) {
      const dialogRef = this.dialog.open(AddProjectDialogComponent);
      dialogRef.afterClosed().subscribe((result: Project) => {
        if (result) {
          this.setSelectItems();
          this.formGroup.controls.project.setValue(result.id);
        } else {
          this.formGroup.controls.project.reset();
        }
      });
      dialogRef.componentInstance.ref = dialogRef;
    }
  }
}
