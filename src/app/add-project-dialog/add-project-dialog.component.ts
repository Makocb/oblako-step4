import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects-service';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {

  ref: MatDialogRef<AddProjectDialogComponent>;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      projectName: ['', [Validators.required]]
    });
  }

  isControlInvalid(): boolean {
    const control = this.formGroup.controls.projectName;
    return control.invalid && control.touched;
  }

  onSubmit() {
    const controls = this.formGroup.controls;
    if (this.formGroup.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.projectsService.createProject({
      title: this.formGroup.value.projectName
    } as Project, (newProject: Project) => {
      this.ref.close(newProject);
    });
  }


}
