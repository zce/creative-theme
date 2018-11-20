"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable */
// https://unpkg.com/bootstrap/js/dist/util.js
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : global.Util = factory(global.jQuery);
})(window, function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
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
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
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
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
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
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
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
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  return Util;
}); // https://unpkg.com/bootstrap@4.1.3/js/dist/collapse.js


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
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
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
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
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
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
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
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

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
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
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


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
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

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  return Collapse;
}); // https://unpkg.com/bootstrap/js/dist/dropdown.js


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
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
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
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
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
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
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

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
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
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
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
          var data = $$$1(this).data(DATA_KEY);

          var _config = _typeof(config) === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
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

          var context = $$$1(toggles[i]).data(DATA_KEY);
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

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
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
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
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


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  return Dropdown;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMuanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwiZGVmaW5lIiwiYW1kIiwiVXRpbCIsImpRdWVyeSIsIndpbmRvdyIsIiQiLCJoYXNPd25Qcm9wZXJ0eSIsIiQkJDEiLCJUUkFOU0lUSU9OX0VORCIsIk1BWF9VSUQiLCJNSUxMSVNFQ09ORFNfTVVMVElQTElFUiIsInRvVHlwZSIsIm9iaiIsInRvU3RyaW5nIiwiY2FsbCIsIm1hdGNoIiwidG9Mb3dlckNhc2UiLCJnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50IiwiYmluZFR5cGUiLCJkZWxlZ2F0ZVR5cGUiLCJoYW5kbGUiLCJldmVudCIsInRhcmdldCIsImlzIiwiaGFuZGxlT2JqIiwiaGFuZGxlciIsImFwcGx5IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwidHJhbnNpdGlvbkVuZEVtdWxhdG9yIiwiZHVyYXRpb24iLCJfdGhpcyIsImNhbGxlZCIsIm9uZSIsInNldFRpbWVvdXQiLCJ0cmlnZ2VyVHJhbnNpdGlvbkVuZCIsInNldFRyYW5zaXRpb25FbmRTdXBwb3J0IiwiZm4iLCJlbXVsYXRlVHJhbnNpdGlvbkVuZCIsInNwZWNpYWwiLCJnZXRVSUQiLCJwcmVmaXgiLCJNYXRoIiwicmFuZG9tIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImdldFNlbGVjdG9yRnJvbUVsZW1lbnQiLCJlbGVtZW50Iiwic2VsZWN0b3IiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwiZXJyIiwiZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJjc3MiLCJmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJzcGxpdCIsInJlZmxvdyIsIm9mZnNldEhlaWdodCIsInRyaWdnZXIiLCJzdXBwb3J0c1RyYW5zaXRpb25FbmQiLCJCb29sZWFuIiwiaXNFbGVtZW50Iiwibm9kZVR5cGUiLCJ0eXBlQ2hlY2tDb25maWciLCJjb21wb25lbnROYW1lIiwiY29uZmlnIiwiY29uZmlnVHlwZXMiLCJwcm9wZXJ0eSIsIk9iamVjdCIsInByb3RvdHlwZSIsImV4cGVjdGVkVHlwZXMiLCJ2YWx1ZSIsInZhbHVlVHlwZSIsIlJlZ0V4cCIsInRlc3QiLCJFcnJvciIsInRvVXBwZXJDYXNlIiwiQ29sbGFwc2UiLCJfZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiaSIsImxlbmd0aCIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsImtleSIsIl9jcmVhdGVDbGFzcyIsIkNvbnN0cnVjdG9yIiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwiX2RlZmluZVByb3BlcnR5IiwiX29iamVjdFNwcmVhZCIsInNvdXJjZSIsIm93bktleXMiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiY29uY2F0IiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZm9yRWFjaCIsIk5BTUUiLCJWRVJTSU9OIiwiREFUQV9LRVkiLCJFVkVOVF9LRVkiLCJEQVRBX0FQSV9LRVkiLCJKUVVFUllfTk9fQ09ORkxJQ1QiLCJEZWZhdWx0IiwidG9nZ2xlIiwicGFyZW50IiwiRGVmYXVsdFR5cGUiLCJFdmVudCIsIlNIT1ciLCJTSE9XTiIsIkhJREUiLCJISURERU4iLCJDTElDS19EQVRBX0FQSSIsIkNsYXNzTmFtZSIsIkNPTExBUFNFIiwiQ09MTEFQU0lORyIsIkNPTExBUFNFRCIsIkRpbWVuc2lvbiIsIldJRFRIIiwiSEVJR0hUIiwiU2VsZWN0b3IiLCJBQ1RJVkVTIiwiREFUQV9UT0dHTEUiLCJfaXNUcmFuc2l0aW9uaW5nIiwiX2VsZW1lbnQiLCJfY29uZmlnIiwiX2dldENvbmZpZyIsIl90cmlnZ2VyQXJyYXkiLCJtYWtlQXJyYXkiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWQiLCJ0b2dnbGVMaXN0Iiwic2xpY2UiLCJsZW4iLCJlbGVtIiwiZmlsdGVyRWxlbWVudCIsImZvdW5kRWxlbSIsIl9zZWxlY3RvciIsInB1c2giLCJfcGFyZW50IiwiX2dldFBhcmVudCIsIl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MiLCJfcHJvdG8iLCJoYXNDbGFzcyIsImhpZGUiLCJzaG93IiwiYWN0aXZlcyIsImFjdGl2ZXNEYXRhIiwibm90IiwiZGF0YSIsInN0YXJ0RXZlbnQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJfalF1ZXJ5SW50ZXJmYWNlIiwiZGltZW5zaW9uIiwiX2dldERpbWVuc2lvbiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzdHlsZSIsImF0dHIiLCJzZXRUcmFuc2l0aW9uaW5nIiwiY29tcGxldGUiLCJjYXBpdGFsaXplZERpbWVuc2lvbiIsInNjcm9sbFNpemUiLCJfdGhpczIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0cmlnZ2VyQXJyYXlMZW5ndGgiLCIkZWxlbSIsImlzVHJhbnNpdGlvbmluZyIsImRpc3Bvc2UiLCJyZW1vdmVEYXRhIiwiaGFzV2lkdGgiLCJfdGhpczMiLCJqcXVlcnkiLCJjaGlsZHJlbiIsImVhY2giLCJfZ2V0VGFyZ2V0RnJvbUVsZW1lbnQiLCJ0cmlnZ2VyQXJyYXkiLCJpc09wZW4iLCJ0b2dnbGVDbGFzcyIsIiR0aGlzIiwiVHlwZUVycm9yIiwiZ2V0Iiwib24iLCJjdXJyZW50VGFyZ2V0IiwidGFnTmFtZSIsInByZXZlbnREZWZhdWx0IiwiJHRyaWdnZXIiLCJzZWxlY3RvcnMiLCIkdGFyZ2V0Iiwibm9Db25mbGljdCIsIkRyb3Bkb3duIiwiUG9wcGVyIiwiRVNDQVBFX0tFWUNPREUiLCJTUEFDRV9LRVlDT0RFIiwiVEFCX0tFWUNPREUiLCJBUlJPV19VUF9LRVlDT0RFIiwiQVJST1dfRE9XTl9LRVlDT0RFIiwiUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIIiwiUkVHRVhQX0tFWURPV04iLCJDTElDSyIsIktFWURPV05fREFUQV9BUEkiLCJLRVlVUF9EQVRBX0FQSSIsIkRJU0FCTEVEIiwiRFJPUFVQIiwiRFJPUFJJR0hUIiwiRFJPUExFRlQiLCJNRU5VUklHSFQiLCJNRU5VTEVGVCIsIlBPU0lUSU9OX1NUQVRJQyIsIkZPUk1fQ0hJTEQiLCJNRU5VIiwiTkFWQkFSX05BViIsIlZJU0lCTEVfSVRFTVMiLCJBdHRhY2htZW50TWFwIiwiVE9QIiwiVE9QRU5EIiwiQk9UVE9NIiwiQk9UVE9NRU5EIiwiUklHSFQiLCJSSUdIVEVORCIsIkxFRlQiLCJMRUZURU5EIiwib2Zmc2V0IiwiZmxpcCIsImJvdW5kYXJ5IiwicmVmZXJlbmNlIiwiZGlzcGxheSIsIl9wb3BwZXIiLCJfbWVudSIsIl9nZXRNZW51RWxlbWVudCIsIl9pbk5hdmJhciIsIl9kZXRlY3ROYXZiYXIiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJkaXNhYmxlZCIsIl9nZXRQYXJlbnRGcm9tRWxlbWVudCIsImlzQWN0aXZlIiwiX2NsZWFyTWVudXMiLCJyZWxhdGVkVGFyZ2V0Iiwic2hvd0V2ZW50IiwicmVmZXJlbmNlRWxlbWVudCIsIl9nZXRQb3BwZXJDb25maWciLCJkb2N1bWVudEVsZW1lbnQiLCJjbG9zZXN0IiwiYm9keSIsIm5vb3AiLCJmb2N1cyIsInNldEF0dHJpYnV0ZSIsIm9mZiIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJzY2hlZHVsZVVwZGF0ZSIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnN0cnVjdG9yIiwiX2dldFBsYWNlbWVudCIsIiRwYXJlbnREcm9wZG93biIsInBhcmVudE5vZGUiLCJwbGFjZW1lbnQiLCJvZmZzZXRDb25mIiwib2Zmc2V0cyIsInBvcHBlckNvbmZpZyIsIm1vZGlmaWVycyIsImVuYWJsZWQiLCJwcmV2ZW50T3ZlcmZsb3ciLCJib3VuZGFyaWVzRWxlbWVudCIsImFwcGx5U3R5bGUiLCJ3aGljaCIsInR5cGUiLCJ0b2dnbGVzIiwiY29udGV4dCIsImNsaWNrRXZlbnQiLCJkcm9wZG93bk1lbnUiLCJjb250YWlucyIsImhpZGVFdmVudCIsIl9kYXRhQXBp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RixjQUFsTixFQUFrT1gsUUFBUSxDQUFDOEMsV0FBM08sRUFBd1B0RCxFQUF4UCxDQUEyUDNFLEtBQUssQ0FBQ0ssY0FBalEsRUFBaVJRLFFBQVEsQ0FBQ0UsV0FBMVIsRUFBdVMsVUFBVTdHLEtBQVYsRUFBaUI7QUFDdFRBLE1BQUFBLEtBQUssQ0FBQzRLLGNBQU47QUFDQTVLLE1BQUFBLEtBQUssQ0FBQzhPLGVBQU47O0FBRUE3RCxNQUFBQSxRQUFRLENBQUN0QyxnQkFBVCxDQUEwQmxKLElBQTFCLENBQStCUCxJQUFJLENBQUMsSUFBRCxDQUFuQyxFQUEyQyxRQUEzQztBQUNELEtBTEQsRUFLR3VMLEVBTEgsQ0FLTTNFLEtBQUssQ0FBQ0ssY0FMWixFQUs0QlEsUUFBUSxDQUFDeUYsVUFMckMsRUFLaUQsVUFBVW9FLENBQVYsRUFBYTtBQUM1REEsTUFBQUEsQ0FBQyxDQUFDMUIsZUFBRjtBQUNELEtBUEQ7QUFRQTs7Ozs7O0FBTUE1UCxJQUFBQSxJQUFJLENBQUM4QixFQUFMLENBQVFvRSxJQUFSLElBQWdCNkYsUUFBUSxDQUFDdEMsZ0JBQXpCO0FBQ0F6SixJQUFBQSxJQUFJLENBQUM4QixFQUFMLENBQVFvRSxJQUFSLEVBQWNkLFdBQWQsR0FBNEIyRyxRQUE1Qjs7QUFFQS9MLElBQUFBLElBQUksQ0FBQzhCLEVBQUwsQ0FBUW9FLElBQVIsRUFBYzRGLFVBQWQsR0FBMkIsWUFBWTtBQUNyQzlMLE1BQUFBLElBQUksQ0FBQzhCLEVBQUwsQ0FBUW9FLElBQVIsSUFBZ0JLLGtCQUFoQjtBQUNBLGFBQU93RixRQUFRLENBQUN0QyxnQkFBaEI7QUFDRCxLQUhEOztBQUtBLFdBQU9zQyxRQUFQO0FBQ0QsR0EvZGMsQ0ErZGJqTSxDQS9kYSxFQStkVmtNLE1BL2RVLENBQWY7O0FBaWVBLFNBQU9ELFFBQVA7QUFFRCxDQXRpQkEsQ0FBRCIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5cbi8vIGh0dHBzOi8vdW5wa2cuY29tL2Jvb3RzdHJhcC9qcy9kaXN0L3V0aWwuanNcbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsLlV0aWwgPSBmYWN0b3J5KGdsb2JhbC5qUXVlcnkpKTtcbn0od2luZG93LCAoZnVuY3Rpb24gKCQpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICQgPSAkICYmICQuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/ICRbJ2RlZmF1bHQnXSA6ICQ7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMS4zKTogdXRpbC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgVXRpbCA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogUHJpdmF0ZSBUcmFuc2l0aW9uRW5kIEhlbHBlcnNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cbiAgICB2YXIgVFJBTlNJVElPTl9FTkQgPSAndHJhbnNpdGlvbmVuZCc7XG4gICAgdmFyIE1BWF9VSUQgPSAxMDAwMDAwO1xuICAgIHZhciBNSUxMSVNFQ09ORFNfTVVMVElQTElFUiA9IDEwMDA7IC8vIFNob3V0b3V0IEFuZ3VzQ3JvbGwgKGh0dHBzOi8vZ29vLmdsL3B4d1FHcClcblxuICAgIGZ1bmN0aW9uIHRvVHlwZShvYmopIHtcbiAgICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKG9iaikubWF0Y2goL1xccyhbYS16XSspL2kpWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3BlY2lhbFRyYW5zaXRpb25FbmRFdmVudCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJpbmRUeXBlOiBUUkFOU0lUSU9OX0VORCxcbiAgICAgICAgZGVsZWdhdGVUeXBlOiBUUkFOU0lUSU9OX0VORCxcbiAgICAgICAgaGFuZGxlOiBmdW5jdGlvbiBoYW5kbGUoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoJCQkMShldmVudC50YXJnZXQpLmlzKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQuaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmRFbXVsYXRvcihkdXJhdGlvbikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgICAgJCQkMSh0aGlzKS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKF90aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSwgZHVyYXRpb24pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQoKSB7XG4gICAgICAkJCQxLmZuLmVtdWxhdGVUcmFuc2l0aW9uRW5kID0gdHJhbnNpdGlvbkVuZEVtdWxhdG9yO1xuICAgICAgJCQkMS5ldmVudC5zcGVjaWFsW1V0aWwuVFJBTlNJVElPTl9FTkRdID0gZ2V0U3BlY2lhbFRyYW5zaXRpb25FbmRFdmVudCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIFB1YmxpYyBVdGlsIEFwaVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cblxuICAgIHZhciBVdGlsID0ge1xuICAgICAgVFJBTlNJVElPTl9FTkQ6ICdic1RyYW5zaXRpb25FbmQnLFxuICAgICAgZ2V0VUlEOiBmdW5jdGlvbiBnZXRVSUQocHJlZml4KSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgICAgIHByZWZpeCArPSB+fihNYXRoLnJhbmRvbSgpICogTUFYX1VJRCk7IC8vIFwifn5cIiBhY3RzIGxpa2UgYSBmYXN0ZXIgTWF0aC5mbG9vcigpIGhlcmVcbiAgICAgICAgfSB3aGlsZSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4KSk7XG5cbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICAgIH0sXG4gICAgICBnZXRTZWxlY3RvckZyb21FbGVtZW50OiBmdW5jdGlvbiBnZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XG5cbiAgICAgICAgaWYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gJyMnKSB7XG4gICAgICAgICAgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgPyBzZWxlY3RvciA6IG51bGw7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQ6IGZ1bmN0aW9uIGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcblxuXG4gICAgICAgIHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSAkJCQxKGVsZW1lbnQpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xuICAgICAgICB2YXIgZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gPSBwYXJzZUZsb2F0KHRyYW5zaXRpb25EdXJhdGlvbik7IC8vIFJldHVybiAwIGlmIGVsZW1lbnQgb3IgdHJhbnNpdGlvbiBkdXJhdGlvbiBpcyBub3QgZm91bmRcblxuICAgICAgICBpZiAoIWZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuXG5cbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uID0gdHJhbnNpdGlvbkR1cmF0aW9uLnNwbGl0KCcsJylbMF07XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRyYW5zaXRpb25EdXJhdGlvbikgKiBNSUxMSVNFQ09ORFNfTVVMVElQTElFUjtcbiAgICAgIH0sXG4gICAgICByZWZsb3c6IGZ1bmN0aW9uIHJlZmxvdyhlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgIH0sXG4gICAgICB0cmlnZ2VyVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJpZ2dlclRyYW5zaXRpb25FbmQoZWxlbWVudCkge1xuICAgICAgICAkJCQxKGVsZW1lbnQpLnRyaWdnZXIoVFJBTlNJVElPTl9FTkQpO1xuICAgICAgfSxcbiAgICAgIC8vIFRPRE86IFJlbW92ZSBpbiB2NVxuICAgICAgc3VwcG9ydHNUcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiBzdXBwb3J0c1RyYW5zaXRpb25FbmQoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKFRSQU5TSVRJT05fRU5EKTtcbiAgICAgIH0sXG4gICAgICBpc0VsZW1lbnQ6IGZ1bmN0aW9uIGlzRWxlbWVudChvYmopIHtcbiAgICAgICAgcmV0dXJuIChvYmpbMF0gfHwgb2JqKS5ub2RlVHlwZTtcbiAgICAgIH0sXG4gICAgICB0eXBlQ2hlY2tDb25maWc6IGZ1bmN0aW9uIHR5cGVDaGVja0NvbmZpZyhjb21wb25lbnROYW1lLCBjb25maWcsIGNvbmZpZ1R5cGVzKSB7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIGNvbmZpZ1R5cGVzKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb25maWdUeXBlcywgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICB2YXIgZXhwZWN0ZWRUeXBlcyA9IGNvbmZpZ1R5cGVzW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV07XG4gICAgICAgICAgICB2YXIgdmFsdWVUeXBlID0gdmFsdWUgJiYgVXRpbC5pc0VsZW1lbnQodmFsdWUpID8gJ2VsZW1lbnQnIDogdG9UeXBlKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKCFuZXcgUmVnRXhwKGV4cGVjdGVkVHlwZXMpLnRlc3QodmFsdWVUeXBlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpICsgXCI6IFwiICsgKFwiT3B0aW9uIFxcXCJcIiArIHByb3BlcnR5ICsgXCJcXFwiIHByb3ZpZGVkIHR5cGUgXFxcIlwiICsgdmFsdWVUeXBlICsgXCJcXFwiIFwiKSArIChcImJ1dCBleHBlY3RlZCB0eXBlIFxcXCJcIiArIGV4cGVjdGVkVHlwZXMgKyBcIlxcXCIuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHNldFRyYW5zaXRpb25FbmRTdXBwb3J0KCk7XG4gICAgcmV0dXJuIFV0aWw7XG4gIH0oJCk7XG5cbiAgcmV0dXJuIFV0aWw7XG5cbn0pKSk7XG5cbi8vIGh0dHBzOi8vdW5wa2cuY29tL2Jvb3RzdHJhcEA0LjEuMy9qcy9kaXN0L2NvbGxhcHNlLmpzXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JyksIHJlcXVpcmUoJy4vdXRpbC5qcycpKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2pxdWVyeScsICcuL3V0aWwuanMnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsLkNvbGxhcHNlID0gZmFjdG9yeShnbG9iYWwualF1ZXJ5LGdsb2JhbC5VdGlsKSk7XG59KHdpbmRvdywgKGZ1bmN0aW9uICgkLFV0aWwpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICQgPSAkICYmICQuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/ICRbJ2RlZmF1bHQnXSA6ICQ7XG4gIFV0aWwgPSBVdGlsICYmIFV0aWwuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/IFV0aWxbJ2RlZmF1bHQnXSA6IFV0aWw7XG5cbiAgZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9XG5cbiAgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMS4zKTogY29sbGFwc2UuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIENvbGxhcHNlID0gZnVuY3Rpb24gKCQkJDEpIHtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cbiAgICB2YXIgTkFNRSA9ICdjb2xsYXBzZSc7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4xLjMnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy5jb2xsYXBzZSc7XG4gICAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkJCQxLmZuW05BTUVdO1xuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgdG9nZ2xlOiB0cnVlLFxuICAgICAgcGFyZW50OiAnJ1xuICAgIH07XG4gICAgdmFyIERlZmF1bHRUeXBlID0ge1xuICAgICAgdG9nZ2xlOiAnYm9vbGVhbicsXG4gICAgICBwYXJlbnQ6ICcoc3RyaW5nfGVsZW1lbnQpJ1xuICAgIH07XG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgU0hPVzogXCJzaG93XCIgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogXCJzaG93blwiICsgRVZFTlRfS0VZLFxuICAgICAgSElERTogXCJoaWRlXCIgKyBFVkVOVF9LRVksXG4gICAgICBISURERU46IFwiaGlkZGVuXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogXCJjbGlja1wiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gICAgfTtcbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgU0hPVzogJ3Nob3cnLFxuICAgICAgQ09MTEFQU0U6ICdjb2xsYXBzZScsXG4gICAgICBDT0xMQVBTSU5HOiAnY29sbGFwc2luZycsXG4gICAgICBDT0xMQVBTRUQ6ICdjb2xsYXBzZWQnXG4gICAgfTtcbiAgICB2YXIgRGltZW5zaW9uID0ge1xuICAgICAgV0lEVEg6ICd3aWR0aCcsXG4gICAgICBIRUlHSFQ6ICdoZWlnaHQnXG4gICAgfTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBBQ1RJVkVTOiAnLnNob3csIC5jb2xsYXBzaW5nJyxcbiAgICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl0nXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgIH07XG5cbiAgICB2YXIgQ29sbGFwc2UgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBDb2xsYXBzZShlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5ID0gJCQkMS5tYWtlQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXRvZ2dsZT1cXFwiY29sbGFwc2VcXFwiXVtocmVmPVxcXCIjXCIgKyBlbGVtZW50LmlkICsgXCJcXFwiXSxcIiArIChcIltkYXRhLXRvZ2dsZT1cXFwiY29sbGFwc2VcXFwiXVtkYXRhLXRhcmdldD1cXFwiI1wiICsgZWxlbWVudC5pZCArIFwiXFxcIl1cIikpKTtcbiAgICAgICAgdmFyIHRvZ2dsZUxpc3QgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuREFUQV9UT0dHTEUpKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdG9nZ2xlTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHZhciBlbGVtID0gdG9nZ2xlTGlzdFtpXTtcbiAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbSk7XG4gICAgICAgICAgdmFyIGZpbHRlckVsZW1lbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5maWx0ZXIoZnVuY3Rpb24gKGZvdW5kRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kRWxlbSA9PT0gZWxlbWVudDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCAmJiBmaWx0ZXJFbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3I7XG5cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJBcnJheS5wdXNoKGVsZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnQgPyB0aGlzLl9nZXRQYXJlbnQoKSA6IG51bGw7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuX2VsZW1lbnQsIHRoaXMuX3RyaWdnZXJBcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnRvZ2dsZSkge1xuICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICAgIHZhciBfcHJvdG8gPSBDb2xsYXBzZS5wcm90b3R5cGU7XG5cbiAgICAgIC8vIFB1YmxpY1xuICAgICAgX3Byb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKCQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5zaG93ID0gZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGl2ZXM7XG4gICAgICAgIHZhciBhY3RpdmVzRGF0YTtcblxuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgYWN0aXZlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQUNUSVZFUykpLmZpbHRlcihmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcpID09PSBfdGhpcy5fY29uZmlnLnBhcmVudDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChhY3RpdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWN0aXZlcyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGl2ZXMpIHtcbiAgICAgICAgICBhY3RpdmVzRGF0YSA9ICQkJDEoYWN0aXZlcykubm90KHRoaXMuX3NlbGVjdG9yKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIGlmIChhY3RpdmVzRGF0YSAmJiBhY3RpdmVzRGF0YS5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0RXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LlNIT1cpO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc3RhcnRFdmVudCk7XG5cbiAgICAgICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkJCQxKGFjdGl2ZXMpLm5vdCh0aGlzLl9zZWxlY3RvciksICdoaWRlJyk7XG5cbiAgICAgICAgICBpZiAoIWFjdGl2ZXNEYXRhKSB7XG4gICAgICAgICAgICAkJCQxKGFjdGl2ZXMpLmRhdGEoREFUQV9LRVksIG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKTtcblxuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpO1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgJCQkMSh0aGlzLl90cmlnZ2VyQXJyYXkpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyh0cnVlKTtcblxuICAgICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAkJCQxKF90aGlzLl9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICAgICAgX3RoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnO1xuXG4gICAgICAgICAgX3RoaXMuc2V0VHJhbnNpdGlvbmluZyhmYWxzZSk7XG5cbiAgICAgICAgICAkJCQxKF90aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LlNIT1dOKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2FwaXRhbGl6ZWREaW1lbnNpb24gPSBkaW1lbnNpb25bMF0udG9VcHBlckNhc2UoKSArIGRpbWVuc2lvbi5zbGljZSgxKTtcbiAgICAgICAgdmFyIHNjcm9sbFNpemUgPSBcInNjcm9sbFwiICsgY2FwaXRhbGl6ZWREaW1lbnNpb247XG4gICAgICAgIHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gdGhpcy5fZWxlbWVudFtzY3JvbGxTaXplXSArIFwicHhcIjtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5oaWRlID0gZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCAhJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnRFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuSElERSk7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzdGFydEV2ZW50KTtcblxuICAgICAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSB0aGlzLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2RpbWVuc2lvbl0gKyBcInB4XCI7XG4gICAgICAgIFV0aWwucmVmbG93KHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgdmFyIHRyaWdnZXJBcnJheUxlbmd0aCA9IHRoaXMuX3RyaWdnZXJBcnJheS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHRyaWdnZXJBcnJheUxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyaWdnZXJBcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdHJpZ2dlciA9IHRoaXMuX3RyaWdnZXJBcnJheVtpXTtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0cmlnZ2VyKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHZhciAkZWxlbSA9ICQkJDEoW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkpO1xuXG4gICAgICAgICAgICAgIGlmICghJGVsZW0uaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgICAgICAgJCQkMSh0cmlnZ2VyKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uaW5nKHRydWUpO1xuXG4gICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgIF90aGlzMi5zZXRUcmFuc2l0aW9uaW5nKGZhbHNlKTtcblxuICAgICAgICAgICQkJDEoX3RoaXMyLl9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKS50cmlnZ2VyKEV2ZW50LkhJRERFTik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJyc7XG4gICAgICAgIHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5zZXRUcmFuc2l0aW9uaW5nID0gZnVuY3Rpb24gc2V0VHJhbnNpdGlvbmluZyhpc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gaXNUcmFuc2l0aW9uaW5nO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAkJCQxLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpO1xuICAgICAgICB0aGlzLl9jb25maWcgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gbnVsbDtcbiAgICAgIH07IC8vIFByaXZhdGVcblxuXG4gICAgICBfcHJvdG8uX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIERlZmF1bHQsIGNvbmZpZyk7XG4gICAgICAgIGNvbmZpZy50b2dnbGUgPSBCb29sZWFuKGNvbmZpZy50b2dnbGUpOyAvLyBDb2VyY2Ugc3RyaW5nIHZhbHVlc1xuXG4gICAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXREaW1lbnNpb24gPSBmdW5jdGlvbiBfZ2V0RGltZW5zaW9uKCkge1xuICAgICAgICB2YXIgaGFzV2lkdGggPSAkJCQxKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKERpbWVuc2lvbi5XSURUSCk7XG4gICAgICAgIHJldHVybiBoYXNXaWR0aCA/IERpbWVuc2lvbi5XSURUSCA6IERpbWVuc2lvbi5IRUlHSFQ7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldFBhcmVudCA9IGZ1bmN0aW9uIF9nZXRQYXJlbnQoKSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBwYXJlbnQgPSBudWxsO1xuXG4gICAgICAgIGlmIChVdGlsLmlzRWxlbWVudCh0aGlzLl9jb25maWcucGFyZW50KSkge1xuICAgICAgICAgIHBhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnQ7IC8vIEl0J3MgYSBqUXVlcnkgb2JqZWN0XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5wYXJlbnQuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudFswXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9jb25maWcucGFyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxlY3RvciA9IFwiW2RhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCJdW2RhdGEtcGFyZW50PVxcXCJcIiArIHRoaXMuX2NvbmZpZy5wYXJlbnQgKyBcIlxcXCJdXCI7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFtdLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgJCQkMShjaGlsZHJlbikuZWFjaChmdW5jdGlvbiAoaSwgZWxlbWVudCkge1xuICAgICAgICAgIF90aGlzMy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKENvbGxhcHNlLl9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSwgW2VsZW1lbnRdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyA9IGZ1bmN0aW9uIF9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZWxlbWVudCwgdHJpZ2dlckFycmF5KSB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIGlzT3BlbiA9ICQkJDEoZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICAgICAgaWYgKHRyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQkJDEodHJpZ2dlckFycmF5KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VELCAhaXNPcGVuKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07IC8vIFN0YXRpY1xuXG5cbiAgICAgIENvbGxhcHNlLl9nZXRUYXJnZXRGcm9tRWxlbWVudCA9IGZ1bmN0aW9uIF9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBudWxsO1xuICAgICAgfTtcblxuICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciAkdGhpcyA9ICQkJDEodGhpcyk7XG4gICAgICAgICAgdmFyIGRhdGEgPSAkdGhpcy5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIHZhciBfY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgRGVmYXVsdCwgJHRoaXMuZGF0YSgpLCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fSk7XG5cbiAgICAgICAgICBpZiAoIWRhdGEgJiYgX2NvbmZpZy50b2dnbGUgJiYgL3Nob3d8aGlkZS8udGVzdChjb25maWcpKSB7XG4gICAgICAgICAgICBfY29uZmlnLnRvZ2dsZSA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBDb2xsYXBzZSh0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAgICR0aGlzLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJObyBtZXRob2QgbmFtZWQgXFxcIlwiICsgY29uZmlnICsgXCJcXFwiXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgX2NyZWF0ZUNsYXNzKENvbGxhcHNlLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuXG4gICAgICByZXR1cm4gQ29sbGFwc2U7XG4gICAgfSgpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cblxuICAgICQkJDEoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAvLyBwcmV2ZW50RGVmYXVsdCBvbmx5IGZvciA8YT4gZWxlbWVudHMgKHdoaWNoIGNoYW5nZSB0aGUgVVJMKSBub3QgaW5zaWRlIHRoZSBjb2xsYXBzaWJsZSBlbGVtZW50XG4gICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgdmFyICR0cmlnZ2VyID0gJCQkMSh0aGlzKTtcbiAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzKTtcbiAgICAgIHZhciBzZWxlY3RvcnMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICQkJDEoc2VsZWN0b3JzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0YXJnZXQgPSAkJCQxKHRoaXMpO1xuICAgICAgICB2YXIgZGF0YSA9ICR0YXJnZXQuZGF0YShEQVRBX0tFWSk7XG4gICAgICAgIHZhciBjb25maWcgPSBkYXRhID8gJ3RvZ2dsZScgOiAkdHJpZ2dlci5kYXRhKCk7XG5cbiAgICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCR0YXJnZXQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQkJDEuZm5bTkFNRV0gPSBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQkJDEuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDb2xsYXBzZTtcblxuICAgICQkJDEuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQkJDEuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbGxhcHNlO1xuICB9KCQpO1xuXG4gIHJldHVybiBDb2xsYXBzZTtcblxufSkpKTtcblxuLy8gaHR0cHM6Ly91bnBrZy5jb20vYm9vdHN0cmFwL2pzL2Rpc3QvZHJvcGRvd24uanNcbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSwgcmVxdWlyZSgncG9wcGVyLmpzJyksIHJlcXVpcmUoJy4vdXRpbC5qcycpKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2pxdWVyeScsICdwb3BwZXIuanMnLCAnLi91dGlsLmpzJ10sIGZhY3RvcnkpIDpcbiAgKGdsb2JhbC5Ecm9wZG93biA9IGZhY3RvcnkoZ2xvYmFsLmpRdWVyeSxnbG9iYWwuUG9wcGVyLGdsb2JhbC5VdGlsKSk7XG59KHdpbmRvdywgKGZ1bmN0aW9uICgkLFBvcHBlcixVdGlsKSB7ICd1c2Ugc3RyaWN0JztcblxuICAkID0gJCAmJiAkLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgPyAkWydkZWZhdWx0J10gOiAkO1xuICBQb3BwZXIgPSBQb3BwZXIgJiYgUG9wcGVyLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgPyBQb3BwZXJbJ2RlZmF1bHQnXSA6IFBvcHBlcjtcbiAgVXRpbCA9IFV0aWwgJiYgVXRpbC5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpID8gVXRpbFsnZGVmYXVsdCddIDogVXRpbDtcblxuICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH1cblxuICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiBkcm9wZG93bi5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgRHJvcGRvd24gPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ2Ryb3Bkb3duJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLmRyb3Bkb3duJztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIEVTQ0FQRV9LRVlDT0RFID0gMjc7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIEVzY2FwZSAoRXNjKSBrZXlcblxuICAgIHZhciBTUEFDRV9LRVlDT0RFID0gMzI7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHNwYWNlIGtleVxuXG4gICAgdmFyIFRBQl9LRVlDT0RFID0gOTsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdGFiIGtleVxuXG4gICAgdmFyIEFSUk9XX1VQX0tFWUNPREUgPSAzODsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdXAgYXJyb3cga2V5XG5cbiAgICB2YXIgQVJST1dfRE9XTl9LRVlDT0RFID0gNDA7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIGRvd24gYXJyb3cga2V5XG5cbiAgICB2YXIgUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIID0gMzsgLy8gTW91c2VFdmVudC53aGljaCB2YWx1ZSBmb3IgdGhlIHJpZ2h0IGJ1dHRvbiAoYXNzdW1pbmcgYSByaWdodC1oYW5kZWQgbW91c2UpXG5cbiAgICB2YXIgUkVHRVhQX0tFWURPV04gPSBuZXcgUmVnRXhwKEFSUk9XX1VQX0tFWUNPREUgKyBcInxcIiArIEFSUk9XX0RPV05fS0VZQ09ERSArIFwifFwiICsgRVNDQVBFX0tFWUNPREUpO1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIEhJREU6IFwiaGlkZVwiICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiBcImhpZGRlblwiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPVzogXCJzaG93XCIgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogXCJzaG93blwiICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0s6IFwiY2xpY2tcIiArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLX0RBVEFfQVBJOiBcImNsaWNrXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVksXG4gICAgICBLRVlET1dOX0RBVEFfQVBJOiBcImtleWRvd25cIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICAgIEtFWVVQX0RBVEFfQVBJOiBcImtleXVwXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgICB9O1xuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBESVNBQkxFRDogJ2Rpc2FibGVkJyxcbiAgICAgIFNIT1c6ICdzaG93JyxcbiAgICAgIERST1BVUDogJ2Ryb3B1cCcsXG4gICAgICBEUk9QUklHSFQ6ICdkcm9wcmlnaHQnLFxuICAgICAgRFJPUExFRlQ6ICdkcm9wbGVmdCcsXG4gICAgICBNRU5VUklHSFQ6ICdkcm9wZG93bi1tZW51LXJpZ2h0JyxcbiAgICAgIE1FTlVMRUZUOiAnZHJvcGRvd24tbWVudS1sZWZ0JyxcbiAgICAgIFBPU0lUSU9OX1NUQVRJQzogJ3Bvc2l0aW9uLXN0YXRpYydcbiAgICB9O1xuICAgIHZhciBTZWxlY3RvciA9IHtcbiAgICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nLFxuICAgICAgRk9STV9DSElMRDogJy5kcm9wZG93biBmb3JtJyxcbiAgICAgIE1FTlU6ICcuZHJvcGRvd24tbWVudScsXG4gICAgICBOQVZCQVJfTkFWOiAnLm5hdmJhci1uYXYnLFxuICAgICAgVklTSUJMRV9JVEVNUzogJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJ1xuICAgIH07XG4gICAgdmFyIEF0dGFjaG1lbnRNYXAgPSB7XG4gICAgICBUT1A6ICd0b3Atc3RhcnQnLFxuICAgICAgVE9QRU5EOiAndG9wLWVuZCcsXG4gICAgICBCT1RUT006ICdib3R0b20tc3RhcnQnLFxuICAgICAgQk9UVE9NRU5EOiAnYm90dG9tLWVuZCcsXG4gICAgICBSSUdIVDogJ3JpZ2h0LXN0YXJ0JyxcbiAgICAgIFJJR0hURU5EOiAncmlnaHQtZW5kJyxcbiAgICAgIExFRlQ6ICdsZWZ0LXN0YXJ0JyxcbiAgICAgIExFRlRFTkQ6ICdsZWZ0LWVuZCdcbiAgICB9O1xuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgb2Zmc2V0OiAwLFxuICAgICAgZmxpcDogdHJ1ZSxcbiAgICAgIGJvdW5kYXJ5OiAnc2Nyb2xsUGFyZW50JyxcbiAgICAgIHJlZmVyZW5jZTogJ3RvZ2dsZScsXG4gICAgICBkaXNwbGF5OiAnZHluYW1pYydcbiAgICB9O1xuICAgIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICAgIG9mZnNldDogJyhudW1iZXJ8c3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgICBmbGlwOiAnYm9vbGVhbicsXG4gICAgICBib3VuZGFyeTogJyhzdHJpbmd8ZWxlbWVudCknLFxuICAgICAgcmVmZXJlbmNlOiAnKHN0cmluZ3xlbGVtZW50KScsXG4gICAgICBkaXNwbGF5OiAnc3RyaW5nJ1xuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICB9O1xuXG4gICAgdmFyIERyb3Bkb3duID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gRHJvcGRvd24oZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9wb3BwZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fbWVudSA9IHRoaXMuX2dldE1lbnVFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKCk7XG5cbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICAgIHZhciBfcHJvdG8gPSBEcm9wZG93bi5wcm90b3R5cGU7XG5cbiAgICAgIC8vIFB1YmxpY1xuICAgICAgX3Byb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQuZGlzYWJsZWQgfHwgJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgICB2YXIgaXNBY3RpdmUgPSAkJCQxKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgICBEcm9wZG93bi5fY2xlYXJNZW51cygpO1xuXG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNob3dFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuU0hPVywgcmVsYXRlZFRhcmdldCk7XG4gICAgICAgICQkJDEocGFyZW50KS50cmlnZ2VyKHNob3dFdmVudCk7XG5cbiAgICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBEaXNhYmxlIHRvdGFsbHkgUG9wcGVyLmpzIGZvciBEcm9wZG93biBpbiBOYXZiYXJcblxuXG4gICAgICAgIGlmICghdGhpcy5faW5OYXZiYXIpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDaGVjayBmb3IgUG9wcGVyIGRlcGVuZGVuY3lcbiAgICAgICAgICAgKiBQb3BwZXIgLSBodHRwczovL3BvcHBlci5qcy5vcmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcCBkcm9wZG93biByZXF1aXJlIFBvcHBlci5qcyAoaHR0cHM6Ly9wb3BwZXIuanMub3JnKScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcblxuICAgICAgICAgIGlmICh0aGlzLl9jb25maWcucmVmZXJlbmNlID09PSAncGFyZW50Jykge1xuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHBhcmVudDtcbiAgICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UpKSB7XG4gICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fY29uZmlnLnJlZmVyZW5jZTsgLy8gQ2hlY2sgaWYgaXQncyBqUXVlcnkgZWxlbWVudFxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fY29uZmlnLnJlZmVyZW5jZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IC8vIElmIGJvdW5kYXJ5IGlzIG5vdCBgc2Nyb2xsUGFyZW50YCwgdGhlbiBzZXQgcG9zaXRpb24gdG8gYHN0YXRpY2BcbiAgICAgICAgICAvLyB0byBhbGxvdyB0aGUgbWVudSB0byBcImVzY2FwZVwiIHRoZSBzY3JvbGwgcGFyZW50J3MgYm91bmRhcmllc1xuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMjQyNTFcblxuXG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5ib3VuZGFyeSAhPT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICAgICAgICAgICQkJDEocGFyZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuUE9TSVRJT05fU1RBVElDKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9wb3BwZXIgPSBuZXcgUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHRoaXMuX21lbnUsIHRoaXMuX2dldFBvcHBlckNvbmZpZygpKTtcbiAgICAgICAgfSAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgYWRkIGV4dHJhXG4gICAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgdG8gdGhlIGJvZHkncyBpbW1lZGlhdGUgY2hpbGRyZW47XG4gICAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxNC8wMi9tb3VzZV9ldmVudF9idWIuaHRtbFxuXG5cbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAkJCQxKHBhcmVudCkuY2xvc2VzdChTZWxlY3Rvci5OQVZCQVJfTkFWKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQkJDEubm9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgICAkJCQxKHRoaXMuX21lbnUpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgJCQkMShwYXJlbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKS50cmlnZ2VyKCQkJDEuRXZlbnQoRXZlbnQuU0hPV04sIHJlbGF0ZWRUYXJnZXQpKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vZmYoRVZFTlRfS0VZKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX21lbnUgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpO1xuXG4gICAgICAgICAgdGhpcy5fcG9wcGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5faW5OYXZiYXIgPSB0aGlzLl9kZXRlY3ROYXZiYXIoKTtcblxuICAgICAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fcG9wcGVyLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIFByaXZhdGVcblxuXG4gICAgICBfcHJvdG8uX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub24oRXZlbnQuQ0xJQ0ssIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICBfdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCwgJCQkMSh0aGlzLl9lbGVtZW50KS5kYXRhKCksIGNvbmZpZyk7XG4gICAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0VHlwZSk7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldE1lbnVFbGVtZW50ID0gZnVuY3Rpb24gX2dldE1lbnVFbGVtZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuX21lbnUpIHtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fbWVudSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLk1FTlUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZW51O1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRQbGFjZW1lbnQgPSBmdW5jdGlvbiBfZ2V0UGxhY2VtZW50KCkge1xuICAgICAgICB2YXIgJHBhcmVudERyb3Bkb3duID0gJCQkMSh0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUpO1xuICAgICAgICB2YXIgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5CT1RUT007IC8vIEhhbmRsZSBkcm9wdXBcblxuICAgICAgICBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QVVApKSB7XG4gICAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5UT1A7XG5cbiAgICAgICAgICBpZiAoJCQkMSh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuTUVOVVJJR0hUKSkge1xuICAgICAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5UT1BFTkQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCRwYXJlbnREcm9wZG93bi5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUFJJR0hUKSkge1xuICAgICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuUklHSFQ7XG4gICAgICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QTEVGVCkpIHtcbiAgICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLkxFRlQ7XG4gICAgICAgIH0gZWxzZSBpZiAoJCQkMSh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuTUVOVVJJR0hUKSkge1xuICAgICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuQk9UVE9NRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsYWNlbWVudDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZGV0ZWN0TmF2YmFyID0gZnVuY3Rpb24gX2RldGVjdE5hdmJhcigpIHtcbiAgICAgICAgcmV0dXJuICQkJDEodGhpcy5fZWxlbWVudCkuY2xvc2VzdCgnLm5hdmJhcicpLmxlbmd0aCA+IDA7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldFBvcHBlckNvbmZpZyA9IGZ1bmN0aW9uIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIHZhciBvZmZzZXRDb25mID0ge307XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jb25maWcub2Zmc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb2Zmc2V0Q29uZi5mbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLm9mZnNldHMgPSBfb2JqZWN0U3ByZWFkKHt9LCBkYXRhLm9mZnNldHMsIF90aGlzMi5fY29uZmlnLm9mZnNldChkYXRhLm9mZnNldHMpIHx8IHt9KTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Zmc2V0Q29uZi5vZmZzZXQgPSB0aGlzLl9jb25maWcub2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvcHBlckNvbmZpZyA9IHtcbiAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX2dldFBsYWNlbWVudCgpLFxuICAgICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXRDb25mLFxuICAgICAgICAgICAgZmxpcDoge1xuICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLl9jb25maWcuZmxpcFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSAvLyBEaXNhYmxlIFBvcHBlci5qcyBpZiB3ZSBoYXZlIGEgc3RhdGljIGRpc3BsYXlcblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuZGlzcGxheSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICBwb3BwZXJDb25maWcubW9kaWZpZXJzLmFwcGx5U3R5bGUgPSB7XG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9wcGVyQ29uZmlnO1xuICAgICAgfTsgLy8gU3RhdGljXG5cblxuICAgICAgRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIHZhciBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgPyBjb25maWcgOiBudWxsO1xuXG4gICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFxcXCJcIiArIGNvbmZpZyArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIERyb3Bkb3duLl9jbGVhck1lbnVzID0gZnVuY3Rpb24gX2NsZWFyTWVudXMoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50ICYmIChldmVudC53aGljaCA9PT0gUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQud2hpY2ggIT09IFRBQl9LRVlDT0RFKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b2dnbGVzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRvZ2dsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRvZ2dsZXNbaV0pO1xuXG4gICAgICAgICAgdmFyIGNvbnRleHQgPSAkJCQxKHRvZ2dsZXNbaV0pLmRhdGEoREFUQV9LRVkpO1xuICAgICAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogdG9nZ2xlc1tpXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICAgcmVsYXRlZFRhcmdldC5jbGlja0V2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZHJvcGRvd25NZW51ID0gY29udGV4dC5fbWVudTtcblxuICAgICAgICAgIGlmICghJCQkMShwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50ICYmIChldmVudC50eXBlID09PSAnY2xpY2snICYmIC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQud2hpY2ggPT09IFRBQl9LRVlDT0RFKSAmJiAkJCQxLmNvbnRhaW5zKHBhcmVudCwgZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGhpZGVFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuSElERSwgcmVsYXRlZFRhcmdldCk7XG4gICAgICAgICAgJCQkMShwYXJlbnQpLnRyaWdnZXIoaGlkZUV2ZW50KTtcblxuICAgICAgICAgIGlmIChoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAgICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHdlIGFkZGVkIGZvciBpT1Mgc3VwcG9ydFxuXG5cbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub2ZmKCdtb3VzZW92ZXInLCBudWxsLCAkJCQxLm5vb3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRvZ2dsZXNbaV0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgJCQkMShkcm9wZG93bk1lbnUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgICAkJCQxKHBhcmVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpLnRyaWdnZXIoJCQkMS5FdmVudChFdmVudC5ISURERU4sIHJlbGF0ZWRUYXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50ID0gZnVuY3Rpb24gX2dldFBhcmVudEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHBhcmVudDtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudCB8fCBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuXG5cbiAgICAgIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIgPSBmdW5jdGlvbiBfZGF0YUFwaUtleWRvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIC8vIElmIG5vdCBpbnB1dC90ZXh0YXJlYTpcbiAgICAgICAgLy8gIC0gQW5kIG5vdCBhIGtleSBpbiBSRUdFWFBfS0VZRE9XTiA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG4gICAgICAgIC8vIElmIGlucHV0L3RleHRhcmVhOlxuICAgICAgICAvLyAgLSBJZiBzcGFjZSBrZXkgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgICAvLyAgLSBJZiBrZXkgaXMgb3RoZXIgdGhhbiBlc2NhcGVcbiAgICAgICAgLy8gICAgLSBJZiBrZXkgaXMgbm90IHVwIG9yIGRvd24gPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgICAvLyAgICAtIElmIHRyaWdnZXIgaW5zaWRlIHRoZSBtZW51ID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgICAgaWYgKC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpID8gZXZlbnQud2hpY2ggPT09IFNQQUNFX0tFWUNPREUgfHwgZXZlbnQud2hpY2ggIT09IEVTQ0FQRV9LRVlDT0RFICYmIChldmVudC53aGljaCAhPT0gQVJST1dfRE9XTl9LRVlDT0RFICYmIGV2ZW50LndoaWNoICE9PSBBUlJPV19VUF9LRVlDT0RFIHx8ICQkJDEoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFNlbGVjdG9yLk1FTlUpLmxlbmd0aCkgOiAhUkVHRVhQX0tFWURPV04udGVzdChldmVudC53aGljaCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAkJCQxKHRoaXMpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMpO1xuXG4gICAgICAgIHZhciBpc0FjdGl2ZSA9ICQkJDEocGFyZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgaWYgKCFpc0FjdGl2ZSAmJiAoZXZlbnQud2hpY2ggIT09IEVTQ0FQRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoICE9PSBTUEFDRV9LRVlDT0RFKSB8fCBpc0FjdGl2ZSAmJiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoID09PSBTUEFDRV9LRVlDT0RFKSkge1xuICAgICAgICAgIGlmIChldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgICAgICAgIHZhciB0b2dnbGUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5EQVRBX1RPR0dMRSk7XG4gICAgICAgICAgICAkJCQxKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkJCQxKHRoaXMpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZW1zID0gW10uc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5WSVNJQkxFX0lURU1TKSk7XG5cbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmRleCA9IGl0ZW1zLmluZGV4T2YoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEFSUk9XX1VQX0tFWUNPREUgJiYgaW5kZXggPiAwKSB7XG4gICAgICAgICAgLy8gVXBcbiAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19ET1dOX0tFWUNPREUgJiYgaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gRG93blxuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXNbaW5kZXhdLmZvY3VzKCk7XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoRHJvcGRvd24sIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0XCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0VHlwZVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIERyb3Bkb3duO1xuICAgIH0oKTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICAkJCQxKGRvY3VtZW50KS5vbihFdmVudC5LRVlET1dOX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcikub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuTUVOVSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcikub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEkgKyBcIiBcIiArIEV2ZW50LktFWVVQX0RBVEFfQVBJLCBEcm9wZG93bi5fY2xlYXJNZW51cykub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZS5jYWxsKCQkJDEodGhpcyksICd0b2dnbGUnKTtcbiAgICB9KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuRk9STV9DSElMRCwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkJCQxLmZuW05BTUVdID0gRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gRHJvcGRvd247XG5cbiAgICAkJCQxLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkJCQxLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBEcm9wZG93bjtcbiAgfSgkLCBQb3BwZXIpO1xuXG4gIHJldHVybiBEcm9wZG93bjtcblxufSkpKTtcbiJdLCJmaWxlIjoicGx1Z2lucy5qcyJ9
