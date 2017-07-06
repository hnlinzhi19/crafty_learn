var vH = Crafty.viewport.height;
var vW = Crafty.viewport.width;
var pipeSpeed = 2;
function createG () {
    Crafty.e('Solid, 2D,Canvas, Image')
        .attr({
            x: Crafty.viewport.width,
            y: 0,
            w: 62,
            h: 300
        }).image('/img/up_mod.png', 'repeat')
        .bind('EnterFrame', function () {
            this.x -= pipeSpeed;
        })
    
    Crafty.e('Solid, 2D, Canvas, Image')
        .attr({
            x:Crafty.viewport.width,
            y: 300,
            w: 62,
            h: 60
        }).image('/img/up_pipe.png').bind('EnterFrame', function () {
            this.x -= pipeSpeed;
        });
    
}

function game() {
    console.log('start');
    Crafty.background('none');
    var startTime = +new Date();
    var timer = null;

    var bg = Crafty.e('2D, Canvas, Image')
        .attr({
            x: 0,
            y: 0,
            w: 2 * Crafty.viewport.width,
            h: Crafty.viewport.height
        }).image('/img/bg.jpg', 'repeat')
        .bind('EnterFrame', function () {
            if (bg.x <= -Crafty.viewport.width) {
                bg.x = 0;
                return;
            }
            bg.x -= pipeSpeed;
        })
    var floorBg = Crafty.e('floor,2D, DOM').attr({
        x: 0,
        y: 2000,
        w: 500,
        h: 10
    });
    var bird = Crafty.e('2D, Canvas, birdStart, SpriteAnimation,Keyboard, Gravity,Jumper, Collision')
        .attr({
            x: 20,
            y: 200,
            w: 40,
            h: 30
        }).reel('downing', 500, [
            [0, 2],
            [0, 3]
        ])
        .checkHits('Solid')
        .animate('downing', -1)
        .origin('center')
        .gravity('floor')
        .jumpSpeed(100)
        .bind('EnterFrame', function () {
            var diffTime = (+new Date()) - startTime;
            if (this.isDown('SPACE') && diffTime > 200 && pipeSpeed) {
                floorBg.y = bird.y + 30;
                startTime = +new Date();
            }
        if (this.y > Crafty.viewport.height){
            console.log('game over');
             Crafty.scene('over');
        }
        }).bind("LandedOnGround", function (ground) {
            this.jump()
            if (this.getReel().id != 'uping') {
                this.pauseAnimation().reel('uping', 300, [
                    [0, 4],
                    [0, 5]
                ]).animate('uping', -1);
            }
        }).bind("CheckJumping", function (ground) {
            if (ground) {
                floorBg.y = 2000;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    if (bird.getReel().id != 'downing') {
                        bird.pauseAnimation().reel('downing', 500, [
                            [0, 2],
                            [0, 3]
                        ]).animate('downing', -1);
                    }
                }, 300);
            }
        }).bind("HitOn", function(hitData) {
            if (hitData) {
                // console.log(hitData);
                pipeSpeed = 0;
                this.gravityConst('3000');
                if (bird.getReel().id != 'downing') {
                    bird.pauseAnimation().reel('downing', 500, [
                        [0, 2],
                        [0, 3]
                    ]).animate('downing', -1);
                }
                // Crafty.stop();
            }
        })
    createG();

}