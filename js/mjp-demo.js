const TWO_PI = Math.PI * 2;

const mySuperEllipse = new SuperEllipse();
const mySuperEllipse2 = new SuperEllipse();
let e2dir = 1;
let scanPoint = 0;
let frameCount = 0;

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
canvas.width = 968;
canvas.height = 646;

const midX = 334;
const midY = 324;

const nInput = document.getElementById("nInput");
const aInput = document.getElementById("aInput");
const bInput = document.getElementById("bInput");
const nValue = document.getElementById("nValue");
const aValue = document.getElementById("aValue");
const bValue = document.getElementById("bValue");
nInput.addEventListener("input", ()=>{ nValue.textContent = nInput.value; mySuperEllipse.n = parseFloat(nInput.value); });
aInput.addEventListener("input", ()=>{ aValue.textContent = aInput.value; mySuperEllipse.a = parseFloat(aInput.value); });
bInput.addEventListener("input", ()=>{ bValue.textContent = bInput.value; mySuperEllipse.b = parseFloat(bInput.value); });

draw();

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = `rgba(251, 191, 36, 0.8)`;
    ctx.lineWidth = 3;

    let firstPoint = true;
    ctx.beginPath();
    mySuperEllipse.draw().forEach((point)=>{
        if(firstPoint) {
            ctx.moveTo(point.x + midX, point.y + midY);
            firstPoint = false;
        } else {
            ctx.lineTo(point.x + midX, point.y + midY);
        }
    });
    ctx.stroke();

    // Draw the fx super ellipse
    ctx.beginPath();
    ctx.strokeStyle = `rgba(251, 191, 36, 0.3)`;
    ctx.lineWidth = 1;
    if(e2dir===1) {
        mySuperEllipse2.n += 0.05;
        if(mySuperEllipse2.n > 3) {
            e2dir = 0;
        }
    } else {
        mySuperEllipse2.n -= 0.05;
        if(mySuperEllipse2.n < 0.2) {
            e2dir = 1;
        }
    }
    mySuperEllipse2.a = parseFloat(aInput.value)/4;
    mySuperEllipse2.b = parseFloat(bInput.value)/4;
    mySuperEllipse2.draw().forEach((point)=>{
        if(firstPoint) {
            ctx.moveTo(point.x + 45, point.y + 600);
            firstPoint = false;
        } else {
            ctx.lineTo(point.x + 45, point.y + 600);
        }
    });
    ctx.stroke();

    // Draw the dimension bars
    ctx.strokeStyle = `rgba(251, 191, 36, 0.3)`;
    ctx.beginPath();
    ctx.moveTo( midX - parseFloat(aInput.value), 620-15);
    ctx.lineTo( midX - parseFloat(aInput.value), 620);
    ctx.lineTo( midX + parseFloat(aInput.value), 620);
    ctx.lineTo( midX + parseFloat(aInput.value), 620-15);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo( 620-15, midY - parseFloat(bInput.value));
    ctx.lineTo( 620, midY - parseFloat(bInput.value));
    ctx.lineTo( 620, midY + parseFloat(bInput.value));
    ctx.lineTo( 620-15, midY + parseFloat(bInput.value));
    ctx.stroke();

    // Binary frame counter
    let binF = ( frameCount % 2100 ).toString(2);
    let sx = 300;
    let sy = 20;
    ([...binF]).forEach((c)=>{
        if(c=="0") {
            ctx.fillStyle = "rgba(251, 191, 36, 0.1)";
        } else {
            ctx.fillStyle = "rgba(251, 191, 36, 0.3)";
        }
        ctx.fillRect(sx-(binF.length*15), sy, 10, 10);
        sx += 15;
    });

    // Draw the scan line
    ctx.strokeStyle = `rgba(251, 191, 36, 0.4)`;
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(mySuperEllipse.points[scanPoint].x + midX, mySuperEllipse.points[scanPoint].y + midY);
    ctx.stroke();
    ctx.fillRect(mySuperEllipse.points[scanPoint].x + midX - 6, mySuperEllipse.points[scanPoint].y + midY - 6, 12, 12);
    scanPoint += 1;
    if(scanPoint >= mySuperEllipse.p) scanPoint = 0;

    // Draw scan line value
    ctx.font = "20px 'ZCOOL QingKe HuangYou'";
    let r = Math.floor(Math.sqrt(Math.pow(mySuperEllipse.points[scanPoint].x, 2) + Math.pow(mySuperEllipse.points[scanPoint].y, 2)));
    ctx.fillText(`R ${r}`, 30, midY - 260);

    // Draw R vertical bar
    ctx.fillRect(30, midY - 250, 10, r);

    // Draw frame count
    ctx.fillText(`F ${frameCount}`, 30, 30);

    frameCount += 1;
    requestAnimationFrame(draw);
}
