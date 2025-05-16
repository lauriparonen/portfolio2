export interface Sketch {
  id: string;
  title: string;
  description: string;
  sketchUrl: string;
  height?: string;
  isSquareVisualization?: boolean;
}

export const sketches: Sketch[] = [
  {
    id: 'recursive-squares',
    title: 'recursive spiral squares',
    description: 'A p5.js sketch that visualizes recursion by drawing squares inside squares, creating an optical illusion as though the boundaries of the squares vanish into a spiral.',
    sketchUrl: 'https://editor.p5js.org/lauriparonen/full/czMhcbE9e',
    height: '400px',
    isSquareVisualization: true
  },
  {
    id: 'sierpinski-circles',
    title: 'interactive sierpinski circles',
    description: 'This p5.js sketch explores recursive geometric structures using only circles. As you move the mouse across the x-axis (or click on different parts of the screen on mobile), the depth of the fractal (number of circles) increases. As the cursor is at the bottommost and rightmost extremes, the image formed is reminiscent of the <a href="https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle" style="color: rgb(191, 219, 254); text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">Sierpinski triangle</a>, only formed out of circles.',
    sketchUrl: 'https://editor.p5js.org/lauriparonen/full/L1YXE7rFi',
    height: '800px'
  }
]; 