const qs = document.querySelector.bind(document)
const qsa = document.querySelectorAll.bind(document)

function loadStyle (href) {
  const linkElement = document.createElement('link')
  linkElement.rel = 'stylesheet'
  linkElement.type = 'text/css'
  linkElement.href = href
  document.head.appendChild(linkElement)
}

function loadScript (src, callback) {
  const scriptElement = document.createElement('script')
  scriptElement.src = src
  callback && scriptElement.addEventListener('load', callback)
  document.body.appendChild(scriptElement)
}

// // pjax
// // -----------------------------------------------------------------------------
// // https://unpkg.com/jquery-pjax
// ;(() => {
//   $(document).pjax('a[href]', 'body', { fragment: 'body' })
//   // qsa('a[href]').forEach(item => item.addEventListener('click', e => {
//   //   const url = e.currentTarget.href
//   //   if (url === window.location.href) return

//   //   const xhr = new window.XMLHttpRequest()
//   //   xhr.responseType = 'document'

//   //   xhr.addEventListener('load', () => {
//   //     document.body = xhr.response.querySelector('body')
//   //   })

//   //   xhr.open('GET', url)
//   //   xhr.send(null)

//   //   e.preventDefault()
//   // }))
// })()

// search
// -----------------------------------------------------------------------------
;(() => {
  const input = qs('#search_input')
  if (!input) return false

  loadScript('https://unpkg.com/ghost-search/dist/ghost-search.js', () => {
    const result = document.createElement('div')
    result.id = 'search_result'
    result.className = 'dropdown-menu dropdown-menu-right'
    result.innerHTML = `<span class="dropdown-item disabled">${input.placeholder}...</span>`
    input.parentElement.classList.add('dropdown')
    input.parentElement.appendChild(result)

    /* eslint-disable no-new */
    new window.GhostSearch({
      input: '#search_input',
      results: '#search_result',
      template: i => `<a class="dropdown-item" href="${i.url}">${i.title}</a>`,
      api: {
        parameters: { fields: ['url', 'title'] }
      },
      on: {
        afterDisplay: results => {
          if (results.total !== 0) return false
          if (!input.value) return false
          result.innerHTML = `<span class="dropdown-item disabled">No results</span>`
        }
      }
    })
  })
})()

// img lazyload
// -----------------------------------------------------------------------------
;(() => {
  if (!qs('.post-card [data-src]')) return false

  loadScript('https://unpkg.com/vanilla-lazyload', () => {
    window.lazyloader = new window.LazyLoad({
      elements_selector: '.post-card [data-src]'
    })
  })
})()

// highlight prismjs
// -----------------------------------------------------------------------------
;(() => {
  const elements = qsa('.post-content pre code')
  if (!elements.length) return false
  // code card polyfill
  elements.forEach(item => {
    item.classList.length || item.classList.add('language-basic')
  })

  loadStyle('https://unpkg.com/prismjs/themes/prism-okaidia.css')
  loadScript('https://unpkg.com/prismjs/prism.js')
})()

// gallery
// -----------------------------------------------------------------------------
;(() => {
  qsa('.kg-gallery-image img').forEach(item => {
    const container = item.closest('.kg-gallery-image')
    const width = item.attributes.width.value
    const height = item.attributes.height.value
    const ratio = width / height
    container.style.flex = ratio + ' 1 0%'
  })

  // preview
  const elements = qsa('.kg-gallery-container')
  if (!elements.length) return false
  loadStyle('https://unpkg.com/lightgallery.js/dist/css/lightgallery.min.css')
  loadScript('https://unpkg.com/lightgallery.js/dist/js/lightgallery.js', () => {
    elements.forEach(item => {
      item.querySelectorAll('.kg-gallery-image').forEach(sub => {
        sub.dataset.src = sub.children[0].src
      })
      window.lightGallery(item, { selector: '.kg-gallery-image' })
    })
  })
})()

// TODO: post share
// -----------------------------------------------------------------------------
;(() => {
  qsa('.post-share a').forEach(item => item.addEventListener('click', e => {
    window.open(e.currentTarget.href, 'share-window', 'width=640,height=360')
    e.preventDefault()
  }))
})()

// subscribe hidden form value
// -----------------------------------------------------------------------------
;(() => {
  qsa('input[name=location]').forEach(item => { item.value = item.value || location.href })
  qsa('input[name=referrer]').forEach(item => { item.value = item.value || document.referrer })
})()

// site preloader
// -----------------------------------------------------------------------------
;(() => {
  const loader = qs('.site-preloader')
  if (loader) {
    loader.style.opacity = 0
    setTimeout(() => loader.parentElement.removeChild(loader), 1000)
  }
})()
