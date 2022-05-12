const canvas = document.getElementById('myCanvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

playerhtbx = c
playerattkhtbx = c
enemyhtbx = c
enemyattkhtbx = c

const gravity = 1;

DEBUG = false

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
    imageSrc: './images/player/Idleright.png',
    framesMax: 10,
    scale: 2.5,
    offset: {
        x: 120,
        y: 55
    },
    direction: 'right',
    hitboxOffset: {
        x: 80,
        y: 50
    },
    hitboxSize: {
        x: 80,
        y: 150
    },
    sprites: {
        idleleft: {
            imageSrc: './images/player/Idleleft.png',
            framesMax: 10,
            framesHold: 5,
        },
        idleright: {
            imageSrc: './images/player/Idleright.png',
            framesMax: 10,
            framesHold: 5,
        },
        runleft: {
            imageSrc: './images/player/Runleft.png',
            framesMax: 8,
            framesHold: 6,
        },
        runright: {
            imageSrc: './images/player/Runright.png',
            framesMax: 8,
            framesHold: 6,
        },
        jumpleft: {
            imageSrc: './images/player/Jumpleft.png',
            framesMax: 3,
            framesHold: 5,
        },
        jumpright: {
            imageSrc: './images/player/Jumpright.png',
            framesMax: 3,
            framesHold: 5,
        },
        fallleft: {
            imageSrc: './images/player/Fallleft.png',
            framesMax: 3,
            framesHold: 5,
        },
        fallright: {
            imageSrc: './images/player/Fallright.png',
            framesMax: 3,
            framesHold: 5,
        },
        attackleft: {
            imageSrc: './images/player/Attackleft.png',
            framesMax: 7,
            framesHold: 5,
        },
        attackright: {
            imageSrc: './images/player/Attackright.png',
            framesMax: 7,
            framesHold: 5,
        },
        hitleft: {
            imageSrc: './images/player/Take Hitleft.png',
            framesMax: 3,
            framesHold: 8,
        },
        hitright: {
            imageSrc: './images/player/Take Hitright.png',
            framesMax: 3,
            framesHold: 8,
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
    imageSrc: './images/enemy/Idleright.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 160,
        y: 112
    },
    direction: 'left',
    hitboxOffset: {
        x: 80,
        y: 50
    },
    hitboxSize: {
        x: 80,
        y: 150
    },
    sprites: {
        idleleft: {
            imageSrc: './images/enemy/Idleleft.png',
            framesMax: 8,
            framesHold: 6,
        },
        idleright: {
            imageSrc: './images/enemy/Idleright.png',
            framesMax: 8,
            framesHold: 6,
        },
        runleft: {
            imageSrc: './images/enemy/Runleft.png',
            framesMax: 8,
            framesHold: 6,
        },
        runright: {
            imageSrc: './images/enemy/Runright.png',
            framesMax: 8,
            framesHold: 6,
        },
        jumpleft: {
            imageSrc: './images/enemy/Jumpleft.png',
            framesMax: 2,
            framesHold: 5,
        },
        jumpright: {
            imageSrc: './images/enemy/Jumpright.png',
            framesMax: 2,
            framesHold: 5,
        },
        fallleft: {
            imageSrc: './images/enemy/Fallleft.png',
            framesMax: 2,
            framesHold: 5,
        },
        fallright: {
            imageSrc: './images/enemy/Fallright.png',
            framesMax: 2,
            framesHold: 5,
        },
        attackleft: {
            imageSrc: './images/enemy/Attackleft.png',
            framesMax: 4,
            framesHold: 8,
        },
        attackright: {
            imageSrc: './images/enemy/Attackright.png',
            framesMax: 4,
            framesHold: 8,
        },
        hitleft: {
            imageSrc: './images/enemy/Take Hitleft.png',
            framesMax: 4,
            framesHold: 8,
        },
        hitright: {
            imageSrc: './images/enemy/Take Hitright.png',
            framesMax: 4,
            framesHold: 8,
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

    if (DEBUG) {
        playerhtbx.beginPath();
        playerhtbx.strokeStyle = "green";
        playerhtbx.rect(player.position.x, player.position.y, player.width, player.height);
        playerhtbx.stroke();

        playerattkhtbx.beginPath();
        playerattkhtbx.strokeStyle = "blue";
        playerattkhtbx.rect(player.attackBox.position.x, player.attackBox.position.y, player.attackBox.width, player.attackBox.height);
        playerattkhtbx.stroke();

        enemyhtbx.beginPath();
        enemyhtbx.strokeStyle = "red";
        enemyhtbx.rect(enemy.position.x, enemy.position.y, enemy.width, enemy.height);
        enemyhtbx.stroke();

        enemyattkhtbx.beginPath();
        enemyattkhtbx.strokeStyle = "yellow";
        enemyattkhtbx.rect(enemy.attackBox.position.x, enemy.attackBox.position.y, enemy.attackBox.width, enemy.attackBox.height);
        enemyattkhtbx.stroke();
    }

    // Player
    player.velocity.x = 0

    if (!player.isAttacking && player.movement) {
        if(keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x = -5
            if (player.direction != 'left'){
                player.direction = 'left'
            }
            player.changeSprite('run')
        }else if(keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x = 5
            if (player.direction != 'right'){
                player.direction = 'right'
            }
            player.changeSprite('run')
        }else {
            player.changeSprite('idle')
        }
        
        // Player Jumping
        if (player.velocity.y < 0) {
            player.changeSprite('jump')
        }else if (player.velocity.y > 0) {
            player.changeSprite('fall')
        }
    
    }
    
    // Enemy
    enemy.velocity.x = 0

    if (!enemy.isAttacking && enemy.movement) {
        if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x = 5
                if (enemy.direction != 'right'){
                enemy.direction = 'right'
            }
            enemy.changeSprite('run')
        }else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x = -5
            if (enemy.direction != 'left'){
                enemy.direction = 'left'
            }
            enemy.changeSprite('run')
        } else {
            enemy.changeSprite('idle')
        }
    
        // enemy Jumping
        if (enemy.velocity.y < 0) {
            enemy.changeSprite('jump')
        }else if (enemy.velocity.y > 0) {
            enemy.changeSprite('fall')
        }
    }
    

    // Hit Detection
    if (collision({
        r1: player,
        r2: enemy
        }) && player.isAttacking && player.canAttack){
        player.movement = false
        player.canAttack = false 
        enemy.movement = false
        enemy.canAttack = false
        setTimeout(() => {
            player.movement = true
        }, 500)
        setTimeout(() => {
            enemy.movement = true
        }, 350)
        setTimeout(() => {
            player.canAttack = true
        }, 750)
        setTimeout(() => {
            enemy.canAttack = true
        }, 750)
        player.isAttacking = false
        enemy.health -= 10
        enemy.changeSprite('hit')
        document.querySelector('#enemyHealth').style.width = enemy.health + "%"
        console.log('enemy hit')
    }

    if (collision({
        r1: enemy,
        r2: player
        }) && enemy.isAttacking && enemy.canAttack){
        enemy.movement = false
        enemy.canAttack = false
        player.movement = false
        player.canAttack = false 
        setTimeout(() => {
            enemy.movement = true
        }, 500)
        setTimeout(() => {
            player.movement = true
        }, 350)
        setTimeout(() => {
            enemy.canAttack = true
        }, 750)
        setTimeout(() => {
            player.canAttack = true
        }, 750)
        enemy.isAttacking = false
        player.health -= 10
        player.changeSprite('hit')
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

        // Debug
        case 'e':
            DEBUG = true
            break
        case 'r':
            DEBUG = false
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