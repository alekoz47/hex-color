var rocky = require("rocky");

var settings = null;

function draw(ctx) {
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	var d = new Date();
	var days = d.getDate();
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
	color = hexStringToColor(color);
	
	setTextColor(ctx, color);
	ctx.textAlign = "center";
	ctx.font = "42px bold numbers Leco-numbers";
	
	h = extendString(h.toString(), 2);
	m = extendString(m.toString(), 2);
	var textAdjust = ctx.measureText("0").height;
	ctx.fillText(h, x / 2, (y / 2) - (textAdjust * 1.25));
	ctx.fillText(m, x / 2, (y / 2) - 13 + (textAdjust * 0.25));
	
	ctx.font = "18px Gothic";
	var dateString = extendString(d.toString(), 2);
	color.red = extendString(color.red.toString(16), 2);
	color.green = extendString(color.green.toString(16), 2);
	color.blue = extendString(color.blue.toString(16), 2);
	var colorString = color.red + color.green + color.blue;
	var dateHeightAdjust = (y / 2) - ctx.measureText(d).height;
	
	if (settings) {
		if (settings.showHex) {
			ctx.fillText(colorString, x / 2, (y / 2) + (textAdjust * 1.5));
		}
		if (settings.showDate) {
			ctx.fillText(dateString, x / 2, dateHeightAdjust - (textAdjust * 1.5));
		}
	} else {
		ctx.fillText(colorString, x / 2, (y / 2) + (textAdjust * 1.5));
	}
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

function hexStringToColor(hex) {
	hex = parseInt(hex, 16);
	var red = (hex & 0xFF0000) >> 16;
	var green = (hex & 0xFF00) >> 8;
	var blue = hex & 0xFF;
	console.log("split color: " + red + " : " + green + " : " + blue);
	
	var color = {
		red: red,
		green: green,
		blue: blue,
	};
	
	return color;
}

function setTextColor(ctx, color) {
	var redMap = color.red * 0.299;
	var greenMap = color.green * 0.587;
	var blueMap = color.blue * 0.114;
	
	if ((redMap + greenMap + blueMap) > 127.5) {
		ctx.fillStyle = "black";
	} else {
		ctx.fillStyle = "white";
	}
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

rocky.on('message', function(event) {
  settings = event.data;
  rocky.requestDraw();
});

rocky.postMessage({command: 'settings'});
