const withScss = require('@zeit/next-sass');
const withTs = require('@zeit/next-typescript')

let conf = {}
conf = withScss(conf)
conf = withTs(conf)

module.exports = conf