const pkg = require('./package')
const path = require('path')


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: pkg.description
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '@/plugins/element-ui',
      ssr: false
    },
    '@/plugins/common',
    '@/plugins/myComponents'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      let svgRule = {
        test: /\.svg$/,
        use: [{
          loader: 'svg-sprite-loader',
        }, {
          loader: 'svgo-loader'
        }]
      }
      config.module.rules.push(svgRule)
      config.module.rules[11].exclude = /svg/
      /**
       * 添加一些别名
       */
      config.resolve.alias.model = path.resolve(__dirname, './model/index.js')
    }
  }
}