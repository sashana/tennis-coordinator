(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();var Gr,D,Co,zo,Te,Qn,So,$o,Io,Nn,fn,mn,Tt={},Mo=[],xa=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Yr=Array.isArray;function _e(t,r){for(var n in r)t[n]=r[n];return t}function Ln(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function ba(t,r,n){var o,a,i,l={};for(i in r)i=="key"?o=r[i]:i=="ref"?a=r[i]:l[i]=r[i];if(arguments.length>2&&(l.children=arguments.length>3?Gr.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(i in t.defaultProps)l[i]===void 0&&(l[i]=t.defaultProps[i]);return kr(t,l,o,a,null)}function kr(t,r,n,o,a){var i={type:t,props:r,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:a??++Co,__i:-1,__u:0};return a==null&&D.vnode!=null&&D.vnode(i),i}function A(t){return t.children}function zt(t,r){this.props=t,this.context=r}function pt(t,r){if(r==null)return t.__?pt(t.__,t.__i+1):null;for(var n;r<t.__k.length;r++)if((n=t.__k[r])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?pt(t):null}function Do(t){var r,n;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,r=0;r<t.__k.length;r++)if((n=t.__k[r])!=null&&n.__e!=null){t.__e=t.__c.base=n.__e;break}return Do(t)}}function Xn(t){(!t.__d&&(t.__d=!0)&&Te.push(t)&&!Pr.__r++||Qn!=D.debounceRendering)&&((Qn=D.debounceRendering)||So)(Pr)}function Pr(){for(var t,r,n,o,a,i,l,s=1;Te.length;)Te.length>s&&Te.sort($o),t=Te.shift(),s=Te.length,t.__d&&(n=void 0,o=void 0,a=(o=(r=t).__v).__e,i=[],l=[],r.__P&&((n=_e({},o)).__v=o.__v+1,D.vnode&&D.vnode(n),Fn(r.__P,n,o,r.__n,r.__P.namespaceURI,32&o.__u?[a]:null,i,a??pt(o),!!(32&o.__u),l),n.__v=o.__v,n.__.__k[n.__i]=n,Ro(i,n,l),o.__e=o.__=null,n.__e!=a&&Do(n)));Pr.__r=0}function Eo(t,r,n,o,a,i,l,s,c,d,g){var h,u,p,f,m,b,x,y=o&&o.__k||Mo,S=r.length;for(c=ya(n,r,y,c,S),h=0;h<S;h++)(p=n.__k[h])!=null&&(u=p.__i==-1?Tt:y[p.__i]||Tt,p.__i=h,b=Fn(t,p,u,a,i,l,s,c,d,g),f=p.__e,p.ref&&u.ref!=p.ref&&(u.ref&&Bn(u.ref,null,p),g.push(p.ref,p.__c||f,p)),m==null&&f!=null&&(m=f),(x=!!(4&p.__u))||u.__k===p.__k?c=Ao(p,c,t,x):typeof p.type=="function"&&b!==void 0?c=b:f&&(c=f.nextSibling),p.__u&=-7);return n.__e=m,c}function ya(t,r,n,o,a){var i,l,s,c,d,g=n.length,h=g,u=0;for(t.__k=new Array(a),i=0;i<a;i++)(l=r[i])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=t.__k[i]=kr(null,l,null,null,null):Yr(l)?l=t.__k[i]=kr(A,{children:l},null,null,null):l.constructor==null&&l.__b>0?l=t.__k[i]=kr(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):t.__k[i]=l,c=i+u,l.__=t,l.__b=t.__b+1,(d=l.__i=wa(l,n,c,h))!=-1&&(h--,(s=n[d])&&(s.__u|=2)),s==null||s.__v==null?(d==-1&&(a>g?u--:a<g&&u++),typeof l.type!="function"&&(l.__u|=4)):d!=c&&(d==c-1?u--:d==c+1?u++:(d>c?u--:u++,l.__u|=4))):t.__k[i]=null;if(h)for(i=0;i<g;i++)(s=n[i])!=null&&(2&s.__u)==0&&(s.__e==o&&(o=pt(s)),Po(s,s));return o}function Ao(t,r,n,o){var a,i;if(typeof t.type=="function"){for(a=t.__k,i=0;a&&i<a.length;i++)a[i]&&(a[i].__=t,r=Ao(a[i],r,n,o));return r}t.__e!=r&&(o&&(r&&t.type&&!r.parentNode&&(r=pt(t)),n.insertBefore(t.__e,r||null)),r=t.__e);do r=r&&r.nextSibling;while(r!=null&&r.nodeType==8);return r}function wa(t,r,n,o){var a,i,l,s=t.key,c=t.type,d=r[n],g=d!=null&&(2&d.__u)==0;if(d===null&&s==null||g&&s==d.key&&c==d.type)return n;if(o>(g?1:0)){for(a=n-1,i=n+1;a>=0||i<r.length;)if((d=r[l=a>=0?a--:i++])!=null&&(2&d.__u)==0&&s==d.key&&c==d.type)return l}return-1}function Zn(t,r,n){r[0]=="-"?t.setProperty(r,n??""):t[r]=n==null?"":typeof n!="number"||xa.test(r)?n:n+"px"}function cr(t,r,n,o,a){var i,l;e:if(r=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof o=="string"&&(t.style.cssText=o=""),o)for(r in o)n&&r in n||Zn(t.style,r,"");if(n)for(r in n)o&&n[r]==o[r]||Zn(t.style,r,n[r])}else if(r[0]=="o"&&r[1]=="n")i=r!=(r=r.replace(Io,"$1")),l=r.toLowerCase(),r=l in t||r=="onFocusOut"||r=="onFocusIn"?l.slice(2):r.slice(2),t.l||(t.l={}),t.l[r+i]=n,n?o?n.u=o.u:(n.u=Nn,t.addEventListener(r,i?mn:fn,i)):t.removeEventListener(r,i?mn:fn,i);else{if(a=="http://www.w3.org/2000/svg")r=r.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(r!="width"&&r!="height"&&r!="href"&&r!="list"&&r!="form"&&r!="tabIndex"&&r!="download"&&r!="rowSpan"&&r!="colSpan"&&r!="role"&&r!="popover"&&r in t)try{t[r]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&r[4]!="-"?t.removeAttribute(r):t.setAttribute(r,r=="popover"&&n==1?"":n))}}function eo(t){return function(r){if(this.l){var n=this.l[r.type+t];if(r.t==null)r.t=Nn++;else if(r.t<n.u)return;return n(D.event?D.event(r):r)}}}function Fn(t,r,n,o,a,i,l,s,c,d){var g,h,u,p,f,m,b,x,y,S,z,$,T,Q,me,xe,le,q=r.type;if(r.constructor!=null)return null;128&n.__u&&(c=!!(32&n.__u),i=[s=r.__e=n.__e]),(g=D.__b)&&g(r);e:if(typeof q=="function")try{if(x=r.props,y="prototype"in q&&q.prototype.render,S=(g=q.contextType)&&o[g.__c],z=g?S?S.props.value:g.__:o,n.__c?b=(h=r.__c=n.__c).__=h.__E:(y?r.__c=h=new q(x,z):(r.__c=h=new zt(x,z),h.constructor=q,h.render=_a),S&&S.sub(h),h.state||(h.state={}),h.__n=o,u=h.__d=!0,h.__h=[],h._sb=[]),y&&h.__s==null&&(h.__s=h.state),y&&q.getDerivedStateFromProps!=null&&(h.__s==h.state&&(h.__s=_e({},h.__s)),_e(h.__s,q.getDerivedStateFromProps(x,h.__s))),p=h.props,f=h.state,h.__v=r,u)y&&q.getDerivedStateFromProps==null&&h.componentWillMount!=null&&h.componentWillMount(),y&&h.componentDidMount!=null&&h.__h.push(h.componentDidMount);else{if(y&&q.getDerivedStateFromProps==null&&x!==p&&h.componentWillReceiveProps!=null&&h.componentWillReceiveProps(x,z),r.__v==n.__v||!h.__e&&h.shouldComponentUpdate!=null&&h.shouldComponentUpdate(x,h.__s,z)===!1){for(r.__v!=n.__v&&(h.props=x,h.state=h.__s,h.__d=!1),r.__e=n.__e,r.__k=n.__k,r.__k.some(function(be){be&&(be.__=r)}),$=0;$<h._sb.length;$++)h.__h.push(h._sb[$]);h._sb=[],h.__h.length&&l.push(h);break e}h.componentWillUpdate!=null&&h.componentWillUpdate(x,h.__s,z),y&&h.componentDidUpdate!=null&&h.__h.push(function(){h.componentDidUpdate(p,f,m)})}if(h.context=z,h.props=x,h.__P=t,h.__e=!1,T=D.__r,Q=0,y){for(h.state=h.__s,h.__d=!1,T&&T(r),g=h.render(h.props,h.state,h.context),me=0;me<h._sb.length;me++)h.__h.push(h._sb[me]);h._sb=[]}else do h.__d=!1,T&&T(r),g=h.render(h.props,h.state,h.context),h.state=h.__s;while(h.__d&&++Q<25);h.state=h.__s,h.getChildContext!=null&&(o=_e(_e({},o),h.getChildContext())),y&&!u&&h.getSnapshotBeforeUpdate!=null&&(m=h.getSnapshotBeforeUpdate(p,f)),xe=g,g!=null&&g.type===A&&g.key==null&&(xe=To(g.props.children)),s=Eo(t,Yr(xe)?xe:[xe],r,n,o,a,i,l,s,c,d),h.base=r.__e,r.__u&=-161,h.__h.length&&l.push(h),b&&(h.__E=h.__=null)}catch(be){if(r.__v=null,c||i!=null)if(be.then){for(r.__u|=c?160:128;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;i[i.indexOf(s)]=null,r.__e=s}else{for(le=i.length;le--;)Ln(i[le]);xn(r)}else r.__e=n.__e,r.__k=n.__k,be.then||xn(r);D.__e(be,r,n)}else i==null&&r.__v==n.__v?(r.__k=n.__k,r.__e=n.__e):s=r.__e=ka(n.__e,r,n,o,a,i,l,c,d);return(g=D.diffed)&&g(r),128&r.__u?void 0:s}function xn(t){t&&t.__c&&(t.__c.__e=!0),t&&t.__k&&t.__k.forEach(xn)}function Ro(t,r,n){for(var o=0;o<n.length;o++)Bn(n[o],n[++o],n[++o]);D.__c&&D.__c(r,t),t.some(function(a){try{t=a.__h,a.__h=[],t.some(function(i){i.call(a)})}catch(i){D.__e(i,a.__v)}})}function To(t){return typeof t!="object"||t==null||t.__b&&t.__b>0?t:Yr(t)?t.map(To):_e({},t)}function ka(t,r,n,o,a,i,l,s,c){var d,g,h,u,p,f,m,b=n.props||Tt,x=r.props,y=r.type;if(y=="svg"?a="http://www.w3.org/2000/svg":y=="math"?a="http://www.w3.org/1998/Math/MathML":a||(a="http://www.w3.org/1999/xhtml"),i!=null){for(d=0;d<i.length;d++)if((p=i[d])&&"setAttribute"in p==!!y&&(y?p.localName==y:p.nodeType==3)){t=p,i[d]=null;break}}if(t==null){if(y==null)return document.createTextNode(x);t=document.createElementNS(a,y,x.is&&x),s&&(D.__m&&D.__m(r,i),s=!1),i=null}if(y==null)b===x||s&&t.data==x||(t.data=x);else{if(i=i&&Gr.call(t.childNodes),!s&&i!=null)for(b={},d=0;d<t.attributes.length;d++)b[(p=t.attributes[d]).name]=p.value;for(d in b)if(p=b[d],d!="children"){if(d=="dangerouslySetInnerHTML")h=p;else if(!(d in x)){if(d=="value"&&"defaultValue"in x||d=="checked"&&"defaultChecked"in x)continue;cr(t,d,null,p,a)}}for(d in x)p=x[d],d=="children"?u=p:d=="dangerouslySetInnerHTML"?g=p:d=="value"?f=p:d=="checked"?m=p:s&&typeof p!="function"||b[d]===p||cr(t,d,p,b[d],a);if(g)s||h&&(g.__html==h.__html||g.__html==t.innerHTML)||(t.innerHTML=g.__html),r.__k=[];else if(h&&(t.innerHTML=""),Eo(r.type=="template"?t.content:t,Yr(u)?u:[u],r,n,o,y=="foreignObject"?"http://www.w3.org/1999/xhtml":a,i,l,i?i[0]:n.__k&&pt(n,0),s,c),i!=null)for(d=i.length;d--;)Ln(i[d]);s||(d="value",y=="progress"&&f==null?t.removeAttribute("value"):f!=null&&(f!==t[d]||y=="progress"&&!f||y=="option"&&f!=b[d])&&cr(t,d,f,b[d],a),d="checked",m!=null&&m!=t[d]&&cr(t,d,m,b[d],a))}return t}function Bn(t,r,n){try{if(typeof t=="function"){var o=typeof t.__u=="function";o&&t.__u(),o&&r==null||(t.__u=t(r))}else t.current=r}catch(a){D.__e(a,n)}}function Po(t,r,n){var o,a;if(D.unmount&&D.unmount(t),(o=t.ref)&&(o.current&&o.current!=t.__e||Bn(o,null,r)),(o=t.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(i){D.__e(i,r)}o.base=o.__P=null}if(o=t.__k)for(a=0;a<o.length;a++)o[a]&&Po(o[a],r,n||typeof t.type!="function");n||Ln(t.__e),t.__c=t.__=t.__e=void 0}function _a(t,r,n){return this.constructor(t,n)}function Ca(t,r,n){var o,a,i,l;r==document&&(r=document.documentElement),D.__&&D.__(t,r),a=(o=!1)?null:r.__k,i=[],l=[],Fn(r,t=r.__k=ba(A,null,[t]),a||Tt,Tt,r.namespaceURI,a?null:r.firstChild?Gr.call(r.childNodes):null,i,a?a.__e:r.firstChild,o,l),Ro(i,t,l)}Gr=Mo.slice,D={__e:function(t,r,n,o){for(var a,i,l;r=r.__;)if((a=r.__c)&&!a.__)try{if((i=a.constructor)&&i.getDerivedStateFromError!=null&&(a.setState(i.getDerivedStateFromError(t)),l=a.__d),a.componentDidCatch!=null&&(a.componentDidCatch(t,o||{}),l=a.__d),l)return a.__E=a}catch(s){t=s}throw t}},Co=0,zo=function(t){return t!=null&&t.constructor==null},zt.prototype.setState=function(t,r){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=_e({},this.state),typeof t=="function"&&(t=t(_e({},n),this.props)),t&&_e(n,t),t!=null&&this.__v&&(r&&this._sb.push(r),Xn(this))},zt.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Xn(this))},zt.prototype.render=A,Te=[],So=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,$o=function(t,r){return t.__v.__b-r.__v.__b},Pr.__r=0,Io=/(PointerCapture)$|Capture$/i,Nn=0,fn=eo(!1),mn=eo(!0);var za=0;function e(t,r,n,o,a,i){r||(r={});var l,s,c=r;if("ref"in c)for(s in c={},r)s=="ref"?l=r[s]:c[s]=r[s];var d={type:t,props:c,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--za,__i:-1,__u:0,__source:a,__self:i};if(typeof t=="function"&&(l=t.defaultProps))for(s in l)c[s]===void 0&&(c[s]=l[s]);return D.vnode&&D.vnode(d),d}var Pt,L,Zr,to,Nr=0,No=[],F=D,ro=F.__b,no=F.__r,oo=F.diffed,ao=F.__c,io=F.unmount,lo=F.__;function jn(t,r){F.__h&&F.__h(L,t,Nr||r),Nr=0;var n=L.__H||(L.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function Me(t){return Nr=1,Sa(Bo,t)}function Sa(t,r,n){var o=jn(Pt++,2);if(o.t=t,!o.__c&&(o.__=[Bo(void 0,r),function(s){var c=o.__N?o.__N[0]:o.__[0],d=o.t(c,s);c!==d&&(o.__N=[d,o.__[1]],o.__c.setState({}))}],o.__c=L,!L.__f)){var a=function(s,c,d){if(!o.__c.__H)return!0;var g=o.__c.__H.__.filter(function(u){return!!u.__c});if(g.every(function(u){return!u.__N}))return!i||i.call(this,s,c,d);var h=o.__c.props!==s;return g.forEach(function(u){if(u.__N){var p=u.__[0];u.__=u.__N,u.__N=void 0,p!==u.__[0]&&(h=!0)}}),i&&i.call(this,s,c,d)||h};L.__f=!0;var i=L.shouldComponentUpdate,l=L.componentWillUpdate;L.componentWillUpdate=function(s,c,d){if(this.__e){var g=i;i=void 0,a(s,c,d),i=g}l&&l.call(this,s,c,d)},L.shouldComponentUpdate=a}return o.__N||o.__}function P(t,r){var n=jn(Pt++,3);!F.__s&&Fo(n.__H,r)&&(n.__=t,n.u=r,L.__H.__h.push(n))}function On(t){return Nr=5,Lo(function(){return{current:t}},[])}function Lo(t,r){var n=jn(Pt++,7);return Fo(n.__H,r)&&(n.__=t(),n.__H=r,n.__h=t),n.__}function $a(){for(var t;t=No.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(_r),t.__H.__h.forEach(bn),t.__H.__h=[]}catch(r){t.__H.__h=[],F.__e(r,t.__v)}}F.__b=function(t){L=null,ro&&ro(t)},F.__=function(t,r){t&&r.__k&&r.__k.__m&&(t.__m=r.__k.__m),lo&&lo(t,r)},F.__r=function(t){no&&no(t),Pt=0;var r=(L=t.__c).__H;r&&(Zr===L?(r.__h=[],L.__h=[],r.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(r.__h.forEach(_r),r.__h.forEach(bn),r.__h=[],Pt=0)),Zr=L},F.diffed=function(t){oo&&oo(t);var r=t.__c;r&&r.__H&&(r.__H.__h.length&&(No.push(r)!==1&&to===F.requestAnimationFrame||((to=F.requestAnimationFrame)||Ia)($a)),r.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),Zr=L=null},F.__c=function(t,r){r.some(function(n){try{n.__h.forEach(_r),n.__h=n.__h.filter(function(o){return!o.__||bn(o)})}catch(o){r.some(function(a){a.__h&&(a.__h=[])}),r=[],F.__e(o,n.__v)}}),ao&&ao(t,r)},F.unmount=function(t){io&&io(t);var r,n=t.__c;n&&n.__H&&(n.__H.__.forEach(function(o){try{_r(o)}catch(a){r=a}}),n.__H=void 0,r&&F.__e(r,n.__v))};var so=typeof requestAnimationFrame=="function";function Ia(t){var r,n=function(){clearTimeout(o),so&&cancelAnimationFrame(r),setTimeout(t)},o=setTimeout(n,35);so&&(r=requestAnimationFrame(n))}function _r(t){var r=L,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),L=r}function bn(t){var r=L;t.__c=t.__(),L=r}function Fo(t,r){return!t||t.length!==r.length||r.some(function(n,o){return n!==t[o]})}function Bo(t,r){return typeof r=="function"?r(t):r}var Ma=Symbol.for("preact-signals");function qr(){if(Ie>1)Ie--;else{for(var t,r=!1;St!==void 0;){var n=St;for(St=void 0,yn++;n!==void 0;){var o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&Uo(n))try{n.c()}catch(a){r||(t=a,r=!0)}n=o}}if(yn=0,Ie--,r)throw t}}function Da(t){if(Ie>0)return t();Ie++;try{return t()}finally{qr()}}var M=void 0;function jo(t){var r=M;M=void 0;try{return t()}finally{M=r}}var St=void 0,Ie=0,yn=0,Lr=0;function Oo(t){if(M!==void 0){var r=t.n;if(r===void 0||r.t!==M)return r={i:0,S:t,p:M.s,n:void 0,t:M,e:void 0,x:void 0,r},M.s!==void 0&&(M.s.n=r),M.s=r,t.n=r,32&M.f&&t.S(r),r;if(r.i===-1)return r.i=0,r.n!==void 0&&(r.n.p=r.p,r.p!==void 0&&(r.p.n=r.n),r.p=M.s,r.n=void 0,M.s.n=r,M.s=r),r}}function Y(t,r){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=r?.watched,this.Z=r?.unwatched,this.name=r?.name}Y.prototype.brand=Ma;Y.prototype.h=function(){return!0};Y.prototype.S=function(t){var r=this,n=this.t;n!==t&&t.e===void 0&&(t.x=n,this.t=t,n!==void 0?n.e=t:jo(function(){var o;(o=r.W)==null||o.call(r)}))};Y.prototype.U=function(t){var r=this;if(this.t!==void 0){var n=t.e,o=t.x;n!==void 0&&(n.x=o,t.e=void 0),o!==void 0&&(o.e=n,t.x=void 0),t===this.t&&(this.t=o,o===void 0&&jo(function(){var a;(a=r.Z)==null||a.call(r)}))}};Y.prototype.subscribe=function(t){var r=this;return ie(function(){var n=r.value,o=M;M=void 0;try{t(n)}finally{M=o}},{name:"sub"})};Y.prototype.valueOf=function(){return this.value};Y.prototype.toString=function(){return this.value+""};Y.prototype.toJSON=function(){return this.value};Y.prototype.peek=function(){var t=M;M=void 0;try{return this.value}finally{M=t}};Object.defineProperty(Y.prototype,"value",{get:function(){var t=Oo(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(yn>100)throw new Error("Cycle detected");this.v=t,this.i++,Lr++,Ie++;try{for(var r=this.t;r!==void 0;r=r.x)r.t.N()}finally{qr()}}}});function v(t,r){return new Y(t,r)}function Uo(t){for(var r=t.s;r!==void 0;r=r.n)if(r.S.i!==r.i||!r.S.h()||r.S.i!==r.i)return!0;return!1}function Ho(t){for(var r=t.s;r!==void 0;r=r.n){var n=r.S.n;if(n!==void 0&&(r.r=n),r.S.n=r,r.i=-1,r.n===void 0){t.s=r;break}}}function Wo(t){for(var r=t.s,n=void 0;r!==void 0;){var o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):n=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=n}function He(t,r){Y.call(this,void 0),this.x=t,this.s=void 0,this.g=Lr-1,this.f=4,this.W=r?.watched,this.Z=r?.unwatched,this.name=r?.name}He.prototype=new Y;He.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Lr))return!0;if(this.g=Lr,this.f|=1,this.i>0&&!Uo(this))return this.f&=-2,!0;var t=M;try{Ho(this),M=this;var r=this.x();(16&this.f||this.v!==r||this.i===0)&&(this.v=r,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return M=t,Wo(this),this.f&=-2,!0};He.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var r=this.s;r!==void 0;r=r.n)r.S.S(r)}Y.prototype.S.call(this,t)};He.prototype.U=function(t){if(this.t!==void 0&&(Y.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var r=this.s;r!==void 0;r=r.n)r.S.U(r)}};He.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};Object.defineProperty(He.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=Oo(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function ut(t,r){return new He(t,r)}function Vo(t){var r=t.u;if(t.u=void 0,typeof r=="function"){Ie++;var n=M;M=void 0;try{r()}catch(o){throw t.f&=-2,t.f|=8,Un(t),o}finally{M=n,qr()}}}function Un(t){for(var r=t.s;r!==void 0;r=r.n)r.S.U(r);t.x=void 0,t.s=void 0,Vo(t)}function Ea(t){if(M!==this)throw new Error("Out-of-order effect");Wo(this),M=t,this.f&=-2,8&this.f&&Un(this),qr()}function vt(t,r){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=r?.name}vt.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var r=this.x();typeof r=="function"&&(this.u=r)}finally{t()}};vt.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Vo(this),Ho(this),Ie++;var t=M;return M=this,Ea.bind(this,t)};vt.prototype.N=function(){2&this.f||(this.f|=2,this.o=St,St=this)};vt.prototype.d=function(){this.f|=8,1&this.f||Un(this)};vt.prototype.dispose=function(){this.d()};function ie(t,r){var n=new vt(t,r);try{n.c()}catch(a){throw n.d(),a}var o=n.d.bind(n);return o[Symbol.dispose]=o,o}var Go,en,Kr=typeof window<"u"&&!!window.__PREACT_SIGNALS_DEVTOOLS__,Yo=[];ie(function(){Go=this.N})();function ft(t,r){D[t]=r.bind(null,D[t]||function(){})}function Fr(t){en&&en(),en=t&&t.S()}function qo(t){var r=this,n=t.data,o=Ra(n);o.value=n;var a=Lo(function(){for(var s=r,c=r.__v;c=c.__;)if(c.__c){c.__c.__$f|=4;break}var d=ut(function(){var p=o.value.value;return p===0?0:p===!0?"":p||""}),g=ut(function(){return!Array.isArray(d.value)&&!zo(d.value)}),h=ie(function(){if(this.N=Ko,g.value){var p=d.value;s.__v&&s.__v.__e&&s.__v.__e.nodeType===3&&(s.__v.__e.data=p)}}),u=r.__$u.d;return r.__$u.d=function(){h(),u.call(this)},[g,d]},[]),i=a[0],l=a[1];return i.value?l.peek():l.value}qo.displayName="ReactiveTextNode";Object.defineProperties(Y.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:qo},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});ft("__b",function(t,r){if(Kr&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),typeof r.type=="string"){var n,o=r.props;for(var a in o)if(a!=="children"){var i=o[a];i instanceof Y&&(n||(r.__np=n={}),n[a]=i,o[a]=i.peek())}}t(r)});ft("__r",function(t,r){if(Kr&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.enterComponent(r),r.type!==A){Fr();var n,o=r.__c;o&&(o.__$f&=-2,(n=o.__$u)===void 0&&(o.__$u=n=(function(a){var i;return ie(function(){i=this}),i.c=function(){o.__$f|=1,o.setState({})},i})())),Fr(n)}t(r)});ft("__e",function(t,r,n,o){Kr&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),Fr(),t(r,n,o)});ft("diffed",function(t,r){Kr&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),Fr();var n;if(typeof r.type=="string"&&(n=r.__e)){var o=r.__np,a=r.props;if(o){var i=n.U;if(i)for(var l in i){var s=i[l];s!==void 0&&!(l in o)&&(s.d(),i[l]=void 0)}else i={},n.U=i;for(var c in o){var d=i[c],g=o[c];d===void 0?(d=Aa(n,c,g,a),i[c]=d):d.o(g,a)}}}t(r)});function Aa(t,r,n,o){var a=r in t&&t.ownerSVGElement===void 0,i=v(n);return{o:function(l,s){i.value=l,o=s},d:ie(function(){this.N=Ko;var l=i.value.value;o[r]!==l&&(o[r]=l,a?t[r]=l:l!=null&&(l!==!1||r[4]==="-")?t.setAttribute(r,l):t.removeAttribute(r))})}}ft("unmount",function(t,r){if(typeof r.type=="string"){var n=r.__e;if(n){var o=n.U;if(o){n.U=void 0;for(var a in o){var i=o[a];i&&i.d()}}}}else{var l=r.__c;if(l){var s=l.__$u;s&&(l.__$u=void 0,s.d())}}t(r)});ft("__h",function(t,r,n,o){(o<3||o===9)&&(r.__$f|=2),t(r,n,o)});zt.prototype.shouldComponentUpdate=function(t,r){var n=this.__$u,o=n&&n.s!==void 0;for(var a in r)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var i=2&this.__$f;if(!(o||i||4&this.__$f)||1&this.__$f)return!0}else if(!(o||4&this.__$f)||3&this.__$f)return!0;for(var l in t)if(l!=="__source"&&t[l]!==this.props[l])return!0;for(var s in this.props)if(!(s in t))return!0;return!1};function Ra(t,r){return Me(function(){return v(t,r)})[0]}var Ta=function(t){queueMicrotask(function(){queueMicrotask(t)})};function Pa(){Da(function(){for(var t;t=Yo.shift();)Go.call(t)})}function Ko(){Yo.push(this)===1&&(D.requestAnimationFrame||Ta)(Pa)}const Na={apiKey:"AIzaSyCr-Ej5jeuV3kdvquu2W_R0ffSrUW0OUcQ",authDomain:"tennis-coordinator-43f53.firebaseapp.com",databaseURL:"https://tennis-coordinator-43f53-default-rtdb.firebaseio.com",projectId:"tennis-coordinator-43f53",storageBucket:"tennis-coordinator-43f53.firebasestorage.app",messagingSenderId:"665148711646",appId:"1:665148711646:web:66d14722800a12f5a3184f",measurementId:"G-J0KVB2Q93W"};let et=null;function Jo(){if(et)return et;try{return window.firebase.initializeApp(Na),et=window.firebase.database(),console.log("Firebase initialized successfully"),et}catch(t){throw console.error("Firebase initialization error:",t),t}}function R(){return et||Jo()}function La(){return e("div",{class:"landing-page",children:e("div",{class:"landing-container",children:[e("h1",{children:"🎾 Tennis Coordinator"}),e("p",{class:"landing-tagline",children:"Turn your love for tennis into more games."}),e("p",{class:"landing-subtitle",children:"A simple tool that helps tennis groups self-organize matches with minimal friction—so you spend less time coordinating and more time on the court."}),e("div",{class:"landing-section",children:[e("h2",{children:"Why It Works"}),e("div",{class:"landing-features",children:[e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Frictionless"}),e("span",{children:"Check in with a few taps. No accounts, no apps to download."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Flexible"}),e("span",{children:"Handles doubles, singles, odd numbers, guests, and preferences."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Adaptable"}),e("span",{children:"Works for tight-knit groups of 20 or club communities of 50+."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Real-Time"}),e("span",{children:"Everyone sees who's playing instantly."})]})]})]})]}),e("div",{class:"landing-section landing-section-alt",children:[e("h2",{children:"How It Works"}),e("div",{class:"landing-steps",children:[e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"1"}),e("div",{children:[e("strong",{children:"Check In"}),e("span",{children:"Select your name, play style, and when you're available"})]})]}),e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"2"}),e("div",{children:[e("strong",{children:"Auto-Match"}),e("span",{children:"System organizes matches based on who's playing"})]})]}),e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"3"}),e("div",{children:[e("strong",{children:"Play"}),e("span",{children:"Show up and enjoy the game"})]})]})]})]}),e("div",{class:"landing-cta",children:e("p",{children:"To access your tennis group, visit your group's unique URL or contact your group admin for the link."})}),e("div",{class:"landing-footer",children:e("a",{href:"#admin",class:"admin-link",onClick:t=>{t.preventDefault(),window.location.hash="admin",window.location.reload()},children:"Site Administrator? Access Site Admin →"})})]})})}function _(t){return t.toLowerCase().trim().replace(/\s+/g," ")}function Jr(t){switch(t){case"singles":return"Singles Only";case"doubles":return"Doubles Only";case"both":return"Either";default:return"Either"}}function dr(t){if(!t)return"";const[r,n]=t.split(":"),o=parseInt(r),a=o>=12?"PM":"AM";return`${o%12||12}:${n}${a}`}function ne(t,r){return!t&&!r?"":t&&r?`${dr(t)}-${dr(r)}`:t?`from ${dr(t)}`:r?`until ${dr(r)}`:""}function H(t){return new Date(t+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function co(t){return new Date(t+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function Hn(t){const r=new Date(t),n=new Date,o=r.toDateString()===n.toDateString(),a=r.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});return o?a:`${r.toLocaleDateString("en-US",{month:"short",day:"numeric"})} ${a}`}function wn(t){const r=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${r}-${n}-${o}`}function Fa(){return wn(new Date)}function po(t,r){return r[_(t)]||{include:[],exclude:[]}}function Ba(t,r,n){const o=po(t,n),a=po(r,n),i=_(t),l=_(r);return!o.exclude.includes(l)&&!a.exclude.includes(i)}function ja(t,r){if(!t||!r||!t.start&&!t.end&&!r.start&&!r.end)return!0;const n=p=>{if(!p)return null;const[f,m]=p.split(":").map(Number);return f*60+m},o=n(t.start),a=n(t.end),i=n(r.start),l=n(r.end),s=360,c=1260,d=o??s,g=a??c,h=i??s;return d<(l??c)&&h<g}function xt(t,r,n){return Ba(t.name,r.name,n)?ja(t.timeRange,r.timeRange):!1}function Qr(t,r={}){const n=[],o=[];let a=t.map((u,p)=>({...u,originalIndex:p}));a.sort((u,p)=>u.timestamp-p.timestamp);const i=a.filter(u=>u.playStyle==="doubles"),l=a.filter(u=>u.playStyle==="singles"),s=a.filter(u=>u.playStyle==="both"||!u.playStyle);let c=[...i,...s].sort((u,p)=>u.timestamp-p.timestamp);for(;c.length>=4;){const u=c.slice(0,4);n.push({type:"doubles",number:n.filter(p=>p.type==="doubles").length+1,players:u}),c.splice(0,4)}let d=[...l].sort((u,p)=>u.timestamp-p.timestamp);for(;d.length>=2;){let u=null;for(let p=0;p<d.length-1;p++){for(let f=p+1;f<d.length;f++)if(xt(d[p],d[f],r)){u=[d[p],d[f]];break}if(u)break}if(u)n.push({type:"singles",players:u}),u.forEach(p=>{const f=d.findIndex(m=>m.originalIndex===p.originalIndex);f>-1&&d.splice(f,1)});else break}const g=c,h=d;if(g.length>0){const u=4-g.length,p=g.filter(S=>S.playStyle==="both"||!S.playStyle),f=p.length,m=g.every(S=>S.playStyle==="both"||!S.playStyle),b=g.every(S=>S.allowRotation!==!1),x=g.length===3&&xt(g[0],g[1],r)&&xt(g[0],g[2],r)&&xt(g[1],g[2],r);let y=!1;f>=2&&(y=xt(p[0],p[1],r)),n.push({type:"doubles-forming",players:g,needed:u,canRotate:g.length===3&&m&&b&&x,eitherCount:f,canPlaySingles:y})}return h.length>0&&h.forEach(u=>{n.push({type:"singles-forming",players:[u],needed:1})}),{matches:n,warnings:o}}const I=v({groupPin:"",adminPin:""});function Qo(t){const r=document.documentElement;if(console.log("[Theme] Applying theme:",t),r.classList.remove("theme-wimbledon","theme-roland-garros","theme-australian-open","theme-us-open","theme-clay","theme-hardcourt","theme-tennis-ball"),r.removeAttribute("data-theme"),t&&t!=="default"){const n=`theme-${t}`;r.classList.add(n),r.setAttribute("data-theme",t),console.log("[Theme] Added class:",n,"data-theme:",t),console.log("[Theme] Current html classes:",r.className)}else console.log("[Theme] Using default theme (no class added)")}const W=v({}),kn=v({}),uo={};function j(t){return R().ref(t)}function Oa(){P(()=>{const t=ie(()=>{const r=C.value;if(!r||r==="admin")return;j(`groups/${r}/settings`).once("value").then(o=>{const a=o.val()||{};G.value=a.groupName||"Unknown Group",V.value=a.members||[],K.value=a.memberDetails||{};const i=a.renamedMembers||{};if(k.value&&i[k.value]){const l=i[k.value];k.value=l,localStorage.setItem(`sessionUser_${r}`,l)}I.value={groupPin:a.groupPin||"",adminPin:a.adminPin||"",shortCode:a.shortCode,location:a.location,groupDescription:a.groupDescription,groupRules:a.groupRules,theme:a.theme},Qo(a.theme),document.title=`${a.groupName||"Tennis"} - Tennis Coordinator`}).catch(o=>{console.error("Error loading group settings:",o),w("Failed to load group data","error")})});return()=>{t()}},[])}function Ua(){P(()=>{let t=null,r=null;const n=ie(()=>{const o=C.value;t&&r&&t.off("value",r),!(!o||o==="admin")&&(t=j(`groups/${o}/checkins`),r=t.on("value",a=>{const i=a.val()||{};J.value=i}))});return()=>{n(),t&&r&&t.off("value",r)}},[])}function Ha(){P(()=>{let t=null,r=null;const n=ie(()=>{const o=C.value,a=E.value;if(t&&r&&t.off("value",r),!o||o==="admin"||!a){W.value={};return}t=j(`groups/${o}/matchNotes/${a}`),r=t.on("value",i=>{W.value=i.val()||{}})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function Wa(){P(()=>{let t=null,r=null;const n=ie(()=>{const o=C.value;if(t&&r&&t.off("value",r),!o||o==="admin"){kn.value={};return}t=j(`groups/${o}/matchNotes`),r=t.on("value",a=>{kn.value=a.val()||{}})});return()=>{n(),t&&r&&t.off("value",r)}},[])}async function _n(t){const r=C.value,n=E.value;if(!r||!n)return;const o=j(`groups/${r}/checkins/${n}`),a=J.value[n]||[],i=_(t.name);if(a.some(c=>c.name&&_(c.name)===i)){w(`${t.name} is already checked in for this date!`,"error");return}const s={name:t.name,playStyle:t.playStyle,isGuest:t.isGuest,addedBy:t.addedBy,allowRotation:t.allowRotation,timestamp:Date.now()};t.timeRange&&(s.timeRange=t.timeRange);try{await o.set([...a,s]),await fe(r,n,"checkin",t.name,t.addedBy),console.log("[addCheckin] About to call notifyCheckinAlert for:",t.name);try{await qa(r,t.name,n,t.addedBy,{playStyle:t.playStyle,timeRange:t.timeRange,allowRotation:t.allowRotation}),console.log("[addCheckin] notifyCheckinAlert completed")}catch(c){console.error("[addCheckin] Error in notifyCheckinAlert:",c)}setTimeout(()=>ea(r,n),500)}catch(c){console.error("Error adding check-in:",c),w("Failed to check in","error")}}async function Xo(t,r,n){const o=C.value,a=E.value;if(!o||!a)return;const i=J.value[a]||[],l=i[t];if(!l)return;const s=l.name||"this person",c=n&&_(n)===_(s),d=l.addedBy&&n&&_(n)===_(l.addedBy),g=sessionStorage.getItem(`adminAuth_${o}`)==="true";if(!c&&!d&&!g){w("You can only edit check-ins you added","error");return}const h=j(`groups/${o}/checkins/${a}`),u=[...i],p={};for(const[f,m]of Object.entries(r))m!==void 0&&(p[f]=m);u[t]={...u[t],...p};try{await h.set(u),w(`${s}'s preferences updated`,"success")}catch(f){console.error("Error updating check-in:",f),w("Failed to update check-in","error")}}async function Va(t,r,n){const o=N.value;if(!o||!o.matches)return;const a={};for(const[s,c]of Object.entries(o.matches)){const d=(c.players||[]).filter(g=>_(g)!==_(n));d.length>0&&(a[s]={...c,players:d})}const i=(o.unassigned||[]).filter(s=>_(s)!==_(n));if(Object.keys(a).length===0&&i.length===0){try{await j(`groups/${t}/matchArrangements/${r}`).remove(),N.value=null}catch(s){console.error("Error clearing arrangement after removal:",s)}return}const l={...o,matches:a,unassigned:i};try{await j(`groups/${t}/matchArrangements/${r}`).set(l),N.value=l}catch(s){console.error("Error updating arrangement after removal:",s)}}async function Zo(t,r){const n=C.value,o=E.value;if(!n||!o)return;const a=J.value[o]||[],l=a[t]?.name||"this person",s=r&&_(r)===_(l),c=j(`groups/${n}/checkins/${o}`),d=a.filter((g,h)=>h!==t);try{await c.set(d.length>0?d:null),N.value&&l&&await Va(n,o,l),s&&r&&(Vr.value=r,Wr.value=!0),await fe(n,o,"removal",l,r),console.log("[removeCheckin] About to call notifyRemovalAlert for:",l);try{await Ga(n,l,o,r),console.log("[removeCheckin] notifyRemovalAlert completed")}catch(g){console.error("[removeCheckin] Error in notifyRemovalAlert:",g)}setTimeout(()=>ea(n,o),500)}catch(g){console.error("Error removing check-in:",g),w("Failed to remove check-in","error")}}async function fe(t,r,n,o,a,i={}){const l={timestamp:Date.now(),action:n,player:o,by:a||o,...i};Object.keys(l).forEach(s=>{l[s]===void 0&&delete l[s]});try{await R().ref(`groups/${t}/activity/${r}`).push(l)}catch(s){console.error("Error logging activity:",s)}}async function Ga(t,r,n,o){const i=_(r)===_(o)?`🎾 ${r} removed themselves from ${n}`:`🎾 ${r} was removed from ${n} by ${o}`;try{const l=R(),c=(await l.ref(`groups/${t}/userNotifications`).once("value")).val()||{};for(const[d,g]of Object.entries(c)){const h=g.preferences||{};if(h.activityAlerts){if(d===_(o))continue;const u=h.unwatchedMembers||h.mutedMembers||[];if(u.includes(r)||u.includes(o))continue;await l.ref(`groups/${t}/userNotifications/${d}/items`).push().set({message:i,timestamp:Date.now(),read:!1,date:n})}}}catch(l){console.error("Error sending removal notifications:",l)}}function Ya(t){switch(t){case"singles":return"Singles";case"doubles":return"Doubles";default:return"Either"}}async function qa(t,r,n,o,a){const i=_(r)===_(o),l=[];if(a.playStyle&&l.push(Ya(a.playStyle)),a.timeRange){const d=ne(a.timeRange.start,a.timeRange.end);d&&l.push(d)}a.playStyle==="singles"&&a.allowRotation===!1&&l.push("No 3s");const s=l.length>0?` (${l.join(", ")})`:"",c=i?`🎾 ${r} checked in for ${n}${s}`:`🎾 ${r} was added for ${n} by ${o}${s}`;console.log("[notifyCheckinAlert] Starting notification for:",{playerName:r,date:n,addedBy:o});try{const d=R(),h=(await d.ref(`groups/${t}/userNotifications`).once("value")).val()||{};console.log("[notifyCheckinAlert] Found userNotifications entries:",Object.keys(h));for(const[u,p]of Object.entries(h)){const f=p.preferences||{};if(console.log(`[notifyCheckinAlert] User ${u}:`,{activityAlerts:f.activityAlerts,unwatchedMembers:f.unwatchedMembers||f.mutedMembers}),f.activityAlerts){if(u===_(o)){console.log(`[notifyCheckinAlert] Skipping ${u} - is addedBy`);continue}if(u===_(r)){console.log(`[notifyCheckinAlert] Skipping ${u} - is player`);continue}const m=f.unwatchedMembers||f.mutedMembers||[];if(m.includes(r)||m.includes(o)){console.log(`[notifyCheckinAlert] Skipping ${u} - player/adder is unwatched`);continue}console.log(`[notifyCheckinAlert] Sending notification to ${u}`),await d.ref(`groups/${t}/userNotifications/${u}/items`).push().set({message:c,timestamp:Date.now(),read:!1,date:n}),console.log(`[notifyCheckinAlert] Notification sent to ${u}`)}}}catch(d){console.error("Error sending check-in notifications:",d)}}async function ea(t,r){const n=J.value[r]||[];if(n.length===0)return;const{matches:o}=Qr(n),a={};o.forEach(l=>{if(l.type==="doubles"||l.type==="singles"){const s=l.players.map(c=>_(c.name)).sort().join(",");a[s]={type:l.type,players:l.players.map(c=>c.name)}}});const i=uo[r]||{};console.log("[checkAndNotifyMatchFormations] Match state comparison:",{date:r,previousMatches:Object.keys(i).length,currentMatches:Object.keys(a).length,prevKeys:Object.keys(i),currentKeys:Object.keys(a)});for(const[l,s]of Object.entries(a))if(i[l])console.log(`[checkAndNotifyMatchFormations] Match ${l} already exists (not new)`);else{console.log(`[checkAndNotifyMatchFormations] 🎾 NEW MATCH FORMED: ${l}`,s);const c=co(r),d=s.type==="doubles"?"Doubles":"Singles";for(const g of s.players){const h=s.players.filter(p=>_(p)!==_(g)),u=`✅ You're in ${d} for ${c} with ${h.join(", ")}`;try{const p=R(),m=(await p.ref(`groups/${t}/userNotifications/${_(g)}/preferences`).once("value")).val()||{};console.log(`[checkAndNotifyMatchFormations] Player "${g}" prefs:`,{matchConfirmations:m.matchConfirmations,willSend:m.matchConfirmations!==!1}),m.matchConfirmations!==!1?(await p.ref(`groups/${t}/userNotifications/${_(g)}/items`).push().set({message:u,timestamp:Date.now(),read:!1,date:r,type:"match_formed",matchType:d}),console.log(`[checkAndNotifyMatchFormations] ✅ Sent notification to ${g}: "${u}"`)):console.log(`[checkAndNotifyMatchFormations] ❌ Skipped ${g} - matchConfirmations disabled`)}catch(p){console.error(`Error sending match notification to ${g}:`,p)}}}for(const[l,s]of Object.entries(i))if(!a[l]){console.log(`[checkAndNotifyMatchFormations] 💔 MATCH DISSOLVED: ${l}`,s);const c=co(r),d=s.type==="doubles"?"Doubles":"Singles",g=n.map(x=>_(x.name)),h=s.players.filter(x=>g.includes(_(x))),u=s.players.filter(x=>!g.includes(_(x))),p=u.join(", "),f=d==="Doubles"?4-h.length:2-h.length,m=f===1?"Need 1 more player":`Need ${f} more players`,b=u.length>0?`⚠️ Your ${d} for ${c} is no longer confirmed - ${p} dropped out. ${m}.`:`⚠️ Your ${d} for ${c} is no longer confirmed.`;for(const x of s.players)try{const y=R(),z=(await y.ref(`groups/${t}/userNotifications/${_(x)}/preferences`).once("value")).val()||{};console.log(`[checkAndNotifyMatchFormations] Player "${x}" prefs:`,{matchConfirmations:z.matchConfirmations,willSend:z.matchConfirmations!==!1}),z.matchConfirmations!==!1?(await y.ref(`groups/${t}/userNotifications/${_(x)}/items`).push().set({message:b,timestamp:Date.now(),read:!1,date:r,type:"match_dissolved",matchType:d}),console.log(`[checkAndNotifyMatchFormations] ✅ Sent dissolved notification to ${x}: "${b}"`)):console.log(`[checkAndNotifyMatchFormations] ❌ Skipped ${x} - matchConfirmations disabled`)}catch(y){console.error(`Error sending dissolved match notification to ${x}:`,y)}}uo[r]=a}async function tn(t,r,n,o,a,i){const l=o.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()).replace("Forming 1","(forming)");let s;if(a==="added"){const c=i&&i.length>30?i.substring(0,30)+"...":i;s=`📝 ${n} added note to ${l}: "${c}"`}else if(a==="updated"){const c=i&&i.length>30?i.substring(0,30)+"...":i;s=`📝 ${n} updated note on ${l}: "${c}"`}else s=`📝 ${n} removed note from ${l}`;try{const c=R(),g=(await c.ref(`groups/${t}/userNotifications`).once("value")).val()||{};for(const[h,u]of Object.entries(g)){const p=u.preferences||{};if(p.activityAlerts){if(h===_(n)||(p.unwatchedMembers||p.mutedMembers||[]).includes(n))continue;await c.ref(`groups/${t}/userNotifications/${h}/items`).push().set({message:s,timestamp:Date.now(),read:!1,date:r})}}}catch(c){console.error("Error sending note notifications:",c)}}async function Ka(){const t=C.value,r=E.value;if(!(!t||!r))try{await j(`groups/${t}/checkins/${r}`).remove(),await j(`groups/${t}/matchNotes/${r}`).remove(),w("Day reset","success")}catch(n){console.error("Error resetting day:",n),w("Failed to reset day","error")}}const pr={};async function Ja(t,r){const n=C.value,o=E.value;if(!(!n||!o))try{const a=`${n}:${o}:${t}`,i=pr[a]??W.value[t]??"",l=k.value||"Unknown";await j(`groups/${n}/matchNotes/${o}/${t}`).set(r||null),r&&!i?(await fe(n,o,"note_added",l,l,{matchKey:t,noteContent:r}),await tn(n,o,l,t,"added",r),pr[a]=r,w("Note added","success")):r&&i&&r!==i?(await fe(n,o,"note_updated",l,l,{matchKey:t,noteContent:r,previousNote:i}),await tn(n,o,l,t,"updated",r),pr[a]=r,w("Note updated","success")):!r&&i&&(await fe(n,o,"note_removed",l,l,{matchKey:t,previousNote:i}),await tn(n,o,l,t,"removed"),delete pr[a],w("Note removed","info"))}catch(a){console.error("Error saving match note:",a),w("Failed to save note","error")}}async function Wn(t){const r=C.value;if(!r)return;const n=j(`groups/${r}/settings`);try{const a=(await n.once("value")).val()||{},i=a.members||[],l=a.memberDetails||{};if(i.includes(t.name)){w("Member already exists","error");return}const s=[...i,t.name].sort(),c={...l,[t.name]:{addedBy:t.addedBy,addedDate:new Date().toISOString(),phone:t.phone||"",email:t.email||"",notes:t.notes||""}};await n.update({members:s,memberDetails:c}),V.value=s,K.value=c;const d=E.value||new Date().toISOString().split("T")[0];await fe(r,d,"member_added",t.name,t.addedBy,{contact:t.phone||t.email||void 0,notes:t.notes||void 0});const g=`${window.location.origin}${window.location.pathname}?group=${r}`;ve.value={action:"invite",name:t.name,date:d,groupName:G.value||"Tennis Group",groupUrl:g,groupPin:I.value.groupPin||""},ge.value=!0}catch(o){console.error("Error adding member:",o),w("Failed to add member","error")}}async function ta(t){const r=C.value;if(!r)return;const n=j(`groups/${r}/settings`);try{const a=(await n.once("value")).val()||{},i=a.members||[],l=a.memberDetails||{},s=i.filter(h=>h!==t),c={...l};delete c[t],await n.update({members:s,memberDetails:c}),V.value=s,K.value=c;const d=E.value||new Date().toISOString().split("T")[0],g=k.value||"Admin";await fe(r,d,"member_removed",t,g),w(`${t} removed from members`,"info")}catch(o){console.error("Error removing member:",o),w("Failed to remove member","error")}}async function Qa(t,r){const n=C.value;if(!n)return!1;const o=j(`groups/${n}/settings`);try{const l=((await o.once("value")).val()||{}).memberDetails||{},s=l[t]||{},c={...l,[t]:{...s,phone:r.phone??s.phone??"",email:r.email??s.email??"",notes:r.notes??s.notes??"",shareContactInDirectory:r.shareContactInDirectory??s.shareContactInDirectory??!1,shareNotesInDirectory:r.shareNotesInDirectory??s.shareNotesInDirectory??!1}};return await o.update({memberDetails:c}),K.value=c,w("Profile updated","success"),!0}catch(a){return console.error("Error updating member details:",a),w("Failed to update profile","error"),!1}}async function ra(t,r){const n=C.value;if(!n)return!1;const o=r.trim();if(!o)return w("Name cannot be empty","error"),!1;if(o===t)return!0;const a=j(`groups/${n}/settings`);try{const l=(await a.once("value")).val()||{},s=l.members||[],c=l.memberDetails||{};if(s.some(y=>y.toLowerCase()===o.toLowerCase()&&y!==t))return w("A member with this name already exists","error"),!1;const d=s.map(y=>y===t?o:y).sort(),g={...c};g[t]&&(g[o]=g[t],delete g[t]);const u={...l.renamedMembers||{},[t]:o};await a.update({members:d,memberDetails:g,renamedMembers:u}),V.value=d,K.value=g,k.value===t&&(k.value=o,localStorage.setItem(`sessionUser_${n}`,o));const p=R(),m=(await p.ref(`groups/${n}/checkins`).once("value")).val()||{};for(const[y,S]of Object.entries(m))if(S&&typeof S=="object"){const z=Object.values(S);let $=!1;const T=z.map(Q=>Q&&Q.name===t?($=!0,{...Q,name:o}):Q);$&&await p.ref(`groups/${n}/checkins/${y}`).set(T)}const b=E.value||new Date().toISOString().split("T")[0],x=k.value||"Admin";return await fe(n,b,"member_renamed",o,x,{oldName:t}),w(`${t} renamed to ${o}`,"success"),!0}catch(i){return console.error("Error renaming member:",i),w("Failed to rename member","error"),!1}}function Xa(t){return t!==null&&typeof t=="object"&&"matches"in t&&"arrangedBy"in t&&"arrangedAt"in t}const N=v(null);async function Za(t){const r=C.value,n=E.value;if(!r||!n)return;const o=k.value||"Admin",a={...t,arrangedBy:o,arrangedAt:Date.now()};try{await j(`groups/${r}/matchArrangements/${n}`).set(a),N.value=a;const i=Object.keys(t.matches).length,l=Object.values(t.matches).reduce((g,h)=>g+(h.players?.length||0),0)+(t.unassigned?.length||0),s=[],c=Object.keys(t.matches).sort();for(const g of c){const u=t.matches[g]?.players||[];if(u.length>0){const p=g.replace("-"," ").replace(/\b\w/g,m=>m.toUpperCase()),f=g.startsWith("singles")&&u.length===2?`${u[0]} vs ${u[1]}`:u.join(", ");s.push(`${p}: ${f}`)}}t.unassigned?.length>0&&s.push(`Unassigned: ${t.unassigned.join(", ")}`);const d=s.join(" | ");await fe(r,n,"arrangement_saved",o,o,{matchCount:i,playerCount:l,arrangementDetails:d}),w("Match arrangement saved","success")}catch(i){console.error("Error saving match arrangement:",i),w("Failed to save arrangement","error")}}async function ei(){const t=C.value,r=E.value;if(!t||!r)return;const n=k.value||"Admin";try{await j(`groups/${t}/matchArrangements/${r}`).remove(),N.value=null,await fe(t,r,"arrangement_cleared",n,n),w("Arrangement cleared - using auto-organization","info")}catch(o){console.error("Error clearing match arrangement:",o),w("Failed to clear arrangement","error")}}function ti(){P(()=>{let t=null,r=null;const n=ie(()=>{const o=C.value,a=E.value;if(t&&r&&t.off("value",r),!o||o==="admin"||!a){N.value=null;return}t=j(`groups/${o}/matchArrangements/${a}`),r=t.on("value",i=>{const l=i.val();N.value=Xa(l)?l:null})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function De({isOpen:t,onClose:r,title:n,subtitle:o,children:a,showCloseButton:i=!0}){return t?e("div",{class:"modal active",onClick:l=>{l.target===l.currentTarget&&r&&r()},children:e("div",{class:"modal-content",onClick:l=>l.stopPropagation(),children:[e("div",{class:"modal-header",children:[e("div",{children:[e("h2",{children:n}),o&&e("p",{style:"font-size: 12px; color: #666; margin: 4px 0 0 0;",children:o})]}),i&&r&&e("button",{class:"close-btn",onClick:r,children:"×"})]}),a]})}):null}v(!1);v(!1);v(!1);v([]);v(!1);const Xr=v([]);v(!1);let at=null;function ri(){const t=C.value,r=k.value;if(!(!t||!r)){at&&at();try{const o=R().ref(`groups/${t}/userNotifications/${_(r)}/items`),a=o.on("value",i=>{const l=i.val()||{},s=Object.entries(l).map(([c,d])=>({id:c,...d}));Xr.value=s.sort((c,d)=>d.timestamp-c.timestamp)});at=()=>{o.off("value",a)}}catch(n){console.error("Error subscribing to notifications:",n)}}}async function ni(t){const r=C.value,n=k.value;if(!(!r||!n))try{await R().ref(`groups/${r}/userNotifications/${_(n)}/items/${t}/read`).set(!0)}catch(o){console.error("Error marking notification as read:",o)}}function oi(){P(()=>{const t=C.value,r=k.value;return t&&r&&ri(),()=>{at&&(at(),at=null)}},[C.value,k.value])}async function ai(t){const r=C.value,n=k.value;if(!(!r||!n))try{await R().ref(`groups/${r}/userNotifications/${_(n)}/items/${t}`).remove()}catch(o){console.error("Error clearing notification:",o)}}async function ii(){const t=C.value,r=k.value;if(!(!t||!r))try{const n=R(),o={};Xr.value.forEach(a=>{a.read||(o[`${a.id}/read`]=!0)}),Object.keys(o).length>0&&await n.ref(`groups/${t}/userNotifications/${_(r)}/items`).update(o)}catch(n){console.error("Error marking all as read:",n)}}const ho=v(!1),oe=v("checkin");function li(){oe.value="profile"}const rn=ut(()=>Xr.value.filter(t=>!t.read).length),si=[{id:"checkin",label:"Check-in",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>'},{id:"matches",label:"My Games",icon:'<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M5 5c2 3 2 6 2 7s0 4-2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M19 5c-2 3-2 6-2 7s0 4 2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M5 5c2 3 2 6 2 7s0 4-2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M19 5c-2 3-2 6-2 7s0 4 2 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>'},{id:"directory",label:"Team",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>'},{id:"notifications",label:"Alerts",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>'}];function ci(){return P(()=>{const t=setTimeout(()=>{ho.value=!0},50);return()=>clearTimeout(t)},[]),ho.value,e("nav",{style:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",height:"calc(56px + env(safe-area-inset-bottom, 0px))",paddingBottom:"env(safe-area-inset-bottom, 0px)",background:"#fff",borderTop:"1px solid #e0e0e0",display:"flex",justifyContent:"space-around",alignItems:"flex-start",paddingTop:"4px",zIndex:1e3,boxShadow:"var(--shadow-lg, 0 -2px 10px rgba(0,0,0,0.1))"},children:si.map(t=>{const r=oe.value===t.id,n=t.id==="notifications"&&rn.value>0;return e("button",{onClick:()=>{oe.value=t.id},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px",background:"none",border:"none",padding:"8px 12px",cursor:"pointer",color:r?"var(--color-primary, #2C6E49)":"#666",position:"relative",minWidth:"60px"},children:[t.useImageIcon?e("img",{src:r?t.activeIcon:t.icon,alt:t.label,style:{width:"24px",height:"24px",opacity:r?1:.7}}):e("div",{style:{position:"relative"},dangerouslySetInnerHTML:{__html:r?t.activeIcon:t.icon}}),n&&e("span",{style:{position:"absolute",top:"2px",right:"8px",background:"#f44336",color:"white",fontSize:"10px",padding:"1px 5px",borderRadius:"10px",minWidth:"16px",textAlign:"center"},children:rn.value>9?"9+":rn.value}),e("span",{style:{fontSize:"10px",fontWeight:r?"600":"400"},children:t.label})]},t.id)})})}const di=""+new URL("wimbledon-xfTrdB-N.png",import.meta.url).href,pi=""+new URL("usopen-Bs-XeyJ-.png",import.meta.url).href,Cr=v(!1),Nt=v(!1),ur=[{id:"default",name:"Classic",color:"#2C6E49",lightBg:"#E8F5E9",hoverBg:"#C8E6C9",logo:null,emoji:"🎾"},{id:"wimbledon",name:"Wimbledon",color:"#1B5E20",lightBg:"#E8F5E9",hoverBg:"#C8E6C9",logo:di,emoji:"🏆"},{id:"roland-garros",name:"Roland-Garros",color:"#cc4e0e",lightBg:"#FBE9E7",hoverBg:"#FFCCBC",logo:"https://images.prismic.io/fft-rg-site%2F95765448-c7fa-428b-b565-8368dba90b17_logo.svg",emoji:"🗼"},{id:"australian-open",name:"Australian Open",color:"#0277BD",lightBg:"#E1F5FE",hoverBg:"#B3E5FC",logo:"https://ausopen.com/sites/default/files/styles/medium/public/ao_blue_1.png?itok=dcy08jHH",emoji:"🦘"},{id:"us-open",name:"US Open",color:"#0D47A1",lightBg:"#E3F2FD",hoverBg:"#BBDEFB",logo:pi,emoji:"🗽"}];function go(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function ui(){const[t,r]=Me(go()),[n,o]=Me(!1),a=On(null);P(()=>{const c=setInterval(()=>{r(go())},1e3);return()=>clearInterval(c)},[]),P(()=>{function c(d){a.current&&!a.current.contains(d.target)&&o(!1)}return n&&document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[n]);const i=I.value?.theme||"default",l=ur.find(c=>c.id===i)||ur[0],s=async c=>{Qo(c==="default"?void 0:c);const d=C.value;if(d)try{await R().ref(`groups/${d}/settings/theme`).set(c==="default"?null:c),I.value={...I.value,theme:c==="default"?void 0:c};const h=ur.find(u=>u.id===c)?.name||"Classic";w(`Theme: ${h}`,"success")}catch(g){console.error("Error saving theme:",g)}o(!1)};return e("h1",{style:"display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-md, 8px);",children:[e("div",{ref:a,style:{position:"relative",display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",minWidth:0},children:[e("button",{onClick:c=>{c.stopPropagation(),t&&o(!n)},title:t?"Change theme":l.name,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",background:t?"var(--color-bg-card, white)":"transparent",border:t?`2px solid ${l.color}`:"none",borderRadius:"var(--radius-full, 50%)",cursor:t?"pointer":"default",fontSize:"var(--font-size-lg, 16px)",padding:l.logo?"3px":"0",flexShrink:0,boxShadow:t?"var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))":"none"},className:t?"hover-admin-badge":"",children:[l.logo?e("img",{src:l.logo,alt:l.name,style:{width:"100%",height:"100%",objectFit:"contain"},onError:c=>{const d=c.target;d.style.display="none";const g=d.nextElementSibling;g&&(g.style.display="block")}}):null,e("span",{style:{display:l.logo?"none":"block"},children:l.emoji})]}),e("span",{id:"groupNameDisplay",style:"font-size: var(--font-size-xl, 18px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; padding-top: 2px;",children:G.value||"Tennis Coordinator"}),n&&t&&e("div",{style:{position:"absolute",top:"32px",left:"0",background:"var(--color-bg-card, white)",borderRadius:"var(--radius-xl, 12px)",boxShadow:"var(--shadow-lg, 0 4px 20px rgba(0,0,0,0.15))",padding:"var(--spacing-md, 8px)",minWidth:"180px",zIndex:1e3},children:ur.map(c=>e("button",{onClick:()=>s(c.id),style:{display:"flex",alignItems:"center",gap:"var(--spacing-lg, 10px)",width:"100%",padding:"var(--spacing-lg, 10px) var(--spacing-xl, 12px)",background:i===c.id?`${c.color}15`:"transparent",border:"none",borderRadius:"var(--radius-lg, 8px)",cursor:"pointer",textAlign:"left",transition:"background 0.2s"},onMouseEnter:d=>{i!==c.id&&(d.currentTarget.style.background="var(--color-bg-muted, #f5f5f5)")},onMouseLeave:d=>{i!==c.id&&(d.currentTarget.style.background="transparent")},children:[e("span",{style:{width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center"},children:c.logo?e("img",{src:c.logo,alt:c.name,style:{width:"24px",height:"24px",objectFit:"contain"},onError:d=>{d.target.style.display="none"}}):e("span",{style:{fontSize:"var(--font-size-2xl, 20px)"},children:c.emoji})}),e("span",{style:{flex:1,fontWeight:i===c.id?"600":"400",color:i===c.id?c.color:"var(--color-text-primary, #333)"},children:c.name}),i===c.id&&e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:c.color,children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})})]},c.id))})]}),k.value&&e("button",{onClick:li,style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",background:t?"var(--color-warning-light, #FFF3E0)":l.lightBg,border:`1px solid ${t?"var(--color-warning, #FF9800)":l.color}40`,borderLeft:t?"3px solid var(--color-warning, #FF9800)":`3px solid ${l.color}`,borderRadius:"var(--radius-lg, 8px)",padding:"var(--spacing-sm, 6px) var(--spacing-lg, 10px)",fontSize:"var(--font-size-base, 14px)",fontWeight:"600",color:"var(--color-text-primary, #333)",cursor:"pointer",boxShadow:"var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",transition:"all 0.2s ease"},onMouseEnter:c=>{const d=c.currentTarget;d.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))",d.style.transform="translateY(-1px)",d.style.background=t?"#FFE0B2":l.hoverBg},onMouseLeave:c=>{const d=c.currentTarget;d.style.boxShadow="var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",d.style.transform="translateY(0)",d.style.background=t?"var(--color-warning-light, #FFF3E0)":l.lightBg},onMouseDown:c=>{const d=c.currentTarget;d.style.transform="translateY(0)",d.style.boxShadow="var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.1))"},onMouseUp:c=>{const d=c.currentTarget;d.style.transform="translateY(-1px)",d.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))"},children:[e("span",{style:{maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:k.value}),t&&e("span",{style:{background:"var(--color-warning, #FF9800)",color:"white",fontSize:"var(--font-size-2xs, 9px)",padding:"1px var(--spacing-xs, 4px)",borderRadius:"var(--radius-md, 4px)",fontWeight:"600",letterSpacing:"0.5px"},children:"ADMIN"}),e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",style:{opacity:.5,marginLeft:"-2px"},children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]})}const hr=v(""),bt=v("");function hi({isOpen:t,groupName:r,correctPin:n,onSuccess:o}){const a=l=>{l.preventDefault(),hr.value===n?(bt.value="",hr.value="",o()):(bt.value="Invalid PIN. Please try again.",w("Invalid PIN","error"))},i=l=>{hr.value=l.target.value,bt.value=""};return e(De,{isOpen:t,title:"",showCloseButton:!1,children:[e("div",{class:"pin-modal-content",children:[e("div",{class:"pin-header",children:[e("p",{class:"tennis-icon",children:"🎾"}),e("h2",{children:"Welcome to"}),e("p",{class:"group-name",children:r||"Tennis Coordinator"})]}),e("p",{class:"pin-instruction",children:"Enter the group PIN to access check-ins"}),e("form",{onSubmit:a,children:[e("input",{type:"password",inputMode:"numeric",pattern:"[0-9]*",placeholder:"Enter PIN",value:hr.value,onInput:i,class:"pin-input",autoFocus:!0}),bt.value&&e("p",{class:"error-message",children:bt.value}),e("button",{type:"submit",class:"pin-submit-btn",children:"Enter"})]}),e("p",{class:"pin-help",children:"Don't know the PIN? Ask your group admin."})]}),e("style",{children:`
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
      `})]})}const it=v(""),Lt=v(""),Ft=v(""),Fe=v(""),lt=v(""),st=v(""),Bt=v(""),jt=v(""),Vn=v(!0),Ot=v(""),Cn=v(!1);function gi(){const t=C.value;if(!t)return!1;const r=`adminAuth_${t}`;return sessionStorage.getItem(r)==="true"}function vi(){const t=C.value;t&&(sessionStorage.setItem(`adminAuth_${t}`,"true"),Cn.value=!0)}function fi(){it.value=G.value||"",Lt.value=I.value.adminPin||"",Ft.value=I.value.groupPin||"",Fe.value=I.value.location?.name||"",lt.value=I.value.location?.lat?.toString()||"",st.value=I.value.location?.lon?.toString()||"",Bt.value=I.value.groupDescription||"",jt.value=I.value.groupRules||"",Cn.value=gi(),Vn.value=!Cn.value&&!!I.value.adminPin,Ot.value=""}async function mi(t=!1){const r=C.value;if(r)try{const o=R().ref(`groups/${r}/settings`),a={groupName:it.value,adminPin:Lt.value,groupPin:Ft.value,groupDescription:Bt.value||null,groupRules:jt.value||null};Fe.value&&lt.value&&st.value&&(a.location={name:Fe.value,lat:parseFloat(lt.value),lon:parseFloat(st.value)}),await o.update(a),G.value=it.value,I.value={...I.value,adminPin:Lt.value,groupPin:Ft.value,location:Fe.value?{name:Fe.value,lat:parseFloat(lt.value),lon:parseFloat(st.value)}:void 0,groupDescription:Bt.value||void 0,groupRules:jt.value||void 0},w("Settings saved","success"),t&&zn()}catch(n){console.error("Error saving settings:",n),w("Failed to save settings","error")}}function vo(){Ot.value===I.value.adminPin?(vi(),Vn.value=!1,Nt.value=!1,w("Admin mode enabled","success")):(w("Incorrect PIN","error"),Ot.value="")}function zn(){Nt.value=!1}function xi(){return Nt.value&&it.value===""&&G.value&&fi(),e(De,{isOpen:Nt.value,onClose:zn,title:"Admin Settings",subtitle:`Managing: ${G.value}`,children:Vn.value?e("div",{style:"padding: var(--spacing-3xl, 20px); text-align: center;",children:[e("p",{style:"margin-bottom: var(--spacing-2xl, 16px); color: var(--color-text-secondary, #666);",children:"Enter admin PIN to access settings"}),e("input",{type:"password",placeholder:"Admin PIN",value:Ot.value,onInput:t=>{Ot.value=t.target.value},onKeyPress:t=>{t.key==="Enter"&&vo()},style:"width: 100%; max-width: 200px; padding: var(--spacing-xl, 12px); text-align: center; font-size: var(--font-size-xl, 18px); border: 2px solid var(--color-border, #e0e0e0); border-radius: var(--radius-lg, 8px); margin-bottom: var(--spacing-2xl, 16px);"}),e("br",{}),e("button",{onClick:vo,style:"padding: var(--spacing-xl, 12px) 32px; background: var(--color-primary, #2C6E49); color: white;",children:"Submit"})]}):e(A,{children:[e("div",{style:"margin-bottom: var(--spacing-2xl, 16px);",children:e("div",{style:"display: flex; justify-content: space-between; align-items: center;",children:[e("h3",{style:"margin: 0; color: var(--color-text-primary, #333);",children:"Group Settings"}),e("span",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-secondary, #666); background: var(--color-bg-muted, #f5f5f5); padding: 2px var(--spacing-md, 8px); border-radius: var(--radius-lg, 10px);",children:"Click Save to apply"})]})}),e("div",{class:"pref-section",children:[e("h3",{children:"Group Name"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Display name for this tennis group"}),e("input",{type:"text",placeholder:"e.g., Tue/Thu Midday Doubles",value:it.value,onInput:t=>{it.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Group Story"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Tell your group's story - when/where you play, how it started, etc."}),e("textarea",{placeholder:"e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts...",value:Bt.value,onInput:t=>{Bt.value=t.target.value},rows:3,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Rules & Tips"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"House rules, etiquette, and tips for new members (one per line)"}),e("textarea",{placeholder:`e.g.,
Check in by 10am on game days
Bring water and sunscreen
New balls provided by rotating member...`,value:jt.value,onInput:t=>{jt.value=t.target.value},rows:4,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Admin PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Required to access admin settings"}),e("input",{type:"text",value:Lt.value,onInput:t=>{Lt.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Group PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Share this PIN with all group members to access the app"}),e("input",{type:"text",value:Ft.value,onInput:t=>{Ft.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Weather Location"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Set the location for weather forecasts"}),e("input",{type:"text",placeholder:"Location name (e.g., Los Gatos, CA)",value:Fe.value,onInput:t=>{Fe.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-md, 8px);"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);",children:[e("input",{type:"number",step:"0.0001",placeholder:"Latitude",value:lt.value,onInput:t=>{lt.value=t.target.value},style:"flex: 1;"}),e("input",{type:"number",step:"0.0001",placeholder:"Longitude",value:st.value,onInput:t=>{st.value=t.target.value},style:"flex: 1;"})]}),e("p",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);",children:["Tip: Use ",e("a",{href:"https://www.latlong.net/",target:"_blank",style:"color: var(--color-primary, #2C6E49);",children:"latlong.net"})," to find coordinates"]})]}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-top: var(--spacing-2xl, 16px);",children:[e("button",{onClick:zn,style:"flex: 1; background: var(--color-border, #e0e0e0); color: var(--color-text-primary, #333);",children:"Close"}),e("button",{onClick:()=>mi(!0),style:"flex: 1; background: var(--color-primary, #2C6E49); color: white;",children:"Save & Close"})]})]})})}const na={login:{label:"Logins",actions:["user_login"]},checkin:{label:"Check-ins",actions:["check-in","checkin"]},removal:{label:"Removals",actions:["removal"]},shared:{label:"Shared",actions:["whatsapp_share"]},notes:{label:"Notes",actions:["notes_saved","note_added","note_updated","note_removed"]},members:{label:"Members",actions:["member_added","member_removed","member_renamed"]},arrangements:{label:"Arrangements",actions:["arrangement_saved","arrangement_cleared"]}},Qe=v(!1),Ut=v([]),Sn=v(!1),he=v(new Set);async function bi(){const t=C.value;if(t){Sn.value=!0;try{const r=R();let n=[];const a=(await r.ref(`groups/${t}/activity`).once("value")).val();if(a){for(const[i,l]of Object.entries(a))if(l)for(const[s,c]of Object.entries(l))n.push({...c,date:i,firebaseKey:s})}n.sort((i,l)=>l.timestamp-i.timestamp),Ut.value=n}catch(r){console.error("Error loading activity:",r)}finally{Sn.value=!1}}}async function yi(t){const r=C.value;if(!(!r||!t.firebaseKey||!t.date)&&confirm("Remove this activity entry?"))try{await R().ref(`groups/${r}/activity/${t.date}/${t.firebaseKey}`).remove(),Ut.value=Ut.value.filter(o=>!(o.date===t.date&&o.firebaseKey===t.firebaseKey))}catch(n){console.error("Error deleting activity:",n),alert("Failed to delete activity")}}function wi(t){return Hn(t)}function ki(t){switch(t){case"check-in":case"checkin":return"✅";case"removal":return"❌";case"member_added":return"👤";case"member_removed":return"🚫";case"member_renamed":return"✏️";case"whatsapp_share":return"📤";case"notes_saved":case"note_added":return"📝";case"note_updated":return"✏️";case"note_removed":return"🗑️";case"user_login":return"🔓";case"arrangement_saved":return"🔀";case"arrangement_cleared":return"↩️";default:return"📋"}}function _i(t){const{action:r,player:n,by:o,playStyle:a,timeRange:i,matchKey:l,type:s}=t;switch(r){case"check-in":case"checkin":{let c=`${n} checked in`;return o&&o!==n&&(c+=` (by ${o})`),a&&(c+=` - ${Jr(a)}`,(i?.start||i?.end)&&(c+=` (${i.start||"anytime"}–${i.end||"anytime"})`)),c}case"removal":return o&&o!==n?`${o} removed ${n}`:`${n} removed themselves`;case"member_added":return`${o} added ${n} as member`;case"member_removed":return`${o} removed ${n} from members`;case"member_renamed":return`${o} renamed ${t.oldName} to ${n}`;case"whatsapp_share":{let d=`${o} shared ${s==="matches"?"matches":s==="checkin"?"check-in":"removal"} to WhatsApp`;return n&&n!==o&&(d+=` (for ${n})`),d}case"notes_saved":case"note_added":{const c=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} added note to ${c}${d}`}case"note_updated":{const c=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} updated note on ${c}${d}`}case"note_removed":{const c=l?l.replace("-"," #").replace("forming 1","forming"):"match";return`${o} removed note from ${c}`}case"user_login":return`${n} logged in`;case"arrangement_saved":{const{matchCount:c}=t;let d=`${o} arranged matches`;return c&&(d+=` (${c} match${c>1?"es":""})`),d}case"arrangement_cleared":return`${o} cleared arrangement (back to auto)`;default:return`${n} - ${r}`}}function Ci(t){const r=new Set(he.value);r.has(t)?r.delete(t):r.add(t),he.value=r}function zi(){if(he.value.size===0)return Ut.value;const t=new Set;return he.value.forEach(r=>{na[r].actions.forEach(n=>t.add(n))}),Ut.value.filter(r=>t.has(r.action))}function Si(){Cr.value=!1,Qe.value=!1,he.value=new Set}function $i(){P(()=>{Cr.value&&bi()},[Cr.value]);const t=zi(),r={};return Qe.value?t.forEach(n=>{r[n.date]||(r[n.date]=[]),r[n.date].push(n)}):t.forEach(n=>{const o=new Date(n.timestamp).toISOString().split("T")[0];r[o]||(r[o]=[]),r[o].push(n)}),e(De,{isOpen:Cr.value,onClose:Si,title:"Activity History",children:[e("div",{style:"display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;",children:[Object.entries(na).map(([n,o])=>{const a=he.value.has(n);return e("button",{onClick:()=>Ci(n),style:{padding:"4px 10px",fontSize:"12px",border:a?"1px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #ddd)",borderRadius:"var(--radius-2xl, 16px)",background:a?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, #fff)",color:a?"var(--color-primary, #2E7D32)":"var(--color-text-secondary, #666)",cursor:"pointer",fontWeight:a?"500":"400"},children:o.label},n)}),he.value.size>0&&e("button",{onClick:()=>{he.value=new Set},style:{padding:"4px 10px",fontSize:"var(--font-size-sm, 12px)",border:"1px solid var(--color-error, #f44336)",borderRadius:"var(--radius-2xl, 16px)",background:"var(--color-bg-card, #fff)",color:"var(--color-error, #f44336)",cursor:"pointer"},children:"Clear"})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin: 0;",children:[Qe.value?"Grouped by play date":"Grouped by when changes were made",he.value.size>0&&` (${t.length} filtered)`]}),e("label",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); cursor: pointer; display: flex; align-items: center; gap: 4px;",children:[e("input",{type:"checkbox",checked:Qe.value,onChange:n=>{Qe.value=n.target.checked}}),"Group by Play Date"]})]}),e("div",{style:"max-height: 400px; overflow-y: auto;",children:Sn.value?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:"Loading..."}):t.length===0?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:he.value.size>0?"No matching activities":"No activity recorded yet"}):Object.entries(r).sort(([n],[o])=>o.localeCompare(n)).map(([n,o])=>e("div",{children:[e("div",{style:"font-weight: bold; color: var(--color-text-secondary, #666); margin-top: 12px; padding-bottom: 4px; border-bottom: 1px solid var(--color-border, #ddd);",children:H(n)}),o.map((a,i)=>e("div",{style:"padding: 10px; background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-md, 6px); font-size: var(--font-size-base, 14px); margin-top: 8px; position: relative;",children:e("div",{style:"display: flex; align-items: flex-start; gap: 6px;",children:[e("span",{children:ki(a.action)}),e("div",{style:"flex: 1;",children:[e("div",{style:"white-space: pre-wrap;",children:_i(a)}),a.arrangementDetails&&e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-top: 4px; background: var(--color-bg-card, #fff); padding: 6px 8px; border-radius: var(--radius-sm, 4px); border: 1px solid var(--color-border, #e0e0e0);",children:a.arrangementDetails}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #999); margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap;",children:[e("span",{children:wi(a.timestamp)}),Qe.value?e("span",{style:"color: var(--color-text-secondary, #666);",children:["changed on ",H(new Date(a.timestamp).toISOString().split("T")[0])]}):e("span",{style:"color: var(--color-primary, #2C6E49);",children:["for ",H(a.date)]})]})]}),e("button",{onClick:()=>yi(a),title:"Remove this activity",style:{background:"none",border:"none",padding:"var(--spacing-xs, 4px)",cursor:"pointer",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-lg, 16px)",lineHeight:"1",borderRadius:"var(--radius-sm, 4px)"},className:"hover-danger",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})},i))]},n))})]})}const Gn=v(!1),Yn=v(""),qn=v(""),Kn=v("");function Jn(t){const r=G.value||"our tennis group",n=C.value,o=window.location.href.split("?")[0]+"?group="+n,a=I.value.groupPin||"";return`Hi ${t}! You've been added to ${r} tennis coordination.

Check in for upcoming matches here:
${o}

PIN: ${a}

Just select your name and check in when you can play!`}function Ii(t,r){const n=t.replace(/[\s\-\(\)]/g,""),o=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(o)?`sms:${n}&body=${encodeURIComponent(r)}`:`sms:${n}?body=${encodeURIComponent(r)}`}function Mi(t,r,n){return`mailto:${t}?subject=${encodeURIComponent(r)}&body=${encodeURIComponent(n)}`}async function Di(t){const r=Jn(t),n=G.value||"Tennis Group";try{await navigator.share({title:`Join ${n}`,text:r}),Be(),w("Shared successfully!","success")}catch(o){o.name!=="AbortError"&&(console.error("Share failed:",o),oa(t))}}async function oa(t){const r=Jn(t);try{await navigator.clipboard.writeText(r),Be(),w("Message copied! Paste in SMS or email.","success")}catch{const o=document.createElement("textarea");o.value=r,o.style.position="fixed",o.style.left="-9999px",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),Be(),w("Message copied! Paste in SMS or email.","success")}}function Be(){Gn.value=!1,Yn.value="",qn.value="",Kn.value=""}function Ei(t,r,n){Yn.value=t,qn.value=r||"",Kn.value=n||"",Gn.value=!0}function Ai(){const t=Yn.value,r=qn.value,n=Kn.value,o=Jn(t),a=G.value||"Tennis Group",i=typeof navigator<"u"&&navigator.share!==void 0;return e(De,{isOpen:Gn.value,onClose:Be,title:"",showCloseButton:!1,children:e("div",{style:{textAlign:"center",padding:"10px 0"},children:[e("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:["Invite ",t,"?"]}),e("p",{style:{margin:"0 0 16px 0",color:"#666",fontSize:"14px"},children:"Send them an invite with the group link and PIN"}),e("div",{style:{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"},children:[r&&e("a",{href:Ii(r,o),onClick:()=>setTimeout(Be,500),style:{background:"#25D366",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[e("span",{children:"📱"})," Text ",r]}),n&&e("a",{href:Mi(n,`You're invited to ${a}`,o),onClick:()=>setTimeout(Be,500),style:{background:"#4285F4",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[e("span",{children:"📧"})," Email"]}),i&&e("button",{onClick:()=>Di(t),style:{background:"#9C27B0",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"},children:[e("span",{children:"📤"})," Other"]}),e("button",{onClick:()=>oa(t),style:{background:"#607D8B",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"},children:[e("span",{children:"📋"})," Copy"]})]}),e("button",{onClick:Be,style:{marginTop:"12px",background:"none",border:"none",color:"#999",fontSize:"14px",cursor:"pointer"},children:"Skip"})]})})}const aa=v(!1),ht=v(null),Br=v(""),Ht=v(""),Wt=v(""),Vt=v(""),Ae=v(""),jr=v(!1),Gt=v(""),Yt=v(""),qt=v(""),Kt=v("");async function Ri(){const t=Gt.value.trim();if(!t){w("Please enter member name","error");return}const r=Yt.value.trim(),n=qt.value.trim();await Wn({name:t,phone:r,email:n,notes:Kt.value.trim(),addedBy:k.value||"Admin"}),Gt.value="",Yt.value="",qt.value="",Kt.value="",jr.value=!1}function ia(){Gt.value="",Yt.value="",qt.value="",Kt.value="",jr.value=!1}function Ti(t){confirm(`Remove ${t} from the group?`)&&ta(t)}function Pi(t){ht.value=t,Br.value=t;const r=K.value[t]||{};Ht.value=r.phone||"",Wt.value=r.email||"",Vt.value=r.notes||""}async function Ni(){const t=ht.value;if(!t)return;const r=C.value;if(!r)return;const n=Br.value.trim();try{if(n!==t&&!await ra(t,n))return;const o=n!==t?n:t;await R().ref(`groups/${r}/settings/memberDetails/${o}`).update({phone:Ht.value,email:Wt.value,notes:Vt.value}),K.value={...K.value,[o]:{...K.value[o]||{},phone:Ht.value,email:Wt.value,notes:Vt.value}},ht.value=null,n===t&&w("Member updated","success")}catch(o){console.error("Error updating member:",o),w("Failed to update member","error")}}function Li(){aa.value=!1,ht.value=null,Ae.value="",ia()}function Fi(){const t=V.value,r=K.value,n=t.filter(o=>o.toLowerCase().includes(Ae.value.toLowerCase())).sort((o,a)=>o.localeCompare(a));return e(De,{isOpen:aa.value,onClose:Li,title:"Manage Members",subtitle:`${t.length} members in group`,children:[ht.value&&e("div",{style:"position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1001;",children:e("div",{style:"background: white; padding: 24px; border-radius: 12px; max-width: 400px; width: 90%;",children:[e("h3",{style:"margin-top: 0;",children:"Edit Member"}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Name"}),e("input",{type:"text",placeholder:"Member name",value:Br.value,onInput:o=>{Br.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Phone"}),e("input",{type:"tel",placeholder:"Phone number",value:Ht.value,onInput:o=>{Ht.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Email"}),e("input",{type:"email",placeholder:"Email address",value:Wt.value,onInput:o=>{Wt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 16px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Notes"}),e("textarea",{placeholder:"Notes (skill level, etc.)",rows:2,value:Vt.value,onInput:o=>{Vt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; box-sizing: border-box;"})]}),e("div",{style:"display: flex; gap: 8px;",children:[e("button",{onClick:()=>{ht.value=null},style:"flex: 1; background: #ccc; color: #333;",children:"Cancel"}),e("button",{onClick:Ni,style:"flex: 1; background: var(--color-primary, #2C6E49); color: white;",children:"Save"})]})]})}),e("div",{style:"margin-bottom: 16px;",children:e("div",{style:"position: relative;",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%);",children:e("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"})}),e("input",{type:"text",placeholder:"Search members...",value:Ae.value,onInput:o=>{Ae.value=o.target.value},style:"width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"}),Ae.value&&e("button",{onClick:()=>{Ae.value=""},style:"position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 0;",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})})]})}),e("div",{style:"max-height: 400px; overflow-y: auto; margin-bottom: 16px;",children:n.length===0?e("div",{style:"text-align: center; padding: 20px; color: #888;",children:Ae.value?"No members found":"No members yet"}):n.map(o=>{const a=r[o],i=a&&(a.phone||a.email||a.addedBy),l=a&&(a.phone||a.email),s=a?.addedDate?new Date(a.addedDate).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):null;return e("div",{style:"flex-direction: column; align-items: flex-start; padding: 12px; background: #f9f9f9; border-radius: 8px; margin-bottom: 8px;",children:[e("div",{style:"display: flex; justify-content: space-between; width: 100%; align-items: center;",children:[e("span",{style:"font-weight: 500;",children:o}),e("div",{style:"display: flex; gap: 4px;",children:[e("button",{onClick:()=>Pi(o),style:{background:"rgba(76, 175, 80, 0.1)",color:"var(--color-primary, #2C6E49)",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Edit",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})}),l&&e("button",{onClick:()=>Ei(o,a?.phone,a?.email),style:{background:"rgba(33, 150, 243, 0.1)",color:"#2196F3",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Invite",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})})}),e("button",{onClick:()=>Ti(o),style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Remove",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})]}),i&&e("div",{style:"font-size: 12px; color: #666; margin-top: 8px; padding-left: 12px; border-left: 3px solid var(--color-primary, #2C6E49);",children:[a?.addedBy&&e("div",{children:["Added by: ",e("strong",{children:a.addedBy}),s&&` on ${s}`]}),a?.phone&&e("div",{children:["📱 ",a.phone]}),a?.email&&e("div",{children:["📧 ",a.email]}),a?.notes&&e("div",{children:["Notes: ",a.notes]})]})]},o)})}),e("div",{style:"padding-top: 12px; border-top: 1px solid #e0e0e0;",children:jr.value?e("div",{style:"background: #f9f9f9; padding: 16px; border-radius: 8px;",children:[e("h4",{style:"margin: 0 0 12px 0; font-size: 14px; color: #333;",children:"Add New Member"}),e("input",{type:"text",placeholder:"Member's full name",value:Gt.value,onInput:o=>{Gt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; margin-bottom: 8px; box-sizing: border-box;"}),e("div",{style:"display: flex; gap: 8px; margin-bottom: 8px;",children:[e("input",{type:"tel",placeholder:"Phone (optional)",value:Yt.value,onInput:o=>{Yt.value=o.target.value},style:"flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"}),e("input",{type:"email",placeholder:"Email (optional)",value:qt.value,onInput:o=>{qt.value=o.target.value},style:"flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("textarea",{placeholder:"Notes (skill level, how you know them, etc.) - optional",rows:2,value:Kt.value,onInput:o=>{Kt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; margin-bottom: 12px; box-sizing: border-box; font-family: inherit;"}),e("div",{style:"font-size: 12px; color: #666; margin-bottom: 12px;",children:["Added by: ",e("strong",{children:k.value||"Admin"})]}),e("div",{style:"display: flex; gap: 8px;",children:[e("button",{onClick:ia,style:"flex: 1; padding: 10px; background: #ccc; color: #333; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;",children:"Cancel"}),e("button",{onClick:Ri,style:"flex: 2; padding: 10px; background: var(--color-primary, #2C6E49); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;",children:"Add Member"})]})]}):e("button",{onClick:()=>{jr.value=!0},style:"width: 100%; padding: 12px; background: var(--color-primary, #2C6E49); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 8px;",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})}),"Add New Member"]})})]})}const Jt=v(!1),nn=v("");async function Bi(t,r){try{const n=R(),o=new Date().toISOString().split("T")[0];await n.ref(`groups/${t}/activity/${o}`).push({timestamp:Date.now(),action:"user_login",player:r,by:r})}catch(n){console.error("Error logging login activity:",n)}}function ji(t){k.value=t;const r=C.value;r&&(localStorage.setItem(`sessionUser_${r}`,t),Bi(r,t)),Vr.value=t,Wr.value=!0,Jt.value=!1,window.scrollTo(0,0),w(`Welcome, ${t}!`,"success")}function Oi(){const t=[...V.value].sort((a,i)=>a.localeCompare(i)),r=nn.value.toLowerCase(),n=r?t.filter(a=>a.toLowerCase().includes(r)):t,o=a=>{nn.value=a.target.value};return e(De,{isOpen:Jt.value,title:"",showCloseButton:!1,children:[e("div",{class:"welcome-modal-content",children:[e("div",{class:"welcome-header",children:[e("h2",{children:"Welcome Back"}),e("p",{class:"group-name",children:G.value})]}),e("p",{class:"instruction",children:"Select your name to start"}),e("div",{class:"search-container",children:e("input",{type:"text",placeholder:"Search member...",value:nn.value,onInput:o,class:"search-input"})}),e("div",{class:"member-list",children:[n.map(a=>e("button",{class:"member-row",onClick:()=>ji(a),children:[e("div",{class:"member-avatar",children:a.charAt(0).toUpperCase()}),e("span",{class:"member-name",children:a})]},a)),n.length===0&&e("p",{class:"no-results",children:"No members found"})]})]}),e("style",{children:`
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
      `})]})}function Ui(t){if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}function Hi(t){return`https://wa.me/?text=${encodeURIComponent(t)}`}function Wi(t,r){const n=t.replace(/[\s\-\(\)]/g,""),o=encodeURIComponent(r),a=/iPhone|iPad|iPod/.test(navigator?.userAgent||"")?"&":"?";return`sms:${n}${a}body=${o}`}function la(t){const r=new Date(t+"T12:00:00"),n=r.toLocaleDateString("en-US",{weekday:"long"}),o=r.toLocaleDateString("en-US",{month:"long"}),a=r.getDate(),i=Ui(a);return`${n}, ${o} ${a}${i}`}function Vi(t,r,n){const o=la(r),a=[];a.push(`I'm checking in for tennis on ${o}!`),a.push("");const i=n.playStyle==="singles"?"Singles only":n.playStyle==="doubles"?"Doubles only":"Either singles or doubles";if(a.push(`Preference: ${i}`),n.timeRange){const l=ne(n.timeRange.start,n.timeRange.end);l&&a.push(`Available: ${l}`)}return a.join(`
`)}function Gi(t,r){return`I'm no longer available for tennis on ${la(r)}.`}async function Yi(t){try{if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(t),!0;const r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();const n=document.execCommand("copy");return document.body.removeChild(r),n}catch{return!1}}function qi(t,r,n,o){return`Hi ${t}! You've been added to ${r} tennis coordination.

Check in for upcoming matches here:
${n}

PIN: ${o}

Just select your name and check in when you can play!`}const Xe=v(!1);typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;!r.closest(".share-prompt-dropdown")&&!r.closest("[data-share-prompt-button]")&&(Xe.value=!1)});function Ki(){const t=ge.value,r=ve.value;if(P(()=>{if(t){const h=setTimeout(()=>{ge.value=!1,ve.value=null},8e3);return()=>clearTimeout(h)}},[t]),!t||!r)return null;const n=r.action==="removal",o=r.action==="invite",a=()=>o?qi(r.name,r.groupName||"",r.groupUrl||"",r.groupPin||""):n?Gi(r.name,r.date):Vi(r.name,r.date,{playStyle:r.playStyle||"both",timeRange:r.timeRange}),i=h=>{const u=a();if(h==="whatsapp"){const p=Hi(u);window.open(p,"_blank")}else if(h==="sms"){const p=Wi("",u);window.location.href=p}else h==="copy"&&Yi(u).then(p=>{p?w("Copied to clipboard","success"):w("Failed to copy","error")});Xe.value=!1,ge.value=!1,ve.value=null},l=()=>{ge.value=!1,ve.value=null},s=o?"var(--color-info-light, #E3F2FD)":n?"var(--color-warning-light, #FFF3E0)":"var(--color-success-light, #E8F5E9)",c=o?"var(--color-info, #1565C0)":n?"#E65100":"var(--color-success, #2E7D32)",d=o?"Added!":n?"Removed!":"Checked in!",g=o?`Invite ${r.name}?`:n?"Let others know?":"Share with the group?";return e("div",{style:{position:"fixed",bottom:"70px",left:"50%",transform:"translateX(-50%)",width:"calc(100% - 24px)",maxWidth:"456px",background:s,borderRadius:"12px",padding:"12px 16px",boxShadow:"var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))",display:"flex",alignItems:"center",gap:"12px",zIndex:1e3,animation:"slideUp 0.3s ease-out"},children:[e("div",{style:{flex:1,fontSize:"14px",color:c},children:[e("strong",{children:d})," ",g]}),e("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e("div",{style:{position:"relative"},children:[e("button",{"data-share-prompt-button":!0,onClick:h=>{h.stopPropagation(),Xe.value=!Xe.value},style:{background:Xe.value?"var(--color-primary-dark, #1a402b)":"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",padding:"8px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),Xe.value&&e("div",{class:"share-prompt-dropdown",style:{position:"absolute",bottom:"100%",right:"0",marginBottom:"8px",background:"white",borderRadius:"12px",boxShadow:"var(--shadow-3xl, 0 4px 16px rgba(0,0,0,0.2))",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:()=>i("whatsapp"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-whatsapp, #25D366)",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>i("sms"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-info, #2196F3)",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>i("copy"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"#666",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),e("button",{onClick:l,style:{background:"transparent",border:"none",padding:"4px",cursor:"pointer",color:"#666",fontSize:"18px",lineHeight:1},title:"Dismiss",children:"×"})]}),e("style",{children:`
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
      `})]})}const $n=v(!1),tt=v(null),Pe=v(!1),Ne=v(-1);function Ji(t){const r=E.value;if(!r)return null;const n=J.value[r]||[],o=n.findIndex(a=>a.name===t);return o===-1?null:{checkin:n[o],index:o}}function Qi(){const t=tt.value||k.value,r=!tt.value||tt.value===k.value,n=(s,c)=>{O.value=s,U.value=c},o=async()=>{if(!t){w("Please select a user first","error");return}const s=B.value,c=O.value&&U.value?{start:O.value,end:U.value}:void 0;Pe.value&&Ne.value>=0?await Xo(Ne.value,{playStyle:s,allowRotation:ke.value,timeRange:c},k.value||""):await _n({name:t,playStyle:s,isGuest:!1,addedBy:k.value,allowRotation:ke.value,timeRange:c}),ve.value={action:"checkin",name:t,playStyle:s,timeRange:c,date:E.value||""},ge.value=!0,i()},a=async()=>{Ne.value<0||(await Zo(Ne.value,k.value),ve.value={action:"removal",name:t||"",date:E.value||"",isOwner:r},ge.value=!0,i())},i=()=>{$n.value=!1,tt.value=null,Pe.value=!1,Ne.value=-1,B.value="both",ke.value=!0,O.value="",U.value=""},l=s=>{s.target.classList.contains("drawer-backdrop")&&i()};return $n.value?e("div",{class:"drawer-backdrop",onClick:l,children:[e("div",{class:"check-in-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:Pe.value?"Edit Check-in":"Check In"}),e("div",{class:"player-display",children:[e("div",{class:"player-avatar",children:t?.charAt(0).toUpperCase()}),e("div",{class:"player-info",children:[e("span",{class:"player-name",children:t}),e("span",{class:"player-context",children:r?"Playing as yourself":"Checking in for them"})]})]})]}),e("div",{class:"drawer-section",children:[e("h3",{children:"Play Style"}),e("div",{class:"preference-buttons",children:[e("button",{class:`pref-btn singles ${B.value==="singles"?"selected":""}`,onClick:()=>{B.value="singles"},children:"Singles"}),e("button",{class:`pref-btn ${B.value==="both"?"selected":""}`,onClick:()=>{B.value="both"},children:"Either"}),e("button",{class:`pref-btn doubles ${B.value==="doubles"?"selected":""}`,onClick:()=>{B.value="doubles"},children:"Doubles"})]})]}),e("div",{class:"drawer-section",children:e("label",{class:"rotation-toggle",children:[e("input",{type:"checkbox",checked:ke.value,onChange:s=>{ke.value=s.target.checked}}),e("span",{class:"toggle-label",children:[e("span",{class:"toggle-title",children:"Open to 3-player rotation"}),e("span",{class:"toggle-desc",children:"1v1 or 1v2 format when needed"})]})]})}),e("div",{class:"drawer-section",children:[e("h3",{children:["Available Time ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"time-presets",children:[e("button",{class:`time-btn ${O.value==="08:00"&&U.value==="12:00"?"selected":""}`,onClick:()=>n("08:00","12:00"),children:[e("span",{class:"time-label",children:"Morning"}),e("span",{class:"time-range",children:"8am-12pm"})]}),e("button",{class:`time-btn ${O.value==="12:00"&&U.value==="15:00"?"selected":""}`,onClick:()=>n("12:00","15:00"),children:[e("span",{class:"time-label",children:"Midday"}),e("span",{class:"time-range",children:"12-3pm"})]}),e("button",{class:`time-btn ${O.value==="15:00"&&U.value==="18:00"?"selected":""}`,onClick:()=>n("15:00","18:00"),children:[e("span",{class:"time-label",children:"Afternoon"}),e("span",{class:"time-range",children:"3-6pm"})]}),e("button",{class:`time-btn ${O.value==="18:00"&&U.value==="21:00"?"selected":""}`,onClick:()=>n("18:00","21:00"),children:[e("span",{class:"time-label",children:"Evening"}),e("span",{class:"time-range",children:"6-9pm"})]})]}),e("div",{class:"custom-time",children:[e("input",{type:"time",value:O.value,onInput:s=>{O.value=s.target.value},placeholder:"Start"}),e("span",{class:"time-separator",children:"to"}),e("input",{type:"time",value:U.value,onInput:s=>{U.value=s.target.value},placeholder:"End"}),(O.value||U.value)&&e("button",{class:"clear-time-btn",onClick:()=>{O.value="",U.value=""},children:"Clear"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:i,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:o,children:Pe.value?"Update":"Confirm"})]}),Pe.value&&e("div",{class:"drawer-remove",children:e("button",{class:"remove-btn",onClick:a,children:"Remove Check-in"})})]}),e("style",{children:`
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
      `})]}):null}function Or(t,r){if(t?tt.value=t:tt.value=null,r&&t){Pe.value=!0;const n=Ji(t);n&&(Ne.value=n.index,B.value=n.checkin.playStyle||"both",ke.value=n.checkin.allowRotation!==!1,n.checkin.timeRange&&(O.value=n.checkin.timeRange.start||"",U.value=n.checkin.timeRange.end||""))}else Pe.value=!1,Ne.value=-1,B.value="both",ke.value=!0,O.value="",U.value="";$n.value=!0}const In=v(!1),te=v("member"),wt=v("");function Xi(){te.value="member",wt.value="",Ze.value="",_t.value="",Ar.value="",Rr.value="",Tr.value="",ms.value=k.value||"",B.value="both",In.value=!0}function Zi(){const r=(()=>{const d=E.value,g=d?J.value[d]||[]:[],h=new Set(g.map(u=>u.name));return[...V.value].filter(u=>!h.has(u)).sort((u,p)=>u.localeCompare(p))})(),n=wt.value.toLowerCase(),o=n?r.filter(d=>d.toLowerCase().includes(n)):r,a=()=>{In.value=!1,wt.value=""},i=d=>{d.target.classList.contains("drawer-backdrop")&&a()},l=d=>{a(),Or(d,!1)},s=async()=>{if(!Ze.value.trim()){w("Please enter guest name","error");return}const d=B.value,g=O.value&&U.value?{start:O.value,end:U.value}:void 0;await _n({name:Ze.value.trim(),playStyle:d,isGuest:!0,addedBy:k.value,allowRotation:ke.value,timeRange:g}),ve.value={action:"checkin",name:Ze.value.trim(),playStyle:d,timeRange:g,date:E.value||""},ge.value=!0,a()},c=async()=>{if(!_t.value.trim()){w("Please enter member name","error");return}const d=_t.value.trim();await Wn({name:d,phone:Ar.value.trim(),email:Rr.value.trim(),notes:Tr.value.trim(),addedBy:k.value});const g=B.value,h=O.value&&U.value?{start:O.value,end:U.value}:void 0;await _n({name:d,playStyle:g,isGuest:!1,addedBy:k.value,allowRotation:ke.value,timeRange:h}),ve.value={action:"checkin",name:d,playStyle:g,timeRange:h,date:E.value||""},ge.value=!0,a()};return In.value?e("div",{class:"drawer-backdrop",onClick:i,children:[e("div",{class:"player-select-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:[te.value==="member"&&"Check in a player",te.value==="guest"&&"Add Guest",te.value==="newMember"&&"Add New Member"]}),e("div",{class:"mode-tabs",children:[e("button",{class:`mode-tab ${te.value==="member"?"active":""}`,onClick:()=>{te.value="member"},children:"Member"}),e("button",{class:`mode-tab ${te.value==="guest"?"active":""}`,onClick:()=>{te.value="guest"},children:"Guest"}),e("button",{class:`mode-tab ${te.value==="newMember"?"active":""}`,onClick:()=>{te.value="newMember"},children:"New Member"})]})]}),te.value==="member"&&e(A,{children:[e("div",{class:"search-container",children:e("input",{type:"text",placeholder:"Search member...",value:wt.value,onInput:d=>{wt.value=d.target.value},class:"search-input"})}),e("div",{class:"member-list",children:[o.map(d=>e("button",{class:"member-row",onClick:()=>l(d),children:[e("div",{class:"member-avatar",children:d.charAt(0).toUpperCase()}),e("span",{class:"member-name",children:d})]},d)),o.length===0&&e("p",{class:"no-results",children:r.length===0?"All members are already checked in":"No members found"})]})]}),te.value==="guest"&&e("div",{class:"form-section",children:[e("div",{class:"form-field",children:[e("label",{children:"Guest Name"}),e("input",{type:"text",placeholder:"Enter guest's name",value:Ze.value,onInput:d=>{Ze.value=d.target.value}})]}),e("div",{class:"form-field",children:[e("label",{children:"Play Style"}),e("div",{class:"preference-buttons",children:[e("button",{class:`pref-btn singles ${B.value==="singles"?"selected":""}`,onClick:()=>{B.value="singles"},children:"Singles"}),e("button",{class:`pref-btn ${B.value==="both"?"selected":""}`,onClick:()=>{B.value="both"},children:"Either"}),e("button",{class:`pref-btn doubles ${B.value==="doubles"?"selected":""}`,onClick:()=>{B.value="doubles"},children:"Doubles"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:a,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:s,children:"Add & Check In"})]})]}),te.value==="newMember"&&e("div",{class:"form-section",children:[e("div",{class:"form-field",children:[e("label",{children:"Full Name"}),e("input",{type:"text",placeholder:"Enter member's name",value:_t.value,onInput:d=>{_t.value=d.target.value}})]}),e("div",{class:"form-row",children:[e("div",{class:"form-field",children:[e("label",{children:["Phone ",e("span",{class:"optional",children:"(optional)"})]}),e("input",{type:"tel",placeholder:"Phone number",value:Ar.value,onInput:d=>{Ar.value=d.target.value}})]}),e("div",{class:"form-field",children:[e("label",{children:["Email ",e("span",{class:"optional",children:"(optional)"})]}),e("input",{type:"email",placeholder:"Email address",value:Rr.value,onInput:d=>{Rr.value=d.target.value}})]})]}),e("div",{class:"form-field",children:[e("label",{children:["Notes ",e("span",{class:"optional",children:"(optional)"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:3,value:Tr.value,onInput:d=>{Tr.value=d.target.value}})]}),e("p",{class:"added-by-info",children:["Added by: ",e("strong",{children:k.value||"(unknown)"})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:a,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:c,children:"Add & Check In"})]})]})]}),e("style",{children:`
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
      `})]}):null}const Mn=v(!1),zr=v(""),Sr=v(""),$r=v(""),Ir=v("");function sa(){zr.value="",Sr.value="",$r.value="",Ir.value=""}function el(){const t=async()=>{const o=zr.value.trim();if(!o){w("Please enter member name","error");return}await Wn({name:o,phone:Sr.value.trim(),email:$r.value.trim(),notes:Ir.value.trim(),addedBy:k.value||"Unknown"}),r()},r=()=>{Mn.value=!1,sa()},n=o=>{o.target.classList.contains("drawer-backdrop")&&r()};return Mn.value?e("div",{class:"drawer-backdrop",onClick:n,children:[e("div",{class:"add-member-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:"Add New Member"}),e("p",{class:"drawer-subtitle",children:"Add a teammate to your group"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Name ",e("span",{class:"required",children:"*"})]}),e("input",{type:"text",placeholder:"Enter member's full name",value:zr.value,onInput:o=>{zr.value=o.target.value},class:"drawer-input",autoFocus:!0})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Contact Info ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"contact-inputs",children:[e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"})}),e("input",{type:"tel",placeholder:"Phone number",value:Sr.value,onInput:o=>{Sr.value=o.target.value},class:"drawer-input with-icon"})]}),e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),e("input",{type:"email",placeholder:"Email address",value:$r.value,onInput:o=>{$r.value=o.target.value},class:"drawer-input with-icon"})]})]}),e("p",{class:"field-hint",children:"Used for sending invites to join the group"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Notes ",e("span",{class:"optional-tag",children:"optional"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:2,value:Ir.value,onInput:o=>{Ir.value=o.target.value},class:"drawer-textarea"})]}),e("div",{class:"added-by-info",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"#999",children:e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"})}),e("span",{children:["Added by: ",e("strong",{children:k.value||"Unknown"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:r,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:t,children:"Add Member"})]})]}),e("style",{children:`
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
      `})]}):null}function tl(){sa(),Mn.value=!0}const Dn=v(!1),Mr=v(null),$t=v(""),It=v(""),Mt=v(""),Dt=v(""),Et=v(!1),At=v(!1),de=v(!1),rt=v(!1);function rl(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function nl(){$t.value="",It.value="",Mt.value="",Dt.value="",Et.value=!1,At.value=!1,de.value=!1,rt.value=!1}function ol(){const t=Mr.value,r=rl(),n=t===k.value,o=r&&!n,a=r&&!n,i=async()=>{if(!t)return;const d=$t.value.trim();if(!d){w("Please enter member name","error");return}if(de.value=!0,o&&d!==t){if(!await ra(t,d)){de.value=!1;return}Mr.value=d}const g=await Qa(d,{phone:It.value.trim(),email:Mt.value.trim(),notes:Dt.value.trim(),shareContactInDirectory:Et.value,shareNotesInDirectory:At.value});de.value=!1,g?(w("Member updated successfully","success"),s()):w("Failed to update member","error")},l=async()=>{if(!t||!a)return;if(!rt.value){rt.value=!0;return}de.value=!0;const d=await ta(t);de.value=!1,d?(w(`${t} removed from team`,"success"),s()):w("Failed to remove member","error")},s=()=>{Dn.value=!1,Mr.value=null,nl()},c=d=>{d.target.classList.contains("drawer-backdrop")&&s()};return!Dn.value||!t?null:e("div",{class:"drawer-backdrop",onClick:c,children:[e("div",{class:"edit-member-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:n?"Edit Your Profile":"Edit Member"}),e("p",{class:"drawer-subtitle",children:n?"Update your contact info and privacy settings":`Update ${t}'s information`})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Name ",o&&e("span",{class:"optional-tag",children:"editable"})]}),e("input",{type:"text",placeholder:"Member name",value:$t.value,onInput:d=>{$t.value=d.target.value},class:"drawer-input",disabled:!o,style:o?{}:{background:"#f5f5f5",color:"#666"}})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Contact Info ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"contact-inputs",children:[e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"})}),e("input",{type:"tel",placeholder:"Phone number",value:It.value,onInput:d=>{It.value=d.target.value},class:"drawer-input with-icon"})]}),e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),e("input",{type:"email",placeholder:"Email address",value:Mt.value,onInput:d=>{Mt.value=d.target.value},class:"drawer-input with-icon"})]})]})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Notes ",e("span",{class:"optional-tag",children:"optional"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:2,value:Dt.value,onInput:d=>{Dt.value=d.target.value},class:"drawer-textarea"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:"Privacy Settings"}),e("div",{class:"privacy-options",children:[e("label",{class:"privacy-option",children:[e("input",{type:"checkbox",checked:Et.value,onChange:d=>{Et.value=d.target.checked}}),e("div",{class:"privacy-option-content",children:[e("span",{class:"privacy-option-title",children:"Share contact info in directory"}),e("span",{class:"privacy-option-desc",children:"Phone and email visible to all members"})]})]}),e("label",{class:"privacy-option",children:[e("input",{type:"checkbox",checked:At.value,onChange:d=>{At.value=d.target.checked}}),e("div",{class:"privacy-option-content",children:[e("span",{class:"privacy-option-title",children:"Share profile notes in directory"}),e("span",{class:"privacy-option-desc",children:"Notes visible to all members"})]})]})]})]}),a&&e("div",{class:"drawer-section",children:e("button",{class:`remove-btn ${rt.value?"confirming":""}`,onClick:l,disabled:de.value,children:rt.value?"Tap again to confirm removal":"Remove from Team"})}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:s,disabled:de.value,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:i,disabled:de.value,children:de.value?"Saving...":"Save Changes"})]})]}),e("style",{children:`
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
      `})]})}function ca(t){const r=K.value?.[t];$t.value=t,It.value=r?.phone||"",Mt.value=r?.email||"",Dt.value=r?.notes||"",Et.value=r?.shareContactInDirectory||!1,At.value=r?.shareNotesInDirectory||!1,rt.value=!1,Mr.value=t,Dn.value=!0}function al(t){const r=k.value;return r?(J.value[t]||[]).some(o=>o.name&&_(o.name)===_(r)):!0}function il(t){E.value=t,k.value&&!al(t)?(Vr.value=k.value,Wr.value=!0):(Vr.value="",Wr.value=!1)}function ll(){const t=On(null);P(()=>{const a=t.current;if(!a)return;const i=setTimeout(()=>{const l=a.querySelector('[data-today="true"]');l&&l.scrollIntoView({behavior:"instant",inline:"start",block:"nearest"})},50);return()=>clearTimeout(i)},[]);const r=[],n=new Date,o=wn(n);for(let a=-14;a<=21;a++){const i=new Date(n);i.setDate(n.getDate()+a);const l=wn(i),s=i.toLocaleDateString("en-US",{weekday:"short"}),c=i.getDate(),d=i.toLocaleDateString("en-US",{month:"short"}),h=(J.value[l]||[]).length,u=l===o,p=a<0;r.push({value:l,dayName:s,dayNum:c,monthName:d,isToday:u,isPast:p,checkinCount:h})}return e("div",{class:"date-selector",children:e("div",{class:"date-scroll",ref:t,children:r.map(a=>e("button",{class:`date-btn ${E.value===a.value?"selected":""} ${a.isPast?"past":""}`,onClick:()=>il(a.value),"data-date":a.value,"data-today":a.isToday?"true":void 0,children:[e("span",{class:"day-name",children:a.dayName}),e("span",{class:"day-num",children:a.dayNum}),e("span",{class:"month-name",children:a.monthName}),a.isToday&&e("span",{class:"today-badge",children:"Today"}),a.checkinCount>0&&e("span",{class:"checkin-badge",children:a.checkinCount})]},a.value))})})}function sl(){const t=k.value,r=E.value;return!t||!r?null:(J.value[r]||[]).find(a=>a.name===t)||null}function cl(t){return t==="singles"?"Singles only":t==="doubles"?"Doubles only":"Either"}function dl(t){if(!t||!t.start||!t.end)return null;const r=n=>{const[o,a]=n.split(":"),i=parseInt(o),l=i>=12?"pm":"am",s=i>12?i-12:i===0?12:i;return a==="00"?`${s}${l}`:`${s}:${a}${l}`};return`${r(t.start)} - ${r(t.end)}`}function pl(){k.value;const t=sl(),r=!!t,n=()=>{Or()},o=()=>{Or(k.value,!0)},a=()=>{Xi()};return e(A,{children:[e("div",{class:"checkin-cta-section",children:[r?e("div",{class:"checkin-status-card",onClick:o,children:e("div",{class:"status-row",children:[e("span",{class:"status-icon",children:"✓"}),e("span",{class:"status-text",children:"You're in!"}),e("div",{class:"status-details",children:[e("span",{class:"detail-item",children:cl(t.playStyle)}),t.allowRotation!==!1&&e("span",{class:"detail-item rotation",children:"Open to 3s"}),t.timeRange&&e("span",{class:"detail-item time",children:dl(t.timeRange)})]}),e("button",{class:"edit-icon-btn",onClick:i=>{i.stopPropagation(),o()},title:"Edit",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})})]})}):e("button",{class:"checkin-cta-btn",onClick:n,children:"Check In to Play"}),e("button",{class:"checkin-other-link",onClick:a,children:"Check in someone else"})]}),e("style",{children:`
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
      `})]})}const kt=v({}),gr=v(null),on=v(!1);function da(t){return{0:"☀️ Clear sky",1:"🌤️ Mainly clear",2:"⛅ Partly cloudy",3:"☁️ Overcast",45:"🌫️ Foggy",48:"🌫️ Foggy",51:"🌦️ Light drizzle",53:"🌦️ Drizzle",55:"🌧️ Heavy drizzle",61:"🌧️ Light rain",63:"🌧️ Rain",65:"🌧️ Heavy rain",71:"🌨️ Light snow",73:"🌨️ Snow",75:"🌨️ Heavy snow",77:"🌨️ Snow grains",80:"🌦️ Rain showers",81:"🌧️ Rain showers",82:"⛈️ Heavy rain showers",85:"🌨️ Snow showers",86:"🌨️ Heavy snow showers",95:"⛈️ Thunderstorm",96:"⛈️ Thunderstorm with hail",99:"⛈️ Severe thunderstorm"}[t]||"🌡️ Weather"}async function ul(t,r,n){const o=`${t},${r},${n}`;if(kt.value[o])return kt.value[o];try{const a=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${r}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&temperature_unit=fahrenheit&timezone=America/Los_Angeles&forecast_days=14`,i=await fetch(a);if(!i.ok)throw new Error("Weather API error");const l=await i.json();if(!l.daily||!l.daily.time||!Array.isArray(l.daily.time))throw new Error("Invalid weather data format");const s=l.daily.time.indexOf(n);if(s===-1)throw new Error("Weather data not available for this date");const c={tempMax:Math.round(l.daily.temperature_2m_max[s]),tempMin:Math.round(l.daily.temperature_2m_min[s]),precipProb:l.daily.precipitation_probability_max[s]||0,weatherCode:l.daily.weathercode[s]};return kt.value={...kt.value,[o]:c},c}catch(a){console.error("Weather fetch error:",a)}return null}function hl(){if(P(()=>{const n=ie(()=>{const o=E.value,a=I.value.location;if(!o)return;const i=new Date;i.setHours(0,0,0,0);const l=new Date(o+"T00:00:00"),s=Math.floor((l.getTime()-i.getTime())/(1e3*60*60*24));if(s<0||s>=14){gr.value=null;return}const c=a?.lat??37.2358,d=a?.lon??-121.9623;on.value=!0,ul(c,d,o).then(g=>{gr.value=g,on.value=!1})});return()=>n()},[]),on.value)return e("div",{id:"weatherWidget",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 14px",background:"linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)",borderRadius:"10px",marginBottom:"8px",fontSize:"13px",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.05))",color:"#666"},children:"Loading weather..."});if(!gr.value)return null;const t=gr.value,r=I.value.location?.name||"Los Gatos, CA";return e("div",{id:"weatherWidget",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)",borderRadius:"10px",marginBottom:"8px",fontSize:"13px",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.05))"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e("span",{style:{fontWeight:600,color:"#1976d2"},children:r}),e("span",{style:{color:"#666"},children:"•"}),e("span",{style:{color:"#666"},children:da(t.weatherCode)})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontWeight:600,color:"#333"},children:[t.tempMin,"°-",t.tempMax,"°F"]}),t.precipProb>0&&e("span",{style:{color:"#1976d2"},children:["💧",t.precipProb,"%"]})]})]})}function gl(){switch(I.value?.theme){case"roland-garros":return"#D2691E";case"australian-open":return"#1565C0";case"us-open":return"#0D47A1";case"wimbledon":default:return"#2E7D32"}}function vl(){switch(I.value?.theme){case"roland-garros":return"Roland-Garros";case"australian-open":return"Australian Open";case"us-open":return"US Open";case"wimbledon":return"Wimbledon";default:return"Classic"}}function fo({message:t="No check-ins yet",subtext:r="Be the first to check in!"}){const n=gl(),o="rgba(255, 255, 255, 0.9)";return e("div",{style:{textAlign:"center",padding:"var(--spacing-4xl, 24px) var(--spacing-2xl, 16px)",color:"var(--color-text-secondary, #666)"},children:[e("div",{style:{width:"120px",height:"80px",margin:"0 auto var(--spacing-2xl, 16px)",position:"relative",background:n,borderRadius:"var(--radius-lg, 8px)",overflow:"hidden",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))"},children:[e("div",{style:{position:"absolute",left:"50%",top:"20%",bottom:"20%",width:"2px",background:o,transform:"translateX(-50%)"}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",top:"50%",height:"3px",background:o,transform:"translateY(-50%)",boxShadow:"0 1px 2px rgba(0,0,0,0.2)"}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",top:"20%",height:"2px",background:o}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",bottom:"20%",height:"2px",background:o}}),e("div",{style:{position:"absolute",left:"10%",top:"0",bottom:"0",width:"2px",background:o}}),e("div",{style:{position:"absolute",right:"10%",top:"0",bottom:"0",width:"2px",background:o}}),e("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:"14px",height:"14px",borderRadius:"50%",background:"linear-gradient(135deg, #c8e600 0%, #9acd32 100%)",boxShadow:"0 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.1)",animation:"ballPulse 2s ease-in-out infinite"},children:e("div",{style:{position:"absolute",top:"3px",left:"2px",right:"2px",height:"8px",border:"1px solid rgba(255,255,255,0.5)",borderRadius:"50%",borderBottom:"none"}})})]}),e("p",{style:{fontSize:"var(--font-size-lg, 16px)",fontWeight:"600",color:"var(--color-text-primary, #333)",margin:"0 0 var(--spacing-sm, 6px) 0"},children:t}),e("p",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #888)",margin:0},children:r})]})}function fl({text:t="Loading...",size:r="medium"}){const n={small:{ball:20,container:40},medium:{ball:32,container:60},large:{ball:48,container:90}},{ball:o,container:a}=n[r];return e("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"var(--spacing-4xl, 24px)"},children:[e("div",{style:{height:`${a}px`,display:"flex",alignItems:"flex-end",marginBottom:"var(--spacing-lg, 12px)"},children:e("div",{style:{width:`${o}px`,height:`${o}px`,borderRadius:"50%",background:"linear-gradient(135deg, #c8e600 0%, #9acd32 100%)",boxShadow:"0 4px 8px rgba(0,0,0,0.3), inset -3px -3px 6px rgba(0,0,0,0.1)",animation:"tennisBounce 0.6s ease-in-out infinite",position:"relative"},children:e("div",{style:{position:"absolute",top:`${o*.15}px`,left:`${o*.1}px`,right:`${o*.1}px`,height:`${o*.5}px`,border:`${Math.max(1,o*.06)}px solid rgba(255,255,255,0.6)`,borderRadius:"50%",borderBottom:"none"}})})}),e("div",{style:{width:`${o*.8}px`,height:`${o*.15}px`,background:"rgba(0,0,0,0.2)",borderRadius:"50%",marginTop:`-${o*.1}px`,animation:"ballShadow 0.6s ease-in-out infinite"}}),t&&e("p",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #888)",marginTop:"var(--spacing-lg, 12px)"},children:t})]})}function ml({text:t="Loading..."}){const r=vl();return e("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"var(--color-bg-page, #f5f5f5)"},children:[e(fl,{text:t,size:"large"}),r!=="Classic"&&e("p",{style:{fontSize:"var(--font-size-xs, 11px)",color:"var(--color-text-muted, #999)",marginTop:"var(--spacing-md, 8px)"},children:[r," theme"]})]})}const pe=v(localStorage.getItem("games_compact_view")!=="false"),pa=v(!1),Qt=v(null),Re=v("both"),Ur=v(""),Hr=v(""),En=v(!0),ua=v(!1),An=v(null),$e=v(""),we=v(!1),Dr=v("confirm"),re=v(""),ha=v(""),Xt=v(null),je=v(!1),gt=v(!1),Z=v(null),ee=v(null);typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;!r.closest(".share-dropdown")&&!r.closest("[data-share-button]")&&(Xt.value&&(Xt.value=null),je.value&&(je.value=!1))});function Er(){ua.value=!1,An.value=null,$e.value="",we.value=!1,Dr.value="confirm",re.value="",ha.value=""}async function xl(){const t=An.value;if(t===null)return;const r=$e.value,n=we.value,o=re.value;An.value=null,await Zo(t,k.value),Er(),ve.value={action:"removal",name:r,date:o,isOwner:n},ge.value=!0}function ga(){pa.value=!1,Qt.value=null}async function bl(){if(Qt.value===null)return;const t={playStyle:Re.value,allowRotation:En.value};(Ur.value||Hr.value)&&(t.timeRange={start:Ur.value,end:Hr.value}),await Xo(Qt.value,t,k.value),ga()}function yl(t){const r=C.value,n=t.name||"",o=k.value&&_(k.value)===_(n),a=t.addedBy&&k.value&&_(k.value)===_(t.addedBy),i=r&&sessionStorage.getItem(`adminAuth_${r}`)==="true";return!!(o||a||i)}function Ve({matchKey:t}){const r=W.value[t]||"",[n,o]=Me(r);return P(()=>{o(W.value[t]||"")},[W.value[t]]),e("div",{style:"padding: 8px 12px; background: var(--color-bg-muted, #f9f9f9); border-radius: var(--radius-lg, 8px); margin-top: 8px;",children:[e("div",{style:"font-size: 11px; color: var(--color-gray-base, #666); margin-bottom: 4px; font-weight: 500;",children:"Booking Details"}),e("input",{type:"text",placeholder:"e.g. Courtside Court 1, 12PM",value:n,onInput:i=>{o(i.target.value)},onBlur:()=>{const i=n.trim(),l=W.value[t]||"";i!==l&&Ja(t,i)},style:{width:"100%",padding:"8px 12px",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"6px",fontSize:"14px",background:"white"}})]})}function Ge({players:t,checkins:r}){const n=k.value?_(k.value):"";return e("div",{style:"padding: 4px 0;",children:t.map(o=>{const a=n&&_(o.name)===n,i=r.findIndex(s=>_(s.name)===_(o.name)&&s.timestamp===o.timestamp),l=o.timeRange?ne(o.timeRange.start,o.timeRange.end):"";return e("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 12px",borderBottom:"1px solid var(--color-border-light, #f0f0f0)",fontSize:"14px",background:a?"var(--color-primary-light, #E8F5E9)":"transparent"},children:[e("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e("span",{style:{color:"var(--color-text-muted, #999)",fontSize:"13px",minWidth:"20px"},children:i>=0?`${i+1}.`:""}),e("span",{style:a?{fontWeight:600,color:"var(--color-primary, #2C6E49)"}:{},children:o.name}),a&&e("span",{style:{fontSize:"10px",background:"var(--color-primary, #2C6E49)",color:"white",padding:"1px 4px",borderRadius:"4px"},children:"YOU"}),l&&e("span",{style:{fontSize:"12px",color:"var(--color-text-muted, #999)",marginLeft:"4px"},children:l})]}),e("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:o.playStyle==="singles"?"var(--color-blue-light, #E3F2FD)":o.playStyle==="doubles"?"var(--color-orange-light, #FFF3E0)":"var(--color-primary-light, #E8F5E9)",color:o.playStyle==="singles"?"var(--color-blue-base, #1976D2)":o.playStyle==="doubles"?"var(--color-orange-base, #F57C00)":"var(--color-primary, #2C6E49)",fontWeight:500},children:Jr(o.playStyle||"both")})]},o.name)})})}function wl(){const t=!pe.value;pe.value=t,localStorage.setItem("games_compact_view",String(t))}function Ce({checkin:t,globalIndex:r}){const n=k.value&&_(t.name)===_(k.value),o=yl(t);let a="";t.isGuest?a=`guest of ${t.addedBy}`:t.addedBy&&_(t.addedBy)!==_(t.name)&&(a=`added by ${t.addedBy}`);const i=t.timeRange?ne(t.timeRange.start,t.timeRange.end):"",l=()=>{Or(t.name,!0)};return e("div",{class:n?"checkin-item current-user":"checkin-item",children:[e("span",{children:[e("span",{class:"checkin-name",children:[r+1,". ",t.name,n&&e("span",{class:"current-user-badge",children:"YOU"}),a&&e("span",{class:"guest-indicator",children:[" ",a]}),i&&e("span",{class:"time-badge",children:i}),t.allowRotation===!1&&e("span",{class:"time-badge",style:"background: var(--color-orange-light, #fff3e0); color: var(--color-orange-dark, #e65100);",children:"No 3s"})]}),e("span",{class:`preference-badge ${t.playStyle||"both"}`,children:Jr(t.playStyle||"both")}),e("span",{class:"checkin-time",children:Hn(t.timestamp)})]}),o&&e("button",{class:"edit-btn",onClick:l,title:"Edit check-in",style:{background:"white",color:"var(--color-primary, #2C6E49)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"8px",padding:"0",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})})]})}function kl(t,r){const o=new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),a=t.players.map(s=>s.name).join(" & "),i=C.value,l=`${window.location.origin}${window.location.pathname}#${i}`;if(t.type==="doubles-forming"){const s=t.needed||4-t.players.length;let d=`🎾 ${s===1?"1 more player needed":`${s} more players needed`} for doubles!
`;return d+=`📅 ${o}
`,d+=`👥 ${a} ${t.players.length===1?"is":"are"} in

`,d+=`Can you make it? ${l}`,d}else if(t.type==="singles-forming"){const s=t.players[0];let c=`🎾 1 more player needed for singles!
`;return c+=`📅 ${o}
`,c+=`👤 ${s.name} is in`,s.timeRange&&(c+=` (${ne(s.timeRange.start,s.timeRange.end)})`),c+=`

Can you make it? ${l}`,c}return""}function an(t,r,n){const o=kl(t,r);if(n==="whatsapp"){const a=encodeURIComponent(o);window.open(`https://wa.me/?text=${a}`,"_blank")}else if(n==="sms"){const a=encodeURIComponent(o);window.open(`sms:?body=${a}`,"_blank")}else n==="copy"&&navigator.clipboard.writeText(o).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});Xt.value=null}function mo({match:t,matchKey:r}){const n=E.value||"",o=Xt.value===r;return e("div",{style:"position: relative; display: inline-block;",children:[e("button",{"data-share-button":!0,onClick:a=>{a.stopPropagation(),Xt.value=o?null:r},style:{background:o?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"12px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"white",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(255, 152, 0, 0.3)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",style:{transform:o?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),o&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:()=>an(t,n,"whatsapp"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>an(t,n,"sms"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>an(t,n,"copy"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]})}function _l(t,r,n){let i=`${new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
`,l=0,s=0;t.forEach(f=>{if(f.type==="doubles"){const m=f.players.map(y=>y.name);i+=`Doubles: ${m.join(", ")}
`;const b=f.players.filter(y=>y.timeRange).map(y=>ne(y.timeRange.start,y.timeRange.end));b.length>0&&(i+=`${b[0]}
`);const x=`doubles-${f.number}`;W.value[x]&&(i+=`📝 ${W.value[x]}
`),i+=`
`}else if(f.type==="singles"){l++;const m=f.players.map(z=>z.name);i+=`Singles: ${m.join(", ")}
`;const b=f.players.every(z=>(z.playStyle||"both")==="both"),x=f.players.some(z=>z.allowRotation===!0);b&&x&&(i+=`Open to more players
`);const y=f.players.filter(z=>z.timeRange).map(z=>ne(z.timeRange.start,z.timeRange.end));y.length>0&&(i+=`${y[0]}
`);const S=`singles-${l}`;W.value[S]&&(i+=`📝 ${W.value[S]}
`),i+=`
`}else if(f.type==="singles-or-practice"){s++,i+=`Rotation: ${f.players.map(x=>x.name).join(", ")}
`;const m=f.players.filter(x=>x.timeRange).map(x=>ne(x.timeRange.start,x.timeRange.end));m.length>0&&(i+=`${m[0]}
`);const b=`rotation-${s}`;W.value[b]&&(i+=`📝 ${W.value[b]}
`),i+=`
`}else if(f.type==="doubles-forming"){const m=f.players.map(S=>S.name),b=f.needed===1?"need 1 more":`need ${f.needed} more`;i+=`Doubles (forming): ${m.join(", ")}
`,i+=`${b}
`,f.canRotate?i+=`Can rotate if no 4th
`:f.canPlaySingles&&(f.eitherCount||0)>=2?i+=`Will play singles if no more join
`:(f.eitherCount||0)===1&&f.players.length===1&&(i+=`Can play singles if 1 more joins
`);const x=f.players.filter(S=>S.timeRange).map(S=>ne(S.timeRange.start,S.timeRange.end));x.length>0&&(i+=`${x[0]}
`);const y="doubles-forming-1";W.value[y]&&(i+=`📝 ${W.value[y]}
`),i+=`
`}else if(f.type==="singles-forming"){const m=f.players[0];i+=`Singles (forming): ${m.name}
`,i+=`need 1 more
`,m.timeRange&&(i+=`${ne(m.timeRange.start,m.timeRange.end)}
`),i+=`
`}});const c=t.filter(f=>f.type==="waiting");if(c.length>0){const f=c.flatMap(m=>m.players.map(b=>b.name));f.length>0&&(i+=`Standby: ${f.join(", ")}
`)}const d=I.value.location,g=d?.lat??37.2358,h=d?.lon??-121.9623,u=`${g},${h},${n}`,p=kt.value[u];if(p){const f=da(p.weatherCode);i+=`${f}, ${p.tempMax}°F`}return i.trim()}function ln(t,r,n,o){const a=_l(t,r,n);if(o==="whatsapp"){const i=encodeURIComponent(a);window.open(`https://wa.me/?text=${i}`,"_blank")}else if(o==="sms"){const i=encodeURIComponent(a);window.open(`sms:?body=${i}`,"_blank")}else o==="copy"&&navigator.clipboard.writeText(a).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});je.value=!1}function Cl(){const t=E.value;t&&confirm(`Are you sure you want to reset all check-ins for ${H(t)}?

This cannot be undone.`)&&Ka()}function ze(t,r){return t.findIndex(n=>_(n.name)===_(r.name)&&n.timestamp===r.timestamp)}function zl(t,r){const n={matches:{},unassigned:[]};let o=0,a=0;return t.forEach(i=>{const l=i.players.map(s=>s.name);if(i.type==="doubles"||i.type==="doubles-forming"){o++;const s=`doubles-${o}`;n.matches[s]={players:l,note:W.value[s]||""}}else if(i.type==="singles"||i.type==="singles-forming"||i.type==="singles-or-practice"){a++;const s=`singles-${a}`;n.matches[s]={players:l,note:W.value[s]||""}}else i.type==="waiting"&&n.unassigned.push(...l)}),n}function xo(t,r){if(!gt.value||!ee.value)return;const n=Z.value;if(!n)Z.value={name:t,matchKey:r};else if(n.name===t&&n.matchKey===r)Z.value=null;else{const o=ee.value,a={...o.matches},i=[...o.unassigned];if(n.matchKey==="unassigned"){const l=i.indexOf(n.name);l>-1&&i.splice(l,1)}else{const l=a[n.matchKey];l&&(l.players=l.players.filter(s=>s!==n.name))}if(r==="unassigned"){const l=i.indexOf(t);l>-1&&i.splice(l,1)}else{const l=a[r];l&&(l.players=l.players.filter(s=>s!==t))}r==="unassigned"?i.push(n.name):a[r].players.push(n.name),n.matchKey==="unassigned"?i.push(t):a[n.matchKey].players.push(t),ee.value={matches:a,unassigned:i},Z.value=null,w(`Swapped ${n.name} and ${t}`,"info")}}function Sl(t,r){try{N.value&&N.value.matches&&typeof N.value.matches=="object"?ee.value={matches:{...N.value.matches},unassigned:Array.isArray(N.value.unassigned)?[...N.value.unassigned]:[]}:ee.value=zl(t,r),Z.value=null,gt.value=!0}catch(n){console.error("Error starting arrange mode:",n),ee.value={matches:{},unassigned:r.map(o=>o.name)},Z.value=null,gt.value=!0}}function va(){gt.value=!1,Z.value=null,ee.value=null}async function $l(){ee.value&&(await Za(ee.value),gt.value=!1,Z.value=null,ee.value=null)}async function Il(){await ei(),va()}function Ml(){ti();const t=ws.value,r=E.value||"",n=Qt.value!==null?t[Qt.value]:null,o=C.value,a=o&&sessionStorage.getItem(`adminAuth_${o}`)==="true",i=gt.value,l=!!(N.value&&N.value.matches&&Object.keys(N.value.matches).length>0),s=e(A,{children:[e(De,{isOpen:pa.value,onClose:ga,title:`Edit ${n?.name||""}'s Preferences`,children:e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:[e("div",{children:[e("label",{style:"display: block; font-weight: 500; margin-bottom: 8px;",children:"Play Style"}),e("div",{style:"display: flex; gap: 8px;",children:["singles","doubles","both"].map(p=>e("button",{onClick:()=>{Re.value=p},style:{flex:1,padding:"10px",border:Re.value===p?"2px solid var(--color-primary, #2C6E49)":"2px solid var(--color-border, #e0e0e0)",borderRadius:"8px",background:Re.value===p?"var(--color-primary-light, #E8F5E9)":"#fff",color:Re.value===p?"var(--color-primary, #2E7D32)":"var(--color-gray-base, #666)",cursor:"pointer",fontWeight:Re.value===p?"600":"400"},children:p==="singles"?"Singles":p==="doubles"?"Doubles":"Either"},p))})]}),e("div",{children:[e("label",{style:"display: block; font-weight: 500; margin-bottom: 8px;",children:"Available Time (optional)"}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[e("input",{type:"time",value:Ur.value,onInput:p=>{Ur.value=p.target.value},style:"flex: 1; padding: 8px; border: 1px solid var(--color-gray-light, #ddd); border-radius: 6px;"}),e("span",{children:"to"}),e("input",{type:"time",value:Hr.value,onInput:p=>{Hr.value=p.target.value},style:"flex: 1; padding: 8px; border: 1px solid var(--color-gray-light, #ddd); border-radius: 6px;"})]})]}),Re.value==="singles"&&e("div",{children:[e("label",{style:"display: flex; align-items: center; gap: 8px; cursor: pointer;",children:[e("input",{type:"checkbox",checked:En.value,onChange:p=>{En.value=p.target.checked}}),e("span",{children:"Open to 3-player rotation"})]}),e("p",{style:"font-size: 12px; color: var(--color-gray-base, #666); margin: 4px 0 0 24px;",children:"If unchecked, you'll only be matched for 2-player singles"})]}),e("button",{onClick:bl,style:{padding:"12px",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer",marginTop:"8px"},children:"Save Changes"})]})}),e(De,{isOpen:ua.value,onClose:Er,title:Dr.value==="done"?"":we.value?"Remove Your Check-in?":`Remove ${$e.value}?`,showCloseButton:Dr.value!=="done",children:e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:Dr.value==="confirm"?e(A,{children:[we.value?e(A,{children:[e("p",{style:"color: var(--color-gray-base, #666); margin: 0; line-height: 1.5;",children:"Are you sure you want to remove yourself from this date?"}),e("div",{style:"background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;",children:[e("p",{style:"margin: 0 0 8px 0; font-weight: 500; color: #E65100;",children:"Things to consider:"}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-gray-base, #666); font-size: 14px;",children:[e("li",{children:"You'll lose your current spot in the check-in order"}),e("li",{children:["If you want to change your preferences, you can ",e("strong",{children:"edit"})," instead"]}),e("li",{children:"You can always check in again after removing"})]})]})]}):e(A,{children:[e("p",{style:"color: var(--color-gray-base, #666); margin: 0; line-height: 1.5;",children:["Are you sure you want to remove ",e("strong",{children:$e.value})," from this date?"]}),e("div",{style:"background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;",children:e("p",{style:"margin: 0; color: var(--color-gray-base, #666); font-size: 14px;",children:["They will lose their spot in the check-in order. Consider using ",e("strong",{children:"edit"})," to update their preferences instead."]})})]}),e("div",{style:"display: flex; gap: 12px; margin-top: 8px;",children:[e("button",{onClick:Er,style:{flex:1,padding:"12px",background:"var(--color-gray-lightest, #f5f5f5)",color:"var(--color-gray-base, #666)",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"500",cursor:"pointer"},children:"Cancel"}),e("button",{onClick:xl,style:{flex:1,padding:"12px",background:"#ef5350",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer"},children:"Yes, Remove"})]})]}):e(A,{children:[e("div",{style:"text-align: center; padding: 8px 0;",children:[e("div",{style:"font-size: 48px; margin-bottom: 8px;",children:"✓"}),e("p",{style:"color: var(--color-gray-base, #666); margin: 0;",children:we.value?`You've been removed from ${H(re.value)}`:`${$e.value} has been removed from ${H(re.value)}`})]}),e("div",{children:[e("p",{style:"margin: 0 0 8px 0; font-size: 13px; color: var(--color-gray-base, #666); text-align: center;",children:"Let others know:"}),e("div",{style:"display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;",children:[e("a",{href:`https://wa.me/?text=${encodeURIComponent(we.value?`I'm out on ${H(re.value)}.`:`Hi ${$e.value}, I removed you from ${H(re.value)}. Let me know if you have questions!`)}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"var(--color-whatsapp, #25D366)",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"WhatsApp"}),e("a",{href:`sms:?body=${encodeURIComponent(we.value?`I'm out on ${H(re.value)}.`:`Hi ${$e.value}, I removed you from ${H(re.value)}. Let me know if you have questions!`)}`,style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#007AFF",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"Text"}),e("a",{href:`mailto:?subject=${encodeURIComponent(we.value?`I'm Out on ${H(re.value)}`:`${ha.value} - Check-in Removed`)}&body=${encodeURIComponent(we.value?`I'm out on ${H(re.value)}.`:`Hi ${$e.value},

I removed you from ${H(re.value)}.

Let me know if you have questions!`)}`,style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#EA4335",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"Email"})]})]}),e("button",{onClick:Er,style:{width:"100%",padding:"12px",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer",marginTop:"8px"},children:"Done"})]})})})]});if(t.length===0)return e(A,{children:[e(fo,{message:"No check-ins yet",subtext:"Be the first to check in for this date!"}),s]});const{matches:c,warnings:d}=Qr(t),g=c.some(p=>p.type!=="waiting"||p.players.length>0);if(!g&&d.length===0)return e(A,{children:[e(fo,{message:"No check-ins yet",subtext:"Be the first to check in for this date!"}),s]});let h=0,u=0;return e(A,{children:[e("div",{class:"games-list",style:"margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("h2",{style:"margin: 0; font-size: var(--font-size-xl, 18px); font-weight: 600;",children:["Games ",e("span",{style:"font-size: var(--font-size-sm, 13px); font-weight: 500; color: var(--color-text-secondary, #666);",children:["(",t.length," checked in)"]})]}),l&&!i&&e("span",{style:{fontSize:"11px",background:"var(--color-purple-arrange, #9C27B0)",color:"white",padding:"2px 6px",borderRadius:"4px",fontWeight:"600"},children:"Arranged"})]}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[!i&&e("button",{onClick:wl,title:pe.value?"Show details":"Compact view",style:{background:"var(--color-bg-subtle, #f5f5f5)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"6px",padding:"6px 10px",fontSize:"12px",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"var(--color-text-secondary, #666)"},children:pe.value?e(A,{children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"})}),"Details"]}):e(A,{children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M3 4h18v2H3V4zm2 4h14v2H5V8zm-2 4h18v2H3v-2zm2 4h14v2H5v-2z"})}),"Compact"]})}),i?e(A,{children:[e("button",{onClick:$l,style:{background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"600",cursor:"pointer"},children:"Save"}),e("button",{onClick:va,style:{background:"var(--color-gray-lightest, #f5f5f5)",color:"var(--color-gray-base, #666)",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer"},children:"Cancel"}),l&&e("button",{onClick:Il,style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer"},children:"Reset"})]}):e(A,{children:[g&&e("div",{style:"position: relative;",children:[e("button",{"data-share-button":!0,onClick:()=>{je.value=!je.value},title:"Share Games",style:{background:je.value?"var(--color-primary-dark, #1a402b)":"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),je.value&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",zIndex:100,overflow:"hidden",minWidth:"160px"},children:[e("button",{onClick:()=>ln(c,t,r,"whatsapp"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-whatsapp, #25D366)",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>ln(c,t,r,"sms"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-sms, #2196F3)",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>ln(c,t,r,"copy"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-dark, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-gray-base, #666)",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),a&&t.length>=2&&e("button",{onClick:()=>Sl(c,t),title:"Arrange Players",style:{background:"var(--color-purple-arrange, #9C27B0)",color:"white",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})}),"Arrange"]}),a&&t.length>0&&!g&&e("button",{class:"reset-day-btn",onClick:Cl,title:"Reset This Day",style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"50%",padding:"0",width:"36px",height:"36px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})]})]}),i&&e("div",{style:{background:"var(--color-purple-arrange-light, #F3E5F5)",borderRadius:"8px",padding:"12px",marginBottom:"16px",color:"var(--color-purple-arrange-dark, #7B1FA2)",fontSize:"14px"},children:[e("strong",{children:"Arrange Mode:"})," Tap a player to select, then tap another player to swap their positions.",Z.value&&e("span",{style:{display:"block",marginTop:"4px"},children:["Selected: ",e("strong",{children:Z.value.name})," - tap another player to swap"]})]}),i&&ee.value&&e(A,{children:[Object.entries(ee.value.matches||{}).map(([p,f])=>{const m=p.startsWith("doubles"),b=p.split("-")[1],x=f?.players||[];return x.length===0?null:e("div",{class:"match-group",style:{marginBottom:"16px",border:"2px dashed var(--color-purple-arrange, #9C27B0)",borderRadius:"8px",padding:"8px"},children:[e("h3",{style:"margin: 0 0 8px 0;",children:[m?`Doubles ${b}`:`Singles ${b}`,e("span",{style:{fontSize:"12px",color:"var(--color-gray-base, #666)",marginLeft:"8px"},children:["(",x.length,"/",m?4:2,")"]})]}),e("div",{style:"display: flex; flex-direction: column; gap: 4px;",children:x.map(y=>{const S=Z.value?.name===y&&Z.value?.matchKey===p;return e("div",{onClick:()=>xo(y,p),style:{padding:"10px 12px",background:S?"var(--color-purple-arrange, #9C27B0)":"var(--color-gray-lightest, #f5f5f5)",color:S?"white":"var(--color-gray-dark, #333)",borderRadius:"6px",cursor:"pointer",fontWeight:"500",transition:"all 0.15s",border:S?"2px solid var(--color-purple-arrange-dark, #7B1FA2)":"2px solid transparent"},children:y},y)})})]},p)}),ee.value.unassigned.length>0&&e("div",{class:"match-group",style:{marginBottom:"16px",border:"2px dashed #9e9e9e",borderRadius:"8px",padding:"8px",background:"#fafafa"},children:[e("h3",{style:"margin: 0 0 8px 0; color: var(--color-gray-base, #666);",children:"Unassigned"}),e("div",{style:"display: flex; flex-direction: column; gap: 4px;",children:ee.value.unassigned.map(p=>{const f=Z.value?.name===p&&Z.value?.matchKey==="unassigned";return e("div",{onClick:()=>xo(p,"unassigned"),style:{padding:"10px 12px",background:f?"var(--color-purple-arrange, #9C27B0)":"#fff",color:f?"white":"var(--color-gray-dark, #333)",borderRadius:"6px",cursor:"pointer",fontWeight:"500",transition:"all 0.15s",border:f?"2px solid var(--color-purple-arrange-dark, #7B1FA2)":"2px solid var(--color-border, #e0e0e0)"},children:p},p)})})]})]}),!i&&!l&&d.length>0&&e("div",{class:"warning-box",children:d.map((p,f)=>e("div",{children:p},f))}),!i&&l&&N.value&&N.value.matches&&e(A,{children:[Object.entries(N.value.matches).map(([p,f])=>{const m=p.startsWith("doubles"),b=p.split("-")[1],x=m?4:2,y=f?.players||[],S=y.length>=x,z=y.map($=>t.find(Q=>Q.name===$)||{name:$,timestamp:0});return e("div",{class:`match-group ${S?"":"forming-group"}`,style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:[m?"Doubles":"Singles"," ",b]}),S?e("span",{style:"display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]}):e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",x-y.length]})]}),e("div",{id:"checkinList",children:z.map($=>{const T=ze(t,$);return e(Ce,{checkin:$,globalIndex:T>=0?T:-1},T>=0?T:$.name)})}),e(Ve,{matchKey:p})]},p)}),N.value.unassigned&&N.value.unassigned.length>0&&e("div",{class:"match-group waiting-group",style:"margin-bottom: 16px;",children:[e("h3",{style:"margin: 0 0 8px 0;",children:"Unassigned"}),e("div",{id:"checkinList",children:N.value.unassigned.map(p=>{const f=t.find(x=>x.name===p),m=f||{name:p,timestamp:0},b=f?ze(t,m):-1;return e(Ce,{checkin:m,globalIndex:b>=0?b:-1},b>=0?b:p)})})]})]}),!i&&!l&&c.map((p,f)=>{if(p.type==="doubles"){const m=`doubles-${p.number}`,b=pe.value;return e("div",{class:"match-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:["Doubles ",p.number]}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),b?e(Ge,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(x=>{const y=ze(t,x);return e(Ce,{checkin:x,globalIndex:y},y)})}),e(Ve,{matchKey:m})]},f)}if(p.type==="singles"){h++;const m=`singles-${h}`,b=pe.value,x=p.players.every(z=>(z.playStyle||"both")==="both"),y=p.players.some(z=>z.allowRotation===!0),S=x&&y;return e("div",{class:"match-group singles-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:["Singles",h>1?` ${h}`:""]}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),b?e(Ge,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(z=>{const $=ze(t,z);return e(Ce,{checkin:z,globalIndex:$},$)})}),!b&&S&&e("p",{style:"color: var(--color-gray-base, #666); font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;",children:"Open to more players"}),e(Ve,{matchKey:m})]},f)}if(p.type==="singles-or-practice"){u++;const m=`rotation-${u}`,b=pe.value;return e("div",{class:"match-group singles-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Rotation (3 players)"}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),b?e(Ge,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(x=>{const y=ze(t,x);return e(Ce,{checkin:x,globalIndex:y},y)})}),e(Ve,{matchKey:m})]},f)}if(p.type==="doubles-forming"){const m="doubles-forming-1",b=p.needed||4-p.players.length,x=pe.value;let y="";return p.canRotate?y="Can rotate if no 4th":p.canPlaySingles&&(p.eitherCount||0)>=2?y="Will play singles if no more join":(p.eitherCount||0)===1&&p.players.length===1&&(y="Can play singles if 1 more joins"),e("div",{class:"match-group forming-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Doubles"}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",b]}),e(mo,{match:p,matchKey:m,needed:b})]})]}),x?e(Ge,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(S=>{const z=ze(t,S);return e(Ce,{checkin:S,globalIndex:z},z)})}),!x&&y&&e("p",{style:"color: var(--color-gray-base, #666); font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;",children:y}),e(Ve,{matchKey:m})]},f)}if(p.type==="singles-forming"){const m="singles-forming-1",b=pe.value;return e("div",{class:"match-group forming-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Singles"}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need 1"]}),e(mo,{match:p,matchKey:m,needed:1})]})]}),b?e(Ge,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(x=>{const y=ze(t,x);return e(Ce,{checkin:x,globalIndex:y},y)})}),e(Ve,{matchKey:m})]},f)}if(p.type==="waiting"){const m=pe.value;return e("div",{class:"match-group waiting-group",style:"margin-bottom: 16px;",children:[e("h3",{style:"margin: 0 0 8px 0;",children:"Waiting for Match"}),m?e(Ge,{players:p.players,checkins:t}):e("div",{id:"checkinList",children:p.players.map(b=>{const x=ze(t,b);return e(Ce,{checkin:b,globalIndex:x},x)})})]},f)}return null})]}),s]})}function Dl(){return e("div",{children:[e(ll,{}),e(hl,{}),e(pl,{}),e(Ml,{})]})}function Ye(t,r){const n=t.replace(/-/g,"");if(r){const o=r.replace(":","")+"00";return`${n}T${o}`}return n}function sn(t){return t.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n")}function El(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}@tenniscoordinator`}function Al(t){const{date:r,title:n,description:o,location:a,startTime:i,endTime:l}=t,s=El(),d=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";let g=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Tennis Coordinator//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",`UID:${s}`,`DTSTAMP:${d}`];if(i&&l)g.push(`DTSTART:${Ye(r,i)}`),g.push(`DTEND:${Ye(r,l)}`);else if(i){g.push(`DTSTART:${Ye(r,i)}`);const[h,u]=i.split(":").map(Number),f=`${((h+2)%24).toString().padStart(2,"0")}:${u.toString().padStart(2,"0")}`;g.push(`DTEND:${Ye(r,f)}`)}else{g.push(`DTSTART;VALUE=DATE:${Ye(r)}`);const h=new Date(r+"T00:00:00");h.setDate(h.getDate()+1);const u=h.toISOString().split("T")[0];g.push(`DTEND;VALUE=DATE:${Ye(u)}`)}return g.push(`SUMMARY:${sn(n)}`),g.push(`DESCRIPTION:${sn(o)}`),a&&g.push(`LOCATION:${sn(a)}`),g.push("END:VEVENT"),g.push("END:VCALENDAR"),g.join(`\r
`)}function Rl(){return/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)}function Tl(t){const{date:r,title:n,description:o,location:a,startTime:i,endTime:l}=t;let s;if(i&&l){const g=`${r.replace(/-/g,"")}T${i.replace(":","")}00`,h=`${r.replace(/-/g,"")}T${l.replace(":","")}00`;s=`${g}/${h}`}else if(i){const[g,h]=i.split(":").map(Number),p=`${((g+2)%24).toString().padStart(2,"0")}${h.toString().padStart(2,"0")}00`,f=`${r.replace(/-/g,"")}T${i.replace(":","")}00`,m=`${r.replace(/-/g,"")}T${p}`;s=`${f}/${m}`}else{const g=r.replace(/-/g,""),h=new Date(r+"T00:00:00");h.setDate(h.getDate()+1);const u=h.toISOString().split("T")[0].replace(/-/g,"");s=`${g}/${u}`}const c="https://calendar.google.com/calendar/render",d=new URLSearchParams({action:"TEMPLATE",text:n,dates:s,details:o});return a&&d.set("location",a),`${c}?${d.toString()}`}function Pl(t,r){if(Rl()){const n=Tl(t);window.open(n,"_blank")}else{const n=Al(t),o=new Blob([n],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(o),i=document.createElement("a");i.href=a,i.download=`tennis-${t.date}.ics`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)}}function Nl(t){const{date:r,matchType:n,players:o,groupName:a,location:i,notes:l}=t,c=`${n.includes("doubles")?"Doubles":n.includes("singles")?"Singles":"Tennis"} - ${a}`;let d=`Players: ${o.map(p=>p.name).join(", ")}`;l&&(d+=`

Notes: ${l}`);let g,h;const u=o.filter(p=>p.timeRange);if(u.length>0){const p=u.map(m=>m.timeRange.start).sort(),f=u.map(m=>m.timeRange.end).sort();g=p[p.length-1],h=f[0],g>=h&&(g=u[0].timeRange.start,h=u[0].timeRange.end)}return{date:r,title:c,description:d,location:i,startTime:g,endTime:h}}const Zt=v(null),ye=v(null),Le=v(!1),er=v(!1),Ue=v(new Set),Rt=v(!1),ce=v("upcoming");function Ll(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;Zt.value&&!r.closest(".share-dropdown")&&!r.closest("[data-share-button]")&&(Zt.value=null),Le.value&&!r.closest(".member-picker-dropdown")&&!r.closest("[data-member-picker-button]")&&(Le.value=!1)});const Fl=ut(()=>{const t=ye.value||k.value;if(!t)return{upcoming:[],past:[]};const r=_(t),n=[],o=[],a=new Date;a.setHours(0,0,0,0);const i=Object.keys(J.value).sort();for(const l of i){const c=new Date(l+"T00:00:00")<a,d=J.value[l]||[];if(d.length===0)continue;const g={},h=K.value||{};for(const[p,f]of Object.entries(h))f&&typeof f=="object"&&(g[_(p)]={include:f.include||[],exclude:f.exclude||[]});const u=Qr(d,g);for(const p of u.matches)if(p.players.map(m=>_(m.name)).includes(r)){const m=p.type==="doubles-forming"||p.type==="singles-forming",b={date:l,type:p.type,matchNumber:p.number||1,players:p.players.map(x=>({name:x.name,timeRange:x.timeRange})),isForming:m,needed:p.needed};c?o.push(b):n.push(b)}}return o.sort((l,s)=>s.date.localeCompare(l.date)),{upcoming:n,past:o}});function Rn(t){switch(t){case"doubles":case"doubles-forming":return"Doubles";case"singles":case"singles-forming":return"Singles";case"rotation":case"singles-or-practice":return"Rotation";default:return t}}function Bl(t){const n=new Date(t.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),o=t.players.map(l=>l.name).join(" & "),a=C.value,i=`${window.location.origin}${window.location.pathname}#${a}`;if(t.type==="doubles-forming"){const l=t.needed||4-t.players.length;let c=`🎾 ${l===1?"1 more player needed":`${l} more players needed`} for doubles!
`;return c+=`📅 ${n}
`,c+=`👥 ${o} ${t.players.length===1?"is":"are"} in

`,c+=`Can you make it? ${i}`,c}else if(t.type==="singles-forming"){const l=t.players[0];let s=`🎾 1 more player needed for singles!
`;return s+=`📅 ${n}
`,s+=`👤 ${l.name} is in`,l.timeRange&&(s+=` (${ne(l.timeRange.start,l.timeRange.end)})`),s+=`

Can you make it? ${i}`,s}return""}function cn(t,r){const n=Bl(t);if(r==="whatsapp"){const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")}else if(r==="sms"){const o=encodeURIComponent(n);window.open(`sms:?body=${o}`,"_blank")}else r==="copy"&&navigator.clipboard.writeText(n).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});Zt.value=null}function bo(t){er.value||(E.value=t,oe.value="checkin")}function jl(t){const r=`${t.type.replace("-forming","")}-${t.matchNumber}`,n=W.value[r]||"",o=Nl({date:t.date,matchType:t.type,players:t.players,groupName:G.value||"Tennis",location:I.value.location?.name,notes:n});Pl(o),w("Calendar event downloaded","success")}function Ol(t){const r=new Set(Ue.value);r.has(t)?r.delete(t):r.add(t),Ue.value=r}function dn(){er.value=!1,Ue.value=new Set,Rt.value=!1}function Ul(t,r){const n=C.value,o=`${window.location.origin}${window.location.pathname}#${n}`,a=t.filter((c,d)=>{const g=`mygames-${c.date}-${c.type}-${d}`;return r.has(g)});if(a.length===0)return"";const i=a.filter(c=>!c.isForming),l=a.filter(c=>c.isForming);let s=`🎾 Tennis Update

`;if(i.length>0){s+=`✅ Ready to Play:
`;for(const c of i){const g=new Date(c.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),h=Rn(c.type),u=c.players.map(p=>p.name).join(", ");s+=`• ${g} - ${h}
  ${u}
`}s+=`
`}if(l.length>0){s+=`🟡 Need Players:
`;for(const c of l){const g=new Date(c.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),h=Rn(c.type),u=c.needed||1,p=c.players.map(f=>f.name).join(", ");s+=`• ${g} - ${h} needs ${u}
  ${p}
`}s+=`
`}return s+=`Check in: ${o}`,s}function vr(t,r){const n=Ul(r,Ue.value);if(!n){w("No games selected","error");return}if(t==="native"&&navigator.share)navigator.share({title:"Tennis Update",text:n}).catch(()=>{navigator.clipboard.writeText(n).then(()=>{w("Copied to clipboard","success")})});else if(t==="whatsapp"){const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")}else if(t==="sms"){const o=encodeURIComponent(n);window.open(`sms:?body=${o}`,"_blank")}else navigator.clipboard.writeText(n).then(()=>{w("Copied to clipboard","success")}).catch(()=>{w("Failed to copy","error")});Rt.value=!1,er.value=!1,Ue.value=new Set}function Hl(){Wa();const t=Fl.value,r=ce.value==="upcoming"?t.upcoming:t.past,n=Ll(),o=ye.value||k.value,a=ye.value&&ye.value!==k.value,i=Ue.value.size,l=er.value,s=ce.value==="past";return e("div",{style:"padding: 16px 0;",children:[l&&e("div",{style:{position:"fixed",bottom:"70px",left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:"400px",background:"white",borderRadius:"16px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",zIndex:100,boxShadow:"0 4px 16px rgba(0,0,0,0.15)"},children:[e("button",{onClick:dn,style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",cursor:"pointer",color:"var(--color-gray-base, #666)"},children:"Cancel"}),e("span",{style:{fontSize:"14px",color:"var(--color-gray-base, #666)"},children:[i," selected"]}),e("div",{style:{position:"relative"},children:[e("button",{onClick:()=>{Rt.value=!Rt.value},disabled:i===0,style:{background:i>0?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",border:"none",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",fontWeight:"600",cursor:i>0?"pointer":"default",color:"white",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),Rt.value&&i>0&&e("div",{style:{position:"absolute",bottom:"100%",right:"0",marginBottom:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",overflow:"hidden",minWidth:"160px"},children:[typeof navigator.share=="function"&&e("button",{onClick:()=>vr("native",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#333"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})}),"Share..."]}),e("button",{onClick:()=>vr("whatsapp",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)",borderTop:typeof navigator.share=="function"?"1px solid #f0f0f0":"none"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>vr("sms",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>vr("copy",r),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy text"]})]})]})]}),e("div",{style:{display:"flex",background:"var(--color-gray-lightest, #f0f0f0)",borderRadius:"10px",padding:"4px",marginBottom:"16px"},children:[e("button",{onClick:()=>{ce.value="upcoming",dn()},style:{flex:1,padding:"10px 16px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",background:ce.value==="upcoming"?"white":"transparent",color:ce.value==="upcoming"?"var(--color-primary, #2C6E49)":"var(--color-gray-base, #666)",boxShadow:ce.value==="upcoming"?"0 1px 3px rgba(0,0,0,0.1)":"none"},children:["Upcoming (",t.upcoming.length,")"]}),e("button",{onClick:()=>{ce.value="past",dn()},style:{flex:1,padding:"10px 16px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",background:ce.value==="past"?"white":"transparent",color:ce.value==="past"?"var(--color-primary, #2C6E49)":"var(--color-gray-base, #666)",boxShadow:ce.value==="past"?"0 1px 3px rgba(0,0,0,0.1)":"none"},children:["Past (",t.past.length,")"]})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;",children:[e("h2",{style:"margin: 0; font-size: 20px;",children:a?`${ye.value}'s ${s?"Past":"Upcoming"} Games`:`My ${s?"Past":"Upcoming"} Games`}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[a&&e("button",{onClick:()=>{ye.value=null},style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"16px",padding:"4px 12px",fontSize:"12px",cursor:"pointer",color:"var(--color-gray-base, #666)"},children:"Back to mine"}),!a&&r.length>0&&!l&&e("button",{onClick:()=>{er.value=!0},style:{background:"var(--color-gray-lightest, #f5f5f5)",border:"1px solid var(--color-gray-light, #ddd)",borderRadius:"16px",padding:"6px 12px",fontSize:"13px",cursor:"pointer",color:"var(--color-gray-base, #666)",display:"flex",alignItems:"center",gap:"6px"},children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})}),"Share"]})]})]}),n&&!a&&e("div",{style:{background:"var(--color-gray-lightest, #f5f5f5)",borderRadius:"var(--radius-lg, 8px)",padding:"var(--spacing-xl, 12px)",marginBottom:"var(--spacing-2xl, 16px)",position:"relative"},children:[e("label",{style:{display:"block",fontSize:"var(--font-size-sm, 13px)",color:"var(--color-gray-base, #666)",marginBottom:"var(--spacing-sm, 6px)",fontWeight:"500"},children:"View another member's games"}),e("button",{"data-member-picker-button":!0,onClick:c=>{c.stopPropagation(),Le.value=!Le.value},style:{width:"100%",padding:"10px 12px",background:"white",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-md, 6px)",fontSize:"var(--font-size-base, 14px)",color:"var(--color-text-secondary, #666)",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e("span",{children:"Select a member..."}),e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",style:{transform:Le.value?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),Le.value&&e("div",{class:"member-picker-dropdown",style:{position:"absolute",top:"100%",left:"var(--spacing-xl, 12px)",right:"var(--spacing-xl, 12px)",marginTop:"var(--spacing-xs, 4px)",background:"white",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",boxShadow:"var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))",zIndex:100,maxHeight:"300px",overflowY:"auto"},children:V.value.filter(c=>c!==k.value).sort((c,d)=>c.localeCompare(d)).map(c=>e("button",{onClick:()=>{ye.value=c,Le.value=!1},style:{width:"100%",padding:"12px 16px",background:"white",border:"none",borderBottom:"1px solid var(--color-border, #e0e0e0)",textAlign:"left",fontSize:"var(--font-size-base, 14px)",color:"var(--color-text-primary, #333)",cursor:"pointer"},className:"hover-bg-subtle",children:c},c))})]}),r.length===0?e("div",{style:"text-align: center; padding: 48px 24px; background: #f9f9f9; border-radius: 12px;",children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:s?"📜":"📅"}),e("p",{style:"font-size: 18px; margin: 0 0 8px 0; color: var(--color-gray-dark, #333);",children:s?"No past games":"No upcoming games"}),e("p",{style:"font-size: 14px; color: var(--color-gray-base, #666); margin: 0 0 16px 0;",children:s?a?`${ye.value} has no past games on record.`:"Your game history will appear here.":a?`${ye.value} has no upcoming games.`:"Check in for a date to get matched with other players!"}),!s&&!a&&e("button",{onClick:()=>{oe.value="checkin"},style:{background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"12px",padding:"12px 24px",fontSize:"16px",fontWeight:"600",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Check In"]})]}):e("div",{style:"display: flex; flex-direction: column; gap: 12px;",children:r.map((c,d)=>{const g=c.players.filter(m=>_(m.name)!==_(o)),h=`mygames-${c.date}-${c.type}-${d}`,u=Zt.value===h,p=c.needed||1,f=Ue.value.has(h);return e("div",{onClick:()=>{l&&Ol(h)},style:{padding:"16px",background:c.isForming?"#FFF8E1":"#E8F5E9",borderRadius:"12px",border:l&&f?"2px solid var(--color-primary, #2C6E49)":c.isForming?"1px solid #FFE082":"1px solid #A5D6A7",cursor:l?"pointer":"default",position:"relative"},children:[l&&e("div",{style:{position:"absolute",top:"12px",right:"12px",width:"24px",height:"24px",borderRadius:"6px",border:f?"none":"2px solid var(--color-gray-disabled, #ccc)",background:f?"var(--color-primary, #2C6E49)":"white",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"16px",fontWeight:"bold"},children:f&&"✓"}),e("div",{onClick:m=>{l||(m.stopPropagation(),bo(c.date))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",cursor:"pointer",paddingRight:l?"32px":"0"},children:[e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"font-weight: 600; color: var(--color-gray-dark, #333); font-size: 16px;",children:H(c.date)}),e("span",{style:{fontSize:"12px",padding:"2px 8px",borderRadius:"10px",background:"#f0f0f0",color:"var(--color-gray-base, #666)",fontWeight:"500"},children:Rn(c.type)})]}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[c.isForming?e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",p]}):e("span",{style:"display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]}),!l&&c.isForming&&e("div",{style:"position: relative;",children:[e("button",{"data-share-button":!0,onClick:m=>{m.stopPropagation(),Zt.value=u?null:h},title:"Invite players",style:{background:u?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"12px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"white",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(255, 152, 0, 0.3)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",style:{transform:u?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),u&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:m=>{m.stopPropagation(),cn(c,"whatsapp")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:m=>{m.stopPropagation(),cn(c,"sms")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:m=>{m.stopPropagation(),cn(c,"copy")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),!l&&e("button",{onClick:m=>{m.stopPropagation(),jl(c)},title:"Add to Calendar",style:{background:"transparent",border:"none",padding:"4px",cursor:"pointer",color:"#888",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px"},className:"hover-color-primary",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"})})})]})]}),e("div",{onClick:m=>{l||(m.stopPropagation(),bo(c.date))},style:{fontSize:"15px",color:"#555",cursor:"pointer",paddingRight:l?"32px":"0"},children:g.length>0?e(A,{children:[e("span",{style:"color: #888;",children:"Playing with "}),e("span",{style:"font-weight: 500;",children:g.map(m=>m.name).join(", ")})]}):e("span",{style:"color: #888; font-style: italic;",children:["Waiting for ",p," more player",p>1?"s":""]})}),(()=>{const m=`${c.type.replace("-forming","")}-${c.matchNumber}`,b=kn.value[c.date]?.[m];return b?e("div",{style:{marginTop:"8px",padding:"8px 10px",background:(c.isForming,"rgba(255,255,255,0.6)"),borderRadius:"6px",fontSize:"13px",color:"var(--color-gray-base, #666)",display:"flex",alignItems:"flex-start",gap:"6px"},children:[e("span",{style:{color:"var(--color-gray-muted, #999)",flexShrink:0},children:"📝"}),e("span",{children:b})]}):null})()]},d)})}),r.length>0&&e("p",{style:"font-size: 13px; color: var(--color-gray-muted, #999); text-align: center; margin-top: 16px;",children:s?"Tap a game to view that day's history":"Tap a game to view that day's details"})]})}const fr=v(!1),pn=v(!1),nt=v(!1),ot=v(!1),ae=v([]),tr=v(null);typeof document<"u"&&document.addEventListener("click",t=>{if(tr.value){const r=t.target;!r.closest(".invite-dropdown")&&!r.closest("[data-invite-button]")&&(tr.value=null)}});function Wl(t,r){const o=new Date(t+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),a=C.value,i=`${window.location.origin}${window.location.pathname}#${a}`,l=G.value||"Tennis";if(r==="Doubles"){let s=`🎾 Need players for doubles!
`;return s+=`📅 ${o}
`,s+=`🏟️ ${l}

`,s+=`A match just opened up. Can you make it?

`,s+=`Check in: ${i}`,s}else{let s=`🎾 Need 1 more player for singles!
`;return s+=`📅 ${o}
`,s+=`🏟️ ${l}

`,s+=`A singles spot opened up. Can you make it?

`,s+=`Check in: ${i}`,s}}function un(t,r,n){const o=Wl(t,r);if(n==="whatsapp"){const a=encodeURIComponent(o);window.open(`https://wa.me/?text=${a}`,"_blank")}else if(n==="sms"){const a=encodeURIComponent(o);window.open(`sms:?body=${a}`,"_blank")}else n==="copy"&&navigator.clipboard.writeText(o).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});tr.value=null}async function Vl(){const t=C.value,r=k.value;if(!(!t||!r))try{const i=(await R().ref(`groups/${t}/userNotifications/${_(r)}/preferences`).once("value")).val()||{};nt.value=i.activityAlerts===!0,ot.value=i.matchConfirmations!==!1,ae.value=i.unwatchedMembers||i.mutedMembers||[]}catch(n){console.error("Error loading notification prefs from Firebase:",n)}}async function rr(){const t=C.value,r=k.value;if(!t||!r)return;const n={activityAlerts:nt.value,matchConfirmations:ot.value,unwatchedMembers:ae.value};try{await R().ref(`groups/${t}/userNotifications/${_(r)}/preferences`).set(n),w("Preferences saved","success")}catch(o){console.error("Error saving notification prefs:",o),w("Failed to save preferences","error")}}function Gl(t){ae.value.includes(t)?ae.value=ae.value.filter(r=>r!==t):ae.value=[...ae.value,t],rr()}function Yl(){ae.value=[],rr()}function ql(){ae.value=V.value.filter(t=>t!==k.value),rr()}function Kl(t){return!ae.value.includes(t)}function Jl(t){t.read||ni(t.id),t.date&&(E.value=t.date,oe.value="checkin")}function Ql(t){const r=new Date(t),o=new Date().getTime()-t;return o<6e4?"Just now":o<36e5?`${Math.floor(o/6e4)}m ago`:o<864e5?`${Math.floor(o/36e5)}h ago`:r.toLocaleDateString([],{month:"short",day:"numeric"})}function Xl(){const t=Xr.value,r=t.filter(n=>!n.read).length;return P(()=>{Vl()},[]),e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[pn.value&&e("div",{style:"position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1002;",children:e("div",{style:"background: var(--color-bg-card, white); padding: var(--spacing-3xl, 20px); border-radius: var(--radius-xl, 12px); max-width: 350px; width: 90%;",children:[e("h3",{style:"margin-top: 0; margin-bottom: var(--spacing-md, 8px); color: var(--color-text-primary, #333);",children:"Followed Members"}),e("p",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666);",children:"Get activity alerts for these members"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);",children:[e("button",{onClick:Yl,style:"flex: 1; padding: var(--spacing-md, 8px); background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Select All"}),e("button",{onClick:ql,style:"flex: 1; padding: var(--spacing-md, 8px); background: var(--color-bg-muted, #f5f5f5); color: var(--color-text-secondary, #666); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Deselect All"})]}),e("div",{style:"max-height: 300px; overflow-y: auto;",children:V.value.filter(n=>n!==k.value).map(n=>{const o=Kl(n);return e("button",{onClick:()=>Gl(n),style:{display:"flex",alignItems:"center",gap:"var(--spacing-lg, 10px)",width:"100%",textAlign:"left",padding:"var(--spacing-xl, 12px)",marginBottom:"var(--spacing-xs, 4px)",border:o?"1px solid var(--color-primary-lighter, #A5D6A7)":"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",background:o?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, white)",color:"var(--color-text-primary, #333)",cursor:"pointer",fontSize:"var(--font-size-base, 14px)",fontWeight:"normal"},children:[e("span",{style:{width:"20px",height:"20px",borderRadius:"var(--radius-sm, 4px)",border:o?"none":"2px solid var(--color-gray-disabled, #ccc)",background:o?"var(--color-primary, #2C6E49)":"var(--color-bg-card, white)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-inverse, white)",fontSize:"var(--font-size-base, 14px)",flexShrink:0},children:o&&"✓"}),n]},n)})}),e("button",{onClick:()=>{pn.value=!1},style:"width: 100%; margin-top: var(--spacing-xl, 12px); background: var(--color-primary, #2C6E49); color: var(--color-text-inverse, white);",children:"Done"})]})}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);",children:[e("h2",{style:"margin: 0; font-size: var(--font-size-2xl, 20px);",children:["Notifications",r>0&&e("span",{style:"margin-left: var(--spacing-md, 8px); font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); font-weight: 400;",children:["(",r," unread)"]})]}),r>0&&e("button",{onClick:ii,style:{background:"none",border:"none",color:"var(--color-primary, #2C6E49)",fontSize:"var(--font-size-base, 14px)",cursor:"pointer",padding:"var(--spacing-xs, 4px) var(--spacing-md, 8px)"},children:"Mark all read"})]}),e("div",{style:"margin-bottom: var(--spacing-2xl, 16px); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-xl, 12px); overflow: hidden;",children:[e("button",{onClick:()=>{fr.value=!fr.value},style:"width: 100%; padding: 14px var(--spacing-2xl, 16px); background: var(--color-bg-subtle, #f9f9f9); border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: var(--font-size-md, 15px); font-weight: 500;",children:[e("span",{style:"display: flex; align-items: center; gap: var(--spacing-md, 8px); color: var(--color-text-primary, #333);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M19.14,12.94c0.04-0.31,0.06-0.63,0.06-0.94c0-0.31-0.02-0.63-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.37,4.82,11.69,4.82,12s0.02,0.63,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})}),"Alert Settings"]}),e("span",{style:{color:"var(--color-text-muted, #999)",transform:fr.value?"rotate(180deg)":"none",transition:"transform 0.2s"},children:"▼"})]}),fr.value&&e("div",{style:"padding: var(--spacing-2xl, 16px); background: var(--color-bg-card, #fff); border-top: 1px solid var(--color-border, #e0e0e0);",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Game confirmations"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:"When placed in or removed from a confirmed game"})]}),e("label",{style:"position: relative; display: inline-block; width: 48px; height: 26px;",children:[e("input",{type:"checkbox",checked:ot.value,onChange:n=>{ot.value=n.target.checked,rr()},style:"opacity: 0; width: 0; height: 0;"}),e("span",{style:{position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:ot.value?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",transition:"0.3s",borderRadius:"26px"},children:e("span",{style:{position:"absolute",height:"20px",width:"20px",left:ot.value?"25px":"3px",bottom:"3px",backgroundColor:"white",transition:"0.3s",borderRadius:"50%"}})})]})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Activity alerts"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:"Check-ins, removals, notes"})]}),e("label",{style:"position: relative; display: inline-block; width: 48px; height: 26px;",children:[e("input",{type:"checkbox",checked:nt.value,onChange:n=>{nt.value=n.target.checked,rr()},style:"opacity: 0; width: 0; height: 0;"}),e("span",{style:{position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:nt.value?"var(--color-primary, #2C6E49)":"var(--color-gray-disabled, #ccc)",transition:"0.3s",borderRadius:"26px"},children:e("span",{style:{position:"absolute",height:"20px",width:"20px",left:nt.value?"25px":"3px",bottom:"3px",backgroundColor:"white",transition:"0.3s",borderRadius:"50%"}})})]})]}),e("div",{style:"padding-top: var(--spacing-xl, 12px); border-top: 1px solid var(--color-border, #e0e0e0);",children:e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg, 10px);",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Followed members"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:(()=>{const n=V.value.filter(a=>a!==k.value);return`Following ${n.length-ae.value.length} of ${n.length} members`})()})]}),e("button",{onClick:()=>{pn.value=!0},style:"background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); padding: var(--spacing-sm, 6px) var(--spacing-xl, 12px); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Edit"})]})})]})]}),t.length===0?e("div",{style:"text-align: center; padding: 48px var(--spacing-4xl, 24px); background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-xl, 12px);",children:[e("div",{style:"font-size: 48px; margin-bottom: var(--spacing-2xl, 16px);",children:"🔔"}),e("p",{style:"font-size: var(--font-size-xl, 18px); margin: 0 0 var(--spacing-md, 8px) 0; color: var(--color-text-primary, #333);",children:"No notifications"}),e("p",{style:"font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); margin: 0;",children:"You'll see updates about matches and check-ins here"})]}):e("div",{style:"display: flex; flex-direction: column; gap: var(--spacing-md, 8px);",children:t.map(n=>{const o=tr.value===n.id,a=n.type==="match_dissolved";return e("div",{onClick:()=>Jl(n),style:{padding:"14px var(--spacing-2xl, 16px)",background:n.read?"var(--color-bg-subtle, #f9f9f9)":"var(--color-primary-light, #E8F5E9)",borderRadius:"var(--radius-lg, 10px)",cursor:n.date?"pointer":"default",border:n.read?"1px solid var(--color-border, #e0e0e0)":"1px solid var(--color-primary-lighter, #A5D6A7)",position:"relative"},children:e("div",{style:"display: flex; justify-content: space-between; align-items: flex-start;",children:[e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-md, 15px); color: var(--color-text-primary, #333); margin-bottom: var(--spacing-sm, 6px);",children:[!n.read&&e("span",{style:"display: inline-block; width: 8px; height: 8px; background: var(--color-primary, #2C6E49); border-radius: var(--radius-full, 50%); margin-right: var(--spacing-md, 8px);"}),n.message]}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #888); display: flex; align-items: center; gap: var(--spacing-md, 8px); flex-wrap: wrap;",children:[e("span",{children:Ql(n.timestamp)}),n.date&&e("span",{style:"color: var(--color-primary, #2C6E49); font-weight: 500; display: flex; align-items: center; gap: 2px;",children:[H(n.date)," →"]})]}),a&&n.date&&n.matchType&&e("div",{style:"margin-top: var(--spacing-xl, 12px); position: relative;",children:[e("button",{"data-invite-button":!0,onClick:i=>{i.stopPropagation(),tr.value=o?null:n.id},style:{background:o?"var(--color-orange-dark, #e65100)":"var(--color-orange-primary, #ff9800)",border:"none",borderRadius:"16px",padding:"6px 14px",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",color:"white",transition:"all 0.2s",boxShadow:"0 2px 6px rgba(255, 152, 0, 0.4)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",style:{transform:o?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),o&&e("div",{class:"invite-dropdown",style:{position:"absolute",bottom:"100%",left:"0",marginBottom:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:i=>{i.stopPropagation(),un(n.date,n.matchType,"whatsapp")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-whatsapp, #25D366)"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:i=>{i.stopPropagation(),un(n.date,n.matchType,"sms")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-sms, #2196F3)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:i=>{i.stopPropagation(),un(n.date,n.matchType,"copy")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-gray-base, #666)",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]})]}),e("button",{onClick:i=>{i.stopPropagation(),ai(n.id)},style:{background:"none",border:"none",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-xl, 18px)",cursor:"pointer",padding:"0 var(--spacing-xs, 4px)",marginLeft:"var(--spacing-md, 8px)"},children:"×"})]})},n.id)})})]})}function yo(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Zl(t){const r=J.value;if(!r)return null;const n=new Date;n.setHours(0,0,0,0);let o=null,a="";const i=[];if(Object.keys(r).forEach(l=>{const s=r[l];if(!s||!Array.isArray(s))return;const[c,d,g]=l.split("-").map(Number),h=new Date(c,d-1,g);h.setHours(0,0,0,0),h<=n&&s.some(p=>p&&p.name===t)&&i.push(l)}),i.sort((l,s)=>s.localeCompare(l)),i.length>0){a=i[0];const[l,s,c]=a.split("-").map(Number);o=new Date(l,s-1,c)}return o}function es(t){const r=new Date;r.setHours(0,0,0,0);const n=new Date(t);n.setHours(0,0,0,0);const o=r.getTime()-n.getTime(),a=Math.floor(o/(1e3*60*60*24));return a===0?"Today":a===1?"Yesterday":a<7?`${a} days ago`:a<30?`${Math.floor(a/7)} weeks ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ts(){const[t,r]=Me(yo()),[n,o]=Me("");return P(()=>{const a=setInterval(()=>{r(yo())},1e3);return()=>clearInterval(a)},[]),e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[e("h2",{style:"margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);",children:"Team Directory"}),e("div",{style:{marginBottom:"var(--spacing-2xl, 16px)"},children:e("input",{type:"text",value:n,onInput:a=>o(a.target.value),placeholder:"🔍 Search members...",style:{width:"100%",padding:"var(--spacing-xl, 12px) var(--spacing-2xl, 16px)",border:"1px solid var(--color-border-light, #ddd)",borderRadius:"var(--radius-xl, 12px)",fontSize:"var(--font-size-md, 15px)",boxSizing:"border-box",background:"var(--color-bg-card, #fff)"}})}),e("button",{onClick:()=>{tl()},style:{width:"100%",padding:"var(--spacing-xl, 14px)",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"var(--radius-xl, 12px)",fontSize:"var(--font-size-md, 15px)",fontWeight:"500",cursor:"pointer",marginBottom:"var(--spacing-2xl, 16px)",display:"flex",alignItems:"center",justifyContent:"center",gap:"var(--spacing-md, 8px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"white",children:e("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})}),"Add New Member"]}),e("div",{style:{display:"flex",flexDirection:"column",gap:"var(--spacing-xl, 12px)"},children:(()=>{const i=(V.value||[]).filter(l=>l.toLowerCase().includes(n.toLowerCase())).sort((l,s)=>l.localeCompare(s));return i.length===0?e("div",{style:{background:"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",padding:"40px 20px",textAlign:"center",border:"1px solid var(--color-border, #e0e0e0)"},children:[e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"var(--color-border-light, #ddd)",style:{marginBottom:"var(--spacing-xl, 12px)"},children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})}),e("p",{style:{color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-md, 15px)",margin:0},children:n?"No members found":"No members in team yet"})]}):i.map(l=>{const s=K.value?.[l],c=Zl(l),g=s?.shareContactInDirectory===!0&&(s?.phone||s?.email),u=s?.shareNotesInDirectory===!0&&s?.notes,p=k.value&&l===k.value;return e("div",{style:{background:p?"var(--color-primary-light, #e8f5e9)":"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:p?"2px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #e0e0e0)"},children:e("div",{style:{display:"flex",alignItems:"start",justifyContent:"space-between",gap:"var(--spacing-xl, 12px)"},children:[e("div",{style:{flex:1,minWidth:0},children:[e("div",{style:{fontWeight:600,fontSize:"var(--font-size-lg, 16px)",color:"var(--color-text-primary, #333)",marginBottom:"var(--spacing-md, 8px)"},children:[l,p&&e("span",{style:{marginLeft:"var(--spacing-md, 8px)",fontSize:"var(--font-size-sm, 12px)",color:"var(--color-primary, #2C6E49)",fontWeight:"500"},children:"(You)"})]}),c&&e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)",marginBottom:"var(--spacing-md, 8px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"var(--color-text-muted, #888)",children:e("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"})}),"Last played: ",es(c)]}),!c&&e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #999)",marginBottom:"var(--spacing-md, 8px)"},children:"No recent games"}),s?.addedBy&&e("div",{style:{fontSize:"var(--font-size-sm, 12px)",color:"var(--color-text-muted, #999)",marginBottom:"var(--spacing-md, 8px)"},children:["Added by ",s.addedBy,s.addedDate&&` • ${new Date(s.addedDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`]}),g&&e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md, 8px)",marginTop:"var(--spacing-md, 8px)",flexWrap:"wrap"},children:[s.phone&&e(A,{children:[e("a",{href:`https://wa.me/${s.phone.replace(/\D/g,"")}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"#25D366",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Message on WhatsApp",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("a",{href:`sms:${s.phone}`,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"var(--color-info, #2196F3)",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Send SMS",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"})}),"SMS"]})]}),s.email&&e("a",{href:`mailto:${s.email}`,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"var(--color-text-secondary, #666)",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500"},className:"hover-opacity",title:"Send email",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),"Email"]})]}),u&&e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)",marginTop:"var(--spacing-md, 8px)",padding:"var(--spacing-md, 8px)",background:"var(--color-bg-subtle, #f9f9f9)",borderRadius:"var(--radius-md, 6px)",fontStyle:"italic"},children:['"',s.notes,'"']})]}),(p||t)&&e("button",{onClick:()=>ca(l),style:{background:p?"var(--color-primary, #2C6E49)":"var(--color-bg-muted, #f5f5f5)",color:p?"white":"var(--color-text-secondary, #666)",border:p?"none":"1px solid var(--color-border, #e0e0e0)",padding:"var(--spacing-md, 8px) var(--spacing-xl, 12px)",cursor:"pointer",borderRadius:"var(--radius-lg, 8px)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"var(--font-size-base, 14px)",fontWeight:"500",whiteSpace:"nowrap"},title:p?"Edit your profile":"Edit member",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:p?"white":"var(--color-text-secondary, #666)",style:{marginRight:"var(--spacing-xs, 4px)"},children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})}),"Edit"]})]})},l)})})()}),V.value.length>0&&!n&&e("div",{style:{marginTop:"var(--spacing-2xl, 16px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",border:"1px solid var(--color-border, #e0e0e0)",textAlign:"center"},children:e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)"},children:[e("span",{style:{fontWeight:"600",color:"var(--color-text-primary, #333)"},children:V.value.length})," ",V.value.length===1?"member":"members"," in team"]})})]})}const rs=ut(()=>{const t=J.value,r=new Date;r.setHours(0,0,0,0);const n=new Date(r);n.setDate(n.getDate()-30);const o=new Date(r);o.setDate(o.getDate()-7);let a=0,i=0,l=0,s=0,c=0,d=0;const g={},h={0:0,1:0,2:0,3:0,4:0,5:0,6:0},u={};let p=0,f=0;const m=Object.keys(t).sort();for(const z of m){const $=t[z]||[];if($.length===0)continue;const T=new Date(z+"T00:00:00");if(!(T<r))continue;p++,f+=$.length;const me=T>=n,xe=T>=o,le=T.getDay(),q=new Date(T);q.setDate(q.getDate()-q.getDay());const be=q.toISOString().split("T")[0],{matches:ma}=Qr($);for(const se of ma)if(!(se.type==="waiting"||se.type==="doubles-forming"||se.type==="singles-forming")){a++,h[le]++,u[be]=(u[be]||0)+1,me&&c++,xe&&d++,se.type==="doubles"?i++:se.type==="singles"?l++:se.type==="singles-or-practice"&&s++;for(const mt of se.players){const We=_(mt.name);g[We]||(g[We]={gamesPlayed:0,checkIns:0,lastPlayed:z,doublesPlayed:0,singlesPlayed:0}),g[We].gamesPlayed++,g[We].lastPlayed=z,se.type==="doubles"?g[We].doublesPlayed++:g[We].singlesPlayed++}}for(const se of $){const mt=_(se.name);g[mt]||(g[mt]={gamesPlayed:0,checkIns:0,lastPlayed:"",doublesPlayed:0,singlesPlayed:0}),g[mt].checkIns++}}const b=Object.entries(g).map(([z,$])=>({name:V.value.find(Q=>_(Q)===z)||z,...$,participationRate:$.checkIns>0?Math.round($.gamesPlayed/$.checkIns*100):0})).sort((z,$)=>$.gamesPlayed-z.gamesPlayed).slice(0,10),x=Object.entries(h).sort((z,$)=>$[1]-z[1])[0],y=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],S=Object.entries(u).sort((z,$)=>$[0].localeCompare(z[0])).slice(0,8).reverse();return{totalGames:a,doublesGames:i,singlesGames:l,rotationGames:s,last30DaysGames:c,last7DaysGames:d,activeDays:p,totalCheckIns:f,averagePlayersPerDay:p>0?(f/p).toFixed(1):"0",topPlayers:b,mostPopularDay:x?y[parseInt(x[0])]:"N/A",mostPopularDayCount:x?x[1]:0,dayOfWeekCounts:h,recentWeeks:S,totalMembers:V.value.length,activeMembersLast30Days:Object.values(g).filter(z=>z.lastPlayed?new Date(z.lastPlayed+"T00:00:00")>=n:!1).length}});function hn({label:t,value:r,subtext:n}){return e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",textAlign:"center",flex:"1",minWidth:"100px"},children:[e("div",{style:{fontSize:"24px",fontWeight:"700",color:"var(--color-primary, #2C6E49)"},children:r}),e("div",{style:{fontSize:"12px",color:"#666",marginTop:"4px"},children:t}),n&&e("div",{style:{fontSize:"11px",color:"#888",marginTop:"2px"},children:n})]})}function gn({value:t,max:r,color:n="var(--color-primary, #2C6E49)"}){const o=r>0?t/r*100:0;return e("div",{style:{background:"#e0e0e0",borderRadius:"4px",height:"8px",flex:"1",overflow:"hidden"},children:e("div",{style:{background:n,height:"100%",width:`${o}%`,borderRadius:"4px",transition:"width 0.3s ease"}})})}function ns(){const t=rs.value,r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=Math.max(...Object.values(t.dayOfWeekCounts));return e("div",{style:"padding: 16px;",children:[e("h3",{style:"margin: 0 0 16px 0; font-size: 18px; color: #333;",children:"Group Insights"}),e("div",{style:{display:"flex",gap:"12px",marginBottom:"20px",flexWrap:"wrap"},children:[e(hn,{label:"Total Games",value:t.totalGames,subtext:"all time"}),e(hn,{label:"Last 30 Days",value:t.last30DaysGames}),e(hn,{label:"Last 7 Days",value:t.last7DaysGames})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Game Types"}),e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Doubles"}),e(gn,{value:t.doublesGames,max:t.totalGames,color:"var(--color-primary, #2C6E49)"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.doublesGames})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Singles"}),e(gn,{value:t.singlesGames,max:t.totalGames,color:"#2196F3"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.singlesGames})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Rotation"}),e(gn,{value:t.rotationGames,max:t.totalGames,color:"#FF9800"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.rotationGames})]})]})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Activity by Day"}),e("div",{style:{display:"flex",gap:"4px",alignItems:"flex-end",height:"80px"},children:r.map((o,a)=>{const i=t.dayOfWeekCounts[a],l=n>0?i/n*60:0;return e("div",{style:{flex:"1",textAlign:"center"},children:[e("div",{style:{background:a===Number(Object.entries(t.dayOfWeekCounts).sort((s,c)=>c[1]-s[1])[0]?.[0])?"var(--color-primary, #2C6E49)":"#c8e6c9",height:`${Math.max(l,4)}px`,borderRadius:"4px 4px 0 0",marginBottom:"4px",transition:"height 0.3s ease"}}),e("span",{style:{fontSize:"10px",color:"#666"},children:o})]},o)})}),e("p",{style:{fontSize:"13px",color:"#666",margin:"12px 0 0 0",textAlign:"center"},children:["Most popular: ",e("strong",{children:t.mostPopularDay})," (",t.mostPopularDayCount," games)"]})]}),t.recentWeeks.length>0&&e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Weekly Trend"}),e("div",{style:{display:"flex",gap:"4px",alignItems:"flex-end",height:"60px"},children:t.recentWeeks.map(([o,a])=>{const i=Math.max(...t.recentWeeks.map(d=>d[1])),l=i>0?a/i*50:0,s=new Date(o+"T00:00:00"),c=`${s.getMonth()+1}/${s.getDate()}`;return e("div",{style:{flex:"1",textAlign:"center"},children:[e("div",{style:{background:"var(--color-primary, #2C6E49)",height:`${Math.max(l,4)}px`,borderRadius:"4px 4px 0 0",marginBottom:"4px"}}),e("span",{style:{fontSize:"9px",color:"#666"},children:c})]},o)})})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Most Active Players"}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#888",marginBottom:"8px",padding:"0 4px"},children:[e("span",{children:"Player"}),e("span",{children:"Games"})]}),t.topPlayers.length===0?e("p",{style:{fontSize:"14px",color:"#666",textAlign:"center",margin:"16px 0"},children:"No game data yet"}):e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:t.topPlayers.map((o,a)=>e("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px",background:a<3?"#E8F5E9":"white",borderRadius:"8px"},children:[e("span",{style:{width:"20px",height:"20px",borderRadius:"50%",background:a===0?"#FFD700":a===1?"#C0C0C0":a===2?"#CD7F32":"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"600",color:a<3?"#333":"#666"},children:a+1}),e("span",{style:{flex:"1",fontSize:"14px"},children:o.name}),e("span",{style:{fontSize:"14px",fontWeight:"600",color:"var(--color-primary, #2C6E49)"},children:o.gamesPlayed})]},o.name))})]}),e("div",{style:{background:"#E3F2FD",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Group Health"}),e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Total members"}),e("span",{style:{fontWeight:"600"},children:t.totalMembers})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Active last 30 days"}),e("span",{style:{fontWeight:"600"},children:t.activeMembersLast30Days})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Avg players/day"}),e("span",{style:{fontWeight:"600"},children:t.averagePlayersPerDay})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Days with activity"}),e("span",{style:{fontWeight:"600"},children:t.activeDays})]})]})]}),e("p",{style:"font-size: 13px; color: #888; text-align: center; margin-top: 16px;",children:"Stats are based on completed games from past dates"})]})}function os(){const t=I.value.groupDescription,r=I.value.groupRules,n=t||r,o=[{title:"Getting Started",icon:"🎾",content:["When you first open the app, you'll be asked to select your name from the member list.","Use the date selector to pick the day you want to play.","Check in by selecting your game preference and optionally setting your available times."]},{title:"Check-in Options",icon:"✅",content:["Doubles - You want to play doubles games (4 players).","Singles - You want to play singles games (2 players).","Both - You're flexible and happy to play either format.","Rotation - Enable this option to join 3-player rotation games where players take turns.","Time Range - Set your earliest and latest available times to help coordinate."]},{title:"Game Types",icon:"👥",content:["Doubles (green) - A confirmed 4-player doubles game.","Singles (green) - A confirmed 2-player singles game.","Rotation (green) - A confirmed 3-player game with rotating play.","Forming (yellow) - A game that needs more players to be complete."]},{title:"My Games",icon:"📅",content:["View all your upcoming games across all dates at a glance.","Tap any game card to jump directly to that day's check-in page.","Yellow background indicates the game is still forming and needs more players.","Green background means the game is confirmed and ready to play."]},{title:"Alerts",icon:"🔔",content:["Get notified when games are formed or when players join/leave.","Unread alerts show a red badge with the count on the tab.","Tap a notification to mark it as read.","Access notification settings to configure your preferences."]},{title:"Profile",icon:"👤",content:["Access your profile by tapping your name badge in the top-right corner.","Edit your display name, phone number, and email address.","Change your user session to switch to a different account.","Admin login is available for group administrators."]},{title:"Tips",icon:"💡",content:["Check in early to get matched with your preferred players.",`Select "Both" if you're flexible - it increases your chances of getting a game.`,"Set your time preferences to help organizers coordinate scheduling.","Enable rotation if you're open to 3-player games."]},{title:"Admin Features",icon:"⚙️",content:["Access admin mode via Admin Login in your Profile page.","Manage Members - Add, edit, or remove group members.","Group Settings - Configure group name, PINs, weather location, story, and rules.","Activity History - View all check-ins and changes with option to delete test data.","Group Insights - View game stats, player activity trends, and analytics."]}],a=r?r.split(`
`).filter(i=>i.trim()):[];return e("div",{style:"padding: 16px 0;",children:[n&&e("div",{style:{marginBottom:"24px"},children:[e("h2",{style:"margin: 0 0 16px 0; font-size: 20px;",children:["About ",G.value]}),t&&e("div",{style:{background:"var(--color-primary-light, #E8F5E9)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid var(--color-primary-lighter, #C8E6C9)",marginBottom:"var(--spacing-xl, 12px)"},children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px); color: var(--color-primary, #2E7D32); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"})}),"Our Story"]}),e("p",{style:"margin: 0; color: var(--color-text-primary, #333); font-size: var(--font-size-base, 14px); line-height: 1.6; white-space: pre-wrap;",children:t})]}),a.length>0&&e("div",{style:{background:"var(--color-warning-light, #FFF8E1)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid #FFECB3"},children:[e("h3",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-md, 15px); color: var(--color-warning, #F57C00); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#FF9800",children:e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"})}),"Rules & Tips"]}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-text-primary, #333); font-size: var(--font-size-base, 14px); line-height: 1.6;",children:a.map((i,l)=>e("li",{style:"margin-bottom: var(--spacing-sm, 6px);",children:i},l))})]})]}),e("h2",{style:"margin: 0 0 16px 0; font-size: 20px;",children:"User Guide"}),e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:o.map((i,l)=>e("div",{style:{background:"var(--color-bg-subtle, #f9f9f9)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid var(--color-border, #e0e0e0)"},children:[e("h3",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-lg, 16px); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("span",{children:i.icon}),e("span",{children:i.title})]}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-text-secondary, #555); font-size: var(--font-size-base, 14px); line-height: 1.6;",children:i.content.map((s,c)=>e("li",{style:"margin-bottom: var(--spacing-xs, 4px);",children:s},c))})]},l))}),e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888); text-align: center; margin-top: var(--spacing-3xl, 20px);",children:"Need more help? Contact your group administrator."})]})}function mr({title:t,isOpen:r,onBack:n,children:o}){const a=On(null);return P(()=>{r&&a.current&&(a.current.scrollTop=0)},[r]),e("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1e3,pointerEvents:r?"auto":"none"},children:[e("div",{onClick:n,style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0, 0, 0, 0.3)",opacity:r?1:0,transition:"opacity 0.25s ease-out"}}),e("div",{ref:a,style:{position:"absolute",top:0,right:0,bottom:0,width:"100%",maxWidth:"500px",background:"var(--color-bg-main, #f5f5f5)",transform:r?"translateX(0)":"translateX(100%)",transition:"transform 0.25s ease-out",display:"flex",flexDirection:"column",overflow:"hidden"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md, 8px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",borderBottom:"1px solid var(--color-border, #e0e0e0)",flexShrink:0},children:[e("button",{onClick:n,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",background:"var(--color-bg-subtle, #f5f5f5)",border:"none",borderRadius:"var(--radius-full, 50%)",cursor:"pointer",fontSize:"20px",fontWeight:"bold",color:"var(--color-text-primary, #333)"},"aria-label":"Go back",children:"←"}),e("h2",{style:{margin:0,fontSize:"var(--font-size-xl, 18px)",fontWeight:600,color:"var(--color-text-primary, #333)"},children:t})]}),e("div",{style:{flex:1,overflowY:"auto",padding:"var(--spacing-2xl, 16px)"},children:o})]})]})}const nr=v(""),or=v(""),ar=v(""),Oe=v(""),ct=v(""),dt=v(""),ir=v(""),lr=v(""),Tn=v(!1);function as(){nr.value=G.value||"",or.value=I.value.adminPin||"",ar.value=I.value.groupPin||"",Oe.value=I.value.location?.name||"",ct.value=I.value.location?.lat?.toString()||"",dt.value=I.value.location?.lon?.toString()||"",ir.value=I.value.groupDescription||"",lr.value=I.value.groupRules||"",Tn.value=!0}async function is(){const t=C.value;if(t)try{const n=R().ref(`groups/${t}/settings`),o={groupName:nr.value,adminPin:or.value,groupPin:ar.value,groupDescription:ir.value||null,groupRules:lr.value||null};Oe.value&&ct.value&&dt.value&&(o.location={name:Oe.value,lat:parseFloat(ct.value),lon:parseFloat(dt.value)}),await n.update(o),G.value=nr.value,I.value={...I.value,adminPin:or.value,groupPin:ar.value,location:Oe.value?{name:Oe.value,lat:parseFloat(ct.value),lon:parseFloat(dt.value)}:void 0,groupDescription:ir.value||void 0,groupRules:lr.value||void 0},w("Settings saved","success")}catch(r){console.error("Error saving settings:",r),w("Failed to save settings","error")}}function ls(){return P(()=>(as(),()=>{Tn.value=!1}),[]),Tn.value?e("div",{children:[e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group Name"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Display name for this tennis group"}),e("input",{type:"text",placeholder:"e.g., Tue/Thu Midday Doubles",value:nr.value,onInput:t=>{nr.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group Story"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Tell your group's story - when/where you play, how it started, etc."}),e("textarea",{placeholder:"e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts...",value:ir.value,onInput:t=>{ir.value=t.target.value},rows:3,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Rules & Tips"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"House rules, etiquette, and tips for new members (one per line)"}),e("textarea",{placeholder:`e.g.,
Check in by 10am on game days
Bring water and sunscreen
New balls provided by rotating member...`,value:lr.value,onInput:t=>{lr.value=t.target.value},rows:4,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Admin PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Required to access admin settings"}),e("input",{type:"text",value:or.value,onInput:t=>{or.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Group PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Share this PIN with all group members to access the app"}),e("input",{type:"text",value:ar.value,onInput:t=>{ar.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);",children:"Weather Location"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Set the location for weather forecasts"}),e("input",{type:"text",placeholder:"Location name (e.g., Los Gatos, CA)",value:Oe.value,onInput:t=>{Oe.value=t.target.value},style:"width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-md, 8px);"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-md, 8px);",children:[e("input",{type:"number",step:"0.0001",placeholder:"Latitude",value:ct.value,onInput:t=>{ct.value=t.target.value},style:"flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box;"}),e("input",{type:"number",step:"0.0001",placeholder:"Longitude",value:dt.value,onInput:t=>{dt.value=t.target.value},style:"flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box;"})]}),e("p",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);",children:["Tip: Use ",e("a",{href:"https://www.latlong.net/",target:"_blank",style:"color: var(--color-primary, #2C6E49);",children:"latlong.net"})," to find coordinates"]})]}),e("button",{onClick:is,style:{width:"100%",padding:"var(--spacing-xl, 12px)",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"var(--radius-lg, 8px)",fontSize:"var(--font-size-base, 14px)",fontWeight:"500",cursor:"pointer",marginTop:"var(--spacing-xl, 12px)"},children:"Save Settings"})]}):e("div",{style:"padding: 20px; text-align: center; color: var(--color-text-muted, #999);",children:"Loading..."})}const fa={login:{label:"Logins",actions:["user_login"]},checkin:{label:"Check-ins",actions:["check-in","checkin"]},removal:{label:"Removals",actions:["removal"]},shared:{label:"Shared",actions:["whatsapp_share"]},notes:{label:"Notes",actions:["notes_saved","note_added","note_updated","note_removed"]},members:{label:"Members",actions:["member_added","member_removed","member_renamed"]},arrangements:{label:"Arrangements",actions:["arrangement_saved","arrangement_cleared"]}},qe=v(!1),sr=v([]),Pn=v(!1),ue=v(new Set);async function ss(){const t=C.value;if(t){Pn.value=!0;try{const r=R();let n=[];const a=(await r.ref(`groups/${t}/activity`).once("value")).val();if(a){for(const[i,l]of Object.entries(a))if(l)for(const[s,c]of Object.entries(l))n.push({...c,date:i,firebaseKey:s})}n.sort((i,l)=>l.timestamp-i.timestamp),sr.value=n}catch(r){console.error("Error loading activity:",r)}finally{Pn.value=!1}}}async function cs(t){const r=C.value;if(!(!r||!t.firebaseKey||!t.date)&&confirm("Remove this activity entry?"))try{await R().ref(`groups/${r}/activity/${t.date}/${t.firebaseKey}`).remove(),sr.value=sr.value.filter(o=>!(o.date===t.date&&o.firebaseKey===t.firebaseKey))}catch(n){console.error("Error deleting activity:",n),alert("Failed to delete activity")}}function ds(t){return Hn(t)}function ps(t){switch(t){case"check-in":case"checkin":return"✅";case"removal":return"❌";case"member_added":return"👤";case"member_removed":return"🚫";case"member_renamed":return"✏️";case"whatsapp_share":return"📤";case"notes_saved":case"note_added":return"📝";case"note_updated":return"✏️";case"note_removed":return"🗑️";case"user_login":return"🔓";case"arrangement_saved":return"🔀";case"arrangement_cleared":return"↩️";default:return"📋"}}function us(t){const{action:r,player:n,by:o,playStyle:a,timeRange:i,matchKey:l,type:s}=t;switch(r){case"check-in":case"checkin":{let c=`${n} checked in`;return o&&o!==n&&(c+=` (by ${o})`),a&&(c+=` - ${Jr(a)}`,(i?.start||i?.end)&&(c+=` (${i.start||"anytime"}–${i.end||"anytime"})`)),c}case"removal":return o&&o!==n?`${o} removed ${n}`:`${n} removed themselves`;case"member_added":return`${o} added ${n} as member`;case"member_removed":return`${o} removed ${n} from members`;case"member_renamed":return`${o} renamed ${t.oldName} to ${n}`;case"whatsapp_share":{let d=`${o} shared ${s==="matches"?"matches":s==="checkin"?"check-in":"removal"} to WhatsApp`;return n&&n!==o&&(d+=` (for ${n})`),d}case"notes_saved":case"note_added":{const c=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} added note to ${c}${d}`}case"note_updated":{const c=l?l.replace("-"," #").replace("forming 1","forming"):"match",d=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} updated note on ${c}${d}`}case"note_removed":{const c=l?l.replace("-"," #").replace("forming 1","forming"):"match";return`${o} removed note from ${c}`}case"user_login":return`${n} logged in`;case"arrangement_saved":{const{matchCount:c}=t;let d=`${o} arranged matches`;return c&&(d+=` (${c} match${c>1?"es":""})`),d}case"arrangement_cleared":return`${o} cleared arrangement (back to auto)`;default:return`${n} - ${r}`}}function hs(t){const r=new Set(ue.value);r.has(t)?r.delete(t):r.add(t),ue.value=r}function gs(){if(ue.value.size===0)return sr.value;const t=new Set;return ue.value.forEach(r=>{fa[r].actions.forEach(n=>t.add(n))}),sr.value.filter(r=>t.has(r.action))}function vs(){P(()=>(ss(),()=>{qe.value=!1,ue.value=new Set}),[]);const t=gs(),r={};return qe.value?t.forEach(n=>{r[n.date]||(r[n.date]=[]),r[n.date].push(n)}):t.forEach(n=>{const o=new Date(n.timestamp).toISOString().split("T")[0];r[o]||(r[o]=[]),r[o].push(n)}),e("div",{children:[e("div",{style:"display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;",children:[Object.entries(fa).map(([n,o])=>{const a=ue.value.has(n);return e("button",{onClick:()=>hs(n),style:{padding:"4px 10px",fontSize:"12px",border:a?"1px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #ddd)",borderRadius:"var(--radius-2xl, 16px)",background:a?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, #fff)",color:a?"var(--color-primary, #2E7D32)":"var(--color-text-secondary, #666)",cursor:"pointer",fontWeight:a?"500":"400"},children:o.label},n)}),ue.value.size>0&&e("button",{onClick:()=>{ue.value=new Set},style:{padding:"4px 10px",fontSize:"var(--font-size-sm, 12px)",border:"1px solid var(--color-error, #f44336)",borderRadius:"var(--radius-2xl, 16px)",background:"var(--color-bg-card, #fff)",color:"var(--color-error, #f44336)",cursor:"pointer"},children:"Clear"})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin: 0;",children:[qe.value?"Grouped by play date":"Grouped by when changes were made",ue.value.size>0&&` (${t.length} filtered)`]}),e("label",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); cursor: pointer; display: flex; align-items: center; gap: 4px;",children:[e("input",{type:"checkbox",checked:qe.value,onChange:n=>{qe.value=n.target.checked}}),"Group by Play Date"]})]}),e("div",{children:Pn.value?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:"Loading..."}):t.length===0?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:ue.value.size>0?"No matching activities":"No activity recorded yet"}):Object.entries(r).sort(([n],[o])=>o.localeCompare(n)).map(([n,o])=>e("div",{children:[e("div",{style:"font-weight: bold; color: var(--color-text-secondary, #666); margin-top: 12px; padding-bottom: 4px; border-bottom: 1px solid var(--color-border, #ddd);",children:H(n)}),o.map((a,i)=>e("div",{style:"padding: 10px; background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-md, 6px); font-size: var(--font-size-base, 14px); margin-top: 8px; position: relative;",children:e("div",{style:"display: flex; align-items: flex-start; gap: 6px;",children:[e("span",{children:ps(a.action)}),e("div",{style:"flex: 1;",children:[e("div",{style:"white-space: pre-wrap;",children:us(a)}),a.arrangementDetails&&e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-top: 4px; background: var(--color-bg-card, #fff); padding: 6px 8px; border-radius: var(--radius-sm, 4px); border: 1px solid var(--color-border, #e0e0e0);",children:a.arrangementDetails}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #999); margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap;",children:[e("span",{children:ds(a.timestamp)}),qe.value?e("span",{style:"color: var(--color-text-secondary, #666);",children:["changed on ",H(new Date(a.timestamp).toISOString().split("T")[0])]}):e("span",{style:"color: var(--color-primary, #2C6E49);",children:["for ",H(a.date)]})]})]}),e("button",{onClick:()=>cs(a),title:"Remove this activity",style:{background:"none",border:"none",padding:"var(--spacing-xs, 4px)",cursor:"pointer",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-lg, 16px)",lineHeight:"1",borderRadius:"var(--radius-sm, 4px)"},className:"hover-danger",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})},i))]},n))})]})}function wo(){const t=C.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function fs(){const[t,r]=Me(wo()),[n,o]=Me(null);P(()=>{const s=setInterval(()=>{r(wo())},1e3);return()=>clearInterval(s)},[]);const a=k.value&&K.value?K.value[k.value]:null,i=()=>{if(confirm("Change user? This will clear your current session.")){const s=C.value;s&&localStorage.removeItem(`sessionUser_${s}`),k.value="",w("Please select your name","info"),Jt.value=!0}},l=()=>{const s=C.value;s&&(sessionStorage.removeItem(`adminAuth_${s}`),r(!1),w("Logged out of admin mode","info"))};return e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[e("h2",{style:"margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);",children:"Profile"}),e("button",{onClick:()=>k.value&&ca(k.value),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left",marginBottom:"var(--spacing-2xl, 16px)"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:k.value||"Not set"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:a?.phone||a?.email?[a?.phone,a?.email].filter(Boolean).join(" • "):"Tap to add contact info"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("div",{style:"display: flex; flex-direction: column; gap: var(--spacing-md, 8px);",children:[t&&e(A,{children:[e("button",{onClick:()=>o("settings"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Group Settings"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Name, PIN, location, and other settings"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("activity"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Activity History"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"View recent check-ins and changes"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("insights"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Group Insights"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Game stats, player activity, and trends"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:l,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-warning-light, #FFF3E0)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-warning, #FF9800)",children:e("path",{d:"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-warning, #FF9800);",children:"Exit Admin Mode"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Return to regular user view"})]})]})]}),!t&&e("button",{onClick:()=>{Nt.value=!0},style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-warning-light, #FFF3E0)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-warning, #FF9800)",children:e("path",{d:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Admin Login"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Access group settings and member management"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o("help"),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Help & Support"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"How to use the app and get support"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:i,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left",marginTop:t?"var(--spacing-md, 8px)":"0"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Change User"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Switch to a different account"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-disabled, #aaa); text-align: center; margin-top: var(--spacing-4xl, 32px);",children:["Tennis Coordinator ",e("a",{href:"/release-notes.html",target:"_blank",style:"color: var(--color-primary, #2C6E49); text-decoration: none;",children:"v1.0.0"})]}),e(mr,{title:"Group Settings",isOpen:n==="settings",onBack:()=>o(null),children:e(ls,{})}),e(mr,{title:"Activity History",isOpen:n==="activity",onBack:()=>o(null),children:e(vs,{})}),e(mr,{title:"Group Insights",isOpen:n==="insights",onBack:()=>o(null),children:e(ns,{})}),e(mr,{title:"Help & Support",isOpen:n==="help",onBack:()=>o(null),children:e(os,{})})]})}const Wr=v(!1),Vr=v(""),B=v("both");v(!1);v(!1);const Ze=v(""),_t=v(""),Ar=v(""),Rr=v(""),Tr=v(""),ms=v(""),ke=v(!0),O=v(""),U=v("");v(!0);const Ke=v(!1),ge=v(!1),ve=v(null);function xs(){Oa(),Ua(),Ha(),oi(),P(()=>{const n=C.value;if(n){if(sessionStorage.getItem("siteAdminAuth")==="true"){Ke.value=!0;return}const a=`pinAuth_${n}`,i=sessionStorage.getItem(a)==="true";Ke.value=i}},[C.value]),P(()=>{E.value=Fa()},[]),P(()=>{const n=C.value;if(n){const o=localStorage.getItem(`sessionUser_${n}`);o?k.value=o:Ke.value&&(Jt.value=!0)}},[C.value,Ke.value]);const t=()=>{const n=C.value;n&&sessionStorage.setItem(`pinAuth_${n}`,"true"),Ke.value=!0,window.scrollTo(0,0),k.value||(Jt.value=!0)},r=!Ke.value&&!!I.value.groupPin;return e(A,{children:[e(hi,{isOpen:r,groupName:G.value,correctPin:I.value.groupPin,onSuccess:t}),e(Oi,{}),e(xi,{}),e($i,{}),e(Fi,{}),e(Ai,{}),e("div",{class:"container",id:"appContainer",style:r?"filter: blur(5px); pointer-events: none;":"",children:[e(ui,{}),e("div",{style:"padding-bottom: 80px;",children:[oe.value==="checkin"&&e(Dl,{}),oe.value==="matches"&&e(Hl,{}),oe.value==="notifications"&&e(Xl,{}),oe.value==="directory"&&e(ts,{}),oe.value==="profile"&&e(fs,{})]})]}),e(Ki,{}),e(ci,{}),e(Qi,{}),e(Zi,{}),e(el,{}),e(ol,{})]})}const xr=v(!1),X=v({}),ko=v(!0),vn=v(null),Ee=v(null),br=v(null),yt=v(""),Je=v(!1),Se=v(null),yr=v("");function bs(){P(()=>{t()},[]);async function t(){try{const f=(await R().ref("siteSettings").once("value")).val();vn.value=f?.siteAdminPin||null,sessionStorage.getItem("siteAdminAuth")==="true"&&(xr.value=!0,await r())}catch(u){console.error("Error initializing admin page:",u),w("Failed to initialize","error")}finally{ko.value=!1}}async function r(){try{const p=await R().ref("groups").once("value");X.value=p.val()||{}}catch(u){console.error("Error loading groups:",u),w("Failed to load groups","error")}}function n(u){u.preventDefault(),Ee.value=null;const f=u.target.querySelector("input"),m=f.value.trim();if(!m){Ee.value="Please enter a PIN";return}if(!vn.value){Ee.value="Site admin PIN not configured. Please set siteAdminPin in siteSettings in Firebase.";return}m===vn.value?(sessionStorage.setItem("siteAdminAuth","true"),xr.value=!0,Ee.value=null,r()):(Ee.value="Incorrect PIN. Please try again.",f.value="",f.focus())}function o(){sessionStorage.removeItem("siteAdminAuth"),xr.value=!1,X.value={}}function a(){window.location.hash="",window.location.reload()}function i(u){br.value===u?br.value=null:(br.value=u,yt.value="")}async function l(u){const p=yt.value.trim();if(!p){w("Please enter a member name","error");return}Je.value=!0;try{const f=R(),m=X.value[u],b=m?.settings?.members||[];if(b.some(y=>y.toLowerCase()===p.toLowerCase())){w("Member already exists","error"),Je.value=!1;return}const x=[...b,p];await f.ref(`groups/${u}/settings/members`).set(x),X.value={...X.value,[u]:{...m,settings:{...m?.settings,members:x}}},yt.value="",w(`Added ${p} to the group`,"success")}catch(f){console.error("Error adding member:",f),w("Failed to add member","error")}finally{Je.value=!1}}async function s(u,p){if(confirm(`Remove ${p} from this group?`))try{const f=R(),m=X.value[u],x=(m?.settings?.members||[]).filter(y=>y!==p);await f.ref(`groups/${u}/settings/members`).set(x),X.value={...X.value,[u]:{...m,settings:{...m?.settings,members:x}}},w(`Removed ${p}`,"success")}catch(f){console.error("Error removing member:",f),w("Failed to remove member","error")}}function c(u,p){Se.value={groupId:u,originalName:p},yr.value=p}async function d(){const u=Se.value;if(!u)return;const p=yr.value.trim();if(!p){w("Name cannot be empty","error");return}if(p===u.originalName){Se.value=null;return}const f=X.value[u.groupId],m=f?.settings?.members||[];if(m.some(b=>b.toLowerCase()===p.toLowerCase()&&b!==u.originalName)){w("A member with this name already exists","error");return}try{const b=R(),x=m.map($=>$===u.originalName?p:$);await b.ref(`groups/${u.groupId}/settings/members`).set(x);const y=f?.settings?.memberDetails||{};if(y[u.originalName]){const $=y[u.originalName];await b.ref(`groups/${u.groupId}/settings/memberDetails/${u.originalName}`).remove(),await b.ref(`groups/${u.groupId}/settings/memberDetails/${p}`).set($);const T={...y};T[p]=$,delete T[u.originalName],X.value={...X.value,[u.groupId]:{...f,settings:{...f?.settings,members:x,memberDetails:T}}}}else X.value={...X.value,[u.groupId]:{...f,settings:{...f?.settings,members:x}}};const z=(await b.ref(`groups/${u.groupId}/checkins`).once("value")).val()||{};for(const[$,T]of Object.entries(z))if(T&&typeof T=="object"){const Q=Object.values(T);let me=!1;const xe=Q.map(le=>le&&le.name===u.originalName?(me=!0,{...le,name:p}):le);me&&await b.ref(`groups/${u.groupId}/checkins/${$}`).set(xe)}Se.value=null,w(`Renamed ${u.originalName} to ${p}`,"success")}catch(b){console.error("Error renaming member:",b),w("Failed to rename member","error")}}if(ko.value)return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-container",children:e("div",{class:"site-admin-loading",children:[e("div",{class:"loading-spinner-icon"}),e("p",{children:"Loading..."})]})})});if(!xr.value)return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-container",children:e("div",{class:"site-admin-login-card",children:[e("div",{class:"site-admin-header",children:[e("span",{class:"site-admin-icon",children:"🔐"}),e("h1",{children:"Site Administration"}),e("p",{class:"site-admin-subtitle",children:"Tennis Coordinator Platform"})]}),e("form",{onSubmit:n,class:"site-admin-form",children:[e("div",{class:"form-group",children:[e("label",{for:"admin-pin",children:"Administrator PIN"}),e("input",{id:"admin-pin",type:"password",placeholder:"Enter your PIN",class:"site-admin-input",autoFocus:!0})]}),Ee.value&&e("div",{class:"site-admin-error",children:[e("span",{class:"error-icon",children:"⚠️"}),Ee.value]}),e("button",{type:"submit",class:"site-admin-submit",children:"Sign In"})]}),e("div",{class:"site-admin-footer",children:e("button",{onClick:a,class:"back-to-home",children:"← Back to Home"})})]})})});const g=Object.entries(X.value),h=g.reduce((u,[,p])=>u+(p.settings?.members?.length||0),0);return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-dashboard",children:[e("header",{class:"site-admin-dashboard-header",children:[e("div",{class:"header-left",children:[e("h1",{children:"🎾 Site Administration"}),e("p",{class:"header-subtitle",children:"Tennis Coordinator Platform"})]}),e("button",{onClick:o,class:"logout-button",children:"Sign Out"})]}),e("div",{class:"site-admin-stats",children:[e("div",{class:"stat-card",children:[e("span",{class:"stat-value",children:g.length}),e("span",{class:"stat-label",children:"Tennis Groups"})]}),e("div",{class:"stat-card",children:[e("span",{class:"stat-value",children:h}),e("span",{class:"stat-label",children:"Total Members"})]})]}),e("section",{class:"site-admin-section",children:[e("h2",{children:"All Tennis Groups"}),g.length===0?e("div",{class:"empty-state",children:e("p",{children:"No tennis groups have been created yet."})}):e("div",{class:"groups-grid",children:g.map(([u,p])=>{const f=p.settings?.members||[],m=br.value===u;return e("div",{class:`group-card ${m?"expanded":""}`,children:[e("div",{class:"group-card-header",children:[e("h3",{children:p.settings?.groupName||u}),e("span",{class:"group-id",children:["#",u]})]}),e("div",{class:"group-card-body",children:[e("div",{class:"group-stat",children:[e("span",{class:"group-stat-icon",children:"👥"}),e("span",{children:[f.length," members"]})]}),p.settings?.location?.name&&e("div",{class:"group-stat",children:[e("span",{class:"group-stat-icon",children:"📍"}),e("span",{children:p.settings.location.name})]})]}),m&&e("div",{class:"group-members-section",children:[e("div",{class:"members-header",children:e("h4",{children:"Members"})}),e("div",{class:"add-member-form",children:[e("input",{type:"text",placeholder:"Enter member name",value:yt.value,onInput:b=>{yt.value=b.target.value},onKeyDown:b=>{b.key==="Enter"&&(b.preventDefault(),l(u))},class:"member-input",disabled:Je.value}),e("button",{onClick:()=>l(u),class:"add-member-btn",disabled:Je.value,children:Je.value?"...":"Add"})]}),e("div",{class:"members-list",children:f.length===0?e("p",{class:"no-members",children:"No members yet. Add the first member above."}):f.map(b=>{const x=Se.value?.groupId===u&&Se.value?.originalName===b;return e("div",{class:"member-item",children:x?e(A,{children:[e("input",{type:"text",value:yr.value,onInput:y=>{yr.value=y.target.value},onKeyDown:y=>{y.key==="Enter"?(y.preventDefault(),d()):y.key==="Escape"&&(Se.value=null)},class:"edit-member-input",autoFocus:!0}),e("button",{onClick:d,class:"save-member-btn",title:"Save",children:"✓"}),e("button",{onClick:()=>{Se.value=null},class:"cancel-edit-btn",title:"Cancel",children:"✕"})]}):e(A,{children:[e("span",{class:"member-name",children:b}),e("button",{onClick:()=>c(u,b),class:"edit-member-btn",title:"Edit name",children:"✎"}),e("button",{onClick:()=>s(u,b),class:"remove-member-btn",title:"Remove member",children:"×"})]})},b)})})]}),e("div",{class:"group-card-footer",children:[e("button",{onClick:()=>i(u),class:"manage-members-btn",children:m?"Hide Members":"Manage Members"}),e("a",{href:`#${u}`,class:"view-group-link",onClick:b=>{b.preventDefault(),window.location.hash=u,window.location.reload()},children:"View Group →"})]})]},u)})})]})]})})}function ys({message:t,type:r}){const n=()=>{switch(r){case"success":return"✓";case"error":return"✕";default:return"ℹ"}};return e("div",{class:`toast toast-${r}`,children:[e("span",{class:"toast-icon",children:n()}),e("span",{class:"toast-message",children:t})]})}const C=v(null),G=v(""),E=v(null),k=v(""),_o=v(!0),Ct=v([]),J=v({}),V=v([]),K=v({}),ws=ut(()=>E.value?J.value[E.value]||[]:[]);let ks=0;function w(t,r="info"){const n=++ks;Ct.value=[...Ct.value,{id:n,message:t,type:r}],setTimeout(()=>{Ct.value=Ct.value.filter(o=>o.id!==n)},3e3)}async function wr(t){try{const o=(await R().ref("groups").once("value")).val()||{};for(const[a,i]of Object.entries(o))if(i.settings&&i.settings.shortCode===t)return console.log(`[resolveShortCode] Resolved "${t}" to group ID: ${a}`),a;return console.log(`[resolveShortCode] No match found for "${t}", using as-is`),null}catch(r){return console.error("[resolveShortCode] Error:",r),null}}async function _s(){const t=sessionStorage.getItem("redirect");if(t){sessionStorage.removeItem("redirect");const s=t.replace(/^\/+|\/+$/g,"");if(s==="admin")return history.replaceState(null,"",t),"admin";if(s&&s!=="index.html"&&s!=="app.html")return history.replaceState(null,"",t),await wr(s)||s}const r=window.location.hash.replace(/^#\/?/,"");if(r&&r!=="admin")return await wr(r)||r;if(r==="admin")return"admin";const o=new URLSearchParams(window.location.search).get("group");if(o)return await wr(o)||o;const i=window.location.pathname.replace(/^\/+|\/+$/g,"");return i==="admin"?"admin":!i||i==="index.html"||i==="app.html"?null:await wr(i)||i}function Cs(){return P(()=>{async function t(){try{Jo();const r=await _s();if(C.value=r,r&&r!=="admin"){const n=localStorage.getItem(`sessionUser_${r}`);n&&(k.value=n)}}catch(r){console.error("Initialization error:",r),w("Failed to initialize app","error")}finally{_o.value=!1}}t()},[]),_o.value?e(ml,{text:"Loading..."}):e(A,{children:[C.value===null&&e(La,{}),C.value==="admin"&&e(bs,{}),C.value&&C.value!=="admin"&&e(xs,{}),e("div",{class:"toast-container",children:Ct.value.map(t=>e(ys,{message:t.message,type:t.type},t.id))})]})}function zs(){const r=new URLSearchParams(window.location.search).get("group");if(r)return r;const o=window.location.pathname.replace(/^\/+|\/+$/g,"").split("/").filter(Boolean);return o.length>0&&o[0]!=="index.html"&&o[0]!=="app.html"?o[0]:null}const Ss={ttmd:"Midday Tennis"};function $s(){const t=zs();if(t){const r=Ss[t]||"Tennis",n={name:r,short_name:r.length>12?r.split(" ")[0]:r,description:"Tennis match coordination and check-in system",display:"standalone",background_color:"#ffffff",theme_color:"#4CAF50",orientation:"portrait-primary",start_url:`/${t}`,scope:"/",icons:[{src:"/assets/icon-192.png",sizes:"192x192",type:"image/png",purpose:"any maskable"},{src:"/assets/icon-512.png",sizes:"512x512",type:"image/png",purpose:"any maskable"},{src:"/assets/apple-touch-icon.png",sizes:"180x180",type:"image/png",purpose:"any"}]},o=new Blob([JSON.stringify(n)],{type:"application/json"}),a=URL.createObjectURL(o),i=document.getElementById("manifestLink");i&&(i.href=a);let l=document.querySelector('meta[name="apple-mobile-web-app-title"]');l?l.setAttribute("content",r):(l=document.createElement("meta"),l.setAttribute("name","apple-mobile-web-app-title"),l.setAttribute("content",r),document.head.appendChild(l)),document.title=r}}$s();Ca(e(Cs,{}),document.getElementById("app"));
