"use strict";

var setup = function setup() {
  var qs = document.querySelector.bind(document);
  var qsa = document.querySelectorAll.bind(document); // function loadStyle (href) {
  //   const linkElement = document.createElement('link')
  //   linkElement.rel = 'stylesheet'
  //   linkElement.href = href
  //   document.head.appendChild(linkElement)
  // }

  function loadScript(src, callback) {
    var scriptElement = document.createElement('script');
    scriptElement.src = src;
    callback && scriptElement.addEventListener('load', callback);
    document.body.appendChild(scriptElement);
  } // search
  // -----------------------------------------------------------------------------


  var inputElement = qs('#search_input');

  if (inputElement) {
    loadScript('https://unpkg.com/ghost-search', function () {
      var resultElement = document.createElement('div');
      resultElement.id = 'search_result';
      resultElement.className = 'dropdown-menu dropdown-menu-right';
      resultElement.innerHTML = "<span class=\"dropdown-item disabled\">".concat(inputElement.placeholder, "</span>");
      inputElement.parentElement.classList.add('dropdown');
      inputElement.parentElement.appendChild(resultElement);
      /* eslint-disable no-new */

      new window.GhostSearch({
        input: '#search_input',
        results: '#search_result',
        template: function template(i) {
          return "<a class=\"dropdown-item\" href=\"".concat(i.url, "\">").concat(i.title, "</a>");
        },
        api: {
          parameters: {
            fields: ['url', 'title']
          }
        },
        on: {
          afterDisplay: function afterDisplay(results) {
            if (results.total !== 0) return false;
            if (!inputElement.value) return false;
            resultElement.innerHTML = "<span class=\"dropdown-item disabled\">".concat(inputElement.dataset['empty'], "</span>");
          }
        }
      });
    });
  } // img lazyload
  // -----------------------------------------------------------------------------


  if (qs('.post-card [data-src]')) {
    loadScript('https://unpkg.com/vanilla-lazyload@8.17.0/dist/lazyload.min.js', function () {
      window.lazyloader = new window.LazyLoad({
        elements_selector: '.post-card [data-src]'
      });
    });
  } // highlight prismjs
  // -----------------------------------------------------------------------------


  var codeElements = qsa('.post-content pre code');

  if (codeElements.length) {
    // // code card polyfill
    // codeElements.forEach(item => {
    //   item.classList.length || item.classList.add('language-none')
    // })
    // loadStyle('https://unpkg.com/prismjs@1.15.0/themes/prism-okaidia.css')
    loadScript('https://unpkg.com/prismjs@1.15.0/prism.js');
  } // gallery
  // -----------------------------------------------------------------------------
  // flex


  qsa('.kg-gallery-image > img').forEach(function (item) {
    var container = item.closest('.kg-gallery-image');
    var width = item.attributes.width.value;
    var height = item.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  }); // // lightbox
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

  var galleryContainers = qsa('.kg-gallery-container');

  if (galleryContainers.length) {
    loadScript('https://unpkg.com/medium-zoom@1.0.2/dist/medium-zoom.min.js', function () {
      // https://github.com/francoischalifour/medium-zoom#api
      window.mediumZoom('.kg-gallery-image > img', {
        margin: 20,
        background: '#000'
      });
    });
  } // TODO: post share
  // -----------------------------------------------------------------------------


  qsa('.post-share a').forEach(function (item) {
    return item.addEventListener('click', function (e) {
      var width = 640;
      var height = 400;
      var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
      var containerWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
      var containerHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
      var left = containerWidth / 2 - width / 2 + dualScreenLeft;
      var top = containerHeight / 2 - height / 2 + dualScreenTop;
      var newWindow = window.open(e.currentTarget.href, 'share-window', "scrollbars=yes, width=".concat(width, ", height=").concat(height, ", top=").concat(top, ", left=").concat(left)); // Puts focus on the newWindow

      window.focus && newWindow.focus();
      e.preventDefault();
    });
  }); // subscribe hidden form value
  // -----------------------------------------------------------------------------

  qsa('input[name=location]').forEach(function (item) {
    item.value = item.value || window.location.href;
  });
  qsa('input[name=referrer]').forEach(function (item) {
    item.value = item.value || document.referrer;
  }); // site preloader
  // -----------------------------------------------------------------------------

  var spinner = qs('.site-spinner');

  if (spinner) {
    // remove loader spinner
    spinner.style.opacity = 0;
    setTimeout(function () {
      return spinner.parentElement.removeChild(spinner);
    }, 500);
  } // pjax
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

};

window.addEventListener('load', setup);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJzZXR1cCIsInFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsInFzYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkU2NyaXB0Iiwic3JjIiwiY2FsbGJhY2siLCJzY3JpcHRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJpbnB1dEVsZW1lbnQiLCJyZXN1bHRFbGVtZW50IiwiaWQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJwbGFjZWhvbGRlciIsInBhcmVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aW5kb3ciLCJHaG9zdFNlYXJjaCIsImlucHV0IiwicmVzdWx0cyIsInRlbXBsYXRlIiwiaSIsInVybCIsInRpdGxlIiwiYXBpIiwicGFyYW1ldGVycyIsImZpZWxkcyIsIm9uIiwiYWZ0ZXJEaXNwbGF5IiwidG90YWwiLCJ2YWx1ZSIsImRhdGFzZXQiLCJsYXp5bG9hZGVyIiwiTGF6eUxvYWQiLCJlbGVtZW50c19zZWxlY3RvciIsImNvZGVFbGVtZW50cyIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwiY29udGFpbmVyIiwiY2xvc2VzdCIsIndpZHRoIiwiYXR0cmlidXRlcyIsImhlaWdodCIsInJhdGlvIiwic3R5bGUiLCJmbGV4IiwiZ2FsbGVyeUNvbnRhaW5lcnMiLCJtZWRpdW1ab29tIiwibWFyZ2luIiwiYmFja2dyb3VuZCIsImUiLCJkdWFsU2NyZWVuTGVmdCIsInNjcmVlbkxlZnQiLCJ1bmRlZmluZWQiLCJzY3JlZW5YIiwiZHVhbFNjcmVlblRvcCIsInNjcmVlblRvcCIsInNjcmVlblkiLCJjb250YWluZXJXaWR0aCIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsInNjcmVlbiIsImNvbnRhaW5lckhlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwibGVmdCIsInRvcCIsIm5ld1dpbmRvdyIsIm9wZW4iLCJjdXJyZW50VGFyZ2V0IiwiaHJlZiIsImZvY3VzIiwicHJldmVudERlZmF1bHQiLCJsb2NhdGlvbiIsInJlZmVycmVyIiwic3Bpbm5lciIsIm9wYWNpdHkiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBTTtBQUNsQixNQUFNQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBNEJGLFFBQTVCLENBQVg7QUFDQSxNQUFNRyxHQUFHLEdBQUdILFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEJGLElBQTFCLENBQStCRixRQUEvQixDQUFaLENBRmtCLENBSWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFTSyxVQUFULENBQXFCQyxHQUFyQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDbEMsUUFBTUMsYUFBYSxHQUFHUixRQUFRLENBQUNTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7QUFDQUQsSUFBQUEsYUFBYSxDQUFDRixHQUFkLEdBQW9CQSxHQUFwQjtBQUNBQyxJQUFBQSxRQUFRLElBQUlDLGFBQWEsQ0FBQ0UsZ0JBQWQsQ0FBK0IsTUFBL0IsRUFBdUNILFFBQXZDLENBQVo7QUFDQVAsSUFBQUEsUUFBUSxDQUFDVyxJQUFULENBQWNDLFdBQWQsQ0FBMEJKLGFBQTFCO0FBQ0QsR0FoQmlCLENBa0JsQjtBQUNBOzs7QUFDQSxNQUFNSyxZQUFZLEdBQUdkLEVBQUUsQ0FBQyxlQUFELENBQXZCOztBQUNBLE1BQUljLFlBQUosRUFBa0I7QUFDaEJSLElBQUFBLFVBQVUsQ0FBQyxnQ0FBRCxFQUFtQyxZQUFNO0FBQ2pELFVBQU1TLGFBQWEsR0FBR2QsUUFBUSxDQUFDUyxhQUFULENBQXVCLEtBQXZCLENBQXRCO0FBQ0FLLE1BQUFBLGFBQWEsQ0FBQ0MsRUFBZCxHQUFtQixlQUFuQjtBQUNBRCxNQUFBQSxhQUFhLENBQUNFLFNB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d0IsQ0FBeEI7QUFDQUMsSUFBQUEsVUFBVSxDQUFDO0FBQUEsYUFBTUYsT0FBTyxDQUFDaEUsYUFBUixDQUFzQm1FLFdBQXRCLENBQWtDSCxPQUFsQyxDQUFOO0FBQUEsS0FBRCxFQUFtRCxHQUFuRCxDQUFWO0FBQ0QsR0FoSmlCLENBa0psQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOztBQUNELENBN0tEOztBQStLQTdELE1BQU0sQ0FBQ1osZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NaLEtBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gIGNvbnN0IHFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxuICBjb25zdCBxc2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpXG5cbiAgLy8gZnVuY3Rpb24gbG9hZFN0eWxlIChocmVmKSB7XG4gIC8vICAgY29uc3QgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgLy8gICBsaW5rRWxlbWVudC5yZWwgPSAnc3R5bGVzaGVldCdcbiAgLy8gICBsaW5rRWxlbWVudC5ocmVmID0gaHJlZlxuICAvLyAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpXG4gIC8vIH1cblxuICBmdW5jdGlvbiBsb2FkU2NyaXB0IChzcmMsIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcbiAgICBjYWxsYmFjayAmJiBzY3JpcHRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjYWxsYmFjaylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpXG4gIH1cblxuICAvLyBzZWFyY2hcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgaW5wdXRFbGVtZW50ID0gcXMoJyNzZWFyY2hfaW5wdXQnKVxuICBpZiAoaW5wdXRFbGVtZW50KSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vZ2hvc3Qtc2VhcmNoJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICByZXN1bHRFbGVtZW50LmlkID0gJ3NlYXJjaF9yZXN1bHQnXG4gICAgICByZXN1bHRFbGVtZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQnXG4gICAgICByZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW0gZGlzYWJsZWRcIj4ke2lucHV0RWxlbWVudC5wbGFjZWhvbGRlcn08L3NwYW4+YFxuICAgICAgaW5wdXRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24nKVxuICAgICAgaW5wdXRFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQocmVzdWx0RWxlbWVudClcblxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tbmV3ICovXG4gICAgICBuZXcgd2luZG93Lkdob3N0U2VhcmNoKHtcbiAgICAgICAgaW5wdXQ6ICcjc2VhcmNoX2lucHV0JyxcbiAgICAgICAgcmVzdWx0czogJyNzZWFyY2hfcmVzdWx0JyxcbiAgICAgICAgdGVtcGxhdGU6IGkgPT4gYDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIke2kudXJsfVwiPiR7aS50aXRsZX08L2E+YCxcbiAgICAgICAgYXBpOiB7XG4gICAgICAgICAgcGFyYW1ldGVyczogeyBmaWVsZHM6IFsndXJsJywgJ3RpdGxlJ10gfVxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGFmdGVyRGlzcGxheTogcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0cy50b3RhbCAhPT0gMCkgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiAoIWlucHV0RWxlbWVudC52YWx1ZSkgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICByZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW0gZGlzYWJsZWRcIj4ke2lucHV0RWxlbWVudC5kYXRhc2V0WydlbXB0eSddfTwvc3Bhbj5gXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBpbWcgbGF6eWxvYWRcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgaWYgKHFzKCcucG9zdC1jYXJkIFtkYXRhLXNyY10nKSkge1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL3ZhbmlsbGEtbGF6eWxvYWRAOC4xNy4wL2Rpc3QvbGF6eWxvYWQubWluLmpzJywgKCkgPT4ge1xuICAgICAgd2luZG93Lmxhenlsb2FkZXIgPSBuZXcgd2luZG93LkxhenlMb2FkKHtcbiAgICAgICAgZWxlbWVudHNfc2VsZWN0b3I6ICcucG9zdC1jYXJkIFtkYXRhLXNyY10nXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBoaWdobGlnaHQgcHJpc21qc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBjb2RlRWxlbWVudHMgPSBxc2EoJy5wb3N0LWNvbnRlbnQgcHJlIGNvZGUnKVxuICBpZiAoY29kZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgIC8vIC8vIGNvZGUgY2FyZCBwb2x5ZmlsbFxuICAgIC8vIGNvZGVFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vICAgaXRlbS5jbGFzc0xpc3QubGVuZ3RoIHx8IGl0ZW0uY2xhc3NMaXN0LmFkZCgnbGFuZ3VhZ2Utbm9uZScpXG4gICAgLy8gfSlcblxuICAgIC8vIGxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vcHJpc21qc0AxLjE1LjAvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzJylcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9wcmlzbWpzQDEuMTUuMC9wcmlzbS5qcycpXG4gIH1cblxuICAvLyBnYWxsZXJ5XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gZmxleFxuICBxc2EoJy5rZy1nYWxsZXJ5LWltYWdlID4gaW1nJykuZm9yRWFjaChpdGVtID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBpdGVtLmNsb3Nlc3QoJy5rZy1nYWxsZXJ5LWltYWdlJylcbiAgICBjb25zdCB3aWR0aCA9IGl0ZW0uYXR0cmlidXRlcy53aWR0aC52YWx1ZVxuICAgIGNvbnN0IGhlaWdodCA9IGl0ZW0uYXR0cmlidXRlcy5oZWlnaHQudmFsdWVcbiAgICBjb25zdCByYXRpbyA9IHdpZHRoIC8gaGVpZ2h0XG4gICAgY29udGFpbmVyLnN0eWxlLmZsZXggPSByYXRpbyArICcgMSAwJSdcbiAgfSlcblxuICAvLyAvLyBsaWdodGJveFxuICAvLyBjb25zdCBnYWxsZXJ5Q29udGFpbmVycyA9IHFzYSgnLmtnLWdhbGxlcnktY29udGFpbmVyJylcbiAgLy8gaWYgKGdhbGxlcnlDb250YWluZXJzLmxlbmd0aCkge1xuICAvLyAgIGxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vbGlnaHRnYWxsZXJ5LmpzQDEuMS4yL2Rpc3QvY3NzL2xpZ2h0Z2FsbGVyeS5taW4uY3NzJylcbiAgLy8gICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9saWdodGdhbGxlcnkuanNAMS4xLjIvZGlzdC9qcy9saWdodGdhbGxlcnkubWluLmpzJywgKCkgPT4ge1xuICAvLyAgICAgZ2FsbGVyeUNvbnRhaW5lcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgLy8gICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcua2ctZ2FsbGVyeS1pbWFnZScpLmZvckVhY2goc3ViID0+IHtcbiAgLy8gICAgICAgICBzdWIuZGF0YXNldC5zcmMgPSBzdWIuY2hpbGRyZW5bMF0uc3JjXG4gIC8vICAgICAgIH0pXG4gIC8vICAgICAgIHdpbmRvdy5saWdodEdhbGxlcnkoaXRlbSwgeyBzZWxlY3RvcjogJy5rZy1nYWxsZXJ5LWltYWdlJyB9KVxuICAvLyAgICAgfSlcbiAgLy8gICB9KVxuICAvLyB9XG5cbiAgLy8gbWVkaXVtLXpvb21cbiAgY29uc3QgZ2FsbGVyeUNvbnRhaW5lcnMgPSBxc2EoJy5rZy1nYWxsZXJ5LWNvbnRhaW5lcicpXG4gIGlmIChnYWxsZXJ5Q29udGFpbmVycy5sZW5ndGgpIHtcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9tZWRpdW0tem9vbUAxLjAuMi9kaXN0L21lZGl1bS16b29tLm1pbi5qcycsICgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mcmFuY29pc2NoYWxpZm91ci9tZWRpdW0tem9vbSNhcGlcbiAgICAgIHdpbmRvdy5tZWRpdW1ab29tKCcua2ctZ2FsbGVyeS1pbWFnZSA+IGltZycsIHtcbiAgICAgICAgbWFyZ2luOiAyMCxcbiAgICAgICAgYmFja2dyb3VuZDogJyMwMDAnXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBUT0RPOiBwb3N0IHNoYXJlXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHFzYSgnLnBvc3Qtc2hhcmUgYScpLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSA2NDBcbiAgICBjb25zdCBoZWlnaHQgPSA0MDBcblxuICAgIGNvbnN0IGR1YWxTY3JlZW5MZWZ0ID0gd2luZG93LnNjcmVlbkxlZnQgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5MZWZ0IDogd2luZG93LnNjcmVlblhcbiAgICBjb25zdCBkdWFsU2NyZWVuVG9wID0gd2luZG93LnNjcmVlblRvcCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlblRvcCA6IHdpbmRvdy5zY3JlZW5ZXG5cbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoID8gd2luZG93LmlubmVyV2lkdGggOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiB3aW5kb3cuc2NyZWVuLndpZHRoXG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgOiB3aW5kb3cuc2NyZWVuLmhlaWdodFxuXG4gICAgY29uc3QgbGVmdCA9ICgoY29udGFpbmVyV2lkdGggLyAyKSAtICh3aWR0aCAvIDIpKSArIGR1YWxTY3JlZW5MZWZ0XG4gICAgY29uc3QgdG9wID0gKChjb250YWluZXJIZWlnaHQgLyAyKSAtIChoZWlnaHQgLyAyKSkgKyBkdWFsU2NyZWVuVG9wXG4gICAgY29uc3QgbmV3V2luZG93ID0gd2luZG93Lm9wZW4oZS5jdXJyZW50VGFyZ2V0LmhyZWYsICdzaGFyZS13aW5kb3cnLCBgc2Nyb2xsYmFycz15ZXMsIHdpZHRoPSR7d2lkdGh9LCBoZWlnaHQ9JHtoZWlnaHR9LCB0b3A9JHt0b3B9LCBsZWZ0PSR7bGVmdH1gKVxuXG4gICAgLy8gUHV0cyBmb2N1cyBvbiB0aGUgbmV3V2luZG93XG4gICAgd2luZG93LmZvY3VzICYmIG5ld1dpbmRvdy5mb2N1cygpXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfSkpXG5cbiAgLy8gc3Vic2NyaWJlIGhpZGRlbiBmb3JtIHZhbHVlXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHFzYSgnaW5wdXRbbmFtZT1sb2NhdGlvbl0nKS5mb3JFYWNoKGl0ZW0gPT4geyBpdGVtLnZhbHVlID0gaXRlbS52YWx1ZSB8fCB3aW5kb3cubG9jYXRpb24uaHJlZiB9KVxuICBxc2EoJ2lucHV0W25hbWU9cmVmZXJyZXJdJykuZm9yRWFjaChpdGVtID0+IHsgaXRlbS52YWx1ZSA9IGl0ZW0udmFsdWUgfHwgZG9jdW1lbnQucmVmZXJyZXIgfSlcblxuICAvLyBzaXRlIHByZWxvYWRlclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBzcGlubmVyID0gcXMoJy5zaXRlLXNwaW5uZXInKVxuICBpZiAoc3Bpbm5lcikge1xuICAgIC8vIHJlbW92ZSBsb2FkZXIgc3Bpbm5lclxuICAgIHNwaW5uZXIuc3R5bGUub3BhY2l0eSA9IDBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNwaW5uZXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChzcGlubmVyKSwgNTAwKVxuICB9XG5cbiAgLy8gcGpheFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAvLyBodHRwczovL3VucGtnLmNvbS9qcXVlcnktcGpheEAyLjAuMS9qcXVlcnkucGpheC5qc1xuICAvLyAkKGRvY3VtZW50KS5wamF4KCdhW2hyZWZdJywgJ2JvZHknLCB7IGZyYWdtZW50OiAnYm9keScgfSlcbiAgLy8gcXNhKCdhW2hyZWZdJykuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgLy8gICBjb25zdCB1cmwgPSBlLmN1cnJlbnRUYXJnZXQuaHJlZlxuICAvLyAgIGlmICh1cmwgPT09IHdpbmRvdy5sb2NhdGlvbi5ocmVmKSByZXR1cm5cblxuICAvLyAgIGNvbnN0IHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAvLyAgIHhoci5yZXNwb25zZVR5cGUgPSAnZG9jdW1lbnQnXG5cbiAgLy8gICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgLy8gICAgIGNvbnN0IHJlcyA9IHhoci5yZXNwb25zZVxuICAvLyAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB1cmwpXG4gIC8vICAgICBkb2N1bWVudC5oZWFkLmlubmVySFRNTCA9ICcnXG4gIC8vICAgICByZXMucXVlcnlTZWxlY3RvckFsbCgnaGVhZCA+IConKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAvLyAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGl0ZW0pXG4gIC8vICAgICB9KVxuICAvLyAgICAgZG9jdW1lbnQuYm9keSA9IHJlcy5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgLy8gICAgIHNldHVwKClcbiAgLy8gICB9KVxuXG4gIC8vICAgeGhyLm9wZW4oJ0dFVCcsIHVybClcbiAgLy8gICB4aHIuc2VuZChudWxsKVxuXG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vIH0pKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNldHVwKVxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
