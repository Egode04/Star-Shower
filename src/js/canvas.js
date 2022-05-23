const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight*3.8/4

const colors = [

    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'

]

const mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

addEventListener('mousemove', event => {
    
    mouse.x = event.clientX
    mouse.y = event.clientY

})

addEventListener('click', () => {

    cursor.shatter()

})

addEventListener('resize', () => {

    canvas.width = innerWidth
    canvas.height = innerHeight*2/3

    init()

})

// objects
class Star {

    constructor({

        position,
        velocity,
        radius,
        color,
        friction,
        gravity,
        shrink

    }) {


        this.position = {
            x: position.x,
            y: position.y
        }
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }

        this.radius = radius
        this.color = color
        this.friction = friction
        this.gravity = gravity
        this.shrink = shrink

    }

    draw() {

        c.save()

            c.beginPath()

                // create circle
                c.arc(

                    this.position.x,
                    this.position.y,
                    this.radius, 0,
                    Math.PI * 2, false

                )

                c.fillStyle = this.color
                c.shadowColor = '#e3eaef'
                c.shadowBlur = 15
                c.fill()

            c.closePath()

        c.restore()

    }

    shatter() {

        // shrink star if radius - shrink rate is 0 or more
        if (this.radius - this.shrink < 0) {

            this.radius = 0

        } else {

            this.radius -= this.shrink

        }

        const rad = this.radius
        const minParticles = 4
        const minParticleVelocity = 4
        const maxParticlesRate = 2

        for (let i = 0; i < maxParticlesRate*(rad/3+minParticles); i++) {

            // store x and y velocity

            const velocity = {
                x: 28,
                y: 56
            }
            const randomVelocity = {
                x: randomIntFromRange(-velocity.x, velocity.x)/(rad/3+minParticleVelocity),
                y: randomIntFromRange(-velocity.y, velocity.y)/(rad/3+minParticleVelocity)
            }

            // set x velocity to -0.5 or 0.5
            // if x velocity is 0
            if (!randomVelocity.x) {

                randomVelocity.x = randomIntFromRange(0, 1) - 0.5

            }

            // do something
            particles.push(new Particle({

                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                velocity: {
                    x: randomVelocity.x,
                    y: randomVelocity.y
                },
                radius: 2,
                friction: 0.7,
                gravity: 0.15,
                timeToLive: 100,
                opacity: 1

            }))

        }

    }

    update() {

        this.draw()

        // ball hits ground
        if (this.position.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
            
            this.velocity.y = -this.velocity.y * this.friction

            if (this.radius) this.shatter()

        } else {

            this.velocity.y += this.gravity
            
        }

        // hits side of screen
        if (

            this.position.x + this.radius + this.velocity.x >= canvas.width ||
            this.position.x - this.radius <= 0

        ) {

            this.velocity.x = -this.velocity.x
            if (this.radius) this.shatter()

        }

        // update x and y position
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }

}

class Particle {

    constructor({

        position,
        velocity,
        radius,
        color,
        friction,
        gravity,
        timeToLive,
        opacity

    }) {

        this.position = {
            x: position.x,
            y: position.y
        }
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }

        this.radius = radius
        this.color = color
        this.friction = friction
        this.gravity = gravity
        this.timeToLive = timeToLive
        this.opacity = opacity

    }

    draw() {

        c.save()

            c.beginPath()

                // create circle
                c.arc(

                    this.position.x,
                    this.position.y,
                    this.radius, 0,
                    Math.PI * 2, false

                )
                c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`
                c.shadowColor = '#e3eaef'
                c.shadowBlur = 20
                c.fill()

            c.closePath()

        c.restore()

    }

    update() {

        this.draw()

        // hit bottom
        if (this.position.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
            
            this.velocity.y = -this.velocity.y * this.friction

        } else {

            this.velocity.y += this.gravity
            
        }

        // hits side of screen
        if (

            this.position.x + this.radius + this.velocity.x >= canvas.width ||
            this.position.x - this.radius <= 0

        ) {

            this.velocity.x = -this.velocity.x * this.friction

        }
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.timeToLive -= 1
        this.opacity -= 1 / this.timeToLive

    }

}

class BackgroundStar {

    constructor({

        position,
        radius,
        color

    }) {


        this.position = {
            x: position.x,
            y: position.y
        }

        this.radius = radius
        this.color = color

    }

    draw() {

        c.save()

            c.beginPath()

                // create circle
                c.arc(

                    this.position.x,
                    this.position.y,
                    this.radius, 0,
                    Math.PI * 2, false

                )
                c.fillStyle = this.color
                c.shadowColor = '#e3eaef'
                c.shadowBlur = 15
                c.fill()

            c.closePath()

        c.restore()

    }

    update() {

        this.draw()

    }

}

class MouseCursor {

    constructor({

        position,
        radius,
        color,
        shadowBlur,
        shadowColor,
        clickColor

    }) {


        this.position = {
            x: position.x,
            y: position.y
        }

        this.radius = radius
        this.color = color
        this.shadowBlur = shadowBlur
        this.shadowColor = shadowColor
        this.clickColor = clickColor

    }

    draw() {

        c.save()

            c.beginPath()

                // create circle
                c.arc(

                    this.position.x,
                    this.position.y,
                    this.radius, 0,
                    Math.PI * 2, false

                )
                c.fillStyle = this.color
                c.shadowColor = this.shadowColor
                c.shadowBlur = this.shadowBlur
                c.fill()

            c.closePath()

        c.restore()

    }

    shatter() {

        const rad = this.radius
        const minParticles = 4
        const minParticleVelocity = 2
        const maxParticlesRate = 5

        for (let i = 0; i < maxParticlesRate*(rad/3+minParticles); i++) {

            // store x and y velocity

            const velocity = {
                x: 28,
                y: 56
            }
            const randomVelocity = {
                x: randomIntFromRange(-velocity.x, velocity.x)/(rad/3+minParticleVelocity),
                y: randomIntFromRange(-velocity.y, velocity.y)/(rad/3+minParticleVelocity)
            }

            // set x velocity to -0.5 or 0.5
            // if x velocity is 0
            if (!randomVelocity.x) {

                randomVelocity.x = randomIntFromRange(0, 1) - 0.5

            }

            // do something
            particles.push(new Particle({

                position: {
                    x: mouse.x,
                    y: mouse.y
                },
                velocity: {
                    x: randomVelocity.x,
                    y: randomVelocity.y
                },
                radius: 2,
                friction: 0.7,
                gravity: 0.15,
                timeToLive: 75,
                opacity: 1

            }))

        }

    }

    update() {

        this.draw()

        this.position.x = mouse.x
        this.position.y = mouse.y

    }

}

function createMauntainRange(amount, height, color) {

    for (i = 0; i < amount; i++) {
        
        const width = canvas.width/amount

        c.beginPath()

            c.moveTo(i * width, canvas.height)
            c.lineTo(i * width + width + 325, canvas.height)
            c.lineTo(i * width + width / 2, canvas.height - height)
            c.lineTo(i * width - 325, canvas.height)
            
            c.fillStyle = color
            c.shadowColor = c.fillStyle
            c.shadowBlur = 5
            c.fill()

        c.closePath()
        
    }

}

function createFloor(groundHeight) {

    c.fillStyle = '#182028'
    c.fillRect(

        0,
        canvas.height - groundHeight,
        canvas.width,
        groundHeight

    )
    c.shadowColor = c.fillStyle
    c.shadowBlur = 15

}

// implementation
const cursor = new MouseCursor({

    position: {
        x: innerWidth/2,
        y: innerHeight/2
    },
    radius: 5,
    color: 'rgba(0, 0, 0, 0)',
    shadowBlur: 5,
    shadowColor: 'rgba(0, 0, 0, 0)',
    clickColor: 'rgba(0, 0, 0, 0)'

})

const backgroundGradient = c.createLinearGradient(

    0, 0,
    0, canvas.height

)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#2e475a')

let stars
let particles
let backgroundStars
let fallingStars

let framesElapsed
let framesHold
let groundHeight

function init() {

    stars = []
    particles = []
    backgroundStars = []
    fallingStars = []

    framesElapsed = 0
    framesHold = 100

    groundHeight = 100

    for (i = 0; i < 200; i++) {

        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 3
        const color = 'white'

        backgroundStars.push(new BackgroundStar({

            position: {
                x: x,
                y: y
            },
            radius: radius,
            color: color

        }))
        
    }

}

// animation loop
function animate() {

    requestAnimationFrame(animate)

    c.fillStyle = backgroundGradient
    c.fillRect(0, 0, canvas.width, canvas.height)

    backgroundStars.forEach(backgroundStar => {

        backgroundStar.update()

    })

    fallingStars.forEach((star, index) => {

        star.update()

        if (!star.lifeTime) {

            fallingStars.splice(index, 1)

        }
        
    })

    createMauntainRange(1, canvas.height - 50 * 6.5, '#364250')
    createMauntainRange(3, canvas.height - 50 * 8, '#303d4a')
    createMauntainRange(2, canvas.height - 100 * 4.2, '#2e3b46')
    createMauntainRange(3, canvas.height - 300 * 1.7, '#26333e')
    createMauntainRange(4, canvas.height - 400 * 1.45, '#23303b')

    createFloor(groundHeight)

    stars.forEach((star, index) => {

        star.update()

        if (!star.radius) {

            stars.splice(index, 1)

        }
        
    })

    particles.forEach((particle, index) => {

        particle.update()

        if (!particle.timeToLive) {

            particles.splice(index, 1)

        }

    })

    framesElapsed++

    if (!(framesElapsed % framesHold)) {

        const radius = 12

        const x = Math.max(radius+1, Math.random() * canvas.width - radius)
        const y = 100

        const velocity = {
            x: randomIntFromRange(-16, 16) - 0.5,
            y: 0
        }

        stars.push(new Star({

            position: {
                x: x,
                y: y
            },
            velocity: {
                x: velocity.x,
                y: velocity.y
            },
            radius: radius,
            color: '#e3eaef',
            friction: 0.7,
            gravity: 0.85,
            shrink: 3


        }))

        framesHold = randomIntFromRange(150, 200)

    }

    cursor.update()

}

init()
animate()