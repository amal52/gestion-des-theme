import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

type ThemeType = 'theme1-light' | 'theme1-dark' | 'theme2-light' | 'theme2-dark' | 'theme-bw-light' | 'theme-bw-dark';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div [class]="currentTheme">
      <mat-toolbar color="primary">
        <span>Gestion des Thèmes</span>
        <span style="flex: 1 1 auto"></span>
        <button mat-button (click)="setTheme(isDark ? 'theme1-dark' : 'theme1-light')">Thèmevert</button>
        <button mat-button (click)="setTheme(isDark ? 'theme2-dark' : 'theme2-light')">Thèmebleu</button>
        <button mat-button (click)="setTheme(isDark ? 'theme-bw-dark' : 'theme-bw-light')">Noir & Blanc</button>
        <button mat-icon-button (click)="toggleDarkMode()">
          <mat-icon>{{ isDark ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content">
  <mat-card>
    <h1>Thème</h1>
    <mat-card-content>
      <p>Les couleurs sont totalement différentes entre les thèmes.</p>
    </mat-card-content>

    <!-- Bouton pour réinitialiser au thème par défaut -->
    <button (click)="resetToDefault()">Thème Par Défaut</button>
  </mat-card>
</div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    .content {
      padding: 20px;
    }
    mat-card {
      background-color: var(--background);
      color: var(--text-color);
      padding: 1rem;
      border-radius: 8px;
    }

  `]
})

export class App {
  isDark = false;
  currentTheme: ThemeType = 'theme-bw-light'; // Thème par défaut

  toggleDarkMode() {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  setTheme(theme: string) {
    this.currentTheme = theme as ThemeType;
    this.applyTheme();
  }

  resetToDefault() {
    this.isDark = false;
    this.currentTheme = 'theme-bw-dark';
    this.applyTheme();
  }

  private applyTheme() {
    document.body.className = this.currentTheme;
  }
}

bootstrapApplication(App, {
  providers: [provideAnimations()]
}).catch(err => console.error(err));
