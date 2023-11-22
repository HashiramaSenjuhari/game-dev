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
    this.rotation = 0
    const image = new Image()
    image.src = './img/spaceship-1.png'
    image.onload = () =>{
      let scale = 0.15
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x:canvas.width/2 -this.width/2,
        y:canvas.height - this.height
      }
    }
  }
  draw(){
    c.save()
    c.translate(
      this.position.x + this.width/2 ,
      this.position.y + this.height/2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width/2 ,
      -this.position.y - this.height/2
    )
    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    c.restore()
  }
  update(){
    if(this.image){
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
}

class Projectile{
  constructor({position,velocity}){
    this.position = position
    this.velocity = velocity
    // this.radius = 3
    const image = new Image()
    image.src = './img/projectile.png'
    image.onload = () =>{
      let scale = 0.04
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
    } 
  }
  draw(){
    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
  }
  update(){
    if(this.image)
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Invader{
  constructor({position}){
    this.velocity = {
      x:0,
      y:0
    }
    const image = new Image()
    image.src = './img/villanspaceship.png'
    image.onload = () =>{
      let scale = 0.09
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x:position.x,
        y:position.y
      }
    }
  }
  draw(){
    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
  }
  update({velocity}){
    if(this.image){
      this.draw()
      this.position.x += velocity.x
      this.position.y += velocity.y
    }
  }
  shoot(invaderProjectile){
    invaderProjectile.push(new InvaderProjectile({
      position:{
        x:this.position.x + this.width/2,
        y:this.position.y + this.height
      },
      velocity:{
        x:0,
        y:3
      }
    }))
  }
}

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
    this.invader = []
    const rows = Math.floor(Math.random()*6+5)
    const columns = Math.floor(Math.random()*3+2)
    this.width = columns*50
    for(let x=0;x<rows;x++){
      for(let y=0;y<columns;y++){
        this.invader.push(new Invader({
          position:{
            x:x*50,
            y:y*40
          }
        }))
      }
    }
  }
  update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.y = 0
    if(this.position.x + this.width >= canvas.width - 250 || this.position.x <= 0){
      this.velocity.x = -this.velocity.x
      this.velocity.y = 30
    }

  }
}

class InvaderProjectile{
  constructor({position,velocity}){
    this.position = position
    this.velocity = velocity
    const image = new Image()
    image.src = './img/bullet.png'
    image.onload = () =>{
      let scale = 0.09
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
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

// class compomnent{
//   constructor(position,velocity){
//     this.position = position
//     this.velocity = velocity
//     const image = new Image()
//     image.src = './img/villanBall'
//     image.onload = () =>{
//       this.image = image
//       this.width = image.width
//       this.height = image.height
//     }
//   }
//   update(){
//     this.position.x += this.decreseInVelocity.x

//   }
// }

const player = new Player()
const projectile = []
const  grids = []
let frames = 0
let randomIntervals = (Math.floor(Math.random()*500))+500
const invaderProjectile = []



let keys = {
  ArrowRight :{
    pressed:false
  },
  ArrowLeft:{
    pressed:false
  },
  Space:{
    pressed:false
  },
  ArrowUp:{
    pressed:false
  },
  ArrowDown:{
    pressed:false
  }
}


function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0,0,canvas.width,canvas.height)
  player.update()
  // bomb.update()
  // villanInvader.update()
  invaderProjectile.forEach((invaderProjectiles,index) => {
    if(invaderProjectiles.position.y + invaderProjectiles.height >= canvas.height){
      setTimeout(() => {
        invaderProjectile.splice(index,1)
      },0)
    }else{
      invaderProjectiles.update()
    }
    if(invaderProjectiles.position.y + invaderProjectiles.height >= player.position.y &&
      invaderProjectiles.position.x + invaderProjectiles.width >= player.position.x &&
      invaderProjectiles.position.x <= player.position.x + player.width
      ){
      console.log('you lose')
    }
  })
  // console.log(invaderProjectile)
  projectile.forEach(projectile => setInterval(projectile.update(),2000))

  grids.forEach(grid => {
    grid.update()

  // spawing 
// console.log(grid.invader.length)

    grid.invader.forEach((invader,i) => {

      if(frames % 100 === 0 && grid.invader.length > 0){
        grid.invader[Math.floor(Math.random()*3 )].shoot(invaderProjectile)
      }
      // console.log(grid.invader.length)
      invader.update({velocity:grid.velocity})
      projectile.forEach((projectiles,j) => {
        if(
          projectiles.position.y + (projectiles.height + projectiles.width)/2 <= invader.position.y + invader.height && 
          projectiles.position.x + (projectiles.height + projectiles.width)/2 >= invader.position.x &&
          projectiles.position.x - (projectiles.height + projectiles.width)/2 <= invader.position.x + invader.width && 
          projectiles.position.y + (projectiles.height + projectiles.width)/2 >= invader.position.y
        ){
          setTimeout(() =>{
            // const invaderFound = grid.invader.find(invader2 => invader2 === invader2)
            // const projectileFound = projectiles.find(projectile2 => projectile2 === projectile)
            // if( projectileFound){
            grid.invader.splice(i,1)
            projectile.splice(j,1)

        },0)
        }
      })
    })
  })




  if(keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width){
    player.velocity.x = 10
    player.rotation = 0.20
  }
  else if(keys.ArrowLeft.pressed && player.position.x >= 0){
    player.velocity.x = -10
    player.rotation = -0.20
  }
  else if(keys.ArrowUp.pressed && player.position.y >= 650 && player.position.x + player.width <= canvas.width){
    player.velocity.y = -5
  }
  else if(keys.ArrowDown.pressed && player.position.y + player.height<= canvas.height && player.position.x >= 0){
    player.velocity.y = 5
  }
  else{
    player.velocity.x = 0
    player.velocity.y = 0
    player.rotation = 0
  }

  if(frames % randomIntervals === 0){
    grids.push(new Grid())
    frames = 0
  }
  frames++

}

animate()

addEventListener('keydown', ({key}) =>{
  // console.log(key)
  switch(key){
    case 'ArrowRight':
      // console.log('right')
 
      keys.ArrowRight.pressed = true
      break
    case 'ArrowLeft':
      // console.log('left')

      keys.ArrowLeft.pressed = true
      break
    case ' ':
      // console.log('space')
      // if(isBulletReloading){
      projectile.push(new Projectile({
        position:{
          x:player.position.x + player.width/3.5,
          y:player.position.y 
        },
        velocity:{
          x:0,
          y:-10
        }
      }))

      keys.Space.pressed = true
      break
    case 'ArrowUp':
      keys.ArrowUp.pressed = true

      // console.log('up')
      break
    case 'ArrowDown':
      keys.ArrowDown.pressed = true
      // console.log('down')
      break
  }
})

addEventListener('keyup', ({key}) =>{
  // console.log(key)
  switch(key){
    case 'ArrowRight':
      // console.log('right')

      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      // console.log('left')

      keys.ArrowLeft.pressed = false
      break
    case ' ':
      // console.log('space')
      keys.Space.pressed = false
      break
    case 'ArrowUp':
      keys.ArrowUp.pressed = false
      // console.log('up')
      break
    case 'ArrowDown':
      keys.ArrowDown.pressed = false
      // console.log('down')
      break
  }
})