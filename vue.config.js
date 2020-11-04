module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
      // Style Loader
      .rule('style')
      .test(/\.scss$/)
      .use(
        [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      )
      .loader('style/loader')
      .end()
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/_main.scss";
        `
      }
    }
  }
}
