"use strict";

var setup = function setup() {
  var qs = document.querySelector.bind(document);
  var qsa = document.querySelectorAll.bind(document);

  function loadStyle(href) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
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
    // // code card polyfill
    // codeElements.forEach(item => {
    //   item.classList.length || item.classList.add('language-none')
    // })
    // loadStyle('https://unpkg.com/prismjs/themes/prism-okaidia.css')
    loadScript('https://unpkg.com/prismjs/prism.js');
  } // gallery
  // -----------------------------------------------------------------------------


  qsa('.kg-gallery-image > img').forEach(function (item) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJzZXR1cCIsInFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsInFzYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkU3R5bGUiLCJocmVmIiwibGlua0VsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibG9hZFNjcmlwdCIsInNyYyIsImNhbGxiYWNrIiwic2NyaXB0RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2R5IiwiaW5wdXRFbGVtZW50IiwicmVzdWx0RWxlbWVudCIsImlkIiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwicGxhY2Vob2xkZXIiLCJwYXJlbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwid2luZG93IiwiR2hvc3RTZWFyY2giLCJpbnB1dCIsInJlc3VsdHMiLCJ0ZW1wbGF0ZSIsImkiLCJ1cmwiLCJ0aXRsZSIsImFwaSIsInBhcmFtZXRlcnMiLCJmaWVsZHMiLCJvbiIsImFmdGVyRGlzcGxheSIsInRvdGFsIiwidmFsdWUiLCJkYXRhc2V0IiwibGF6eWxvYWRlciIsIkxhenlMb2FkIiwiZWxlbWVudHNfc2VsZWN0b3IiLCJjb2RlRWxlbWVudHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJ3aWR0aCIsImF0dHJpYnV0ZXMiLCJoZWlnaHQiLCJyYXRpbyIsInN0eWxlIiwiZmxleCIsImdhbGxlcnlDb250YWluZXJzIiwic3ViIiwiY2hpbGRyZW4iLCJsaWdodEdhbGxlcnkiLCJzZWxlY3RvciIsImUiLCJkdWFsU2NyZWVuTGVmdCIsInNjcmVlbkxlZnQiLCJ1bmRlZmluZWQiLCJzY3JlZW5YIiwiZHVhbFNjcmVlblRvcCIsInNjcmVlblRvcCIsInNjcmVlblkiLCJjb250YWluZXJXaWR0aCIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsInNjcmVlbiIsImNvbnRhaW5lckhlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwibGVmdCIsInRvcCIsIm5ld1dpbmRvdyIsIm9wZW4iLCJjdXJyZW50VGFyZ2V0IiwiZm9jdXMiLCJwcmV2ZW50RGVmYXVsdCIsImxvY2F0aW9uIiwicmVmZXJyZXIiLCJzcGlubmVyIiwib3BhY2l0eSIsInNldFRpbWVvdXQiLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxHQUFNO0FBQ2xCLE1BQU1DLEVBQUUsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCQyxJQUF2QixDQUE0QkYsUUFBNUIsQ0FBWDtBQUNBLE1BQU1HLEdBQUcsR0FBR0gsUUFBUSxDQUFDSSxnQkFBVCxDQUEwQkYsSUFBMUIsQ0FBK0JGLFFBQS9CLENBQVo7O0FBRUEsV0FBU0ssU0FBVCxDQUFvQkMsSUFBcEIsRUFBMEI7QUFDeEIsUUFBTUMsV0FBVyxHQUFHUCxRQUFRLENBQUNRLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEI7QUFDQUQsSUFBQUEsV0FBVyxDQUFDRSxHQUFaLEdBQWtCLFlBQWxCO0FBQ0FGLElBQUFBLFdBQVcsQ0FBQ0QsSUFBWixHQUFtQkEsSUFBbkI7QUFDQU4sSUFBQUEsUUFBUSxDQUFDVSxJQUFULENBQWNDLFdBQWQsQ0FBMEJKLFdBQTFCO0FBQ0Q7O0FBRUQsV0FBU0ssVUFBVCxDQUFxQkMsR0FBckIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQ2xDLFFBQU1DLGFBQWEsR0FBR2YsUUFBUSxDQUFDUSxhQUFULENBQXVCLFFBQXZCLENBQXRCO0FBQ0FPLElBQUFBLGFBQWEsQ0FBQ0YsR0FBZCxHQUFvQkEsR0FBcEI7QUFDQUMsSUFBQUEsUUFBUSxJQUFJQyxhQUFhLENBQUNDLGdCQUFkLENBQStCLE1BQS9CLEVBQXVDRixRQUF2QyxDQUFaO0FBQ0FkLElBQUFBLFFBQVEsQ0FBQ2lCLElBQVQsQ0FBY04sV0FBZCxDQUEwQkksYUFBMUI7QUFDRCxHQWhCaUIs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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTs7QUFDQWxGLEVBQUFBLEdBQUcsQ0FBQyxzQkFBRCxDQUFILENBQTRCNkMsT0FBNUIsQ0FBb0MsVUFBQUMsSUFBSSxFQUFJO0FBQUVBLElBQUFBLElBQUksQ0FBQ1IsS0FBTCxHQUFhUSxJQUFJLENBQUNSLEtBQUwsSUFBY2QsTUFBTSxDQUFDMkQsUUFBUCxDQUFnQmhGLElBQTNDO0FBQWlELEdBQS9GO0FBQ0FILEVBQUFBLEdBQUcsQ0FBQyxzQkFBRCxDQUFILENBQTRCNkMsT0FBNUIsQ0FBb0MsVUFBQUMsSUFBSSxFQUFJO0FBQUVBLElBQUFBLElBQUksQ0FBQ1IsS0FBTCxHQUFhUSxJQUFJLENBQUNSLEtBQUwsSUFBY3pDLFFBQVEsQ0FBQ3VGLFFBQXBDO0FBQThDLEdBQTVGLEVBcEprQixDQXNKbEI7QUFDQTs7QUFDQSxNQUFNQyxPQUFPLEdBQUd6RixFQUFFLENBQUMsZUFBRCxDQUFsQjs7QUFDQSxNQUFJeUYsT0FBSixFQUFhO0FBQ1g7QUFDQUEsSUFBQUEsT0FBTyxDQUFDaEMsS0FBUixDQUFjaUMsT0FBZCxHQUF3QixDQUF4QjtBQUNBQyxJQUFBQSxVQUFVLENBQUM7QUFBQSxhQUFNRixPQUFPLENBQUNoRSxhQUFSLENBQXNCbUUsV0FBdEIsQ0FBa0NILE9BQWxDLENBQU47QUFBQSxLQUFELEVBQW1ELElBQW5ELENBQVY7QUFDRDtBQUNGLENBOUpEOztBQWdLQTdELE1BQU0sQ0FBQ1gsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NsQixLQUFoQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNldHVwID0gKCkgPT4ge1xuICBjb25zdCBxcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcbiAgY29uc3QgcXNhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbC5iaW5kKGRvY3VtZW50KVxuXG4gIGZ1bmN0aW9uIGxvYWRTdHlsZSAoaHJlZikge1xuICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgbGlua0VsZW1lbnQucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgbGlua0VsZW1lbnQuaHJlZiA9IGhyZWZcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KVxuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFNjcmlwdCAoc3JjLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gc3JjXG4gICAgY2FsbGJhY2sgJiYgc2NyaXB0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2FsbGJhY2spXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KVxuICB9XG5cbiAgLy8gc2VhcmNoXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IGlucHV0RWxlbWVudCA9IHFzKCcjc2VhcmNoX2lucHV0JylcbiAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL2dob3N0LXNlYXJjaC9kaXN0L2dob3N0LXNlYXJjaC5qcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcmVzdWx0RWxlbWVudC5pZCA9ICdzZWFyY2hfcmVzdWx0J1xuICAgICAgcmVzdWx0RWxlbWVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0J1xuICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQucGxhY2Vob2xkZXJ9PC9zcGFuPmBcbiAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duJylcbiAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHJlc3VsdEVsZW1lbnQpXG5cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xuICAgICAgbmV3IHdpbmRvdy5HaG9zdFNlYXJjaCh7XG4gICAgICAgIGlucHV0OiAnI3NlYXJjaF9pbnB1dCcsXG4gICAgICAgIHJlc3VsdHM6ICcjc2VhcmNoX3Jlc3VsdCcsXG4gICAgICAgIHRlbXBsYXRlOiBpID0+IGA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiJHtpLnVybH1cIj4ke2kudGl0bGV9PC9hPmAsXG4gICAgICAgIGFwaToge1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgZmllbGRzOiBbJ3VybCcsICd0aXRsZSddIH1cbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBhZnRlckRpc3BsYXk6IHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdHMudG90YWwgIT09IDApIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsdWUpIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQuZGF0YXNldFsnZW1wdHknXX08L3NwYW4+YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gaW1nIGxhenlsb2FkXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGlmIChxcygnLnBvc3QtY2FyZCBbZGF0YS1zcmNdJykpIHtcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS92YW5pbGxhLWxhenlsb2FkJywgKCkgPT4ge1xuICAgICAgd2luZG93Lmxhenlsb2FkZXIgPSBuZXcgd2luZG93LkxhenlMb2FkKHtcbiAgICAgICAgZWxlbWVudHNfc2VsZWN0b3I6ICcucG9zdC1jYXJkIFtkYXRhLXNyY10nXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBoaWdobGlnaHQgcHJpc21qc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBjb2RlRWxlbWVudHMgPSBxc2EoJy5wb3N0LWNvbnRlbnQgcHJlIGNvZGUnKVxuICBpZiAoY29kZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgIC8vIC8vIGNvZGUgY2FyZCBwb2x5ZmlsbFxuICAgIC8vIGNvZGVFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vICAgaXRlbS5jbGFzc0xpc3QubGVuZ3RoIHx8IGl0ZW0uY2xhc3NMaXN0LmFkZCgnbGFuZ3VhZ2Utbm9uZScpXG4gICAgLy8gfSlcblxuICAgIC8vIGxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vcHJpc21qcy90aGVtZXMvcHJpc20tb2thaWRpYS5jc3MnKVxuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL3ByaXNtanMvcHJpc20uanMnKVxuICB9XG5cbiAgLy8gZ2FsbGVyeVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBxc2EoJy5rZy1nYWxsZXJ5LWltYWdlID4gaW1nJykuZm9yRWFjaChpdGVtID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBpdGVtLmNsb3Nlc3QoJy5rZy1nYWxsZXJ5LWltYWdlJylcbiAgICBjb25zdCB3aWR0aCA9IGl0ZW0uYXR0cmlidXRlcy53aWR0aC52YWx1ZVxuICAgIGNvbnN0IGhlaWdodCA9IGl0ZW0uYXR0cmlidXRlcy5oZWlnaHQudmFsdWVcbiAgICBjb25zdCByYXRpbyA9IHdpZHRoIC8gaGVpZ2h0XG4gICAgY29udGFpbmVyLnN0eWxlLmZsZXggPSByYXRpbyArICcgMSAwJSdcbiAgfSlcblxuICBjb25zdCBnYWxsZXJ5Q29udGFpbmVycyA9IHFzYSgnLmtnLWdhbGxlcnktY29udGFpbmVyJylcbiAgaWYgKGdhbGxlcnlDb250YWluZXJzLmxlbmd0aCkge1xuICAgIGxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vbGlnaHRnYWxsZXJ5LmpzL2Rpc3QvY3NzL2xpZ2h0Z2FsbGVyeS5taW4uY3NzJylcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9saWdodGdhbGxlcnkuanMvZGlzdC9qcy9saWdodGdhbGxlcnkuanMnLCAoKSA9PiB7XG4gICAgICBnYWxsZXJ5Q29udGFpbmVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5rZy1nYWxsZXJ5LWltYWdlJykuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgIHN1Yi5kYXRhc2V0LnNyYyA9IHN1Yi5jaGlsZHJlblswXS5zcmNcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmxpZ2h0R2FsbGVyeShpdGVtLCB7IHNlbGVjdG9yOiAnLmtnLWdhbGxlcnktaW1hZ2UnIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBUT0RPOiBwb3N0IHNoYXJlXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHFzYSgnLnBvc3Qtc2hhcmUgYScpLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSA2NDBcbiAgICBjb25zdCBoZWlnaHQgPSA0MDBcblxuICAgIGNvbnN0IGR1YWxTY3JlZW5MZWZ0ID0gd2luZG93LnNjcmVlbkxlZnQgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5MZWZ0IDogd2luZG93LnNjcmVlblhcbiAgICBjb25zdCBkdWFsU2NyZWVuVG9wID0gd2luZG93LnNjcmVlblRvcCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlblRvcCA6IHdpbmRvdy5zY3JlZW5ZXG5cbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoID8gd2luZG93LmlubmVyV2lkdGggOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiB3aW5kb3cuc2NyZWVuLndpZHRoXG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgOiB3aW5kb3cuc2NyZWVuLmhlaWdodFxuXG4gICAgY29uc3QgbGVmdCA9ICgoY29udGFpbmVyV2lkdGggLyAyKSAtICh3aWR0aCAvIDIpKSArIGR1YWxTY3JlZW5MZWZ0XG4gICAgY29uc3QgdG9wID0gKChjb250YWluZXJIZWlnaHQgLyAyKSAtIChoZWlnaHQgLyAyKSkgKyBkdWFsU2NyZWVuVG9wXG4gICAgY29uc3QgbmV3V2luZG93ID0gd2luZG93Lm9wZW4oZS5jdXJyZW50VGFyZ2V0LmhyZWYsICdzaGFyZS13aW5kb3cnLCBgc2Nyb2xsYmFycz15ZXMsIHdpZHRoPSR7d2lkdGh9LCBoZWlnaHQ9JHtoZWlnaHR9LCB0b3A9JHt0b3B9LCBsZWZ0PSR7bGVmdH1gKVxuXG4gICAgLy8gUHV0cyBmb2N1cyBvbiB0aGUgbmV3V2luZG93XG4gICAgd2luZG93LmZvY3VzICYmIG5ld1dpbmRvdy5mb2N1cygpXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfSkpXG5cbiAgLy8gcGpheFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAvLyBodHRwczovL3VucGtnLmNvbS9qcXVlcnktcGpheFxuICAvLyAkKGRvY3VtZW50KS5wamF4KCdhW2hyZWZdJywgJ2JvZHknLCB7IGZyYWdtZW50OiAnYm9keScgfSlcbiAgLy8gcXNhKCdhW2hyZWZdJykuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgLy8gICBjb25zdCB1cmwgPSBlLmN1cnJlbnRUYXJnZXQuaHJlZlxuICAvLyAgIGlmICh1cmwgPT09IHdpbmRvdy5sb2NhdGlvbi5ocmVmKSByZXR1cm5cblxuICAvLyAgIGNvbnN0IHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAvLyAgIHhoci5yZXNwb25zZVR5cGUgPSAnZG9jdW1lbnQnXG5cbiAgLy8gICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgLy8gICAgIGNvbnN0IHJlcyA9IHhoci5yZXNwb25zZVxuICAvLyAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB1cmwpXG4gIC8vICAgICBkb2N1bWVudC5oZWFkLmlubmVySFRNTCA9ICcnXG4gIC8vICAgICByZXMucXVlcnlTZWxlY3RvckFsbCgnaGVhZCA+IConKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAvLyAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGl0ZW0pXG4gIC8vICAgICB9KVxuICAvLyAgICAgZG9jdW1lbnQuYm9keSA9IHJlcy5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgLy8gICAgIHNldHVwKClcbiAgLy8gICB9KVxuXG4gIC8vICAgeGhyLm9wZW4oJ0dFVCcsIHVybClcbiAgLy8gICB4aHIuc2VuZChudWxsKVxuXG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vIH0pKVxuXG4gIC8vIHN1YnNjcmliZSBoaWRkZW4gZm9ybSB2YWx1ZVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBxc2EoJ2lucHV0W25hbWU9bG9jYXRpb25dJykuZm9yRWFjaChpdGVtID0+IHsgaXRlbS52YWx1ZSA9IGl0ZW0udmFsdWUgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYgfSlcbiAgcXNhKCdpbnB1dFtuYW1lPXJlZmVycmVyXScpLmZvckVhY2goaXRlbSA9PiB7IGl0ZW0udmFsdWUgPSBpdGVtLnZhbHVlIHx8IGRvY3VtZW50LnJlZmVycmVyIH0pXG5cbiAgLy8gc2l0ZSBwcmVsb2FkZXJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3Qgc3Bpbm5lciA9IHFzKCcuc2l0ZS1zcGlubmVyJylcbiAgaWYgKHNwaW5uZXIpIHtcbiAgICAvLyByZW1vdmUgbG9hZGVyIHNwaW5uZXJcbiAgICBzcGlubmVyLnN0eWxlLm9wYWNpdHkgPSAwXG4gICAgc2V0VGltZW91dCgoKSA9PiBzcGlubmVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoc3Bpbm5lciksIDEwMDApXG4gIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzZXR1cClcbiJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
