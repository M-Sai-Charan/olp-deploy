import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'olp';
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'F12' ||
      (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(event.key.toLowerCase())) ||
      (event.ctrlKey && event.key.toLowerCase() === 'u')
    ) {
      event.preventDefault();
    }
  }
}
