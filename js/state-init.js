function init() {
    const CANVAS_IMAGE = '2D, DOM, Image';
    console.log('init');
    Crafty.background('url(./img/bg.jpg) ');
    Crafty.e('2D, Canvas, birdStart, SpriteAnimation')
        .attr({
            x: Crafty.viewport.width / 2 - 20,
            y: 200,
            w: 40,
            h: 30
        }).reel('playing', 1000, [
            [0, 0],
            [0, 1]
        ]).animate('playing', -1).origin('center');

    var butn = Crafty.e('2D, Canvas, butnStart, Mouse')
        .attr({
            x: Crafty.viewport.width / 2 - 42,
            y: 300,
            w: 85,
            h: 28
        }).bind('Click', function (MouseEvent) {
            Crafty.scene('game');
        });
};