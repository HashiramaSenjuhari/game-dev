// Get HTML elements and set up canvas
const shoot = document.getElementById('shoot')
const score = document.getElementById('scoreElement')
const canvas = document.querySelector('canvas')
const body = document.querySelector('body')
const c = canvas.getContext('2d')
addEventListener('DOMContentLoaded',()=>{
  body.style.opacity = 1
})
canvas.width = innerWidth
canvas.height = innerHeight

// Player class represents the player's spaceship
class Player{
  constructor(){
     // Initial player properties
    this.velocity = {
      x:0,
      y:0
    }
    this.rotation = 0
    this.opacity = 1
    // Load player spaceship images
    const image = new Image()
    const image2 = new Image()
    const image3 = new Image()
    image.src = './img/easy.png'
    image2.src = './img/lintermediate.png'
    image3.src = './img/advance.png'
        // Set up player spaceship when the image is loaded
    image.onload = () =>{
      let scale = 0.28
      let playerCollection = [image,image2,image3]
      let randomInterval = Math.floor(Math.random()*playerCollection.length)
      this.image = playerCollection[randomInterval]
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x:canvas.width/2 -this.width/2,
        y:canvas.height - this.height - 40
        }

    }
  }
  // Draw the player spaceship on the canvas
  draw(){
    c.save()
    c.globalAlpha = this.opacity 
    c.translate(
      this.position.x + this.width/2,
      this.position.y + this.height/2
    )
    c.rotate(this.rotation)
    c.translate(
      - this.position.x - this.width/2,
      - this.position.y - this.height/2
    )
    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    c.restore()
  }
  // Update the player's position and draw the spaceship
  update(){
    if(this.image){
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
}

// class Player{
//   constructor(){
//     this.velocity = {
//       x:0,
//       y:0
//     }
//     const image = new Image()
//     this.intermediate = new Image()
//     this.advance = new Image()

//     image.src = './img/easy.png'
//     this.intermediate.src = './img/lintermediate.png'
//     this.advance.src = 'img/advance.png'
    
//     this.width = 0
//     this.height = 0

//     this.position = {
//       x:0,
//       y:0
//     }
//   }
//   updateImage(){
//     if(this.image){
//       let scale = 0.24
//       if(scores > 10000){
//         this.image = this.advance
//       }
//       else if(scores>5000){
//         this.image = this.intermediate
//       }
//       this.width = image.width * scale
//       this.height = image.height * scale
  
//       this.position = {
//         x:canvas.width/2 - this.width/2,
//         y:canvas.height - this.height - 40
//       }
//       this.velocity = {
//         x:0,
//         y:0
//       }
//     }
//   }
//   draw(){
//     if(this.image){
//       c.save()
//       c.translate(
//         this.position.x + this.width / 2,
//         this.position.y + this.height / 2
//       )
//       c.rotate(this.rotation);
//       c.translate(
//         -this.position.x - this.width / 2,
//         -this.position.y - this.height / 2
//       )
//       c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
//       c.restore()
//     }
//   }
//   updates(){
//     if(this.image){
//       this.updateImage()
//       this.draw()
//       this.position.x += this.velocity.x
//       this.position.y += this.velocity.y
//     }
//   }
// }

// Projectile class represents the bullets fired by the player
class Projectile{
  constructor({position,velocity}){
    this.position = position 
    this.velocity = velocity
    this.radius = 5
    }
  // Draw the projectile on the canvas
  draw(){
      c.beginPath()
      c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
      c.fillStyle = '#fab22e'
      c.fill()
      c.closePath()
  }
   // Update the projectile's position and draw it
  update(){
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  }
}
  
// Invader class represents the enemy spaceships
class Invader{
  constructor({position}){
    this.velocity = {
      x:0,
      y:0
    }
    const image = new Image()
    const image2 = new Image()
    const image3 = new Image()
    image.src = './img/space.png'
    image2.src = './img/b.png'
    image3.src = './img/c.png'

 // Set up the invader spaceship when the image is loaded
    image.onload = () =>{
      let scale = 0.07
      let imag = [image,image2,image3]
        const randomImage = Math.floor(Math.random()*imag.length)
        this.image = imag[randomImage]
      console.log(imag[randomImage])
      this.image = imag[randomImage]
      this.width = image.width * scale
      this.height = image.height * scale
      this.widthA = image2.width * 0.10
      this.heightA = image2.height * 0.10
      this.position = {
        x:position.x,
        y:position.y
      }
    }
  }
    // Draw the invader spaceship on the canvas
  draw(){
    if(this.image)
    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
  }
  // Update the invader's position and draw it
  update({velocity}){
    if(this.image){
      this.draw()
      this.position.x += velocity.x
      this.position.y += velocity.y
    }
  }
    // Method to make the invader shoot projectiles
  shoot(invaderProjectile){
    invaderProjectile.push(new InvaderProjectile({
      position:{
        x:this.position.x+this.width/2,
        y:this.position.y+this.height
      },
      velocity:{
        x:0,
        y:10
      }
    }))
  }
}

// Grid class represents a group of invaders arranged in a grid
class Grid{
  constructor(){
    this.position = {
      x:0,
      y:0
    }
    this.velocity = {
      x:3,
      y:0
    }
        // Adjust invader speed based on the player's score

    if(scores > 5000){
      this.velocity = {
        x:5,
        y:0
      }
    }
    else if(scores > 10000){
      this.velocity = {
        x:6,
        y:0
      }
    }
    else if(scores > 15000){
      this.velocity = {
        x:7,
        y:0
      }
    }
    else if(scores > 20000){
      this.velocity = {
        x:8,
        y:0
      }
    }
    this.invaders = []
    const rows = Math.floor(Math.random()*10+5)
    const columns = Math.floor(Math.random()*5+2)
    this.width = columns * 35 // refers to totatl grid width
    // for creating random column and rows 
    for(let x = 0; x<rows; x++){
      for(let y = 0; y<columns; y++){
        this.invaders.push(new Invader({
          position:{
            x:x*40, // 40 refers to image width including space
            y:y*35
          }
        }))
      }
    }
  }
  // Update the grid's position and handle bouncing off canvas edges
  update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.y = 0

    //if the grid width touches the canvas width it will repel
    if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
      this.velocity.x = - this.velocity.x
      this.velocity.y = 30
    }
  }
}

// InvaderProjectile class represents the bullets fired by invaders
class InvaderProjectile{
  constructor({position,velocity}){
    this.position = position
    this.velocity = velocity
    this.width = 10
    this.height = 10
  }
  draw(){
    c.fillStyle = '#A964F7'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

// Particle class represents particles for splashing effect
class Particle{
  constructor({position,velocity,radius,color,fades}){
    this.position = position 
    this.velocity = velocity
    this.radius = radius
    this.color = color
    this.opacity = 2
    this.fades = fades
    }
  // Draw the particle on the canvas
  draw(){
    c.save()
    c.globalAlpha = this.opacity
    c.beginPath()
    c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }
   // Update the particle's position, draw it, and handle fading
  update(){
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      if(this.fades)
      this.opacity -= 0.01
  }
}

// Initialize game objects and variables
const player = new Player()
const projectiles = []
const grids = []
const invaderProjectiles = []
const particles = []


let frames = 0
let randomInterval = (Math.floor(Math.random()*400))+400
console.log(randomInterval)
let scores = 0
export {scores}
// let lives = 3

// Key states for player controls
let keys = {
  ArrowRight:{
    pressed:false
  },
  ArrowLeft:{
    pressed:false
  },
  Space:{
    pressed:true
  }
}

// Game state
let game = {
  over:false,
  active:true
}

// Create particles for background visual effects
for(let i = 0;i<100;i++){
  particles.push(new Particle({
    position:{
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height
    },
    velocity:{
      x:0,
      y:0.2
    },
    radius: Math.random()*3,
    color:'white'
  }))
}


// Function to create particles around a given object
function createParticles({object,color,fades}){
  for(let i = 0;i<10;i++){
              particles.push(new Particle({
                position:{
                  x:object.position.x + object.width/2,
                  y:object.position.y + object.height/2
                },
                velocity:{
                  x:(Math.random()-0.5)*2,
                  y:(Math.random()-0.5)*2
                },
                radius: Math.random()*3,
                color: color || '#A964F7',
                fades 
              }))
            }
}

// Main animation loop
function animate(){
  if(!game.active) return
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0,0,canvas.width,canvas.height)
  player.update()
  // cake.draw()
  particles.forEach((particle,index) => {

    if(particle.position.y - particle.radius >= canvas.height){
      particle.position.x = Math.random()*canvas.width
      particle.position.y = -particle.radius
    }

    if(particle.opacity <= 0){
      particles.splice(index,1)
    }
    else{
      particle.update()
    }  
  })
  projectiles.forEach(projectile => {projectile.update()})
  invaderProjectiles.forEach((invaderProjectile,index) => {

    if(invaderProjectile.position.y + invaderProjectile.height >= canvas.height){
      setTimeout(() =>{
        invaderProjectiles.splice(index,1)
      },0)
    }else{
      invaderProjectile.update()
    }
    if(invaderProjectile.position.y + invaderProjectile.height >= player.position.y && 
      invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
      invaderProjectile.position.x <= player.position.x + player.width ){
        
          console.log('hits')
          player.opacity = 0
          game.over = true
          setTimeout(() =>{
            invaderProjectiles.splice(index,1)
          },0)
          setTimeout(() =>{
            game.active = false
            location.href = "./gameOver.html";
          },2000)
          createParticles({
          object:player,
          color:'goldenrod',
          fades:true
        })
    }
  }
)
  grids.forEach(grid =>{
    grid.update()
    if(frames % 100 === 0 && grid.invaders.length>0){
      grid.invaders[Math.floor(Math.random()*10)].shoot(invaderProjectiles)
    }
    grid.invaders.forEach((invader,i) => {
      invader.update({velocity:grid.velocity})

      // projectile hit enemy
      projectiles.forEach((projectile,j) => {
        if(projectile.position.y + projectile.radius <= invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x && 
          projectile.position.x - projectile.radius <= invader.position.x + invader.width && 
          projectile.position.y + projectile.radius >= invader.position.y){

            // particles.push(new Particle({
            //   position:{
            //     x:invader.position.x + invader.width/2,
            //     y:invader.position.y + invader.heighht/2
            //   },
            //   velocity:{
            //     x:10,
            //     y:10 
            //   }
            // }))
            createParticles({
              object:invader,
              fades:true
            })
          setTimeout(() =>{
            const invaderFound = grid.invaders.find(invader2 => invader2 === invader)
            const projectileFound = projectiles.find(projectile2 => projectile2 === projectile)
            if(invaderFound && projectileFound){
              scores+=100
              score.textContent = scores
              grid.invaders.splice(i,1)
              projectiles.splice(j,1)
            }
          },0)
        }
      })
    })
  })

  if(keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width){
    player.velocity.x = 5
    player.rotation = 0.15
    if(scores > 10000){
      player.velocity.x = 10
    }
    else if(scores > 15000){
      player.velocity.x = 15
    }
    else if(scores >20000){
      player.velocity.x = 20
    }
  }
  else if(keys.ArrowLeft.pressed && player.position.x >= 0){
    player.velocity.x = -5
    player.rotation = -0.15
    if(scores >10000){
      player.velocity.x = -10
    }
    else if(scores > 15000){
      player.velocity.x = -15
    }
    else if(scores >20000){
      player.velocity.x = -20
    }
  }
  else{
    player.velocity.x = 0
    player.rotation = 0
  }
  if(frames % randomInterval === 0){
    grids.push(new Grid())
    frames = 0
  }
  frames ++
}
animate()

// Event listeners for player controls
addEventListener('keydown',({key}) =>{
  if(game.over) return
  console.log(key)
  switch(key){
    case 'ArrowRight':
      console.log('right')
      keys.ArrowRight.pressed = true
      break
    case 'ArrowLeft':
      console.log('left')
      keys.ArrowLeft.pressed = true
      break
    case ' ':
      console.log('space')
      keys.Space.pressed = true
      projectiles.push(new Projectile({
        position:{
          x:player.position.x + player.width/2,
          y:player.position.y + player.height/10
        },
        velocity:{
          x:0,
          y:-10
        }
      }))
      shoot.play()
      break
  }
})

// Event listener for key release
addEventListener('keyup',({key}) =>{
  console.log(key)
  switch(key){
    case 'ArrowRight':
      console.log('right')
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      console.log('left')
      keys.ArrowLeft.pressed = false
      break
    case ' ':
      console.log('space')
      keys.Space.pressed = false
      break
  }
})



// function toggleAudio() {
//   var audioElement = document.getElementById('player');
//   var soundOn = document.getElementById('play');
//   var soundOff = document.getElementById('pause');
//   var mute = document.getElementById('pause-p')
//   var unmute = document.getElementById('play-p')

//   if (audioElement.paused) {
//     audioElement.play();
//     soundOn.style.display = 'inline'; 
 // Show the "play" image
//     soundOff.style.display = 'none';   // Hide the "pause" image
//     unmute.style.display = 'none';
//     mute.style.display = 'inline';
//   } else {
//     audioElement.pause();
//     soundOn.style.display = 'none';    // Hide the "play" image
//     soundOff.style.display = 'inline'; // Show the "pause" image
//     mute.style.display = 'none';
//     unmute.style.display = 'inline';
//   }
// }

// // Auto-play the audio when the page loads (initiated by user interaction)
// window.addEventListener('load', function () {
//   toggleAudio();  // Start the audio playback
// });
