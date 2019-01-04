import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

import * as moment from "moment";

import { Task } from "../../interfaces/task";

import { TasksService } from "../../services/tasks.service";
import { Observable, forkJoin, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-movies",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit {
  private route: ActivatedRoute;
  private tasksService: TasksService;

  filterForm = new FormGroup({
    taskFilter: new FormControl("all")
  });

  newTaskForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    dueDate: new FormControl("")
  });

  tasks = [];
  showNewTask = false;
  constructor(route: ActivatedRoute, tasksService: TasksService) {
    this.route = route;
    this.tasksService = tasksService;
  }

  ngOnInit() {
    this.tasksService.getTasks().subscribe((resp: Task[]) => {
      this.tasks = resp.map(task => {
        task.dueDate = new Date(task.dueDate);
        return task;
      });

    });
  }

  clickAddTask() {
    this.showNewTask = true;
  }

  resetAddTaskForm() {
    this.newTaskForm.controls.name.setValue("");
    this.newTaskForm.controls.description.setValue("");
    this.newTaskForm.controls.dueDate.setValue("");
    this.showNewTask = false;
  }

  addTask() {
    this.tasksService
      .createTask(this.newTaskForm.value)
      .subscribe((resp: Task) => {
        this.tasks.unshift(
          <Task>{
            id: resp.id,
            name: this.newTaskForm.value.name,
            description: this.newTaskForm.value.description,
            dueDate: new Date(this.newTaskForm.value.dueDate)
          }

        );
        this.resetAddTaskForm();
      });
  }

  deleteTask(task) {
    this.tasksService.deleteTask(task.id).subscribe((resp: Task) => {
      for (let i = 0; i <= this.tasks.length; i++) {
        if (task == this.tasks[i]) {
          this.tasks.splice(i, 1);
        }
      }
    });
  }

  completeTask(task) {
    this.tasksService.completeTask(task).subscribe((resp: Task) => {
      for (let i = 0; i <= this.tasks.length; i++) {
        if (task == this.tasks[i]) {
          task.isComplete = 1;
        }
      }
    });
  }
}
