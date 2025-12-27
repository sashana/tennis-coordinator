(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();var $n,F,xa,ba,Qe,Oo,ya,wa,ka,zo,Xn,Zn,sr={},Ca=[],bi=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,In=Array.isArray;function De(t,r){for(var n in r)t[n]=r[n];return t}function So(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function yi(t,r,n){var o,a,i,l={};for(i in r)i=="key"?o=r[i]:i=="ref"?a=r[i]:l[i]=r[i];if(arguments.length>2&&(l.children=arguments.length>3?$n.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(i in t.defaultProps)l[i]===void 0&&(l[i]=t.defaultProps[i]);return en(t,l,o,a,null)}function en(t,r,n,o,a){var i={type:t,props:r,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:a??++xa,__i:-1,__u:0};return a==null&&F.vnode!=null&&F.vnode(i),i}function N(t){return t.children}function er(t,r){this.props=t,this.context=r}function Tt(t,r){if(r==null)return t.__?Tt(t.__,t.__i+1):null;for(var n;r<t.__k.length;r++)if((n=t.__k[r])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?Tt(t):null}function _a(t){var r,n;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,r=0;r<t.__k.length;r++)if((n=t.__k[r])!=null&&n.__e!=null){t.__e=t.__c.base=n.__e;break}return _a(t)}}function Ho(t){(!t.__d&&(t.__d=!0)&&Qe.push(t)&&!gn.__r++||Oo!=F.debounceRendering)&&((Oo=F.debounceRendering)||ya)(gn)}function gn(){for(var t,r,n,o,a,i,l,c=1;Qe.length;)Qe.length>c&&Qe.sort(wa),t=Qe.shift(),c=Qe.length,t.__d&&(n=void 0,o=void 0,a=(o=(r=t).__v).__e,i=[],l=[],r.__P&&((n=De({},o)).__v=o.__v+1,F.vnode&&F.vnode(n),$o(r.__P,n,o,r.__n,r.__P.namespaceURI,32&o.__u?[a]:null,i,a??Tt(o),!!(32&o.__u),l),n.__v=o.__v,n.__.__k[n.__i]=n,$a(i,n,l),o.__e=o.__=null,n.__e!=a&&_a(n)));gn.__r=0}function za(t,r,n,o,a,i,l,c,s,d,h){var u,v,p,f,x,k,b,w=o&&o.__k||Ca,E=r.length;for(s=wi(n,r,w,s,E),u=0;u<E;u++)(p=n.__k[u])!=null&&(v=p.__i==-1?sr:w[p.__i]||sr,p.__i=u,k=$o(t,p,v,a,i,l,c,s,d,h),f=p.__e,p.ref&&v.ref!=p.ref&&(v.ref&&Io(v.ref,null,p),h.push(p.ref,p.__c||f,p)),x==null&&f!=null&&(x=f),(b=!!(4&p.__u))||v.__k===p.__k?s=Sa(p,s,t,b):typeof p.type=="function"&&k!==void 0?s=k:f&&(s=f.nextSibling),p.__u&=-7);return n.__e=x,s}function wi(t,r,n,o,a){var i,l,c,s,d,h=n.length,u=h,v=0;for(t.__k=new Array(a),i=0;i<a;i++)(l=r[i])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=t.__k[i]=en(null,l,null,null,null):In(l)?l=t.__k[i]=en(N,{children:l},null,null,null):l.constructor==null&&l.__b>0?l=t.__k[i]=en(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):t.__k[i]=l,s=i+v,l.__=t,l.__b=t.__b+1,(d=l.__i=ki(l,n,s,u))!=-1&&(u--,(c=n[d])&&(c.__u|=2)),c==null||c.__v==null?(d==-1&&(a>h?v--:a<h&&v++),typeof l.type!="function"&&(l.__u|=4)):d!=s&&(d==s-1?v--:d==s+1?v++:(d>s?v--:v++,l.__u|=4))):t.__k[i]=null;if(u)for(i=0;i<h;i++)(c=n[i])!=null&&(2&c.__u)==0&&(c.__e==o&&(o=Tt(c)),Ea(c,c));return o}function Sa(t,r,n,o){var a,i;if(typeof t.type=="function"){for(a=t.__k,i=0;a&&i<a.length;i++)a[i]&&(a[i].__=t,r=Sa(a[i],r,n,o));return r}t.__e!=r&&(o&&(r&&t.type&&!r.parentNode&&(r=Tt(t)),n.insertBefore(t.__e,r||null)),r=t.__e);do r=r&&r.nextSibling;while(r!=null&&r.nodeType==8);return r}function ki(t,r,n,o){var a,i,l,c=t.key,s=t.type,d=r[n],h=d!=null&&(2&d.__u)==0;if(d===null&&c==null||h&&c==d.key&&s==d.type)return n;if(o>(h?1:0)){for(a=n-1,i=n+1;a>=0||i<r.length;)if((d=r[l=a>=0?a--:i++])!=null&&(2&d.__u)==0&&c==d.key&&s==d.type)return l}return-1}function Wo(t,r,n){r[0]=="-"?t.setProperty(r,n??""):t[r]=n==null?"":typeof n!="number"||bi.test(r)?n:n+"px"}function Gr(t,r,n,o,a){var i,l;e:if(r=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof o=="string"&&(t.style.cssText=o=""),o)for(r in o)n&&r in n||Wo(t.style,r,"");if(n)for(r in n)o&&n[r]==o[r]||Wo(t.style,r,n[r])}else if(r[0]=="o"&&r[1]=="n")i=r!=(r=r.replace(ka,"$1")),l=r.toLowerCase(),r=l in t||r=="onFocusOut"||r=="onFocusIn"?l.slice(2):r.slice(2),t.l||(t.l={}),t.l[r+i]=n,n?o?n.u=o.u:(n.u=zo,t.addEventListener(r,i?Zn:Xn,i)):t.removeEventListener(r,i?Zn:Xn,i);else{if(a=="http://www.w3.org/2000/svg")r=r.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(r!="width"&&r!="height"&&r!="href"&&r!="list"&&r!="form"&&r!="tabIndex"&&r!="download"&&r!="rowSpan"&&r!="colSpan"&&r!="role"&&r!="popover"&&r in t)try{t[r]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&r[4]!="-"?t.removeAttribute(r):t.setAttribute(r,r=="popover"&&n==1?"":n))}}function Vo(t){return function(r){if(this.l){var n=this.l[r.type+t];if(r.t==null)r.t=zo++;else if(r.t<n.u)return;return n(F.event?F.event(r):r)}}}function $o(t,r,n,o,a,i,l,c,s,d){var h,u,v,p,f,x,k,b,w,E,I,S,m,_,D,A,L,M=r.type;if(r.constructor!=null)return null;128&n.__u&&(s=!!(32&n.__u),i=[c=r.__e=n.__e]),(h=F.__b)&&h(r);e:if(typeof M=="function")try{if(b=r.props,w="prototype"in M&&M.prototype.render,E=(h=M.contextType)&&o[h.__c],I=h?E?E.props.value:h.__:o,n.__c?k=(u=r.__c=n.__c).__=u.__E:(w?r.__c=u=new M(b,I):(r.__c=u=new er(b,I),u.constructor=M,u.render=_i),E&&E.sub(u),u.state||(u.state={}),u.__n=o,v=u.__d=!0,u.__h=[],u._sb=[]),w&&u.__s==null&&(u.__s=u.state),w&&M.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=De({},u.__s)),De(u.__s,M.getDerivedStateFromProps(b,u.__s))),p=u.props,f=u.state,u.__v=r,v)w&&M.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),w&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(w&&M.getDerivedStateFromProps==null&&b!==p&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(b,I),r.__v==n.__v||!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(b,u.__s,I)===!1){for(r.__v!=n.__v&&(u.props=b,u.state=u.__s,u.__d=!1),r.__e=n.__e,r.__k=n.__k,r.__k.some(function(T){T&&(T.__=r)}),S=0;S<u._sb.length;S++)u.__h.push(u._sb[S]);u._sb=[],u.__h.length&&l.push(u);break e}u.componentWillUpdate!=null&&u.componentWillUpdate(b,u.__s,I),w&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(p,f,x)})}if(u.context=I,u.props=b,u.__P=t,u.__e=!1,m=F.__r,_=0,w){for(u.state=u.__s,u.__d=!1,m&&m(r),h=u.render(u.props,u.state,u.context),D=0;D<u._sb.length;D++)u.__h.push(u._sb[D]);u._sb=[]}else do u.__d=!1,m&&m(r),h=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++_<25);u.state=u.__s,u.getChildContext!=null&&(o=De(De({},o),u.getChildContext())),w&&!v&&u.getSnapshotBeforeUpdate!=null&&(x=u.getSnapshotBeforeUpdate(p,f)),A=h,h!=null&&h.type===N&&h.key==null&&(A=Ia(h.props.children)),c=za(t,In(A)?A:[A],r,n,o,a,i,l,c,s,d),u.base=r.__e,r.__u&=-161,u.__h.length&&l.push(u),k&&(u.__E=u.__=null)}catch(T){if(r.__v=null,s||i!=null)if(T.then){for(r.__u|=s?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;i[i.indexOf(c)]=null,r.__e=c}else{for(L=i.length;L--;)So(i[L]);eo(r)}else r.__e=n.__e,r.__k=n.__k,T.then||eo(r);F.__e(T,r,n)}else i==null&&r.__v==n.__v?(r.__k=n.__k,r.__e=n.__e):c=r.__e=Ci(n.__e,r,n,o,a,i,l,s,d);return(h=F.diffed)&&h(r),128&r.__u?void 0:c}function eo(t){t&&t.__c&&(t.__c.__e=!0),t&&t.__k&&t.__k.forEach(eo)}function $a(t,r,n){for(var o=0;o<n.length;o++)Io(n[o],n[++o],n[++o]);F.__c&&F.__c(r,t),t.some(function(a){try{t=a.__h,a.__h=[],t.some(function(i){i.call(a)})}catch(i){F.__e(i,a.__v)}})}function Ia(t){return typeof t!="object"||t==null||t.__b&&t.__b>0?t:In(t)?t.map(Ia):De({},t)}function Ci(t,r,n,o,a,i,l,c,s){var d,h,u,v,p,f,x,k=n.props||sr,b=r.props,w=r.type;if(w=="svg"?a="http://www.w3.org/2000/svg":w=="math"?a="http://www.w3.org/1998/Math/MathML":a||(a="http://www.w3.org/1999/xhtml"),i!=null){for(d=0;d<i.length;d++)if((p=i[d])&&"setAttribute"in p==!!w&&(w?p.localName==w:p.nodeType==3)){t=p,i[d]=null;break}}if(t==null){if(w==null)return document.createTextNode(b);t=document.createElementNS(a,w,b.is&&b),c&&(F.__m&&F.__m(r,i),c=!1),i=null}if(w==null)k===b||c&&t.data==b||(t.data=b);else{if(i=i&&$n.call(t.childNodes),!c&&i!=null)for(k={},d=0;d<t.attributes.length;d++)k[(p=t.attributes[d]).name]=p.value;for(d in k)if(p=k[d],d!="children"){if(d=="dangerouslySetInnerHTML")u=p;else if(!(d in b)){if(d=="value"&&"defaultValue"in b||d=="checked"&&"defaultChecked"in b)continue;Gr(t,d,null,p,a)}}for(d in b)p=b[d],d=="children"?v=p:d=="dangerouslySetInnerHTML"?h=p:d=="value"?f=p:d=="checked"?x=p:c&&typeof p!="function"||k[d]===p||Gr(t,d,p,k[d],a);if(h)c||u&&(h.__html==u.__html||h.__html==t.innerHTML)||(t.innerHTML=h.__html),r.__k=[];else if(u&&(t.innerHTML=""),za(r.type=="template"?t.content:t,In(v)?v:[v],r,n,o,w=="foreignObject"?"http://www.w3.org/1999/xhtml":a,i,l,i?i[0]:n.__k&&Tt(n,0),c,s),i!=null)for(d=i.length;d--;)So(i[d]);c||(d="value",w=="progress"&&f==null?t.removeAttribute("value"):f!=null&&(f!==t[d]||w=="progress"&&!f||w=="option"&&f!=k[d])&&Gr(t,d,f,k[d],a),d="checked",x!=null&&x!=t[d]&&Gr(t,d,x,k[d],a))}return t}function Io(t,r,n){try{if(typeof t=="function"){var o=typeof t.__u=="function";o&&t.__u(),o&&r==null||(t.__u=t(r))}else t.current=r}catch(a){F.__e(a,n)}}function Ea(t,r,n){var o,a;if(F.unmount&&F.unmount(t),(o=t.ref)&&(o.current&&o.current!=t.__e||Io(o,null,r)),(o=t.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(i){F.__e(i,r)}o.base=o.__P=null}if(o=t.__k)for(a=0;a<o.length;a++)o[a]&&Ea(o[a],r,n||typeof t.type!="function");n||So(t.__e),t.__c=t.__=t.__e=void 0}function _i(t,r,n){return this.constructor(t,n)}function zi(t,r,n){var o,a,i,l;r==document&&(r=document.documentElement),F.__&&F.__(t,r),a=(o=!1)?null:r.__k,i=[],l=[],$o(r,t=r.__k=yi(N,null,[t]),a||sr,sr,r.namespaceURI,a?null:r.firstChild?$n.call(r.childNodes):null,i,a?a.__e:r.firstChild,o,l),$a(i,t,l)}$n=Ca.slice,F={__e:function(t,r,n,o){for(var a,i,l;r=r.__;)if((a=r.__c)&&!a.__)try{if((i=a.constructor)&&i.getDerivedStateFromError!=null&&(a.setState(i.getDerivedStateFromError(t)),l=a.__d),a.componentDidCatch!=null&&(a.componentDidCatch(t,o||{}),l=a.__d),l)return a.__E=a}catch(c){t=c}throw t}},xa=0,ba=function(t){return t!=null&&t.constructor==null},er.prototype.setState=function(t,r){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=De({},this.state),typeof t=="function"&&(t=t(De({},n),this.props)),t&&De(n,t),t!=null&&this.__v&&(r&&this._sb.push(r),Ho(this))},er.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ho(this))},er.prototype.render=N,Qe=[],ya=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,wa=function(t,r){return t.__v.__b-r.__v.__b},gn.__r=0,ka=/(PointerCapture)$|Capture$/i,zo=0,Xn=Vo(!1),Zn=Vo(!0);var Si=0;function e(t,r,n,o,a,i){r||(r={});var l,c,s=r;if("ref"in s)for(c in s={},r)c=="ref"?l=r[c]:s[c]=r[c];var d={type:t,props:s,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Si,__i:-1,__u:0,__source:a,__self:i};if(typeof t=="function"&&(l=t.defaultProps))for(c in l)s[c]===void 0&&(s[c]=l[c]);return F.vnode&&F.vnode(d),d}var cr,W,Tn,Yo,vn=0,Da=[],Y=F,qo=Y.__b,Ko=Y.__r,Jo=Y.diffed,Qo=Y.__c,Xo=Y.unmount,Zo=Y.__;function Eo(t,r){Y.__h&&Y.__h(W,t,vn||r),vn=0;var n=W.__H||(W.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function Re(t){return vn=1,$i(Ra,t)}function $i(t,r,n){var o=Eo(cr++,2);if(o.t=t,!o.__c&&(o.__=[Ra(void 0,r),function(c){var s=o.__N?o.__N[0]:o.__[0],d=o.t(s,c);s!==d&&(o.__N=[d,o.__[1]],o.__c.setState({}))}],o.__c=W,!W.__f)){var a=function(c,s,d){if(!o.__c.__H)return!0;var h=o.__c.__H.__.filter(function(v){return!!v.__c});if(h.every(function(v){return!v.__N}))return!i||i.call(this,c,s,d);var u=o.__c.props!==c;return h.forEach(function(v){if(v.__N){var p=v.__[0];v.__=v.__N,v.__N=void 0,p!==v.__[0]&&(u=!0)}}),i&&i.call(this,c,s,d)||u};W.__f=!0;var i=W.shouldComponentUpdate,l=W.componentWillUpdate;W.componentWillUpdate=function(c,s,d){if(this.__e){var h=i;i=void 0,a(c,s,d),i=h}l&&l.call(this,c,s,d)},W.shouldComponentUpdate=a}return o.__N||o.__}function U(t,r){var n=Eo(cr++,3);!Y.__s&&Ma(n.__H,r)&&(n.__=t,n.u=r,W.__H.__h.push(n))}function Do(t){return vn=5,Aa(function(){return{current:t}},[])}function Aa(t,r){var n=Eo(cr++,7);return Ma(n.__H,r)&&(n.__=t(),n.__H=r,n.__h=t),n.__}function Ii(){for(var t;t=Da.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(tn),t.__H.__h.forEach(to),t.__H.__h=[]}catch(r){t.__H.__h=[],Y.__e(r,t.__v)}}Y.__b=function(t){W=null,qo&&qo(t)},Y.__=function(t,r){t&&r.__k&&r.__k.__m&&(t.__m=r.__k.__m),Zo&&Zo(t,r)},Y.__r=function(t){Ko&&Ko(t),cr=0;var r=(W=t.__c).__H;r&&(Tn===W?(r.__h=[],W.__h=[],r.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(r.__h.forEach(tn),r.__h.forEach(to),r.__h=[],cr=0)),Tn=W},Y.diffed=function(t){Jo&&Jo(t);var r=t.__c;r&&r.__H&&(r.__H.__h.length&&(Da.push(r)!==1&&Yo===Y.requestAnimationFrame||((Yo=Y.requestAnimationFrame)||Ei)(Ii)),r.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),Tn=W=null},Y.__c=function(t,r){r.some(function(n){try{n.__h.forEach(tn),n.__h=n.__h.filter(function(o){return!o.__||to(o)})}catch(o){r.some(function(a){a.__h&&(a.__h=[])}),r=[],Y.__e(o,n.__v)}}),Qo&&Qo(t,r)},Y.unmount=function(t){Xo&&Xo(t);var r,n=t.__c;n&&n.__H&&(n.__H.__.forEach(function(o){try{tn(o)}catch(a){r=a}}),n.__H=void 0,r&&Y.__e(r,n.__v))};var ea=typeof requestAnimationFrame=="function";function Ei(t){var r,n=function(){clearTimeout(o),ea&&cancelAnimationFrame(r),setTimeout(t)},o=setTimeout(n,35);ea&&(r=requestAnimationFrame(n))}function tn(t){var r=W,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),W=r}function to(t){var r=W;t.__c=t.__(),W=r}function Ma(t,r){return!t||t.length!==r.length||r.some(function(n,o){return n!==t[o]})}function Ra(t,r){return typeof r=="function"?r(t):r}var Di=Symbol.for("preact-signals");function En(){if(We>1)We--;else{for(var t,r=!1;tr!==void 0;){var n=tr;for(tr=void 0,ro++;n!==void 0;){var o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&La(n))try{n.c()}catch(a){r||(t=a,r=!0)}n=o}}if(ro=0,We--,r)throw t}}function Ai(t){if(We>0)return t();We++;try{return t()}finally{En()}}var B=void 0;function Pa(t){var r=B;B=void 0;try{return t()}finally{B=r}}var tr=void 0,We=0,ro=0,fn=0;function Ta(t){if(B!==void 0){var r=t.n;if(r===void 0||r.t!==B)return r={i:0,S:t,p:B.s,n:void 0,t:B,e:void 0,x:void 0,r},B.s!==void 0&&(B.s.n=r),B.s=r,t.n=r,32&B.f&&t.S(r),r;if(r.i===-1)return r.i=0,r.n!==void 0&&(r.n.p=r.p,r.p!==void 0&&(r.p.n=r.n),r.p=B.s,r.n=void 0,B.s.n=r,B.s=r),r}}function oe(t,r){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=r?.watched,this.Z=r?.unwatched,this.name=r?.name}oe.prototype.brand=Di;oe.prototype.h=function(){return!0};oe.prototype.S=function(t){var r=this,n=this.t;n!==t&&t.e===void 0&&(t.x=n,this.t=t,n!==void 0?n.e=t:Pa(function(){var o;(o=r.W)==null||o.call(r)}))};oe.prototype.U=function(t){var r=this;if(this.t!==void 0){var n=t.e,o=t.x;n!==void 0&&(n.x=o,t.e=void 0),o!==void 0&&(o.e=n,t.x=void 0),t===this.t&&(this.t=o,o===void 0&&Pa(function(){var a;(a=r.Z)==null||a.call(r)}))}};oe.prototype.subscribe=function(t){var r=this;return fe(function(){var n=r.value,o=B;B=void 0;try{t(n)}finally{B=o}},{name:"sub"})};oe.prototype.valueOf=function(){return this.value};oe.prototype.toString=function(){return this.value+""};oe.prototype.toJSON=function(){return this.value};oe.prototype.peek=function(){var t=B;B=void 0;try{return this.value}finally{B=t}};Object.defineProperty(oe.prototype,"value",{get:function(){var t=Ta(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(ro>100)throw new Error("Cycle detected");this.v=t,this.i++,fn++,We++;try{for(var r=this.t;r!==void 0;r=r.x)r.t.N()}finally{En()}}}});function g(t,r){return new oe(t,r)}function La(t){for(var r=t.s;r!==void 0;r=r.n)if(r.S.i!==r.i||!r.S.h()||r.S.i!==r.i)return!0;return!1}function Na(t){for(var r=t.s;r!==void 0;r=r.n){var n=r.S.n;if(n!==void 0&&(r.r=n),r.S.n=r,r.i=-1,r.n===void 0){t.s=r;break}}}function Ba(t){for(var r=t.s,n=void 0;r!==void 0;){var o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):n=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=n}function dt(t,r){oe.call(this,void 0),this.x=t,this.s=void 0,this.g=fn-1,this.f=4,this.W=r?.watched,this.Z=r?.unwatched,this.name=r?.name}dt.prototype=new oe;dt.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===fn))return!0;if(this.g=fn,this.f|=1,this.i>0&&!La(this))return this.f&=-2,!0;var t=B;try{Na(this),B=this;var r=this.x();(16&this.f||this.v!==r||this.i===0)&&(this.v=r,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return B=t,Ba(this),this.f&=-2,!0};dt.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var r=this.s;r!==void 0;r=r.n)r.S.S(r)}oe.prototype.S.call(this,t)};dt.prototype.U=function(t){if(this.t!==void 0&&(oe.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var r=this.s;r!==void 0;r=r.n)r.S.U(r)}};dt.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};Object.defineProperty(dt.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=Ta(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function Ve(t,r){return new dt(t,r)}function Fa(t){var r=t.u;if(t.u=void 0,typeof r=="function"){We++;var n=B;B=void 0;try{r()}catch(o){throw t.f&=-2,t.f|=8,Ao(t),o}finally{B=n,En()}}}function Ao(t){for(var r=t.s;r!==void 0;r=r.n)r.S.U(r);t.x=void 0,t.s=void 0,Fa(t)}function Mi(t){if(B!==this)throw new Error("Out-of-order effect");Ba(this),B=t,this.f&=-2,8&this.f&&Ao(this),En()}function jt(t,r){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=r?.name}jt.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var r=this.x();typeof r=="function"&&(this.u=r)}finally{t()}};jt.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Fa(this),Na(this),We++;var t=B;return B=this,Mi.bind(this,t)};jt.prototype.N=function(){2&this.f||(this.f|=2,this.o=tr,tr=this)};jt.prototype.d=function(){this.f|=8,1&this.f||Ao(this)};jt.prototype.dispose=function(){this.d()};function fe(t,r){var n=new jt(t,r);try{n.c()}catch(a){throw n.d(),a}var o=n.d.bind(n);return o[Symbol.dispose]=o,o}var ja,Ln,Dn=typeof window<"u"&&!!window.__PREACT_SIGNALS_DEVTOOLS__,Ua=[];fe(function(){ja=this.N})();function Ut(t,r){F[t]=r.bind(null,F[t]||function(){})}function mn(t){Ln&&Ln(),Ln=t&&t.S()}function Ga(t){var r=this,n=t.data,o=Pi(n);o.value=n;var a=Aa(function(){for(var c=r,s=r.__v;s=s.__;)if(s.__c){s.__c.__$f|=4;break}var d=Ve(function(){var p=o.value.value;return p===0?0:p===!0?"":p||""}),h=Ve(function(){return!Array.isArray(d.value)&&!ba(d.value)}),u=fe(function(){if(this.N=Oa,h.value){var p=d.value;c.__v&&c.__v.__e&&c.__v.__e.nodeType===3&&(c.__v.__e.data=p)}}),v=r.__$u.d;return r.__$u.d=function(){u(),v.call(this)},[h,d]},[]),i=a[0],l=a[1];return i.value?l.peek():l.value}Ga.displayName="ReactiveTextNode";Object.defineProperties(oe.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:Ga},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});Ut("__b",function(t,r){if(Dn&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),typeof r.type=="string"){var n,o=r.props;for(var a in o)if(a!=="children"){var i=o[a];i instanceof oe&&(n||(r.__np=n={}),n[a]=i,o[a]=i.peek())}}t(r)});Ut("__r",function(t,r){if(Dn&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.enterComponent(r),r.type!==N){mn();var n,o=r.__c;o&&(o.__$f&=-2,(n=o.__$u)===void 0&&(o.__$u=n=(function(a){var i;return fe(function(){i=this}),i.c=function(){o.__$f|=1,o.setState({})},i})())),mn(n)}t(r)});Ut("__e",function(t,r,n,o){Dn&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),mn(),t(r,n,o)});Ut("diffed",function(t,r){Dn&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),mn();var n;if(typeof r.type=="string"&&(n=r.__e)){var o=r.__np,a=r.props;if(o){var i=n.U;if(i)for(var l in i){var c=i[l];c!==void 0&&!(l in o)&&(c.d(),i[l]=void 0)}else i={},n.U=i;for(var s in o){var d=i[s],h=o[s];d===void 0?(d=Ri(n,s,h,a),i[s]=d):d.o(h,a)}}}t(r)});function Ri(t,r,n,o){var a=r in t&&t.ownerSVGElement===void 0,i=g(n);return{o:function(l,c){i.value=l,o=c},d:fe(function(){this.N=Oa;var l=i.value.value;o[r]!==l&&(o[r]=l,a?t[r]=l:l!=null&&(l!==!1||r[4]==="-")?t.setAttribute(r,l):t.removeAttribute(r))})}}Ut("unmount",function(t,r){if(typeof r.type=="string"){var n=r.__e;if(n){var o=n.U;if(o){n.U=void 0;for(var a in o){var i=o[a];i&&i.d()}}}}else{var l=r.__c;if(l){var c=l.__$u;c&&(l.__$u=void 0,c.d())}}t(r)});Ut("__h",function(t,r,n,o){(o<3||o===9)&&(r.__$f|=2),t(r,n,o)});er.prototype.shouldComponentUpdate=function(t,r){var n=this.__$u,o=n&&n.s!==void 0;for(var a in r)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var i=2&this.__$f;if(!(o||i||4&this.__$f)||1&this.__$f)return!0}else if(!(o||4&this.__$f)||3&this.__$f)return!0;for(var l in t)if(l!=="__source"&&t[l]!==this.props[l])return!0;for(var c in this.props)if(!(c in t))return!0;return!1};function Pi(t,r){return Re(function(){return g(t,r)})[0]}var Ti=function(t){queueMicrotask(function(){queueMicrotask(t)})};function Li(){Ai(function(){for(var t;t=Ua.shift();)ja.call(t)})}function Oa(){Ua.push(this)===1&&(F.requestAnimationFrame||Ti)(Li)}function Ni(t,r){r!==void 0?console.warn(t,r):console.warn(t)}function Bi(t,r){r!==void 0?console.error(t,r):console.error(t)}function Pe(t){const r=`[${t}]`;return{debug:(n,o)=>void 0,info:(n,o)=>void 0,warn:(n,o)=>Ni(`${r} ${n}`,o),error:(n,o)=>Bi(`${r} ${n}`,o)}}const ta=Pe("Firebase"),Fi={apiKey:"AIzaSyCr-Ej5jeuV3kdvquu2W_R0ffSrUW0OUcQ",authDomain:"tennis-coordinator-43f53.firebaseapp.com",databaseURL:"https://tennis-coordinator-43f53-default-rtdb.firebaseio.com",projectId:"tennis-coordinator-43f53",storageBucket:"tennis-coordinator-43f53.firebasestorage.app",messagingSenderId:"665148711646",appId:"1:665148711646:web:66d14722800a12f5a3184f",measurementId:"G-J0KVB2Q93W"};let kt=null;function Ha(){if(kt)return kt;try{return window.firebase.initializeApp(Fi),kt=window.firebase.database(),ta.info("Firebase initialized successfully"),kt}catch(t){throw ta.error("Firebase initialization error:",t),t}}function R(){return kt||Ha()}const ji=g("legacy");g({format:"legacy"});g(null);g(null);g(null);g(null);function Ui(t,r){const n=t.slice(1).split("/").filter(Boolean),a=new URLSearchParams(r).get("group");if(a)return{type:"legacy",legacyGroupId:a};if(n.length===0)return{type:"landing"};if(n.length===1){const i=n[0];return i==="admin"?{type:"admin"}:i.startsWith("join-")||i.length===8?{type:"join",inviteCode:i.replace("join-","")}:ji.value==="legacy"?{type:"legacy",legacyGroupId:i}:{type:"club",clubShortCode:i}}return n.length===2?{type:"group",clubShortCode:n[0],groupShortCode:n[1]}:{type:"landing"}}Ve(()=>typeof window>"u"?{type:"landing"}:Ui(window.location.pathname,window.location.search));function Gi(){const t="deviceToken";let r=localStorage.getItem(t);return r||(r="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,n=>{const o=Math.random()*16|0;return(n==="x"?o:o&3|8).toString(16)}),localStorage.setItem(t,r)),r}const G=g(null),no=g(!1),oo=g(null),lt=g(null),ra=Ve(()=>{const t=G.value;return t?.groupLinks?Object.keys(t.groupLinks).length:0});function Wa(t){return`platform/users/${t}`}function Va(t){return`platform/users/${t}/profile`}function Ya(t,r){return`platform/users/${t}/groupLinks/${r}`}async function Oi(){try{no.value=!0,oo.value=null;const t=Gi();lt.value=t;const r=R();if(!r)throw new Error("Firebase database not initialized");const n=r.ref(Wa(t)),o=await n.once("value");if(o.exists()){const a=o.val();G.value=a,await r.ref(Va(t)).update({lastActiveAt:Date.now()})}else{const a={profile:{displayName:"",createdAt:Date.now(),lastActiveAt:Date.now()},settings:{notifications:{enabled:!0}},groupLinks:{}};await n.set(a),G.value=a}}catch(t){const r=t instanceof Error?t.message:"Unknown error";oo.value=r,console.warn("[PlatformUser] Initialization failed (non-fatal):",r)}finally{no.value=!1}}async function Hi(){try{const t=lt.value;if(!t)return;const r=R();if(!r)return;const n=await r.ref(Wa(t)).once("value");n.exists()&&(G.value=n.val())}catch(t){console.warn("[PlatformUser] Refresh failed (non-fatal):",t)}}async function Mo(t,r){try{const n=lt.value;if(!n){console.warn("[PlatformUser] No device token, skipping group link");return}const o=R();if(!o){console.warn("[PlatformUser] No database, skipping group link");return}const a=Date.now(),i={memberName:r,linkedAt:a,lastActive:a},l=o.ref(Ya(n,t));(await l.once("value")).exists()?await l.update({memberName:r,lastActive:a}):await l.set(i),G.value&&(G.value={...G.value,groupLinks:{...G.value.groupLinks,[t]:i}}),G.value?.profile.displayName===""&&await Ro({displayName:r});const s=G.value?.profile;if(s&&(s.phone||s.email))try{const d=o.ref(`groups/${t}/settings/memberDetails/${r}`),u=(await d.once("value")).val()||{},v={};s.phone&&!u.phone&&(v.phone=s.phone),s.email&&!u.email&&(v.email=s.email),Object.keys(v).length>0&&await d.update(v)}catch(d){console.warn("[PlatformUser] Contact sync failed (non-fatal):",d)}}catch(n){const o=n instanceof Error?n.message:"Unknown error";console.warn("[PlatformUser] Group link failed (non-fatal):",o)}}async function Wi(t){try{const r=lt.value;if(!r)return;const n=R();if(!n)return;await n.ref(Ya(r,t)).update({lastActive:Date.now()}),G.value?.groupLinks[t]&&(G.value={...G.value,groupLinks:{...G.value.groupLinks,[t]:{...G.value.groupLinks[t],lastActive:Date.now()}}})}catch(r){console.warn("[PlatformUser] Activity update failed (non-fatal):",r)}}async function Ro(t){try{const r=lt.value;if(!r)throw new Error("No device token");const n=R();if(!n)throw new Error("No database");const o={...t,lastActiveAt:Date.now()};await n.ref(Va(r)).update(o),G.value&&(G.value={...G.value,profile:{...G.value.profile,...o}})}catch(r){const n=r instanceof Error?r.message:"Unknown error";throw oo.value=n,r}}function Vi(){const t=G.value;return t?.groupLinks?Object.entries(t.groupLinks).map(([r,n])=>({groupId:r,...n})).sort((r,n)=>n.lastActive-r.lastActive):[]}function Yi({config:t,selected:r,onSelect:n}){const o=!t.available;return e("button",{type:"button",class:`group-type-card ${r?"selected":""} ${o?"disabled":""}`,onClick:o?void 0:n,disabled:o,children:[o&&e("span",{class:"coming-soon-badge",children:"Coming Soon"}),e("div",{class:"card-icon",children:qi(t.id)}),e("h3",{class:"card-title",children:t.name}),e("p",{class:"card-description",children:t.description}),e("ul",{class:"card-features",children:t.features.map((a,i)=>e("li",{children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"})}),a]},i))}),r&&!o&&e("div",{class:"selected-indicator",children:e("svg",{viewBox:"0 0 24 24",width:"24",height:"24",fill:"white",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"})})}),e("style",{children:`
        .group-type-card {
          position: relative;
          width: 100%;
          padding: 20px;
          border: 2px solid #e0e0e0;
          border-radius: 16px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          font-family: inherit;
        }

        .group-type-card:hover:not(.disabled) {
          border-color: var(--color-primary-light, #81C784);
          background: #fafffe;
        }

        .group-type-card.selected {
          border-color: var(--color-primary, #2C6E49);
          background: #e8f5e9;
          box-shadow: 0 0 0 3px rgba(44, 110, 73, 0.15);
        }

        .group-type-card.disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #f5f5f5;
        }

        .coming-soon-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #9e9e9e;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-primary-light, #E8F5E9);
          border-radius: 12px;
          color: var(--color-primary, #2C6E49);
        }

        .group-type-card.disabled .card-icon {
          background: #e0e0e0;
          color: #9e9e9e;
        }

        .card-title {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .group-type-card.disabled .card-title {
          color: #666;
        }

        .card-description {
          margin: 0 0 16px 0;
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }

        .card-features {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .card-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #555;
          margin-bottom: 6px;
        }

        .card-features li svg {
          color: var(--color-primary, #2C6E49);
          flex-shrink: 0;
        }

        .group-type-card.disabled .card-features li svg {
          color: #9e9e9e;
        }

        .selected-indicator {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          background: var(--color-primary, #2C6E49);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `})]})}function qi(t){switch(t){case"tight-knit":return e("svg",{viewBox:"0 0 24 24",width:"28",height:"28",fill:"currentColor",children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})});case"casual-dropin":return e("svg",{viewBox:"0 0 24 24",width:"28",height:"28",fill:"currentColor",children:e("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})});case"club-community":return e("svg",{viewBox:"0 0 24 24",width:"28",height:"28",fill:"currentColor",children:e("path",{d:"M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"})});case"location-flexible":return e("svg",{viewBox:"0 0 24 24",width:"28",height:"28",fill:"currentColor",children:e("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"})});case"competitive":return e("svg",{viewBox:"0 0 24 24",width:"28",height:"28",fill:"currentColor",children:e("path",{d:"M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"})});default:return e("svg",{viewBox:"0 0 24 24",width:"28",height:"28",fill:"currentColor",children:e("circle",{cx:"12",cy:"12",r:"10"})})}}function Ki(){const t=Date.now().toString(36),r=Math.random().toString(36).substring(2,8);return`${t}-${r}`}function na(t=6){const r="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let n="";for(let o=0;o<t;o++)n+=r.charAt(Math.floor(Math.random()*r.length));return n}function Ji(t){return{groupName:t,members:[],memberDetails:{},groupPin:Lt(),adminPin:Lt(),location:{lat:37.2358,lon:-121.9623,name:"Los Gatos, CA"}}}function Lt(){return Math.floor(1e3+Math.random()*9e3).toString()}async function Qi(t){if(!t)throw new Error("Database not available");let r=0;const n=10;for(;r<n;){const o=na(6);if(!(await t.ref(`shortCodeIndex/${o}`).once("value")).exists())return o;r++}return na(8)}async function Xi(){try{return(await(await fetch("https://api.ipify.org?format=json",{signal:AbortSignal.timeout(3e3)})).json()).ip}catch{console.warn("[GroupCreation] Failed to capture IP address");return}}function Zi(t){return`${window.location.origin}/${t}`}async function el(t){const r=R();if(!r)return{success:!1,error:"Database not available"};try{const n=Ki(),o=await Qi(r),a=t.groupPin||Lt(),i=t.adminPin||Lt(),[l]=await Promise.all([Xi()]),c=typeof navigator<"u"?navigator.userAgent:void 0,s=Ji(t.name);s.groupPin=a,s.adminPin=i,s.members=[t.creatorName],t.location&&(s.location={lat:0,lon:0,name:t.location}),s.memberDetails={[t.creatorName]:{addedBy:"Self (Group Creator)",addedDate:Date.now(),email:t.creatorEmail,phone:t.creatorPhone}};const d={name:t.creatorName,email:t.creatorEmail,phone:t.creatorPhone,ipAddress:l,userAgent:c},h={archetype:t.archetype||"tight-knit",createdAt:Date.now(),createdBy:lt.value||"anonymous",shortCode:o,creator:d};await Promise.all([r.ref(`groups/${n}/settings`).set(s),r.ref(`groups/${n}/metadata`).set(h),r.ref(`shortCodeIndex/${o}`).set(n)]),lt.value&&Mo(n,t.creatorName).catch(v=>{console.warn("[GroupCreation] Failed to link creator to group:",v)});const u=Zi(o);return{success:!0,groupId:n,shortCode:o,groupPin:a,adminPin:i,shareUrl:u}}catch(n){return console.error("[GroupCreation] Failed to create group:",n),{success:!1,error:n instanceof Error?n.message:"Unknown error"}}}const tl=[{id:"tight-knit",name:"Tight-knit Group",description:"Your tennis crew, organized. Invite friends, coordinate matches, and share via WhatsApp, text, or in-app alerts. Any format: doubles, singles, or mixed.",features:["Invite-only, PIN-protected","Weather-aware scheduling","Auto-balanced match making","One-click share to WhatsApp/SMS"],namePlaceholder:"e.g., Tuesday Tennis Gang",available:!0},{id:"casual-dropin",name:"Casual Drop-in",description:"Open coordination for players who want to find games easily.",features:["Open registration","Singles or doubles","Flexible commitment","Welcome newcomers"],namePlaceholder:"e.g., Central Park Morning Tennis",available:!1},{id:"club-community",name:"Club Community",description:"For larger tennis clubs with varied skill levels and preferences.",features:["Admin-managed membership","Skill level filtering","Partner preferences","Privacy controls"],namePlaceholder:"e.g., Bay Club 18+ Tennis",available:!1},{id:"location-flexible",name:"Location Flexible",description:"For groups that play across different locations and need to coordinate.",features:["Multiple venue options","Location voting","Travel distance awareness","Flexible scheduling"],namePlaceholder:"e.g., Bay Area Tennis Friends",available:!1},{id:"competitive",name:"Competitive League",description:"Skill-focused play with NTRP ratings and level matching.",features:["NTRP-based matching","Skill level requirements","Competitive play focus","Match history tracking"],namePlaceholder:"e.g., USTA Practice Partners",available:!1}];function rl(){return tl}const Po=g(!1),Xe=g(1),It=g(null),xn=g(!1),it=g(null),st=g(""),Nt=g(""),dr=g(""),pr=g(""),ur=g(""),hr=g(""),gr=g(""),qt=g(!1);function qa(){Xe.value=1,It.value="tight-knit",st.value="",Nt.value="",dr.value="",pr.value="",ur.value="",hr.value="",gr.value="",qt.value=!0,xn.value=!1,it.value=null}function ao(){qa(),hr.value=Lt(),gr.value=Lt(),Po.value=!0}function Ka(){Po.value=!1,qa()}function io(t){Xe.value=t}function Ja(){return st.value.trim().length>0&&Nt.value.trim().length>0&&dr.value.trim().length>0&&pr.value.trim().length>0&&ur.value.trim().length>0}async function nl(){if(!Ja()||!It.value)return;xn.value=!0;const t=await el({name:st.value.trim(),location:ur.value.trim(),creatorName:Nt.value.trim(),creatorEmail:dr.value.trim(),creatorPhone:pr.value.trim(),groupPin:hr.value,adminPin:gr.value,archetype:It.value});it.value=t,xn.value=!1,t.success&&io(3)}function ol(){const t=it.value;t?.shortCode&&t?.groupId&&(localStorage.setItem(`sessionUser_${t.groupId}`,Nt.value.trim()),sessionStorage.setItem(`pinAuth_${t.groupId}`,"true"),window.location.href=`/${t.shortCode}`)}function al(t){const r=it.value;if(!r?.shareUrl)return;const n=`Join my tennis group "${st.value}"!

Link: ${r.shareUrl}
PIN: ${r.groupPin}`;switch(t){case"copy":navigator.clipboard.writeText(n);break;case"whatsapp":window.open(`https://wa.me/?text=${encodeURIComponent(n)}`,"_blank");break;case"sms":window.open(`sms:?body=${encodeURIComponent(n)}`,"_blank");break}}function lo(){if(!Po.value)return null;const t=rl();return e("div",{class:"drawer-backdrop",onClick:n=>{n.target.classList.contains("drawer-backdrop")&&Ka()},children:[e("div",{class:"create-group-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"progress-indicator",children:[1,2,3].map(n=>e("div",{class:`progress-dot ${Xe.value>=n?"active":""} ${Xe.value===n?"current":""}`},n))}),Xe.value===1&&e(il,{archetypes:t,selectedArchetype:It.value,onSelect:n=>{It.value=n},onContinue:()=>io(2)}),Xe.value===2&&e(ll,{selectedArchetype:t.find(n=>n.id===It.value),onBack:()=>io(1),onSubmit:nl,isCreating:xn.value,error:it.value?.error}),Xe.value===3&&it.value?.success&&e(sl,{result:it.value,groupName:st.value,onShare:al,onGoToGroup:ol})]}),e("style",{children:`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .create-group-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0 20px 30px;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
          position: sticky;
          top: 0;
          background: white;
          z-index: 1;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        .progress-indicator {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e0e0e0;
          transition: all 0.2s;
        }

        .progress-dot.active {
          background: var(--color-primary, #2C6E49);
        }

        .progress-dot.current {
          width: 24px;
          border-radius: 4px;
        }
      `})]})}function il({archetypes:t,selectedArchetype:r,onSelect:n,onContinue:o}){const a=t.filter(l=>l.available),i=t.filter(l=>!l.available);return e("div",{class:"step-content",children:[e("h2",{class:"step-title",children:"What type of group?"}),e("p",{class:"step-subtitle",children:"Choose the type that best fits how your group plays"}),e("div",{class:"type-cards",children:a.map(l=>e(Yi,{config:l,selected:r===l.id,onSelect:()=>n(l.id)},l.id))}),i.length>0&&e("div",{class:"coming-soon-section",children:[e("p",{class:"coming-soon-label",children:"More group types coming soon:"}),e("div",{class:"coming-soon-list",children:i.map(l=>e("span",{class:"coming-soon-item",children:l.name},l.id))})]}),e("div",{class:"step-actions",children:[e("button",{class:"cancel-btn",onClick:Ka,children:"Cancel"}),e("button",{class:"continue-btn",onClick:o,disabled:!r,children:"Continue"})]}),e("style",{children:`
        .step-content {
          padding: 0;
        }

        .step-title {
          font-size: 22px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
          text-align: center;
        }

        .step-subtitle {
          font-size: 14px;
          color: #666;
          margin: 0 0 24px 0;
          text-align: center;
        }

        .type-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .coming-soon-section {
          margin-bottom: 24px;
          padding: 12px 16px;
          background: #f9f9f9;
          border-radius: 10px;
        }

        .coming-soon-label {
          font-size: 12px;
          color: #888;
          margin: 0 0 8px 0;
        }

        .coming-soon-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .coming-soon-item {
          display: inline-block;
          padding: 6px 12px;
          background: #e8e8e8;
          border-radius: 16px;
          font-size: 12px;
          color: #666;
        }

        .step-actions {
          display: flex;
          gap: 12px;
        }

        .cancel-btn {
          flex: 1;
          padding: 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #e8e8e8;
        }

        .continue-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .continue-btn:hover:not(:disabled) {
          background: var(--color-primary-dark, #1a402b);
        }

        .continue-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `})]})}function ll({selectedArchetype:t,onBack:r,onSubmit:n,isCreating:o,error:a}){return e("div",{class:"step-content",children:[e("h2",{class:"step-title",children:"Group Details"}),e("p",{class:"step-subtitle",children:"Tell us about your tennis group"}),a&&e("div",{class:"error-message",children:a}),e("div",{class:"form-section",children:[e("label",{class:"field-label",children:["Group Name ",e("span",{class:"required",children:"*"})]}),e("input",{type:"text",class:"form-input",placeholder:t?.namePlaceholder||"e.g., Tuesday Tennis Gang",value:st.value,onInput:i=>{st.value=i.target.value}})]}),e("div",{class:"form-section",children:[e("label",{class:"field-label",children:["Your Name ",e("span",{class:"required",children:"*"})]}),e("input",{type:"text",class:"form-input",placeholder:"Your name (you'll be the first member)",value:Nt.value,onInput:i=>{Nt.value=i.target.value}}),e("p",{class:"field-helper",children:"You'll be the group admin"})]}),e("div",{class:"form-section",children:[e("label",{class:"field-label",children:["Email ",e("span",{class:"required",children:"*"})]}),e("input",{type:"email",class:"form-input",placeholder:"your@email.com",value:dr.value,onInput:i=>{dr.value=i.target.value}}),e("p",{class:"field-helper",children:"So we can reach you if there are issues with your group"})]}),e("div",{class:"form-section",children:[e("label",{class:"field-label",children:["Phone ",e("span",{class:"required",children:"*"})]}),e("input",{type:"tel",class:"form-input",placeholder:"(555) 123-4567",value:pr.value,onInput:i=>{pr.value=i.target.value}}),e("p",{class:"field-helper",children:"Alternative way to contact you about your group"})]}),e("div",{class:"form-section",children:[e("label",{class:"field-label",children:["Location ",e("span",{class:"required",children:"*"})]}),e("input",{type:"text",class:"form-input",placeholder:"e.g., San Jose, CA or Riverside Courts",value:ur.value,onInput:i=>{ur.value=i.target.value}}),e("p",{class:"field-helper",children:"Used for weather forecasts on play days"})]}),e("div",{class:"form-section pins-form-section",children:[e("div",{class:"pins-header",children:[e("label",{class:"field-label",style:"margin-bottom: 0;",children:"Group PINs"}),e("button",{type:"button",class:"toggle-pins-btn",onClick:()=>{qt.value=!qt.value},children:qt.value?"Hide":"Show"})]}),qt.value&&e("div",{class:"pins-section",children:[e("div",{class:"pin-row",children:[e("label",{class:"pin-label",children:"Group PIN"}),e("input",{type:"text",class:"pin-input",value:hr.value,onInput:i=>{hr.value=i.target.value.replace(/\D/g,"").slice(0,8)},placeholder:"4-8 digits"})]}),e("div",{class:"pin-row",children:[e("label",{class:"pin-label",children:"Admin PIN"}),e("input",{type:"text",class:"pin-input",value:gr.value,onInput:i=>{gr.value=i.target.value.replace(/\D/g,"").slice(0,8)},placeholder:"4-8 digits"})]}),e("p",{class:"field-helper",style:"margin-top: 8px;",children:"Group PIN lets members access the group. Admin PIN lets you manage settings."})]})]}),e("div",{class:"step-actions",children:[e("button",{class:"back-btn",onClick:r,disabled:o,children:"Back"}),e("button",{class:"create-btn",onClick:n,disabled:!Ja()||o,children:o?"Creating...":"Create Group"})]}),e("style",{children:`
        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .form-section {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .required {
          color: #e53935;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .field-helper {
          font-size: 12px;
          color: #888;
          margin: 6px 0 0 0;
        }

        .pins-form-section {
          background: #f9f9f9;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e8e8e8;
        }

        .pins-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .toggle-pins-btn {
          padding: 6px 12px;
          background: transparent;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 13px;
          color: #666;
          cursor: pointer;
        }

        .toggle-pins-btn:hover {
          background: #eee;
        }

        .pins-section {
          margin-top: 12px;
        }

        .pin-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .pin-row:last-of-type {
          margin-bottom: 0;
        }

        .pin-label {
          font-size: 14px;
          color: #555;
          min-width: 80px;
        }

        .pin-input {
          flex: 1;
          padding: 10px 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          font-family: monospace;
          letter-spacing: 2px;
        }

        .pin-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .back-btn {
          flex: 1;
          padding: 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .back-btn:hover:not(:disabled) {
          background: #e8e8e8;
        }

        .back-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .create-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .create-btn:hover:not(:disabled) {
          background: var(--color-primary-dark, #1a402b);
        }

        .create-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `})]})}function sl({result:t,groupName:r,onShare:n,onGoToGroup:o}){return e("div",{class:"step-content confirmation",children:[e("div",{class:"success-icon",children:e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"white",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"})})}),e("h2",{class:"step-title",children:"Group Created!"}),e("p",{class:"step-subtitle",children:['"',r,'" is ready to go']}),e("div",{class:"info-card",children:[e("div",{class:"info-row",children:[e("span",{class:"info-label",children:"Share Link"}),e("span",{class:"info-value link",children:t.shareUrl})]}),e("div",{class:"info-row",children:[e("span",{class:"info-label",children:"Group PIN"}),e("span",{class:"info-value pin",children:t.groupPin})]}),e("div",{class:"info-row",children:[e("span",{class:"info-label",children:"Admin PIN"}),e("span",{class:"info-value pin",children:t.adminPin})]})]}),e("p",{class:"save-reminder",children:"Save these PINs! You'll need the Admin PIN to manage your group."}),e("div",{class:"share-buttons",children:[e("button",{class:"share-btn copy",onClick:()=>n("copy"),children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]}),e("button",{class:"share-btn whatsapp",onClick:()=>n("whatsapp"),children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{class:"share-btn sms",onClick:()=>n("sms"),children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"})}),"SMS"]})]}),e("button",{class:"go-to-group-btn",onClick:o,children:"Go to My Group"}),e("style",{children:`
        .confirmation {
          text-align: center;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: var(--color-primary, #2C6E49);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          animation: scaleIn 0.3s ease-out;
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        .info-card {
          background: #f5f5f5;
          border-radius: 12px;
          padding: 16px;
          margin: 20px 0;
          text-align: left;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 14px;
          color: #666;
        }

        .info-value {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .info-value.link {
          color: var(--color-primary, #2C6E49);
          word-break: break-all;
          text-align: right;
          max-width: 60%;
        }

        .info-value.pin {
          font-family: monospace;
          font-size: 16px;
          letter-spacing: 2px;
        }

        .save-reminder {
          font-size: 13px;
          color: #e65100;
          margin: 0 0 20px 0;
        }

        .share-buttons {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .share-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .share-btn:hover {
          opacity: 0.9;
        }

        .share-btn.copy {
          background: #e0e0e0;
          color: #333;
        }

        .share-btn.whatsapp {
          background: #25D366;
          color: white;
        }

        .share-btn.sms {
          background: #2196F3;
          color: white;
        }

        .go-to-group-btn {
          width: 100%;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .go-to-group-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }
      `})]})}function cl(){return e("div",{class:"landing-page",children:[e("div",{class:"landing-container",children:[e("h1",{children:"🎾 Tennis Coordinator"}),e("p",{class:"landing-tagline",children:"Turn your love for tennis into more games."}),e("p",{class:"landing-subtitle",children:"A simple tool that helps tennis groups self-organize matches with minimal friction—so you spend less time coordinating and more time on the court."}),e("div",{class:"landing-section",children:[e("h2",{children:"Why It Works"}),e("div",{class:"landing-features",children:[e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Frictionless"}),e("span",{children:"Check in with a few taps. No accounts, no apps to download."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Flexible"}),e("span",{children:"Handles doubles, singles, odd numbers, guests, and preferences."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Adaptable"}),e("span",{children:"Works for tight-knit groups of 20 or club communities of 50+."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Real-Time"}),e("span",{children:"Everyone sees who's playing instantly."})]})]})]})]}),e("div",{class:"landing-section landing-section-alt",children:[e("h2",{children:"How It Works"}),e("div",{class:"landing-steps",children:[e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"1"}),e("div",{children:[e("strong",{children:"Check In"}),e("span",{children:"Select your name, play style, and when you're available"})]})]}),e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"2"}),e("div",{children:[e("strong",{children:"Auto-Match"}),e("span",{children:"System organizes matches based on who's playing"})]})]}),e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"3"}),e("div",{children:[e("strong",{children:"Play"}),e("span",{children:"Show up and enjoy the game"})]})]})]})]}),e("div",{class:"landing-cta",children:[e("p",{children:"Have a group link? Visit your group's unique URL to get started."}),e("p",{class:"or-divider",children:"or"}),e("button",{class:"start-group-btn-secondary",onClick:ao,children:"Start Your Own Group"})]}),e("div",{class:"landing-footer",children:[e("a",{href:"whats-new.html",class:"whatsnew-link",children:"What's New"}),e("span",{class:"footer-separator",children:"|"}),e("a",{href:"#admin",class:"admin-link",onClick:t=>{t.preventDefault(),window.location.hash="admin",window.location.reload()},children:"Site Administrator? Access Site Admin →"})]})]}),e(lo,{}),e("style",{children:`
        .start-group-btn {
          display: inline-block;
          margin: 20px 0;
          padding: 16px 32px;
          background: var(--color-primary, #2C6E49);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(44, 110, 73, 0.25);
        }

        .start-group-btn:hover {
          background: var(--color-primary-dark, #1a402b);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(44, 110, 73, 0.3);
        }

        .or-divider {
          color: #999;
          font-size: 14px;
          margin: 12px 0;
        }

        .start-group-btn-secondary {
          display: inline-block;
          padding: 12px 24px;
          background: transparent;
          color: var(--color-primary, #2C6E49);
          border: 2px solid var(--color-primary, #2C6E49);
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .start-group-btn-secondary:hover {
          background: var(--color-primary, #2C6E49);
          color: white;
        }
      `})]})}function z(t){return t.toLowerCase().trim().replace(/\s+/g," ")}function An(t){switch(t){case"singles":return"Singles Only";case"doubles":return"Doubles Only";case"both":return"Either";default:return"Either"}}function Or(t){if(!t)return"";const[r,n]=t.split(":"),o=parseInt(r),a=o>=12?"PM":"AM";return`${o%12||12}:${n}${a}`}function ue(t,r){return!t&&!r?"":t&&r?`${Or(t)}-${Or(r)}`:t?`from ${Or(t)}`:r?`until ${Or(r)}`:""}function ee(t){return new Date(t+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function oa(t){return new Date(t+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function To(t){const r=new Date(t),n=new Date,o=r.toDateString()===n.toDateString(),a=r.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});return o?a:`${r.toLocaleDateString("en-US",{month:"short",day:"numeric"})} ${a}`}function so(t){const r=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${r}-${n}-${o}`}function dl(){return so(new Date)}function aa(t,r){return r[z(t)]||{include:[],exclude:[]}}function pl(t,r,n){const o=aa(t,n),a=aa(r,n),i=z(t),l=z(r);return!o.exclude.includes(l)&&!a.exclude.includes(i)}function ul(t,r){if(!t||!r||!t.start&&!t.end&&!r.start&&!r.end)return!0;const n=p=>{if(!p)return null;const[f,x]=p.split(":").map(Number);return f*60+x},o=n(t.start),a=n(t.end),i=n(r.start),l=n(r.end),c=360,s=1260,d=o??c,h=a??s,u=i??c;return d<(l??s)&&u<h}function Ht(t,r,n){return pl(t.name,r.name,n)?ul(t.timeRange,r.timeRange):!1}function Mn(t,r={}){const n=[],o=[],a=t.map((v,p)=>({...v,originalIndex:p}));a.sort((v,p)=>v.timestamp-p.timestamp);const i=a.filter(v=>v.playStyle==="doubles"),l=a.filter(v=>v.playStyle==="singles"),c=a.filter(v=>v.playStyle==="both"||!v.playStyle),s=[...i,...c].sort((v,p)=>v.timestamp-p.timestamp);for(;s.length>=4;){const v=s.slice(0,4);n.push({type:"doubles",number:n.filter(p=>p.type==="doubles").length+1,players:v}),s.splice(0,4)}const d=[...l].sort((v,p)=>v.timestamp-p.timestamp);for(;d.length>=2;){let v=null;for(let p=0;p<d.length-1;p++){for(let f=p+1;f<d.length;f++)if(Ht(d[p],d[f],r)){v=[d[p],d[f]];break}if(v)break}if(v)n.push({type:"singles",players:v}),v.forEach(p=>{const f=d.findIndex(x=>x.originalIndex===p.originalIndex);f>-1&&d.splice(f,1)});else break}const h=s,u=d;if(h.length>0){const v=4-h.length,p=h.filter(E=>E.playStyle==="both"||!E.playStyle),f=p.length,x=h.every(E=>E.playStyle==="both"||!E.playStyle),k=h.every(E=>E.allowRotation!==!1),b=h.length===3&&Ht(h[0],h[1],r)&&Ht(h[0],h[2],r)&&Ht(h[1],h[2],r);let w=!1;f>=2&&(w=Ht(p[0],p[1],r)),n.push({type:"doubles-forming",players:h,needed:v,canRotate:h.length===3&&x&&k&&b,eitherCount:f,canPlaySingles:w})}return u.length>0&&u.forEach(v=>{n.push({type:"singles-forming",players:[v],needed:1})}),{matches:n,warnings:o}}const hl=Pe("Theme"),ye=Pe("Notifications"),xe=Pe("MatchFormations"),ve=Pe("Checkins"),Rn=Pe("Members"),bn=Pe("Arrangements"),gl=Pe("Activity"),P=g({groupPin:"",adminPin:""});function Qa(t){const r=document.documentElement;if(r.classList.remove("theme-wimbledon","theme-roland-garros","theme-australian-open","theme-us-open","theme-clay","theme-hardcourt","theme-tennis-ball"),r.removeAttribute("data-theme"),t&&t!=="default"){const n=`theme-${t}`;r.classList.add(n),r.setAttribute("data-theme",t),hl.debug("Added class:",{themeClass:n,themeName:t,classes:r.className})}}const te=g({}),co=g({}),ia={};function J(t){return R().ref(t)}function vl(){U(()=>{const t=fe(()=>{const r=$.value;if(!r||r==="admin")return;J(`groups/${r}/settings`).once("value").then(o=>{const a=o.val()||{};ne.value=a.groupName||"Unknown Group",K.value=a.members||a.coreMembers||[],ae.value=a.memberDetails||{};const i=a.renamedMembers||{};if(C.value&&i[C.value]){const l=i[C.value];C.value=l,localStorage.setItem(`sessionUser_${r}`,l)}P.value={groupPin:a.groupPin||"",adminPin:a.adminPin||"",shortCode:a.shortCode,location:a.location,groupDescription:a.groupDescription,groupRules:a.groupRules,theme:a.theme},Qa(a.theme),document.title=`${a.groupName||"Tennis"} - Tennis Coordinator`}).catch(o=>{ve.error("Error loading group settings:",o),y("Failed to load group data","error")})});return()=>{t()}},[])}function fl(){U(()=>{let t=null,r=null;const n=fe(()=>{const o=$.value;t&&r&&t.off("value",r),!(!o||o==="admin")&&(t=J(`groups/${o}/checkins`),r=t.on("value",a=>{const i=a.val()||{};ie.value=i}))});return()=>{n(),t&&r&&t.off("value",r)}},[])}function ml(){U(()=>{let t=null,r=null;const n=fe(()=>{const o=$.value,a=j.value;if(t&&r&&t.off("value",r),!o||o==="admin"||!a){te.value={};return}t=J(`groups/${o}/matchNotes/${a}`),r=t.on("value",i=>{te.value=i.val()||{}})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function xl(){U(()=>{let t=null,r=null;const n=fe(()=>{const o=$.value;if(t&&r&&t.off("value",r),!o||o==="admin"){co.value={};return}t=J(`groups/${o}/matchNotes`),r=t.on("value",a=>{co.value=a.val()||{}})});return()=>{n(),t&&r&&t.off("value",r)}},[])}async function po(t){const r=$.value,n=j.value;if(!r||!n)return;const o=J(`groups/${r}/checkins/${n}`),a=ie.value[n]||[],i=z(t.name);if(a.some(s=>s.name&&z(s.name)===i)){y(`${t.name} is already checked in for this date!`,"error");return}const c={name:t.name,playStyle:t.playStyle,isGuest:t.isGuest,addedBy:t.addedBy,allowRotation:t.allowRotation,timestamp:Date.now()};t.timeRange&&(c.timeRange=t.timeRange);try{await o.set([...a,c]),await Se(r,n,"checkin",t.name,t.addedBy);const s=C.value;s&&z(t.name)===z(s)?Mo(r,s):s&&Wi(r),ve.debug("About to call notifyCheckinAlert for:",t.name);try{await kl(r,t.name,n,t.addedBy,{playStyle:t.playStyle,timeRange:t.timeRange,allowRotation:t.allowRotation}),ve.debug("notifyCheckinAlert completed")}catch(d){ve.error("Error in notifyCheckinAlert:",d)}setTimeout(()=>ei(r,n),500)}catch(s){ve.error("Error adding check-in:",s),y("Failed to check in","error")}}async function Xa(t,r,n){const o=$.value,a=j.value;if(!o||!a)return;const i=ie.value[a]||[],l=i[t];if(!l)return;const c=l.name||"this person",s=n&&z(n)===z(c),d=l.addedBy&&n&&z(n)===z(l.addedBy),h=sessionStorage.getItem(`adminAuth_${o}`)==="true";if(!s&&!d&&!h){y("You can only edit check-ins you added","error");return}const u=J(`groups/${o}/checkins/${a}`),v=[...i],p={};for(const[f,x]of Object.entries(r))x!==void 0&&(p[f]=x);v[t]={...v[t],...p};try{await u.set(v),y(`${c}'s preferences updated`,"success")}catch(f){ve.error("Error updating check-in:",f),y("Failed to update check-in","error")}}async function bl(t,r,n){const o=H.value;if(!o||!o.matches)return;const a={};for(const[c,s]of Object.entries(o.matches)){const d=(s.players||[]).filter(h=>z(h)!==z(n));d.length>0&&(a[c]={...s,players:d})}const i=(o.unassigned||[]).filter(c=>z(c)!==z(n));if(Object.keys(a).length===0&&i.length===0){try{await J(`groups/${t}/matchArrangements/${r}`).remove(),H.value=null}catch(c){bn.error("Error clearing arrangement after removal:",c)}return}const l={...o,matches:a,unassigned:i};try{await J(`groups/${t}/matchArrangements/${r}`).set(l),H.value=l}catch(c){bn.error("Error updating arrangement after removal:",c)}}async function Za(t,r){const n=$.value,o=j.value;if(!n||!o)return;const a=ie.value[o]||[],l=a[t]?.name||"this person",c=r&&z(r)===z(l),s=J(`groups/${n}/checkins/${o}`),d=a.filter((h,u)=>u!==t);try{await s.set(d.length>0?d:null),H.value&&l&&await bl(n,o,l),c&&r&&(Sn.value=r,zn.value=!0),await Se(n,o,"removal",l,r),ve.debug("About to call notifyRemovalAlert for:",l);try{await yl(n,l,o,r),ve.debug("notifyRemovalAlert completed")}catch(h){ve.error("Error in notifyRemovalAlert:",h)}setTimeout(()=>ei(n,o),500)}catch(h){ve.error("Error removing check-in:",h),y("Failed to remove check-in","error")}}async function Se(t,r,n,o,a,i={}){const l={timestamp:Date.now(),action:n,player:o,by:a||o,...i};Object.keys(l).forEach(c=>{l[c]===void 0&&delete l[c]});try{await R().ref(`groups/${t}/activity/${r}`).push(l)}catch(c){gl.error("Error logging activity:",c)}}async function yl(t,r,n,o){const i=z(r)===z(o)?`🎾 ${r} removed themselves from ${n}`:`🎾 ${r} was removed from ${n} by ${o}`;try{const l=R(),s=(await l.ref(`groups/${t}/userNotifications`).once("value")).val()||{};for(const[d,h]of Object.entries(s)){const u=h.preferences||{};if(u.activityAlerts){if(d===z(o))continue;const v=u.unwatchedMembers||u.mutedMembers||[];if(v.includes(r)||v.includes(o))continue;await l.ref(`groups/${t}/userNotifications/${d}/items`).push().set({message:i,timestamp:Date.now(),read:!1,date:n})}}}catch(l){ye.error("Error sending removal notifications:",l)}}function wl(t){switch(t){case"singles":return"Singles";case"doubles":return"Doubles";default:return"Either"}}async function kl(t,r,n,o,a){const i=z(r)===z(o),l=[];if(a.playStyle&&l.push(wl(a.playStyle)),a.timeRange){const d=ue(a.timeRange.start,a.timeRange.end);d&&l.push(d)}a.playStyle==="singles"&&a.allowRotation===!1&&l.push("No 3s");const c=l.length>0?` (${l.join(", ")})`:"",s=i?`🎾 ${r} checked in for ${n}${c}`:`🎾 ${r} was added for ${n} by ${o}${c}`;try{const d=R(),u=(await d.ref(`groups/${t}/userNotifications`).once("value")).val()||{};ye.debug("Found userNotifications entries:",Object.keys(u));for(const[v,p]of Object.entries(u)){const f=p.preferences||{};if(ye.debug(`User ${v}:`,{activityAlerts:f.activityAlerts,unwatchedMembers:f.unwatchedMembers||f.mutedMembers}),f.activityAlerts){if(v===z(o)){ye.debug(`Skipping ${v} - is addedBy`);continue}if(v===z(r)){ye.debug(`Skipping ${v} - is player`);continue}const x=f.unwatchedMembers||f.mutedMembers||[];if(x.includes(r)||x.includes(o)){ye.debug(`Skipping ${v} - player/adder is unwatched`);continue}ye.debug(`Sending notification to ${v}`),await d.ref(`groups/${t}/userNotifications/${v}/items`).push().set({message:s,timestamp:Date.now(),read:!1,date:n}),ye.debug(`Notification sent to ${v}`)}}}catch(d){ye.error("Error sending check-in notifications:",d)}}async function ei(t,r){const n=ie.value[r]||[];if(n.length===0)return;const{matches:o}=Mn(n),a={};o.forEach(l=>{if(l.type==="doubles"||l.type==="singles"){const c=l.players.map(s=>z(s.name)).sort().join(",");a[c]={type:l.type,players:l.players.map(s=>s.name)}}});const i=ia[r]||{};xe.debug("Match state comparison:",{date:r,previousMatches:Object.keys(i).length,currentMatches:Object.keys(a).length,prevKeys:Object.keys(i),currentKeys:Object.keys(a)});for(const[l,c]of Object.entries(a))if(!i[l]){const s=oa(r),d=c.type==="doubles"?"Doubles":"Singles";for(const h of c.players){const u=c.players.filter(p=>z(p)!==z(h)),v=`✅ You're in ${d} for ${s} with ${u.join(", ")}`;try{const p=R(),x=(await p.ref(`groups/${t}/userNotifications/${z(h)}/preferences`).once("value")).val()||{};xe.debug(`Player "${h}" prefs:`,{matchConfirmations:x.matchConfirmations,willSend:x.matchConfirmations!==!1}),x.matchConfirmations!==!1?(await p.ref(`groups/${t}/userNotifications/${z(h)}/items`).push().set({message:v,timestamp:Date.now(),read:!1,date:r,type:"match_formed",matchType:d}),xe.info(`✅ Sent notification to ${h}: "${v}"`)):xe.debug(`❌ Skipped ${h} - matchConfirmations disabled`)}catch(p){xe.error(`Error sending match notification to ${h}:`,p)}}}for(const[l,c]of Object.entries(i))if(!a[l]){const s=oa(r),d=c.type==="doubles"?"Doubles":"Singles",h=n.map(b=>z(b.name)),u=c.players.filter(b=>h.includes(z(b))),v=c.players.filter(b=>!h.includes(z(b))),p=v.join(", "),f=d==="Doubles"?4-u.length:2-u.length,x=f===1?"Need 1 more player":`Need ${f} more players`,k=v.length>0?`⚠️ Your ${d} for ${s} is no longer confirmed - ${p} dropped out. ${x}.`:`⚠️ Your ${d} for ${s} is no longer confirmed.`;for(const b of c.players)try{const w=R(),I=(await w.ref(`groups/${t}/userNotifications/${z(b)}/preferences`).once("value")).val()||{};xe.debug(`Player "${b}" prefs:`,{matchConfirmations:I.matchConfirmations,willSend:I.matchConfirmations!==!1}),I.matchConfirmations!==!1?(await w.ref(`groups/${t}/userNotifications/${z(b)}/items`).push().set({message:k,timestamp:Date.now(),read:!1,date:r,type:"match_dissolved",matchType:d}),xe.info(`✅ Sent dissolved notification to ${b}: "${k}"`)):xe.debug(`❌ Skipped ${b} - matchConfirmations disabled`)}catch(w){xe.error(`Error sending dissolved match notification to ${b}:`,w)}}ia[r]=a}async function Nn(t,r,n,o,a,i){const l=o.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase()).replace("Forming 1","(forming)");let c;if(a==="added"){const s=i&&i.length>30?i.substring(0,30)+"...":i;c=`📝 ${n} added note to ${l}: "${s}"`}else if(a==="updated"){const s=i&&i.length>30?i.substring(0,30)+"...":i;c=`📝 ${n} updated note on ${l}: "${s}"`}else c=`📝 ${n} removed note from ${l}`;try{const s=R(),h=(await s.ref(`groups/${t}/userNotifications`).once("value")).val()||{};for(const[u,v]of Object.entries(h)){const p=v.preferences||{};if(p.activityAlerts){if(u===z(n)||(p.unwatchedMembers||p.mutedMembers||[]).includes(n))continue;await s.ref(`groups/${t}/userNotifications/${u}/items`).push().set({message:c,timestamp:Date.now(),read:!1,date:r})}}}catch(s){ye.error("Error sending note notifications:",s)}}async function Cl(){const t=$.value,r=j.value;if(!(!t||!r))try{await J(`groups/${t}/checkins/${r}`).remove(),await J(`groups/${t}/matchNotes/${r}`).remove(),y("Day reset","success")}catch(n){ve.error("Error resetting day:",n),y("Failed to reset day","error")}}const Hr={};async function _l(t,r){const n=$.value,o=j.value;if(!(!n||!o))try{const a=`${n}:${o}:${t}`,i=Hr[a]??te.value[t]??"",l=C.value||"Unknown";await J(`groups/${n}/matchNotes/${o}/${t}`).set(r||null),r&&!i?(await Se(n,o,"note_added",l,l,{matchKey:t,noteContent:r}),await Nn(n,o,l,t,"added",r),Hr[a]=r,y("Note added","success")):r&&i&&r!==i?(await Se(n,o,"note_updated",l,l,{matchKey:t,noteContent:r,previousNote:i}),await Nn(n,o,l,t,"updated",r),Hr[a]=r,y("Note updated","success")):!r&&i&&(await Se(n,o,"note_removed",l,l,{matchKey:t,previousNote:i}),await Nn(n,o,l,t,"removed"),delete Hr[a],y("Note removed","info"))}catch(a){xe.error("Error saving match note:",a),y("Failed to save note","error")}}async function Lo(t){const r=$.value;if(!r)return;const n=J(`groups/${r}/settings`);try{const a=(await n.once("value")).val()||{},i=a.members||[],l=a.memberDetails||{};if(i.includes(t.name)){y("Member already exists","error");return}const c=[...i,t.name].sort(),s={...l,[t.name]:{addedBy:t.addedBy,addedDate:new Date().toISOString(),phone:t.phone||"",email:t.email||"",notes:t.notes||""}};await n.update({members:c,memberDetails:s}),K.value=c,ae.value=s;const d=j.value||new Date().toISOString().split("T")[0];await Se(r,d,"member_added",t.name,t.addedBy,{contact:t.phone||t.email||void 0,notes:t.notes||void 0});const h=`${window.location.origin}${window.location.pathname}?group=${r}`;ze.value={action:"invite",name:t.name,date:d,groupName:ne.value||"Tennis Group",groupUrl:h,groupPin:P.value.groupPin||""},_e.value=!0}catch(o){Rn.error("Error adding member:",o),y("Failed to add member","error")}}async function ti(t){const r=$.value;if(!r)return;const n=J(`groups/${r}/settings`);try{const a=(await n.once("value")).val()||{},i=a.members||[],l=a.memberDetails||{},c=i.filter(u=>u!==t),s={...l};delete s[t],await n.update({members:c,memberDetails:s}),K.value=c,ae.value=s;const d=j.value||new Date().toISOString().split("T")[0],h=C.value||"Admin";await Se(r,d,"member_removed",t,h),y(`${t} removed from members`,"info")}catch(o){Rn.error("Error removing member:",o),y("Failed to remove member","error")}}async function zl(t,r){const n=$.value;if(!n)return!1;const o=J(`groups/${n}/settings`);try{const l=((await o.once("value")).val()||{}).memberDetails||{},c=l[t]||{},s={...l,[t]:{...c,phone:r.phone??c.phone??"",email:r.email??c.email??"",notes:r.notes??c.notes??"",shareContactInDirectory:r.shareContactInDirectory??c.shareContactInDirectory??!1,shareNotesInDirectory:r.shareNotesInDirectory??c.shareNotesInDirectory??!1}};return await o.update({memberDetails:s}),ae.value=s,y("Profile updated","success"),!0}catch(a){return Rn.error("Error updating member details:",a),y("Failed to update profile","error"),!1}}async function ri(t,r){const n=$.value;if(!n)return!1;const o=r.trim();if(!o)return y("Name cannot be empty","error"),!1;if(o===t)return!0;const a=J(`groups/${n}/settings`);try{const l=(await a.once("value")).val()||{},c=l.members||[],s=l.memberDetails||{};if(c.some(w=>w.toLowerCase()===o.toLowerCase()&&w!==t))return y("A member with this name already exists","error"),!1;const d=c.map(w=>w===t?o:w).sort(),h={...s};h[t]&&(h[o]=h[t],delete h[t]);const v={...l.renamedMembers||{},[t]:o};await a.update({members:d,memberDetails:h,renamedMembers:v}),K.value=d,ae.value=h,C.value===t&&(C.value=o,localStorage.setItem(`sessionUser_${n}`,o));const p=R(),x=(await p.ref(`groups/${n}/checkins`).once("value")).val()||{};for(const[w,E]of Object.entries(x))if(E&&typeof E=="object"){const I=Object.values(E);let S=!1;const m=I.map(_=>_&&_.name===t?(S=!0,{..._,name:o}):_);S&&await p.ref(`groups/${n}/checkins/${w}`).set(m)}const k=j.value||new Date().toISOString().split("T")[0],b=C.value||"Admin";return await Se(n,k,"member_renamed",o,b,{oldName:t}),y(`${t} renamed to ${o}`,"success"),!0}catch(i){return Rn.error("Error renaming member:",i),y("Failed to rename member","error"),!1}}function Sl(t){return t!==null&&typeof t=="object"&&"matches"in t&&"arrangedBy"in t&&"arrangedAt"in t}const H=g(null);async function $l(t){const r=$.value,n=j.value;if(!r||!n)return;const o=C.value||"Admin",a={...t,arrangedBy:o,arrangedAt:Date.now()};try{await J(`groups/${r}/matchArrangements/${n}`).set(a),H.value=a;const i=Object.keys(t.matches).length,l=Object.values(t.matches).reduce((h,u)=>h+(u.players?.length||0),0)+(t.unassigned?.length||0),c=[],s=Object.keys(t.matches).sort();for(const h of s){const v=t.matches[h]?.players||[];if(v.length>0){const p=h.replace("-"," ").replace(/\b\w/g,x=>x.toUpperCase()),f=h.startsWith("singles")&&v.length===2?`${v[0]} vs ${v[1]}`:v.join(", ");c.push(`${p}: ${f}`)}}t.unassigned?.length>0&&c.push(`Unassigned: ${t.unassigned.join(", ")}`);const d=c.join(" | ");await Se(r,n,"arrangement_saved",o,o,{matchCount:i,playerCount:l,arrangementDetails:d}),y("Match arrangement saved","success")}catch(i){bn.error("Error saving match arrangement:",i),y("Failed to save arrangement","error")}}async function Il(){const t=$.value,r=j.value;if(!t||!r)return;const n=C.value||"Admin";try{await J(`groups/${t}/matchArrangements/${r}`).remove(),H.value=null,await Se(t,r,"arrangement_cleared",n,n),y("Arrangement cleared - using auto-organization","info")}catch(o){bn.error("Error clearing match arrangement:",o),y("Failed to clear arrangement","error")}}function El(){U(()=>{let t=null,r=null;const n=fe(()=>{const o=$.value,a=j.value;if(t&&r&&t.off("value",r),!o||o==="admin"||!a){H.value=null;return}t=J(`groups/${o}/matchArrangements/${a}`),r=t.on("value",i=>{const l=i.val();H.value=Sl(l)?l:null})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function Ye({isOpen:t,onClose:r,title:n,subtitle:o,children:a,showCloseButton:i=!0}){return t?e("div",{class:"modal active",onClick:l=>{l.target===l.currentTarget&&r&&r()},children:e("div",{class:"modal-content",onClick:l=>l.stopPropagation(),children:[e("div",{class:"modal-header",children:[e("div",{children:[e("h2",{children:n}),o&&e("p",{style:"font-size: 12px; color: #666; margin: 4px 0 0 0;",children:o})]}),i&&r&&e("button",{class:"close-btn",onClick:r,children:"×"})]}),a]})}):null}g(!1);g(!1);g(!1);g([]);g(!1);const Pn=g([]);g(!1);let Et=null;function Dl(){const t=$.value,r=C.value;if(!(!t||!r)){Et&&Et();try{const o=R().ref(`groups/${t}/userNotifications/${z(r)}/items`),a=o.on("value",i=>{const l=i.val()||{},c=Object.entries(l).map(([s,d])=>({id:s,...d}));Pn.value=c.sort((s,d)=>d.timestamp-s.timestamp)});Et=()=>{o.off("value",a)}}catch(n){console.error("Error subscribing to notifications:",n)}}}async function Al(t){const r=$.value,n=C.value;if(!(!r||!n))try{await R().ref(`groups/${r}/userNotifications/${z(n)}/items/${t}/read`).set(!0)}catch(o){console.error("Error marking notification as read:",o)}}function Ml(){U(()=>{const t=$.value,r=C.value;return t&&r&&Dl(),()=>{Et&&(Et(),Et=null)}},[$.value,C.value])}async function Rl(t){const r=$.value,n=C.value;if(!(!r||!n))try{await R().ref(`groups/${r}/userNotifications/${z(n)}/items/${t}`).remove()}catch(o){console.error("Error clearing notification:",o)}}async function Pl(){const t=$.value,r=C.value;if(!(!t||!r))try{const n=R(),o={};Pn.value.forEach(a=>{a.read||(o[`${a.id}/read`]=!0)}),Object.keys(o).length>0&&await n.ref(`groups/${t}/userNotifications/${z(r)}/items`).update(o)}catch(n){console.error("Error marking all as read:",n)}}const he=g("checkin");function Tl(){he.value="profile"}const Bn=Ve(()=>Pn.value.filter(t=>!t.read).length),Ll=[{id:"checkin",label:"Check-in",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>'},{id:"matches",label:"My Games",icon:'<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M5 5c2 3 2 6 2 7s0 4-2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M19 5c-2 3-2 6-2 7s0 4 2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M5 5c2 3 2 6 2 7s0 4-2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M19 5c-2 3-2 6-2 7s0 4 2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>'},{id:"directory",label:"Team",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>'},{id:"notifications",label:"Alerts",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>'}];function Nl(){const[t,r]=Re(!1);return U(()=>{const n=requestAnimationFrame(()=>{requestAnimationFrame(()=>{r(!0)})});return()=>cancelAnimationFrame(n)},[]),e("nav",{style:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",height:"calc(56px + env(safe-area-inset-bottom, 0px))",paddingBottom:"env(safe-area-inset-bottom, 0px)",background:"#fff",borderTop:"1px solid #e0e0e0",display:"flex",justifyContent:"space-around",alignItems:"flex-start",paddingTop:"4px",zIndex:1e3,boxShadow:"var(--shadow-lg, 0 -2px 10px rgba(0,0,0,0.1))"},children:Ll.map(n=>{const o=he.value===n.id,a=n.id==="notifications"&&Bn.value>0;return e("button",{onClick:()=>{he.value=n.id},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px",background:"none",border:"none",padding:"8px 12px",cursor:"pointer",color:o?"var(--color-primary, #2C6E49)":"#666",position:"relative",minWidth:"60px"},children:[n.useImageIcon?e("img",{src:o?n.activeIcon:n.icon,alt:n.label,style:{width:"24px",height:"24px",opacity:o?1:.7}}):e("div",{style:{position:"relative"},dangerouslySetInnerHTML:{__html:o?n.activeIcon:n.icon}}),a&&e("span",{style:{position:"absolute",top:"2px",right:"8px",background:"#f44336",color:"white",fontSize:"10px",padding:"1px 5px",borderRadius:"10px",minWidth:"16px",textAlign:"center"},children:Bn.value>9?"9+":Bn.value}),e("span",{style:{fontSize:"10px",fontWeight:o?"600":"400"},children:n.label})]},n.id)})})}const Bl=""+new URL("wimbledon-xfTrdB-N.png",import.meta.url).href,Fl=""+new URL("usopen-Bs-XeyJ-.png",import.meta.url).href,rn=g(!1),vr=g(!1),Wr=[{id:"default",name:"Classic",color:"#2C6E49",lightBg:"#E8F5E9",hoverBg:"#C8E6C9",logo:null,emoji:"🎾"},{id:"wimbledon",name:"Wimbledon",color:"#1B5E20",lightBg:"#E8F5E9",hoverBg:"#C8E6C9",logo:Bl,emoji:"🏆"},{id:"roland-garros",name:"Roland-Garros",color:"#cc4e0e",lightBg:"#FBE9E7",hoverBg:"#FFCCBC",logo:"https://images.prismic.io/fft-rg-site%2F95765448-c7fa-428b-b565-8368dba90b17_logo.svg",emoji:"🗼"},{id:"australian-open",name:"Australian Open",color:"#0277BD",lightBg:"#E1F5FE",hoverBg:"#B3E5FC",logo:"https://ausopen.com/sites/default/files/styles/medium/public/ao_blue_1.png?itok=dcy08jHH",emoji:"🦘"},{id:"us-open",name:"US Open",color:"#0D47A1",lightBg:"#E3F2FD",hoverBg:"#BBDEFB",logo:Fl,emoji:"🗽"}];function la(){const t=$.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function jl(){const[t,r]=Re(la()),[n,o]=Re(!1),a=Do(null);U(()=>{const s=setInterval(()=>{r(la())},1e3);return()=>clearInterval(s)},[]),U(()=>{function s(d){a.current&&!a.current.contains(d.target)&&o(!1)}return n&&document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[n]);const i=P.value?.theme||"default",l=Wr.find(s=>s.id===i)||Wr[0],c=async s=>{Qa(s==="default"?void 0:s);const d=$.value;if(d)try{await R().ref(`groups/${d}/settings/theme`).set(s==="default"?null:s),P.value={...P.value,theme:s==="default"?void 0:s};const u=Wr.find(v=>v.id===s)?.name||"Classic";y(`Theme: ${u}`,"success")}catch(h){console.error("Error saving theme:",h)}o(!1)};return e("h1",{style:"display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-md, 8px);",children:[e("div",{ref:a,style:{position:"relative",display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",minWidth:0},children:[e("button",{onClick:s=>{s.stopPropagation(),t&&o(!n)},title:t?"Change theme":l.name,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",background:t?"var(--color-bg-card, white)":"transparent",border:t?`2px solid ${l.color}`:"none",borderRadius:"var(--radius-full, 50%)",cursor:t?"pointer":"default",fontSize:"var(--font-size-lg, 16px)",padding:l.logo?"3px":"0",flexShrink:0,boxShadow:t?"var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))":"none"},className:t?"hover-admin-badge":"",children:[l.logo?e("img",{src:l.logo,alt:l.name,style:{width:"100%",height:"100%",objectFit:"contain"},onError:s=>{const d=s.target;d.style.display="none";const h=d.nextElementSibling;h&&(h.style.display="block")}}):null,e("span",{style:{display:l.logo?"none":"block"},children:l.emoji})]}),e("span",{id:"groupNameDisplay",style:"font-size: var(--font-size-xl, 18px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; padding-top: 2px;",children:ne.value||"Tennis Coordinator"}),n&&t&&e("div",{style:{position:"absolute",top:"32px",left:"0",background:"var(--color-bg-card, white)",borderRadius:"var(--radius-xl, 12px)",boxShadow:"var(--shadow-lg, 0 4px 20px rgba(0,0,0,0.15))",padding:"var(--spacing-md, 8px)",minWidth:"180px",zIndex:1e3},children:Wr.map(s=>e("button",{onClick:()=>c(s.id),style:{display:"flex",alignItems:"center",gap:"var(--spacing-lg, 10px)",width:"100%",padding:"var(--spacing-lg, 10px) var(--spacing-xl, 12px)",background:i===s.id?`${s.color}15`:"transparent",border:"none",borderRadius:"var(--radius-lg, 8px)",cursor:"pointer",textAlign:"left",transition:"background 0.2s"},onMouseEnter:d=>{i!==s.id&&(d.currentTarget.style.background="var(--color-bg-muted, #f5f5f5)")},onMouseLeave:d=>{i!==s.id&&(d.currentTarget.style.background="transparent")},children:[e("span",{style:{width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center"},children:s.logo?e("img",{src:s.logo,alt:s.name,style:{width:"24px",height:"24px",objectFit:"contain"},onError:d=>{d.target.style.display="none"}}):e("span",{style:{fontSize:"var(--font-size-2xl, 20px)"},children:s.emoji})}),e("span",{style:{flex:1,fontWeight:i===s.id?"600":"400",color:i===s.id?s.color:"var(--color-text-primary, #333)"},children:s.name}),i===s.id&&e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:s.color,children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})})]},s.id))})]}),C.value&&e("button",{onClick:Tl,style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",background:t?"var(--color-warning-light, #FFF3E0)":l.lightBg,border:`1px solid ${t?"var(--color-warning, #FF9800)":l.color}40`,borderLeft:t?"3px solid var(--color-warning, #FF9800)":`3px solid ${l.color}`,borderRadius:"var(--radius-lg, 8px)",padding:"var(--spacing-sm, 6px) var(--spacing-lg, 10px)",fontSize:"var(--font-size-base, 14px)",fontWeight:"600",color:"var(--color-text-primary, #333)",cursor:"pointer",boxShadow:"var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",transition:"all 0.2s ease"},onMouseEnter:s=>{const d=s.currentTarget;d.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))",d.style.transform="translateY(-1px)",d.style.background=t?"#FFE0B2":l.hoverBg},onMouseLeave:s=>{const d=s.currentTarget;d.style.boxShadow="var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",d.style.transform="translateY(0)",d.style.background=t?"var(--color-warning-light, #FFF3E0)":l.lightBg},onMouseDown:s=>{const d=s.currentTarget;d.style.transform="translateY(0)",d.style.boxShadow="var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.1))"},onMouseUp:s=>{const d=s.currentTarget;d.style.transform="translateY(-1px)",d.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))"},children:[e("span",{style:{maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:C.value}),t&&e("span",{style:{background:"var(--color-warning, #FF9800)",color:"white",fontSize:"var(--font-size-2xs, 9px)",padding:"1px var(--spacing-xs, 4px)",borderRadius:"var(--radius-md, 4px)",fontWeight:"600",letterSpacing:"0.5px"},children:"ADMIN"}),e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",style:{opacity:.5,marginLeft:"-2px"},children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]})}const Vr=g(""),Wt=g("");function Ul({isOpen:t,groupName:r,correctPin:n,onSuccess:o}){const a=l=>{l.preventDefault(),Vr.value===n?(Wt.value="",Vr.value="",o()):(Wt.value="Invalid PIN. Please try again.",y("Invalid PIN","error"))},i=l=>{Vr.value=l.target.value,Wt.value=""};return e(Ye,{isOpen:t,title:"",showCloseButton:!1,children:[e("div",{class:"pin-modal-content",children:[e("div",{class:"pin-header",children:[e("p",{class:"tennis-icon",children:"🎾"}),e("h2",{children:"Welcome to"}),e("p",{class:"group-name",children:r||"Tennis Coordinator"})]}),e("p",{class:"pin-instruction",children:"Enter the group PIN to access check-ins"}),e("form",{onSubmit:a,children:[e("input",{type:"password",inputMode:"numeric",pattern:"[0-9]*",placeholder:"Enter PIN",value:Vr.value,onInput:i,class:"pin-input",autoFocus:!0}),Wt.value&&e("p",{class:"error-message",children:Wt.value}),e("button",{type:"submit",class:"pin-submit-btn",children:"Enter"})]}),e("p",{class:"pin-help",children:"Don't know the PIN? Ask your group admin."})]}),e("style",{children:`
        .pin-modal-content {
          padding: 0;
        }

        .pin-header {
          text-align: center;
          padding: 16px 20px 12px;
          background: linear-gradient(135deg, #f9fafb 0%, var(--color-primary-light, #e8f5e9) 100%);
          border-bottom: 1px solid #e5e7eb;
          margin: -20px -20px 0;
          border-radius: 12px 12px 0 0;
        }

        .pin-header .tennis-icon {
          font-size: 40px;
          margin: 0 0 6px;
        }

        .pin-header h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: #666;
        }

        .pin-header .group-name {
          margin: 4px 0 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-primary-dark, #1a402b);
        }

        .pin-instruction {
          text-align: center;
          color: #666;
          margin: 16px 0 12px;
          font-size: 13px;
        }

        .pin-input {
          width: 100%;
          padding: 14px;
          font-size: 22px;
          text-align: center;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          margin-bottom: 14px;
          letter-spacing: 6px;
          transition: border-color 0.2s;
        }

        .pin-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .error-message {
          color: var(--color-error, #f44336);
          font-size: 13px;
          margin-bottom: 14px;
          text-align: center;
        }

        .pin-submit-btn {
          width: 100%;
          padding: 14px;
          background: var(--color-primary, #2C6E49);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px var(--shadow-primary, rgba(44, 110, 73, 0.25));
          transition: all 0.2s;
        }

        .pin-submit-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .pin-help {
          font-size: 11px;
          color: #999;
          margin-top: 14px;
          text-align: center;
        }
      `})]})}const Dt=g(""),fr=g(""),mr=g(""),rt=g(""),At=g(""),Mt=g(""),xr=g(""),br=g(""),No=g(!0),yr=g(""),uo=g(!1);function Gl(){const t=$.value;if(!t)return!1;const r=`adminAuth_${t}`;return sessionStorage.getItem(r)==="true"}function Ol(){const t=$.value;t&&(sessionStorage.setItem(`adminAuth_${t}`,"true"),uo.value=!0)}function Hl(){Dt.value=ne.value||"",fr.value=P.value.adminPin||"",mr.value=P.value.groupPin||"",rt.value=P.value.location?.name||"",At.value=P.value.location?.lat?.toString()||"",Mt.value=P.value.location?.lon?.toString()||"",xr.value=P.value.groupDescription||"",br.value=P.value.groupRules||"",uo.value=Gl(),No.value=!uo.value&&!!P.value.adminPin,yr.value=""}async function Wl(t=!1){const r=$.value;if(r)try{const o=R().ref(`groups/${r}/settings`),a={groupName:Dt.value,adminPin:fr.value,groupPin:mr.value,groupDescription:xr.value||null,groupRules:br.value||null};rt.value&&At.value&&Mt.value&&(a.location={name:rt.value,lat:parseFloat(At.value),lon:parseFloat(Mt.value)}),await o.update(a),ne.value=Dt.value,P.value={...P.value,adminPin:fr.value,groupPin:mr.value,location:rt.value?{name:rt.value,lat:parseFloat(At.value),lon:parseFloat(Mt.value)}:void 0,groupDescription:xr.value||void 0,groupRules:br.value||void 0},y("Settings saved","success"),t&&ho()}catch(n){console.error("Error saving settings:",n),y("Failed to save settings","error")}}function sa(){yr.value===P.value.adminPin?(Ol(),No.value=!1,vr.value=!1,y("Admin mode enabled","success")):(y("Incorrect PIN","error"),yr.value="")}function ho(){vr.value=!1}function Vl(){return vr.value&&Dt.value===""&&ne.value&&Hl(),e(Ye,{isOpen:vr.value,onClose:ho,title:"Admin Settings",subtitle:`Managing: ${ne.value}`,children:No.value?e("div",{style:"padding: var(--spacing-3xl, 20px); text-align: center;",children:[e("p",{style:"margin-bottom: var(--spacing-2xl, 16px); color: var(--color-text-secondary, #666);",children:"Enter admin PIN to access settings"}),e("input",{type:"password",placeholder:"Admin PIN",value:yr.value,onInput:t=>{yr.value=t.target.value},onKeyPress:t=>{t.key==="Enter"&&sa()},style:"width: 100%; max-width: 200px; padding: var(--spacing-xl, 12px); text-align: center; font-size: var(--font-size-xl, 18px); border: 2px solid var(--color-border, #e0e0e0); border-radius: var(--radius-lg, 8px); margin-bottom: var(--spacing-2xl, 16px);"}),e("br",{}),e("button",{onClick:sa,style:"padding: var(--spacing-xl, 12px) 32px; background: var(--color-primary, #2C6E49); color: white;",children:"Submit"})]}):e(N,{children:[e("div",{style:"margin-bottom: var(--spacing-2xl, 16px);",children:e("div",{style:"display: flex; justify-content: space-between; align-items: center;",children:[e("h3",{style:"margin: 0; color: var(--color-text-primary, #333);",children:"Group Settings"}),e("span",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-secondary, #666); background: var(--color-bg-muted, #f5f5f5); padding: 2px var(--spacing-md, 8px); border-radius: var(--radius-lg, 10px);",children:"Click Save to apply"})]})}),e("div",{class:"pref-section",children:[e("h3",{children:"Group Name"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Display name for this tennis group"}),e("input",{type:"text",placeholder:"e.g., Tue/Thu Midday Doubles",value:Dt.value,onInput:t=>{Dt.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Group Story"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Tell your group's story - when/where you play, how it started, etc."}),e("textarea",{placeholder:"e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts...",value:xr.value,onInput:t=>{xr.value=t.target.value},rows:3,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Rules & Tips"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"House rules, etiquette, and tips for new members (one per line)"}),e("textarea",{placeholder:`e.g.,
Check in by 10am on game days
Bring water and sunscreen
New balls provided by rotating member...`,value:br.value,onInput:t=>{br.value=t.target.value},rows:4,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Admin PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Required to access admin settings"}),e("input",{type:"text",value:fr.value,onInput:t=>{fr.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Group PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Share this PIN with all group members to access the app"}),e("input",{type:"text",value:mr.value,onInput:t=>{mr.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Weather Location"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Set the location for weather forecasts"}),e("input",{type:"text",placeholder:"Location name (e.g., Los Gatos, CA)",value:rt.value,onInput:t=>{rt.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-md, 8px);"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);",children:[e("input",{type:"number",step:"0.0001",placeholder:"Latitude",value:At.value,onInput:t=>{At.value=t.target.value},style:"flex: 1;"}),e("input",{type:"number",step:"0.0001",placeholder:"Longitude",value:Mt.value,onInput:t=>{Mt.value=t.target.value},style:"flex: 1;"})]}),e("p",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);",children:["Tip: Use"," ",e("a",{href:"https://www.latlong.net/",target:"_blank",style:"color: var(--color-primary, #2C6E49);",children:"latlong.net"})," ","to find coordinates"]})]}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-top: var(--spacing-2xl, 16px);",children:[e("button",{onClick:ho,style:"flex: 1; background: var(--color-border, #e0e0e0); color: var(--color-text-primary, #333);",children:"Close"}),e("button",{onClick:()=>Wl(!0),style:"flex: 1; background: var(--color-primary, #2C6E49); color: white;",children:"Save & Close"})]})]})})}const ni={login:{label:"Logins",actions:["user_login"]},checkin:{label:"Check-ins",actions:["check-in","checkin"]},removal:{label:"Removals",actions:["removal"]},shared:{label:"Shared",actions:["whatsapp_share"]},notes:{label:"Notes",actions:["notes_saved","note_added","note_updated","note_removed"]},members:{label:"Members",actions:["member_added","member_removed","member_renamed"]},arrangements:{label:"Arrangements",actions:["arrangement_saved","arrangement_cleared"]}},bt=g(!1),wr=g([]),go=g(!1),Ce=g(new Set);async function Yl(){const t=$.value;if(t){go.value=!0;try{const r=R(),n=[],a=(await r.ref(`groups/${t}/activity`).once("value")).val();if(a){for(const[i,l]of Object.entries(a))if(l)for(const[c,s]of Object.entries(l))n.push({...s,date:i,firebaseKey:c})}n.sort((i,l)=>l.timestamp-i.timestamp),wr.value=n}catch(r){console.error("Error loading activity:",r)}finally{go.value=!1}}}async function ql(t){const r=$.value;if(!(!r||!t.firebaseKey||!t.date)&&confirm("Remove this activity entry?"))try{await R().ref(`groups/${r}/activity/${t.date}/${t.firebaseKey}`).remove(),wr.value=wr.value.filter(o=>!(o.date===t.date&&o.firebaseKey===t.firebaseKey))}catch(n){console.error("Error deleting activity:",n),alert("Failed to delete activity")}}function Kl(t){return To(t)}function Jl(t){switch(t){case"check-in":case"checkin":return"✅";case"removal":return"❌";case"member_added":return"👤";case"member_removed":return"🚫";case"member_renamed":return"✏️";case"whatsapp_share":return"📤";case"notes_saved":case"note_added":return"📝";case"note_updated":return"✏️";case"note_removed":return"🗑️";case"user_login":return"🔓";case"arrangement_saved":return"🔀";case"arrangement_cleared":return"↩️";default:return"📋"}}function Ql(t){const{action:r,player:n,by:o,playStyle:a,timeRange:i,matchKey:l,type:c}=t;switch(r){case"check-in":case"checkin":{let s=`${n} checked in`;return o&&o!==n&&(s+=` (by ${o})`),a&&(s+=` - ${An(a)}`,(i?.start||i?.end)&&(s+=` (${i.start||"anytime"}–${i.end||"anytime"})`)),s}case"removal":return o&&o!==n?`${o} removed ${n}`:`${n} removed themselves`;case"member_added":return`${o} added ${n} as member`;case"member_removed":return`${o} removed ${n} from members`;case"member_renamed":return`${o} renamed ${t.oldName} to ${n}`;case"whatsapp_share":{let d=`${o} shared ${c==="matches"?"matches":c==="checkin"?"check-in":"removal"} to WhatsApp`;return n&&n!==o&&(d+=` (for ${n})`),d}case"notes_saved":case"note_added":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} added note to ${s}${d}`}case"note_updated":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} updated note on ${s}${d}`}case"note_removed":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match";return`${o} removed note from ${s}`}case"user_login":return`${n} logged in`;case"arrangement_saved":{const{matchCount:s}=t;let d=`${o} arranged matches`;return s&&(d+=` (${s} match${s>1?"es":""})`),d}case"arrangement_cleared":return`${o} cleared arrangement (back to auto)`;default:return`${n} - ${r}`}}function Xl(t){const r=new Set(Ce.value);r.has(t)?r.delete(t):r.add(t),Ce.value=r}function Zl(){if(Ce.value.size===0)return wr.value;const t=new Set;return Ce.value.forEach(r=>{ni[r].actions.forEach(n=>t.add(n))}),wr.value.filter(r=>t.has(r.action))}function es(){rn.value=!1,bt.value=!1,Ce.value=new Set}function ts(){U(()=>{rn.value&&Yl()},[rn.value]);const t=Zl(),r={};return bt.value?t.forEach(n=>{r[n.date]||(r[n.date]=[]),r[n.date].push(n)}):t.forEach(n=>{const o=new Date(n.timestamp).toISOString().split("T")[0];r[o]||(r[o]=[]),r[o].push(n)}),e(Ye,{isOpen:rn.value,onClose:es,title:"Activity History",children:[e("div",{style:"display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;",children:[Object.entries(ni).map(([n,o])=>{const a=Ce.value.has(n);return e("button",{onClick:()=>Xl(n),style:{padding:"4px 10px",fontSize:"12px",border:a?"1px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #ddd)",borderRadius:"var(--radius-2xl, 16px)",background:a?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, #fff)",color:a?"var(--color-primary, #2E7D32)":"var(--color-text-secondary, #666)",cursor:"pointer",fontWeight:a?"500":"400"},children:o.label},n)}),Ce.value.size>0&&e("button",{onClick:()=>{Ce.value=new Set},style:{padding:"4px 10px",fontSize:"var(--font-size-sm, 12px)",border:"1px solid var(--color-error, #f44336)",borderRadius:"var(--radius-2xl, 16px)",background:"var(--color-bg-card, #fff)",color:"var(--color-error, #f44336)",cursor:"pointer"},children:"Clear"})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin: 0;",children:[bt.value?"Grouped by play date":"Grouped by when changes were made",Ce.value.size>0&&` (${t.length} filtered)`]}),e("label",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); cursor: pointer; display: flex; align-items: center; gap: 4px;",children:[e("input",{type:"checkbox",checked:bt.value,onChange:n=>{bt.value=n.target.checked}}),"Group by Play Date"]})]}),e("div",{style:"max-height: 400px; overflow-y: auto;",children:go.value?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:"Loading..."}):t.length===0?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:Ce.value.size>0?"No matching activities":"No activity recorded yet"}):Object.entries(r).sort(([n],[o])=>o.localeCompare(n)).map(([n,o])=>e("div",{children:[e("div",{style:"font-weight: bold; color: var(--color-text-secondary, #666); margin-top: 12px; padding-bottom: 4px; border-bottom: 1px solid var(--color-border, #ddd);",children:ee(n)}),o.map((a,i)=>e("div",{style:"padding: 10px; background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-md, 6px); font-size: var(--font-size-base, 14px); margin-top: 8px; position: relative;",children:e("div",{style:"display: flex; align-items: flex-start; gap: 6px;",children:[e("span",{children:Jl(a.action)}),e("div",{style:"flex: 1;",children:[e("div",{style:"white-space: pre-wrap;",children:Ql(a)}),a.arrangementDetails&&e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-top: 4px; background: var(--color-bg-card, #fff); padding: 6px 8px; border-radius: var(--radius-sm, 4px); border: 1px solid var(--color-border, #e0e0e0);",children:a.arrangementDetails}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #999); margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap;",children:[e("span",{children:Kl(a.timestamp)}),bt.value?e("span",{style:"color: var(--color-text-secondary, #666);",children:["changed on"," ",ee(new Date(a.timestamp).toISOString().split("T")[0])]}):e("span",{style:"color: var(--color-primary, #2C6E49);",children:["for ",ee(a.date)]})]})]}),e("button",{onClick:()=>ql(a),title:"Remove this activity",style:{background:"none",border:"none",padding:"var(--spacing-xs, 4px)",cursor:"pointer",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-lg, 16px)",lineHeight:"1",borderRadius:"var(--radius-sm, 4px)"},className:"hover-danger",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})},i))]},n))})]})}const Bo=g(!1),Fo=g(""),jo=g(""),Uo=g("");function Go(t){const r=ne.value||"our tennis group",n=$.value,o=window.location.href.split("?")[0]+"?group="+n,a=P.value.groupPin||"";return`Hi ${t}! You've been added to ${r} tennis coordination.

Check in for upcoming matches here:
${o}

PIN: ${a}

Just select your name and check in when you can play!`}function rs(t,r){const n=t.replace(/[\s\-\(\)]/g,""),o=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(o)?`sms:${n}&body=${encodeURIComponent(r)}`:`sms:${n}?body=${encodeURIComponent(r)}`}function ns(t,r,n){return`mailto:${t}?subject=${encodeURIComponent(r)}&body=${encodeURIComponent(n)}`}async function os(t){const r=Go(t),n=ne.value||"Tennis Group";try{await navigator.share({title:`Join ${n}`,text:r}),nt(),y("Shared successfully!","success")}catch(o){o.name!=="AbortError"&&(console.error("Share failed:",o),oi(t))}}async function oi(t){const r=Go(t);try{await navigator.clipboard.writeText(r),nt(),y("Message copied! Paste in SMS or email.","success")}catch{const o=document.createElement("textarea");o.value=r,o.style.position="fixed",o.style.left="-9999px",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),nt(),y("Message copied! Paste in SMS or email.","success")}}function nt(){Bo.value=!1,Fo.value="",jo.value="",Uo.value=""}function as(t,r,n){Fo.value=t,jo.value=r||"",Uo.value=n||"",Bo.value=!0}function is(){const t=Fo.value,r=jo.value,n=Uo.value,o=Go(t),a=ne.value||"Tennis Group",i=typeof navigator<"u"&&navigator.share!==void 0;return e(Ye,{isOpen:Bo.value,onClose:nt,title:"",showCloseButton:!1,children:e("div",{style:{textAlign:"center",padding:"10px 0"},children:[e("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:["Invite ",t,"?"]}),e("p",{style:{margin:"0 0 16px 0",color:"#666",fontSize:"14px"},children:"Send them an invite with the group link and PIN"}),e("div",{style:{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"},children:[r&&e("a",{href:rs(r,o),onClick:()=>setTimeout(nt,500),style:{background:"#25D366",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[e("span",{children:"📱"})," Text ",r]}),n&&e("a",{href:ns(n,`You're invited to ${a}`,o),onClick:()=>setTimeout(nt,500),style:{background:"#4285F4",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[e("span",{children:"📧"})," Email"]}),i&&e("button",{onClick:()=>os(t),style:{background:"#9C27B0",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"},children:[e("span",{children:"📤"})," Other"]}),e("button",{onClick:()=>oi(t),style:{background:"#607D8B",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"},children:[e("span",{children:"📋"})," Copy"]})]}),e("button",{onClick:nt,style:{marginTop:"12px",background:"none",border:"none",color:"#999",fontSize:"14px",cursor:"pointer"},children:"Skip"})]})})}const ai=g(!1),Bt=g(null),yn=g(""),kr=g(""),Cr=g(""),_r=g(""),Ke=g(""),wn=g(!1),zr=g(""),Sr=g(""),$r=g(""),Ir=g("");async function ls(){const t=zr.value.trim();if(!t){y("Please enter member name","error");return}const r=Sr.value.trim(),n=$r.value.trim();await Lo({name:t,phone:r,email:n,notes:Ir.value.trim(),addedBy:C.value||"Admin"}),zr.value="",Sr.value="",$r.value="",Ir.value="",wn.value=!1}function ii(){zr.value="",Sr.value="",$r.value="",Ir.value="",wn.value=!1}function ss(t){confirm(`Remove ${t} from the group?`)&&ti(t)}function cs(t){Bt.value=t,yn.value=t;const r=ae.value[t]||{};kr.value=r.phone||"",Cr.value=r.email||"",_r.value=r.notes||""}async function ds(){const t=Bt.value;if(!t)return;const r=$.value;if(!r)return;const n=yn.value.trim();try{if(n!==t&&!await ri(t,n))return;const o=n!==t?n:t;await R().ref(`groups/${r}/settings/memberDetails/${o}`).update({phone:kr.value,email:Cr.value,notes:_r.value}),ae.value={...ae.value,[o]:{...ae.value[o]||{},phone:kr.value,email:Cr.value,notes:_r.value}},Bt.value=null,n===t&&y("Member updated","success")}catch(o){console.error("Error updating member:",o),y("Failed to update member","error")}}function ps(){ai.value=!1,Bt.value=null,Ke.value="",ii()}function us(){const t=K.value,r=ae.value,n=t.filter(o=>o.toLowerCase().includes(Ke.value.toLowerCase())).sort((o,a)=>o.localeCompare(a));return e(Ye,{isOpen:ai.value,onClose:ps,title:"Manage Members",subtitle:`${t.length} members in group`,children:[Bt.value&&e("div",{style:"position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1001;",children:e("div",{style:"background: white; padding: 24px; border-radius: 12px; max-width: 400px; width: 90%;",children:[e("h3",{style:"margin-top: 0;",children:"Edit Member"}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Name"}),e("input",{type:"text",placeholder:"Member name",value:yn.value,onInput:o=>{yn.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Phone"}),e("input",{type:"tel",placeholder:"Phone number",value:kr.value,onInput:o=>{kr.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Email"}),e("input",{type:"email",placeholder:"Email address",value:Cr.value,onInput:o=>{Cr.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 16px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Notes"}),e("textarea",{placeholder:"Notes (skill level, etc.)",rows:2,value:_r.value,onInput:o=>{_r.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; box-sizing: border-box;"})]}),e("div",{style:"display: flex; gap: 8px;",children:[e("button",{onClick:()=>{Bt.value=null},style:"flex: 1; background: #ccc; color: #333;",children:"Cancel"}),e("button",{onClick:ds,style:"flex: 1; background: var(--color-primary, #2C6E49); color: white;",children:"Save"})]})]})}),e("div",{style:"margin-bottom: 16px;",children:e("div",{style:"position: relative;",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%);",children:e("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"})}),e("input",{type:"text",placeholder:"Search members...",value:Ke.value,onInput:o=>{Ke.value=o.target.value},style:"width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"}),Ke.value&&e("button",{onClick:()=>{Ke.value=""},style:"position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 0;",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})})]})}),e("div",{style:"max-height: 400px; overflow-y: auto; margin-bottom: 16px;",children:n.length===0?e("div",{style:"text-align: center; padding: 20px; color: #888;",children:Ke.value?"No members found":"No members yet"}):n.map(o=>{const a=r[o],i=a&&(a.phone||a.email||a.addedBy),l=a&&(a.phone||a.email),c=a?.addedDate?new Date(a.addedDate).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):null;return e("div",{style:"flex-direction: column; align-items: flex-start; padding: 12px; background: #f9f9f9; border-radius: 8px; margin-bottom: 8px;",children:[e("div",{style:"display: flex; justify-content: space-between; width: 100%; align-items: center;",children:[e("span",{style:"font-weight: 500;",children:o}),e("div",{style:"display: flex; gap: 4px;",children:[e("button",{onClick:()=>cs(o),style:{background:"rgba(76, 175, 80, 0.1)",color:"var(--color-primary, #2C6E49)",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Edit",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})}),l&&e("button",{onClick:()=>as(o,a?.phone,a?.email),style:{background:"rgba(33, 150, 243, 0.1)",color:"#2196F3",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Invite",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})})}),e("button",{onClick:()=>ss(o),style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Remove",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})]}),i&&e("div",{style:"font-size: 12px; color: #666; margin-top: 8px; padding-left: 12px; border-left: 3px solid var(--color-primary, #2C6E49);",children:[a?.addedBy&&e("div",{children:["Added by: ",e("strong",{children:a.addedBy}),c&&` on ${c}`]}),a?.phone&&e("div",{children:["📱 ",a.phone]}),a?.email&&e("div",{children:["📧 ",a.email]}),a?.notes&&e("div",{children:["Notes: ",a.notes]})]})]},o)})}),e("div",{style:"padding-top: 12px; border-top: 1px solid #e0e0e0;",children:wn.value?e("div",{style:"background: #f9f9f9; padding: 16px; border-radius: 8px;",children:[e("h4",{style:"margin: 0 0 12px 0; font-size: 14px; color: #333;",children:"Add New Member"}),e("input",{type:"text",placeholder:"Member's full name",value:zr.value,onInput:o=>{zr.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; margin-bottom: 8px; box-sizing: border-box;"}),e("div",{style:"display: flex; gap: 8px; margin-bottom: 8px;",children:[e("input",{type:"tel",placeholder:"Phone (optional)",value:Sr.value,onInput:o=>{Sr.value=o.target.value},style:"flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"}),e("input",{type:"email",placeholder:"Email (optional)",value:$r.value,onInput:o=>{$r.value=o.target.value},style:"flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("textarea",{placeholder:"Notes (skill level, how you know them, etc.) - optional",rows:2,value:Ir.value,onInput:o=>{Ir.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; margin-bottom: 12px; box-sizing: border-box; font-family: inherit;"}),e("div",{style:"font-size: 12px; color: #666; margin-bottom: 12px;",children:["Added by: ",e("strong",{children:C.value||"Admin"})]}),e("div",{style:"display: flex; gap: 8px;",children:[e("button",{onClick:ii,style:"flex: 1; padding: 10px; background: #ccc; color: #333; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;",children:"Cancel"}),e("button",{onClick:ls,style:"flex: 2; padding: 10px; background: var(--color-primary, #2C6E49); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;",children:"Add Member"})]})]}):e("button",{onClick:()=>{wn.value=!0},style:"width: 100%; padding: 12px; background: var(--color-primary, #2C6E49); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 8px;",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})}),"Add New Member"]})})]})}const Er=g(!1),Fn=g(""),Kt=g(!1),Ct=g(""),rr=g(!1);async function hs(t,r){try{const n=R(),o=new Date().toISOString().split("T")[0];await n.ref(`groups/${t}/activity/${o}`).push({timestamp:Date.now(),action:"user_login",player:r,by:r})}catch(n){console.error("Error logging login activity:",n)}}function li(t){C.value=t;const r=$.value;r&&(localStorage.setItem(`sessionUser_${r}`,t),hs(r,t),Mo(r,t)),Sn.value=t,zn.value=!0,Er.value=!1,Kt.value=!1,Ct.value="",window.scrollTo(0,0),y(`Welcome, ${t}!`,"success")}async function ca(){const t=Ct.value.trim();if(!t){y("Please enter your name","error");return}const r=$.value;if(!r)return;const n=K.value;if(n.some(o=>o.toLowerCase()===t.toLowerCase())){y("This name is already in the group","error");return}rr.value=!0;try{const o=R(),a=[...n,t];await o.ref(`groups/${r}/settings/members`).set(a),K.value=a,li(t)}catch(o){console.error("Error adding self to group:",o),y("Failed to add yourself. Please try again.","error")}finally{rr.value=!1}}function gs(){const t=[...K.value].sort((a,i)=>a.localeCompare(i)),r=Fn.value.toLowerCase(),n=r?t.filter(a=>a.toLowerCase().includes(r)):t,o=a=>{Fn.value=a.target.value};return e(Ye,{isOpen:Er.value,title:"",showCloseButton:!1,children:[e("div",{class:"welcome-modal-content",children:[e("div",{class:"welcome-header",children:[e("h2",{children:"Welcome Back"}),e("p",{class:"group-name",children:ne.value})]}),e("p",{class:"instruction",children:"Select your name to start"}),e("div",{class:"search-container",children:e("input",{type:"text",placeholder:"Search member...",value:Fn.value,onInput:o,class:"search-input"})}),e("div",{class:"member-list",children:[n.map(a=>e("button",{class:"member-row",onClick:()=>li(a),children:[e("div",{class:"member-avatar",children:a.charAt(0).toUpperCase()}),e("span",{class:"member-name",children:a})]},a)),n.length===0&&!Kt.value&&e("p",{class:"no-results",children:"No members found"})]}),e("div",{class:"add-self-section",children:Kt.value?e("div",{class:"add-self-form",children:[e("p",{class:"add-self-label",children:"Enter your name to join:"}),e("div",{class:"add-self-input-row",children:[e("input",{type:"text",class:"add-self-input",placeholder:"Your name",value:Ct.value,onInput:a=>{Ct.value=a.target.value},onKeyDown:a=>{a.key==="Enter"&&(a.preventDefault(),ca())},disabled:rr.value,autoFocus:!0}),e("button",{class:"add-self-btn",onClick:ca,disabled:rr.value||!Ct.value.trim(),children:rr.value?"...":"Join"})]}),e("button",{class:"add-self-cancel",onClick:()=>{Kt.value=!1,Ct.value=""},children:"Cancel"})]}):e("button",{class:"add-self-link",onClick:()=>{Kt.value=!0},children:["Not in the list? ",e("strong",{children:"Add yourself"})]})})]}),e("style",{children:`
        .welcome-modal-content {
          padding: 0;
        }

        .welcome-header {
          text-align: center;
          padding: 16px 20px 12px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          margin: -20px -20px 0;
          border-radius: 12px 12px 0 0;
        }

        .welcome-header h2 {
          margin: 0 0 4px;
          font-size: 22px;
          font-weight: 700;
          color: var(--color-primary-dark, #1a402b);
        }

        .welcome-header .group-name {
          margin: 0;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-primary, #2C6E49);
        }

        .instruction {
          text-align: center;
          color: #6b7280;
          margin: 16px 0 12px;
          font-size: 13px;
        }

        .search-container {
          padding: 0 4px;
          margin-bottom: 8px;
        }

        .search-input {
          width: 100%;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          background: #fff;
          box-shadow: 0 0 0 2px var(--color-primary, #2C6E49);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .member-list {
          max-height: 50vh;
          overflow-y: auto;
          padding: 4px;
        }

        .member-row {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .member-row:hover {
          background: var(--color-primary-lightest, #ecfdf5);
          color: var(--color-primary, #2C6E49);
        }

        .member-row:active {
          background: var(--color-primary-lighter, #d1fae5);
        }

        .member-avatar {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary, #2C6E49) 0%, var(--color-primary, #2C6E49) 100%);
          border-radius: 50%;
          color: white;
          font-size: 15px;
          font-weight: 600;
          flex-shrink: 0;
          border: 2px solid #e5e7eb;
        }

        .member-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .member-row:hover .member-name {
          color: var(--color-primary, #2C6E49);
        }

        .no-results {
          text-align: center;
          color: #9ca3af;
          padding: 24px;
          font-size: 14px;
        }

        .add-self-section {
          border-top: 1px solid #e5e7eb;
          padding: 16px 4px 0;
          margin-top: 8px;
        }

        .add-self-link {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: none;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          text-align: center;
        }

        .add-self-link:hover {
          color: var(--color-primary, #2C6E49);
        }

        .add-self-link strong {
          color: var(--color-primary, #2C6E49);
        }

        .add-self-form {
          padding: 0 4px;
        }

        .add-self-label {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 10px 0;
          text-align: center;
        }

        .add-self-input-row {
          display: flex;
          gap: 8px;
        }

        .add-self-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
        }

        .add-self-input:focus {
          border-color: var(--color-primary, #2C6E49);
        }

        .add-self-btn {
          padding: 12px 20px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .add-self-btn:hover:not(:disabled) {
          background: var(--color-primary-dark, #1a402b);
        }

        .add-self-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .add-self-cancel {
          width: 100%;
          padding: 10px;
          margin-top: 8px;
          background: transparent;
          border: none;
          font-size: 13px;
          color: #9ca3af;
          cursor: pointer;
        }

        .add-self-cancel:hover {
          color: #6b7280;
        }
      `})]})}function vs(t){if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}function fs(t){return`https://wa.me/?text=${encodeURIComponent(t)}`}function ms(t,r){const n=t.replace(/[\s\-\(\)]/g,""),o=encodeURIComponent(r),a=/iPhone|iPad|iPod/.test(navigator?.userAgent||"")?"&":"?";return`sms:${n}${a}body=${o}`}function si(t){const r=new Date(t+"T12:00:00"),n=r.toLocaleDateString("en-US",{weekday:"long"}),o=r.toLocaleDateString("en-US",{month:"long"}),a=r.getDate(),i=vs(a);return`${n}, ${o} ${a}${i}`}function xs(t,r,n){const o=si(r),a=[];a.push(`I'm checking in for tennis on ${o}!`),a.push("");const i=n.playStyle==="singles"?"Singles only":n.playStyle==="doubles"?"Doubles only":"Either singles or doubles";if(a.push(`Preference: ${i}`),n.timeRange){const l=ue(n.timeRange.start,n.timeRange.end);l&&a.push(`Available: ${l}`)}return a.join(`
`)}function bs(t,r){return`I'm no longer available for tennis on ${si(r)}.`}async function ys(t){try{if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(t),!0;const r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();const n=document.execCommand("copy");return document.body.removeChild(r),n}catch{return!1}}function ws(t,r,n,o){return`Hi ${t}! You've been added to ${r} tennis coordination.

Check in for upcoming matches here:
${n}

PIN: ${o}

Just select your name and check in when you can play!`}const yt=g(!1);typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;!r.closest(".share-prompt-dropdown")&&!r.closest("[data-share-prompt-button]")&&(yt.value=!1)});function ks(){const t=_e.value,r=ze.value;if(U(()=>{if(t){const u=setTimeout(()=>{_e.value=!1,ze.value=null},8e3);return()=>clearTimeout(u)}},[t]),!t||!r)return null;const n=r.action==="removal",o=r.action==="invite",a=()=>o?ws(r.name,r.groupName||"",r.groupUrl||"",r.groupPin||""):n?bs(r.name,r.date):xs(r.name,r.date,{playStyle:r.playStyle||"both",timeRange:r.timeRange}),i=u=>{const v=a();if(u==="whatsapp"){const p=fs(v);window.open(p,"_blank")}else if(u==="sms"){const p=ms("",v);window.location.href=p}else u==="copy"&&ys(v).then(p=>{p?y("Copied to clipboard","success"):y("Failed to copy","error")});yt.value=!1,_e.value=!1,ze.value=null},l=()=>{_e.value=!1,ze.value=null},c=o?"var(--color-info-light, #E3F2FD)":n?"var(--color-warning-light, #FFF3E0)":"var(--color-success-light, #E8F5E9)",s=o?"var(--color-info, #1565C0)":n?"#E65100":"var(--color-success, #2E7D32)",d=o?"Added!":n?"Removed!":"Checked in!",h=o?`Invite ${r.name}?`:n?"Let others know?":"Share with the group?";return e("div",{style:{position:"fixed",bottom:"70px",left:"50%",transform:"translateX(-50%)",width:"calc(100% - 24px)",maxWidth:"456px",background:c,borderRadius:"12px",padding:"12px 16px",boxShadow:"var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))",display:"flex",alignItems:"center",gap:"12px",zIndex:1e3,animation:"slideUp 0.3s ease-out"},children:[e("div",{style:{flex:1,fontSize:"14px",color:s},children:[e("strong",{children:d})," ",h]}),e("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e("div",{style:{position:"relative"},children:[e("button",{"data-share-prompt-button":!0,onClick:u=>{u.stopPropagation(),yt.value=!yt.value},style:{background:yt.value?"var(--color-primary-dark, #1a402b)":"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",padding:"8px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),yt.value&&e("div",{class:"share-prompt-dropdown",style:{position:"absolute",bottom:"100%",right:"0",marginBottom:"8px",background:"white",borderRadius:"12px",boxShadow:"var(--shadow-3xl, 0 4px 16px rgba(0,0,0,0.2))",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:()=>i("whatsapp"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-whatsapp, #25D366)",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>i("sms"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-info, #2196F3)",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>i("copy"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"#666",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),e("button",{onClick:l,style:{background:"transparent",border:"none",padding:"4px",cursor:"pointer",color:"#666",fontSize:"18px",lineHeight:1},title:"Dismiss",children:"×"})]}),e("style",{children:`
        @keyframes slideUp {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `})]})}const vo=g(!1),_t=g(null),Ze=g(!1),et=g(-1);function Cs(t){const r=j.value;if(!r)return null;const n=ie.value[r]||[],o=n.findIndex(a=>a.name===t);return o===-1?null:{checkin:n[o],index:o}}function _s(){const t=_t.value||C.value,r=!_t.value||_t.value===C.value,n=(c,s)=>{X.value=c,Z.value=s},o=async()=>{if(!t){y("Please select a user first","error");return}const c=q.value,s=X.value&&Z.value?{start:X.value,end:Z.value}:void 0;Ze.value&&et.value>=0?await Xa(et.value,{playStyle:c,allowRotation:Ee.value,timeRange:s},C.value||""):await po({name:t,playStyle:c,isGuest:!1,addedBy:C.value,allowRotation:Ee.value,timeRange:s}),ze.value={action:"checkin",name:t,playStyle:c,timeRange:s,date:j.value||""},_e.value=!0,i()},a=async()=>{et.value<0||(await Za(et.value,C.value),ze.value={action:"removal",name:t||"",date:j.value||"",isOwner:r},_e.value=!0,i())},i=()=>{vo.value=!1,_t.value=null,Ze.value=!1,et.value=-1,q.value="both",Ee.value=!0,X.value="",Z.value=""},l=c=>{c.target.classList.contains("drawer-backdrop")&&i()};return vo.value?e("div",{class:"drawer-backdrop",onClick:l,children:[e("div",{class:"check-in-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:Ze.value?"Edit Check-in":"Check In"}),e("div",{class:"player-display",children:[e("div",{class:"player-avatar",children:t?.charAt(0).toUpperCase()}),e("div",{class:"player-info",children:[e("span",{class:"player-name",children:t}),e("span",{class:"player-context",children:r?"Playing as yourself":"Checking in for them"})]})]})]}),e("div",{class:"drawer-section",children:[e("h3",{children:"Play Style"}),e("div",{class:"preference-buttons",children:[e("button",{class:`pref-btn singles ${q.value==="singles"?"selected":""}`,onClick:()=>{q.value="singles"},children:"Singles"}),e("button",{class:`pref-btn ${q.value==="both"?"selected":""}`,onClick:()=>{q.value="both"},children:"Either"}),e("button",{class:`pref-btn doubles ${q.value==="doubles"?"selected":""}`,onClick:()=>{q.value="doubles"},children:"Doubles"})]})]}),e("div",{class:"drawer-section",children:e("label",{class:"rotation-toggle",children:[e("input",{type:"checkbox",checked:Ee.value,onChange:c=>{Ee.value=c.target.checked}}),e("span",{class:"toggle-label",children:[e("span",{class:"toggle-title",children:"Open to 3-player rotation"}),e("span",{class:"toggle-desc",children:"1v1 or 1v2 format when needed"})]})]})}),e("div",{class:"drawer-section",children:[e("h3",{children:["Available Time ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"time-presets",children:[e("button",{class:`time-btn ${X.value==="08:00"&&Z.value==="12:00"?"selected":""}`,onClick:()=>n("08:00","12:00"),children:[e("span",{class:"time-label",children:"Morning"}),e("span",{class:"time-range",children:"8am-12pm"})]}),e("button",{class:`time-btn ${X.value==="12:00"&&Z.value==="15:00"?"selected":""}`,onClick:()=>n("12:00","15:00"),children:[e("span",{class:"time-label",children:"Midday"}),e("span",{class:"time-range",children:"12-3pm"})]}),e("button",{class:`time-btn ${X.value==="15:00"&&Z.value==="18:00"?"selected":""}`,onClick:()=>n("15:00","18:00"),children:[e("span",{class:"time-label",children:"Afternoon"}),e("span",{class:"time-range",children:"3-6pm"})]}),e("button",{class:`time-btn ${X.value==="18:00"&&Z.value==="21:00"?"selected":""}`,onClick:()=>n("18:00","21:00"),children:[e("span",{class:"time-label",children:"Evening"}),e("span",{class:"time-range",children:"6-9pm"})]})]}),e("div",{class:"custom-time",children:[e("input",{type:"time",value:X.value,onInput:c=>{X.value=c.target.value},placeholder:"Start"}),e("span",{class:"time-separator",children:"to"}),e("input",{type:"time",value:Z.value,onInput:c=>{Z.value=c.target.value},placeholder:"End"}),(X.value||Z.value)&&e("button",{class:"clear-time-btn",onClick:()=>{X.value="",Z.value=""},children:"Clear"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:i,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:o,children:Ze.value?"Update":"Confirm"})]}),Ze.value&&e("div",{class:"drawer-remove",children:e("button",{class:"remove-btn",onClick:a,children:"Remove Check-in"})})]}),e("style",{children:`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .check-in-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0 20px 30px;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
          position: sticky;
          top: 0;
          background: white;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: var(--color-gray-light, #ddd);
          border-radius: 2px;
        }

        .drawer-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .drawer-header h2 {
          margin: 0 0 12px;
          font-size: 22px;
          color: var(--color-text-primary, #333);
        }

        .player-display {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          background: var(--color-bg-subtle, #f9f9f9);
          padding: 12px 16px;
          border-radius: 12px;
        }

        .player-avatar {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary, #2C6E49) 0%, var(--color-primary-dark, #1a402b) 100%);
          border-radius: 50%;
          color: white;
          font-size: 18px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .player-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .player-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-primary, #333);
        }

        .player-context {
          font-size: 12px;
          color: var(--color-text-secondary, #666);
        }

        .drawer-section {
          margin-bottom: 20px;
        }

        .drawer-section h3 {
          margin: 0 0 12px;
          font-size: 14px;
          color: var(--color-text-primary, #333);
          font-weight: 600;
        }

        .optional-tag {
          font-weight: normal;
          color: var(--color-text-muted, #999);
          font-size: 12px;
        }

        .preference-buttons {
          display: flex;
          gap: 12px;
        }

        .pref-btn {
          flex: 1;
          padding: 14px 10px;
          border: 2px solid var(--color-border, #e0e0e0);
          border-radius: 12px;
          background: white;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-primary, #333);
          cursor: pointer;
          transition: all 0.2s;
        }

        .pref-btn:hover {
          border-color: var(--color-gray-disabled, #ccc);
        }

        .pref-btn.selected {
          background: var(--color-primary, #2C6E49);
          border-color: var(--color-primary, #2C6E49);
          color: white;
        }

        .pref-btn.singles.selected {
          background: var(--color-primary, #2C6E49);
          border-color: var(--color-primary, #2C6E49);
          color: white;
        }

        .pref-btn.doubles.selected {
          background: var(--color-primary, #2C6E49);
          border-color: var(--color-primary, #2C6E49);
          color: white;
        }

        .rotation-toggle {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          background: var(--color-bg-subtle, #f9f9f9);
          border-radius: 12px;
          cursor: pointer;
        }

        .rotation-toggle input[type="checkbox"] {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          cursor: pointer;
        }

        .toggle-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .toggle-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-primary, #333);
        }

        .toggle-desc {
          font-size: 12px;
          color: var(--color-text-secondary, #666);
        }

        .time-presets {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }

        .time-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 6px;
          border: 2px solid var(--color-border, #e0e0e0);
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .time-btn:hover {
          border-color: var(--color-primary, #2C6E49);
          background: var(--color-primary-lightest, #f8fff8);
        }

        .time-btn.selected {
          background: var(--color-primary, #2C6E49);
          border-color: var(--color-primary, #2C6E49);
          box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb, 44, 110, 73), 0.3);
        }

        .time-btn.selected .time-label,
        .time-btn.selected .time-range {
          color: white;
        }

        .time-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-primary, #333);
        }

        .time-range {
          font-size: 10px;
          color: var(--color-text-secondary, #666);
          margin-top: 2px;
        }

        .custom-time {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .custom-time input[type="time"] {
          flex: 1;
          padding: 12px;
          border: 2px solid var(--color-border, #e0e0e0);
          border-radius: 10px;
          font-size: 14px;
        }

        .custom-time input[type="time"]:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .time-separator {
          color: var(--color-text-secondary, #666);
          font-size: 14px;
        }

        .clear-time-btn {
          padding: 12px 14px;
          background: var(--color-gray-lightest, #f5f5f5);
          border: none;
          border-radius: 10px;
          color: var(--color-text-secondary, #666);
          font-size: 13px;
          cursor: pointer;
        }

        .clear-time-btn:hover {
          background: var(--color-border, #e0e0e0);
        }

        .drawer-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .cancel-btn {
          flex: 1;
          padding: 16px;
          background: var(--color-gray-lightest, #f5f5f5);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-secondary, #666);
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: var(--color-bg-page, #e8e8e8);
        }

        .confirm-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .drawer-remove {
          margin-top: 16px;
          text-align: center;
        }

        .remove-btn {
          padding: 12px 24px;
          background: transparent;
          border: none;
          color: var(--color-error, #e53935);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .remove-btn:hover {
          text-decoration: underline;
        }
      `})]}):null}function kn(t,r){if(t?_t.value=t:_t.value=null,r&&t){Ze.value=!0;const n=Cs(t);n&&(et.value=n.index,q.value=n.checkin.playStyle||"both",Ee.value=n.checkin.allowRotation!==!1,n.checkin.timeRange&&(X.value=n.checkin.timeRange.start||"",Z.value=n.checkin.timeRange.end||""))}else Ze.value=!1,et.value=-1,q.value="both",Ee.value=!0,X.value="",Z.value="";vo.value=!0}const fo=g(!1),ce=g("member"),Jt=g("");function zs(){ce.value="member",Jt.value="",wt.value="",Xt.value="",pn.value="",un.value="",hn.value="",Jc.value=C.value||"",q.value="both",fo.value=!0}function Ss(){const r=(()=>{const d=j.value,h=d?ie.value[d]||[]:[],u=new Set(h.map(v=>v.name));return[...K.value].filter(v=>!u.has(v)).sort((v,p)=>v.localeCompare(p))})(),n=Jt.value.toLowerCase(),o=n?r.filter(d=>d.toLowerCase().includes(n)):r,a=()=>{fo.value=!1,Jt.value=""},i=d=>{d.target.classList.contains("drawer-backdrop")&&a()},l=d=>{a(),kn(d,!1)},c=async()=>{if(!wt.value.trim()){y("Please enter guest name","error");return}const d=q.value,h=X.value&&Z.value?{start:X.value,end:Z.value}:void 0;await po({name:wt.value.trim(),playStyle:d,isGuest:!0,addedBy:C.value,allowRotation:Ee.value,timeRange:h}),ze.value={action:"checkin",name:wt.value.trim(),playStyle:d,timeRange:h,date:j.value||""},_e.value=!0,a()},s=async()=>{if(!Xt.value.trim()){y("Please enter member name","error");return}const d=Xt.value.trim();await Lo({name:d,phone:pn.value.trim(),email:un.value.trim(),notes:hn.value.trim(),addedBy:C.value});const h=q.value,u=X.value&&Z.value?{start:X.value,end:Z.value}:void 0;await po({name:d,playStyle:h,isGuest:!1,addedBy:C.value,allowRotation:Ee.value,timeRange:u}),ze.value={action:"checkin",name:d,playStyle:h,timeRange:u,date:j.value||""},_e.value=!0,a()};return fo.value?e("div",{class:"drawer-backdrop",onClick:i,children:[e("div",{class:"player-select-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:[ce.value==="member"&&"Check in a player",ce.value==="guest"&&"Add Guest",ce.value==="newMember"&&"Add New Member"]}),e("div",{class:"mode-tabs",children:[e("button",{class:`mode-tab ${ce.value==="member"?"active":""}`,onClick:()=>{ce.value="member"},children:"Member"}),e("button",{class:`mode-tab ${ce.value==="guest"?"active":""}`,onClick:()=>{ce.value="guest"},children:"Guest"}),e("button",{class:`mode-tab ${ce.value==="newMember"?"active":""}`,onClick:()=>{ce.value="newMember"},children:"New Member"})]})]}),ce.value==="member"&&e(N,{children:[e("div",{class:"search-container",children:e("input",{type:"text",placeholder:"Search member...",value:Jt.value,onInput:d=>{Jt.value=d.target.value},class:"search-input"})}),e("div",{class:"member-list",children:[o.map(d=>e("button",{class:"member-row",onClick:()=>l(d),children:[e("div",{class:"member-avatar",children:d.charAt(0).toUpperCase()}),e("span",{class:"member-name",children:d})]},d)),o.length===0&&e("p",{class:"no-results",children:r.length===0?"All members are already checked in":"No members found"})]})]}),ce.value==="guest"&&e("div",{class:"form-section",children:[e("div",{class:"form-field",children:[e("label",{children:"Guest Name"}),e("input",{type:"text",placeholder:"Enter guest's name",value:wt.value,onInput:d=>{wt.value=d.target.value}})]}),e("div",{class:"form-field",children:[e("label",{children:"Play Style"}),e("div",{class:"preference-buttons",children:[e("button",{class:`pref-btn singles ${q.value==="singles"?"selected":""}`,onClick:()=>{q.value="singles"},children:"Singles"}),e("button",{class:`pref-btn ${q.value==="both"?"selected":""}`,onClick:()=>{q.value="both"},children:"Either"}),e("button",{class:`pref-btn doubles ${q.value==="doubles"?"selected":""}`,onClick:()=>{q.value="doubles"},children:"Doubles"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:a,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:c,children:"Add & Check In"})]})]}),ce.value==="newMember"&&e("div",{class:"form-section",children:[e("div",{class:"form-field",children:[e("label",{children:"Full Name"}),e("input",{type:"text",placeholder:"Enter member's name",value:Xt.value,onInput:d=>{Xt.value=d.target.value}})]}),e("div",{class:"form-row",children:[e("div",{class:"form-field",children:[e("label",{children:["Phone ",e("span",{class:"optional",children:"(optional)"})]}),e("input",{type:"tel",placeholder:"Phone number",value:pn.value,onInput:d=>{pn.value=d.target.value}})]}),e("div",{class:"form-field",children:[e("label",{children:["Email ",e("span",{class:"optional",children:"(optional)"})]}),e("input",{type:"email",placeholder:"Email address",value:un.value,onInput:d=>{un.value=d.target.value}})]})]}),e("div",{class:"form-field",children:[e("label",{children:["Notes ",e("span",{class:"optional",children:"(optional)"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:3,value:hn.value,onInput:d=>{hn.value=d.target.value}})]}),e("p",{class:"added-by-info",children:["Added by: ",e("strong",{children:C.value||"(unknown)"})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:a,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:s,children:"Add & Check In"})]})]})]}),e("style",{children:`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .player-select-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 60vh;
          overflow-y: auto;
          padding: 0 20px 20px;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
          position: sticky;
          top: 0;
          background: white;
          z-index: 1;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        .drawer-header {
          text-align: center;
          margin-bottom: 12px;
        }

        .drawer-header h2 {
          margin: 0 0 10px;
          font-size: 18px;
          color: #333;
        }

        .mode-tabs {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .mode-tab {
          padding: 8px 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mode-tab:hover {
          background: #e8e8e8;
        }

        .mode-tab.active {
          background: var(--color-primary, #2C6E49);
          color: white !important;
        }

        .search-container {
          margin-bottom: 12px;
        }

        .search-input {
          width: 100%;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          background: #fff;
          box-shadow: 0 0 0 2px var(--color-primary, #2C6E49);
        }

        .member-list {
          max-height: 35vh;
          overflow-y: auto;
        }

        .member-row {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .member-row:hover {
          background: var(--color-primary-lightest, #ecfdf5);
        }

        .member-row:active {
          background: var(--color-primary-lighter, #d1fae5);
        }

        .member-avatar {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary, #2C6E49) 0%, var(--color-primary-dark, #1a402b) 100%);
          border-radius: 50%;
          color: white;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .member-name {
          font-size: 15px;
          font-weight: 500;
          color: #333;
        }

        .member-row:hover .member-name {
          color: var(--color-primary, #2C6E49);
        }

        .no-results {
          text-align: center;
          color: #9ca3af;
          padding: 24px;
          font-size: 14px;
        }

        .form-section {
          padding-top: 8px;
        }

        .form-field {
          margin-bottom: 16px;
        }

        .form-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .form-field .optional {
          font-weight: normal;
          color: #999;
        }

        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .form-field textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-row {
          display: flex;
          gap: 12px;
        }

        .form-row .form-field {
          flex: 1;
        }

        .preference-buttons {
          display: flex;
          gap: 10px;
        }

        .pref-btn {
          flex: 1;
          padding: 12px 10px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          background: white;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pref-btn:hover {
          border-color: #ccc;
        }

        .pref-btn.selected {
          background: var(--color-primary-light, #e8f5e9);
          border-color: var(--color-primary, #2C6E49);
          color: var(--color-primary, #2e7d32);
        }

        .pref-btn.singles.selected {
          background: #fff3e0;
          border-color: #ff9800;
          color: #e65100;
        }

        .pref-btn.doubles.selected {
          background: #e3f2fd;
          border-color: #2196f3;
          color: #1565c0;
        }

        .added-by-info {
          font-size: 13px;
          color: #666;
          margin: 16px 0;
        }

        .added-by-info strong {
          color: var(--color-primary, #2C6E49);
        }

        .drawer-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .cancel-btn {
          flex: 1;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #e8e8e8;
        }

        .confirm-btn {
          flex: 2;
          padding: 14px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }
      `})]}):null}const mo=g(!1),nn=g(""),on=g(""),an=g(""),ln=g("");function ci(){nn.value="",on.value="",an.value="",ln.value=""}function $s(){const t=async()=>{const o=nn.value.trim();if(!o){y("Please enter member name","error");return}await Lo({name:o,phone:on.value.trim(),email:an.value.trim(),notes:ln.value.trim(),addedBy:C.value||"Unknown"}),r()},r=()=>{mo.value=!1,ci()},n=o=>{o.target.classList.contains("drawer-backdrop")&&r()};return mo.value?e("div",{class:"drawer-backdrop",onClick:n,children:[e("div",{class:"add-member-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:"Add New Member"}),e("p",{class:"drawer-subtitle",children:"Add a teammate to your group"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Name ",e("span",{class:"required",children:"*"})]}),e("input",{type:"text",placeholder:"Enter member's full name",value:nn.value,onInput:o=>{nn.value=o.target.value},class:"drawer-input",autoFocus:!0})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Contact Info ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"contact-inputs",children:[e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"})}),e("input",{type:"tel",placeholder:"Phone number",value:on.value,onInput:o=>{on.value=o.target.value},class:"drawer-input with-icon"})]}),e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),e("input",{type:"email",placeholder:"Email address",value:an.value,onInput:o=>{an.value=o.target.value},class:"drawer-input with-icon"})]})]}),e("p",{class:"field-hint",children:"Used for sending invites to join the group"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Notes ",e("span",{class:"optional-tag",children:"optional"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:2,value:ln.value,onInput:o=>{ln.value=o.target.value},class:"drawer-textarea"})]}),e("div",{class:"added-by-info",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"#999",children:e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"})}),e("span",{children:["Added by: ",e("strong",{children:C.value||"Unknown"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:r,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:t,children:"Add Member"})]})]}),e("style",{children:`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .add-member-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0 20px 30px;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
          position: sticky;
          top: 0;
          background: white;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        .drawer-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .drawer-header h2 {
          margin: 0 0 4px;
          font-size: 22px;
          color: #333;
        }

        .drawer-subtitle {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .drawer-section {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .required {
          color: #e53935;
        }

        .optional-tag {
          font-weight: normal;
          color: #999;
          font-size: 12px;
        }

        .drawer-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .drawer-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .drawer-input.with-icon {
          padding-left: 44px;
        }

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
        }

        .field-hint {
          margin: 8px 0 0;
          font-size: 12px;
          color: #888;
        }

        .drawer-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .drawer-textarea:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .added-by-info {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #f9f9f9;
          border-radius: 10px;
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
        }

        .drawer-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .cancel-btn {
          flex: 1;
          padding: 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #e8e8e8;
        }

        .confirm-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }
      `})]}):null}function Is(){ci(),mo.value=!0}const xo=g(!1),sn=g(null),nr=g(""),Ae=g(""),Me=g(""),or=g(""),ar=g(!1),ir=g(!1),Oe=g(""),He=g(""),be=g(!1),zt=g(!1),Es=[{value:"",label:"Not specified"},{value:"beginner",label:"Beginner"},{value:"intermediate",label:"Intermediate"},{value:"advanced",label:"Advanced"},{value:"competitive",label:"Competitive"},{value:"pro",label:"Pro"}];function Ds(){const t=$.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function As(){nr.value="",Ae.value="",Me.value="",or.value="",ar.value=!1,ir.value=!1,Oe.value="",He.value="",be.value=!1,zt.value=!1}function Ms(){const t=sn.value,r=Ds(),n=t===C.value,o=r&&!n,a=r&&!n,i=async()=>{if(!t)return;const d=nr.value.trim();if(!d){y("Please enter member name","error");return}if(be.value=!0,o&&d!==t){if(!await ri(t,d)){be.value=!1;return}sn.value=d}const h=await zl(d,{phone:Ae.value.trim(),email:Me.value.trim(),notes:or.value.trim(),shareContactInDirectory:ar.value,shareNotesInDirectory:ir.value});if(n&&G.value)try{const u={},v=Ae.value.trim(),p=Me.value.trim();if(v&&(u.phone=v),p&&(u.email=p),Oe.value&&(u.skillLevel=Oe.value),He.value){const f=parseFloat(He.value);!isNaN(f)&&f>=1&&f<=7&&(u.ntrpRating=f)}Object.keys(u).length>0&&await Ro(u)}catch(u){console.warn("Failed to update platform profile:",u)}be.value=!1,h?(y("Profile updated","success"),c()):y("Failed to update profile","error")},l=async()=>{if(!t||!a)return;if(!zt.value){zt.value=!0;return}be.value=!0;const d=await ti(t);be.value=!1,d?(y(`${t} removed from team`,"success"),c()):y("Failed to remove member","error")},c=()=>{xo.value=!1,sn.value=null,As()},s=d=>{d.target.classList.contains("drawer-backdrop")&&c()};return!xo.value||!t?null:e("div",{class:"drawer-backdrop",onClick:s,children:[e("div",{class:"edit-member-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:n?"Edit Your Profile":"Edit Member"}),e("p",{class:"drawer-subtitle",children:n?"Update your contact info and privacy settings":`Update ${t}'s information`})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Name ",o&&e("span",{class:"optional-tag",children:"editable"})]}),e("input",{type:"text",placeholder:"Member name",value:nr.value,onInput:d=>{nr.value=d.target.value},class:"drawer-input",disabled:!o,style:o?{}:{background:"#f5f5f5",color:"#666"}})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Contact Info ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"contact-inputs",children:[e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"})}),e("input",{type:"tel",placeholder:"Phone number",value:Ae.value,onInput:d=>{Ae.value=d.target.value},class:"drawer-input with-icon"})]}),e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),e("input",{type:"email",placeholder:"Email address",value:Me.value,onInput:d=>{Me.value=d.target.value},class:"drawer-input with-icon"})]})]})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Notes ",e("span",{class:"optional-tag",children:"optional"})]}),e("textarea",{placeholder:"Availability, preferences, etc.",rows:2,value:or.value,onInput:d=>{or.value=d.target.value},class:"drawer-textarea"})]}),n&&e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:"Tennis Profile"}),e("div",{class:"tennis-profile-fields",children:[e("div",{class:"field-row",children:[e("label",{class:"field-sublabel",children:"Skill Level"}),e("select",{value:Oe.value,onChange:d=>{Oe.value=d.target.value},class:"drawer-select",children:Es.map(d=>e("option",{value:d.value,children:d.label},d.value))})]}),e("div",{class:"field-row",children:[e("label",{class:"field-sublabel",children:"NTRP Rating"}),e("input",{type:"number",placeholder:"e.g., 3.5",value:He.value,onInput:d=>{He.value=d.target.value},min:"1.0",max:"7.0",step:"0.5",class:"drawer-input ntrp-input"})]})]}),e("p",{class:"field-hint",children:"Your skill info is saved across all your groups"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:"Privacy Settings"}),e("div",{class:"privacy-options",children:[e("label",{class:"privacy-option",children:[e("input",{type:"checkbox",checked:ar.value,onChange:d=>{ar.value=d.target.checked}}),e("div",{class:"privacy-option-content",children:[e("span",{class:"privacy-option-title",children:"Share contact info in directory"}),e("span",{class:"privacy-option-desc",children:"Phone and email visible to all members"})]})]}),e("label",{class:"privacy-option",children:[e("input",{type:"checkbox",checked:ir.value,onChange:d=>{ir.value=d.target.checked}}),e("div",{class:"privacy-option-content",children:[e("span",{class:"privacy-option-title",children:"Share profile notes in directory"}),e("span",{class:"privacy-option-desc",children:"Notes visible to all members"})]})]})]})]}),a&&e("div",{class:"drawer-section",children:e("button",{class:`remove-btn ${zt.value?"confirming":""}`,onClick:l,disabled:be.value,children:zt.value?"Tap again to confirm removal":"Remove from Team"})}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:c,disabled:be.value,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:i,disabled:be.value,children:be.value?"Saving...":"Save Changes"})]})]}),e("style",{children:`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .edit-member-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0 20px 30px;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
          position: sticky;
          top: 0;
          background: white;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        .drawer-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .drawer-header h2 {
          margin: 0 0 4px;
          font-size: 22px;
          color: #333;
        }

        .drawer-subtitle {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .drawer-section {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .required {
          color: #e53935;
        }

        .optional-tag {
          font-weight: normal;
          color: #999;
          font-size: 12px;
        }

        .drawer-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .drawer-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .drawer-input:disabled {
          cursor: not-allowed;
        }

        .drawer-input.with-icon {
          padding-left: 44px;
        }

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
        }

        .drawer-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .drawer-textarea:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .privacy-options {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .privacy-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 0;
          cursor: pointer;
        }

        .privacy-option input[type="checkbox"] {
          width: 16px;
          height: 16px;
          min-width: 16px;
          flex-shrink: 0;
          cursor: pointer;
          accent-color: var(--color-primary, #2C6E49);
          margin: 0;
        }

        .privacy-option-content {
          display: inline;
        }

        .privacy-option-title {
          font-size: 13px;
          color: #333;
        }

        .privacy-option-desc {
          display: none;
        }

        .remove-btn {
          width: 100%;
          padding: 14px;
          background: #fff;
          border: 2px solid #e53935;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #e53935;
          cursor: pointer;
          transition: all 0.2s;
        }

        .remove-btn:hover {
          background: #ffebee;
        }

        .remove-btn.confirming {
          background: #e53935;
          color: white;
        }

        .remove-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .drawer-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .cancel-btn {
          flex: 1;
          padding: 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #e8e8e8;
        }

        .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .confirm-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .drawer-select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          background: white;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23666' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 24px;
          padding-right: 40px;
          transition: border-color 0.2s;
          cursor: pointer;
        }

        .drawer-select:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .tennis-profile-fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .field-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-sublabel {
          font-size: 13px;
          color: #666;
          font-weight: 500;
        }

        .field-hint {
          font-size: 12px;
          color: #999;
          margin: 8px 0 0 0;
        }

        .ntrp-input {
          max-width: 120px;
        }
      `})]})}function Rs(t){const r=G.value?.profile;if(!r){Ae.value=t?.phone||"",Me.value=t?.email||"",Oe.value="",He.value="";return}if(!r.phone&&!r.email&&(t?.phone||t?.email)){const n={};t?.phone&&(n.phone=t.phone),t?.email&&(n.email=t.email),Ro(n).catch(o=>{console.warn("Contact migration failed (non-fatal):",o)}),Ae.value=t?.phone||"",Me.value=t?.email||""}else Ae.value=r.phone||t?.phone||"",Me.value=r.email||t?.email||"";Oe.value=r.skillLevel||"",He.value=r.ntrpRating?.toString()||""}async function di(t){const r=ae.value?.[t];nr.value=t,or.value=r?.notes||"",ar.value=r?.shareContactInDirectory===!0,ir.value=r?.shareNotesInDirectory===!0,zt.value=!1,t===C.value?(await Hi(),Rs(r)):(Ae.value=r?.phone||"",Me.value=r?.email||"",Oe.value="",He.value=""),sn.value=t,xo.value=!0}function Ps(t){const r=C.value;return r?(ie.value[t]||[]).some(o=>o.name&&z(o.name)===z(r)):!0}function Ts(t){j.value=t,C.value&&!Ps(t)?(Sn.value=C.value,zn.value=!0):(Sn.value="",zn.value=!1)}function Ls(){const t=Do(null);U(()=>{const a=t.current;if(!a)return;const i=setTimeout(()=>{const l=a.querySelector('[data-today="true"]');l&&l.scrollIntoView({behavior:"instant",inline:"start",block:"nearest"})},50);return()=>clearTimeout(i)},[]);const r=[],n=new Date,o=so(n);for(let a=-14;a<=21;a++){const i=new Date(n);i.setDate(n.getDate()+a);const l=so(i),c=i.toLocaleDateString("en-US",{weekday:"short"}),s=i.getDate(),d=i.toLocaleDateString("en-US",{month:"short"}),u=(ie.value[l]||[]).length,v=l===o,p=a<0;r.push({value:l,dayName:c,dayNum:s,monthName:d,isToday:v,isPast:p,checkinCount:u})}return e("div",{class:"date-selector",children:e("div",{class:"date-scroll",ref:t,children:r.map(a=>e("button",{class:`date-btn ${j.value===a.value?"selected":""} ${a.isPast?"past":""}`,onClick:()=>Ts(a.value),"data-date":a.value,"data-today":a.isToday?"true":void 0,children:[e("span",{class:"day-name",children:a.dayName}),e("span",{class:"day-num",children:a.dayNum}),e("span",{class:"month-name",children:a.monthName}),a.isToday&&e("span",{class:"today-badge",children:"Today"}),a.checkinCount>0&&e("span",{class:"checkin-badge",children:a.checkinCount})]},a.value))})})}function Ns(){const t=C.value,r=j.value;return!t||!r?null:(ie.value[r]||[]).find(a=>a.name===t)||null}function Bs(t){return t==="singles"?"Singles only":t==="doubles"?"Doubles only":"Either"}function Fs(t){if(!t||!t.start||!t.end)return null;const r=n=>{const[o,a]=n.split(":"),i=parseInt(o),l=i>=12?"pm":"am",c=i>12?i-12:i===0?12:i;return a==="00"?`${c}${l}`:`${c}:${a}${l}`};return`${r(t.start)} - ${r(t.end)}`}function js(){C.value;const t=Ns(),r=!!t,n=()=>{kn()},o=()=>{kn(C.value,!0)},a=()=>{zs()};return e(N,{children:[e("div",{class:"checkin-cta-section",children:[r?e("div",{class:"checkin-status-card",onClick:o,children:e("div",{class:"status-row",children:[e("span",{class:"status-icon",children:"✓"}),e("span",{class:"status-text",children:"You're in!"}),e("div",{class:"status-details",children:[e("span",{class:"detail-item",children:Bs(t.playStyle)}),t.allowRotation!==!1&&e("span",{class:"detail-item rotation",children:"Open to 3s"}),t.timeRange&&e("span",{class:"detail-item time",children:Fs(t.timeRange)})]}),e("button",{class:"edit-icon-btn",onClick:i=>{i.stopPropagation(),o()},title:"Edit",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})})]})}):e("button",{class:"checkin-cta-btn",onClick:n,children:"Check In to Play"}),e("button",{class:"checkin-other-link",onClick:a,children:"Check in someone else"})]}),e("style",{children:`
        .checkin-cta-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 8px 0 0;
          margin-bottom: -8px;
        }

        .checkin-cta-btn {
          width: 100%;
          padding: 18px 24px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.3);
          transition: all 0.2s;
        }

        .checkin-cta-btn:hover {
          background: var(--color-primary-dark, #1a402b);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(var(--color-primary-rgb, 44, 110, 73), 0.4);
        }

        .checkin-cta-btn:active {
          transform: translateY(0);
        }

        .checkin-status-card {
          width: 100%;
          background: linear-gradient(135deg, var(--color-primary-light, #e8f5e9) 0%, var(--color-primary-lighter, #c8e6c9) 100%);
          border: 2px solid var(--color-primary, #2C6E49);
          border-radius: 12px;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .checkin-status-card:hover {
          background: linear-gradient(135deg, var(--color-primary-lighter, #c8e6c9) 0%, var(--color-primary-lightest, #a5d6a7) 100%);
        }

        .status-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: var(--color-primary, #2C6E49);
          color: white;
          border-radius: 50%;
          font-size: 14px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .status-text {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-primary, #2C6E49);
          flex-shrink: 0;
        }

        .status-details {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }

        .detail-item {
          padding: 3px 8px;
          background: white;
          border-radius: 12px;
          font-size: 12px;
          color: #555;
          white-space: nowrap;
        }

        .detail-item.rotation {
          background: #e3f2fd;
          color: #1565c0;
        }

        .detail-item.time {
          background: #fff3e0;
          color: #e65100;
        }

        .edit-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 0;
          background: white;
          border: 1px solid var(--color-primary-lighter, #c8e6c9);
          border-radius: 8px;
          color: var(--color-primary, #2C6E49);
          cursor: pointer;
          flex-shrink: 0;
          margin-left: auto;
          transition: all 0.2s;
        }

        .edit-icon-btn:hover {
          background: var(--color-primary-light, #f1f8e9);
          border-color: var(--color-primary, #2C6E49);
        }

        .checkin-other-link {
          padding: 4px 12px;
          background: transparent;
          border: none;
          color: #888 !important;
          font-size: 11px;
          cursor: pointer;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .checkin-other-link:hover {
          background: var(--color-primary, #2C6E49);
          color: white !important;
        }

        /* Member Selection Panel */
        .member-selection-panel {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 14px;
          overflow: hidden;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #f5f5f5;
          border-bottom: 1px solid #e0e0e0;
        }

        .panel-header h3 {
          margin: 0;
          font-size: 16px;
          color: #333;
        }

        .close-panel-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid #ddd;
          border-radius: 50%;
          font-size: 18px;
          color: #666;
          cursor: pointer;
        }

        .close-panel-btn:hover {
          background: #f5f5f5;
        }

        .member-list {
          max-height: 300px;
          overflow-y: auto;
          padding: 8px;
        }

        .member-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          background: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .member-item:hover {
          background: #f5f5f5;
        }

        .member-initial {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--color-primary, #2C6E49) 0%, var(--color-primary-dark, #1a402b) 100%);
          border-radius: 50%;
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .member-name {
          font-size: 15px;
          color: #333;
        }

        .panel-footer {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          background: #fafafa;
          border-top: 1px solid #e0e0e0;
        }

        .add-guest-btn,
        .add-member-btn {
          flex: 1;
          padding: 10px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 13px;
          color: #666;
          cursor: pointer;
        }

        .add-guest-btn:hover,
        .add-member-btn:hover {
          background: #f5f5f5;
          border-color: var(--color-primary, #2C6E49);
          color: var(--color-primary, #2C6E49);
        }
      `})]})}const Qt=g({}),Yr=g(null),jn=g(!1);function pi(t){return{0:"☀️ Clear sky",1:"🌤️ Mainly clear",2:"⛅ Partly cloudy",3:"☁️ Overcast",45:"🌫️ Foggy",48:"🌫️ Foggy",51:"🌦️ Light drizzle",53:"🌦️ Drizzle",55:"🌧️ Heavy drizzle",61:"🌧️ Light rain",63:"🌧️ Rain",65:"🌧️ Heavy rain",71:"🌨️ Light snow",73:"🌨️ Snow",75:"🌨️ Heavy snow",77:"🌨️ Snow grains",80:"🌦️ Rain showers",81:"🌧️ Rain showers",82:"⛈️ Heavy rain showers",85:"🌨️ Snow showers",86:"🌨️ Heavy snow showers",95:"⛈️ Thunderstorm",96:"⛈️ Thunderstorm with hail",99:"⛈️ Severe thunderstorm"}[t]||"🌡️ Weather"}async function Us(t,r,n){const o=`${t},${r},${n}`;if(Qt.value[o])return Qt.value[o];try{const a=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${r}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&temperature_unit=fahrenheit&timezone=America/Los_Angeles&forecast_days=14`,i=await fetch(a);if(!i.ok)throw new Error("Weather API error");const l=await i.json();if(!l.daily||!l.daily.time||!Array.isArray(l.daily.time))throw new Error("Invalid weather data format");const c=l.daily.time.indexOf(n);if(c===-1)throw new Error("Weather data not available for this date");const s={tempMax:Math.round(l.daily.temperature_2m_max[c]),tempMin:Math.round(l.daily.temperature_2m_min[c]),precipProb:l.daily.precipitation_probability_max[c]||0,weatherCode:l.daily.weathercode[c]};return Qt.value={...Qt.value,[o]:s},s}catch(a){console.error("Weather fetch error:",a)}return null}function Gs(){if(U(()=>{const n=fe(()=>{const o=j.value,a=P.value.location;if(!o)return;const i=new Date;i.setHours(0,0,0,0);const l=new Date(o+"T00:00:00"),c=Math.floor((l.getTime()-i.getTime())/(1e3*60*60*24));if(c<0||c>=14){Yr.value=null;return}const s=a?.lat??37.2358,d=a?.lon??-121.9623;jn.value=!0,Us(s,d,o).then(h=>{Yr.value=h,jn.value=!1})});return()=>n()},[]),jn.value)return e("div",{id:"weatherWidget",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 14px",background:"linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)",borderRadius:"10px",marginBottom:"8px",fontSize:"13px",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.05))",color:"#666"},children:"Loading weather..."});if(!Yr.value)return null;const t=Yr.value,r=P.value.location?.name||"Los Gatos, CA";return e("div",{id:"weatherWidget",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)",borderRadius:"10px",marginBottom:"8px",fontSize:"13px",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.05))"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e("span",{style:{fontWeight:600,color:"#1976d2"},children:r}),e("span",{style:{color:"#666"},children:"•"}),e("span",{style:{color:"#666"},children:pi(t.weatherCode)})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontWeight:600,color:"#333"},children:[t.tempMin,"°-",t.tempMax,"°F"]}),t.precipProb>0&&e("span",{style:{color:"#1976d2"},children:["💧",t.precipProb,"%"]})]})]})}function Os(){switch(P.value?.theme){case"roland-garros":return"#D2691E";case"australian-open":return"#1565C0";case"us-open":return"#0D47A1";case"wimbledon":default:return"#2E7D32"}}function Hs(){switch(P.value?.theme){case"roland-garros":return"Roland-Garros";case"australian-open":return"Australian Open";case"us-open":return"US Open";case"wimbledon":return"Wimbledon";default:return"Classic"}}function da({message:t="No check-ins yet",subtext:r="Be the first to check in!"}){const n=Os(),o="rgba(255, 255, 255, 0.9)";return e("div",{style:{textAlign:"center",padding:"var(--spacing-4xl, 24px) var(--spacing-2xl, 16px)",color:"var(--color-text-secondary, #666)"},children:[e("div",{style:{width:"120px",height:"80px",margin:"0 auto var(--spacing-2xl, 16px)",position:"relative",background:n,borderRadius:"var(--radius-lg, 8px)",overflow:"hidden",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))"},children:[e("div",{style:{position:"absolute",left:"50%",top:"20%",bottom:"20%",width:"2px",background:o,transform:"translateX(-50%)"}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",top:"50%",height:"3px",background:o,transform:"translateY(-50%)",boxShadow:"0 1px 2px rgba(0,0,0,0.2)"}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",top:"20%",height:"2px",background:o}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",bottom:"20%",height:"2px",background:o}}),e("div",{style:{position:"absolute",left:"10%",top:"0",bottom:"0",width:"2px",background:o}}),e("div",{style:{position:"absolute",right:"10%",top:"0",bottom:"0",width:"2px",background:o}}),e("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:"14px",height:"14px",borderRadius:"50%",background:"linear-gradient(135deg, #c8e600 0%, #9acd32 100%)",boxShadow:"0 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.1)",animation:"ballPulse 2s ease-in-out infinite"},children:e("div",{style:{position:"absolute",top:"3px",left:"2px",right:"2px",height:"8px",border:"1px solid rgba(255,255,255,0.5)",borderRadius:"50%",borderBottom:"none"}})})]}),e("p",{style:{fontSize:"var(--font-size-lg, 16px)",fontWeight:"600",color:"var(--color-text-primary, #333)",margin:"0 0 var(--spacing-sm, 6px) 0"},children:t}),e("p",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #888)",margin:0},children:r})]})}function Ws({text:t="Loading...",size:r="medium"}){const n={small:{ball:20,container:40},medium:{ball:32,container:60},large:{ball:48,container:90}},{ball:o,container:a}=n[r];return e("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"var(--spacing-4xl, 24px)"},children:[e("div",{style:{height:`${a}px`,display:"flex",alignItems:"flex-end",marginBottom:"var(--spacing-lg, 12px)"},children:e("div",{style:{width:`${o}px`,height:`${o}px`,borderRadius:"50%",background:"linear-gradient(135deg, #c8e600 0%, #9acd32 100%)",boxShadow:"0 4px 8px rgba(0,0,0,0.3), inset -3px -3px 6px rgba(0,0,0,0.1)",animation:"tennisBounce 0.6s ease-in-out infinite",position:"relative"},children:e("div",{style:{position:"absolute",top:`${o*.15}px`,left:`${o*.1}px`,right:`${o*.1}px`,height:`${o*.5}px`,border:`${Math.max(1,o*.06)}px solid rgba(255,255,255,0.6)`,borderRadius:"50%",borderBottom:"none"}})})}),e("div",{style:{width:`${o*.8}px`,height:`${o*.15}px`,background:"rgba(0,0,0,0.2)",borderRadius:"50%",marginTop:`-${o*.1}px`,animation:"ballShadow 0.6s ease-in-out infinite"}}),t&&e("p",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #888)",marginTop:"var(--spacing-lg, 12px)"},children:t})]})}function Vs({text:t="Loading..."}){const r=Hs();return e("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"var(--color-bg-page, #f5f5f5)"},children:[e(Ws,{text:t,size:"large"}),r!=="Classic"&&e("p",{style:{fontSize:"var(--font-size-xs, 11px)",color:"var(--color-text-muted, #999)",marginTop:"var(--spacing-md, 8px)"},children:[r," theme"]})]})}const we=g(localStorage.getItem("games_compact_view")!=="false"),ui=g(!1),Dr=g(null),Je=g("both"),Cn=g(""),_n=g(""),bo=g(!0),hi=g(!1),yo=g(null),Ue=g(""),Ie=g(!1),cn=g("confirm"),pe=g(""),gi=g(""),Ar=g(null),ot=g(!1),Ft=g(!1),le=g(null),se=g(null);typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;!r.closest(".share-dropdown")&&!r.closest("[data-share-button]")&&(Ar.value&&(Ar.value=null),ot.value&&(ot.value=!1))});function dn(){hi.value=!1,yo.value=null,Ue.value="",Ie.value=!1,cn.value="confirm",pe.value="",gi.value=""}async function Ys(){const t=yo.value;if(t===null)return;const r=Ue.value,n=Ie.value,o=pe.value;yo.value=null,await Za(t,C.value),dn(),ze.value={action:"removal",name:r,date:o,isOwner:n},_e.value=!0}function vi(){ui.value=!1,Dr.value=null}async function qs(){if(Dr.value===null)return;const t={playStyle:Je.value,allowRotation:bo.value};(Cn.value||_n.value)&&(t.timeRange={start:Cn.value,end:_n.value}),await Xa(Dr.value,t,C.value),vi()}function Ks(t){const r=$.value,n=t.name||"",o=C.value&&z(C.value)===z(n),a=t.addedBy&&C.value&&z(C.value)===z(t.addedBy),i=r&&sessionStorage.getItem(`adminAuth_${r}`)==="true";return!!(o||a||i)}function ht({matchKey:t}){const r=te.value[t]||"",[n,o]=Re(r);return U(()=>{o(te.value[t]||"")},[te.value[t]]),e("div",{style:"padding: 8px 12px; background: var(--color-bg-muted, #f9f9f9); border-radius: var(--radius-lg, 8px); margin-top: 8px;",children:[e("div",{style:"font-size: 11px; color: var(--color-gray-base, #666); margin-bottom: 4px; font-weight: 500;",children:"Booking Details"}),e("input",{type:"text",placeholder:"e.g. Courtside Court 1, 12PM",value:n,onInput:i=>{o(i.target.value)},onBlur:()=>{const i=n.trim(),l=te.value[t]||"";i!==l&&_l(t,i)},style:{width:"100%",padding:"8px 12px",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"6px",fontSize:"14px",background:"white"}})]})}function gt({players:t,checkins:r}){const n=C.value?z(C.value):"";return e("div",{style:"padding: 4px 0;",children:t.map(o=>{const a=n&&z(o.name)===n,i=r.findIndex(c=>z(c.name)===z(o.name)&&c.timestamp===o.timestamp),l=o.timeRange?ue(o.timeRange.start,o.timeRange.end):"";return e("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 12px",borderBottom:"1px solid var(--color-border-light, #f0f0f0)",fontSize:"14px",background:a?"var(--color-primary-light, #E8F5E9)":"transparent"},children:[e("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e("span",{style:{color:"var(--color-text-muted, #999)",fontSize:"13px",minWidth:"20px"},children:i>=0?`${i+1}.`:""}),e("span",{style:a?{fontWeight:600,color:"var(--color-primary, #2C6E49)"}:{},children:o.name}),a&&e("span",{style:{fontSize:"10px",background:"var(--color-primary, #2C6E49)",color:"white",padding:"1px 4px",borderRadius:"4px"},children:"YOU"}),l&&e("span",{style:{fontSize:"12px",color:"var(--color-text-muted, #999)",marginLeft:"4px"},children:l})]}),e("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:o.playStyle==="singles"?"var(--color-blue-light, #E3F2FD)":o.playStyle==="doubles"?"var(--color-orange-light, #FFF3E0)":"var(--color-primary-light, #E8F5E9)",color:o.playStyle==="singles"?"var(--color-blue-base, #1976D2)":o.playStyle==="doubles"?"var(--color-orange-base, #F57C00)":"var(--color-primary, #2C6E49)",fontWeight:500},children:An(o.playStyle||"both")})]},o.name)})})}function Js(){const t=!we.value;we.value=t,localStorage.setItem("games_compact_view",String(t))}function Le({checkin:t,globalIndex:r}){const n=C.value&&z(t.name)===z(C.value),o=Ks(t);let a="";t.isGuest?a=`guest of ${t.addedBy}`:t.addedBy&&z(t.addedBy)!==z(t.name)&&(a=`added by ${t.addedBy}`);const i=t.timeRange?ue(t.timeRange.start,t.timeRange.end):"",l=()=>{kn(t.name,!0)};return e("div",{class:n?"checkin-item current-user":"checkin-item",children:[e("span",{children:[e("span",{class:"checkin-name",children:[r+1,". ",t.name,n&&e("span",{class:"current-user-badge",children:"YOU"}),a&&e("span",{class:"guest-indicator",children:[" ",a]}),i&&e("span",{class:"time-badge",children:i}),t.allowRotation===!1&&e("span",{class:"time-badge",style:"background: var(--color-orange-light, #fff3e0); color: var(--color-orange-dark, #e65100);",children:"No 3s"})]}),e("span",{class:`preference-badge ${t.playStyle||"both"}`,children:An(t.playStyle||"both")}),e("span",{class:"checkin-time",children:To(t.timestamp)})]}),o&&e("button",{class:"edit-btn",onClick:l,title:"Edit check-in",style:{background:"white",color:"var(--color-primary, #2C6E49)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"8px",padding:"0",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})})]})}function Qs(t,r){const o=new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),a=t.players.map(c=>c.name).join(" & "),i=$.value,l=`${window.location.origin}${window.location.pathname}#${i}`;if(t.type==="doubles-forming"){const c=t.needed||4-t.players.length;let d=`🎾 ${c===1?"1 more player needed":`${c} more players needed`} for doubles!
`;return d+=`📅 ${o}
`,d+=`👥 ${a} ${t.players.length===1?"is":"are"} in

`,d+=`Can you make it? ${l}`,d}else if(t.type==="singles-forming"){const c=t.players[0];let s=`🎾 1 more player needed for singles!
`;return s+=`📅 ${o}
`,s+=`👤 ${c.name} is in`,c.timeRange&&(s+=` (${ue(c.timeRange.start,c.timeRange.end)})`),s+=`

Can you make it? ${l}`,s}return""}function Un(t,r,n){const o=Qs(t,r);if(n==="whatsapp"){const a=encodeURIComponent(o);window.open(`https://wa.me/?text=${a}`,"_blank")}else if(n==="sms"){const a=encodeURIComponent(o);window.open(`sms:?body=${a}`,"_blank")}else n==="copy"&&navigator.clipboard.writeText(o).then(()=>{y("Message copied!","success")}).catch(()=>{y("Failed to copy","error")});Ar.value=null}function pa({match:t,matchKey:r}){const n=j.value||"",o=Ar.value===r;return e("div",{style:"position: relative; display: inline-block;",children:[e("button",{"data-share-button":!0,onClick:a=>{a.stopPropagation(),Ar.value=o?null:r},style:{background:o?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"12px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"white",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(255, 152, 0, 0.3)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",style:{transform:o?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),o&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:()=>Un(t,n,"whatsapp"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>Un(t,n,"sms"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>Un(t,n,"copy"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]})}function Xs(t,r,n){let i=`${new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
`,l=0,c=0;t.forEach(f=>{if(f.type==="doubles"){const x=f.players.map(w=>w.name);i+=`Doubles: ${x.join(", ")}
`;const k=f.players.filter(w=>w.timeRange).map(w=>ue(w.timeRange.start,w.timeRange.end));k.length>0&&(i+=`${k[0]}
`);const b=`doubles-${f.number}`;te.value[b]&&(i+=`📝 ${te.value[b]}
`),i+=`
`}else if(f.type==="singles"){l++;const x=f.players.map(I=>I.name);i+=`Singles: ${x.join(", ")}
`;const k=f.players.every(I=>(I.playStyle||"both")==="both"),b=f.players.some(I=>I.allowRotation===!0);k&&b&&(i+=`Open to more players
`);const w=f.players.filter(I=>I.timeRange).map(I=>ue(I.timeRange.start,I.timeRange.end));w.length>0&&(i+=`${w[0]}
`);const E=`singles-${l}`;te.value[E]&&(i+=`📝 ${te.value[E]}
`),i+=`
`}else if(f.type==="singles-or-practice"){c++,i+=`Rotation: ${f.players.map(b=>b.name).join(", ")}
`;const x=f.players.filter(b=>b.timeRange).map(b=>ue(b.timeRange.start,b.timeRange.end));x.length>0&&(i+=`${x[0]}
`);const k=`rotation-${c}`;te.value[k]&&(i+=`📝 ${te.value[k]}
`),i+=`
`}else if(f.type==="doubles-forming"){const x=f.players.map(E=>E.name),k=f.needed===1?"need 1 more":`need ${f.needed} more`;i+=`Doubles (forming): ${x.join(", ")}
`,i+=`${k}
`,f.canRotate?i+=`Can rotate if no 4th
`:f.canPlaySingles&&(f.eitherCount||0)>=2?i+=`Will play singles if no more join
`:(f.eitherCount||0)===1&&f.players.length===1&&(i+=`Can play singles if 1 more joins
`);const b=f.players.filter(E=>E.timeRange).map(E=>ue(E.timeRange.start,E.timeRange.end));b.length>0&&(i+=`${b[0]}
`);const w="doubles-forming-1";te.value[w]&&(i+=`📝 ${te.value[w]}
`),i+=`
`}else if(f.type==="singles-forming"){const x=f.players[0];i+=`Singles (forming): ${x.name}
`,i+=`need 1 more
`,x.timeRange&&(i+=`${ue(x.timeRange.start,x.timeRange.end)}
`),i+=`
`}});const s=t.filter(f=>f.type==="waiting");if(s.length>0){const f=s.flatMap(x=>x.players.map(k=>k.name));f.length>0&&(i+=`Standby: ${f.join(", ")}
`)}const d=P.value.location,h=d?.lat??37.2358,u=d?.lon??-121.9623,v=`${h},${u},${n}`,p=Qt.value[v];if(p){const f=pi(p.weatherCode);i+=`${f}, ${p.tempMax}°F`}return i.trim()}function Gn(t,r,n,o){const a=Xs(t,r,n);if(o==="whatsapp"){const i=encodeURIComponent(a);window.open(`https://wa.me/?text=${i}`,"_blank")}else if(o==="sms"){const i=encodeURIComponent(a);window.open(`sms:?body=${i}`,"_blank")}else o==="copy"&&navigator.clipboard.writeText(a).then(()=>{y("Message copied!","success")}).catch(()=>{y("Failed to copy","error")});ot.value=!1}function Zs(){const t=j.value;t&&confirm(`Are you sure you want to reset all check-ins for ${ee(t)}?

This cannot be undone.`)&&Cl()}function Ne(t,r){return t.findIndex(n=>z(n.name)===z(r.name)&&n.timestamp===r.timestamp)}function ec(t,r){const n={matches:{},unassigned:[]};let o=0,a=0;return t.forEach(i=>{const l=i.players.map(c=>c.name);if(i.type==="doubles"||i.type==="doubles-forming"){o++;const c=`doubles-${o}`;n.matches[c]={players:l,note:te.value[c]||""}}else if(i.type==="singles"||i.type==="singles-forming"||i.type==="singles-or-practice"){a++;const c=`singles-${a}`;n.matches[c]={players:l,note:te.value[c]||""}}else i.type==="waiting"&&n.unassigned.push(...l)}),n}function ua(t,r){if(!Ft.value||!se.value)return;const n=le.value;if(!n)le.value={name:t,matchKey:r};else if(n.name===t&&n.matchKey===r)le.value=null;else{const o=se.value,a={...o.matches},i=[...o.unassigned];if(n.matchKey==="unassigned"){const l=i.indexOf(n.name);l>-1&&i.splice(l,1)}else{const l=a[n.matchKey];l&&(l.players=l.players.filter(c=>c!==n.name))}if(r==="unassigned"){const l=i.indexOf(t);l>-1&&i.splice(l,1)}else{const l=a[r];l&&(l.players=l.players.filter(c=>c!==t))}r==="unassigned"?i.push(n.name):a[r].players.push(n.name),n.matchKey==="unassigned"?i.push(t):a[n.matchKey].players.push(t),se.value={matches:a,unassigned:i},le.value=null,y(`Swapped ${n.name} and ${t}`,"info")}}function tc(t,r){try{H.value&&H.value.matches&&typeof H.value.matches=="object"?se.value={matches:{...H.value.matches},unassigned:Array.isArray(H.value.unassigned)?[...H.value.unassigned]:[]}:se.value=ec(t,r),le.value=null,Ft.value=!0}catch(n){console.error("Error starting arrange mode:",n),se.value={matches:{},unassigned:r.map(o=>o.name)},le.value=null,Ft.value=!0}}function fi(){Ft.value=!1,le.value=null,se.value=null}async function rc(){se.value&&(await $l(se.value),Ft.value=!1,le.value=null,se.value=null)}async function nc(){await Il(),fi()}function oc(){El();const t=ed.value,r=j.value||"",n=Dr.value!==null?t[Dr.value]:null,o=$.value,a=o&&sessionStorage.getItem(`adminAuth_${o}`)==="true",i=Ft.value,l=!!(H.value&&H.value.matches&&Object.keys(H.value.matches).length>0),c=e(N,{children:[e(Ye,{isOpen:ui.value,onClose:vi,title:`Edit ${n?.name||""}'s Preferences`,children:e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:[e("div",{children:[e("label",{style:"display: block; font-weight: 500; margin-bottom: 8px;",children:"Play Style"}),e("div",{style:"display: flex; gap: 8px;",children:["singles","doubles","both"].map(p=>e("button",{onClick:()=>{Je.value=p},style:{flex:1,padding:"10px",border:Je.value===p?"2px solid var(--color-primary, #2C6E49)":"2px solid var(--color-border, #e0e0e0)",borderRadius:"8px",background:Je.value===p?"var(--color-primary-light, #E8F5E9)":"#fff",color:Je.value===p?"var(--color-primary, #2E7D32)":"var(--color-gray-base, #666)",cursor:"pointer",fontWeight:Je.value===p?"600":"400"},children:p==="singles"?"Singles":p==="doubles"?"Doubles":"Either"},p))})]}),e("div",{children:[e("label",{style:"display: block; font-weight: 500; margin-bottom: 8px;",children:"Available Time (optional)"}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[e("input",{type:"time",value:Cn.value,onInput:p=>{Cn.value=p.target.value},style:"flex: 1; padding: 8px; border: 1px solid var(--color-gray-light, #ddd); border-radius: 6px;"}),e("span",{children:"to"}),e("input",{type:"time",value:_n.value,onInput:p=>{_n.value=p.target.value},style:"flex: 1; padding: 8px; border: 1px solid var(--color-gray-light, #ddd); border-radius: 6px;"})]})]}),Je.value==="singles"&&e("div",{children:[e("label",{style:"display: flex; align-items: center; gap: 8px; cursor: pointer;",children:[e("input",{type:"checkbox",checked:bo.value,onChange:p=>{bo.value=p.target.checked}}),e("span",{children:"Open to 3-player rotation"})]}),e("p",{style:"font-size: 12px; color: var(--color-gray-base, #666); margin: 4px 0 0 24px;",children:"If unchecked, you'll only be matched for 2-player singles"})]}),e("button",{onClick:qs,style:{padding:"12px",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer",marginTop:"8px"},children:"Save Changes"})]})}),e(Ye,{isOpen:hi.value,onClose:dn,title:cn.value==="done"?"":Ie.value?"Remove Your Check-in?":`Remove ${Ue.value}?`,showCloseButton:cn.value!=="done",children:e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:cn.value==="confirm"?e(N,{children:[Ie.value?e(N,{children:[e("p",{style:"color: var(--color-gray-base, #666); margin: 0; line-height: 1.5;",children:"Are you sure you want to remove yourself from this date?"}),e("div",{style:"background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;",children:[e("p",{style:"margin: 0 0 8px 0; font-weight: 500; color: #E65100;",children:"Things to consider:"}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-gray-base, #666); font-size: 14px;",children:[e("li",{children:"You'll lose your current spot in the check-in order"}),e("li",{children:["If you want to change your preferences, you can ",e("strong",{children:"edit"})," ","instead"]}),e("li",{children:"You can always check in again after removing"})]})]})]}):e(N,{children:[e("p",{style:"color: var(--color-gray-base, #666); margin: 0; line-height: 1.5;",children:["Are you sure you want to remove ",e("strong",{children:Ue.value})," from this date?"]}),e("div",{style:"background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;",children:e("p",{style:"margin: 0; color: var(--color-gray-base, #666); font-size: 14px;",children:["They will lose their spot in the check-in order. Consider using"," ",e("strong",{children:"edit"})," to update their preferences instead."]})})]}),e("div",{style:"display: flex; gap: 12px; margin-top: 8px;",children:[e("button",{onClick:dn,style:{flex:1,padding:"12px",background:"var(--color-gray-lightest, #f5f5f5)",color:"var(--color-gray-base, #666)",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"500",cursor:"pointer"},children:"Cancel"}),e("button",{onClick:Ys,style:{flex:1,padding:"12px",background:"#ef5350",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer"},children:"Yes, Remove"})]})]}):e(N,{children:[e("div",{style:"text-align: center; padding: 8px 0;",children:[e("div",{style:"font-size: 48px; margin-bottom: 8px;",children:"✓"}),e("p",{style:"color: var(--color-gray-base, #666); margin: 0;",children:Ie.value?`You've been removed from ${ee(pe.value)}`:`${Ue.value} has been removed from ${ee(pe.value)}`})]}),e("div",{children:[e("p",{style:"margin: 0 0 8px 0; font-size: 13px; color: var(--color-gray-base, #666); text-align: center;",children:"Let others know:"}),e("div",{style:"display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;",children:[e("a",{href:`https://wa.me/?text=${encodeURIComponent(Ie.value?`I'm out on ${ee(pe.value)}.`:`Hi ${Ue.value}, I removed you from ${ee(pe.value)}. Let me know if you have questions!`)}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"var(--color-whatsapp, #25D366)",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"WhatsApp"}),e("a",{href:`sms:?body=${encodeURIComponent(Ie.value?`I'm out on ${ee(pe.value)}.`:`Hi ${Ue.value}, I removed you from ${ee(pe.value)}. Let me know if you have questions!`)}`,style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#007AFF",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"Text"}),e("a",{href:`mailto:?subject=${encodeURIComponent(Ie.value?`I'm Out on ${ee(pe.value)}`:`${gi.value} - Check-in Removed`)}&body=${encodeURIComponent(Ie.value?`I'm out on ${ee(pe.value)}.`:`Hi ${Ue.value},

I removed you from ${ee(pe.value)}.

Let me know if you have questions!`)}`,style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#EA4335",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"Email"})]})]}),e("button",{onClick:dn,style:{width:"100%",padding:"12px",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer",marginTop:"8px"},children:"Done"})]})})})]});if(t.length===0)return e(N,{children:[e(da,{message:"No check-ins yet",subtext:"Be the first to check in for this date!"}),c]});const{matches:s,warnings:d}=Mn(t),h=s.some(p=>p.type!=="waiting"||p.players.length>0);if(!h&&d.length===0)return e(N,{children:[e(da,{message:"No check-ins yet",subtext:"Be the first to check in for this date!"}),c]});let u=0,v=0;return e(N,{children:[e("div",{class:"games-list",style:"margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("h2",{style:"margin: 0; font-size: var(--font-size-xl, 18px); font-weight: 600;",children:["Games"," ",e("span",{style:"font-size: var(--font-size-sm, 13px); font-weight: 500; color: var(--color-text-secondary, #666);",children:["(",t.length," checked in)"]})]}),l&&!i&&e("span",{style:{fontSize:"11px",background:"var(--color-purple-arrange, #9C27B0)",color:"white",padding:"2px 6px",borderRadius:"4px",fontWeight:"600"},children:"Arranged"})]}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[!i&&e("button",{onClick:Js,title:we.value?"Show details":"Compact view",style:{background:"var(--color-bg-subtle, #f5f5f5)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"6px",padding:"6px 10px",fontSize:"12px",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"var(--color-text-secondary, #666)"},children:we.value?e(N,{children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"})}),"Details"]}):e(N,{children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M3 4h18v2H3V4zm2 4h14v2H5V8zm-2 4h18v2H3v-2zm2 4h14v2H5v-2z"})}),"Compact"]})}),i?e(N,{children:[e("button",{onClick:rc,style:{background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"600",cursor:"pointer"},children:"Save"}),e("button",{onClick:fi,style:{background:"var(--color-gray-lightest, #f5f5f5)",color:"var(--color-gray-base, #666)",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer"},children:"Cancel"}),l&&e("button",{onClick:nc,style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer"},children:"Reset"})]}):e(N,{children:[h&&e("div",{style:"position: relative;",children:[e("button",{"data-share-button":!0,onClick:()=>{ot.value=!ot.value},title:"Share Games",style:{background:ot.value?"var(--color-primary-dark, #1a402b)":"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),ot.value&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",zIndex:100,overflow:"hidden",minWidth:"160px"},children:[e("button",{onClick:()=>Gn(s,t,r,"whatsapp"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-whatsapp, #25D366)",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>Gn(s,t,r,"sms"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-sms, #2196F3)",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>Gn(s,t,r,"copy"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-gray-base, #666)",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),a&&t.length>=2&&e("button",{onClick:()=>tc(s,t),title:"Arrange Players",style:{background:"var(--color-purple-arrange, #9C27B0)",color:"white",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})}),"Arrange"]}),a&&t.length>0&&!h&&e("button",{class:"reset-day-btn",onClick:Zs,title:"Reset This Day",style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"50%",padding:"0",width:"36px",height:"36px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})]})]}),i&&e("div",{style:{background:"var(--color-purple-arrange-light, #F3E5F5)",borderRadius:"8px",padding:"12px",marginBottom:"16px",color:"var(--color-purple-arrange-dark, #7B1FA2)",fontSize:"14px"},children:[e("strong",{children:"Arrange Mode:"})," Tap a player to select, then tap another player to swap their positions.",le.value&&e("span",{style:{display:"block",marginTop:"4px"},children:["Selected: ",e("strong",{children:le.value.name})," - tap another player to swap"]})]}),i&&se.value&&e(N,{children:[Object.entries(se.value.matches||{}).map(([p,f])=>{const x=p.startsWith("doubles"),k=p.split("-")[1],b=f?.players||[];return b.length===0?null:e("div",{class:"match-group",style:{marginBottom:"16px",border:"2px dashed var(--color-purple-arrange, #9C27B0)",borderRadius:"8px",padding:"8px"},children:[e("h3",{style:"margin: 0 0 8px 0;",children:[x?`Doubles ${k}`:`Singles ${k}`,e("span",{style:{fontSize:"12px",color:"var(--color-gray-base, #666)",marginLeft:"8px"},children:["(",b.length,"/",x?4:2,")"]})]}),e("div",{style:"display: flex; flex-direction: column; gap: 4px;",children:b.map(w=>{const E=le.value?.name===w&&le.value?.matchKey===p;return e("div",{onClick:()=>ua(w,p),style:{padding:"10px 12px",background:E?"var(--color-purple-arrange, #9C27B0)":"var(--color-gray-lightest, #f5f5f5)",color:E?"white":"var(--color-gray-dark, #333)",borderRadius:"6px",cursor:"pointer",fontWeight:"500",transition:"all 0.15s",border:E?"2px solid var(--color-purple-arrange-dark, #7B1FA2)":"2px solid transparent"},children:w},w)})})]},p)}),se.value.unassigned.length>0&&e("div",{class:"match-group",style:{marginBottom:"16px",border:"2px dashed #9e9e9e",borderRadius:"8px",padding:"8px",background:"#fafafa"},children:[e("h3",{style:"margin: 0 0 8px 0; color: var(--color-gray-base, #666);",children:"Unassigned"}),e("div",{style:"display: flex; flex-direction: column; gap: 4px;",children:se.value.unassigned.map(p=>{const f=le.value?.name===p&&le.value?.matchKey==="unassigned";return e("div",{onClick:()=>ua(p,"unassigned"),style:{padding:"10px 12px",background:f?"var(--color-purple-arrange, #9C27B0)":"#fff",color:f?"white":"var(--color-gray-dark, #333)",borderRadius:"6px",cursor:"pointer",fontWeight:"500",transition:"all 0.15s",border:f?"2px solid var(--color-purple-arrange-dark, #7B1FA2)":"2px solid var(--color-border, #e0e0e0)"},children:p},p)})})]})]}),!i&&!l&&d.length>0&&e("div",{class:"warning-box",children:d.map((p,f)=>e("div",{children:p},f))}),!i&&l&&H.value&&H.value.matches&&e(N,{children:[Object.entries(H.value.matches).map(([p,f])=>{const x=p.startsWith("doubles"),k=p.split("-")[1],b=x?4:2,w=f?.players||[],E=w.length>=b,I=w.map(S=>t.find(_=>_.name===S)||{name:S,timestamp:0});return e("div",{class:`match-group ${E?"":"forming-group"}`,style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:[x?"Doubles":"Singles"," ",k]}),E?e("span",{style:"display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]}):e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",b-w.length]})]}),e("div",{id:"checkinList",children:I.map(S=>{const m=Ne(t,S);return e(Le,{checkin:S,globalIndex:m>=0?m:-1},m>=0?m:S.name)})}),e(ht,{matchKey:p})]},p)}),H.value.unassigned&&H.value.unassigned.length>0&&e("div",{class:"match-group waiting-group",style:"margin-bottom: 16px;",children:[e("h3",{style:"margin: 0 0 8px 0;",children:"Unassigned"}),e("div",{id:"checkinList",children:H.value.unassigned.map(p=>{const f=t.find(b=>b.name===p),x=f||{name:p,timestamp:0},k=f?Ne(t,x):-1;return e(Le,{checkin:x,globalIndex:k>=0?k:-1},k>=0?k:p)})})]})]}),!i&&!l&&s.map((p,f)=>{if(p.type==="doubles"){const x=`doubles-${p.number}`,k=we.value;return e("div",{class:"match-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:["Doubles ",p.number]}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),k?e(gt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(b=>{const w=Ne(t,b);return e(Le,{checkin:b,globalIndex:w},w)})}),e(ht,{matchKey:x})]},f)}if(p.type==="singles"){u++;const x=`singles-${u}`,k=we.value,b=p.players.every(I=>(I.playStyle||"both")==="both"),w=p.players.some(I=>I.allowRotation===!0),E=b&&w;return e("div",{class:"match-group singles-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:["Singles",u>1?` ${u}`:""]}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),k?e(gt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(I=>{const S=Ne(t,I);return e(Le,{checkin:I,globalIndex:S},S)})}),!k&&E&&e("p",{style:"color: var(--color-gray-base, #666); font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;",children:"Open to more players"}),e(ht,{matchKey:x})]},f)}if(p.type==="singles-or-practice"){v++;const x=`rotation-${v}`,k=we.value;return e("div",{class:"match-group singles-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Rotation (3 players)"}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),k?e(gt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(b=>{const w=Ne(t,b);return e(Le,{checkin:b,globalIndex:w},w)})}),e(ht,{matchKey:x})]},f)}if(p.type==="doubles-forming"){const x="doubles-forming-1",k=p.needed||4-p.players.length,b=we.value;let w="";return p.canRotate?w="Can rotate if no 4th":p.canPlaySingles&&(p.eitherCount||0)>=2?w="Will play singles if no more join":(p.eitherCount||0)===1&&p.players.length===1&&(w="Can play singles if 1 more joins"),e("div",{class:"match-group forming-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Doubles"}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",k]}),e(pa,{match:p,matchKey:x,needed:k})]})]}),b?e(gt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(E=>{const I=Ne(t,E);return e(Le,{checkin:E,globalIndex:I},I)})}),!b&&w&&e("p",{style:"color: var(--color-gray-base, #666); font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;",children:w}),e(ht,{matchKey:x})]},f)}if(p.type==="singles-forming"){const x="singles-forming-1",k=we.value;return e("div",{class:"match-group forming-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Singles"}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need 1"]}),e(pa,{match:p,matchKey:x,needed:1})]})]}),k?e(gt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(b=>{const w=Ne(t,b);return e(Le,{checkin:b,globalIndex:w},w)})}),e(ht,{matchKey:x})]},f)}if(p.type==="waiting"){const x=we.value;return e("div",{class:"match-group waiting-group",style:"margin-bottom: 16px;",children:[e("h3",{style:"margin: 0 0 8px 0;",children:"Waiting for Match"}),x?e(gt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(k=>{const b=Ne(t,k);return e(Le,{checkin:k,globalIndex:b},b)})})]},f)}return null})]}),c]})}function ac(){return e("div",{children:[e(Ls,{}),e(Gs,{}),e(js,{}),e(oc,{})]})}function vt(t,r){const n=t.replace(/-/g,"");if(r){const o=r.replace(":","")+"00";return`${n}T${o}`}return n}function On(t){return t.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n")}function ic(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}@tenniscoordinator`}function lc(t){const{date:r,title:n,description:o,location:a,startTime:i,endTime:l}=t,c=ic(),d=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z",h=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Tennis Coordinator//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",`UID:${c}`,`DTSTAMP:${d}`];if(i&&l)h.push(`DTSTART:${vt(r,i)}`),h.push(`DTEND:${vt(r,l)}`);else if(i){h.push(`DTSTART:${vt(r,i)}`);const[u,v]=i.split(":").map(Number),f=`${((u+2)%24).toString().padStart(2,"0")}:${v.toString().padStart(2,"0")}`;h.push(`DTEND:${vt(r,f)}`)}else{h.push(`DTSTART;VALUE=DATE:${vt(r)}`);const u=new Date(r+"T00:00:00");u.setDate(u.getDate()+1);const v=u.toISOString().split("T")[0];h.push(`DTEND;VALUE=DATE:${vt(v)}`)}return h.push(`SUMMARY:${On(n)}`),h.push(`DESCRIPTION:${On(o)}`),a&&h.push(`LOCATION:${On(a)}`),h.push("END:VEVENT"),h.push("END:VCALENDAR"),h.join(`\r
`)}function sc(){return/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)}function cc(t){const{date:r,title:n,description:o,location:a,startTime:i,endTime:l}=t;let c;if(i&&l){const h=`${r.replace(/-/g,"")}T${i.replace(":","")}00`,u=`${r.replace(/-/g,"")}T${l.replace(":","")}00`;c=`${h}/${u}`}else if(i){const[h,u]=i.split(":").map(Number),p=`${((h+2)%24).toString().padStart(2,"0")}${u.toString().padStart(2,"0")}00`,f=`${r.replace(/-/g,"")}T${i.replace(":","")}00`,x=`${r.replace(/-/g,"")}T${p}`;c=`${f}/${x}`}else{const h=r.replace(/-/g,""),u=new Date(r+"T00:00:00");u.setDate(u.getDate()+1);const v=u.toISOString().split("T")[0].replace(/-/g,"");c=`${h}/${v}`}const s="https://calendar.google.com/calendar/render",d=new URLSearchParams({action:"TEMPLATE",text:n,dates:c,details:o});return a&&d.set("location",a),`${s}?${d.toString()}`}function dc(t,r){if(sc()){const n=cc(t);window.open(n,"_blank")}else{const n=lc(t),o=new Blob([n],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(o),i=document.createElement("a");i.href=a,i.download=`tennis-${t.date}.ics`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)}}function pc(t){const{date:r,matchType:n,players:o,groupName:a,location:i,notes:l}=t,s=`${n.includes("doubles")?"Doubles":n.includes("singles")?"Singles":"Tennis"} - ${a}`;let d=`Players: ${o.map(p=>p.name).join(", ")}`;l&&(d+=`

Notes: ${l}`);let h,u;const v=o.filter(p=>p.timeRange);if(v.length>0){const p=v.map(x=>x.timeRange.start).sort(),f=v.map(x=>x.timeRange.end).sort();h=p[p.length-1],u=f[0],h>=u&&(h=v[0].timeRange.start,u=v[0].timeRange.end)}return{date:r,title:s,description:d,location:i,startTime:h,endTime:u}}const Mr=g(null),$e=g(null),tt=g(!1),Rr=g(!1),ct=g(new Set),lr=g(!1),me=g("upcoming");function uc(){const t=$.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;Mr.value&&!r.closest(".share-dropdown")&&!r.closest("[data-share-button]")&&(Mr.value=null),tt.value&&!r.closest(".member-picker-dropdown")&&!r.closest("[data-member-picker-button]")&&(tt.value=!1)});const hc=Ve(()=>{const t=$e.value||C.value;if(!t)return{upcoming:[],past:[]};const r=z(t),n=[],o=[],a=new Date;a.setHours(0,0,0,0);const i=Object.keys(ie.value).sort();for(const l of i){const s=new Date(l+"T00:00:00")<a,d=ie.value[l]||[];if(d.length===0)continue;const h={},u=ae.value||{};for(const[p,f]of Object.entries(u))f&&typeof f=="object"&&(h[z(p)]={include:f.include||[],exclude:f.exclude||[]});const v=Mn(d,h);for(const p of v.matches)if(p.players.map(x=>z(x.name)).includes(r)){const x=p.type==="doubles-forming"||p.type==="singles-forming",k={date:l,type:p.type,matchNumber:p.number||1,players:p.players.map(b=>({name:b.name,timeRange:b.timeRange})),isForming:x,needed:p.needed};s?o.push(k):n.push(k)}}return o.sort((l,c)=>c.date.localeCompare(l.date)),{upcoming:n,past:o}});function wo(t){switch(t){case"doubles":case"doubles-forming":return"Doubles";case"singles":case"singles-forming":return"Singles";case"rotation":case"singles-or-practice":return"Rotation";default:return t}}function gc(t){const n=new Date(t.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),o=t.players.map(l=>l.name).join(" & "),a=$.value,i=`${window.location.origin}${window.location.pathname}#${a}`;if(t.type==="doubles-forming"){const l=t.needed||4-t.players.length;let s=`🎾 ${l===1?"1 more player needed":`${l} more players needed`} for doubles!
`;return s+=`📅 ${n}
`,s+=`👥 ${o} ${t.players.length===1?"is":"are"} in

`,s+=`Can you make it? ${i}`,s}else if(t.type==="singles-forming"){const l=t.players[0];let c=`🎾 1 more player needed for singles!
`;return c+=`📅 ${n}
`,c+=`👤 ${l.name} is in`,l.timeRange&&(c+=` (${ue(l.timeRange.start,l.timeRange.end)})`),c+=`

Can you make it? ${i}`,c}return""}function Hn(t,r){const n=gc(t);if(r==="whatsapp"){const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")}else if(r==="sms"){const o=encodeURIComponent(n);window.open(`sms:?body=${o}`,"_blank")}else r==="copy"&&navigator.clipboard.writeText(n).then(()=>{y("Message copied!","success")}).catch(()=>{y("Failed to copy","error")});Mr.value=null}function ha(t){Rr.value||(j.value=t,he.value="checkin")}function vc(t){const r=`${t.type.replace("-forming","")}-${t.matchNumber}`,n=te.value[r]||"",o=pc({date:t.date,matchType:t.type,players:t.players,groupName:ne.value||"Tennis",location:P.value.location?.name,notes:n});dc(o),y("Calendar event downloaded","success")}function fc(t){const r=new Set(ct.value);r.has(t)?r.delete(t):r.add(t),ct.value=r}function Wn(){Rr.value=!1,ct.value=new Set,lr.value=!1}function mc(t,r){const n=$.value,o=`${window.location.origin}${window.location.pathname}#${n}`,a=t.filter((s,d)=>{const h=`mygames-${s.date}-${s.type}-${d}`;return r.has(h)});if(a.length===0)return"";const i=a.filter(s=>!s.isForming),l=a.filter(s=>s.isForming);let c=`🎾 Tennis Update

`;if(i.length>0){c+=`✅ Ready to Play:
`;for(const s of i){const h=new Date(s.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),u=wo(s.type),v=s.players.map(p=>p.name).join(", ");c+=`• ${h} - ${u}
  ${v}
`}c+=`
`}if(l.length>0){c+=`🟡 Need Players:
`;for(const s of l){const h=new Date(s.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),u=wo(s.type),v=s.needed||1,p=s.players.map(f=>f.name).join(", ");c+=`• ${h} - ${u} needs ${v}
  ${p}
`}c+=`
`}return c+=`Check in: ${o}`,c}function qr(t,r){const n=mc(r,ct.value);if(!n){y("No games selected","error");return}if(t==="native"&&navigator.share)navigator.share({title:"Tennis Update",text:n}).catch(()=>{navigator.clipboard.writeText(n).then(()=>{y("Copied to clipboard","success")})});else if(t==="whatsapp"){const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")}else if(t==="sms"){const o=encodeURIComponent(n);window.open(`sms:?body=${o}`,"_blank")}else navigator.clipboard.writeText(n).then(()=>{y("Copied to clipboard","success")}).catch(()=>{y("Failed to copy","error")});lr.value=!1,Rr.value=!1,ct.value=new Set}function xc(){xl();const t=hc.value,r=me.value==="upcoming"?t.upcoming:t.past,n=uc(),o=$e.value||C.value,a=$e.value&&$e.value!==C.value,i=ct.value.size,l=Rr.value,c=me.value==="past";return e("div",{style:"padding: 16px 0;",children:[l&&e("div",{style:{position:"fixed",bottom:"70px",left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:"400px",background:"white",borderRadius:"16px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",zIndex:100,boxShadow:"0 4px 16px rgba(0,0,0,0.15)"},children:[e("button",{onClick:Wn,style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",cursor:"pointer",color:"var(--color-gray-base, #666)"},children:"Cancel"}),e("span",{style:{fontSize:"14px",color:"var(--color-gray-base, #666)"},children:[i," selected"]}),e("div",{style:{position:"relative"},children:[e("button",{onClick:()=>{lr.value=!lr.value},disabled:i===0,style:{background:i>0?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",border:"none",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",fontWeight:"600",cursor:i>0?"pointer":"default",color:"white",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),lr.value&&i>0&&e("div",{style:{position:"absolute",bottom:"100%",right:"0",marginBottom:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",overflow:"hidden",minWidth:"160px"},children:[typeof navigator.share=="function"&&e("button",{onClick:()=>qr("native",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#333"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})}),"Share..."]}),e("button",{onClick:()=>qr("whatsapp",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)",borderTop:typeof navigator.share=="function"?"1px solid #f0f0f0":"none"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>qr("sms",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>qr("copy",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy text"]})]})]})]}),e("div",{style:{display:"flex",background:"var(--color-gray-lightest, #f0f0f0)",borderRadius:"10px",padding:"4px",marginBottom:"16px"},children:[e("button",{onClick:()=>{me.value="upcoming",Wn()},style:{flex:1,padding:"10px 16px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",background:me.value==="upcoming"?"white":"transparent",color:me.value==="upcoming"?"var(--color-primary, #2C6E49)":"var(--color-gray-base, #666)",boxShadow:me.value==="upcoming"?"0 1px 3px rgba(0,0,0,0.1)":"none"},children:["Upcoming (",t.upcoming.length,")"]}),e("button",{onClick:()=>{me.value="past",Wn()},style:{flex:1,padding:"10px 16px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",background:me.value==="past"?"white":"transparent",color:me.value==="past"?"var(--color-primary, #2C6E49)":"var(--color-gray-base, #666)",boxShadow:me.value==="past"?"0 1px 3px rgba(0,0,0,0.1)":"none"},children:["Past (",t.past.length,")"]})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;",children:[e("h2",{style:"margin: 0; font-size: 20px;",children:a?`${$e.value}'s ${c?"Past":"Upcoming"} Games`:`My ${c?"Past":"Upcoming"} Games`}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[a&&e("button",{onClick:()=>{$e.value=null},style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"16px",padding:"4px 12px",fontSize:"12px",cursor:"pointer",color:"var(--color-gray-base, #666)"},children:"Back to mine"}),!a&&r.length>0&&!l&&e("button",{onClick:()=>{Rr.value=!0},style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"16px",padding:"6px 12px",fontSize:"13px",cursor:"pointer",color:"var(--color-gray-base, #666)",display:"flex",alignItems:"center",gap:"6px"},children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})}),"Share"]})]})]}),n&&!a&&e("div",{style:{background:"var(--color-gray-lightest, #f5f5f5)",borderRadius:"var(--radius-lg, 8px)",padding:"var(--spacing-xl, 12px)",marginBottom:"var(--spacing-2xl, 16px)",position:"relative"},children:[e("label",{style:{display:"block",fontSize:"var(--font-size-sm, 13px)",color:"var(--color-gray-base, #666)",marginBottom:"var(--spacing-sm, 6px)",fontWeight:"500"},children:"View another member's games"}),e("button",{"data-member-picker-button":!0,onClick:s=>{s.stopPropagation(),tt.value=!tt.value},style:{width:"100%",padding:"10px 12px",background:"white",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-md, 6px)",fontSize:"var(--font-size-base, 14px)",color:"var(--color-text-secondary, #666)",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e("span",{children:"Select a member..."}),e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",style:{transform:tt.value?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),tt.value&&e("div",{class:"member-picker-dropdown",style:{position:"absolute",top:"100%",left:"var(--spacing-xl, 12px)",right:"var(--spacing-xl, 12px)",marginTop:"var(--spacing-xs, 4px)",background:"white",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",boxShadow:"var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))",zIndex:100,maxHeight:"300px",overflowY:"auto"},children:K.value.filter(s=>s!==C.value).sort((s,d)=>s.localeCompare(d)).map(s=>e("button",{onClick:()=>{$e.value=s,tt.value=!1},style:{width:"100%",padding:"12px 16px",background:"white",border:"none",borderBottom:"1px solid var(--color-border, #e0e0e0)",textAlign:"left",fontSize:"var(--font-size-base, 14px)",color:"var(--color-text-primary, #333)",cursor:"pointer"},className:"hover-bg-subtle",children:s},s))})]}),r.length===0?e("div",{style:"text-align: center; padding: 48px 24px; background: #f9f9f9; border-radius: 12px;",children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:c?"📜":"📅"}),e("p",{style:"font-size: 18px; margin: 0 0 8px 0; color: var(--color-gray-dark, #333);",children:c?"No past games":"No upcoming games"}),e("p",{style:"font-size: 14px; color: var(--color-gray-base, #666); margin: 0 0 16px 0;",children:c?a?`${$e.value} has no past games on record.`:"Your game history will appear here.":a?`${$e.value} has no upcoming games.`:"Check in for a date to get matched with other players!"}),!c&&!a&&e("button",{onClick:()=>{he.value="checkin"},style:{background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"12px",padding:"12px 24px",fontSize:"16px",fontWeight:"600",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Check In"]})]}):e("div",{style:"display: flex; flex-direction: column; gap: 12px;",children:r.map((s,d)=>{const h=s.players.filter(x=>z(x.name)!==z(o)),u=`mygames-${s.date}-${s.type}-${d}`,v=Mr.value===u,p=s.needed||1,f=ct.value.has(u);return e("div",{onClick:()=>{l&&fc(u)},style:{padding:"16px",background:s.isForming?"#FFF8E1":"#E8F5E9",borderRadius:"12px",border:l&&f?"2px solid var(--color-primary, #2C6E49)":s.isForming?"1px solid #FFE082":"1px solid #A5D6A7",cursor:l?"pointer":"default",position:"relative"},children:[l&&e("div",{style:{position:"absolute",top:"12px",right:"12px",width:"24px",height:"24px",borderRadius:"6px",border:f?"none":"2px solid var(--color-gray-disabled, #ccc)",background:f?"var(--color-primary, #2C6E49)":"white",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"16px",fontWeight:"bold"},children:f&&"✓"}),e("div",{onClick:x=>{l||(x.stopPropagation(),ha(s.date))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",cursor:"pointer",paddingRight:l?"32px":"0"},children:[e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"font-weight: 600; color: var(--color-gray-dark, #333); font-size: 16px;",children:ee(s.date)}),e("span",{style:{fontSize:"12px",padding:"2px 8px",borderRadius:"10px",background:"#f0f0f0",color:"var(--color-gray-base, #666)",fontWeight:"500"},children:wo(s.type)})]}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[s.isForming?e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",p]}):e("span",{style:"display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]}),!l&&s.isForming&&e("div",{style:"position: relative;",children:[e("button",{"data-share-button":!0,onClick:x=>{x.stopPropagation(),Mr.value=v?null:u},title:"Invite players",style:{background:v?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"12px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"white",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(255, 152, 0, 0.3)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",style:{transform:v?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),v&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:x=>{x.stopPropagation(),Hn(s,"whatsapp")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:x=>{x.stopPropagation(),Hn(s,"sms")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:x=>{x.stopPropagation(),Hn(s,"copy")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),!l&&e("button",{onClick:x=>{x.stopPropagation(),vc(s)},title:"Add to Calendar",style:{background:"transparent",border:"none",padding:"4px",cursor:"pointer",color:"#888",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px"},className:"hover-color-primary",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"})})})]})]}),e("div",{onClick:x=>{l||(x.stopPropagation(),ha(s.date))},style:{fontSize:"15px",color:"#555",cursor:"pointer",paddingRight:l?"32px":"0"},children:h.length>0?e(N,{children:[e("span",{style:"color: #888;",children:"Playing with "}),e("span",{style:"font-weight: 500;",children:h.map(x=>x.name).join(", ")})]}):e("span",{style:"color: #888; font-style: italic;",children:["Waiting for ",p," more player",p>1?"s":""]})}),(()=>{const x=`${s.type.replace("-forming","")}-${s.matchNumber}`,k=co.value[s.date]?.[x];return k?e("div",{style:{marginTop:"8px",padding:"8px 10px",background:(s.isForming,"rgba(255,255,255,0.6)"),borderRadius:"6px",fontSize:"13px",color:"var(--color-gray-base, #666)",display:"flex",alignItems:"flex-start",gap:"6px"},children:[e("span",{style:{color:"var(--color-gray-muted, #999)",flexShrink:0},children:"📝"}),e("span",{children:k})]}):null})()]},d)})}),r.length>0&&e("p",{style:"font-size: 13px; color: var(--color-gray-muted, #999); text-align: center; margin-top: 16px;",children:c?"Tap a game to view that day's history":"Tap a game to view that day's details"})]})}const Kr=g(!1),Vn=g(!1),St=g(!1),$t=g(!1),ge=g([]),Pr=g(null);typeof document<"u"&&document.addEventListener("click",t=>{if(Pr.value){const r=t.target;!r.closest(".invite-dropdown")&&!r.closest("[data-invite-button]")&&(Pr.value=null)}});function bc(t,r){const o=new Date(t+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),a=$.value,i=`${window.location.origin}${window.location.pathname}#${a}`,l=ne.value||"Tennis";if(r==="Doubles"){let c=`🎾 Need players for doubles!
`;return c+=`📅 ${o}
`,c+=`🏟️ ${l}

`,c+=`A match just opened up. Can you make it?

`,c+=`Check in: ${i}`,c}else{let c=`🎾 Need 1 more player for singles!
`;return c+=`📅 ${o}
`,c+=`🏟️ ${l}

`,c+=`A singles spot opened up. Can you make it?

`,c+=`Check in: ${i}`,c}}function Yn(t,r,n){const o=bc(t,r);if(n==="whatsapp"){const a=encodeURIComponent(o);window.open(`https://wa.me/?text=${a}`,"_blank")}else if(n==="sms"){const a=encodeURIComponent(o);window.open(`sms:?body=${a}`,"_blank")}else n==="copy"&&navigator.clipboard.writeText(o).then(()=>{y("Message copied!","success")}).catch(()=>{y("Failed to copy","error")});Pr.value=null}async function yc(){const t=$.value,r=C.value;if(!(!t||!r))try{const i=(await R().ref(`groups/${t}/userNotifications/${z(r)}/preferences`).once("value")).val()||{};St.value=i.activityAlerts===!0,$t.value=i.matchConfirmations!==!1,ge.value=i.unwatchedMembers||i.mutedMembers||[]}catch(n){console.error("Error loading notification prefs from Firebase:",n)}}async function Tr(){const t=$.value,r=C.value;if(!t||!r)return;const n={activityAlerts:St.value,matchConfirmations:$t.value,unwatchedMembers:ge.value};try{await R().ref(`groups/${t}/userNotifications/${z(r)}/preferences`).set(n),y("Preferences saved","success")}catch(o){console.error("Error saving notification prefs:",o),y("Failed to save preferences","error")}}function wc(t){ge.value.includes(t)?ge.value=ge.value.filter(r=>r!==t):ge.value=[...ge.value,t],Tr()}function kc(){ge.value=[],Tr()}function Cc(){ge.value=K.value.filter(t=>t!==C.value),Tr()}function _c(t){return!ge.value.includes(t)}function zc(t){t.read||Al(t.id),t.date&&(j.value=t.date,he.value="checkin")}function Sc(t){const r=new Date(t),o=new Date().getTime()-t;return o<6e4?"Just now":o<36e5?`${Math.floor(o/6e4)}m ago`:o<864e5?`${Math.floor(o/36e5)}h ago`:r.toLocaleDateString([],{month:"short",day:"numeric"})}function $c(){const t=Pn.value,r=t.filter(n=>!n.read).length;return U(()=>{yc()},[]),e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[Vn.value&&e("div",{style:"position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1002;",children:e("div",{style:"background: var(--color-bg-card, white); padding: var(--spacing-3xl, 20px); border-radius: var(--radius-xl, 12px); max-width: 350px; width: 90%;",children:[e("h3",{style:"margin-top: 0; margin-bottom: var(--spacing-md, 8px); color: var(--color-text-primary, #333);",children:"Followed Members"}),e("p",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666);",children:"Get activity alerts for these members"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);",children:[e("button",{onClick:kc,style:"flex: 1; padding: var(--spacing-md, 8px); background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Select All"}),e("button",{onClick:Cc,style:"flex: 1; padding: var(--spacing-md, 8px); background: var(--color-bg-muted, #f5f5f5); color: var(--color-text-secondary, #666); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Deselect All"})]}),e("div",{style:"max-height: 300px; overflow-y: auto;",children:K.value.filter(n=>n!==C.value).map(n=>{const o=_c(n);return e("button",{onClick:()=>wc(n),style:{display:"flex",alignItems:"center",gap:"var(--spacing-lg, 10px)",width:"100%",textAlign:"left",padding:"var(--spacing-xl, 12px)",marginBottom:"var(--spacing-xs, 4px)",border:o?"1px solid var(--color-primary-lighter, #A5D6A7)":"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",background:o?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, white)",color:"var(--color-text-primary, #333)",cursor:"pointer",fontSize:"var(--font-size-base, 14px)",fontWeight:"normal"},children:[e("span",{style:{width:"20px",height:"20px",borderRadius:"var(--radius-sm, 4px)",border:o?"none":"2px solid var(--color-gray-disabled, #ccc)",background:o?"var(--color-primary, #2C6E49)":"var(--color-bg-card, white)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-inverse, white)",fontSize:"var(--font-size-base, 14px)",flexShrink:0},children:o&&"✓"}),n]},n)})}),e("button",{onClick:()=>{Vn.value=!1},style:"width: 100%; margin-top: var(--spacing-xl, 12px); background: var(--color-primary, #2C6E49); color: var(--color-text-inverse, white);",children:"Done"})]})}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);",children:[e("h2",{style:"margin: 0; font-size: var(--font-size-2xl, 20px);",children:["Notifications",r>0&&e("span",{style:"margin-left: var(--spacing-md, 8px); font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); font-weight: 400;",children:["(",r," unread)"]})]}),r>0&&e("button",{onClick:Pl,style:{background:"none",border:"none",color:"var(--color-primary, #2C6E49)",fontSize:"var(--font-size-base, 14px)",cursor:"pointer",padding:"var(--spacing-xs, 4px) var(--spacing-md, 8px)"},children:"Mark all read"})]}),e("div",{style:"margin-bottom: var(--spacing-2xl, 16px); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-xl, 12px); overflow: hidden;",children:[e("button",{onClick:()=>{Kr.value=!Kr.value},style:"width: 100%; padding: 14px var(--spacing-2xl, 16px); background: var(--color-bg-subtle, #f9f9f9); border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: var(--font-size-md, 15px); font-weight: 500;",children:[e("span",{style:"display: flex; align-items: center; gap: var(--spacing-md, 8px); color: var(--color-text-primary, #333);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M19.14,12.94c0.04-0.31,0.06-0.63,0.06-0.94c0-0.31-0.02-0.63-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.37,4.82,11.69,4.82,12s0.02,0.63,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})}),"Alert Settings"]}),e("span",{style:{color:"var(--color-text-muted, #999)",transform:Kr.value?"rotate(180deg)":"none",transition:"transform 0.2s"},children:"▼"})]}),Kr.value&&e("div",{style:"padding: var(--spacing-2xl, 16px); background: var(--color-bg-card, #fff); border-top: 1px solid var(--color-border, #e0e0e0);",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Game confirmations"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:"When placed in or removed from a confirmed game"})]}),e("label",{style:"position: relative; display: inline-block; width: 48px; height: 26px;",children:[e("input",{type:"checkbox",checked:$t.value,onChange:n=>{$t.value=n.target.checked,Tr()},style:"opacity: 0; width: 0; height: 0;"}),e("span",{style:{position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:$t.value?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",transition:"0.3s",borderRadius:"26px"},children:e("span",{style:{position:"absolute",height:"20px",width:"20px",left:$t.value?"25px":"3px",bottom:"3px",backgroundColor:"white",transition:"0.3s",borderRadius:"50%"}})})]})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Activity alerts"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:"Check-ins, removals, notes"})]}),e("label",{style:"position: relative; display: inline-block; width: 48px; height: 26px;",children:[e("input",{type:"checkbox",checked:St.value,onChange:n=>{St.value=n.target.checked,Tr()},style:"opacity: 0; width: 0; height: 0;"}),e("span",{style:{position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:St.value?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",transition:"0.3s",borderRadius:"26px"},children:e("span",{style:{position:"absolute",height:"20px",width:"20px",left:St.value?"25px":"3px",bottom:"3px",backgroundColor:"white",transition:"0.3s",borderRadius:"50%"}})})]})]}),e("div",{style:"padding-top: var(--spacing-xl, 12px); border-top: 1px solid var(--color-border, #e0e0e0);",children:e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg, 10px);",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Followed members"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:(()=>{const n=K.value.filter(a=>a!==C.value);return`Following ${n.length-ge.value.length} of ${n.length} members`})()})]}),e("button",{onClick:()=>{Vn.value=!0},style:"background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); padding: var(--spacing-sm, 6px) var(--spacing-xl, 12px); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Edit"})]})})]})]}),t.length===0?e("div",{style:"text-align: center; padding: 48px var(--spacing-4xl, 24px); background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-xl, 12px);",children:[e("div",{style:"font-size: 48px; margin-bottom: var(--spacing-2xl, 16px);",children:"🔔"}),e("p",{style:"font-size: var(--font-size-xl, 18px); margin: 0 0 var(--spacing-md, 8px) 0; color: var(--color-text-primary, #333);",children:"No notifications"}),e("p",{style:"font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); margin: 0;",children:"You'll see updates about matches and check-ins here"})]}):e("div",{style:"display: flex; flex-direction: column; gap: var(--spacing-md, 8px);",children:t.map(n=>{const o=Pr.value===n.id,a=n.type==="match_dissolved";return e("div",{onClick:()=>zc(n),style:{padding:"14px var(--spacing-2xl, 16px)",background:n.read?"var(--color-bg-subtle, #f9f9f9)":"var(--color-primary-light, #E8F5E9)",borderRadius:"var(--radius-lg, 10px)",cursor:n.date?"pointer":"default",border:n.read?"1px solid var(--color-border, #e0e0e0)":"1px solid var(--color-primary-lighter, #A5D6A7)",position:"relative"},children:e("div",{style:"display: flex; justify-content: space-between; align-items: flex-start;",children:[e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-md, 15px); color: var(--color-text-primary, #333); margin-bottom: var(--spacing-sm, 6px);",children:[!n.read&&e("span",{style:"display: inline-block; width: 8px; height: 8px; background: var(--color-primary, #2C6E49); border-radius: var(--radius-full, 50%); margin-right: var(--spacing-md, 8px);"}),n.message]}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #888); display: flex; align-items: center; gap: var(--spacing-md, 8px); flex-wrap: wrap;",children:[e("span",{children:Sc(n.timestamp)}),n.date&&e("span",{style:"color: var(--color-primary, #2C6E49); font-weight: 500; display: flex; align-items: center; gap: 2px;",children:[ee(n.date)," →"]})]}),a&&n.date&&n.matchType&&e("div",{style:"margin-top: var(--spacing-xl, 12px); position: relative;",children:[e("button",{"data-invite-button":!0,onClick:i=>{i.stopPropagation(),Pr.value=o?null:n.id},style:{background:o?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"16px",padding:"6px 14px",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",color:"white",transition:"all 0.2s",boxShadow:"0 2px 6px rgba(255, 152, 0, 0.4)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",style:{transform:o?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),o&&e("div",{class:"invite-dropdown",style:{position:"absolute",bottom:"100%",left:"0",marginBottom:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:i=>{i.stopPropagation(),Yn(n.date,n.matchType,"whatsapp")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:i=>{i.stopPropagation(),Yn(n.date,n.matchType,"sms")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:i=>{i.stopPropagation(),Yn(n.date,n.matchType,"copy")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]})]}),e("button",{onClick:i=>{i.stopPropagation(),Rl(n.id)},style:{background:"none",border:"none",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-xl, 18px)",cursor:"pointer",padding:"0 var(--spacing-xs, 4px)",marginLeft:"var(--spacing-md, 8px)"},children:"×"})]})},n.id)})})]})}function ga(){const t=$.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Ic(t){const r=ie.value;if(!r)return null;const n=new Date;n.setHours(0,0,0,0);let o=null,a="";const i=[];if(Object.keys(r).forEach(l=>{const c=r[l];if(!c||!Array.isArray(c))return;const[s,d,h]=l.split("-").map(Number),u=new Date(s,d-1,h);u.setHours(0,0,0,0),u<=n&&c.some(p=>p&&p.name===t)&&i.push(l)}),i.sort((l,c)=>c.localeCompare(l)),i.length>0){a=i[0];const[l,c,s]=a.split("-").map(Number);o=new Date(l,c-1,s)}return o}function Ec(t){const r=new Date;r.setHours(0,0,0,0);const n=new Date(t);n.setHours(0,0,0,0);const o=r.getTime()-n.getTime(),a=Math.floor(o/(1e3*60*60*24));return a===0?"Today":a===1?"Yesterday":a<7?`${a} days ago`:a<30?`${Math.floor(a/7)} weeks ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Dc(){const[t,r]=Re(ga()),[n,o]=Re("");return U(()=>{const a=setInterval(()=>{r(ga())},1e3);return()=>clearInterval(a)},[]),e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[e("h2",{style:"margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);",children:"Team Directory"}),e("div",{style:{marginBottom:"var(--spacing-2xl, 16px)"},children:e("input",{type:"text",value:n,onInput:a=>o(a.target.value),placeholder:"🔍 Search members...",style:{width:"100%",padding:"var(--spacing-xl, 12px) var(--spacing-2xl, 16px)",border:"1px solid var(--color-border-light, #ddd)",borderRadius:"var(--radius-xl, 12px)",fontSize:"var(--font-size-md, 15px)",boxSizing:"border-box",background:"var(--color-bg-card, #fff)"}})}),e("button",{onClick:()=>{Is()},style:{width:"100%",padding:"var(--spacing-xl, 14px)",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"var(--radius-xl, 12px)",fontSize:"var(--font-size-md, 15px)",fontWeight:"500",cursor:"pointer",marginBottom:"var(--spacing-2xl, 16px)",display:"flex",alignItems:"center",justifyContent:"center",gap:"var(--spacing-md, 8px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"white",children:e("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})}),"Add New Member"]}),e("div",{style:{display:"flex",flexDirection:"column",gap:"var(--spacing-xl, 12px)"},children:(()=>{const i=(K.value||[]).filter(l=>l.toLowerCase().includes(n.toLowerCase())).sort((l,c)=>l.localeCompare(c));return i.length===0?e("div",{style:{background:"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",padding:"40px 20px",textAlign:"center",border:"1px solid var(--color-border, #e0e0e0)"},children:[e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"var(--color-border-light, #ddd)",style:{marginBottom:"var(--spacing-xl, 12px)"},children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})}),e("p",{style:{color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-md, 15px)",margin:0},children:n?"No members found":"No members in team yet"})]}):i.map(l=>{const c=ae.value?.[l],s=Ic(l),d=C.value&&l===C.value,h=d?G.value?.profile:null,u=h?.phone||c?.phone,v=h?.email||c?.email,f=c?.shareContactInDirectory===!0&&(u||v),k=c?.shareNotesInDirectory===!0&&c?.notes;return e("div",{style:{background:d?"var(--color-primary-light, #e8f5e9)":"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:d?"2px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #e0e0e0)"},children:e("div",{style:{display:"flex",alignItems:"start",justifyContent:"space-between",gap:"var(--spacing-xl, 12px)"},children:[e("div",{style:{flex:1,minWidth:0},children:[e("div",{style:{fontWeight:600,fontSize:"var(--font-size-lg, 16px)",color:"var(--color-text-primary, #333)",marginBottom:"var(--spacing-md, 8px)"},children:[l,d&&e("span",{style:{marginLeft:"var(--spacing-md, 8px)",fontSize:"var(--font-size-sm, 12px)",color:"var(--color-primary, #2C6E49)",fontWeight:"500"},children:"(You)"})]}),s&&e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)",marginBottom:"var(--spacing-md, 8px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"var(--color-text-muted, #888)",children:e("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"})}),"Last played: ",Ec(s)]}),!s&&e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #999)",marginBottom:"var(--spacing-md, 8px)"},children:"No recent games"}),c?.addedBy&&e("div",{style:{fontSize:"var(--font-size-sm, 12px)",color:"var(--color-text-muted, #999)",marginBottom:"var(--spacing-md, 8px)"},children:["Added by ",c.addedBy,c.addedDate&&` • ${new Date(c.addedDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`]}),f&&e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md, 8px)",marginTop:"var(--spacing-md, 8px)",flexWrap:"wrap"},children:[u&&e(N,{children:[e("a",{href:`https://wa.me/${u.replace(/\D/g,"")}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"#25D366",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Message on WhatsApp",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("a",{href:`sms:${u}`,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"var(--color-info, #2196F3)",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Send SMS",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"})}),"SMS"]})]}),v&&e("a",{href:`mailto:${v}`,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"var(--color-text-secondary, #666)",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Send email",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),"Email"]})]}),k&&e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)",marginTop:"var(--spacing-md, 8px)",padding:"var(--spacing-md, 8px)",background:"var(--color-bg-subtle, #f9f9f9)",borderRadius:"var(--radius-md, 6px)",fontStyle:"italic"},children:['"',c.notes,'"']})]}),(d||t)&&e("button",{onClick:()=>di(l),style:{background:d?"var(--color-primary, #2C6E49)":"var(--color-bg-muted, #f5f5f5)",color:d?"white":"var(--color-text-secondary, #666)",border:d?"none":"1px solid var(--color-border, #e0e0e0)",padding:"var(--spacing-md, 8px) var(--spacing-xl, 12px)",cursor:"pointer",borderRadius:"var(--radius-lg, 8px)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"var(--font-size-base, 14px)",fontWeight:"500",whiteSpace:"nowrap"},title:d?"Edit your profile":"Edit member",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:d?"white":"var(--color-text-secondary, #666)",style:{marginRight:"var(--spacing-xs, 4px)"},children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})}),"Edit"]})]})},l)})})()}),K.value.length>0&&!n&&e("div",{style:{marginTop:"var(--spacing-2xl, 16px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",border:"1px solid var(--color-border, #e0e0e0)",textAlign:"center"},children:e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)"},children:[e("span",{style:{fontWeight:"600",color:"var(--color-text-primary, #333)"},children:K.value.length})," ",K.value.length===1?"member":"members"," in team"]})})]})}const Ac=Ve(()=>{const t=ie.value,r=new Date;r.setHours(0,0,0,0);const n=new Date(r);n.setDate(n.getDate()-30);const o=new Date(r);o.setDate(o.getDate()-7);let a=0,i=0,l=0,c=0,s=0,d=0;const h={},u={0:0,1:0,2:0,3:0,4:0,5:0,6:0},v={};let p=0,f=0;const x=Object.keys(t).sort();for(const I of x){const S=t[I]||[];if(S.length===0)continue;const m=new Date(I+"T00:00:00");if(!(m<r))continue;p++,f+=S.length;const D=m>=n,A=m>=o,L=m.getDay(),M=new Date(m);M.setDate(M.getDate()-M.getDay());const T=M.toISOString().split("T")[0],{matches:pt}=Mn(S);for(const V of pt)if(!(V.type==="waiting"||V.type==="doubles-forming"||V.type==="singles-forming")){a++,u[L]++,v[T]=(v[T]||0)+1,D&&s++,A&&d++,V.type==="doubles"?i++:V.type==="singles"?l++:V.type==="singles-or-practice"&&c++;for(const Q of V.players){const re=z(Q.name);h[re]||(h[re]={gamesPlayed:0,checkIns:0,lastPlayed:I,doublesPlayed:0,singlesPlayed:0}),h[re].gamesPlayed++,h[re].lastPlayed=I,V.type==="doubles"?h[re].doublesPlayed++:h[re].singlesPlayed++}}for(const V of S){const Q=z(V.name);h[Q]||(h[Q]={gamesPlayed:0,checkIns:0,lastPlayed:"",doublesPlayed:0,singlesPlayed:0}),h[Q].checkIns++}}const k=Object.entries(h).map(([I,S])=>({name:K.value.find(_=>z(_)===I)||I,...S,participationRate:S.checkIns>0?Math.round(S.gamesPlayed/S.checkIns*100):0})).sort((I,S)=>S.gamesPlayed-I.gamesPlayed).slice(0,10),b=Object.entries(u).sort((I,S)=>S[1]-I[1])[0],w=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],E=Object.entries(v).sort((I,S)=>S[0].localeCompare(I[0])).slice(0,8).reverse();return{totalGames:a,doublesGames:i,singlesGames:l,rotationGames:c,last30DaysGames:s,last7DaysGames:d,activeDays:p,totalCheckIns:f,averagePlayersPerDay:p>0?(f/p).toFixed(1):"0",topPlayers:k,mostPopularDay:b?w[parseInt(b[0])]:"N/A",mostPopularDayCount:b?b[1]:0,dayOfWeekCounts:u,recentWeeks:E,totalMembers:K.value.length,activeMembersLast30Days:Object.values(h).filter(I=>I.lastPlayed?new Date(I.lastPlayed+"T00:00:00")>=n:!1).length}});function qn({label:t,value:r,subtext:n}){return e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",textAlign:"center",flex:"1",minWidth:"100px"},children:[e("div",{style:{fontSize:"24px",fontWeight:"700",color:"var(--color-primary, #2C6E49)"},children:r}),e("div",{style:{fontSize:"12px",color:"#666",marginTop:"4px"},children:t}),n&&e("div",{style:{fontSize:"11px",color:"#888",marginTop:"2px"},children:n})]})}function Kn({value:t,max:r,color:n="var(--color-primary, #2C6E49)"}){const o=r>0?t/r*100:0;return e("div",{style:{background:"#e0e0e0",borderRadius:"4px",height:"8px",flex:"1",overflow:"hidden"},children:e("div",{style:{background:n,height:"100%",width:`${o}%`,borderRadius:"4px",transition:"width 0.3s ease"}})})}function Mc(){const t=Ac.value,r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=Math.max(...Object.values(t.dayOfWeekCounts));return e("div",{style:"padding: 16px;",children:[e("h3",{style:"margin: 0 0 16px 0; font-size: 18px; color: #333;",children:"Group Insights"}),e("div",{style:{display:"flex",gap:"12px",marginBottom:"20px",flexWrap:"wrap"},children:[e(qn,{label:"Total Games",value:t.totalGames,subtext:"all time"}),e(qn,{label:"Last 30 Days",value:t.last30DaysGames}),e(qn,{label:"Last 7 Days",value:t.last7DaysGames})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Game Types"}),e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Doubles"}),e(Kn,{value:t.doublesGames,max:t.totalGames,color:"var(--color-primary, #2C6E49)"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.doublesGames})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Singles"}),e(Kn,{value:t.singlesGames,max:t.totalGames,color:"#2196F3"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.singlesGames})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Rotation"}),e(Kn,{value:t.rotationGames,max:t.totalGames,color:"#FF9800"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.rotationGames})]})]})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Activity by Day"}),e("div",{style:{display:"flex",gap:"4px",alignItems:"flex-end",height:"80px"},children:r.map((o,a)=>{const i=t.dayOfWeekCounts[a],l=n>0?i/n*60:0;return e("div",{style:{flex:"1",textAlign:"center"},children:[e("div",{style:{background:a===Number(Object.entries(t.dayOfWeekCounts).sort((c,s)=>s[1]-c[1])[0]?.[0])?"var(--color-primary, #2C6E49)":"#c8e6c9",height:`${Math.max(l,4)}px`,borderRadius:"4px 4px 0 0",marginBottom:"4px",transition:"height 0.3s ease"}}),e("span",{style:{fontSize:"10px",color:"#666"},children:o})]},o)})}),e("p",{style:{fontSize:"13px",color:"#666",margin:"12px 0 0 0",textAlign:"center"},children:["Most popular: ",e("strong",{children:t.mostPopularDay})," (",t.mostPopularDayCount," games)"]})]}),t.recentWeeks.length>0&&e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Weekly Trend"}),e("div",{style:{display:"flex",gap:"4px",alignItems:"flex-end",height:"60px"},children:t.recentWeeks.map(([o,a])=>{const i=Math.max(...t.recentWeeks.map(d=>d[1])),l=i>0?a/i*50:0,c=new Date(o+"T00:00:00"),s=`${c.getMonth()+1}/${c.getDate()}`;return e("div",{style:{flex:"1",textAlign:"center"},children:[e("div",{style:{background:"var(--color-primary, #2C6E49)",height:`${Math.max(l,4)}px`,borderRadius:"4px 4px 0 0",marginBottom:"4px"}}),e("span",{style:{fontSize:"9px",color:"#666"},children:s})]},o)})})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Most Active Players"}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#888",marginBottom:"8px",padding:"0 4px"},children:[e("span",{children:"Player"}),e("span",{children:"Games"})]}),t.topPlayers.length===0?e("p",{style:{fontSize:"14px",color:"#666",textAlign:"center",margin:"16px 0"},children:"No game data yet"}):e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:t.topPlayers.map((o,a)=>e("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px",background:a<3?"#E8F5E9":"white",borderRadius:"8px"},children:[e("span",{style:{width:"20px",height:"20px",borderRadius:"50%",background:a===0?"#FFD700":a===1?"#C0C0C0":a===2?"#CD7F32":"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"600",color:a<3?"#333":"#666"},children:a+1}),e("span",{style:{flex:"1",fontSize:"14px"},children:o.name}),e("span",{style:{fontSize:"14px",fontWeight:"600",color:"var(--color-primary, #2C6E49)"},children:o.gamesPlayed})]},o.name))})]}),e("div",{style:{background:"#E3F2FD",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Group Health"}),e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Total members"}),e("span",{style:{fontWeight:"600"},children:t.totalMembers})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Active last 30 days"}),e("span",{style:{fontWeight:"600"},children:t.activeMembersLast30Days})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Avg players/day"}),e("span",{style:{fontWeight:"600"},children:t.averagePlayersPerDay})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Days with activity"}),e("span",{style:{fontWeight:"600"},children:t.activeDays})]})]})]}),e("p",{style:"font-size: 13px; color: #888; text-align: center; margin-top: 16px;",children:"Stats are based on completed games from past dates"})]})}function Rc(){const t=P.value.groupDescription,r=P.value.groupRules,n=t||r,o=[{title:"Getting Started",icon:"🎾",content:["When you first open the app, you'll be asked to select your name from the member list.","Use the date selector to pick the day you want to play.","Check in by selecting your game preference and optionally setting your available times."]},{title:"Check-in Options",icon:"✅",content:["Doubles - You want to play doubles games (4 players).","Singles - You want to play singles games (2 players).","Both - You're flexible and happy to play either format.","Rotation - Enable this option to join 3-player rotation games where players take turns.","Time Range - Set your earliest and latest available times to help coordinate."]},{title:"Game Types",icon:"👥",content:["Doubles (green) - A confirmed 4-player doubles game.","Singles (green) - A confirmed 2-player singles game.","Rotation (green) - A confirmed 3-player game with rotating play.","Forming (yellow) - A game that needs more players to be complete."]},{title:"My Games",icon:"📅",content:["View all your upcoming games across all dates at a glance.","Tap any game card to jump directly to that day's check-in page.","Yellow background indicates the game is still forming and needs more players.","Green background means the game is confirmed and ready to play."]},{title:"Alerts",icon:"🔔",content:["Get notified when games are formed or when players join/leave.","Unread alerts show a red badge with the count on the tab.","Tap a notification to mark it as read.","Access notification settings to configure your preferences."]},{title:"Profile",icon:"👤",content:["Access your profile by tapping your name badge in the top-right corner.","Edit your display name, phone number, and email address.","Change your user session to switch to a different account.","Admin login is available for group administrators."]},{title:"Tips",icon:"💡",content:["Check in early to get matched with your preferred players.",`Select "Both" if you're flexible - it increases your chances of getting a game.`,"Set your time preferences to help organizers coordinate scheduling.","Enable rotation if you're open to 3-player games."]},{title:"Admin Features",icon:"⚙️",content:["Access admin mode via Admin Login in your Profile page.","Manage Members - Add, edit, or remove group members.","Group Settings - Configure group name, PINs, weather location, story, and rules.","Activity History - View all check-ins and changes with option to delete test data.","Group Insights - View game stats, player activity trends, and analytics."]}],a=r?r.split(`
`).filter(i=>i.trim()):[];return e("div",{style:"padding: 16px 0;",children:[n&&e("div",{style:{marginBottom:"24px"},children:[e("h2",{style:"margin: 0 0 16px 0; font-size: 20px;",children:["About ",ne.value]}),t&&e("div",{style:{background:"var(--color-primary-light, #E8F5E9)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid var(--color-primary-lighter, #C8E6C9)",marginBottom:"var(--spacing-xl, 12px)"},children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px); color: var(--color-primary, #2E7D32); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"})}),"Our Story"]}),e("p",{style:"margin: 0; color: var(--color-text-primary, #333); font-size: var(--font-size-base, 14px); line-height: 1.6; white-space: pre-wrap;",children:t})]}),a.length>0&&e("div",{style:{background:"var(--color-warning-light, #FFF8E1)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid #FFECB3"},children:[e("h3",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-md, 15px); color: var(--color-warning, #F57C00); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#FF9800",children:e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"})}),"Rules & Tips"]}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-text-primary, #333); font-size: var(--font-size-base, 14px); line-height: 1.6;",children:a.map((i,l)=>e("li",{style:"margin-bottom: var(--spacing-sm, 6px);",children:i},l))})]})]}),e("h2",{style:"margin: 0 0 16px 0; font-size: 20px;",children:"User Guide"}),e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:o.map((i,l)=>e("div",{style:{background:"var(--color-bg-subtle, #f9f9f9)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid var(--color-border, #e0e0e0)"},children:[e("h3",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-lg, 16px); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("span",{children:i.icon}),e("span",{children:i.title})]}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-text-secondary, #555); font-size: var(--font-size-base, 14px); line-height: 1.6;",children:i.content.map((c,s)=>e("li",{style:"margin-bottom: var(--spacing-xs, 4px);",children:c},s))})]},l))}),e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888); text-align: center; margin-top: var(--spacing-3xl, 20px);",children:"Need more help? Contact your group administrator."})]})}function Vt({title:t,isOpen:r,onBack:n,children:o}){const a=Do(null);return U(()=>{r&&a.current&&(a.current.scrollTop=0)},[r]),e("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1e3,pointerEvents:r?"auto":"none"},children:[e("div",{onClick:n,style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0, 0, 0, 0.3)",opacity:r?1:0,transition:"opacity 0.25s ease-out"}}),e("div",{ref:a,style:{position:"absolute",top:0,right:0,bottom:0,width:"100%",maxWidth:"500px",background:"var(--color-bg-main, #f5f5f5)",transform:r?"translateX(0)":"translateX(100%)",transition:"transform 0.25s ease-out",display:"flex",flexDirection:"column",overflow:"hidden"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md, 8px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",borderBottom:"1px solid var(--color-border, #e0e0e0)",flexShrink:0},children:[e("button",{onClick:n,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",background:"var(--color-bg-subtle, #f5f5f5)",border:"none",borderRadius:"var(--radius-full, 50%)",cursor:"pointer",fontSize:"20px",fontWeight:"bold",color:"var(--color-text-primary, #333)"},"aria-label":"Go back",children:"←"}),e("h2",{style:{margin:0,fontSize:"var(--font-size-xl, 18px)",fontWeight:600,color:"var(--color-text-primary, #333)"},children:t})]}),e("div",{style:{flex:1,overflowY:"auto",padding:"var(--spacing-2xl, 16px)"},children:o})]})]})}const Lr=g(""),Nr=g(""),Br=g(""),at=g(""),Rt=g(""),Pt=g(""),Fr=g(""),jr=g(""),ko=g(!1);function Pc(){Lr.value=ne.value||"",Nr.value=P.value.adminPin||"",Br.value=P.value.groupPin||"",at.value=P.value.location?.name||"",Rt.value=P.value.location?.lat?.toString()||"",Pt.value=P.value.location?.lon?.toString()||"",Fr.value=P.value.groupDescription||"",jr.value=P.value.groupRules||"",ko.value=!0}async function Tc(){const t=$.value;if(t)try{const n=R().ref(`groups/${t}/settings`),o={groupName:Lr.value,adminPin:Nr.value,groupPin:Br.value,groupDescription:Fr.value||null,groupRules:jr.value||null};at.value&&Rt.value&&Pt.value&&(o.location={name:at.value,lat:parseFloat(Rt.value),lon:parseFloat(Pt.value)}),await n.update(o),ne.value=Lr.value,P.value={...P.value,adminPin:Nr.value,groupPin:Br.value,location:at.value?{name:at.value,lat:parseFloat(Rt.value),lon:parseFloat(Pt.value)}:void 0,groupDescription:Fr.value||void 0,groupRules:jr.value||void 0},y("Settings saved","success")}catch(r){console.error("Error saving settings:",r),y("Failed to save settings","error")}}function Lc(){return U(()=>(Pc(),()=>{ko.value=!1}),[]),ko.value?e("div",{children:[e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group Name"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Display name for this tennis group"}),e("input",{type:"text",placeholder:"e.g., Tue/Thu Midday Doubles",value:Lr.value,onInput:t=>{Lr.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group Story"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Tell your group's story - when/where you play, how it started, etc."}),e("textarea",{placeholder:"e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts...",value:Fr.value,onInput:t=>{Fr.value=t.target.value},rows:3,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Rules & Tips"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"House rules, etiquette, and tips for new members (one per line)"}),e("textarea",{placeholder:`e.g.,
Check in by 10am on game days
Bring water and sunscreen
New balls provided by rotating member...`,value:jr.value,onInput:t=>{jr.value=t.target.value},rows:4,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Admin PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Required to access admin settings"}),e("input",{type:"text",value:Nr.value,onInput:t=>{Nr.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Share this PIN with all group members to access the app"}),e("input",{type:"text",value:Br.value,onInput:t=>{Br.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Weather Location"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Set the location for weather forecasts"}),e("input",{type:"text",placeholder:"Location name (e.g., Los Gatos, CA)",value:at.value,onInput:t=>{at.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-md, 8px);"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-md, 8px);",children:[e("input",{type:"number",step:"0.0001",placeholder:"Latitude",value:Rt.value,onInput:t=>{Rt.value=t.target.value},style:"flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box;"}),e("input",{type:"number",step:"0.0001",placeholder:"Longitude",value:Pt.value,onInput:t=>{Pt.value=t.target.value},style:"flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box;"})]}),e("p",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);",children:["Tip: Use"," ",e("a",{href:"https://www.latlong.net/",target:"_blank",style:"color: var(--color-primary, #2C6E49);",children:"latlong.net"})," ","to find coordinates"]})]}),e("button",{onClick:Tc,style:{width:"100%",padding:"var(--spacing-xl, 12px)",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"var(--radius-lg, 8px)",fontSize:"var(--font-size-base, 14px)",fontWeight:"500",cursor:"pointer",marginTop:"var(--spacing-xl, 12px)"},children:"Save Settings"})]}):e("div",{style:"padding: 20px; text-align: center; color: var(--color-text-muted, #999);",children:"Loading..."})}const mi={login:{label:"Logins",actions:["user_login"]},checkin:{label:"Check-ins",actions:["check-in","checkin"]},removal:{label:"Removals",actions:["removal"]},shared:{label:"Shared",actions:["whatsapp_share"]},notes:{label:"Notes",actions:["notes_saved","note_added","note_updated","note_removed"]},members:{label:"Members",actions:["member_added","member_removed","member_renamed"]},arrangements:{label:"Arrangements",actions:["arrangement_saved","arrangement_cleared"]}},ft=g(!1),Ur=g([]),Co=g(!1),ke=g(new Set);async function Nc(){const t=$.value;if(t){Co.value=!0;try{const r=R(),n=[],a=(await r.ref(`groups/${t}/activity`).once("value")).val();if(a){for(const[i,l]of Object.entries(a))if(l)for(const[c,s]of Object.entries(l))n.push({...s,date:i,firebaseKey:c})}n.sort((i,l)=>l.timestamp-i.timestamp),Ur.value=n}catch(r){console.error("Error loading activity:",r)}finally{Co.value=!1}}}async function Bc(t){const r=$.value;if(!(!r||!t.firebaseKey||!t.date)&&confirm("Remove this activity entry?"))try{await R().ref(`groups/${r}/activity/${t.date}/${t.firebaseKey}`).remove(),Ur.value=Ur.value.filter(o=>!(o.date===t.date&&o.firebaseKey===t.firebaseKey))}catch(n){console.error("Error deleting activity:",n),alert("Failed to delete activity")}}function Fc(t){return To(t)}function jc(t){switch(t){case"check-in":case"checkin":return"✅";case"removal":return"❌";case"member_added":return"👤";case"member_removed":return"🚫";case"member_renamed":return"✏️";case"whatsapp_share":return"📤";case"notes_saved":case"note_added":return"📝";case"note_updated":return"✏️";case"note_removed":return"🗑️";case"user_login":return"🔓";case"arrangement_saved":return"🔀";case"arrangement_cleared":return"↩️";default:return"📋"}}function Uc(t){const{action:r,player:n,by:o,playStyle:a,timeRange:i,matchKey:l,type:c}=t;switch(r){case"check-in":case"checkin":{let s=`${n} checked in`;return o&&o!==n&&(s+=` (by ${o})`),a&&(s+=` - ${An(a)}`,(i?.start||i?.end)&&(s+=` (${i.start||"anytime"}–${i.end||"anytime"})`)),s}case"removal":return o&&o!==n?`${o} removed ${n}`:`${n} removed themselves`;case"member_added":return`${o} added ${n} as member`;case"member_removed":return`${o} removed ${n} from members`;case"member_renamed":return`${o} renamed ${t.oldName} to ${n}`;case"whatsapp_share":{let d=`${o} shared ${c==="matches"?"matches":c==="checkin"?"check-in":"removal"} to WhatsApp`;return n&&n!==o&&(d+=` (for ${n})`),d}case"notes_saved":case"note_added":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} added note to ${s}${d}`}case"note_updated":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} updated note on ${s}${d}`}case"note_removed":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match";return`${o} removed note from ${s}`}case"user_login":return`${n} logged in`;case"arrangement_saved":{const{matchCount:s}=t;let d=`${o} arranged matches`;return s&&(d+=` (${s} match${s>1?"es":""})`),d}case"arrangement_cleared":return`${o} cleared arrangement (back to auto)`;default:return`${n} - ${r}`}}function Gc(t){const r=new Set(ke.value);r.has(t)?r.delete(t):r.add(t),ke.value=r}function Oc(){if(ke.value.size===0)return Ur.value;const t=new Set;return ke.value.forEach(r=>{mi[r].actions.forEach(n=>t.add(n))}),Ur.value.filter(r=>t.has(r.action))}function Hc(){U(()=>(Nc(),()=>{ft.value=!1,ke.value=new Set}),[]);const t=Oc(),r={};return ft.value?t.forEach(n=>{r[n.date]||(r[n.date]=[]),r[n.date].push(n)}):t.forEach(n=>{const o=new Date(n.timestamp).toISOString().split("T")[0];r[o]||(r[o]=[]),r[o].push(n)}),e("div",{children:[e("div",{style:"display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;",children:[Object.entries(mi).map(([n,o])=>{const a=ke.value.has(n);return e("button",{onClick:()=>Gc(n),style:{padding:"4px 10px",fontSize:"12px",border:a?"1px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #ddd)",borderRadius:"var(--radius-2xl, 16px)",background:a?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, #fff)",color:a?"var(--color-primary, #2E7D32)":"var(--color-text-secondary, #666)",cursor:"pointer",fontWeight:a?"500":"400"},children:o.label},n)}),ke.value.size>0&&e("button",{onClick:()=>{ke.value=new Set},style:{padding:"4px 10px",fontSize:"var(--font-size-sm, 12px)",border:"1px solid var(--color-error, #f44336)",borderRadius:"var(--radius-2xl, 16px)",background:"var(--color-bg-card, #fff)",color:"var(--color-error, #f44336)",cursor:"pointer"},children:"Clear"})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin: 0;",children:[ft.value?"Grouped by play date":"Grouped by when changes were made",ke.value.size>0&&` (${t.length} filtered)`]}),e("label",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); cursor: pointer; display: flex; align-items: center; gap: 4px;",children:[e("input",{type:"checkbox",checked:ft.value,onChange:n=>{ft.value=n.target.checked}}),"Group by Play Date"]})]}),e("div",{children:Co.value?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:"Loading..."}):t.length===0?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:ke.value.size>0?"No matching activities":"No activity recorded yet"}):Object.entries(r).sort(([n],[o])=>o.localeCompare(n)).map(([n,o])=>e("div",{children:[e("div",{style:"font-weight: bold; color: var(--color-text-secondary, #666); margin-top: 12px; padding-bottom: 4px; border-bottom: 1px solid var(--color-border, #ddd);",children:ee(n)}),o.map((a,i)=>e("div",{style:"padding: 10px; background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-md, 6px); font-size: var(--font-size-base, 14px); margin-top: 8px; position: relative;",children:e("div",{style:"display: flex; align-items: flex-start; gap: 6px;",children:[e("span",{children:jc(a.action)}),e("div",{style:"flex: 1;",children:[e("div",{style:"white-space: pre-wrap;",children:Uc(a)}),a.arrangementDetails&&e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-top: 4px; background: var(--color-bg-card, #fff); padding: 6px 8px; border-radius: var(--radius-sm, 4px); border: 1px solid var(--color-border, #e0e0e0);",children:a.arrangementDetails}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #999); margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap;",children:[e("span",{children:Fc(a.timestamp)}),ft.value?e("span",{style:"color: var(--color-text-secondary, #666);",children:["changed on"," ",ee(new Date(a.timestamp).toISOString().split("T")[0])]}):e("span",{style:"color: var(--color-primary, #2C6E49);",children:["for ",ee(a.date)]})]})]}),e("button",{onClick:()=>Bc(a),title:"Remove this activity",style:{background:"none",border:"none",padding:"var(--spacing-xs, 4px)",cursor:"pointer",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-lg, 16px)",lineHeight:"1",borderRadius:"var(--radius-sm, 4px)"},className:"hover-danger",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})},i))]},n))})]})}const xi=g({}),_o=g(!1);function Wc(t){const n=Date.now()-t,o=Math.floor(n/(1e3*60)),a=Math.floor(n/(1e3*60*60)),i=Math.floor(n/(1e3*60*60*24));return o<1?"Just now":o<60?`${o}m ago`:a<24?`${a}h ago`:i===1?"Yesterday":i<7?`${i} days ago`:new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric"})}async function Vc(t){if(t.length===0)return;_o.value=!0;const r=R(),n={};try{for(const o of t){const a=await r.ref(`groups/${o}/settings/groupName`).once("value");n[o]=a.val()||o}xi.value=n}catch(o){console.warn("Failed to load group names:",o)}finally{_o.value=!1}}function Yc(t){window.location.href=`/?group=${t}`}function qc(){const t=Vi();return U(()=>{const r=t.map(n=>n.groupId);Vc(r)},[t.length]),no.value?e("div",{style:"padding: 40px 20px; text-align: center; color: var(--color-text-muted, #999);",children:"Loading..."}):G.value?t.length===0?e(N,{children:[e("div",{style:"padding: 40px 20px; text-align: center;",children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})})}),e("p",{style:"color: var(--color-text-muted, #888); margin: 0 0 8px 0; font-size: 16px;",children:"No groups yet"}),e("p",{style:"color: var(--color-text-disabled, #aaa); margin: 0 0 20px 0; font-size: 14px;",children:"Join a group or start your own"}),e("button",{onClick:ao,style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 24px",background:"var(--color-primary, #2C6E49)",border:"none",borderRadius:"12px",cursor:"pointer",color:"white",fontSize:"16px",fontWeight:600},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})}),"Start a Group"]})]}),e(lo,{})]}):e("div",{style:"padding: 8px 0;",children:[e("button",{onClick:ao,style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",width:"100%",padding:"14px",marginBottom:"16px",background:"var(--color-primary-light, #E8F5E9)",border:"2px dashed var(--color-primary, #2C6E49)",borderRadius:"12px",cursor:"pointer",color:"var(--color-primary, #2C6E49)",fontSize:"15px",fontWeight:500},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})}),"Create New Group"]}),e("p",{style:"color: var(--color-text-muted, #888); font-size: 13px; margin: 0 0 16px 0; padding: 0 4px;",children:[t.length," group",t.length!==1?"s":""," on this device"]}),e("div",{style:"display: flex; flex-direction: column; gap: 8px;",children:t.map(r=>e("button",{onClick:()=>Yc(r.groupId),style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"12px",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"44px",height:"44px",borderRadius:"50%",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e("svg",{viewBox:"0 0 24 24",width:"24",height:"24",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})})}),e("div",{style:"flex: 1; min-width: 0;",children:[e("div",{style:{fontSize:"16px",fontWeight:500,color:"var(--color-text-primary, #333)",marginBottom:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:_o.value?r.groupId:xi.value[r.groupId]||r.groupId}),e("div",{style:"font-size: 13px; color: var(--color-text-muted, #888);",children:[r.memberName," • ",Wc(r.lastActive)]})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]},r.groupId))}),e(lo,{})]}):e("div",{style:"padding: 40px 20px; text-align: center;",children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})})}),e("p",{style:"color: var(--color-text-muted, #888); margin: 0;",children:"Your groups will appear here once you check in"})]})}function va(){const t=$.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Kc(){const[t,r]=Re(va()),[n,o]=Re(null);U(()=>{const h=setInterval(()=>{r(va())},1e3);return()=>clearInterval(h)},[]);const a=C.value&&ae.value?ae.value[C.value]:null,i=G.value?.profile,l=i?.phone||a?.phone,c=i?.email||a?.email,s=()=>{if(confirm("Change user? This will clear your current session.")){const h=$.value;h&&localStorage.removeItem(`sessionUser_${h}`),C.value="",y("Please select your name","info"),Er.value=!0}},d=()=>{const h=$.value;h&&(sessionStorage.removeItem(`adminAuth_${h}`),r(!1),y("Logged out of admin mode","info"))};return e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[e("h2",{style:"margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);",children:"Profile"}),e("button",{onClick:()=>C.value&&di(C.value),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left",marginBottom:"var(--spacing-2xl, 16px)"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:C.value||"Not set"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:l||c?[l,c].filter(Boolean).join(" • "):"Tap to add contact info"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("div",{style:"display: flex; flex-direction: column; gap: var(--spacing-md, 8px);",children:[e("button",{onClick:()=>o("mygroups"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:["My Groups",ra.value>0&&e("span",{style:{marginLeft:"8px",padding:"2px 8px",background:"var(--color-primary, #2C6E49)",color:"#fff",borderRadius:"12px",fontSize:"12px",fontWeight:600},children:ra.value})]}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"View all your groups on this device"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),t&&e(N,{children:[e("button",{onClick:()=>o("settings"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Group Settings"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Name, PIN, location, and other settings"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("activity"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Activity History"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"View recent check-ins and changes"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("insights"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Group Insights"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Game stats, player activity, and trends"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:d,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-warning-light, #FFF3E0)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-warning, #FF9800)",children:e("path",{d:"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-warning, #FF9800);",children:"Exit Admin Mode"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Return to regular user view"})]})]})]}),!t&&e("button",{onClick:()=>{vr.value=!0},style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-warning-light, #FFF3E0)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-warning, #FF9800)",children:e("path",{d:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Admin Login"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Access group settings and member management"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("help"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Help & Support"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"How to use the app and get support"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:s,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left",marginTop:t?"var(--spacing-md, 8px)":"0"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Change User"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Switch to a different account"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-disabled, #aaa); text-align: center; margin-top: var(--spacing-4xl, 32px);",children:["Tennis Coordinator"," ",e("a",{href:"/release-notes.html",target:"_blank",style:"color: var(--color-primary, #2C6E49); text-decoration: none;",children:"v1.0.0"})]}),e(Vt,{title:"Group Settings",isOpen:n==="settings",onBack:()=>o(null),children:e(Lc,{})}),e(Vt,{title:"Activity History",isOpen:n==="activity",onBack:()=>o(null),children:e(Hc,{})}),e(Vt,{title:"Group Insights",isOpen:n==="insights",onBack:()=>o(null),children:e(Mc,{})}),e(Vt,{title:"Help & Support",isOpen:n==="help",onBack:()=>o(null),children:e(Rc,{})}),e(Vt,{title:"My Groups",isOpen:n==="mygroups",onBack:()=>o(null),children:e(qc,{})})]})}const zn=g(!1),Sn=g(""),q=g("both");g(!1);g(!1);const wt=g(""),Xt=g(""),pn=g(""),un=g(""),hn=g(""),Jc=g(""),Ee=g(!0),X=g(""),Z=g("");g(!0);const mt=g(!1),_e=g(!1),ze=g(null);function Qc(){vl(),fl(),ml(),Ml(),U(()=>{const n=$.value;if(n){if(sessionStorage.getItem("siteAdminAuth")==="true"){mt.value=!0;return}const a=`pinAuth_${n}`,i=sessionStorage.getItem(a)==="true";mt.value=i}},[$.value]),U(()=>{j.value=dl()},[]),U(()=>{const n=$.value;if(n){const o=localStorage.getItem(`sessionUser_${n}`);o?C.value=o:mt.value&&(Er.value=!0)}},[$.value,mt.value]);const t=()=>{const n=$.value;n&&sessionStorage.setItem(`pinAuth_${n}`,"true"),mt.value=!0,window.scrollTo(0,0),C.value||(Er.value=!0)},r=!mt.value&&!!P.value.groupPin;return e(N,{children:[e(Ul,{isOpen:r,groupName:ne.value,correctPin:P.value.groupPin,onSuccess:t}),e(gs,{}),e(Vl,{}),e(ts,{}),e(us,{}),e(is,{}),e("div",{class:"container",id:"appContainer",style:r?"filter: blur(5px); pointer-events: none;":"",children:[e(jl,{}),e("div",{style:"padding-bottom: 80px;",children:[he.value==="checkin"&&e(ac,{}),he.value==="matches"&&e(xc,{}),he.value==="notifications"&&e($c,{}),he.value==="directory"&&e(Dc,{}),he.value==="profile"&&e(Kc,{})]})]}),e(ks,{}),e(Nl,{}),e(_s,{}),e(Ss,{}),e($s,{}),e(Ms,{})]})}const Jr=g(!1),O=g({}),fa=g(!0),Jn=g(null),qe=g(null),Qn=g(null),Qr=g(""),xt=g(!1),Be=g(null),Xr=g(""),Fe=g(""),je=g("active"),Yt=g(null),de=g(null);function Xc(){U(()=>{t()},[]);async function t(){try{const D=(await R().ref("siteSettings").once("value")).val();Jn.value=D?.siteAdminPin||null,sessionStorage.getItem("siteAdminAuth")==="true"&&(Jr.value=!0,await r())}catch(m){console.error("Error initializing admin page:",m),y("Failed to initialize","error")}finally{fa.value=!1}}async function r(){try{const _=await R().ref("groups").once("value");O.value=_.val()||{}}catch(m){console.error("Error loading groups:",m),y("Failed to load groups","error")}}function n(m){m.preventDefault(),qe.value=null;const D=m.target.querySelector("input"),A=D.value.trim();if(!A){qe.value="Please enter a PIN";return}if(!Jn.value){qe.value="Site admin PIN not configured. Please set siteAdminPin in siteSettings in Firebase.";return}A===Jn.value?(sessionStorage.setItem("siteAdminAuth","true"),Jr.value=!0,qe.value=null,r()):(qe.value="Incorrect PIN. Please try again.",D.value="",D.focus())}function o(){sessionStorage.removeItem("siteAdminAuth"),Jr.value=!1,O.value={}}function a(){window.location.hash="",window.location.reload()}async function i(m){const _=Qr.value.trim();if(!_){y("Please enter a member name","error");return}xt.value=!0;try{const D=R(),A=O.value[m],L=A?.settings?.members||[];if(L.some(T=>T.toLowerCase()===_.toLowerCase())){y("Member already exists","error"),xt.value=!1;return}const M=[...L,_];await D.ref(`groups/${m}/settings/members`).set(M),O.value={...O.value,[m]:{...A,settings:{...A?.settings,members:M}}},Qr.value="",y(`Added ${_} to the group`,"success")}catch(D){console.error("Error adding member:",D),y("Failed to add member","error")}finally{xt.value=!1}}async function l(m,_){if(confirm(`Remove ${_} from this group?`))try{const D=R(),A=O.value[m],M=(A?.settings?.members||[]).filter(T=>T!==_);await D.ref(`groups/${m}/settings/members`).set(M),O.value={...O.value,[m]:{...A,settings:{...A?.settings,members:M}}},y(`Removed ${_}`,"success")}catch(D){console.error("Error removing member:",D),y("Failed to remove member","error")}}async function c(m,_){if(confirm(`ARCHIVE: "${_}"

This will:
• Mark the group as archived (hidden from active lists)
• Disable the share link
• Preserve all data for historical purposes
• Keep user links for future history features

The group can be unarchived later if needed.`))try{const A=R(),M=O.value[m]?.metadata?.shortCode;await A.ref(`groups/${m}/metadata/archived`).set(!0),await A.ref(`groups/${m}/metadata/archivedAt`).set(Date.now()),M&&await A.ref(`shortCodeIndex/${M}`).remove();const T={...O.value};T[m]&&(T[m]={...T[m],metadata:{...T[m].metadata,archived:!0,archivedAt:Date.now()}}),O.value=T,y(`Archived "${_}"`,"success")}catch(A){console.error("Error archiving group:",A),y("Failed to archive group","error")}}async function s(m,_){try{const D=R(),L=O.value[m]?.metadata?.shortCode;await D.ref(`groups/${m}/metadata/archived`).remove(),await D.ref(`groups/${m}/metadata/archivedAt`).remove(),L&&await D.ref(`shortCodeIndex/${L}`).set(m);const M={...O.value};if(M[m]?.metadata){const{archived:T,archivedAt:pt,...V}=M[m].metadata;M[m]={...M[m],metadata:V}}O.value=M,y(`Unarchived "${_}"`,"success")}catch(D){console.error("Error unarchiving group:",D),y("Failed to unarchive group","error")}}async function d(m,_){if(confirm(`SYSTEM DELETE: "${_}"

This will permanently remove ALL traces:
• Group data (members, check-ins, notes, settings)
• Short code index entry
• All platform user links

Use this only for test data cleanup.

This action cannot be undone.`))try{const A=R(),M=O.value[m]?.metadata?.shortCode;await A.ref(`groups/${m}`).remove(),M&&await A.ref(`shortCodeIndex/${M}`).remove();const pt=(await A.ref("platform/users").once("value")).val()||{},V=[];let Q=0;for(const Ot of Object.keys(pt)){const Te=pt[Ot]?.groupLinks;Te&&Te[m]&&(Object.keys(Te).length===1?(V.push(A.ref(`platform/users/${Ot}`).remove()),Q++):V.push(A.ref(`platform/users/${Ot}/groupLinks/${m}`).remove()))}V.length>0&&await Promise.all(V);const re={...O.value};delete re[m],O.value=re,Qn.value===m&&(Qn.value=null);const Gt=V.length;let ut=`System deleted "${_}"`;Q>0?ut+=` (${Q} orphaned user${Q>1?"s":""} removed)`:Gt>0&&(ut+=` (${Gt} user link${Gt>1?"s":""} removed)`),y(ut,"success")}catch(A){console.error("Error in system delete:",A),y("Failed to delete group","error")}}function h(m,_){Be.value={groupId:m,originalName:_},Xr.value=_}async function u(){const m=Be.value;if(!m)return;const _=Xr.value.trim();if(!_){y("Name cannot be empty","error");return}if(_===m.originalName){Be.value=null;return}const D=O.value[m.groupId],A=D?.settings?.members||[];if(A.some(L=>L.toLowerCase()===_.toLowerCase()&&L!==m.originalName)){y("A member with this name already exists","error");return}try{const L=R(),M=A.map(Q=>Q===m.originalName?_:Q);await L.ref(`groups/${m.groupId}/settings/members`).set(M);const T=D?.settings?.memberDetails||{};if(T[m.originalName]){const Q=T[m.originalName];await L.ref(`groups/${m.groupId}/settings/memberDetails/${m.originalName}`).remove(),await L.ref(`groups/${m.groupId}/settings/memberDetails/${_}`).set(Q);const re={...T};re[_]=Q,delete re[m.originalName],O.value={...O.value,[m.groupId]:{...D,settings:{...D?.settings,members:M,memberDetails:re}}}}else O.value={...O.value,[m.groupId]:{...D,settings:{...D?.settings,members:M}}};const V=(await L.ref(`groups/${m.groupId}/checkins`).once("value")).val()||{};for(const[Q,re]of Object.entries(V))if(re&&typeof re=="object"){const Gt=Object.values(re);let ut=!1;const Ot=Gt.map(Te=>Te&&Te.name===m.originalName?(ut=!0,{...Te,name:_}):Te);ut&&await L.ref(`groups/${m.groupId}/checkins/${Q}`).set(Ot)}Be.value=null,y(`Renamed ${m.originalName} to ${_}`,"success")}catch(L){console.error("Error renaming member:",L),y("Failed to rename member","error")}}if(fa.value)return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-container",children:e("div",{class:"site-admin-loading",children:[e("div",{class:"loading-spinner-icon"}),e("p",{children:"Loading..."})]})})});if(!Jr.value)return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-container",children:e("div",{class:"site-admin-login-card",children:[e("div",{class:"site-admin-header",children:[e("span",{class:"site-admin-icon",children:"🔐"}),e("h1",{children:"Site Administration"}),e("p",{class:"site-admin-subtitle",children:"Tennis Coordinator Platform"})]}),e("form",{onSubmit:n,class:"site-admin-form",children:[e("div",{class:"form-group",children:[e("label",{for:"admin-pin",children:"Administrator PIN"}),e("input",{id:"admin-pin",type:"password",placeholder:"Enter your PIN",class:"site-admin-input",autoFocus:!0})]}),qe.value&&e("div",{class:"site-admin-error",children:[e("span",{class:"error-icon",children:"⚠️"}),qe.value]}),e("button",{type:"submit",class:"site-admin-submit",children:"Sign In"})]}),e("div",{class:"site-admin-footer",children:e("button",{onClick:a,class:"back-to-home",children:"← Back to Home"})})]})})});const v=Object.entries(O.value);v.reduce((m,[,_])=>m+(_.settings?.members?.length||0),0);const p=v.filter(([,m])=>{const _=m.metadata?.archived===!0;if(!(je.value==="archived"?_:!_))return!1;if(Fe.value.trim()){const A=Fe.value.toLowerCase(),L=(m.settings?.groupName||"").toLowerCase(),M=(m.metadata?.creator?.name||"").toLowerCase(),T=(m.settings?.location?.name||"").toLowerCase();return L.includes(A)||M.includes(A)||T.includes(A)}return!0}),f=v.filter(([,m])=>!m.metadata?.archived).length,x=v.filter(([,m])=>m.metadata?.archived).length;function k(m){Yt.value=Yt.value===m?null:m}function b(){Yt.value=null}function w(m){const _=`${window.location.origin}/${m}`;navigator.clipboard.writeText(_),y("Share link copied!","success"),b()}function E(m){de.value=m,b()}function I(){de.value=null,Qn.value=null}const S=de.value?O.value[de.value]:null;return e("div",{class:"site-admin-page",onClick:()=>Yt.value&&b(),children:[e("div",{class:"site-admin-dashboard",children:[e("header",{class:"site-admin-dashboard-header",children:[e("div",{class:"header-left",children:e("h1",{children:"🎾 Site Administration"})}),e("button",{onClick:o,class:"logout-button",children:"Sign Out"})]}),e("div",{class:"admin-search-bar",children:[e("span",{class:"search-icon",children:"🔍"}),e("input",{type:"text",placeholder:"Search groups by name, creator, or location...",value:Fe.value,onInput:m=>{Fe.value=m.target.value},class:"admin-search-input"}),Fe.value&&e("button",{class:"search-clear",onClick:()=>{Fe.value=""},children:"×"})]}),e("div",{class:"admin-tabs",children:[e("button",{class:`admin-tab ${je.value==="active"?"active":""}`,onClick:()=>{je.value="active"},children:["Active (",f,")"]}),e("button",{class:`admin-tab ${je.value==="archived"?"active":""}`,onClick:()=>{je.value="archived"},children:["Archived (",x,")"]})]}),e("section",{class:"site-admin-section",children:p.length===0?e("div",{class:"empty-state",children:Fe.value?e("p",{children:['No groups match "',Fe.value,'"']}):je.value==="archived"?e("p",{children:"No archived groups."}):e("p",{children:"No active groups yet."})}):e("div",{class:"groups-list",children:p.map(([m,_])=>{const D=_.settings?.members||[],A=Yt.value===m,L=_.metadata?.creator?.name,M=_.metadata?.createdAt;return e("div",{class:"group-row",children:e("div",{class:"group-row-main",children:[e("div",{class:"group-row-info",children:[e("h3",{class:"group-row-name",children:_.settings?.groupName||"Unnamed Group"}),e("div",{class:"group-row-meta",children:[e("span",{class:"group-row-members",children:["👥 ",D.length]}),_.settings?.location?.name&&e("span",{class:"group-row-location",children:["📍 ",_.settings.location.name]})]}),(L||M)&&e("div",{class:"group-row-creator",children:[M&&e("span",{children:["Created ",new Date(M).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})]}),L&&e("span",{children:[" by ",L]})]})]}),e("div",{class:"group-row-actions",children:[je.value==="active"?e("a",{href:`#${m}`,class:"view-group-btn",onClick:T=>{T.preventDefault(),sessionStorage.setItem(`pinAuth_${m}`,"true"),sessionStorage.setItem(`adminAuth_${m}`,"true"),window.location.hash=m,window.location.reload()},children:"View Group →"}):e("button",{onClick:()=>s(m,_.settings?.groupName||m),class:"unarchive-btn",children:"Unarchive"}),e("div",{class:"kebab-menu-container",children:[e("button",{class:"kebab-menu-btn",onClick:T=>{T.stopPropagation(),k(m)},children:"⋮"}),A&&e("div",{class:"kebab-menu",onClick:T=>T.stopPropagation(),children:[e("button",{class:"kebab-menu-item",onClick:()=>{E(m)},children:[e("span",{class:"menu-icon",children:"👥"}),"Manage Members"]}),_.metadata?.shortCode&&e("button",{class:"kebab-menu-item",onClick:()=>w(_.metadata.shortCode),children:[e("span",{class:"menu-icon",children:"🔗"}),"Copy Share Link"]}),e("button",{class:"kebab-menu-item",onClick:()=>E(m),children:[e("span",{class:"menu-icon",children:"ℹ️"}),"View Details"]}),e("div",{class:"kebab-menu-divider"}),je.value==="active"?e("button",{class:"kebab-menu-item",onClick:()=>{b(),c(m,_.settings?.groupName||m)},children:[e("span",{class:"menu-icon",children:"📦"}),"Archive Group"]}):e("button",{class:"kebab-menu-item",onClick:()=>{b(),s(m,_.settings?.groupName||m)},children:[e("span",{class:"menu-icon",children:"📤"}),"Unarchive Group"]}),e("div",{class:"kebab-menu-divider"}),e("button",{class:"kebab-menu-item danger",onClick:()=>{b(),d(m,_.settings?.groupName||m)},children:[e("span",{class:"menu-icon",children:"🗑️"}),"System Delete"]})]})]})]})]})},m)})})})]}),de.value&&S&&e("div",{class:"details-drawer-overlay",onClick:I,children:e("div",{class:"details-drawer",onClick:m=>m.stopPropagation(),children:[e("div",{class:"drawer-header",children:[e("h2",{children:S.settings?.groupName||"Group Details"}),e("button",{class:"drawer-close",onClick:I,children:"×"})]}),e("div",{class:"drawer-content",children:[e("div",{class:"drawer-section",children:[e("h3",{children:"Group Info"}),e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Members:"}),e("span",{class:"detail-value",children:S.settings?.members?.length||0})]}),S.settings?.location?.name&&e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Location:"}),e("span",{class:"detail-value",children:S.settings.location.name})]}),S.metadata?.shortCode&&e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Short Code:"}),e("span",{class:"detail-value code",children:S.metadata.shortCode})]}),S.metadata?.archetype&&e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Type:"}),e("span",{class:"detail-value",children:S.metadata.archetype})]})]}),S.metadata?.creator&&e("div",{class:"drawer-section",children:[e("h3",{children:"Creator"}),e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Name:"}),e("span",{class:"detail-value",children:S.metadata.creator.name})]}),S.metadata.creator.email&&e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Email:"}),e("a",{href:`mailto:${S.metadata.creator.email}`,class:"detail-link",children:S.metadata.creator.email})]}),S.metadata.creator.phone&&e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Phone:"}),e("a",{href:`tel:${S.metadata.creator.phone}`,class:"detail-link",children:S.metadata.creator.phone})]}),S.metadata.createdAt&&e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Created:"}),e("span",{class:"detail-value",children:new Date(S.metadata.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})})]})]}),e("div",{class:"drawer-section",children:[e("h3",{children:"Access PINs"}),e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Group PIN:"}),e("span",{class:"detail-value code",children:S.settings?.groupPin||"Not set"})]}),e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Admin PIN:"}),e("span",{class:"detail-value code",children:S.settings?.adminPin||"Not set"})]})]}),e("div",{class:"drawer-section",children:[e("h3",{children:["Members (",S.settings?.members?.length||0,")"]}),e("div",{class:"add-member-form",children:[e("input",{type:"text",placeholder:"Add new member...",value:Qr.value,onInput:m=>{Qr.value=m.target.value},onKeyDown:m=>{m.key==="Enter"&&(m.preventDefault(),i(de.value))},class:"member-input",disabled:xt.value}),e("button",{onClick:()=>i(de.value),class:"add-member-btn",disabled:xt.value,children:xt.value?"...":"Add"})]}),e("div",{class:"members-list",children:(S.settings?.members||[]).length===0?e("p",{class:"no-members",children:"No members yet."}):(S.settings?.members||[]).map(m=>{const _=Be.value?.groupId===de.value&&Be.value?.originalName===m;return e("div",{class:"member-item",children:_?e(N,{children:[e("input",{type:"text",value:Xr.value,onInput:D=>{Xr.value=D.target.value},onKeyDown:D=>{D.key==="Enter"?(D.preventDefault(),u()):D.key==="Escape"&&(Be.value=null)},class:"edit-member-input",autoFocus:!0}),e("button",{onClick:u,class:"save-member-btn",title:"Save",children:"✓"}),e("button",{onClick:()=>{Be.value=null},class:"cancel-edit-btn",title:"Cancel",children:"✕"})]}):e(N,{children:[e("span",{class:"member-name",children:m}),e("button",{onClick:()=>h(de.value,m),class:"edit-member-btn",title:"Edit name",children:"✎"}),e("button",{onClick:()=>l(de.value,m),class:"remove-member-btn",title:"Remove member",children:"×"})]})},m)})})]}),e("div",{class:"drawer-section technical",children:[e("h3",{children:"Technical"}),e("div",{class:"detail-row",children:[e("span",{class:"detail-label",children:"Group ID:"}),e("span",{class:"detail-value code small",children:de.value})]})]})]})]})})]})}function Zc({message:t,type:r}){const n=()=>{switch(r){case"success":return"✓";case"error":return"✕";default:return"ℹ"}};return e("div",{class:`toast toast-${r}`,children:[e("span",{class:"toast-icon",children:n()}),e("span",{class:"toast-message",children:t})]})}const Ge=Pe("App"),$=g(null),ne=g(""),j=g(null),C=g(""),ma=g(!0),Zt=g([]),ie=g({}),K=g([]),ae=g({}),ed=Ve(()=>j.value?ie.value[j.value]||[]:[]);let td=0;function y(t,r="info"){const n=++td;Zt.value=[...Zt.value,{id:n,message:t,type:r}],setTimeout(()=>{Zt.value=Zt.value.filter(o=>o.id!==n)},3e3)}async function Zr(t){try{const r=R(),n=await r.ref(`shortCodeIndex/${t.toUpperCase()}`).once("value");if(n.exists()){const l=n.val();return Ge.debug(`Resolved short code "${t}" via index to group ID: ${l}`),l}if((await r.ref(`groups/${t}`).once("value")).exists())return Ge.debug(`"${t}" is a direct group ID`),t;const i=(await r.ref("groups").once("value")).val()||{};for(const[l,c]of Object.entries(i)){if(c.settings?.shortCode===t)return Ge.debug(`Resolved short code "${t}" via settings to group ID: ${l}`),l;if(c.metadata?.shortCode===t.toUpperCase())return Ge.debug(`Resolved short code "${t}" via metadata to group ID: ${l}`),l}return Ge.debug(`No match found for "${t}"`),null}catch(r){return Ge.error("resolveShortCodeOrGroupId Error:",r),null}}async function rd(){const t=sessionStorage.getItem("redirect");if(t){sessionStorage.removeItem("redirect");const c=t.replace(/^\/+|\/+$/g,"");if(c==="admin")return history.replaceState(null,"",t),"admin";if(c&&c!=="index.html"&&c!=="app.html"){history.replaceState(null,"",t);const s=await Zr(c);return s||(history.replaceState(null,"","/"),null)}}const r=window.location.hash.replace(/^#\/?/,"");if(r&&r!=="admin"){const c=await Zr(r);return c||(history.replaceState(null,"","/"),null)}if(r==="admin")return"admin";const o=new URLSearchParams(window.location.search).get("group");if(o){const c=await Zr(o);return c||(history.replaceState(null,"","/"),null)}const i=window.location.pathname.replace(/^\/+|\/+$/g,"");if(i==="admin")return"admin";if(!i||i==="index.html"||i==="app.html")return null;const l=await Zr(i);return l||(history.replaceState(null,"","/"),null)}function nd(){return U(()=>{async function t(){try{Ha(),Oi().catch(n=>{Ge.warn("Platform user init failed (non-fatal):",n)});const r=await rd();if($.value=r,r&&r!=="admin"){const n=localStorage.getItem(`sessionUser_${r}`);n&&(C.value=n)}}catch(r){Ge.error("Initialization error:",r),y("Failed to initialize app","error")}finally{ma.value=!1}}t()},[]),ma.value?e(Vs,{text:"Loading..."}):e(N,{children:[$.value===null&&e(cl,{}),$.value==="admin"&&e(Xc,{}),$.value&&$.value!=="admin"&&e(Qc,{}),e("div",{class:"toast-container",children:Zt.value.map(t=>e(Zc,{message:t.message,type:t.type},t.id))})]})}function od(){const r=new URLSearchParams(window.location.search).get("group");if(r)return r;const o=window.location.pathname.replace(/^\/+|\/+$/g,"").split("/").filter(Boolean);return o.length>0&&o[0]!=="index.html"&&o[0]!=="app.html"?o[0]:null}const ad={ttmd:"Midday Tennis"};function id(){const t=od();if(t){const r=ad[t]||"Tennis",n={name:r,short_name:r.length>12?r.split(" ")[0]:r,description:"Tennis match coordination and check-in system",display:"standalone",background_color:"#ffffff",theme_color:"#4CAF50",orientation:"portrait-primary",start_url:`/${t}`,scope:"/",icons:[{src:"/assets/icon-192.png",sizes:"192x192",type:"image/png",purpose:"any maskable"},{src:"/assets/icon-512.png",sizes:"512x512",type:"image/png",purpose:"any maskable"},{src:"/assets/apple-touch-icon.png",sizes:"180x180",type:"image/png",purpose:"any"}]},o=new Blob([JSON.stringify(n)],{type:"application/json"}),a=URL.createObjectURL(o),i=document.getElementById("manifestLink");i&&(i.href=a);let l=document.querySelector('meta[name="apple-mobile-web-app-title"]');l?l.setAttribute("content",r):(l=document.createElement("meta"),l.setAttribute("name","apple-mobile-web-app-title"),l.setAttribute("content",r),document.head.appendChild(l)),document.title=r}}id();zi(e(nd,{}),document.getElementById("app"));
