(this.webpackJsonp=this.webpackJsonp||[]).push([[58,72],{"+iVy":function(t,e,i){"use strict";i.d(e,"b",(function(){return v})),i.d(e,"a",(function(){return y}));var n=i("Z2pp"),r=i("jyii"),o=i("/Zha"),s=i("9CRu"),l=i("gCUY"),a=i("Sq3g"),c=i("ySPH"),d=i("yxQL"),u=i("1pIC"),h=i("GpHn"),f=i("R+nN");function p(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function b(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?p(Object(i),!0).forEach((function(e){g(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):p(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function g(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var v=Object(l.c)(b(b({},d.b),{},{text:{type:String},html:{type:String},variant:{type:String,default:"secondary"},size:{type:String},block:{type:Boolean,default:!1},menuClass:{type:[String,Array,Object]},toggleTag:{type:String,default:"button"},toggleText:{type:String,default:"Toggle dropdown"},toggleClass:{type:[String,Array,Object]},noCaret:{type:Boolean,default:!1},split:{type:Boolean,default:!1},splitHref:{type:String},splitTo:{type:[String,Object]},splitVariant:{type:String},splitClass:{type:[String,Array,Object]},splitButtonType:{type:String,default:"button",validator:function(t){return Object(s.a)(["button","submit","reset"],t)}},lazy:{type:Boolean,default:!1},role:{type:String,default:"menu"}}),r.m),y=n.a.extend({name:r.m,mixins:[u.a,d.a,h.a],props:v,computed:{dropdownClasses:function(){var t=this.block,e=this.split;return[this.directionClass,this.boundaryClass,{show:this.visible,"btn-group":e||!t,"d-flex":t&&e}]},menuClasses:function(){return[this.menuClass,{"dropdown-menu-right":this.right,show:this.visible}]},toggleClasses:function(){var t=this.split;return[this.toggleClass,{"dropdown-toggle-split":t,"dropdown-toggle-no-caret":this.noCaret&&!t}]}},render:function(t){var e=this.visible,i=this.variant,n=this.size,r=this.block,s=this.disabled,l=this.split,d=this.role,u=this.hide,h=this.toggle,p={variant:i,size:n,block:r,disabled:s},g=this.normalizeSlot("button-content"),v=this.hasNormalizedSlot("button-content")?{}:Object(a.a)(this.html,this.text),y=t();if(l){var m=this.splitTo,O=this.splitHref,w=this.splitButtonType,j=b(b({},p),{},{variant:this.splitVariant||i});m?j.to=m:O?j.href=O:w&&(j.type=w),y=t(f.a,{class:this.splitClass,attrs:{id:this.safeId("_BV_button_")},props:j,domProps:v,on:{click:this.onSplitClick},ref:"button"},g),g=[t("span",{class:["sr-only"]},[this.toggleText])],v={}}var C=t(f.a,{staticClass:"dropdown-toggle",class:this.toggleClasses,attrs:{id:this.safeId("_BV_toggle_"),"aria-haspopup":"true","aria-expanded":Object(c.e)(e)},props:b(b({},p),{},{tag:this.toggleTag,block:r&&!l}),domProps:v,on:{mousedown:this.onMousedown,click:h,keydown:h},ref:"toggle"},g),_=t("ul",{staticClass:"dropdown-menu",class:this.menuClasses,attrs:{role:d,tabindex:"-1","aria-labelledby":this.safeId(l?"_BV_button_":"_BV_toggle_")},on:{keydown:this.onKeydown},ref:"menu"},[!this.lazy||e?this.normalizeSlot(o.c,{hide:u}):t()]);return t("div",{staticClass:"dropdown b-dropdown",class:this.dropdownClasses,attrs:{id:this.safeId()}},[y,C,_])}})},"3Dr1":function(t,e,i){"use strict";var n=i("SYh6");e.a=Object(n.a)()},LT1q:function(t,e,i){"use strict";i.d(e,"k",(function(){return n})),i.d(e,"l",(function(){return r})),i.d(e,"z",(function(){return o})),i.d(e,"y",(function(){return s})),i.d(e,"x",(function(){return l})),i.d(e,"A",(function(){return a})),i.d(e,"B",(function(){return c})),i.d(e,"K",(function(){return d})),i.d(e,"L",(function(){return u})),i.d(e,"N",(function(){return h})),i.d(e,"M",(function(){return f})),i.d(e,"D",(function(){return p})),i.d(e,"C",(function(){return b})),i.d(e,"H",(function(){return g})),i.d(e,"G",(function(){return v})),i.d(e,"F",(function(){return y})),i.d(e,"E",(function(){return m})),i.d(e,"J",(function(){return O})),i.d(e,"I",(function(){return w})),i.d(e,"T",(function(){return j})),i.d(e,"S",(function(){return C})),i.d(e,"P",(function(){return _})),i.d(e,"R",(function(){return k})),i.d(e,"O",(function(){return x})),i.d(e,"U",(function(){return $})),i.d(e,"Q",(function(){return S})),i.d(e,"g",(function(){return P})),i.d(e,"f",(function(){return I})),i.d(e,"e",(function(){return T})),i.d(e,"h",(function(){return B})),i.d(e,"d",(function(){return E})),i.d(e,"j",(function(){return D})),i.d(e,"i",(function(){return H})),i.d(e,"o",(function(){return q})),i.d(e,"n",(function(){return F})),i.d(e,"p",(function(){return N})),i.d(e,"r",(function(){return L})),i.d(e,"q",(function(){return z})),i.d(e,"m",(function(){return A})),i.d(e,"u",(function(){return R})),i.d(e,"v",(function(){return V})),i.d(e,"t",(function(){return M})),i.d(e,"s",(function(){return G})),i.d(e,"w",(function(){return U})),i.d(e,"b",(function(){return Y})),i.d(e,"c",(function(){return Q})),i.d(e,"a",(function(){return W}));const n="mark",r="measure",o="snippet-view-app-start",s="snippet-edit-app-start",l="snippet-blobs-content-finished",a="snippet-blobs-content",c="webide-app-start",d="webide-file-clicked",u="webide-file-finished",h="webide-init-editor-start",f="webide-init-editor-finish",p="webide-getBranchData-start",b="webide-getBranchData-finish",g="webide-getFileData-start",v="webide-getFileData-finish",y="webide-getFiles-start",m="webide-getFiles-finish",O="webide-getProjectData-start",w="webide-getProjectData-finish",j="webide-file-loading-after-interaction",C="WebIDE: Project data",_="WebIDE: Branch data",k="WebIDE: File data",x="WebIDE: Before Vue app",$="WebIDE: Repo Editor",S="WebIDE: Fetch Files",P="mr-diffs-mark-file-tree-start",I="mr-diffs-mark-file-tree-end",T="mr-diffs-mark-diff-files-start",B="mr-diffs-mark-first-diff-file-shown",E="mr-diffs-mark-diff-files-end",D="mr-diffs-measure-file-tree-done",H="mr-diffs-measure-diff-files-done",q="pipelines-detail-links-mark-calculate-start",F="pipelines-detail-links-mark-calculate-end",N="Pipelines Detail Graph: Links Calculation",L="pipeline_graph_link_calculation_duration_seconds",z="pipeline_graph_links_total",A="pipeline_graph_links_per_job_ratio",R="blobviewer-load-viewer-start",V="blobviewer-switch-to-viewerr-start",M="blobviewer-load-viewer-finish",G="Repository File Viewer: loading the viewer",U="Repository File Viewer: switching the viewer",Y="design-app-start",Q="Design Management: Before the Vue app",W="Design Management: Single image preview"},MZHJ:function(t,e,i){"use strict";i.d(e,"a",(function(){return h}));var n=i("Z2pp"),r=i("DQ7i"),o=i("jyii"),s=i("/Zha"),l=i("gCUY"),a=i("BhOj"),c=i("G55H"),d=i("mYXc");var u=Object(l.c)({content:{type:String,default:"&times;"},disabled:{type:Boolean,default:!1},ariaLabel:{type:String,default:"Close"},textVariant:{type:String}},o.f),h=n.a.extend({name:o.f,functional:!0,props:u,render:function(t,e){var i,n,o,l=e.props,u=e.data,h=e.slots,f=e.scopedSlots,p=h(),b=f||{},g={staticClass:"close",class:(i={},n="text-".concat(l.textVariant),o=l.textVariant,n in i?Object.defineProperty(i,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):i[n]=o,i),attrs:{type:"button",disabled:l.disabled,"aria-label":l.ariaLabel?String(l.ariaLabel):null},on:{click:function(t){l.disabled&&Object(c.d)(t)&&Object(a.d)(t)}}};return Object(d.a)(s.c,b,p)||(g.domProps={innerHTML:l.content}),t("button",Object(r.a)(u,g),Object(d.b)(s.c,{},b,p))}})},OkMp:function(t,e,i){"use strict";var n=i("+iVy"),r=i("qx9o"),o=i("Fcvx");const s={computed:{buttonSize(){return o.m[this.size]}}};var l=i("cuRJ"),a=i("H8gz"),c=i("zLBL"),d=i("OqKX"),u=i("6IRw"),h=i.n(u);const f=".dropdown-item:not(.disabled):not([disabled]),.form-control:not(.disabled):not([disabled])";const p={components:{BDropdown:{extends:n.a,methods:{getItems(){return(Object(r.D)(f,this.$refs.menu)||[]).filter(r.u)}}},GlButton:l.a,GlDropdownDivider:d.a,GlIcon:a.a,GlLoadingIcon:c.a},mixins:[s],props:{headerText:{type:String,required:!1,default:""},hideHeaderBorder:{type:Boolean,required:!1,default:!0},showClearAll:{type:Boolean,required:!1,default:!1},clearAllText:{type:String,required:!1,default:"Clear all"},clearAllTextClass:{type:String,required:!1,default:"gl-px-5"},text:{type:String,required:!1,default:""},showHighlightedItemsTitle:{type:Boolean,required:!1,default:!1},highlightedItemsTitle:{type:String,required:!1,default:"Selected"},highlightedItemsTitleClass:{type:String,required:!1,default:"gl-px-5"},textSrOnly:{type:Boolean,required:!1,default:!1},split:{type:Boolean,required:!1,default:!1},category:{type:String,required:!1,default:o.k.primary,validator:t=>Object.keys(o.k).includes(t)},variant:{type:String,required:!1,default:o.r.default,validator:t=>Object.keys(o.r).includes(t)},size:{type:String,required:!1,default:o.l.medium,validator:t=>Object.keys(o.l).includes(t)},icon:{type:String,required:!1,default:null},block:{type:Boolean,required:!1,default:!1},disabled:{type:Boolean,required:!1,default:!1},loading:{type:Boolean,required:!1,default:!1},toggleClass:{type:[String,Array,Object],required:!1,default:null},right:{type:Boolean,required:!1,default:!1}},computed:{renderCaret(){return!this.split},isIconOnly(){var t;return Boolean(this.icon&&(!(null!==(t=this.text)&&void 0!==t&&t.length)||this.textSrOnly)&&!this.hasSlotContents("button-text"))},isIconWithText(){var t;return Boolean(this.icon&&(null===(t=this.text)||void 0===t?void 0:t.length)&&!this.textSrOnly)},toggleButtonClasses(){return[this.toggleClass,{"gl-button":!0,"gl-dropdown-toggle":!0,[`btn-${this.variant}-secondary`]:this.category===o.k.secondary||this.category===o.k.tertiary&&this.split,[`btn-${this.variant}-tertiary`]:this.category===o.k.tertiary&&!this.split,"dropdown-icon-only":this.isIconOnly,"dropdown-icon-text":this.isIconWithText}]},splitButtonClasses(){return[this.toggleClass,{"gl-button":!0,"split-content-button":Boolean(this.text),"icon-split-content-button":Boolean(this.icon),[`btn-${this.variant}-secondary`]:this.category===o.k.secondary||this.category===o.k.tertiary}]},buttonText(){return this.split&&this.icon?null:this.text},hasHighlightedItemsContent(){return this.hasSlotContents("highlighted-items")},hasHighlightedItemsOrClearAll(){return this.hasHighlightedItemsContent&&this.showHighlightedItemsTitle||this.showClearAll}},methods:{hasSlotContents(t){return Boolean(this.$slots[t])},show(){this.$refs.dropdown.show(...arguments)},hide(){this.$refs.dropdown.hide(...arguments)}}};const b=h()({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-dropdown",t._g(t._b({ref:"dropdown",staticClass:"gl-new-dropdown",attrs:{split:t.split,variant:t.variant,size:t.buttonSize,"toggle-class":[t.toggleButtonClasses],"split-class":t.splitButtonClasses,block:t.block,disabled:t.disabled||t.loading,right:t.right},scopedSlots:t._u([{key:"button-content",fn:function(){return[t._t("button-content",[t.loading?i("gl-loading-icon",{class:{"gl-mr-2":!t.isIconOnly}}):t._e(),t._v(" "),!t.icon||t.isIconOnly&&t.loading?t._e():i("gl-icon",{staticClass:"dropdown-icon",attrs:{name:t.icon}}),t._v(" "),i("span",{staticClass:"gl-new-dropdown-button-text",class:{"gl-sr-only":t.textSrOnly}},[t._t("button-text",[t._v(t._s(t.buttonText))])],2),t._v(" "),t.renderCaret?i("gl-icon",{staticClass:"gl-button-icon dropdown-chevron",attrs:{name:"chevron-down"}}):t._e()])]},proxy:!0}],null,!0)},"b-dropdown",t.$attrs,!1),t.$listeners),[i("div",{staticClass:"gl-new-dropdown-inner"},[t.hasSlotContents("header")||t.headerText?i("div",{staticClass:"gl-new-dropdown-header",class:{"gl-border-b-0!":t.hideHeaderBorder}},[t.headerText?i("p",{staticClass:"gl-new-dropdown-header-top"},[t._v("\n        "+t._s(t.headerText)+"\n      ")]):t._e(),t._v(" "),t._t("header")],2):t._e(),t._v(" "),t.hasHighlightedItemsOrClearAll?i("div",{staticClass:"gl-display-flex gl-flex-direction-row gl-justify-content-space-between gl-align-items-center"},[t.hasHighlightedItemsContent&&t.showHighlightedItemsTitle?i("div",{staticClass:"gl-display-flex gl-flex-grow-1 gl-justify-content-flex-start",class:t.highlightedItemsTitleClass},[i("span",{staticClass:"gl-font-weight-bold",attrs:{"data-testid":"highlighted-items-title"}},[t._v(t._s(t.highlightedItemsTitle))])]):t._e(),t._v(" "),t.showClearAll?i("div",{staticClass:"gl-display-flex gl-flex-grow-1 gl-justify-content-end",class:t.clearAllTextClass},[i("gl-button",{attrs:{size:"small",category:"tertiary",variant:"link","data-testid":"clear-all-button"},on:{click:function(e){return t.$emit("clear-all",e)}}},[t._v(t._s(t.clearAllText))])],1):t._e()]):t._e(),t._v(" "),i("div",{staticClass:"gl-new-dropdown-contents"},[t.hasHighlightedItemsContent?i("div",{staticClass:"gl-overflow-visible",attrs:{"data-testid":"highlighted-items"}},[t._t("highlighted-items"),t._v(" "),i("gl-dropdown-divider")],2):t._e(),t._v(" "),t._t("default")],2),t._v(" "),t.hasSlotContents("footer")?i("div",{staticClass:"gl-new-dropdown-footer"},[t._t("footer")],2):t._e()])])},staticRenderFns:[]},void 0,p,void 0,!1,void 0,!1,void 0,void 0,void 0);e.a=b},OqKX:function(t,e,i){"use strict";var n=i("Z2pp"),r=i("DQ7i"),o=i("jyii"),s=i("gCUY");function l(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function a(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?l(Object(i),!0).forEach((function(e){c(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function c(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var d=Object(s.c)({tag:{type:String,default:"hr"}},o.n),u=n.a.extend({name:o.n,functional:!0,props:d,render:function(t,e){var i=e.props,n=e.data,o=n.attrs||{};return n.attrs={},t("li",Object(r.a)(n,{attrs:{role:"presentation"}}),[t(i.tag,{staticClass:"dropdown-divider",attrs:a(a({},o),{},{role:"separator","aria-orientation":"horizontal"}),ref:"divider"})])}}),h=i("6IRw");const f={components:{BDropdownDivider:u},inheritAttrs:!1};const p=i.n(h)()({render:function(){var t=this.$createElement;return(this._self._c||t)("b-dropdown-divider",this._g(this._b({staticClass:"gl-new-dropdown-divider"},"b-dropdown-divider",this.$attrs,!1),this.$listeners))},staticRenderFns:[]},void 0,f,void 0,!1,void 0,!1,void 0,void 0,void 0);e.a=p},SYh6:function(t,e,i){"use strict";i("N8nX"),i("c5nz"),i("OZcL"),i("x5O4"),i("lxnW"),i("5sVn"),i("4xRc"),i("LM9r"),i("51O6"),i("une/"),i("Kypc"),i("yt6R"),i("6v3E"),i("RsOv"),i("ujLG"),i("3R5X"),i("HaUQ"),i("JHu5"),i("XUYm");class n{constructor(){this.$_all=new Map}dispose(){this.$_all.clear()}$on(t,e){const i=this.$_all.get(t);i&&i.push(e)||this.$_all.set(t,[e])}$off(t,e){const i=this.$_all.get(t)||[],n=e?i.filter((function(t){return t!==e})):[];n.length?this.$_all.set(t,n):this.$_all.delete(t)}$once(t,e){var i=this;const n=function(){i.$off(t,n),e(...arguments)};this.$on(t,n)}$emit(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];(this.$_all.get(t)||[]).forEach((function(t){t(...i)}))}}e.a=function(){return new n}},g34G:function(t,e,i){"use strict";var n=i("qx9o"),r=i("iryQ");function o(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function s(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}e.a=function(t,e,i){if(t=t?t.$el||t:null,!Object(n.s)(t))return null;if(Object(r.b)("observeDom"))return null;var l=new n.a((function(t){for(var i=!1,n=0;n<t.length&&!i;n++){var r=t[n],o=r.type,s=r.target;"characterData"===o&&s.nodeType===Node.TEXT_NODE?i=!0:"attributes"===o?i=!0:"childList"===o&&(r.addedNodes.length>0||r.removedNodes.length>0)&&(i=!0)}i&&e()}));return l.observe(t,function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?o(Object(i),!0).forEach((function(e){s(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({childList:!0,subtree:!0},i)),l}},"w+qJ":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));i("JHu5"),i("3R5X"),i("XUYm");const n=function(){let{mark:t,measures:e=[]}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};window.requestAnimationFrame((function(){t&&!performance.getEntriesByName(t).length&&performance.mark(t),e.forEach((function(t){performance.measure(t.name,t.start,t.end)}))}))}},yxQL:function(t,e,i){"use strict";i.d(e,"b",(function(){return _}));var n=i("ZOY3"),r=i("jyii"),o=i("ryFn"),s=i("ioEp"),l=i("gCUY"),a=i("qx9o"),c=i("BhOj"),d=i("G55H"),u=i("9Q7u"),h=i("gHjZ"),f=i("iryQ"),p=i("UVyR"),b={data:function(){return{listenForClickOut:!1}},watch:{listenForClickOut:function(t,e){t!==e&&(Object(c.a)(this.clickOutElement,this.clickOutEventName,this._clickOutHandler,p.a),t&&Object(c.b)(this.clickOutElement,this.clickOutEventName,this._clickOutHandler,p.a))}},beforeCreate:function(){this.clickOutElement=null,this.clickOutEventName=null},mounted:function(){this.clickOutElement||(this.clickOutElement=document),this.clickOutEventName||(this.clickOutEventName="click"),this.listenForClickOut&&Object(c.b)(this.clickOutElement,this.clickOutEventName,this._clickOutHandler,p.a)},beforeDestroy:function(){Object(c.a)(this.clickOutElement,this.clickOutEventName,this._clickOutHandler,p.a)},methods:{isClickOut:function(t){return!Object(a.f)(this.$el,t.target)},_clickOutHandler:function(t){this.clickOutHandler&&this.isClickOut(t)&&this.clickOutHandler(t)}}},g={data:function(){return{listenForFocusIn:!1}},watch:{listenForFocusIn:function(t,e){t!==e&&(Object(c.a)(this.focusInElement,"focusin",this._focusInHandler,p.a),t&&Object(c.b)(this.focusInElement,"focusin",this._focusInHandler,p.a))}},beforeCreate:function(){this.focusInElement=null},mounted:function(){this.focusInElement||(this.focusInElement=document),this.listenForFocusIn&&Object(c.b)(this.focusInElement,"focusin",this._focusInHandler,p.a)},beforeDestroy:function(){Object(c.a)(this.focusInElement,"focusin",this._focusInHandler,p.a)},methods:{_focusInHandler:function(t){this.focusInHandler&&this.focusInHandler(t)}}},v=i("1pIC");function y(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function m(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?y(Object(i),!0).forEach((function(e){O(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):y(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function O(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var w="".concat("bv::dropdown::","shown"),j="".concat("bv::dropdown::","hidden"),C=[".dropdown-item",".b-dropdown-form"].map((function(t){return"".concat(t,":not(.disabled):not([disabled])")})).join(", "),_=m(m({},Object(l.c)({dropup:{type:Boolean,default:!1},dropright:{type:Boolean,default:!1},dropleft:{type:Boolean,default:!1},right:{type:Boolean,default:!1},offset:{type:[Number,String],default:0},noFlip:{type:Boolean,default:!1},popperOpts:{type:Object,default:function(){}},boundary:{type:[String,h.b],default:"scrollParent"}},r.m)),Object(l.c)({disabled:{type:Boolean,default:!1}},r.m));e.a={mixins:[v.a,b,g],provide:function(){return{bvDropdown:this}},inject:{bvNavbar:{default:null}},props:_,data:function(){return{visible:!1,visibleChangePrevented:!1}},computed:{inNavbar:function(){return!Object(d.f)(this.bvNavbar)},toggler:function(){var t=this.$refs.toggle;return t?t.$el||t:null},directionClass:function(){return this.dropup?"dropup":this.dropright?"dropright":this.dropleft?"dropleft":""},boundaryClass:function(){return"scrollParent"===this.boundary||this.inNavbar?"":"position-static"}},watch:{visible:function(t,e){if(this.visibleChangePrevented)this.visibleChangePrevented=!1;else if(t!==e){var i=t?"show":"hide",n=new s.a(i,{cancelable:!0,vueTarget:this,target:this.$refs.menu,relatedTarget:null,componentId:this.safeId?this.safeId():this.id||null});if(this.emitEvent(n),n.defaultPrevented)return this.visibleChangePrevented=!0,this.visible=e,void this.$off("hidden",this.focusToggler);"show"===i?this.showMenu():this.hideMenu()}},disabled:function(t,e){t!==e&&t&&this.visible&&(this.visible=!1)}},created:function(){this.$_popper=null,this.$_hideTimeout=null},deactivated:function(){this.visible=!1,this.whileOpenListen(!1),this.destroyPopper()},beforeDestroy:function(){this.visible=!1,this.whileOpenListen(!1),this.destroyPopper(),this.clearHideTimeout()},methods:{emitEvent:function(t){var e=t.type;this.$emit(e,t),this.$root.$emit("".concat("bv::dropdown::").concat(e),t)},showMenu:function(){var t=this;if(!this.disabled){if(!this.inNavbar)if(void 0===n.default)Object(f.a)("Popper.js not found. Falling back to CSS positioning",r.m);else{var e=this.dropup&&this.right||this.split?this.$el:this.$refs.toggle;e=e.$el||e,this.createPopper(e)}this.$root.$emit(w,this),this.whileOpenListen(!0),this.$nextTick((function(){t.focusMenu(),t.$emit("shown")}))}},hideMenu:function(){this.whileOpenListen(!1),this.$root.$emit(j,this),this.$emit("hidden"),this.destroyPopper()},createPopper:function(t){this.destroyPopper(),this.$_popper=new n.default(t,this.$refs.menu,this.getPopperConfig())},destroyPopper:function(){this.$_popper&&this.$_popper.destroy(),this.$_popper=null},updatePopper:function(){try{this.$_popper.scheduleUpdate()}catch(t){}},clearHideTimeout:function(){clearTimeout(this.$_hideTimeout),this.$_hideTimeout=null},getPopperConfig:function(){var t="bottom-start";this.dropup?t=this.right?"top-end":"top-start":this.dropright?t="right-start":this.dropleft?t="left-start":this.right&&(t="bottom-end");var e={placement:t,modifiers:{offset:{offset:this.offset||0},flip:{enabled:!this.noFlip}}},i=this.boundary;return i&&(e.modifiers.preventOverflow={boundariesElement:i}),Object(u.i)(e,this.popperOpts||{})},whileOpenListen:function(t){this.listenForClickOut=t,this.listenForFocusIn=t;var e=t?"$on":"$off";this.$root[e](w,this.rootCloseListener)},rootCloseListener:function(t){t!==this&&(this.visible=!1)},show:function(){var t=this;this.disabled||Object(a.B)((function(){t.visible=!0}))},hide:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.disabled||(this.visible=!1,t&&this.$once("hidden",this.focusToggler))},toggle:function(t){var e=t=t||{},i=e.type,n=e.keyCode;("click"===i||"keydown"===i&&-1!==[o.c,o.h,o.a].indexOf(n))&&(this.disabled?this.visible=!1:(this.$emit("toggle",t),Object(c.d)(t),this.visible?this.hide(!0):this.show()))},onMousedown:function(t){Object(c.d)(t,{propagation:!1})},onKeydown:function(t){var e=t.keyCode;e===o.d?this.onEsc(t):e===o.a?this.focusNext(t,!1):e===o.i&&this.focusNext(t,!0)},onEsc:function(t){this.visible&&(this.visible=!1,Object(c.d)(t),this.$once("hidden",this.focusToggler))},onSplitClick:function(t){this.disabled?this.visible=!1:this.$emit("click",t)},hideHandler:function(t){var e=this,i=t.target;!this.visible||Object(a.f)(this.$refs.menu,i)||Object(a.f)(this.toggler,i)||(this.clearHideTimeout(),this.$_hideTimeout=setTimeout((function(){return e.hide()}),this.inNavbar?300:0))},clickOutHandler:function(t){this.hideHandler(t)},focusInHandler:function(t){this.hideHandler(t)},focusNext:function(t,e){var i=this,n=t.target;!this.visible||t&&Object(a.e)(".dropdown form",n)||(Object(c.d)(t),this.$nextTick((function(){var t=i.getItems();if(!(t.length<1)){var r=t.indexOf(n);e&&r>0?r--:!e&&r<t.length-1&&r++,r<0&&(r=0),i.focusItem(r,t)}})))},focusItem:function(t,e){var i=e.find((function(e,i){return i===t}));Object(a.d)(i)},getItems:function(){return(Object(a.D)(C,this.$refs.menu)||[]).filter(a.u)},focusMenu:function(){Object(a.d)(this.$refs.menu)},focusToggler:function(){var t=this;this.$nextTick((function(){Object(a.d)(t.toggler)}))}}}}}]);
//# sourceMappingURL=commons-pages.projects.blob.show-pages.projects.show-pages.projects.snippets.edit-pages.projects.sni-dd84f7c7.0b5098f8.chunk.js.map