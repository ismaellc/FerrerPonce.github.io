/*jslint bitwise: true, es5: true */ (function (window, undefined) { 'use strict'; var KEY_ENTER = 13, KEY_LEFT = 37, KEY_UP = 38, KEY_RIGHT = 39, KEY_DOWN = 40, canvas = null, ctx = null, lastPress = null, pressing = [], pause = false, gameover = true, player = null, wall = [], lava = [], map0 = [ [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0], [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] ]; function Rectangle2D(x, y, width, height, createFromTopLeft) { this.width = (width === undefined) ? 0 : width; this.height = (height === undefined) ? this.width : height; if (createFromTopLeft) { this.left = (x === undefined) ? 0 : x; this.top = (y === undefined) ? 0 : y; } else { this.x = (x === undefined) ? 0 : x; this.y = (y === undefined) ? 0 : y; } } Rectangle2D.prototype = { constructor: Rectangle2D, left: 0, top: 0, width: 0, height: 0, get x() { return this.left + this.width / 2; }, set x(value) { this.left = value - this.width / 2; }, get y() { return this.top + this.height / 2; }, set y(value) { this.top = value - this.height / 2; }, get right() { return this.left + this.width; }, set right(value) { this.left = value - this.width; }, get bottom() { return this.top + this.height; }, set bottom(value) { this.top = value - this.height; }, intersects: function (rect) { if (rect !== undefined) { return (this.left < rect.right && this.right > rect.left && this.top < rect.bottom && this.bottom > rect.top); } }, fill: function (ctx) { if (ctx !== undefined) { ctx.fillRect(this.left, this.top, this.width, this.height); } } }; document.addEventListener('keydown', function (evt) { lastPress = evt.which; pressing[evt.which] = true; }, false); document.addEventListener('keyup', function (evt) { pressing[evt.which] = false; }, false); function setMap(map, blockSize) { var col = 0, row = 0, columns = 0, rows = 0; wall.length = 0; lava.length = 0; for (row = 0, rows = map.length; row < rows; row += 1) { for (col = 0, columns = map[row].length; col < columns; col += 1) { if (map[row][col] === 1) { wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true)); } else if (map[row][col] === 2) { lava.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true)); } } } } function reset() { player.left = 40; player.top = 40; gameover = false; } function paint(ctx) { var i = 0, l = 0; // Clean canvas ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw player ctx.fillStyle = '#0f0'; player.fill(ctx); // Draw walls ctx.fillStyle = '#999'; for (i = 0; i < wall.length; i += 1) { wall[i].fill(ctx); } // Draw lava ctx.fillStyle = '#f00'; for (i = 0; i < lava.length; i += 1) { lava[i].fill(ctx); } // Debug last key pressed ctx.fillStyle = '#fff'; ctx.fillText('Last Press: ' + lastPress, 0, 20); // Draw pause if (pause) { ctx.textAlign = 'center'; if (gameover) { ctx.fillText('GAMEOVER', 150, 100); } else { ctx.fillText('PAUSE', 150, 100); } ctx.textAlign = 'left'; } } function act(deltaTime) { var i = 0, l = 0; if (!pause) { // GameOver Reset if (gameover) { reset(); } // Move Rect if (pressing[KEY_UP]) { player.y -= 5; for (i = 0; i < wall.length; i += 1) { if (player.intersects(wall[i])) { player.top = wall[i].bottom; } } } if (pressing[KEY_RIGHT]) { player.x += 5; for (i = 0; i < wall.length; i += 1) { if (player.intersects(wall[i])) { player.right = wall[i].left; } } } if (pressing[KEY_DOWN]) { player.y += 5; for (i = 0; i < wall.length; i += 1) { if (player.intersects(wall[i])) { player.bottom = wall[i].top; } } } if (pressing[KEY_LEFT]) { player.x -= 5; for (i = 0; i < wall.length; i += 1) { if (player.intersects(wall[i])) { player.left = wall[i].right; } } } // Out Screen if (player.x > canvas.width) { player.x = 0; } if (player.y > canvas.height) { player.y = 0; } if (player.x < 0) { player.x = canvas.width; } if (player.y < 0) { player.y = canvas.height; } // Player Intersects Lava for (i = 0; i < lava.length; i += 1) { if (player.intersects(lava[i])) { gameover = true; pause = true; } } } // Pause/Unpause if (lastPress === KEY_ENTER) { pause = !pause; lastPress = null; } } function repaint() { window.requestAnimationFrame(repaint); paint(ctx); } function run() { setTimeout(run, 50); act(0.05); } function init() { // Get canvas and context canvas = document.getElementById('canvas'); ctx = canvas.getContext('2d'); canvas.width = 300; canvas.height = 200; // Create player player = new Rectangle2D(40, 40, 10, 10, true); // Set map setMap(map0, 10); // Start game run(); repaint(); } window.addEventListener('load', init, false); }(window)); - See more at: http://juegos.canvas.ninja/2013/03/tile-mapping.html#sthash.z4TI96PX.dpuf
