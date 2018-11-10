/**
 * Global scripts
 */

(function (window) {
  const { document, location } = window
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

  // // cover
  // qs('.site-cover') || document.body.classList.add('no-cover')

  // search
  const searchElement = qs('#search_input')
  if (searchElement) {
    loadScript('https://unpkg.com/ghost-search/dist/ghost-search.js', () => {
      const resultElement = document.createElement('div')
      resultElement.id = 'search_result'
      resultElement.className = 'dropdown-menu dropdown-menu-right'
      resultElement.innerHTML = `<span class="dropdown-item disabled">${searchElement.placeholder}...</span>`
      searchElement.parentElement.classList.add('dropdown')
      searchElement.parentElement.appendChild(resultElement)

      /* eslint-disable no-new */
      new window.GhostSearch({
        input: '#search_input',
        results: '#search_result',
        template: item => `<a class="dropdown-item" href="${item.url}">${item.title}</a>`,
        api: {
          parameters: {
            fields: ['url', 'title']
          }
        },
        on: {
          afterDisplay: results => {
            if (results.total !== 0) return false
            if (!searchElement.value) return false
            resultElement.innerHTML = `<span class="dropdown-item disabled">No results</span>`
          }
        }
      })
    })
  }

  // lazyload
  if (qs('.post-card [data-src]')) {
    loadScript('https://unpkg.com/vanilla-lazyload', () => {
      window.lazyloader = new window.LazyLoad({
        elements_selector: '.post-card [data-src]'
      })
    })
  }

  // prismjs loader
  const codeElements = qsa('.post-content pre code')
  if (codeElements.length) {
    // code card polyfill
    codeElements.forEach(item => {
      if (item.classList.length) return
      item.classList.add('language-basic')
    })

    loadStyle('https://unpkg.com/prismjs/themes/prism-okaidia.css')
    loadScript('https://unpkg.com/prismjs/prism.js')
  }

  // gallery flex
  qsa('.kg-gallery-image img').forEach(item => {
    const container = item.closest('.kg-gallery-image')
    const width = item.attributes.width.value
    const height = item.attributes.height.value
    const ratio = width / height
    container.style.flex = ratio + ' 1 0%'
  })

  // gallery preview
  const galleryElements = qsa('.kg-gallery-container')
  if (galleryElements.length) {
    loadStyle('https://unpkg.com/lightgallery.js/dist/css/lightgallery.min.css')
    loadScript('https://unpkg.com/lightgallery.js/dist/js/lightgallery.js', () => {
      galleryElements.forEach(item => {
        item.querySelectorAll('.kg-gallery-image').forEach(sub => {
          sub.dataset.src = sub.children[0].src
        })
        window.lightGallery(item, { selector: '.kg-gallery-image' })
      })
    })
  }

  // post share
  qsa('.post-share a').forEach(item => item.addEventListener('click', e => {
    window.open(this.href, 'share-window', 'width=640,height=360')
    e.preventDefault()
  }))

  // subscribe form hiddens
  qsa('input[name=location]').forEach(item => { item.value = item.value || location.href })
  qsa('input[name=referrer]').forEach(item => { item.value = item.value || document.referrer })

  // site preloader
  const loader = qs('.site-preloader')
  if (loader) {
    // loader.addEventListener('transitionend', () => {
    //   loader.parentElement.removeChild(loader)
    // })
    loader.style.opacity = 0
    setTimeout(() => loader.parentElement.removeChild(loader), 1000)
  }
})(window)
