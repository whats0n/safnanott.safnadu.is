<template>
  <canvas :width="width" :height="height" class="bg"></canvas>
</template>

<script>
import isClient from '~/helpers/isClient'
export default {
  name: 'Snow',
  data: () => ({
    width: 0,
    height: 0,
    maxParticles: 25,
    ctx: null,
    angle: 0,
    timer: null
  }),
  computed: {
    //snowflake particles
    particles() {
      const particles = []
      for (let i = 0; i < this.maxParticles; i++) {
        particles.push({
          x: Math.random() * this.width, //x-coordinate
          y: Math.random() * this.height, //y-coordinate
          r: Math.random() * 4 + 1, //radius
          d: Math.random() * this.maxParticles //density
        })
      }
      return particles
    }
  },
  mounted() {
    isClient(() => {
      window.addEventListener('resize', this.setSizes)
      this.setSizes()
      this.ctx = this.$el.getContext('2d')
      this.$nextTick(this.start)
    })
  },
  beforeDestroy() {
    isClient(() => {
      window.removeEventListener('resize', this.setSizes)
    })
  },
  methods: {
    start() {
      requestAnimationFrame(() => {
        this.timer = setTimeout(() => {
          this.draw()
          this.start()
        }, 33)
      })
    },
    //Lets draw the flakes
    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height)

      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      this.ctx.beginPath()
      for (let i = 0; i < this.maxParticles; i++) {
        let p = this.particles[i]
        this.ctx.moveTo(p.x, p.y)
        this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true)
      }
      this.ctx.fill()
      this.update()
    },
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    update() {
      this.angle += 0.01
      for (let i = 0; i < this.maxParticles; i++) {
        let p = this.particles[i]
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(this.angle + p.d) + 1 + p.r / 2
        p.x += Math.sin(this.angle) * 2

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > this.width + 5 || p.x < -5 || p.y > this.height) {
          if (i % 3 > 0) {
            //66.67% of the flakes
            this.particles[i] = {
              x: Math.random() * this.width,
              y: -10,
              r: p.r,
              d: p.d
            }
          } else {
            //If the flake is exitting from the right
            if (Math.sin(this.angle) > 0) {
              //Enter from the left
              this.particles[i] = {
                x: -5,
                y: Math.random() * this.height,
                r: p.r,
                d: p.d
              }
            } else {
              //Enter from the right
              this.particles[i] = {
                x: this.width + 5,
                y: Math.random() * this.height,
                r: p.r,
                d: p.d
              }
            }
          }
        }
      }
    },
    setSizes() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    }
  }
}
</script>

<style lang="scss">
.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8000;
  pointer-events: none;
}
</style>
