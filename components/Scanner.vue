<template>
  <ClientOnly>
    <div class="qr-scanner">
      <label class="qr-scanner__btn-photo">
        <QrcodeCapture ref="capture" @detect="handleDetect" />
        <Code ref="code" class="qr-scanner__code" />
      </label>
      <div v-if="error" class="qr-scanner__error-message">
        {{ $t(error) }}
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import { mapActions } from 'vuex'

import isClient from '~/helpers/isClient'

import Code from '~/components/Code'

const components = isClient(() => {
  const { QrcodeCapture } = require('vue-qrcode-reader')
  return { QrcodeCapture }
})

export default {
  name: 'Scanner',
  components: {
    ...components.result,
    Code
  },
  data: () => ({
    result: '',
    noStreamApiSupport: false,
    isMobile: (() => {
      const agent = navigator.userAgent || navigator.vendor || window.opera
      return (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          agent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
          agent.substr(0, 4)
        )
      )
    })(),
    error: null
  }),
  watch: {
    result(value) {
      Array.prototype.forEach.call(
        document.querySelectorAll('.js-qrcode-info'),
        field => {
          field.value = value
        }
      )
    },
    error(value) {
      Array.prototype.forEach.call(
        document.querySelectorAll('.js-qrcode-error'),
        container => {
          container.textContent = value
          value
            ? container.classList.add('is-open')
            : container.classList.remove('is-open')
        }
      )
    }
  },
  methods: {
    ...mapActions(['sendCode']),
    async handleDetect(promise) {
      this.$refs.code && this.$refs.code.animationStart()
      try {
        const { content } = await promise
        this.handleDecode(content)
      } catch (error) {
        this.handleDecode(null)
      }
    },
    handleDecode(result) {
      this.result = result
      this.error = null
      const data = new FormData()
      data.append('qr', this.$refs.capture.$el.files[0])
      data.append('status', result ? 1 : 0)
      data.append('query_id', this.$route.query.id)
      this.sendCode(data).finally(() => {
        if (!result) {
          this.error = 'errorMessages.isNotQRCode'
          this.$nextTick(() => this.$emit('error', this.error))
        } else {
          const {
            resolved: {
              query: { id, key }
            }
          } = this.$router.resolve(result)
          this.$router.push({
            name: 'creature',
            query: {
              id,
              key
            }
          })

          if (!(id && key)) {
            this.error = 'errorMessages.isWrongQRCode'
          } else {
            this.$nextTick(() => this.$emit('success', this.result))
          }
        }

        setTimeout(
          () => this.$refs.code && this.$refs.code.animationEnd(),
          1000
        )
      })
    },
    async handleInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'StreamApiNotSupportedError') {
          this.noStreamApiSupport = true
        }
        if (this.noStreamApiSupport) return
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        }
      }
    },
    clear() {
      this.result = ''
      this.error = null
    }
  }
}
</script>

<style lang="scss">
.qr-scanner {
  &__modal {
    position: fixed;
    z-index: 100000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;

    &-container,
    .qrcode-stream,
    .qrcode-stream__inner-wrapper,
    .qrcode-stream__pause-frame,
    .qrcode-stream__camera {
      width: 100%;
      height: 100%;
    }

    .qrcode-stream__camera,
    .qrcode-stream__pause-frame {
      object-fit: cover;
    }
  }

  &__btn-photo {
    display: inline-block;
    vertical-align: top;

    input {
      display: none;
    }
  }

  &__btn {
    color: inherit;
    background: none;
  }

  &__icon {
    &:not(:last-child) {
      margin: pxToRem(10);
    }

    &-in {
      width: pxToRem(77);
      height: pxToRem(76);
      color: $white;
      fill: $black;
    }
  }

  &__text {
    font-size: pxToRem(16);
    line-height: (19/16);
  }

  &__error-message {
    opacity: 0.72;
    font-size: pxToRem(14);
    line-height: 1.2;
  }
}
</style>
