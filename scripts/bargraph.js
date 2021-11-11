var canvas;
var context;
var Val_Max;
var xScale;
var yScale;
var y;

function initBarGraph(itemName, itemValue, itemColor, sections, step, scale, scaleTitle, graphTitle) {
    // itemName = itemName;
    // itemValue = itemValue;
    // itemColor = itemColor;
    // sections = sections;
    // step = step;
    // scale = scale;
    // scaleTitle = scaleTitle;
    console.log("beginning graph")
    

    canvas = document.getElementById("graph-canvas");
    context = canvas.getContext("2d");
    setCanvasSize();
    var columnSize = 80;
    var rowSize = (canvas.width / sections);
    var margin = 20;

    //clear graph
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //changes the color of drawn items
    context.fillStyle = "#000";

    yScale = (canvas.height - columnSize - margin) / (scale);
    xScale = (canvas.width - rowSize) / (sections);
    //grid lines
    context.strokeStyle="gray";
    context.beginPath();

    context.font = "25px Arial";
    context.fillText(graphTitle, (canvas.width/3), 30);

    context.font = "19px Arial"; //scale title
    context.fillText(scaleTitle, 2, columnSize - margin);
    //draw lines in background
    context.font = "16px Arial"; //step numbers
    var count = 0;
    for (i=scale;i>=0;i = i - step) {
        y = columnSize + (yScale * count * step);
        context.fillText(i, margin, y + margin);
        context.moveTo(margin + 50, y);
        context.lineTo(canvas.width,y);
        count++;
    }
    context.stroke();

    context.font = "20px Arial"; //bar titles
    context.textBaseline="bottom";
    for (i=0;i<(sections); i++) {
        computeHeight(itemValue[i]);
        context.fillText(itemName[i], xScale * (i+1), y-margin);
    }

    context.translate(0, canvas.height - margin);
    context.scale(xScale, -1 * yScale);

    for(i=0;i<(sections); i++){
        context.fillRect(i+1,0,0.3, itemValue[i]);
    }

}

function computeHeight(value) {
	y = canvas.height - value * yScale ;	
}