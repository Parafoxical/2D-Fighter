class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}}){
        this.position = position
        this.width = 70
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw(){
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++
    
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
          } else {
            this.framesCurrent = 0
          }
        }
      }

    update(){
        this.draw()
        this.animateFrames()
     }
}

class Fighter extends Sprite{
    constructor({position, velocity, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}, sprites, direction}){
        super({
            position,
            imageSrc,
            scale, 
            framesMax,
            offset,
        })
        this.velocity = velocity
        this.width = 70
        this.height = 150
        this.lastKey
        this.movement = true
        this.canAttack = true
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.direction = direction

        for (const sprite in sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    changeSprite(sprite){
        if (this.direction === 'left') {
            if (this.image === this.sprites.attackleft.image && this.framesCurrent < this.sprites.attackleft.framesMax - 1) {
                return
            }

            if (this.image === this.sprites.hitleft.image && this.framesCurrent < this.sprites.hitleft.framesMax - 1) {
                return
            }
            switch(sprite){
                case 'idle':
                    if (this.image !== this.sprites.idleleft.image) {
                        this.framesHold = this.sprites.idleleft.framesHold
                        this.image = this.sprites.idleleft.image
                        this.framesMax = this.sprites.idleleft.framesMax
                        this.framesCurrent = 0
                    }                
                    break
                case 'run':
                    if (this.image !== this.sprites.runleft.image) {
                        this.framesHold = this.sprites.runleft.framesHold
                        this.image = this.sprites.runleft.image
                        this.framesMax = this.sprites.runleft.framesMax
                        this.framesCurrent = 0               
                    }
                    break
                case 'jump':
                    if (this.image !== this.sprites.jumpleft.image) {
                        this.framesHold = this.sprites.jumpleft.framesHold
                        this.image = this.sprites.jumpleft.image
                        this.framesMax = this.sprites.jumpleft.framesMax
                        this.framesCurrent = 0                  
                    }
                    break
                case 'fall':
                    if (this.image !== this.sprites.fallleft.image) {
                        this.framesHold = this.sprites.fallleft.framesHold
                        this.image = this.sprites.fallleft.image
                        this.framesMax = this.sprites.fallleft.framesMax
                        this.framesCurrent = 0                    
                    }
                     break
                case 'attack':
                    if (this.image !== this.sprites.attackleft.image) {
                        this.framesHold = this.sprites.attackleft.framesHold
                        this.image = this.sprites.attackleft.image
                        this.framesMax = this.sprites.attackleft.framesMax
                        this.framesCurrent = 0 
                    }                  
                break
                case 'hit':
                    if (this.image !== this.sprites.hitleft.image) {
                        this.framesHold = this.sprites.hitleft.framesHold
                        this.image = this.sprites.hitleft.image
                        this.framesMax = this.sprites.hitleft.framesMax
                        this.framesCurrent = 0 
                    }                  
                break
            }
        }

        if (this.direction === 'right') {
            if (this.image === this.sprites.attackright.image && this.framesCurrent < this.sprites.attackright.framesMax - 1) {
                return
            }

            if (this.image === this.sprites.hitright.image && this.framesCurrent < this.sprites.hitright.framesMax - 1) {
                return
            }
            switch(sprite){
                case 'idle':
                    if (this.image !== this.sprites.idleright.image) {
                        this.framesHold = this.sprites.idleright.framesHold
                        this.image = this.sprites.idleright.image
                        this.framesMax = this.sprites.idleright.framesMax
                        this.framesCurrent = 0
                        console.log('abc')
                    }                
                    break
                case 'run':
                    if (this.image !== this.sprites.runright.image) {
                        this.framesHold = this.sprites.runright.framesHold
                        this.image = this.sprites.runright.image
                        this.framesMax = this.sprites.runright.framesMax
                        this.framesCurrent = 0               
                    }
                    break
                case 'jump':
                    if (this.image !== this.sprites.jumpright.image) {
                        this.framesHold = this.sprites.jumpright.framesHold
                        this.image = this.sprites.jumpright.image
                        this.framesMax = this.sprites.jumpright.framesMax
                        this.framesCurrent = 0                  
                    }
                    break
                case 'fall':
                    if (this.image !== this.sprites.fallright.image) {
                        this.framesHold = this.sprites.fallright.framesHold
                        this.image = this.sprites.fallright.image
                        this.framesMax = this.sprites.fallright.framesMax
                        this.framesCurrent = 0                    
                    }
                    break
                case 'attack':
                    if (this.image !== this.sprites.attackright.image) {
                        this.framesHold = this.sprites.attackright.framesHold
                        this.image = this.sprites.attackright.image
                        this.framesMax = this.sprites.attackright.framesMax
                        this.framesCurrent = 0                   
                    }
                    break
                    case 'hit':
                        if (this.image !== this.sprites.hitright.image) {
                            this.framesHold = this.sprites.hitright.framesHold
                            this.image = this.sprites.hitright.image
                            this.framesMax = this.sprites.hitright.framesMax
                            this.framesCurrent = 0 
                        }                  
                    break
            }
        }
        
    }

    update(){
        this.draw()
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= 530){
            this.velocity.y = 0
            this.position.y = 380
        }else{
            this.velocity.y += gravity
        }
        
    }    
    
    attack(){
        this.changeSprite('attack')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 500)
    }
}