/**
 * Search page
 */

(function (window, document) {
  const key = 'q'

  const getQuery = () => {
    const hashes = window.location.search.slice(1).split('&')
    return hashes.reduce((params, hash) => {
      const key = hash.split('=')[0]
      const value = hash.split('=')[1]
      return Object.assign(params, { [key]: decodeURIComponent(value) })
    }, {})
  }

  const compile = source => {
    return context => {
      /* eslint-disable no-new-func */
      const props = Object.keys(context).join(', ')
      return new Function(`{ ${props} }`, `return \`${source}\``)(context)
    }
  }

  // 1. has search results container
  const resultElement = document.getElementById('results')
  if (!resultElement) return

  // 2. enabled ghost api
  if (!ghost) return

  // 3. has search querystring named q
  const query = getQuery()[key]
  if (!query) return

  // 4. result item template
  const itemTmplSource = document.getElementById('item_tmpl')
  if (!itemTmplSource) return
  const itemTemplate = compile(itemTmplSource.innerHTML)

  // replace title
  const titleElement = document.querySelector('.site-title')
  if (titleElement) {
    titleElement.innerHTML = titleElement.innerHTML.replace('%', query)
  }
  document.title = document.title.replace('%', query)

  const url = ghost.url.api('posts', { fields: ['url', 'title', 'feature_image'], formats: 'plaintext', absolute_urls: true })
  fetch(url)
    .then(response => response.json())
    .then(resources => fuzzysort.goAsync(query, resources.posts, {
      keys: [ 'title' ],
      threshold: -3500,
      allowTypo: false
    }))
    .then(result => {
      resultElement.innerHTML = result.map(i => i.obj).map(itemTemplate).join('')
    })
    .catch(error => console.error('Fetch Error =\n', error))
})(window, document)
