# Cache Link Inserter

Simple microservice. If you post HTML with links, it returns the same HTML with
all the links annotated with a 'cached' link to a cached version of the webpages
the original links pointed to.

## Dependecies

Depends on a service running on `localhost:4747` that conforms to the same API
as the Internet Archive link saving service. A good example is the
(link-snapshot)[https://github.com/mergermarket/link-snapshot] service.

## To run

`npm start`

The service will start on `localhost:3001`

## API

### POST `/api/insert-cache-links`
Post HTML to this route and get back the same HTML, with all the links having
a `cached` link appended to them

#### Example

```
curl -X POST -H "Content-Type:text/html" -d @example.html http://localhost:3001/api/insert-cache-links
```

Will return `example.html` with all the links decorated with a cached version.

---

_Another fine mess from Skunkworks_
