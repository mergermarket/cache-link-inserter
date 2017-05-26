const cheerio = require('cheerio')

module.exports = function create(dependencies) {
  const generateLink = generateCacheLink(dependencies)
  return {
    insertCacheLinks(html) {
      const $ = cheerio.load(html)
      const promises = $('a[href]').map(function (i, elem) {
        const link = cheerio(elem)
        return generateLink(link.attr('href')).then(function (cacheLink) {
          link.after(cacheLink)
        })
      })
      return Promise.all(promises.toArray()).then(function() {
        return $.html()
      })
    }
  }
}

const generateCacheLink = ({cacheLinkGenerator}) => (link) => {
  return new Promise(function (resolve, reject) {
    return cacheLinkGenerator(link).then(cachedLink => {
      resolve(' (<a href="' + cachedLink + '">cached</a>) ')
    })
  })
}