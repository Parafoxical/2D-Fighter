const canvas = document.getElementById('myCanvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 1;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './images/background/background.png'
})

const player = new Fighter({
    position:{
        x: 300,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset:{
        x: 0,
        y: 0
    },
    imageSrc: './images/player/Idle.png',
    framesMax: 10,
    scale: 2.5,
    offset: {
        x: 46,
        y: 53
    },
    sprites: {
        idle: {
            imageSrc: './images/player/Idle.png',
            framesMax: 10,
        },
        run: {
            imageSrc: './images/player/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './images/player/Jump.png',
            framesMax: 10,
        },
        attack: {
            imageSrc: './images/player/Attack1.png',
            framesMax: 10,
        },
    }
});

const enemy = new Fighter({
    position:{
        x: 674,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset:{
        x: -50,
        y: 0
    },
    imageSrc: './images/enemy/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 76,
        y: 112
    },
    sprites: {
        idle: {
            imageSrc: './images/enemy/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './images/enemy/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './images/enemy/Jump.png',
            framesMax: 8,
        },
        attack: {
            imageSrc: './images/enemy/Attack1.png',
            framesMax: 8,
        },
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function collision({ r1, r2 }) {
    return (
        r1.attackBox.position.x + r1.attackBox.width >= r2.position.x
        && r1.attackBox.position.x <= r2.position.x + r2.width
        && r1.attackBox.position.y + r1.attackBox.height >= r2.position.y
        && r1.attackBox.position.y <= r2.position.y + r2.height
    )
}

function determineWinner({player,enemy,timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie!'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins!'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins!'
    }
}

let timer = 30
let timerId
function decreaseTimer(){
    if(timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {
        determineWinner({player,enemy,timerId})
    }

}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width,canvas.height)
    background.update()
    player.update()
    enemy.update()

    // Player
    player.velocity.x = 0
    player.changeSprite('idle')
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.changeSprite('run')
    }else if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.changeSprite('run')
    }

    // Enemy
    enemy.velocity.x = 0
    enemy.changeSprite('idle')    
    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.changeSprite('run')
    }else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.changeSprite('run')
    }

    // Hit Detection
    if (collision({
        r1: player,
        r2: enemy
        }) && player.isAttacking){
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + "%"
        console.log('enemy hit')
    }

    if (collision({
        r1: enemy,
        r2: player
        }) && enemy.isAttacking){ 
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#playerHealth').style.width = player.health + "%"
        console.log('player hit')
    }

    // end game with hp
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player,enemy,timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        // Player
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break

        // Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        case 'Enter':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        // Player
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        // Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})