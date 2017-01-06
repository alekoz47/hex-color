var rocky = require("rocky");

function draw(ctx) {
	var d = new Date();
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	var days = d.getDay();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var color = dateToHex(days, hours, minutes);
	
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	drawBackground(ctx, color, days, hours, minutes, w, h);
	drawTime(ctx, color, days, hours, minutes, w, h);
}

function drawBackground(ctx, color, d, h, m, x, y) {
	ctx.fillStyle = "#" + color;
	ctx.fillRect(0, 0, x, y);
}

function drawTime(ctx, color, d, h, m, x, y) {
	color = parseInt(color, 16);
	var red = (color & 0xFF0000) >> 16;
	var green = (color & 0xFF00) >> 8;
	var blue = color & 0xFF;
	console.log("split color: " + red + " : " + green + " : " + blue);
	
	if ((0.299 * red + 0.587 * green + 0.114 * blue) > 127) {
		ctx.fillStyle = "black";
	} else {
		ctx.fillStyle = "white";
	}
	ctx.textAlign = "center";
	ctx.font = "42px bold numbers Leco-numbers";
	
	h = extendString(h.toString(), 2);
	m = extendString(m.toString(), 2);
	
	var textAdjust = ctx.measureText("0").height;
	ctx.fillText(h, x / 2, (y / 2) - (textAdjust * 1.25));
	ctx.fillText(m, x / 2, (y / 2) - 13 + (textAdjust * 0.25));
	
	ctx.font = "18px Gothic";
	red = extendString(red.toString(16), 2);
	green = extendString(green.toString(16), 2);
	blue = extendString(blue.toString(16), 2);
	var colorString = red + green + blue;
	ctx.fillText(colorString, x / 2, (y / 2) + (textAdjust * 1.5));
}

function dateToHex(d, h, m) {
	d = Math.round(convertRange(d, 0, 31, 0, 255));
	h = Math.round(convertRange(h, 0, 24, 0, 255));
	m = Math.round(convertRange(m, 0, 60, 0, 255));
	
	d = extendString(d.toString(16), 2);
	h = extendString(h.toString(16), 2);
	m = extendString(m.toString(16), 2);
	
	var dateHexString = d.toString(16) + h.toString(16) + m.toString(16);
	console.log("hex color: " + dateHexString);
	return dateHexString;
}

function convertRange(x, xMin, xMax, yMin, yMax) {
	var percent = (yMax - yMin) / (xMax - xMin);
	return percent * (x - xMin) + yMin;
}

function extendString(string, length) {
	if (string.length < length) {
		return extendString("0".concat(string), length);
	} else {
		return string;
	}
}

rocky.on("draw", function(event) {
	draw(event.context);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
