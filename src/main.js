const WIDTH = 720;
const HEIGHT = 480;
const APP_FPS = 60;

// stats
let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

// init
let app = new PIXI.Application({
	width: WIDTH,
	height: HEIGHT
});
let canvas = document.getElementById("canvas");
canvas.appendChild(app.view);
app.renderer.backgroundColor = 0x3366cc;
app.stage.interactive = true;
app.ticker.remove(app.render, app);
const fpsDelta = 60 / APP_FPS;

let app2 = new PIXI.Application({
	width: 720,
	height: 384
});
let canvas2 = document.getElementById("canvas2");
canvas2.appendChild(app2.view);
app2.renderer.backgroundColor = 0x3366cc;
app2.stage.interactive = true;

let bg;
let bg_fish
let shockwaveFilter;
let blurFilter;

let elapsedTime = 0;
let isPlaying = false;

let container_bg = new PIXI.Container();
container_bg.x = 0;
container_bg.y = 0;
app.stage.addChild(container_bg);

let container = new PIXI.Container();
container.width = 1280;
container.height = 720;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = true;
app.stage.addChild(container);

// asset property
const ASSET_BG = "images/pic_water.jpg";
const ASSET_FISH = "images/pic_bg_fish.jpg";

PIXI.loader
	.add("bg_data", ASSET_BG)
	.add("bg_fish", ASSET_FISH)
	.load(onAssetsLoaded);

/**
 * Asset load Complete
 * @param { object } loader object
 * @param { object } res asset data
 */
function onAssetsLoaded(loader, res) {
	// BG
	bg = new PIXI.Sprite(res.bg_data.texture);
	container_bg.addChild(bg);
	bg.x = 0;
	bg.y = 0;
	bg.interactive = true;
	bg.on("tap", (event) => {
		console.log("onTap"); // Desktop(Touch)
	});
	bg.on("click", (event) => {
		console.log("click"); // Desktop
	});

	// Text
	let text = new PIXI.Text("ShockwaveFilter", {
		fontFamily: "Arial",
		fontSize: 30,
		fill: 0xffffff,
		align: "center",
		fontWeight: "bold",
		dropShadow: true,
		dropShadowColor: "#000000",
		trim: true
	});
	container.addChild(text);
	text.x = 230;
	text.y = 30;

	// Shokwave
	shockwaveFilter = new PIXI.filters.ShockwaveFilter([WIDTH / 2, HEIGHT / 2], {
		amplitude: 20
	});
	bg.filters = [shockwaveFilter];

	TweenMax.to(shockwaveFilter, 2, {
		time: 2,
		ease: Linear.easeNone,
		repeat: -1,
		repeatDelay: 1
	});

	// Blur
	bg_fish_org = new PIXI.Sprite(res.bg_fish.texture);
	app2.stage.addChild(bg_fish_org);
	bg_fish_org.x = 0;
	bg_fish_org.y = 0;

	bg_fish = new PIXI.Sprite(res.bg_fish.texture);
	app2.stage.addChild(bg_fish);
	bg_fish.x = 360;
	bg_fish.y = 0;
	blurFilter = new PIXI.filters.BlurFilter();
	blurFilter.blur = 8; // default = 2;
	bg_fish.filters = [blurFilter];

	// Text Blur
	let text2 = new PIXI.Text("BlurFilter", {
		fontFamily: "Arial",
		fontSize: 30,
		fill: 0xffffff,
		align: "center",
		fontWeight: "bold",
		dropShadow: true,
		dropShadowColor: "#000000",
		trim: true
	});
	app2.stage.addChild(text2);
	text2.x = 300;
	text2.y = 30;

	let ticker = PIXI.ticker.shared;
	ticker.autoStart = false;
	ticker.stop();
	PIXI.settings.TARGET_FPMS = 0.06;
	app.ticker.add(tick);
}

/**
 * adjust fps
 * @param { number } delta time
 */
function tick(delta) {
	elapsedTime += delta;

	if (elapsedTime >= fpsDelta) {
		//enough time passed, update app
		update(elapsedTime);
		//reset
		elapsedTime = 0;
	}
}

/**
 * app rendering
 * @param { number } delta  time
 */
function update(delta) {
	// console.log("update()");

	stats.begin();

	stats.end();

	//render the canvas
	app.render();
}
