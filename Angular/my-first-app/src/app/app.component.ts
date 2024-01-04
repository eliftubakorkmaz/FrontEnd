import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name: string = "Elif Tuba";
  name2: string = "";
  names: string[] = ["Halil", "Cumhan", "Füsun", "Bade", "Tuğçe", "Şeref"]

  showName2InConsole(){
    this.name2 = this.name;
    console.log(this.name2);
  }
}
