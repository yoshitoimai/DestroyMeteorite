/**
 * common.js
 */
enchant();

var core;

// ゲーム画面の幅と高さ
var DISPLAY_WIDTH  = 320;
var DISPLAY_HEIGHT = 480;
var FPS = 16;
var RECTANGLE_SIZE = 16;
// イメージ格納ディレクトリ
var IMAGE_PATH = "../images/";
var LIB_IMAGE_PATH = "../../lib/images/";

window.onload = function () {

	core = new Core(DISPLAY_WIDTH, DISPLAY_HEIGHT);
	core.fps = FPS;
	
	//画像を読み込みます
	preroadImage(core);

	// 画像の読み込みが完了した時に呼ばれます
	core.onload = function(){
		gameStart();
	};

	// ゲームを開始します
	core.start();

};
