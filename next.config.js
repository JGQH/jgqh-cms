const { join } = require('path')

module.exports = {
  sassOptions: {
    includePaths: [
      join(__dirname, 'styles')
    ]
  },
  images: {
    loader: 'imgix',
    path: ''
  }
}