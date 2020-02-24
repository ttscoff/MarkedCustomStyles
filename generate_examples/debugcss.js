(function() {
  var boxvis;
  var latestInfo;
  var scrollTimeout = null;
  var scrollendDelay = 250; // ms
  var query = {};

  function readQueryString() {
    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[scripts.length - 1];
    var qs = myScript.src.replace(/^[^\?]+\??/,'');

    var vars = qs.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      query[decodeURIComponent(pair[0])] = pair.length > 1 ? decodeURIComponent(pair[1]) : true;
    }
  }

  function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn] = function(){
        obj['e' + type + fn](window.event);
      }
      obj.attachEvent('on' + type, obj[type + fn]);
    } else {
      obj.addEventListener(type, fn, false);
    }
  }
  function removeEvent(obj, type, fn) {
    if (obj.detachEvent) {
      obj.detachEvent('on' + type, obj[type + fn]);
      obj[type + fn] = null;
    } else {
      obj.removeEventListener(type, fn, false);
    }
  }

  function addStyleElement(css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  function getStyleValue(style, value) {
    return parseFloat(style[value]);
  }

  function getElementInfo(element) {
    var styles = window.getComputedStyle(element);

    return {
      element: element,
      tagName: element.tagName,
      selectors: {
        id: element.id ? "#" + element.id : "",
        className: element.className ? "." + element.className.replace(/\s/g, '.') : ""
      },
      box: element.getBoundingClientRect(),
      margin: {
        top: getStyleValue(styles, 'margin-top'),
        right: getStyleValue(styles, 'margin-right'),
        bottom: getStyleValue(styles, 'margin-bottom'),
        left: getStyleValue(styles, 'margin-left')
      },
      border: {
        top: getStyleValue(styles, 'border-top-width'),
        right: getStyleValue(styles, 'border-right-width'),
        bottom: getStyleValue(styles, 'border-bottom-width'),
        left: getStyleValue(styles, 'border-left-width')
      },
      padding: {
        top: getStyleValue(styles, 'padding-top'),
        right: getStyleValue(styles, 'padding-right'),
        bottom: getStyleValue(styles, 'padding-bottom'),
        left: getStyleValue(styles, 'padding-left')
      }
    };
  }

  function mouseHandler(e) {
    clearScrollTimer();

    var info = getElementInfo(e.target);
    latestInfo = info;
    showInfo(info);
  }
  function mouseOutHandler(e) {
    hideBoxVis();
  }

  function scrollHandler(e) {
    if (!scrollTimeout) {
      onScrollStart();
    }

    scrollTimeout = setTimeout(onScrollEnd, scrollendDelay);
  }
  function clearScrollTimer() {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
  function onScrollStart() {
    hideBoxVis();
  }
  function onScrollEnd() {
    clearScrollTimer();
    if (latestInfo) {
      latestInfo.box = latestInfo.element.getBoundingClientRect();
      showInfo(latestInfo);
    }
  }

  function hideBoxVis() {
    boxvis.tooltip.style.display = 'none';

    boxvis.margin.horizontal.removeAttribute("style");
    boxvis.margin.vertical.removeAttribute("style");
    boxvis.margin.inner.style.display = 'none';

    boxvis.border.horizontal.removeAttribute("style");
    boxvis.border.vertical.removeAttribute("style");
    boxvis.border.inner.style.display = 'none';

    boxvis.padding.horizontal.removeAttribute("style");
    boxvis.padding.vertical.removeAttribute("style");
    boxvis.padding.inner.style.display = 'none';

    boxvis.box.horizontal.removeAttribute("style");
    boxvis.box.vertical.removeAttribute("style");
    boxvis.box.inner.style.display = 'none';
  }

  function showInfo(info) {
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // tooltip
    var tagName = '<span class="t">' + info.tagName.toLowerCase() + '</span>';
    var idSelector = '<span class="i">' + info.selectors.id.toLowerCase() + '</span>';
    var classSelector = '<span class="c">' + info.selectors.className.toLowerCase() + '</span>';
    var dimensions = '<span class="d"> | ' + (Math.round(info.box.width * 100) / 100) + ' x ' + (Math.round(info.box.height * 100) / 100) + '</span>';
    var information = tagName + idSelector + classSelector + dimensions;

    boxvis.tooltip.style.display = 'block';
    boxvis.tooltip.innerHTML = information;
    var tooltipBox = boxvis.tooltip.getBoundingClientRect();

    var tooltipTop = info.box.top - 30;
    boxvis.tooltip.classList.remove('top');
    if (tooltipTop < 0) {
      boxvis.tooltip.classList.add('top');

      tooltipTop = info.box.bottom + 6;

      if (tooltipTop + 30 > windowHeight) {
        tooltipTop = 6;
      }
    }

    var tooltipLeft = info.box.left + 2;
    boxvis.tooltip.classList.remove('right');
    if (tooltipLeft < 0) {
      tooltipLeft = 2;
    } else {
      if (tooltipLeft + tooltipBox.width > windowWidth) {
        boxvis.tooltip.classList.add('right');
        tooltipLeft = windowWidth - tooltipBox.width - 2;
      }
    }

    boxvis.tooltip.style.top = tooltipTop + 'px';
    boxvis.tooltip.style.left = tooltipLeft + 'px';


    // margin
    boxvis.margin.horizontal.style.top = (info.box.top - info.margin.top) + 'px';
    boxvis.margin.horizontal.style.height = (info.box.height + info.margin.top + info.margin.bottom) + 'px';

    boxvis.margin.vertical.style.left = (info.box.left - info.margin.left) + 'px';
    boxvis.margin.vertical.style.width = (info.box.width + info.margin.left + info.margin.right) + 'px';

    boxvis.margin.inner.style.display = 'block';
    boxvis.margin.inner.style.top = (info.box.top - info.margin.top) + 'px';
    boxvis.margin.inner.style.left = (info.box.left - info.margin.left) + 'px';
    boxvis.margin.inner.style.height = (info.box.height + info.margin.top + info.margin.bottom) + 'px';
    boxvis.margin.inner.style.width = (info.box.width + info.margin.left + info.margin.right) + 'px';


    // border
    boxvis.border.horizontal.style.top = (info.box.top) + 'px';
    boxvis.border.horizontal.style.height = info.box.height + 'px';

    boxvis.border.vertical.style.left = (info.box.left) + 'px';
    boxvis.border.vertical.style.width = info.box.width + 'px';

    boxvis.border.inner.style.display = 'block';
    boxvis.border.inner.style.top = (info.box.top) + 'px';
    boxvis.border.inner.style.left = (info.box.left) + 'px';
    boxvis.border.inner.style.height = info.box.height + 'px';
    boxvis.border.inner.style.width = info.box.width + 'px';


    // padding
    boxvis.padding.horizontal.style.top = (info.box.top + info.border.top) + 'px';
    boxvis.padding.horizontal.style.height = (info.box.height - info.border.top- info.border.bottom) + 'px';

    boxvis.padding.vertical.style.left = (info.box.left + info.border.left) + 'px';
    boxvis.padding.vertical.style.width = (info.box.width - info.border.left - info.border.right) + 'px';

    boxvis.padding.inner.style.display = 'block';
    boxvis.padding.inner.style.top = (info.box.top + info.border.top) + 'px';
    boxvis.padding.inner.style.left = (info.box.left + info.border.left) + 'px';
    boxvis.padding.inner.style.height = (info.box.height - info.border.top - info.border.bottom) + 'px';
    boxvis.padding.inner.style.width = (info.box.width - info.border.left - info.border.right) + 'px';


    // box
    boxvis.box.horizontal.style.top = (info.box.top + info.border.top + info.padding.top) + 'px';
    boxvis.box.horizontal.style.height = (info.box.height - info.border.top - info.border.bottom - info.padding.top - info.padding.bottom) + 'px';

    boxvis.box.vertical.style.left = (info.box.left + info.border.left + info.padding.left) + 'px';
    boxvis.box.vertical.style.width = (info.box.width - info.border.left - info.border.right - info.padding.left - info.padding.right) + 'px';

    boxvis.box.inner.style.display = 'block';
    boxvis.box.inner.style.top = (info.box.top + info.border.top + info.padding.top) + 'px';
    boxvis.box.inner.style.left = (info.box.left + info.border.left + info.padding.left) + 'px';
    boxvis.box.inner.style.height = (info.box.height - info.border.top - info.border.bottom - info.padding.top - info.padding.bottom) + 'px';
    boxvis.box.inner.style.width = (info.box.width - info.border.left - info.border.right - info.padding.left - info.padding.right) + 'px';
  }

  function AddOutliners() {
    var styles = '.boxvis > div > div{pointer-events:none;position:fixed;z-index:2147483637;top:-10px;bottom:-10px;left:-10px;right:-10px}.boxvis:not(.noln) > div > div{border-width:1px;border-style:dashed}.boxvis > .mg > div{border-color:#e67700}.boxvis > .bd > div{border-color:#dcdc40}.boxvis > .pd > div{border-color:#00bb20}.boxvis > .bx > div{border-color:#0000e6}.boxvis > div > .o{z-index:2147483638;border:none;display:none}.boxvis:not(.nobg) > .mg > .o{background-color:rgba(255,153,0,0.125)}.boxvis:not(.nobg) > .pd > .o{background-color:rgba(0,140,64,0.125)}.boxvis:not(.nobg) > .bd > .o{background-color:rgba(255,255,0,0.125)}.boxvis:not(.nobg) > .bx > .o{background-color:rgba(0,100,255,0.35)}.boxvis > .i{box-shadow:0 0 4px -1px rgba(255,255,255,1);pointer-events:none;position:fixed;z-index:2147483638;background-color:#000;font-size:12px;padding:3px 8px 5px 10px;border-radius:4px;white-space:nowrap;display:none}.boxvis > .i:before{content:"";position:absolute;top:100%;left:10px;border:solid 6px transparent;border-top-color:#000}.boxvis > .i.top:before{top:-12px;border:solid 6px transparent;border-top-color:transparent;border-bottom-color:#000}.boxvis > .i.right:before{left:auto;right:10px}.boxvis > .i > .t{color:#FF74FF;font-weight:700}.boxvis > .i > .i{color:#FFB952}.boxvis > .i > .c{color:#75CFFF}.boxvis > .i > .d{font-size:10px;margin-left:3px;color:#CCC}';
    addStyleElement(styles);

    var html = '<div class="mg"><div class="h"></div><div class="v"></div><div class="o"></div></div><div class="bd"><div class="h"></div><div class="v"></div><div class="o"></div></div><div class="pd"><div class="h"></div><div class="v"></div><div class="o"></div></div><div class="bx"><div class="h"></div><div class="v"></div><div class="o"></div></div><div class="i"></div>';

    var outlinerContainer = document.createElement('div');
    outlinerContainer.className = 'boxvis' + (query.noln ? ' noln' : '') + (query.nobg ? ' nobg' : '');
    document.body.appendChild(outlinerContainer);

    outlinerContainer.innerHTML = html;
    var addedElements = outlinerContainer.childNodes;
    boxvis = {
      margin: {
        horizontal: addedElements[0].childNodes[0],
        vertical: addedElements[0].childNodes[1],
        inner: addedElements[0].childNodes[2]
      },
      border: {
        horizontal: addedElements[1].childNodes[0],
        vertical: addedElements[1].childNodes[1],
        inner: addedElements[1].childNodes[2]
      },
      padding: {
        horizontal: addedElements[2].childNodes[0],
        vertical: addedElements[2].childNodes[1],
        inner: addedElements[2].childNodes[2]
      },
      box: {
        horizontal: addedElements[3].childNodes[0],
        vertical: addedElements[3].childNodes[1],
        inner: addedElements[3].childNodes[2]
      },
      tooltip: addedElements[4]
    };
  }

  //TODO: keyboard commands (arrow keys move from element to element)
  //  up: parent, down: first child
  //  left, right: siblings

  //TODO: Figure out how to support :before and :after pseudo elements
  // currently seems to think the mouseover is on the element, and not its :before / :after
  //  I can check if the mouse position is or is not within the element, but sometimes, the pseudo is within the element.

  readQueryString();
  AddOutliners();
  addEvent(document.body, 'mouseover', mouseHandler);
  addEvent(window, 'scroll', scrollHandler);
  addEvent(document.body, 'mouseout', mouseOutHandler);
}());
