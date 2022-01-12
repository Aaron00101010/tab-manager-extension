import { color } from '@vaadin/vaadin-lumo-styles/color';

export class ColorScheme {
  isDark: boolean = false;
  darkThemeStyleNode: Element;

  constructor(private updateCallback: (isDarkMode: boolean) => void) {
    const template = document.createElement('template');
    template.innerHTML = `<style>${color
      .toString()
      .replace(':host', 'html')}</style>`;
    this.darkThemeStyleNode = template.content.firstElementChild!;
    this.setDarkMode();
    this.watchPrefersColorScheme();
  }

  setDarkMode(): void {
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const head = document.head;
    this.isDark
      ? !head.contains(this.darkThemeStyleNode) &&
        head.appendChild(this.darkThemeStyleNode)
      : head.contains(this.darkThemeStyleNode) &&
        head.removeChild(this.darkThemeStyleNode);
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
