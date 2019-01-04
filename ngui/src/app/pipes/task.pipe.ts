import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "taskFilter" })
export class TaskFilter implements PipeTransform {
  transform(items: any[], filterValue: string, args: string) {
    if (!filterValue) {
      return items;
    }

    if (!items) {
      return (items = []);
    }
    if (filterValue === 'isComplete') {
      return items.filter(item => item.isComplete === 1);
    } else if (filterValue === 'overdue') {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let yesterdayTime = yesterday.getTime();
      return items.filter(item => item.dueDate.getTime() < yesterdayTime);
    } else if (filterValue === 'dueSoon') {
      let today = new Date();
      let yesterday = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      yesterday.setDate(today.getDate() - 1);

      let yesterdayTime = yesterday.getTime();
      let tomorrowTime = tomorrow.getTime();
      return items.filter(item => item.dueDate.getTime() > yesterdayTime && item.dueDate.getTime() < tomorrowTime);
    } else {
      return items;
    }
  }
}
