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
    loadScript('https://unpkg.com/ghost-search@1.0.0/dist/ghost-search.min.js', function () {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJzZXR1cCIsInFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsInFzYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkU2NyaXB0Iiwic3JjIiwiY2FsbGJhY2siLCJzY3JpcHRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJpbnB1dEVsZW1lbnQiLCJyZXN1bHRFbGVtZW50IiwiaWQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJwbGFjZWhvbGRlciIsInBhcmVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aW5kb3ciLCJHaG9zdFNlYXJjaCIsImlucHV0IiwicmVzdWx0cyIsInRlbXBsYXRlIiwiaSIsInVybCIsInRpdGxlIiwiYXBpIiwicGFyYW1ldGVycyIsImZpZWxkcyIsIm9uIiwiYWZ0ZXJEaXNwbGF5IiwidG90YWwiLCJ2YWx1ZSIsImRhdGFzZXQiLCJsYXp5bG9hZGVyIiwiTGF6eUxvYWQiLCJlbGVtZW50c19zZWxlY3RvciIsImNvZGVFbGVtZW50cyIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwiY29udGFpbmVyIiwiY2xvc2VzdCIsIndpZHRoIiwiYXR0cmlidXRlcyIsImhlaWdodCIsInJhdGlvIiwic3R5bGUiLCJmbGV4IiwiZ2FsbGVyeUNvbnRhaW5lcnMiLCJtZWRpdW1ab29tIiwibWFyZ2luIiwiYmFja2dyb3VuZCIsImUiLCJkdWFsU2NyZWVuTGVmdCIsInNjcmVlbkxlZnQiLCJ1bmRlZmluZWQiLCJzY3JlZW5YIiwiZHVhbFNjcmVlblRvcCIsInNjcmVlblRvcCIsInNjcmVlblkiLCJjb250YWluZXJXaWR0aCIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsInNjcmVlbiIsImNvbnRhaW5lckhlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwibGVmdCIsInRvcCIsIm5ld1dpbmRvdyIsIm9wZW4iLCJjdXJyZW50VGFyZ2V0IiwiaHJlZiIsImZvY3VzIiwicHJldmVudERlZmF1bHQiLCJsb2NhdGlvbiIsInJlZmVycmVyIiwic3Bpbm5lciIsIm9wYWNpdHkiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBTTtBQUNsQixNQUFNQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBNEJGLFFBQTVCLENBQVg7QUFDQSxNQUFNRyxHQUFHLEdBQUdILFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEJGLElBQTFCLENBQStCRixRQUEvQixDQUFaLENBRmtCLENBSWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFTSyxVQUFULENBQXFCQyxHQUFyQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDbEMsUUFBTUMsYUFBYSxHQUFHUixRQUFRLENBQUNTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7QUFDQUQsSUFBQUEsYUFBYSxDQUFDRixHQUFkLEdBQW9CQSxHQUFwQjtBQUNBQyxJQUFBQSxRQUFRLElBQUlDLGFBQWEsQ0FBQ0UsZ0JBQWQsQ0FBK0IsTUFBL0IsRUFBdUNILFFBQXZDLENBQVo7QUFDQVAsSUFBQUEsUUFBUSxDQUFDVyxJQUFULENBQWNDLFdBQWQsQ0FBMEJKLGFBQTFCO0FBQ0QsR0FoQmlCLENBa0JsQjtBQUNBOzs7QUFDQSxNQUFNSyxZQUFZLEdBQUdkLEVBQUUsQ0FBQyxlQUFELENBQXZCOztBQUNBLE1BQUljLFlBQUosRUFBa0I7QUFDaEJSLElBQUFBLFVBQVUsQ0FBQywrREFBRCxFQUFrRSxZQUFNO0FBQ2hGLFVBQU1TLGFBQWEsR0FBR2QsUUFBUSxDQUFDUyxhQUFULENBQXVCLEtBQXZCLENBQXRCO0FBQ0FLLE1BQUFBLGFBQWEsQ0FBQ0MsRUFBZCxHQUFtQixlQUFuQjtBQUNBRCxNQUFBQSxhQUFhLENBQUNFLFNB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d0IsQ0FBeEI7QUFDQUMsSUFBQUEsVUFBVSxDQUFDO0FBQUEsYUFBTUYsT0FBTyxDQUFDaEUsYUFBUixDQUFzQm1FLFdBQXRCLENBQWtDSCxPQUFsQyxDQUFOO0FBQUEsS0FBRCxFQUFtRCxHQUFuRCxDQUFWO0FBQ0QsR0FoSmlCLENBa0psQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOztBQUNELENBN0tEOztBQStLQTdELE1BQU0sQ0FBQ1osZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NaLEtBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gIGNvbnN0IHFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxuICBjb25zdCBxc2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpXG5cbiAgLy8gZnVuY3Rpb24gbG9hZFN0eWxlIChocmVmKSB7XG4gIC8vICAgY29uc3QgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgLy8gICBsaW5rRWxlbWVudC5yZWwgPSAnc3R5bGVzaGVldCdcbiAgLy8gICBsaW5rRWxlbWVudC5ocmVmID0gaHJlZlxuICAvLyAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpXG4gIC8vIH1cblxuICBmdW5jdGlvbiBsb2FkU2NyaXB0IChzcmMsIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcbiAgICBjYWxsYmFjayAmJiBzY3JpcHRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjYWxsYmFjaylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpXG4gIH1cblxuICAvLyBzZWFyY2hcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgaW5wdXRFbGVtZW50ID0gcXMoJyNzZWFyY2hfaW5wdXQnKVxuICBpZiAoaW5wdXRFbGVtZW50KSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vZ2hvc3Qtc2VhcmNoQDEuMC4wL2Rpc3QvZ2hvc3Qtc2VhcmNoLm1pbi5qcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcmVzdWx0RWxlbWVudC5pZCA9ICdzZWFyY2hfcmVzdWx0J1xuICAgICAgcmVzdWx0RWxlbWVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0J1xuICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQucGxhY2Vob2xkZXJ9PC9zcGFuPmBcbiAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duJylcbiAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHJlc3VsdEVsZW1lbnQpXG5cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xuICAgICAgbmV3IHdpbmRvdy5HaG9zdFNlYXJjaCh7XG4gICAgICAgIGlucHV0OiAnI3NlYXJjaF9pbnB1dCcsXG4gICAgICAgIHJlc3VsdHM6ICcjc2VhcmNoX3Jlc3VsdCcsXG4gICAgICAgIHRlbXBsYXRlOiBpID0+IGA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiJHtpLnVybH1cIj4ke2kudGl0bGV9PC9hPmAsXG4gICAgICAgIGFwaToge1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgZmllbGRzOiBbJ3VybCcsICd0aXRsZSddIH1cbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBhZnRlckRpc3BsYXk6IHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdHMudG90YWwgIT09IDApIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsdWUpIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQuZGF0YXNldFsnZW1wdHknXX08L3NwYW4+YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gaW1nIGxhenlsb2FkXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGlmIChxcygnLnBvc3QtY2FyZCBbZGF0YS1zcmNdJykpIHtcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS92YW5pbGxhLWxhenlsb2FkQDguMTcuMC9kaXN0L2xhenlsb2FkLm1pbi5qcycsICgpID0+IHtcbiAgICAgIHdpbmRvdy5sYXp5bG9hZGVyID0gbmV3IHdpbmRvdy5MYXp5TG9hZCh7XG4gICAgICAgIGVsZW1lbnRzX3NlbGVjdG9yOiAnLnBvc3QtY2FyZCBbZGF0YS1zcmNdJ1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gaGlnaGxpZ2h0IHByaXNtanNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgY29kZUVsZW1lbnRzID0gcXNhKCcucG9zdC1jb250ZW50IHByZSBjb2RlJylcbiAgaWYgKGNvZGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAvLyAvLyBjb2RlIGNhcmQgcG9seWZpbGxcbiAgICAvLyBjb2RlRWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAvLyAgIGl0ZW0uY2xhc3NMaXN0Lmxlbmd0aCB8fCBpdGVtLmNsYXNzTGlzdC5hZGQoJ2xhbmd1YWdlLW5vbmUnKVxuICAgIC8vIH0pXG5cbiAgICAvLyBsb2FkU3R5bGUoJ2h0dHBzOi8vdW5wa2cuY29tL3ByaXNtanNAMS4xNS4wL3RoZW1lcy9wcmlzbS1va2FpZGlhLmNzcycpXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vcHJpc21qc0AxLjE1LjAvcHJpc20uanMnKVxuICB9XG5cbiAgLy8gZ2FsbGVyeVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGZsZXhcbiAgcXNhKCcua2ctZ2FsbGVyeS1pbWFnZSA+IGltZycpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gaXRlbS5jbG9zZXN0KCcua2ctZ2FsbGVyeS1pbWFnZScpXG4gICAgY29uc3Qgd2lkdGggPSBpdGVtLmF0dHJpYnV0ZXMud2lkdGgudmFsdWVcbiAgICBjb25zdCBoZWlnaHQgPSBpdGVtLmF0dHJpYnV0ZXMuaGVpZ2h0LnZhbHVlXG4gICAgY29uc3QgcmF0aW8gPSB3aWR0aCAvIGhlaWdodFxuICAgIGNvbnRhaW5lci5zdHlsZS5mbGV4ID0gcmF0aW8gKyAnIDEgMCUnXG4gIH0pXG5cbiAgLy8gLy8gbGlnaHRib3hcbiAgLy8gY29uc3QgZ2FsbGVyeUNvbnRhaW5lcnMgPSBxc2EoJy5rZy1nYWxsZXJ5LWNvbnRhaW5lcicpXG4gIC8vIGlmIChnYWxsZXJ5Q29udGFpbmVycy5sZW5ndGgpIHtcbiAgLy8gICBsb2FkU3R5bGUoJ2h0dHBzOi8vdW5wa2cuY29tL2xpZ2h0Z2FsbGVyeS5qc0AxLjEuMi9kaXN0L2Nzcy9saWdodGdhbGxlcnkubWluLmNzcycpXG4gIC8vICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vbGlnaHRnYWxsZXJ5LmpzQDEuMS4yL2Rpc3QvanMvbGlnaHRnYWxsZXJ5Lm1pbi5qcycsICgpID0+IHtcbiAgLy8gICAgIGdhbGxlcnlDb250YWluZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gIC8vICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgnLmtnLWdhbGxlcnktaW1hZ2UnKS5mb3JFYWNoKHN1YiA9PiB7XG4gIC8vICAgICAgICAgc3ViLmRhdGFzZXQuc3JjID0gc3ViLmNoaWxkcmVuWzBdLnNyY1xuICAvLyAgICAgICB9KVxuICAvLyAgICAgICB3aW5kb3cubGlnaHRHYWxsZXJ5KGl0ZW0sIHsgc2VsZWN0b3I6ICcua2ctZ2FsbGVyeS1pbWFnZScgfSlcbiAgLy8gICAgIH0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIC8vIG1lZGl1bS16b29tXG4gIGNvbnN0IGdhbGxlcnlDb250YWluZXJzID0gcXNhKCcua2ctZ2FsbGVyeS1jb250YWluZXInKVxuICBpZiAoZ2FsbGVyeUNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vbWVkaXVtLXpvb21AMS4wLjIvZGlzdC9tZWRpdW0tem9vbS5taW4uanMnLCAoKSA9PiB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb20jYXBpXG4gICAgICB3aW5kb3cubWVkaXVtWm9vbSgnLmtnLWdhbGxlcnktaW1hZ2UgPiBpbWcnLCB7XG4gICAgICAgIG1hcmdpbjogMjAsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjMDAwJ1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gVE9ETzogcG9zdCBzaGFyZVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBxc2EoJy5wb3N0LXNoYXJlIGEnKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gNjQwXG4gICAgY29uc3QgaGVpZ2h0ID0gNDAwXG5cbiAgICBjb25zdCBkdWFsU2NyZWVuTGVmdCA9IHdpbmRvdy5zY3JlZW5MZWZ0ICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuc2NyZWVuTGVmdCA6IHdpbmRvdy5zY3JlZW5YXG4gICAgY29uc3QgZHVhbFNjcmVlblRvcCA9IHdpbmRvdy5zY3JlZW5Ub3AgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5Ub3AgOiB3aW5kb3cuc2NyZWVuWVxuXG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCA/IHdpbmRvdy5pbm5lcldpZHRoIDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDogd2luZG93LnNjcmVlbi53aWR0aFxuICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IDogd2luZG93LnNjcmVlbi5oZWlnaHRcblxuICAgIGNvbnN0IGxlZnQgPSAoKGNvbnRhaW5lcldpZHRoIC8gMikgLSAod2lkdGggLyAyKSkgKyBkdWFsU2NyZWVuTGVmdFxuICAgIGNvbnN0IHRvcCA9ICgoY29udGFpbmVySGVpZ2h0IC8gMikgLSAoaGVpZ2h0IC8gMikpICsgZHVhbFNjcmVlblRvcFxuICAgIGNvbnN0IG5ld1dpbmRvdyA9IHdpbmRvdy5vcGVuKGUuY3VycmVudFRhcmdldC5ocmVmLCAnc2hhcmUtd2luZG93JywgYHNjcm9sbGJhcnM9eWVzLCB3aWR0aD0ke3dpZHRofSwgaGVpZ2h0PSR7aGVpZ2h0fSwgdG9wPSR7dG9wfSwgbGVmdD0ke2xlZnR9YClcblxuICAgIC8vIFB1dHMgZm9jdXMgb24gdGhlIG5ld1dpbmRvd1xuICAgIHdpbmRvdy5mb2N1cyAmJiBuZXdXaW5kb3cuZm9jdXMoKVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH0pKVxuXG4gIC8vIHN1YnNjcmliZSBoaWRkZW4gZm9ybSB2YWx1ZVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBxc2EoJ2lucHV0W25hbWU9bG9jYXRpb25dJykuZm9yRWFjaChpdGVtID0+IHsgaXRlbS52YWx1ZSA9IGl0ZW0udmFsdWUgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYgfSlcbiAgcXNhKCdpbnB1dFtuYW1lPXJlZmVycmVyXScpLmZvckVhY2goaXRlbSA9PiB7IGl0ZW0udmFsdWUgPSBpdGVtLnZhbHVlIHx8IGRvY3VtZW50LnJlZmVycmVyIH0pXG5cbiAgLy8gc2l0ZSBwcmVsb2FkZXJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3Qgc3Bpbm5lciA9IHFzKCcuc2l0ZS1zcGlubmVyJylcbiAgaWYgKHNwaW5uZXIpIHtcbiAgICAvLyByZW1vdmUgbG9hZGVyIHNwaW5uZXJcbiAgICBzcGlubmVyLnN0eWxlLm9wYWNpdHkgPSAwXG4gICAgc2V0VGltZW91dCgoKSA9PiBzcGlubmVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoc3Bpbm5lciksIDUwMClcbiAgfVxuXG4gIC8vIHBqYXhcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gLy8gaHR0cHM6Ly91bnBrZy5jb20vanF1ZXJ5LXBqYXhAMi4wLjEvanF1ZXJ5LnBqYXguanNcbiAgLy8gJChkb2N1bWVudCkucGpheCgnYVtocmVmXScsICdib2R5JywgeyBmcmFnbWVudDogJ2JvZHknIH0pXG4gIC8vIHFzYSgnYVtocmVmXScpLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIC8vICAgY29uc3QgdXJsID0gZS5jdXJyZW50VGFyZ2V0LmhyZWZcbiAgLy8gICBpZiAodXJsID09PSB3aW5kb3cubG9jYXRpb24uaHJlZikgcmV0dXJuXG5cbiAgLy8gICBjb25zdCB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgLy8gICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50J1xuXG4gIC8vICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIC8vICAgICBjb25zdCByZXMgPSB4aHIucmVzcG9uc2VcbiAgLy8gICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgdXJsKVxuICAvLyAgICAgZG9jdW1lbnQuaGVhZC5pbm5lckhUTUwgPSAnJ1xuICAvLyAgICAgcmVzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWQgPiAqJykuZm9yRWFjaChpdGVtID0+IHtcbiAgLy8gICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChpdGVtKVxuICAvLyAgICAgfSlcbiAgLy8gICAgIGRvY3VtZW50LmJvZHkgPSByZXMucXVlcnlTZWxlY3RvcignYm9keScpXG4gIC8vICAgICBzZXR1cCgpXG4gIC8vICAgfSlcblxuICAvLyAgIHhoci5vcGVuKCdHRVQnLCB1cmwpXG4gIC8vICAgeGhyLnNlbmQobnVsbClcblxuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvLyB9KSlcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzZXR1cClcbiJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
