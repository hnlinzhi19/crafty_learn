function game() {
    console.log('start');
    Crafty.background('none');
    var x = 0;
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
            bg.x -= 2;
        })
    var floorBg = Crafty.e('floor,2D, DOM, Color').attr({
        x: 0,
        y: 400,
        w: 500,
        h: 10
    }).color('#F00');
    var birdSpeed = 2;
    var nowY = 0;
    var bird = Crafty.e('2D, Canvas, birdStart, SpriteAnimation,Keyboard, Gravity')
        .attr({
            x: 20,
            y: 200,
            w: 40,
            h: 30
        }).reel('playing', 500, [
            [0, 0],
            [0, 1]
        ])
        .animate('playing', -1)
        .origin('center')
        .gravity('floor')
        .bind('EnterFrame', function () {
            // if (bird.getReel().id != 'dowing' && birdSpeed > 0) {
            //     bird.pauseAnimation().reel('dowing', 500, [
            //         [0, 2],
            //         [0, 3]
            //     ]).animate('dowing', -1);
            // }
            // if (bird.getReel().id != 'uping' && birdSpeed < 0) {
            //     bird.pauseAnimation().reel('uping', 500, [
            //         [0, 4],
            //         [0, 5]
            //     ]).animate('uping', -1);
            // }
            if (this.isDown('SPACE')){
                floorBg.y = bird.y + 30;
            }
            // bird.y += birdSpeed;
        }).bind("CheckLanding", function(ground) {
            
        });
    
        // console.log(ground);
        // if (bird.getReel().id != 'uping') {
        //     bird.pauseAnimation().reel('uping', 500, [
        //         [0, 4],
        //         [0, 5]
        //     ]).animate('uping', -1);
        // }

}