"use strict";

var setup = function setup() {
  var qs = document.querySelector.bind(document);
  var qsa = document.querySelectorAll.bind(document);

  function loadStyle(href) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = href;
    document.head.appendChild(linkElement);
  }

  function loadScript(src, callback) {
    var scriptElement = document.createElement('script');
    scriptElement.src = src;
    callback && scriptElement.addEventListener('load', callback);
    document.body.appendChild(scriptElement);
  } // search
  // -----------------------------------------------------------------------------


  var inputElement = qs('#search_input');

  if (inputElement) {
    loadScript('https://unpkg.com/ghost-search/dist/ghost-search.js', function () {
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
    loadScript('https://unpkg.com/vanilla-lazyload', function () {
      window.lazyloader = new window.LazyLoad({
        elements_selector: '.post-card [data-src]'
      });
    });
  } // highlight prismjs
  // -----------------------------------------------------------------------------


  var codeElements = qsa('.post-content pre code');

  if (codeElements.length) {
    // code card polyfill
    codeElements.forEach(function (item) {
      item.classList.length || item.classList.add('language-basic');
    });
    loadStyle('https://unpkg.com/prismjs/themes/prism-okaidia.css');
    loadScript('https://unpkg.com/prismjs/prism.js');
  } // gallery
  // -----------------------------------------------------------------------------


  qsa('.kg-gallery-image img').forEach(function (item) {
    var container = item.closest('.kg-gallery-image');
    var width = item.attributes.width.value;
    var height = item.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });
  var galleryContainers = qsa('.kg-gallery-container');

  if (galleryContainers.length) {
    loadStyle('https://unpkg.com/lightgallery.js/dist/css/lightgallery.min.css');
    loadScript('https://unpkg.com/lightgallery.js/dist/js/lightgallery.js', function () {
      galleryContainers.forEach(function (item) {
        item.querySelectorAll('.kg-gallery-image').forEach(function (sub) {
          sub.dataset.src = sub.children[0].src;
        });
        window.lightGallery(item, {
          selector: '.kg-gallery-image'
        });
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
  }); // pjax
  // -----------------------------------------------------------------------------
  // // https://unpkg.com/jquery-pjax
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
  // subscribe hidden form value
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
    }, 1000);
  }
};

window.addEventListener('load', setup);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJzZXR1cCIsInFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsInFzYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkU3R5bGUiLCJocmVmIiwibGlua0VsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwidHlwZSIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImxvYWRTY3JpcHQiLCJzcmMiLCJjYWxsYmFjayIsInNjcmlwdEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImlucHV0RWxlbWVudCIsInJlc3VsdEVsZW1lbnQiLCJpZCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsInBsYWNlaG9sZGVyIiwicGFyZW50RWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsIndpbmRvdyIsIkdob3N0U2VhcmNoIiwiaW5wdXQiLCJyZXN1bHRzIiwidGVtcGxhdGUiLCJpIiwidXJsIiwidGl0bGUiLCJhcGkiLCJwYXJhbWV0ZXJzIiwiZmllbGRzIiwib24iLCJhZnRlckRpc3BsYXkiLCJ0b3RhbCIsInZhbHVlIiwiZGF0YXNldCIsImxhenlsb2FkZXIiLCJMYXp5TG9hZCIsImVsZW1lbnRzX3NlbGVjdG9yIiwiY29kZUVsZW1lbnRzIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJjb250YWluZXIiLCJjbG9zZXN0Iiwid2lkdGgiLCJhdHRyaWJ1dGVzIiwiaGVpZ2h0IiwicmF0aW8iLCJzdHlsZSIsImZsZXgiLCJnYWxsZXJ5Q29udGFpbmVycyIsInN1YiIsImNoaWxkcmVuIiwibGlnaHRHYWxsZXJ5Iiwic2VsZWN0b3IiLCJlIiwiZHVhbFNjcmVlbkxlZnQiLCJzY3JlZW5MZWZ0IiwidW5kZWZpbmVkIiwic2NyZWVuWCIsImR1YWxTY3JlZW5Ub3AiLCJzY3JlZW5Ub3AiLCJzY3JlZW5ZIiwiY29udGFpbmVyV2lkdGgiLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJzY3JlZW4iLCJjb250YWluZXJIZWlnaHQiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsImxlZnQiLCJ0b3AiLCJuZXdXaW5kb3ciLCJvcGVuIiwiY3VycmVudFRhcmdldCIsImZvY3VzIiwicHJldmVudERlZmF1bHQiLCJsb2NhdGlvbiIsInJlZmVycmVyIiwic3Bpbm5lciIsIm9wYWNpdHkiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBTTtBQUNsQixNQUFNQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBNEJGLFFBQTVCLENBQVg7QUFDQSxNQUFNRyxHQUFHLEdBQUdILFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEJGLElBQTFCLENBQStCRixRQUEvQixDQUFaOztBQUVBLFdBQVNLLFNBQVQsQ0FBb0JDLElBQXBCLEVBQTBCO0FBQ3hCLFFBQU1DLFdBQVcsR0FBR1AsUUFBUSxDQUFDUSxhQUFULENBQXVCLE1BQXZCLENBQXBCO0FBQ0FELElBQUFBLFdBQVcsQ0FBQ0UsR0FBWixHQUFrQixZQUFsQjtBQUNBRixJQUFBQSxXQUFXLENBQUNHLElBQVosR0FBbUIsVUFBbkI7QUFDQUgsSUFBQUEsV0FBVyxDQUFDRCxJQUFaLEdBQW1CQSxJQUFuQjtBQUNBTixJQUFBQSxRQUFRLENBQUNXLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkwsV0FBMUI7QUFDRDs7QUFFRCxXQUFTTSxVQUFULENBQXFCQyxHQUFyQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDbEMsUUFBTUMsYUFBYSxHQUFHaEIsUUFBUSxDQUFDUSxhQUFULENBQXVCLFFBQXZCLENBQXRCO0FBQ0FRLElBQUFBLGFBQWEsQ0FBQ0YsR0FBZCxHQUFvQkEsR0FBcEI7QUFDQUMsSUFBQUEsUUFBUSxJQUFJQyxhQUFhLENBQUNDLGdCQUFkLENBQStCLE1BQS9CLEVBQXVDRixRQUF2QyxDQUFaO0FBQ0FmLElBQUFBLFFBQVEs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QXhCLEVBQWdDbkIsS0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgcXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXG4gIGNvbnN0IHFzYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYmluZChkb2N1bWVudClcblxuICBmdW5jdGlvbiBsb2FkU3R5bGUgKGhyZWYpIHtcbiAgICBjb25zdCBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgIGxpbmtFbGVtZW50LnJlbCA9ICdzdHlsZXNoZWV0J1xuICAgIGxpbmtFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gICAgbGlua0VsZW1lbnQuaHJlZiA9IGhyZWZcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KVxuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFNjcmlwdCAoc3JjLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gc3JjXG4gICAgY2FsbGJhY2sgJiYgc2NyaXB0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2FsbGJhY2spXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KVxuICB9XG5cbiAgLy8gc2VhcmNoXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IGlucHV0RWxlbWVudCA9IHFzKCcjc2VhcmNoX2lucHV0JylcbiAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL2dob3N0LXNlYXJjaC9kaXN0L2dob3N0LXNlYXJjaC5qcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcmVzdWx0RWxlbWVudC5pZCA9ICdzZWFyY2hfcmVzdWx0J1xuICAgICAgcmVzdWx0RWxlbWVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0J1xuICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQucGxhY2Vob2xkZXJ9PC9zcGFuPmBcbiAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duJylcbiAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHJlc3VsdEVsZW1lbnQpXG5cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xuICAgICAgbmV3IHdpbmRvdy5HaG9zdFNlYXJjaCh7XG4gICAgICAgIGlucHV0OiAnI3NlYXJjaF9pbnB1dCcsXG4gICAgICAgIHJlc3VsdHM6ICcjc2VhcmNoX3Jlc3VsdCcsXG4gICAgICAgIHRlbXBsYXRlOiBpID0+IGA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiJHtpLnVybH1cIj4ke2kudGl0bGV9PC9hPmAsXG4gICAgICAgIGFwaToge1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgZmllbGRzOiBbJ3VybCcsICd0aXRsZSddIH1cbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBhZnRlckRpc3BsYXk6IHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdHMudG90YWwgIT09IDApIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsdWUpIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQuZGF0YXNldFsnZW1wdHknXX08L3NwYW4+YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gaW1nIGxhenlsb2FkXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGlmIChxcygnLnBvc3QtY2FyZCBbZGF0YS1zcmNdJykpIHtcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS92YW5pbGxhLWxhenlsb2FkJywgKCkgPT4ge1xuICAgICAgd2luZG93Lmxhenlsb2FkZXIgPSBuZXcgd2luZG93LkxhenlMb2FkKHtcbiAgICAgICAgZWxlbWVudHNfc2VsZWN0b3I6ICcucG9zdC1jYXJkIFtkYXRhLXNyY10nXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBoaWdobGlnaHQgcHJpc21qc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBjb2RlRWxlbWVudHMgPSBxc2EoJy5wb3N0LWNvbnRlbnQgcHJlIGNvZGUnKVxuICBpZiAoY29kZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgIC8vIGNvZGUgY2FyZCBwb2x5ZmlsbFxuICAgIGNvZGVFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5jbGFzc0xpc3QubGVuZ3RoIHx8IGl0ZW0uY2xhc3NMaXN0LmFkZCgnbGFuZ3VhZ2UtYmFzaWMnKVxuICAgIH0pXG5cbiAgICBsb2FkU3R5bGUoJ2h0dHBzOi8vdW5wa2cuY29tL3ByaXNtanMvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzJylcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9wcmlzbWpzL3ByaXNtLmpzJylcbiAgfVxuXG4gIC8vIGdhbGxlcnlcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcXNhKCcua2ctZ2FsbGVyeS1pbWFnZSBpbWcnKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGl0ZW0uY2xvc2VzdCgnLmtnLWdhbGxlcnktaW1hZ2UnKVxuICAgIGNvbnN0IHdpZHRoID0gaXRlbS5hdHRyaWJ1dGVzLndpZHRoLnZhbHVlXG4gICAgY29uc3QgaGVpZ2h0ID0gaXRlbS5hdHRyaWJ1dGVzLmhlaWdodC52YWx1ZVxuICAgIGNvbnN0IHJhdGlvID0gd2lkdGggLyBoZWlnaHRcbiAgICBjb250YWluZXIuc3R5bGUuZmxleCA9IHJhdGlvICsgJyAxIDAlJ1xuICB9KVxuXG4gIGNvbnN0IGdhbGxlcnlDb250YWluZXJzID0gcXNhKCcua2ctZ2FsbGVyeS1jb250YWluZXInKVxuICBpZiAoZ2FsbGVyeUNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgbG9hZFN0eWxlKCdodHRwczovL3VucGtnLmNvbS9saWdodGdhbGxlcnkuanMvZGlzdC9jc3MvbGlnaHRnYWxsZXJ5Lm1pbi5jc3MnKVxuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL2xpZ2h0Z2FsbGVyeS5qcy9kaXN0L2pzL2xpZ2h0Z2FsbGVyeS5qcycsICgpID0+IHtcbiAgICAgIGdhbGxlcnlDb250YWluZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgnLmtnLWdhbGxlcnktaW1hZ2UnKS5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgICAgc3ViLmRhdGFzZXQuc3JjID0gc3ViLmNoaWxkcmVuWzBdLnNyY1xuICAgICAgICB9KVxuICAgICAgICB3aW5kb3cubGlnaHRHYWxsZXJ5KGl0ZW0sIHsgc2VsZWN0b3I6ICcua2ctZ2FsbGVyeS1pbWFnZScgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8vIFRPRE86IHBvc3Qgc2hhcmVcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcXNhKCcucG9zdC1zaGFyZSBhJykuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IDY0MFxuICAgIGNvbnN0IGhlaWdodCA9IDQwMFxuXG4gICAgY29uc3QgZHVhbFNjcmVlbkxlZnQgPSB3aW5kb3cuc2NyZWVuTGVmdCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlbkxlZnQgOiB3aW5kb3cuc2NyZWVuWFxuICAgIGNvbnN0IGR1YWxTY3JlZW5Ub3AgPSB3aW5kb3cuc2NyZWVuVG9wICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuc2NyZWVuVG9wIDogd2luZG93LnNjcmVlbllcblxuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggPyB3aW5kb3cuaW5uZXJXaWR0aCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IHdpbmRvdy5zY3JlZW4ud2lkdGhcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0XG5cbiAgICBjb25zdCBsZWZ0ID0gKChjb250YWluZXJXaWR0aCAvIDIpIC0gKHdpZHRoIC8gMikpICsgZHVhbFNjcmVlbkxlZnRcbiAgICBjb25zdCB0b3AgPSAoKGNvbnRhaW5lckhlaWdodCAvIDIpIC0gKGhlaWdodCAvIDIpKSArIGR1YWxTY3JlZW5Ub3BcbiAgICBjb25zdCBuZXdXaW5kb3cgPSB3aW5kb3cub3BlbihlLmN1cnJlbnRUYXJnZXQuaHJlZiwgJ3NoYXJlLXdpbmRvdycsIGBzY3JvbGxiYXJzPXllcywgd2lkdGg9JHt3aWR0aH0sIGhlaWdodD0ke2hlaWdodH0sIHRvcD0ke3RvcH0sIGxlZnQ9JHtsZWZ0fWApXG5cbiAgICAvLyBQdXRzIGZvY3VzIG9uIHRoZSBuZXdXaW5kb3dcbiAgICB3aW5kb3cuZm9jdXMgJiYgbmV3V2luZG93LmZvY3VzKClcblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9KSlcblxuICAvLyBwamF4XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIC8vIGh0dHBzOi8vdW5wa2cuY29tL2pxdWVyeS1wamF4XG4gIC8vICQoZG9jdW1lbnQpLnBqYXgoJ2FbaHJlZl0nLCAnYm9keScsIHsgZnJhZ21lbnQ6ICdib2R5JyB9KVxuICAvLyBxc2EoJ2FbaHJlZl0nKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAvLyAgIGNvbnN0IHVybCA9IGUuY3VycmVudFRhcmdldC5ocmVmXG4gIC8vICAgaWYgKHVybCA9PT0gd2luZG93LmxvY2F0aW9uLmhyZWYpIHJldHVyblxuXG4gIC8vICAgY29uc3QgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gIC8vICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdkb2N1bWVudCdcblxuICAvLyAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAvLyAgICAgY29uc3QgcmVzID0geGhyLnJlc3BvbnNlXG4gIC8vICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgZG9jdW1lbnQudGl0bGUsIHVybClcbiAgLy8gICAgIGRvY3VtZW50LmhlYWQuaW5uZXJIVE1MID0gJydcbiAgLy8gICAgIHJlcy5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkID4gKicpLmZvckVhY2goaXRlbSA9PiB7XG4gIC8vICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoaXRlbSlcbiAgLy8gICAgIH0pXG4gIC8vICAgICBkb2N1bWVudC5ib2R5ID0gcmVzLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAvLyAgICAgc2V0dXAoKVxuICAvLyAgIH0pXG5cbiAgLy8gICB4aHIub3BlbignR0VUJywgdXJsKVxuICAvLyAgIHhoci5zZW5kKG51bGwpXG5cbiAgLy8gICBlLnByZXZlbnREZWZhdWx0KClcbiAgLy8gfSkpXG5cbiAgLy8gc3Vic2NyaWJlIGhpZGRlbiBmb3JtIHZhbHVlXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHFzYSgnaW5wdXRbbmFtZT1sb2NhdGlvbl0nKS5mb3JFYWNoKGl0ZW0gPT4geyBpdGVtLnZhbHVlID0gaXRlbS52YWx1ZSB8fCB3aW5kb3cubG9jYXRpb24uaHJlZiB9KVxuICBxc2EoJ2lucHV0W25hbWU9cmVmZXJyZXJdJykuZm9yRWFjaChpdGVtID0+IHsgaXRlbS52YWx1ZSA9IGl0ZW0udmFsdWUgfHwgZG9jdW1lbnQucmVmZXJyZXIgfSlcblxuICAvLyBzaXRlIHByZWxvYWRlclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBzcGlubmVyID0gcXMoJy5zaXRlLXNwaW5uZXInKVxuICBpZiAoc3Bpbm5lcikge1xuICAgIC8vIHJlbW92ZSBsb2FkZXIgc3Bpbm5lclxuICAgIHNwaW5uZXIuc3R5bGUub3BhY2l0eSA9IDBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNwaW5uZXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChzcGlubmVyKSwgMTAwMClcbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNldHVwKVxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
