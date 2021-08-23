const { join } = require('path')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  sassOptions: {
    includePaths: [
      join(__dirname, 'styles')
    ]
  },
  images: {
    loader: 'imgix',
    path: ''
  },
  basePath: (isProduction ? '/jgqh-cms' : '')
}