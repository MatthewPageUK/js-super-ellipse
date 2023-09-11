/**
 * A Super Ellipse class
 *
 * @property {Number} n - The 'n' value
 * @property {Number} a - The x axis scale (width)
 * @property {Number} b - The y axis scale (height)
 * @property {Number} p - Number of points to plot
 * @property {Number} s - The step in angle for each point
 * @property {Object[]} points - Array of point objects x, y
 */
class SuperEllipse {
    constructor() {
        this.TWO_PI = Math.PI * 2;
        this.n = 0.5;
        this.a = 230;
        this.b = 230;
        this.p = 400;
        this.s = this.TWO_PI / this.p;
        this.points = [];
    }
    draw() {
        this.points = [];
        for( let angle = 0; angle <= this.TWO_PI; angle += this.s ) {
            let x = Math.pow(Math.abs(Math.cos(angle)), 2 / this.n) * this.a * Math.sign(Math.cos(angle));
            let y = Math.pow(Math.abs(Math.sin(angle)), 2 / this.n) * this.b * Math.sign(Math.sin(angle));
            this.points.push({x: x, y: y});
        }
        return(this.points);
    }
    get svg() {
        let path = null;
        this.draw().forEach((point)=>{
            if(path === null) {
                path = `M ${Math.floor(point.x+250)} ${Math.floor(point.y+250)} `;
            } else {
                path += `L ${Math.floor(point.x+250)} ${Math.floor(point.y+250)} `;
            }
        });
        path += `z`;
        let data = `<?xml version="1.0" standalone="no"?>
        <svg width="4cm" height="4cm" viewBox="0 0 550 550" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <title>A super ellipse</title>
          <desc>My super ellipse n = ${this.n} a = ${this.a} b = ${this.b} p = ${this.p}</desc>
          <path d="${path}" stroke="green" stroke-width="2" />
        </svg>
        `;
        let downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(data));
        downloadAnchorNode.setAttribute("download", "superellipse.svg");
        document.body.appendChild(downloadAnchorNode); // required for firefox?
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        return data;
    }
}
