// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 1000;
canvas.height = 600;

// State
let isDrawing = false;
let currentTool = 'freehand';
let currentColor = '#000000';
let brushSize = 3;
let kaleidoscopeMode = false;
let symmetryCount = 6;

// For shape drawing
let startX, startY;
let snapshot;

// Undo/Redo stacks
let undoStack = [];
let redoStack = [];
const MAX_UNDO_STEPS = 50;

// Save initial state
saveState();

// Tool buttons
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentTool = e.target.dataset.tool;

        // Update cursor based on tool
        if (currentTool === 'eraser') {
            canvas.style.cursor = 'cell';
        } else {
            canvas.style.cursor = 'crosshair';
        }
    });
});

// Color buttons
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentColor = e.target.dataset.color;
        document.getElementById('colorPicker').value = currentColor;
    });
});

// Custom color picker
document.getElementById('colorPicker').addEventListener('input', (e) => {
    currentColor = e.target.value;
    // Update active state
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
});

// Brush size
document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
    document.getElementById('brushSizeValue').textContent = brushSize + 'px';
});

// Kaleidoscope mode
document.getElementById('kaleidoscopeMode').addEventListener('change', (e) => {
    kaleidoscopeMode = e.target.checked;
});

document.getElementById('symmetryCount').addEventListener('input', (e) => {
    symmetryCount = parseInt(e.target.value);
});

// Undo/Redo/Clear
document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('redoBtn').addEventListener('click', redo);
document.getElementById('clearBtn').addEventListener('click', clearCanvas);

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch support
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    if (currentTool === 'freehand' || currentTool === 'eraser') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);

        if (kaleidoscopeMode && currentTool !== 'eraser') {
            drawKaleidoscopePoint(startX, startY);
        }
    } else {
        // For shapes, take a snapshot
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'freehand') {
        drawFreehand(x, y);
    } else if (currentTool === 'eraser') {
        erase(x, y);
    } else if (currentTool === 'rectangle') {
        drawRectangle(x, y);
    } else if (currentTool === 'circle') {
        drawCircle(x, y);
    }
}

function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        ctx.beginPath();
        saveState();
    }
}

function drawFreehand(x, y) {
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    if (kaleidoscopeMode) {
        drawKaleidoscopeLine(startX, startY, x, y);
        startX = x;
        startY = y;
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function erase(x, y) {
    ctx.lineWidth = brushSize * 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function drawRectangle(x, y) {
    ctx.putImageData(snapshot, 0, 0);

    const width = x - startX;
    const height = y - startY;

    if (kaleidoscopeMode) {
        drawKaleidoscopeRectangle(startX, startY, width, height);
    } else {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.strokeRect(startX, startY, width, height);
    }
}

function drawCircle(x, y) {
    ctx.putImageData(snapshot, 0, 0);

    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));

    if (kaleidoscopeMode) {
        drawKaleidoscopeCircle(startX, startY, radius);
    } else {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Kaleidoscope functions
function drawKaleidoscopeLine(x1, y1, x2, y2) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < symmetryCount; i++) {
        const angle = (Math.PI * 2 * i) / symmetryCount;

        // Transform coordinates relative to center
        const relX1 = x1 - centerX;
        const relY1 = y1 - centerY;
        const relX2 = x2 - centerX;
        const relY2 = y2 - centerY;

        // Rotate and draw
        const rotX1 = relX1 * Math.cos(angle) - relY1 * Math.sin(angle) + centerX;
        const rotY1 = relX1 * Math.sin(angle) + relY1 * Math.cos(angle) + centerY;
        const rotX2 = relX2 * Math.cos(angle) - relY2 * Math.sin(angle) + centerX;
        const rotY2 = relX2 * Math.sin(angle) + relY2 * Math.cos(angle) + centerY;

        ctx.beginPath();
        ctx.moveTo(rotX1, rotY1);
        ctx.lineTo(rotX2, rotY2);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Mirror reflection
        const mirrorX1 = (centerX - relX1) * Math.cos(angle) - relY1 * Math.sin(angle) + centerX;
        const mirrorY1 = (centerX - relX1) * Math.sin(angle) + relY1 * Math.cos(angle) + centerY;
        const mirrorX2 = (centerX - relX2) * Math.cos(angle) - relY2 * Math.sin(angle) + centerX;
        const mirrorY2 = (centerX - relX2) * Math.sin(angle) + relY2 * Math.cos(angle) + centerY;

        ctx.beginPath();
        ctx.moveTo(mirrorX1, mirrorY1);
        ctx.lineTo(mirrorX2, mirrorY2);
        ctx.stroke();
    }
}

function drawKaleidoscopePoint(x, y) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < symmetryCount; i++) {
        const angle = (Math.PI * 2 * i) / symmetryCount;

        const relX = x - centerX;
        const relY = y - centerY;

        const rotX = relX * Math.cos(angle) - relY * Math.sin(angle) + centerX;
        const rotY = relX * Math.sin(angle) + relY * Math.cos(angle) + centerY;

        ctx.beginPath();
        ctx.arc(rotX, rotY, brushSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = currentColor;
        ctx.fill();

        // Mirror
        const mirrorX = (centerX - relX) * Math.cos(angle) - relY * Math.sin(angle) + centerX;
        const mirrorY = (centerX - relX) * Math.sin(angle) + relY * Math.cos(angle) + centerY;

        ctx.beginPath();
        ctx.arc(mirrorX, mirrorY, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawKaleidoscopeRectangle(x, y, width, height) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < symmetryCount; i++) {
        const angle = (Math.PI * 2 * i) / symmetryCount;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.translate(-centerX, -centerY);

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.strokeRect(x, y, width, height);

        // Mirror
        ctx.translate(centerX, centerY);
        ctx.scale(-1, 1);
        ctx.translate(-centerX, -centerY);
        ctx.strokeRect(x, y, width, height);

        ctx.restore();
    }
}

function drawKaleidoscopeCircle(x, y, radius) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < symmetryCount; i++) {
        const angle = (Math.PI * 2 * i) / symmetryCount;

        const relX = x - centerX;
        const relY = y - centerY;

        const rotX = relX * Math.cos(angle) - relY * Math.sin(angle) + centerX;
        const rotY = relX * Math.sin(angle) + relY * Math.cos(angle) + centerY;

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.arc(rotX, rotY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Mirror
        const mirrorX = (centerX - relX) * Math.cos(angle) - relY * Math.sin(angle) + centerX;
        const mirrorY = (centerX - relX) * Math.sin(angle) + relY * Math.cos(angle) + centerY;

        ctx.beginPath();
        ctx.arc(mirrorX, mirrorY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Undo/Redo functionality
function saveState() {
    if (undoStack.length >= MAX_UNDO_STEPS) {
        undoStack.shift();
    }
    undoStack.push(canvas.toDataURL());
    redoStack = [];
}

function undo() {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        const img = new Image();
        img.src = undoStack[undoStack.length - 1];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
}

function redo() {
    if (redoStack.length > 0) {
        const state = redoStack.pop();
        undoStack.push(state);
        const img = new Image();
        img.src = state;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
}

function clearCanvas() {
    if (confirm('Biztosan törölni szeretnéd a vásznat?')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
    }
}

// Touch support functions
function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

// Initialize with white background
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
saveState();
