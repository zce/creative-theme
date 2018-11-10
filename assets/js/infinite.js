/**
 * Infinite Scroll
 */

(function (window, document) {
  // next link element
  const nextElement = document.querySelector('link[rel=next]')
  if (!nextElement) return

  // post feed element
  const feedElement = document.querySelector('.post-feed')
  if (!feedElement) return

  // pagination element
  const paginationElement = document.querySelector('.pagination')
  if (!paginationElement) return

  const buffer = 300

  let ticking = false
  let loading = false

  let lastScrollY = window.scrollY
  let lastWindowHeight = window.innerHeight
  let lastDocumentHeight = document.documentElement.scrollHeight

  function appendContent () {
    if (this.status === 404) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      return
    }

    // // https://github.com/TryGhost/Casper/commit/41bcbb71570db0f829a2f0f1b5549f380d38d36a
    // document.createRange().createContextualFragment(this.responseText)
    // window.LazyLoad && new window.LazyLoad({ elements_selector: '[data-src]' })

    // append contents
    const postElements = this.response.querySelectorAll('.post-card')
    postElements.forEach(item => feedElement.appendChild(item))
    window.lazyloader && window.lazyloader.update()

    // append new pagination
    const newPaginationElement = this.response.querySelector('.pagination')
    paginationElement.innerHTML = newPaginationElement.innerHTML

    // push state
    window.history.pushState(null, document.title, nextElement.href)

    // change title
    document.title = this.response.title

    // set next link
    const newNextElement = this.response.querySelector('link[rel=next]')
    if (newNextElement) {
      nextElement.href = newNextElement.href
    } else {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }

    // sync status
    lastDocumentHeight = document.documentElement.scrollHeight
    ticking = false
    loading = false
  }

  function update () {
    // return if already loading
    if (loading) return

    // return if not scroll to the bottom
    if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
      ticking = false
      return
    }

    loading = true

    const xhr = new window.XMLHttpRequest()
    xhr.responseType = 'document'

    xhr.addEventListener('load', appendContent)

    xhr.open('GET', nextElement.href)
    xhr.send(null)
  }

  function requestTick () {
    ticking || window.requestAnimationFrame(update)
    ticking = true
  }

  function onScroll () {
    lastScrollY = window.scrollY
    requestTick()
  }

  function onResize () {
    lastWindowHeight = window.innerHeight
    lastDocumentHeight = document.documentElement.scrollHeight
    requestTick()
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)

  requestTick()
})(window, document)
