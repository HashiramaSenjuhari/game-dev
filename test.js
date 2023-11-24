const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height =  innerHeight

class Player{
  constructor(){
    this.velocity = {
      x:0,
      y:0
    }
    const image = new Image()
    image.src = './img/spaceship.png'
    image.onload = () =>{
      let scale = 0.05
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x:canvas.width/2 - this.width/2,
        y:canvas.height - this.height - 40
      }
    }
  }
  draw(){
    if(this.image)
    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
  }
  update(){
    if(this.image){
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
}

class Player2{
  constructor(){
    this.velocity = {
      x:0,
      y:0
    }
    const image = new Image()
    image.src = './img/easy.png'
    image.onload = () =>{
      let scale = 0.15
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x:canvas.width/2 - this.width/2,
        y:canvas.height - this.height - 40
      }
    }
  }
  draw(){
    if(this.image)
    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
  }
  update(){
    if(this.image){
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
}

const player = new Player()
const player2 = new Player2()
let frame = 0
let randomInterval = (Math.floor(Math.random()*500))+500

let keys = {
  ArrowRight :{
    pressed:false
  },
  ArrowLeft:{
    pressed:false
  },
  Space:{
    pressed:false
  }
}

function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0,0,canvas.width,canvas.height)
  if(frame%randomInterval === 0){
    player2.update()
  }
  else{
    player.update()
  }

  if(keys.ArrowRight.pressed){
    player.velocity.x = 5
  }
  else if(keys.ArrowLeft.pressed){
    player.velocity.x = -5
  }
  else{
    player.velocity.x = 0
  }
}

animate()

addEventListener('keydown',({key}) =>{
  console.log(key)
  switch (key){
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      break
    case ' ':
      keys.Space.pressed = true
  }
})

addEventListener('keyup',({key}) =>{
  console.log(key)
  switch (key){
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case ' ':
      keys.Space.pressed = false
  }
})