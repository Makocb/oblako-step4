import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  projects: Project[] = null;
  projectsUrl = environment.apiBaseUrl + '/projects';

  constructor(private http: HttpClient) { }

  loadProjects() {
    this.http.get(this.projectsUrl).subscribe((projects: Project[]) => {
      // sort projects and tasks
      projects.sort((a, b) => this.stringCompare(a.title, b.title));
      projects.forEach(project => {
        project.todos.sort((a, b) => this.stringCompare(a.text, b.text));
      });

      this.projects = projects;
    });
  }

  stringCompare(a, b) {
    const nameA = a.toUpperCase();
    const nameB = b.toUpperCase();

    return nameA < nameB
      ? -1
      : nameA > nameB
        ? 1
        : 0;
  }

  updateTodo(projectId: string, todoId: string, isCompleted: boolean) {
    this.http.patch(`${environment.apiBaseUrl}/projects/${projectId}/todo/${todoId}`, {
      isCompleted
    }).subscribe(() => {
      this.projects
        .find(p => p.id === Number.parseInt(projectId, 10))
        .todos
        .find(t => t.id === Number.parseInt(todoId, 10))
        .isCompleted = isCompleted;
    });
  }

  createTodo(todo: Todo, callback: () => void) {
    this.http.post<Todo>(`${environment.apiBaseUrl}/todos`, todo).subscribe((newTodo: Todo) => {
      this.projects
        .find(p => p.id === todo.project_id)
        .todos
        .push(newTodo);
      if (callback) {
        callback();
      }
    });
  }

  createProject(project: Project, callback: (Project) => void) {
    this.http.post<Project>(this.projectsUrl, project).subscribe((newProject: Project) => {
      newProject.todos = [];
      this.projects.push(newProject);
      if (callback) {
        callback(newProject);
      }
    });
  }
}
