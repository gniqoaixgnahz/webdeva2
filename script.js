//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const homePagebtn = document.querySelector("#homePagebtn");
const allpages = document.querySelectorAll(".page");

const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");

const upBtn = document.getElementById('upBtn');
const leftBtn = document.getElementById('leftBtn');
const downBtn = document.getElementById('downBtn');
const rightBtn = document.getElementById('rightBtn');


function hideall() { //function to hide all pages
	for (let onepage of allpages) { //go through all subtopic pages
		onepage.style.display = "none"; //hide it
	}
}

function show(pgno) { //function to show selected page no
	hideall();
	//select the page based on the parameter passed in
	let onepage = document.querySelector("#page" + pgno);
	//show the page
	onepage.style.display = "block";
	window.scrollTo(0, 0);
}

show(4);

page1btn.addEventListener("click", function() {
	show(1);
	removeMenu();
});
page2btn.addEventListener("click", function() {
	show(2);
	removeMenu();
	initGame();
});
page3btn.addEventListener("click", function() {
	show(4);
	removeMenu();
});
homePagebtn.addEventListener("click", function() {
	show(4);
	removeMenu();
});

//JS for hamMenu
hamBtn.addEventListener("click", toggleMenus);

function toggleMenus() {
	menuItemsList.classList.toggle("menuHide");
}

function removeMenu() {
	menuItemsList.classList.remove("menuHide");
}


//监听滚动事件
document.addEventListener('scroll', function() {
	const species = document.querySelectorAll('.shark-species');

	species.forEach(function(inView) {
		const divSize = inView.getBoundingClientRect();
		if (divSize.top >= -200 && divSize.bottom <= window.innerHeight + 200) {
			inView.classList.add('in-view');
		} else {
			inView.classList.remove('in-view');
		}
	});
});


//////////////////////
/////////game/////////
//////////////////////
function initGame() {
	const gameArea = document.getElementById('gameArea');
	const playerElement = document.getElementById('player');
	const fishElement = document.getElementById('fish');



	// 获取实际尺寸
	const playerWidth = playerElement.clientWidth;
	const playerHeight = playerElement.clientHeight;
	const fishWidth = fishElement.clientWidth;
	const fishHeight = fishElement.clientHeight;

	// 初始化玩家和小鱼
	const player = {
		x: gameArea.clientWidth / 2 - playerWidth / 2,
		y: gameArea.clientHeight / 2 - playerHeight / 2,
		width: playerWidth,
		height: playerHeight,
		speed: 5,
		direction: 'right',
		dx: 0, // 移动方向的 x 分量
		dy: 0 // 移动方向的 y 分量
	};

	const fish = {
		x: Math.random() * (gameArea.clientWidth - fishWidth),
		y: Math.random() * (gameArea.clientHeight - fishHeight),
		width: fishWidth,
		height: fishHeight
	};

	function updateElementPosition(element, entity) {
		element.style.left = entity.x + 'px';
		element.style.top = entity.y + 'px';
	}

	function checkCollision() {
		if (
			player.x < fish.x + fish.width &&
			player.x + player.width > fish.x &&
			player.y < fish.y + fish.height &&
			player.y + player.height > fish.y
		) {
			// 重置小鱼位置
			fish.x = Math.random() * (gameArea.clientWidth - fish.width);
			fish.y = Math.random() * (gameArea.clientHeight - fish.height);
			updateElementPosition(fishElement, fish);
		}
	}

	function movePlayer() {
		player.x += player.dx;
		player.y += player.dy;

		// 防止玩家移动出游戏区域
		player.x = Math.max(0, Math.min(gameArea.clientWidth - player.width, player.x));
		player.y = Math.max(0, Math.min(gameArea.clientHeight - player.height, player.y));

		// 根据方向翻转玩家图片
		if (player.dx < 0) {
			player.direction = 'left';
		} else if (player.dx > 0) {
			player.direction = 'right';
		}

		if (player.direction === 'left') {
			playerElement.style.transform = 'scaleX(-1)';
		} else {
			playerElement.style.transform = 'scaleX(1)';
		}

		updateElementPosition(playerElement, player);
		checkCollision();

		requestAnimationFrame(movePlayer); // 循环调用 movePlayer，实现平滑动画
	}

	// 监听键盘事件
	function handleKeyDown(e) {
		switch (e.key) {
			case 'a':
				player.dx = -player.speed;
				break;
			case 'd':
				player.dx = player.speed;
				break;
			case 'w':
				player.dy = -player.speed;
				break;
			case 's':
				player.dy = player.speed;
				break;
		}
	}

	function handleKeyUp(e) {
		switch (e.key) {
			case 'a':
			case 'd':
				player.dx = 0;
				break;
			case 'w':
			case 's':
				player.dy = 0;
				break;
		}
	}

	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);

	// 初始化玩家和小鱼位置
	updateElementPosition(playerElement, player);
	updateElementPosition(fishElement, fish);

	// 开始游戏循环
	requestAnimationFrame(movePlayer);


	upBtn.addEventListener('mousedown', () => player.dy = -player.speed);
	upBtn.addEventListener('mouseup', () => player.dy = 0);
	leftBtn.addEventListener('mousedown', () => player.dx = -player.speed);
	leftBtn.addEventListener('mouseup', () => player.dx = 0);
	downBtn.addEventListener('mousedown', () => player.dy = player.speed);
	downBtn.addEventListener('mouseup', () => player.dy = 0);
	rightBtn.addEventListener('mousedown', () => player.dx = player.speed);
	rightBtn.addEventListener('mouseup', () => player.dx = 0);

	// touch screen
	upBtn.addEventListener('touchstart', () => player.dy = -player.speed);
	upBtn.addEventListener('touchend', () => player.dy = 0);
	leftBtn.addEventListener('touchstart', () => player.dx = -player.speed);
	leftBtn.addEventListener('touchend', () => player.dx = 0);
	downBtn.addEventListener('touchstart', () => player.dy = player.speed);
	downBtn.addEventListener('touchend', () => player.dy = 0);
	rightBtn.addEventListener('touchstart', () => player.dx = player.speed);
	rightBtn.addEventListener('touchend', () => player.dx = 0);
}
////////////////