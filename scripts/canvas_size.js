function setCanvasSize() {
    canvasWrapperRect = document.getElementById('canvas-wrapper').getBoundingClientRect();
    canvas.width = canvasWrapperRect.width;
    canvas.height = canvasWrapperRect.height;
}
