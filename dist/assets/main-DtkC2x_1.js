(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();var rn,M,jo,Uo,He,ho,Oo,Wo,Ho,Jn,$n,In,Wt={},Go=[],Fa=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,nn=Array.isArray;function $e(t,r){for(var n in r)t[n]=r[n];return t}function Qn(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function ja(t,r,n){var o,a,i,l={};for(i in r)i=="key"?o=r[i]:i=="ref"?a=r[i]:l[i]=r[i];if(arguments.length>2&&(l.children=arguments.length>3?rn.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(i in t.defaultProps)l[i]===void 0&&(l[i]=t.defaultProps[i]);return Mr(t,l,o,a,null)}function Mr(t,r,n,o,a){var i={type:t,props:r,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:a??++jo,__i:-1,__u:0};return a==null&&M.vnode!=null&&M.vnode(i),i}function R(t){return t.children}function Tt(t,r){this.props=t,this.context=r}function wt(t,r){if(r==null)return t.__?wt(t.__,t.__i+1):null;for(var n;r<t.__k.length;r++)if((n=t.__k[r])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?wt(t):null}function Vo(t){var r,n;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,r=0;r<t.__k.length;r++)if((n=t.__k[r])!=null&&n.__e!=null){t.__e=t.__c.base=n.__e;break}return Vo(t)}}function go(t){(!t.__d&&(t.__d=!0)&&He.push(t)&&!Hr.__r++||ho!=M.debounceRendering)&&((ho=M.debounceRendering)||Oo)(Hr)}function Hr(){for(var t,r,n,o,a,i,l,c=1;He.length;)He.length>c&&He.sort(Wo),t=He.shift(),c=He.length,t.__d&&(n=void 0,o=void 0,a=(o=(r=t).__v).__e,i=[],l=[],r.__P&&((n=$e({},o)).__v=o.__v+1,M.vnode&&M.vnode(n),Xn(r.__P,n,o,r.__n,r.__P.namespaceURI,32&o.__u?[a]:null,i,a??wt(o),!!(32&o.__u),l),n.__v=o.__v,n.__.__k[n.__i]=n,Ko(i,n,l),o.__e=o.__=null,n.__e!=a&&Vo(n)));Hr.__r=0}function Yo(t,r,n,o,a,i,l,c,s,d,g){var u,h,p,v,m,b,x,y=o&&o.__k||Go,S=r.length;for(s=Ua(n,r,y,s,S),u=0;u<S;u++)(p=n.__k[u])!=null&&(h=p.__i==-1?Wt:y[p.__i]||Wt,p.__i=u,b=Xn(t,p,h,a,i,l,c,s,d,g),v=p.__e,p.ref&&h.ref!=p.ref&&(h.ref&&Zn(h.ref,null,p),g.push(p.ref,p.__c||v,p)),m==null&&v!=null&&(m=v),(x=!!(4&p.__u))||h.__k===p.__k?s=qo(p,s,t,x):typeof p.type=="function"&&b!==void 0?s=b:v&&(s=v.nextSibling),p.__u&=-7);return n.__e=m,s}function Ua(t,r,n,o,a){var i,l,c,s,d,g=n.length,u=g,h=0;for(t.__k=new Array(a),i=0;i<a;i++)(l=r[i])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=t.__k[i]=Mr(null,l,null,null,null):nn(l)?l=t.__k[i]=Mr(R,{children:l},null,null,null):l.constructor==null&&l.__b>0?l=t.__k[i]=Mr(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):t.__k[i]=l,s=i+h,l.__=t,l.__b=t.__b+1,(d=l.__i=Oa(l,n,s,u))!=-1&&(u--,(c=n[d])&&(c.__u|=2)),c==null||c.__v==null?(d==-1&&(a>g?h--:a<g&&h++),typeof l.type!="function"&&(l.__u|=4)):d!=s&&(d==s-1?h--:d==s+1?h++:(d>s?h--:h++,l.__u|=4))):t.__k[i]=null;if(u)for(i=0;i<g;i++)(c=n[i])!=null&&(2&c.__u)==0&&(c.__e==o&&(o=wt(c)),Qo(c,c));return o}function qo(t,r,n,o){var a,i;if(typeof t.type=="function"){for(a=t.__k,i=0;a&&i<a.length;i++)a[i]&&(a[i].__=t,r=qo(a[i],r,n,o));return r}t.__e!=r&&(o&&(r&&t.type&&!r.parentNode&&(r=wt(t)),n.insertBefore(t.__e,r||null)),r=t.__e);do r=r&&r.nextSibling;while(r!=null&&r.nodeType==8);return r}function Oa(t,r,n,o){var a,i,l,c=t.key,s=t.type,d=r[n],g=d!=null&&(2&d.__u)==0;if(d===null&&c==null||g&&c==d.key&&s==d.type)return n;if(o>(g?1:0)){for(a=n-1,i=n+1;a>=0||i<r.length;)if((d=r[l=a>=0?a--:i++])!=null&&(2&d.__u)==0&&c==d.key&&s==d.type)return l}return-1}function fo(t,r,n){r[0]=="-"?t.setProperty(r,n??""):t[r]=n==null?"":typeof n!="number"||Fa.test(r)?n:n+"px"}function br(t,r,n,o,a){var i,l;e:if(r=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof o=="string"&&(t.style.cssText=o=""),o)for(r in o)n&&r in n||fo(t.style,r,"");if(n)for(r in n)o&&n[r]==o[r]||fo(t.style,r,n[r])}else if(r[0]=="o"&&r[1]=="n")i=r!=(r=r.replace(Ho,"$1")),l=r.toLowerCase(),r=l in t||r=="onFocusOut"||r=="onFocusIn"?l.slice(2):r.slice(2),t.l||(t.l={}),t.l[r+i]=n,n?o?n.u=o.u:(n.u=Jn,t.addEventListener(r,i?In:$n,i)):t.removeEventListener(r,i?In:$n,i);else{if(a=="http://www.w3.org/2000/svg")r=r.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(r!="width"&&r!="height"&&r!="href"&&r!="list"&&r!="form"&&r!="tabIndex"&&r!="download"&&r!="rowSpan"&&r!="colSpan"&&r!="role"&&r!="popover"&&r in t)try{t[r]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&r[4]!="-"?t.removeAttribute(r):t.setAttribute(r,r=="popover"&&n==1?"":n))}}function vo(t){return function(r){if(this.l){var n=this.l[r.type+t];if(r.t==null)r.t=Jn++;else if(r.t<n.u)return;return n(M.event?M.event(r):r)}}}function Xn(t,r,n,o,a,i,l,c,s,d){var g,u,h,p,v,m,b,x,y,S,z,$,P,X,we,ke,ce,K=r.type;if(r.constructor!=null)return null;128&n.__u&&(s=!!(32&n.__u),i=[c=r.__e=n.__e]),(g=M.__b)&&g(r);e:if(typeof K=="function")try{if(x=r.props,y="prototype"in K&&K.prototype.render,S=(g=K.contextType)&&o[g.__c],z=g?S?S.props.value:g.__:o,n.__c?b=(u=r.__c=n.__c).__=u.__E:(y?r.__c=u=new K(x,z):(r.__c=u=new Tt(x,z),u.constructor=K,u.render=Ha),S&&S.sub(u),u.state||(u.state={}),u.__n=o,h=u.__d=!0,u.__h=[],u._sb=[]),y&&u.__s==null&&(u.__s=u.state),y&&K.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=$e({},u.__s)),$e(u.__s,K.getDerivedStateFromProps(x,u.__s))),p=u.props,v=u.state,u.__v=r,h)y&&K.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),y&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(y&&K.getDerivedStateFromProps==null&&x!==p&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(x,z),r.__v==n.__v||!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(x,u.__s,z)===!1){for(r.__v!=n.__v&&(u.props=x,u.state=u.__s,u.__d=!1),r.__e=n.__e,r.__k=n.__k,r.__k.some(function(_e){_e&&(_e.__=r)}),$=0;$<u._sb.length;$++)u.__h.push(u._sb[$]);u._sb=[],u.__h.length&&l.push(u);break e}u.componentWillUpdate!=null&&u.componentWillUpdate(x,u.__s,z),y&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(p,v,m)})}if(u.context=z,u.props=x,u.__P=t,u.__e=!1,P=M.__r,X=0,y){for(u.state=u.__s,u.__d=!1,P&&P(r),g=u.render(u.props,u.state,u.context),we=0;we<u._sb.length;we++)u.__h.push(u._sb[we]);u._sb=[]}else do u.__d=!1,P&&P(r),g=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++X<25);u.state=u.__s,u.getChildContext!=null&&(o=$e($e({},o),u.getChildContext())),y&&!h&&u.getSnapshotBeforeUpdate!=null&&(m=u.getSnapshotBeforeUpdate(p,v)),ke=g,g!=null&&g.type===R&&g.key==null&&(ke=Jo(g.props.children)),c=Yo(t,nn(ke)?ke:[ke],r,n,o,a,i,l,c,s,d),u.base=r.__e,r.__u&=-161,u.__h.length&&l.push(u),b&&(u.__E=u.__=null)}catch(_e){if(r.__v=null,s||i!=null)if(_e.then){for(r.__u|=s?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;i[i.indexOf(c)]=null,r.__e=c}else{for(ce=i.length;ce--;)Qn(i[ce]);En(r)}else r.__e=n.__e,r.__k=n.__k,_e.then||En(r);M.__e(_e,r,n)}else i==null&&r.__v==n.__v?(r.__k=n.__k,r.__e=n.__e):c=r.__e=Wa(n.__e,r,n,o,a,i,l,s,d);return(g=M.diffed)&&g(r),128&r.__u?void 0:c}function En(t){t&&t.__c&&(t.__c.__e=!0),t&&t.__k&&t.__k.forEach(En)}function Ko(t,r,n){for(var o=0;o<n.length;o++)Zn(n[o],n[++o],n[++o]);M.__c&&M.__c(r,t),t.some(function(a){try{t=a.__h,a.__h=[],t.some(function(i){i.call(a)})}catch(i){M.__e(i,a.__v)}})}function Jo(t){return typeof t!="object"||t==null||t.__b&&t.__b>0?t:nn(t)?t.map(Jo):$e({},t)}function Wa(t,r,n,o,a,i,l,c,s){var d,g,u,h,p,v,m,b=n.props||Wt,x=r.props,y=r.type;if(y=="svg"?a="http://www.w3.org/2000/svg":y=="math"?a="http://www.w3.org/1998/Math/MathML":a||(a="http://www.w3.org/1999/xhtml"),i!=null){for(d=0;d<i.length;d++)if((p=i[d])&&"setAttribute"in p==!!y&&(y?p.localName==y:p.nodeType==3)){t=p,i[d]=null;break}}if(t==null){if(y==null)return document.createTextNode(x);t=document.createElementNS(a,y,x.is&&x),c&&(M.__m&&M.__m(r,i),c=!1),i=null}if(y==null)b===x||c&&t.data==x||(t.data=x);else{if(i=i&&rn.call(t.childNodes),!c&&i!=null)for(b={},d=0;d<t.attributes.length;d++)b[(p=t.attributes[d]).name]=p.value;for(d in b)if(p=b[d],d!="children"){if(d=="dangerouslySetInnerHTML")u=p;else if(!(d in x)){if(d=="value"&&"defaultValue"in x||d=="checked"&&"defaultChecked"in x)continue;br(t,d,null,p,a)}}for(d in x)p=x[d],d=="children"?h=p:d=="dangerouslySetInnerHTML"?g=p:d=="value"?v=p:d=="checked"?m=p:c&&typeof p!="function"||b[d]===p||br(t,d,p,b[d],a);if(g)c||u&&(g.__html==u.__html||g.__html==t.innerHTML)||(t.innerHTML=g.__html),r.__k=[];else if(u&&(t.innerHTML=""),Yo(r.type=="template"?t.content:t,nn(h)?h:[h],r,n,o,y=="foreignObject"?"http://www.w3.org/1999/xhtml":a,i,l,i?i[0]:n.__k&&wt(n,0),c,s),i!=null)for(d=i.length;d--;)Qn(i[d]);c||(d="value",y=="progress"&&v==null?t.removeAttribute("value"):v!=null&&(v!==t[d]||y=="progress"&&!v||y=="option"&&v!=b[d])&&br(t,d,v,b[d],a),d="checked",m!=null&&m!=t[d]&&br(t,d,m,b[d],a))}return t}function Zn(t,r,n){try{if(typeof t=="function"){var o=typeof t.__u=="function";o&&t.__u(),o&&r==null||(t.__u=t(r))}else t.current=r}catch(a){M.__e(a,n)}}function Qo(t,r,n){var o,a;if(M.unmount&&M.unmount(t),(o=t.ref)&&(o.current&&o.current!=t.__e||Zn(o,null,r)),(o=t.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(i){M.__e(i,r)}o.base=o.__P=null}if(o=t.__k)for(a=0;a<o.length;a++)o[a]&&Qo(o[a],r,n||typeof t.type!="function");n||Qn(t.__e),t.__c=t.__=t.__e=void 0}function Ha(t,r,n){return this.constructor(t,n)}function Ga(t,r,n){var o,a,i,l;r==document&&(r=document.documentElement),M.__&&M.__(t,r),a=(o=!1)?null:r.__k,i=[],l=[],Xn(r,t=r.__k=ja(R,null,[t]),a||Wt,Wt,r.namespaceURI,a?null:r.firstChild?rn.call(r.childNodes):null,i,a?a.__e:r.firstChild,o,l),Ko(i,t,l)}rn=Go.slice,M={__e:function(t,r,n,o){for(var a,i,l;r=r.__;)if((a=r.__c)&&!a.__)try{if((i=a.constructor)&&i.getDerivedStateFromError!=null&&(a.setState(i.getDerivedStateFromError(t)),l=a.__d),a.componentDidCatch!=null&&(a.componentDidCatch(t,o||{}),l=a.__d),l)return a.__E=a}catch(c){t=c}throw t}},jo=0,Uo=function(t){return t!=null&&t.constructor==null},Tt.prototype.setState=function(t,r){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=$e({},this.state),typeof t=="function"&&(t=t($e({},n),this.props)),t&&$e(n,t),t!=null&&this.__v&&(r&&this._sb.push(r),go(this))},Tt.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),go(this))},Tt.prototype.render=R,He=[],Oo=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Wo=function(t,r){return t.__v.__b-r.__v.__b},Hr.__r=0,Ho=/(PointerCapture)$|Capture$/i,Jn=0,$n=vo(!1),In=vo(!0);var Va=0;function e(t,r,n,o,a,i){r||(r={});var l,c,s=r;if("ref"in s)for(c in s={},r)c=="ref"?l=r[c]:s[c]=r[c];var d={type:t,props:s,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Va,__i:-1,__u:0,__source:a,__self:i};if(typeof t=="function"&&(l=t.defaultProps))for(c in l)s[c]===void 0&&(s[c]=l[c]);return M.vnode&&M.vnode(d),d}var Ht,B,pn,mo,Gr=0,Xo=[],F=M,xo=F.__b,bo=F.__r,yo=F.diffed,wo=F.__c,ko=F.unmount,_o=F.__;function eo(t,r){F.__h&&F.__h(B,t,Gr||r),Gr=0;var n=B.__H||(B.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function De(t){return Gr=1,Ya(ta,t)}function Ya(t,r,n){var o=eo(Ht++,2);if(o.t=t,!o.__c&&(o.__=[ta(void 0,r),function(c){var s=o.__N?o.__N[0]:o.__[0],d=o.t(s,c);s!==d&&(o.__N=[d,o.__[1]],o.__c.setState({}))}],o.__c=B,!B.__f)){var a=function(c,s,d){if(!o.__c.__H)return!0;var g=o.__c.__H.__.filter(function(h){return!!h.__c});if(g.every(function(h){return!h.__N}))return!i||i.call(this,c,s,d);var u=o.__c.props!==c;return g.forEach(function(h){if(h.__N){var p=h.__[0];h.__=h.__N,h.__N=void 0,p!==h.__[0]&&(u=!0)}}),i&&i.call(this,c,s,d)||u};B.__f=!0;var i=B.shouldComponentUpdate,l=B.componentWillUpdate;B.componentWillUpdate=function(c,s,d){if(this.__e){var g=i;i=void 0,a(c,s,d),i=g}l&&l.call(this,c,s,d)},B.shouldComponentUpdate=a}return o.__N||o.__}function T(t,r){var n=eo(Ht++,3);!F.__s&&ea(n.__H,r)&&(n.__=t,n.u=r,B.__H.__h.push(n))}function to(t){return Gr=5,Zo(function(){return{current:t}},[])}function Zo(t,r){var n=eo(Ht++,7);return ea(n.__H,r)&&(n.__=t(),n.__H=r,n.__h=t),n.__}function qa(){for(var t;t=Xo.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(Ar),t.__H.__h.forEach(Dn),t.__H.__h=[]}catch(r){t.__H.__h=[],F.__e(r,t.__v)}}F.__b=function(t){B=null,xo&&xo(t)},F.__=function(t,r){t&&r.__k&&r.__k.__m&&(t.__m=r.__k.__m),_o&&_o(t,r)},F.__r=function(t){bo&&bo(t),Ht=0;var r=(B=t.__c).__H;r&&(pn===B?(r.__h=[],B.__h=[],r.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(r.__h.forEach(Ar),r.__h.forEach(Dn),r.__h=[],Ht=0)),pn=B},F.diffed=function(t){yo&&yo(t);var r=t.__c;r&&r.__H&&(r.__H.__h.length&&(Xo.push(r)!==1&&mo===F.requestAnimationFrame||((mo=F.requestAnimationFrame)||Ka)(qa)),r.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),pn=B=null},F.__c=function(t,r){r.some(function(n){try{n.__h.forEach(Ar),n.__h=n.__h.filter(function(o){return!o.__||Dn(o)})}catch(o){r.some(function(a){a.__h&&(a.__h=[])}),r=[],F.__e(o,n.__v)}}),wo&&wo(t,r)},F.unmount=function(t){ko&&ko(t);var r,n=t.__c;n&&n.__H&&(n.__H.__.forEach(function(o){try{Ar(o)}catch(a){r=a}}),n.__H=void 0,r&&F.__e(r,n.__v))};var Co=typeof requestAnimationFrame=="function";function Ka(t){var r,n=function(){clearTimeout(o),Co&&cancelAnimationFrame(r),setTimeout(t)},o=setTimeout(n,35);Co&&(r=requestAnimationFrame(n))}function Ar(t){var r=B,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),B=r}function Dn(t){var r=B;t.__c=t.__(),B=r}function ea(t,r){return!t||t.length!==r.length||r.some(function(n,o){return n!==t[o]})}function ta(t,r){return typeof r=="function"?r(t):r}var Ja=Symbol.for("preact-signals");function on(){if(Be>1)Be--;else{for(var t,r=!1;Lt!==void 0;){var n=Lt;for(Lt=void 0,Mn++;n!==void 0;){var o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&oa(n))try{n.c()}catch(a){r||(t=a,r=!0)}n=o}}if(Mn=0,Be--,r)throw t}}function Qa(t){if(Be>0)return t();Be++;try{return t()}finally{on()}}var D=void 0;function ra(t){var r=D;D=void 0;try{return t()}finally{D=r}}var Lt=void 0,Be=0,Mn=0,Vr=0;function na(t){if(D!==void 0){var r=t.n;if(r===void 0||r.t!==D)return r={i:0,S:t,p:D.s,n:void 0,t:D,e:void 0,x:void 0,r},D.s!==void 0&&(D.s.n=r),D.s=r,t.n=r,32&D.f&&t.S(r),r;if(r.i===-1)return r.i=0,r.n!==void 0&&(r.n.p=r.p,r.p!==void 0&&(r.p.n=r.n),r.p=D.s,r.n=void 0,D.s.n=r,D.s=r),r}}function q(t,r){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=r?.watched,this.Z=r?.unwatched,this.name=r?.name}q.prototype.brand=Ja;q.prototype.h=function(){return!0};q.prototype.S=function(t){var r=this,n=this.t;n!==t&&t.e===void 0&&(t.x=n,this.t=t,n!==void 0?n.e=t:ra(function(){var o;(o=r.W)==null||o.call(r)}))};q.prototype.U=function(t){var r=this;if(this.t!==void 0){var n=t.e,o=t.x;n!==void 0&&(n.x=o,t.e=void 0),o!==void 0&&(o.e=n,t.x=void 0),t===this.t&&(this.t=o,o===void 0&&ra(function(){var a;(a=r.Z)==null||a.call(r)}))}};q.prototype.subscribe=function(t){var r=this;return se(function(){var n=r.value,o=D;D=void 0;try{t(n)}finally{D=o}},{name:"sub"})};q.prototype.valueOf=function(){return this.value};q.prototype.toString=function(){return this.value+""};q.prototype.toJSON=function(){return this.value};q.prototype.peek=function(){var t=D;D=void 0;try{return this.value}finally{D=t}};Object.defineProperty(q.prototype,"value",{get:function(){var t=na(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(Mn>100)throw new Error("Cycle detected");this.v=t,this.i++,Vr++,Be++;try{for(var r=this.t;r!==void 0;r=r.x)r.t.N()}finally{on()}}}});function f(t,r){return new q(t,r)}function oa(t){for(var r=t.s;r!==void 0;r=r.n)if(r.S.i!==r.i||!r.S.h()||r.S.i!==r.i)return!0;return!1}function aa(t){for(var r=t.s;r!==void 0;r=r.n){var n=r.S.n;if(n!==void 0&&(r.r=n),r.S.n=r,r.i=-1,r.n===void 0){t.s=r;break}}}function ia(t){for(var r=t.s,n=void 0;r!==void 0;){var o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):n=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=n}function Ze(t,r){q.call(this,void 0),this.x=t,this.s=void 0,this.g=Vr-1,this.f=4,this.W=r?.watched,this.Z=r?.unwatched,this.name=r?.name}Ze.prototype=new q;Ze.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Vr))return!0;if(this.g=Vr,this.f|=1,this.i>0&&!oa(this))return this.f&=-2,!0;var t=D;try{aa(this),D=this;var r=this.x();(16&this.f||this.v!==r||this.i===0)&&(this.v=r,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return D=t,ia(this),this.f&=-2,!0};Ze.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var r=this.s;r!==void 0;r=r.n)r.S.S(r)}q.prototype.S.call(this,t)};Ze.prototype.U=function(t){if(this.t!==void 0&&(q.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var r=this.s;r!==void 0;r=r.n)r.S.U(r)}};Ze.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};Object.defineProperty(Ze.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=na(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function Fe(t,r){return new Ze(t,r)}function la(t){var r=t.u;if(t.u=void 0,typeof r=="function"){Be++;var n=D;D=void 0;try{r()}catch(o){throw t.f&=-2,t.f|=8,ro(t),o}finally{D=n,on()}}}function ro(t){for(var r=t.s;r!==void 0;r=r.n)r.S.U(r);t.x=void 0,t.s=void 0,la(t)}function Xa(t){if(D!==this)throw new Error("Out-of-order effect");ia(this),D=t,this.f&=-2,8&this.f&&ro(this),on()}function Ct(t,r){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=r?.name}Ct.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var r=this.x();typeof r=="function"&&(this.u=r)}finally{t()}};Ct.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,la(this),aa(this),Be++;var t=D;return D=this,Xa.bind(this,t)};Ct.prototype.N=function(){2&this.f||(this.f|=2,this.o=Lt,Lt=this)};Ct.prototype.d=function(){this.f|=8,1&this.f||ro(this)};Ct.prototype.dispose=function(){this.d()};function se(t,r){var n=new Ct(t,r);try{n.c()}catch(a){throw n.d(),a}var o=n.d.bind(n);return o[Symbol.dispose]=o,o}var sa,un,an=typeof window<"u"&&!!window.__PREACT_SIGNALS_DEVTOOLS__,ca=[];se(function(){sa=this.N})();function zt(t,r){M[t]=r.bind(null,M[t]||function(){})}function Yr(t){un&&un(),un=t&&t.S()}function da(t){var r=this,n=t.data,o=ei(n);o.value=n;var a=Zo(function(){for(var c=r,s=r.__v;s=s.__;)if(s.__c){s.__c.__$f|=4;break}var d=Fe(function(){var p=o.value.value;return p===0?0:p===!0?"":p||""}),g=Fe(function(){return!Array.isArray(d.value)&&!Uo(d.value)}),u=se(function(){if(this.N=pa,g.value){var p=d.value;c.__v&&c.__v.__e&&c.__v.__e.nodeType===3&&(c.__v.__e.data=p)}}),h=r.__$u.d;return r.__$u.d=function(){u(),h.call(this)},[g,d]},[]),i=a[0],l=a[1];return i.value?l.peek():l.value}da.displayName="ReactiveTextNode";Object.defineProperties(q.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:da},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});zt("__b",function(t,r){if(an&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),typeof r.type=="string"){var n,o=r.props;for(var a in o)if(a!=="children"){var i=o[a];i instanceof q&&(n||(r.__np=n={}),n[a]=i,o[a]=i.peek())}}t(r)});zt("__r",function(t,r){if(an&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.enterComponent(r),r.type!==R){Yr();var n,o=r.__c;o&&(o.__$f&=-2,(n=o.__$u)===void 0&&(o.__$u=n=(function(a){var i;return se(function(){i=this}),i.c=function(){o.__$f|=1,o.setState({})},i})())),Yr(n)}t(r)});zt("__e",function(t,r,n,o){an&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),Yr(),t(r,n,o)});zt("diffed",function(t,r){an&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),Yr();var n;if(typeof r.type=="string"&&(n=r.__e)){var o=r.__np,a=r.props;if(o){var i=n.U;if(i)for(var l in i){var c=i[l];c!==void 0&&!(l in o)&&(c.d(),i[l]=void 0)}else i={},n.U=i;for(var s in o){var d=i[s],g=o[s];d===void 0?(d=Za(n,s,g,a),i[s]=d):d.o(g,a)}}}t(r)});function Za(t,r,n,o){var a=r in t&&t.ownerSVGElement===void 0,i=f(n);return{o:function(l,c){i.value=l,o=c},d:se(function(){this.N=pa;var l=i.value.value;o[r]!==l&&(o[r]=l,a?t[r]=l:l!=null&&(l!==!1||r[4]==="-")?t.setAttribute(r,l):t.removeAttribute(r))})}}zt("unmount",function(t,r){if(typeof r.type=="string"){var n=r.__e;if(n){var o=n.U;if(o){n.U=void 0;for(var a in o){var i=o[a];i&&i.d()}}}}else{var l=r.__c;if(l){var c=l.__$u;c&&(l.__$u=void 0,c.d())}}t(r)});zt("__h",function(t,r,n,o){(o<3||o===9)&&(r.__$f|=2),t(r,n,o)});Tt.prototype.shouldComponentUpdate=function(t,r){var n=this.__$u,o=n&&n.s!==void 0;for(var a in r)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var i=2&this.__$f;if(!(o||i||4&this.__$f)||1&this.__$f)return!0}else if(!(o||4&this.__$f)||3&this.__$f)return!0;for(var l in t)if(l!=="__source"&&t[l]!==this.props[l])return!0;for(var c in this.props)if(!(c in t))return!0;return!1};function ei(t,r){return De(function(){return f(t,r)})[0]}var ti=function(t){queueMicrotask(function(){queueMicrotask(t)})};function ri(){Qa(function(){for(var t;t=ca.shift();)sa.call(t)})}function pa(){ca.push(this)===1&&(M.requestAnimationFrame||ti)(ri)}function ni(t,r){r!==void 0?console.warn(t,r):console.warn(t)}function oi(t,r){r!==void 0?console.error(t,r):console.error(t)}function Me(t){const r=`[${t}]`;return{debug:(n,o)=>void 0,info:(n,o)=>void 0,warn:(n,o)=>ni(`${r} ${n}`,o),error:(n,o)=>oi(`${r} ${n}`,o)}}const zo=Me("Firebase"),ai={apiKey:"AIzaSyCr-Ej5jeuV3kdvquu2W_R0ffSrUW0OUcQ",authDomain:"tennis-coordinator-43f53.firebaseapp.com",databaseURL:"https://tennis-coordinator-43f53-default-rtdb.firebaseio.com",projectId:"tennis-coordinator-43f53",storageBucket:"tennis-coordinator-43f53.firebasestorage.app",messagingSenderId:"665148711646",appId:"1:665148711646:web:66d14722800a12f5a3184f",measurementId:"G-J0KVB2Q93W"};let dt=null;function ua(){if(dt)return dt;try{return window.firebase.initializeApp(ai),dt=window.firebase.database(),zo.info("Firebase initialized successfully"),dt}catch(t){throw zo.error("Firebase initialization error:",t),t}}function E(){return dt||ua()}const ii=f("legacy");f({format:"legacy"});f(null);f(null);f(null);f(null);function li(t,r){const n=t.slice(1).split("/").filter(Boolean),a=new URLSearchParams(r).get("group");if(a)return{type:"legacy",legacyGroupId:a};if(n.length===0)return{type:"landing"};if(n.length===1){const i=n[0];return i==="admin"?{type:"admin"}:i.startsWith("join-")||i.length===8?{type:"join",inviteCode:i.replace("join-","")}:ii.value==="legacy"?{type:"legacy",legacyGroupId:i}:{type:"club",clubShortCode:i}}return n.length===2?{type:"group",clubShortCode:n[0],groupShortCode:n[1]}:{type:"landing"}}Fe(()=>typeof window>"u"?{type:"landing"}:li(window.location.pathname,window.location.search));function si(){const t="deviceToken";let r=localStorage.getItem(t);return r||(r="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,n=>{const o=Math.random()*16|0;return(n==="x"?o:o&3|8).toString(16)}),localStorage.setItem(t,r)),r}const L=f(null),An=f(!1),Rn=f(null),xr=f(null),So=Fe(()=>{const t=L.value;return t?.groupLinks?Object.keys(t.groupLinks).length:0});function ha(t){return`platform/users/${t}`}function ga(t){return`platform/users/${t}/profile`}function fa(t,r){return`platform/users/${t}/groupLinks/${r}`}async function ci(){try{An.value=!0,Rn.value=null;const t=si();xr.value=t;const r=E();if(!r)throw new Error("Firebase database not initialized");const n=r.ref(ha(t)),o=await n.once("value");if(o.exists()){const a=o.val();L.value=a,await r.ref(ga(t)).update({lastActiveAt:Date.now()})}else{const a={profile:{displayName:"",createdAt:Date.now(),lastActiveAt:Date.now()},settings:{notifications:{enabled:!0}},groupLinks:{}};await n.set(a),L.value=a}}catch(t){const r=t instanceof Error?t.message:"Unknown error";Rn.value=r,console.warn("[PlatformUser] Initialization failed (non-fatal):",r)}finally{An.value=!1}}async function di(){try{const t=xr.value;if(!t)return;const r=E();if(!r)return;const n=await r.ref(ha(t)).once("value");n.exists()&&(L.value=n.val())}catch(t){console.warn("[PlatformUser] Refresh failed (non-fatal):",t)}}async function va(t,r){try{const n=xr.value;if(!n){console.warn("[PlatformUser] No device token, skipping group link");return}const o=E();if(!o){console.warn("[PlatformUser] No database, skipping group link");return}const a=Date.now(),i={memberName:r,linkedAt:a,lastActive:a},l=o.ref(fa(n,t));(await l.once("value")).exists()?await l.update({memberName:r,lastActive:a}):await l.set(i),L.value&&(L.value={...L.value,groupLinks:{...L.value.groupLinks,[t]:i}}),L.value?.profile.displayName===""&&await no({displayName:r});const s=L.value?.profile;if(s&&(s.phone||s.email))try{const d=o.ref(`groups/${t}/settings/memberDetails/${r}`),u=(await d.once("value")).val()||{},h={};s.phone&&!u.phone&&(h.phone=s.phone),s.email&&!u.email&&(h.email=s.email),Object.keys(h).length>0&&await d.update(h)}catch(d){console.warn("[PlatformUser] Contact sync failed (non-fatal):",d)}}catch(n){const o=n instanceof Error?n.message:"Unknown error";console.warn("[PlatformUser] Group link failed (non-fatal):",o)}}async function pi(t){try{const r=xr.value;if(!r)return;const n=E();if(!n)return;await n.ref(fa(r,t)).update({lastActive:Date.now()}),L.value?.groupLinks[t]&&(L.value={...L.value,groupLinks:{...L.value.groupLinks,[t]:{...L.value.groupLinks[t],lastActive:Date.now()}}})}catch(r){console.warn("[PlatformUser] Activity update failed (non-fatal):",r)}}async function no(t){try{const r=xr.value;if(!r)throw new Error("No device token");const n=E();if(!n)throw new Error("No database");const o={...t,lastActiveAt:Date.now()};await n.ref(ga(r)).update(o),L.value&&(L.value={...L.value,profile:{...L.value.profile,...o}})}catch(r){const n=r instanceof Error?r.message:"Unknown error";throw Rn.value=n,r}}function ui(){const t=L.value;return t?.groupLinks?Object.entries(t.groupLinks).map(([r,n])=>({groupId:r,...n})).sort((r,n)=>n.lastActive-r.lastActive):[]}function hi(){return e("div",{class:"landing-page",children:e("div",{class:"landing-container",children:[e("h1",{children:"🎾 Tennis Coordinator"}),e("p",{class:"landing-tagline",children:"Turn your love for tennis into more games."}),e("p",{class:"landing-subtitle",children:"A simple tool that helps tennis groups self-organize matches with minimal friction—so you spend less time coordinating and more time on the court."}),e("div",{class:"landing-section",children:[e("h2",{children:"Why It Works"}),e("div",{class:"landing-features",children:[e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Frictionless"}),e("span",{children:"Check in with a few taps. No accounts, no apps to download."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Flexible"}),e("span",{children:"Handles doubles, singles, odd numbers, guests, and preferences."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Adaptable"}),e("span",{children:"Works for tight-knit groups of 20 or club communities of 50+."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Real-Time"}),e("span",{children:"Everyone sees who's playing instantly."})]})]})]})]}),e("div",{class:"landing-section landing-section-alt",children:[e("h2",{children:"How It Works"}),e("div",{class:"landing-steps",children:[e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"1"}),e("div",{children:[e("strong",{children:"Check In"}),e("span",{children:"Select your name, play style, and when you're available"})]})]}),e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"2"}),e("div",{children:[e("strong",{children:"Auto-Match"}),e("span",{children:"System organizes matches based on who's playing"})]})]}),e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"3"}),e("div",{children:[e("strong",{children:"Play"}),e("span",{children:"Show up and enjoy the game"})]})]})]})]}),e("div",{class:"landing-cta",children:e("p",{children:"To access your tennis group, visit your group's unique URL or contact your group admin for the link."})}),e("div",{class:"landing-footer",children:[e("a",{href:"whats-new.html",class:"whatsnew-link",children:"What's New"}),e("span",{class:"footer-separator",children:"|"}),e("a",{href:"#admin",class:"admin-link",onClick:t=>{t.preventDefault(),window.location.hash="admin",window.location.reload()},children:"Site Administrator? Access Site Admin →"})]})]})})}function _(t){return t.toLowerCase().trim().replace(/\s+/g," ")}function ln(t){switch(t){case"singles":return"Singles Only";case"doubles":return"Doubles Only";case"both":return"Either";default:return"Either"}}function yr(t){if(!t)return"";const[r,n]=t.split(":"),o=parseInt(r),a=o>=12?"PM":"AM";return`${o%12||12}:${n}${a}`}function oe(t,r){return!t&&!r?"":t&&r?`${yr(t)}-${yr(r)}`:t?`from ${yr(t)}`:r?`until ${yr(r)}`:""}function H(t){return new Date(t+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function $o(t){return new Date(t+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function oo(t){const r=new Date(t),n=new Date,o=r.toDateString()===n.toDateString(),a=r.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});return o?a:`${r.toLocaleDateString("en-US",{month:"short",day:"numeric"})} ${a}`}function Pn(t){const r=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${r}-${n}-${o}`}function gi(){return Pn(new Date)}function Io(t,r){return r[_(t)]||{include:[],exclude:[]}}function fi(t,r,n){const o=Io(t,n),a=Io(r,n),i=_(t),l=_(r);return!o.exclude.includes(l)&&!a.exclude.includes(i)}function vi(t,r){if(!t||!r||!t.start&&!t.end&&!r.start&&!r.end)return!0;const n=p=>{if(!p)return null;const[v,m]=p.split(":").map(Number);return v*60+m},o=n(t.start),a=n(t.end),i=n(r.start),l=n(r.end),c=360,s=1260,d=o??c,g=a??s,u=i??c;return d<(l??s)&&u<g}function $t(t,r,n){return fi(t.name,r.name,n)?vi(t.timeRange,r.timeRange):!1}function sn(t,r={}){const n=[],o=[],a=t.map((h,p)=>({...h,originalIndex:p}));a.sort((h,p)=>h.timestamp-p.timestamp);const i=a.filter(h=>h.playStyle==="doubles"),l=a.filter(h=>h.playStyle==="singles"),c=a.filter(h=>h.playStyle==="both"||!h.playStyle),s=[...i,...c].sort((h,p)=>h.timestamp-p.timestamp);for(;s.length>=4;){const h=s.slice(0,4);n.push({type:"doubles",number:n.filter(p=>p.type==="doubles").length+1,players:h}),s.splice(0,4)}const d=[...l].sort((h,p)=>h.timestamp-p.timestamp);for(;d.length>=2;){let h=null;for(let p=0;p<d.length-1;p++){for(let v=p+1;v<d.length;v++)if($t(d[p],d[v],r)){h=[d[p],d[v]];break}if(h)break}if(h)n.push({type:"singles",players:h}),h.forEach(p=>{const v=d.findIndex(m=>m.originalIndex===p.originalIndex);v>-1&&d.splice(v,1)});else break}const g=s,u=d;if(g.length>0){const h=4-g.length,p=g.filter(S=>S.playStyle==="both"||!S.playStyle),v=p.length,m=g.every(S=>S.playStyle==="both"||!S.playStyle),b=g.every(S=>S.allowRotation!==!1),x=g.length===3&&$t(g[0],g[1],r)&&$t(g[0],g[2],r)&&$t(g[1],g[2],r);let y=!1;v>=2&&(y=$t(p[0],p[1],r)),n.push({type:"doubles-forming",players:g,needed:h,canRotate:g.length===3&&m&&b&&x,eitherCount:v,canPlaySingles:y})}return u.length>0&&u.forEach(h=>{n.push({type:"singles-forming",players:[h],needed:1})}),{matches:n,warnings:o}}const mi=Me("Theme"),ge=Me("Notifications"),ue=Me("MatchFormations"),le=Me("Checkins"),cn=Me("Members"),qr=Me("Arrangements"),xi=Me("Activity"),I=f({groupPin:"",adminPin:""});function ma(t){const r=document.documentElement;if(r.classList.remove("theme-wimbledon","theme-roland-garros","theme-australian-open","theme-us-open","theme-clay","theme-hardcourt","theme-tennis-ball"),r.removeAttribute("data-theme"),t&&t!=="default"){const n=`theme-${t}`;r.classList.add(n),r.setAttribute("data-theme",t),mi.debug("Added class:",{themeClass:n,themeName:t,classes:r.className})}}const G=f({}),Tn=f({}),Eo={};function U(t){return E().ref(t)}function bi(){T(()=>{const t=se(()=>{const r=C.value;if(!r||r==="admin")return;U(`groups/${r}/settings`).once("value").then(o=>{const a=o.val()||{};Y.value=a.groupName||"Unknown Group",V.value=a.members||[],J.value=a.memberDetails||{};const i=a.renamedMembers||{};if(k.value&&i[k.value]){const l=i[k.value];k.value=l,localStorage.setItem(`sessionUser_${r}`,l)}I.value={groupPin:a.groupPin||"",adminPin:a.adminPin||"",shortCode:a.shortCode,location:a.location,groupDescription:a.groupDescription,groupRules:a.groupRules,theme:a.theme},ma(a.theme),document.title=`${a.groupName||"Tennis"} - Tennis Coordinator`}).catch(o=>{le.error("Error loading group settings:",o),w("Failed to load group data","error")})});return()=>{t()}},[])}function yi(){T(()=>{let t=null,r=null;const n=se(()=>{const o=C.value;t&&r&&t.off("value",r),!(!o||o==="admin")&&(t=U(`groups/${o}/checkins`),r=t.on("value",a=>{const i=a.val()||{};Q.value=i}))});return()=>{n(),t&&r&&t.off("value",r)}},[])}function wi(){T(()=>{let t=null,r=null;const n=se(()=>{const o=C.value,a=A.value;if(t&&r&&t.off("value",r),!o||o==="admin"||!a){G.value={};return}t=U(`groups/${o}/matchNotes/${a}`),r=t.on("value",i=>{G.value=i.val()||{}})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function ki(){T(()=>{let t=null,r=null;const n=se(()=>{const o=C.value;if(t&&r&&t.off("value",r),!o||o==="admin"){Tn.value={};return}t=U(`groups/${o}/matchNotes`),r=t.on("value",a=>{Tn.value=a.val()||{}})});return()=>{n(),t&&r&&t.off("value",r)}},[])}async function Ln(t){const r=C.value,n=A.value;if(!r||!n)return;const o=U(`groups/${r}/checkins/${n}`),a=Q.value[n]||[],i=_(t.name);if(a.some(s=>s.name&&_(s.name)===i)){w(`${t.name} is already checked in for this date!`,"error");return}const c={name:t.name,playStyle:t.playStyle,isGuest:t.isGuest,addedBy:t.addedBy,allowRotation:t.allowRotation,timestamp:Date.now()};t.timeRange&&(c.timeRange=t.timeRange);try{await o.set([...a,c]),await ye(r,n,"checkin",t.name,t.addedBy);const s=k.value;s&&_(t.name)===_(s)?va(r,s):s&&pi(r),le.debug("About to call notifyCheckinAlert for:",t.name);try{await Si(r,t.name,n,t.addedBy,{playStyle:t.playStyle,timeRange:t.timeRange,allowRotation:t.allowRotation}),le.debug("notifyCheckinAlert completed")}catch(d){le.error("Error in notifyCheckinAlert:",d)}setTimeout(()=>ya(r,n),500)}catch(s){le.error("Error adding check-in:",s),w("Failed to check in","error")}}async function xa(t,r,n){const o=C.value,a=A.value;if(!o||!a)return;const i=Q.value[a]||[],l=i[t];if(!l)return;const c=l.name||"this person",s=n&&_(n)===_(c),d=l.addedBy&&n&&_(n)===_(l.addedBy),g=sessionStorage.getItem(`adminAuth_${o}`)==="true";if(!s&&!d&&!g){w("You can only edit check-ins you added","error");return}const u=U(`groups/${o}/checkins/${a}`),h=[...i],p={};for(const[v,m]of Object.entries(r))m!==void 0&&(p[v]=m);h[t]={...h[t],...p};try{await u.set(h),w(`${c}'s preferences updated`,"success")}catch(v){le.error("Error updating check-in:",v),w("Failed to update check-in","error")}}async function _i(t,r,n){const o=N.value;if(!o||!o.matches)return;const a={};for(const[c,s]of Object.entries(o.matches)){const d=(s.players||[]).filter(g=>_(g)!==_(n));d.length>0&&(a[c]={...s,players:d})}const i=(o.unassigned||[]).filter(c=>_(c)!==_(n));if(Object.keys(a).length===0&&i.length===0){try{await U(`groups/${t}/matchArrangements/${r}`).remove(),N.value=null}catch(c){qr.error("Error clearing arrangement after removal:",c)}return}const l={...o,matches:a,unassigned:i};try{await U(`groups/${t}/matchArrangements/${r}`).set(l),N.value=l}catch(c){qr.error("Error updating arrangement after removal:",c)}}async function ba(t,r){const n=C.value,o=A.value;if(!n||!o)return;const a=Q.value[o]||[],l=a[t]?.name||"this person",c=r&&_(r)===_(l),s=U(`groups/${n}/checkins/${o}`),d=a.filter((g,u)=>u!==t);try{await s.set(d.length>0?d:null),N.value&&l&&await _i(n,o,l),c&&r&&(tn.value=r,en.value=!0),await ye(n,o,"removal",l,r),le.debug("About to call notifyRemovalAlert for:",l);try{await Ci(n,l,o,r),le.debug("notifyRemovalAlert completed")}catch(g){le.error("Error in notifyRemovalAlert:",g)}setTimeout(()=>ya(n,o),500)}catch(g){le.error("Error removing check-in:",g),w("Failed to remove check-in","error")}}async function ye(t,r,n,o,a,i={}){const l={timestamp:Date.now(),action:n,player:o,by:a||o,...i};Object.keys(l).forEach(c=>{l[c]===void 0&&delete l[c]});try{await E().ref(`groups/${t}/activity/${r}`).push(l)}catch(c){xi.error("Error logging activity:",c)}}async function Ci(t,r,n,o){const i=_(r)===_(o)?`🎾 ${r} removed themselves from ${n}`:`🎾 ${r} was removed from ${n} by ${o}`;try{const l=E(),s=(await l.ref(`groups/${t}/userNotifications`).once("value")).val()||{};for(const[d,g]of Object.entries(s)){const u=g.preferences||{};if(u.activityAlerts){if(d===_(o))continue;const h=u.unwatchedMembers||u.mutedMembers||[];if(h.includes(r)||h.includes(o))continue;await l.ref(`groups/${t}/userNotifications/${d}/items`).push().set({message:i,timestamp:Date.now(),read:!1,date:n})}}}catch(l){ge.error("Error sending removal notifications:",l)}}function zi(t){switch(t){case"singles":return"Singles";case"doubles":return"Doubles";default:return"Either"}}async function Si(t,r,n,o,a){const i=_(r)===_(o),l=[];if(a.playStyle&&l.push(zi(a.playStyle)),a.timeRange){const d=oe(a.timeRange.start,a.timeRange.end);d&&l.push(d)}a.playStyle==="singles"&&a.allowRotation===!1&&l.push("No 3s");const c=l.length>0?` (${l.join(", ")})`:"",s=i?`🎾 ${r} checked in for ${n}${c}`:`🎾 ${r} was added for ${n} by ${o}${c}`;try{const d=E(),u=(await d.ref(`groups/${t}/userNotifications`).once("value")).val()||{};ge.debug("Found userNotifications entries:",Object.keys(u));for(const[h,p]of Object.entries(u)){const v=p.preferences||{};if(ge.debug(`User ${h}:`,{activityAlerts:v.activityAlerts,unwatchedMembers:v.unwatchedMembers||v.mutedMembers}),v.activityAlerts){if(h===_(o)){ge.debug(`Skipping ${h} - is addedBy`);continue}if(h===_(r)){ge.debug(`Skipping ${h} - is player`);continue}const m=v.unwatchedMembers||v.mutedMembers||[];if(m.includes(r)||m.includes(o)){ge.debug(`Skipping ${h} - player/adder is unwatched`);continue}ge.debug(`Sending notification to ${h}`),await d.ref(`groups/${t}/userNotifications/${h}/items`).push().set({message:s,timestamp:Date.now(),read:!1,date:n}),ge.debug(`Notification sent to ${h}`)}}}catch(d){ge.error("Error sending check-in notifications:",d)}}async function ya(t,r){const n=Q.value[r]||[];if(n.length===0)return;const{matches:o}=sn(n),a={};o.forEach(l=>{if(l.type==="doubles"||l.type==="singles"){const c=l.players.map(s=>_(s.name)).sort().join(",");a[c]={type:l.type,players:l.players.map(s=>s.name)}}});const i=Eo[r]||{};ue.debug("Match state comparison:",{date:r,previousMatches:Object.keys(i).length,currentMatches:Object.keys(a).length,prevKeys:Object.keys(i),currentKeys:Object.keys(a)});for(const[l,c]of Object.entries(a))if(!i[l]){const s=$o(r),d=c.type==="doubles"?"Doubles":"Singles";for(const g of c.players){const u=c.players.filter(p=>_(p)!==_(g)),h=`✅ You're in ${d} for ${s} with ${u.join(", ")}`;try{const p=E(),m=(await p.ref(`groups/${t}/userNotifications/${_(g)}/preferences`).once("value")).val()||{};ue.debug(`Player "${g}" prefs:`,{matchConfirmations:m.matchConfirmations,willSend:m.matchConfirmations!==!1}),m.matchConfirmations!==!1?(await p.ref(`groups/${t}/userNotifications/${_(g)}/items`).push().set({message:h,timestamp:Date.now(),read:!1,date:r,type:"match_formed",matchType:d}),ue.info(`✅ Sent notification to ${g}: "${h}"`)):ue.debug(`❌ Skipped ${g} - matchConfirmations disabled`)}catch(p){ue.error(`Error sending match notification to ${g}:`,p)}}}for(const[l,c]of Object.entries(i))if(!a[l]){const s=$o(r),d=c.type==="doubles"?"Doubles":"Singles",g=n.map(x=>_(x.name)),u=c.players.filter(x=>g.includes(_(x))),h=c.players.filter(x=>!g.includes(_(x))),p=h.join(", "),v=d==="Doubles"?4-u.length:2-u.length,m=v===1?"Need 1 more player":`Need ${v} more players`,b=h.length>0?`⚠️ Your ${d} for ${s} is no longer confirmed - ${p} dropped out. ${m}.`:`⚠️ Your ${d} for ${s} is no longer confirmed.`;for(const x of c.players)try{const y=E(),z=(await y.ref(`groups/${t}/userNotifications/${_(x)}/preferences`).once("value")).val()||{};ue.debug(`Player "${x}" prefs:`,{matchConfirmations:z.matchConfirmations,willSend:z.matchConfirmations!==!1}),z.matchConfirmations!==!1?(await y.ref(`groups/${t}/userNotifications/${_(x)}/items`).push().set({message:b,timestamp:Date.now(),read:!1,date:r,type:"match_dissolved",matchType:d}),ue.info(`✅ Sent dissolved notification to ${x}: "${b}"`)):ue.debug(`❌ Skipped ${x} - matchConfirmations disabled`)}catch(y){ue.error(`Error sending dissolved match notification to ${x}:`,y)}}Eo[r]=a}async function hn(t,r,n,o,a,i){const l=o.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase()).replace("Forming 1","(forming)");let c;if(a==="added"){const s=i&&i.length>30?i.substring(0,30)+"...":i;c=`📝 ${n} added note to ${l}: "${s}"`}else if(a==="updated"){const s=i&&i.length>30?i.substring(0,30)+"...":i;c=`📝 ${n} updated note on ${l}: "${s}"`}else c=`📝 ${n} removed note from ${l}`;try{const s=E(),g=(await s.ref(`groups/${t}/userNotifications`).once("value")).val()||{};for(const[u,h]of Object.entries(g)){const p=h.preferences||{};if(p.activityAlerts){if(u===_(n)||(p.unwatchedMembers||p.mutedMembers||[]).includes(n))continue;await s.ref(`groups/${t}/userNotifications/${u}/items`).push().set({message:c,timestamp:Date.now(),read:!1,date:r})}}}catch(s){ge.error("Error sending note notifications:",s)}}async function $i(){const t=C.value,r=A.value;if(!(!t||!r))try{await U(`groups/${t}/checkins/${r}`).remove(),await U(`groups/${t}/matchNotes/${r}`).remove(),w("Day reset","success")}catch(n){le.error("Error resetting day:",n),w("Failed to reset day","error")}}const wr={};async function Ii(t,r){const n=C.value,o=A.value;if(!(!n||!o))try{const a=`${n}:${o}:${t}`,i=wr[a]??G.value[t]??"",l=k.value||"Unknown";await U(`groups/${n}/matchNotes/${o}/${t}`).set(r||null),r&&!i?(await ye(n,o,"note_added",l,l,{matchKey:t,noteContent:r}),await hn(n,o,l,t,"added",r),wr[a]=r,w("Note added","success")):r&&i&&r!==i?(await ye(n,o,"note_updated",l,l,{matchKey:t,noteContent:r,previousNote:i}),await hn(n,o,l,t,"updated",r),wr[a]=r,w("Note updated","success")):!r&&i&&(await ye(n,o,"note_removed",l,l,{matchKey:t,previousNote:i}),await hn(n,o,l,t,"removed"),delete wr[a],w("Note removed","info"))}catch(a){ue.error("Error saving match note:",a),w("Failed to save note","error")}}async function ao(t){const r=C.value;if(!r)return;const n=U(`groups/${r}/settings`);try{const a=(await n.once("value")).val()||{},i=a.members||[],l=a.memberDetails||{};if(i.includes(t.name)){w("Member already exists","error");return}const c=[...i,t.name].sort(),s={...l,[t.name]:{addedBy:t.addedBy,addedDate:new Date().toISOString(),phone:t.phone||"",email:t.email||"",notes:t.notes||""}};await n.update({members:c,memberDetails:s}),V.value=c,J.value=s;const d=A.value||new Date().toISOString().split("T")[0];await ye(r,d,"member_added",t.name,t.addedBy,{contact:t.phone||t.email||void 0,notes:t.notes||void 0});const g=`${window.location.origin}${window.location.pathname}?group=${r}`;be.value={action:"invite",name:t.name,date:d,groupName:Y.value||"Tennis Group",groupUrl:g,groupPin:I.value.groupPin||""},xe.value=!0}catch(o){cn.error("Error adding member:",o),w("Failed to add member","error")}}async function wa(t){const r=C.value;if(!r)return;const n=U(`groups/${r}/settings`);try{const a=(await n.once("value")).val()||{},i=a.members||[],l=a.memberDetails||{},c=i.filter(u=>u!==t),s={...l};delete s[t],await n.update({members:c,memberDetails:s}),V.value=c,J.value=s;const d=A.value||new Date().toISOString().split("T")[0],g=k.value||"Admin";await ye(r,d,"member_removed",t,g),w(`${t} removed from members`,"info")}catch(o){cn.error("Error removing member:",o),w("Failed to remove member","error")}}async function Ei(t,r){const n=C.value;if(!n)return!1;const o=U(`groups/${n}/settings`);try{const l=((await o.once("value")).val()||{}).memberDetails||{},c=l[t]||{},s={...l,[t]:{...c,phone:r.phone??c.phone??"",email:r.email??c.email??"",notes:r.notes??c.notes??"",shareContactInDirectory:r.shareContactInDirectory??c.shareContactInDirectory??!1,shareNotesInDirectory:r.shareNotesInDirectory??c.shareNotesInDirectory??!1}};return await o.update({memberDetails:s}),J.value=s,w("Profile updated","success"),!0}catch(a){return cn.error("Error updating member details:",a),w("Failed to update profile","error"),!1}}async function ka(t,r){const n=C.value;if(!n)return!1;const o=r.trim();if(!o)return w("Name cannot be empty","error"),!1;if(o===t)return!0;const a=U(`groups/${n}/settings`);try{const l=(await a.once("value")).val()||{},c=l.members||[],s=l.memberDetails||{};if(c.some(y=>y.toLowerCase()===o.toLowerCase()&&y!==t))return w("A member with this name already exists","error"),!1;const d=c.map(y=>y===t?o:y).sort(),g={...s};g[t]&&(g[o]=g[t],delete g[t]);const h={...l.renamedMembers||{},[t]:o};await a.update({members:d,memberDetails:g,renamedMembers:h}),V.value=d,J.value=g,k.value===t&&(k.value=o,localStorage.setItem(`sessionUser_${n}`,o));const p=E(),m=(await p.ref(`groups/${n}/checkins`).once("value")).val()||{};for(const[y,S]of Object.entries(m))if(S&&typeof S=="object"){const z=Object.values(S);let $=!1;const P=z.map(X=>X&&X.name===t?($=!0,{...X,name:o}):X);$&&await p.ref(`groups/${n}/checkins/${y}`).set(P)}const b=A.value||new Date().toISOString().split("T")[0],x=k.value||"Admin";return await ye(n,b,"member_renamed",o,x,{oldName:t}),w(`${t} renamed to ${o}`,"success"),!0}catch(i){return cn.error("Error renaming member:",i),w("Failed to rename member","error"),!1}}function Di(t){return t!==null&&typeof t=="object"&&"matches"in t&&"arrangedBy"in t&&"arrangedAt"in t}const N=f(null);async function Mi(t){const r=C.value,n=A.value;if(!r||!n)return;const o=k.value||"Admin",a={...t,arrangedBy:o,arrangedAt:Date.now()};try{await U(`groups/${r}/matchArrangements/${n}`).set(a),N.value=a;const i=Object.keys(t.matches).length,l=Object.values(t.matches).reduce((g,u)=>g+(u.players?.length||0),0)+(t.unassigned?.length||0),c=[],s=Object.keys(t.matches).sort();for(const g of s){const h=t.matches[g]?.players||[];if(h.length>0){const p=g.replace("-"," ").replace(/\b\w/g,m=>m.toUpperCase()),v=g.startsWith("singles")&&h.length===2?`${h[0]} vs ${h[1]}`:h.join(", ");c.push(`${p}: ${v}`)}}t.unassigned?.length>0&&c.push(`Unassigned: ${t.unassigned.join(", ")}`);const d=c.join(" | ");await ye(r,n,"arrangement_saved",o,o,{matchCount:i,playerCount:l,arrangementDetails:d}),w("Match arrangement saved","success")}catch(i){qr.error("Error saving match arrangement:",i),w("Failed to save arrangement","error")}}async function Ai(){const t=C.value,r=A.value;if(!t||!r)return;const n=k.value||"Admin";try{await U(`groups/${t}/matchArrangements/${r}`).remove(),N.value=null,await ye(t,r,"arrangement_cleared",n,n),w("Arrangement cleared - using auto-organization","info")}catch(o){qr.error("Error clearing match arrangement:",o),w("Failed to clear arrangement","error")}}function Ri(){T(()=>{let t=null,r=null;const n=se(()=>{const o=C.value,a=A.value;if(t&&r&&t.off("value",r),!o||o==="admin"||!a){N.value=null;return}t=U(`groups/${o}/matchArrangements/${a}`),r=t.on("value",i=>{const l=i.val();N.value=Di(l)?l:null})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function je({isOpen:t,onClose:r,title:n,subtitle:o,children:a,showCloseButton:i=!0}){return t?e("div",{class:"modal active",onClick:l=>{l.target===l.currentTarget&&r&&r()},children:e("div",{class:"modal-content",onClick:l=>l.stopPropagation(),children:[e("div",{class:"modal-header",children:[e("div",{children:[e("h2",{children:n}),o&&e("p",{style:"font-size: 12px; color: #666; margin: 4px 0 0 0;",children:o})]}),i&&r&&e("button",{class:"close-btn",onClick:r,children:"×"})]}),a]})}):null}f(!1);f(!1);f(!1);f([]);f(!1);const dn=f([]);f(!1);let ft=null;function Pi(){const t=C.value,r=k.value;if(!(!t||!r)){ft&&ft();try{const o=E().ref(`groups/${t}/userNotifications/${_(r)}/items`),a=o.on("value",i=>{const l=i.val()||{},c=Object.entries(l).map(([s,d])=>({id:s,...d}));dn.value=c.sort((s,d)=>d.timestamp-s.timestamp)});ft=()=>{o.off("value",a)}}catch(n){console.error("Error subscribing to notifications:",n)}}}async function Ti(t){const r=C.value,n=k.value;if(!(!r||!n))try{await E().ref(`groups/${r}/userNotifications/${_(n)}/items/${t}/read`).set(!0)}catch(o){console.error("Error marking notification as read:",o)}}function Li(){T(()=>{const t=C.value,r=k.value;return t&&r&&Pi(),()=>{ft&&(ft(),ft=null)}},[C.value,k.value])}async function Ni(t){const r=C.value,n=k.value;if(!(!r||!n))try{await E().ref(`groups/${r}/userNotifications/${_(n)}/items/${t}`).remove()}catch(o){console.error("Error clearing notification:",o)}}async function Bi(){const t=C.value,r=k.value;if(!(!t||!r))try{const n=E(),o={};dn.value.forEach(a=>{a.read||(o[`${a.id}/read`]=!0)}),Object.keys(o).length>0&&await n.ref(`groups/${t}/userNotifications/${_(r)}/items`).update(o)}catch(n){console.error("Error marking all as read:",n)}}const ae=f("checkin");function Fi(){ae.value="profile"}const gn=Fe(()=>dn.value.filter(t=>!t.read).length),ji=[{id:"checkin",label:"Check-in",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>'},{id:"matches",label:"My Games",icon:'<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M5 5c2 3 2 6 2 7s0 4-2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M19 5c-2 3-2 6-2 7s0 4 2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M5 5c2 3 2 6 2 7s0 4-2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M19 5c-2 3-2 6-2 7s0 4 2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>'},{id:"directory",label:"Team",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>'},{id:"notifications",label:"Alerts",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>'}];function Ui(){const[t,r]=De(!1);return T(()=>{const n=requestAnimationFrame(()=>{requestAnimationFrame(()=>{r(!0)})});return()=>cancelAnimationFrame(n)},[]),e("nav",{style:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",height:"calc(56px + env(safe-area-inset-bottom, 0px))",paddingBottom:"env(safe-area-inset-bottom, 0px)",background:"#fff",borderTop:"1px solid #e0e0e0",display:"flex",justifyContent:"space-around",alignItems:"flex-start",paddingTop:"4px",zIndex:1e3,boxShadow:"var(--shadow-lg, 0 -2px 10px rgba(0,0,0,0.1))"},children:ji.map(n=>{const o=ae.value===n.id,a=n.id==="notifications"&&gn.value>0;return e("button",{onClick:()=>{ae.value=n.id},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px",background:"none",border:"none",padding:"8px 12px",cursor:"pointer",color:o?"var(--color-primary, #2C6E49)":"#666",position:"relative",minWidth:"60px"},children:[n.useImageIcon?e("img",{src:o?n.activeIcon:n.icon,alt:n.label,style:{width:"24px",height:"24px",opacity:o?1:.7}}):e("div",{style:{position:"relative"},dangerouslySetInnerHTML:{__html:o?n.activeIcon:n.icon}}),a&&e("span",{style:{position:"absolute",top:"2px",right:"8px",background:"#f44336",color:"white",fontSize:"10px",padding:"1px 5px",borderRadius:"10px",minWidth:"16px",textAlign:"center"},children:gn.value>9?"9+":gn.value}),e("span",{style:{fontSize:"10px",fontWeight:o?"600":"400"},children:n.label})]},n.id)})})}const Oi=""+new URL("wimbledon-xfTrdB-N.png",import.meta.url).href,Wi=""+new URL("usopen-Bs-XeyJ-.png",import.meta.url).href,Rr=f(!1),Gt=f(!1),kr=[{id:"default",name:"Classic",color:"#2C6E49",lightBg:"#E8F5E9",hoverBg:"#C8E6C9",logo:null,emoji:"🎾"},{id:"wimbledon",name:"Wimbledon",color:"#1B5E20",lightBg:"#E8F5E9",hoverBg:"#C8E6C9",logo:Oi,emoji:"🏆"},{id:"roland-garros",name:"Roland-Garros",color:"#cc4e0e",lightBg:"#FBE9E7",hoverBg:"#FFCCBC",logo:"https://images.prismic.io/fft-rg-site%2F95765448-c7fa-428b-b565-8368dba90b17_logo.svg",emoji:"🗼"},{id:"australian-open",name:"Australian Open",color:"#0277BD",lightBg:"#E1F5FE",hoverBg:"#B3E5FC",logo:"https://ausopen.com/sites/default/files/styles/medium/public/ao_blue_1.png?itok=dcy08jHH",emoji:"🦘"},{id:"us-open",name:"US Open",color:"#0D47A1",lightBg:"#E3F2FD",hoverBg:"#BBDEFB",logo:Wi,emoji:"🗽"}];function Do(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Hi(){const[t,r]=De(Do()),[n,o]=De(!1),a=to(null);T(()=>{const s=setInterval(()=>{r(Do())},1e3);return()=>clearInterval(s)},[]),T(()=>{function s(d){a.current&&!a.current.contains(d.target)&&o(!1)}return n&&document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[n]);const i=I.value?.theme||"default",l=kr.find(s=>s.id===i)||kr[0],c=async s=>{ma(s==="default"?void 0:s);const d=C.value;if(d)try{await E().ref(`groups/${d}/settings/theme`).set(s==="default"?null:s),I.value={...I.value,theme:s==="default"?void 0:s};const u=kr.find(h=>h.id===s)?.name||"Classic";w(`Theme: ${u}`,"success")}catch(g){console.error("Error saving theme:",g)}o(!1)};return e("h1",{style:"display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-md, 8px);",children:[e("div",{ref:a,style:{position:"relative",display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",minWidth:0},children:[e("button",{onClick:s=>{s.stopPropagation(),t&&o(!n)},title:t?"Change theme":l.name,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",background:t?"var(--color-bg-card, white)":"transparent",border:t?`2px solid ${l.color}`:"none",borderRadius:"var(--radius-full, 50%)",cursor:t?"pointer":"default",fontSize:"var(--font-size-lg, 16px)",padding:l.logo?"3px":"0",flexShrink:0,boxShadow:t?"var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))":"none"},className:t?"hover-admin-badge":"",children:[l.logo?e("img",{src:l.logo,alt:l.name,style:{width:"100%",height:"100%",objectFit:"contain"},onError:s=>{const d=s.target;d.style.display="none";const g=d.nextElementSibling;g&&(g.style.display="block")}}):null,e("span",{style:{display:l.logo?"none":"block"},children:l.emoji})]}),e("span",{id:"groupNameDisplay",style:"font-size: var(--font-size-xl, 18px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; padding-top: 2px;",children:Y.value||"Tennis Coordinator"}),n&&t&&e("div",{style:{position:"absolute",top:"32px",left:"0",background:"var(--color-bg-card, white)",borderRadius:"var(--radius-xl, 12px)",boxShadow:"var(--shadow-lg, 0 4px 20px rgba(0,0,0,0.15))",padding:"var(--spacing-md, 8px)",minWidth:"180px",zIndex:1e3},children:kr.map(s=>e("button",{onClick:()=>c(s.id),style:{display:"flex",alignItems:"center",gap:"var(--spacing-lg, 10px)",width:"100%",padding:"var(--spacing-lg, 10px) var(--spacing-xl, 12px)",background:i===s.id?`${s.color}15`:"transparent",border:"none",borderRadius:"var(--radius-lg, 8px)",cursor:"pointer",textAlign:"left",transition:"background 0.2s"},onMouseEnter:d=>{i!==s.id&&(d.currentTarget.style.background="var(--color-bg-muted, #f5f5f5)")},onMouseLeave:d=>{i!==s.id&&(d.currentTarget.style.background="transparent")},children:[e("span",{style:{width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center"},children:s.logo?e("img",{src:s.logo,alt:s.name,style:{width:"24px",height:"24px",objectFit:"contain"},onError:d=>{d.target.style.display="none"}}):e("span",{style:{fontSize:"var(--font-size-2xl, 20px)"},children:s.emoji})}),e("span",{style:{flex:1,fontWeight:i===s.id?"600":"400",color:i===s.id?s.color:"var(--color-text-primary, #333)"},children:s.name}),i===s.id&&e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:s.color,children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})})]},s.id))})]}),k.value&&e("button",{onClick:Fi,style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",background:t?"var(--color-warning-light, #FFF3E0)":l.lightBg,border:`1px solid ${t?"var(--color-warning, #FF9800)":l.color}40`,borderLeft:t?"3px solid var(--color-warning, #FF9800)":`3px solid ${l.color}`,borderRadius:"var(--radius-lg, 8px)",padding:"var(--spacing-sm, 6px) var(--spacing-lg, 10px)",fontSize:"var(--font-size-base, 14px)",fontWeight:"600",color:"var(--color-text-primary, #333)",cursor:"pointer",boxShadow:"var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",transition:"all 0.2s ease"},onMouseEnter:s=>{const d=s.currentTarget;d.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))",d.style.transform="translateY(-1px)",d.style.background=t?"#FFE0B2":l.hoverBg},onMouseLeave:s=>{const d=s.currentTarget;d.style.boxShadow="var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",d.style.transform="translateY(0)",d.style.background=t?"var(--color-warning-light, #FFF3E0)":l.lightBg},onMouseDown:s=>{const d=s.currentTarget;d.style.transform="translateY(0)",d.style.boxShadow="var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.1))"},onMouseUp:s=>{const d=s.currentTarget;d.style.transform="translateY(-1px)",d.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))"},children:[e("span",{style:{maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:k.value}),t&&e("span",{style:{background:"var(--color-warning, #FF9800)",color:"white",fontSize:"var(--font-size-2xs, 9px)",padding:"1px var(--spacing-xs, 4px)",borderRadius:"var(--radius-md, 4px)",fontWeight:"600",letterSpacing:"0.5px"},children:"ADMIN"}),e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",style:{opacity:.5,marginLeft:"-2px"},children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]})}const _r=f(""),It=f("");function Gi({isOpen:t,groupName:r,correctPin:n,onSuccess:o}){const a=l=>{l.preventDefault(),_r.value===n?(It.value="",_r.value="",o()):(It.value="Invalid PIN. Please try again.",w("Invalid PIN","error"))},i=l=>{_r.value=l.target.value,It.value=""};return e(je,{isOpen:t,title:"",showCloseButton:!1,children:[e("div",{class:"pin-modal-content",children:[e("div",{class:"pin-header",children:[e("p",{class:"tennis-icon",children:"🎾"}),e("h2",{children:"Welcome to"}),e("p",{class:"group-name",children:r||"Tennis Coordinator"})]}),e("p",{class:"pin-instruction",children:"Enter the group PIN to access check-ins"}),e("form",{onSubmit:a,children:[e("input",{type:"password",inputMode:"numeric",pattern:"[0-9]*",placeholder:"Enter PIN",value:_r.value,onInput:i,class:"pin-input",autoFocus:!0}),It.value&&e("p",{class:"error-message",children:It.value}),e("button",{type:"submit",class:"pin-submit-btn",children:"Enter"})]}),e("p",{class:"pin-help",children:"Don't know the PIN? Ask your group admin."})]}),e("style",{children:`
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
      `})]})}const vt=f(""),Vt=f(""),Yt=f(""),qe=f(""),mt=f(""),xt=f(""),qt=f(""),Kt=f(""),io=f(!0),Jt=f(""),Nn=f(!1);function Vi(){const t=C.value;if(!t)return!1;const r=`adminAuth_${t}`;return sessionStorage.getItem(r)==="true"}function Yi(){const t=C.value;t&&(sessionStorage.setItem(`adminAuth_${t}`,"true"),Nn.value=!0)}function qi(){vt.value=Y.value||"",Vt.value=I.value.adminPin||"",Yt.value=I.value.groupPin||"",qe.value=I.value.location?.name||"",mt.value=I.value.location?.lat?.toString()||"",xt.value=I.value.location?.lon?.toString()||"",qt.value=I.value.groupDescription||"",Kt.value=I.value.groupRules||"",Nn.value=Vi(),io.value=!Nn.value&&!!I.value.adminPin,Jt.value=""}async function Ki(t=!1){const r=C.value;if(r)try{const o=E().ref(`groups/${r}/settings`),a={groupName:vt.value,adminPin:Vt.value,groupPin:Yt.value,groupDescription:qt.value||null,groupRules:Kt.value||null};qe.value&&mt.value&&xt.value&&(a.location={name:qe.value,lat:parseFloat(mt.value),lon:parseFloat(xt.value)}),await o.update(a),Y.value=vt.value,I.value={...I.value,adminPin:Vt.value,groupPin:Yt.value,location:qe.value?{name:qe.value,lat:parseFloat(mt.value),lon:parseFloat(xt.value)}:void 0,groupDescription:qt.value||void 0,groupRules:Kt.value||void 0},w("Settings saved","success"),t&&Bn()}catch(n){console.error("Error saving settings:",n),w("Failed to save settings","error")}}function Mo(){Jt.value===I.value.adminPin?(Yi(),io.value=!1,Gt.value=!1,w("Admin mode enabled","success")):(w("Incorrect PIN","error"),Jt.value="")}function Bn(){Gt.value=!1}function Ji(){return Gt.value&&vt.value===""&&Y.value&&qi(),e(je,{isOpen:Gt.value,onClose:Bn,title:"Admin Settings",subtitle:`Managing: ${Y.value}`,children:io.value?e("div",{style:"padding: var(--spacing-3xl, 20px); text-align: center;",children:[e("p",{style:"margin-bottom: var(--spacing-2xl, 16px); color: var(--color-text-secondary, #666);",children:"Enter admin PIN to access settings"}),e("input",{type:"password",placeholder:"Admin PIN",value:Jt.value,onInput:t=>{Jt.value=t.target.value},onKeyPress:t=>{t.key==="Enter"&&Mo()},style:"width: 100%; max-width: 200px; padding: var(--spacing-xl, 12px); text-align: center; font-size: var(--font-size-xl, 18px); border: 2px solid var(--color-border, #e0e0e0); border-radius: var(--radius-lg, 8px); margin-bottom: var(--spacing-2xl, 16px);"}),e("br",{}),e("button",{onClick:Mo,style:"padding: var(--spacing-xl, 12px) 32px; background: var(--color-primary, #2C6E49); color: white;",children:"Submit"})]}):e(R,{children:[e("div",{style:"margin-bottom: var(--spacing-2xl, 16px);",children:e("div",{style:"display: flex; justify-content: space-between; align-items: center;",children:[e("h3",{style:"margin: 0; color: var(--color-text-primary, #333);",children:"Group Settings"}),e("span",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-secondary, #666); background: var(--color-bg-muted, #f5f5f5); padding: 2px var(--spacing-md, 8px); border-radius: var(--radius-lg, 10px);",children:"Click Save to apply"})]})}),e("div",{class:"pref-section",children:[e("h3",{children:"Group Name"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Display name for this tennis group"}),e("input",{type:"text",placeholder:"e.g., Tue/Thu Midday Doubles",value:vt.value,onInput:t=>{vt.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Group Story"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Tell your group's story - when/where you play, how it started, etc."}),e("textarea",{placeholder:"e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts...",value:qt.value,onInput:t=>{qt.value=t.target.value},rows:3,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Rules & Tips"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"House rules, etiquette, and tips for new members (one per line)"}),e("textarea",{placeholder:`e.g.,
Check in by 10am on game days
Bring water and sunscreen
New balls provided by rotating member...`,value:Kt.value,onInput:t=>{Kt.value=t.target.value},rows:4,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Admin PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Required to access admin settings"}),e("input",{type:"text",value:Vt.value,onInput:t=>{Vt.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Group PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Share this PIN with all group members to access the app"}),e("input",{type:"text",value:Yt.value,onInput:t=>{Yt.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Weather Location"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Set the location for weather forecasts"}),e("input",{type:"text",placeholder:"Location name (e.g., Los Gatos, CA)",value:qe.value,onInput:t=>{qe.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-md, 8px);"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);",children:[e("input",{type:"number",step:"0.0001",placeholder:"Latitude",value:mt.value,onInput:t=>{mt.value=t.target.value},style:"flex: 1;"}),e("input",{type:"number",step:"0.0001",placeholder:"Longitude",value:xt.value,onInput:t=>{xt.value=t.target.value},style:"flex: 1;"})]}),e("p",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);",children:["Tip: Use"," ",e("a",{href:"https://www.latlong.net/",target:"_blank",style:"color: var(--color-primary, #2C6E49);",children:"latlong.net"})," ","to find coordinates"]})]}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-top: var(--spacing-2xl, 16px);",children:[e("button",{onClick:Bn,style:"flex: 1; background: var(--color-border, #e0e0e0); color: var(--color-text-primary, #333);",children:"Close"}),e("button",{onClick:()=>Ki(!0),style:"flex: 1; background: var(--color-primary, #2C6E49); color: white;",children:"Save & Close"})]})]})})}const _a={login:{label:"Logins",actions:["user_login"]},checkin:{label:"Check-ins",actions:["check-in","checkin"]},removal:{label:"Removals",actions:["removal"]},shared:{label:"Shared",actions:["whatsapp_share"]},notes:{label:"Notes",actions:["notes_saved","note_added","note_updated","note_removed"]},members:{label:"Members",actions:["member_added","member_removed","member_renamed"]},arrangements:{label:"Arrangements",actions:["arrangement_saved","arrangement_cleared"]}},lt=f(!1),Qt=f([]),Fn=f(!1),me=f(new Set);async function Qi(){const t=C.value;if(t){Fn.value=!0;try{const r=E(),n=[],a=(await r.ref(`groups/${t}/activity`).once("value")).val();if(a){for(const[i,l]of Object.entries(a))if(l)for(const[c,s]of Object.entries(l))n.push({...s,date:i,firebaseKey:c})}n.sort((i,l)=>l.timestamp-i.timestamp),Qt.value=n}catch(r){console.error("Error loading activity:",r)}finally{Fn.value=!1}}}async function Xi(t){const r=C.value;if(!(!r||!t.firebaseKey||!t.date)&&confirm("Remove this activity entry?"))try{await E().ref(`groups/${r}/activity/${t.date}/${t.firebaseKey}`).remove(),Qt.value=Qt.value.filter(o=>!(o.date===t.date&&o.firebaseKey===t.firebaseKey))}catch(n){console.error("Error deleting activity:",n),alert("Failed to delete activity")}}function Zi(t){return oo(t)}function el(t){switch(t){case"check-in":case"checkin":return"✅";case"removal":return"❌";case"member_added":return"👤";case"member_removed":return"🚫";case"member_renamed":return"✏️";case"whatsapp_share":return"📤";case"notes_saved":case"note_added":return"📝";case"note_updated":return"✏️";case"note_removed":return"🗑️";case"user_login":return"🔓";case"arrangement_saved":return"🔀";case"arrangement_cleared":return"↩️";default:return"📋"}}function tl(t){const{action:r,player:n,by:o,playStyle:a,timeRange:i,matchKey:l,type:c}=t;switch(r){case"check-in":case"checkin":{let s=`${n} checked in`;return o&&o!==n&&(s+=` (by ${o})`),a&&(s+=` - ${ln(a)}`,(i?.start||i?.end)&&(s+=` (${i.start||"anytime"}–${i.end||"anytime"})`)),s}case"removal":return o&&o!==n?`${o} removed ${n}`:`${n} removed themselves`;case"member_added":return`${o} added ${n} as member`;case"member_removed":return`${o} removed ${n} from members`;case"member_renamed":return`${o} renamed ${t.oldName} to ${n}`;case"whatsapp_share":{let d=`${o} shared ${c==="matches"?"matches":c==="checkin"?"check-in":"removal"} to WhatsApp`;return n&&n!==o&&(d+=` (for ${n})`),d}case"notes_saved":case"note_added":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} added note to ${s}${d}`}case"note_updated":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} updated note on ${s}${d}`}case"note_removed":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match";return`${o} removed note from ${s}`}case"user_login":return`${n} logged in`;case"arrangement_saved":{const{matchCount:s}=t;let d=`${o} arranged matches`;return s&&(d+=` (${s} match${s>1?"es":""})`),d}case"arrangement_cleared":return`${o} cleared arrangement (back to auto)`;default:return`${n} - ${r}`}}function rl(t){const r=new Set(me.value);r.has(t)?r.delete(t):r.add(t),me.value=r}function nl(){if(me.value.size===0)return Qt.value;const t=new Set;return me.value.forEach(r=>{_a[r].actions.forEach(n=>t.add(n))}),Qt.value.filter(r=>t.has(r.action))}function ol(){Rr.value=!1,lt.value=!1,me.value=new Set}function al(){T(()=>{Rr.value&&Qi()},[Rr.value]);const t=nl(),r={};return lt.value?t.forEach(n=>{r[n.date]||(r[n.date]=[]),r[n.date].push(n)}):t.forEach(n=>{const o=new Date(n.timestamp).toISOString().split("T")[0];r[o]||(r[o]=[]),r[o].push(n)}),e(je,{isOpen:Rr.value,onClose:ol,title:"Activity History",children:[e("div",{style:"display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;",children:[Object.entries(_a).map(([n,o])=>{const a=me.value.has(n);return e("button",{onClick:()=>rl(n),style:{padding:"4px 10px",fontSize:"12px",border:a?"1px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #ddd)",borderRadius:"var(--radius-2xl, 16px)",background:a?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, #fff)",color:a?"var(--color-primary, #2E7D32)":"var(--color-text-secondary, #666)",cursor:"pointer",fontWeight:a?"500":"400"},children:o.label},n)}),me.value.size>0&&e("button",{onClick:()=>{me.value=new Set},style:{padding:"4px 10px",fontSize:"var(--font-size-sm, 12px)",border:"1px solid var(--color-error, #f44336)",borderRadius:"var(--radius-2xl, 16px)",background:"var(--color-bg-card, #fff)",color:"var(--color-error, #f44336)",cursor:"pointer"},children:"Clear"})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin: 0;",children:[lt.value?"Grouped by play date":"Grouped by when changes were made",me.value.size>0&&` (${t.length} filtered)`]}),e("label",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); cursor: pointer; display: flex; align-items: center; gap: 4px;",children:[e("input",{type:"checkbox",checked:lt.value,onChange:n=>{lt.value=n.target.checked}}),"Group by Play Date"]})]}),e("div",{style:"max-height: 400px; overflow-y: auto;",children:Fn.value?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:"Loading..."}):t.length===0?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:me.value.size>0?"No matching activities":"No activity recorded yet"}):Object.entries(r).sort(([n],[o])=>o.localeCompare(n)).map(([n,o])=>e("div",{children:[e("div",{style:"font-weight: bold; color: var(--color-text-secondary, #666); margin-top: 12px; padding-bottom: 4px; border-bottom: 1px solid var(--color-border, #ddd);",children:H(n)}),o.map((a,i)=>e("div",{style:"padding: 10px; background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-md, 6px); font-size: var(--font-size-base, 14px); margin-top: 8px; position: relative;",children:e("div",{style:"display: flex; align-items: flex-start; gap: 6px;",children:[e("span",{children:el(a.action)}),e("div",{style:"flex: 1;",children:[e("div",{style:"white-space: pre-wrap;",children:tl(a)}),a.arrangementDetails&&e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-top: 4px; background: var(--color-bg-card, #fff); padding: 6px 8px; border-radius: var(--radius-sm, 4px); border: 1px solid var(--color-border, #e0e0e0);",children:a.arrangementDetails}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #999); margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap;",children:[e("span",{children:Zi(a.timestamp)}),lt.value?e("span",{style:"color: var(--color-text-secondary, #666);",children:["changed on"," ",H(new Date(a.timestamp).toISOString().split("T")[0])]}):e("span",{style:"color: var(--color-primary, #2C6E49);",children:["for ",H(a.date)]})]})]}),e("button",{onClick:()=>Xi(a),title:"Remove this activity",style:{background:"none",border:"none",padding:"var(--spacing-xs, 4px)",cursor:"pointer",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-lg, 16px)",lineHeight:"1",borderRadius:"var(--radius-sm, 4px)"},className:"hover-danger",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})},i))]},n))})]})}const lo=f(!1),so=f(""),co=f(""),po=f("");function uo(t){const r=Y.value||"our tennis group",n=C.value,o=window.location.href.split("?")[0]+"?group="+n,a=I.value.groupPin||"";return`Hi ${t}! You've been added to ${r} tennis coordination.

Check in for upcoming matches here:
${o}

PIN: ${a}

Just select your name and check in when you can play!`}function il(t,r){const n=t.replace(/[\s\-\(\)]/g,""),o=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(o)?`sms:${n}&body=${encodeURIComponent(r)}`:`sms:${n}?body=${encodeURIComponent(r)}`}function ll(t,r,n){return`mailto:${t}?subject=${encodeURIComponent(r)}&body=${encodeURIComponent(n)}`}async function sl(t){const r=uo(t),n=Y.value||"Tennis Group";try{await navigator.share({title:`Join ${n}`,text:r}),Ke(),w("Shared successfully!","success")}catch(o){o.name!=="AbortError"&&(console.error("Share failed:",o),Ca(t))}}async function Ca(t){const r=uo(t);try{await navigator.clipboard.writeText(r),Ke(),w("Message copied! Paste in SMS or email.","success")}catch{const o=document.createElement("textarea");o.value=r,o.style.position="fixed",o.style.left="-9999px",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),Ke(),w("Message copied! Paste in SMS or email.","success")}}function Ke(){lo.value=!1,so.value="",co.value="",po.value=""}function cl(t,r,n){so.value=t,co.value=r||"",po.value=n||"",lo.value=!0}function dl(){const t=so.value,r=co.value,n=po.value,o=uo(t),a=Y.value||"Tennis Group",i=typeof navigator<"u"&&navigator.share!==void 0;return e(je,{isOpen:lo.value,onClose:Ke,title:"",showCloseButton:!1,children:e("div",{style:{textAlign:"center",padding:"10px 0"},children:[e("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:["Invite ",t,"?"]}),e("p",{style:{margin:"0 0 16px 0",color:"#666",fontSize:"14px"},children:"Send them an invite with the group link and PIN"}),e("div",{style:{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"},children:[r&&e("a",{href:il(r,o),onClick:()=>setTimeout(Ke,500),style:{background:"#25D366",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[e("span",{children:"📱"})," Text ",r]}),n&&e("a",{href:ll(n,`You're invited to ${a}`,o),onClick:()=>setTimeout(Ke,500),style:{background:"#4285F4",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[e("span",{children:"📧"})," Email"]}),i&&e("button",{onClick:()=>sl(t),style:{background:"#9C27B0",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"},children:[e("span",{children:"📤"})," Other"]}),e("button",{onClick:()=>Ca(t),style:{background:"#607D8B",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"},children:[e("span",{children:"📋"})," Copy"]})]}),e("button",{onClick:Ke,style:{marginTop:"12px",background:"none",border:"none",color:"#999",fontSize:"14px",cursor:"pointer"},children:"Skip"})]})})}const za=f(!1),kt=f(null),Kr=f(""),Xt=f(""),Zt=f(""),er=f(""),Oe=f(""),Jr=f(!1),tr=f(""),rr=f(""),nr=f(""),or=f("");async function pl(){const t=tr.value.trim();if(!t){w("Please enter member name","error");return}const r=rr.value.trim(),n=nr.value.trim();await ao({name:t,phone:r,email:n,notes:or.value.trim(),addedBy:k.value||"Admin"}),tr.value="",rr.value="",nr.value="",or.value="",Jr.value=!1}function Sa(){tr.value="",rr.value="",nr.value="",or.value="",Jr.value=!1}function ul(t){confirm(`Remove ${t} from the group?`)&&wa(t)}function hl(t){kt.value=t,Kr.value=t;const r=J.value[t]||{};Xt.value=r.phone||"",Zt.value=r.email||"",er.value=r.notes||""}async function gl(){const t=kt.value;if(!t)return;const r=C.value;if(!r)return;const n=Kr.value.trim();try{if(n!==t&&!await ka(t,n))return;const o=n!==t?n:t;await E().ref(`groups/${r}/settings/memberDetails/${o}`).update({phone:Xt.value,email:Zt.value,notes:er.value}),J.value={...J.value,[o]:{...J.value[o]||{},phone:Xt.value,email:Zt.value,notes:er.value}},kt.value=null,n===t&&w("Member updated","success")}catch(o){console.error("Error updating member:",o),w("Failed to update member","error")}}function fl(){za.value=!1,kt.value=null,Oe.value="",Sa()}function vl(){const t=V.value,r=J.value,n=t.filter(o=>o.toLowerCase().includes(Oe.value.toLowerCase())).sort((o,a)=>o.localeCompare(a));return e(je,{isOpen:za.value,onClose:fl,title:"Manage Members",subtitle:`${t.length} members in group`,children:[kt.value&&e("div",{style:"position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1001;",children:e("div",{style:"background: white; padding: 24px; border-radius: 12px; max-width: 400px; width: 90%;",children:[e("h3",{style:"margin-top: 0;",children:"Edit Member"}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Name"}),e("input",{type:"text",placeholder:"Member name",value:Kr.value,onInput:o=>{Kr.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Phone"}),e("input",{type:"tel",placeholder:"Phone number",value:Xt.value,onInput:o=>{Xt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Email"}),e("input",{type:"email",placeholder:"Email address",value:Zt.value,onInput:o=>{Zt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 16px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Notes"}),e("textarea",{placeholder:"Notes (skill level, etc.)",rows:2,value:er.value,onInput:o=>{er.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; box-sizing: border-box;"})]}),e("div",{style:"display: flex; gap: 8px;",children:[e("button",{onClick:()=>{kt.value=null},style:"flex: 1; background: #ccc; color: #333;",children:"Cancel"}),e("button",{onClick:gl,style:"flex: 1; background: var(--color-primary, #2C6E49); color: white;",children:"Save"})]})]})}),e("div",{style:"margin-bottom: 16px;",children:e("div",{style:"position: relative;",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%);",children:e("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"})}),e("input",{type:"text",placeholder:"Search members...",value:Oe.value,onInput:o=>{Oe.value=o.target.value},style:"width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"}),Oe.value&&e("button",{onClick:()=>{Oe.value=""},style:"position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 0;",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})})]})}),e("div",{style:"max-height: 400px; overflow-y: auto; margin-bottom: 16px;",children:n.length===0?e("div",{style:"text-align: center; padding: 20px; color: #888;",children:Oe.value?"No members found":"No members yet"}):n.map(o=>{const a=r[o],i=a&&(a.phone||a.email||a.addedBy),l=a&&(a.phone||a.email),c=a?.addedDate?new Date(a.addedDate).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):null;return e("div",{style:"flex-direction: column; align-items: flex-start; padding: 12px; background: #f9f9f9; border-radius: 8px; margin-bottom: 8px;",children:[e("div",{style:"display: flex; justify-content: space-between; width: 100%; align-items: center;",children:[e("span",{style:"font-weight: 500;",children:o}),e("div",{style:"display: flex; gap: 4px;",children:[e("button",{onClick:()=>hl(o),style:{background:"rgba(76, 175, 80, 0.1)",color:"var(--color-primary, #2C6E49)",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Edit",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})}),l&&e("button",{onClick:()=>cl(o,a?.phone,a?.email),style:{background:"rgba(33, 150, 243, 0.1)",color:"#2196F3",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Invite",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})})}),e("button",{onClick:()=>ul(o),style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Remove",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})]}),i&&e("div",{style:"font-size: 12px; color: #666; margin-top: 8px; padding-left: 12px; border-left: 3px solid var(--color-primary, #2C6E49);",children:[a?.addedBy&&e("div",{children:["Added by: ",e("strong",{children:a.addedBy}),c&&` on ${c}`]}),a?.phone&&e("div",{children:["📱 ",a.phone]}),a?.email&&e("div",{children:["📧 ",a.email]}),a?.notes&&e("div",{children:["Notes: ",a.notes]})]})]},o)})}),e("div",{style:"padding-top: 12px; border-top: 1px solid #e0e0e0;",children:Jr.value?e("div",{style:"background: #f9f9f9; padding: 16px; border-radius: 8px;",children:[e("h4",{style:"margin: 0 0 12px 0; font-size: 14px; color: #333;",children:"Add New Member"}),e("input",{type:"text",placeholder:"Member's full name",value:tr.value,onInput:o=>{tr.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; margin-bottom: 8px; box-sizing: border-box;"}),e("div",{style:"display: flex; gap: 8px; margin-bottom: 8px;",children:[e("input",{type:"tel",placeholder:"Phone (optional)",value:rr.value,onInput:o=>{rr.value=o.target.value},style:"flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"}),e("input",{type:"email",placeholder:"Email (optional)",value:nr.value,onInput:o=>{nr.value=o.target.value},style:"flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("textarea",{placeholder:"Notes (skill level, how you know them, etc.) - optional",rows:2,value:or.value,onInput:o=>{or.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; margin-bottom: 12px; box-sizing: border-box; font-family: inherit;"}),e("div",{style:"font-size: 12px; color: #666; margin-bottom: 12px;",children:["Added by: ",e("strong",{children:k.value||"Admin"})]}),e("div",{style:"display: flex; gap: 8px;",children:[e("button",{onClick:Sa,style:"flex: 1; padding: 10px; background: #ccc; color: #333; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;",children:"Cancel"}),e("button",{onClick:pl,style:"flex: 2; padding: 10px; background: var(--color-primary, #2C6E49); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;",children:"Add Member"})]})]}):e("button",{onClick:()=>{Jr.value=!0},style:"width: 100%; padding: 12px; background: var(--color-primary, #2C6E49); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 8px;",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})}),"Add New Member"]})})]})}const ar=f(!1),fn=f("");async function ml(t,r){try{const n=E(),o=new Date().toISOString().split("T")[0];await n.ref(`groups/${t}/activity/${o}`).push({timestamp:Date.now(),action:"user_login",player:r,by:r})}catch(n){console.error("Error logging login activity:",n)}}function xl(t){k.value=t;const r=C.value;r&&(localStorage.setItem(`sessionUser_${r}`,t),ml(r,t),va(r,t)),tn.value=t,en.value=!0,ar.value=!1,window.scrollTo(0,0),w(`Welcome, ${t}!`,"success")}function bl(){const t=[...V.value].sort((a,i)=>a.localeCompare(i)),r=fn.value.toLowerCase(),n=r?t.filter(a=>a.toLowerCase().includes(r)):t,o=a=>{fn.value=a.target.value};return e(je,{isOpen:ar.value,title:"",showCloseButton:!1,children:[e("div",{class:"welcome-modal-content",children:[e("div",{class:"welcome-header",children:[e("h2",{children:"Welcome Back"}),e("p",{class:"group-name",children:Y.value})]}),e("p",{class:"instruction",children:"Select your name to start"}),e("div",{class:"search-container",children:e("input",{type:"text",placeholder:"Search member...",value:fn.value,onInput:o,class:"search-input"})}),e("div",{class:"member-list",children:[n.map(a=>e("button",{class:"member-row",onClick:()=>xl(a),children:[e("div",{class:"member-avatar",children:a.charAt(0).toUpperCase()}),e("span",{class:"member-name",children:a})]},a)),n.length===0&&e("p",{class:"no-results",children:"No members found"})]})]}),e("style",{children:`
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
      `})]})}function yl(t){if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}function wl(t){return`https://wa.me/?text=${encodeURIComponent(t)}`}function kl(t,r){const n=t.replace(/[\s\-\(\)]/g,""),o=encodeURIComponent(r),a=/iPhone|iPad|iPod/.test(navigator?.userAgent||"")?"&":"?";return`sms:${n}${a}body=${o}`}function $a(t){const r=new Date(t+"T12:00:00"),n=r.toLocaleDateString("en-US",{weekday:"long"}),o=r.toLocaleDateString("en-US",{month:"long"}),a=r.getDate(),i=yl(a);return`${n}, ${o} ${a}${i}`}function _l(t,r,n){const o=$a(r),a=[];a.push(`I'm checking in for tennis on ${o}!`),a.push("");const i=n.playStyle==="singles"?"Singles only":n.playStyle==="doubles"?"Doubles only":"Either singles or doubles";if(a.push(`Preference: ${i}`),n.timeRange){const l=oe(n.timeRange.start,n.timeRange.end);l&&a.push(`Available: ${l}`)}return a.join(`
`)}function Cl(t,r){return`I'm no longer available for tennis on ${$a(r)}.`}async function zl(t){try{if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(t),!0;const r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();const n=document.execCommand("copy");return document.body.removeChild(r),n}catch{return!1}}function Sl(t,r,n,o){return`Hi ${t}! You've been added to ${r} tennis coordination.

Check in for upcoming matches here:
${n}

PIN: ${o}

Just select your name and check in when you can play!`}const st=f(!1);typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;!r.closest(".share-prompt-dropdown")&&!r.closest("[data-share-prompt-button]")&&(st.value=!1)});function $l(){const t=xe.value,r=be.value;if(T(()=>{if(t){const u=setTimeout(()=>{xe.value=!1,be.value=null},8e3);return()=>clearTimeout(u)}},[t]),!t||!r)return null;const n=r.action==="removal",o=r.action==="invite",a=()=>o?Sl(r.name,r.groupName||"",r.groupUrl||"",r.groupPin||""):n?Cl(r.name,r.date):_l(r.name,r.date,{playStyle:r.playStyle||"both",timeRange:r.timeRange}),i=u=>{const h=a();if(u==="whatsapp"){const p=wl(h);window.open(p,"_blank")}else if(u==="sms"){const p=kl("",h);window.location.href=p}else u==="copy"&&zl(h).then(p=>{p?w("Copied to clipboard","success"):w("Failed to copy","error")});st.value=!1,xe.value=!1,be.value=null},l=()=>{xe.value=!1,be.value=null},c=o?"var(--color-info-light, #E3F2FD)":n?"var(--color-warning-light, #FFF3E0)":"var(--color-success-light, #E8F5E9)",s=o?"var(--color-info, #1565C0)":n?"#E65100":"var(--color-success, #2E7D32)",d=o?"Added!":n?"Removed!":"Checked in!",g=o?`Invite ${r.name}?`:n?"Let others know?":"Share with the group?";return e("div",{style:{position:"fixed",bottom:"70px",left:"50%",transform:"translateX(-50%)",width:"calc(100% - 24px)",maxWidth:"456px",background:c,borderRadius:"12px",padding:"12px 16px",boxShadow:"var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))",display:"flex",alignItems:"center",gap:"12px",zIndex:1e3,animation:"slideUp 0.3s ease-out"},children:[e("div",{style:{flex:1,fontSize:"14px",color:s},children:[e("strong",{children:d})," ",g]}),e("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e("div",{style:{position:"relative"},children:[e("button",{"data-share-prompt-button":!0,onClick:u=>{u.stopPropagation(),st.value=!st.value},style:{background:st.value?"var(--color-primary-dark, #1a402b)":"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",padding:"8px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),st.value&&e("div",{class:"share-prompt-dropdown",style:{position:"absolute",bottom:"100%",right:"0",marginBottom:"8px",background:"white",borderRadius:"12px",boxShadow:"var(--shadow-3xl, 0 4px 16px rgba(0,0,0,0.2))",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:()=>i("whatsapp"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-whatsapp, #25D366)",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>i("sms"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-info, #2196F3)",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>i("copy"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"#666",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),e("button",{onClick:l,style:{background:"transparent",border:"none",padding:"4px",cursor:"pointer",color:"#666",fontSize:"18px",lineHeight:1},title:"Dismiss",children:"×"})]}),e("style",{children:`
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
      `})]})}const jn=f(!1),pt=f(null),Ge=f(!1),Ve=f(-1);function Il(t){const r=A.value;if(!r)return null;const n=Q.value[r]||[],o=n.findIndex(a=>a.name===t);return o===-1?null:{checkin:n[o],index:o}}function El(){const t=pt.value||k.value,r=!pt.value||pt.value===k.value,n=(c,s)=>{O.value=c,W.value=s},o=async()=>{if(!t){w("Please select a user first","error");return}const c=j.value,s=O.value&&W.value?{start:O.value,end:W.value}:void 0;Ge.value&&Ve.value>=0?await xa(Ve.value,{playStyle:c,allowRotation:Se.value,timeRange:s},k.value||""):await Ln({name:t,playStyle:c,isGuest:!1,addedBy:k.value,allowRotation:Se.value,timeRange:s}),be.value={action:"checkin",name:t,playStyle:c,timeRange:s,date:A.value||""},xe.value=!0,i()},a=async()=>{Ve.value<0||(await ba(Ve.value,k.value),be.value={action:"removal",name:t||"",date:A.value||"",isOwner:r},xe.value=!0,i())},i=()=>{jn.value=!1,pt.value=null,Ge.value=!1,Ve.value=-1,j.value="both",Se.value=!0,O.value="",W.value=""},l=c=>{c.target.classList.contains("drawer-backdrop")&&i()};return jn.value?e("div",{class:"drawer-backdrop",onClick:l,children:[e("div",{class:"check-in-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:Ge.value?"Edit Check-in":"Check In"}),e("div",{class:"player-display",children:[e("div",{class:"player-avatar",children:t?.charAt(0).toUpperCase()}),e("div",{class:"player-info",children:[e("span",{class:"player-name",children:t}),e("span",{class:"player-context",children:r?"Playing as yourself":"Checking in for them"})]})]})]}),e("div",{class:"drawer-section",children:[e("h3",{children:"Play Style"}),e("div",{class:"preference-buttons",children:[e("button",{class:`pref-btn singles ${j.value==="singles"?"selected":""}`,onClick:()=>{j.value="singles"},children:"Singles"}),e("button",{class:`pref-btn ${j.value==="both"?"selected":""}`,onClick:()=>{j.value="both"},children:"Either"}),e("button",{class:`pref-btn doubles ${j.value==="doubles"?"selected":""}`,onClick:()=>{j.value="doubles"},children:"Doubles"})]})]}),e("div",{class:"drawer-section",children:e("label",{class:"rotation-toggle",children:[e("input",{type:"checkbox",checked:Se.value,onChange:c=>{Se.value=c.target.checked}}),e("span",{class:"toggle-label",children:[e("span",{class:"toggle-title",children:"Open to 3-player rotation"}),e("span",{class:"toggle-desc",children:"1v1 or 1v2 format when needed"})]})]})}),e("div",{class:"drawer-section",children:[e("h3",{children:["Available Time ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"time-presets",children:[e("button",{class:`time-btn ${O.value==="08:00"&&W.value==="12:00"?"selected":""}`,onClick:()=>n("08:00","12:00"),children:[e("span",{class:"time-label",children:"Morning"}),e("span",{class:"time-range",children:"8am-12pm"})]}),e("button",{class:`time-btn ${O.value==="12:00"&&W.value==="15:00"?"selected":""}`,onClick:()=>n("12:00","15:00"),children:[e("span",{class:"time-label",children:"Midday"}),e("span",{class:"time-range",children:"12-3pm"})]}),e("button",{class:`time-btn ${O.value==="15:00"&&W.value==="18:00"?"selected":""}`,onClick:()=>n("15:00","18:00"),children:[e("span",{class:"time-label",children:"Afternoon"}),e("span",{class:"time-range",children:"3-6pm"})]}),e("button",{class:`time-btn ${O.value==="18:00"&&W.value==="21:00"?"selected":""}`,onClick:()=>n("18:00","21:00"),children:[e("span",{class:"time-label",children:"Evening"}),e("span",{class:"time-range",children:"6-9pm"})]})]}),e("div",{class:"custom-time",children:[e("input",{type:"time",value:O.value,onInput:c=>{O.value=c.target.value},placeholder:"Start"}),e("span",{class:"time-separator",children:"to"}),e("input",{type:"time",value:W.value,onInput:c=>{W.value=c.target.value},placeholder:"End"}),(O.value||W.value)&&e("button",{class:"clear-time-btn",onClick:()=>{O.value="",W.value=""},children:"Clear"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:i,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:o,children:Ge.value?"Update":"Confirm"})]}),Ge.value&&e("div",{class:"drawer-remove",children:e("button",{class:"remove-btn",onClick:a,children:"Remove Check-in"})})]}),e("style",{children:`
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
      `})]}):null}function Qr(t,r){if(t?pt.value=t:pt.value=null,r&&t){Ge.value=!0;const n=Il(t);n&&(Ve.value=n.index,j.value=n.checkin.playStyle||"both",Se.value=n.checkin.allowRotation!==!1,n.checkin.timeRange&&(O.value=n.checkin.timeRange.start||"",W.value=n.checkin.timeRange.end||""))}else Ge.value=!1,Ve.value=-1,j.value="both",Se.value=!0,O.value="",W.value="";jn.value=!0}const Un=f(!1),re=f("member"),Mt=f("");function Dl(){re.value="member",Mt.value="",ct.value="",Rt.value="",Ur.value="",Or.value="",Wr.value="",tc.value=k.value||"",j.value="both",Un.value=!0}function Ml(){const r=(()=>{const d=A.value,g=d?Q.value[d]||[]:[],u=new Set(g.map(h=>h.name));return[...V.value].filter(h=>!u.has(h)).sort((h,p)=>h.localeCompare(p))})(),n=Mt.value.toLowerCase(),o=n?r.filter(d=>d.toLowerCase().includes(n)):r,a=()=>{Un.value=!1,Mt.value=""},i=d=>{d.target.classList.contains("drawer-backdrop")&&a()},l=d=>{a(),Qr(d,!1)},c=async()=>{if(!ct.value.trim()){w("Please enter guest name","error");return}const d=j.value,g=O.value&&W.value?{start:O.value,end:W.value}:void 0;await Ln({name:ct.value.trim(),playStyle:d,isGuest:!0,addedBy:k.value,allowRotation:Se.value,timeRange:g}),be.value={action:"checkin",name:ct.value.trim(),playStyle:d,timeRange:g,date:A.value||""},xe.value=!0,a()},s=async()=>{if(!Rt.value.trim()){w("Please enter member name","error");return}const d=Rt.value.trim();await ao({name:d,phone:Ur.value.trim(),email:Or.value.trim(),notes:Wr.value.trim(),addedBy:k.value});const g=j.value,u=O.value&&W.value?{start:O.value,end:W.value}:void 0;await Ln({name:d,playStyle:g,isGuest:!1,addedBy:k.value,allowRotation:Se.value,timeRange:u}),be.value={action:"checkin",name:d,playStyle:g,timeRange:u,date:A.value||""},xe.value=!0,a()};return Un.value?e("div",{class:"drawer-backdrop",onClick:i,children:[e("div",{class:"player-select-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:[re.value==="member"&&"Check in a player",re.value==="guest"&&"Add Guest",re.value==="newMember"&&"Add New Member"]}),e("div",{class:"mode-tabs",children:[e("button",{class:`mode-tab ${re.value==="member"?"active":""}`,onClick:()=>{re.value="member"},children:"Member"}),e("button",{class:`mode-tab ${re.value==="guest"?"active":""}`,onClick:()=>{re.value="guest"},children:"Guest"}),e("button",{class:`mode-tab ${re.value==="newMember"?"active":""}`,onClick:()=>{re.value="newMember"},children:"New Member"})]})]}),re.value==="member"&&e(R,{children:[e("div",{class:"search-container",children:e("input",{type:"text",placeholder:"Search member...",value:Mt.value,onInput:d=>{Mt.value=d.target.value},class:"search-input"})}),e("div",{class:"member-list",children:[o.map(d=>e("button",{class:"member-row",onClick:()=>l(d),children:[e("div",{class:"member-avatar",children:d.charAt(0).toUpperCase()}),e("span",{class:"member-name",children:d})]},d)),o.length===0&&e("p",{class:"no-results",children:r.length===0?"All members are already checked in":"No members found"})]})]}),re.value==="guest"&&e("div",{class:"form-section",children:[e("div",{class:"form-field",children:[e("label",{children:"Guest Name"}),e("input",{type:"text",placeholder:"Enter guest's name",value:ct.value,onInput:d=>{ct.value=d.target.value}})]}),e("div",{class:"form-field",children:[e("label",{children:"Play Style"}),e("div",{class:"preference-buttons",children:[e("button",{class:`pref-btn singles ${j.value==="singles"?"selected":""}`,onClick:()=>{j.value="singles"},children:"Singles"}),e("button",{class:`pref-btn ${j.value==="both"?"selected":""}`,onClick:()=>{j.value="both"},children:"Either"}),e("button",{class:`pref-btn doubles ${j.value==="doubles"?"selected":""}`,onClick:()=>{j.value="doubles"},children:"Doubles"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:a,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:c,children:"Add & Check In"})]})]}),re.value==="newMember"&&e("div",{class:"form-section",children:[e("div",{class:"form-field",children:[e("label",{children:"Full Name"}),e("input",{type:"text",placeholder:"Enter member's name",value:Rt.value,onInput:d=>{Rt.value=d.target.value}})]}),e("div",{class:"form-row",children:[e("div",{class:"form-field",children:[e("label",{children:["Phone ",e("span",{class:"optional",children:"(optional)"})]}),e("input",{type:"tel",placeholder:"Phone number",value:Ur.value,onInput:d=>{Ur.value=d.target.value}})]}),e("div",{class:"form-field",children:[e("label",{children:["Email ",e("span",{class:"optional",children:"(optional)"})]}),e("input",{type:"email",placeholder:"Email address",value:Or.value,onInput:d=>{Or.value=d.target.value}})]})]}),e("div",{class:"form-field",children:[e("label",{children:["Notes ",e("span",{class:"optional",children:"(optional)"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:3,value:Wr.value,onInput:d=>{Wr.value=d.target.value}})]}),e("p",{class:"added-by-info",children:["Added by: ",e("strong",{children:k.value||"(unknown)"})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:a,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:s,children:"Add & Check In"})]})]})]}),e("style",{children:`
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
      `})]}):null}const On=f(!1),Pr=f(""),Tr=f(""),Lr=f(""),Nr=f("");function Ia(){Pr.value="",Tr.value="",Lr.value="",Nr.value=""}function Al(){const t=async()=>{const o=Pr.value.trim();if(!o){w("Please enter member name","error");return}await ao({name:o,phone:Tr.value.trim(),email:Lr.value.trim(),notes:Nr.value.trim(),addedBy:k.value||"Unknown"}),r()},r=()=>{On.value=!1,Ia()},n=o=>{o.target.classList.contains("drawer-backdrop")&&r()};return On.value?e("div",{class:"drawer-backdrop",onClick:n,children:[e("div",{class:"add-member-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:"Add New Member"}),e("p",{class:"drawer-subtitle",children:"Add a teammate to your group"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Name ",e("span",{class:"required",children:"*"})]}),e("input",{type:"text",placeholder:"Enter member's full name",value:Pr.value,onInput:o=>{Pr.value=o.target.value},class:"drawer-input",autoFocus:!0})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Contact Info ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"contact-inputs",children:[e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"})}),e("input",{type:"tel",placeholder:"Phone number",value:Tr.value,onInput:o=>{Tr.value=o.target.value},class:"drawer-input with-icon"})]}),e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),e("input",{type:"email",placeholder:"Email address",value:Lr.value,onInput:o=>{Lr.value=o.target.value},class:"drawer-input with-icon"})]})]}),e("p",{class:"field-hint",children:"Used for sending invites to join the group"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Notes ",e("span",{class:"optional-tag",children:"optional"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:2,value:Nr.value,onInput:o=>{Nr.value=o.target.value},class:"drawer-textarea"})]}),e("div",{class:"added-by-info",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"#999",children:e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"})}),e("span",{children:["Added by: ",e("strong",{children:k.value||"Unknown"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:r,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:t,children:"Add Member"})]})]}),e("style",{children:`
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
      `})]}):null}function Rl(){Ia(),On.value=!0}const Wn=f(!1),Br=f(null),Nt=f(""),Ie=f(""),Ee=f(""),Bt=f(""),Ft=f(!1),jt=f(!1),Le=f(""),Ne=f(""),he=f(!1),ut=f(!1),Pl=[{value:"",label:"Not specified"},{value:"beginner",label:"Beginner"},{value:"intermediate",label:"Intermediate"},{value:"advanced",label:"Advanced"},{value:"competitive",label:"Competitive"},{value:"pro",label:"Pro"}];function Tl(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Ll(){Nt.value="",Ie.value="",Ee.value="",Bt.value="",Ft.value=!1,jt.value=!1,Le.value="",Ne.value="",he.value=!1,ut.value=!1}function Nl(){const t=Br.value,r=Tl(),n=t===k.value,o=r&&!n,a=r&&!n,i=async()=>{if(!t)return;const d=Nt.value.trim();if(!d){w("Please enter member name","error");return}if(he.value=!0,o&&d!==t){if(!await ka(t,d)){he.value=!1;return}Br.value=d}const g=await Ei(d,{phone:Ie.value.trim(),email:Ee.value.trim(),notes:Bt.value.trim(),shareContactInDirectory:Ft.value,shareNotesInDirectory:jt.value});if(n&&L.value)try{const u={},h=Ie.value.trim(),p=Ee.value.trim();if(h&&(u.phone=h),p&&(u.email=p),Le.value&&(u.skillLevel=Le.value),Ne.value){const v=parseFloat(Ne.value);!isNaN(v)&&v>=1&&v<=7&&(u.ntrpRating=v)}Object.keys(u).length>0&&await no(u)}catch(u){console.warn("Failed to update platform profile:",u)}he.value=!1,g?(w("Profile updated","success"),c()):w("Failed to update profile","error")},l=async()=>{if(!t||!a)return;if(!ut.value){ut.value=!0;return}he.value=!0;const d=await wa(t);he.value=!1,d?(w(`${t} removed from team`,"success"),c()):w("Failed to remove member","error")},c=()=>{Wn.value=!1,Br.value=null,Ll()},s=d=>{d.target.classList.contains("drawer-backdrop")&&c()};return!Wn.value||!t?null:e("div",{class:"drawer-backdrop",onClick:s,children:[e("div",{class:"edit-member-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:n?"Edit Your Profile":"Edit Member"}),e("p",{class:"drawer-subtitle",children:n?"Update your contact info and privacy settings":`Update ${t}'s information`})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Name ",o&&e("span",{class:"optional-tag",children:"editable"})]}),e("input",{type:"text",placeholder:"Member name",value:Nt.value,onInput:d=>{Nt.value=d.target.value},class:"drawer-input",disabled:!o,style:o?{}:{background:"#f5f5f5",color:"#666"}})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Contact Info ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"contact-inputs",children:[e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"})}),e("input",{type:"tel",placeholder:"Phone number",value:Ie.value,onInput:d=>{Ie.value=d.target.value},class:"drawer-input with-icon"})]}),e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),e("input",{type:"email",placeholder:"Email address",value:Ee.value,onInput:d=>{Ee.value=d.target.value},class:"drawer-input with-icon"})]})]})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Notes ",e("span",{class:"optional-tag",children:"optional"})]}),e("textarea",{placeholder:"Availability, preferences, etc.",rows:2,value:Bt.value,onInput:d=>{Bt.value=d.target.value},class:"drawer-textarea"})]}),n&&e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:"Tennis Profile"}),e("div",{class:"tennis-profile-fields",children:[e("div",{class:"field-row",children:[e("label",{class:"field-sublabel",children:"Skill Level"}),e("select",{value:Le.value,onChange:d=>{Le.value=d.target.value},class:"drawer-select",children:Pl.map(d=>e("option",{value:d.value,children:d.label},d.value))})]}),e("div",{class:"field-row",children:[e("label",{class:"field-sublabel",children:"NTRP Rating"}),e("input",{type:"number",placeholder:"e.g., 3.5",value:Ne.value,onInput:d=>{Ne.value=d.target.value},min:"1.0",max:"7.0",step:"0.5",class:"drawer-input ntrp-input"})]})]}),e("p",{class:"field-hint",children:"Your skill info is saved across all your groups"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:"Privacy Settings"}),e("div",{class:"privacy-options",children:[e("label",{class:"privacy-option",children:[e("input",{type:"checkbox",checked:Ft.value,onChange:d=>{Ft.value=d.target.checked}}),e("div",{class:"privacy-option-content",children:[e("span",{class:"privacy-option-title",children:"Share contact info in directory"}),e("span",{class:"privacy-option-desc",children:"Phone and email visible to all members"})]})]}),e("label",{class:"privacy-option",children:[e("input",{type:"checkbox",checked:jt.value,onChange:d=>{jt.value=d.target.checked}}),e("div",{class:"privacy-option-content",children:[e("span",{class:"privacy-option-title",children:"Share profile notes in directory"}),e("span",{class:"privacy-option-desc",children:"Notes visible to all members"})]})]})]})]}),a&&e("div",{class:"drawer-section",children:e("button",{class:`remove-btn ${ut.value?"confirming":""}`,onClick:l,disabled:he.value,children:ut.value?"Tap again to confirm removal":"Remove from Team"})}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:c,disabled:he.value,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:i,disabled:he.value,children:he.value?"Saving...":"Save Changes"})]})]}),e("style",{children:`
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
      `})]})}function Bl(t){const r=L.value?.profile;if(!r){Ie.value=t?.phone||"",Ee.value=t?.email||"",Le.value="",Ne.value="";return}if(!r.phone&&!r.email&&(t?.phone||t?.email)){const n={};t?.phone&&(n.phone=t.phone),t?.email&&(n.email=t.email),no(n).catch(o=>{console.warn("Contact migration failed (non-fatal):",o)}),Ie.value=t?.phone||"",Ee.value=t?.email||""}else Ie.value=r.phone||t?.phone||"",Ee.value=r.email||t?.email||"";Le.value=r.skillLevel||"",Ne.value=r.ntrpRating?.toString()||""}async function Ea(t){const r=J.value?.[t];Nt.value=t,Bt.value=r?.notes||"",Ft.value=r?.shareContactInDirectory===!0,jt.value=r?.shareNotesInDirectory===!0,ut.value=!1,t===k.value?(await di(),Bl(r)):(Ie.value=r?.phone||"",Ee.value=r?.email||"",Le.value="",Ne.value=""),Br.value=t,Wn.value=!0}function Fl(t){const r=k.value;return r?(Q.value[t]||[]).some(o=>o.name&&_(o.name)===_(r)):!0}function jl(t){A.value=t,k.value&&!Fl(t)?(tn.value=k.value,en.value=!0):(tn.value="",en.value=!1)}function Ul(){const t=to(null);T(()=>{const a=t.current;if(!a)return;const i=setTimeout(()=>{const l=a.querySelector('[data-today="true"]');l&&l.scrollIntoView({behavior:"instant",inline:"start",block:"nearest"})},50);return()=>clearTimeout(i)},[]);const r=[],n=new Date,o=Pn(n);for(let a=-14;a<=21;a++){const i=new Date(n);i.setDate(n.getDate()+a);const l=Pn(i),c=i.toLocaleDateString("en-US",{weekday:"short"}),s=i.getDate(),d=i.toLocaleDateString("en-US",{month:"short"}),u=(Q.value[l]||[]).length,h=l===o,p=a<0;r.push({value:l,dayName:c,dayNum:s,monthName:d,isToday:h,isPast:p,checkinCount:u})}return e("div",{class:"date-selector",children:e("div",{class:"date-scroll",ref:t,children:r.map(a=>e("button",{class:`date-btn ${A.value===a.value?"selected":""} ${a.isPast?"past":""}`,onClick:()=>jl(a.value),"data-date":a.value,"data-today":a.isToday?"true":void 0,children:[e("span",{class:"day-name",children:a.dayName}),e("span",{class:"day-num",children:a.dayNum}),e("span",{class:"month-name",children:a.monthName}),a.isToday&&e("span",{class:"today-badge",children:"Today"}),a.checkinCount>0&&e("span",{class:"checkin-badge",children:a.checkinCount})]},a.value))})})}function Ol(){const t=k.value,r=A.value;return!t||!r?null:(Q.value[r]||[]).find(a=>a.name===t)||null}function Wl(t){return t==="singles"?"Singles only":t==="doubles"?"Doubles only":"Either"}function Hl(t){if(!t||!t.start||!t.end)return null;const r=n=>{const[o,a]=n.split(":"),i=parseInt(o),l=i>=12?"pm":"am",c=i>12?i-12:i===0?12:i;return a==="00"?`${c}${l}`:`${c}:${a}${l}`};return`${r(t.start)} - ${r(t.end)}`}function Gl(){k.value;const t=Ol(),r=!!t,n=()=>{Qr()},o=()=>{Qr(k.value,!0)},a=()=>{Dl()};return e(R,{children:[e("div",{class:"checkin-cta-section",children:[r?e("div",{class:"checkin-status-card",onClick:o,children:e("div",{class:"status-row",children:[e("span",{class:"status-icon",children:"✓"}),e("span",{class:"status-text",children:"You're in!"}),e("div",{class:"status-details",children:[e("span",{class:"detail-item",children:Wl(t.playStyle)}),t.allowRotation!==!1&&e("span",{class:"detail-item rotation",children:"Open to 3s"}),t.timeRange&&e("span",{class:"detail-item time",children:Hl(t.timeRange)})]}),e("button",{class:"edit-icon-btn",onClick:i=>{i.stopPropagation(),o()},title:"Edit",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})})]})}):e("button",{class:"checkin-cta-btn",onClick:n,children:"Check In to Play"}),e("button",{class:"checkin-other-link",onClick:a,children:"Check in someone else"})]}),e("style",{children:`
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
      `})]})}const At=f({}),Cr=f(null),vn=f(!1);function Da(t){return{0:"☀️ Clear sky",1:"🌤️ Mainly clear",2:"⛅ Partly cloudy",3:"☁️ Overcast",45:"🌫️ Foggy",48:"🌫️ Foggy",51:"🌦️ Light drizzle",53:"🌦️ Drizzle",55:"🌧️ Heavy drizzle",61:"🌧️ Light rain",63:"🌧️ Rain",65:"🌧️ Heavy rain",71:"🌨️ Light snow",73:"🌨️ Snow",75:"🌨️ Heavy snow",77:"🌨️ Snow grains",80:"🌦️ Rain showers",81:"🌧️ Rain showers",82:"⛈️ Heavy rain showers",85:"🌨️ Snow showers",86:"🌨️ Heavy snow showers",95:"⛈️ Thunderstorm",96:"⛈️ Thunderstorm with hail",99:"⛈️ Severe thunderstorm"}[t]||"🌡️ Weather"}async function Vl(t,r,n){const o=`${t},${r},${n}`;if(At.value[o])return At.value[o];try{const a=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${r}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&temperature_unit=fahrenheit&timezone=America/Los_Angeles&forecast_days=14`,i=await fetch(a);if(!i.ok)throw new Error("Weather API error");const l=await i.json();if(!l.daily||!l.daily.time||!Array.isArray(l.daily.time))throw new Error("Invalid weather data format");const c=l.daily.time.indexOf(n);if(c===-1)throw new Error("Weather data not available for this date");const s={tempMax:Math.round(l.daily.temperature_2m_max[c]),tempMin:Math.round(l.daily.temperature_2m_min[c]),precipProb:l.daily.precipitation_probability_max[c]||0,weatherCode:l.daily.weathercode[c]};return At.value={...At.value,[o]:s},s}catch(a){console.error("Weather fetch error:",a)}return null}function Yl(){if(T(()=>{const n=se(()=>{const o=A.value,a=I.value.location;if(!o)return;const i=new Date;i.setHours(0,0,0,0);const l=new Date(o+"T00:00:00"),c=Math.floor((l.getTime()-i.getTime())/(1e3*60*60*24));if(c<0||c>=14){Cr.value=null;return}const s=a?.lat??37.2358,d=a?.lon??-121.9623;vn.value=!0,Vl(s,d,o).then(g=>{Cr.value=g,vn.value=!1})});return()=>n()},[]),vn.value)return e("div",{id:"weatherWidget",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 14px",background:"linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)",borderRadius:"10px",marginBottom:"8px",fontSize:"13px",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.05))",color:"#666"},children:"Loading weather..."});if(!Cr.value)return null;const t=Cr.value,r=I.value.location?.name||"Los Gatos, CA";return e("div",{id:"weatherWidget",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)",borderRadius:"10px",marginBottom:"8px",fontSize:"13px",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.05))"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e("span",{style:{fontWeight:600,color:"#1976d2"},children:r}),e("span",{style:{color:"#666"},children:"•"}),e("span",{style:{color:"#666"},children:Da(t.weatherCode)})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontWeight:600,color:"#333"},children:[t.tempMin,"°-",t.tempMax,"°F"]}),t.precipProb>0&&e("span",{style:{color:"#1976d2"},children:["💧",t.precipProb,"%"]})]})]})}function ql(){switch(I.value?.theme){case"roland-garros":return"#D2691E";case"australian-open":return"#1565C0";case"us-open":return"#0D47A1";case"wimbledon":default:return"#2E7D32"}}function Kl(){switch(I.value?.theme){case"roland-garros":return"Roland-Garros";case"australian-open":return"Australian Open";case"us-open":return"US Open";case"wimbledon":return"Wimbledon";default:return"Classic"}}function Ao({message:t="No check-ins yet",subtext:r="Be the first to check in!"}){const n=ql(),o="rgba(255, 255, 255, 0.9)";return e("div",{style:{textAlign:"center",padding:"var(--spacing-4xl, 24px) var(--spacing-2xl, 16px)",color:"var(--color-text-secondary, #666)"},children:[e("div",{style:{width:"120px",height:"80px",margin:"0 auto var(--spacing-2xl, 16px)",position:"relative",background:n,borderRadius:"var(--radius-lg, 8px)",overflow:"hidden",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))"},children:[e("div",{style:{position:"absolute",left:"50%",top:"20%",bottom:"20%",width:"2px",background:o,transform:"translateX(-50%)"}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",top:"50%",height:"3px",background:o,transform:"translateY(-50%)",boxShadow:"0 1px 2px rgba(0,0,0,0.2)"}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",top:"20%",height:"2px",background:o}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",bottom:"20%",height:"2px",background:o}}),e("div",{style:{position:"absolute",left:"10%",top:"0",bottom:"0",width:"2px",background:o}}),e("div",{style:{position:"absolute",right:"10%",top:"0",bottom:"0",width:"2px",background:o}}),e("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:"14px",height:"14px",borderRadius:"50%",background:"linear-gradient(135deg, #c8e600 0%, #9acd32 100%)",boxShadow:"0 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.1)",animation:"ballPulse 2s ease-in-out infinite"},children:e("div",{style:{position:"absolute",top:"3px",left:"2px",right:"2px",height:"8px",border:"1px solid rgba(255,255,255,0.5)",borderRadius:"50%",borderBottom:"none"}})})]}),e("p",{style:{fontSize:"var(--font-size-lg, 16px)",fontWeight:"600",color:"var(--color-text-primary, #333)",margin:"0 0 var(--spacing-sm, 6px) 0"},children:t}),e("p",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #888)",margin:0},children:r})]})}function Jl({text:t="Loading...",size:r="medium"}){const n={small:{ball:20,container:40},medium:{ball:32,container:60},large:{ball:48,container:90}},{ball:o,container:a}=n[r];return e("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"var(--spacing-4xl, 24px)"},children:[e("div",{style:{height:`${a}px`,display:"flex",alignItems:"flex-end",marginBottom:"var(--spacing-lg, 12px)"},children:e("div",{style:{width:`${o}px`,height:`${o}px`,borderRadius:"50%",background:"linear-gradient(135deg, #c8e600 0%, #9acd32 100%)",boxShadow:"0 4px 8px rgba(0,0,0,0.3), inset -3px -3px 6px rgba(0,0,0,0.1)",animation:"tennisBounce 0.6s ease-in-out infinite",position:"relative"},children:e("div",{style:{position:"absolute",top:`${o*.15}px`,left:`${o*.1}px`,right:`${o*.1}px`,height:`${o*.5}px`,border:`${Math.max(1,o*.06)}px solid rgba(255,255,255,0.6)`,borderRadius:"50%",borderBottom:"none"}})})}),e("div",{style:{width:`${o*.8}px`,height:`${o*.15}px`,background:"rgba(0,0,0,0.2)",borderRadius:"50%",marginTop:`-${o*.1}px`,animation:"ballShadow 0.6s ease-in-out infinite"}}),t&&e("p",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #888)",marginTop:"var(--spacing-lg, 12px)"},children:t})]})}function Ql({text:t="Loading..."}){const r=Kl();return e("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"var(--color-bg-page, #f5f5f5)"},children:[e(Jl,{text:t,size:"large"}),r!=="Classic"&&e("p",{style:{fontSize:"var(--font-size-xs, 11px)",color:"var(--color-text-muted, #999)",marginTop:"var(--spacing-md, 8px)"},children:[r," theme"]})]})}const fe=f(localStorage.getItem("games_compact_view")!=="false"),Ma=f(!1),ir=f(null),We=f("both"),Xr=f(""),Zr=f(""),Hn=f(!0),Aa=f(!1),Gn=f(null),Te=f(""),ze=f(!1),Fr=f("confirm"),ne=f(""),Ra=f(""),lr=f(null),Je=f(!1),_t=f(!1),ee=f(null),te=f(null);typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;!r.closest(".share-dropdown")&&!r.closest("[data-share-button]")&&(lr.value&&(lr.value=null),Je.value&&(Je.value=!1))});function jr(){Aa.value=!1,Gn.value=null,Te.value="",ze.value=!1,Fr.value="confirm",ne.value="",Ra.value=""}async function Xl(){const t=Gn.value;if(t===null)return;const r=Te.value,n=ze.value,o=ne.value;Gn.value=null,await ba(t,k.value),jr(),be.value={action:"removal",name:r,date:o,isOwner:n},xe.value=!0}function Pa(){Ma.value=!1,ir.value=null}async function Zl(){if(ir.value===null)return;const t={playStyle:We.value,allowRotation:Hn.value};(Xr.value||Zr.value)&&(t.timeRange={start:Xr.value,end:Zr.value}),await xa(ir.value,t,k.value),Pa()}function es(t){const r=C.value,n=t.name||"",o=k.value&&_(k.value)===_(n),a=t.addedBy&&k.value&&_(k.value)===_(t.addedBy),i=r&&sessionStorage.getItem(`adminAuth_${r}`)==="true";return!!(o||a||i)}function tt({matchKey:t}){const r=G.value[t]||"",[n,o]=De(r);return T(()=>{o(G.value[t]||"")},[G.value[t]]),e("div",{style:"padding: 8px 12px; background: var(--color-bg-muted, #f9f9f9); border-radius: var(--radius-lg, 8px); margin-top: 8px;",children:[e("div",{style:"font-size: 11px; color: var(--color-gray-base, #666); margin-bottom: 4px; font-weight: 500;",children:"Booking Details"}),e("input",{type:"text",placeholder:"e.g. Courtside Court 1, 12PM",value:n,onInput:i=>{o(i.target.value)},onBlur:()=>{const i=n.trim(),l=G.value[t]||"";i!==l&&Ii(t,i)},style:{width:"100%",padding:"8px 12px",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"6px",fontSize:"14px",background:"white"}})]})}function rt({players:t,checkins:r}){const n=k.value?_(k.value):"";return e("div",{style:"padding: 4px 0;",children:t.map(o=>{const a=n&&_(o.name)===n,i=r.findIndex(c=>_(c.name)===_(o.name)&&c.timestamp===o.timestamp),l=o.timeRange?oe(o.timeRange.start,o.timeRange.end):"";return e("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 12px",borderBottom:"1px solid var(--color-border-light, #f0f0f0)",fontSize:"14px",background:a?"var(--color-primary-light, #E8F5E9)":"transparent"},children:[e("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e("span",{style:{color:"var(--color-text-muted, #999)",fontSize:"13px",minWidth:"20px"},children:i>=0?`${i+1}.`:""}),e("span",{style:a?{fontWeight:600,color:"var(--color-primary, #2C6E49)"}:{},children:o.name}),a&&e("span",{style:{fontSize:"10px",background:"var(--color-primary, #2C6E49)",color:"white",padding:"1px 4px",borderRadius:"4px"},children:"YOU"}),l&&e("span",{style:{fontSize:"12px",color:"var(--color-text-muted, #999)",marginLeft:"4px"},children:l})]}),e("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:o.playStyle==="singles"?"var(--color-blue-light, #E3F2FD)":o.playStyle==="doubles"?"var(--color-orange-light, #FFF3E0)":"var(--color-primary-light, #E8F5E9)",color:o.playStyle==="singles"?"var(--color-blue-base, #1976D2)":o.playStyle==="doubles"?"var(--color-orange-base, #F57C00)":"var(--color-primary, #2C6E49)",fontWeight:500},children:ln(o.playStyle||"both")})]},o.name)})})}function ts(){const t=!fe.value;fe.value=t,localStorage.setItem("games_compact_view",String(t))}function Ae({checkin:t,globalIndex:r}){const n=k.value&&_(t.name)===_(k.value),o=es(t);let a="";t.isGuest?a=`guest of ${t.addedBy}`:t.addedBy&&_(t.addedBy)!==_(t.name)&&(a=`added by ${t.addedBy}`);const i=t.timeRange?oe(t.timeRange.start,t.timeRange.end):"",l=()=>{Qr(t.name,!0)};return e("div",{class:n?"checkin-item current-user":"checkin-item",children:[e("span",{children:[e("span",{class:"checkin-name",children:[r+1,". ",t.name,n&&e("span",{class:"current-user-badge",children:"YOU"}),a&&e("span",{class:"guest-indicator",children:[" ",a]}),i&&e("span",{class:"time-badge",children:i}),t.allowRotation===!1&&e("span",{class:"time-badge",style:"background: var(--color-orange-light, #fff3e0); color: var(--color-orange-dark, #e65100);",children:"No 3s"})]}),e("span",{class:`preference-badge ${t.playStyle||"both"}`,children:ln(t.playStyle||"both")}),e("span",{class:"checkin-time",children:oo(t.timestamp)})]}),o&&e("button",{class:"edit-btn",onClick:l,title:"Edit check-in",style:{background:"white",color:"var(--color-primary, #2C6E49)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"8px",padding:"0",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})})]})}function rs(t,r){const o=new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),a=t.players.map(c=>c.name).join(" & "),i=C.value,l=`${window.location.origin}${window.location.pathname}#${i}`;if(t.type==="doubles-forming"){const c=t.needed||4-t.players.length;let d=`🎾 ${c===1?"1 more player needed":`${c} more players needed`} for doubles!
`;return d+=`📅 ${o}
`,d+=`👥 ${a} ${t.players.length===1?"is":"are"} in

`,d+=`Can you make it? ${l}`,d}else if(t.type==="singles-forming"){const c=t.players[0];let s=`🎾 1 more player needed for singles!
`;return s+=`📅 ${o}
`,s+=`👤 ${c.name} is in`,c.timeRange&&(s+=` (${oe(c.timeRange.start,c.timeRange.end)})`),s+=`

Can you make it? ${l}`,s}return""}function mn(t,r,n){const o=rs(t,r);if(n==="whatsapp"){const a=encodeURIComponent(o);window.open(`https://wa.me/?text=${a}`,"_blank")}else if(n==="sms"){const a=encodeURIComponent(o);window.open(`sms:?body=${a}`,"_blank")}else n==="copy"&&navigator.clipboard.writeText(o).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});lr.value=null}function Ro({match:t,matchKey:r}){const n=A.value||"",o=lr.value===r;return e("div",{style:"position: relative; display: inline-block;",children:[e("button",{"data-share-button":!0,onClick:a=>{a.stopPropagation(),lr.value=o?null:r},style:{background:o?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"12px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"white",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(255, 152, 0, 0.3)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",style:{transform:o?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),o&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:()=>mn(t,n,"whatsapp"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>mn(t,n,"sms"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>mn(t,n,"copy"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]})}function ns(t,r,n){let i=`${new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
`,l=0,c=0;t.forEach(v=>{if(v.type==="doubles"){const m=v.players.map(y=>y.name);i+=`Doubles: ${m.join(", ")}
`;const b=v.players.filter(y=>y.timeRange).map(y=>oe(y.timeRange.start,y.timeRange.end));b.length>0&&(i+=`${b[0]}
`);const x=`doubles-${v.number}`;G.value[x]&&(i+=`📝 ${G.value[x]}
`),i+=`
`}else if(v.type==="singles"){l++;const m=v.players.map(z=>z.name);i+=`Singles: ${m.join(", ")}
`;const b=v.players.every(z=>(z.playStyle||"both")==="both"),x=v.players.some(z=>z.allowRotation===!0);b&&x&&(i+=`Open to more players
`);const y=v.players.filter(z=>z.timeRange).map(z=>oe(z.timeRange.start,z.timeRange.end));y.length>0&&(i+=`${y[0]}
`);const S=`singles-${l}`;G.value[S]&&(i+=`📝 ${G.value[S]}
`),i+=`
`}else if(v.type==="singles-or-practice"){c++,i+=`Rotation: ${v.players.map(x=>x.name).join(", ")}
`;const m=v.players.filter(x=>x.timeRange).map(x=>oe(x.timeRange.start,x.timeRange.end));m.length>0&&(i+=`${m[0]}
`);const b=`rotation-${c}`;G.value[b]&&(i+=`📝 ${G.value[b]}
`),i+=`
`}else if(v.type==="doubles-forming"){const m=v.players.map(S=>S.name),b=v.needed===1?"need 1 more":`need ${v.needed} more`;i+=`Doubles (forming): ${m.join(", ")}
`,i+=`${b}
`,v.canRotate?i+=`Can rotate if no 4th
`:v.canPlaySingles&&(v.eitherCount||0)>=2?i+=`Will play singles if no more join
`:(v.eitherCount||0)===1&&v.players.length===1&&(i+=`Can play singles if 1 more joins
`);const x=v.players.filter(S=>S.timeRange).map(S=>oe(S.timeRange.start,S.timeRange.end));x.length>0&&(i+=`${x[0]}
`);const y="doubles-forming-1";G.value[y]&&(i+=`📝 ${G.value[y]}
`),i+=`
`}else if(v.type==="singles-forming"){const m=v.players[0];i+=`Singles (forming): ${m.name}
`,i+=`need 1 more
`,m.timeRange&&(i+=`${oe(m.timeRange.start,m.timeRange.end)}
`),i+=`
`}});const s=t.filter(v=>v.type==="waiting");if(s.length>0){const v=s.flatMap(m=>m.players.map(b=>b.name));v.length>0&&(i+=`Standby: ${v.join(", ")}
`)}const d=I.value.location,g=d?.lat??37.2358,u=d?.lon??-121.9623,h=`${g},${u},${n}`,p=At.value[h];if(p){const v=Da(p.weatherCode);i+=`${v}, ${p.tempMax}°F`}return i.trim()}function xn(t,r,n,o){const a=ns(t,r,n);if(o==="whatsapp"){const i=encodeURIComponent(a);window.open(`https://wa.me/?text=${i}`,"_blank")}else if(o==="sms"){const i=encodeURIComponent(a);window.open(`sms:?body=${i}`,"_blank")}else o==="copy"&&navigator.clipboard.writeText(a).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});Je.value=!1}function os(){const t=A.value;t&&confirm(`Are you sure you want to reset all check-ins for ${H(t)}?

This cannot be undone.`)&&$i()}function Re(t,r){return t.findIndex(n=>_(n.name)===_(r.name)&&n.timestamp===r.timestamp)}function as(t,r){const n={matches:{},unassigned:[]};let o=0,a=0;return t.forEach(i=>{const l=i.players.map(c=>c.name);if(i.type==="doubles"||i.type==="doubles-forming"){o++;const c=`doubles-${o}`;n.matches[c]={players:l,note:G.value[c]||""}}else if(i.type==="singles"||i.type==="singles-forming"||i.type==="singles-or-practice"){a++;const c=`singles-${a}`;n.matches[c]={players:l,note:G.value[c]||""}}else i.type==="waiting"&&n.unassigned.push(...l)}),n}function Po(t,r){if(!_t.value||!te.value)return;const n=ee.value;if(!n)ee.value={name:t,matchKey:r};else if(n.name===t&&n.matchKey===r)ee.value=null;else{const o=te.value,a={...o.matches},i=[...o.unassigned];if(n.matchKey==="unassigned"){const l=i.indexOf(n.name);l>-1&&i.splice(l,1)}else{const l=a[n.matchKey];l&&(l.players=l.players.filter(c=>c!==n.name))}if(r==="unassigned"){const l=i.indexOf(t);l>-1&&i.splice(l,1)}else{const l=a[r];l&&(l.players=l.players.filter(c=>c!==t))}r==="unassigned"?i.push(n.name):a[r].players.push(n.name),n.matchKey==="unassigned"?i.push(t):a[n.matchKey].players.push(t),te.value={matches:a,unassigned:i},ee.value=null,w(`Swapped ${n.name} and ${t}`,"info")}}function is(t,r){try{N.value&&N.value.matches&&typeof N.value.matches=="object"?te.value={matches:{...N.value.matches},unassigned:Array.isArray(N.value.unassigned)?[...N.value.unassigned]:[]}:te.value=as(t,r),ee.value=null,_t.value=!0}catch(n){console.error("Error starting arrange mode:",n),te.value={matches:{},unassigned:r.map(o=>o.name)},ee.value=null,_t.value=!0}}function Ta(){_t.value=!1,ee.value=null,te.value=null}async function ls(){te.value&&(await Mi(te.value),_t.value=!1,ee.value=null,te.value=null)}async function ss(){await Ai(),Ta()}function cs(){Ri();const t=ac.value,r=A.value||"",n=ir.value!==null?t[ir.value]:null,o=C.value,a=o&&sessionStorage.getItem(`adminAuth_${o}`)==="true",i=_t.value,l=!!(N.value&&N.value.matches&&Object.keys(N.value.matches).length>0),c=e(R,{children:[e(je,{isOpen:Ma.value,onClose:Pa,title:`Edit ${n?.name||""}'s Preferences`,children:e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:[e("div",{children:[e("label",{style:"display: block; font-weight: 500; margin-bottom: 8px;",children:"Play Style"}),e("div",{style:"display: flex; gap: 8px;",children:["singles","doubles","both"].map(p=>e("button",{onClick:()=>{We.value=p},style:{flex:1,padding:"10px",border:We.value===p?"2px solid var(--color-primary, #2C6E49)":"2px solid var(--color-border, #e0e0e0)",borderRadius:"8px",background:We.value===p?"var(--color-primary-light, #E8F5E9)":"#fff",color:We.value===p?"var(--color-primary, #2E7D32)":"var(--color-gray-base, #666)",cursor:"pointer",fontWeight:We.value===p?"600":"400"},children:p==="singles"?"Singles":p==="doubles"?"Doubles":"Either"},p))})]}),e("div",{children:[e("label",{style:"display: block; font-weight: 500; margin-bottom: 8px;",children:"Available Time (optional)"}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[e("input",{type:"time",value:Xr.value,onInput:p=>{Xr.value=p.target.value},style:"flex: 1; padding: 8px; border: 1px solid var(--color-gray-light, #ddd); border-radius: 6px;"}),e("span",{children:"to"}),e("input",{type:"time",value:Zr.value,onInput:p=>{Zr.value=p.target.value},style:"flex: 1; padding: 8px; border: 1px solid var(--color-gray-light, #ddd); border-radius: 6px;"})]})]}),We.value==="singles"&&e("div",{children:[e("label",{style:"display: flex; align-items: center; gap: 8px; cursor: pointer;",children:[e("input",{type:"checkbox",checked:Hn.value,onChange:p=>{Hn.value=p.target.checked}}),e("span",{children:"Open to 3-player rotation"})]}),e("p",{style:"font-size: 12px; color: var(--color-gray-base, #666); margin: 4px 0 0 24px;",children:"If unchecked, you'll only be matched for 2-player singles"})]}),e("button",{onClick:Zl,style:{padding:"12px",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer",marginTop:"8px"},children:"Save Changes"})]})}),e(je,{isOpen:Aa.value,onClose:jr,title:Fr.value==="done"?"":ze.value?"Remove Your Check-in?":`Remove ${Te.value}?`,showCloseButton:Fr.value!=="done",children:e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:Fr.value==="confirm"?e(R,{children:[ze.value?e(R,{children:[e("p",{style:"color: var(--color-gray-base, #666); margin: 0; line-height: 1.5;",children:"Are you sure you want to remove yourself from this date?"}),e("div",{style:"background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;",children:[e("p",{style:"margin: 0 0 8px 0; font-weight: 500; color: #E65100;",children:"Things to consider:"}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-gray-base, #666); font-size: 14px;",children:[e("li",{children:"You'll lose your current spot in the check-in order"}),e("li",{children:["If you want to change your preferences, you can ",e("strong",{children:"edit"})," ","instead"]}),e("li",{children:"You can always check in again after removing"})]})]})]}):e(R,{children:[e("p",{style:"color: var(--color-gray-base, #666); margin: 0; line-height: 1.5;",children:["Are you sure you want to remove ",e("strong",{children:Te.value})," from this date?"]}),e("div",{style:"background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;",children:e("p",{style:"margin: 0; color: var(--color-gray-base, #666); font-size: 14px;",children:["They will lose their spot in the check-in order. Consider using"," ",e("strong",{children:"edit"})," to update their preferences instead."]})})]}),e("div",{style:"display: flex; gap: 12px; margin-top: 8px;",children:[e("button",{onClick:jr,style:{flex:1,padding:"12px",background:"var(--color-gray-lightest, #f5f5f5)",color:"var(--color-gray-base, #666)",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"500",cursor:"pointer"},children:"Cancel"}),e("button",{onClick:Xl,style:{flex:1,padding:"12px",background:"#ef5350",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer"},children:"Yes, Remove"})]})]}):e(R,{children:[e("div",{style:"text-align: center; padding: 8px 0;",children:[e("div",{style:"font-size: 48px; margin-bottom: 8px;",children:"✓"}),e("p",{style:"color: var(--color-gray-base, #666); margin: 0;",children:ze.value?`You've been removed from ${H(ne.value)}`:`${Te.value} has been removed from ${H(ne.value)}`})]}),e("div",{children:[e("p",{style:"margin: 0 0 8px 0; font-size: 13px; color: var(--color-gray-base, #666); text-align: center;",children:"Let others know:"}),e("div",{style:"display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;",children:[e("a",{href:`https://wa.me/?text=${encodeURIComponent(ze.value?`I'm out on ${H(ne.value)}.`:`Hi ${Te.value}, I removed you from ${H(ne.value)}. Let me know if you have questions!`)}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"var(--color-whatsapp, #25D366)",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"WhatsApp"}),e("a",{href:`sms:?body=${encodeURIComponent(ze.value?`I'm out on ${H(ne.value)}.`:`Hi ${Te.value}, I removed you from ${H(ne.value)}. Let me know if you have questions!`)}`,style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#007AFF",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"Text"}),e("a",{href:`mailto:?subject=${encodeURIComponent(ze.value?`I'm Out on ${H(ne.value)}`:`${Ra.value} - Check-in Removed`)}&body=${encodeURIComponent(ze.value?`I'm out on ${H(ne.value)}.`:`Hi ${Te.value},

I removed you from ${H(ne.value)}.

Let me know if you have questions!`)}`,style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#EA4335",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"Email"})]})]}),e("button",{onClick:jr,style:{width:"100%",padding:"12px",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer",marginTop:"8px"},children:"Done"})]})})})]});if(t.length===0)return e(R,{children:[e(Ao,{message:"No check-ins yet",subtext:"Be the first to check in for this date!"}),c]});const{matches:s,warnings:d}=sn(t),g=s.some(p=>p.type!=="waiting"||p.players.length>0);if(!g&&d.length===0)return e(R,{children:[e(Ao,{message:"No check-ins yet",subtext:"Be the first to check in for this date!"}),c]});let u=0,h=0;return e(R,{children:[e("div",{class:"games-list",style:"margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("h2",{style:"margin: 0; font-size: var(--font-size-xl, 18px); font-weight: 600;",children:["Games"," ",e("span",{style:"font-size: var(--font-size-sm, 13px); font-weight: 500; color: var(--color-text-secondary, #666);",children:["(",t.length," checked in)"]})]}),l&&!i&&e("span",{style:{fontSize:"11px",background:"var(--color-purple-arrange, #9C27B0)",color:"white",padding:"2px 6px",borderRadius:"4px",fontWeight:"600"},children:"Arranged"})]}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[!i&&e("button",{onClick:ts,title:fe.value?"Show details":"Compact view",style:{background:"var(--color-bg-subtle, #f5f5f5)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"6px",padding:"6px 10px",fontSize:"12px",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"var(--color-text-secondary, #666)"},children:fe.value?e(R,{children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"})}),"Details"]}):e(R,{children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M3 4h18v2H3V4zm2 4h14v2H5V8zm-2 4h18v2H3v-2zm2 4h14v2H5v-2z"})}),"Compact"]})}),i?e(R,{children:[e("button",{onClick:ls,style:{background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"600",cursor:"pointer"},children:"Save"}),e("button",{onClick:Ta,style:{background:"var(--color-gray-lightest, #f5f5f5)",color:"var(--color-gray-base, #666)",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer"},children:"Cancel"}),l&&e("button",{onClick:ss,style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer"},children:"Reset"})]}):e(R,{children:[g&&e("div",{style:"position: relative;",children:[e("button",{"data-share-button":!0,onClick:()=>{Je.value=!Je.value},title:"Share Games",style:{background:Je.value?"var(--color-primary-dark, #1a402b)":"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),Je.value&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",zIndex:100,overflow:"hidden",minWidth:"160px"},children:[e("button",{onClick:()=>xn(s,t,r,"whatsapp"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-whatsapp, #25D366)",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>xn(s,t,r,"sms"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-sms, #2196F3)",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>xn(s,t,r,"copy"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-gray-base, #666)",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),a&&t.length>=2&&e("button",{onClick:()=>is(s,t),title:"Arrange Players",style:{background:"var(--color-purple-arrange, #9C27B0)",color:"white",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})}),"Arrange"]}),a&&t.length>0&&!g&&e("button",{class:"reset-day-btn",onClick:os,title:"Reset This Day",style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"50%",padding:"0",width:"36px",height:"36px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})]})]}),i&&e("div",{style:{background:"var(--color-purple-arrange-light, #F3E5F5)",borderRadius:"8px",padding:"12px",marginBottom:"16px",color:"var(--color-purple-arrange-dark, #7B1FA2)",fontSize:"14px"},children:[e("strong",{children:"Arrange Mode:"})," Tap a player to select, then tap another player to swap their positions.",ee.value&&e("span",{style:{display:"block",marginTop:"4px"},children:["Selected: ",e("strong",{children:ee.value.name})," - tap another player to swap"]})]}),i&&te.value&&e(R,{children:[Object.entries(te.value.matches||{}).map(([p,v])=>{const m=p.startsWith("doubles"),b=p.split("-")[1],x=v?.players||[];return x.length===0?null:e("div",{class:"match-group",style:{marginBottom:"16px",border:"2px dashed var(--color-purple-arrange, #9C27B0)",borderRadius:"8px",padding:"8px"},children:[e("h3",{style:"margin: 0 0 8px 0;",children:[m?`Doubles ${b}`:`Singles ${b}`,e("span",{style:{fontSize:"12px",color:"var(--color-gray-base, #666)",marginLeft:"8px"},children:["(",x.length,"/",m?4:2,")"]})]}),e("div",{style:"display: flex; flex-direction: column; gap: 4px;",children:x.map(y=>{const S=ee.value?.name===y&&ee.value?.matchKey===p;return e("div",{onClick:()=>Po(y,p),style:{padding:"10px 12px",background:S?"var(--color-purple-arrange, #9C27B0)":"var(--color-gray-lightest, #f5f5f5)",color:S?"white":"var(--color-gray-dark, #333)",borderRadius:"6px",cursor:"pointer",fontWeight:"500",transition:"all 0.15s",border:S?"2px solid var(--color-purple-arrange-dark, #7B1FA2)":"2px solid transparent"},children:y},y)})})]},p)}),te.value.unassigned.length>0&&e("div",{class:"match-group",style:{marginBottom:"16px",border:"2px dashed #9e9e9e",borderRadius:"8px",padding:"8px",background:"#fafafa"},children:[e("h3",{style:"margin: 0 0 8px 0; color: var(--color-gray-base, #666);",children:"Unassigned"}),e("div",{style:"display: flex; flex-direction: column; gap: 4px;",children:te.value.unassigned.map(p=>{const v=ee.value?.name===p&&ee.value?.matchKey==="unassigned";return e("div",{onClick:()=>Po(p,"unassigned"),style:{padding:"10px 12px",background:v?"var(--color-purple-arrange, #9C27B0)":"#fff",color:v?"white":"var(--color-gray-dark, #333)",borderRadius:"6px",cursor:"pointer",fontWeight:"500",transition:"all 0.15s",border:v?"2px solid var(--color-purple-arrange-dark, #7B1FA2)":"2px solid var(--color-border, #e0e0e0)"},children:p},p)})})]})]}),!i&&!l&&d.length>0&&e("div",{class:"warning-box",children:d.map((p,v)=>e("div",{children:p},v))}),!i&&l&&N.value&&N.value.matches&&e(R,{children:[Object.entries(N.value.matches).map(([p,v])=>{const m=p.startsWith("doubles"),b=p.split("-")[1],x=m?4:2,y=v?.players||[],S=y.length>=x,z=y.map($=>t.find(X=>X.name===$)||{name:$,timestamp:0});return e("div",{class:`match-group ${S?"":"forming-group"}`,style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:[m?"Doubles":"Singles"," ",b]}),S?e("span",{style:"display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]}):e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",x-y.length]})]}),e("div",{id:"checkinList",children:z.map($=>{const P=Re(t,$);return e(Ae,{checkin:$,globalIndex:P>=0?P:-1},P>=0?P:$.name)})}),e(tt,{matchKey:p})]},p)}),N.value.unassigned&&N.value.unassigned.length>0&&e("div",{class:"match-group waiting-group",style:"margin-bottom: 16px;",children:[e("h3",{style:"margin: 0 0 8px 0;",children:"Unassigned"}),e("div",{id:"checkinList",children:N.value.unassigned.map(p=>{const v=t.find(x=>x.name===p),m=v||{name:p,timestamp:0},b=v?Re(t,m):-1;return e(Ae,{checkin:m,globalIndex:b>=0?b:-1},b>=0?b:p)})})]})]}),!i&&!l&&s.map((p,v)=>{if(p.type==="doubles"){const m=`doubles-${p.number}`,b=fe.value;return e("div",{class:"match-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:["Doubles ",p.number]}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),b?e(rt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(x=>{const y=Re(t,x);return e(Ae,{checkin:x,globalIndex:y},y)})}),e(tt,{matchKey:m})]},v)}if(p.type==="singles"){u++;const m=`singles-${u}`,b=fe.value,x=p.players.every(z=>(z.playStyle||"both")==="both"),y=p.players.some(z=>z.allowRotation===!0),S=x&&y;return e("div",{class:"match-group singles-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:["Singles",u>1?` ${u}`:""]}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),b?e(rt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(z=>{const $=Re(t,z);return e(Ae,{checkin:z,globalIndex:$},$)})}),!b&&S&&e("p",{style:"color: var(--color-gray-base, #666); font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;",children:"Open to more players"}),e(tt,{matchKey:m})]},v)}if(p.type==="singles-or-practice"){h++;const m=`rotation-${h}`,b=fe.value;return e("div",{class:"match-group singles-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Rotation (3 players)"}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),b?e(rt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(x=>{const y=Re(t,x);return e(Ae,{checkin:x,globalIndex:y},y)})}),e(tt,{matchKey:m})]},v)}if(p.type==="doubles-forming"){const m="doubles-forming-1",b=p.needed||4-p.players.length,x=fe.value;let y="";return p.canRotate?y="Can rotate if no 4th":p.canPlaySingles&&(p.eitherCount||0)>=2?y="Will play singles if no more join":(p.eitherCount||0)===1&&p.players.length===1&&(y="Can play singles if 1 more joins"),e("div",{class:"match-group forming-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Doubles"}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",b]}),e(Ro,{match:p,matchKey:m,needed:b})]})]}),x?e(rt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(S=>{const z=Re(t,S);return e(Ae,{checkin:S,globalIndex:z},z)})}),!x&&y&&e("p",{style:"color: var(--color-gray-base, #666); font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;",children:y}),e(tt,{matchKey:m})]},v)}if(p.type==="singles-forming"){const m="singles-forming-1",b=fe.value;return e("div",{class:"match-group forming-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Singles"}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need 1"]}),e(Ro,{match:p,matchKey:m,needed:1})]})]}),b?e(rt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(x=>{const y=Re(t,x);return e(Ae,{checkin:x,globalIndex:y},y)})}),e(tt,{matchKey:m})]},v)}if(p.type==="waiting"){const m=fe.value;return e("div",{class:"match-group waiting-group",style:"margin-bottom: 16px;",children:[e("h3",{style:"margin: 0 0 8px 0;",children:"Waiting for Match"}),m?e(rt,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(b=>{const x=Re(t,b);return e(Ae,{checkin:b,globalIndex:x},x)})})]},v)}return null})]}),c]})}function ds(){return e("div",{children:[e(Ul,{}),e(Yl,{}),e(Gl,{}),e(cs,{})]})}function nt(t,r){const n=t.replace(/-/g,"");if(r){const o=r.replace(":","")+"00";return`${n}T${o}`}return n}function bn(t){return t.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n")}function ps(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}@tenniscoordinator`}function us(t){const{date:r,title:n,description:o,location:a,startTime:i,endTime:l}=t,c=ps(),d=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z",g=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Tennis Coordinator//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",`UID:${c}`,`DTSTAMP:${d}`];if(i&&l)g.push(`DTSTART:${nt(r,i)}`),g.push(`DTEND:${nt(r,l)}`);else if(i){g.push(`DTSTART:${nt(r,i)}`);const[u,h]=i.split(":").map(Number),v=`${((u+2)%24).toString().padStart(2,"0")}:${h.toString().padStart(2,"0")}`;g.push(`DTEND:${nt(r,v)}`)}else{g.push(`DTSTART;VALUE=DATE:${nt(r)}`);const u=new Date(r+"T00:00:00");u.setDate(u.getDate()+1);const h=u.toISOString().split("T")[0];g.push(`DTEND;VALUE=DATE:${nt(h)}`)}return g.push(`SUMMARY:${bn(n)}`),g.push(`DESCRIPTION:${bn(o)}`),a&&g.push(`LOCATION:${bn(a)}`),g.push("END:VEVENT"),g.push("END:VCALENDAR"),g.join(`\r
`)}function hs(){return/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)}function gs(t){const{date:r,title:n,description:o,location:a,startTime:i,endTime:l}=t;let c;if(i&&l){const g=`${r.replace(/-/g,"")}T${i.replace(":","")}00`,u=`${r.replace(/-/g,"")}T${l.replace(":","")}00`;c=`${g}/${u}`}else if(i){const[g,u]=i.split(":").map(Number),p=`${((g+2)%24).toString().padStart(2,"0")}${u.toString().padStart(2,"0")}00`,v=`${r.replace(/-/g,"")}T${i.replace(":","")}00`,m=`${r.replace(/-/g,"")}T${p}`;c=`${v}/${m}`}else{const g=r.replace(/-/g,""),u=new Date(r+"T00:00:00");u.setDate(u.getDate()+1);const h=u.toISOString().split("T")[0].replace(/-/g,"");c=`${g}/${h}`}const s="https://calendar.google.com/calendar/render",d=new URLSearchParams({action:"TEMPLATE",text:n,dates:c,details:o});return a&&d.set("location",a),`${s}?${d.toString()}`}function fs(t,r){if(hs()){const n=gs(t);window.open(n,"_blank")}else{const n=us(t),o=new Blob([n],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(o),i=document.createElement("a");i.href=a,i.download=`tennis-${t.date}.ics`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)}}function vs(t){const{date:r,matchType:n,players:o,groupName:a,location:i,notes:l}=t,s=`${n.includes("doubles")?"Doubles":n.includes("singles")?"Singles":"Tennis"} - ${a}`;let d=`Players: ${o.map(p=>p.name).join(", ")}`;l&&(d+=`

Notes: ${l}`);let g,u;const h=o.filter(p=>p.timeRange);if(h.length>0){const p=h.map(m=>m.timeRange.start).sort(),v=h.map(m=>m.timeRange.end).sort();g=p[p.length-1],u=v[0],g>=u&&(g=h[0].timeRange.start,u=h[0].timeRange.end)}return{date:r,title:s,description:d,location:i,startTime:g,endTime:u}}const sr=f(null),Ce=f(null),Ye=f(!1),cr=f(!1),Xe=f(new Set),Ut=f(!1),pe=f("upcoming");function ms(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;sr.value&&!r.closest(".share-dropdown")&&!r.closest("[data-share-button]")&&(sr.value=null),Ye.value&&!r.closest(".member-picker-dropdown")&&!r.closest("[data-member-picker-button]")&&(Ye.value=!1)});const xs=Fe(()=>{const t=Ce.value||k.value;if(!t)return{upcoming:[],past:[]};const r=_(t),n=[],o=[],a=new Date;a.setHours(0,0,0,0);const i=Object.keys(Q.value).sort();for(const l of i){const s=new Date(l+"T00:00:00")<a,d=Q.value[l]||[];if(d.length===0)continue;const g={},u=J.value||{};for(const[p,v]of Object.entries(u))v&&typeof v=="object"&&(g[_(p)]={include:v.include||[],exclude:v.exclude||[]});const h=sn(d,g);for(const p of h.matches)if(p.players.map(m=>_(m.name)).includes(r)){const m=p.type==="doubles-forming"||p.type==="singles-forming",b={date:l,type:p.type,matchNumber:p.number||1,players:p.players.map(x=>({name:x.name,timeRange:x.timeRange})),isForming:m,needed:p.needed};s?o.push(b):n.push(b)}}return o.sort((l,c)=>c.date.localeCompare(l.date)),{upcoming:n,past:o}});function Vn(t){switch(t){case"doubles":case"doubles-forming":return"Doubles";case"singles":case"singles-forming":return"Singles";case"rotation":case"singles-or-practice":return"Rotation";default:return t}}function bs(t){const n=new Date(t.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),o=t.players.map(l=>l.name).join(" & "),a=C.value,i=`${window.location.origin}${window.location.pathname}#${a}`;if(t.type==="doubles-forming"){const l=t.needed||4-t.players.length;let s=`🎾 ${l===1?"1 more player needed":`${l} more players needed`} for doubles!
`;return s+=`📅 ${n}
`,s+=`👥 ${o} ${t.players.length===1?"is":"are"} in

`,s+=`Can you make it? ${i}`,s}else if(t.type==="singles-forming"){const l=t.players[0];let c=`🎾 1 more player needed for singles!
`;return c+=`📅 ${n}
`,c+=`👤 ${l.name} is in`,l.timeRange&&(c+=` (${oe(l.timeRange.start,l.timeRange.end)})`),c+=`

Can you make it? ${i}`,c}return""}function yn(t,r){const n=bs(t);if(r==="whatsapp"){const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")}else if(r==="sms"){const o=encodeURIComponent(n);window.open(`sms:?body=${o}`,"_blank")}else r==="copy"&&navigator.clipboard.writeText(n).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});sr.value=null}function To(t){cr.value||(A.value=t,ae.value="checkin")}function ys(t){const r=`${t.type.replace("-forming","")}-${t.matchNumber}`,n=G.value[r]||"",o=vs({date:t.date,matchType:t.type,players:t.players,groupName:Y.value||"Tennis",location:I.value.location?.name,notes:n});fs(o),w("Calendar event downloaded","success")}function ws(t){const r=new Set(Xe.value);r.has(t)?r.delete(t):r.add(t),Xe.value=r}function wn(){cr.value=!1,Xe.value=new Set,Ut.value=!1}function ks(t,r){const n=C.value,o=`${window.location.origin}${window.location.pathname}#${n}`,a=t.filter((s,d)=>{const g=`mygames-${s.date}-${s.type}-${d}`;return r.has(g)});if(a.length===0)return"";const i=a.filter(s=>!s.isForming),l=a.filter(s=>s.isForming);let c=`🎾 Tennis Update

`;if(i.length>0){c+=`✅ Ready to Play:
`;for(const s of i){const g=new Date(s.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),u=Vn(s.type),h=s.players.map(p=>p.name).join(", ");c+=`• ${g} - ${u}
  ${h}
`}c+=`
`}if(l.length>0){c+=`🟡 Need Players:
`;for(const s of l){const g=new Date(s.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),u=Vn(s.type),h=s.needed||1,p=s.players.map(v=>v.name).join(", ");c+=`• ${g} - ${u} needs ${h}
  ${p}
`}c+=`
`}return c+=`Check in: ${o}`,c}function zr(t,r){const n=ks(r,Xe.value);if(!n){w("No games selected","error");return}if(t==="native"&&navigator.share)navigator.share({title:"Tennis Update",text:n}).catch(()=>{navigator.clipboard.writeText(n).then(()=>{w("Copied to clipboard","success")})});else if(t==="whatsapp"){const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")}else if(t==="sms"){const o=encodeURIComponent(n);window.open(`sms:?body=${o}`,"_blank")}else navigator.clipboard.writeText(n).then(()=>{w("Copied to clipboard","success")}).catch(()=>{w("Failed to copy","error")});Ut.value=!1,cr.value=!1,Xe.value=new Set}function _s(){ki();const t=xs.value,r=pe.value==="upcoming"?t.upcoming:t.past,n=ms(),o=Ce.value||k.value,a=Ce.value&&Ce.value!==k.value,i=Xe.value.size,l=cr.value,c=pe.value==="past";return e("div",{style:"padding: 16px 0;",children:[l&&e("div",{style:{position:"fixed",bottom:"70px",left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:"400px",background:"white",borderRadius:"16px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",zIndex:100,boxShadow:"0 4px 16px rgba(0,0,0,0.15)"},children:[e("button",{onClick:wn,style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",cursor:"pointer",color:"var(--color-gray-base, #666)"},children:"Cancel"}),e("span",{style:{fontSize:"14px",color:"var(--color-gray-base, #666)"},children:[i," selected"]}),e("div",{style:{position:"relative"},children:[e("button",{onClick:()=>{Ut.value=!Ut.value},disabled:i===0,style:{background:i>0?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",border:"none",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",fontWeight:"600",cursor:i>0?"pointer":"default",color:"white",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),Ut.value&&i>0&&e("div",{style:{position:"absolute",bottom:"100%",right:"0",marginBottom:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",overflow:"hidden",minWidth:"160px"},children:[typeof navigator.share=="function"&&e("button",{onClick:()=>zr("native",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#333"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})}),"Share..."]}),e("button",{onClick:()=>zr("whatsapp",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)",borderTop:typeof navigator.share=="function"?"1px solid #f0f0f0":"none"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>zr("sms",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>zr("copy",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy text"]})]})]})]}),e("div",{style:{display:"flex",background:"var(--color-gray-lightest, #f0f0f0)",borderRadius:"10px",padding:"4px",marginBottom:"16px"},children:[e("button",{onClick:()=>{pe.value="upcoming",wn()},style:{flex:1,padding:"10px 16px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",background:pe.value==="upcoming"?"white":"transparent",color:pe.value==="upcoming"?"var(--color-primary, #2C6E49)":"var(--color-gray-base, #666)",boxShadow:pe.value==="upcoming"?"0 1px 3px rgba(0,0,0,0.1)":"none"},children:["Upcoming (",t.upcoming.length,")"]}),e("button",{onClick:()=>{pe.value="past",wn()},style:{flex:1,padding:"10px 16px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",background:pe.value==="past"?"white":"transparent",color:pe.value==="past"?"var(--color-primary, #2C6E49)":"var(--color-gray-base, #666)",boxShadow:pe.value==="past"?"0 1px 3px rgba(0,0,0,0.1)":"none"},children:["Past (",t.past.length,")"]})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;",children:[e("h2",{style:"margin: 0; font-size: 20px;",children:a?`${Ce.value}'s ${c?"Past":"Upcoming"} Games`:`My ${c?"Past":"Upcoming"} Games`}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[a&&e("button",{onClick:()=>{Ce.value=null},style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"16px",padding:"4px 12px",fontSize:"12px",cursor:"pointer",color:"var(--color-gray-base, #666)"},children:"Back to mine"}),!a&&r.length>0&&!l&&e("button",{onClick:()=>{cr.value=!0},style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"16px",padding:"6px 12px",fontSize:"13px",cursor:"pointer",color:"var(--color-gray-base, #666)",display:"flex",alignItems:"center",gap:"6px"},children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})}),"Share"]})]})]}),n&&!a&&e("div",{style:{background:"var(--color-gray-lightest, #f5f5f5)",borderRadius:"var(--radius-lg, 8px)",padding:"var(--spacing-xl, 12px)",marginBottom:"var(--spacing-2xl, 16px)",position:"relative"},children:[e("label",{style:{display:"block",fontSize:"var(--font-size-sm, 13px)",color:"var(--color-gray-base, #666)",marginBottom:"var(--spacing-sm, 6px)",fontWeight:"500"},children:"View another member's games"}),e("button",{"data-member-picker-button":!0,onClick:s=>{s.stopPropagation(),Ye.value=!Ye.value},style:{width:"100%",padding:"10px 12px",background:"white",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-md, 6px)",fontSize:"var(--font-size-base, 14px)",color:"var(--color-text-secondary, #666)",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e("span",{children:"Select a member..."}),e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",style:{transform:Ye.value?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),Ye.value&&e("div",{class:"member-picker-dropdown",style:{position:"absolute",top:"100%",left:"var(--spacing-xl, 12px)",right:"var(--spacing-xl, 12px)",marginTop:"var(--spacing-xs, 4px)",background:"white",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",boxShadow:"var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))",zIndex:100,maxHeight:"300px",overflowY:"auto"},children:V.value.filter(s=>s!==k.value).sort((s,d)=>s.localeCompare(d)).map(s=>e("button",{onClick:()=>{Ce.value=s,Ye.value=!1},style:{width:"100%",padding:"12px 16px",background:"white",border:"none",borderBottom:"1px solid var(--color-border, #e0e0e0)",textAlign:"left",fontSize:"var(--font-size-base, 14px)",color:"var(--color-text-primary, #333)",cursor:"pointer"},className:"hover-bg-subtle",children:s},s))})]}),r.length===0?e("div",{style:"text-align: center; padding: 48px 24px; background: #f9f9f9; border-radius: 12px;",children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:c?"📜":"📅"}),e("p",{style:"font-size: 18px; margin: 0 0 8px 0; color: var(--color-gray-dark, #333);",children:c?"No past games":"No upcoming games"}),e("p",{style:"font-size: 14px; color: var(--color-gray-base, #666); margin: 0 0 16px 0;",children:c?a?`${Ce.value} has no past games on record.`:"Your game history will appear here.":a?`${Ce.value} has no upcoming games.`:"Check in for a date to get matched with other players!"}),!c&&!a&&e("button",{onClick:()=>{ae.value="checkin"},style:{background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"12px",padding:"12px 24px",fontSize:"16px",fontWeight:"600",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Check In"]})]}):e("div",{style:"display: flex; flex-direction: column; gap: 12px;",children:r.map((s,d)=>{const g=s.players.filter(m=>_(m.name)!==_(o)),u=`mygames-${s.date}-${s.type}-${d}`,h=sr.value===u,p=s.needed||1,v=Xe.value.has(u);return e("div",{onClick:()=>{l&&ws(u)},style:{padding:"16px",background:s.isForming?"#FFF8E1":"#E8F5E9",borderRadius:"12px",border:l&&v?"2px solid var(--color-primary, #2C6E49)":s.isForming?"1px solid #FFE082":"1px solid #A5D6A7",cursor:l?"pointer":"default",position:"relative"},children:[l&&e("div",{style:{position:"absolute",top:"12px",right:"12px",width:"24px",height:"24px",borderRadius:"6px",border:v?"none":"2px solid var(--color-gray-disabled, #ccc)",background:v?"var(--color-primary, #2C6E49)":"white",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"16px",fontWeight:"bold"},children:v&&"✓"}),e("div",{onClick:m=>{l||(m.stopPropagation(),To(s.date))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",cursor:"pointer",paddingRight:l?"32px":"0"},children:[e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"font-weight: 600; color: var(--color-gray-dark, #333); font-size: 16px;",children:H(s.date)}),e("span",{style:{fontSize:"12px",padding:"2px 8px",borderRadius:"10px",background:"#f0f0f0",color:"var(--color-gray-base, #666)",fontWeight:"500"},children:Vn(s.type)})]}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[s.isForming?e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",p]}):e("span",{style:"display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]}),!l&&s.isForming&&e("div",{style:"position: relative;",children:[e("button",{"data-share-button":!0,onClick:m=>{m.stopPropagation(),sr.value=h?null:u},title:"Invite players",style:{background:h?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"12px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"white",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(255, 152, 0, 0.3)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",style:{transform:h?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),h&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:m=>{m.stopPropagation(),yn(s,"whatsapp")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:m=>{m.stopPropagation(),yn(s,"sms")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:m=>{m.stopPropagation(),yn(s,"copy")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),!l&&e("button",{onClick:m=>{m.stopPropagation(),ys(s)},title:"Add to Calendar",style:{background:"transparent",border:"none",padding:"4px",cursor:"pointer",color:"#888",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px"},className:"hover-color-primary",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"})})})]})]}),e("div",{onClick:m=>{l||(m.stopPropagation(),To(s.date))},style:{fontSize:"15px",color:"#555",cursor:"pointer",paddingRight:l?"32px":"0"},children:g.length>0?e(R,{children:[e("span",{style:"color: #888;",children:"Playing with "}),e("span",{style:"font-weight: 500;",children:g.map(m=>m.name).join(", ")})]}):e("span",{style:"color: #888; font-style: italic;",children:["Waiting for ",p," more player",p>1?"s":""]})}),(()=>{const m=`${s.type.replace("-forming","")}-${s.matchNumber}`,b=Tn.value[s.date]?.[m];return b?e("div",{style:{marginTop:"8px",padding:"8px 10px",background:(s.isForming,"rgba(255,255,255,0.6)"),borderRadius:"6px",fontSize:"13px",color:"var(--color-gray-base, #666)",display:"flex",alignItems:"flex-start",gap:"6px"},children:[e("span",{style:{color:"var(--color-gray-muted, #999)",flexShrink:0},children:"📝"}),e("span",{children:b})]}):null})()]},d)})}),r.length>0&&e("p",{style:"font-size: 13px; color: var(--color-gray-muted, #999); text-align: center; margin-top: 16px;",children:c?"Tap a game to view that day's history":"Tap a game to view that day's details"})]})}const Sr=f(!1),kn=f(!1),ht=f(!1),gt=f(!1),ie=f([]),dr=f(null);typeof document<"u"&&document.addEventListener("click",t=>{if(dr.value){const r=t.target;!r.closest(".invite-dropdown")&&!r.closest("[data-invite-button]")&&(dr.value=null)}});function Cs(t,r){const o=new Date(t+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),a=C.value,i=`${window.location.origin}${window.location.pathname}#${a}`,l=Y.value||"Tennis";if(r==="Doubles"){let c=`🎾 Need players for doubles!
`;return c+=`📅 ${o}
`,c+=`🏟️ ${l}

`,c+=`A match just opened up. Can you make it?

`,c+=`Check in: ${i}`,c}else{let c=`🎾 Need 1 more player for singles!
`;return c+=`📅 ${o}
`,c+=`🏟️ ${l}

`,c+=`A singles spot opened up. Can you make it?

`,c+=`Check in: ${i}`,c}}function _n(t,r,n){const o=Cs(t,r);if(n==="whatsapp"){const a=encodeURIComponent(o);window.open(`https://wa.me/?text=${a}`,"_blank")}else if(n==="sms"){const a=encodeURIComponent(o);window.open(`sms:?body=${a}`,"_blank")}else n==="copy"&&navigator.clipboard.writeText(o).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});dr.value=null}async function zs(){const t=C.value,r=k.value;if(!(!t||!r))try{const i=(await E().ref(`groups/${t}/userNotifications/${_(r)}/preferences`).once("value")).val()||{};ht.value=i.activityAlerts===!0,gt.value=i.matchConfirmations!==!1,ie.value=i.unwatchedMembers||i.mutedMembers||[]}catch(n){console.error("Error loading notification prefs from Firebase:",n)}}async function pr(){const t=C.value,r=k.value;if(!t||!r)return;const n={activityAlerts:ht.value,matchConfirmations:gt.value,unwatchedMembers:ie.value};try{await E().ref(`groups/${t}/userNotifications/${_(r)}/preferences`).set(n),w("Preferences saved","success")}catch(o){console.error("Error saving notification prefs:",o),w("Failed to save preferences","error")}}function Ss(t){ie.value.includes(t)?ie.value=ie.value.filter(r=>r!==t):ie.value=[...ie.value,t],pr()}function $s(){ie.value=[],pr()}function Is(){ie.value=V.value.filter(t=>t!==k.value),pr()}function Es(t){return!ie.value.includes(t)}function Ds(t){t.read||Ti(t.id),t.date&&(A.value=t.date,ae.value="checkin")}function Ms(t){const r=new Date(t),o=new Date().getTime()-t;return o<6e4?"Just now":o<36e5?`${Math.floor(o/6e4)}m ago`:o<864e5?`${Math.floor(o/36e5)}h ago`:r.toLocaleDateString([],{month:"short",day:"numeric"})}function As(){const t=dn.value,r=t.filter(n=>!n.read).length;return T(()=>{zs()},[]),e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[kn.value&&e("div",{style:"position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1002;",children:e("div",{style:"background: var(--color-bg-card, white); padding: var(--spacing-3xl, 20px); border-radius: var(--radius-xl, 12px); max-width: 350px; width: 90%;",children:[e("h3",{style:"margin-top: 0; margin-bottom: var(--spacing-md, 8px); color: var(--color-text-primary, #333);",children:"Followed Members"}),e("p",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666);",children:"Get activity alerts for these members"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);",children:[e("button",{onClick:$s,style:"flex: 1; padding: var(--spacing-md, 8px); background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Select All"}),e("button",{onClick:Is,style:"flex: 1; padding: var(--spacing-md, 8px); background: var(--color-bg-muted, #f5f5f5); color: var(--color-text-secondary, #666); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Deselect All"})]}),e("div",{style:"max-height: 300px; overflow-y: auto;",children:V.value.filter(n=>n!==k.value).map(n=>{const o=Es(n);return e("button",{onClick:()=>Ss(n),style:{display:"flex",alignItems:"center",gap:"var(--spacing-lg, 10px)",width:"100%",textAlign:"left",padding:"var(--spacing-xl, 12px)",marginBottom:"var(--spacing-xs, 4px)",border:o?"1px solid var(--color-primary-lighter, #A5D6A7)":"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",background:o?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, white)",color:"var(--color-text-primary, #333)",cursor:"pointer",fontSize:"var(--font-size-base, 14px)",fontWeight:"normal"},children:[e("span",{style:{width:"20px",height:"20px",borderRadius:"var(--radius-sm, 4px)",border:o?"none":"2px solid var(--color-gray-disabled, #ccc)",background:o?"var(--color-primary, #2C6E49)":"var(--color-bg-card, white)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-inverse, white)",fontSize:"var(--font-size-base, 14px)",flexShrink:0},children:o&&"✓"}),n]},n)})}),e("button",{onClick:()=>{kn.value=!1},style:"width: 100%; margin-top: var(--spacing-xl, 12px); background: var(--color-primary, #2C6E49); color: var(--color-text-inverse, white);",children:"Done"})]})}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);",children:[e("h2",{style:"margin: 0; font-size: var(--font-size-2xl, 20px);",children:["Notifications",r>0&&e("span",{style:"margin-left: var(--spacing-md, 8px); font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); font-weight: 400;",children:["(",r," unread)"]})]}),r>0&&e("button",{onClick:Bi,style:{background:"none",border:"none",color:"var(--color-primary, #2C6E49)",fontSize:"var(--font-size-base, 14px)",cursor:"pointer",padding:"var(--spacing-xs, 4px) var(--spacing-md, 8px)"},children:"Mark all read"})]}),e("div",{style:"margin-bottom: var(--spacing-2xl, 16px); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-xl, 12px); overflow: hidden;",children:[e("button",{onClick:()=>{Sr.value=!Sr.value},style:"width: 100%; padding: 14px var(--spacing-2xl, 16px); background: var(--color-bg-subtle, #f9f9f9); border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: var(--font-size-md, 15px); font-weight: 500;",children:[e("span",{style:"display: flex; align-items: center; gap: var(--spacing-md, 8px); color: var(--color-text-primary, #333);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M19.14,12.94c0.04-0.31,0.06-0.63,0.06-0.94c0-0.31-0.02-0.63-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.37,4.82,11.69,4.82,12s0.02,0.63,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})}),"Alert Settings"]}),e("span",{style:{color:"var(--color-text-muted, #999)",transform:Sr.value?"rotate(180deg)":"none",transition:"transform 0.2s"},children:"▼"})]}),Sr.value&&e("div",{style:"padding: var(--spacing-2xl, 16px); background: var(--color-bg-card, #fff); border-top: 1px solid var(--color-border, #e0e0e0);",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Game confirmations"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:"When placed in or removed from a confirmed game"})]}),e("label",{style:"position: relative; display: inline-block; width: 48px; height: 26px;",children:[e("input",{type:"checkbox",checked:gt.value,onChange:n=>{gt.value=n.target.checked,pr()},style:"opacity: 0; width: 0; height: 0;"}),e("span",{style:{position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:gt.value?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",transition:"0.3s",borderRadius:"26px"},children:e("span",{style:{position:"absolute",height:"20px",width:"20px",left:gt.value?"25px":"3px",bottom:"3px",backgroundColor:"white",transition:"0.3s",borderRadius:"50%"}})})]})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Activity alerts"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:"Check-ins, removals, notes"})]}),e("label",{style:"position: relative; display: inline-block; width: 48px; height: 26px;",children:[e("input",{type:"checkbox",checked:ht.value,onChange:n=>{ht.value=n.target.checked,pr()},style:"opacity: 0; width: 0; height: 0;"}),e("span",{style:{position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:ht.value?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",transition:"0.3s",borderRadius:"26px"},children:e("span",{style:{position:"absolute",height:"20px",width:"20px",left:ht.value?"25px":"3px",bottom:"3px",backgroundColor:"white",transition:"0.3s",borderRadius:"50%"}})})]})]}),e("div",{style:"padding-top: var(--spacing-xl, 12px); border-top: 1px solid var(--color-border, #e0e0e0);",children:e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg, 10px);",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Followed members"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:(()=>{const n=V.value.filter(a=>a!==k.value);return`Following ${n.length-ie.value.length} of ${n.length} members`})()})]}),e("button",{onClick:()=>{kn.value=!0},style:"background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); padding: var(--spacing-sm, 6px) var(--spacing-xl, 12px); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Edit"})]})})]})]}),t.length===0?e("div",{style:"text-align: center; padding: 48px var(--spacing-4xl, 24px); background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-xl, 12px);",children:[e("div",{style:"font-size: 48px; margin-bottom: var(--spacing-2xl, 16px);",children:"🔔"}),e("p",{style:"font-size: var(--font-size-xl, 18px); margin: 0 0 var(--spacing-md, 8px) 0; color: var(--color-text-primary, #333);",children:"No notifications"}),e("p",{style:"font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); margin: 0;",children:"You'll see updates about matches and check-ins here"})]}):e("div",{style:"display: flex; flex-direction: column; gap: var(--spacing-md, 8px);",children:t.map(n=>{const o=dr.value===n.id,a=n.type==="match_dissolved";return e("div",{onClick:()=>Ds(n),style:{padding:"14px var(--spacing-2xl, 16px)",background:n.read?"var(--color-bg-subtle, #f9f9f9)":"var(--color-primary-light, #E8F5E9)",borderRadius:"var(--radius-lg, 10px)",cursor:n.date?"pointer":"default",border:n.read?"1px solid var(--color-border, #e0e0e0)":"1px solid var(--color-primary-lighter, #A5D6A7)",position:"relative"},children:e("div",{style:"display: flex; justify-content: space-between; align-items: flex-start;",children:[e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-md, 15px); color: var(--color-text-primary, #333); margin-bottom: var(--spacing-sm, 6px);",children:[!n.read&&e("span",{style:"display: inline-block; width: 8px; height: 8px; background: var(--color-primary, #2C6E49); border-radius: var(--radius-full, 50%); margin-right: var(--spacing-md, 8px);"}),n.message]}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #888); display: flex; align-items: center; gap: var(--spacing-md, 8px); flex-wrap: wrap;",children:[e("span",{children:Ms(n.timestamp)}),n.date&&e("span",{style:"color: var(--color-primary, #2C6E49); font-weight: 500; display: flex; align-items: center; gap: 2px;",children:[H(n.date)," →"]})]}),a&&n.date&&n.matchType&&e("div",{style:"margin-top: var(--spacing-xl, 12px); position: relative;",children:[e("button",{"data-invite-button":!0,onClick:i=>{i.stopPropagation(),dr.value=o?null:n.id},style:{background:o?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"16px",padding:"6px 14px",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",color:"white",transition:"all 0.2s",boxShadow:"0 2px 6px rgba(255, 152, 0, 0.4)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",style:{transform:o?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),o&&e("div",{class:"invite-dropdown",style:{position:"absolute",bottom:"100%",left:"0",marginBottom:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:i=>{i.stopPropagation(),_n(n.date,n.matchType,"whatsapp")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:i=>{i.stopPropagation(),_n(n.date,n.matchType,"sms")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:i=>{i.stopPropagation(),_n(n.date,n.matchType,"copy")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]})]}),e("button",{onClick:i=>{i.stopPropagation(),Ni(n.id)},style:{background:"none",border:"none",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-xl, 18px)",cursor:"pointer",padding:"0 var(--spacing-xs, 4px)",marginLeft:"var(--spacing-md, 8px)"},children:"×"})]})},n.id)})})]})}function Lo(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Rs(t){const r=Q.value;if(!r)return null;const n=new Date;n.setHours(0,0,0,0);let o=null,a="";const i=[];if(Object.keys(r).forEach(l=>{const c=r[l];if(!c||!Array.isArray(c))return;const[s,d,g]=l.split("-").map(Number),u=new Date(s,d-1,g);u.setHours(0,0,0,0),u<=n&&c.some(p=>p&&p.name===t)&&i.push(l)}),i.sort((l,c)=>c.localeCompare(l)),i.length>0){a=i[0];const[l,c,s]=a.split("-").map(Number);o=new Date(l,c-1,s)}return o}function Ps(t){const r=new Date;r.setHours(0,0,0,0);const n=new Date(t);n.setHours(0,0,0,0);const o=r.getTime()-n.getTime(),a=Math.floor(o/(1e3*60*60*24));return a===0?"Today":a===1?"Yesterday":a<7?`${a} days ago`:a<30?`${Math.floor(a/7)} weeks ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Ts(){const[t,r]=De(Lo()),[n,o]=De("");return T(()=>{const a=setInterval(()=>{r(Lo())},1e3);return()=>clearInterval(a)},[]),e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[e("h2",{style:"margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);",children:"Team Directory"}),e("div",{style:{marginBottom:"var(--spacing-2xl, 16px)"},children:e("input",{type:"text",value:n,onInput:a=>o(a.target.value),placeholder:"🔍 Search members...",style:{width:"100%",padding:"var(--spacing-xl, 12px) var(--spacing-2xl, 16px)",border:"1px solid var(--color-border-light, #ddd)",borderRadius:"var(--radius-xl, 12px)",fontSize:"var(--font-size-md, 15px)",boxSizing:"border-box",background:"var(--color-bg-card, #fff)"}})}),e("button",{onClick:()=>{Rl()},style:{width:"100%",padding:"var(--spacing-xl, 14px)",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"var(--radius-xl, 12px)",fontSize:"var(--font-size-md, 15px)",fontWeight:"500",cursor:"pointer",marginBottom:"var(--spacing-2xl, 16px)",display:"flex",alignItems:"center",justifyContent:"center",gap:"var(--spacing-md, 8px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"white",children:e("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})}),"Add New Member"]}),e("div",{style:{display:"flex",flexDirection:"column",gap:"var(--spacing-xl, 12px)"},children:(()=>{const i=(V.value||[]).filter(l=>l.toLowerCase().includes(n.toLowerCase())).sort((l,c)=>l.localeCompare(c));return i.length===0?e("div",{style:{background:"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",padding:"40px 20px",textAlign:"center",border:"1px solid var(--color-border, #e0e0e0)"},children:[e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"var(--color-border-light, #ddd)",style:{marginBottom:"var(--spacing-xl, 12px)"},children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})}),e("p",{style:{color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-md, 15px)",margin:0},children:n?"No members found":"No members in team yet"})]}):i.map(l=>{const c=J.value?.[l],s=Rs(l),d=k.value&&l===k.value,g=d?L.value?.profile:null,u=g?.phone||c?.phone,h=g?.email||c?.email,v=c?.shareContactInDirectory===!0&&(u||h),b=c?.shareNotesInDirectory===!0&&c?.notes;return e("div",{style:{background:d?"var(--color-primary-light, #e8f5e9)":"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:d?"2px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #e0e0e0)"},children:e("div",{style:{display:"flex",alignItems:"start",justifyContent:"space-between",gap:"var(--spacing-xl, 12px)"},children:[e("div",{style:{flex:1,minWidth:0},children:[e("div",{style:{fontWeight:600,fontSize:"var(--font-size-lg, 16px)",color:"var(--color-text-primary, #333)",marginBottom:"var(--spacing-md, 8px)"},children:[l,d&&e("span",{style:{marginLeft:"var(--spacing-md, 8px)",fontSize:"var(--font-size-sm, 12px)",color:"var(--color-primary, #2C6E49)",fontWeight:"500"},children:"(You)"})]}),s&&e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)",marginBottom:"var(--spacing-md, 8px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"var(--color-text-muted, #888)",children:e("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"})}),"Last played: ",Ps(s)]}),!s&&e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #999)",marginBottom:"var(--spacing-md, 8px)"},children:"No recent games"}),c?.addedBy&&e("div",{style:{fontSize:"var(--font-size-sm, 12px)",color:"var(--color-text-muted, #999)",marginBottom:"var(--spacing-md, 8px)"},children:["Added by ",c.addedBy,c.addedDate&&` • ${new Date(c.addedDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`]}),v&&e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md, 8px)",marginTop:"var(--spacing-md, 8px)",flexWrap:"wrap"},children:[u&&e(R,{children:[e("a",{href:`https://wa.me/${u.replace(/\D/g,"")}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"#25D366",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Message on WhatsApp",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("a",{href:`sms:${u}`,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"var(--color-info, #2196F3)",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Send SMS",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"})}),"SMS"]})]}),h&&e("a",{href:`mailto:${h}`,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"var(--color-text-secondary, #666)",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Send email",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),"Email"]})]}),b&&e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)",marginTop:"var(--spacing-md, 8px)",padding:"var(--spacing-md, 8px)",background:"var(--color-bg-subtle, #f9f9f9)",borderRadius:"var(--radius-md, 6px)",fontStyle:"italic"},children:['"',c.notes,'"']})]}),(d||t)&&e("button",{onClick:()=>Ea(l),style:{background:d?"var(--color-primary, #2C6E49)":"var(--color-bg-muted, #f5f5f5)",color:d?"white":"var(--color-text-secondary, #666)",border:d?"none":"1px solid var(--color-border, #e0e0e0)",padding:"var(--spacing-md, 8px) var(--spacing-xl, 12px)",cursor:"pointer",borderRadius:"var(--radius-lg, 8px)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"var(--font-size-base, 14px)",fontWeight:"500",whiteSpace:"nowrap"},title:d?"Edit your profile":"Edit member",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:d?"white":"var(--color-text-secondary, #666)",style:{marginRight:"var(--spacing-xs, 4px)"},children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})}),"Edit"]})]})},l)})})()}),V.value.length>0&&!n&&e("div",{style:{marginTop:"var(--spacing-2xl, 16px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",border:"1px solid var(--color-border, #e0e0e0)",textAlign:"center"},children:e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)"},children:[e("span",{style:{fontWeight:"600",color:"var(--color-text-primary, #333)"},children:V.value.length})," ",V.value.length===1?"member":"members"," in team"]})})]})}const Ls=Fe(()=>{const t=Q.value,r=new Date;r.setHours(0,0,0,0);const n=new Date(r);n.setDate(n.getDate()-30);const o=new Date(r);o.setDate(o.getDate()-7);let a=0,i=0,l=0,c=0,s=0,d=0;const g={},u={0:0,1:0,2:0,3:0,4:0,5:0,6:0},h={};let p=0,v=0;const m=Object.keys(t).sort();for(const z of m){const $=t[z]||[];if($.length===0)continue;const P=new Date(z+"T00:00:00");if(!(P<r))continue;p++,v+=$.length;const we=P>=n,ke=P>=o,ce=P.getDay(),K=new Date(P);K.setDate(K.getDate()-K.getDay());const _e=K.toISOString().split("T")[0],{matches:Ba}=sn($);for(const de of Ba)if(!(de.type==="waiting"||de.type==="doubles-forming"||de.type==="singles-forming")){a++,u[ce]++,h[_e]=(h[_e]||0)+1,we&&s++,ke&&d++,de.type==="doubles"?i++:de.type==="singles"?l++:de.type==="singles-or-practice"&&c++;for(const St of de.players){const et=_(St.name);g[et]||(g[et]={gamesPlayed:0,checkIns:0,lastPlayed:z,doublesPlayed:0,singlesPlayed:0}),g[et].gamesPlayed++,g[et].lastPlayed=z,de.type==="doubles"?g[et].doublesPlayed++:g[et].singlesPlayed++}}for(const de of $){const St=_(de.name);g[St]||(g[St]={gamesPlayed:0,checkIns:0,lastPlayed:"",doublesPlayed:0,singlesPlayed:0}),g[St].checkIns++}}const b=Object.entries(g).map(([z,$])=>({name:V.value.find(X=>_(X)===z)||z,...$,participationRate:$.checkIns>0?Math.round($.gamesPlayed/$.checkIns*100):0})).sort((z,$)=>$.gamesPlayed-z.gamesPlayed).slice(0,10),x=Object.entries(u).sort((z,$)=>$[1]-z[1])[0],y=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],S=Object.entries(h).sort((z,$)=>$[0].localeCompare(z[0])).slice(0,8).reverse();return{totalGames:a,doublesGames:i,singlesGames:l,rotationGames:c,last30DaysGames:s,last7DaysGames:d,activeDays:p,totalCheckIns:v,averagePlayersPerDay:p>0?(v/p).toFixed(1):"0",topPlayers:b,mostPopularDay:x?y[parseInt(x[0])]:"N/A",mostPopularDayCount:x?x[1]:0,dayOfWeekCounts:u,recentWeeks:S,totalMembers:V.value.length,activeMembersLast30Days:Object.values(g).filter(z=>z.lastPlayed?new Date(z.lastPlayed+"T00:00:00")>=n:!1).length}});function Cn({label:t,value:r,subtext:n}){return e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",textAlign:"center",flex:"1",minWidth:"100px"},children:[e("div",{style:{fontSize:"24px",fontWeight:"700",color:"var(--color-primary, #2C6E49)"},children:r}),e("div",{style:{fontSize:"12px",color:"#666",marginTop:"4px"},children:t}),n&&e("div",{style:{fontSize:"11px",color:"#888",marginTop:"2px"},children:n})]})}function zn({value:t,max:r,color:n="var(--color-primary, #2C6E49)"}){const o=r>0?t/r*100:0;return e("div",{style:{background:"#e0e0e0",borderRadius:"4px",height:"8px",flex:"1",overflow:"hidden"},children:e("div",{style:{background:n,height:"100%",width:`${o}%`,borderRadius:"4px",transition:"width 0.3s ease"}})})}function Ns(){const t=Ls.value,r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=Math.max(...Object.values(t.dayOfWeekCounts));return e("div",{style:"padding: 16px;",children:[e("h3",{style:"margin: 0 0 16px 0; font-size: 18px; color: #333;",children:"Group Insights"}),e("div",{style:{display:"flex",gap:"12px",marginBottom:"20px",flexWrap:"wrap"},children:[e(Cn,{label:"Total Games",value:t.totalGames,subtext:"all time"}),e(Cn,{label:"Last 30 Days",value:t.last30DaysGames}),e(Cn,{label:"Last 7 Days",value:t.last7DaysGames})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Game Types"}),e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Doubles"}),e(zn,{value:t.doublesGames,max:t.totalGames,color:"var(--color-primary, #2C6E49)"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.doublesGames})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Singles"}),e(zn,{value:t.singlesGames,max:t.totalGames,color:"#2196F3"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.singlesGames})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Rotation"}),e(zn,{value:t.rotationGames,max:t.totalGames,color:"#FF9800"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.rotationGames})]})]})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Activity by Day"}),e("div",{style:{display:"flex",gap:"4px",alignItems:"flex-end",height:"80px"},children:r.map((o,a)=>{const i=t.dayOfWeekCounts[a],l=n>0?i/n*60:0;return e("div",{style:{flex:"1",textAlign:"center"},children:[e("div",{style:{background:a===Number(Object.entries(t.dayOfWeekCounts).sort((c,s)=>s[1]-c[1])[0]?.[0])?"var(--color-primary, #2C6E49)":"#c8e6c9",height:`${Math.max(l,4)}px`,borderRadius:"4px 4px 0 0",marginBottom:"4px",transition:"height 0.3s ease"}}),e("span",{style:{fontSize:"10px",color:"#666"},children:o})]},o)})}),e("p",{style:{fontSize:"13px",color:"#666",margin:"12px 0 0 0",textAlign:"center"},children:["Most popular: ",e("strong",{children:t.mostPopularDay})," (",t.mostPopularDayCount," games)"]})]}),t.recentWeeks.length>0&&e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Weekly Trend"}),e("div",{style:{display:"flex",gap:"4px",alignItems:"flex-end",height:"60px"},children:t.recentWeeks.map(([o,a])=>{const i=Math.max(...t.recentWeeks.map(d=>d[1])),l=i>0?a/i*50:0,c=new Date(o+"T00:00:00"),s=`${c.getMonth()+1}/${c.getDate()}`;return e("div",{style:{flex:"1",textAlign:"center"},children:[e("div",{style:{background:"var(--color-primary, #2C6E49)",height:`${Math.max(l,4)}px`,borderRadius:"4px 4px 0 0",marginBottom:"4px"}}),e("span",{style:{fontSize:"9px",color:"#666"},children:s})]},o)})})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Most Active Players"}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#888",marginBottom:"8px",padding:"0 4px"},children:[e("span",{children:"Player"}),e("span",{children:"Games"})]}),t.topPlayers.length===0?e("p",{style:{fontSize:"14px",color:"#666",textAlign:"center",margin:"16px 0"},children:"No game data yet"}):e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:t.topPlayers.map((o,a)=>e("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px",background:a<3?"#E8F5E9":"white",borderRadius:"8px"},children:[e("span",{style:{width:"20px",height:"20px",borderRadius:"50%",background:a===0?"#FFD700":a===1?"#C0C0C0":a===2?"#CD7F32":"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"600",color:a<3?"#333":"#666"},children:a+1}),e("span",{style:{flex:"1",fontSize:"14px"},children:o.name}),e("span",{style:{fontSize:"14px",fontWeight:"600",color:"var(--color-primary, #2C6E49)"},children:o.gamesPlayed})]},o.name))})]}),e("div",{style:{background:"#E3F2FD",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Group Health"}),e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Total members"}),e("span",{style:{fontWeight:"600"},children:t.totalMembers})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Active last 30 days"}),e("span",{style:{fontWeight:"600"},children:t.activeMembersLast30Days})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Avg players/day"}),e("span",{style:{fontWeight:"600"},children:t.averagePlayersPerDay})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Days with activity"}),e("span",{style:{fontWeight:"600"},children:t.activeDays})]})]})]}),e("p",{style:"font-size: 13px; color: #888; text-align: center; margin-top: 16px;",children:"Stats are based on completed games from past dates"})]})}function Bs(){const t=I.value.groupDescription,r=I.value.groupRules,n=t||r,o=[{title:"Getting Started",icon:"🎾",content:["When you first open the app, you'll be asked to select your name from the member list.","Use the date selector to pick the day you want to play.","Check in by selecting your game preference and optionally setting your available times."]},{title:"Check-in Options",icon:"✅",content:["Doubles - You want to play doubles games (4 players).","Singles - You want to play singles games (2 players).","Both - You're flexible and happy to play either format.","Rotation - Enable this option to join 3-player rotation games where players take turns.","Time Range - Set your earliest and latest available times to help coordinate."]},{title:"Game Types",icon:"👥",content:["Doubles (green) - A confirmed 4-player doubles game.","Singles (green) - A confirmed 2-player singles game.","Rotation (green) - A confirmed 3-player game with rotating play.","Forming (yellow) - A game that needs more players to be complete."]},{title:"My Games",icon:"📅",content:["View all your upcoming games across all dates at a glance.","Tap any game card to jump directly to that day's check-in page.","Yellow background indicates the game is still forming and needs more players.","Green background means the game is confirmed and ready to play."]},{title:"Alerts",icon:"🔔",content:["Get notified when games are formed or when players join/leave.","Unread alerts show a red badge with the count on the tab.","Tap a notification to mark it as read.","Access notification settings to configure your preferences."]},{title:"Profile",icon:"👤",content:["Access your profile by tapping your name badge in the top-right corner.","Edit your display name, phone number, and email address.","Change your user session to switch to a different account.","Admin login is available for group administrators."]},{title:"Tips",icon:"💡",content:["Check in early to get matched with your preferred players.",`Select "Both" if you're flexible - it increases your chances of getting a game.`,"Set your time preferences to help organizers coordinate scheduling.","Enable rotation if you're open to 3-player games."]},{title:"Admin Features",icon:"⚙️",content:["Access admin mode via Admin Login in your Profile page.","Manage Members - Add, edit, or remove group members.","Group Settings - Configure group name, PINs, weather location, story, and rules.","Activity History - View all check-ins and changes with option to delete test data.","Group Insights - View game stats, player activity trends, and analytics."]}],a=r?r.split(`
`).filter(i=>i.trim()):[];return e("div",{style:"padding: 16px 0;",children:[n&&e("div",{style:{marginBottom:"24px"},children:[e("h2",{style:"margin: 0 0 16px 0; font-size: 20px;",children:["About ",Y.value]}),t&&e("div",{style:{background:"var(--color-primary-light, #E8F5E9)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid var(--color-primary-lighter, #C8E6C9)",marginBottom:"var(--spacing-xl, 12px)"},children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px); color: var(--color-primary, #2E7D32); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"})}),"Our Story"]}),e("p",{style:"margin: 0; color: var(--color-text-primary, #333); font-size: var(--font-size-base, 14px); line-height: 1.6; white-space: pre-wrap;",children:t})]}),a.length>0&&e("div",{style:{background:"var(--color-warning-light, #FFF8E1)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid #FFECB3"},children:[e("h3",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-md, 15px); color: var(--color-warning, #F57C00); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#FF9800",children:e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"})}),"Rules & Tips"]}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-text-primary, #333); font-size: var(--font-size-base, 14px); line-height: 1.6;",children:a.map((i,l)=>e("li",{style:"margin-bottom: var(--spacing-sm, 6px);",children:i},l))})]})]}),e("h2",{style:"margin: 0 0 16px 0; font-size: 20px;",children:"User Guide"}),e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:o.map((i,l)=>e("div",{style:{background:"var(--color-bg-subtle, #f9f9f9)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid var(--color-border, #e0e0e0)"},children:[e("h3",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-lg, 16px); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("span",{children:i.icon}),e("span",{children:i.title})]}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-text-secondary, #555); font-size: var(--font-size-base, 14px); line-height: 1.6;",children:i.content.map((c,s)=>e("li",{style:"margin-bottom: var(--spacing-xs, 4px);",children:c},s))})]},l))}),e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888); text-align: center; margin-top: var(--spacing-3xl, 20px);",children:"Need more help? Contact your group administrator."})]})}function Et({title:t,isOpen:r,onBack:n,children:o}){const a=to(null);return T(()=>{r&&a.current&&(a.current.scrollTop=0)},[r]),e("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1e3,pointerEvents:r?"auto":"none"},children:[e("div",{onClick:n,style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0, 0, 0, 0.3)",opacity:r?1:0,transition:"opacity 0.25s ease-out"}}),e("div",{ref:a,style:{position:"absolute",top:0,right:0,bottom:0,width:"100%",maxWidth:"500px",background:"var(--color-bg-main, #f5f5f5)",transform:r?"translateX(0)":"translateX(100%)",transition:"transform 0.25s ease-out",display:"flex",flexDirection:"column",overflow:"hidden"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md, 8px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",borderBottom:"1px solid var(--color-border, #e0e0e0)",flexShrink:0},children:[e("button",{onClick:n,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",background:"var(--color-bg-subtle, #f5f5f5)",border:"none",borderRadius:"var(--radius-full, 50%)",cursor:"pointer",fontSize:"20px",fontWeight:"bold",color:"var(--color-text-primary, #333)"},"aria-label":"Go back",children:"←"}),e("h2",{style:{margin:0,fontSize:"var(--font-size-xl, 18px)",fontWeight:600,color:"var(--color-text-primary, #333)"},children:t})]}),e("div",{style:{flex:1,overflowY:"auto",padding:"var(--spacing-2xl, 16px)"},children:o})]})]})}const ur=f(""),hr=f(""),gr=f(""),Qe=f(""),bt=f(""),yt=f(""),fr=f(""),vr=f(""),Yn=f(!1);function Fs(){ur.value=Y.value||"",hr.value=I.value.adminPin||"",gr.value=I.value.groupPin||"",Qe.value=I.value.location?.name||"",bt.value=I.value.location?.lat?.toString()||"",yt.value=I.value.location?.lon?.toString()||"",fr.value=I.value.groupDescription||"",vr.value=I.value.groupRules||"",Yn.value=!0}async function js(){const t=C.value;if(t)try{const n=E().ref(`groups/${t}/settings`),o={groupName:ur.value,adminPin:hr.value,groupPin:gr.value,groupDescription:fr.value||null,groupRules:vr.value||null};Qe.value&&bt.value&&yt.value&&(o.location={name:Qe.value,lat:parseFloat(bt.value),lon:parseFloat(yt.value)}),await n.update(o),Y.value=ur.value,I.value={...I.value,adminPin:hr.value,groupPin:gr.value,location:Qe.value?{name:Qe.value,lat:parseFloat(bt.value),lon:parseFloat(yt.value)}:void 0,groupDescription:fr.value||void 0,groupRules:vr.value||void 0},w("Settings saved","success")}catch(r){console.error("Error saving settings:",r),w("Failed to save settings","error")}}function Us(){return T(()=>(Fs(),()=>{Yn.value=!1}),[]),Yn.value?e("div",{children:[e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group Name"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Display name for this tennis group"}),e("input",{type:"text",placeholder:"e.g., Tue/Thu Midday Doubles",value:ur.value,onInput:t=>{ur.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group Story"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Tell your group's story - when/where you play, how it started, etc."}),e("textarea",{placeholder:"e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts...",value:fr.value,onInput:t=>{fr.value=t.target.value},rows:3,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Rules & Tips"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"House rules, etiquette, and tips for new members (one per line)"}),e("textarea",{placeholder:`e.g.,
Check in by 10am on game days
Bring water and sunscreen
New balls provided by rotating member...`,value:vr.value,onInput:t=>{vr.value=t.target.value},rows:4,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Admin PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Required to access admin settings"}),e("input",{type:"text",value:hr.value,onInput:t=>{hr.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Share this PIN with all group members to access the app"}),e("input",{type:"text",value:gr.value,onInput:t=>{gr.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Weather Location"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Set the location for weather forecasts"}),e("input",{type:"text",placeholder:"Location name (e.g., Los Gatos, CA)",value:Qe.value,onInput:t=>{Qe.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-md, 8px);"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-md, 8px);",children:[e("input",{type:"number",step:"0.0001",placeholder:"Latitude",value:bt.value,onInput:t=>{bt.value=t.target.value},style:"flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box;"}),e("input",{type:"number",step:"0.0001",placeholder:"Longitude",value:yt.value,onInput:t=>{yt.value=t.target.value},style:"flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box;"})]}),e("p",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);",children:["Tip: Use"," ",e("a",{href:"https://www.latlong.net/",target:"_blank",style:"color: var(--color-primary, #2C6E49);",children:"latlong.net"})," ","to find coordinates"]})]}),e("button",{onClick:js,style:{width:"100%",padding:"var(--spacing-xl, 12px)",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"var(--radius-lg, 8px)",fontSize:"var(--font-size-base, 14px)",fontWeight:"500",cursor:"pointer",marginTop:"var(--spacing-xl, 12px)"},children:"Save Settings"})]}):e("div",{style:"padding: 20px; text-align: center; color: var(--color-text-muted, #999);",children:"Loading..."})}const La={login:{label:"Logins",actions:["user_login"]},checkin:{label:"Check-ins",actions:["check-in","checkin"]},removal:{label:"Removals",actions:["removal"]},shared:{label:"Shared",actions:["whatsapp_share"]},notes:{label:"Notes",actions:["notes_saved","note_added","note_updated","note_removed"]},members:{label:"Members",actions:["member_added","member_removed","member_renamed"]},arrangements:{label:"Arrangements",actions:["arrangement_saved","arrangement_cleared"]}},ot=f(!1),mr=f([]),qn=f(!1),ve=f(new Set);async function Os(){const t=C.value;if(t){qn.value=!0;try{const r=E(),n=[],a=(await r.ref(`groups/${t}/activity`).once("value")).val();if(a){for(const[i,l]of Object.entries(a))if(l)for(const[c,s]of Object.entries(l))n.push({...s,date:i,firebaseKey:c})}n.sort((i,l)=>l.timestamp-i.timestamp),mr.value=n}catch(r){console.error("Error loading activity:",r)}finally{qn.value=!1}}}async function Ws(t){const r=C.value;if(!(!r||!t.firebaseKey||!t.date)&&confirm("Remove this activity entry?"))try{await E().ref(`groups/${r}/activity/${t.date}/${t.firebaseKey}`).remove(),mr.value=mr.value.filter(o=>!(o.date===t.date&&o.firebaseKey===t.firebaseKey))}catch(n){console.error("Error deleting activity:",n),alert("Failed to delete activity")}}function Hs(t){return oo(t)}function Gs(t){switch(t){case"check-in":case"checkin":return"✅";case"removal":return"❌";case"member_added":return"👤";case"member_removed":return"🚫";case"member_renamed":return"✏️";case"whatsapp_share":return"📤";case"notes_saved":case"note_added":return"📝";case"note_updated":return"✏️";case"note_removed":return"🗑️";case"user_login":return"🔓";case"arrangement_saved":return"🔀";case"arrangement_cleared":return"↩️";default:return"📋"}}function Vs(t){const{action:r,player:n,by:o,playStyle:a,timeRange:i,matchKey:l,type:c}=t;switch(r){case"check-in":case"checkin":{let s=`${n} checked in`;return o&&o!==n&&(s+=` (by ${o})`),a&&(s+=` - ${ln(a)}`,(i?.start||i?.end)&&(s+=` (${i.start||"anytime"}–${i.end||"anytime"})`)),s}case"removal":return o&&o!==n?`${o} removed ${n}`:`${n} removed themselves`;case"member_added":return`${o} added ${n} as member`;case"member_removed":return`${o} removed ${n} from members`;case"member_renamed":return`${o} renamed ${t.oldName} to ${n}`;case"whatsapp_share":{let d=`${o} shared ${c==="matches"?"matches":c==="checkin"?"check-in":"removal"} to WhatsApp`;return n&&n!==o&&(d+=` (for ${n})`),d}case"notes_saved":case"note_added":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} added note to ${s}${d}`}case"note_updated":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} updated note on ${s}${d}`}case"note_removed":{const s=l?l.replace("-"," #").replace("forming 1","forming"):"match";return`${o} removed note from ${s}`}case"user_login":return`${n} logged in`;case"arrangement_saved":{const{matchCount:s}=t;let d=`${o} arranged matches`;return s&&(d+=` (${s} match${s>1?"es":""})`),d}case"arrangement_cleared":return`${o} cleared arrangement (back to auto)`;default:return`${n} - ${r}`}}function Ys(t){const r=new Set(ve.value);r.has(t)?r.delete(t):r.add(t),ve.value=r}function qs(){if(ve.value.size===0)return mr.value;const t=new Set;return ve.value.forEach(r=>{La[r].actions.forEach(n=>t.add(n))}),mr.value.filter(r=>t.has(r.action))}function Ks(){T(()=>(Os(),()=>{ot.value=!1,ve.value=new Set}),[]);const t=qs(),r={};return ot.value?t.forEach(n=>{r[n.date]||(r[n.date]=[]),r[n.date].push(n)}):t.forEach(n=>{const o=new Date(n.timestamp).toISOString().split("T")[0];r[o]||(r[o]=[]),r[o].push(n)}),e("div",{children:[e("div",{style:"display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;",children:[Object.entries(La).map(([n,o])=>{const a=ve.value.has(n);return e("button",{onClick:()=>Ys(n),style:{padding:"4px 10px",fontSize:"12px",border:a?"1px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #ddd)",borderRadius:"var(--radius-2xl, 16px)",background:a?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, #fff)",color:a?"var(--color-primary, #2E7D32)":"var(--color-text-secondary, #666)",cursor:"pointer",fontWeight:a?"500":"400"},children:o.label},n)}),ve.value.size>0&&e("button",{onClick:()=>{ve.value=new Set},style:{padding:"4px 10px",fontSize:"var(--font-size-sm, 12px)",border:"1px solid var(--color-error, #f44336)",borderRadius:"var(--radius-2xl, 16px)",background:"var(--color-bg-card, #fff)",color:"var(--color-error, #f44336)",cursor:"pointer"},children:"Clear"})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin: 0;",children:[ot.value?"Grouped by play date":"Grouped by when changes were made",ve.value.size>0&&` (${t.length} filtered)`]}),e("label",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); cursor: pointer; display: flex; align-items: center; gap: 4px;",children:[e("input",{type:"checkbox",checked:ot.value,onChange:n=>{ot.value=n.target.checked}}),"Group by Play Date"]})]}),e("div",{children:qn.value?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:"Loading..."}):t.length===0?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:ve.value.size>0?"No matching activities":"No activity recorded yet"}):Object.entries(r).sort(([n],[o])=>o.localeCompare(n)).map(([n,o])=>e("div",{children:[e("div",{style:"font-weight: bold; color: var(--color-text-secondary, #666); margin-top: 12px; padding-bottom: 4px; border-bottom: 1px solid var(--color-border, #ddd);",children:H(n)}),o.map((a,i)=>e("div",{style:"padding: 10px; background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-md, 6px); font-size: var(--font-size-base, 14px); margin-top: 8px; position: relative;",children:e("div",{style:"display: flex; align-items: flex-start; gap: 6px;",children:[e("span",{children:Gs(a.action)}),e("div",{style:"flex: 1;",children:[e("div",{style:"white-space: pre-wrap;",children:Vs(a)}),a.arrangementDetails&&e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-top: 4px; background: var(--color-bg-card, #fff); padding: 6px 8px; border-radius: var(--radius-sm, 4px); border: 1px solid var(--color-border, #e0e0e0);",children:a.arrangementDetails}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #999); margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap;",children:[e("span",{children:Hs(a.timestamp)}),ot.value?e("span",{style:"color: var(--color-text-secondary, #666);",children:["changed on"," ",H(new Date(a.timestamp).toISOString().split("T")[0])]}):e("span",{style:"color: var(--color-primary, #2C6E49);",children:["for ",H(a.date)]})]})]}),e("button",{onClick:()=>Ws(a),title:"Remove this activity",style:{background:"none",border:"none",padding:"var(--spacing-xs, 4px)",cursor:"pointer",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-lg, 16px)",lineHeight:"1",borderRadius:"var(--radius-sm, 4px)"},className:"hover-danger",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})},i))]},n))})]})}const Na=f({}),Kn=f(!1);function Js(t){const n=Date.now()-t,o=Math.floor(n/(1e3*60)),a=Math.floor(n/(1e3*60*60)),i=Math.floor(n/(1e3*60*60*24));return o<1?"Just now":o<60?`${o}m ago`:a<24?`${a}h ago`:i===1?"Yesterday":i<7?`${i} days ago`:new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric"})}async function Qs(t){if(t.length===0)return;Kn.value=!0;const r=E(),n={};try{for(const o of t){const a=await r.ref(`groups/${o}/settings/groupName`).once("value");n[o]=a.val()||o}Na.value=n}catch(o){console.warn("Failed to load group names:",o)}finally{Kn.value=!1}}function Xs(t){window.location.href=`/?group=${t}`}function Zs(){const t=ui();return T(()=>{const r=t.map(n=>n.groupId);Qs(r)},[t.length]),An.value?e("div",{style:"padding: 40px 20px; text-align: center; color: var(--color-text-muted, #999);",children:"Loading..."}):L.value?t.length===0?e("div",{style:"padding: 40px 20px; text-align: center;",children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})})}),e("p",{style:"color: var(--color-text-muted, #888); margin: 0 0 8px 0; font-size: 16px;",children:"No groups yet"}),e("p",{style:"color: var(--color-text-disabled, #aaa); margin: 0; font-size: 14px;",children:"Groups you join will appear here"})]}):e("div",{style:"padding: 8px 0;",children:[e("p",{style:"color: var(--color-text-muted, #888); font-size: 13px; margin: 0 0 16px 0; padding: 0 4px;",children:[t.length," group",t.length!==1?"s":""," on this device"]}),e("div",{style:"display: flex; flex-direction: column; gap: 8px;",children:t.map(r=>e("button",{onClick:()=>Xs(r.groupId),style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"12px",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"44px",height:"44px",borderRadius:"50%",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e("svg",{viewBox:"0 0 24 24",width:"24",height:"24",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})})}),e("div",{style:"flex: 1; min-width: 0;",children:[e("div",{style:{fontSize:"16px",fontWeight:500,color:"var(--color-text-primary, #333)",marginBottom:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:Kn.value?r.groupId:Na.value[r.groupId]||r.groupId}),e("div",{style:"font-size: 13px; color: var(--color-text-muted, #888);",children:[r.memberName," • ",Js(r.lastActive)]})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]},r.groupId))})]}):e("div",{style:"padding: 40px 20px; text-align: center;",children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})})}),e("p",{style:"color: var(--color-text-muted, #888); margin: 0;",children:"Your groups will appear here once you check in"})]})}function No(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function ec(){const[t,r]=De(No()),[n,o]=De(null);T(()=>{const g=setInterval(()=>{r(No())},1e3);return()=>clearInterval(g)},[]);const a=k.value&&J.value?J.value[k.value]:null,i=L.value?.profile,l=i?.phone||a?.phone,c=i?.email||a?.email,s=()=>{if(confirm("Change user? This will clear your current session.")){const g=C.value;g&&localStorage.removeItem(`sessionUser_${g}`),k.value="",w("Please select your name","info"),ar.value=!0}},d=()=>{const g=C.value;g&&(sessionStorage.removeItem(`adminAuth_${g}`),r(!1),w("Logged out of admin mode","info"))};return e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[e("h2",{style:"margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);",children:"Profile"}),e("button",{onClick:()=>k.value&&Ea(k.value),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left",marginBottom:"var(--spacing-2xl, 16px)"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:k.value||"Not set"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:l||c?[l,c].filter(Boolean).join(" • "):"Tap to add contact info"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("div",{style:"display: flex; flex-direction: column; gap: var(--spacing-md, 8px);",children:[e("button",{onClick:()=>o("mygroups"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:["My Groups",So.value>0&&e("span",{style:{marginLeft:"8px",padding:"2px 8px",background:"var(--color-primary, #2C6E49)",color:"#fff",borderRadius:"12px",fontSize:"12px",fontWeight:600},children:So.value})]}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"View all your groups on this device"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),t&&e(R,{children:[e("button",{onClick:()=>o("settings"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Group Settings"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Name, PIN, location, and other settings"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("activity"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Activity History"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"View recent check-ins and changes"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("insights"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Group Insights"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Game stats, player activity, and trends"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:d,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-warning-light, #FFF3E0)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-warning, #FF9800)",children:e("path",{d:"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-warning, #FF9800);",children:"Exit Admin Mode"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Return to regular user view"})]})]})]}),!t&&e("button",{onClick:()=>{Gt.value=!0},style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-warning-light, #FFF3E0)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-warning, #FF9800)",children:e("path",{d:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Admin Login"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Access group settings and member management"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("help"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Help & Support"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"How to use the app and get support"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:s,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left",marginTop:t?"var(--spacing-md, 8px)":"0"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Change User"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Switch to a different account"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-disabled, #aaa); text-align: center; margin-top: var(--spacing-4xl, 32px);",children:["Tennis Coordinator"," ",e("a",{href:"/release-notes.html",target:"_blank",style:"color: var(--color-primary, #2C6E49); text-decoration: none;",children:"v1.0.0"})]}),e(Et,{title:"Group Settings",isOpen:n==="settings",onBack:()=>o(null),children:e(Us,{})}),e(Et,{title:"Activity History",isOpen:n==="activity",onBack:()=>o(null),children:e(Ks,{})}),e(Et,{title:"Group Insights",isOpen:n==="insights",onBack:()=>o(null),children:e(Ns,{})}),e(Et,{title:"Help & Support",isOpen:n==="help",onBack:()=>o(null),children:e(Bs,{})}),e(Et,{title:"My Groups",isOpen:n==="mygroups",onBack:()=>o(null),children:e(Zs,{})})]})}const en=f(!1),tn=f(""),j=f("both");f(!1);f(!1);const ct=f(""),Rt=f(""),Ur=f(""),Or=f(""),Wr=f(""),tc=f(""),Se=f(!0),O=f(""),W=f("");f(!0);const at=f(!1),xe=f(!1),be=f(null);function rc(){bi(),yi(),wi(),Li(),T(()=>{const n=C.value;if(n){if(sessionStorage.getItem("siteAdminAuth")==="true"){at.value=!0;return}const a=`pinAuth_${n}`,i=sessionStorage.getItem(a)==="true";at.value=i}},[C.value]),T(()=>{A.value=gi()},[]),T(()=>{const n=C.value;if(n){const o=localStorage.getItem(`sessionUser_${n}`);o?k.value=o:at.value&&(ar.value=!0)}},[C.value,at.value]);const t=()=>{const n=C.value;n&&sessionStorage.setItem(`pinAuth_${n}`,"true"),at.value=!0,window.scrollTo(0,0),k.value||(ar.value=!0)},r=!at.value&&!!I.value.groupPin;return e(R,{children:[e(Gi,{isOpen:r,groupName:Y.value,correctPin:I.value.groupPin,onSuccess:t}),e(bl,{}),e(Ji,{}),e(al,{}),e(vl,{}),e(dl,{}),e("div",{class:"container",id:"appContainer",style:r?"filter: blur(5px); pointer-events: none;":"",children:[e(Hi,{}),e("div",{style:"padding-bottom: 80px;",children:[ae.value==="checkin"&&e(ds,{}),ae.value==="matches"&&e(_s,{}),ae.value==="notifications"&&e(As,{}),ae.value==="directory"&&e(Ts,{}),ae.value==="profile"&&e(ec,{})]})]}),e($l,{}),e(Ui,{}),e(El,{}),e(Ml,{}),e(Al,{}),e(Nl,{})]})}const $r=f(!1),Z=f({}),Bo=f(!0),Sn=f(null),Ue=f(null),Ir=f(null),Dt=f(""),it=f(!1),Pe=f(null),Er=f("");function nc(){T(()=>{t()},[]);async function t(){try{const v=(await E().ref("siteSettings").once("value")).val();Sn.value=v?.siteAdminPin||null,sessionStorage.getItem("siteAdminAuth")==="true"&&($r.value=!0,await r())}catch(h){console.error("Error initializing admin page:",h),w("Failed to initialize","error")}finally{Bo.value=!1}}async function r(){try{const p=await E().ref("groups").once("value");Z.value=p.val()||{}}catch(h){console.error("Error loading groups:",h),w("Failed to load groups","error")}}function n(h){h.preventDefault(),Ue.value=null;const v=h.target.querySelector("input"),m=v.value.trim();if(!m){Ue.value="Please enter a PIN";return}if(!Sn.value){Ue.value="Site admin PIN not configured. Please set siteAdminPin in siteSettings in Firebase.";return}m===Sn.value?(sessionStorage.setItem("siteAdminAuth","true"),$r.value=!0,Ue.value=null,r()):(Ue.value="Incorrect PIN. Please try again.",v.value="",v.focus())}function o(){sessionStorage.removeItem("siteAdminAuth"),$r.value=!1,Z.value={}}function a(){window.location.hash="",window.location.reload()}function i(h){Ir.value===h?Ir.value=null:(Ir.value=h,Dt.value="")}async function l(h){const p=Dt.value.trim();if(!p){w("Please enter a member name","error");return}it.value=!0;try{const v=E(),m=Z.value[h],b=m?.settings?.members||[];if(b.some(y=>y.toLowerCase()===p.toLowerCase())){w("Member already exists","error"),it.value=!1;return}const x=[...b,p];await v.ref(`groups/${h}/settings/members`).set(x),Z.value={...Z.value,[h]:{...m,settings:{...m?.settings,members:x}}},Dt.value="",w(`Added ${p} to the group`,"success")}catch(v){console.error("Error adding member:",v),w("Failed to add member","error")}finally{it.value=!1}}async function c(h,p){if(confirm(`Remove ${p} from this group?`))try{const v=E(),m=Z.value[h],x=(m?.settings?.members||[]).filter(y=>y!==p);await v.ref(`groups/${h}/settings/members`).set(x),Z.value={...Z.value,[h]:{...m,settings:{...m?.settings,members:x}}},w(`Removed ${p}`,"success")}catch(v){console.error("Error removing member:",v),w("Failed to remove member","error")}}function s(h,p){Pe.value={groupId:h,originalName:p},Er.value=p}async function d(){const h=Pe.value;if(!h)return;const p=Er.value.trim();if(!p){w("Name cannot be empty","error");return}if(p===h.originalName){Pe.value=null;return}const v=Z.value[h.groupId],m=v?.settings?.members||[];if(m.some(b=>b.toLowerCase()===p.toLowerCase()&&b!==h.originalName)){w("A member with this name already exists","error");return}try{const b=E(),x=m.map($=>$===h.originalName?p:$);await b.ref(`groups/${h.groupId}/settings/members`).set(x);const y=v?.settings?.memberDetails||{};if(y[h.originalName]){const $=y[h.originalName];await b.ref(`groups/${h.groupId}/settings/memberDetails/${h.originalName}`).remove(),await b.ref(`groups/${h.groupId}/settings/memberDetails/${p}`).set($);const P={...y};P[p]=$,delete P[h.originalName],Z.value={...Z.value,[h.groupId]:{...v,settings:{...v?.settings,members:x,memberDetails:P}}}}else Z.value={...Z.value,[h.groupId]:{...v,settings:{...v?.settings,members:x}}};const z=(await b.ref(`groups/${h.groupId}/checkins`).once("value")).val()||{};for(const[$,P]of Object.entries(z))if(P&&typeof P=="object"){const X=Object.values(P);let we=!1;const ke=X.map(ce=>ce&&ce.name===h.originalName?(we=!0,{...ce,name:p}):ce);we&&await b.ref(`groups/${h.groupId}/checkins/${$}`).set(ke)}Pe.value=null,w(`Renamed ${h.originalName} to ${p}`,"success")}catch(b){console.error("Error renaming member:",b),w("Failed to rename member","error")}}if(Bo.value)return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-container",children:e("div",{class:"site-admin-loading",children:[e("div",{class:"loading-spinner-icon"}),e("p",{children:"Loading..."})]})})});if(!$r.value)return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-container",children:e("div",{class:"site-admin-login-card",children:[e("div",{class:"site-admin-header",children:[e("span",{class:"site-admin-icon",children:"🔐"}),e("h1",{children:"Site Administration"}),e("p",{class:"site-admin-subtitle",children:"Tennis Coordinator Platform"})]}),e("form",{onSubmit:n,class:"site-admin-form",children:[e("div",{class:"form-group",children:[e("label",{for:"admin-pin",children:"Administrator PIN"}),e("input",{id:"admin-pin",type:"password",placeholder:"Enter your PIN",class:"site-admin-input",autoFocus:!0})]}),Ue.value&&e("div",{class:"site-admin-error",children:[e("span",{class:"error-icon",children:"⚠️"}),Ue.value]}),e("button",{type:"submit",class:"site-admin-submit",children:"Sign In"})]}),e("div",{class:"site-admin-footer",children:e("button",{onClick:a,class:"back-to-home",children:"← Back to Home"})})]})})});const g=Object.entries(Z.value),u=g.reduce((h,[,p])=>h+(p.settings?.members?.length||0),0);return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-dashboard",children:[e("header",{class:"site-admin-dashboard-header",children:[e("div",{class:"header-left",children:[e("h1",{children:"🎾 Site Administration"}),e("p",{class:"header-subtitle",children:"Tennis Coordinator Platform"})]}),e("button",{onClick:o,class:"logout-button",children:"Sign Out"})]}),e("div",{class:"site-admin-stats",children:[e("div",{class:"stat-card",children:[e("span",{class:"stat-value",children:g.length}),e("span",{class:"stat-label",children:"Tennis Groups"})]}),e("div",{class:"stat-card",children:[e("span",{class:"stat-value",children:u}),e("span",{class:"stat-label",children:"Total Members"})]})]}),e("section",{class:"site-admin-section",children:[e("h2",{children:"All Tennis Groups"}),g.length===0?e("div",{class:"empty-state",children:e("p",{children:"No tennis groups have been created yet."})}):e("div",{class:"groups-grid",children:g.map(([h,p])=>{const v=p.settings?.members||[],m=Ir.value===h;return e("div",{class:`group-card ${m?"expanded":""}`,children:[e("div",{class:"group-card-header",children:[e("h3",{children:p.settings?.groupName||h}),e("span",{class:"group-id",children:["#",h]})]}),e("div",{class:"group-card-body",children:[e("div",{class:"group-stat",children:[e("span",{class:"group-stat-icon",children:"👥"}),e("span",{children:[v.length," members"]})]}),p.settings?.location?.name&&e("div",{class:"group-stat",children:[e("span",{class:"group-stat-icon",children:"📍"}),e("span",{children:p.settings.location.name})]})]}),m&&e("div",{class:"group-members-section",children:[e("div",{class:"members-header",children:e("h4",{children:"Members"})}),e("div",{class:"add-member-form",children:[e("input",{type:"text",placeholder:"Enter member name",value:Dt.value,onInput:b=>{Dt.value=b.target.value},onKeyDown:b=>{b.key==="Enter"&&(b.preventDefault(),l(h))},class:"member-input",disabled:it.value}),e("button",{onClick:()=>l(h),class:"add-member-btn",disabled:it.value,children:it.value?"...":"Add"})]}),e("div",{class:"members-list",children:v.length===0?e("p",{class:"no-members",children:"No members yet. Add the first member above."}):v.map(b=>{const x=Pe.value?.groupId===h&&Pe.value?.originalName===b;return e("div",{class:"member-item",children:x?e(R,{children:[e("input",{type:"text",value:Er.value,onInput:y=>{Er.value=y.target.value},onKeyDown:y=>{y.key==="Enter"?(y.preventDefault(),d()):y.key==="Escape"&&(Pe.value=null)},class:"edit-member-input",autoFocus:!0}),e("button",{onClick:d,class:"save-member-btn",title:"Save",children:"✓"}),e("button",{onClick:()=>{Pe.value=null},class:"cancel-edit-btn",title:"Cancel",children:"✕"})]}):e(R,{children:[e("span",{class:"member-name",children:b}),e("button",{onClick:()=>s(h,b),class:"edit-member-btn",title:"Edit name",children:"✎"}),e("button",{onClick:()=>c(h,b),class:"remove-member-btn",title:"Remove member",children:"×"})]})},b)})})]}),e("div",{class:"group-card-footer",children:[e("button",{onClick:()=>i(h),class:"manage-members-btn",children:m?"Hide Members":"Manage Members"}),e("a",{href:`#${h}`,class:"view-group-link",onClick:b=>{b.preventDefault(),window.location.hash=h,window.location.reload()},children:"View Group →"})]})]},h)})})]})]})})}function oc({message:t,type:r}){const n=()=>{switch(r){case"success":return"✓";case"error":return"✕";default:return"ℹ"}};return e("div",{class:`toast toast-${r}`,children:[e("span",{class:"toast-icon",children:n()}),e("span",{class:"toast-message",children:t})]})}const Ot=Me("App"),C=f(null),Y=f(""),A=f(null),k=f(""),Fo=f(!0),Pt=f([]),Q=f({}),V=f([]),J=f({}),ac=Fe(()=>A.value?Q.value[A.value]||[]:[]);let ic=0;function w(t,r="info"){const n=++ic;Pt.value=[...Pt.value,{id:n,message:t,type:r}],setTimeout(()=>{Pt.value=Pt.value.filter(o=>o.id!==n)},3e3)}async function Dr(t){try{const o=(await E().ref("groups").once("value")).val()||{};for(const[a,i]of Object.entries(o))if(i.settings&&i.settings.shortCode===t)return Ot.debug(`Resolved short code "${t}" to group ID: ${a}`),a;return Ot.debug(`No match found for short code "${t}", using as-is`),null}catch(r){return Ot.error("resolveShortCode Error:",r),null}}async function lc(){const t=sessionStorage.getItem("redirect");if(t){sessionStorage.removeItem("redirect");const c=t.replace(/^\/+|\/+$/g,"");if(c==="admin")return history.replaceState(null,"",t),"admin";if(c&&c!=="index.html"&&c!=="app.html")return history.replaceState(null,"",t),await Dr(c)||c}const r=window.location.hash.replace(/^#\/?/,"");if(r&&r!=="admin")return await Dr(r)||r;if(r==="admin")return"admin";const o=new URLSearchParams(window.location.search).get("group");if(o)return await Dr(o)||o;const i=window.location.pathname.replace(/^\/+|\/+$/g,"");return i==="admin"?"admin":!i||i==="index.html"||i==="app.html"?null:await Dr(i)||i}function sc(){return T(()=>{async function t(){try{ua(),ci().catch(n=>{Ot.warn("Platform user init failed (non-fatal):",n)});const r=await lc();if(C.value=r,r&&r!=="admin"){const n=localStorage.getItem(`sessionUser_${r}`);n&&(k.value=n)}}catch(r){Ot.error("Initialization error:",r),w("Failed to initialize app","error")}finally{Fo.value=!1}}t()},[]),Fo.value?e(Ql,{text:"Loading..."}):e(R,{children:[C.value===null&&e(hi,{}),C.value==="admin"&&e(nc,{}),C.value&&C.value!=="admin"&&e(rc,{}),e("div",{class:"toast-container",children:Pt.value.map(t=>e(oc,{message:t.message,type:t.type},t.id))})]})}function cc(){const r=new URLSearchParams(window.location.search).get("group");if(r)return r;const o=window.location.pathname.replace(/^\/+|\/+$/g,"").split("/").filter(Boolean);return o.length>0&&o[0]!=="index.html"&&o[0]!=="app.html"?o[0]:null}const dc={ttmd:"Midday Tennis"};function pc(){const t=cc();if(t){const r=dc[t]||"Tennis",n={name:r,short_name:r.length>12?r.split(" ")[0]:r,description:"Tennis match coordination and check-in system",display:"standalone",background_color:"#ffffff",theme_color:"#4CAF50",orientation:"portrait-primary",start_url:`/${t}`,scope:"/",icons:[{src:"/assets/icon-192.png",sizes:"192x192",type:"image/png",purpose:"any maskable"},{src:"/assets/icon-512.png",sizes:"512x512",type:"image/png",purpose:"any maskable"},{src:"/assets/apple-touch-icon.png",sizes:"180x180",type:"image/png",purpose:"any"}]},o=new Blob([JSON.stringify(n)],{type:"application/json"}),a=URL.createObjectURL(o),i=document.getElementById("manifestLink");i&&(i.href=a);let l=document.querySelector('meta[name="apple-mobile-web-app-title"]');l?l.setAttribute("content",r):(l=document.createElement("meta"),l.setAttribute("name","apple-mobile-web-app-title"),l.setAttribute("content",r),document.head.appendChild(l)),document.title=r}}pc();Ga(e(sc,{}),document.getElementById("app"));
