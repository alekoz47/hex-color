var rocky = require("rocky");

function draw(event) {
	var ctx = event.context;
	var d = new Date();
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	var days = d.getDate();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	drawBackground(ctx, days, hours, minutes, [w, h]);
	drawTime(ctx, days, hours, minutes, [w, h]);
}

function drawBackground(ctx, d, h , m, dim) {
	var colorString = dateToHex(d, h, m);
	var color = colorString.parseInt(16);
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, dim[0], dim[1]);
}

function drawTime(ctx, d, h, m, dim) {
	ctx.textAlign = "center";
	ctx.font = "28px bold Droid-serif";
	ctx.fillStyle = "white";
	ctx.fillText(h.toString + "" + m.toString, dim[0] / 2, dim[1] / 2);
}

function dateToHex(lod) {
	var acc = "#";
	for (var i = 0; i < lod.length; i++) {
		acc = acc + lod[i].toString(16);
	}
}

rocky.on("draw", function(event) {
	draw(event);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
