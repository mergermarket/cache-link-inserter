import test from 'ava';
import linkInserterService from './link-inserter-service'

test('must replace the links in the html', async t => {
  const original = '<html><body><a href="www.google.com"></a></body></html>'
  const expected = '<html><body><a href="www.google.com"></a> (<a href="cached/www.google.com">cached</a>) </body></html>'
  const service = createService()
  t.is(await service.insertCacheLinks(original), expected)
})

test('must replace multiple links', async t => {
  const original = '<html><body><a href="www.google.com"></a><a href="www.bbc.co.uk"></a></body></html>'
  const expected = '<html><body><a href="www.google.com"></a> (<a href="cached/www.google.com">cached</a>) <a href="www.bbc.co.uk"></a> (<a href="cached/www.bbc.co.uk">cached</a>) </body></html>'
  const service = createService()
  t.is(await service.insertCacheLinks(original), expected)
})

test('ignore links without href', async t => {
  const original = '<html><body><a>test</a></body></html>'
  const service = createService()
  t.is(await service.insertCacheLinks(original), original)
})

function createService() {
  return linkInserterService({
    cacheLinkGenerator(originalLink) {
      return new Promise((resolve, reject) => {
        resolve('cached/' + originalLink)
      })
    }
  })
}

