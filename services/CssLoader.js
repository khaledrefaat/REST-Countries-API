export default class CssLoader {
  constructor(root) {
    this.root = root;
    this.styles = document.createElement('style');
    this.root.appendChild(this.styles);
  }

  async CssLoader(cssFilePath) {
    try {
      const request = await fetch(cssFilePath);
      const text = await request.text();
      this.styles.textContent = text;
    } catch (error) {
      console.log(error);
    }
  }
}
