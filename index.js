const express = require('express')
const app = express()
const linkInserterService = require('./link-inserter-service')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const linkInserter = createLinkInserterService()

app.use(bodyParser.text({ type: 'text/html' }))

app.post('/api/insert-cache-links', function (req, res, next) {
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('text/html') !== 0 || !req.body)
  {
    return res.send(400)
  }
  
  createLinkInserterService().insertCacheLinks(req.body).then(function (parsedHtml) {
    console.log('parsedHtml', parsedHtml)
    if (!parsedHtml) {
      return res.send(400)
    }
    res.send(parsedHtml)  
    next()
  })
})

app.listen(3001, function () {
  console.log('listening on port 3001')
})

function createLinkInserterService() {
  return linkInserterService({
    cacheLinkGenerator(originalLink) {
      // todo get from config 
      const linkGeneratorRootUrl = 'http://localhost:4747'
      const url = linkGeneratorRootUrl + '/save/' + originalLink 
      return fetch(url, {method: 'HEAD'}).then(function(res) {
        return res.headers.get('Content-Location')
      })
      // return 'cached/' + originalLink 
    }
  })
}
