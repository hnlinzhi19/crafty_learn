const GAME_METHOD = 'Canvas'; // 游戏模式
// const GAME_METHOD = 'DOM'; // 游戏模式
const WINDOW_WINDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_SCALE = window.innerWidth / 750;

// 鱼摆动的动画切换
const spriteLeft = (fish, type) => {
    let spriteArray = [
        [0, 0],
        [0, 1]
    ];
    let spriteName = 'moveLeft';
    if (type == 'right') {
        spriteArray = [
            [0, 2],
            [0, 3]
        ];
        spriteName = 'moveRight';
    }
    fish.reel(spriteName, 500, spriteArray);
    fish.animate(spriteName, -1);
};
// 初始化 一条鱼
const createFish = () => {
    let direct = Crafty.math.randomInt(0, 100) > 50 ? -71 : WINDOW_WINDTH + 71;

    let fish2 = Crafty.e(`2D,${GAME_METHOD}, ${direct > 0 ? 'fish2_right_start': 'fish2_start'}, SpriteAnimation, Tween`);

    fish2.attr({
        x: direct,
        y: Crafty.math.randomInt(460 * WINDOW_SCALE, window.innerHeight - 100)
    })
    if (direct > 0) {
        spriteLeft(fish2, 'right');
    } else {
        spriteLeft(fish2);
    }

    // 做个随机 时间出现
    setTimeout(function () {
        fish2.tween({
            x: Crafty.math.randomInt(4, 7) / 10 * window.innerWidth
        }, 5000 * Crafty.math.randomInt(6, 10) / 10, function (t) {
            if (t == 1) {
                fish2.animationSpeed = 0.5;
                setTimeout(function () {
                    rushFish(fish2);
                }, 1000);
            }
            return t * t;
        });
        // fish2.animationSpeed = 2;
    }, Crafty.math.randomInt(100, 4000));
}
// 鱼逃出视图
const rushFish = (fish) => {
    // console.log(fish.getReel());
    const reelId = fish.getReel().id;
    let direct = Crafty.math.randomInt(0, 100);
    let resultTarget = [WINDOW_WINDTH + 71, -71];
    let targetObj = {};
    if (direct > 50) { // 需要转身
        targetObj = {
            moveLeft: resultTarget[1],
            moveRight: resultTarget[0]
        };
        let spriteArray = [
            [0, 4],
            [0, 5],
            [0, 7],
            [0, 6],
            [0, 0]
        ];
        if (reelId === 'moveLeft') {
            spriteArray = [
                [0, 6],
                [0, 7],
                [0, 5],
                [0, 4],
                [0, 3]
            ];
        }
        fish.pauseAnimation();
        fish.reel('turnMove', 200, spriteArray);
        fish.animate('turnMove', 1);
        setTimeout(function () {
            spriteLeft(fish, reelId == 'moveLeft' ? 'right' : '');
            fish.animationSpeed = 3;
            fish.tween({
                x: targetObj[reelId]
            }, 1000, function (t) {
                if (t == 1) {
                    fish.remove();
                    createFish();
                }
                return t;
            });
        }, 200);


    } else { // 不需要转身
        targetObj = {
            moveLeft: resultTarget[0],
            moveRight: resultTarget[1]
        }
        fish.animate(reelId, -1);
        fish.animationSpeed = 3;
        fish.tween({
            x: targetObj[reelId]
        }, 1000, function (t) {
            if (t == 1) {
                fish.remove();
                createFish();
            }

            return t;
        });
    }
}


const init = () => {
    console.log(1);
    for (let i = 0; i < 25; i++) {
        createFish();
    }
}

Crafty.init(); // 初始化 一个 div 

Crafty.scene('init', init); // 注册一个场景

const assets = {
    // 图片资源
    images: ['./img/bg.png'],
    // 精灵
    sprites: {
        './img/yu-2.png': {
            tile: 71, // 单个精灵图片的 宽度
            tileh: 42, // 单个精灵的 高度
            map: {
                fish2_start: [0, 0],
                fish2_end: [0, 1],
                fish2_right_start: [0, 2],
                fish2_right_end: [0, 3],
            }
        }
    }
    // 音频
}
// 加装资源
Crafty.load(assets, () => {
    Crafty.background('#43d8dc url(./img/bg.png) no-repeat center center');
    document.querySelector('#cr-stage').style.backgroundSize = '100%';
    Crafty.scene('init');
});