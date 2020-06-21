import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from './add-todo-dialog/add-todo-dialog.component';
import { ProjectsService } from './services/projects-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oblakostep4';


  constructor(
    public dialog: MatDialog,
    public projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.projectsService.loadProjects();
  }

  addClick() {
    const dialogRef = this.dialog.open(AddTodoDialogComponent);
    dialogRef.componentInstance.ref = dialogRef;
  }

  itemChange(change: MatCheckboxChange) {
    const ids = change.source.id.split('_');
    this.projectsService.updateTodo(ids[0], ids[1], change.checked);
  }
}
