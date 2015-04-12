/**
 * 敵を避けろ！
 * 上から落ちてくる障害物を左右にかわすゲーム
 */
function preroadImage() {
	core.preload(
		// 隕石
		'asteroid_0.png',
		// キャラクター
		'shooting_player.png',
		// 弾
		'shoot.png',
		// ボタン
		'pad.png',
		'apad.png',
		'font0.png',
		// ゲームオーバー
		'gameover.png'
	);
};
function gameStart() {
	// 背景色を変更します
	core.rootScene.backgroundColor = "DarkBlue";
	
	// プレイヤーを格納するグループ
	var playerGroup = new Group();
	// 敵を格納するグループ
	var enemyGroup = new Group();
	// 弾を格納するグループ
	var shootGroup = new Group();
	// グループをシーンに追加
	core.rootScene.addChild(playerGroup);
	core.rootScene.addChild(enemyGroup);
	core.rootScene.addChild(shootGroup);

	// 一定時間毎に敵を生成
	core.addEventListener('enterframe', function(){
		if (this.frame % 20 == 0) {
			// 敵を生成
			// 第一引数：画像パス
			var enemy = new Action('asteroid_0.png', 32, 32);
			// 敵をグループに追加（纏めてプレイヤーに追加するため敵をグループに纏めておく）
			// グループがシーンに追加されているのでシーンに追加したことにもなる
			enemyGroup.addChild(enemy);
			// 敵の配置場所を指定
			enemy.x = 100 + Math.random() * (DISPLAY_WIDTH - 200);
			console.log(enemy.x);
			enemy.y = 0;
			// 一番上から下に落下し地面に落ちたら自動的に消滅
			enemy.tl
				.moveBy(40, 80, 10)
				.moveBy(-40, 80, 10)
				.moveBy(40, 80, 10)
				.moveBy(-40, 80, 10)
				.moveBy(40, 80, 10)
				.moveBy(-40, 80, 10)
				.then(function() {
					this.remove();
			});
			// 弾が纏められたグループ（弾との衝突判定を行う）
			enemy.collision = shootGroup;
			// 敵が弾と衝突した時
			enemy.on('collision', function(e){
				e.collisionTarget.remove();
				this.remove();
			});
		}
	});

	// プレイヤーを生成
	// 第一引数：画像パス、第二引数：画像の幅、第三引数：画像の高さ
	var player = new ActionPlayer('shooting_player.png', 36, 42);
	// プレイヤーを画面に追加
	playerGroup.addChild(player);
	// プレイヤーの配置場所を指定
	player.x = DISPLAY_WIDTH / 2 - player.width / 2;
	player.y = DISPLAY_HEIGHT - 80;
	// プレイヤーのスピードを５倍にする
	player.speed = 5;
	// プレイヤーの敵が纏められたグループ（プレイヤーとの衝突判定を行う）
	player.collision = enemyGroup;
	// プレイヤーが画面から消えた場合
	player.on('enterframe', function(e) {
		if (player.x < 0 - player.width) {
			player.x = DISPLAY_WIDTH;
		} else if (player.x > DISPLAY_WIDTH) {
			player.x = 0 - player.width;
		}
	});
	// プレイヤーが敵と衝突した時
	player.on('collision', function(e){
		// ゲームオーバー
		var sprite = new Sprite(189, 97);
		sprite.image = core.assets['gameover.png'];
		sprite.x = DISPLAY_WIDTH / 2 - sprite.width / 2;
		sprite.y = DISPLAY_HEIGHT / 2 - sprite.height / 2;
		core.rootScene.addChild(sprite);
		core.stop();
	});

	 // コントローラーを追加します
	var buttonLeft = new Button('Left', 'dark', 30, DISPLAY_WIDTH / 3);
	buttonLeft.x = 0;
	buttonLeft.y = DISPLAY_HEIGHT - 30;
	core.rootScene.addChild(buttonLeft);
	var buttonShoot = new Button('Shoot', 'dark', 30, DISPLAY_WIDTH / 3);
	buttonShoot.x = DISPLAY_WIDTH * 1 / 3;
	buttonShoot.y = DISPLAY_HEIGHT - 30;
	core.rootScene.addChild(buttonShoot);
	var buttonRight = new Button('Right', 'dark', 30, DISPLAY_WIDTH / 3);
	buttonRight.x = DISPLAY_WIDTH * 2 / 3;
	buttonRight.y = DISPLAY_HEIGHT - 30;
	core.rootScene.addChild(buttonRight);
	
	// コントローラーにイベントを追加します
	buttonLeft.on("touchstart", function(e) {
		player.moveLeft();
	});
	buttonRight.on("touchstart", function(e) {
		player.moveRight();
	});
	buttonShoot.on("touchstart", function(e) {
		// 弾を生成
		// 第一引数：画像パス
		var shoot = new Action('shoot.png', 4, 4);
		// 敵をグループに追加（纏めてプレイヤーに追加するため敵をグループに纏めておく）
		// グループがシーンに追加されているのでシーンに追加したことにもなる
		shootGroup.addChild(shoot);
		// 弾の配置場所を指定
		shoot.x = player.x + player.width / 2;
		shoot.y = player.y;
		// 一番上に到達したら自動的に消滅
		shoot.tl.moveBy(0, DISPLAY_HEIGHT * (-1), 20).then(function() {
			this.remove();
		});
	});
	
};

