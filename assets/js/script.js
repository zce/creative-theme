const setup = () => {
  const qs = document.querySelector.bind(document)
  const qsa = document.querySelectorAll.bind(document)

  // function loadStyle (href) {
  //   const linkElement = document.createElement('link')
  //   linkElement.rel = 'stylesheet'
  //   linkElement.href = href
  //   document.head.appendChild(linkElement)
  // }

  function loadScript (src, callback) {
    const scriptElement = document.createElement('script')
    scriptElement.src = src
    callback && scriptElement.addEventListener('load', callback)
    document.body.appendChild(scriptElement)
  }

  // search
  // -----------------------------------------------------------------------------
  const inputElement = qs('#search_input')
  if (inputElement) {
    loadScript('https://unpkg.com/@tryghost/content-api@1.2.1/umd/content-api.min.js', () => {
      loadScript('https://unpkg.com/ghost-search@1.0.1/dist/ghost-search.min.js', () => {
        const resultElement = document.createElement('div')
        resultElement.id = 'search_result'
        resultElement.className = 'dropdown-menu dropdown-menu-right'
        resultElement.innerHTML = `<span class="dropdown-item disabled">${inputElement.placeholder}</span>`
        inputElement.parentElement.classList.add('dropdown')
        inputElement.parentElement.appendChild(resultElement)

        /* eslint-disable no-new */
        new window.GhostSearch({
          host: window.location.origin,
          key: '72e50cdab47d696e88d20aca0c',
          input: '#search_input',
          results: '#search_result',
          template: i => `<a class="dropdown-item" href="${i.url}">${i.title}</a>`,
          api: {
            resource: 'posts',
            parameters: { fields: ['url', 'title'] }
          },
          on: {
            afterDisplay: results => {
              if (results.total !== 0) return false
              if (!inputElement.value) return false
              resultElement.innerHTML = `<span class="dropdown-item disabled">${inputElement.dataset.empty}</span>`
            }
          }
        })
      })
    })
  }

  // img lazyload
  // -----------------------------------------------------------------------------
  if (qs('.post-card [data-src]')) {
    loadScript('https://unpkg.com/vanilla-lazyload@12.0.0-beta.0/dist/lazyload.min.js', () => {
      window.lazyloader = new window.LazyLoad({
        elements_selector: '.post-card [data-src]'
      })
    })
  }

  // highlight prismjs
  // -----------------------------------------------------------------------------
  const codeElements = qsa('.post-content pre code')
  if (codeElements.length) {
    // // code card polyfill
    // codeElements.forEach(item => {
    //   item.classList.length || item.classList.add('language-none')
    // })

    // loadStyle('https://unpkg.com/prismjs@1.15.0/themes/prism-okaidia.css')
    loadScript('https://unpkg.com/prismjs@1.16.0/prism.js')
  }

  // gallery
  // -----------------------------------------------------------------------------

  // flex
  qsa('.kg-gallery-image > img').forEach(item => {
    const container = item.closest('.kg-gallery-image')
    const width = item.attributes.width.value
    const height = item.attributes.height.value
    const ratio = width / height
    container.style.flex = ratio + ' 1 0%'
  })

  // // lightbox
  // const galleryContainers = qsa('.kg-gallery-container')
  // if (galleryContainers.length) {
  //   loadStyle('https://unpkg.com/lightgallery.js@1.1.2/dist/css/lightgallery.min.css')
  //   loadScript('https://unpkg.com/lightgallery.js@1.1.2/dist/js/lightgallery.min.js', () => {
  //     galleryContainers.forEach(item => {
  //       item.querySelectorAll('.kg-gallery-image').forEach(sub => {
  //         sub.dataset.src = sub.children[0].src
  //       })
  //       window.lightGallery(item, { selector: '.kg-gallery-image' })
  //     })
  //   })
  // }

  // medium-zoom
  const galleryContainers = qsa('.kg-gallery-container')
  if (galleryContainers.length) {
    loadScript('https://unpkg.com/medium-zoom@1.0.4/dist/medium-zoom.min.js', () => {
      // https://github.com/francoischalifour/medium-zoom#api
      window.mediumZoom('.kg-gallery-image > img', {
        margin: 20,
        background: '#000'
      })
    })
  }

  // TODO: post share
  // -----------------------------------------------------------------------------
  qsa('.post-share a').forEach(item => item.addEventListener('click', e => {
    const width = 640
    const height = 400

    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

    const containerWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width
    const containerHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height

    const left = ((containerWidth / 2) - (width / 2)) + dualScreenLeft
    const top = ((containerHeight / 2) - (height / 2)) + dualScreenTop
    const newWindow = window.open(e.currentTarget.href, 'share-window', `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`)

    // Puts focus on the newWindow
    window.focus && newWindow.focus()

    e.preventDefault()
  }))

  // subscribe hidden form value
  // -----------------------------------------------------------------------------
  qsa('input[name=location]').forEach(item => { item.value = item.value || window.location.href })
  qsa('input[name=referrer]').forEach(item => { item.value = item.value || document.referrer })

  // site preloader
  // -----------------------------------------------------------------------------
  const spinner = qs('.site-spinner')
  if (spinner) {
    // remove loader spinner
    spinner.style.opacity = 0
    setTimeout(() => spinner.parentElement.removeChild(spinner), 500)
  }

  // pjax
  // -----------------------------------------------------------------------------
  // // https://unpkg.com/jquery-pjax@2.0.1/jquery.pjax.js
  // $(document).pjax('a[href]', 'body', { fragment: 'body' })
  // qsa('a[href]').forEach(item => item.addEventListener('click', e => {
  //   const url = e.currentTarget.href
  //   if (url === window.location.href) return

  //   const xhr = new window.XMLHttpRequest()
  //   xhr.responseType = 'document'

  //   xhr.addEventListener('load', () => {
  //     const res = xhr.response
  //     window.history.pushState(null, document.title, url)
  //     document.head.innerHTML = ''
  //     res.querySelectorAll('head > *').forEach(item => {
  //       document.head.appendChild(item)
  //     })
  //     document.body = res.querySelector('body')
  //     setup()
  //   })

  //   xhr.open('GET', url)
  //   xhr.send(null)

  //   e.preventDefault()
  // }))
}

window.addEventListener('load', setup)
