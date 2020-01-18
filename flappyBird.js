var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

// some var

var bx = 50, by = 160, bv = 16;
var fgh = 130, fgx = 0, fgy = cvs.height - fgh, fgw = cvs.width;
var pw = 55, ph = 325;

var gap = 75;
var constant = ph + gap; 

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
    y : -95
};

// draw background

function draw() {
    
    cvs.width = cvs.width;
    
    ctx.beginPath();
    ctx.arc(bx, by, bv, 0, 2 * Math.PI);
    ctx.stroke();
    for (i = 0; i < pipe.length; i++) {
        
        ctx.fillStyle = 'gray'
        ctx.fillRect(pipe[i].x, pipe[i].y, pw, ph)
        ctx.fillStyle = 'gray'
        ctx.fillRect(pipe[i].x, pipe[i].y + constant, pw, ph)
        pipe[i].x--;
        
        if(pipe[i].x == 110){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*ph) - ph           
            });
        }
        if (bx + bv >= pipe[i].x && bx <= pipe[i].x + pw
			&& (by <= pipe[i].y + ph || by + bv >= pipe[i].y + constant)
			|| by + bv >= canvas.height - fgh) {
			location.reload();
		}
        if(pipe[i].x == 5){
            score++;
        }
    }
    
    ctx.fillStyle = 'blue'
    ctx.fillRect(fgx, fgy, fgw, fgh);
    
    by += gravity;
    
    ctx.fillStyle = 'red';
    ctx.font = '20px verdana';
    ctx.fillText('Score = '+score, 10, cvs.height - 20)
    
    requestAnimationFrame(draw)
}
draw()