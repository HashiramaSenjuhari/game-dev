const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player{
  constructor(){
    this.velocity = {
      x:0,
      y:0
    }
    const image = new Image()
    image.src = './img/spaceship.png'
    image.onload = () =>{
      this.image = image
      this.width = image.width
      this.height = image.height
      this.position = {
        x:canvas.width/2,
        y:canvas.height - this.height
      }
    }
  }
  draw(){
    if(this.draw)
    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
  }
}

const player = new Player

function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0,0,canvas.width,canvas.height)
  player.draw
}

animate()