"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable */
// https://unpkg.com/bootstrap/js/dist/util.js

/*!
  * Bootstrap util.js v4.2.1 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : global.Util = factory(global.jQuery);
})(window, function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.2.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      return selector && document.querySelector(selector) ? selector : null;
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();
  return Util;
}); // https://unpkg.com/bootstrap/js/dist/collapse.js

/*!
  * Bootstrap collapse.js v4.2.1 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */


(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) : typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) : global.Collapse = factory(global.jQuery, global.Util);
})(window, function ($, Util) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME = 'collapse';
  var VERSION = '4.2.1';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Default = {
    toggle: true,
    parent: ''
  };
  var DefaultType = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event = {
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype; // Public

    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName.SHOW)) {
              $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    }; // Private


    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    }; // Static


    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        var _config = _objectSpread({}, Default, $this.data(), _typeof(config) === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}); // https://unpkg.com/bootstrap/js/dist/dropdown.js

/*!
  * Bootstrap dropdown.js v4.2.1 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */


(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('popper.js'), require('./util.js')) : typeof define === 'function' && define.amd ? define(['jquery', 'popper.js', './util.js'], factory) : global.Dropdown = factory(global.jQuery, global.Popper, global.Util);
})(window, function ($, Popper, Util) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME = 'dropdown';
  var VERSION = '4.2.1';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype; // Public

    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);
      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
    };

    _proto.show = function show() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED) || $(this._menu).hasClass(ClassName.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED) || !$(this._menu).hasClass(ClassName.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }; // Private


    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var _this2 = this;

      var offsetConf = {};

      if (typeof this._config.offset === 'function') {
        offsetConf.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
          return data;
        };
      } else {
        offsetConf.offset = this._config.offset;
      }

      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: offsetConf,
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          } // Disable Popper.js if we have a static display

        }
      };

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    }; // Static


    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = _typeof(config) === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $(dropdownMenu).removeClass(ClassName.SHOW);
        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    }; // eslint-disable-next-line complexity


    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMuanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwiZGVmaW5lIiwiYW1kIiwiVXRpbCIsImpRdWVyeSIsIndpbmRvdyIsIiQiLCJoYXNPd25Qcm9wZXJ0eSIsIlRSQU5TSVRJT05fRU5EIiwiTUFYX1VJRCIsIk1JTExJU0VDT05EU19NVUxUSVBMSUVSIiwidG9UeXBlIiwib2JqIiwidG9TdHJpbmciLCJjYWxsIiwibWF0Y2giLCJ0b0xvd2VyQ2FzZSIsImdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQiLCJiaW5kVHlwZSIsImRlbGVnYXRlVHlwZSIsImhhbmRsZSIsImV2ZW50IiwidGFyZ2V0IiwiaXMiLCJoYW5kbGVPYmoiLCJoYW5kbGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJ0cmFuc2l0aW9uRW5kRW11bGF0b3IiLCJkdXJhdGlvbiIsIl90aGlzIiwiY2FsbGVkIiwib25lIiwic2V0VGltZW91dCIsInRyaWdnZXJUcmFuc2l0aW9uRW5kIiwic2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQiLCJmbiIsImVtdWxhdGVUcmFuc2l0aW9uRW5kIiwic3BlY2lhbCIsImdldFVJRCIsInByZWZpeCIsIk1hdGgiLCJyYW5kb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCIsImVsZW1lbnQiLCJzZWxlY3RvciIsImdldEF0dHJpYnV0ZSIsImhyZWZBdHRyIiwidHJpbSIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCIsInRyYW5zaXRpb25EdXJhdGlvbiIsImNzcyIsInRyYW5zaXRpb25EZWxheSIsImZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uIiwicGFyc2VGbG9hdCIsImZsb2F0VHJhbnNpdGlvbkRlbGF5Iiwic3BsaXQiLCJyZWZsb3ciLCJvZmZzZXRIZWlnaHQiLCJ0cmlnZ2VyIiwic3VwcG9ydHNUcmFuc2l0aW9uRW5kIiwiQm9vbGVhbiIsImlzRWxlbWVudCIsIm5vZGVUeXBlIiwidHlwZUNoZWNrQ29uZmlnIiwiY29tcG9uZW50TmFtZSIsImNvbmZpZyIsImNvbmZpZ1R5cGVzIiwicHJvcGVydHkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJleHBlY3RlZFR5cGVzIiwidmFsdWUiLCJ2YWx1ZVR5cGUiLCJSZWdFeHAiLCJ0ZXN0IiwiRXJyb3IiLCJ0b1VwcGVyQ2FzZSIsImZpbmRTaGFkb3dSb290IiwiZG9jdW1lbnRFbGVtZW50IiwiYXR0YWNoU2hhZG93IiwiZ2V0Um9vdE5vZGUiLCJyb290IiwiU2hhZG93Um9vdCIsInBhcmVudE5vZGUiLCJDb2xsYXBzZSIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJpIiwibGVuZ3RoIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImRlZmluZVByb3BlcnR5Iiwia2V5IiwiX2NyZWF0ZUNsYXNzIiwiQ29uc3RydWN0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfZGVmaW5lUHJvcGVydHkiLCJfb2JqZWN0U3ByZWFkIiwic291cmNlIiwib3duS2V5cyIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJjb25jYXQiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJmb3JFYWNoIiwiTkFNRSIsIlZFUlNJT04iLCJEQVRBX0tFWSIsIkVWRU5UX0tFWSIsIkRBVEFfQVBJX0tFWSIsIkpRVUVSWV9OT19DT05GTElDVCIsIkRlZmF1bHQiLCJ0b2dnbGUiLCJwYXJlbnQiLCJEZWZhdWx0VHlwZSIsIkV2ZW50IiwiU0hPVyIsIlNIT1dOIiwiSElERSIsIkhJRERFTiIsIkNMSUNLX0RBVEFfQVBJIiwiQ2xhc3NOYW1lIiwiQ09MTEFQU0UiLCJDT0xMQVBTSU5HIiwiQ09MTEFQU0VEIiwiRGltZW5zaW9uIiwiV0lEVEgiLCJIRUlHSFQiLCJTZWxlY3RvciIsIkFDVElWRVMiLCJEQVRBX1RPR0dMRSIsIl9pc1RyYW5zaXRpb25pbmciLCJfZWxlbWVudCIsIl9jb25maWciLCJfZ2V0Q29uZmlnIiwiX3RyaWdnZXJBcnJheSIsInNsaWNlIiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwidG9nZ2xlTGlzdCIsImxlbiIsImVsZW0iLCJmaWx0ZXJFbGVtZW50IiwiZm91bmRFbGVtIiwiX3NlbGVjdG9yIiwicHVzaCIsIl9wYXJlbnQiLCJfZ2V0UGFyZW50IiwiX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyIsIl9wcm90byIsImhhc0NsYXNzIiwiaGlkZSIsInNob3ciLCJhY3RpdmVzIiwiYWN0aXZlc0RhdGEiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm5vdCIsImRhdGEiLCJzdGFydEV2ZW50IiwiaXNEZWZhdWx0UHJldmVudGVkIiwiX2pRdWVyeUludGVyZmFjZSIsImRpbWVuc2lvbiIsIl9nZXREaW1lbnNpb24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwic3R5bGUiLCJhdHRyIiwic2V0VHJhbnNpdGlvbmluZyIsImNvbXBsZXRlIiwiY2FwaXRhbGl6ZWREaW1lbnNpb24iLCJzY3JvbGxTaXplIiwiX3RoaXMyIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidHJpZ2dlckFycmF5TGVuZ3RoIiwiJGVsZW0iLCJpc1RyYW5zaXRpb25pbmciLCJkaXNwb3NlIiwicmVtb3ZlRGF0YSIsImhhc1dpZHRoIiwiX3RoaXMzIiwianF1ZXJ5IiwiY2hpbGRyZW4iLCJlYWNoIiwiX2dldFRhcmdldEZyb21FbGVtZW50IiwidHJpZ2dlckFycmF5IiwiaXNPcGVuIiwidG9nZ2xlQ2xhc3MiLCIkdGhpcyIsIlR5cGVFcnJvciIsImdldCIsIm9uIiwiY3VycmVudFRhcmdldCIsInRhZ05hbWUiLCJwcmV2ZW50RGVmYXVsdCIsIiR0cmlnZ2VyIiwic2VsZWN0b3JzIiwiJHRhcmdldCIsIm5vQ29uZmxpY3QiLCJEcm9wZG93biIsIlBvcHBlciIsIkVTQ0FQRV9LRVlDT0RFIiwiU1BBQ0VfS0VZQ09ERSIsIlRBQl9LRVlDT0RFIiwiQVJST1dfVVBfS0VZQ09ERSIsIkFSUk9XX0RPV05fS0VZQ09ERSIsIlJJR0hUX01PVVNFX0JVVFRPTl9XSElDSCIsIlJFR0VYUF9LRVlET1dOIiwiQ0xJQ0siLCJLRVlET1dOX0RBVEFfQVBJIiwiS0VZVVBfREFUQV9BUEkiLCJESVNBQkxFRCIsIkRST1BVUCIsIkRST1BSSUdIVCIsIkRST1BMRUZUIiwiTUVOVVJJR0hUIiwiTUVOVUxFRlQiLCJQT1NJVElPTl9TVEFUSUMiLCJGT1JNX0NISUxEIiwiTUVOVSIsIk5BVkJBUl9OQVYiLCJWSVNJQkxFX0lURU1TIiwiQXR0YWNobWVudE1hcCIsIlRPUCIsIlRPUEVORCIsIkJPVFRPTSIsIkJPVFRPTUVORCIsIlJJR0hUIiwiUklHSFRFTkQiLCJMRUZUIiwiTEVGVEVORCIsIm9mZnNldCIsImZsaXAiLCJib3VuZGFyeSIsInJlZmVyZW5jZSIsImRpc3BsYXkiLCJfcG9wcGVyIiwiX21lbnUiLCJfZ2V0TWVudUVsZW1lbnQiLCJfaW5OYXZiYXIiLCJfZGV0ZWN0TmF2YmFyIiwiX2FkZEV2ZW50TGlzdGVuZXJzIiwiZGlzYWJsZWQiLCJfZ2V0UGFyZW50RnJvbUVsZW1lbnQiLCJpc0FjdGl2ZSIsIl9jbGVhck1lbnVzIiwicmVsYXRlZFRhcmdldCIsInNob3dFdmVudCIsInJlZmVyZW5jZUVsZW1lbnQiLCJfZ2V0UG9wcGVyQ29uZmlnIiwiY2xvc2VzdCIsImJvZHkiLCJub29wIiwiZm9jdXMiLCJzZXRBdHRyaWJ1dGUiLCJoaWRlRXZlbnQiLCJvZmYiLCJkZXN0cm95IiwidXBkYXRlIiwic2NoZWR1bGVVcGRhdGUiLCJzdG9wUHJvcGFnYXRpb24iLCJjb25zdHJ1Y3RvciIsIl9nZXRQbGFjZW1lbnQiLCIkcGFyZW50RHJvcGRvd24iLCJwbGFjZW1lbnQiLCJvZmZzZXRDb25mIiwib2Zmc2V0cyIsInBvcHBlckNvbmZpZyIsIm1vZGlmaWVycyIsImVuYWJsZWQiLCJwcmV2ZW50T3ZlcmZsb3ciLCJib3VuZGFyaWVzRWxlbWVudCIsImFwcGx5U3R5bGUiLCJ3aGljaCIsInR5cGUiLCJ0b2dnbGVzIiwiY29udGV4dCIsImNsaWNrRXZlbnQiLCJkcm9wZG93bk1lbnUiLCJfZGF0YUFwaUtleWRvd25IYW5kbGVyIiwiaXRlbXMiLCJpbmRleCIsImluZGV4T2YiLCJlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFFQTs7QUFDQTs7Ozs7QUFLQyxXQUFVQSxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQjtBQUMxQixVQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQW5CLElBQStCLE9BQU9DLE1BQVAsS0FBa0IsV0FBakQsR0FBK0RBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFpQkQsT0FBTyxDQUFDRyxPQUFPLENBQUMsUUFBRCxDQUFSLENBQXZGLEdBQ0EsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsTUFBTSxDQUFDQyxHQUF2QyxHQUE2Q0QsTUFBTSxDQUFDLENBQUMsUUFBRCxDQUFELEVBQWFKLE9BQWIsQ0FBbkQsR0FDQ0QsTUFBTSxDQUFDTyxJQUFQLEdBQWNOLE9BQU8sQ0FBQ0QsTUFBTSxDQUFDUSxNQUFSLENBRnRCO0FBR0QsQ0FKQSxFQUlDQyxNQUpELEVBSVUsVUFBVUMsQ0FBVixFQUFhO0FBQUU7O0FBRXhCQSxFQUFBQSxDQUFDLEdBQUdBLENBQUMsSUFBSUEsQ0FBQyxDQUFDQyxjQUFGLENBQWlCLFNBQWpCLENBQUwsR0FBbUNELENBQUMsQ0FBQyxTQUFELENBQXBDLEdBQWtEQSxDQUF0RDtBQUVBOzs7Ozs7O0FBTUE7Ozs7OztBQU1BLE1BQUlFLGNBQWMsR0FBRyxlQUFyQjtBQUNBLE1BQUlDLE9BQU8sR0FBRyxPQUFkO0FBQ0EsTUFBSUMsdUJBQXVCLEdBQUcsSUFBOUIsQ0FsQnNCLENBa0JjOztBQUVwQyxXQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQjtBQUNuQixXQUFPLEdBQUdDLFFBQUgsQ0FBWUMsSUFBWixDQUFpQkYsR0FBakIsRUFBc0JHLEtBQXRCLENB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O0FBQzVEQSxJQUFBQSxDQUFDLENBQUN2QixlQUFGO0FBQ0QsR0FQRDtBQVFBOzs7Ozs7QUFNQXhRLEVBQUFBLENBQUMsQ0FBQytCLEVBQUYsQ0FBSzhFLElBQUwsSUFBYThGLFFBQVEsQ0FBQ3RDLGdCQUF0QjtBQUNBckssRUFBQUEsQ0FBQyxDQUFDK0IsRUFBRixDQUFLOEUsSUFBTCxFQUFXZCxXQUFYLEdBQXlCNEcsUUFBekI7O0FBRUEzTSxFQUFBQSxDQUFDLENBQUMrQixFQUFGLENBQUs4RSxJQUFMLEVBQVc2RixVQUFYLEdBQXdCLFlBQVk7QUFDbEMxTSxJQUFBQSxDQUFDLENBQUMrQixFQUFGLENBQUs4RSxJQUFMLElBQWFLLGtCQUFiO0FBQ0EsV0FBT3lGLFFBQVEsQ0FBQ3RDLGdCQUFoQjtBQUNELEdBSEQ7O0FBS0EsU0FBT3NDLFFBQVA7QUFFRCxDQXhrQkEsQ0FBRCIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5cbi8vIGh0dHBzOi8vdW5wa2cuY29tL2Jvb3RzdHJhcC9qcy9kaXN0L3V0aWwuanNcbi8qIVxuICAqIEJvb3RzdHJhcCB1dGlsLmpzIHY0LjIuMSAoaHR0cHM6Ly9nZXRib290c3RyYXAuY29tLylcbiAgKiBDb3B5cmlnaHQgMjAxMS0yMDE4IFRoZSBCb290c3RyYXAgQXV0aG9ycyAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2dyYXBocy9jb250cmlidXRvcnMpXG4gICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsLlV0aWwgPSBmYWN0b3J5KGdsb2JhbC5qUXVlcnkpKTtcbn0od2luZG93LCAoZnVuY3Rpb24gKCQpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICQgPSAkICYmICQuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/ICRbJ2RlZmF1bHQnXSA6ICQ7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMi4xKTogdXRpbC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBQcml2YXRlIFRyYW5zaXRpb25FbmQgSGVscGVyc1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFRSQU5TSVRJT05fRU5EID0gJ3RyYW5zaXRpb25lbmQnO1xuICB2YXIgTUFYX1VJRCA9IDEwMDAwMDA7XG4gIHZhciBNSUxMSVNFQ09ORFNfTVVMVElQTElFUiA9IDEwMDA7IC8vIFNob3V0b3V0IEFuZ3VzQ3JvbGwgKGh0dHBzOi8vZ29vLmdsL3B4d1FHcClcblxuICBmdW5jdGlvbiB0b1R5cGUob2JqKSB7XG4gICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJpbmRUeXBlOiBUUkFOU0lUSU9OX0VORCxcbiAgICAgIGRlbGVnYXRlVHlwZTogVFJBTlNJVElPTl9FTkQsXG4gICAgICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHRoaXMpKSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmaW5lZFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kRW11bGF0b3IoZHVyYXRpb24pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgICQodGhpcykub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgfSk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKF90aGlzKTtcbiAgICAgIH1cbiAgICB9LCBkdXJhdGlvbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCgpIHtcbiAgICAkLmZuLmVtdWxhdGVUcmFuc2l0aW9uRW5kID0gdHJhbnNpdGlvbkVuZEVtdWxhdG9yO1xuICAgICQuZXZlbnQuc3BlY2lhbFtVdGlsLlRSQU5TSVRJT05fRU5EXSA9IGdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQoKTtcbiAgfVxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogUHVibGljIFV0aWwgQXBpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG5cbiAgdmFyIFV0aWwgPSB7XG4gICAgVFJBTlNJVElPTl9FTkQ6ICdic1RyYW5zaXRpb25FbmQnLFxuICAgIGdldFVJRDogZnVuY3Rpb24gZ2V0VUlEKHByZWZpeCkge1xuICAgICAgZG8ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgICBwcmVmaXggKz0gfn4oTWF0aC5yYW5kb20oKSAqIE1BWF9VSUQpOyAvLyBcIn5+XCIgYWN0cyBsaWtlIGEgZmFzdGVyIE1hdGguZmxvb3IoKSBoZXJlXG4gICAgICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKTtcblxuICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9LFxuICAgIGdldFNlbGVjdG9yRnJvbUVsZW1lbnQ6IGZ1bmN0aW9uIGdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgdmFyIHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XG5cbiAgICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09ICcjJykge1xuICAgICAgICB2YXIgaHJlZkF0dHIgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICBzZWxlY3RvciA9IGhyZWZBdHRyICYmIGhyZWZBdHRyICE9PSAnIycgPyBocmVmQXR0ci50cmltKCkgOiAnJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGVjdG9yICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBudWxsO1xuICAgIH0sXG4gICAgZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQ6IGZ1bmN0aW9uIGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcblxuXG4gICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gJChlbGVtZW50KS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcbiAgICAgIHZhciB0cmFuc2l0aW9uRGVsYXkgPSAkKGVsZW1lbnQpLmNzcygndHJhbnNpdGlvbi1kZWxheScpO1xuICAgICAgdmFyIGZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uID0gcGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgdmFyIGZsb2F0VHJhbnNpdGlvbkRlbGF5ID0gcGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpOyAvLyBSZXR1cm4gMCBpZiBlbGVtZW50IG9yIHRyYW5zaXRpb24gZHVyYXRpb24gaXMgbm90IGZvdW5kXG5cbiAgICAgIGlmICghZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gJiYgIWZsb2F0VHJhbnNpdGlvbkRlbGF5KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSAvLyBJZiBtdWx0aXBsZSBkdXJhdGlvbnMgYXJlIGRlZmluZWQsIHRha2UgdGhlIGZpcnN0XG5cblxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uID0gdHJhbnNpdGlvbkR1cmF0aW9uLnNwbGl0KCcsJylbMF07XG4gICAgICB0cmFuc2l0aW9uRGVsYXkgPSB0cmFuc2l0aW9uRGVsYXkuc3BsaXQoJywnKVswXTtcbiAgICAgIHJldHVybiAocGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pICsgcGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSO1xuICAgIH0sXG4gICAgcmVmbG93OiBmdW5jdGlvbiByZWZsb3coZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH0sXG4gICAgdHJpZ2dlclRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHRyaWdnZXJUcmFuc2l0aW9uRW5kKGVsZW1lbnQpIHtcbiAgICAgICQoZWxlbWVudCkudHJpZ2dlcihUUkFOU0lUSU9OX0VORCk7XG4gICAgfSxcbiAgICAvLyBUT0RPOiBSZW1vdmUgaW4gdjVcbiAgICBzdXBwb3J0c1RyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKFRSQU5TSVRJT05fRU5EKTtcbiAgICB9LFxuICAgIGlzRWxlbWVudDogZnVuY3Rpb24gaXNFbGVtZW50KG9iaikge1xuICAgICAgcmV0dXJuIChvYmpbMF0gfHwgb2JqKS5ub2RlVHlwZTtcbiAgICB9LFxuICAgIHR5cGVDaGVja0NvbmZpZzogZnVuY3Rpb24gdHlwZUNoZWNrQ29uZmlnKGNvbXBvbmVudE5hbWUsIGNvbmZpZywgY29uZmlnVHlwZXMpIHtcbiAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIGNvbmZpZ1R5cGVzKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29uZmlnVHlwZXMsIHByb3BlcnR5KSkge1xuICAgICAgICAgIHZhciBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV07XG4gICAgICAgICAgdmFyIHZhbHVlVHlwZSA9IHZhbHVlICYmIFV0aWwuaXNFbGVtZW50KHZhbHVlKSA/ICdlbGVtZW50JyA6IHRvVHlwZSh2YWx1ZSk7XG5cbiAgICAgICAgICBpZiAoIW5ldyBSZWdFeHAoZXhwZWN0ZWRUeXBlcykudGVzdCh2YWx1ZVR5cGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpICsgXCI6IFwiICsgKFwiT3B0aW9uIFxcXCJcIiArIHByb3BlcnR5ICsgXCJcXFwiIHByb3ZpZGVkIHR5cGUgXFxcIlwiICsgdmFsdWVUeXBlICsgXCJcXFwiIFwiKSArIChcImJ1dCBleHBlY3RlZCB0eXBlIFxcXCJcIiArIGV4cGVjdGVkVHlwZXMgKyBcIlxcXCIuXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGZpbmRTaGFkb3dSb290OiBmdW5jdGlvbiBmaW5kU2hhZG93Um9vdChlbGVtZW50KSB7XG4gICAgICBpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRhY2hTaGFkb3cpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IC8vIENhbiBmaW5kIHRoZSBzaGFkb3cgcm9vdCBvdGhlcndpc2UgaXQnbGwgcmV0dXJuIHRoZSBkb2N1bWVudFxuXG5cbiAgICAgIGlmICh0eXBlb2YgZWxlbWVudC5nZXRSb290Tm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgcm9vdCA9IGVsZW1lbnQuZ2V0Um9vdE5vZGUoKTtcbiAgICAgICAgcmV0dXJuIHJvb3QgaW5zdGFuY2VvZiBTaGFkb3dSb290ID8gcm9vdCA6IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgIH0gLy8gd2hlbiB3ZSBkb24ndCBmaW5kIGEgc2hhZG93IHJvb3RcblxuXG4gICAgICBpZiAoIWVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFV0aWwuZmluZFNoYWRvd1Jvb3QoZWxlbWVudC5wYXJlbnROb2RlKTtcbiAgICB9XG4gIH07XG4gIHNldFRyYW5zaXRpb25FbmRTdXBwb3J0KCk7XG5cbiAgcmV0dXJuIFV0aWw7XG5cbn0pKSk7XG5cbi8vIGh0dHBzOi8vdW5wa2cuY29tL2Jvb3RzdHJhcC9qcy9kaXN0L2NvbGxhcHNlLmpzXG4vKiFcbiAgKiBCb290c3RyYXAgY29sbGFwc2UuanMgdjQuMi4xIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMTggVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpLCByZXF1aXJlKCcuL3V0aWwuanMnKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsLmpzJ10sIGZhY3RvcnkpIDpcbiAgKGdsb2JhbC5Db2xsYXBzZSA9IGZhY3RvcnkoZ2xvYmFsLmpRdWVyeSxnbG9iYWwuVXRpbCkpO1xufSh3aW5kb3csIChmdW5jdGlvbiAoJCxVdGlsKSB7ICd1c2Ugc3RyaWN0JztcblxuICAkID0gJCAmJiAkLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgPyAkWydkZWZhdWx0J10gOiAkO1xuICBVdGlsID0gVXRpbCAmJiBVdGlsLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgPyBVdGlsWydkZWZhdWx0J10gOiBVdGlsO1xuXG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgTkFNRSA9ICdjb2xsYXBzZSc7XG4gIHZhciBWRVJTSU9OID0gJzQuMi4xJztcbiAgdmFyIERBVEFfS0VZID0gJ2JzLmNvbGxhcHNlJztcbiAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG4gIHZhciBEZWZhdWx0ID0ge1xuICAgIHRvZ2dsZTogdHJ1ZSxcbiAgICBwYXJlbnQ6ICcnXG4gIH07XG4gIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICB0b2dnbGU6ICdib29sZWFuJyxcbiAgICBwYXJlbnQ6ICcoc3RyaW5nfGVsZW1lbnQpJ1xuICB9O1xuICB2YXIgRXZlbnQgPSB7XG4gICAgU0hPVzogXCJzaG93XCIgKyBFVkVOVF9LRVksXG4gICAgU0hPV046IFwic2hvd25cIiArIEVWRU5UX0tFWSxcbiAgICBISURFOiBcImhpZGVcIiArIEVWRU5UX0tFWSxcbiAgICBISURERU46IFwiaGlkZGVuXCIgKyBFVkVOVF9LRVksXG4gICAgQ0xJQ0tfREFUQV9BUEk6IFwiY2xpY2tcIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICB9O1xuICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgIFNIT1c6ICdzaG93JyxcbiAgICBDT0xMQVBTRTogJ2NvbGxhcHNlJyxcbiAgICBDT0xMQVBTSU5HOiAnY29sbGFwc2luZycsXG4gICAgQ09MTEFQU0VEOiAnY29sbGFwc2VkJ1xuICB9O1xuICB2YXIgRGltZW5zaW9uID0ge1xuICAgIFdJRFRIOiAnd2lkdGgnLFxuICAgIEhFSUdIVDogJ2hlaWdodCdcbiAgfTtcbiAgdmFyIFNlbGVjdG9yID0ge1xuICAgIEFDVElWRVM6ICcuc2hvdywgLmNvbGxhcHNpbmcnLFxuICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl0nXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gIH07XG5cbiAgdmFyIENvbGxhcHNlID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29sbGFwc2UoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIl1baHJlZj1cXFwiI1wiICsgZWxlbWVudC5pZCArIFwiXFxcIl0sXCIgKyAoXCJbZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIl1bZGF0YS10YXJnZXQ9XFxcIiNcIiArIGVsZW1lbnQuaWQgKyBcIlxcXCJdXCIpKSk7XG4gICAgICB2YXIgdG9nZ2xlTGlzdCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EQVRBX1RPR0dMRSkpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdG9nZ2xlTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgZWxlbSA9IHRvZ2dsZUxpc3RbaV07XG4gICAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtKTtcbiAgICAgICAgdmFyIGZpbHRlckVsZW1lbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5maWx0ZXIoZnVuY3Rpb24gKGZvdW5kRWxlbSkge1xuICAgICAgICAgIHJldHVybiBmb3VuZEVsZW0gPT09IGVsZW1lbnQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCAmJiBmaWx0ZXJFbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xuXG4gICAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5LnB1c2goZWxlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudCA/IHRoaXMuX2dldFBhcmVudCgpIDogbnVsbDtcblxuICAgICAgaWYgKCF0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0aGlzLl9lbGVtZW50LCB0aGlzLl90cmlnZ2VyQXJyYXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLnRvZ2dsZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgfVxuICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICB2YXIgX3Byb3RvID0gQ29sbGFwc2UucHJvdG90eXBlO1xuXG4gICAgLy8gUHVibGljXG4gICAgX3Byb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8uc2hvdyA9IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjdGl2ZXM7XG4gICAgICB2YXIgYWN0aXZlc0RhdGE7XG5cbiAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgYWN0aXZlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQUNUSVZFUykpLmZpbHRlcihmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMuX2NvbmZpZy5wYXJlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JykgPT09IF90aGlzLl9jb25maWcucGFyZW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBlbGVtLmNsYXNzTGlzdC5jb250YWlucyhDbGFzc05hbWUuQ09MTEFQU0UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYWN0aXZlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhY3RpdmVzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICBhY3RpdmVzRGF0YSA9ICQoYWN0aXZlcykubm90KHRoaXMuX3NlbGVjdG9yKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc3RhcnRFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVyk7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc3RhcnRFdmVudCk7XG5cbiAgICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZXMpIHtcbiAgICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQoYWN0aXZlcykubm90KHRoaXMuX3NlbGVjdG9yKSwgJ2hpZGUnKTtcblxuICAgICAgICBpZiAoIWFjdGl2ZXNEYXRhKSB7XG4gICAgICAgICAgJChhY3RpdmVzKS5kYXRhKERBVEFfS0VZLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKCk7XG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORyk7XG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAwO1xuXG4gICAgICBpZiAodGhpcy5fdHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICAkKHRoaXMuX3RyaWdnZXJBcnJheSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCkuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSk7XG5cbiAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAkKF90aGlzLl9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICAgIF90aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJztcblxuICAgICAgICBfdGhpcy5zZXRUcmFuc2l0aW9uaW5nKGZhbHNlKTtcblxuICAgICAgICAkKF90aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LlNIT1dOKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBjYXBpdGFsaXplZERpbWVuc2lvbiA9IGRpbWVuc2lvblswXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKDEpO1xuICAgICAgdmFyIHNjcm9sbFNpemUgPSBcInNjcm9sbFwiICsgY2FwaXRhbGl6ZWREaW1lbnNpb247XG4gICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gdGhpcy5fZWxlbWVudFtzY3JvbGxTaXplXSArIFwicHhcIjtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmhpZGUgPSBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHwgISQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUpO1xuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpO1xuXG4gICAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gdGhpcy5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtkaW1lbnNpb25dICsgXCJweFwiO1xuICAgICAgVXRpbC5yZWZsb3codGhpcy5fZWxlbWVudCk7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgIHZhciB0cmlnZ2VyQXJyYXlMZW5ndGggPSB0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoO1xuXG4gICAgICBpZiAodHJpZ2dlckFycmF5TGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyaWdnZXJBcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHRyaWdnZXIgPSB0aGlzLl90cmlnZ2VyQXJyYXlbaV07XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRyaWdnZXIpO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgJGVsZW0gPSAkKFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpKTtcblxuICAgICAgICAgICAgaWYgKCEkZWxlbS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICAgICAgJCh0cmlnZ2VyKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSk7XG5cbiAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICBfdGhpczIuc2V0VHJhbnNpdGlvbmluZyhmYWxzZSk7XG5cbiAgICAgICAgJChfdGhpczIuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLnRyaWdnZXIoRXZlbnQuSElEREVOKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnO1xuICAgICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLnNldFRyYW5zaXRpb25pbmcgPSBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uaW5nKGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gaXNUcmFuc2l0aW9uaW5nO1xuICAgIH07XG5cbiAgICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpO1xuICAgICAgdGhpcy5fY29uZmlnID0gbnVsbDtcbiAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuX3RyaWdnZXJBcnJheSA9IG51bGw7XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBudWxsO1xuICAgIH07IC8vIFByaXZhdGVcblxuXG4gICAgX3Byb3RvLl9nZXRDb25maWcgPSBmdW5jdGlvbiBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgRGVmYXVsdCwgY29uZmlnKTtcbiAgICAgIGNvbmZpZy50b2dnbGUgPSBCb29sZWFuKGNvbmZpZy50b2dnbGUpOyAvLyBDb2VyY2Ugc3RyaW5nIHZhbHVlc1xuXG4gICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKTtcbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcblxuICAgIF9wcm90by5fZ2V0RGltZW5zaW9uID0gZnVuY3Rpb24gX2dldERpbWVuc2lvbigpIHtcbiAgICAgIHZhciBoYXNXaWR0aCA9ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoRGltZW5zaW9uLldJRFRIKTtcbiAgICAgIHJldHVybiBoYXNXaWR0aCA/IERpbWVuc2lvbi5XSURUSCA6IERpbWVuc2lvbi5IRUlHSFQ7XG4gICAgfTtcblxuICAgIF9wcm90by5fZ2V0UGFyZW50ID0gZnVuY3Rpb24gX2dldFBhcmVudCgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgcGFyZW50O1xuXG4gICAgICBpZiAoVXRpbC5pc0VsZW1lbnQodGhpcy5fY29uZmlnLnBhcmVudCkpIHtcbiAgICAgICAgcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudDsgLy8gSXQncyBhIGpRdWVyeSBvYmplY3RcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5wYXJlbnQuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHBhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnRbMF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fY29uZmlnLnBhcmVudCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzZWxlY3RvciA9IFwiW2RhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCJdW2RhdGEtcGFyZW50PVxcXCJcIiArIHRoaXMuX2NvbmZpZy5wYXJlbnQgKyBcIlxcXCJdXCI7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAkKGNoaWxkcmVuKS5lYWNoKGZ1bmN0aW9uIChpLCBlbGVtZW50KSB7XG4gICAgICAgIF90aGlzMy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKENvbGxhcHNlLl9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSwgW2VsZW1lbnRdKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9O1xuXG4gICAgX3Byb3RvLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MgPSBmdW5jdGlvbiBfYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKGVsZW1lbnQsIHRyaWdnZXJBcnJheSkge1xuICAgICAgdmFyIGlzT3BlbiA9ICQoZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICBpZiAodHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICAkKHRyaWdnZXJBcnJheSkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCwgIWlzT3BlbikuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3Blbik7XG4gICAgICB9XG4gICAgfTsgLy8gU3RhdGljXG5cblxuICAgIENvbGxhcHNlLl9nZXRUYXJnZXRGcm9tRWxlbWVudCA9IGZ1bmN0aW9uIF9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICByZXR1cm4gc2VsZWN0b3IgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IG51bGw7XG4gICAgfTtcblxuICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhID0gJHRoaXMuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgdmFyIF9jb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBEZWZhdWx0LCAkdGhpcy5kYXRhKCksIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9KTtcblxuICAgICAgICBpZiAoIWRhdGEgJiYgX2NvbmZpZy50b2dnbGUgJiYgL3Nob3d8aGlkZS8udGVzdChjb25maWcpKSB7XG4gICAgICAgICAgX2NvbmZpZy50b2dnbGUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgJHRoaXMuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJObyBtZXRob2QgbmFtZWQgXFxcIlwiICsgY29uZmlnICsgXCJcXFwiXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX2NyZWF0ZUNsYXNzKENvbGxhcHNlLCBudWxsLCBbe1xuICAgICAga2V5OiBcIlZFUlNJT05cIixcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiRGVmYXVsdFwiLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb2xsYXBzZTtcbiAgfSgpO1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuXG4gICQoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gcHJldmVudERlZmF1bHQgb25seSBmb3IgPGE+IGVsZW1lbnRzICh3aGljaCBjaGFuZ2UgdGhlIFVSTCkgbm90IGluc2lkZSB0aGUgY29sbGFwc2libGUgZWxlbWVudFxuICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB2YXIgJHRyaWdnZXIgPSAkKHRoaXMpO1xuICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzKTtcbiAgICB2YXIgc2VsZWN0b3JzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgJChzZWxlY3RvcnMpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0YXJnZXQgPSAkKHRoaXMpO1xuICAgICAgdmFyIGRhdGEgPSAkdGFyZ2V0LmRhdGEoREFUQV9LRVkpO1xuICAgICAgdmFyIGNvbmZpZyA9IGRhdGEgPyAndG9nZ2xlJyA6ICR0cmlnZ2VyLmRhdGEoKTtcblxuICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCR0YXJnZXQsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH0pO1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2U7XG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDb2xsYXBzZTtcblxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICByZXR1cm4gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZTtcbiAgfTtcblxuICByZXR1cm4gQ29sbGFwc2U7XG5cbn0pKSk7XG5cbi8vIGh0dHBzOi8vdW5wa2cuY29tL2Jvb3RzdHJhcC9qcy9kaXN0L2Ryb3Bkb3duLmpzXG4vKiFcbiAgKiBCb290c3RyYXAgZHJvcGRvd24uanMgdjQuMi4xIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMTggVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpLCByZXF1aXJlKCdwb3BwZXIuanMnKSwgcmVxdWlyZSgnLi91dGlsLmpzJykpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnanF1ZXJ5JywgJ3BvcHBlci5qcycsICcuL3V0aWwuanMnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsLkRyb3Bkb3duID0gZmFjdG9yeShnbG9iYWwualF1ZXJ5LGdsb2JhbC5Qb3BwZXIsZ2xvYmFsLlV0aWwpKTtcbn0od2luZG93LCAoZnVuY3Rpb24gKCQsUG9wcGVyLFV0aWwpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICQgPSAkICYmICQuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/ICRbJ2RlZmF1bHQnXSA6ICQ7XG4gIFBvcHBlciA9IFBvcHBlciAmJiBQb3BwZXIuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/IFBvcHBlclsnZGVmYXVsdCddIDogUG9wcGVyO1xuICBVdGlsID0gVXRpbCAmJiBVdGlsLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgPyBVdGlsWydkZWZhdWx0J10gOiBVdGlsO1xuXG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgTkFNRSA9ICdkcm9wZG93bic7XG4gIHZhciBWRVJTSU9OID0gJzQuMi4xJztcbiAgdmFyIERBVEFfS0VZID0gJ2JzLmRyb3Bkb3duJztcbiAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG4gIHZhciBFU0NBUEVfS0VZQ09ERSA9IDI3OyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBFc2NhcGUgKEVzYykga2V5XG5cbiAgdmFyIFNQQUNFX0tFWUNPREUgPSAzMjsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3Igc3BhY2Uga2V5XG5cbiAgdmFyIFRBQl9LRVlDT0RFID0gOTsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdGFiIGtleVxuXG4gIHZhciBBUlJPV19VUF9LRVlDT0RFID0gMzg7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHVwIGFycm93IGtleVxuXG4gIHZhciBBUlJPV19ET1dOX0tFWUNPREUgPSA0MDsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgZG93biBhcnJvdyBrZXlcblxuICB2YXIgUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIID0gMzsgLy8gTW91c2VFdmVudC53aGljaCB2YWx1ZSBmb3IgdGhlIHJpZ2h0IGJ1dHRvbiAoYXNzdW1pbmcgYSByaWdodC1oYW5kZWQgbW91c2UpXG5cbiAgdmFyIFJFR0VYUF9LRVlET1dOID0gbmV3IFJlZ0V4cChBUlJPV19VUF9LRVlDT0RFICsgXCJ8XCIgKyBBUlJPV19ET1dOX0tFWUNPREUgKyBcInxcIiArIEVTQ0FQRV9LRVlDT0RFKTtcbiAgdmFyIEV2ZW50ID0ge1xuICAgIEhJREU6IFwiaGlkZVwiICsgRVZFTlRfS0VZLFxuICAgIEhJRERFTjogXCJoaWRkZW5cIiArIEVWRU5UX0tFWSxcbiAgICBTSE9XOiBcInNob3dcIiArIEVWRU5UX0tFWSxcbiAgICBTSE9XTjogXCJzaG93blwiICsgRVZFTlRfS0VZLFxuICAgIENMSUNLOiBcImNsaWNrXCIgKyBFVkVOVF9LRVksXG4gICAgQ0xJQ0tfREFUQV9BUEk6IFwiY2xpY2tcIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICBLRVlET1dOX0RBVEFfQVBJOiBcImtleWRvd25cIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICBLRVlVUF9EQVRBX0FQSTogXCJrZXl1cFwiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gIH07XG4gIHZhciBDbGFzc05hbWUgPSB7XG4gICAgRElTQUJMRUQ6ICdkaXNhYmxlZCcsXG4gICAgU0hPVzogJ3Nob3cnLFxuICAgIERST1BVUDogJ2Ryb3B1cCcsXG4gICAgRFJPUFJJR0hUOiAnZHJvcHJpZ2h0JyxcbiAgICBEUk9QTEVGVDogJ2Ryb3BsZWZ0JyxcbiAgICBNRU5VUklHSFQ6ICdkcm9wZG93bi1tZW51LXJpZ2h0JyxcbiAgICBNRU5VTEVGVDogJ2Ryb3Bkb3duLW1lbnUtbGVmdCcsXG4gICAgUE9TSVRJT05fU1RBVElDOiAncG9zaXRpb24tc3RhdGljJ1xuICB9O1xuICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXScsXG4gICAgRk9STV9DSElMRDogJy5kcm9wZG93biBmb3JtJyxcbiAgICBNRU5VOiAnLmRyb3Bkb3duLW1lbnUnLFxuICAgIE5BVkJBUl9OQVY6ICcubmF2YmFyLW5hdicsXG4gICAgVklTSUJMRV9JVEVNUzogJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJ1xuICB9O1xuICB2YXIgQXR0YWNobWVudE1hcCA9IHtcbiAgICBUT1A6ICd0b3Atc3RhcnQnLFxuICAgIFRPUEVORDogJ3RvcC1lbmQnLFxuICAgIEJPVFRPTTogJ2JvdHRvbS1zdGFydCcsXG4gICAgQk9UVE9NRU5EOiAnYm90dG9tLWVuZCcsXG4gICAgUklHSFQ6ICdyaWdodC1zdGFydCcsXG4gICAgUklHSFRFTkQ6ICdyaWdodC1lbmQnLFxuICAgIExFRlQ6ICdsZWZ0LXN0YXJ0JyxcbiAgICBMRUZURU5EOiAnbGVmdC1lbmQnXG4gIH07XG4gIHZhciBEZWZhdWx0ID0ge1xuICAgIG9mZnNldDogMCxcbiAgICBmbGlwOiB0cnVlLFxuICAgIGJvdW5kYXJ5OiAnc2Nyb2xsUGFyZW50JyxcbiAgICByZWZlcmVuY2U6ICd0b2dnbGUnLFxuICAgIGRpc3BsYXk6ICdkeW5hbWljJ1xuICB9O1xuICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgb2Zmc2V0OiAnKG51bWJlcnxzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgICBmbGlwOiAnYm9vbGVhbicsXG4gICAgYm91bmRhcnk6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgICByZWZlcmVuY2U6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgICBkaXNwbGF5OiAnc3RyaW5nJ1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICB9O1xuXG4gIHZhciBEcm9wZG93biA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICB0aGlzLl9wb3BwZXIgPSBudWxsO1xuICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICB0aGlzLl9tZW51ID0gdGhpcy5fZ2V0TWVudUVsZW1lbnQoKTtcbiAgICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKCk7XG5cbiAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSAvLyBHZXR0ZXJzXG5cblxuICAgIHZhciBfcHJvdG8gPSBEcm9wZG93bi5wcm90b3R5cGU7XG5cbiAgICAvLyBQdWJsaWNcbiAgICBfcHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgaWYgKHRoaXMuX2VsZW1lbnQuZGlzYWJsZWQgfHwgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgdmFyIGlzQWN0aXZlID0gJCh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgIERyb3Bkb3duLl9jbGVhck1lbnVzKCk7XG5cbiAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgICB9O1xuICAgICAgdmFyIHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVywgcmVsYXRlZFRhcmdldCk7XG4gICAgICAkKHBhcmVudCkudHJpZ2dlcihzaG93RXZlbnQpO1xuXG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gRGlzYWJsZSB0b3RhbGx5IFBvcHBlci5qcyBmb3IgRHJvcGRvd24gaW4gTmF2YmFyXG5cblxuICAgICAgaWYgKCF0aGlzLl9pbk5hdmJhcikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgZm9yIFBvcHBlciBkZXBlbmRlbmN5XG4gICAgICAgICAqIFBvcHBlciAtIGh0dHBzOi8vcG9wcGVyLmpzLm9yZ1xuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBQb3BwZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyBkcm9wZG93bnMgcmVxdWlyZSBQb3BwZXIuanMgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZy8pJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UgPT09ICdwYXJlbnQnKSB7XG4gICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHBhcmVudDtcbiAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzRWxlbWVudCh0aGlzLl9jb25maWcucmVmZXJlbmNlKSkge1xuICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9jb25maWcucmVmZXJlbmNlOyAvLyBDaGVjayBpZiBpdCdzIGpRdWVyeSBlbGVtZW50XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2VbMF07XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIElmIGJvdW5kYXJ5IGlzIG5vdCBgc2Nyb2xsUGFyZW50YCwgdGhlbiBzZXQgcG9zaXRpb24gdG8gYHN0YXRpY2BcbiAgICAgICAgLy8gdG8gYWxsb3cgdGhlIG1lbnUgdG8gXCJlc2NhcGVcIiB0aGUgc2Nyb2xsIHBhcmVudCdzIGJvdW5kYXJpZXNcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8yNDI1MVxuXG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5ib3VuZGFyeSAhPT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICAgICAgICAkKHBhcmVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlBPU0lUSU9OX1NUQVRJQyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wb3BwZXIgPSBuZXcgUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHRoaXMuX21lbnUsIHRoaXMuX2dldFBvcHBlckNvbmZpZygpKTtcbiAgICAgIH0gLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIGFkZCBleHRyYVxuICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAvLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMTQvMDIvbW91c2VfZXZlbnRfYnViLmh0bWxcblxuXG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICQocGFyZW50KS5jbG9zZXN0KFNlbGVjdG9yLk5BVkJBUl9OQVYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgJCh0aGlzLl9tZW51KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICAkKHBhcmVudCkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpLnRyaWdnZXIoJC5FdmVudChFdmVudC5TSE9XTiwgcmVsYXRlZFRhcmdldCkpO1xuICAgIH07XG5cbiAgICBfcHJvdG8uc2hvdyA9IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICBpZiAodGhpcy5fZWxlbWVudC5kaXNhYmxlZCB8fCAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkgfHwgJCh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudFxuICAgICAgfTtcbiAgICAgIHZhciBzaG93RXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1csIHJlbGF0ZWRUYXJnZXQpO1xuXG4gICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAkKHBhcmVudCkudHJpZ2dlcihzaG93RXZlbnQpO1xuXG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9tZW51KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICAkKHBhcmVudCkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpLnRyaWdnZXIoJC5FdmVudChFdmVudC5TSE9XTiwgcmVsYXRlZFRhcmdldCkpO1xuICAgIH07XG5cbiAgICBfcHJvdG8uaGlkZSA9IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICBpZiAodGhpcy5fZWxlbWVudC5kaXNhYmxlZCB8fCAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkgfHwgISQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgIH07XG4gICAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFLCByZWxhdGVkVGFyZ2V0KTtcblxuICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgJChwYXJlbnQpLnRyaWdnZXIoaGlkZUV2ZW50KTtcblxuICAgICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fbWVudSkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuICAgICAgJChwYXJlbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKS50cmlnZ2VyKCQuRXZlbnQoRXZlbnQuSElEREVOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgfTtcblxuICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFVkVOVF9LRVkpO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB0aGlzLl9tZW51ID0gbnVsbDtcblxuICAgICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuX3BvcHBlciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90by51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpO1xuXG4gICAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3BvcHBlci5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH07IC8vIFByaXZhdGVcblxuXG4gICAgX3Byb3RvLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuQ0xJQ0ssIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBfdGhpcy50b2dnbGUoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8uX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHQsICQodGhpcy5fZWxlbWVudCkuZGF0YSgpLCBjb25maWcpO1xuICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRUeXBlKTtcbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcblxuICAgIF9wcm90by5fZ2V0TWVudUVsZW1lbnQgPSBmdW5jdGlvbiBfZ2V0TWVudUVsZW1lbnQoKSB7XG4gICAgICBpZiAoIXRoaXMuX21lbnUpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgdGhpcy5fbWVudSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLk1FTlUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9tZW51O1xuICAgIH07XG5cbiAgICBfcHJvdG8uX2dldFBsYWNlbWVudCA9IGZ1bmN0aW9uIF9nZXRQbGFjZW1lbnQoKSB7XG4gICAgICB2YXIgJHBhcmVudERyb3Bkb3duID0gJCh0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUpO1xuICAgICAgdmFyIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuQk9UVE9NOyAvLyBIYW5kbGUgZHJvcHVwXG5cbiAgICAgIGlmICgkcGFyZW50RHJvcGRvd24uaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BVUCkpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5UT1A7XG5cbiAgICAgICAgaWYgKCQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLk1FTlVSSUdIVCkpIHtcbiAgICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLlRPUEVORDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgkcGFyZW50RHJvcGRvd24uaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BSSUdIVCkpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5SSUdIVDtcbiAgICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QTEVGVCkpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5MRUZUO1xuICAgICAgfSBlbHNlIGlmICgkKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5NRU5VUklHSFQpKSB7XG4gICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuQk9UVE9NRU5EO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGxhY2VtZW50O1xuICAgIH07XG5cbiAgICBfcHJvdG8uX2RldGVjdE5hdmJhciA9IGZ1bmN0aW9uIF9kZXRlY3ROYXZiYXIoKSB7XG4gICAgICByZXR1cm4gJCh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KCcubmF2YmFyJykubGVuZ3RoID4gMDtcbiAgICB9O1xuXG4gICAgX3Byb3RvLl9nZXRQb3BwZXJDb25maWcgPSBmdW5jdGlvbiBfZ2V0UG9wcGVyQ29uZmlnKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBvZmZzZXRDb25mID0ge307XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLm9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvZmZzZXRDb25mLmZuID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBkYXRhLm9mZnNldHMgPSBfb2JqZWN0U3ByZWFkKHt9LCBkYXRhLm9mZnNldHMsIF90aGlzMi5fY29uZmlnLm9mZnNldChkYXRhLm9mZnNldHMpIHx8IHt9KTtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZnNldENvbmYub2Zmc2V0ID0gdGhpcy5fY29uZmlnLm9mZnNldDtcbiAgICAgIH1cblxuICAgICAgdmFyIHBvcHBlckNvbmZpZyA9IHtcbiAgICAgICAgcGxhY2VtZW50OiB0aGlzLl9nZXRQbGFjZW1lbnQoKSxcbiAgICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXRDb25mLFxuICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuX2NvbmZpZy5mbGlwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgICAgICAgIGJvdW5kYXJpZXNFbGVtZW50OiB0aGlzLl9jb25maWcuYm91bmRhcnlcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gRGlzYWJsZSBQb3BwZXIuanMgaWYgd2UgaGF2ZSBhIHN0YXRpYyBkaXNwbGF5XG5cbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuZGlzcGxheSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgcG9wcGVyQ29uZmlnLm1vZGlmaWVycy5hcHBseVN0eWxlID0ge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwb3BwZXJDb25maWc7XG4gICAgfTsgLy8gU3RhdGljXG5cblxuICAgIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICB2YXIgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbDtcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJObyBtZXRob2QgbmFtZWQgXFxcIlwiICsgY29uZmlnICsgXCJcXFwiXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRHJvcGRvd24uX2NsZWFyTWVudXMgPSBmdW5jdGlvbiBfY2xlYXJNZW51cyhldmVudCkge1xuICAgICAgaWYgKGV2ZW50ICYmIChldmVudC53aGljaCA9PT0gUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQud2hpY2ggIT09IFRBQl9LRVlDT0RFKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0b2dnbGVzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0b2dnbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodG9nZ2xlc1tpXSk7XG5cbiAgICAgICAgdmFyIGNvbnRleHQgPSAkKHRvZ2dsZXNbaV0pLmRhdGEoREFUQV9LRVkpO1xuICAgICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0b2dnbGVzW2ldXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0LmNsaWNrRXZlbnQgPSBldmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRyb3Bkb3duTWVudSA9IGNvbnRleHQuX21lbnU7XG5cbiAgICAgICAgaWYgKCEkKHBhcmVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgJiYgL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkgfHwgZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC53aGljaCA9PT0gVEFCX0tFWUNPREUpICYmICQuY29udGFpbnMocGFyZW50LCBldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFLCByZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgJChwYXJlbnQpLnRyaWdnZXIoaGlkZUV2ZW50KTtcblxuICAgICAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB3ZSBhZGRlZCBmb3IgaU9TIHN1cHBvcnRcblxuXG4gICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub2ZmKCdtb3VzZW92ZXInLCBudWxsLCAkLm5vb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlc1tpXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgJChkcm9wZG93bk1lbnUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgJChwYXJlbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKS50cmlnZ2VyKCQuRXZlbnQoRXZlbnQuSElEREVOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCA9IGZ1bmN0aW9uIF9nZXRQYXJlbnRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICB2YXIgcGFyZW50O1xuICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIH07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5cblxuICAgIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIgPSBmdW5jdGlvbiBfZGF0YUFwaUtleWRvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgICAvLyBJZiBub3QgaW5wdXQvdGV4dGFyZWE6XG4gICAgICAvLyAgLSBBbmQgbm90IGEga2V5IGluIFJFR0VYUF9LRVlET1dOID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgIC8vIElmIGlucHV0L3RleHRhcmVhOlxuICAgICAgLy8gIC0gSWYgc3BhY2Uga2V5ID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgIC8vICAtIElmIGtleSBpcyBvdGhlciB0aGFuIGVzY2FwZVxuICAgICAgLy8gICAgLSBJZiBrZXkgaXMgbm90IHVwIG9yIGRvd24gPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgLy8gICAgLSBJZiB0cmlnZ2VyIGluc2lkZSB0aGUgbWVudSA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG4gICAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkgPyBldmVudC53aGljaCA9PT0gU1BBQ0VfS0VZQ09ERSB8fCBldmVudC53aGljaCAhPT0gRVNDQVBFX0tFWUNPREUgJiYgKGV2ZW50LndoaWNoICE9PSBBUlJPV19ET1dOX0tFWUNPREUgJiYgZXZlbnQud2hpY2ggIT09IEFSUk9XX1VQX0tFWUNPREUgfHwgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoU2VsZWN0b3IuTUVOVSkubGVuZ3RoKSA6ICFSRUdFWFBfS0VZRE9XTi50ZXN0KGV2ZW50LndoaWNoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgJCh0aGlzKS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzKTtcblxuICAgICAgdmFyIGlzQWN0aXZlID0gJChwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgaWYgKCFpc0FjdGl2ZSB8fCBpc0FjdGl2ZSAmJiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoID09PSBTUEFDRV9LRVlDT0RFKSkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICAgICAgdmFyIHRvZ2dsZSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLkRBVEFfVE9HR0xFKTtcbiAgICAgICAgICAkKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlbXMgPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlZJU0lCTEVfSVRFTVMpKTtcblxuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBpbmRleCA9IGl0ZW1zLmluZGV4T2YoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19VUF9LRVlDT0RFICYmIGluZGV4ID4gMCkge1xuICAgICAgICAvLyBVcFxuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEFSUk9XX0RPV05fS0VZQ09ERSAmJiBpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gRG93blxuICAgICAgICBpbmRleCsrO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgaXRlbXNbaW5kZXhdLmZvY3VzKCk7XG4gICAgfTtcblxuICAgIF9jcmVhdGVDbGFzcyhEcm9wZG93biwgbnVsbCwgW3tcbiAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcIkRlZmF1bHRcIixcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiRGVmYXVsdFR5cGVcIixcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIERyb3Bkb3duO1xuICB9KCk7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG5cbiAgJChkb2N1bWVudCkub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIpLm9uKEV2ZW50LktFWURPV05fREFUQV9BUEksIFNlbGVjdG9yLk1FTlUsIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJICsgXCIgXCIgKyBFdmVudC5LRVlVUF9EQVRBX0FQSSwgRHJvcGRvd24uX2NsZWFyTWVudXMpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAndG9nZ2xlJyk7XG4gIH0pLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5GT1JNX0NISUxELCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2U7XG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBEcm9wZG93bjtcblxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICByZXR1cm4gRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZTtcbiAgfTtcblxuICByZXR1cm4gRHJvcGRvd247XG5cbn0pKSk7XG4iXSwiZmlsZSI6InBsdWdpbnMuanMifQ==
