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
    loadScript('https://unpkg.com/ghost-search@1.0.1/dist/ghost-search.min.js', function () {
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
          resource: 'posts',
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
    loadScript('https://unpkg.com/vanilla-lazyload@12.0.0-beta.0/dist/lazyload.min.js', function () {
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
    loadScript('https://unpkg.com/prismjs@1.16.0/prism.js');
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
    loadScript('https://unpkg.com/medium-zoom@1.0.4/dist/medium-zoom.min.js', function () {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJzZXR1cCIsInFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsInFzYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkU2NyaXB0Iiwic3JjIiwiY2FsbGJhY2siLCJzY3JpcHRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJpbnB1dEVsZW1lbnQiLCJyZXN1bHRFbGVtZW50IiwiaWQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJwbGFjZWhvbGRlciIsInBhcmVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aW5kb3ciLCJHaG9zdFNlYXJjaCIsImlucHV0IiwicmVzdWx0cyIsInRlbXBsYXRlIiwiaSIsInVybCIsInRpdGxlIiwiYXBpIiwicmVzb3VyY2UiLCJwYXJhbWV0ZXJzIiwiZmllbGRzIiwib24iLCJhZnRlckRpc3BsYXkiLCJ0b3RhbCIsInZhbHVlIiwiZGF0YXNldCIsImxhenlsb2FkZXIiLCJMYXp5TG9hZCIsImVsZW1lbnRzX3NlbGVjdG9yIiwiY29kZUVsZW1lbnRzIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJjb250YWluZXIiLCJjbG9zZXN0Iiwid2lkdGgiLCJhdHRyaWJ1dGVzIiwiaGVpZ2h0IiwicmF0aW8iLCJzdHlsZSIsImZsZXgiLCJnYWxsZXJ5Q29udGFpbmVycyIsIm1lZGl1bVpvb20iLCJtYXJnaW4iLCJiYWNrZ3JvdW5kIiwiZSIsImR1YWxTY3JlZW5MZWZ0Iiwic2NyZWVuTGVmdCIsInVuZGVmaW5lZCIsInNjcmVlblgiLCJkdWFsU2NyZWVuVG9wIiwic2NyZWVuVG9wIiwic2NyZWVuWSIsImNvbnRhaW5lcldpZHRoIiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwic2NyZWVuIiwiY29udGFpbmVySGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJsZWZ0IiwidG9wIiwibmV3V2luZG93Iiwib3BlbiIsImN1cnJlbnRUYXJnZXQiLCJocmVmIiwiZm9jdXMiLCJwcmV2ZW50RGVmYXVsdCIsImxvY2F0aW9uIiwicmVmZXJyZXIiLCJzcGlubmVyIiwib3BhY2l0eSIsInNldFRpbWVvdXQiLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxHQUFNO0FBQ2xCLE1BQU1DLEVBQUUsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCQyxJQUF2QixDQUE0QkYsUUFBNUIsQ0FBWDtBQUNBLE1BQU1HLEdBQUcsR0FBR0gsUUFBUSxDQUFDSSxnQkFBVCxDQUEwQkYsSUFBMUIsQ0FBK0JGLFFBQS9CLENBQVosQ0FGa0IsQ0FJbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVNLLFVBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCQyxRQUExQixFQUFvQztBQUNsQyxRQUFNQyxhQUFhLEdBQUdSLFFBQVEsQ0FBQ1MsYUFBVCxDQUF1QixRQUF2QixDQUF0QjtBQUNBRCxJQUFBQSxhQUFhLENBQUNGLEdBQWQsR0FBb0JBLEdBQXBCO0FBQ0FDLElBQUFBLFFBQVEsSUFBSUMsYUFBYSxDQUFDRSxnQkFBZCxDQUErQixNQUEvQixFQUF1Q0gsUUFBdkMsQ0FBWjtBQUNBUCxJQUFBQSxRQUFRLENBQUNXLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkosYUFBMUI7QUFDRCxHQWhCaUIsQ0FrQmxCO0FBQ0E7OztBQUNBLE1BQU1LLFlBQVksR0FBR2QsRUFBRSxDQUFDLGVBQUQsQ0FBdkI7O0FBQ0EsTUFBSWMsWUFBSixFQUFrQjtBQUNoQlIsSUFBQUEsVUFBVSxDQUFDLCtEQUFELEVBQWtFLFlBQU07QUFDaEYsVUFBTVMsYUFBYSxHQUFHZCxRQUFRLENBQUNTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdEI7QUFDQUssTUFBQUEsYUFBYSxDQUFDQyxFQUFkLEdBQW1CLGVBQW5CO0FBQ0FELE1BQUFBLGFB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LElBQUFBLE9BQU8sQ0FBQ2hDLEtBQVIsQ0FBY2lDLE9BQWQsR0FBd0IsQ0FBeEI7QUFDQUMsSUFBQUEsVUFBVSxDQUFDO0FBQUEsYUFBTUYsT0FBTyxDQUFDakUsYUFBUixDQUFzQm9FLFdBQXRCLENBQWtDSCxPQUFsQyxDQUFOO0FBQUEsS0FBRCxFQUFtRCxHQUFuRCxDQUFWO0FBQ0QsR0FqSmlCLENBbUpsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOztBQUNELENBOUtEOztBQWdMQTlELE1BQU0sQ0FBQ1osZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NaLEtBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gIGNvbnN0IHFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxuICBjb25zdCBxc2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpXG5cbiAgLy8gZnVuY3Rpb24gbG9hZFN0eWxlIChocmVmKSB7XG4gIC8vICAgY29uc3QgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgLy8gICBsaW5rRWxlbWVudC5yZWwgPSAnc3R5bGVzaGVldCdcbiAgLy8gICBsaW5rRWxlbWVudC5ocmVmID0gaHJlZlxuICAvLyAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpXG4gIC8vIH1cblxuICBmdW5jdGlvbiBsb2FkU2NyaXB0IChzcmMsIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcbiAgICBjYWxsYmFjayAmJiBzY3JpcHRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjYWxsYmFjaylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpXG4gIH1cblxuICAvLyBzZWFyY2hcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgaW5wdXRFbGVtZW50ID0gcXMoJyNzZWFyY2hfaW5wdXQnKVxuICBpZiAoaW5wdXRFbGVtZW50KSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vZ2hvc3Qtc2VhcmNoQDEuMC4xL2Rpc3QvZ2hvc3Qtc2VhcmNoLm1pbi5qcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcmVzdWx0RWxlbWVudC5pZCA9ICdzZWFyY2hfcmVzdWx0J1xuICAgICAgcmVzdWx0RWxlbWVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0J1xuICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQucGxhY2Vob2xkZXJ9PC9zcGFuPmBcbiAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duJylcbiAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHJlc3VsdEVsZW1lbnQpXG5cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xuICAgICAgbmV3IHdpbmRvdy5HaG9zdFNlYXJjaCh7XG4gICAgICAgIGlucHV0OiAnI3NlYXJjaF9pbnB1dCcsXG4gICAgICAgIHJlc3VsdHM6ICcjc2VhcmNoX3Jlc3VsdCcsXG4gICAgICAgIHRlbXBsYXRlOiBpID0+IGA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiJHtpLnVybH1cIj4ke2kudGl0bGV9PC9hPmAsXG4gICAgICAgIGFwaToge1xuICAgICAgICAgIHJlc291cmNlOiAncG9zdHMnLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgZmllbGRzOiBbJ3VybCcsICd0aXRsZSddIH1cbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBhZnRlckRpc3BsYXk6IHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdHMudG90YWwgIT09IDApIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsdWUpIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQuZGF0YXNldFsnZW1wdHknXX08L3NwYW4+YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gaW1nIGxhenlsb2FkXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGlmIChxcygnLnBvc3QtY2FyZCBbZGF0YS1zcmNdJykpIHtcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS92YW5pbGxhLWxhenlsb2FkQDEyLjAuMC1iZXRhLjAvZGlzdC9sYXp5bG9hZC5taW4uanMnLCAoKSA9PiB7XG4gICAgICB3aW5kb3cubGF6eWxvYWRlciA9IG5ldyB3aW5kb3cuTGF6eUxvYWQoe1xuICAgICAgICBlbGVtZW50c19zZWxlY3RvcjogJy5wb3N0LWNhcmQgW2RhdGEtc3JjXSdcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8vIGhpZ2hsaWdodCBwcmlzbWpzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IGNvZGVFbGVtZW50cyA9IHFzYSgnLnBvc3QtY29udGVudCBwcmUgY29kZScpXG4gIGlmIChjb2RlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgLy8gLy8gY29kZSBjYXJkIHBvbHlmaWxsXG4gICAgLy8gY29kZUVsZW1lbnRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgLy8gICBpdGVtLmNsYXNzTGlzdC5sZW5ndGggfHwgaXRlbS5jbGFzc0xpc3QuYWRkKCdsYW5ndWFnZS1ub25lJylcbiAgICAvLyB9KVxuXG4gICAgLy8gbG9hZFN0eWxlKCdodHRwczovL3VucGtnLmNvbS9wcmlzbWpzQDEuMTUuMC90aGVtZXMvcHJpc20tb2thaWRpYS5jc3MnKVxuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL3ByaXNtanNAMS4xNi4wL3ByaXNtLmpzJylcbiAgfVxuXG4gIC8vIGdhbGxlcnlcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBmbGV4XG4gIHFzYSgnLmtnLWdhbGxlcnktaW1hZ2UgPiBpbWcnKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGl0ZW0uY2xvc2VzdCgnLmtnLWdhbGxlcnktaW1hZ2UnKVxuICAgIGNvbnN0IHdpZHRoID0gaXRlbS5hdHRyaWJ1dGVzLndpZHRoLnZhbHVlXG4gICAgY29uc3QgaGVpZ2h0ID0gaXRlbS5hdHRyaWJ1dGVzLmhlaWdodC52YWx1ZVxuICAgIGNvbnN0IHJhdGlvID0gd2lkdGggLyBoZWlnaHRcbiAgICBjb250YWluZXIuc3R5bGUuZmxleCA9IHJhdGlvICsgJyAxIDAlJ1xuICB9KVxuXG4gIC8vIC8vIGxpZ2h0Ym94XG4gIC8vIGNvbnN0IGdhbGxlcnlDb250YWluZXJzID0gcXNhKCcua2ctZ2FsbGVyeS1jb250YWluZXInKVxuICAvLyBpZiAoZ2FsbGVyeUNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gIC8vICAgbG9hZFN0eWxlKCdodHRwczovL3VucGtnLmNvbS9saWdodGdhbGxlcnkuanNAMS4xLjIvZGlzdC9jc3MvbGlnaHRnYWxsZXJ5Lm1pbi5jc3MnKVxuICAvLyAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL2xpZ2h0Z2FsbGVyeS5qc0AxLjEuMi9kaXN0L2pzL2xpZ2h0Z2FsbGVyeS5taW4uanMnLCAoKSA9PiB7XG4gIC8vICAgICBnYWxsZXJ5Q29udGFpbmVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAvLyAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5rZy1nYWxsZXJ5LWltYWdlJykuZm9yRWFjaChzdWIgPT4ge1xuICAvLyAgICAgICAgIHN1Yi5kYXRhc2V0LnNyYyA9IHN1Yi5jaGlsZHJlblswXS5zcmNcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICAgd2luZG93LmxpZ2h0R2FsbGVyeShpdGVtLCB7IHNlbGVjdG9yOiAnLmtnLWdhbGxlcnktaW1hZ2UnIH0pXG4gIC8vICAgICB9KVxuICAvLyAgIH0pXG4gIC8vIH1cblxuICAvLyBtZWRpdW0tem9vbVxuICBjb25zdCBnYWxsZXJ5Q29udGFpbmVycyA9IHFzYSgnLmtnLWdhbGxlcnktY29udGFpbmVyJylcbiAgaWYgKGdhbGxlcnlDb250YWluZXJzLmxlbmd0aCkge1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL21lZGl1bS16b29tQDEuMC40L2Rpc3QvbWVkaXVtLXpvb20ubWluLmpzJywgKCkgPT4ge1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZyYW5jb2lzY2hhbGlmb3VyL21lZGl1bS16b29tI2FwaVxuICAgICAgd2luZG93Lm1lZGl1bVpvb20oJy5rZy1nYWxsZXJ5LWltYWdlID4gaW1nJywge1xuICAgICAgICBtYXJnaW46IDIwLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnIzAwMCdcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8vIFRPRE86IHBvc3Qgc2hhcmVcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcXNhKCcucG9zdC1zaGFyZSBhJykuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IDY0MFxuICAgIGNvbnN0IGhlaWdodCA9IDQwMFxuXG4gICAgY29uc3QgZHVhbFNjcmVlbkxlZnQgPSB3aW5kb3cuc2NyZWVuTGVmdCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlbkxlZnQgOiB3aW5kb3cuc2NyZWVuWFxuICAgIGNvbnN0IGR1YWxTY3JlZW5Ub3AgPSB3aW5kb3cuc2NyZWVuVG9wICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuc2NyZWVuVG9wIDogd2luZG93LnNjcmVlbllcblxuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggPyB3aW5kb3cuaW5uZXJXaWR0aCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IHdpbmRvdy5zY3JlZW4ud2lkdGhcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0XG5cbiAgICBjb25zdCBsZWZ0ID0gKChjb250YWluZXJXaWR0aCAvIDIpIC0gKHdpZHRoIC8gMikpICsgZHVhbFNjcmVlbkxlZnRcbiAgICBjb25zdCB0b3AgPSAoKGNvbnRhaW5lckhlaWdodCAvIDIpIC0gKGhlaWdodCAvIDIpKSArIGR1YWxTY3JlZW5Ub3BcbiAgICBjb25zdCBuZXdXaW5kb3cgPSB3aW5kb3cub3BlbihlLmN1cnJlbnRUYXJnZXQuaHJlZiwgJ3NoYXJlLXdpbmRvdycsIGBzY3JvbGxiYXJzPXllcywgd2lkdGg9JHt3aWR0aH0sIGhlaWdodD0ke2hlaWdodH0sIHRvcD0ke3RvcH0sIGxlZnQ9JHtsZWZ0fWApXG5cbiAgICAvLyBQdXRzIGZvY3VzIG9uIHRoZSBuZXdXaW5kb3dcbiAgICB3aW5kb3cuZm9jdXMgJiYgbmV3V2luZG93LmZvY3VzKClcblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9KSlcblxuICAvLyBzdWJzY3JpYmUgaGlkZGVuIGZvcm0gdmFsdWVcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcXNhKCdpbnB1dFtuYW1lPWxvY2F0aW9uXScpLmZvckVhY2goaXRlbSA9PiB7IGl0ZW0udmFsdWUgPSBpdGVtLnZhbHVlIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH0pXG4gIHFzYSgnaW5wdXRbbmFtZT1yZWZlcnJlcl0nKS5mb3JFYWNoKGl0ZW0gPT4geyBpdGVtLnZhbHVlID0gaXRlbS52YWx1ZSB8fCBkb2N1bWVudC5yZWZlcnJlciB9KVxuXG4gIC8vIHNpdGUgcHJlbG9hZGVyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IHNwaW5uZXIgPSBxcygnLnNpdGUtc3Bpbm5lcicpXG4gIGlmIChzcGlubmVyKSB7XG4gICAgLy8gcmVtb3ZlIGxvYWRlciBzcGlubmVyXG4gICAgc3Bpbm5lci5zdHlsZS5vcGFjaXR5ID0gMFxuICAgIHNldFRpbWVvdXQoKCkgPT4gc3Bpbm5lci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHNwaW5uZXIpLCA1MDApXG4gIH1cblxuICAvLyBwamF4XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIC8vIGh0dHBzOi8vdW5wa2cuY29tL2pxdWVyeS1wamF4QDIuMC4xL2pxdWVyeS5wamF4LmpzXG4gIC8vICQoZG9jdW1lbnQpLnBqYXgoJ2FbaHJlZl0nLCAnYm9keScsIHsgZnJhZ21lbnQ6ICdib2R5JyB9KVxuICAvLyBxc2EoJ2FbaHJlZl0nKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAvLyAgIGNvbnN0IHVybCA9IGUuY3VycmVudFRhcmdldC5ocmVmXG4gIC8vICAgaWYgKHVybCA9PT0gd2luZG93LmxvY2F0aW9uLmhyZWYpIHJldHVyblxuXG4gIC8vICAgY29uc3QgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gIC8vICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdkb2N1bWVudCdcblxuICAvLyAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAvLyAgICAgY29uc3QgcmVzID0geGhyLnJlc3BvbnNlXG4gIC8vICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgZG9jdW1lbnQudGl0bGUsIHVybClcbiAgLy8gICAgIGRvY3VtZW50LmhlYWQuaW5uZXJIVE1MID0gJydcbiAgLy8gICAgIHJlcy5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkID4gKicpLmZvckVhY2goaXRlbSA9PiB7XG4gIC8vICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoaXRlbSlcbiAgLy8gICAgIH0pXG4gIC8vICAgICBkb2N1bWVudC5ib2R5ID0gcmVzLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAvLyAgICAgc2V0dXAoKVxuICAvLyAgIH0pXG5cbiAgLy8gICB4aHIub3BlbignR0VUJywgdXJsKVxuICAvLyAgIHhoci5zZW5kKG51bGwpXG5cbiAgLy8gICBlLnByZXZlbnREZWZhdWx0KClcbiAgLy8gfSkpXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2V0dXApXG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
