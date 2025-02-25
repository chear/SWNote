(this.webpackJsonp=this.webpackJsonp||[]).push([[228],{"+/NG":function(e,t,i){"use strict";i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return r}));i("JHu5"),i("3R5X"),i("XUYm");var n=i("yYHy");const a=function(e,t){document.querySelectorAll(e).forEach((function(e){return e.classList.toggle("hidden",!t)}))},r=function(e,t,i){const a=document.querySelector(e);a&&(a.action=Object(n.x)(t,i))}},"6Y0j":function(e,t){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"getReadme"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"url"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"readme"},arguments:[{kind:"Argument",name:{kind:"Name",value:"url"},value:{kind:"Variable",name:{kind:"Name",value:"url"}}}],directives:[{kind:"Directive",name:{kind:"Name",value:"client"},arguments:[]}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"html"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:78}};i.loc.source={body:"query getReadme($url: String!) {\n  readme(url: $url) @client {\n    html\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var n={};function a(e,t){for(var i=0;i<e.definitions.length;i++){var n=e.definitions[i];if(n.name&&n.name.value==t)return n}}i.definitions.forEach((function(e){if(e.name){var t=new Set;!function e(t,i){if("FragmentSpread"===t.kind)i.add(t.name.value);else if("VariableDefinition"===t.kind){var n=t.type;"NamedType"===n.kind&&i.add(n.name.value)}t.selectionSet&&t.selectionSet.selections.forEach((function(t){e(t,i)})),t.variableDefinitions&&t.variableDefinitions.forEach((function(t){e(t,i)})),t.definitions&&t.definitions.forEach((function(t){e(t,i)}))}(e,t),n[e.name.value]=t}})),e.exports=i,e.exports.getReadme=function(e,t){var i={kind:e.kind,definitions:[a(e,t)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var r=n[t]||new Set,o=new Set,l=new Set;for(r.forEach((function(e){l.add(e)}));l.size>0;){var s=l;l=new Set,s.forEach((function(e){o.has(e)||(o.add(e),(n[e]||new Set).forEach((function(e){l.add(e)})))}))}return o.forEach((function(t){var n=a(e,t);n&&i.definitions.push(n)})),i}(i,"getReadme")},"9WGj":function(e,t,i){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"getCommit"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"fileName"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"type"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"path"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"maxOffset"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Number"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"commit"},arguments:[{kind:"Argument",name:{kind:"Name",value:"path"},value:{kind:"Variable",name:{kind:"Name",value:"path"}}},{kind:"Argument",name:{kind:"Name",value:"fileName"},value:{kind:"Variable",name:{kind:"Name",value:"fileName"}}},{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}},{kind:"Argument",name:{kind:"Name",value:"maxOffset"},value:{kind:"Variable",name:{kind:"Name",value:"maxOffset"}}}],directives:[{kind:"Directive",name:{kind:"Name",value:"client"},arguments:[]}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TreeEntryCommit"},directives:[]}]}}]}}],loc:{start:0,end:274}};n.loc.source={body:'#import "ee_else_ce/repository/queries/commit.fragment.graphql"\n\nquery getCommit($fileName: String!, $type: String!, $path: String!, $maxOffset: Number!) {\n  commit(path: $path, fileName: $fileName, type: $type, maxOffset: $maxOffset) @client {\n    ...TreeEntryCommit\n  }\n}\n',name:"GraphQL request",locationOffset:{line:1,column:1}};var a={};n.definitions=n.definitions.concat(i("OZ91").definitions.filter((function(e){if("FragmentDefinition"!==e.kind)return!0;var t=e.name.value;return!a[t]&&(a[t]=!0,!0)})));var r={};function o(e,t){for(var i=0;i<e.definitions.length;i++){var n=e.definitions[i];if(n.name&&n.name.value==t)return n}}n.definitions.forEach((function(e){if(e.name){var t=new Set;!function e(t,i){if("FragmentSpread"===t.kind)i.add(t.name.value);else if("VariableDefinition"===t.kind){var n=t.type;"NamedType"===n.kind&&i.add(n.name.value)}t.selectionSet&&t.selectionSet.selections.forEach((function(t){e(t,i)})),t.variableDefinitions&&t.variableDefinitions.forEach((function(t){e(t,i)})),t.definitions&&t.definitions.forEach((function(t){e(t,i)}))}(e,t),r[e.name.value]=t}})),e.exports=n,e.exports.getCommit=function(e,t){var i={kind:e.kind,definitions:[o(e,t)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var n=r[t]||new Set,a=new Set,l=new Set;for(n.forEach((function(e){l.add(e)}));l.size>0;){var s=l;l=new Set,s.forEach((function(e){a.has(e)||(a.add(e),(r[e]||new Set).forEach((function(e){l.add(e)})))}))}return a.forEach((function(t){var n=o(e,t);n&&i.definitions.push(n)})),i}(n,"getCommit")},BLrG:function(e,t,i){"use strict";var n=i("U1Ws");t.a={methods:{timeFormatted:e=>Object(n.D)().format(e,n.eb),tooltipTitle:e=>Object(n.q)(e)}}},Hoxe:function(e,t,i){var n=i("MfoV"),a=/[\\^$.*+?()[\]{}|]/g,r=RegExp(a.source);e.exports=function(e){return(e=n(e))&&r.test(e)?e.replace(a,"\\$&"):e}},JBkr:function(e,t,i){"use strict";var n=i("odYa"),a=i.n(n),r=i("6IRw"),o=i.n(r);const l=a()(e=>new IntersectionObserver(e=>{e.forEach(e=>{e.target.$_gl_intersectionHandler(e)})},e||{}));const s={name:"GlIntersectionObserver",props:{options:{type:Object,required:!1,default:null}},mounted(){const e=l(this.options);this.$el.$_gl_intersectionHandler=e=>{this.$emit("update",e),e.isIntersecting?this.$emit("appear"):this.$emit("disappear")},this.$el.$_gl_intersectionObserver=e,e.observe(this.$el)},destroyed(){this.$el.$_gl_intersectionObserver.unobserve(this.$el),delete this.$el.$_gl_intersectionHandler,delete this.$el.$_gl_intersectionObserver},getObserver:l};const d=o()({render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._t("default")],2)},staticRenderFns:[]},void 0,s,void 0,!1,void 0,!1,void 0,void 0,void 0);t.a=d},LcVr:function(e,t,i){"use strict";var n=i("ly/8"),a=i("BLrG"),r=(i("U1Ws"),{directives:{GlTooltip:n.a},mixins:[a.a],props:{time:{type:[String,Number],required:!0},tooltipPlacement:{type:String,required:!1,default:"top"},cssClass:{type:String,required:!1,default:""}},computed:{timeAgo(){return this.timeFormatted(this.time)}}}),o=i("bPvS"),l=Object(o.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("time",{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip.viewport",value:{placement:e.tooltipPlacement},expression:"{ placement: tooltipPlacement }",modifiers:{viewport:!0}}],class:e.cssClass,attrs:{title:e.tooltipTitle(e.time),datetime:e.time}},[e._t("default",[e._v(e._s(e.timeAgo))],{timeAgo:e.timeAgo})],2)}),[],!1,null,null,null);t.a=l.exports},M96W:function(e,t){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"getProjectPath"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectPath"},arguments:[],directives:[{kind:"Directive",name:{kind:"Name",value:"client"},arguments:[]}]}]}}],loc:{start:0,end:47}};i.loc.source={body:"query getProjectPath {\n  projectPath @client\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var n={};function a(e,t){for(var i=0;i<e.definitions.length;i++){var n=e.definitions[i];if(n.name&&n.name.value==t)return n}}i.definitions.forEach((function(e){if(e.name){var t=new Set;!function e(t,i){if("FragmentSpread"===t.kind)i.add(t.name.value);else if("VariableDefinition"===t.kind){var n=t.type;"NamedType"===n.kind&&i.add(n.name.value)}t.selectionSet&&t.selectionSet.selections.forEach((function(t){e(t,i)})),t.variableDefinitions&&t.variableDefinitions.forEach((function(t){e(t,i)})),t.definitions&&t.definitions.forEach((function(t){e(t,i)}))}(e,t),n[e.name.value]=t}})),e.exports=i,e.exports.getProjectPath=function(e,t){var i={kind:e.kind,definitions:[a(e,t)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var r=n[t]||new Set,o=new Set,l=new Set;for(r.forEach((function(e){l.add(e)}));l.size>0;){var s=l;l=new Set,s.forEach((function(e){o.has(e)||(o.add(e),(n[e]||new Set).forEach((function(e){l.add(e)})))}))}return o.forEach((function(t){var n=a(e,t);n&&i.definitions.push(n)})),i}(i,"getProjectPath")},OZ91:function(e,t){var i={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TreeEntryCommit"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"LogTreeCommit"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sha"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"message"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"titleHtml"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"committedDate"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"commitPath"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"fileName"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"filePath"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"type"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"lockLabel"},arguments:[],directives:[]}]}}],loc:{start:0,end:144}};i.loc.source={body:"fragment TreeEntryCommit on LogTreeCommit {\n  sha\n  message\n  titleHtml\n  committedDate\n  commitPath\n  fileName\n  filePath\n  type\n  lockLabel\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var n={};function a(e,t){for(var i=0;i<e.definitions.length;i++){var n=e.definitions[i];if(n.name&&n.name.value==t)return n}}i.definitions.forEach((function(e){if(e.name){var t=new Set;!function e(t,i){if("FragmentSpread"===t.kind)i.add(t.name.value);else if("VariableDefinition"===t.kind){var n=t.type;"NamedType"===n.kind&&i.add(n.name.value)}t.selectionSet&&t.selectionSet.selections.forEach((function(t){e(t,i)})),t.variableDefinitions&&t.variableDefinitions.forEach((function(t){e(t,i)})),t.definitions&&t.definitions.forEach((function(t){e(t,i)}))}(e,t),n[e.name.value]=t}})),e.exports=i,e.exports.TreeEntryCommit=function(e,t){var i={kind:e.kind,definitions:[a(e,t)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var r=n[t]||new Set,o=new Set,l=new Set;for(r.forEach((function(e){l.add(e)}));l.size>0;){var s=l;l=new Set,s.forEach((function(e){o.has(e)||(o.add(e),(n[e]||new Set).forEach((function(e){l.add(e)})))}))}return o.forEach((function(t){var n=a(e,t);n&&i.definitions.push(n)})),i}(i,"TreeEntryCommit")},TIcb:function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));i("uHfJ"),i("R0RX");function n(e,t){return function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};return e.map((function(e){return{sha:e.commit.id,message:e.commit.message,titleHtml:e.commit_title_html,committedDate:e.commit.committed_date,commitPath:e.commit_path,fileName:e.file_name,filePath:`${t}/${e.file_name}`,type:e.type,__typename:"LogTreeCommit",...i(e)}}))}(e,t,(function(e){return{lockLabel:e.lock_label||!1}}))}},bMec:function(e,t,i){"use strict";i.d(t,"a",(function(){return ve}));var n=i("Hoxe"),a=i.n(n),r=(i("AfGZ"),i("h8Et"),i("q+nE")),o=i("rP6D"),l=i("yYHy"),s=(i("JHu5"),i("3R5X"),i("XUYm"),i("+tbm")),d=i("G00o"),c={components:{BlobContentViewer:s.a},beforeRouteEnter(e,t,i){i((function(e){let{$options:t}=e;t.limitedContainerElements.forEach((function(e){return e.classList.remove(d.i)}))}))},beforeRouteLeave(e,t,i){this.$options.limitedContainerElements.forEach((function(e){return e.classList.add(d.i)})),i()},props:{path:{type:String,required:!0},projectPath:{type:String,required:!0}},limitedContainerElements:document.querySelectorAll(`.${d.i}`)},m=i("bPvS"),u=Object(m.a)(c,(function(){var e=this.$createElement;return(this._self._c||e)("blob-content-viewer",{attrs:{path:this.path,"project-path":this.projectPath}})}),[],!1,null,null,null).exports,h=i("+/NG"),p=(i("0no1"),i("gdbl"),i("WmlO"),i("W9Nl"),i("hyA4")),f=i.n(p),v=i("teVv"),g=i("Zxcm"),k=i("t9l/"),b=i("e9rI"),y=i("M96W"),S=i.n(y);const N=["index","readme"],_=["ad","adoc","asciidoc","creole","markdown","md","mdown","mediawiki","mkd","mkdn","org","rdoc","rst","textile","wiki"],w=function(e){return new RegExp(`^(${N.join("|")})\\.(${_.join("|")})$`,"i").test(e.name)},P=function(e){return new RegExp(`^(${N.join("|")})(\\.txt)?$`,"i").test(e.name)};var j=i("mphk"),E=i("TIcb");let F=[],O=[];const C=function(e){return F.includes(e)},$=function(){F=[],O=[]},x=async function(e,t,i,n){if(C(n))return[];return Array.from(Array(d.a)).forEach((function(e,t){return function(e){C(e)||e<0||F.push(e)}(n+t)})),await function(e,t,i,n){if(O.includes(n)||n<0)return[];O.push(n);const a=Object(l.x)(gon.relative_url_root||"/",e,"/-/refs/",i,"/logs_tree/",encodeURIComponent(function(e){return e.replace(/^\//,"")}(t)));return j.a.get(a,{params:{format:"json",offset:n}}).then((function(e){let{data:i}=e;return Object(E.a)(i,t)})).catch((function(){return Object(v.default)({message:d.f})}))}(e,t,i,n)};var T=i("H8gz"),D=i("u1ru"),L=i("zLBL"),q=i("9LGn"),R=i("6oy4"),V=i.n(R),A=(i("Skdl"),i("oj/M")),G=i("6Y0j"),I={apollo:{readme:{query:i.n(G).a,variables(){return{url:this.blob.webPath}},loadingKey:"loading"}},components:{GlIcon:T.a,GlLink:D.a,GlLoadingIcon:L.a},directives:{SafeHtml:q.a},props:{blob:{type:Object,required:!0}},data:()=>({readme:null,loading:0}),watch:{readme(e){var t=this;e&&this.$nextTick((function(){Object(A.r)(),V()(t.$refs.readme).renderGFM()}))}},safeHtmlConfig:{ADD_TAGS:["copy-code"]}},H=Object(m.a)(I,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("article",{staticClass:"file-holder limited-width-container readme-holder"},[i("div",{staticClass:"js-file-title file-title-flex-parent"},[i("div",{staticClass:"file-header-content"},[i("gl-icon",{attrs:{name:"doc-text"}}),e._v(" "),i("gl-link",{attrs:{href:e.blob.webPath}},[i("strong",[e._v(e._s(e.blob.name))])])],1)]),e._v(" "),i("div",{staticClass:"blob-viewer",attrs:{"data-qa-selector":"blob_viewer_content",itemprop:"about"}},[e.loading>0?i("gl-loading-icon",{staticClass:"my-4 mx-auto",attrs:{size:"lg",color:"dark"}}):e.readme?i("div",{directives:[{name:"safe-html",rawName:"v-safe-html:[$options.safeHtmlConfig]",value:e.readme.html,expression:"readme.html",arg:e.$options.safeHtmlConfig}],ref:"readme"}):e._e()],1)])}),[],!1,null,null,null).exports,z=i("Fj12"),B=i("cuRJ"),U=Object(m.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("thead",[i("tr",[i("th",{attrs:{id:"name",scope:"col"}},[e._v(e._s(e.s__("ProjectFileTree|Name")))]),e._v(" "),i("th",{staticClass:"d-none d-sm-table-cell",attrs:{id:"last-commit",scope:"col"}},[e._v(e._s(e.__("Last commit")))]),e._v(" "),i("th",{staticClass:"text-right",attrs:{id:"last-update",scope:"col"}},[e._v(e._s(e.__("Last update")))])])])}),[],!1,null,null,null).exports,M=(i("uHfJ"),i("R0RX"),i("ly/8")),J={components:{GlLoadingIcon:L.a},directives:{GlTooltip:M.a},props:{commitRef:{type:String,required:!0},path:{type:String,required:!0},loadingPath:{type:String,required:!1,default:null}},computed:{parentPath(){const e=this.path.split("/");return e.pop(),e.map((function(e){return encodeURIComponent(e)})).join("/")},parentRoute(){return{path:`/-/tree/${this.commitRef}/${this.parentPath}`}}},methods:{clickRow(){this.$router.push(this.parentRoute)}}},Q=Object(m.a)(J,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("tr",{staticClass:"tree-item"},[i("td",{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip.left.viewport",modifiers:{left:!0,viewport:!0}}],staticClass:"tree-item-file-name",attrs:{title:e.__("Go to parent directory"),colspan:"3"},on:{click:function(t){return t.target!==t.currentTarget?null:e.clickRow(t)}}},[e.parentPath===e.loadingPath?i("gl-loading-icon",{staticClass:"d-inline-block align-text-bottom",attrs:{size:"sm",inline:""}}):i("router-link",{attrs:{to:e.parentRoute,"aria-label":e.__("Go to parent")}},[e._v(" .. ")])],1)])}),[],!1,null,null,null).exports,W=i("F+K/"),Y=i("JBkr"),X=i("vZRN"),Z=i.n(X);let K,ee;const te={bind:(e,t)=>{let{value:i}=t;if(!Z()(i))throw TypeError("Directive value must be a function");const n=()=>{K&&(clearTimeout(K),K=void 0)};ee=()=>{e.addEventListener("mouseout",n,{passive:!0}),K=setTimeout(()=>{i(e),e.removeEventListener("mouseover",ee,!0),e.removeEventListener("mouseout",n),K=void 0},100)},e.addEventListener("mouseover",ee,{capture:!0,passive:!0})},unbind:e=>{e.removeEventListener("mouseover",ee,!0)}};var ie=i("qn5R"),ne=i("LcVr"),ae=i("n5eU"),re=i.n(ae),oe=i("9WGj"),le=i.n(oe),se={components:{GlBadge:W.a,GlLink:D.a,GlSkeletonLoader:z.a,GlLoadingIcon:L.a,GlIcon:T.a,TimeagoTooltip:ne.a,FileIcon:ie.a,GlIntersectionObserver:Y.a},directives:{GlTooltip:M.a,GlHoverLoad:te,SafeHtml:q.a},apollo:{commit:{query:le.a,variables(){return{fileName:this.name,type:this.type,path:this.currentPath,projectPath:this.projectPath,maxOffset:this.totalEntries}},skip(){return this.glFeatures.lazyLoadCommits}}},mixins:[b.a,Object(g.a)()],props:{commitInfo:{type:Object,required:!1,default:null},rowNumber:{type:Number,required:!1,default:null},totalEntries:{type:Number,required:!0},id:{type:String,required:!0},sha:{type:String,required:!0},projectPath:{type:String,required:!0},currentPath:{type:String,required:!0},name:{type:String,required:!0},path:{type:String,required:!0},mode:{type:String,required:!1,default:""},type:{type:String,required:!0},url:{type:String,required:!1,default:null},lfsOid:{type:String,required:!1,default:null},submoduleTreeUrl:{type:String,required:!1,default:null},loadingPath:{type:String,required:!1,default:""}},data:()=>({commit:null,hasRowAppeared:!1,delayedRowAppear:null}),computed:{commitData(){return this.glFeatures.lazyLoadCommits?this.commitInfo:this.commit},refactorBlobViewerEnabled(){return this.glFeatures.refactorBlobViewer},routerLinkTo(){const e={path:`/-/blob/${this.escapedRef}/${Object(l.h)(this.path)}`},t={path:`/-/tree/${this.escapedRef}/${Object(l.h)(this.path)}`};return this.refactorBlobViewerEnabled&&this.isBlob?e:this.isFolder?t:null},isBlob(){return"blob"===this.type},isFolder(){return"tree"===this.type},isSubmodule(){return"commit"===this.type},linkComponent(){return this.isFolder||this.refactorBlobViewerEnabled&&this.isBlob?"router-link":"a"},fullPath(){return this.path.replace(new RegExp(`^${a()(this.currentPath)}/`),"")},shortSha(){return this.sha.slice(0,8)},hasLockLabel(){return this.commitData&&this.commitData.lockLabel},showSkeletonLoader(){return!this.commitData&&this.hasRowAppeared}},methods:{handlePreload(){return this.isFolder?this.loadFolder():this.loadBlob()},loadFolder(){this.apolloQuery(f.a,{projectPath:this.projectPath,ref:this.ref,path:this.path,nextPageCursor:"",pageSize:d.t})},loadBlob(){this.refactorBlobViewerEnabled&&this.apolloQuery(re.a,{projectPath:this.projectPath,filePath:this.path,ref:this.ref,shouldFetchRawText:Boolean(this.glFeatures.highlightJs)})},apolloQuery(e,t){this.$apollo.query({query:e,variables:t})},rowAppeared(){var e=this;this.hasRowAppeared=!0,this.commitInfo||this.glFeatures.lazyLoadCommits&&(this.delayedRowAppear=setTimeout((function(){return e.$emit("row-appear",e.rowNumber)}),d.m))},rowDisappeared(){clearTimeout(this.delayedRowAppear),this.hasRowAppeared=!1}},safeHtmlConfig:{ADD_TAGS:["gl-emoji"]}},de=Object(m.a)(se,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("tr",{staticClass:"tree-item"},[i("td",{staticClass:"tree-item-file-name cursor-default position-relative"},[i(e.linkComponent,{directives:[{name:"gl-hover-load",rawName:"v-gl-hover-load",value:e.handlePreload,expression:"handlePreload"},{name:"gl-tooltip",rawName:"v-gl-tooltip:tooltip-container",arg:"tooltip-container"}],ref:"link",tag:"component",staticClass:"tree-item-link str-truncated",class:{"is-submodule":e.isSubmodule},attrs:{title:e.fullPath,to:e.routerLinkTo,href:e.url,"data-qa-selector":"file_name_link"}},[i("file-icon",{staticClass:"mr-1 position-relative text-secondary",attrs:{"file-name":e.fullPath,"file-mode":e.mode,folder:e.isFolder,submodule:e.isSubmodule,loading:e.path===e.loadingPath,"css-classes":"position-relative file-icon"}}),i("span",{staticClass:"position-relative"},[e._v(e._s(e.fullPath))])],1),e._v(" "),e.lfsOid?i("gl-badge",{staticClass:"ml-1",attrs:{variant:"muted",size:"sm","data-qa-selector":"label-lfs"}},[e._v("LFS")]):e._e(),e._v(" "),e.isSubmodule?[e._v("\n      @ "),i("gl-link",{staticClass:"commit-sha",attrs:{href:e.submoduleTreeUrl}},[e._v(e._s(e.shortSha))])]:e._e(),e._v(" "),e.hasLockLabel?i("gl-icon",{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip"}],staticClass:"ml-1",attrs:{title:e.commitData.lockLabel,name:"lock",size:12}}):e._e()],2),e._v(" "),i("td",{staticClass:"d-none d-sm-table-cell tree-commit cursor-default"},[e.commitData?i("gl-link",{directives:[{name:"safe-html",rawName:"v-safe-html:[$options.safeHtmlConfig]",value:e.commitData.titleHtml,expression:"commitData.titleHtml",arg:e.$options.safeHtmlConfig}],staticClass:"str-truncated-100 tree-commit-link",attrs:{href:e.commitData.commitPath,title:e.commitData.message}}):e._e(),e._v(" "),i("gl-intersection-observer",{on:{appear:e.rowAppeared,disappear:e.rowDisappeared}},[e.showSkeletonLoader?i("gl-skeleton-loader",{attrs:{lines:1}}):e._e()],1)],1),e._v(" "),i("td",{staticClass:"tree-time-ago text-right cursor-default"},[e.commitData?i("timeago-tooltip",{attrs:{time:e.commitData.committedDate}}):e._e(),e._v(" "),e.showSkeletonLoader?i("gl-skeleton-loader",{attrs:{lines:1}}):e._e()],1)])}),[],!1,null,null,null).exports,ce={components:{GlSkeletonLoader:z.a,TableHeader:U,TableRow:de,ParentRow:Q,GlButton:B.a},mixins:[b.a,Object(g.a)()],apollo:{projectPath:{query:S.a}},props:{commits:{type:Array,required:!1,default:function(){return[]}},path:{type:String,required:!0},entries:{type:Object,required:!1,default:function(){return{}}},isLoading:{type:Boolean,required:!0},loadingPath:{type:String,required:!1,default:""},hasMore:{type:Boolean,required:!0}},data:()=>({projectPath:"",rowNumbers:{}}),computed:{totalEntries(){return Object.values(this.entries).flat().length},tableCaption(){return this.isLoading?Object(k.h)(Object(k.a)("Loading files, directories, and submodules in the path %{path} for commit reference %{ref}"),{path:this.path,ref:this.ref}):Object(k.h)(Object(k.a)("Files, directories, and submodules in the path %{path} for commit reference %{ref}"),{path:this.path,ref:this.ref})},showParentRow(){return-1===["","/"].indexOf(this.path)}},watch:{$route:function(){this.$options.totalRowsLoaded=-1}},totalRowsLoaded:-1,methods:{showMore(){this.$emit("showMore")},generateRowNumber(e,t,i){const n=`${e}-${t}-${i}`;return this.glFeatures.lazyLoadCommits?(this.rowNumbers[n]||0===this.rowNumbers[n]||(this.$options.totalRowsLoaded+=1,this.rowNumbers[n]=this.$options.totalRowsLoaded),this.rowNumbers[n]):0},getCommit(e,t){return this.glFeatures.lazyLoadCommits?this.commits.find((function(i){return i.fileName===e&&i.type===t})):{}}}},me={components:{FileTable:Object(m.a)(ce,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tree-content-holder"},[i("div",{staticClass:"table-holder bordered-box"},[i("table",{staticClass:"table tree-table",class:{"gl-table-layout-fixed":!e.showParentRow},attrs:{"aria-label":e.tableCaption,"aria-live":"polite","data-qa-selector":"file_tree_table"}},[e._m(0),e._v(" "),i("tbody",[e.showParentRow?i("parent-row",{attrs:{"commit-ref":e.escapedRef,path:e.path,"loading-path":e.loadingPath}}):e._e(),e._v(" "),e._l(e.entries,(function(t){return e._l(t,(function(t,n){return i("table-row",e._g({key:t.flatPath+"-"+t.id+"-"+n,attrs:{id:t.id,sha:t.sha,"project-path":e.projectPath,"current-path":e.path,name:t.name,path:t.flatPath,type:t.type,url:t.webUrl||t.webPath,mode:t.mode,"submodule-tree-url":t.treeUrl,"lfs-oid":t.lfsOid,"loading-path":e.loadingPath,"total-entries":e.totalEntries,"row-number":e.generateRowNumber(t.flatPath,t.id,n),"commit-info":e.getCommit(t.name,t.type)}},e.$listeners))}))})),e._v(" "),e.isLoading?e._l(5,(function(t){return i("tr",{key:t,attrs:{"aria-hidden":"true"}},[i("td",[i("gl-skeleton-loader",{attrs:{lines:1}})],1),e._v(" "),i("td",{staticClass:"gl-display-none gl-sm-display-block"},[i("gl-skeleton-loader",{attrs:{lines:1}})],1),e._v(" "),i("td",[i("div",{staticClass:"gl-display-flex gl-lg-justify-content-end"},[i("gl-skeleton-loader",{attrs:{"equal-width-lines":!0,lines:1}})],1)])])})):e._e(),e._v(" "),e.hasMore?[i("tr",[i("td",{staticClass:"gl-p-0!",attrs:{align:"center",colspan:"3"}},[i("gl-button",{staticClass:"gl-display-flex gl-w-full gl-py-4!",attrs:{variant:"link",loading:e.isLoading},on:{click:e.showMore}},[e._v("\n                "+e._s(e.s__("ProjectFileTree|Show more"))+"\n              ")])],1)])]:e._e()],2)],1)])])}),[function(){var e=this.$createElement;return(this._self._c||e)("table-header")}],!1,null,null,null).exports,FilePreview:H},mixins:[b.a,Object(g.a)()],apollo:{projectPath:{query:S.a}},props:{path:{type:String,required:!1,default:"/"},loadingPath:{type:String,required:!1,default:""}},data:()=>({commits:[],projectPath:"",nextPageCursor:"",pagesLoaded:1,entries:{trees:[],submodules:[],blobs:[]},isLoadingFiles:!1,isOverLimit:!1,clickedShowMore:!1,fetchCounter:0}),computed:{pageSize(){const e=d.t/d.r*(this.fetchCounter+1);return e<d.t&&this.glFeatures.increasePageSizeExponentially?e:d.t},totalEntries(){return Object.values(this.entries).flat().length},readme(){return(e=this.entries.blobs).find(w)||e.find(P);var e},pageLimitReached(){return this.totalEntries/this.pagesLoaded>=d.s},hasShowMore(){return!this.clickedShowMore&&this.pageLimitReached}},watch:{$route:function(){this.entries.trees=[],this.entries.submodules=[],this.entries.blobs=[],this.nextPageCursor="",$(),this.fetchFiles()}},mounted(){var e=this;this.$nextTick((function(){$(),e.fetchFiles()}))},methods:{fetchFiles(){var e=this;const t=this.path||"/";return this.isLoadingFiles=!0,this.$apollo.query({query:f.a,variables:{projectPath:this.projectPath,ref:this.ref,path:t,nextPageCursor:this.nextPageCursor,pageSize:this.pageSize}}).then((function(i){var n;let{data:a}=i;if(a.errors)throw a.errors;if(null==a||null===(n=a.project)||void 0===n||!n.repository||t!==(e.path||"/"))return;const{project:{repository:{paginatedTree:{pageInfo:r}}}}=a;e.isLoadingFiles=!1,e.entries=Object.keys(e.entries).reduce((function(t,i){return{...t,[i]:e.normalizeData(i,a.project.repository.paginatedTree.nodes[0][i])}}),{}),null!=r&&r.hasNextPage&&(e.nextPageCursor=r.endCursor,e.fetchCounter+=1,e.pageLimitReached&&!e.clickedShowMore||(e.fetchFiles(),e.clickedShowMore=!1))})).catch((function(e){throw Object(v.default)({message:Object(k.a)("An error occurred while fetching folder content.")}),e}))},normalizeData(e,t){return this.entries[e].concat(t.nodes)},hasNextPage:e=>[].concat(e.trees.pageInfo,e.submodules.pageInfo,e.blobs.pageInfo).find((function(e){let{hasNextPage:t}=e;return t})),handleRowAppear(e){this.glFeatures.lazyLoadCommits&&!C(e)&&(this.loadCommitData(e),e-d.a>=0&&this.loadCommitData(e-d.a))},loadCommitData(e){x(this.projectPath,this.path,this.ref,e).then(this.setCommitData).catch((function(){}))},setCommitData(e){this.commits=this.commits.concat(e)},handleShowMore(){this.clickedShowMore=!0,this.pagesLoaded+=1,this.fetchFiles()}}},ue={components:{TreeContent:Object(m.a)(me,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("file-table",{attrs:{path:e.path,entries:e.entries,"is-loading":e.isLoadingFiles,"loading-path":e.loadingPath,"has-more":e.hasShowMore,commits:e.commits},on:{showMore:e.handleShowMore,"row-appear":e.handleRowAppear}}),e._v(" "),e.readme?i("file-preview",{attrs:{blob:e.readme}}):e._e()],1)}),[],!1,null,null,null).exports},mixins:[{mixins:[b.a],apollo:{projectPath:{query:S.a}},data:()=>({projectPath:"",loadingPath:null}),beforeRouteUpdate(e,t,i){this.preload(e.params.path,i)},methods:{preload(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",t=arguments.length>1?arguments[1]:void 0;return this.loadingPath=e.replace(/^\//,""),this.$apollo.query({query:f.a,variables:{projectPath:this.projectPath,ref:this.ref,path:this.loadingPath,nextPageCursor:"",pageSize:100}}).then((function(){return t()}))}}}],props:{path:{type:String,required:!1,default:"/"}},computed:{isRoot(){return"/"===this.path}},watch:{isRoot:{immediate:!0,handler:"updateElements"}},methods:{updateElements(e){Object(h.a)(".js-show-on-root",e),Object(h.a)(".js-hide-on-root",!e)}}},he=Object(m.a)(ue,(function(){var e=this.$createElement;return(this._self._c||e)("tree-content",{attrs:{path:this.path,"loading-path":this.loadingPath}})}),[],!1,null,null,null).exports,pe={components:{TreePage:he},mounted(){this.updateProjectElements(!0)},beforeDestroy(){this.updateProjectElements(!1)},methods:{updateProjectElements(e){Object(h.a)(".js-show-on-project-root",e)}}},fe=Object(m.a)(pe,(function(){var e=this.$createElement;return(this._self._c||e)("tree-page",{attrs:{path:"/"}})}),[],!1,null,null,null).exports;function ve(e,t){const i={component:he,props:function(e){var t;return{path:(null===(t=e.params.path)||void 0===t?void 0:t.replace(/^\//,""))||"/"}}},n={component:u,props:function(t){return{path:t.params.path,projectPath:e}}},r=new o.a({mode:"history",base:Object(l.x)(gon.relative_url_root||"",e),routes:[{name:"treePathDecoded",path:`(/-)?/tree/${decodeURI(t)}/:path*`,...i},{name:"treePath",path:`(/-)?/tree/${a()(t)}/:path*`,...i},{name:"blobPathDecoded",path:`(/-)?/blob/${decodeURI(t)}/:path*`,...n},{name:"blobPath",path:`(/-)?/blob/${a()(t)}/:path*`,...n},{path:"/",name:"projectRoot",component:fe}]});return r.afterEach((function(i){const n=!i.name.includes("blobPath");window.gl.webIDEPath=Object(l.O)(Object(l.x)("/",e,"edit",decodeURI(t),"-",i.params.path||"",n&&"/"))})),r}r.default.use(o.a)},hyA4:function(e,t){var i={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TreeEntry"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Entry"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sha"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"flatPath"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"type"},arguments:[],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"getPaginatedTree"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"projectPath"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"path"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"ref"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"nextPageCursor"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"project"},arguments:[{kind:"Argument",name:{kind:"Name",value:"fullPath"},value:{kind:"Variable",name:{kind:"Name",value:"projectPath"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"repository"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"paginatedTree"},arguments:[{kind:"Argument",name:{kind:"Name",value:"path"},value:{kind:"Variable",name:{kind:"Name",value:"path"}}},{kind:"Argument",name:{kind:"Name",value:"ref"},value:{kind:"Variable",name:{kind:"Name",value:"ref"}}},{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"nextPageCursor"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"pageInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"endCursor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"startCursor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"hasNextPage"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"nodes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"trees"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"nodes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TreeEntry"},directives:[]},{kind:"Field",name:{kind:"Name",value:"webPath"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"submodules"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"nodes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TreeEntry"},directives:[]},{kind:"Field",name:{kind:"Name",value:"webUrl"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"treeUrl"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"blobs"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"nodes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TreeEntry"},directives:[]},{kind:"Field",name:{kind:"Name",value:"mode"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"webPath"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"lfsOid"},arguments:[],directives:[]}]}}]}}]}}]}}]}}]}}]}}],loc:{start:0,end:1017}};i.loc.source={body:"fragment TreeEntry on Entry {\n  __typename\n  id\n  sha\n  name\n  flatPath\n  type\n}\n\nquery getPaginatedTree($projectPath: ID!, $path: String, $ref: String!, $nextPageCursor: String) {\n  project(fullPath: $projectPath) {\n    id\n    __typename\n    repository {\n      __typename\n      paginatedTree(path: $path, ref: $ref, after: $nextPageCursor) {\n        __typename\n        pageInfo {\n          __typename\n          endCursor\n          startCursor\n          hasNextPage\n        }\n        nodes {\n          __typename\n          trees {\n            __typename\n            nodes {\n              ...TreeEntry\n              webPath\n            }\n          }\n          submodules {\n            __typename\n            nodes {\n              ...TreeEntry\n              webUrl\n              treeUrl\n            }\n          }\n          blobs {\n            __typename\n            nodes {\n              ...TreeEntry\n              mode\n              webPath\n              lfsOid\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var n={};function a(e,t){for(var i=0;i<e.definitions.length;i++){var n=e.definitions[i];if(n.name&&n.name.value==t)return n}}function r(e,t){var i={kind:e.kind,definitions:[a(e,t)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var r=n[t]||new Set,o=new Set,l=new Set;for(r.forEach((function(e){l.add(e)}));l.size>0;){var s=l;l=new Set,s.forEach((function(e){o.has(e)||(o.add(e),(n[e]||new Set).forEach((function(e){l.add(e)})))}))}return o.forEach((function(t){var n=a(e,t);n&&i.definitions.push(n)})),i}i.definitions.forEach((function(e){if(e.name){var t=new Set;!function e(t,i){if("FragmentSpread"===t.kind)i.add(t.name.value);else if("VariableDefinition"===t.kind){var n=t.type;"NamedType"===n.kind&&i.add(n.name.value)}t.selectionSet&&t.selectionSet.selections.forEach((function(t){e(t,i)})),t.variableDefinitions&&t.variableDefinitions.forEach((function(t){e(t,i)})),t.definitions&&t.definitions.forEach((function(t){e(t,i)}))}(e,t),n[e.name.value]=t}})),e.exports=i,e.exports.TreeEntry=r(i,"TreeEntry"),e.exports.getPaginatedTree=r(i,"getPaginatedTree")},qINL:function(e,t,i){"use strict";i.d(t,"a",(function(){return f}));var n=i("UVyR"),a=i("ryFn"),r=i("qx9o"),o=i("BhOj"),l=i("G55H"),s=i("9Q7u"),d="__bv_modal_directive__",c=function(e){var t=e.modifiers,i=void 0===t?{}:t,n=e.arg,a=e.value;return Object(l.m)(a)?a:Object(l.m)(n)?n:Object(s.h)(i).reverse()[0]},m=function(e){return e&&Object(r.v)(e,".dropdown-menu > li, li.nav-item")&&Object(r.C)("a, button",e)||e},u=function(e){e&&"BUTTON"!==e.tagName&&(Object(r.o)(e,"role")||Object(r.E)(e,"role","button"),"A"===e.tagName||Object(r.o)(e,"tabindex")||Object(r.E)(e,"tabindex","0"))},h=function(e){var t=e[d]||{},i=t.trigger,a=t.handler;i&&a&&(Object(o.a)(i,"click",a,n.b),Object(o.a)(i,"keydown",a,n.b),Object(o.a)(e,"click",a,n.b),Object(o.a)(e,"keydown",a,n.b)),delete e[d]},p=function(e,t,i){var l=e[d]||{},s=c(t),p=m(e);s===l.target&&p===l.trigger||(h(e),function(e,t,i){var l=c(t),s=m(e);if(l&&s){var h=function(e){var t=e.currentTarget;if(!Object(r.r)(t)){var n=e.type,o=e.keyCode;"click"!==n&&("keydown"!==n||o!==a.c&&o!==a.h)||i.context.$root.$emit("bv::show::modal",l,t)}};e[d]={handler:h,target:l,trigger:s},u(s),Object(o.b)(s,"click",h,n.b),"BUTTON"!==s.tagName&&"button"===Object(r.h)(s,"role")&&Object(o.b)(s,"keydown",h,n.b)}}(e,t,i)),u(p)},f={inserted:p,updated:function(){},componentUpdated:p,unbind:h}}}]);
//# sourceMappingURL=commons-pages.projects.show-pages.projects.tree.show.12427560.chunk.js.map