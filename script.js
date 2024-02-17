// Control Panel Script
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('webcamFeed');

canvas.width = 800;
canvas.height = 600;

let currentShape = [];
let shapes = []; // Array of shapes, each shape is an array of { x, y } points

// Start webcam feed
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error("Error starting webcam feed:", err);
    });

function drawShape(shape, highlight = false) {
    if (shape.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(shape[0].x, shape[0].y);
    shape.forEach((point, index) => {
        if (index > 0) ctx.lineTo(point.x, point.y);
    });
    if (shape.length > 2) {
        ctx.closePath();
    }
    ctx.strokeStyle = highlight ? 'yellow' : 'white';
    ctx.stroke();
}

function updateCanvas() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => drawShape(shape));
    drawShape(currentShape); // Draw the currently being drawn shape
    requestAnimationFrame(updateCanvas);
}

canvas.addEventListener('click', (e) => {
    currentShape.push({ x: e.offsetX, y: e.offsetY });
});

canvas.addEventListener('dblclick', () => {
    if (currentShape.length > 2) {
        shapes.push([...currentShape]);
        currentShape = [];
    }
});

function isPointInShape(x, y, shape) {
    let inside = false;
    for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
        const xi = shape[i].x, yi = shape[i].y;
        const xj = shape[j].x, yj = shape[j].y;

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Button functionalities
document.getElementById('saveShapes').addEventListener('click', () => {
    localStorage.setItem('projectionShapes', JSON.stringify(shapes));
    alert('Shapes saved!');
});

document.getElementById('clearCanvas').addEventListener('click', () => {
    shapes = [];
    currentShape = [];
    updateCanvas();
});

document.getElementById('openProjectionWindow').addEventListener('click', () => {
    const projectionWindow = window.open('', 'ProjectionWindow', 'width=800,height=600');
    projectionWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Projection Window</title>
            <style>
                body { margin: 0; overflow: hidden; width: 100vw; height: 100vh; position: relative; }
                iframe { position: absolute; border: none; }
            </style>
        </head>
        <body>
            <script>
                const shapes = JSON.parse(localStorage.getItem('projectionShapes')) || [];
                shapes.forEach(shape => {
                    const iframe = document.createElement('iframe');
                    iframe.src = "about:blank"; // Set to your content URL
                    // Calculate and set position and size based on the shape points
                    // This is a simplified approach; adjust as needed
                    const bounds = shape.reduce((acc, point) => ({
                        minX: Math.min(acc.minX, point.x),
                        maxX: Math.max(acc.maxX, point.x),
                        minY: Math.min(acc.minY, point.y),
                        maxY: Math.max(acc.maxY, point.y),
                    }), { minX: Infinity, maxX: 0, minY: Infinity, maxY: 0 });
                    iframe.style.left = \`\${bounds.minX}px\`;
                    iframe.style.top = \`\${bounds.minY}px\`;
                    iframe.style.width = \`\${bounds.maxX - bounds.minX}px\`;
                    iframe.style.height = \`\${bounds.maxY - bounds.minY}px\`;
                    document.body.appendChild(iframe);
                });
            <\/script>
        </body>
        </html>
    `);
    projectionWindow.document.close();
});

updateCanvas(); // Start the loop to draw the webcam feed and shapes