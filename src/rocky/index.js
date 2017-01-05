var rocky = require("rocky");

function draw(ctx) {
	var d = new Date();
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var color = dateToHex(hours, minutes);
	
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	drawBackground(ctx, color, hours, minutes, w, h);
	drawTime(ctx, color, hours, minutes, w, h);
}

function drawBackground(ctx, color, h, m, x, y) {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, x, y);
}

function drawTime(ctx, color, h, m, x, y) {
	var hex = "0x";
	var colorList = color.split("");
	var red = hex.concat(colorList.slice(1, 3));
	var green = hex.concat(colorList.slice(3, 5));
	var blue = hex.concat(colorList.slice(5));
	red = parseInt(red, 10);
	green = parseInt(green, 10);
	blue = parseInt(blue, 10);
	
	if ((0.299 * red + 0.587 * green + 0.114 * blue) > 127) {
		ctx.fillStyle = "white";
	} else {
		ctx.fillStyle = "black";
	}
	ctx.textAlign = "center";
	ctx.font = "42px bold numbers Leco-numbers";
	
	h = extendString(h.toString(), 2);
	m = extendString(m.toString(), 2);
	
	var textAdjust = ctx.measureText("0").height;
	ctx.fillText(h, x / 2, (y / 2) - (textAdjust * 1.25));
	ctx.fillText(m, x / 2, (y / 2) - 13 + (textAdjust * 0.25));
}

function dateToHex(h, m) {
	h = Math.round(convertRange(h, 0, 24, 0, 4095));
	m = Math.round(convertRange(m, 0, 60, 0, 4095));
	console.log(h + " : " + m);
	
	h = extendString(h.toString(16), 3);
	m = extendString(m.toString(16), 3);
	
	var dateHexString = "#" + h.toString(16) + m.toString(16);
	console.log(dateHexString);
	return dateHexString;
}

function convertRange(x, xMin, xMax, yMin, yMax) {
	var percent = (yMax - yMin) / (xMax - xMin);
	return percent * (x - xMin) + yMin;
}

function extendString(string, length) {
	if (string.length < length) {
		return "0".concat(string);
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
