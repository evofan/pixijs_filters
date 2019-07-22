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

let app3 = new PIXI.Application({
  width: 720,
  height: 384
});
let canvas3 = document.getElementById("canvas3");
canvas3.appendChild(app3.view);
app3.renderer.backgroundColor = 0xcc9966;
app3.stage.interactive = true;

let app4 = new PIXI.Application({
  width: 720,
  height: 384
});
let canvas4 = document.getElementById("canvas4");
canvas4.appendChild(app4.view);
app4.renderer.backgroundColor = 0x000000;
app4.stage.interactive = true;

let app5 = new PIXI.Application({
  width: 720,
  height: 384
});
let canvas5 = document.getElementById("canvas5");
canvas5.appendChild(app5.view);
app5.renderer.backgroundColor = 0xff9966;
app5.stage.interactive = true;

let bg;
let bg_fish, bg_fish_org;
let bg_leaf, bg_leaf_org;
let bg_space, bg_space_org;
let bg_wood, bg_wood_org;

let shockwaveFilter;
let blurFilter;
let pixelateFilter;
let zoomBlurFilter;
let dotFilter;

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
const ASSET_LEAF = "images/pic_bg_leaf.jpg";
const ASSET_SPACE = "images/pic_bg_space.jpg";
const ASSET_WOOD = "images/pic_bg_wood.jpg";

PIXI.loader
  .add("bg_data", ASSET_BG)
  .add("bg_fish", ASSET_FISH)
  .add("bg_leaf", ASSET_LEAF)
  .add("bg_space", ASSET_SPACE)
  .add("bg_wood", ASSET_WOOD)
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
  bg.on("tap", event => {
    console.log("onTap"); // Desktop(Touch)
  });
  bg.on("click", event => {
    console.log("click"); // Desktop
  });

  // Filter //

  // ShokwaveFilter
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

  // Text ShokwaveFilter
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

  // BlurFilter
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

  // Text BlurFilter
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

  // PixelateFilter
  bg_leaf_org = new PIXI.Sprite(res.bg_leaf.texture);
  app3.stage.addChild(bg_leaf_org);
  bg_leaf_org.x = 0;
  bg_leaf_org.y = 0;

  bg_leaf = new PIXI.Sprite(res.bg_leaf.texture);
  app3.stage.addChild(bg_leaf);
  bg_leaf.x = 360;
  bg_leaf.y = 0;
  pixelateFilter = new PIXI.filters.PixelateFilter();
  pixelateFilter.size = 20; // default: 10
  bg_leaf.filters = [pixelateFilter];

  // Text PixelateFilter
  let text3 = new PIXI.Text("PixelateFilter", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
    dropShadow: true,
    dropShadowColor: "#000000",
    trim: true
  });
  app3.stage.addChild(text3);
  text3.x = 275;
  text3.y = 30;

  // ZoomBlur
  bg_space_org = new PIXI.Sprite(res.bg_space.texture);
  app4.stage.addChild(bg_space_org);
  bg_space_org.x = 0;
  bg_space_org.y = 0;

  bg_space = new PIXI.Sprite(res.bg_space.texture);
  app4.stage.addChild(bg_space);
  bg_space.x = 360;
  bg_space.y = 0;
  zoomBlurFilter = new PIXI.filters.ZoomBlurFilter();
  zoomBlurFilter.center = [180, 180];
  zoomBlurFilter.strength = 0.2;
  zoomBlurFilter.innerRadius = 20;
  zoomBlurFilter.radius = -1;
  bg_space.filters = [zoomBlurFilter];

  // Text ZoomBlurFilter
  let text4 = new PIXI.Text("ZoomBlurFilter", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
    dropShadow: true,
    dropShadowColor: "#000000",
    trim: true
  });
  app4.stage.addChild(text4);
  text4.x = 265;
  text4.y = 30;

  // DotFilter
  bg_wood_org = new PIXI.Sprite(res.bg_wood.texture);
  app5.stage.addChild(bg_wood_org);
  bg_wood_org.x = 0;
  bg_wood_org.y = 0;

  bg_wood = new PIXI.Sprite(res.bg_wood.texture);
  app5.stage.addChild(bg_wood);
  bg_wood.x = 360;
  bg_wood.y = 0;

  dotFilter = new PIXI.filters.DotFilter();
  dotFilter.scale = 2;
  dotFilter.angle = 10;
  bg_wood.filters = [dotFilter];

  // Text DotFilter
  let text5 = new PIXI.Text("DotFilter", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
    dropShadow: true,
    dropShadowColor: "#000000",
    trim: true
  });
  app5.stage.addChild(text5);
  text5.x = 305;
  text5.y = 30;

  // ticker
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
    // enough time passed, update app
    update(elapsedTime);
    // reset
    elapsedTime = 0;
  }
}

/**
 * rendering
 * @param { number } delta time
 */
function update(delta) {
  // console.log("update()");

  stats.begin();

  stats.end();

  // render the canvas
  app.render();
}