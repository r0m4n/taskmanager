import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';

// import * as redis from 'redis';
// import * as rejson from 'redis-rejson';
// import { promisify } from 'util';

@Injectable()
export class TaskService {
  db = new sqlite3.Database(':memory:');
  //client = redis.createClient();
  constructor() {
    let _this = this;
    this.run(
      `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        dueDate INTEGER DEFAULT 0,
        isComplete INTEGER DEFAULT 0)`,
    );
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  //     create(name, description, isComplete, projectId) {
  //     return this.dao.run(
  //       `INSERT INTO tasks (name, description, isComplete, projectId)
  //         VALUES (?, ?, ?, ?)`,
  //       [name, description, isComplete, projectId])
  //   }

  getTasks() {
    return this.all(`SELECT id, name, description, dueDate, isComplete FROM tasks ORDER BY id DESC`);
  }

  createTask(task) {
    return this.run(`INSERT INTO tasks (name, description, dueDate) VALUES (?, ?, ?)`, [
      task.name,
      task.description,
      task.dueDate
    ]);
  }

  deleteTask(id) {
    return this.run(`DELETE FROM tasks WHERE id=?`, [id]);
  }

  completeTask(id) {
    return this.run(`UPDATE tasks SET isComplete = ? WHERE id = ?`, [1, id]);
  }
}
