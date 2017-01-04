var rocky = require("rocky");

function draw(ctx) {
	var d = new Date();
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	var days = d.getDay();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	drawBackground(ctx, days, hours, minutes, w, h);
	drawTime(ctx, days, hours, minutes, w, h);
}

function drawBackground(ctx, d, h , m, x, y) {
	var colorString = dateToHex(d, h, m);
	var color = colorString;
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, x, y);
}

function drawTime(ctx, d, h, m, x, y) {
	ctx.textAlign = "center";
	ctx.font = "28px bold Droid-serif";
	ctx.fillStyle = "white";
	var textAdjust = ctx.measureText("0").height / 2;
	ctx.fillText(h.toString() + "h" + m.toString(), x / 2, (y / 2) - textAdjust);
}

function dateToHex(d, h, m) {
	// TODO: Remove console.log() statements
	console.log(d);
	console.log(h);
	console.log(m);
	d = Math.round(convertRange(d, 0, 31, 0, 255));
	h = Math.round(convertRange(h, 0, 60, 0, 255));
	m = Math.round(convertRange(m, 0, 60, 0, 255));
	console.log(d);
	console.log(h);
	console.log(m);
	var dateHexString = "#" + d.toString(16) + h.toString(16) + m.toString(16);
	console.log(dateHexString);
	return dateHexString;
}

function convertRange(x, xMin, xMax, yMin, yMax) {
	// TODO: Fix this, maybe switched
	var percent = (x - xMin) / (xMax - xMin);
	return percent * (yMax - yMin) + yMin;
}

rocky.on("draw", function(event) {
	draw(event.context);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
