import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css']
})
export class AddTodoDialogComponent implements OnInit {

  ref: MatDialogRef<AddTodoDialogComponent>;

  constructor() { }

  ngOnInit() {
  }

  formSubmitted() {
    this.ref.close();
  }
}
