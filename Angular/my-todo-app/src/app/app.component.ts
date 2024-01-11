import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>My Todo App</h1>
  <!-- Create Elements -->
  <div *ngIf="!isUpdateFormActive">
    <input #inputEl type="text" [(ngModel)]="work">
    <button (click)="save(inputEl)">Save</button>
  </div>
  <!-- Create Elements -->
  <br>
  <!-- Update Elements -->
  <div *ngIf="isUpdateFormActive">
    <input type="text" [(ngModel)]="updateWork">
    <button (click)="update()">Update</button>
    <button (click)="cancel()">Cancel</button>
  </div>
  <!-- Update Elements -->
  <hr>
  <ul>
    <li *ngFor="let t of todos; let i = index"> 
      {{ t }}
      <button *ngIf="!isUpdateFormActive" (click)="get(i)">Update</button>
      <button *ngIf="!isUpdateFormActive" (click)="removeByIndex(i)">Remove</button>
    </li>
  </ul>`
})
export class AppComponent {
  work: string = "";
  updateWork: string = "";
  updateIndex: number = 0;
  isUpdateFormActive: boolean = false;
  todos: string[] = [];

  save(inputEl: HTMLInputElement){
    this.todos.push(this.work);
    this.work = "";
    inputEl.focus();
  }

  removeByIndex(index: number){
    this.todos.splice(index,1);
  }

  get(index: number){
    this.updateWork = this.todos[index];
    this.updateIndex = index;
    this.isUpdateFormActive = true;
  }

  update(){
    this.todos[this.updateIndex] = this.updateWork;
    this.isUpdateFormActive = false;
  }

  cancel(){
    this.isUpdateFormActive = false;
  }
}
