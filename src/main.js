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

let app6 = new PIXI.Application({
  width: 720,
  height: 384
});
let canvas6 = document.getElementById("canvas6");
canvas6.appendChild(app6.view);
app6.renderer.backgroundColor = 0x000000;
app6.stage.interactive = true;

let app7 = new PIXI.Application({
  width: 720,
  height: 384
});
let canvas7 = document.getElementById("canvas7");
canvas7.appendChild(app7.view);
app7.renderer.backgroundColor = 0x000000;
app7.stage.interactive = true;

let app8 = new PIXI.Application({
  width: 720,
  height: 384
});
let canvas8 = document.getElementById("canvas8");
canvas8.appendChild(app8.view);
app8.renderer.backgroundColor = 0x000000;
app8.stage.interactive = true;

let app9 = new PIXI.Application({
  width: 720,
  height: 384
});
let canvas9 = document.getElementById("canvas9");
canvas9.appendChild(app9.view);
app9.renderer.backgroundColor = 0x000000;
app9.stage.interactive = true;

let app10 = new PIXI.Application({
  width: 720,
  height: 384
});
let canvas10 = document.getElementById("canvas10");
canvas10.appendChild(app10.view);
app10.renderer.backgroundColor = 0x000000;
app10.stage.interactive = true;

let bg;
let bg_fish, bg_fish_org;
let bg_leaf, bg_leaf_org;
let bg_space, bg_space_org;
let bg_wood, bg_wood_org;
let bg_earth, bg_earth_org;
let bg_wall, bg_wall_org;
let bg_moon, bg_moon_org;
let bg_skelton, bg_skelton_org;
let bg_skelton2, bg_skelton_org2;
// let bg_cloud, bg_cloud_org;

let shockwaveFilter;
let blurFilter;
let pixelateFilter;
let zoomBlurFilter;
let dotFilter;
let asciiFilter;
let embossFilter;
let noiseFilter;
let rgbSplitFilter;
let crossHatchFilter;

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
const ASSET_EARTH = "images/pic_bg_earth.jpg";
const ASSET_WALL = "images/pic_bg_wall.jpg";
const ASSET_MOON = "images/pic_bg_moon.jpg";
const ASSET_SKELTON = "images/pic_bg_skelton.jpg";
// const ASSET_CLOUD = "images/pic_bg_cloud.jpg";

PIXI.loader
  .add("bg_data", ASSET_BG)
  .add("bg_fish", ASSET_FISH)
  .add("bg_leaf", ASSET_LEAF)
  .add("bg_space", ASSET_SPACE)
  .add("bg_wood", ASSET_WOOD)
  .add("bg_earth", ASSET_EARTH)
  .add("bg_wall", ASSET_WALL)
  .add("bg_moon", ASSET_MOON)
  .add("bg_skelton", ASSET_SKELTON)
  // .add("bg_cloud", ASSET_CLOUD)
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

  // Filters //

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

  // AsciiFilter
  bg_earth_org = new PIXI.Sprite(res.bg_earth.texture);
  app6.stage.addChild(bg_earth_org);
  bg_earth_org.x = 0;
  bg_earth_org.y = 0;

  bg_earth = new PIXI.Sprite(res.bg_earth.texture);
  app6.stage.addChild(bg_earth);
  bg_earth.x = 360;
  bg_earth.y = 0;

  asciiFilter = new PIXI.filters.AsciiFilter();
  asciiFilter.size = 10;
  bg_earth.filters = [asciiFilter];

  // Text AsciiFilter
  let text6 = new PIXI.Text("AsciiFilter", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
    dropShadow: true,
    dropShadowColor: "#000000",
    trim: true
  });
  app6.stage.addChild(text6);
  text6.x = 300;
  text6.y = 30;

  // EmbossFilter
  bg_wall_org = new PIXI.Sprite(res.bg_wall.texture);
  app7.stage.addChild(bg_wall_org);
  bg_wall_org.x = 0;
  bg_wall_org.y = 0;

  bg_wall = new PIXI.Sprite(res.bg_wall.texture);
  app7.stage.addChild(bg_wall);
  bg_wall.x = 360;
  bg_wall.y = 0;

  embossFilter = new PIXI.filters.EmbossFilter();
  embossFilter.size = 10;
  bg_wall.filters = [embossFilter];

  // Text EmbossFilter
  let text7 = new PIXI.Text("EmbossFilter", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
    dropShadow: true,
    dropShadowColor: "#000000",
    trim: true
  });
  app7.stage.addChild(text7);
  text7.x = 270;
  text7.y = 30;

  // NoiseFilter
  bg_moon_org = new PIXI.Sprite(res.bg_moon.texture);
  app8.stage.addChild(bg_moon_org);
  bg_moon_org.x = 0;
  bg_moon_org.y = 0;

  bg_moon = new PIXI.Sprite(res.bg_moon.texture);
  app8.stage.addChild(bg_moon);
  bg_moon.x = 360;
  bg_moon.y = 0;

  noiseFilter = new PIXI.filters.NoiseFilter();
  bg_moon.filters = [noiseFilter];

  // Text NoiseFilter
  let text8 = new PIXI.Text("NoiseFilter", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
    dropShadow: true,
    dropShadowColor: "#000000",
    trim: true
  });
  app8.stage.addChild(text8);
  text8.x = 280;
  text8.y = 30;

  // RGBSplitFilter
  bg_skelton_org = new PIXI.Sprite(res.bg_skelton.texture);
  app9.stage.addChild(bg_skelton_org);
  bg_skelton_org.x = 0;
  bg_skelton_org.y = 0;

  bg_skelton = new PIXI.Sprite(res.bg_skelton.texture);
  app9.stage.addChild(bg_skelton);
  bg_skelton.x = 360;
  bg_skelton.y = 0;

  rgbSplitFilter = new PIXI.filters.RGBSplitFilter();
  bg_skelton.filters = [rgbSplitFilter];

  // Text RGBSplitFilter
  let text9 = new PIXI.Text("RGBSplitFilter", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
    dropShadow: true,
    dropShadowColor: "#000000",
    trim: true
  });
  app9.stage.addChild(text9);
  text9.x = 260;
  text9.y = 30;

  // CrossHatchFilter
  bg_skelton_org2 = new PIXI.Sprite(res.bg_skelton.texture);
  app10.stage.addChild(bg_skelton_org2);
  bg_skelton_org2.x = 0;
  bg_skelton_org2.y = 0;

  bg_skelton2 = new PIXI.Sprite(res.bg_skelton.texture);
  app10.stage.addChild(bg_skelton2);
  bg_skelton2.x = 360;
  bg_skelton2.y = 0;

  crossHatchFilter = new PIXI.filters.CrossHatchFilter();
  bg_skelton2.filters = [crossHatchFilter];

  // Text CrossHatchFilter
  let text10 = new PIXI.Text("CrossHatchFilter", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
    dropShadow: true,
    dropShadowColor: "#000000",
    trim: true
  });
  app10.stage.addChild(text10);
  text10.x = 240;
  text10.y = 30;

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
