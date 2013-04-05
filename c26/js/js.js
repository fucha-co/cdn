/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-tooltip.js, bootstrap-popover.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f,g,h,i;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,g=this.options.trigger.split(" ");for(i=g.length;i--;)h=g[i],h=="click"?this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this)):h!="manual"&&(e=h=="hover"?"mouseenter":"focus",f=h=="hover"?"mouseleave":"blur",this.$element.on(e+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f+"."+this.type,this.options.selector,a.proxy(this.leave,this)));this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,this.$element.data(),b),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a.fn[this.type].defaults,d={},e;this._options&&a.each(this._options,function(a,b){c[a]!=b&&(d[a]=b)},this),e=a(b.currentTarget)[this.type](d).data(this.type);if(!e.options.delay||!e.options.delay.show)return e.show();clearTimeout(this.timeout),e.hoverState="in",this.timeout=setTimeout(function(){e.hoverState=="in"&&e.show()},e.options.delay.show)},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!c.options.delay||!c.options.delay.hide)return c.hide();c.hoverState="out",this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var b,c,d,e,f,g,h=a.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(h);if(h.isDefaultPrevented())return;b=this.tip(),this.setContent(),this.options.animation&&b.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,b[0],this.$element[0]):this.options.placement,b.detach().css({top:0,left:0,display:"block"}),this.options.container?b.appendTo(this.options.container):b.insertAfter(this.$element),c=this.getPosition(),d=b[0].offsetWidth,e=b[0].offsetHeight;switch(f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}this.applyPlacement(g,f),this.$element.trigger("shown")}},applyPlacement:function(a,b){var c=this.tip(),d=c[0].offsetWidth,e=c[0].offsetHeight,f,g,h,i;c.offset(a).addClass(b).addClass("in"),f=c[0].offsetWidth,g=c[0].offsetHeight,b=="top"&&g!=e&&(a.top=a.top+e-g,i=!0),b=="bottom"||b=="top"?(h=0,a.left<0&&(h=a.left*-2,a.left=0,c.offset(a),f=c[0].offsetWidth,g=c[0].offsetHeight),this.replaceArrow(h-d+f,f,"left")):this.replaceArrow(g-e,g,"top"),i&&c.offset(a)},replaceArrow:function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function e(){var b=setTimeout(function(){c.off(a.support.transition.end).detach()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.detach()})}var b=this,c=this.tip(),d=a.Event("hide");this.$element.trigger(d);if(d.isDefaultPrevented())return;return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?e():c.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var b=this.$element[0];return a.extend({},typeof b.getBoundingClientRect=="function"?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(b){var c=b?a(b.currentTarget)[this.type](this._options).data(this.type):this;c.tip().hasClass("in")?c.hide():c.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),!function(a){var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=(typeof c.content=="function"?c.content.call(b[0]):c.content)||b.attr("data-content"),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery)
/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-tooltip.js, bootstrap-popover.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f,g,h,i;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,g=this.options.trigger.split(" ");for(i=g.length;i--;)h=g[i],h=="click"?this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this)):h!="manual"&&(e=h=="hover"?"mouseenter":"focus",f=h=="hover"?"mouseleave":"blur",this.$element.on(e+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f+"."+this.type,this.options.selector,a.proxy(this.leave,this)));this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,this.$element.data(),b),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a.fn[this.type].defaults,d={},e;this._options&&a.each(this._options,function(a,b){c[a]!=b&&(d[a]=b)},this),e=a(b.currentTarget)[this.type](d).data(this.type);if(!e.options.delay||!e.options.delay.show)return e.show();clearTimeout(this.timeout),e.hoverState="in",this.timeout=setTimeout(function(){e.hoverState=="in"&&e.show()},e.options.delay.show)},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!c.options.delay||!c.options.delay.hide)return c.hide();c.hoverState="out",this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var b,c,d,e,f,g,h=a.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(h);if(h.isDefaultPrevented())return;b=this.tip(),this.setContent(),this.options.animation&&b.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,b[0],this.$element[0]):this.options.placement,b.detach().css({top:0,left:0,display:"block"}),this.options.container?b.appendTo(this.options.container):b.insertAfter(this.$element),c=this.getPosition(),d=b[0].offsetWidth,e=b[0].offsetHeight;switch(f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}this.applyPlacement(g,f),this.$element.trigger("shown")}},applyPlacement:function(a,b){var c=this.tip(),d=c[0].offsetWidth,e=c[0].offsetHeight,f,g,h,i;c.offset(a).addClass(b).addClass("in"),f=c[0].offsetWidth,g=c[0].offsetHeight,b=="top"&&g!=e&&(a.top=a.top+e-g,i=!0),b=="bottom"||b=="top"?(h=0,a.left<0&&(h=a.left*-2,a.left=0,c.offset(a),f=c[0].offsetWidth,g=c[0].offsetHeight),this.replaceArrow(h-d+f,f,"left")):this.replaceArrow(g-e,g,"top"),i&&c.offset(a)},replaceArrow:function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function e(){var b=setTimeout(function(){c.off(a.support.transition.end).detach()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.detach()})}var b=this,c=this.tip(),d=a.Event("hide");this.$element.trigger(d);if(d.isDefaultPrevented())return;return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?e():c.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var b=this.$element[0];return a.extend({},typeof b.getBoundingClientRect=="function"?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(b){var c=b?a(b.currentTarget)[this.type](this._options).data(this.type):this;c.tip().hasClass("in")?c.hide():c.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),!function(a){var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=(typeof c.content=="function"?c.content.call(b[0]):c.content)||b.attr("data-content"),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery)


/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
    $.fn.superfish = function(op){

        var sf = $.fn.superfish,
            c = sf.c,
            $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
            over = function(){
                var $$ = $(this), menu = getMenu($$);
                clearTimeout(menu.sfTimer);
                $$.showSuperfishUl().siblings().hideSuperfishUl();
            },
            out = function(){
                var $$ = $(this), menu = getMenu($$), o = sf.op;
                clearTimeout(menu.sfTimer);
                menu.sfTimer=setTimeout(function(){
                    o.retainPath=($.inArray($$[0],o.$path)>-1);
                    $$.hideSuperfishUl();
                    if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
                },o.delay);
            },
            getMenu = function($menu){
                var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
                sf.op = sf.o[menu.serial];
                return menu;
            },
            addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

        return this.each(function() {
            var s = this.serial = sf.o.length;
            var o = $.extend({},sf.defaults,op);
            o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
                $(this).addClass([o.hoverClass,c.bcClass].join(' '))
                    .filter('li:has(ul)').removeClass(o.pathClass);
            });
            sf.o[s] = sf.op = o;

            $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
                if (o.autoArrows) addArrow( $('>a:first-child',this) );
            })
            .not('.'+c.bcClass)
                .hideSuperfishUl();

            var $a = $('a',this);
            $a.each(function(i){
                var $li = $a.eq(i).parents('li');
                $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
            });
            o.onInit.call(this);

        }).each(function() {
            var menuClasses = [c.menuClass];
            if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
            $(this).addClass(menuClasses.join(' '));
        });
    };

    var sf = $.fn.superfish;
    sf.o = [];
    sf.op = {};
    sf.IE7fix = function(){
        var o = sf.op;
        if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
            this.toggleClass(sf.c.shadowClass+'-off');
        };
    sf.c = {
        bcClass     : 'sf-breadcrumb',
        menuClass   : 'sf-js-enabled',
        anchorClass : 'sf-with-ul',
        arrowClass  : 'sf-sub-indicator',
        shadowClass : 'sf-shadow'
    };
    sf.defaults = {
        hoverClass  : 'sfHover',
        pathClass   : 'overideThisToUse',
        pathLevels  : 1,
        delay       : 800,
        animation   : {opacity:'show'},
        speed       : 'normal',
        autoArrows  : true,
        dropShadows : true,
        disableHI   : false,        // true disables hoverIntent detection
        onInit      : function(){}, // callback functions
        onBeforeShow: function(){},
        onShow      : function(){},
        onHide      : function(){}
    };
    $.fn.extend({
        hideSuperfishUl : function(){
            var o = sf.op,
                not = (o.retainPath===true) ? o.$path : '';
            o.retainPath = false;
            var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
                    .find('>ul').hide().css('visibility','hidden');
            o.onHide.call($ul);
            return this;
        },
        showSuperfishUl : function(){
            var o = sf.op,
                sh = sf.c.shadowClass+'-off',
                $ul = this.addClass(o.hoverClass)
                    .find('>ul:hidden').css('visibility','visible');
            sf.IE7fix.call($ul);
            o.onBeforeShow.call($ul);
            $ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
            return this;
        }
    });

})(jQuery);


/*
 * jQuery FlexSlider v2.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;  (function(d){d.flexslider=function(i,k){var a=d(i),c=d.extend({},d.flexslider.defaults,k),e=c.namespace,r="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,s=r?"touchend":"click",l="vertical"===c.direction,m=c.reverse,h=0<c.itemWidth,q="fade"===c.animation,p=""!==c.asNavFor,f={};d.data(i,"flexslider",a);f={init:function(){a.animating=!1;a.currentSlide=c.startAt;a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=c.selector.substr(0,
 c.selector.search(" "));a.slides=d(c.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(c.sync).length;"slide"===c.animation&&(c.animation="swing");a.prop=l?"top":"marginLeft";a.args={};a.manualPause=!1;var b=a,g;if(g=!c.video)if(g=!q)if(g=c.useCSS)a:{g=document.createElement("div");var n=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in n)if(void 0!==g.style[n[e]]){a.pfx=n[e].replace("Perspective","").toLowerCase();
 a.prop="-"+a.pfx+"-transform";g=!0;break a}g=!1}b.transitions=g;""!==c.controlsContainer&&(a.controlsContainer=0<d(c.controlsContainer).length&&d(c.controlsContainer));""!==c.manualControls&&(a.manualControls=0<d(c.manualControls).length&&d(c.manualControls));c.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();p&&f.asNav.setup();a.setup("init");c.controlNav&&f.controlNav.setup();c.directionNav&&f.directionNav.setup();c.keyboard&&
 (1===d(a.containerSelector).length||c.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;if(!a.animating&&(b===39||b===37)){b=b===39?a.getTarget("next"):b===37?a.getTarget("prev"):false;a.flexAnimate(b,c.pauseOnAction)}});c.mousewheel&&a.bind("mousewheel",function(b,g){b.preventDefault();var d=g<0?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(d,c.pauseOnAction)});c.pausePlay&&f.pausePlay.setup();c.slideshow&&(c.pauseOnHover&&a.hover(function(){!a.manualPlay&&!a.manualPause&&
 a.pause()},function(){!a.manualPause&&!a.manualPlay&&a.play()}),0<c.initDelay?setTimeout(a.play,c.initDelay):a.play());r&&c.touch&&f.touch();(!q||q&&c.smoothHeight)&&d(window).bind("resize focus",f.resize);setTimeout(function(){c.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");a.slides.click(function(b){b.preventDefault();var b=d(this),
 g=b.index();!d(c.asNavFor).data("flexslider").animating&&!b.hasClass("active")&&(a.direction=a.currentItem<g?"next":"prev",a.flexAnimate(g,c.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var b=1,g;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===c.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var n=0;n<a.pagingCount;n++)g="thumbnails"===
 c.controlNav?'<img src="'+a.slides.eq(n).attr("data-thumb")+'"/>':"<a>"+b+"</a>",a.controlNavScaffold.append("<li>"+g+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold);f.controlNav.set();f.controlNav.active();a.controlNavScaffold.delegate("a, img",s,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(a.direction=g>a.currentSlide?"next":"prev",a.flexAnimate(g,c.pauseOnAction))});r&&a.controlNavScaffold.delegate("a",
 "click touchstart",function(a){a.preventDefault()})},setupManual:function(){a.controlNav=a.manualControls;f.controlNav.active();a.controlNav.live(s,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(g>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(g,c.pauseOnAction))});r&&a.controlNav.live("click touchstart",function(a){a.preventDefault()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===c.controlNav?"img":"a"),
 a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,c){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(c).closest("li").remove();f.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(c,b):f.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+
 e+'direction-nav"><li><a class="'+e+'prev" href="#">'+c.prevText+'</a></li><li><a class="'+e+'next" href="#">'+c.nextText+"</a></li></ul>");a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));f.directionNav.update();a.directionNav.bind(s,function(b){b.preventDefault();b=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,c.pauseOnAction)});
 r&&a.directionNav.bind("click touchstart",function(a){a.preventDefault()})},update:function(){var b=e+"disabled";1===a.pagingCount?a.directionNav.addClass(b):c.animationLoop?a.directionNav.removeClass(b):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b):a.directionNav.removeClass(b)}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
 (a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));f.pausePlay.update(c.slideshow?e+"pause":e+"play");a.pausePlay.bind(s,function(b){b.preventDefault();if(d(this).hasClass(e+"pause")){a.manualPause=true;a.manualPlay=false;a.pause()}else{a.manualPause=false;a.manualPlay=true;a.play()}});r&&a.pausePlay.bind("click touchstart",function(a){a.preventDefault()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+
 "pause").addClass(e+"play").text(c.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").text(c.pauseText)}},touch:function(){function b(b){j=l?d-b.touches[0].pageY:d-b.touches[0].pageX;p=l?Math.abs(j)<Math.abs(b.touches[0].pageX-e):Math.abs(j)<Math.abs(b.touches[0].pageY-e);if(!p||500<Number(new Date)-k)b.preventDefault(),!q&&a.transitions&&(c.animationLoop||(j/=0===a.currentSlide&&0>j||a.currentSlide===a.last&&0<j?Math.abs(j)/o+2:1),a.setProps(f+j,"setTouch"))}function g(){if(a.animatingTo===
 a.currentSlide&&!p&&null!==j){var h=m?-j:j,l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-k&&50<Math.abs(h)||Math.abs(h)>o/2)?a.flexAnimate(l,c.pauseOnAction):a.flexAnimate(a.currentSlide,c.pauseOnAction,!0)}i.removeEventListener("touchmove",b,!1);i.removeEventListener("touchend",g,!1);f=j=e=d=null}var d,e,f,o,j,k,p=!1;i.addEventListener("touchstart",function(j){a.animating?j.preventDefault():1===j.touches.length&&(a.pause(),o=l?a.h:a.w,k=Number(new Date),f=h&&
 m&&a.animatingTo===a.last?0:h&&m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+c.itemMargin)*a.move*a.currentSlide:m?(a.last-a.currentSlide+a.cloneOffset)*o:(a.currentSlide+a.cloneOffset)*o,d=l?j.touches[0].pageY:j.touches[0].pageX,e=l?j.touches[0].pageX:j.touches[0].pageY,i.addEventListener("touchmove",b,!1),i.addEventListener("touchend",g,!1))},!1)},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),q?f.smoothHeight():h?(a.slides.width(a.computedW),
 a.update(a.pagingCount),a.setProps()):l?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(c.smoothHeight&&f.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!l||q){var c=q?a:a.viewport;b?c.animate({height:a.slides.eq(a.animatingTo).height()},b):c.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var g=d(c.sync).data("flexslider"),e=a.animatingTo;switch(b){case "animate":g.flexAnimate(e,c.pauseOnAction,!1,!0);break;case "play":!g.playing&&
 !g.asNav&&g.play();break;case "pause":g.pause()}}};a.flexAnimate=function(b,g,n,i,k){p&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,k)||n)&&a.is(":visible")){if(p&&i)if(n=d(c.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,n.flexAnimate(b,!0,!1,!0,k),a.direction=a.currentItem<b?"next":"prev",n.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+
 "active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;c.before(a);g&&a.pause();a.syncExists&&!k&&f.sync("animate");c.controlNav&&f.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;c.directionNav&&f.directionNav.update();b===a.last&&(c.end(a),c.animationLoop||a.pause());if(q)a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed,
 c.easing),a.slides.eq(b).fadeIn(c.animationSpeed,c.easing,a.wrapup);else{var o=l?a.slides.filter(":first").height():a.computedW;h?(b=c.itemWidth>a.w?2*c.itemMargin:c.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&c.animationLoop&&"next"!==a.direction?m?(a.count+a.cloneOffset)*o:0:a.currentSlide===a.last&&0===b&&c.animationLoop&&"prev"!==a.direction?m?0:(a.count+1)*o:m?(a.count-1-b+a.cloneOffset)*o:(b+a.cloneOffset)*o;a.setProps(b,
 "",c.animationSpeed);if(a.transitions){if(!c.animationLoop||!a.atEnd)a.animating=!1,a.currentSlide=a.animatingTo;a.container.unbind("webkitTransitionEnd transitionend");a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(o)})}else a.container.animate(a.args,c.animationSpeed,c.easing,function(){a.wrapup(o)})}c.smoothHeight&&f.smoothHeight(c.animationSpeed)}};a.wrapup=function(b){!q&&!h&&(0===a.currentSlide&&a.animatingTo===a.last&&c.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===
 a.last&&(0===a.animatingTo&&c.animationLoop)&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;c.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.playing=!1;c.pausePlay&&f.pausePlay.update("play");a.syncExists&&f.sync("pause")};a.play=function(){a.animatedSlides=setInterval(a.animateSlides,c.slideshowSpeed);a.playing=!0;c.pausePlay&&f.pausePlay.update("pause");a.syncExists&&f.sync("play")};
 a.canAdvance=function(b,g){var d=p?a.pagingCount-1:a.last;return g?!0:p&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:p&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b===a.currentSlide&&!p?!1:c.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===d&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===d&&0===b&&"next"===a.direction?!1:!0};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-
 1};a.setProps=function(b,g,d){var e,f=b?b:(a.itemW+c.itemMargin)*a.move*a.animatingTo;e=-1*function(){if(h)return"setTouch"===g?b:m&&a.animatingTo===a.last?0:m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:f;switch(g){case "setTotal":return m?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return m?b:a.count*b;case "jumpStart":return m?a.count*b:b;default:return b}}()+"px";a.transitions&&(e=l?
 "translate3d(0,"+e+",0)":"translate3d("+e+",0,0)",d=void 0!==d?d/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",d));a.args[a.prop]=e;(a.transitions||void 0===d)&&a.container.css(a.args)};a.setup=function(b){if(q)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed,c.easing),c.smoothHeight&&f.smoothHeight();else{var g,n;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",
 position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,m&&(n=d.makeArray(a.slides).reverse(),a.slides=d(n),a.container.empty().append(a.slides)));c.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));a.newSlides=d(c.selector,a);g=m?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;l&&!h?(a.container.height(200*
 (a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(g*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(g*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,"float":"left",display:"block"});c.smoothHeight&&f.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+
 "active-slide")};a.doMath=function(){var b=a.slides.first(),d=c.itemMargin,e=c.minItems,f=c.maxItems;a.w=a.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=c.itemWidth+d,a.minW=e?e*a.itemT:a.w,a.maxW=f?f*a.itemT:a.w,a.itemW=a.minW>a.w?(a.w-d*e)/e:a.maxW<a.w?(a.w-d*f)/f:c.itemWidth>a.w?a.w:c.itemWidth,a.visible=Math.floor(a.w/(a.itemW+d)),a.move=0<c.move&&c.move<a.visible?c.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===
 a.pagingCount?0:c.itemWidth>a.w?(a.itemW+2*d)*a.count-a.w-d:(a.itemW+d)*a.count-a.w-d):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(c.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)f.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>
 a.last&&(a.currentSlide-=1,a.animatingTo-=1),f.controlNav.update("remove",a.last);c.directionNav&&f.directionNav.update()};a.addSlide=function(b,e){var f=d(b);a.count+=1;a.last=a.count-1;l&&m?void 0!==e?a.slides.eq(a.count-e).after(f):a.container.prepend(f):void 0!==e?a.slides.eq(e).before(f):a.container.append(f);a.update(e,"add");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.added(a)};a.removeSlide=function(b){var e=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,
 a.slides).remove():l&&m?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(e,"remove");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.removed(a)};f.init()};d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,
 directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};d.fn.flexslider=function(i){void 0===i&&(i={});if("object"===typeof i)return this.each(function(){var a=d(this),c=a.find(i.selector?
 i.selector:".slides > li");1===c.length?(c.fadeIn(400),i.start&&i.start(a)):void 0===a.data("flexslider")&&new d.flexslider(this,i)});var k=d(this).data("flexslider");switch(i){case "play":k.play();break;case "pause":k.pause();break;case "next":k.flexAnimate(k.getTarget("next"),!0);break;case "prev":case "previous":k.flexAnimate(k.getTarget("prev"),!0);break;default:"number"===typeof i&&k.flexAnimate(i,!0)}}})(jQuery);

 /*global jQuery */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    }

    var div = document.createElement('style'),
        ref = document.getElementsByTagName('head')[0];

    div.innerHTML = '                     \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    ';

    ref.appendChild(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(',')).not('object[name*="player"]');


      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() == 'object' || $this.attr('height') ) ? $this.attr('height') : $this.height(),
            width = $this.attr('width') ? $this.attr('width') : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });

  }
})( jQuery );

/* equalheights JS */
$.fn.equalHeights = function(px) {
    $(this).each(function(){
        var currentTallest = 0;
        $(this).children().each(function(i){
            if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
        });
        $(this).children().css({'min-height': currentTallest});
    });
    return this;
};

/** @license Hyphenator 4.0.0 - client side hyphenation for webbrowsers
 *  Copyright (C) 2011  Mathias Nater, Zürich (mathias at mnn dot ch)
 *  Project and Source hosted on http://code.google.com/p/hyphenator/
 *
 *  This JavaScript code is free software: you can redistribute
 *  it and/or modify it under the terms of the GNU Lesser
 *  General Public License (GNU LGPL) as published by the Free Software
 *  Foundation, either version 3 of the License, or (at your option)
 *  any later version.  The code is distributed WITHOUT ANY WARRANTY;
 *  without even the implied warranty of MERCHANTABILITY or FITNESS
 *  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 *  As additional permission under GNU GPL version 3 section 7, you
 *  may distribute non-source (e.g., minimized or compacted) forms of
 *  that code without the copy of the GNU GPL normally required by
 *  section 4, provided you include this license notice and a URL
 *  through which recipients can access the Corresponding Source.
 *
 *
 *  Hyphenator.js contains code from Bram Steins hypher.js-Project:
 *  https://github.com/bramstein/Hypher
 *
 *  Code from this project is marked in the source and belongs
 *  to the following license:
 *
 *  Copyright (c) 2011, Bram Stein
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions
 *  are met:
 *
 *   1. Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *   2. Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *   3. The name of the author may not be used to endorse or promote products
 *      derived from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
 *  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 *  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 *  EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 *  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 *  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 *  OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 *  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/*
 *  Comments are jsdoctoolkit formatted. See http://code.google.com/p/jsdoc-toolkit/
 */

/* The following comment is for JSLint: */
/*global window, ActiveXObject, unescape */
/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, regexp: true, sub: true, newcap: true, immed: true, evil: true, eqeqeq: false */


/**
 * @constructor
 * @description Provides all functionality to do hyphenation, except the patterns that are loaded
 * externally.
 * @author Mathias Nater, <a href = "mailto:mathias@mnn.ch">mathias@mnn.ch</a>
 * @version X.Y.Z
 * @namespace Holds all methods and properties
 * @example
 * &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
 * &lt;script type = "text/javascript"&gt;
 *   Hyphenator.run();
 * &lt;/script&gt;
 */
var Hyphenator = (function (window) {

    var
    /**
     * @name Hyphenator-supportedLang
     * @description
     * A key-value object that stores supported languages.
     * The key is the bcp47 code of the language and the value
     * is the (abbreviated) filename of the pattern file.
     * @type {Object.<string, string>}
     * @private
     * @example
     * Check if language lang is supported:
     * if (supportedLang.hasOwnProperty(lang))
     */
    supportedLang = {
        'be': 'be.js',
        'ca': 'ca.js',
        'cs': 'cs.js',
        'da': 'da.js',
        'bn': 'bn.js',
        'de': 'de.js',
        'el': 'el-monoton.js',
        'el-monoton': 'el-monoton.js',
        'el-polyton': 'el-polyton.js',
        'en': 'en-us.js',
        'en-gb': 'en-gb.js',
        'en-us': 'en-us.js',
        'es': 'es.js',
        'fi': 'fi.js',
        'fr': 'fr.js',
        'grc': 'grc.js',
        'gu': 'gu.js',
        'hi': 'hi.js',
        'hu': 'hu.js',
        'hy': 'hy.js',
        'it': 'it.js',
        'kn': 'kn.js',
        'la': 'la.js',
        'lt': 'lt.js',
        'lv': 'lv.js',
        'ml': 'ml.js',
        'nb': 'nb-no.js',
        'no': 'nb-no.js',
        'nb-no': 'nb-no.js',
        'nl': 'nl.js',
        'or': 'or.js',
        'pa': 'pa.js',
        'pl': 'pl.js',
        'pt': 'pt.js',
        'ru': 'ru.js',
        'sk': 'sk.js',
        'sl': 'sl.js',
        'sv': 'sv.js',
        'ta': 'ta.js',
        'te': 'te.js',
        'tr': 'tr.js',
        'uk': 'uk.js'
    },

    /**
     * @name Hyphenator-languageHint
     * @description
     * An automatically generated string to be displayed in a prompt if the language can't be guessed.
     * The string is generated using the supportedLang-object.
     * @see Hyphenator-supportedLang
     * @type {string}
     * @private
     * @see Hyphenator-autoSetMainLanguage
     */

    languageHint = (function () {
        var k, r = '';
        for (k in supportedLang) {
            if (supportedLang.hasOwnProperty(k)) {
                r += k + ', ';
            }
        }
        r = r.substring(0, r.length - 2);
        return r;
    }()),

    /**
     * @name Hyphenator-prompterStrings
     * @description
     * A key-value object holding the strings to be displayed if the language can't be guessed
     * If you add hyphenation patterns change this string.
     * @type {Object.<string,string>}
     * @private
     * @see Hyphenator-autoSetMainLanguage
     */
    prompterStrings = {
        'be': 'Мова гэтага сайта не можа быць вызначаны аўтаматычна. Калі ласка пакажыце мову:',
        'cs': 'Jazyk této internetové stránky nebyl automaticky rozpoznán. Určete prosím její jazyk:',
        'da': 'Denne websides sprog kunne ikke bestemmes. Angiv venligst sprog:',
        'de': 'Die Sprache dieser Webseite konnte nicht automatisch bestimmt werden. Bitte Sprache angeben:',
        'en': 'The language of this website could not be determined automatically. Please indicate the main language:',
        'es': 'El idioma del sitio no pudo determinarse autom%E1ticamente. Por favor, indique el idioma principal:',
        'fi': 'Sivun kielt%E4 ei tunnistettu automaattisesti. M%E4%E4rit%E4 sivun p%E4%E4kieli:',
        'fr': 'La langue de ce site n%u2019a pas pu %EAtre d%E9termin%E9e automatiquement. Veuillez indiquer une langue, s.v.p.%A0:',
        'hu': 'A weboldal nyelvét nem sikerült automatikusan megállapítani. Kérem adja meg a nyelvet:',
        'hy': 'Չհաջողվեց հայտնաբերել այս կայքի լեզուն։ Խնդրում ենք նշեք հիմնական լեզուն՝',
        'it': 'Lingua del sito sconosciuta. Indicare una lingua, per favore:',
        'kn': 'ಜಾಲ ತಾಣದ ಭಾಷೆಯನ್ನು ನಿರ್ಧರಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮುಖ್ಯ ಭಾಷೆಯನ್ನು ಸೂಚಿಸಿ:',
        'lt': 'Nepavyko automatiškai nustatyti šios svetainės kalbos. Prašome įvesti kalbą:',
        'lv': 'Šīs lapas valodu nevarēja noteikt automātiski. Lūdzu norādiet pamata valodu:',
        'ml': 'ഈ വെ%u0D2C%u0D4D%u200Cസൈറ്റിന്റെ ഭാഷ കണ്ടുപിടിയ്ക്കാ%u0D28%u0D4D%u200D കഴിഞ്ഞില്ല. ഭാഷ ഏതാണെന്നു തിരഞ്ഞെടുക്കുക:',
        'nl': 'De taal van deze website kan niet automatisch worden bepaald. Geef de hoofdtaal op:',
        'no': 'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:',
        'pt': 'A língua deste site não pôde ser determinada automaticamente. Por favor indique a língua principal:',
        'ru': 'Язык этого сайта не может быть определен автоматически. Пожалуйста укажите язык:',
        'sl': 'Jezika te spletne strani ni bilo mogoče samodejno določiti. Prosim navedite jezik:',
        'sv': 'Spr%E5ket p%E5 den h%E4r webbplatsen kunde inte avg%F6ras automatiskt. V%E4nligen ange:',
        'tr': 'Bu web sitesinin dili otomatik olarak tespit edilememiştir. Lütfen dökümanın dilini seçiniz%A0:',
        'uk': 'Мова цього веб-сайту не може бути визначена автоматично. Будь ласка, вкажіть головну мову:'
    },

    /**
     * @name Hyphenator-basePath
     * @description
     * A string storing the basepath from where Hyphenator.js was loaded.
     * This is used to load the patternfiles.
     * The basepath is determined dynamically by searching all script-tags for Hyphenator.js
     * If the path cannot be determined http://hyphenator.googlecode.com/svn/trunk/ is used as fallback.
     * @type {string}
     * @private
     * @see Hyphenator-loadPatterns
     */
    basePath = (function () {
        var s = document.getElementsByTagName('script'), i = 0, p, src, t;
        while (!!(t = s[i++])) {
            if (!t.src) {
                continue;
            }
            src = t.src;
            p = src.indexOf('Hyphenator.js');
            if (p !== -1) {
                return src.substring(0, p);
            }
        }
        return 'http://hyphenator.googlecode.com/svn/trunk/';
    }()),

    /**
     * @name Hyphenator-isLocal
     * @description
     * isLocal is true, if Hyphenator is loaded from the same domain, as the webpage, but false, if
     * it's loaded from an external source (i.e. directly from google.code)
     */
    isLocal = (function () {
        var re = false;
        if (window.location.href.indexOf(basePath) !== -1) {
            re = true;
        }
        return re;
    }()),

    /**
     * @name Hyphenator-documentLoaded
     * @description
     * documentLoaded is true, when the DOM has been loaded. This is set by runOnContentLoaded
     */
    documentLoaded = false,
    documentCount = 0,

    /**
     * @name Hyphenator-persistentConfig
     * @description
     * if persistentConfig is set to true (defaults to false), config options and the state of the
     * toggleBox are stored in DOM-storage (according to the storage-setting). So they haven't to be
     * set for each page.
     */
    persistentConfig = false,

    /**
     * @name Hyphenator-contextWindow
     * @description
     * contextWindow stores the window for the document to be hyphenated.
     * If there are frames this will change.
     * So use contextWindow instead of window!
     */
    contextWindow = window,

    /**
     * @name Hyphenator-doFrames
     * @description
     * switch to control if frames/iframes should be hyphenated, too
     * defaults to false (frames are a bag of hurt!)
     */
    doFrames = false,

    /**
     * @name Hyphenator-dontHyphenate
     * @description
     * A key-value object containing all html-tags whose content should not be hyphenated
     * @type {Object.<string,boolean>}
     * @private
     * @see Hyphenator-hyphenateElement
     */
    dontHyphenate = {'script': true, 'code': true, 'pre': true, 'img': true, 'br': true, 'samp': true, 'kbd': true, 'var': true, 'abbr': true, 'acronym': true, 'sub': true, 'sup': true, 'button': true, 'option': true, 'label': true, 'textarea': true, 'input': true, 'math': true, 'svg': true},

    /**
     * @name Hyphenator-enableCache
     * @description
     * A variable to set if caching is enabled or not
     * @type boolean
     * @default true
     * @private
     * @see Hyphenator.config
     * @see hyphenateWord
     */
    enableCache = true,

    /**
     * @name Hyphenator-storageType
     * @description
     * A variable to define what html5-DOM-Storage-Method is used ('none', 'local' or 'session')
     * @type {string}
     * @default 'none'
     * @private
     * @see Hyphenator.config
     */
    storageType = 'local',

    /**
     * @name Hyphenator-storage
     * @description
     * An alias to the storage-Method defined in storageType.
     * Set by Hyphenator.run()
     * @type {Object|undefined}
     * @default null
     * @private
     * @see Hyphenator.run
     */
    storage,

    /**
     * @name Hyphenator-enableReducedPatternSet
     * @description
     * A variable to set if storing the used patterns is set
     * @type boolean
     * @default false
     * @private
     * @see Hyphenator.config
     * @see hyphenateWord
     * @see Hyphenator.getRedPatternSet
     */
    enableReducedPatternSet = false,

    /**
     * @name Hyphenator-enableRemoteLoading
     * @description
     * A variable to set if pattern files should be loaded remotely or not
     * @type boolean
     * @default true
     * @private
     * @see Hyphenator.config
     * @see Hyphenator-loadPatterns
     */
    enableRemoteLoading = true,

    /**
     * @name Hyphenator-displayToggleBox
     * @description
     * A variable to set if the togglebox should be displayed or not
     * @type boolean
     * @default false
     * @private
     * @see Hyphenator.config
     * @see Hyphenator-toggleBox
     */
    displayToggleBox = false,

    /**
     * @name Hyphenator-css3
     * @description
     * A variable to set if css3 hyphenation should be used
     * @type boolean
     * @default false
     * @private
     * @see Hyphenator.config
     */
    css3 = false,
    /**
     * @name Hyphenator-css3_hsupport
     * @description
     * A generated object containing information for CSS3-hyphenation support
     * {
     *   support: boolean,
     *   property: <the property name to access hyphen-settings>,
     *   languages: <an object containing supported languages>
     * }
     * @type object
     * @default undefined
     * @private
     * @see Hyphenator-css3_gethsupport
     */
    css3_h9n,
    /**
     * @name Hyphenator-css3_gethsupport
     * @description
     * This function sets Hyphenator-css3_h9n for the current UA
     * @type function
     * @private
     * @see Hyphenator-css3_h9n
     */
    css3_gethsupport = function () {
        var s,
        ua = navigator.userAgent,
        r = {
            support: false,
            property: '',
            languages: {}
        };
        if (window.getComputedStyle) {
            s = window.getComputedStyle(window.document.getElementsByTagName('body')[0]);
        } else {
            //ancient Browser don't support CSS3 anyway
            css3_h9n = r;
            return;
        }
        if (ua.indexOf('Chrome') !== -1) {
            //Chrome actually knows -webkit-hyphens but does no hyphenation
            r.support = false;
        } else if ((ua.indexOf('Safari') !== -1) && (s['-webkit-hyphens'] !== undefined)) {
            r.support = true;
            r.property = '-webkit-hyphens';
            if (ua.indexOf('Mobile') !== -1) {
                //iOS only hyphenates in systemlanguage
                r.languages[navigator.language.split('-')[0]] = true;
            } else {
                //Desktop Safari only hyphenates some languages:
                r.languages = {
                    de: true,
                    en: true,
                    es: true,
                    fr: true,
                    it: true,
                    nl: true,
                    ru: true,
                    zh: true
                };
            }
        } else if ((ua.indexOf('Firefox') !== -1) && (s['MozHyphens'] !== undefined)) {
            r.support = true;
            r.property = 'MozHyphens';
            r.languages = {
                en: true
            };
        }
        css3_h9n = r;
    },

    /**
     * @name Hyphenator-hyphenateClass
     * @description
     * A string containing the css-class-name for the hyphenate class
     * @type {string}
     * @default 'hyphenate'
     * @private
     * @example
     * &lt;p class = "hyphenate"&gt;Text&lt;/p&gt;
     * @see Hyphenator.config
     */
    hyphenateClass = 'hyphenate',

    /**
     * @name Hyphenator-dontHyphenateClass
     * @description
     * A string containing the css-class-name for elements that should not be hyphenated
     * @type {string}
     * @default 'donthyphenate'
     * @private
     * @example
     * &lt;p class = "donthyphenate"&gt;Text&lt;/p&gt;
     * @see Hyphenator.config
     */
    dontHyphenateClass = 'donthyphenate',

    /**
     * @name Hyphenator-min
     * @description
     * A number wich indicates the minimal length of words to hyphenate.
     * @type {number}
     * @default 6
     * @private
     * @see Hyphenator.config
     */
    min = 6,

    /**
     * @name Hyphenator-orphanControl
     * @description
     * Control how the last words of a line are handled:
     * level 1 (default): last word is hyphenated
     * level 2: last word is not hyphenated
     * level 3: last word is not hyphenated and last space is non breaking
     * @type {number}
     * @default 1
     * @private
     */
    orphanControl = 1,

    /**
     * @name Hyphenator-isBookmarklet
     * @description
     * Indicates if Hyphanetor runs as bookmarklet or not.
     * @type boolean
     * @default false
     * @private
     */
    isBookmarklet = (function () {
        var loc = null, re = false, jsArray = document.getElementsByTagName('script'), i, l;
        for (i = 0, l = jsArray.length; i < l; i++) {
            if (!!jsArray[i].getAttribute('src')) {
                loc = jsArray[i].getAttribute('src');
            }
            if (!loc) {
                continue;
            } else if (loc.indexOf('Hyphenator.js?bm=true') !== -1) {
                re = true;
            }
        }
        return re;
    }()),

    /**
     * @name Hyphenator-mainLanguage
     * @description
     * The general language of the document. In contrast to {@link Hyphenator-defaultLanguage},
     * mainLanguage is defined by the client (i.e. by the html or by a prompt).
     * @type {string|null}
     * @private
     * @see Hyphenator-autoSetMainLanguage
     */
    mainLanguage = null,

    /**
     * @name Hyphenator-defaultLanguage
     * @description
     * The language defined by the developper. This language setting is defined by a config option.
     * It is overwritten by any html-lang-attribute and only taken in count, when no such attribute can
     * be found (i.e. just before the prompt).
     * @type {string|null}
     * @private
     * @see Hyphenator-autoSetMainLanguage
     */
    defaultLanguage = '',


    /**
     * @name Hyphenator-elements
     * @description
     * An array holding all elements that have to be hyphenated. This var is filled by
     * {@link Hyphenator-gatherDocumentInfos}
     * @type {Array}
     * @private
     */
    elements = (function () {
        var Element = function (element, data) {
            this.element = element;
            this.hyphenated = false;
            this.treated = false; //collected but not hyphenated (dohyphenation is off)
            this.data = data;
        },
        ElementCollection = function () {
            this.count = 0;
            this.hyCount = 0;
            this.list = {};
        };
        ElementCollection.prototype = {
            add: function (el, lang, data) {
                if (!this.list.hasOwnProperty(lang)) {
                    this.list[lang] = [];
                }
                this.list[lang].push(new Element(el, data));
                this.count += 1;
            },
            each: function (fn) {
                var k;
                for (k in this.list) {
                    if (this.list.hasOwnProperty(k)) {
                        fn(k, this.list[k]);
                    }
                }
            }
        };
        return new ElementCollection();
    }()),


    /**
     * @name Hyphenator-exceptions
     * @description
     * An object containing exceptions as comma separated strings for each language.
     * When the language-objects are loaded, their exceptions are processed, copied here and then deleted.
     * @see Hyphenator-prepareLanguagesObj
     * @type {Object}
     * @private
     */
    exceptions = {},

    /**
     * @name Hyphenator-docLanguages
     * @description
     * An object holding all languages used in the document. This is filled by
     * {@link Hyphenator-gatherDocumentInfos}
     * @type {Object}
     * @private
     */
    docLanguages = {},

    /**
     * @name Hyphenator-state
     * @description
     * A number that inidcates the current state of the script
     * 0: not initialized
     * 1: loading patterns
     * 2: ready
     * 3: hyphenation done
     * 4: hyphenation removed
     * @type {number}
     * @private
     */
    state = 0,

    /**
     * @name Hyphenator-url
     * @description
     * A string containing a RegularExpression to match URL's
     * @type {string}
     * @private
     */
    url = '(\\w*:\/\/)?((\\w*:)?(\\w*)@)?((([\\d]{1,3}\\.){3}([\\d]{1,3}))|((www\\.|[a-zA-Z]\\.)?[a-zA-Z0-9\\-\\.]+\\.([a-z]{2,4})))(:\\d*)?(\/[\\w#!:\\.?\\+=&%@!\\-]*)*',
    //      protocoll     usr     pwd                    ip               or                          host                 tld        port               path
    /**
     * @name Hyphenator-mail
     * @description
     * A string containing a RegularExpression to match mail-adresses
     * @type {string}
     * @private
     */
    mail = '[\\w-\\.]+@[\\w\\.]+',

    /**
     * @name Hyphenator-urlRE
     * @description
     * A RegularExpressions-Object for url- and mail adress matching
     * @type {RegExp}
     * @private
     */
    urlOrMailRE = new RegExp('(' + url + ')|(' + mail + ')', 'i'),

    /**
     * @name Hyphenator-zeroWidthSpace
     * @description
     * A string that holds a char.
     * Depending on the browser, this is the zero with space or an empty string.
     * zeroWidthSpace is used to break URLs
     * @type {string}
     * @private
     */
    zeroWidthSpace = (function () {
        var zws, ua = navigator.userAgent.toLowerCase();
        zws = String.fromCharCode(8203); //Unicode zero width space
        if (ua.indexOf('msie 6') !== -1) {
            zws = ''; //IE6 doesn't support zws
        }
        if (ua.indexOf('opera') !== -1 && ua.indexOf('version/10.00') !== -1) {
            zws = ''; //opera 10 on XP doesn't support zws
        }
        return zws;
    }()),

    /**
     * @name Hyphenator-createElem
     * @description
     * A function alias to document.createElementNS or document.createElement
     * @type {function(string, Object)}
     * @private
     */
    createElem = function (tagname, context) {
        context = context || contextWindow;
        if (document.createElementNS) {
            return context.document.createElementNS('http://www.w3.org/1999/xhtml', tagname);
        } else if (document.createElement) {
            return context.document.createElement(tagname);
        }
    },

    /**
     * @name Hyphenator-onHyphenationDone
     * @description
     * A method to be called, when the last element has been hyphenated or the hyphenation has been
     * removed from the last element.
     * @see Hyphenator.config
     * @type {function()}
     * @private
     */
    onHyphenationDone = function () {},

    /**
     * @name Hyphenator-onError
     * @description
     * A function that can be called upon an error.
     * @see Hyphenator.config
     * @type {function(Object)}
     * @private
     */
    onError = function (e) {
        window.alert("Hyphenator.js says:\n\nAn Error ocurred:\n" + e.message);
    },

    /**
     * @name Hyphenator-selectorFunction
     * @description
     * A function that has to return a HTMLNodeList of Elements to be hyphenated.
     * By default it uses the classname ('hyphenate') to select the elements.
     * @see Hyphenator.config
     * @type {function()}
     * @private
     */
    selectorFunction = function () {
        var tmp, el = [], i, l;
        if (document.getElementsByClassName) {
            el = contextWindow.document.getElementsByClassName(hyphenateClass);
        } else {
            tmp = contextWindow.document.getElementsByTagName('*');
            l = tmp.length;
            for (i = 0; i < l; i++)
            {
                if (tmp[i].className.indexOf(hyphenateClass) !== -1 && tmp[i].className.indexOf(dontHyphenateClass) === -1) {
                    el.push(tmp[i]);
                }
            }
        }
        return el;
    },

    /**
     * @name Hyphenator-intermediateState
     * @description
     * The value of style.visibility of the text while it is hyphenated.
     * @see Hyphenator.config
     * @type {string}
     * @private
     */
    intermediateState = 'hidden',

    /**
     * @name Hyphenator-unhide
     * @description
     * How hidden elements unhide: either simultaneous (default: 'wait') or progressively.
     * 'wait' makes Hyphenator.js to wait until all elements are hyphenated (one redraw)
     * With 'progressiv' Hyphenator.js unhides elements as soon as they are hyphenated.
     * @see Hyphenator.config
     * @type {string}
     * @private
     */
    unhide = 'wait',

    /**
     * @name Hyphenator-hyphen
     * @description
     * A string containing the character for in-word-hyphenation
     * @type {string}
     * @default the soft hyphen
     * @private
     * @see Hyphenator.config
     */
    hyphen = String.fromCharCode(173),

    /**
     * @name Hyphenator-urlhyphen
     * @description
     * A string containing the character for url/mail-hyphenation
     * @type {string}
     * @default the zero width space
     * @private
     * @see Hyphenator.config
     * @see Hyphenator-zeroWidthSpace
     */
    urlhyphen = zeroWidthSpace,

    /**
     * @name Hyphenator-safeCopy
     * @description
     * Defines wether work-around for copy issues is active or not
     * Not supported by Opera (no onCopy handler)
     * @type boolean
     * @default true
     * @private
     * @see Hyphenator.config
     * @see Hyphenator-registerOnCopy
     */
    safeCopy = true,


    /*
     * runOnContentLoaded is based od jQuery.bindReady()
     * see
     * jQuery JavaScript Library v1.3.2
     * http://jquery.com/
     *
     * Copyright (c) 2009 John Resig
     * Dual licensed under the MIT and GPL licenses.
     * http://docs.jquery.com/License
     *
     * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
     * Revision: 6246
     */
    /**
     * @name Hyphenator-runOnContentLoaded
     * @description
     * A crossbrowser solution for the DOMContentLoaded-Event based on jQuery
     * <a href = "http://jquery.com/</a>
     * I added some functionality: e.g. support for frames and iframes…
     * @param {Object} w the window-object
     * @param {function()} f the function to call onDOMContentLoaded
     * @private
     */
    runOnContentLoaded = function (w, f) {
        var DOMContentLoaded = function () {}, toplevel, hyphRunForThis = {};
        if (documentLoaded && !hyphRunForThis[w.location.href]) {
            f();
            hyphRunForThis[w.location.href] = true;
            return;
        }
        function init(context) {
            contextWindow = context || window;
            if (!hyphRunForThis[contextWindow.location.href] && (!documentLoaded || contextWindow != window.parent)) {
                documentLoaded = true;
                f();
                hyphRunForThis[contextWindow.location.href] = true;
            }
        }

        function doScrollCheck() {
            try {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            } catch (error) {
                setTimeout(doScrollCheck, 1);
                return;
            }

            // and execute any waiting functions
            init(window);
        }

        function doOnLoad() {
            var i, haveAccess, fl = window.frames.length;
            if (doFrames && fl > 0) {
                for (i = 0; i < fl; i++) {
                    haveAccess = undefined;
                    //try catch isn't enough for webkit
                    try {
                        //opera throws only on document.toString-access
                        haveAccess = window.frames[i].document.toString();
                    } catch (e) {
                        haveAccess = undefined;
                    }
                    if (!!haveAccess) {
                        init(window.frames[i]);
                    }
                }
                contextWindow = window;
                f();
                hyphRunForThis[window.location.href] = true;
            } else {
                init(window);
            }
        }

        // Cleanup functions for the document ready method
        if (document.addEventListener) {
            DOMContentLoaded = function () {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                if (doFrames && window.frames.length > 0) {
                    //we are in a frameset, so do nothing but wait for onload to fire
                    return;
                } else {
                    init(window);
                }
            };

        } else if (document.attachEvent) {
            DOMContentLoaded = function () {
                // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", DOMContentLoaded);
                    if (doFrames && window.frames.length > 0) {
                        //we are in a frameset, so do nothing but wait for onload to fire
                        return;
                    } else {
                        init(window);
                    }
                }
            };
        }

        // Mozilla, Opera and webkit nightlies currently support this event
        if (document.addEventListener) {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

            // A fallback to window.onload, that will always work
            window.addEventListener("load", doOnLoad, false);

        // If IE event model is used
        } else if (document.attachEvent) {
            // ensure firing before onload,
            // maybe late but safe also for iframes
            document.attachEvent("onreadystatechange", DOMContentLoaded);

            // A fallback to window.onload, that will always work
            window.attachEvent("onload", doOnLoad);

            // If IE and not a frame
            // continually check to see if the document is ready
            toplevel = false;
            try {
                toplevel = window.frameElement === null;
            } catch (e) {}

            if (document.documentElement.doScroll && toplevel) {
                doScrollCheck();
            }
        }

    },



    /**
     * @name Hyphenator-getLang
     * @description
     * Gets the language of an element. If no language is set, it may use the {@link Hyphenator-mainLanguage}.
     * @param {Object} el The first parameter is an DOM-Element-Object
     * @param {boolean} fallback The second parameter is a boolean to tell if the function should return the {@link Hyphenator-mainLanguage}
     * if there's no language found for the element.
     * @private
     */
    getLang = function (el, fallback) {
        if (!!el.getAttribute('lang')) {
            return el.getAttribute('lang').toLowerCase();
        }
        // The following doesn't work in IE due to a bug when getAttribute('xml:lang') in a table
        /*if (!!el.getAttribute('xml:lang')) {
            return el.getAttribute('xml:lang').substring(0, 2);
        }*/
        //instead, we have to do this (thanks to borgzor):
        try {
            if (!!el.getAttribute('xml:lang')) {
                return el.getAttribute('xml:lang').toLowerCase();
            }
        } catch (ex) {}
        if (el.tagName !== 'HTML') {
            return getLang(el.parentNode, true);
        }
        if (fallback) {
            return mainLanguage;
        }
        return null;
    },

    /**
     * @name Hyphenator-autoSetMainLanguage
     * @description
     * Retrieves the language of the document from the DOM.
     * The function looks in the following places:
     * <ul>
     * <li>lang-attribute in the html-tag</li>
     * <li>&lt;meta http-equiv = "content-language" content = "xy" /&gt;</li>
     * <li>&lt;meta name = "DC.Language" content = "xy" /&gt;</li>
     * <li>&lt;meta name = "language" content = "xy" /&gt;</li>
     * </li>
     * If nothing can be found a prompt using {@link Hyphenator-languageHint} and {@link Hyphenator-prompterStrings} is displayed.
     * If the retrieved language is in the object {@link Hyphenator-supportedLang} it is copied to {@link Hyphenator-mainLanguage}
     * @private
     */
    autoSetMainLanguage = function (w) {
        w = w || contextWindow;
        var el = w.document.getElementsByTagName('html')[0],
            m = w.document.getElementsByTagName('meta'),
            i, text, e, ul;
        mainLanguage = getLang(el, false);
        if (!mainLanguage) {
            for (i = 0; i < m.length; i++) {
                //<meta http-equiv = "content-language" content="xy">
                if (!!m[i].getAttribute('http-equiv') && (m[i].getAttribute('http-equiv').toLowerCase() === 'content-language')) {
                    mainLanguage = m[i].getAttribute('content').toLowerCase();
                }
                //<meta name = "DC.Language" content="xy">
                if (!!m[i].getAttribute('name') && (m[i].getAttribute('name').toLowerCase() === 'dc.language')) {
                    mainLanguage = m[i].getAttribute('content').toLowerCase();
                }
                //<meta name = "language" content = "xy">
                if (!!m[i].getAttribute('name') && (m[i].getAttribute('name').toLowerCase() === 'language')) {
                    mainLanguage = m[i].getAttribute('content').toLowerCase();
                }
            }
        }
        //get lang for frame from enclosing document
        if (!mainLanguage && doFrames && contextWindow != window.parent) {
            autoSetMainLanguage(window.parent);
        }
        //fallback to defaultLang if set
        if (!mainLanguage && defaultLanguage !== '') {
            mainLanguage = defaultLanguage;
        }
        //ask user for lang
        if (!mainLanguage) {
            text = '';
            ul = navigator.language ? navigator.language : navigator.userLanguage;
            ul = ul.substring(0, 2);
            if (prompterStrings.hasOwnProperty(ul)) {
                text = prompterStrings[ul];
            } else {
                text = prompterStrings.en;
            }
            text += ' (ISO 639-1)\n\n' + languageHint;
            mainLanguage = window.prompt(unescape(text), ul).toLowerCase();
        }
        if (!supportedLang.hasOwnProperty(mainLanguage)) {
            if (supportedLang.hasOwnProperty(mainLanguage.split('-')[0])) { //try subtag
                mainLanguage = mainLanguage.split('-')[0];
            } else {
                e = new Error('The language "' + mainLanguage + '" is not yet supported.');
                throw e;
            }
        }
    },

    /**
     * @name Hyphenator-gatherDocumentInfos
     * @description
     * This method runs through the DOM and executes the process()-function on:
     * - every node returned by the {@link Hyphenator-selectorFunction}.
     * The process()-function copies the element to the elements-variable, sets its visibility
     * to intermediateState, retrieves its language and recursivly descends the DOM-tree until
     * the child-Nodes aren't of type 1
     * @private
     */
    gatherDocumentInfos = function () {
        var elToProcess, tmp, i = 0,
        process = function (el, hide, lang) {
            var n, i = 0, hyphenatorSettings = {};

            if (el.lang && typeof(el.lang) === 'string') {
                lang = el.lang.toLowerCase(); //copy attribute-lang to internal lang
            } else if (lang) {
                lang = lang.toLowerCase();
            } else {
                lang = getLang(el, true);
            }

            //if css3-hyphenation is supported: use it!
            if (css3 && css3_h9n.support && !!css3_h9n.languages[lang]) {
                el.style[css3_h9n.property] = "auto";
                el.style['-webkit-locale'] = "'" + lang + "'";
            } else {
                if (intermediateState === 'hidden') {
                    if (!!el.getAttribute('style')) {
                        hyphenatorSettings.hasOwnStyle = true;
                    } else {
                        hyphenatorSettings.hasOwnStyle = false;
                    }
                    hyphenatorSettings.isHidden = true;
                    el.style.visibility = 'hidden';
                }
                if (supportedLang[lang]) {
                    docLanguages[lang] = true;
                } else {
                    if (supportedLang.hasOwnProperty(lang.split('-')[0])) { //try subtag
                        lang = lang.split('-')[0];
                        hyphenatorSettings.language = lang;
                    } else if (!isBookmarklet) {
                        onError(new Error('Language ' + lang + ' is not yet supported.'));
                    }
                }
                elements.add(el, lang, hyphenatorSettings);
            }
            while (!!(n = el.childNodes[i++])) {
                if (n.nodeType === 1 && !dontHyphenate[n.nodeName.toLowerCase()] &&
                    n.className.indexOf(dontHyphenateClass) === -1 && !(n in elToProcess)) {
                    process(n, false, lang);
                }
            }
        };
        if (css3) {
            css3_gethsupport();
        }
        if (isBookmarklet) {
            elToProcess = contextWindow.document.getElementsByTagName('body')[0];
            process(elToProcess, false, mainLanguage);
        } else {
            elToProcess = selectorFunction();
            while (!!(tmp = elToProcess[i++]))
            {
                process(tmp, true, '');
            }
        }
        if (elements.count === 0) {
            //nothing to hyphenate or all hyphenated b css3
            state = 3;
            onHyphenationDone();
        }
    },


    /**
     * @name Hyphenator-createTrie
     * @description
     * converts patterns of the given language in a trie
     * @private
     * @param {string} lang the language whose patterns shall be converted
     */
    convertPatterns = function (lang) {
        /** @license BSD licenced code
         * The following code is based on code from hypher.js and adapted for Hyphenator.js
         * Copyright (c) 2011, Bram Stein
         */
        var size = 0,
            tree = {
                tpoints: []
            },
            patterns, pattern, i, j, k,
            patternObject = Hyphenator.languages[lang].patterns,
            c, chars, points, t, p, codePoint,
            getPoints = (function () {
                //IE<9 doesn't act like other browsers
                if ('in3se'.split(/\D/).length === 1) {
                    return function (pattern) {
                        var chars = pattern.split(''), c, i, r = [],
                        numb3rs = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}, lastWasNum = false;
                        i = 0;
                        while (!!(c = chars[i])) {
                            if (numb3rs.hasOwnProperty(c)) {
                                r.push(c);
                                i += 2;
                                lastWasNum = true;
                            } else {
                                r.push('');
                                i += 1;
                                lastWasNum = false;
                            }
                        }
                        if (!lastWasNum) {
                            r.push('');
                        }
                        return r;
                    };
                } else {
                    return function (pattern) {
                        return pattern.split(/\D/);
                    };
                }
            }());

        for (size in patternObject) {
            if (patternObject.hasOwnProperty(size)) {
                patterns = patternObject[size].match(new RegExp('.{1,' + (+size) + '}', 'g'));
                i = 0;
                while (!!(pattern = patterns[i++])) {
                    chars = pattern.replace(/[\d]/g, '').split('');
                    points = getPoints(pattern);
                    t = tree;

                    j = 0;
                    while (!!(c = chars[j++])) {
                        codePoint = c.charCodeAt(0);

                        if (!t[codePoint]) {
                            t[codePoint] = {};
                        }
                        t = t[codePoint];
                    }

                    t.tpoints = [];
                    for (k = 0; k < points.length; k++) {
                        p = points[k];
                        t.tpoints.push((p == "") ? 0 : p);
                    }
                }
            }
        }
        Hyphenator.languages[lang].patterns = tree;
        /**
         * end of BSD licenced code from hypher.js
         */
    },

    recreatePattern = function (pattern, nodePoints) {
        var r = [], c = pattern.split(''), i;
        for (i = 0; i < nodePoints.length; i++) {
            if (nodePoints[i] !== 0) {
                r.push(nodePoints[i]);
            }
            if (c[i]) {
                r.push(c[i]);
            }
        }
        return r.join('');
    },

    /**
     * @name Hyphenator-convertExceptionsToObject
     * @description
     * Converts a list of comma seprated exceptions to an object:
     * 'Fortran,Hy-phen-a-tion' -> {'Fortran':'Fortran','Hyphenation':'Hy-phen-a-tion'}
     * @private
     * @param {string} exc a comma separated string of exceptions (without spaces)
     */
    convertExceptionsToObject = function (exc) {
        var w = exc.split(', '),
            r = {},
            i, l, key;
        for (i = 0, l = w.length; i < l; i++) {
            key = w[i].replace(/-/g, '');
            if (!r.hasOwnProperty(key)) {
                r[key] = w[i];
            }
        }
        return r;
    },

    /**
     * @name Hyphenator-loadPatterns
     * @description
     * Adds a &lt;script&gt;-Tag to the DOM to load an externeal .js-file containing patterns and settings for the given language.
     * If the given language is not in the {@link Hyphenator-supportedLang}-Object it returns.
     * One may ask why we are not using AJAX to load the patterns. The XMLHttpRequest-Object
     * has a same-origin-policy. This makes the isBookmarklet-functionality impossible.
     * @param {string} lang The language to load the patterns for
     * @private
     * @see Hyphenator-basePath
     */
    loadPatterns = function (lang) {
        var url, xhr, head, script;
        if (supportedLang[lang] && !Hyphenator.languages[lang]) {
            url = basePath + 'patterns/' + supportedLang[lang];
        } else {
            return;
        }
        if (isLocal && !isBookmarklet) {
            //check if 'url' is available:
            xhr = null;
            if (typeof XMLHttpRequest !== 'undefined') {
                xhr = new XMLHttpRequest();
            }
            if (!xhr) {
                try {
                    xhr  = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    xhr  = null;
                }
            }
            if (xhr) {
                xhr.open('HEAD', url, false);
                xhr.setRequestHeader('Cache-Control', 'no-cache');
                xhr.send(null);
                if (xhr.status === 404) {
                    onError(new Error('Could not load\n' + url));
                    delete docLanguages[lang];
                    return;
                }
            }
        }
        if (createElem) {
            head = window.document.getElementsByTagName('head').item(0);
            script = createElem('script', window);
            script.src = url;
            script.type = 'text/javascript';
            head.appendChild(script);
        }
    },

    /**
     * @name Hyphenator-prepareLanguagesObj
     * @description
     * Adds a cache to each language and converts the exceptions-list to an object.
     * If storage is active the object is stored there.
     * @private
     * @param {string} lang the language ob the lang-obj
     */
    prepareLanguagesObj = function (lang) {
        var lo = Hyphenator.languages[lang], wrd;
        if (!lo.prepared) {
            if (enableCache) {
                lo.cache = {};
                //Export
                lo['cache'] = lo.cache;
            }
            if (enableReducedPatternSet) {
                lo.redPatSet = {};
            }
            //add exceptions from the pattern file to the local 'exceptions'-obj
            if (lo.hasOwnProperty('exceptions')) {
                Hyphenator.addExceptions(lang, lo.exceptions);
                delete lo.exceptions;
            }
            //copy global exceptions to the language specific exceptions
            if (exceptions.hasOwnProperty('global')) {
                if (exceptions.hasOwnProperty(lang)) {
                    exceptions[lang] += ', ' + exceptions.global;
                } else {
                    exceptions[lang] = exceptions.global;
                }
            }
            //move exceptions from the the local 'exceptions'-obj to the 'language'-object
            if (exceptions.hasOwnProperty(lang)) {
                lo.exceptions = convertExceptionsToObject(exceptions[lang]);
                delete exceptions[lang];
            } else {
                lo.exceptions = {};
            }
            convertPatterns(lang);
            wrd = '[\\w' + lo.specialChars + '@' + String.fromCharCode(173) + String.fromCharCode(8204) + '-]{' + min + ',}';
            lo.genRegExp = new RegExp('(' + url + ')|(' + mail + ')|(' + wrd + ')', 'gi');
            lo.prepared = true;
        }
        if (!!storage) {
            try {
                storage.setItem('Hyphenator_' + lang, window.JSON.stringify(lo));
            } catch (e) {
                //onError(e);
            }
        }

    },

    /**
     * @name Hyphenator-prepare
     * @description
     * This funtion prepares the Hyphenator-Object: If RemoteLoading is turned off, it assumes
     * that the patternfiles are loaded, all conversions are made and the callback is called.
     * If storage is active the object is retrieved there.
     * If RemoteLoading is on (default), it loads the pattern files and waits until they are loaded,
     * by repeatedly checking Hyphenator.languages. If a patterfile is loaded the patterns are
     * converted to their object style and the lang-object extended.
     * Finally the callback is called.
     * @private
     */
    prepare = function (callback) {
        var lang, interval, tmp1, tmp2;
        if (!enableRemoteLoading) {
            for (lang in Hyphenator.languages) {
                if (Hyphenator.languages.hasOwnProperty(lang)) {
                    prepareLanguagesObj(lang);
                }
            }
            state = 2;
            callback('*');
            return;
        }
        // get all languages that are used and preload the patterns
        state = 1;
        for (lang in docLanguages) {
            if (docLanguages.hasOwnProperty(lang)) {
                if (!!storage && storage.getItem('Hyphenator_' + lang)) {
                    Hyphenator.languages[lang] = window.JSON.parse(storage.getItem('Hyphenator_' + lang));
                    if (exceptions.hasOwnProperty('global')) {
                        tmp1 = convertExceptionsToObject(exceptions.global);
                        for (tmp2 in tmp1) {
                            if (tmp1.hasOwnProperty(tmp2)) {
                                Hyphenator.languages[lang].exceptions[tmp2] = tmp1[tmp2];
                            }
                        }
                    }
                    //Replace exceptions since they may have been changed:
                    if (exceptions.hasOwnProperty(lang)) {
                        tmp1 = convertExceptionsToObject(exceptions[lang]);
                        for (tmp2 in tmp1) {
                            if (tmp1.hasOwnProperty(tmp2)) {
                                Hyphenator.languages[lang].exceptions[tmp2] = tmp1[tmp2];
                            }
                        }
                        delete exceptions[lang];
                    }
                    //Replace genRegExp since it may have been changed:
                    tmp1 = '[\\w' + Hyphenator.languages[lang].specialChars + '@' + String.fromCharCode(173) + String.fromCharCode(8204) + '-]{' + min + ',}';
                    Hyphenator.languages[lang].genRegExp = new RegExp('(' + url + ')|(' + mail + ')|(' + tmp1 + ')', 'gi');

                    delete docLanguages[lang];
                    callback(lang);
                    continue;
                } else {
                    loadPatterns(lang);
                }
            }
        }
        // else async wait until patterns are loaded, then hyphenate
        interval = window.setInterval(function () {
            var finishedLoading = true, lang;
            for (lang in docLanguages) {
                if (docLanguages.hasOwnProperty(lang)) {
                    finishedLoading = false;
                    if (!!Hyphenator.languages[lang]) {
                        delete docLanguages[lang];
                        //do conversion while other patterns are loading:
                        prepareLanguagesObj(lang);
                        callback(lang);
                    }
                }
            }
            if (finishedLoading) {
                //console.log('callig callback for ' + contextWindow.location.href);
                window.clearInterval(interval);
                state = 2;
            }
        }, 100);
    },

    /**
     * @name Hyphenator-switchToggleBox
     * @description
     * Creates or hides the toggleBox: a small button to turn off/on hyphenation on a page.
     * @see Hyphenator.config
     * @private
     */
    toggleBox = function () {
        var myBox, bdy, myIdAttribute, myTextNode, myClassAttribute,
        text = (Hyphenator.doHyphenation ? 'Hy-phen-a-tion' : 'Hyphenation');
        if (!!(myBox = contextWindow.document.getElementById('HyphenatorToggleBox'))) {
            myBox.firstChild.data = text;
        } else {
            bdy = contextWindow.document.getElementsByTagName('body')[0];
            myBox = createElem('div', contextWindow);
            myIdAttribute = contextWindow.document.createAttribute('id');
            myIdAttribute.nodeValue = 'HyphenatorToggleBox';
            myClassAttribute = contextWindow.document.createAttribute('class');
            myClassAttribute.nodeValue = dontHyphenateClass;
            myTextNode = contextWindow.document.createTextNode(text);
            myBox.appendChild(myTextNode);
            myBox.setAttributeNode(myIdAttribute);
            myBox.setAttributeNode(myClassAttribute);
            myBox.onclick =  Hyphenator.toggleHyphenation;
            myBox.style.position = 'absolute';
            myBox.style.top = '0px';
            myBox.style.right = '0px';
            myBox.style.margin = '0';
            myBox.style.backgroundColor = '#AAAAAA';
            myBox.style.color = '#FFFFFF';
            myBox.style.font = '6pt Arial';
            myBox.style.letterSpacing = '0.2em';
            myBox.style.padding = '3px';
            myBox.style.cursor = 'pointer';
            myBox.style.WebkitBorderBottomLeftRadius = '4px';
            myBox.style.MozBorderRadiusBottomleft = '4px';
            bdy.appendChild(myBox);
        }
    },


    /**
     * @name Hyphenator-hyphenateWord
     * @description
     * This function is the heart of Hyphenator.js. It returns a hyphenated word.
     *
     * If there's already a {@link Hyphenator-hypen} in the word, the word is returned as it is.
     * If the word is in the exceptions list or in the cache, it is retrieved from it.
     * If there's a '-' put a zeroWidthSpace after the '-' and hyphenate the parts.
     * @param {string} lang The language of the word
     * @param {string} word The word
     * @returns string The hyphenated word
     * @public
     */
    hyphenateWord = function (lang, word) {
        var lo = Hyphenator.languages[lang], parts, l, subst,
            w, characters, originalCharacters, wordLength, i, j, k, node, points = [],
            characterPoints = [], nodePoints, nodePointsLength, m = Math.max, trie,
            result = [''], pattern;
        if (word === '') {
            return '';
        }
        if (word.indexOf(hyphen) !== -1) {
            //word already contains shy; -> leave at it is!
            return word;
        }
        if (enableCache && lo.cache.hasOwnProperty(word)) { //the word is in the cache
            return lo.cache[word];
        }
        if (lo.exceptions.hasOwnProperty(word)) { //the word is in the exceptions list
            return lo.exceptions[word].replace(/-/g, hyphen);
        }
        if (word.indexOf('-') !== -1) {
            //word contains '-' -> hyphenate the parts separated with '-'
            parts = word.split('-');
            for (i = 0, l = parts.length; i < l; i++) {
                parts[i] = hyphenateWord(lang, parts[i]);
            }
            return parts.join('-');
        }
        w = word = '_' + word + '_';
        if (!!lo.charSubstitution) {
            for (subst in lo.charSubstitution) {
                if (lo.charSubstitution.hasOwnProperty(subst)) {
                    w = w.replace(new RegExp(subst, 'g'), lo.charSubstitution[subst]);
                }
            }
        }
        if (word.indexOf("'") !== -1) {
            w = w.replace("'", "’"); //replace APOSTROPHE with RIGHT SINGLE QUOTATION MARK (since the latter is used in the patterns)
        }
        /** @license BSD licenced code
         * The following code is based on code from hypher.js
         * Copyright (c) 2011, Bram Stein
         */
        characters = w.toLowerCase().split('');
        originalCharacters = word.split('');
        wordLength = characters.length;
        trie = lo.patterns;
        for (i = 0; i < wordLength; i += 1) {
            points[i] = 0;
            characterPoints[i] = characters[i].charCodeAt(0);
        }
        for (i = 0; i < wordLength; i += 1) {
            pattern = '';
            node = trie;
            for (j = i; j < wordLength; j += 1) {
                node = node[characterPoints[j]];
                if (node) {
                    if (enableReducedPatternSet) {
                        pattern += String.fromCharCode(characterPoints[j]);
                    }
                    nodePoints = node.tpoints;
                    if (nodePoints) {
                        if (enableReducedPatternSet) {
                            if (!lo.redPatSet) {
                                lo.redPatSet = {};
                            }
                            lo.redPatSet[pattern] = recreatePattern(pattern, nodePoints);
                        }
                        for (k = 0, nodePointsLength = nodePoints.length; k < nodePointsLength; k += 1) {
                            points[i + k] = m(points[i + k], nodePoints[k]);
                        }
                    }
                } else {
                    break;
                }
            }
        }
        for (i = 1; i < wordLength - 1; i += 1) {
            if (i > lo.leftmin && i < (wordLength - lo.rightmin) && points[i] % 2) {
                result.push(originalCharacters[i]);
            } else {
                result[result.length - 1] += originalCharacters[i];
            }
        }
        return result.join(hyphen);
        /**
         * end of BSD licenced code from hypher.js
         */
    },

    /**
     * @name Hyphenator-hyphenateURL
     * @description
     * Puts {@link Hyphenator-urlhyphen} after each no-alphanumeric char that my be in a URL.
     * @param {string} url to hyphenate
     * @returns string the hyphenated URL
     * @public
     */
    hyphenateURL = function (url) {
        return url.replace(/([:\/\.\?#&_,;!@]+)/gi, '$&' + urlhyphen);
    },

    /**
     * @name Hyphenator-removeHyphenationFromElement
     * @description
     * Removes all hyphens from the element. If there are other elements, the function is
     * called recursively.
     * Removing hyphens is usefull if you like to copy text. Some browsers are buggy when the copy hyphenated texts.
     * @param {Object} el The element where to remove hyphenation.
     * @public
     */
    removeHyphenationFromElement = function (el) {
        var h, i = 0, n;
        switch (hyphen) {
        case '|':
            h = '\\|';
            break;
        case '+':
            h = '\\+';
            break;
        case '*':
            h = '\\*';
            break;
        default:
            h = hyphen;
        }
        while (!!(n = el.childNodes[i++])) {
            if (n.nodeType === 3) {
                n.data = n.data.replace(new RegExp(h, 'g'), '');
                n.data = n.data.replace(new RegExp(zeroWidthSpace, 'g'), '');
            } else if (n.nodeType === 1) {
                removeHyphenationFromElement(n);
            }
        }
    },


    /**
     * @name Hyphenator-registerOnCopy
     * @description
     * Huge work-around for browser-inconsistency when it comes to
     * copying of hyphenated text.
     * The idea behind this code has been provided by http://github.com/aristus/sweet-justice
     * sweet-justice is under BSD-License
     * @private
     */
    registerOnCopy = function (el) {
        var body = el.ownerDocument.getElementsByTagName('body')[0],
        shadow,
        selection,
        range,
        rangeShadow,
        restore,
        oncopyHandler = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
            currDoc = target.ownerDocument,
            body = currDoc.getElementsByTagName('body')[0],
            targetWindow = 'defaultView' in currDoc ? currDoc.defaultView : currDoc.parentWindow;
            if (target.tagName && dontHyphenate[target.tagName.toLowerCase()]) {
                //Safari needs this
                return;
            }
            //create a hidden shadow element
            shadow = currDoc.createElement('div');
            //Moving the element out of the screen doesn't work for IE9 (https://connect.microsoft.com/IE/feedback/details/663981/)
            //shadow.style.overflow = 'hidden';
            //shadow.style.position = 'absolute';
            //shadow.style.top = '-5000px';
            //shadow.style.height = '1px';
            //doing this instead:
            shadow.style.color = window.getComputedStyle ? targetWindow.getComputedStyle(body).backgroundColor : '#FFFFFF';
            shadow.style.fontSize = '0px';
            body.appendChild(shadow);
            if (!!window.getSelection) {
                //FF3, Webkit, IE9
                e.stopPropagation();
                selection = targetWindow.getSelection();
                range = selection.getRangeAt(0);
                shadow.appendChild(range.cloneContents());
                removeHyphenationFromElement(shadow);
                selection.selectAllChildren(shadow);
                restore = function () {
                    shadow.parentNode.removeChild(shadow);
                    selection.removeAllRanges(); //IE9 needs that
                    selection.addRange(range);
                };
            } else {
                // IE<9
                e.cancelBubble = true;
                selection = targetWindow.document.selection;
                range = selection.createRange();
                shadow.innerHTML = range.htmlText;
                removeHyphenationFromElement(shadow);
                rangeShadow = body.createTextRange();
                rangeShadow.moveToElementText(shadow);
                rangeShadow.select();
                restore = function () {
                    shadow.parentNode.removeChild(shadow);
                    if (range.text !== "") {
                        range.select();
                    }
                };
            }
            window.setTimeout(restore, 0);
        };
        if (!body) {
            return;
        }
        el = el || body;
        if (window.addEventListener) {
            el.addEventListener("copy", oncopyHandler, true);
        } else {
            el.attachEvent("oncopy", oncopyHandler);
        }
    },

    /**
     * @name Hyphenator-unhideElement
     * @description
     * Unhides an element and removes the visibility attr if set by hyphenator
     * @param Object The Element object from ElementCollection
     * @private
     */
    unhideElement = function (elo) {
        var el = elo.element,
        hyphenatorSettings = elo.data;
        el.style.visibility = 'visible';
        elo.data.isHidden = false;
        if (!hyphenatorSettings.hasOwnStyle) {
            el.setAttribute('style', ''); // without this, removeAttribute doesn't work in Safari (thanks to molily)
            el.removeAttribute('style');
        } else {
            if (el.style.removeProperty) {
                el.style.removeProperty('visibility');
            } else if (el.style.removeAttribute) { // IE
                el.style.removeAttribute('visibility');
            }
        }
    },

    /**
     * @name Hyphenator-checkIfAllDone
     * @description
     * Checks if all Elements are hyphenated, unhides them and fires onHyphenationDone()
     * @private
     */
    checkIfAllDone = function () {
        var allDone = true;
        elements.each(function (lang, list) {
            var i, l = list.length;
            for (i = 0; i < l; i++) {
                allDone = allDone && list[i].hyphenated;
                if (intermediateState === 'hidden' && unhide === 'wait') {
                    unhideElement(list[i]);
                }
            }
        });
        if (allDone) {
            state = 3;
            onHyphenationDone();
        }
    },


    /**
     * @name Hyphenator-hyphenateElement
     * @description
     * Takes the content of the given element and - if there's text - replaces the words
     * by hyphenated words. If there's another element, the function is called recursively.
     * When all words are hyphenated, the visibility of the element is set to 'visible'.
     * @param {Object} el The element to hyphenate
     * @private
     */
    hyphenateElement = function (lang, elo) {
        var hyphenatorSettings = elo.data,
            el = elo.element,
            hyphenate, n, i,
            controlOrphans = function (part) {
                var h, r;
                switch (hyphen) {
                case '|':
                    h = '\\|';
                    break;
                case '+':
                    h = '\\+';
                    break;
                case '*':
                    h = '\\*';
                    break;
                default:
                    h = hyphen;
                }
                if (orphanControl >= 2) {
                    //remove hyphen points from last word
                    r = part.split(' ');
                    r[1] = r[1].replace(new RegExp(h, 'g'), '');
                    r[1] = r[1].replace(new RegExp(zeroWidthSpace, 'g'), '');
                    r = r.join(' ');
                }
                if (orphanControl === 3) {
                    //replace spaces by non breaking spaces
                    r = r.replace(/[ ]+/g, String.fromCharCode(160));
                }
                return r;
            };
        if (Hyphenator.languages.hasOwnProperty(lang)) {
            hyphenate = function (word) {
                if (!Hyphenator.doHyphenation) {
                    return word;
                } else if (urlOrMailRE.test(word)) {
                    return hyphenateURL(word);
                } else {
                    return hyphenateWord(lang, word);
                }
            };
            if (safeCopy && (el.tagName.toLowerCase() !== 'body')) {
                registerOnCopy(el);
            }
            i = 0;
            while (!!(n = el.childNodes[i++])) {
                if (n.nodeType === 3 && n.data.length >= min) { //type 3 = #text -> hyphenate!
                    n.data = n.data.replace(Hyphenator.languages[lang].genRegExp, hyphenate);
                    if (orphanControl !== 1) {
                        n.data = n.data.replace(/[\S]+ [\S]+$/, controlOrphans);
                    }
                }
            }
        }
        if (hyphenatorSettings.isHidden && intermediateState === 'hidden' && unhide === 'progressive') {
            unhideElement(elo);
        }
        elo.hyphenated = true;
        elements.hyCount += 1;
        if (elements.count <= elements.hyCount) {
            checkIfAllDone();
        }
    },


    /**
     * @name Hyphenator-hyphenateLanguageElements
     * @description
     * Calls hyphenateElement() for all elements of the specified language.
     * If the language is '*' then all elements are hyphenated.
     * This is done with a setTimout
     * to prevent a "long running Script"-alert when hyphenating large pages.
     * Therefore a tricky bind()-function was necessary.
     * @private
     */
    hyphenateLanguageElements = function (lang) {
        function bind(fun, arg1, arg2) {
            return function () {
                return fun(arg1, arg2);
            };
        }
        var el, i, l;
        if (lang === '*') {
            elements.each(function (lang, langels) {
                var i, l = langels.length;
                for (i = 0; i < l; i++) {
                    window.setTimeout(bind(hyphenateElement, lang, langels[i]), 0);
                }
            });
        } else {
            if (elements.list.hasOwnProperty(lang)) {
                l = elements.list[lang].length;
                for (i = 0; i < l; i++) {
                    window.setTimeout(bind(hyphenateElement, lang, elements.list[lang][i]), 0);
                }
            }
        }
    },

    /**
     * @name Hyphenator-removeHyphenationFromDocument
     * @description
     * Does what it says ;-)
     * @private
     */
    removeHyphenationFromDocument = function () {
        elements.each(function (lang, elo) {
            var i, l = elo.length, el;
            for (i = 0; i < l; i++) {
                removeHyphenationFromElement(elo[i].element);
                elo[i].hyphenated = false;
            }
        });
        state = 4;
    },

    /**
     * @name Hyphenator-createStorage
     * @description
     * inits the private var storage depending of the setting in storageType
     * and the supported features of the system.
     * @private
     */
    createStorage = function () {
        try {
            if (storageType !== 'none' &&
                typeof(window.localStorage) !== 'undefined' &&
                typeof(window.sessionStorage) !== 'undefined' &&
                typeof(window.JSON.stringify) !== 'undefined' &&
                typeof(window.JSON.parse) !== 'undefined') {
                switch (storageType) {
                case 'session':
                    storage = window.sessionStorage;
                    break;
                case 'local':
                    storage = window.localStorage;
                    break;
                default:
                    storage = undefined;
                    break;
                }
            }
        } catch (f) {
            //FF throws an error if DOM.storage.enabled is set to false
        }
    },

    /**
     * @name Hyphenator-storeConfiguration
     * @description
     * Stores the current config-options in DOM-Storage
     * @private
     */
    storeConfiguration = function () {
        if (!storage) {
            return;
        }
        var settings = {
            'STORED': true,
            'classname': hyphenateClass,
            'donthyphenateclassname': dontHyphenateClass,
            'minwordlength': min,
            'hyphenchar': hyphen,
            'urlhyphenchar': urlhyphen,
            'togglebox': toggleBox,
            'displaytogglebox': displayToggleBox,
            'remoteloading': enableRemoteLoading,
            'enablecache': enableCache,
            'onhyphenationdonecallback': onHyphenationDone,
            'onerrorhandler': onError,
            'intermediatestate': intermediateState,
            'selectorfunction': selectorFunction,
            'safecopy': safeCopy,
            'doframes': doFrames,
            'storagetype': storageType,
            'orphancontrol': orphanControl,
            'dohyphenation': Hyphenator.doHyphenation,
            'persistentconfig': persistentConfig,
            'defaultlanguage': defaultLanguage
        };
        storage.setItem('Hyphenator_config', window.JSON.stringify(settings));
    },

    /**
     * @name Hyphenator-restoreConfiguration
     * @description
     * Retrieves config-options from DOM-Storage and does configuration accordingly
     * @private
     */
    restoreConfiguration = function () {
        var settings;
        if (storage.getItem('Hyphenator_config')) {
            settings = window.JSON.parse(storage.getItem('Hyphenator_config'));
            Hyphenator.config(settings);
        }
    };

    return {

        /**
         * @name Hyphenator.version
         * @memberOf Hyphenator
         * @description
         * String containing the actual version of Hyphenator.js
         * [major release].[minor releas].[bugfix release]
         * major release: new API, new Features, big changes
         * minor release: new languages, improvements
         * @public
         */
        version: '4.0.0',

        /**
         * @name Hyphenator.doHyphenation
         * @description
         * If doHyphenation is set to false (defaults to true), hyphenateDocument() isn't called.
         * All other actions are performed.
         */
        doHyphenation: true,

        /**
         * @name Hyphenator.languages
         * @memberOf Hyphenator
         * @description
         * Objects that holds key-value pairs, where key is the language and the value is the
         * language-object loaded from (and set by) the pattern file.
         * The language object holds the following members:
         * <table>
         * <tr><th>key</th><th>desc></th></tr>
         * <tr><td>leftmin</td><td>The minimum of chars to remain on the old line</td></tr>
         * <tr><td>rightmin</td><td>The minimum of chars to go on the new line</td></tr>
         * <tr><td>shortestPattern</td><td>The shortes pattern (numbers don't count!)</td></tr>
         * <tr><td>longestPattern</td><td>The longest pattern (numbers don't count!)</td></tr>
         * <tr><td>specialChars</td><td>Non-ASCII chars in the alphabet.</td></tr>
         * <tr><td>patterns</td><td>the patterns</td></tr>
         * </table>
         * And optionally (or after prepareLanguagesObj() has been called):
         * <table>
         * <tr><td>exceptions</td><td>Excpetions for the secified language</td></tr>
         * </table>
         * @public
         */
        languages: {},


        /**
         * @name Hyphenator.config
             * @description
         * Config function that takes an object as an argument. The object contains key-value-pairs
         * containig Hyphenator-settings. This is a shortcut for calling Hyphenator.set...-Methods.
         * @param {Object} obj <table>
         * <tr><th>key</th><th>values</th><th>default</th></tr>
         * <tr><td>classname</td><td>string</td><td>'hyphenate'</td></tr>
         * <tr><td>donthyphenateclassname</td><td>string</td><td>''</td></tr>
         * <tr><td>minwordlength</td><td>integer</td><td>6</td></tr>
         * <tr><td>hyphenchar</td><td>string</td><td>'&amp;shy;'</td></tr>
         * <tr><td>urlhyphenchar</td><td>string</td><td>'zero with space'</td></tr>
         * <tr><td>togglebox</td><td>function</td><td>see code</td></tr>
         * <tr><td>displaytogglebox</td><td>boolean</td><td>false</td></tr>
         * <tr><td>remoteloading</td><td>boolean</td><td>true</td></tr>
         * <tr><td>enablecache</td><td>boolean</td><td>true</td></tr>
         * <tr><td>enablereducedpatternset</td><td>boolean</td><td>false</td></tr>
         * <tr><td>onhyphenationdonecallback</td><td>function</td><td>empty function</td></tr>
         * <tr><td>onerrorhandler</td><td>function</td><td>alert(onError)</td></tr>
         * <tr><td>intermediatestate</td><td>string</td><td>'hidden'</td></tr>
         * <tr><td>selectorfunction</td><td>function</td><td>[…]</td></tr>
         * <tr><td>safecopy</td><td>boolean</td><td>true</td></tr>
         * <tr><td>doframes</td><td>boolean</td><td>false</td></tr>
         * <tr><td>storagetype</td><td>string</td><td>'none'</td></tr>
         * </table>
         * @public
         * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script type = "text/javascript"&gt;
         *     Hyphenator.config({'minwordlength':4,'hyphenchar':'|'});
         *     Hyphenator.run();
         * &lt;/script&gt;
         */
        config: function (obj) {
            var assert = function (name, type) {
                    if (typeof obj[name] === type) {
                        return true;
                    } else {
                        onError(new Error('Config onError: ' + name + ' must be of type ' + type));
                        return false;
                    }
                },
                key;

            if (obj.hasOwnProperty('storagetype')) {
                if (assert('storagetype', 'string')) {
                    storageType = obj.storagetype;
                }
                if (!storage) {
                    createStorage();
                }
            }
            if (!obj.hasOwnProperty('STORED') && storage && obj.hasOwnProperty('persistentconfig') && obj.persistentconfig === true) {
                restoreConfiguration();
            }

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    switch (key) {
                    case 'STORED':
                        break;
                    case 'classname':
                        if (assert('classname', 'string')) {
                            hyphenateClass = obj[key];
                        }
                        break;
                    case 'donthyphenateclassname':
                        if (assert('donthyphenateclassname', 'string')) {
                            dontHyphenateClass = obj[key];
                        }
                        break;
                    case 'minwordlength':
                        if (assert('minwordlength', 'number')) {
                            min = obj[key];
                        }
                        break;
                    case 'hyphenchar':
                        if (assert('hyphenchar', 'string')) {
                            if (obj.hyphenchar === '&shy;') {
                                obj.hyphenchar = String.fromCharCode(173);
                            }
                            hyphen = obj[key];
                        }
                        break;
                    case 'urlhyphenchar':
                        if (obj.hasOwnProperty('urlhyphenchar')) {
                            if (assert('urlhyphenchar', 'string')) {
                                urlhyphen = obj[key];
                            }
                        }
                        break;
                    case 'togglebox':
                        if (assert('togglebox', 'function')) {
                            toggleBox = obj[key];
                        }
                        break;
                    case 'displaytogglebox':
                        if (assert('displaytogglebox', 'boolean')) {
                            displayToggleBox = obj[key];
                        }
                        break;
                    case 'remoteloading':
                        if (assert('remoteloading', 'boolean')) {
                            enableRemoteLoading = obj[key];
                        }
                        break;
                    case 'enablecache':
                        if (assert('enablecache', 'boolean')) {
                            enableCache = obj[key];
                        }
                        break;
                    case 'enablereducedpatternset':
                        if (assert('enablereducedpatternset', 'boolean')) {
                            enableReducedPatternSet = obj[key];
                        }
                        break;
                    case 'onhyphenationdonecallback':
                        if (assert('onhyphenationdonecallback', 'function')) {
                            onHyphenationDone = obj[key];
                        }
                        break;
                    case 'onerrorhandler':
                        if (assert('onerrorhandler', 'function')) {
                            onError = obj[key];
                        }
                        break;
                    case 'intermediatestate':
                        if (assert('intermediatestate', 'string')) {
                            intermediateState = obj[key];
                        }
                        break;
                    case 'selectorfunction':
                        if (assert('selectorfunction', 'function')) {
                            selectorFunction = obj[key];
                        }
                        break;
                    case 'safecopy':
                        if (assert('safecopy', 'boolean')) {
                            safeCopy = obj[key];
                        }
                        break;
                    case 'doframes':
                        if (assert('doframes', 'boolean')) {
                            doFrames = obj[key];
                        }
                        break;
                    case 'storagetype':
                        if (assert('storagetype', 'string')) {
                            storageType = obj[key];
                        }
                        break;
                    case 'orphancontrol':
                        if (assert('orphancontrol', 'number')) {
                            orphanControl = obj[key];
                        }
                        break;
                    case 'dohyphenation':
                        if (assert('dohyphenation', 'boolean')) {
                            Hyphenator.doHyphenation = obj[key];
                        }
                        break;
                    case 'persistentconfig':
                        if (assert('persistentconfig', 'boolean')) {
                            persistentConfig = obj[key];
                        }
                        break;
                    case 'defaultlanguage':
                        if (assert('defaultlanguage', 'string')) {
                            defaultLanguage = obj[key];
                        }
                        break;
                    case 'useCSS3hyphenation':
                        if (assert('useCSS3hyphenation', 'boolean')) {
                            css3 = obj[key];
                        }
                        break;
                    case 'unhide':
                        if (assert('unhide', 'string')) {
                            unhide = obj[key];
                        }
                        break;
                    default:
                        onError(new Error('Hyphenator.config: property ' + key + ' not known.'));
                    }
                }
            }
            if (storage && persistentConfig) {
                storeConfiguration();
            }
        },

        /**
         * @name Hyphenator.run
             * @description
         * Bootstrap function that starts all hyphenation processes when called.
         * @public
         * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script type = "text/javascript"&gt;
         *   Hyphenator.run();
         * &lt;/script&gt;
         */
        run: function () {
            documentCount = 0;
            var process = function () {
                try {
                    if (contextWindow.document.getElementsByTagName('frameset').length > 0) {
                        return; //we are in a frameset
                    }
                    documentCount++;
                    autoSetMainLanguage(undefined);
                    gatherDocumentInfos();
                    //console.log('preparing for ' + contextWindow.location.href);
                    prepare(hyphenateLanguageElements);
                    if (displayToggleBox) {
                        toggleBox();
                    }
                } catch (e) {
                    onError(e);
                }
            }, i, haveAccess, fl = window.frames.length;

            if (!storage) {
                createStorage();
            }
            if (!documentLoaded && !isBookmarklet) {
                runOnContentLoaded(window, process);
            }
            if (isBookmarklet || documentLoaded) {
                if (doFrames && fl > 0) {
                    for (i = 0; i < fl; i++) {
                        haveAccess = undefined;
                        //try catch isn't enough for webkit
                        try {
                            //opera throws only on document.toString-access
                            haveAccess = window.frames[i].document.toString();
                        } catch (e) {
                            haveAccess = undefined;
                        }
                        if (!!haveAccess) {
                            contextWindow = window.frames[i];
                            process();
                        }
                    }
                }
                contextWindow = window;
                process();
            }
        },

        /**
         * @name Hyphenator.addExceptions
             * @description
         * Adds the exceptions from the string to the appropriate language in the
         * {@link Hyphenator-languages}-object
         * @param {string} lang The language
         * @param {string} words A comma separated string of hyphenated words WITH spaces.
         * @public
         * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script type = "text/javascript"&gt;
         *   Hyphenator.addExceptions('de','ziem-lich, Wach-stube');
         *   Hyphenator.run();
         * &lt;/script&gt;
         */
        addExceptions: function (lang, words) {
            if (lang === '') {
                lang = 'global';
            }
            if (exceptions.hasOwnProperty(lang)) {
                exceptions[lang] += ", " + words;
            } else {
                exceptions[lang] = words;
            }
        },

        /**
         * @name Hyphenator.hyphenate
             * @public
         * @description
         * Hyphenates the target. The language patterns must be loaded.
         * If the target is a string, the hyphenated string is returned,
         * if it's an object, the values are hyphenated directly.
         * @param {string|Object} target the target to be hyphenated
         * @param {string} lang the language of the target
         * @returns string
         * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script src = "patterns/en.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script type = "text/javascript"&gt;
         * var t = Hyphenator.hyphenate('Hyphenation', 'en'); //Hy|phen|ation
         * &lt;/script&gt;
         */
        hyphenate: function (target, lang) {
            var hyphenate, n, i;
            if (Hyphenator.languages.hasOwnProperty(lang)) {
                if (!Hyphenator.languages[lang].prepared) {
                    prepareLanguagesObj(lang);
                }
                hyphenate = function (word) {
                    if (urlOrMailRE.test(word)) {
                        return hyphenateURL(word);
                    } else {
                        return hyphenateWord(lang, word);
                    }
                };
                if (typeof target === 'string' || target.constructor === String) {
                    return target.replace(Hyphenator.languages[lang].genRegExp, hyphenate);
                } else if (typeof target === 'object') {
                    i = 0;
                    while (!!(n = target.childNodes[i++])) {
                        if (n.nodeType === 3 && n.data.length >= min) { //type 3 = #text -> hyphenate!
                            n.data = n.data.replace(Hyphenator.languages[lang].genRegExp, hyphenate);
                        } else if (n.nodeType === 1) {
                            if (n.lang !== '') {
                                Hyphenator.hyphenate(n, n.lang);
                            } else {
                                Hyphenator.hyphenate(n, lang);
                            }
                        }
                    }
                }
            } else {
                onError(new Error('Language "' + lang + '" is not loaded.'));
            }
        },

        /**
         * @name Hyphenator.getRedPatternSet
             * @description
         * Returns {@link Hyphenator-isBookmarklet}.
         * @param {string} lang the language patterns are stored for
         * @returns object {'patk': pat}
         * @public
         */
        getRedPatternSet: function (lang) {
            return Hyphenator.languages[lang].redPatSet;
        },

        /**
         * @name Hyphenator.isBookmarklet
             * @description
         * Returns {@link Hyphenator-isBookmarklet}.
         * @returns boolean
         * @public
         */
        isBookmarklet: function () {
            return isBookmarklet;
        },

        getConfigFromURI: function () {
            var loc = null, re = {}, jsArray = document.getElementsByTagName('script'), i, j, l, s, gp, option;
            for (i = 0, l = jsArray.length; i < l; i++) {
                if (!!jsArray[i].getAttribute('src')) {
                    loc = jsArray[i].getAttribute('src');
                }
                if (!loc) {
                    continue;
                } else {
                    s = loc.indexOf('Hyphenator.js?');
                    if (s === -1) {
                        continue;
                    }
                    gp = loc.substring(s + 14).split('&');
                    for (j = 0; j < gp.length; j++) {
                        option = gp[j].split('=');
                        if (option[0] === 'bm') {
                            continue;
                        }
                        if (option[1] === 'true') {
                            re[option[0]] = true;
                            continue;
                        }
                        if (option[1] === 'false') {
                            re[option[0]] = false;
                            continue;
                        }
                        if (isFinite(option[1])) {
                            re[option[0]] = parseInt(option[1], 10);
                            continue;
                        }
                        if (option[0] === 'onhyphenationdonecallback') {
                            re[option[0]] = new Function('', option[1]);
                            continue;
                        }
                        re[option[0]] = option[1];
                    }
                    break;
                }
            }
            return re;
        },

        /**
         * @name Hyphenator.toggleHyphenation
             * @description
         * Checks the current state of the ToggleBox and removes or does hyphenation.
         * @public
         */
        toggleHyphenation: function () {
            if (Hyphenator.doHyphenation) {
                removeHyphenationFromDocument();
                Hyphenator.doHyphenation = false;
                storeConfiguration();
                toggleBox();
            } else {
                hyphenateLanguageElements('*');
                Hyphenator.doHyphenation = true;
                storeConfiguration();
                toggleBox();
            }
        }
    };
}(window));

//Export properties/methods (for google closure compiler)
Hyphenator['languages'] = Hyphenator.languages;
Hyphenator['config'] = Hyphenator.config;
Hyphenator['run'] = Hyphenator.run;
Hyphenator['addExceptions'] = Hyphenator.addExceptions;
Hyphenator['hyphenate'] = Hyphenator.hyphenate;
Hyphenator['getRedPatternSet'] = Hyphenator.getRedPatternSet;
Hyphenator['isBookmarklet'] = Hyphenator.isBookmarklet;
Hyphenator['getConfigFromURI'] = Hyphenator.getConfigFromURI;
Hyphenator['toggleHyphenation'] = Hyphenator.toggleHyphenation;
window['Hyphenator'] = Hyphenator;

if (Hyphenator.isBookmarklet()) {
    Hyphenator.config({displaytogglebox: true, intermediatestate: 'visible', doframes: true});
    Hyphenator.config(Hyphenator.getConfigFromURI());
    Hyphenator.run();
}

jQuery(window).load(function() {
    // Centered Play icon (Videos)
    if (jQuery('.latest-video').exists()) {
        jQuery('.latest-video').each(function() {
            var lv_s = jQuery(this).find('a span');
            var lv_w = jQuery(this).width();
            var lv_h = jQuery(this).height();
            lv_s.css('left',(lv_w/2)-26);
            lv_s.css('top',(lv_h/2)-46);
        })
    }
    // Flexslider
    jQuery('.flexslider').flexslider({
        directionNav: false
    });
});

jQuery.fn.exists = function(){ return this.length>0; }

jQuery(document).ready(function($) {

    // Main navigation
    $('ul.sf-menu').superfish({
        delay:       1000,
        animation:   {opacity:'show',height:'show'},
        speed:       'fast',
        dropShadows: false
    });

    // Responsive Menu
    // Create the dropdown base
    $("<select class='alt-nav' />").appendTo("#nav");

    // Create default option "Go to..."
    $("<option />", {
       "selected": "selected",
       "value"   : "",
       "text"    : "Go to..."
    }).appendTo("#navigation select");

    // Populate dropdown with menu items
    $("#navigation a").each(function() {
     var el = $(this);
     $("<option />", {
         "value"   : el.attr("href"),
         "text"    : el.text()
     }).appendTo("nav select");
    });

    $(".alt-nav").change(function() {
      window.location = $(this).find("option:selected").val();
    });

    // Tour dates widget
    if ($('.widget .tour-dates li').exists()) {
        $('.widget .tour-dates li').equalHeights();
    }

    // Tracklisting
    if ($('.track-listen').exists()) {
        $('.track-listen').click(function(){
            var target      = $(this).siblings('.track-audio');
            var siblings    = $(this).parents('.track').siblings().children('.track-audio');
            siblings.slideUp('fast');
            target.slideToggle('fast');
            return false;
        });
    }

    // Tracklisting check subtitles
    if ($('.track').exists()) {
        $('.track').each(function(){
            var main_head = $(this).find('.main-head');
            if (main_head.length == 0)
                $(this).addClass('track-single');
        });
    }

    // Lightbox
    if ($("a[data-rel^='prettyPhoto']").exists()) {
        $("a[data-rel^='prettyPhoto']").prettyPhoto({
            show_title: false
        });
        $("a[data-rel^='prettyPhoto']").each(function() {
            $(this).attr("rel", $(this).data("rel"));
        });
    }

    // Content videos
    if ($('.post').exists()) {
        $('.post').fitVids();
    }

});

// Hyphenator
Hyphenator.run();

// Self-hosted Audio Player
function setupjw(playerID,track) {
    jwplayer(playerID).setup({
        autostart: false,
        file: track,
        flashplayer: ThemeOption.theme_url + "/jwplayer/player.swf",
        width: "100%",
        height:"65",
        events: {
            onPlay: function(event) {
                var isiPad = navigator.userAgent.match(/iPad/i) != null; //fixing a nasty, really nasty bug on iPad.
                var now_playing = this.id;
                jQuery('.jw').each(function(){
                if (isiPad) {
                    var other_player = jQuery(this).find('div').attr('id');
                }
                else {
                    var other_player = jQuery(this).find('div').attr('id').slice(0,-8);
                }
                    if (other_player != now_playing) {
                        jwplayer(other_player).stop();
                    }
                })
            }
        }
    });
}

// Self-hosted Video Player
function setupvjw(playerID,track) {
    jwplayer(playerID).setup({
        autostart: false,
        file: track,
        height:"300",
        flashplayer: ThemeOption.theme_url + "/jwplayer/player.swf"
    });
}