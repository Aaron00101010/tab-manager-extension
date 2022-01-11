import type { LitElement } from 'lit';

export class ColorScheme {
  isDark: boolean = false;

  constructor(private updateCallback: (isDarkMode: boolean) => void) {
    this.setDarkMode();
    this.watchPrefersColorScheme();
  }

  setDarkMode(): void {
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const root = document.documentElement;
    this.isDark
      ? root.setAttribute('theme', 'dark')
      : root.removeAttribute('theme');
  }

  watchPrefersColorScheme(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        this.setDarkMode();
        this.updateCallback(e.matches);
      });
  }
}
