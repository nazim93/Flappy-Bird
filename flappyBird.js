var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

// some var

var bd = new Image();
var bg = new Image();
var fg = new Image();
var pN = new Image();
var pS = new Image();

bd.src = "images/bird.png";         
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pN.src = "images/pipeNorth.png";
pS.src = "images/pipeSouth.png";

var bx = 50, by = 160;
// var fgh = 130, fgx = 0, fgy = cvs.height - fgh, fgw = cvs.width;

var gap = 95;
var constant; 

var gravity = 2.5;

var score = 0;

// move up

document.addEventListener('keydown', moveUp);

function moveUp() {
    by -= 35;
}

// move pipe

var pipe = [];

pipe[0] = {
    
    x : cvs.width,
    y : 0
};

// draw background

function draw() {

    ctx.drawImage(bg, 0, 0);
    

    ctx.drawImage(bd, bx, by);

    ctx.drawImage(fg,0,cvs.height - fg.height);

    for (var i = 0; i < pipe.length; i++) {
        constant = pN.height + gap;
        ctx.drawImage(pN, pipe[i].x, pipe[i].y);

        ctx.drawImage(pS, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;
        
        if(pipe[i].x == 110){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pN.height) - pN.height           
            });
        }
        if (bx + bd.width >= pipe[i].x && bx <= pipe[i].x + pN.width
			&& (by <= pipe[i].y + pN.height || by + bd.width >= pipe[i].y + constant)
			|| by + bd.width >= canvas.height - fg.height) {
			location.reload();
		}
        if(pipe[i].x == 5){
            score++;
        }
    }
        
    by += gravity;
    
    ctx.fillStyle = 'red';
    ctx.font = '20px verdana';
    ctx.fillText('Score = '+score, 10, cvs.height - 20)
    
    requestAnimationFrame(draw)
}
draw()