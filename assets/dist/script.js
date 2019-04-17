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
    loadScript('https://unpkg.com/@tryghost/content-api@1.2.1/umd/content-api.min.js', function () {
      loadScript('https://unpkg.com/ghost-search@1.0.1/dist/ghost-search.min.js', function () {
        var resultElement = document.createElement('div');
        resultElement.id = 'search_result';
        resultElement.className = 'dropdown-menu dropdown-menu-right';
        resultElement.innerHTML = "<span class=\"dropdown-item disabled\">".concat(inputElement.placeholder, "</span>");
        inputElement.parentElement.classList.add('dropdown');
        inputElement.parentElement.appendChild(resultElement);
        /* eslint-disable no-new */

        new window.GhostSearch({
          host: window.location.origin,
          key: '72e50cdab47d696e88d20aca0c',
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJzZXR1cCIsInFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsInFzYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkU2NyaXB0Iiwic3JjIiwiY2FsbGJhY2siLCJzY3JpcHRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJpbnB1dEVsZW1lbnQiLCJyZXN1bHRFbGVtZW50IiwiaWQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJwbGFjZWhvbGRlciIsInBhcmVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aW5kb3ciLCJHaG9zdFNlYXJjaCIsImhvc3QiLCJsb2NhdGlvbiIsIm9yaWdpbiIsImtleSIsImlucHV0IiwicmVzdWx0cyIsInRlbXBsYXRlIiwiaSIsInVybCIsInRpdGxlIiwiYXBpIiwicmVzb3VyY2UiLCJwYXJhbWV0ZXJzIiwiZmllbGRzIiwib24iLCJhZnRlckRpc3BsYXkiLCJ0b3RhbCIsInZhbHVlIiwiZGF0YXNldCIsImxhenlsb2FkZXIiLCJMYXp5TG9hZCIsImVsZW1lbnRzX3NlbGVjdG9yIiwiY29kZUVsZW1lbnRzIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJjb250YWluZXIiLCJjbG9zZXN0Iiwid2lkdGgiLCJhdHRyaWJ1dGVzIiwiaGVpZ2h0IiwicmF0aW8iLCJzdHlsZSIsImZsZXgiLCJnYWxsZXJ5Q29udGFpbmVycyIsIm1lZGl1bVpvb20iLCJtYXJnaW4iLCJiYWNrZ3JvdW5kIiwiZSIsImR1YWxTY3JlZW5MZWZ0Iiwic2NyZWVuTGVmdCIsInVuZGVmaW5lZCIsInNjcmVlblgiLCJkdWFsU2NyZWVuVG9wIiwic2NyZWVuVG9wIiwic2NyZWVuWSIsImNvbnRhaW5lcldpZHRoIiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwic2NyZWVuIiwiY29udGFpbmVySGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJsZWZ0IiwidG9wIiwibmV3V2luZG93Iiwib3BlbiIsImN1cnJlbnRUYXJnZXQiLCJocmVmIiwiZm9jdXMiLCJwcmV2ZW50RGVmYXVsdCIsInJlZmVycmVyIiwic3Bpbm5lciIsIm9wYWNpdHkiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBTTtBQUNsQixNQUFNQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBNEJGLFFBQTVCLENBQVg7QUFDQSxNQUFNRyxHQUFHLEdBQUdILFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEJGLElBQTFCLENBQStCRixRQUEvQixDQUFaLENBRmtCLENBSWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFTSyxVQUFULENBQXFCQyxHQUFyQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDbEMsUUFBTUMsYUFBYSxHQUFHUixRQUFRLENBQUNTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7QUFDQUQsSUFBQUEsYUFBYSxDQUFDRixHQUFkLEdBQW9CQSxHQUFwQjtBQUNBQyxJQUFBQSxRQUFRLElBQUlDLGFBQWEsQ0FBQ0UsZ0JBQWQsQ0FBK0IsTUFBL0IsRUFBdUNILFFBQXZDLENBQVo7QUFDQVAsSUFBQUEsUUFBUSxDQUFDVyxJQUFULENBQWNDLFdBQWQsQ0FBMEJKLGFBQTFCO0FBQ0QsR0FoQmlCLENBa0JsQjtBQUNBOzs7QUFDQSxNQUFNSyxZQUFZLEdBQUdkLEVBQUUsQ0FBQyxlQUFELENBQXZCOztBQUNBLE1BQUljLFlBQUosRUFBa0I7QUFDaEJSLElBQUFBLFVBQVUsQ0FBQyxzRUFBRCxFQUF5RSxZQUFNO0FBQ3ZGQSxNQUFBQSxVQUFVLENBQUMsK0RBQUQsRUFBa0UsWUFBTTtBQUNoRixZQUFNUyxhQUFhLEdBQUdkLFFBQVEsQ0FBQ1MsYUFBVCxDQUF1QixLQUF2QixDQUF0QjtBQUNBSyxRQUFBQSxhQUFhLENBQUNDLEVBQWQsR0FBbUIsZUFBbkI7QUFDQUQsUUFBQUEsYUFBYSxDQUFDRSxTQUFkLEdBQTBCLG1DQUExQjtBQUNBRixRQUFBQSxhQUFhLENBQUNHLFNBQWQsb0RBQWtFSixZQUFZLENBQUNLLFdBQS9FO0FBQ0FMLFFBQUFBLFlBQVksQ0FBQ00sYUFBYixDQUEyQkMsU0FBM0IsQ0FBcUNDLEdBQXJDLENBQXlDLFVBQXpDO0FBQ0FSLFFBQUFBLFlBQVksQ0FBQ00sYUFBYixDQUEyQlAsV0FBM0IsQ0FBdUNFLGFBQXZDO0FBRUE7O0FBQ0EsWUFBSVEsTUFBTSxDQUFDQyxXQUFYLENBQXVCO0FBQ3JCQyxVQUFBQSxJQUFJLEVBQUVGLE1BQU0sQ0FBQ0csUUFBUCxDQUFnQkMsTUFERDtBQUVyQkMsVUFBQUEsR0FBRyxFQUFFLDRCQUZnQjtBQUdyQkMsVUFBQUEsS0FBSyxFQUFFLGVBSGM7QUFJckJDLFVBQUFBLE9BQU8sRUFBRSxnQkFKWTtBQUtyQkMsVUFBQUEsUUFBUSxFQUFFLGtCQUFBQyxDQUFDO0FBQUEsK0RBQXNDQSxDQUFDLENBQUNDLEdBQXhDLGdCQUFnREQsQ0FBQyxDQUFDRSxLQUFsRDtBQUFBLFdBTFU7QUFNckJDLFVBQUFBLEdBQUcsRUFBRTtBQUNIQyxZQUFBQSxRQUFRLEVBQUUsT0FEUDtBQUVIQyxZQUFBQSxVQUFVLEVBQUU7QUFBRUMsY0FBQUEsTUFBTSxFQUFFLENBQUMsS0FBRCxFQUFRLE9BQVI7QUFBVjtBQUZULFdBTmdCO0FBVXJCQyxVQUFBQSxFQUFFLEVBQUU7QUFDRkMsWUFBQUEsWUFBWSxFQUFFLHNCQUFBVixPQUFPLEVBQUk7QUFDdkIsa0JBQUlBLE9BQU8sQ0FBQ1csS0FBUixLQUFrQixDQUF0QixFQUF5QixPQUFPLEtBQVA7QUFDekIsa0JBQUksQ0FBQzNCLFlBQVksQ0FBQzRCLEtBQWxCLEVBQXlCLE9BQU8sS0FBUDtBQUN6QjNCLGNBQUFBLGFBQWEsQ0FBQ0csU0FBZCxvREFBa0VKLFlBQVksQ0FBQzZCLE9BQWIsQ0FBcUIsT0FBckIsQ0FBbEU7QUFDRDtBQUxDO0FBVmlCLFNBQXZCO0FBa0JELE9BM0JTLENBQVY7QUE0QkQsS0E3QlMsQ0FBVjtBQThCRCxHQXBEaUIsQ0FzRGxCO0FBQ0E7OztBQUNBLE1BQUkzQyxFQUFFLENBQUMsdUJBQUQsQ0FBTixFQUFpQztBQUMvQk0sSUFBQUEsVUFBVSxDQUFDLHVFQUFELEVBQTBFLFlBQU07QUFDeEZpQixNQUFBQSxNQUFNLENBQUNxQixVQUFQLEdBQW9CLElBQUlyQixNQUFNLENBQUNzQixRQUFYLENBQW9CO0FBQ3RDQyxRQUFBQSxpQkFBaUIsRUFBRTtBQURtQixPQUFwQixDQUFwQjtBQUdELEtBSlMsQ0FBVjtBQUtELEdBOURpQixDQWdFbEI7QUFDQTs7O0FBQ0EsTUFBTUMsWUFBWSxHQUFHM0MsR0FBRyxDQUFDLHdCQUFELENBQXhCOztBQUNBLE1BQUkyQyxZQUFZLENBQUNDLE1BQWpCLEVBQXlCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTFDLElBQUFBLFVBQVUsQ0FBQywyQ0FBRCxDQUFWO0FBQ0QsR0EzRWlCLENBNkVsQjtBQUNBO0FBRUE7OztBQUNBRixFQUFBQSxHQUFHLENBQUMseUJBQUQsQ0FBSCxDQUErQjZDLE9BQS9CLENBQXVDLFVBQUFDLElBQUksRUFBSTtBQUM3QyxRQUFNQyxTQUFTLEdBQUdELElBQUksQ0FBQ0UsT0FBTCxDQUFhLG1CQUFiLENBQWxCO0FBQ0EsUUFBTUMsS0FBSyxHQUFHSCxJQUFJLENBQUNJLFVBQUwsQ0FBZ0JELEtBQWhCLENBQXNCWCxLQUFwQztBQUNBLFFBQU1hLE1BQU0sR0FBR0wsSUFBSSxDQUFDSSxVQUFMLENBQWdCQyxNQUFoQixDQUF1QmIsS0FBdEM7QUFDQSxRQUFNYyxLQUFLLEdBQUdILEtBQUssR0FBR0UsTUFBdEI7QUFDQUosSUFBQUEsU0FBUyxDQUFDTSxLQUFWLENBQWdCQyxJQUFoQixHQUF1QkYsS0FBSyxHQUFHLE9BQS9CO0FBQ0QsR0FORCxFQWpGa0IsQ0F5RmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0EsTUFBTUcsaUJBQWlCLEdBQUd2RCxHQUFHLENBQUMsdUJBQUQsQ0FBN0I7O0FBQ0EsTUFBSXVELGlCQUFpQixDQUFDWCxNQUF0QixFQUE4QjtBQUM1QjFDLElBQUFBLFVBQVUsQ0FBQyw2REFBRCxFQUFnRSxZQUFNO0FBQzlFO0FBQ0FpQixNQUFBQSxNQUFNLENBQUNxQyxVQUFQLENBQWtCLHlCQUFsQixFQUE2QztBQUMzQ0MsUUFBQUEsTUFBTSxFQUFFLEVBRG1DO0FBRTNDQyxRQUFBQSxVQUFVLEVBQUU7QUFGK0IsT0FBN0M7QUFJRCxLQU5TLENBQVY7QUFPRCxHQWpIaUIsQ0FtSGxCO0FBQ0E7OztBQUNBMUQsRUFBQUEsR0FBRyxDQUFDLGVBQUQsQ0FBSCxDQUFxQjZDLE9BQXJCLENBQTZCLFVBQUFDLElBQUk7QUFBQSxXQUFJQSxJQUFJLENBQUN2QyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixVQUFBb0QsQ0FBQyxFQUFJO0FBQ3ZFLFVBQU1WLEtBQUssR0FBRyxHQUFkO0FBQ0EsVUFBTUUsTUFBTSxHQUFHLEdBQWY7QUFFQSxVQUFNUyxjQUFjLEdBQUd6QyxNQUFNLENBQUMwQyxVQUFQLEtBQXNCQyxTQUF0QixHQUFrQzNDLE1BQU0sQ0FBQzBDLFVBQXpDLEdBQXNEMUMsTUFBTSxDQUFDNEMsT0FBcEY7QUFDQSxVQUFNQyxhQUFhLEdBQUc3QyxNQUFNLENBQUM4QyxTQUFQLEtBQXFCSCxTQUFyQixHQUFpQzNDLE1BQU0sQ0FBQzhDLFNBQXhDLEdBQW9EOUMsTUFBTSxDQUFDK0MsT0FBakY7QUFFQSxVQUFNQyxjQUFjLEdBQUdoRCxNQUFNLENBQUNpRCxVQUFQLEdBQW9CakQsTUFBTSxDQUFDaUQsVUFBM0IsR0FBd0N2RSxRQUFRLENBQUN3RSxlQUFULENBQXlCQyxXQUF6QixHQUF1Q3pFLFFBQVEsQ0FBQ3dFLGVBQVQsQ0FBeUJDLFdBQWhFLEdBQThFbkQsTUFBTSxDQUFDb0QsTUFBUCxDQUFjdEIsS0FBM0o7QUFDQSxVQUFNdUIsZUFBZSxHQUFHckQsTUFBTSxDQUFDc0QsV0FBUCxHQUFxQnRELE1BQU0sQ0FBQ3NELFdBQTVCLEdBQTBDNUUsUUFBUSxDQUFDd0UsZUFBVCxDQUF5QkssWUFBekIsR0FBd0M3RSxRQUFRLENBQUN3RSxlQUFULENBQXlCSyxZQUFqRSxHQUFnRnZELE1BQU0sQ0FBQ29ELE1BQVAsQ0FBY3BCLE1BQWhLO0FBRUEsVUFBTXdCLElBQUksR0FBS1IsY0FBYyxHQUFHLENBQWxCLEdBQXdCbEIsS0FBSyxHQUFHLENBQWpDLEdBQXVDVyxjQUFwRDtBQUNBLFVBQU1nQixHQUFHLEdBQUtKLGVBQWUsR0FBRyxDQUFuQixHQUF5QnJCLE1BQU0sR0FBRyxDQUFuQyxHQUF5Q2EsYUFBckQ7QUFDQSxVQUFNYSxTQUFTLEdBQUcxRCxNQUFNLENBQUMyRCxJQUFQLENBQVluQixDQUFDLENBQUNvQixhQUFGLENBQWdCQyxJQUE1QixFQUFrQyxjQUFsQyxrQ0FBMkUvQixLQUEzRSxzQkFBNEZFLE1BQTVGLG1CQUEyR3lCLEdBQTNHLG9CQUF3SEQsSUFBeEgsRUFBbEIsQ0FadUUsQ0FjdkU7O0FBQ0F4RCxNQUFBQSxNQUFNLENBQUM4RCxLQUFQLElBQWdCSixTQUFTLENBQUNJLEtBQVYsRUFBaEI7QUFFQXRCLE1BQUFBLENBQUMsQ0FBQ3VCLGNBQUY7QUFDRCxLQWxCb0MsQ0FBSjtBQUFBLEdBQWpDLEVBckhrQixDQXlJbEI7QUFDQTs7QUFDQWxGLEVBQUFBLEdBQUcsQ0FBQyxzQkFBRCxDQUFILENBQTRCNkMsT0FBNUIsQ0FBb0MsVUFBQUMsSUFBSSxFQUFJO0FBQUVBLElBQUFBLElBQUksQ0FBQ1IsS0FBTCxHQUFhUSxJQUFJLENBQUNSLEtBQUwsSUFBY25CLE1BQU0sQ0FBQ0csUUFBUCxDQUFnQjBELElBQTNDO0FBQWlELEdBQS9GO0FBQ0FoRixFQUFBQSxHQUFHLENBQUMsc0JBQUQsQ0FBSCxDQUE0QjZDLE9BQTVCLENBQW9DLFVBQUFDLElBQUksRUFBSTtBQUFFQSxJQUFBQSxJQUFJLENBQUNSLEtBQUwsR0FBYVEsSUFBSSxDQUFDUixLQUFMLElBQWN6QyxRQUFRLENBQUNzRixRQUFwQztBQUE4QyxHQUE1RixFQTVJa0IsQ0E4SWxCO0FBQ0E7O0FBQ0EsTUFBTUMsT0FBTyxHQUFHeEYsRUFBRSxDQUFDLGVBQUQsQ0FBbEI7O0FBQ0EsTUFBSXdGLE9BQUosRUFBYTtBQUNYO0FBQ0FBLElBQUFBLE9BQU8sQ0FBQy9CLEtBQVIsQ0FBY2dDLE9BQWQsR0FBd0IsQ0FBeEI7QUFDQUMsSUFBQUEsVUFBVSxDQUFDO0FBQUEsYUFBTUYsT0FBTyxDQUFDcEUsYUFBUixDQUFzQnVFLFdBQXRCLENBQWtDSCxPQUFsQyxDQUFOO0FBQUEsS0FBRCxFQUFtRCxHQUFuRCxDQUFWO0FBQ0QsR0FySmlCLENBdUpsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOztBQUNELENBbExEOztBQW9MQWpFLE1BQU0sQ0FBQ1osZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NaLEtBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gIGNvbnN0IHFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxuICBjb25zdCBxc2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpXG5cbiAgLy8gZnVuY3Rpb24gbG9hZFN0eWxlIChocmVmKSB7XG4gIC8vICAgY29uc3QgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgLy8gICBsaW5rRWxlbWVudC5yZWwgPSAnc3R5bGVzaGVldCdcbiAgLy8gICBsaW5rRWxlbWVudC5ocmVmID0gaHJlZlxuICAvLyAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpXG4gIC8vIH1cblxuICBmdW5jdGlvbiBsb2FkU2NyaXB0IChzcmMsIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcbiAgICBjYWxsYmFjayAmJiBzY3JpcHRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjYWxsYmFjaylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpXG4gIH1cblxuICAvLyBzZWFyY2hcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgaW5wdXRFbGVtZW50ID0gcXMoJyNzZWFyY2hfaW5wdXQnKVxuICBpZiAoaW5wdXRFbGVtZW50KSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vQHRyeWdob3N0L2NvbnRlbnQtYXBpQDEuMi4xL3VtZC9jb250ZW50LWFwaS5taW4uanMnLCAoKSA9PiB7XG4gICAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9naG9zdC1zZWFyY2hAMS4wLjEvZGlzdC9naG9zdC1zZWFyY2gubWluLmpzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgcmVzdWx0RWxlbWVudC5pZCA9ICdzZWFyY2hfcmVzdWx0J1xuICAgICAgICByZXN1bHRFbGVtZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQnXG4gICAgICAgIHJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZHJvcGRvd24taXRlbSBkaXNhYmxlZFwiPiR7aW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyfTwvc3Bhbj5gXG4gICAgICAgIGlucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duJylcbiAgICAgICAgaW5wdXRFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQocmVzdWx0RWxlbWVudClcblxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXcgKi9cbiAgICAgICAgbmV3IHdpbmRvdy5HaG9zdFNlYXJjaCh7XG4gICAgICAgICAgaG9zdDogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAgICAgICBrZXk6ICc3MmU1MGNkYWI0N2Q2OTZlODhkMjBhY2EwYycsXG4gICAgICAgICAgaW5wdXQ6ICcjc2VhcmNoX2lucHV0JyxcbiAgICAgICAgICByZXN1bHRzOiAnI3NlYXJjaF9yZXN1bHQnLFxuICAgICAgICAgIHRlbXBsYXRlOiBpID0+IGA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiJHtpLnVybH1cIj4ke2kudGl0bGV9PC9hPmAsXG4gICAgICAgICAgYXBpOiB7XG4gICAgICAgICAgICByZXNvdXJjZTogJ3Bvc3RzJyxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgZmllbGRzOiBbJ3VybCcsICd0aXRsZSddIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBhZnRlckRpc3BsYXk6IHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzdWx0cy50b3RhbCAhPT0gMCkgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgIGlmICghaW5wdXRFbGVtZW50LnZhbHVlKSByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+JHtpbnB1dEVsZW1lbnQuZGF0YXNldFsnZW1wdHknXX08L3NwYW4+YFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8vIGltZyBsYXp5bG9hZFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBpZiAocXMoJy5wb3N0LWNhcmQgW2RhdGEtc3JjXScpKSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vdmFuaWxsYS1sYXp5bG9hZEAxMi4wLjAtYmV0YS4wL2Rpc3QvbGF6eWxvYWQubWluLmpzJywgKCkgPT4ge1xuICAgICAgd2luZG93Lmxhenlsb2FkZXIgPSBuZXcgd2luZG93LkxhenlMb2FkKHtcbiAgICAgICAgZWxlbWVudHNfc2VsZWN0b3I6ICcucG9zdC1jYXJkIFtkYXRhLXNyY10nXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBoaWdobGlnaHQgcHJpc21qc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBjb2RlRWxlbWVudHMgPSBxc2EoJy5wb3N0LWNvbnRlbnQgcHJlIGNvZGUnKVxuICBpZiAoY29kZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgIC8vIC8vIGNvZGUgY2FyZCBwb2x5ZmlsbFxuICAgIC8vIGNvZGVFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vICAgaXRlbS5jbGFzc0xpc3QubGVuZ3RoIHx8IGl0ZW0uY2xhc3NMaXN0LmFkZCgnbGFuZ3VhZ2Utbm9uZScpXG4gICAgLy8gfSlcblxuICAgIC8vIGxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vcHJpc21qc0AxLjE1LjAvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzJylcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9wcmlzbWpzQDEuMTYuMC9wcmlzbS5qcycpXG4gIH1cblxuICAvLyBnYWxsZXJ5XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gZmxleFxuICBxc2EoJy5rZy1nYWxsZXJ5LWltYWdlID4gaW1nJykuZm9yRWFjaChpdGVtID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBpdGVtLmNsb3Nlc3QoJy5rZy1nYWxsZXJ5LWltYWdlJylcbiAgICBjb25zdCB3aWR0aCA9IGl0ZW0uYXR0cmlidXRlcy53aWR0aC52YWx1ZVxuICAgIGNvbnN0IGhlaWdodCA9IGl0ZW0uYXR0cmlidXRlcy5oZWlnaHQudmFsdWVcbiAgICBjb25zdCByYXRpbyA9IHdpZHRoIC8gaGVpZ2h0XG4gICAgY29udGFpbmVyLnN0eWxlLmZsZXggPSByYXRpbyArICcgMSAwJSdcbiAgfSlcblxuICAvLyAvLyBsaWdodGJveFxuICAvLyBjb25zdCBnYWxsZXJ5Q29udGFpbmVycyA9IHFzYSgnLmtnLWdhbGxlcnktY29udGFpbmVyJylcbiAgLy8gaWYgKGdhbGxlcnlDb250YWluZXJzLmxlbmd0aCkge1xuICAvLyAgIGxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vbGlnaHRnYWxsZXJ5LmpzQDEuMS4yL2Rpc3QvY3NzL2xpZ2h0Z2FsbGVyeS5taW4uY3NzJylcbiAgLy8gICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9saWdodGdhbGxlcnkuanNAMS4xLjIvZGlzdC9qcy9saWdodGdhbGxlcnkubWluLmpzJywgKCkgPT4ge1xuICAvLyAgICAgZ2FsbGVyeUNvbnRhaW5lcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgLy8gICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcua2ctZ2FsbGVyeS1pbWFnZScpLmZvckVhY2goc3ViID0+IHtcbiAgLy8gICAgICAgICBzdWIuZGF0YXNldC5zcmMgPSBzdWIuY2hpbGRyZW5bMF0uc3JjXG4gIC8vICAgICAgIH0pXG4gIC8vICAgICAgIHdpbmRvdy5saWdodEdhbGxlcnkoaXRlbSwgeyBzZWxlY3RvcjogJy5rZy1nYWxsZXJ5LWltYWdlJyB9KVxuICAvLyAgICAgfSlcbiAgLy8gICB9KVxuICAvLyB9XG5cbiAgLy8gbWVkaXVtLXpvb21cbiAgY29uc3QgZ2FsbGVyeUNvbnRhaW5lcnMgPSBxc2EoJy5rZy1nYWxsZXJ5LWNvbnRhaW5lcicpXG4gIGlmIChnYWxsZXJ5Q29udGFpbmVycy5sZW5ndGgpIHtcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9tZWRpdW0tem9vbUAxLjAuNC9kaXN0L21lZGl1bS16b29tLm1pbi5qcycsICgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mcmFuY29pc2NoYWxpZm91ci9tZWRpdW0tem9vbSNhcGlcbiAgICAgIHdpbmRvdy5tZWRpdW1ab29tKCcua2ctZ2FsbGVyeS1pbWFnZSA+IGltZycsIHtcbiAgICAgICAgbWFyZ2luOiAyMCxcbiAgICAgICAgYmFja2dyb3VuZDogJyMwMDAnXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBUT0RPOiBwb3N0IHNoYXJlXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHFzYSgnLnBvc3Qtc2hhcmUgYScpLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSA2NDBcbiAgICBjb25zdCBoZWlnaHQgPSA0MDBcblxuICAgIGNvbnN0IGR1YWxTY3JlZW5MZWZ0ID0gd2luZG93LnNjcmVlbkxlZnQgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5MZWZ0IDogd2luZG93LnNjcmVlblhcbiAgICBjb25zdCBkdWFsU2NyZWVuVG9wID0gd2luZG93LnNjcmVlblRvcCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlblRvcCA6IHdpbmRvdy5zY3JlZW5ZXG5cbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoID8gd2luZG93LmlubmVyV2lkdGggOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiB3aW5kb3cuc2NyZWVuLndpZHRoXG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgOiB3aW5kb3cuc2NyZWVuLmhlaWdodFxuXG4gICAgY29uc3QgbGVmdCA9ICgoY29udGFpbmVyV2lkdGggLyAyKSAtICh3aWR0aCAvIDIpKSArIGR1YWxTY3JlZW5MZWZ0XG4gICAgY29uc3QgdG9wID0gKChjb250YWluZXJIZWlnaHQgLyAyKSAtIChoZWlnaHQgLyAyKSkgKyBkdWFsU2NyZWVuVG9wXG4gICAgY29uc3QgbmV3V2luZG93ID0gd2luZG93Lm9wZW4oZS5jdXJyZW50VGFyZ2V0LmhyZWYsICdzaGFyZS13aW5kb3cnLCBgc2Nyb2xsYmFycz15ZXMsIHdpZHRoPSR7d2lkdGh9LCBoZWlnaHQ9JHtoZWlnaHR9LCB0b3A9JHt0b3B9LCBsZWZ0PSR7bGVmdH1gKVxuXG4gICAgLy8gUHV0cyBmb2N1cyBvbiB0aGUgbmV3V2luZG93XG4gICAgd2luZG93LmZvY3VzICYmIG5ld1dpbmRvdy5mb2N1cygpXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfSkpXG5cbiAgLy8gc3Vic2NyaWJlIGhpZGRlbiBmb3JtIHZhbHVlXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHFzYSgnaW5wdXRbbmFtZT1sb2NhdGlvbl0nKS5mb3JFYWNoKGl0ZW0gPT4geyBpdGVtLnZhbHVlID0gaXRlbS52YWx1ZSB8fCB3aW5kb3cubG9jYXRpb24uaHJlZiB9KVxuICBxc2EoJ2lucHV0W25hbWU9cmVmZXJyZXJdJykuZm9yRWFjaChpdGVtID0+IHsgaXRlbS52YWx1ZSA9IGl0ZW0udmFsdWUgfHwgZG9jdW1lbnQucmVmZXJyZXIgfSlcblxuICAvLyBzaXRlIHByZWxvYWRlclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBzcGlubmVyID0gcXMoJy5zaXRlLXNwaW5uZXInKVxuICBpZiAoc3Bpbm5lcikge1xuICAgIC8vIHJlbW92ZSBsb2FkZXIgc3Bpbm5lclxuICAgIHNwaW5uZXIuc3R5bGUub3BhY2l0eSA9IDBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNwaW5uZXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChzcGlubmVyKSwgNTAwKVxuICB9XG5cbiAgLy8gcGpheFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAvLyBodHRwczovL3VucGtnLmNvbS9qcXVlcnktcGpheEAyLjAuMS9qcXVlcnkucGpheC5qc1xuICAvLyAkKGRvY3VtZW50KS5wamF4KCdhW2hyZWZdJywgJ2JvZHknLCB7IGZyYWdtZW50OiAnYm9keScgfSlcbiAgLy8gcXNhKCdhW2hyZWZdJykuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgLy8gICBjb25zdCB1cmwgPSBlLmN1cnJlbnRUYXJnZXQuaHJlZlxuICAvLyAgIGlmICh1cmwgPT09IHdpbmRvdy5sb2NhdGlvbi5ocmVmKSByZXR1cm5cblxuICAvLyAgIGNvbnN0IHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAvLyAgIHhoci5yZXNwb25zZVR5cGUgPSAnZG9jdW1lbnQnXG5cbiAgLy8gICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgLy8gICAgIGNvbnN0IHJlcyA9IHhoci5yZXNwb25zZVxuICAvLyAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB1cmwpXG4gIC8vICAgICBkb2N1bWVudC5oZWFkLmlubmVySFRNTCA9ICcnXG4gIC8vICAgICByZXMucXVlcnlTZWxlY3RvckFsbCgnaGVhZCA+IConKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAvLyAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGl0ZW0pXG4gIC8vICAgICB9KVxuICAvLyAgICAgZG9jdW1lbnQuYm9keSA9IHJlcy5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgLy8gICAgIHNldHVwKClcbiAgLy8gICB9KVxuXG4gIC8vICAgeGhyLm9wZW4oJ0dFVCcsIHVybClcbiAgLy8gICB4aHIuc2VuZChudWxsKVxuXG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vIH0pKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNldHVwKVxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
