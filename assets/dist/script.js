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
  //   loadStyle('https://unpkg.com/lightgallery.js/dist/css/lightgallery.min.css')
  //   loadScript('https://unpkg.com/lightgallery.js/dist/js/lightgallery.js', () => {
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
    loadScript('https://unpkg.com/medium-zoom', function () {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJzZXR1cCIsInFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsInFzYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkU3R5bGUiLCJocmVmIiwibGlua0VsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibG9hZFNjcmlwdCIsInNyYyIsImNhbGxiYWNrIiwic2NyaXB0RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2R5IiwiaW5wdXRFbGVtZW50IiwicmVzdWx0RWxlbWVudCIsImlkIiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwicGxhY2Vob2xkZXIiLCJwYXJlbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwid2luZG93IiwiR2hvc3RTZWFyY2giLCJpbnB1dCIsInJlc3VsdHMiLCJ0ZW1wbGF0ZSIsImkiLCJ1cmwiLCJ0aXRsZSIsImFwaSIsInBhcmFtZXRlcnMiLCJmaWVsZHMiLCJvbiIsImFmdGVyRGlzcGxheSIsInRvdGFsIiwidmFsdWUiLCJkYXRhc2V0IiwibGF6eWxvYWRlciIsIkxhenlMb2FkIiwiZWxlbWVudHNfc2VsZWN0b3IiLCJjb2RlRWxlbWVudHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJ3aWR0aCIsImF0dHJpYnV0ZXMiLCJoZWlnaHQiLCJyYXRpbyIsInN0eWxlIiwiZmxleCIsImdhbGxlcnlDb250YWluZXJzIiwibWVkaXVtWm9vbSIsIm1hcmdpbiIsImJhY2tncm91bmQiLCJlIiwiZHVhbFNjcmVlbkxlZnQiLCJzY3JlZW5MZWZ0IiwidW5kZWZpbmVkIiwic2NyZWVuWCIsImR1YWxTY3JlZW5Ub3AiLCJzY3JlZW5Ub3AiLCJzY3JlZW5ZIiwiY29udGFpbmVyV2lkdGgiLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJzY3JlZW4iLCJjb250YWluZXJIZWlnaHQiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsImxlZnQiLCJ0b3AiLCJuZXdXaW5kb3ciLCJvcGVuIiwiY3VycmVudFRhcmdldCIsImZvY3VzIiwicHJldmVudERlZmF1bHQiLCJsb2NhdGlvbiIsInJlZmVycmVyIiwic3Bpbm5lciIsIm9wYWNpdHkiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBTTtBQUNsQixNQUFNQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBNEJGLFFBQTVCLENBQVg7QUFDQSxNQUFNRyxHQUFHLEdBQUdILFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEJGLElBQTFCLENBQStCRixRQUEvQixDQUFaOztBQUVBLFdBQVNLLFNBQVQsQ0FBb0JDLElBQXBCLEVBQTBCO0FBQ3hCLFFBQU1DLFdBQVcsR0FBR1AsUUFBUSxDQUFDUSxhQUFULENBQXVCLE1BQXZCLENBQXBCO0FBQ0FELElBQUFBLFdBQVcsQ0FBQ0UsR0FBWixHQUFrQixZQUFsQjtBQUNBRixJQUFBQSxXQUFXLENBQUNELElBQVosR0FBbUJBLElBQW5CO0FBQ0FOLElBQUFBLFFBQVEsQ0FBQ1UsSUFBVCxDQUFjQyxXQUFkLENBQTBCSixXQUExQjtBQUNEOztBQUVELFdBQVNLLFVBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCQyxRQUExQixFQUFvQztBQUNsQyxRQUFNQyxhQUFhLEdBQUdmLFFBQVEsQ0FBQ1EsYUFBVCxDQUF1QixRQUF2QixDQUF0QjtBQUNBTyxJQUFBQSxhQUFhLENBQUNGLEdBQWQsR0FBb0JBLEdBQXBCO0FBQ0FDLElBQUFBLFFBQVEsSUFBSUMsYUFBYSxDQUFDQyxnQkFBZCxDQUErQixNQUEvQixFQUF1Q0YsUUFBdkMsQ0FBWjtBQUNBZCxJQUFBQSxRQUFRLENBQUNpQixJQUFULENBQWNOLFdBQWQsQ0FBMEJJLGFBQTFCO0FBQ0QsR0FoQmlCLENBa0JsQjtBQUNBOzs7QUFDQSxNQUFNRyxZQUFZLEdBQUduQixFQUFFLENBQUMsZUFBRCxDQUF2Qjs7QUFDQSxNQUFJbUIsWUFBSixFQUFrQjtBQUNoQk4sSUFBQUEsVUFBVSxDQUFDLHFEQUFELEVBQXdELFlBQU07QUFDdEUsVUFBTU8sYUFBYSxHQUFHbkIsUUFBUSxDQUFDUSxhQUFULENBQXVCLEtBQXZCLENBQXRCO0FBQ0FXLE1BQUFBLGFBQWEsQ0FBQ0MsRUFBZCxHQUFtQixlQUFuQjtBQUNBRCxNQUFBQSxhQUFhLENBQUNFLFNBQWQsR0FBMEIsbUNBQTFCO0FBQ0FGLE1BQUFBLGFBQWEsQ0FBQ0csU0FBZCxvREFBa0VKLFlBQVksQ0FBQ0ssV0FBL0U7QUFDQUwsTUFBQUEsWUFBWSxDQUFDTSxhQUFiLENBQTJCQyxTQUEzQixDQUFxQ0MsR0FBckMsQ0FBeUMsVUFBekM7QUFDQVIsTUFBQUEsWUFBWSxDQUFDTSxhQUFiLENBQTJCYixXQUEzQixDQUF1Q1EsYUFBdkM7QUFFQTs7QUFDQSxVQUFJUSxNQUFNLENBQUNDLFdBQVgsQ0FBdUI7QUFDckJDLFFBQUFBLEtBQUssRUFBRSxlQURjO0FBRXJCQyxRQUFBQSxPQUFPLEVBQUUsZ0JBRlk7QUFHckJDLFFBQUFBLFFBQVEsRUFBRSxrQkFBQUMsQ0FBQztBQUFBLDZEQUFzQ0EsQ0FBQyxDQUFDQyxHQUF4QyxnQkFBZ0RELENBQUMsQ0FBQ0UsS0FBbEQ7QUFBQSxTQUhVO0FBSXJCQyxRQUFBQSxHQUFHLEVBQUU7QUFDSEMsVUFBQUEsVUFBVSxFQUFFO0FBQUVDLFlBQUFBLE1BQU0sRUFBRSxDQUFDLEtBQUQsRUFBUSxPQUFSO0FBQVY7QUFEVCxTQUpnQjtBQU9yQkMsUUFBQUEsRUFBRSxFQUFFO0FBQ0ZDLFVBQUFBLFlBQVksRUFBRSxzQkFBQVQsT0FBTyxFQUFJO0FBQ3ZCLGdCQUFJQSxPQUFPLENBQUNVLEtBQVIsS0FBa0IsQ0FBdEIsRUFBeUIsT0FBTyxLQUFQO0FBQ3pCLGdCQUFJLENBQUN0QixZQUFZLENBQUN1QixLQUFsQixFQUF5QixPQUFPLEtBQVA7QUFDekJ0QixZQUFBQSxhQUFhLENBQUNHLFNBQWQsb0RBQWtFSixZQUFZLENBQUN3QixPQUFiLENBQXFCLE9BQXJCLENBQWxFO0FBQ0Q7QUFMQztBQVBpQixPQUF2QjtBQWVELEtBeEJTLENBQVY7QUF5QkQsR0EvQ2lCLENBaURsQjtBQUNBOzs7QUFDQSxNQUFJM0MsRUFBRSxDQUFDLHVCQUFELENBQU4sRUFBaUM7QUFDL0JhLElBQUFBLFVBQVUsQ0FBQyxvQ0FBRCxFQUF1QyxZQUFNO0FBQ3JEZSxNQUFBQSxNQUFNLENBQUNnQixVQUFQLEdBQW9CLElBQUloQixNQUFNLENBQUNpQixRQUFYLENBQW9CO0FBQ3RDQyxRQUFBQSxpQkFBaUIsRUFBRTtBQURtQixPQUFwQixDQUFwQjtBQUdELEtBSlMsQ0FBVjtBQUtELEdBekRpQixDQTJEbEI7QUFDQTs7O0FBQ0EsTUFBTUMsWUFBWSxHQUFHM0MsR0FBRyxDQUFDLHdCQUFELENBQXhCOztBQUNBLE1BQUkyQyxZQUFZLENBQUNDLE1BQWpCLEVBQXlCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQW5DLElBQUFBLFVBQVUsQ0FBQyxvQ0FBRCxDQUFWO0FBQ0QsR0F0RWlCLENBd0VsQjtBQUNBO0FBRUE7OztBQUNBVCxFQUFBQSxHQUFHLENBQUMseUJBQUQsQ0FBSCxDQUErQjZDLE9BQS9CLENBQXVDLFVBQUFDLElBQUksRUFBSTtBQUM3QyxRQUFNQyxTQUFTLEdBQUdELElBQUksQ0FBQ0UsT0FBTCxDQUFhLG1CQUFiLENBQWxCO0FBQ0EsUUFBTUMsS0FBSyxHQUFHSCxJQUFJLENBQUNJLFVBQUwsQ0FBZ0JELEtBQWhCLENBQXNCWCxLQUFwQztBQUNBLFFBQU1hLE1BQU0sR0FBR0wsSUFBSSxDQUFDSSxVQUFMLENBQWdCQyxNQUFoQixDQUF1QmIsS0FBdEM7QUFDQSxRQUFNYyxLQUFLLEdBQUdILEtBQUssR0FBR0UsTUFBdEI7QUFDQUosSUFBQUEsU0FBUyxDQUFDTSxLQUFWLENBQWdCQyxJQUFoQixHQUF1QkYsS0FBSyxHQUFHLE9BQS9CO0FBQ0QsR0FORCxFQTVFa0IsQ0FvRmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0EsTUFBTUcsaUJBQWlCLEdBQUd2RCxHQUFHLENBQUMsdUJBQUQsQ0FBN0I7O0FBQ0EsTUFBSXVELGlCQUFpQixDQUFDWCxNQUF0QixFQUE4QjtBQUM1Qm5DLElBQUFBLFVBQVUsQ0FBQywrQkFBRCxFQUFrQyxZQUFNO0FBQ2hEO0FBQ0FlLE1BQUFBLE1BQU0sQ0FBQ2dDLFVBQVAsQ0FBa0IseUJBQWxCLEVBQTZDO0FBQzNDQyxRQUFBQSxNQUFNLEVBQUUsRUFEbUM7QUFFM0NDLFFBQUFBLFVBQVUsRUFBRTtBQUYrQixPQUE3QztBQUlELEtBTlMsQ0FBVjtBQU9ELEdBNUdpQixDQThHbEI7QUFDQTs7O0FBQ0ExRCxFQUFBQSxHQUFHLENBQUMsZUFBRCxDQUFILENBQXFCNkMsT0FBckIsQ0FBNkIsVUFBQUMsSUFBSTtBQUFBLFdBQUlBLElBQUksQ0FBQ2pDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUE4QyxDQUFDLEVBQUk7QUFDdkUsVUFBTVYsS0FBSyxHQUFHLEdBQWQ7QUFDQSxVQUFNRSxNQUFNLEdBQUcsR0FBZjtBQUVBLFVBQU1TLGNBQWMsR0FBR3BDLE1BQU0sQ0FBQ3FDLFVBQVAsS0FBc0JDLFNBQXRCLEdBQWtDdEMsTUFBTSxDQUFDcUMsVUFBekMsR0FBc0RyQyxNQUFNLENBQUN1QyxPQUFwRjtBQUNBLFVBQU1DLGFBQWEsR0FBR3hDLE1BQU0sQ0FBQ3lDLFNBQVAsS0FBcUJILFNBQXJCLEdBQWlDdEMsTUFBTSxDQUFDeUMsU0FBeEMsR0FBb0R6QyxNQUFNLENBQUMwQyxPQUFqRjtBQUVBLFVBQU1DLGNBQWMsR0FBRzNDLE1BQU0sQ0FBQzRDLFVBQVAsR0FBb0I1QyxNQUFNLENBQUM0QyxVQUEzQixHQUF3Q3ZFLFFBQVEsQ0FBQ3dFLGVBQVQsQ0FBeUJDLFdBQXpCLEdBQXVDekUsUUFBUSxDQUFDd0UsZUFBVCxDQUF5QkMsV0FBaEUsR0FBOEU5QyxNQUFNLENBQUMrQyxNQUFQLENBQWN0QixLQUEzSjtBQUNBLFVBQU11QixlQUFlLEdBQUdoRCxNQUFNLENBQUNpRCxXQUFQLEdBQXFCakQsTUFBTSxDQUFDaUQsV0FBNUIsR0FBMEM1RSxRQUFRLENBQUN3RSxlQUFULENBQXlCSyxZQUF6QixHQUF3QzdFLFFBQVEsQ0FBQ3dFLGVBQVQsQ0FBeUJLLFlBQWpFLEdBQWdGbEQsTUFBTSxDQUFDK0MsTUFBUCxDQUFjcEIsTUFBaEs7QUFFQSxVQUFNd0IsSUFBSSxHQUFLUixjQUFjLEdBQUcsQ0FBbEIsR0FBd0JsQixLQUFLLEdBQUcsQ0FBakMsR0FBdUNXLGNBQXBEO0FBQ0EsVUFBTWdCLEdBQUcsR0FBS0osZUFBZSxHQUFHLENBQW5CLEdBQXlCckIsTUFBTSxHQUFHLENBQW5DLEdBQXlDYSxhQUFyRDtBQUNBLFVBQU1hLFNBQVMsR0FBR3JELE1BQU0sQ0FBQ3NELElBQVAsQ0FBWW5CLENBQUMsQ0FBQ29CLGFBQUYsQ0FBZ0I1RSxJQUE1QixFQUFrQyxjQUFsQyxrQ0FBMkU4QyxLQUEzRSxzQkFBNEZFLE1BQTVGLG1CQUEyR3lCLEdBQTNHLG9CQUF3SEQsSUFBeEgsRUFBbEIsQ0FadUUsQ0FjdkU7O0FBQ0FuRCxNQUFBQSxNQUFNLENBQUN3RCxLQUFQLElBQWdCSCxTQUFTLENBQUNHLEtBQVYsRUFBaEI7QUFFQXJCLE1BQUFBLENBQUMsQ0FBQ3NCLGNBQUY7QUFDRCxLQWxCb0MsQ0FBSjtBQUFBLEdBQWpDLEVBaEhrQixDQW9JbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7O0FBQ0FqRixFQUFBQSxHQUFHLENBQUMsc0JBQUQsQ0FBSCxDQUE0QjZDLE9BQTVCLENBQW9DLFVBQUFDLElBQUksRUFBSTtBQUFFQSxJQUFBQSxJQUFJLENBQUNSLEtBQUwsR0FBYVEsSUFBSSxDQUFDUixLQUFMLElBQWNkLE1BQU0sQ0FBQzBELFFBQVAsQ0FBZ0IvRSxJQUEzQztBQUFpRCxHQUEvRjtBQUNBSCxFQUFBQSxHQUFHLENBQUMsc0JBQUQsQ0FBSCxDQUE0QjZDLE9BQTVCLENBQW9DLFVBQUFDLElBQUksRUFBSTtBQUFFQSxJQUFBQSxJQUFJLENBQUNSLEtBQUwsR0FBYVEsSUFBSSxDQUFDUixLQUFMLElBQWN6QyxRQUFRLENBQUNzRixRQUFwQztBQUE4QyxHQUE1RixFQW5La0IsQ0FxS2xCO0FBQ0E7O0FBQ0EsTUFBTUMsT0FBTyxHQUFHeEYsRUFBRSxDQUFDLGVBQUQsQ0FBbEI7O0FBQ0EsTUFBSXdGLE9BQUosRUFBYTtBQUNYO0FBQ0FBLElBQUFBLE9BQU8sQ0FBQy9CLEtBQVIsQ0FBY2dDLE9BQWQsR0FBd0IsQ0FBeEI7QUFDQUMsSUFBQUEsVUFBVSxDQUFDO0FBQUEsYUFBTUYsT0FBTyxDQUFDL0QsYUFBUixDQUFzQmtFLFdBQXRCLENBQWtDSCxPQUFsQyxDQUFOO0FBQUEsS0FBRCxFQUFtRCxJQUFuRCxDQUFWO0FBQ0Q7QUFDRixDQTdLRDs7QUErS0E1RCxNQUFNLENBQUNYLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDbEIsS0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgcXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXG4gIGNvbnN0IHFzYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYmluZChkb2N1bWVudClcblxuICBmdW5jdGlvbiBsb2FkU3R5bGUgKGhyZWYpIHtcbiAgICBjb25zdCBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgIGxpbmtFbGVtZW50LnJlbCA9ICdzdHlsZXNoZWV0J1xuICAgIGxpbmtFbGVtZW50LmhyZWYgPSBocmVmXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRTY3JpcHQgKHNyYywgY2FsbGJhY2spIHtcbiAgICBjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcbiAgICBzY3JpcHRFbGVtZW50LnNyYyA9IHNyY1xuICAgIGNhbGxiYWNrICYmIHNjcmlwdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNhbGxiYWNrKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudClcbiAgfVxuXG4gIC8vIHNlYXJjaFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBpbnB1dEVsZW1lbnQgPSBxcygnI3NlYXJjaF9pbnB1dCcpXG4gIGlmIChpbnB1dEVsZW1lbnQpIHtcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9naG9zdC1zZWFyY2gvZGlzdC9naG9zdC1zZWFyY2guanMnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHJlc3VsdEVsZW1lbnQuaWQgPSAnc2VhcmNoX3Jlc3VsdCdcbiAgICAgIHJlc3VsdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodCdcbiAgICAgIHJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZHJvcGRvd24taXRlbSBkaXNhYmxlZFwiPiR7aW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyfTwvc3Bhbj5gXG4gICAgICBpbnB1dEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcm9wZG93bicpXG4gICAgICBpbnB1dEVsZW1lbnQucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChyZXN1bHRFbGVtZW50KVxuXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXcgKi9cbiAgICAgIG5ldyB3aW5kb3cuR2hvc3RTZWFyY2goe1xuICAgICAgICBpbnB1dDogJyNzZWFyY2hfaW5wdXQnLFxuICAgICAgICByZXN1bHRzOiAnI3NlYXJjaF9yZXN1bHQnLFxuICAgICAgICB0ZW1wbGF0ZTogaSA9PiBgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiR7aS51cmx9XCI+JHtpLnRpdGxlfTwvYT5gLFxuICAgICAgICBhcGk6IHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IGZpZWxkczogWyd1cmwnLCAndGl0bGUnXSB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgYWZ0ZXJEaXNwbGF5OiByZXN1bHRzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLnRvdGFsICE9PSAwKSByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGlmICghaW5wdXRFbGVtZW50LnZhbHVlKSByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIHJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZHJvcGRvd24taXRlbSBkaXNhYmxlZFwiPiR7aW5wdXRFbGVtZW50LmRhdGFzZXRbJ2VtcHR5J119PC9zcGFuPmBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8vIGltZyBsYXp5bG9hZFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBpZiAocXMoJy5wb3N0LWNhcmQgW2RhdGEtc3JjXScpKSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vdmFuaWxsYS1sYXp5bG9hZCcsICgpID0+IHtcbiAgICAgIHdpbmRvdy5sYXp5bG9hZGVyID0gbmV3IHdpbmRvdy5MYXp5TG9hZCh7XG4gICAgICAgIGVsZW1lbnRzX3NlbGVjdG9yOiAnLnBvc3QtY2FyZCBbZGF0YS1zcmNdJ1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gaGlnaGxpZ2h0IHByaXNtanNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgY29kZUVsZW1lbnRzID0gcXNhKCcucG9zdC1jb250ZW50IHByZSBjb2RlJylcbiAgaWYgKGNvZGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAvLyAvLyBjb2RlIGNhcmQgcG9seWZpbGxcbiAgICAvLyBjb2RlRWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAvLyAgIGl0ZW0uY2xhc3NMaXN0Lmxlbmd0aCB8fCBpdGVtLmNsYXNzTGlzdC5hZGQoJ2xhbmd1YWdlLW5vbmUnKVxuICAgIC8vIH0pXG5cbiAgICAvLyBsb2FkU3R5bGUoJ2h0dHBzOi8vdW5wa2cuY29tL3ByaXNtanMvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzJylcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9wcmlzbWpzL3ByaXNtLmpzJylcbiAgfVxuXG4gIC8vIGdhbGxlcnlcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBmbGV4XG4gIHFzYSgnLmtnLWdhbGxlcnktaW1hZ2UgPiBpbWcnKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGl0ZW0uY2xvc2VzdCgnLmtnLWdhbGxlcnktaW1hZ2UnKVxuICAgIGNvbnN0IHdpZHRoID0gaXRlbS5hdHRyaWJ1dGVzLndpZHRoLnZhbHVlXG4gICAgY29uc3QgaGVpZ2h0ID0gaXRlbS5hdHRyaWJ1dGVzLmhlaWdodC52YWx1ZVxuICAgIGNvbnN0IHJhdGlvID0gd2lkdGggLyBoZWlnaHRcbiAgICBjb250YWluZXIuc3R5bGUuZmxleCA9IHJhdGlvICsgJyAxIDAlJ1xuICB9KVxuXG4gIC8vIC8vIGxpZ2h0Ym94XG4gIC8vIGNvbnN0IGdhbGxlcnlDb250YWluZXJzID0gcXNhKCcua2ctZ2FsbGVyeS1jb250YWluZXInKVxuICAvLyBpZiAoZ2FsbGVyeUNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gIC8vICAgbG9hZFN0eWxlKCdodHRwczovL3VucGtnLmNvbS9saWdodGdhbGxlcnkuanMvZGlzdC9jc3MvbGlnaHRnYWxsZXJ5Lm1pbi5jc3MnKVxuICAvLyAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL2xpZ2h0Z2FsbGVyeS5qcy9kaXN0L2pzL2xpZ2h0Z2FsbGVyeS5qcycsICgpID0+IHtcbiAgLy8gICAgIGdhbGxlcnlDb250YWluZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gIC8vICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgnLmtnLWdhbGxlcnktaW1hZ2UnKS5mb3JFYWNoKHN1YiA9PiB7XG4gIC8vICAgICAgICAgc3ViLmRhdGFzZXQuc3JjID0gc3ViLmNoaWxkcmVuWzBdLnNyY1xuICAvLyAgICAgICB9KVxuICAvLyAgICAgICB3aW5kb3cubGlnaHRHYWxsZXJ5KGl0ZW0sIHsgc2VsZWN0b3I6ICcua2ctZ2FsbGVyeS1pbWFnZScgfSlcbiAgLy8gICAgIH0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIC8vIG1lZGl1bS16b29tXG4gIGNvbnN0IGdhbGxlcnlDb250YWluZXJzID0gcXNhKCcua2ctZ2FsbGVyeS1jb250YWluZXInKVxuICBpZiAoZ2FsbGVyeUNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vbWVkaXVtLXpvb20nLCAoKSA9PiB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb20jYXBpXG4gICAgICB3aW5kb3cubWVkaXVtWm9vbSgnLmtnLWdhbGxlcnktaW1hZ2UgPiBpbWcnLCB7XG4gICAgICAgIG1hcmdpbjogMjAsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjMDAwJ1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gVE9ETzogcG9zdCBzaGFyZVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBxc2EoJy5wb3N0LXNoYXJlIGEnKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gNjQwXG4gICAgY29uc3QgaGVpZ2h0ID0gNDAwXG5cbiAgICBjb25zdCBkdWFsU2NyZWVuTGVmdCA9IHdpbmRvdy5zY3JlZW5MZWZ0ICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuc2NyZWVuTGVmdCA6IHdpbmRvdy5zY3JlZW5YXG4gICAgY29uc3QgZHVhbFNjcmVlblRvcCA9IHdpbmRvdy5zY3JlZW5Ub3AgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5Ub3AgOiB3aW5kb3cuc2NyZWVuWVxuXG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCA/IHdpbmRvdy5pbm5lcldpZHRoIDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDogd2luZG93LnNjcmVlbi53aWR0aFxuICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IDogd2luZG93LnNjcmVlbi5oZWlnaHRcblxuICAgIGNvbnN0IGxlZnQgPSAoKGNvbnRhaW5lcldpZHRoIC8gMikgLSAod2lkdGggLyAyKSkgKyBkdWFsU2NyZWVuTGVmdFxuICAgIGNvbnN0IHRvcCA9ICgoY29udGFpbmVySGVpZ2h0IC8gMikgLSAoaGVpZ2h0IC8gMikpICsgZHVhbFNjcmVlblRvcFxuICAgIGNvbnN0IG5ld1dpbmRvdyA9IHdpbmRvdy5vcGVuKGUuY3VycmVudFRhcmdldC5ocmVmLCAnc2hhcmUtd2luZG93JywgYHNjcm9sbGJhcnM9eWVzLCB3aWR0aD0ke3dpZHRofSwgaGVpZ2h0PSR7aGVpZ2h0fSwgdG9wPSR7dG9wfSwgbGVmdD0ke2xlZnR9YClcblxuICAgIC8vIFB1dHMgZm9jdXMgb24gdGhlIG5ld1dpbmRvd1xuICAgIHdpbmRvdy5mb2N1cyAmJiBuZXdXaW5kb3cuZm9jdXMoKVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH0pKVxuXG4gIC8vIHBqYXhcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gLy8gaHR0cHM6Ly91bnBrZy5jb20vanF1ZXJ5LXBqYXhcbiAgLy8gJChkb2N1bWVudCkucGpheCgnYVtocmVmXScsICdib2R5JywgeyBmcmFnbWVudDogJ2JvZHknIH0pXG4gIC8vIHFzYSgnYVtocmVmXScpLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIC8vICAgY29uc3QgdXJsID0gZS5jdXJyZW50VGFyZ2V0LmhyZWZcbiAgLy8gICBpZiAodXJsID09PSB3aW5kb3cubG9jYXRpb24uaHJlZikgcmV0dXJuXG5cbiAgLy8gICBjb25zdCB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgLy8gICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50J1xuXG4gIC8vICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIC8vICAgICBjb25zdCByZXMgPSB4aHIucmVzcG9uc2VcbiAgLy8gICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgdXJsKVxuICAvLyAgICAgZG9jdW1lbnQuaGVhZC5pbm5lckhUTUwgPSAnJ1xuICAvLyAgICAgcmVzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWQgPiAqJykuZm9yRWFjaChpdGVtID0+IHtcbiAgLy8gICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChpdGVtKVxuICAvLyAgICAgfSlcbiAgLy8gICAgIGRvY3VtZW50LmJvZHkgPSByZXMucXVlcnlTZWxlY3RvcignYm9keScpXG4gIC8vICAgICBzZXR1cCgpXG4gIC8vICAgfSlcblxuICAvLyAgIHhoci5vcGVuKCdHRVQnLCB1cmwpXG4gIC8vICAgeGhyLnNlbmQobnVsbClcblxuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvLyB9KSlcblxuICAvLyBzdWJzY3JpYmUgaGlkZGVuIGZvcm0gdmFsdWVcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcXNhKCdpbnB1dFtuYW1lPWxvY2F0aW9uXScpLmZvckVhY2goaXRlbSA9PiB7IGl0ZW0udmFsdWUgPSBpdGVtLnZhbHVlIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH0pXG4gIHFzYSgnaW5wdXRbbmFtZT1yZWZlcnJlcl0nKS5mb3JFYWNoKGl0ZW0gPT4geyBpdGVtLnZhbHVlID0gaXRlbS52YWx1ZSB8fCBkb2N1bWVudC5yZWZlcnJlciB9KVxuXG4gIC8vIHNpdGUgcHJlbG9hZGVyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IHNwaW5uZXIgPSBxcygnLnNpdGUtc3Bpbm5lcicpXG4gIGlmIChzcGlubmVyKSB7XG4gICAgLy8gcmVtb3ZlIGxvYWRlciBzcGlubmVyXG4gICAgc3Bpbm5lci5zdHlsZS5vcGFjaXR5ID0gMFxuICAgIHNldFRpbWVvdXQoKCkgPT4gc3Bpbm5lci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHNwaW5uZXIpLCAxMDAwKVxuICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2V0dXApXG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
