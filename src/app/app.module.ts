import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTodoDialogComponent } from './add-todo-dialog/add-todo-dialog.component';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProjectsService } from './services/projects-service';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTodoDialogComponent,
    AddTodoFormComponent,
    AddProjectDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [ProjectsService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddTodoDialogComponent,
    AddProjectDialogComponent
  ],
})
export class AppModule { }
