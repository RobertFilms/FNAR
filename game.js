const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fill the window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//Classes
class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

// Initialize player
const player = new Player(50, 50, 50, 50, 'blue');

// Game loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    requestAnimationFrame(update);
}

update();