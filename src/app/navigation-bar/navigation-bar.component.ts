import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent implements AfterViewInit {
    @ViewChild('navbarToggleButton') navbarToggleButton!: ElementRef;
    @ViewChild('navbarDefault') navbarDefault!: ElementRef;

    ngAfterViewInit(): void {
        const button = this.navbarToggleButton.nativeElement;
        const navbar = this.navbarDefault.nativeElement;

        button.addEventListener('click', () => {
            if (navbar.classList.contains('hidden')) {
              navbar.classList.remove('hidden');
            } else {
              navbar.classList.add('hidden');
            }
          });
    }
}
