const title = 'SAFNANÓTT'
const description = `Á Safnanótt 7. febrúar 2020 fer fram Safnanæturleikurinn.  Hægt er að taka þátt í leiknum með því að svara laufléttum spurningum á mismunandi söfnum og sýningum sem eru heimsótt. Svör við spurningum er hægt að finna á þeim söfnum og sýningum sem taka þátt á Safnanótt.
  Til þess að komast í pottinn þarf að svara að minnsta þremur spurningum.
  Glæsilegir vinningar í boði.`
const image = '/img/main.jpg'

module.exports = {
  layoutTransition: {
    name: 'layout',
    css: true
  },

  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:title', name: 'og:title', content: title },
      { hid: 'og:description', name: 'og:description', content: description },
      { hid: 'og:image', name: 'og:image', content: image },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      { hid: 'twitter:image', name: 'twitter:image', content: image }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  router: {
    middleware: 'i18n',
    linkExactActiveClass: 'is-active',
    scrollBehavior() {
      return {
        x: window.scrollX || window.pageXOffset,
        y: window.scrollY || window.pageYOffset
      }
    }
  },

  css: [
    {
      src: 'node_modules/swiper/dist/css/swiper.css',
      lang: 'css'
    },
    {
      src: '~/assets/scss/app.scss',
      lang: 'scss'
    }
  ],

  axios: {
    proxy: true
  },

  modules: [
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-83871608-28'
      }
    ]
  ],
  styleResources: {
    scss: [
      '~/assets/scss/helpers/_variables.scss',
      '~/assets/scss/helpers/_mixins.scss'
    ]
  },

  loading: { color: '#0000D2' },

  plugins: ['~/plugins/i18n.js'],

  generate: {
    routes: ['/', '/prizes', '/creature']
  },

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
