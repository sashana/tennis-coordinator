(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();var Rr,D,so,co,Ae,Nn,po,uo,ho,kn,rn,nn,Dt={},fo=[],oi=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Tr=Array.isArray;function ye(t,r){for(var n in r)t[n]=r[n];return t}function _n(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function ii(t,r,n){var o,i,a,l={};for(a in r)a=="key"?o=r[a]:a=="ref"?i=r[a]:l[a]=r[a];if(arguments.length>2&&(l.children=arguments.length>3?Rr.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(a in t.defaultProps)l[a]===void 0&&(l[a]=t.defaultProps[a]);return dr(t,l,o,i,null)}function dr(t,r,n,o,i){var a={type:t,props:r,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++so,__i:-1,__u:0};return i==null&&D.vnode!=null&&D.vnode(a),a}function R(t){return t.children}function bt(t,r){this.props=t,this.context=r}function ot(t,r){if(r==null)return t.__?ot(t.__,t.__i+1):null;for(var n;r<t.__k.length;r++)if((n=t.__k[r])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?ot(t):null}function go(t){var r,n;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,r=0;r<t.__k.length;r++)if((n=t.__k[r])!=null&&n.__e!=null){t.__e=t.__c.base=n.__e;break}return go(t)}}function Ln(t){(!t.__d&&(t.__d=!0)&&Ae.push(t)&&!kr.__r++||Nn!=D.debounceRendering)&&((Nn=D.debounceRendering)||po)(kr)}function kr(){for(var t,r,n,o,i,a,l,s=1;Ae.length;)Ae.length>s&&Ae.sort(uo),t=Ae.shift(),s=Ae.length,t.__d&&(n=void 0,o=void 0,i=(o=(r=t).__v).__e,a=[],l=[],r.__P&&((n=ye({},o)).__v=o.__v+1,D.vnode&&D.vnode(n),Cn(r.__P,n,o,r.__n,r.__P.namespaceURI,32&o.__u?[i]:null,a,i??ot(o),!!(32&o.__u),l),n.__v=o.__v,n.__.__k[n.__i]=n,xo(a,n,l),o.__e=o.__=null,n.__e!=i&&go(n)));kr.__r=0}function vo(t,r,n,o,i,a,l,s,d,c,f){var u,h,p,g,m,b,x,y=o&&o.__k||fo,C=r.length;for(d=ai(n,r,y,d,C),u=0;u<C;u++)(p=n.__k[u])!=null&&(h=p.__i==-1?Dt:y[p.__i]||Dt,p.__i=u,b=Cn(t,p,h,i,a,l,s,d,c,f),g=p.__e,p.ref&&h.ref!=p.ref&&(h.ref&&Sn(h.ref,null,p),f.push(p.ref,p.__c||g,p)),m==null&&g!=null&&(m=g),(x=!!(4&p.__u))||h.__k===p.__k?d=mo(p,d,t,x):typeof p.type=="function"&&b!==void 0?d=b:g&&(d=g.nextSibling),p.__u&=-7);return n.__e=m,d}function ai(t,r,n,o,i){var a,l,s,d,c,f=n.length,u=f,h=0;for(t.__k=new Array(i),a=0;a<i;a++)(l=r[a])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=t.__k[a]=dr(null,l,null,null,null):Tr(l)?l=t.__k[a]=dr(R,{children:l},null,null,null):l.constructor==null&&l.__b>0?l=t.__k[a]=dr(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):t.__k[a]=l,d=a+h,l.__=t,l.__b=t.__b+1,(c=l.__i=li(l,n,d,u))!=-1&&(u--,(s=n[c])&&(s.__u|=2)),s==null||s.__v==null?(c==-1&&(i>f?h--:i<f&&h++),typeof l.type!="function"&&(l.__u|=4)):c!=d&&(c==d-1?h--:c==d+1?h++:(c>d?h--:h++,l.__u|=4))):t.__k[a]=null;if(u)for(a=0;a<f;a++)(s=n[a])!=null&&(2&s.__u)==0&&(s.__e==o&&(o=ot(s)),yo(s,s));return o}function mo(t,r,n,o){var i,a;if(typeof t.type=="function"){for(i=t.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=t,r=mo(i[a],r,n,o));return r}t.__e!=r&&(o&&(r&&t.type&&!r.parentNode&&(r=ot(t)),n.insertBefore(t.__e,r||null)),r=t.__e);do r=r&&r.nextSibling;while(r!=null&&r.nodeType==8);return r}function li(t,r,n,o){var i,a,l,s=t.key,d=t.type,c=r[n],f=c!=null&&(2&c.__u)==0;if(c===null&&s==null||f&&s==c.key&&d==c.type)return n;if(o>(f?1:0)){for(i=n-1,a=n+1;i>=0||a<r.length;)if((c=r[l=i>=0?i--:a++])!=null&&(2&c.__u)==0&&s==c.key&&d==c.type)return l}return-1}function Fn(t,r,n){r[0]=="-"?t.setProperty(r,n??""):t[r]=n==null?"":typeof n!="number"||oi.test(r)?n:n+"px"}function Xt(t,r,n,o,i){var a,l;e:if(r=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof o=="string"&&(t.style.cssText=o=""),o)for(r in o)n&&r in n||Fn(t.style,r,"");if(n)for(r in n)o&&n[r]==o[r]||Fn(t.style,r,n[r])}else if(r[0]=="o"&&r[1]=="n")a=r!=(r=r.replace(ho,"$1")),l=r.toLowerCase(),r=l in t||r=="onFocusOut"||r=="onFocusIn"?l.slice(2):r.slice(2),t.l||(t.l={}),t.l[r+a]=n,n?o?n.u=o.u:(n.u=kn,t.addEventListener(r,a?nn:rn,a)):t.removeEventListener(r,a?nn:rn,a);else{if(i=="http://www.w3.org/2000/svg")r=r.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(r!="width"&&r!="height"&&r!="href"&&r!="list"&&r!="form"&&r!="tabIndex"&&r!="download"&&r!="rowSpan"&&r!="colSpan"&&r!="role"&&r!="popover"&&r in t)try{t[r]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&r[4]!="-"?t.removeAttribute(r):t.setAttribute(r,r=="popover"&&n==1?"":n))}}function Bn(t){return function(r){if(this.l){var n=this.l[r.type+t];if(r.t==null)r.t=kn++;else if(r.t<n.u)return;return n(D.event?D.event(r):r)}}}function Cn(t,r,n,o,i,a,l,s,d,c){var f,u,h,p,g,m,b,x,y,C,S,z,A,Q,ge,ve,ie,G=r.type;if(r.constructor!=null)return null;128&n.__u&&(d=!!(32&n.__u),a=[s=r.__e=n.__e]),(f=D.__b)&&f(r);e:if(typeof G=="function")try{if(x=r.props,y="prototype"in G&&G.prototype.render,C=(f=G.contextType)&&o[f.__c],S=f?C?C.props.value:f.__:o,n.__c?b=(u=r.__c=n.__c).__=u.__E:(y?r.__c=u=new G(x,S):(r.__c=u=new bt(x,S),u.constructor=G,u.render=ci),C&&C.sub(u),u.state||(u.state={}),u.__n=o,h=u.__d=!0,u.__h=[],u._sb=[]),y&&u.__s==null&&(u.__s=u.state),y&&G.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=ye({},u.__s)),ye(u.__s,G.getDerivedStateFromProps(x,u.__s))),p=u.props,g=u.state,u.__v=r,h)y&&G.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),y&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(y&&G.getDerivedStateFromProps==null&&x!==p&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(x,S),r.__v==n.__v||!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(x,u.__s,S)===!1){for(r.__v!=n.__v&&(u.props=x,u.state=u.__s,u.__d=!1),r.__e=n.__e,r.__k=n.__k,r.__k.some(function(me){me&&(me.__=r)}),z=0;z<u._sb.length;z++)u.__h.push(u._sb[z]);u._sb=[],u.__h.length&&l.push(u);break e}u.componentWillUpdate!=null&&u.componentWillUpdate(x,u.__s,S),y&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(p,g,m)})}if(u.context=S,u.props=x,u.__P=t,u.__e=!1,A=D.__r,Q=0,y){for(u.state=u.__s,u.__d=!1,A&&A(r),f=u.render(u.props,u.state,u.context),ge=0;ge<u._sb.length;ge++)u.__h.push(u._sb[ge]);u._sb=[]}else do u.__d=!1,A&&A(r),f=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++Q<25);u.state=u.__s,u.getChildContext!=null&&(o=ye(ye({},o),u.getChildContext())),y&&!h&&u.getSnapshotBeforeUpdate!=null&&(m=u.getSnapshotBeforeUpdate(p,g)),ve=f,f!=null&&f.type===R&&f.key==null&&(ve=bo(f.props.children)),s=vo(t,Tr(ve)?ve:[ve],r,n,o,i,a,l,s,d,c),u.base=r.__e,r.__u&=-161,u.__h.length&&l.push(u),b&&(u.__E=u.__=null)}catch(me){if(r.__v=null,d||a!=null)if(me.then){for(r.__u|=d?160:128;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;a[a.indexOf(s)]=null,r.__e=s}else{for(ie=a.length;ie--;)_n(a[ie]);on(r)}else r.__e=n.__e,r.__k=n.__k,me.then||on(r);D.__e(me,r,n)}else a==null&&r.__v==n.__v?(r.__k=n.__k,r.__e=n.__e):s=r.__e=si(n.__e,r,n,o,i,a,l,d,c);return(f=D.diffed)&&f(r),128&r.__u?void 0:s}function on(t){t&&t.__c&&(t.__c.__e=!0),t&&t.__k&&t.__k.forEach(on)}function xo(t,r,n){for(var o=0;o<n.length;o++)Sn(n[o],n[++o],n[++o]);D.__c&&D.__c(r,t),t.some(function(i){try{t=i.__h,i.__h=[],t.some(function(a){a.call(i)})}catch(a){D.__e(a,i.__v)}})}function bo(t){return typeof t!="object"||t==null||t.__b&&t.__b>0?t:Tr(t)?t.map(bo):ye({},t)}function si(t,r,n,o,i,a,l,s,d){var c,f,u,h,p,g,m,b=n.props||Dt,x=r.props,y=r.type;if(y=="svg"?i="http://www.w3.org/2000/svg":y=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),a!=null){for(c=0;c<a.length;c++)if((p=a[c])&&"setAttribute"in p==!!y&&(y?p.localName==y:p.nodeType==3)){t=p,a[c]=null;break}}if(t==null){if(y==null)return document.createTextNode(x);t=document.createElementNS(i,y,x.is&&x),s&&(D.__m&&D.__m(r,a),s=!1),a=null}if(y==null)b===x||s&&t.data==x||(t.data=x);else{if(a=a&&Rr.call(t.childNodes),!s&&a!=null)for(b={},c=0;c<t.attributes.length;c++)b[(p=t.attributes[c]).name]=p.value;for(c in b)if(p=b[c],c!="children"){if(c=="dangerouslySetInnerHTML")u=p;else if(!(c in x)){if(c=="value"&&"defaultValue"in x||c=="checked"&&"defaultChecked"in x)continue;Xt(t,c,null,p,i)}}for(c in x)p=x[c],c=="children"?h=p:c=="dangerouslySetInnerHTML"?f=p:c=="value"?g=p:c=="checked"?m=p:s&&typeof p!="function"||b[c]===p||Xt(t,c,p,b[c],i);if(f)s||u&&(f.__html==u.__html||f.__html==t.innerHTML)||(t.innerHTML=f.__html),r.__k=[];else if(u&&(t.innerHTML=""),vo(r.type=="template"?t.content:t,Tr(h)?h:[h],r,n,o,y=="foreignObject"?"http://www.w3.org/1999/xhtml":i,a,l,a?a[0]:n.__k&&ot(n,0),s,d),a!=null)for(c=a.length;c--;)_n(a[c]);s||(c="value",y=="progress"&&g==null?t.removeAttribute("value"):g!=null&&(g!==t[c]||y=="progress"&&!g||y=="option"&&g!=b[c])&&Xt(t,c,g,b[c],i),c="checked",m!=null&&m!=t[c]&&Xt(t,c,m,b[c],i))}return t}function Sn(t,r,n){try{if(typeof t=="function"){var o=typeof t.__u=="function";o&&t.__u(),o&&r==null||(t.__u=t(r))}else t.current=r}catch(i){D.__e(i,n)}}function yo(t,r,n){var o,i;if(D.unmount&&D.unmount(t),(o=t.ref)&&(o.current&&o.current!=t.__e||Sn(o,null,r)),(o=t.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(a){D.__e(a,r)}o.base=o.__P=null}if(o=t.__k)for(i=0;i<o.length;i++)o[i]&&yo(o[i],r,n||typeof t.type!="function");n||_n(t.__e),t.__c=t.__=t.__e=void 0}function ci(t,r,n){return this.constructor(t,n)}function di(t,r,n){var o,i,a,l;r==document&&(r=document.documentElement),D.__&&D.__(t,r),i=(o=!1)?null:r.__k,a=[],l=[],Cn(r,t=r.__k=ii(R,null,[t]),i||Dt,Dt,r.namespaceURI,i?null:r.firstChild?Rr.call(r.childNodes):null,a,i?i.__e:r.firstChild,o,l),xo(a,t,l)}Rr=fo.slice,D={__e:function(t,r,n,o){for(var i,a,l;r=r.__;)if((i=r.__c)&&!i.__)try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(t)),l=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(t,o||{}),l=i.__d),l)return i.__E=i}catch(s){t=s}throw t}},so=0,co=function(t){return t!=null&&t.constructor==null},bt.prototype.setState=function(t,r){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=ye({},this.state),typeof t=="function"&&(t=t(ye({},n),this.props)),t&&ye(n,t),t!=null&&this.__v&&(r&&this._sb.push(r),Ln(this))},bt.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ln(this))},bt.prototype.render=R,Ae=[],po=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,uo=function(t,r){return t.__v.__b-r.__v.__b},kr.__r=0,ho=/(PointerCapture)$|Capture$/i,kn=0,rn=Bn(!1),nn=Bn(!0);var pi=0;function e(t,r,n,o,i,a){r||(r={});var l,s,d=r;if("ref"in d)for(s in d={},r)s=="ref"?l=r[s]:d[s]=r[s];var c={type:t,props:d,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--pi,__i:-1,__u:0,__source:i,__self:a};if(typeof t=="function"&&(l=t.defaultProps))for(s in l)d[s]===void 0&&(d[s]=l[s]);return D.vnode&&D.vnode(c),c}var Et,N,jr,jn,_r=0,wo=[],F=D,On=F.__b,Un=F.__r,Hn=F.diffed,Wn=F.__c,Vn=F.unmount,Gn=F.__;function zn(t,r){F.__h&&F.__h(N,t,_r||r),_r=0;var n=N.__H||(N.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function we(t){return _r=1,ui(So,t)}function ui(t,r,n){var o=zn(Et++,2);if(o.t=t,!o.__c&&(o.__=[So(void 0,r),function(s){var d=o.__N?o.__N[0]:o.__[0],c=o.t(d,s);d!==c&&(o.__N=[c,o.__[1]],o.__c.setState({}))}],o.__c=N,!N.__f)){var i=function(s,d,c){if(!o.__c.__H)return!0;var f=o.__c.__H.__.filter(function(h){return!!h.__c});if(f.every(function(h){return!h.__N}))return!a||a.call(this,s,d,c);var u=o.__c.props!==s;return f.forEach(function(h){if(h.__N){var p=h.__[0];h.__=h.__N,h.__N=void 0,p!==h.__[0]&&(u=!0)}}),a&&a.call(this,s,d,c)||u};N.__f=!0;var a=N.shouldComponentUpdate,l=N.componentWillUpdate;N.componentWillUpdate=function(s,d,c){if(this.__e){var f=a;a=void 0,i(s,d,c),a=f}l&&l.call(this,s,d,c)},N.shouldComponentUpdate=i}return o.__N||o.__}function L(t,r){var n=zn(Et++,3);!F.__s&&Co(n.__H,r)&&(n.__=t,n.u=r,N.__H.__h.push(n))}function ko(t){return _r=5,_o(function(){return{current:t}},[])}function _o(t,r){var n=zn(Et++,7);return Co(n.__H,r)&&(n.__=t(),n.__H=r,n.__h=t),n.__}function hi(){for(var t;t=wo.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(pr),t.__H.__h.forEach(an),t.__H.__h=[]}catch(r){t.__H.__h=[],F.__e(r,t.__v)}}F.__b=function(t){N=null,On&&On(t)},F.__=function(t,r){t&&r.__k&&r.__k.__m&&(t.__m=r.__k.__m),Gn&&Gn(t,r)},F.__r=function(t){Un&&Un(t),Et=0;var r=(N=t.__c).__H;r&&(jr===N?(r.__h=[],N.__h=[],r.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(r.__h.forEach(pr),r.__h.forEach(an),r.__h=[],Et=0)),jr=N},F.diffed=function(t){Hn&&Hn(t);var r=t.__c;r&&r.__H&&(r.__H.__h.length&&(wo.push(r)!==1&&jn===F.requestAnimationFrame||((jn=F.requestAnimationFrame)||fi)(hi)),r.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),jr=N=null},F.__c=function(t,r){r.some(function(n){try{n.__h.forEach(pr),n.__h=n.__h.filter(function(o){return!o.__||an(o)})}catch(o){r.some(function(i){i.__h&&(i.__h=[])}),r=[],F.__e(o,n.__v)}}),Wn&&Wn(t,r)},F.unmount=function(t){Vn&&Vn(t);var r,n=t.__c;n&&n.__H&&(n.__H.__.forEach(function(o){try{pr(o)}catch(i){r=i}}),n.__H=void 0,r&&F.__e(r,n.__v))};var Yn=typeof requestAnimationFrame=="function";function fi(t){var r,n=function(){clearTimeout(o),Yn&&cancelAnimationFrame(r),setTimeout(t)},o=setTimeout(n,35);Yn&&(r=requestAnimationFrame(n))}function pr(t){var r=N,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),N=r}function an(t){var r=N;t.__c=t.__(),N=r}function Co(t,r){return!t||t.length!==r.length||r.some(function(n,o){return n!==t[o]})}function So(t,r){return typeof r=="function"?r(t):r}var gi=Symbol.for("preact-signals");function Pr(){if($e>1)$e--;else{for(var t,r=!1;yt!==void 0;){var n=yt;for(yt=void 0,ln++;n!==void 0;){var o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&Io(n))try{n.c()}catch(i){r||(t=i,r=!0)}n=o}}if(ln=0,$e--,r)throw t}}function vi(t){if($e>0)return t();$e++;try{return t()}finally{Pr()}}var $=void 0;function zo(t){var r=$;$=void 0;try{return t()}finally{$=r}}var yt=void 0,$e=0,ln=0,Cr=0;function $o(t){if($!==void 0){var r=t.n;if(r===void 0||r.t!==$)return r={i:0,S:t,p:$.s,n:void 0,t:$,e:void 0,x:void 0,r},$.s!==void 0&&($.s.n=r),$.s=r,t.n=r,32&$.f&&t.S(r),r;if(r.i===-1)return r.i=0,r.n!==void 0&&(r.n.p=r.p,r.p!==void 0&&(r.p.n=r.n),r.p=$.s,r.n=void 0,$.s.n=r,$.s=r),r}}function V(t,r){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=r?.watched,this.Z=r?.unwatched,this.name=r?.name}V.prototype.brand=gi;V.prototype.h=function(){return!0};V.prototype.S=function(t){var r=this,n=this.t;n!==t&&t.e===void 0&&(t.x=n,this.t=t,n!==void 0?n.e=t:zo(function(){var o;(o=r.W)==null||o.call(r)}))};V.prototype.U=function(t){var r=this;if(this.t!==void 0){var n=t.e,o=t.x;n!==void 0&&(n.x=o,t.e=void 0),o!==void 0&&(o.e=n,t.x=void 0),t===this.t&&(this.t=o,o===void 0&&zo(function(){var i;(i=r.Z)==null||i.call(r)}))}};V.prototype.subscribe=function(t){var r=this;return oe(function(){var n=r.value,o=$;$=void 0;try{t(n)}finally{$=o}},{name:"sub"})};V.prototype.valueOf=function(){return this.value};V.prototype.toString=function(){return this.value+""};V.prototype.toJSON=function(){return this.value};V.prototype.peek=function(){var t=$;$=void 0;try{return this.value}finally{$=t}};Object.defineProperty(V.prototype,"value",{get:function(){var t=$o(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(ln>100)throw new Error("Cycle detected");this.v=t,this.i++,Cr++,$e++;try{for(var r=this.t;r!==void 0;r=r.x)r.t.N()}finally{Pr()}}}});function v(t,r){return new V(t,r)}function Io(t){for(var r=t.s;r!==void 0;r=r.n)if(r.S.i!==r.i||!r.S.h()||r.S.i!==r.i)return!0;return!1}function Mo(t){for(var r=t.s;r!==void 0;r=r.n){var n=r.S.n;if(n!==void 0&&(r.r=n),r.S.n=r,r.i=-1,r.n===void 0){t.s=r;break}}}function Do(t){for(var r=t.s,n=void 0;r!==void 0;){var o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):n=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=n}function je(t,r){V.call(this,void 0),this.x=t,this.s=void 0,this.g=Cr-1,this.f=4,this.W=r?.watched,this.Z=r?.unwatched,this.name=r?.name}je.prototype=new V;je.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Cr))return!0;if(this.g=Cr,this.f|=1,this.i>0&&!Io(this))return this.f&=-2,!0;var t=$;try{Mo(this),$=this;var r=this.x();(16&this.f||this.v!==r||this.i===0)&&(this.v=r,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return $=t,Do(this),this.f&=-2,!0};je.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var r=this.s;r!==void 0;r=r.n)r.S.S(r)}V.prototype.S.call(this,t)};je.prototype.U=function(t){if(this.t!==void 0&&(V.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var r=this.s;r!==void 0;r=r.n)r.S.U(r)}};je.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};Object.defineProperty(je.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=$o(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function it(t,r){return new je(t,r)}function Eo(t){var r=t.u;if(t.u=void 0,typeof r=="function"){$e++;var n=$;$=void 0;try{r()}catch(o){throw t.f&=-2,t.f|=8,$n(t),o}finally{$=n,Pr()}}}function $n(t){for(var r=t.s;r!==void 0;r=r.n)r.S.U(r);t.x=void 0,t.s=void 0,Eo(t)}function mi(t){if($!==this)throw new Error("Out-of-order effect");Do(this),$=t,this.f&=-2,8&this.f&&$n(this),Pr()}function ct(t,r){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=r?.name}ct.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var r=this.x();typeof r=="function"&&(this.u=r)}finally{t()}};ct.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Eo(this),Mo(this),$e++;var t=$;return $=this,mi.bind(this,t)};ct.prototype.N=function(){2&this.f||(this.f|=2,this.o=yt,yt=this)};ct.prototype.d=function(){this.f|=8,1&this.f||$n(this)};ct.prototype.dispose=function(){this.d()};function oe(t,r){var n=new ct(t,r);try{n.c()}catch(i){throw n.d(),i}var o=n.d.bind(n);return o[Symbol.dispose]=o,o}var Ao,Or,Nr=typeof window<"u"&&!!window.__PREACT_SIGNALS_DEVTOOLS__,Ro=[];oe(function(){Ao=this.N})();function dt(t,r){D[t]=r.bind(null,D[t]||function(){})}function Sr(t){Or&&Or(),Or=t&&t.S()}function To(t){var r=this,n=t.data,o=bi(n);o.value=n;var i=_o(function(){for(var s=r,d=r.__v;d=d.__;)if(d.__c){d.__c.__$f|=4;break}var c=it(function(){var p=o.value.value;return p===0?0:p===!0?"":p||""}),f=it(function(){return!Array.isArray(c.value)&&!co(c.value)}),u=oe(function(){if(this.N=Po,f.value){var p=c.value;s.__v&&s.__v.__e&&s.__v.__e.nodeType===3&&(s.__v.__e.data=p)}}),h=r.__$u.d;return r.__$u.d=function(){u(),h.call(this)},[f,c]},[]),a=i[0],l=i[1];return a.value?l.peek():l.value}To.displayName="ReactiveTextNode";Object.defineProperties(V.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:To},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});dt("__b",function(t,r){if(Nr&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),typeof r.type=="string"){var n,o=r.props;for(var i in o)if(i!=="children"){var a=o[i];a instanceof V&&(n||(r.__np=n={}),n[i]=a,o[i]=a.peek())}}t(r)});dt("__r",function(t,r){if(Nr&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.enterComponent(r),r.type!==R){Sr();var n,o=r.__c;o&&(o.__$f&=-2,(n=o.__$u)===void 0&&(o.__$u=n=(function(i){var a;return oe(function(){a=this}),a.c=function(){o.__$f|=1,o.setState({})},a})())),Sr(n)}t(r)});dt("__e",function(t,r,n,o){Nr&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),Sr(),t(r,n,o)});dt("diffed",function(t,r){Nr&&typeof r.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),Sr();var n;if(typeof r.type=="string"&&(n=r.__e)){var o=r.__np,i=r.props;if(o){var a=n.U;if(a)for(var l in a){var s=a[l];s!==void 0&&!(l in o)&&(s.d(),a[l]=void 0)}else a={},n.U=a;for(var d in o){var c=a[d],f=o[d];c===void 0?(c=xi(n,d,f,i),a[d]=c):c.o(f,i)}}}t(r)});function xi(t,r,n,o){var i=r in t&&t.ownerSVGElement===void 0,a=v(n);return{o:function(l,s){a.value=l,o=s},d:oe(function(){this.N=Po;var l=a.value.value;o[r]!==l&&(o[r]=l,i?t[r]=l:l!=null&&(l!==!1||r[4]==="-")?t.setAttribute(r,l):t.removeAttribute(r))})}}dt("unmount",function(t,r){if(typeof r.type=="string"){var n=r.__e;if(n){var o=n.U;if(o){n.U=void 0;for(var i in o){var a=o[i];a&&a.d()}}}}else{var l=r.__c;if(l){var s=l.__$u;s&&(l.__$u=void 0,s.d())}}t(r)});dt("__h",function(t,r,n,o){(o<3||o===9)&&(r.__$f|=2),t(r,n,o)});bt.prototype.shouldComponentUpdate=function(t,r){var n=this.__$u,o=n&&n.s!==void 0;for(var i in r)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var a=2&this.__$f;if(!(o||a||4&this.__$f)||1&this.__$f)return!0}else if(!(o||4&this.__$f)||3&this.__$f)return!0;for(var l in t)if(l!=="__source"&&t[l]!==this.props[l])return!0;for(var s in this.props)if(!(s in t))return!0;return!1};function bi(t,r){return we(function(){return v(t,r)})[0]}var yi=function(t){queueMicrotask(function(){queueMicrotask(t)})};function wi(){vi(function(){for(var t;t=Ro.shift();)Ao.call(t)})}function Po(){Ro.push(this)===1&&(D.requestAnimationFrame||yi)(wi)}const ki={apiKey:"AIzaSyCr-Ej5jeuV3kdvquu2W_R0ffSrUW0OUcQ",authDomain:"tennis-coordinator-43f53.firebaseapp.com",databaseURL:"https://tennis-coordinator-43f53-default-rtdb.firebaseio.com",projectId:"tennis-coordinator-43f53",storageBucket:"tennis-coordinator-43f53.firebasestorage.app",messagingSenderId:"665148711646",appId:"1:665148711646:web:66d14722800a12f5a3184f",measurementId:"G-J0KVB2Q93W"};let Ke=null;function No(){if(Ke)return Ke;try{return window.firebase.initializeApp(ki),Ke=window.firebase.database(),console.log("Firebase initialized successfully"),Ke}catch(t){throw console.error("Firebase initialization error:",t),t}}function T(){return Ke||No()}function _i(){return e("div",{class:"landing-page",children:e("div",{class:"landing-container",children:[e("h1",{children:"🎾 Tennis Coordinator"}),e("p",{class:"landing-tagline",children:"Turn your love for tennis into more games."}),e("p",{class:"landing-subtitle",children:"A simple tool that helps tennis groups self-organize matches with minimal friction—so you spend less time coordinating and more time on the court."}),e("div",{class:"landing-section",children:[e("h2",{children:"Why It Works"}),e("div",{class:"landing-features",children:[e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Frictionless"}),e("span",{children:"Check in with a few taps. No accounts, no apps to download."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Flexible"}),e("span",{children:"Handles doubles, singles, odd numbers, guests, and preferences."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Adaptable"}),e("span",{children:"Works for tight-knit groups of 20 or club communities of 50+."})]})]}),e("div",{class:"feature-item",children:[e("span",{class:"feature-icon",children:"♦"}),e("div",{children:[e("strong",{children:"Real-Time"}),e("span",{children:"Everyone sees who's playing instantly."})]})]})]})]}),e("div",{class:"landing-section landing-section-alt",children:[e("h2",{children:"How It Works"}),e("div",{class:"landing-steps",children:[e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"1"}),e("div",{children:[e("strong",{children:"Check In"}),e("span",{children:"Select your name, play style, and when you're available"})]})]}),e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"2"}),e("div",{children:[e("strong",{children:"Auto-Match"}),e("span",{children:"System organizes matches based on who's playing"})]})]}),e("div",{class:"step-item",children:[e("span",{class:"step-number",children:"3"}),e("div",{children:[e("strong",{children:"Play"}),e("span",{children:"Show up and enjoy the game"})]})]})]})]}),e("div",{class:"landing-cta",children:e("p",{children:"To access your tennis group, visit your group's unique URL or contact your group admin for the link."})}),e("div",{class:"landing-footer",children:e("a",{href:"#admin",class:"admin-link",onClick:t=>{t.preventDefault(),window.location.hash="admin",window.location.reload()},children:"Site Administrator? Access Site Admin →"})})]})})}function sn(t){return t.toLowerCase().trim().replace(/\s+/g," ")}function Zt(t){if(!t)return"";const[r,n]=t.split(":"),o=parseInt(r),i=o>=12?"PM":"AM";return`${o%12||12}:${n}${i}`}function se(t,r){return!t&&!r?"":t&&r?`${Zt(t)}-${Zt(r)}`:t?`from ${Zt(t)}`:r?`until ${Zt(r)}`:""}function Y(t){return new Date(t+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function qn(t){return new Date(t+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function Lo(t){const r=new Date(t),n=new Date,o=r.toDateString()===n.toDateString(),i=r.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});return o?i:`${r.toLocaleDateString("en-US",{month:"short",day:"numeric"})} ${i}`}function cn(t){const r=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${r}-${n}-${o}`}function Ci(){return cn(new Date)}function Kn(t,r){return r[sn(t)]||{include:[],exclude:[]}}function Si(t,r,n){const o=Kn(t,n),i=Kn(r,n),a=sn(t),l=sn(r);return!o.exclude.includes(l)&&!i.exclude.includes(a)}function zi(t,r){if(!t||!r||!t.start&&!t.end&&!r.start&&!r.end)return!0;const n=p=>{if(!p)return null;const[g,m]=p.split(":").map(Number);return g*60+m},o=n(t.start),i=n(t.end),a=n(r.start),l=n(r.end),s=360,d=1260,c=o??s,f=i??d,u=a??s;return c<(l??d)&&u<f}function ut(t,r,n){return Si(t.name,r.name,n)?zi(t.timeRange,r.timeRange):!1}function Lr(t,r={}){const n=[],o=[];let i=t.map((h,p)=>({...h,originalIndex:p}));i.sort((h,p)=>h.timestamp-p.timestamp);const a=i.filter(h=>h.playStyle==="doubles"),l=i.filter(h=>h.playStyle==="singles"),s=i.filter(h=>h.playStyle==="both"||!h.playStyle);let d=[...a,...s].sort((h,p)=>h.timestamp-p.timestamp);for(;d.length>=4;){const h=d.slice(0,4);n.push({type:"doubles",number:n.filter(p=>p.type==="doubles").length+1,players:h}),d.splice(0,4)}let c=[...l].sort((h,p)=>h.timestamp-p.timestamp);for(;c.length>=2;){let h=null;for(let p=0;p<c.length-1;p++){for(let g=p+1;g<c.length;g++)if(ut(c[p],c[g],r)){h=[c[p],c[g]];break}if(h)break}if(h)n.push({type:"singles",players:h}),h.forEach(p=>{const g=c.findIndex(m=>m.originalIndex===p.originalIndex);g>-1&&c.splice(g,1)});else break}const f=d,u=c;if(f.length>0){const h=4-f.length,p=f.filter(C=>C.playStyle==="both"||!C.playStyle),g=p.length,m=f.every(C=>C.playStyle==="both"||!C.playStyle),b=f.every(C=>C.allowRotation!==!1),x=f.length===3&&ut(f[0],f[1],r)&&ut(f[0],f[2],r)&&ut(f[1],f[2],r);let y=!1;g>=2&&(y=ut(p[0],p[1],r)),n.push({type:"doubles-forming",players:f,needed:h,canRotate:f.length===3&&m&&b&&x,eitherCount:g,canPlaySingles:y})}return u.length>0&&u.forEach(h=>{n.push({type:"singles-forming",players:[h],needed:1})}),{matches:n,warnings:o}}const M=v({groupPin:"",adminPin:""});function In(t){const r=document.documentElement;if(console.log("[Theme] Applying theme:",t),r.classList.remove("theme-wimbledon","theme-roland-garros","theme-australian-open","theme-us-open","theme-clay","theme-hardcourt","theme-tennis-ball"),r.removeAttribute("data-theme"),t&&t!=="default"){const n=`theme-${t}`;r.classList.add(n),r.setAttribute("data-theme",t),console.log("[Theme] Added class:",n,"data-theme:",t),console.log("[Theme] Current html classes:",r.className)}else console.log("[Theme] Using default theme (no class added)")}const H=v({}),dn=v({}),Jn={};function j(t){return T().ref(t)}function $i(){L(()=>{const t=oe(()=>{const r=_.value;if(!r||r==="admin")return;j(`groups/${r}/settings`).once("value").then(o=>{const i=o.val()||{};K.value=i.groupName||"Unknown Group",W.value=i.members||[],q.value=i.memberDetails||{};const a=i.renamedMembers||{};if(k.value&&a[k.value]){const l=a[k.value];k.value=l,localStorage.setItem(`sessionUser_${r}`,l)}M.value={groupPin:i.groupPin||"",adminPin:i.adminPin||"",shortCode:i.shortCode,location:i.location,groupDescription:i.groupDescription,groupRules:i.groupRules,theme:i.theme},In(i.theme),document.title=`${i.groupName||"Tennis"} - Tennis Coordinator`}).catch(o=>{console.error("Error loading group settings:",o),w("Failed to load group data","error")})});return()=>{t()}},[])}function Ii(){L(()=>{let t=null,r=null;const n=oe(()=>{const o=_.value;t&&r&&t.off("value",r),!(!o||o==="admin")&&(t=j(`groups/${o}/checkins`),r=t.on("value",i=>{const a=i.val()||{};J.value=a}))});return()=>{n(),t&&r&&t.off("value",r)}},[])}function Mi(){L(()=>{let t=null,r=null;const n=oe(()=>{const o=_.value,i=E.value;if(t&&r&&t.off("value",r),!o||o==="admin"||!i){H.value={};return}t=j(`groups/${o}/matchNotes/${i}`),r=t.on("value",a=>{H.value=a.val()||{}})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function Di(){L(()=>{let t=null,r=null;const n=oe(()=>{const o=_.value;if(t&&r&&t.off("value",r),!o||o==="admin"){dn.value={};return}t=j(`groups/${o}/matchNotes`),r=t.on("value",i=>{dn.value=i.val()||{}})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function I(t){return t.toLowerCase().replace(/\s+/g,"")}async function pn(t){const r=_.value,n=E.value;if(!r||!n)return;const o=j(`groups/${r}/checkins/${n}`),i=J.value[n]||[],a=I(t.name);if(i.some(d=>d.name&&I(d.name)===a)){w(`${t.name} is already checked in for this date!`,"error");return}const s={name:t.name,playStyle:t.playStyle,isGuest:t.isGuest,addedBy:t.addedBy,allowRotation:t.allowRotation,timestamp:Date.now()};t.timeRange&&(s.timeRange=t.timeRange);try{await o.set([...i,s]),await fe(r,n,"checkin",t.name,t.addedBy),console.log("[addCheckin] About to call notifyCheckinAlert for:",t.name);try{await Ti(r,t.name,n,t.addedBy,{playStyle:t.playStyle,timeRange:t.timeRange,allowRotation:t.allowRotation}),console.log("[addCheckin] notifyCheckinAlert completed")}catch(d){console.error("[addCheckin] Error in notifyCheckinAlert:",d)}setTimeout(()=>jo(r,n),500)}catch(d){console.error("Error adding check-in:",d),w("Failed to check in","error")}}async function Fo(t,r,n){const o=_.value,i=E.value;if(!o||!i)return;const a=J.value[i]||[],l=a[t];if(!l)return;const s=l.name||"this person",d=n&&I(n)===I(s),c=l.addedBy&&n&&I(n)===I(l.addedBy),f=sessionStorage.getItem(`adminAuth_${o}`)==="true";if(!d&&!c&&!f){w("You can only edit check-ins you added","error");return}const u=j(`groups/${o}/checkins/${i}`),h=[...a],p={};for(const[g,m]of Object.entries(r))m!==void 0&&(p[g]=m);h[t]={...h[t],...p};try{await u.set(h),w(`${s}'s preferences updated`,"success")}catch(g){console.error("Error updating check-in:",g),w("Failed to update check-in","error")}}async function Ei(t,r,n){const o=P.value;if(!o||!o.matches)return;const i={};for(const[s,d]of Object.entries(o.matches)){const c=(d.players||[]).filter(f=>I(f)!==I(n));c.length>0&&(i[s]={...d,players:c})}const a=(o.unassigned||[]).filter(s=>I(s)!==I(n));if(Object.keys(i).length===0&&a.length===0){try{await j(`groups/${t}/matchArrangements/${r}`).remove(),P.value=null}catch(s){console.error("Error clearing arrangement after removal:",s)}return}const l={...o,matches:i,unassigned:a};try{await j(`groups/${t}/matchArrangements/${r}`).set(l),P.value=l}catch(s){console.error("Error updating arrangement after removal:",s)}}async function Bo(t,r){const n=_.value,o=E.value;if(!n||!o)return;const i=J.value[o]||[],l=i[t]?.name||"this person",s=r&&I(r)===I(l),d=j(`groups/${n}/checkins/${o}`),c=i.filter((f,u)=>u!==t);try{await d.set(c.length>0?c:null),P.value&&l&&await Ei(n,o,l),s&&r&&(Ar.value=r,Er.value=!0),await fe(n,o,"removal",l,r),console.log("[removeCheckin] About to call notifyRemovalAlert for:",l);try{await Ai(n,l,o,r),console.log("[removeCheckin] notifyRemovalAlert completed")}catch(f){console.error("[removeCheckin] Error in notifyRemovalAlert:",f)}setTimeout(()=>jo(n,o),500)}catch(f){console.error("Error removing check-in:",f),w("Failed to remove check-in","error")}}async function fe(t,r,n,o,i,a={}){const l={timestamp:Date.now(),action:n,player:o,by:i||o,...a};Object.keys(l).forEach(s=>{l[s]===void 0&&delete l[s]});try{await T().ref(`groups/${t}/activity/${r}`).push(l)}catch(s){console.error("Error logging activity:",s)}}async function Ai(t,r,n,o){const a=I(r)===I(o)?`🎾 ${r} removed themselves from ${n}`:`🎾 ${r} was removed from ${n} by ${o}`;try{const l=T(),d=(await l.ref(`groups/${t}/userNotifications`).once("value")).val()||{};for(const[c,f]of Object.entries(d)){const u=f.preferences||{};if(u.activityAlerts){if(c===I(o))continue;const h=u.unwatchedMembers||u.mutedMembers||[];if(h.includes(r)||h.includes(o))continue;await l.ref(`groups/${t}/userNotifications/${c}/items`).push().set({message:a,timestamp:Date.now(),read:!1,date:n})}}}catch(l){console.error("Error sending removal notifications:",l)}}function Ri(t){switch(t){case"singles":return"Singles";case"doubles":return"Doubles";default:return"Either"}}async function Ti(t,r,n,o,i){const a=I(r)===I(o),l=[];if(i.playStyle&&l.push(Ri(i.playStyle)),i.timeRange){const c=se(i.timeRange.start,i.timeRange.end);c&&l.push(c)}i.playStyle==="singles"&&i.allowRotation===!1&&l.push("No 3s");const s=l.length>0?` (${l.join(", ")})`:"",d=a?`🎾 ${r} checked in for ${n}${s}`:`🎾 ${r} was added for ${n} by ${o}${s}`;console.log("[notifyCheckinAlert] Starting notification for:",{playerName:r,date:n,addedBy:o});try{const c=T(),u=(await c.ref(`groups/${t}/userNotifications`).once("value")).val()||{};console.log("[notifyCheckinAlert] Found userNotifications entries:",Object.keys(u));for(const[h,p]of Object.entries(u)){const g=p.preferences||{};if(console.log(`[notifyCheckinAlert] User ${h}:`,{activityAlerts:g.activityAlerts,unwatchedMembers:g.unwatchedMembers||g.mutedMembers}),g.activityAlerts){if(h===I(o)){console.log(`[notifyCheckinAlert] Skipping ${h} - is addedBy`);continue}if(h===I(r)){console.log(`[notifyCheckinAlert] Skipping ${h} - is player`);continue}const m=g.unwatchedMembers||g.mutedMembers||[];if(m.includes(r)||m.includes(o)){console.log(`[notifyCheckinAlert] Skipping ${h} - player/adder is unwatched`);continue}console.log(`[notifyCheckinAlert] Sending notification to ${h}`),await c.ref(`groups/${t}/userNotifications/${h}/items`).push().set({message:d,timestamp:Date.now(),read:!1,date:n}),console.log(`[notifyCheckinAlert] Notification sent to ${h}`)}}}catch(c){console.error("Error sending check-in notifications:",c)}}async function jo(t,r){const n=J.value[r]||[];if(n.length===0)return;const{matches:o}=Lr(n),i={};o.forEach(l=>{if(l.type==="doubles"||l.type==="singles"){const s=l.players.map(d=>I(d.name)).sort().join(",");i[s]={type:l.type,players:l.players.map(d=>d.name)}}});const a=Jn[r]||{};console.log("[checkAndNotifyMatchFormations] Match state comparison:",{date:r,previousMatches:Object.keys(a).length,currentMatches:Object.keys(i).length,prevKeys:Object.keys(a),currentKeys:Object.keys(i)});for(const[l,s]of Object.entries(i))if(a[l])console.log(`[checkAndNotifyMatchFormations] Match ${l} already exists (not new)`);else{console.log(`[checkAndNotifyMatchFormations] 🎾 NEW MATCH FORMED: ${l}`,s);const d=qn(r),c=s.type==="doubles"?"Doubles":"Singles";for(const f of s.players){const u=s.players.filter(p=>I(p)!==I(f)),h=`✅ You're in ${c} for ${d} with ${u.join(", ")}`;try{const p=T(),m=(await p.ref(`groups/${t}/userNotifications/${I(f)}/preferences`).once("value")).val()||{};console.log(`[checkAndNotifyMatchFormations] Player "${f}" prefs:`,{matchConfirmations:m.matchConfirmations,willSend:m.matchConfirmations!==!1}),m.matchConfirmations!==!1?(await p.ref(`groups/${t}/userNotifications/${I(f)}/items`).push().set({message:h,timestamp:Date.now(),read:!1,date:r,type:"match_formed",matchType:c}),console.log(`[checkAndNotifyMatchFormations] ✅ Sent notification to ${f}: "${h}"`)):console.log(`[checkAndNotifyMatchFormations] ❌ Skipped ${f} - matchConfirmations disabled`)}catch(p){console.error(`Error sending match notification to ${f}:`,p)}}}for(const[l,s]of Object.entries(a))if(!i[l]){console.log(`[checkAndNotifyMatchFormations] 💔 MATCH DISSOLVED: ${l}`,s);const d=qn(r),c=s.type==="doubles"?"Doubles":"Singles",f=n.map(x=>I(x.name)),u=s.players.filter(x=>f.includes(I(x))),h=s.players.filter(x=>!f.includes(I(x))),p=h.join(", "),g=c==="Doubles"?4-u.length:2-u.length,m=g===1?"Need 1 more player":`Need ${g} more players`,b=h.length>0?`⚠️ Your ${c} for ${d} is no longer confirmed - ${p} dropped out. ${m}.`:`⚠️ Your ${c} for ${d} is no longer confirmed.`;for(const x of s.players)try{const y=T(),S=(await y.ref(`groups/${t}/userNotifications/${I(x)}/preferences`).once("value")).val()||{};console.log(`[checkAndNotifyMatchFormations] Player "${x}" prefs:`,{matchConfirmations:S.matchConfirmations,willSend:S.matchConfirmations!==!1}),S.matchConfirmations!==!1?(await y.ref(`groups/${t}/userNotifications/${I(x)}/items`).push().set({message:b,timestamp:Date.now(),read:!1,date:r,type:"match_dissolved",matchType:c}),console.log(`[checkAndNotifyMatchFormations] ✅ Sent dissolved notification to ${x}: "${b}"`)):console.log(`[checkAndNotifyMatchFormations] ❌ Skipped ${x} - matchConfirmations disabled`)}catch(y){console.error(`Error sending dissolved match notification to ${x}:`,y)}}Jn[r]=i}async function Ur(t,r,n,o,i,a){const l=o.replace(/-/g," ").replace(/\b\w/g,d=>d.toUpperCase()).replace("Forming 1","(forming)");let s;if(i==="added"){const d=a&&a.length>30?a.substring(0,30)+"...":a;s=`📝 ${n} added note to ${l}: "${d}"`}else if(i==="updated"){const d=a&&a.length>30?a.substring(0,30)+"...":a;s=`📝 ${n} updated note on ${l}: "${d}"`}else s=`📝 ${n} removed note from ${l}`;try{const d=T(),f=(await d.ref(`groups/${t}/userNotifications`).once("value")).val()||{};for(const[u,h]of Object.entries(f)){const p=h.preferences||{};if(p.activityAlerts){if(u===I(n)||(p.unwatchedMembers||p.mutedMembers||[]).includes(n))continue;await d.ref(`groups/${t}/userNotifications/${u}/items`).push().set({message:s,timestamp:Date.now(),read:!1,date:r})}}}catch(d){console.error("Error sending note notifications:",d)}}async function Pi(){const t=_.value,r=E.value;if(!(!t||!r))try{await j(`groups/${t}/checkins/${r}`).remove(),await j(`groups/${t}/matchNotes/${r}`).remove(),w("Day reset","success")}catch(n){console.error("Error resetting day:",n),w("Failed to reset day","error")}}const er={};async function Ni(t,r){const n=_.value,o=E.value;if(!(!n||!o))try{const i=`${n}:${o}:${t}`,a=er[i]??H.value[t]??"",l=k.value||"Unknown";await j(`groups/${n}/matchNotes/${o}/${t}`).set(r||null),r&&!a?(await fe(n,o,"note_added",l,l,{matchKey:t,noteContent:r}),await Ur(n,o,l,t,"added",r),er[i]=r,w("Note added","success")):r&&a&&r!==a?(await fe(n,o,"note_updated",l,l,{matchKey:t,noteContent:r,previousNote:a}),await Ur(n,o,l,t,"updated",r),er[i]=r,w("Note updated","success")):!r&&a&&(await fe(n,o,"note_removed",l,l,{matchKey:t,previousNote:a}),await Ur(n,o,l,t,"removed"),delete er[i],w("Note removed","info"))}catch(i){console.error("Error saving match note:",i),w("Failed to save note","error")}}async function Mn(t){const r=_.value;if(!r)return;const n=j(`groups/${r}/settings`);try{const i=(await n.once("value")).val()||{},a=i.members||[],l=i.memberDetails||{};if(a.includes(t.name)){w("Member already exists","error");return}const s=[...a,t.name].sort(),d={...l,[t.name]:{addedBy:t.addedBy,addedDate:new Date().toISOString(),phone:t.phone||"",email:t.email||"",notes:t.notes||""}};await n.update({members:s,memberDetails:d}),W.value=s,q.value=d;const c=E.value||new Date().toISOString().split("T")[0];await fe(r,c,"member_added",t.name,t.addedBy,{contact:t.phone||t.email||void 0,notes:t.notes||void 0});const f=`${window.location.origin}${window.location.pathname}?group=${r}`;he.value={action:"invite",name:t.name,date:c,groupName:K.value||"Tennis Group",groupUrl:f,groupPin:M.value.groupPin||""},ue.value=!0}catch(o){console.error("Error adding member:",o),w("Failed to add member","error")}}async function Oo(t){const r=_.value;if(!r)return;const n=j(`groups/${r}/settings`);try{const i=(await n.once("value")).val()||{},a=i.members||[],l=i.memberDetails||{},s=a.filter(u=>u!==t),d={...l};delete d[t],await n.update({members:s,memberDetails:d}),W.value=s,q.value=d;const c=E.value||new Date().toISOString().split("T")[0],f=k.value||"Admin";await fe(r,c,"member_removed",t,f),w(`${t} removed from members`,"info")}catch(o){console.error("Error removing member:",o),w("Failed to remove member","error")}}async function Li(t,r){const n=_.value;if(!n)return!1;const o=j(`groups/${n}/settings`);try{const l=((await o.once("value")).val()||{}).memberDetails||{},s=l[t]||{},d={...l,[t]:{...s,phone:r.phone??s.phone??"",email:r.email??s.email??"",notes:r.notes??s.notes??"",shareContactInDirectory:r.shareContactInDirectory??s.shareContactInDirectory??!1,shareNotesInDirectory:r.shareNotesInDirectory??s.shareNotesInDirectory??!1}};return await o.update({memberDetails:d}),q.value=d,w("Profile updated","success"),!0}catch(i){return console.error("Error updating member details:",i),w("Failed to update profile","error"),!1}}async function Uo(t,r){const n=_.value;if(!n)return!1;const o=r.trim();if(!o)return w("Name cannot be empty","error"),!1;if(o===t)return!0;const i=j(`groups/${n}/settings`);try{const l=(await i.once("value")).val()||{},s=l.members||[],d=l.memberDetails||{};if(s.some(y=>y.toLowerCase()===o.toLowerCase()&&y!==t))return w("A member with this name already exists","error"),!1;const c=s.map(y=>y===t?o:y).sort(),f={...d};f[t]&&(f[o]=f[t],delete f[t]);const h={...l.renamedMembers||{},[t]:o};await i.update({members:c,memberDetails:f,renamedMembers:h}),W.value=c,q.value=f,k.value===t&&(k.value=o,localStorage.setItem(`sessionUser_${n}`,o));const p=T(),m=(await p.ref(`groups/${n}/checkins`).once("value")).val()||{};for(const[y,C]of Object.entries(m))if(C&&typeof C=="object"){const S=Object.values(C);let z=!1;const A=S.map(Q=>Q&&Q.name===t?(z=!0,{...Q,name:o}):Q);z&&await p.ref(`groups/${n}/checkins/${y}`).set(A)}const b=E.value||new Date().toISOString().split("T")[0],x=k.value||"Admin";return await fe(n,b,"member_renamed",o,x,{oldName:t}),w(`${t} renamed to ${o}`,"success"),!0}catch(a){return console.error("Error renaming member:",a),w("Failed to rename member","error"),!1}}function Fi(t){return t!==null&&typeof t=="object"&&"matches"in t&&"arrangedBy"in t&&"arrangedAt"in t}const P=v(null);async function Bi(t){const r=_.value,n=E.value;if(!r||!n)return;const o=k.value||"Admin",i={...t,arrangedBy:o,arrangedAt:Date.now()};try{await j(`groups/${r}/matchArrangements/${n}`).set(i),P.value=i;const a=Object.keys(t.matches).length,l=Object.values(t.matches).reduce((f,u)=>f+(u.players?.length||0),0)+(t.unassigned?.length||0),s=[],d=Object.keys(t.matches).sort();for(const f of d){const h=t.matches[f]?.players||[];if(h.length>0){const p=f.replace("-"," ").replace(/\b\w/g,m=>m.toUpperCase()),g=f.startsWith("singles")&&h.length===2?`${h[0]} vs ${h[1]}`:h.join(", ");s.push(`${p}: ${g}`)}}t.unassigned?.length>0&&s.push(`Unassigned: ${t.unassigned.join(", ")}`);const c=s.join(" | ");await fe(r,n,"arrangement_saved",o,o,{matchCount:a,playerCount:l,arrangementDetails:c}),w("Match arrangement saved","success")}catch(a){console.error("Error saving match arrangement:",a),w("Failed to save arrangement","error")}}async function ji(){const t=_.value,r=E.value;if(!t||!r)return;const n=k.value||"Admin";try{await j(`groups/${t}/matchArrangements/${r}`).remove(),P.value=null,await fe(t,r,"arrangement_cleared",n,n),w("Arrangement cleared - using auto-organization","info")}catch(o){console.error("Error clearing match arrangement:",o),w("Failed to clear arrangement","error")}}function Oi(){L(()=>{let t=null,r=null;const n=oe(()=>{const o=_.value,i=E.value;if(t&&r&&t.off("value",r),!o||o==="admin"||!i){P.value=null;return}t=j(`groups/${o}/matchArrangements/${i}`),r=t.on("value",a=>{const l=a.val();P.value=Fi(l)?l:null})});return()=>{n(),t&&r&&t.off("value",r)}},[])}function Ie({isOpen:t,onClose:r,title:n,subtitle:o,children:i,showCloseButton:a=!0}){return t?e("div",{class:"modal active",onClick:l=>{l.target===l.currentTarget&&r&&r()},children:e("div",{class:"modal-content",onClick:l=>l.stopPropagation(),children:[e("div",{class:"modal-header",children:[e("div",{children:[e("h2",{children:n}),o&&e("p",{style:"font-size: 12px; color: #666; margin: 4px 0 0 0;",children:o})]}),a&&r&&e("button",{class:"close-btn",onClick:r,children:"×"})]}),i]})}):null}v(!1);function Fr(t){return t.toLowerCase().replace(/\s+/g,"")}v(!1);v(!1);v([]);v(!1);const Br=v([]);v(!1);let et=null;function Ui(){const t=_.value,r=k.value;if(!(!t||!r)){et&&et();try{const o=T().ref(`groups/${t}/userNotifications/${Fr(r)}/items`),i=o.on("value",a=>{const l=a.val()||{},s=Object.entries(l).map(([d,c])=>({id:d,...c}));Br.value=s.sort((d,c)=>c.timestamp-d.timestamp)});et=()=>{o.off("value",i)}}catch(n){console.error("Error subscribing to notifications:",n)}}}async function Hi(t){const r=_.value,n=k.value;if(!(!r||!n))try{await T().ref(`groups/${r}/userNotifications/${Fr(n)}/items/${t}/read`).set(!0)}catch(o){console.error("Error marking notification as read:",o)}}function Wi(){L(()=>{const t=_.value,r=k.value;return t&&r&&Ui(),()=>{et&&(et(),et=null)}},[_.value,k.value])}async function Vi(t){const r=_.value,n=k.value;if(!(!r||!n))try{await T().ref(`groups/${r}/userNotifications/${Fr(n)}/items/${t}`).remove()}catch(o){console.error("Error clearing notification:",o)}}async function Gi(){const t=_.value,r=k.value;if(!(!t||!r))try{const n=T(),o={};Br.value.forEach(i=>{i.read||(o[`${i.id}/read`]=!0)}),Object.keys(o).length>0&&await n.ref(`groups/${t}/userNotifications/${Fr(r)}/items`).update(o)}catch(n){console.error("Error marking all as read:",n)}}const ce=v("checkin");function Yi(){ce.value="profile"}const Hr=it(()=>Br.value.filter(t=>!t.read).length),qi=[{id:"checkin",label:"Check-in",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>'},{id:"matches",label:"My Games",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'},{id:"directory",label:"Team",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>'},{id:"notifications",label:"Alerts",icon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',activeIcon:'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>'}];function Ki(){return e("nav",{style:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",height:"calc(64px + env(safe-area-inset-bottom))",background:"#fff",borderTop:"1px solid #e0e0e0",display:"flex",justifyContent:"space-around",alignItems:"flex-start",paddingTop:"8px",zIndex:1e3,paddingBottom:"env(safe-area-inset-bottom)",boxShadow:"0 -2px 10px rgba(0,0,0,0.1)"},children:qi.map(t=>{const r=ce.value===t.id,n=t.id==="notifications"&&Hr.value>0;return e("button",{onClick:()=>{ce.value=t.id},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px",background:"none",border:"none",padding:"8px 12px",cursor:"pointer",color:r?"var(--color-primary, #2C6E49)":"#666",position:"relative",minWidth:"60px"},children:[e("div",{style:{position:"relative"},dangerouslySetInnerHTML:{__html:r?t.activeIcon:t.icon}}),n&&e("span",{style:{position:"absolute",top:"2px",right:"8px",background:"#f44336",color:"white",fontSize:"10px",padding:"1px 5px",borderRadius:"10px",minWidth:"16px",textAlign:"center"},children:Hr.value>9?"9+":Hr.value}),e("span",{style:{fontSize:"10px",fontWeight:r?"600":"400"},children:t.label})]},t.id)})})}const Ji=""+new URL("wimbledon-xfTrdB-N.png",import.meta.url).href,Qi=""+new URL("usopen-Bs-XeyJ-.png",import.meta.url).href,wt=v(!1),at=v(!1),tr=[{id:"default",name:"Classic",color:"#2C6E49",lightBg:"#E8F5E9",hoverBg:"#C8E6C9",logo:null,emoji:"🎾"},{id:"wimbledon",name:"Wimbledon",color:"#1B5E20",lightBg:"#E8F5E9",hoverBg:"#C8E6C9",logo:Ji,emoji:"🏆"},{id:"roland-garros",name:"Roland-Garros",color:"#cc4e0e",lightBg:"#FBE9E7",hoverBg:"#FFCCBC",logo:"https://images.prismic.io/fft-rg-site%2F95765448-c7fa-428b-b565-8368dba90b17_logo.svg",emoji:"🗼"},{id:"australian-open",name:"Australian Open",color:"#0277BD",lightBg:"#E1F5FE",hoverBg:"#B3E5FC",logo:"https://ausopen.com/sites/default/files/styles/medium/public/ao_blue_1.png?itok=dcy08jHH",emoji:"🦘"},{id:"us-open",name:"US Open",color:"#0D47A1",lightBg:"#E3F2FD",hoverBg:"#BBDEFB",logo:Qi,emoji:"🗽"}];function Qn(){const t=_.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Xi(){const[t,r]=we(Qn()),[n,o]=we(!1),i=ko(null);L(()=>{const d=setInterval(()=>{r(Qn())},1e3);return()=>clearInterval(d)},[]),L(()=>{function d(c){i.current&&!i.current.contains(c.target)&&o(!1)}return n&&document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[n]);const a=M.value?.theme||"default",l=tr.find(d=>d.id===a)||tr[0],s=async d=>{In(d==="default"?void 0:d);const c=_.value;if(c)try{await T().ref(`groups/${c}/settings/theme`).set(d==="default"?null:d),M.value={...M.value,theme:d==="default"?void 0:d};const u=tr.find(h=>h.id===d)?.name||"Classic";w(`Theme: ${u}`,"success")}catch(f){console.error("Error saving theme:",f)}o(!1)};return e("h1",{style:"display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-md, 8px);",children:[e("div",{ref:i,style:{position:"relative",display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",minWidth:0},children:[e("button",{onClick:d=>{d.stopPropagation(),t&&o(!n)},title:t?"Change theme":l.name,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",background:t?"var(--color-bg-card, white)":"transparent",border:t?`2px solid ${l.color}`:"none",borderRadius:"var(--radius-full, 50%)",cursor:t?"pointer":"default",fontSize:"var(--font-size-lg, 16px)",padding:l.logo?"3px":"0",flexShrink:0,boxShadow:t?"var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))":"none",transition:"transform 0.2s, box-shadow 0.2s"},onMouseEnter:d=>{t&&(d.currentTarget.style.transform="scale(1.1)",d.currentTarget.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))")},onMouseLeave:d=>{t&&(d.currentTarget.style.transform="scale(1)",d.currentTarget.style.boxShadow="var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))")},children:[l.logo?e("img",{src:l.logo,alt:l.name,style:{width:"100%",height:"100%",objectFit:"contain"},onError:d=>{const c=d.target;c.style.display="none";const f=c.nextElementSibling;f&&(f.style.display="block")}}):null,e("span",{style:{display:l.logo?"none":"block"},children:l.emoji})]}),e("span",{id:"groupNameDisplay",style:"font-size: var(--font-size-xl, 18px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; padding-top: 2px;",children:K.value||"Tennis Coordinator"}),n&&t&&e("div",{style:{position:"absolute",top:"32px",left:"0",background:"var(--color-bg-card, white)",borderRadius:"var(--radius-xl, 12px)",boxShadow:"var(--shadow-lg, 0 4px 20px rgba(0,0,0,0.15))",padding:"var(--spacing-md, 8px)",minWidth:"180px",zIndex:1e3},children:tr.map(d=>e("button",{onClick:()=>s(d.id),style:{display:"flex",alignItems:"center",gap:"var(--spacing-lg, 10px)",width:"100%",padding:"var(--spacing-lg, 10px) var(--spacing-xl, 12px)",background:a===d.id?`${d.color}15`:"transparent",border:"none",borderRadius:"var(--radius-lg, 8px)",cursor:"pointer",textAlign:"left",transition:"background 0.2s"},onMouseEnter:c=>{a!==d.id&&(c.currentTarget.style.background="var(--color-bg-muted, #f5f5f5)")},onMouseLeave:c=>{a!==d.id&&(c.currentTarget.style.background="transparent")},children:[e("span",{style:{width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center"},children:d.logo?e("img",{src:d.logo,alt:d.name,style:{width:"24px",height:"24px",objectFit:"contain"},onError:c=>{c.target.style.display="none"}}):e("span",{style:{fontSize:"var(--font-size-2xl, 20px)"},children:d.emoji})}),e("span",{style:{flex:1,fontWeight:a===d.id?"600":"400",color:a===d.id?d.color:"var(--color-text-primary, #333)"},children:d.name}),a===d.id&&e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:d.color,children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})})]},d.id))})]}),k.value&&e("button",{onClick:Yi,style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",background:t?"var(--color-warning-light, #FFF3E0)":l.lightBg,border:`1px solid ${t?"var(--color-warning, #FF9800)":l.color}40`,borderLeft:t?"3px solid var(--color-warning, #FF9800)":`3px solid ${l.color}`,borderRadius:"var(--radius-lg, 8px)",padding:"var(--spacing-sm, 6px) var(--spacing-lg, 10px)",fontSize:"var(--font-size-base, 14px)",fontWeight:"600",color:"var(--color-text-primary, #333)",cursor:"pointer",boxShadow:"var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",transition:"all 0.2s ease"},onMouseEnter:d=>{const c=d.currentTarget;c.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))",c.style.transform="translateY(-1px)",c.style.background=t?"#FFE0B2":l.hoverBg},onMouseLeave:d=>{const c=d.currentTarget;c.style.boxShadow="var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",c.style.transform="translateY(0)",c.style.background=t?"var(--color-warning-light, #FFF3E0)":l.lightBg},onMouseDown:d=>{const c=d.currentTarget;c.style.transform="translateY(0)",c.style.boxShadow="var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.1))"},onMouseUp:d=>{const c=d.currentTarget;c.style.transform="translateY(-1px)",c.style.boxShadow="var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))"},children:[e("span",{style:{maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:k.value}),t&&e("span",{style:{background:"var(--color-warning, #FF9800)",color:"white",fontSize:"var(--font-size-2xs, 9px)",padding:"1px var(--spacing-xs, 4px)",borderRadius:"var(--radius-md, 4px)",fontWeight:"600",letterSpacing:"0.5px"},children:"ADMIN"}),e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",style:{opacity:.5,marginLeft:"-2px"},children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]})}const rr=v(""),ht=v("");function Zi({isOpen:t,groupName:r,correctPin:n,onSuccess:o}){const i=l=>{l.preventDefault(),rr.value===n?(ht.value="",rr.value="",o()):(ht.value="Invalid PIN. Please try again.",w("Invalid PIN","error"))},a=l=>{rr.value=l.target.value,ht.value=""};return e(Ie,{isOpen:t,title:"",showCloseButton:!1,children:[e("div",{class:"pin-modal-content",children:[e("div",{class:"pin-header",children:[e("p",{class:"tennis-icon",children:"🎾"}),e("h2",{children:"Welcome to"}),e("p",{class:"group-name",children:r||"Tennis Coordinator"})]}),e("p",{class:"pin-instruction",children:"Enter the group PIN to access check-ins"}),e("form",{onSubmit:i,children:[e("input",{type:"password",inputMode:"numeric",pattern:"[0-9]*",placeholder:"Enter PIN",value:rr.value,onInput:a,class:"pin-input",autoFocus:!0}),ht.value&&e("p",{class:"error-message",children:ht.value}),e("button",{type:"submit",class:"pin-submit-btn",children:"Enter"})]}),e("p",{class:"pin-help",children:"Don't know the PIN? Ask your group admin."})]}),e("style",{children:`
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
      `})]})}const tt=v(""),At=v(""),Rt=v(""),Ne=v(""),rt=v(""),nt=v(""),Tt=v(""),Pt=v(""),Dn=v(!0),Nt=v(""),un=v(!1);function ea(){const t=_.value;if(!t)return!1;const r=`adminAuth_${t}`;return sessionStorage.getItem(r)==="true"}function ta(){const t=_.value;t&&(sessionStorage.setItem(`adminAuth_${t}`,"true"),un.value=!0)}function ra(){tt.value=K.value||"",At.value=M.value.adminPin||"",Rt.value=M.value.groupPin||"",Ne.value=M.value.location?.name||"",rt.value=M.value.location?.lat?.toString()||"",nt.value=M.value.location?.lon?.toString()||"",Tt.value=M.value.groupDescription||"",Pt.value=M.value.groupRules||"",un.value=ea(),Dn.value=!un.value&&!!M.value.adminPin,Nt.value=""}async function na(t=!1){const r=_.value;if(r)try{const o=T().ref(`groups/${r}/settings`),i={groupName:tt.value,adminPin:At.value,groupPin:Rt.value,groupDescription:Tt.value||null,groupRules:Pt.value||null};Ne.value&&rt.value&&nt.value&&(i.location={name:Ne.value,lat:parseFloat(rt.value),lon:parseFloat(nt.value)}),await o.update(i),K.value=tt.value,M.value={...M.value,adminPin:At.value,groupPin:Rt.value,location:Ne.value?{name:Ne.value,lat:parseFloat(rt.value),lon:parseFloat(nt.value)}:void 0,groupDescription:Tt.value||void 0,groupRules:Pt.value||void 0},w("Settings saved","success"),t&&hn()}catch(n){console.error("Error saving settings:",n),w("Failed to save settings","error")}}function Xn(){Nt.value===M.value.adminPin?(ta(),Dn.value=!1,at.value=!1,w("Admin mode enabled","success")):(w("Incorrect PIN","error"),Nt.value="")}function hn(){at.value=!1}function oa(){return at.value&&tt.value===""&&K.value&&ra(),e(Ie,{isOpen:at.value,onClose:hn,title:"Admin Settings",subtitle:`Managing: ${K.value}`,children:Dn.value?e("div",{style:"padding: var(--spacing-3xl, 20px); text-align: center;",children:[e("p",{style:"margin-bottom: var(--spacing-2xl, 16px); color: var(--color-text-secondary, #666);",children:"Enter admin PIN to access settings"}),e("input",{type:"password",placeholder:"Admin PIN",value:Nt.value,onInput:t=>{Nt.value=t.target.value},onKeyPress:t=>{t.key==="Enter"&&Xn()},style:"width: 100%; max-width: 200px; padding: var(--spacing-xl, 12px); text-align: center; font-size: var(--font-size-xl, 18px); border: 2px solid var(--color-border, #e0e0e0); border-radius: var(--radius-lg, 8px); margin-bottom: var(--spacing-2xl, 16px);"}),e("br",{}),e("button",{onClick:Xn,style:"padding: var(--spacing-xl, 12px) 32px; background: var(--color-primary, #2C6E49); color: white;",children:"Submit"})]}):e(R,{children:[e("div",{style:"margin-bottom: var(--spacing-2xl, 16px);",children:e("div",{style:"display: flex; justify-content: space-between; align-items: center;",children:[e("h3",{style:"margin: 0; color: var(--color-text-primary, #333);",children:"Group Settings"}),e("span",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-secondary, #666); background: var(--color-bg-muted, #f5f5f5); padding: 2px var(--spacing-md, 8px); border-radius: var(--radius-lg, 10px);",children:"Click Save to apply"})]})}),e("div",{class:"pref-section",children:[e("h3",{children:"Group Name"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Display name for this tennis group"}),e("input",{type:"text",placeholder:"e.g., Tue/Thu Midday Doubles",value:tt.value,onInput:t=>{tt.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Group Story"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Tell your group's story - when/where you play, how it started, etc."}),e("textarea",{placeholder:"e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts...",value:Tt.value,onInput:t=>{Tt.value=t.target.value},rows:3,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Rules & Tips"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"House rules, etiquette, and tips for new members (one per line)"}),e("textarea",{placeholder:`e.g.,
Check in by 10am on game days
Bring water and sunscreen
New balls provided by rotating member...`,value:Pt.value,onInput:t=>{Pt.value=t.target.value},rows:4,style:"width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Admin PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Required to access admin settings"}),e("input",{type:"text",value:At.value,onInput:t=>{At.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Group PIN"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Share this PIN with all group members to access the app"}),e("input",{type:"text",value:Rt.value,onInput:t=>{Rt.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-xl, 12px);"})]}),e("div",{class:"pref-section",children:[e("h3",{children:"Weather Location"}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);",children:"Set the location for weather forecasts"}),e("input",{type:"text",placeholder:"Location name (e.g., Los Gatos, CA)",value:Ne.value,onInput:t=>{Ne.value=t.target.value},style:"width: 100%; margin-bottom: var(--spacing-md, 8px);"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);",children:[e("input",{type:"number",step:"0.0001",placeholder:"Latitude",value:rt.value,onInput:t=>{rt.value=t.target.value},style:"flex: 1;"}),e("input",{type:"number",step:"0.0001",placeholder:"Longitude",value:nt.value,onInput:t=>{nt.value=t.target.value},style:"flex: 1;"})]}),e("p",{style:"font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);",children:["Tip: Use ",e("a",{href:"https://www.latlong.net/",target:"_blank",style:"color: var(--color-primary, #2C6E49);",children:"latlong.net"})," to find coordinates"]})]}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-top: var(--spacing-2xl, 16px);",children:[e("button",{onClick:hn,style:"flex: 1; background: var(--color-border, #e0e0e0); color: var(--color-text-primary, #333);",children:"Close"}),e("button",{onClick:()=>na(!0),style:"flex: 1; background: var(--color-primary, #2C6E49); color: white;",children:"Save & Close"})]})]})})}const Ho={login:{label:"Logins",actions:["user_login"]},checkin:{label:"Check-ins",actions:["check-in","checkin"]},removal:{label:"Removals",actions:["removal"]},shared:{label:"Shared",actions:["whatsapp_share"]},notes:{label:"Notes",actions:["notes_saved","note_added","note_updated","note_removed"]},members:{label:"Members",actions:["member_added","member_removed","member_renamed"]},arrangements:{label:"Arrangements",actions:["arrangement_saved","arrangement_cleared"]}},Ge=v(!1),Lt=v([]),fn=v(!1),de=v(new Set);async function ia(){const t=_.value;if(t){fn.value=!0;try{const r=T();let n=[];const i=(await r.ref(`groups/${t}/activity`).once("value")).val();if(i){for(const[a,l]of Object.entries(i))if(l)for(const[s,d]of Object.entries(l))n.push({...d,date:a,firebaseKey:s})}n.sort((a,l)=>l.timestamp-a.timestamp),Lt.value=n}catch(r){console.error("Error loading activity:",r)}finally{fn.value=!1}}}async function aa(t){const r=_.value;if(!(!r||!t.firebaseKey||!t.date)&&confirm("Remove this activity entry?"))try{await T().ref(`groups/${r}/activity/${t.date}/${t.firebaseKey}`).remove(),Lt.value=Lt.value.filter(o=>!(o.date===t.date&&o.firebaseKey===t.firebaseKey))}catch(n){console.error("Error deleting activity:",n),alert("Failed to delete activity")}}function la(t){switch(t){case"singles":return"Singles";case"doubles":return"Doubles";default:return"Either"}}function sa(t){return Lo(t)}function ca(t){switch(t){case"check-in":case"checkin":return"✅";case"removal":return"❌";case"member_added":return"👤";case"member_removed":return"🚫";case"member_renamed":return"✏️";case"whatsapp_share":return"📤";case"notes_saved":case"note_added":return"📝";case"note_updated":return"✏️";case"note_removed":return"🗑️";case"user_login":return"🔓";case"arrangement_saved":return"🔀";case"arrangement_cleared":return"↩️";default:return"📋"}}function da(t){const{action:r,player:n,by:o,playStyle:i,timeRange:a,matchKey:l,type:s}=t;switch(r){case"check-in":case"checkin":{let d=`${n} checked in`;return o&&o!==n&&(d+=` (by ${o})`),i&&(d+=` - ${la(i)}`,(a?.start||a?.end)&&(d+=` (${a.start||"anytime"}–${a.end||"anytime"})`)),d}case"removal":return o&&o!==n?`${o} removed ${n}`:`${n} removed themselves`;case"member_added":return`${o} added ${n} as member`;case"member_removed":return`${o} removed ${n} from members`;case"member_renamed":return`${o} renamed ${t.oldName} to ${n}`;case"whatsapp_share":{let c=`${o} shared ${s==="matches"?"matches":s==="checkin"?"check-in":"removal"} to WhatsApp`;return n&&n!==o&&(c+=` (for ${n})`),c}case"notes_saved":case"note_added":{const d=l?l.replace("-"," #").replace("forming 1","forming"):"match",c=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} added note to ${d}${c}`}case"note_updated":{const d=l?l.replace("-"," #").replace("forming 1","forming"):"match",c=t.noteContent?`: "${t.noteContent.length>30?t.noteContent.substring(0,30)+"...":t.noteContent}"`:"";return`${o} updated note on ${d}${c}`}case"note_removed":{const d=l?l.replace("-"," #").replace("forming 1","forming"):"match";return`${o} removed note from ${d}`}case"user_login":return`${n} logged in`;case"arrangement_saved":{const{matchCount:d}=t;let c=`${o} arranged matches`;return d&&(c+=` (${d} match${d>1?"es":""})`),c}case"arrangement_cleared":return`${o} cleared arrangement (back to auto)`;default:return`${n} - ${r}`}}function pa(t){const r=new Set(de.value);r.has(t)?r.delete(t):r.add(t),de.value=r}function ua(){if(de.value.size===0)return Lt.value;const t=new Set;return de.value.forEach(r=>{Ho[r].actions.forEach(n=>t.add(n))}),Lt.value.filter(r=>t.has(r.action))}function ha(){wt.value=!1,Ge.value=!1,de.value=new Set}function fa(){L(()=>{wt.value&&ia()},[wt.value]);const t=ua(),r={};return Ge.value?t.forEach(n=>{r[n.date]||(r[n.date]=[]),r[n.date].push(n)}):t.forEach(n=>{const o=new Date(n.timestamp).toISOString().split("T")[0];r[o]||(r[o]=[]),r[o].push(n)}),e(Ie,{isOpen:wt.value,onClose:ha,title:"Activity History",children:[e("div",{style:"display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;",children:[Object.entries(Ho).map(([n,o])=>{const i=de.value.has(n);return e("button",{onClick:()=>pa(n),style:{padding:"4px 10px",fontSize:"12px",border:i?"1px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #ddd)",borderRadius:"var(--radius-2xl, 16px)",background:i?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, #fff)",color:i?"var(--color-primary, #2E7D32)":"var(--color-text-secondary, #666)",cursor:"pointer",fontWeight:i?"500":"400"},children:o.label},n)}),de.value.size>0&&e("button",{onClick:()=>{de.value=new Set},style:{padding:"4px 10px",fontSize:"var(--font-size-sm, 12px)",border:"1px solid var(--color-error, #f44336)",borderRadius:"var(--radius-2xl, 16px)",background:"var(--color-bg-card, #fff)",color:"var(--color-error, #f44336)",cursor:"pointer"},children:"Clear"})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin: 0;",children:[Ge.value?"Grouped by play date":"Grouped by when changes were made",de.value.size>0&&` (${t.length} filtered)`]}),e("label",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); cursor: pointer; display: flex; align-items: center; gap: 4px;",children:[e("input",{type:"checkbox",checked:Ge.value,onChange:n=>{Ge.value=n.target.checked}}),"Group by Play Date"]})]}),e("div",{style:"max-height: 400px; overflow-y: auto;",children:fn.value?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:"Loading..."}):t.length===0?e("p",{style:"color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);",children:de.value.size>0?"No matching activities":"No activity recorded yet"}):Object.entries(r).sort(([n],[o])=>o.localeCompare(n)).map(([n,o])=>e("div",{children:[e("div",{style:"font-weight: bold; color: var(--color-text-secondary, #666); margin-top: 12px; padding-bottom: 4px; border-bottom: 1px solid var(--color-border, #ddd);",children:Y(n)}),o.map((i,a)=>e("div",{style:"padding: 10px; background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-md, 6px); font-size: var(--font-size-base, 14px); margin-top: 8px; position: relative;",children:e("div",{style:"display: flex; align-items: flex-start; gap: 6px;",children:[e("span",{children:ca(i.action)}),e("div",{style:"flex: 1;",children:[e("div",{style:"white-space: pre-wrap;",children:da(i)}),i.arrangementDetails&&e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-top: 4px; background: var(--color-bg-card, #fff); padding: 6px 8px; border-radius: var(--radius-sm, 4px); border: 1px solid var(--color-border, #e0e0e0);",children:i.arrangementDetails}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #999); margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap;",children:[e("span",{children:sa(i.timestamp)}),Ge.value?e("span",{style:"color: var(--color-text-secondary, #666);",children:["changed on ",Y(new Date(i.timestamp).toISOString().split("T")[0])]}):e("span",{style:"color: var(--color-primary, #2C6E49);",children:["for ",Y(i.date)]})]})]}),e("button",{onClick:()=>aa(i),title:"Remove this activity",style:{background:"none",border:"none",padding:"var(--spacing-xs, 4px)",cursor:"pointer",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-lg, 16px)",lineHeight:"1",borderRadius:"var(--radius-sm, 4px)",transition:"color 0.2s, background 0.2s"},onMouseOver:l=>{l.target.style.color="#f44336",l.target.style.background="#ffebee"},onMouseOut:l=>{l.target.style.color="#999",l.target.style.background="none"},children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})},a))]},n))})]})}const En=v(!1),An=v(""),Rn=v(""),Tn=v("");function Pn(t){const r=K.value||"our tennis group",n=_.value,o=window.location.href.split("?")[0]+"?group="+n,i=M.value.groupPin||"";return`Hi ${t}! You've been added to ${r} tennis coordination.

Check in for upcoming matches here:
${o}

PIN: ${i}

Just select your name and check in when you can play!`}function ga(t,r){const n=t.replace(/[\s\-\(\)]/g,""),o=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(o)?`sms:${n}&body=${encodeURIComponent(r)}`:`sms:${n}?body=${encodeURIComponent(r)}`}function va(t,r,n){return`mailto:${t}?subject=${encodeURIComponent(r)}&body=${encodeURIComponent(n)}`}async function ma(t){const r=Pn(t),n=K.value||"Tennis Group";try{await navigator.share({title:`Join ${n}`,text:r}),Le(),w("Shared successfully!","success")}catch(o){o.name!=="AbortError"&&(console.error("Share failed:",o),Wo(t))}}async function Wo(t){const r=Pn(t);try{await navigator.clipboard.writeText(r),Le(),w("Message copied! Paste in SMS or email.","success")}catch{const o=document.createElement("textarea");o.value=r,o.style.position="fixed",o.style.left="-9999px",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),Le(),w("Message copied! Paste in SMS or email.","success")}}function Le(){En.value=!1,An.value="",Rn.value="",Tn.value=""}function xa(t,r,n){An.value=t,Rn.value=r||"",Tn.value=n||"",En.value=!0}function ba(){const t=An.value,r=Rn.value,n=Tn.value,o=Pn(t),i=K.value||"Tennis Group",a=typeof navigator<"u"&&navigator.share!==void 0;return e(Ie,{isOpen:En.value,onClose:Le,title:"",showCloseButton:!1,children:e("div",{style:{textAlign:"center",padding:"10px 0"},children:[e("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:["Invite ",t,"?"]}),e("p",{style:{margin:"0 0 16px 0",color:"#666",fontSize:"14px"},children:"Send them an invite with the group link and PIN"}),e("div",{style:{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"},children:[r&&e("a",{href:ga(r,o),onClick:()=>setTimeout(Le,500),style:{background:"#25D366",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[e("span",{children:"📱"})," Text ",r]}),n&&e("a",{href:va(n,`You're invited to ${i}`,o),onClick:()=>setTimeout(Le,500),style:{background:"#4285F4",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[e("span",{children:"📧"})," Email"]}),a&&e("button",{onClick:()=>ma(t),style:{background:"#9C27B0",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"},children:[e("span",{children:"📤"})," Other"]}),e("button",{onClick:()=>Wo(t),style:{background:"#607D8B",color:"white",padding:"12px 20px",border:"none",borderRadius:"8px",fontSize:"14px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"},children:[e("span",{children:"📋"})," Copy"]})]}),e("button",{onClick:Le,style:{marginTop:"12px",background:"none",border:"none",color:"#999",fontSize:"14px",cursor:"pointer"},children:"Skip"})]})})}const Vo=v(!1),lt=v(null),zr=v(""),Ft=v(""),Bt=v(""),jt=v(""),De=v(""),$r=v(!1),Ot=v(""),Ut=v(""),Ht=v(""),Wt=v("");async function ya(){const t=Ot.value.trim();if(!t){w("Please enter member name","error");return}const r=Ut.value.trim(),n=Ht.value.trim();await Mn({name:t,phone:r,email:n,notes:Wt.value.trim(),addedBy:k.value||"Admin"}),Ot.value="",Ut.value="",Ht.value="",Wt.value="",$r.value=!1}function Go(){Ot.value="",Ut.value="",Ht.value="",Wt.value="",$r.value=!1}function wa(t){confirm(`Remove ${t} from the group?`)&&Oo(t)}function ka(t){lt.value=t,zr.value=t;const r=q.value[t]||{};Ft.value=r.phone||"",Bt.value=r.email||"",jt.value=r.notes||""}async function _a(){const t=lt.value;if(!t)return;const r=_.value;if(!r)return;const n=zr.value.trim();try{if(n!==t&&!await Uo(t,n))return;const o=n!==t?n:t;await T().ref(`groups/${r}/settings/memberDetails/${o}`).update({phone:Ft.value,email:Bt.value,notes:jt.value}),q.value={...q.value,[o]:{...q.value[o]||{},phone:Ft.value,email:Bt.value,notes:jt.value}},lt.value=null,n===t&&w("Member updated","success")}catch(o){console.error("Error updating member:",o),w("Failed to update member","error")}}function Ca(){Vo.value=!1,lt.value=null,De.value="",Go()}function Sa(){const t=W.value,r=q.value,n=t.filter(o=>o.toLowerCase().includes(De.value.toLowerCase())).sort((o,i)=>o.localeCompare(i));return e(Ie,{isOpen:Vo.value,onClose:Ca,title:"Manage Members",subtitle:`${t.length} members in group`,children:[lt.value&&e("div",{style:"position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1001;",children:e("div",{style:"background: white; padding: 24px; border-radius: 12px; max-width: 400px; width: 90%;",children:[e("h3",{style:"margin-top: 0;",children:"Edit Member"}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Name"}),e("input",{type:"text",placeholder:"Member name",value:zr.value,onInput:o=>{zr.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Phone"}),e("input",{type:"tel",placeholder:"Phone number",value:Ft.value,onInput:o=>{Ft.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 12px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Email"}),e("input",{type:"email",placeholder:"Email address",value:Bt.value,onInput:o=>{Bt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("div",{style:"margin-bottom: 16px;",children:[e("label",{style:"font-size: 12px; color: #666; display: block; margin-bottom: 4px;",children:"Notes"}),e("textarea",{placeholder:"Notes (skill level, etc.)",rows:2,value:jt.value,onInput:o=>{jt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; box-sizing: border-box;"})]}),e("div",{style:"display: flex; gap: 8px;",children:[e("button",{onClick:()=>{lt.value=null},style:"flex: 1; background: #ccc; color: #333;",children:"Cancel"}),e("button",{onClick:_a,style:"flex: 1; background: var(--color-primary, #2C6E49); color: white;",children:"Save"})]})]})}),e("div",{style:"margin-bottom: 16px;",children:e("div",{style:"position: relative;",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%);",children:e("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"})}),e("input",{type:"text",placeholder:"Search members...",value:De.value,onInput:o=>{De.value=o.target.value},style:"width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"}),De.value&&e("button",{onClick:()=>{De.value=""},style:"position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 0;",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})})]})}),e("div",{style:"max-height: 400px; overflow-y: auto; margin-bottom: 16px;",children:n.length===0?e("div",{style:"text-align: center; padding: 20px; color: #888;",children:De.value?"No members found":"No members yet"}):n.map(o=>{const i=r[o],a=i&&(i.phone||i.email||i.addedBy),l=i&&(i.phone||i.email),s=i?.addedDate?new Date(i.addedDate).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):null;return e("div",{style:"flex-direction: column; align-items: flex-start; padding: 12px; background: #f9f9f9; border-radius: 8px; margin-bottom: 8px;",children:[e("div",{style:"display: flex; justify-content: space-between; width: 100%; align-items: center;",children:[e("span",{style:"font-weight: 500;",children:o}),e("div",{style:"display: flex; gap: 4px;",children:[e("button",{onClick:()=>ka(o),style:{background:"rgba(76, 175, 80, 0.1)",color:"var(--color-primary, #2C6E49)",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Edit",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})}),l&&e("button",{onClick:()=>xa(o,i?.phone,i?.email),style:{background:"rgba(33, 150, 243, 0.1)",color:"#2196F3",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Invite",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})})}),e("button",{onClick:()=>wa(o),style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"0"},title:"Remove",children:e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})]}),a&&e("div",{style:"font-size: 12px; color: #666; margin-top: 8px; padding-left: 12px; border-left: 3px solid var(--color-primary, #2C6E49);",children:[i?.addedBy&&e("div",{children:["Added by: ",e("strong",{children:i.addedBy}),s&&` on ${s}`]}),i?.phone&&e("div",{children:["📱 ",i.phone]}),i?.email&&e("div",{children:["📧 ",i.email]}),i?.notes&&e("div",{children:["Notes: ",i.notes]})]})]},o)})}),e("div",{style:"padding-top: 12px; border-top: 1px solid #e0e0e0;",children:$r.value?e("div",{style:"background: #f9f9f9; padding: 16px; border-radius: 8px;",children:[e("h4",{style:"margin: 0 0 12px 0; font-size: 14px; color: #333;",children:"Add New Member"}),e("input",{type:"text",placeholder:"Member's full name",value:Ot.value,onInput:o=>{Ot.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; margin-bottom: 8px; box-sizing: border-box;"}),e("div",{style:"display: flex; gap: 8px; margin-bottom: 8px;",children:[e("input",{type:"tel",placeholder:"Phone (optional)",value:Ut.value,onInput:o=>{Ut.value=o.target.value},style:"flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"}),e("input",{type:"email",placeholder:"Email (optional)",value:Ht.value,onInput:o=>{Ht.value=o.target.value},style:"flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"})]}),e("textarea",{placeholder:"Notes (skill level, how you know them, etc.) - optional",rows:2,value:Wt.value,onInput:o=>{Wt.value=o.target.value},style:"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; margin-bottom: 12px; box-sizing: border-box; font-family: inherit;"}),e("div",{style:"font-size: 12px; color: #666; margin-bottom: 12px;",children:["Added by: ",e("strong",{children:k.value||"Admin"})]}),e("div",{style:"display: flex; gap: 8px;",children:[e("button",{onClick:Go,style:"flex: 1; padding: 10px; background: #ccc; color: #333; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;",children:"Cancel"}),e("button",{onClick:ya,style:"flex: 2; padding: 10px; background: var(--color-primary, #2C6E49); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;",children:"Add Member"})]})]}):e("button",{onClick:()=>{$r.value=!0},style:"width: 100%; padding: 12px; background: var(--color-primary, #2C6E49); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 8px;",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})}),"Add New Member"]})})]})}const Vt=v(!1),Wr=v("");async function za(t,r){try{const n=T(),o=new Date().toISOString().split("T")[0];await n.ref(`groups/${t}/activity/${o}`).push({timestamp:Date.now(),action:"user_login",player:r,by:r})}catch(n){console.error("Error logging login activity:",n)}}function $a(t){k.value=t;const r=_.value;r&&(localStorage.setItem(`sessionUser_${r}`,t),za(r,t)),Ar.value=t,Er.value=!0,Vt.value=!1,window.scrollTo(0,0),w(`Welcome, ${t}!`,"success")}function Ia(){const t=[...W.value].sort((i,a)=>i.localeCompare(a)),r=Wr.value.toLowerCase(),n=r?t.filter(i=>i.toLowerCase().includes(r)):t,o=i=>{Wr.value=i.target.value};return e(Ie,{isOpen:Vt.value,title:"",showCloseButton:!1,children:[e("div",{class:"welcome-modal-content",children:[e("div",{class:"welcome-header",children:[e("h2",{children:"Welcome Back"}),e("p",{class:"group-name",children:K.value})]}),e("p",{class:"instruction",children:"Select your name to start"}),e("div",{class:"search-container",children:e("input",{type:"text",placeholder:"Search member...",value:Wr.value,onInput:o,class:"search-input"})}),e("div",{class:"member-list",children:[n.map(i=>e("button",{class:"member-row",onClick:()=>$a(i),children:[e("div",{class:"member-avatar",children:i.charAt(0).toUpperCase()}),e("span",{class:"member-name",children:i})]},i)),n.length===0&&e("p",{class:"no-results",children:"No members found"})]})]}),e("style",{children:`
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
      `})]})}function Ma(t){if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}function Da(t){return`https://wa.me/?text=${encodeURIComponent(t)}`}function Ea(t,r){const n=t.replace(/[\s\-\(\)]/g,""),o=encodeURIComponent(r),i=/iPhone|iPad|iPod/.test(navigator?.userAgent||"")?"&":"?";return`sms:${n}${i}body=${o}`}function Yo(t){const r=new Date(t+"T12:00:00"),n=r.toLocaleDateString("en-US",{weekday:"long"}),o=r.toLocaleDateString("en-US",{month:"long"}),i=r.getDate(),a=Ma(i);return`${n}, ${o} ${i}${a}`}function Aa(t,r,n){const o=Yo(r),i=[];i.push(`I'm checking in for tennis on ${o}!`),i.push("");const a=n.playStyle==="singles"?"Singles only":n.playStyle==="doubles"?"Doubles only":"Either singles or doubles";if(i.push(`Preference: ${a}`),n.timeRange){const l=se(n.timeRange.start,n.timeRange.end);l&&i.push(`Available: ${l}`)}return i.join(`
`)}function Ra(t,r){return`I'm no longer available for tennis on ${Yo(r)}.`}async function Ta(t){try{if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(t),!0;const r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();const n=document.execCommand("copy");return document.body.removeChild(r),n}catch{return!1}}function Pa(t,r,n,o){return`Hi ${t}! You've been added to ${r} tennis coordination.

Check in for upcoming matches here:
${n}

PIN: ${o}

Just select your name and check in when you can play!`}const Ye=v(!1);typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;!r.closest(".share-prompt-dropdown")&&!r.closest("[data-share-prompt-button]")&&(Ye.value=!1)});function Na(){const t=ue.value,r=he.value;if(L(()=>{if(t){const u=setTimeout(()=>{ue.value=!1,he.value=null},8e3);return()=>clearTimeout(u)}},[t]),!t||!r)return null;const n=r.action==="removal",o=r.action==="invite",i=()=>o?Pa(r.name,r.groupName||"",r.groupUrl||"",r.groupPin||""):n?Ra(r.name,r.date):Aa(r.name,r.date,{playStyle:r.playStyle||"both",timeRange:r.timeRange}),a=u=>{const h=i();if(u==="whatsapp"){const p=Da(h);window.open(p,"_blank")}else if(u==="sms"){const p=Ea("",h);window.location.href=p}else u==="copy"&&Ta(h).then(p=>{p?w("Copied to clipboard","success"):w("Failed to copy","error")});Ye.value=!1,ue.value=!1,he.value=null},l=()=>{ue.value=!1,he.value=null},s=o?"var(--color-info-light, #E3F2FD)":n?"var(--color-warning-light, #FFF3E0)":"var(--color-success-light, #E8F5E9)",d=o?"var(--color-info, #1565C0)":n?"#E65100":"var(--color-success, #2E7D32)",c=o?"Added!":n?"Removed!":"Checked in!",f=o?`Invite ${r.name}?`:n?"Let others know?":"Share with the group?";return e("div",{style:{position:"fixed",bottom:"70px",left:"50%",transform:"translateX(-50%)",width:"calc(100% - 24px)",maxWidth:"456px",background:s,borderRadius:"12px",padding:"12px 16px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:"12px",zIndex:1e3,animation:"slideUp 0.3s ease-out"},children:[e("div",{style:{flex:1,fontSize:"14px",color:d},children:[e("strong",{children:c})," ",f]}),e("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e("div",{style:{position:"relative"},children:[e("button",{"data-share-prompt-button":!0,onClick:u=>{u.stopPropagation(),Ye.value=!Ye.value},style:{background:Ye.value?"var(--color-primary-dark, #1a402b)":"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",padding:"8px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),Ye.value&&e("div",{class:"share-prompt-dropdown",style:{position:"absolute",bottom:"100%",right:"0",marginBottom:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:()=>a("whatsapp"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-whatsapp, #25D366)",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>a("sms"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-info, #2196F3)",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>a("copy"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"var(--color-text-primary, #333)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"#666",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),e("button",{onClick:l,style:{background:"transparent",border:"none",padding:"4px",cursor:"pointer",color:"#666",fontSize:"18px",lineHeight:1},title:"Dismiss",children:"×"})]}),e("style",{children:`
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
      `})]})}const gn=v(!1),Je=v(null),Re=v(!1),Te=v(-1);function La(t){const r=E.value;if(!r)return null;const n=J.value[r]||[],o=n.findIndex(i=>i.name===t);return o===-1?null:{checkin:n[o],index:o}}function Fa(){const t=Je.value||k.value,r=!Je.value||Je.value===k.value,n=(s,d)=>{O.value=s,U.value=d},o=async()=>{if(!t){w("Please select a user first","error");return}const s=B.value,d=O.value&&U.value?{start:O.value,end:U.value}:void 0;Re.value&&Te.value>=0?await Fo(Te.value,{playStyle:s,allowRotation:be.value,timeRange:d},k.value||""):await pn({name:t,playStyle:s,isGuest:!1,addedBy:k.value,allowRotation:be.value,timeRange:d}),he.value={action:"checkin",name:t,playStyle:s,timeRange:d,date:E.value||""},ue.value=!0,a()},i=async()=>{Te.value<0||(await Bo(Te.value,k.value),he.value={action:"removal",name:t||"",date:E.value||"",isOwner:r},ue.value=!0,a())},a=()=>{gn.value=!1,Je.value=null,Re.value=!1,Te.value=-1,B.value="both",be.value=!0,O.value="",U.value=""},l=s=>{s.target.classList.contains("drawer-backdrop")&&a()};return gn.value?e("div",{class:"drawer-backdrop",onClick:l,children:[e("div",{class:"check-in-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:Re.value?"Edit Check-in":"Check In"}),e("div",{class:"player-display",children:[e("div",{class:"player-avatar",children:t?.charAt(0).toUpperCase()}),e("div",{class:"player-info",children:[e("span",{class:"player-name",children:t}),e("span",{class:"player-context",children:r?"Playing as yourself":"Checking in for them"})]})]})]}),e("div",{class:"drawer-section",children:[e("h3",{children:"Play Style"}),e("div",{class:"preference-buttons",children:[e("button",{class:`pref-btn singles ${B.value==="singles"?"selected":""}`,onClick:()=>{B.value="singles"},children:"Singles"}),e("button",{class:`pref-btn ${B.value==="both"?"selected":""}`,onClick:()=>{B.value="both"},children:"Either"}),e("button",{class:`pref-btn doubles ${B.value==="doubles"?"selected":""}`,onClick:()=>{B.value="doubles"},children:"Doubles"})]})]}),e("div",{class:"drawer-section",children:e("label",{class:"rotation-toggle",children:[e("input",{type:"checkbox",checked:be.value,onChange:s=>{be.value=s.target.checked}}),e("span",{class:"toggle-label",children:[e("span",{class:"toggle-title",children:"Open to 3-player rotation"}),e("span",{class:"toggle-desc",children:"1v1 or 1v2 format when needed"})]})]})}),e("div",{class:"drawer-section",children:[e("h3",{children:["Available Time ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"time-presets",children:[e("button",{class:`time-btn ${O.value==="08:00"&&U.value==="12:00"?"selected":""}`,onClick:()=>n("08:00","12:00"),children:[e("span",{class:"time-label",children:"Morning"}),e("span",{class:"time-range",children:"8am-12pm"})]}),e("button",{class:`time-btn ${O.value==="12:00"&&U.value==="15:00"?"selected":""}`,onClick:()=>n("12:00","15:00"),children:[e("span",{class:"time-label",children:"Midday"}),e("span",{class:"time-range",children:"12-3pm"})]}),e("button",{class:`time-btn ${O.value==="15:00"&&U.value==="18:00"?"selected":""}`,onClick:()=>n("15:00","18:00"),children:[e("span",{class:"time-label",children:"Afternoon"}),e("span",{class:"time-range",children:"3-6pm"})]}),e("button",{class:`time-btn ${O.value==="18:00"&&U.value==="21:00"?"selected":""}`,onClick:()=>n("18:00","21:00"),children:[e("span",{class:"time-label",children:"Evening"}),e("span",{class:"time-range",children:"6-9pm"})]})]}),e("div",{class:"custom-time",children:[e("input",{type:"time",value:O.value,onInput:s=>{O.value=s.target.value},placeholder:"Start"}),e("span",{class:"time-separator",children:"to"}),e("input",{type:"time",value:U.value,onInput:s=>{U.value=s.target.value},placeholder:"End"}),(O.value||U.value)&&e("button",{class:"clear-time-btn",onClick:()=>{O.value="",U.value=""},children:"Clear"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:a,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:o,children:Re.value?"Update":"Confirm"})]}),Re.value&&e("div",{class:"drawer-remove",children:e("button",{class:"remove-btn",onClick:i,children:"Remove Check-in"})})]}),e("style",{children:`
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
          background: #ddd;
          border-radius: 2px;
        }

        .drawer-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .drawer-header h2 {
          margin: 0 0 12px;
          font-size: 22px;
          color: #333;
        }

        .player-display {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          background: #f9fafb;
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
          color: #333;
        }

        .player-context {
          font-size: 12px;
          color: #666;
        }

        .drawer-section {
          margin-bottom: 20px;
        }

        .drawer-section h3 {
          margin: 0 0 12px;
          font-size: 14px;
          color: #333;
          font-weight: 600;
        }

        .optional-tag {
          font-weight: normal;
          color: #999;
          font-size: 12px;
        }

        .preference-buttons {
          display: flex;
          gap: 10px;
        }

        .pref-btn {
          flex: 1;
          padding: 14px 10px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
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
          background: #f9f9f9;
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
          color: #333;
        }

        .toggle-desc {
          font-size: 12px;
          color: #666;
        }

        .time-presets {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .time-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 6px;
          border: 2px solid #e0e0e0;
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
          color: #333;
        }

        .time-range {
          font-size: 10px;
          color: #666;
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
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 14px;
        }

        .custom-time input[type="time"]:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .time-separator {
          color: #666;
          font-size: 14px;
        }

        .clear-time-btn {
          padding: 12px 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 10px;
          color: #666;
          font-size: 13px;
          cursor: pointer;
        }

        .clear-time-btn:hover {
          background: #e0e0e0;
        }

        .drawer-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
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

        .drawer-remove {
          margin-top: 16px;
          text-align: center;
        }

        .remove-btn {
          padding: 12px 24px;
          background: transparent;
          border: none;
          color: #e53935;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .remove-btn:hover {
          text-decoration: underline;
        }
      `})]}):null}function Ir(t,r){if(t?Je.value=t:Je.value=null,r&&t){Re.value=!0;const n=La(t);n&&(Te.value=n.index,B.value=n.checkin.playStyle||"both",be.value=n.checkin.allowRotation!==!1,n.checkin.timeRange&&(O.value=n.checkin.timeRange.start||"",U.value=n.checkin.timeRange.end||""))}else Re.value=!1,Te.value=-1,B.value="both",be.value=!0,O.value="",U.value="";gn.value=!0}const vn=v(!1),te=v("member"),gt=v("");function Ba(){te.value="member",gt.value="",qe.value="",mt.value="",br.value="",yr.value="",wr.value="",Kl.value=k.value||"",B.value="both",vn.value=!0}function ja(){const r=(()=>{const c=E.value,f=c?J.value[c]||[]:[],u=new Set(f.map(h=>h.name));return[...W.value].filter(h=>!u.has(h)).sort((h,p)=>h.localeCompare(p))})(),n=gt.value.toLowerCase(),o=n?r.filter(c=>c.toLowerCase().includes(n)):r,i=()=>{vn.value=!1,gt.value=""},a=c=>{c.target.classList.contains("drawer-backdrop")&&i()},l=c=>{i(),Ir(c,!1)},s=async()=>{if(!qe.value.trim()){w("Please enter guest name","error");return}const c=B.value,f=O.value&&U.value?{start:O.value,end:U.value}:void 0;await pn({name:qe.value.trim(),playStyle:c,isGuest:!0,addedBy:k.value,allowRotation:be.value,timeRange:f}),he.value={action:"checkin",name:qe.value.trim(),playStyle:c,timeRange:f,date:E.value||""},ue.value=!0,i()},d=async()=>{if(!mt.value.trim()){w("Please enter member name","error");return}const c=mt.value.trim();await Mn({name:c,phone:br.value.trim(),email:yr.value.trim(),notes:wr.value.trim(),addedBy:k.value});const f=B.value,u=O.value&&U.value?{start:O.value,end:U.value}:void 0;await pn({name:c,playStyle:f,isGuest:!1,addedBy:k.value,allowRotation:be.value,timeRange:u}),he.value={action:"checkin",name:c,playStyle:f,timeRange:u,date:E.value||""},ue.value=!0,i()};return vn.value?e("div",{class:"drawer-backdrop",onClick:a,children:[e("div",{class:"player-select-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:[te.value==="member"&&"Check in a player",te.value==="guest"&&"Add Guest",te.value==="newMember"&&"Add New Member"]}),e("div",{class:"mode-tabs",children:[e("button",{class:`mode-tab ${te.value==="member"?"active":""}`,onClick:()=>{te.value="member"},children:"Member"}),e("button",{class:`mode-tab ${te.value==="guest"?"active":""}`,onClick:()=>{te.value="guest"},children:"Guest"}),e("button",{class:`mode-tab ${te.value==="newMember"?"active":""}`,onClick:()=>{te.value="newMember"},children:"New Member"})]})]}),te.value==="member"&&e(R,{children:[e("div",{class:"search-container",children:e("input",{type:"text",placeholder:"Search member...",value:gt.value,onInput:c=>{gt.value=c.target.value},class:"search-input"})}),e("div",{class:"member-list",children:[o.map(c=>e("button",{class:"member-row",onClick:()=>l(c),children:[e("div",{class:"member-avatar",children:c.charAt(0).toUpperCase()}),e("span",{class:"member-name",children:c})]},c)),o.length===0&&e("p",{class:"no-results",children:r.length===0?"All members are already checked in":"No members found"})]})]}),te.value==="guest"&&e("div",{class:"form-section",children:[e("div",{class:"form-field",children:[e("label",{children:"Guest Name"}),e("input",{type:"text",placeholder:"Enter guest's name",value:qe.value,onInput:c=>{qe.value=c.target.value}})]}),e("div",{class:"form-field",children:[e("label",{children:"Play Style"}),e("div",{class:"preference-buttons",children:[e("button",{class:`pref-btn singles ${B.value==="singles"?"selected":""}`,onClick:()=>{B.value="singles"},children:"Singles"}),e("button",{class:`pref-btn ${B.value==="both"?"selected":""}`,onClick:()=>{B.value="both"},children:"Either"}),e("button",{class:`pref-btn doubles ${B.value==="doubles"?"selected":""}`,onClick:()=>{B.value="doubles"},children:"Doubles"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:i,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:s,children:"Add & Check In"})]})]}),te.value==="newMember"&&e("div",{class:"form-section",children:[e("div",{class:"form-field",children:[e("label",{children:"Full Name"}),e("input",{type:"text",placeholder:"Enter member's name",value:mt.value,onInput:c=>{mt.value=c.target.value}})]}),e("div",{class:"form-row",children:[e("div",{class:"form-field",children:[e("label",{children:["Phone ",e("span",{class:"optional",children:"(optional)"})]}),e("input",{type:"tel",placeholder:"Phone number",value:br.value,onInput:c=>{br.value=c.target.value}})]}),e("div",{class:"form-field",children:[e("label",{children:["Email ",e("span",{class:"optional",children:"(optional)"})]}),e("input",{type:"email",placeholder:"Email address",value:yr.value,onInput:c=>{yr.value=c.target.value}})]})]}),e("div",{class:"form-field",children:[e("label",{children:["Notes ",e("span",{class:"optional",children:"(optional)"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:3,value:wr.value,onInput:c=>{wr.value=c.target.value}})]}),e("p",{class:"added-by-info",children:["Added by: ",e("strong",{children:k.value||"(unknown)"})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:i,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:d,children:"Add & Check In"})]})]})]}),e("style",{children:`
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
      `})]}):null}const mn=v(!1),ur=v(""),hr=v(""),fr=v(""),gr=v("");function qo(){ur.value="",hr.value="",fr.value="",gr.value=""}function Oa(){const t=async()=>{const o=ur.value.trim();if(!o){w("Please enter member name","error");return}await Mn({name:o,phone:hr.value.trim(),email:fr.value.trim(),notes:gr.value.trim(),addedBy:k.value||"Unknown"}),r()},r=()=>{mn.value=!1,qo()},n=o=>{o.target.classList.contains("drawer-backdrop")&&r()};return mn.value?e("div",{class:"drawer-backdrop",onClick:n,children:[e("div",{class:"add-member-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:"Add New Member"}),e("p",{class:"drawer-subtitle",children:"Add a teammate to your group"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Name ",e("span",{class:"required",children:"*"})]}),e("input",{type:"text",placeholder:"Enter member's full name",value:ur.value,onInput:o=>{ur.value=o.target.value},class:"drawer-input",autoFocus:!0})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Contact Info ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"contact-inputs",children:[e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"})}),e("input",{type:"tel",placeholder:"Phone number",value:hr.value,onInput:o=>{hr.value=o.target.value},class:"drawer-input with-icon"})]}),e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),e("input",{type:"email",placeholder:"Email address",value:fr.value,onInput:o=>{fr.value=o.target.value},class:"drawer-input with-icon"})]})]}),e("p",{class:"field-hint",children:"Used for sending invites to join the group"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Notes ",e("span",{class:"optional-tag",children:"optional"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:2,value:gr.value,onInput:o=>{gr.value=o.target.value},class:"drawer-textarea"})]}),e("div",{class:"added-by-info",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"#999",children:e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"})}),e("span",{children:["Added by: ",e("strong",{children:k.value||"Unknown"})]})]}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:r,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:t,children:"Add Member"})]})]}),e("style",{children:`
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
          box-shadow: 0 4px 12px rgba(44, 110, 73, 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }
      `})]}):null}function Ua(){qo(),mn.value=!0}const xn=v(!1),vr=v(null),kt=v(""),_t=v(""),Ct=v(""),St=v(""),zt=v(!1),$t=v(!1),le=v(!1),Qe=v(!1);function Ha(){const t=_.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Wa(){kt.value="",_t.value="",Ct.value="",St.value="",zt.value=!1,$t.value=!1,le.value=!1,Qe.value=!1}function Va(){const t=vr.value,r=Ha(),n=t===k.value,o=r&&!n,i=r&&!n,a=async()=>{if(!t)return;const c=kt.value.trim();if(!c){w("Please enter member name","error");return}if(le.value=!0,o&&c!==t){if(!await Uo(t,c)){le.value=!1;return}vr.value=c}const f=await Li(c,{phone:_t.value.trim(),email:Ct.value.trim(),notes:St.value.trim(),shareContactInDirectory:zt.value,shareNotesInDirectory:$t.value});le.value=!1,f?(w("Member updated successfully","success"),s()):w("Failed to update member","error")},l=async()=>{if(!t||!i)return;if(!Qe.value){Qe.value=!0;return}le.value=!0;const c=await Oo(t);le.value=!1,c?(w(`${t} removed from team`,"success"),s()):w("Failed to remove member","error")},s=()=>{xn.value=!1,vr.value=null,Wa()},d=c=>{c.target.classList.contains("drawer-backdrop")&&s()};return!xn.value||!t?null:e("div",{class:"drawer-backdrop",onClick:d,children:[e("div",{class:"edit-member-drawer",children:[e("div",{class:"drawer-handle",children:e("div",{class:"handle-bar"})}),e("div",{class:"drawer-header",children:[e("h2",{children:n?"Edit Your Profile":"Edit Member"}),e("p",{class:"drawer-subtitle",children:n?"Update your contact info and privacy settings":`Update ${t}'s information`})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Name ",o&&e("span",{class:"optional-tag",children:"editable"})]}),e("input",{type:"text",placeholder:"Member name",value:kt.value,onInput:c=>{kt.value=c.target.value},class:"drawer-input",disabled:!o,style:o?{}:{background:"#f5f5f5",color:"#666"}})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Contact Info ",e("span",{class:"optional-tag",children:"optional"})]}),e("div",{class:"contact-inputs",children:[e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"})}),e("input",{type:"tel",placeholder:"Phone number",value:_t.value,onInput:c=>{_t.value=c.target.value},class:"drawer-input with-icon"})]}),e("div",{class:"input-with-icon",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#999",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),e("input",{type:"email",placeholder:"Email address",value:Ct.value,onInput:c=>{Ct.value=c.target.value},class:"drawer-input with-icon"})]})]})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:["Notes ",e("span",{class:"optional-tag",children:"optional"})]}),e("textarea",{placeholder:"Skill level, how you know them, etc.",rows:2,value:St.value,onInput:c=>{St.value=c.target.value},class:"drawer-textarea"})]}),e("div",{class:"drawer-section",children:[e("label",{class:"field-label",children:"Privacy Settings"}),e("div",{class:"privacy-options",children:[e("label",{class:"privacy-option",children:[e("input",{type:"checkbox",checked:zt.value,onChange:c=>{zt.value=c.target.checked}}),e("div",{class:"privacy-option-content",children:[e("span",{class:"privacy-option-title",children:"Share contact info in directory"}),e("span",{class:"privacy-option-desc",children:"Phone and email visible to all members"})]})]}),e("label",{class:"privacy-option",children:[e("input",{type:"checkbox",checked:$t.value,onChange:c=>{$t.value=c.target.checked}}),e("div",{class:"privacy-option-content",children:[e("span",{class:"privacy-option-title",children:"Share profile notes in directory"}),e("span",{class:"privacy-option-desc",children:"Notes visible to all members"})]})]})]})]}),i&&e("div",{class:"drawer-section",children:e("button",{class:`remove-btn ${Qe.value?"confirming":""}`,onClick:l,disabled:le.value,children:Qe.value?"Tap again to confirm removal":"Remove from Team"})}),e("div",{class:"drawer-actions",children:[e("button",{class:"cancel-btn",onClick:s,disabled:le.value,children:"Cancel"}),e("button",{class:"confirm-btn",onClick:a,disabled:le.value,children:le.value?"Saving...":"Save Changes"})]})]}),e("style",{children:`
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
          box-shadow: 0 4px 12px rgba(44, 110, 73, 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `})]})}function Ko(t){const r=q.value?.[t];kt.value=t,_t.value=r?.phone||"",Ct.value=r?.email||"",St.value=r?.notes||"",zt.value=r?.shareContactInDirectory||!1,$t.value=r?.shareNotesInDirectory||!1,Qe.value=!1,vr.value=t,xn.value=!0}function Zn(t){return t.toLowerCase().replace(/\s+/g,"")}function Ga(t){const r=k.value;return r?(J.value[t]||[]).some(o=>o.name&&Zn(o.name)===Zn(r)):!0}function Ya(t){E.value=t,k.value&&!Ga(t)?(Ar.value=k.value,Er.value=!0):(Ar.value="",Er.value=!1)}function qa(){const t=ko(null);L(()=>{const i=t.current;if(!i)return;const a=setTimeout(()=>{const l=i.querySelector('[data-today="true"]');l&&l.scrollIntoView({behavior:"instant",inline:"start",block:"nearest"})},50);return()=>clearTimeout(a)},[]);const r=[],n=new Date,o=cn(n);for(let i=-14;i<=21;i++){const a=new Date(n);a.setDate(n.getDate()+i);const l=cn(a),s=a.toLocaleDateString("en-US",{weekday:"short"}),d=a.getDate(),c=a.toLocaleDateString("en-US",{month:"short"}),u=(J.value[l]||[]).length,h=l===o,p=i<0;r.push({value:l,dayName:s,dayNum:d,monthName:c,isToday:h,isPast:p,checkinCount:u})}return e("div",{class:"date-selector",children:e("div",{class:"date-scroll",ref:t,children:r.map(i=>e("button",{class:`date-btn ${E.value===i.value?"selected":""} ${i.isPast?"past":""}`,onClick:()=>Ya(i.value),"data-date":i.value,"data-today":i.isToday?"true":void 0,children:[e("span",{class:"day-name",children:i.dayName}),e("span",{class:"day-num",children:i.dayNum}),e("span",{class:"month-name",children:i.monthName}),i.isToday&&e("span",{class:"today-badge",children:"Today"}),i.checkinCount>0&&e("span",{class:"checkin-badge",children:i.checkinCount})]},i.value))})})}function Ka(){const t=k.value,r=E.value;return!t||!r?null:(J.value[r]||[]).find(i=>i.name===t)||null}function Ja(t){return t==="singles"?"Singles only":t==="doubles"?"Doubles only":"Either"}function Qa(t){if(!t||!t.start||!t.end)return null;const r=n=>{const[o,i]=n.split(":"),a=parseInt(o),l=a>=12?"pm":"am",s=a>12?a-12:a===0?12:a;return i==="00"?`${s}${l}`:`${s}:${i}${l}`};return`${r(t.start)} - ${r(t.end)}`}function Xa(){k.value;const t=Ka(),r=!!t,n=()=>{Ir()},o=()=>{Ir(k.value,!0)},i=()=>{Ba()};return e(R,{children:[e("div",{class:"checkin-cta-section",children:[r?e("div",{class:"checkin-status-card",onClick:o,children:e("div",{class:"status-row",children:[e("span",{class:"status-icon",children:"✓"}),e("span",{class:"status-text",children:"You're in!"}),e("div",{class:"status-details",children:[e("span",{class:"detail-item",children:Ja(t.playStyle)}),t.allowRotation!==!1&&e("span",{class:"detail-item rotation",children:"Open to 3s"}),t.timeRange&&e("span",{class:"detail-item time",children:Qa(t.timeRange)})]}),e("button",{class:"edit-icon-btn",onClick:a=>{a.stopPropagation(),o()},title:"Edit",children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})})]})}):e("button",{class:"checkin-cta-btn",onClick:n,children:"Check In to Play"}),e("button",{class:"checkin-other-link",onClick:i,children:"Check in someone else"})]}),e("style",{children:`
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
      `})]})}const vt=v({}),nr=v(null),Vr=v(!1);function Jo(t){return{0:"☀️ Clear sky",1:"🌤️ Mainly clear",2:"⛅ Partly cloudy",3:"☁️ Overcast",45:"🌫️ Foggy",48:"🌫️ Foggy",51:"🌦️ Light drizzle",53:"🌦️ Drizzle",55:"🌧️ Heavy drizzle",61:"🌧️ Light rain",63:"🌧️ Rain",65:"🌧️ Heavy rain",71:"🌨️ Light snow",73:"🌨️ Snow",75:"🌨️ Heavy snow",77:"🌨️ Snow grains",80:"🌦️ Rain showers",81:"🌧️ Rain showers",82:"⛈️ Heavy rain showers",85:"🌨️ Snow showers",86:"🌨️ Heavy snow showers",95:"⛈️ Thunderstorm",96:"⛈️ Thunderstorm with hail",99:"⛈️ Severe thunderstorm"}[t]||"🌡️ Weather"}async function Za(t,r,n){const o=`${t},${r},${n}`;if(vt.value[o])return vt.value[o];try{const i=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${r}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&temperature_unit=fahrenheit&timezone=America/Los_Angeles&forecast_days=14`,a=await fetch(i);if(!a.ok)throw new Error("Weather API error");const l=await a.json();if(!l.daily||!l.daily.time||!Array.isArray(l.daily.time))throw new Error("Invalid weather data format");const s=l.daily.time.indexOf(n);if(s===-1)throw new Error("Weather data not available for this date");const d={tempMax:Math.round(l.daily.temperature_2m_max[s]),tempMin:Math.round(l.daily.temperature_2m_min[s]),precipProb:l.daily.precipitation_probability_max[s]||0,weatherCode:l.daily.weathercode[s]};return vt.value={...vt.value,[o]:d},d}catch(i){console.error("Weather fetch error:",i)}return null}function el(){if(L(()=>{const n=oe(()=>{const o=E.value,i=M.value.location;if(!o)return;const a=new Date;a.setHours(0,0,0,0);const l=new Date(o+"T00:00:00"),s=Math.floor((l.getTime()-a.getTime())/(1e3*60*60*24));if(s<0||s>=14){nr.value=null;return}const d=i?.lat??37.2358,c=i?.lon??-121.9623;Vr.value=!0,Za(d,c,o).then(f=>{nr.value=f,Vr.value=!1})});return()=>n()},[]),Vr.value)return e("div",{id:"weatherWidget",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 14px",background:"linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)",borderRadius:"10px",marginBottom:"8px",fontSize:"13px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)",color:"#666"},children:"Loading weather..."});if(!nr.value)return null;const t=nr.value,r=M.value.location?.name||"Los Gatos, CA";return e("div",{id:"weatherWidget",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)",borderRadius:"10px",marginBottom:"8px",fontSize:"13px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e("span",{style:{fontWeight:600,color:"#1976d2"},children:r}),e("span",{style:{color:"#666"},children:"•"}),e("span",{style:{color:"#666"},children:Jo(t.weatherCode)})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontWeight:600,color:"#333"},children:[t.tempMin,"°-",t.tempMax,"°F"]}),t.precipProb>0&&e("span",{style:{color:"#1976d2"},children:["💧",t.precipProb,"%"]})]})]})}function tl(){switch(M.value?.theme){case"roland-garros":return"#D2691E";case"australian-open":return"#1565C0";case"us-open":return"#0D47A1";case"wimbledon":default:return"#2E7D32"}}function rl(){switch(M.value?.theme){case"roland-garros":return"Roland-Garros";case"australian-open":return"Australian Open";case"us-open":return"US Open";case"wimbledon":return"Wimbledon";default:return"Classic"}}function eo({message:t="No check-ins yet",subtext:r="Be the first to check in!"}){const n=tl(),o="rgba(255, 255, 255, 0.9)";return e("div",{style:{textAlign:"center",padding:"var(--spacing-4xl, 24px) var(--spacing-2xl, 16px)",color:"var(--color-text-secondary, #666)"},children:[e("div",{style:{width:"120px",height:"80px",margin:"0 auto var(--spacing-2xl, 16px)",position:"relative",background:n,borderRadius:"var(--radius-lg, 8px)",overflow:"hidden",boxShadow:"var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))"},children:[e("div",{style:{position:"absolute",left:"50%",top:"20%",bottom:"20%",width:"2px",background:o,transform:"translateX(-50%)"}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",top:"50%",height:"3px",background:o,transform:"translateY(-50%)",boxShadow:"0 1px 2px rgba(0,0,0,0.2)"}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",top:"20%",height:"2px",background:o}}),e("div",{style:{position:"absolute",left:"10%",right:"10%",bottom:"20%",height:"2px",background:o}}),e("div",{style:{position:"absolute",left:"10%",top:"0",bottom:"0",width:"2px",background:o}}),e("div",{style:{position:"absolute",right:"10%",top:"0",bottom:"0",width:"2px",background:o}}),e("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:"14px",height:"14px",borderRadius:"50%",background:"linear-gradient(135deg, #c8e600 0%, #9acd32 100%)",boxShadow:"0 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.1)",animation:"ballPulse 2s ease-in-out infinite"},children:e("div",{style:{position:"absolute",top:"3px",left:"2px",right:"2px",height:"8px",border:"1px solid rgba(255,255,255,0.5)",borderRadius:"50%",borderBottom:"none"}})})]}),e("p",{style:{fontSize:"var(--font-size-lg, 16px)",fontWeight:"600",color:"var(--color-text-primary, #333)",margin:"0 0 var(--spacing-sm, 6px) 0"},children:t}),e("p",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #888)",margin:0},children:r})]})}function nl({text:t="Loading...",size:r="medium"}){const n={small:{ball:20,container:40},medium:{ball:32,container:60},large:{ball:48,container:90}},{ball:o,container:i}=n[r];return e("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"var(--spacing-4xl, 24px)"},children:[e("div",{style:{height:`${i}px`,display:"flex",alignItems:"flex-end",marginBottom:"var(--spacing-lg, 12px)"},children:e("div",{style:{width:`${o}px`,height:`${o}px`,borderRadius:"50%",background:"linear-gradient(135deg, #c8e600 0%, #9acd32 100%)",boxShadow:"0 4px 8px rgba(0,0,0,0.3), inset -3px -3px 6px rgba(0,0,0,0.1)",animation:"tennisBounce 0.6s ease-in-out infinite",position:"relative"},children:e("div",{style:{position:"absolute",top:`${o*.15}px`,left:`${o*.1}px`,right:`${o*.1}px`,height:`${o*.5}px`,border:`${Math.max(1,o*.06)}px solid rgba(255,255,255,0.6)`,borderRadius:"50%",borderBottom:"none"}})})}),e("div",{style:{width:`${o*.8}px`,height:`${o*.15}px`,background:"rgba(0,0,0,0.2)",borderRadius:"50%",marginTop:`-${o*.1}px`,animation:"ballShadow 0.6s ease-in-out infinite"}}),t&&e("p",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #888)",marginTop:"var(--spacing-lg, 12px)"},children:t})]})}function ol({text:t="Loading..."}){const r=rl();return e("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"var(--color-bg-page, #f5f5f5)"},children:[e(nl,{text:t,size:"large"}),r!=="Classic"&&e("p",{style:{fontSize:"var(--font-size-xs, 11px)",color:"var(--color-text-muted, #999)",marginTop:"var(--spacing-md, 8px)"},children:[r," theme"]})]})}function pe(t){return t.toLowerCase().replace(/\s+/g,"")}function il(t){switch(t){case"singles":return"Singles";case"doubles":return"Doubles";default:return"Either"}}const Qo=v(!1),Gt=v(null),Ee=v("both"),Mr=v(""),Dr=v(""),bn=v(!0),Xo=v(!1),yn=v(null),ze=v(""),xe=v(!1),mr=v("confirm"),re=v(""),Zo=v(""),Yt=v(null),Fe=v(!1),st=v(!1),Z=v(null),ee=v(null);typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;!r.closest(".share-dropdown")&&!r.closest("[data-share-button]")&&(Yt.value&&(Yt.value=null),Fe.value&&(Fe.value=!1))});function xr(){Xo.value=!1,yn.value=null,ze.value="",xe.value=!1,mr.value="confirm",re.value="",Zo.value=""}async function al(){const t=yn.value;if(t===null)return;const r=ze.value,n=xe.value,o=re.value;yn.value=null,await Bo(t,k.value),xr(),he.value={action:"removal",name:r,date:o,isOwner:n},ue.value=!0}function ei(){Qo.value=!1,Gt.value=null}async function ll(){if(Gt.value===null)return;const t={playStyle:Ee.value,allowRotation:bn.value};(Mr.value||Dr.value)&&(t.timeRange={start:Mr.value,end:Dr.value}),await Fo(Gt.value,t,k.value),ei()}function sl(t){const r=_.value,n=t.name||"",o=k.value&&pe(k.value)===pe(n),i=t.addedBy&&k.value&&pe(k.value)===pe(t.addedBy),a=r&&sessionStorage.getItem(`adminAuth_${r}`)==="true";return!!(o||i||a)}function Ue({matchKey:t}){const r=H.value[t]||"",[n,o]=we(r);return L(()=>{o(H.value[t]||"")},[H.value[t]]),e("div",{style:"padding: 8px 12px; background: var(--color-bg-muted, #f9f9f9); border-radius: var(--radius-lg, 8px); margin-top: 8px;",children:[e("div",{style:"font-size: 11px; color: #666; margin-bottom: 4px; font-weight: 500;",children:"Booking Details"}),e("input",{type:"text",placeholder:"e.g. Courtside Court 1, 12PM",value:n,onInput:a=>{o(a.target.value)},onBlur:()=>{const a=n.trim(),l=H.value[t]||"";a!==l&&Ni(t,a)},style:{width:"100%",padding:"8px 12px",border:"1px solid #e0e0e0",borderRadius:"6px",fontSize:"14px",background:"white"}})]})}function ke({checkin:t,globalIndex:r}){const n=k.value&&pe(t.name)===pe(k.value),o=sl(t);let i="";t.isGuest?i=`guest of ${t.addedBy}`:t.addedBy&&pe(t.addedBy)!==pe(t.name)&&(i=`added by ${t.addedBy}`);const a=t.timeRange?se(t.timeRange.start,t.timeRange.end):"",l=()=>{Ir(t.name,!0)};return e("div",{class:n?"checkin-item current-user":"checkin-item",children:[e("span",{children:[e("span",{class:"checkin-name",children:[r+1,". ",t.name,n&&e("span",{class:"current-user-badge",children:"YOU"}),i&&e("span",{class:"guest-indicator",children:[" ",i]}),a&&e("span",{class:"time-badge",children:a}),t.allowRotation===!1&&e("span",{class:"time-badge",style:"background: #fff3e0; color: #e65100;",children:"No 3s"})]}),e("span",{class:`preference-badge ${t.playStyle||"both"}`,children:il(t.playStyle||"both")}),e("span",{class:"checkin-time",children:Lo(t.timestamp)})]}),o&&e("button",{class:"edit-btn",onClick:l,title:"Edit check-in",style:{background:"white",color:"var(--color-primary, #2C6E49)",border:"1px solid #e0e0e0",borderRadius:"8px",padding:"0",width:"32px",height:"32px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})})]})}function cl(t,r){const o=new Date(r+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),i=t.players.map(s=>s.name).join(" & "),a=_.value,l=`${window.location.origin}${window.location.pathname}#${a}`;if(t.type==="doubles-forming"){const s=t.needed||4-t.players.length;let c=`🎾 ${s===1?"1 more player needed":`${s} more players needed`} for doubles!
`;return c+=`📅 ${o}
`,c+=`👥 ${i} ${t.players.length===1?"is":"are"} in

`,c+=`Can you make it? ${l}`,c}else if(t.type==="singles-forming"){const s=t.players[0];let d=`🎾 1 more player needed for singles!
`;return d+=`📅 ${o}
`,d+=`👤 ${s.name} is in`,s.timeRange&&(d+=` (${se(s.timeRange.start,s.timeRange.end)})`),d+=`

Can you make it? ${l}`,d}return""}function Gr(t,r,n){const o=cl(t,r);if(n==="whatsapp"){const i=encodeURIComponent(o);window.open(`https://wa.me/?text=${i}`,"_blank")}else if(n==="sms"){const i=encodeURIComponent(o);window.open(`sms:?body=${i}`,"_blank")}else n==="copy"&&navigator.clipboard.writeText(o).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});Yt.value=null}function to({match:t,matchKey:r}){const n=E.value||"",o=Yt.value===r;return e("div",{style:"position: relative; display: inline-block;",children:[e("button",{"data-share-button":!0,onClick:i=>{i.stopPropagation(),Yt.value=o?null:r},style:{background:o?"#e65100":"#ff9800",border:"none",borderRadius:"12px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"white",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(255, 152, 0, 0.3)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",style:{transform:o?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),o&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:()=>Gr(t,n,"whatsapp"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#25D366"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>Gr(t,n,"sms"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#2196F3",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>Gr(t,n,"copy"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#666",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]})}function dl(t,r,n){let a=`${new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
`,l=0,s=0;t.forEach(g=>{if(g.type==="doubles"){const m=g.players.map(y=>y.name);a+=`Doubles: ${m.join(", ")}
`;const b=g.players.filter(y=>y.timeRange).map(y=>se(y.timeRange.start,y.timeRange.end));b.length>0&&(a+=`${b[0]}
`);const x=`doubles-${g.number}`;H.value[x]&&(a+=`📝 ${H.value[x]}
`),a+=`
`}else if(g.type==="singles"){l++;const m=g.players.map(S=>S.name);a+=`Singles: ${m.join(", ")}
`;const b=g.players.every(S=>(S.playStyle||"both")==="both"),x=g.players.some(S=>S.allowRotation===!0);b&&x&&(a+=`Open to more players
`);const y=g.players.filter(S=>S.timeRange).map(S=>se(S.timeRange.start,S.timeRange.end));y.length>0&&(a+=`${y[0]}
`);const C=`singles-${l}`;H.value[C]&&(a+=`📝 ${H.value[C]}
`),a+=`
`}else if(g.type==="singles-or-practice"){s++,a+=`Rotation: ${g.players.map(x=>x.name).join(", ")}
`;const m=g.players.filter(x=>x.timeRange).map(x=>se(x.timeRange.start,x.timeRange.end));m.length>0&&(a+=`${m[0]}
`);const b=`rotation-${s}`;H.value[b]&&(a+=`📝 ${H.value[b]}
`),a+=`
`}else if(g.type==="doubles-forming"){const m=g.players.map(C=>C.name),b=g.needed===1?"need 1 more":`need ${g.needed} more`;a+=`Doubles (forming): ${m.join(", ")}
`,a+=`${b}
`,g.canRotate?a+=`Can rotate if no 4th
`:g.canPlaySingles&&(g.eitherCount||0)>=2?a+=`Will play singles if no more join
`:(g.eitherCount||0)===1&&g.players.length===1&&(a+=`Can play singles if 1 more joins
`);const x=g.players.filter(C=>C.timeRange).map(C=>se(C.timeRange.start,C.timeRange.end));x.length>0&&(a+=`${x[0]}
`);const y="doubles-forming-1";H.value[y]&&(a+=`📝 ${H.value[y]}
`),a+=`
`}else if(g.type==="singles-forming"){const m=g.players[0];a+=`Singles (forming): ${m.name}
`,a+=`need 1 more
`,m.timeRange&&(a+=`${se(m.timeRange.start,m.timeRange.end)}
`),a+=`
`}});const d=t.filter(g=>g.type==="waiting");if(d.length>0){const g=d.flatMap(m=>m.players.map(b=>b.name));g.length>0&&(a+=`Standby: ${g.join(", ")}
`)}const c=M.value.location,f=c?.lat??37.2358,u=c?.lon??-121.9623,h=`${f},${u},${n}`,p=vt.value[h];if(p){const g=Jo(p.weatherCode);a+=`${g}, ${p.tempMax}°F`}return a.trim()}function Yr(t,r,n,o){const i=dl(t,r,n);if(o==="whatsapp"){const a=encodeURIComponent(i);window.open(`https://wa.me/?text=${a}`,"_blank")}else if(o==="sms"){const a=encodeURIComponent(i);window.open(`sms:?body=${a}`,"_blank")}else o==="copy"&&navigator.clipboard.writeText(i).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});Fe.value=!1}function pl(){const t=E.value;t&&confirm(`Are you sure you want to reset all check-ins for ${Y(t)}?

This cannot be undone.`)&&Pi()}function _e(t,r){return t.findIndex(n=>pe(n.name)===pe(r.name)&&n.timestamp===r.timestamp)}function ul(t,r){const n={matches:{},unassigned:[]};let o=0,i=0;return t.forEach(a=>{const l=a.players.map(s=>s.name);if(a.type==="doubles"||a.type==="doubles-forming"){o++;const s=`doubles-${o}`;n.matches[s]={players:l,note:H.value[s]||""}}else if(a.type==="singles"||a.type==="singles-forming"||a.type==="singles-or-practice"){i++;const s=`singles-${i}`;n.matches[s]={players:l,note:H.value[s]||""}}else a.type==="waiting"&&n.unassigned.push(...l)}),n}function ro(t,r){if(!st.value||!ee.value)return;const n=Z.value;if(!n)Z.value={name:t,matchKey:r};else if(n.name===t&&n.matchKey===r)Z.value=null;else{const o=ee.value,i={...o.matches},a=[...o.unassigned];if(n.matchKey==="unassigned"){const l=a.indexOf(n.name);l>-1&&a.splice(l,1)}else{const l=i[n.matchKey];l&&(l.players=l.players.filter(s=>s!==n.name))}if(r==="unassigned"){const l=a.indexOf(t);l>-1&&a.splice(l,1)}else{const l=i[r];l&&(l.players=l.players.filter(s=>s!==t))}r==="unassigned"?a.push(n.name):i[r].players.push(n.name),n.matchKey==="unassigned"?a.push(t):i[n.matchKey].players.push(t),ee.value={matches:i,unassigned:a},Z.value=null,w(`Swapped ${n.name} and ${t}`,"info")}}function hl(t,r){try{P.value&&P.value.matches&&typeof P.value.matches=="object"?ee.value={matches:{...P.value.matches},unassigned:Array.isArray(P.value.unassigned)?[...P.value.unassigned]:[]}:ee.value=ul(t,r),Z.value=null,st.value=!0}catch(n){console.error("Error starting arrange mode:",n),ee.value={matches:{},unassigned:r.map(o=>o.name)},Z.value=null,st.value=!0}}function ti(){st.value=!1,Z.value=null,ee.value=null}async function fl(){ee.value&&(await Bi(ee.value),st.value=!1,Z.value=null,ee.value=null)}async function gl(){await ji(),ti()}function vl(){Oi();const t=Zl.value,r=E.value||"",n=Gt.value!==null?t[Gt.value]:null,o=_.value,i=o&&sessionStorage.getItem(`adminAuth_${o}`)==="true",a=st.value,l=!!(P.value&&P.value.matches&&Object.keys(P.value.matches).length>0),s=e(R,{children:[e(Ie,{isOpen:Qo.value,onClose:ei,title:`Edit ${n?.name||""}'s Preferences`,children:e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:[e("div",{children:[e("label",{style:"display: block; font-weight: 500; margin-bottom: 8px;",children:"Play Style"}),e("div",{style:"display: flex; gap: 8px;",children:["singles","doubles","both"].map(p=>e("button",{onClick:()=>{Ee.value=p},style:{flex:1,padding:"10px",border:Ee.value===p?"2px solid var(--color-primary, #2C6E49)":"2px solid #e0e0e0",borderRadius:"8px",background:Ee.value===p?"var(--color-primary-light, #E8F5E9)":"#fff",color:Ee.value===p?"var(--color-primary, #2E7D32)":"#666",cursor:"pointer",fontWeight:Ee.value===p?"600":"400"},children:p==="singles"?"Singles":p==="doubles"?"Doubles":"Either"},p))})]}),e("div",{children:[e("label",{style:"display: block; font-weight: 500; margin-bottom: 8px;",children:"Available Time (optional)"}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[e("input",{type:"time",value:Mr.value,onInput:p=>{Mr.value=p.target.value},style:"flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px;"}),e("span",{children:"to"}),e("input",{type:"time",value:Dr.value,onInput:p=>{Dr.value=p.target.value},style:"flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px;"})]})]}),Ee.value==="singles"&&e("div",{children:[e("label",{style:"display: flex; align-items: center; gap: 8px; cursor: pointer;",children:[e("input",{type:"checkbox",checked:bn.value,onChange:p=>{bn.value=p.target.checked}}),e("span",{children:"Open to 3-player rotation"})]}),e("p",{style:"font-size: 12px; color: #666; margin: 4px 0 0 24px;",children:"If unchecked, you'll only be matched for 2-player singles"})]}),e("button",{onClick:ll,style:{padding:"12px",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer",marginTop:"8px"},children:"Save Changes"})]})}),e(Ie,{isOpen:Xo.value,onClose:xr,title:mr.value==="done"?"":xe.value?"Remove Your Check-in?":`Remove ${ze.value}?`,showCloseButton:mr.value!=="done",children:e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:mr.value==="confirm"?e(R,{children:[xe.value?e(R,{children:[e("p",{style:"color: #666; margin: 0; line-height: 1.5;",children:"Are you sure you want to remove yourself from this date?"}),e("div",{style:"background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;",children:[e("p",{style:"margin: 0 0 8px 0; font-weight: 500; color: #E65100;",children:"Things to consider:"}),e("ul",{style:"margin: 0; padding-left: 20px; color: #666; font-size: 14px;",children:[e("li",{children:"You'll lose your current spot in the check-in order"}),e("li",{children:["If you want to change your preferences, you can ",e("strong",{children:"edit"})," instead"]}),e("li",{children:"You can always check in again after removing"})]})]})]}):e(R,{children:[e("p",{style:"color: #666; margin: 0; line-height: 1.5;",children:["Are you sure you want to remove ",e("strong",{children:ze.value})," from this date?"]}),e("div",{style:"background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;",children:e("p",{style:"margin: 0; color: #666; font-size: 14px;",children:["They will lose their spot in the check-in order. Consider using ",e("strong",{children:"edit"})," to update their preferences instead."]})})]}),e("div",{style:"display: flex; gap: 12px; margin-top: 8px;",children:[e("button",{onClick:xr,style:{flex:1,padding:"12px",background:"#f5f5f5",color:"#666",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"500",cursor:"pointer"},children:"Cancel"}),e("button",{onClick:al,style:{flex:1,padding:"12px",background:"#ef5350",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer"},children:"Yes, Remove"})]})]}):e(R,{children:[e("div",{style:"text-align: center; padding: 8px 0;",children:[e("div",{style:"font-size: 48px; margin-bottom: 8px;",children:"✓"}),e("p",{style:"color: #666; margin: 0;",children:xe.value?`You've been removed from ${Y(re.value)}`:`${ze.value} has been removed from ${Y(re.value)}`})]}),e("div",{children:[e("p",{style:"margin: 0 0 8px 0; font-size: 13px; color: #666; text-align: center;",children:"Let others know:"}),e("div",{style:"display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;",children:[e("a",{href:`https://wa.me/?text=${encodeURIComponent(xe.value?`I'm out on ${Y(re.value)}.`:`Hi ${ze.value}, I removed you from ${Y(re.value)}. Let me know if you have questions!`)}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#25D366",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"WhatsApp"}),e("a",{href:`sms:?body=${encodeURIComponent(xe.value?`I'm out on ${Y(re.value)}.`:`Hi ${ze.value}, I removed you from ${Y(re.value)}. Let me know if you have questions!`)}`,style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#007AFF",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"Text"}),e("a",{href:`mailto:?subject=${encodeURIComponent(xe.value?`I'm Out on ${Y(re.value)}`:`${Zo.value} - Check-in Removed`)}&body=${encodeURIComponent(xe.value?`I'm out on ${Y(re.value)}.`:`Hi ${ze.value},

I removed you from ${Y(re.value)}.

Let me know if you have questions!`)}`,style:{display:"flex",alignItems:"center",gap:"4px",padding:"8px 16px",background:"#EA4335",color:"white",borderRadius:"6px",fontSize:"14px",textDecoration:"none"},children:"Email"})]})]}),e("button",{onClick:xr,style:{width:"100%",padding:"12px",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:"600",cursor:"pointer",marginTop:"8px"},children:"Done"})]})})})]});if(t.length===0)return e(R,{children:[e(eo,{message:"No check-ins yet",subtext:"Be the first to check in for this date!"}),s]});const{matches:d,warnings:c}=Lr(t),f=d.some(p=>p.type!=="waiting"||p.players.length>0);if(!f&&c.length===0)return e(R,{children:[e(eo,{message:"No check-ins yet",subtext:"Be the first to check in for this date!"}),s]});let u=0,h=0;return e(R,{children:[e("div",{class:"games-list",style:"margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;",children:[e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("h2",{style:"margin: 0; font-size: var(--font-size-xl, 18px); font-weight: 600;",children:["Games ",e("span",{style:"font-size: var(--font-size-sm, 13px); font-weight: 500; color: var(--color-text-secondary, #666);",children:["(",t.length," checked in)"]})]}),l&&!a&&e("span",{style:{fontSize:"11px",background:"#9C27B0",color:"white",padding:"2px 6px",borderRadius:"4px",fontWeight:"600"},children:"Arranged"})]}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:a?e(R,{children:[e("button",{onClick:fl,style:{background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"600",cursor:"pointer"},children:"Save"}),e("button",{onClick:ti,style:{background:"#f5f5f5",color:"#666",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer"},children:"Cancel"}),l&&e("button",{onClick:gl,style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"500",cursor:"pointer"},children:"Reset"})]}):e(R,{children:[f&&e("div",{style:"position: relative;",children:[e("button",{"data-share-button":!0,onClick:()=>{Fe.value=!Fe.value},title:"Share Games",style:{background:Fe.value?"var(--color-primary-dark, #1a402b)":"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),Fe.value&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",zIndex:100,overflow:"hidden",minWidth:"160px"},children:[e("button",{onClick:()=>Yr(d,t,r,"whatsapp"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#333"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"#25D366",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>Yr(d,t,r,"sms"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#333"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"#2196F3",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>Yr(d,t,r,"copy"),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#333"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"#666",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),i&&t.length>=2&&e("button",{onClick:()=>hl(d,t),title:"Arrange Players",style:{background:"#9C27B0",color:"white",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})}),"Arrange"]}),i&&t.length>0&&!f&&e("button",{class:"reset-day-btn",onClick:pl,title:"Reset This Day",style:{background:"rgba(255, 82, 82, 0.1)",color:"#e57373",border:"none",borderRadius:"50%",padding:"0",width:"36px",height:"36px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})})]}),a&&e("div",{style:{background:"#F3E5F5",borderRadius:"8px",padding:"12px",marginBottom:"16px",color:"#7B1FA2",fontSize:"14px"},children:[e("strong",{children:"Arrange Mode:"})," Tap a player to select, then tap another player to swap their positions.",Z.value&&e("span",{style:{display:"block",marginTop:"4px"},children:["Selected: ",e("strong",{children:Z.value.name})," - tap another player to swap"]})]}),a&&ee.value&&e(R,{children:[Object.entries(ee.value.matches||{}).map(([p,g])=>{const m=p.startsWith("doubles"),b=p.split("-")[1],x=g?.players||[];return x.length===0?null:e("div",{class:"match-group",style:{marginBottom:"16px",border:"2px dashed #9C27B0",borderRadius:"8px",padding:"8px"},children:[e("h3",{style:"margin: 0 0 8px 0;",children:[m?`Doubles ${b}`:`Singles ${b}`,e("span",{style:{fontSize:"12px",color:"#666",marginLeft:"8px"},children:["(",x.length,"/",m?4:2,")"]})]}),e("div",{style:"display: flex; flex-direction: column; gap: 4px;",children:x.map(y=>{const C=Z.value?.name===y&&Z.value?.matchKey===p;return e("div",{onClick:()=>ro(y,p),style:{padding:"10px 12px",background:C?"#9C27B0":"#f5f5f5",color:C?"white":"#333",borderRadius:"6px",cursor:"pointer",fontWeight:"500",transition:"all 0.15s",border:C?"2px solid #7B1FA2":"2px solid transparent"},children:y},y)})})]},p)}),ee.value.unassigned.length>0&&e("div",{class:"match-group",style:{marginBottom:"16px",border:"2px dashed #9e9e9e",borderRadius:"8px",padding:"8px",background:"#fafafa"},children:[e("h3",{style:"margin: 0 0 8px 0; color: #666;",children:"Unassigned"}),e("div",{style:"display: flex; flex-direction: column; gap: 4px;",children:ee.value.unassigned.map(p=>{const g=Z.value?.name===p&&Z.value?.matchKey==="unassigned";return e("div",{onClick:()=>ro(p,"unassigned"),style:{padding:"10px 12px",background:g?"#9C27B0":"#fff",color:g?"white":"#333",borderRadius:"6px",cursor:"pointer",fontWeight:"500",transition:"all 0.15s",border:g?"2px solid #7B1FA2":"2px solid #e0e0e0"},children:p},p)})})]})]}),!a&&!l&&c.length>0&&e("div",{class:"warning-box",children:c.map((p,g)=>e("div",{children:p},g))}),!a&&l&&P.value&&P.value.matches&&e(R,{children:[Object.entries(P.value.matches).map(([p,g])=>{const m=p.startsWith("doubles"),b=p.split("-")[1],x=m?4:2,y=g?.players||[],C=y.length>=x,S=y.map(z=>t.find(Q=>Q.name===z)||{name:z,timestamp:0});return e("div",{class:`match-group ${C?"":"forming-group"}`,style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:[m?"Doubles":"Singles"," ",b]}),C?e("span",{style:"display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]}):e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",x-y.length]})]}),e("div",{id:"checkinList",children:S.map(z=>{const A=_e(t,z);return e(ke,{checkin:z,globalIndex:A>=0?A:-1},A>=0?A:z.name)})}),e(Ue,{matchKey:p})]},p)}),P.value.unassigned&&P.value.unassigned.length>0&&e("div",{class:"match-group waiting-group",style:"margin-bottom: 16px;",children:[e("h3",{style:"margin: 0 0 8px 0;",children:"Unassigned"}),e("div",{id:"checkinList",children:P.value.unassigned.map(p=>{const g=t.find(x=>x.name===p),m=g||{name:p,timestamp:0},b=g?_e(t,m):-1;return e(ke,{checkin:m,globalIndex:b>=0?b:-1},b>=0?b:p)})})]})]}),!a&&!l&&d.map((p,g)=>{if(p.type==="doubles"){const m=`doubles-${p.number}`;return e("div",{class:"match-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:["Doubles ",p.number]}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),e("div",{id:"checkinList",children:p.players.map(b=>{const x=_e(t,b);return e(ke,{checkin:b,globalIndex:x},x)})}),e(Ue,{matchKey:m})]},g)}if(p.type==="singles"){u++;const m=`singles-${u}`,b=p.players.every(C=>(C.playStyle||"both")==="both"),x=p.players.some(C=>C.allowRotation===!0),y=b&&x;return e("div",{class:"match-group singles-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:["Singles",u>1?` ${u}`:""]}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),e("div",{id:"checkinList",children:p.players.map(C=>{const S=_e(t,C);return e(ke,{checkin:C,globalIndex:S},S)})}),y&&e("p",{style:"color: #666; font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;",children:"Open to more players"}),e(Ue,{matchKey:m})]},g)}if(p.type==="singles-or-practice"){h++;const m=`rotation-${h}`;return e("div",{class:"match-group singles-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Rotation (3 players)"}),e("span",{style:"display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]})]}),e("div",{id:"checkinList",children:p.players.map(b=>{const x=_e(t,b);return e(ke,{checkin:b,globalIndex:x},x)})}),e(Ue,{matchKey:m})]},g)}if(p.type==="doubles-forming"){const m="doubles-forming-1",b=p.needed||4-p.players.length;let x="";return p.canRotate?x="Can rotate if no 4th":p.canPlaySingles&&(p.eitherCount||0)>=2?x="Will play singles if no more join":(p.eitherCount||0)===1&&p.players.length===1&&(x="Can play singles if 1 more joins"),e("div",{class:"match-group forming-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Doubles"}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",b]}),e(to,{match:p,matchKey:m,needed:b})]})]}),e("div",{id:"checkinList",children:p.players.map(y=>{const C=_e(t,y);return e(ke,{checkin:y,globalIndex:C},C)})}),x&&e("p",{style:"color: #666; font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;",children:x}),e(Ue,{matchKey:m})]},g)}if(p.type==="singles-forming"){const m="singles-forming-1";return e("div",{class:"match-group forming-group",style:"margin-bottom: 16px;",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;",children:[e("h3",{style:"margin: 0;",children:"Singles"}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need 1"]}),e(to,{match:p,matchKey:m,needed:1})]})]}),e("div",{id:"checkinList",children:p.players.map(b=>{const x=_e(t,b);return e(ke,{checkin:b,globalIndex:x},x)})}),e(Ue,{matchKey:m})]},g)}return p.type==="waiting"?e("div",{class:"match-group waiting-group",style:"margin-bottom: 16px;",children:[e("h3",{style:"margin: 0 0 8px 0;",children:"Waiting for Match"}),e("div",{id:"checkinList",children:p.players.map(m=>{const b=_e(t,m);return e(ke,{checkin:m,globalIndex:b},b)})})]},g):null})]}),s]})}function ml(){return e("div",{children:[e(qa,{}),e(el,{}),e(Xa,{}),e(vl,{})]})}function He(t,r){const n=t.replace(/-/g,"");if(r){const o=r.replace(":","")+"00";return`${n}T${o}`}return n}function qr(t){return t.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n")}function xl(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}@tenniscoordinator`}function bl(t){const{date:r,title:n,description:o,location:i,startTime:a,endTime:l}=t,s=xl(),c=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";let f=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Tennis Coordinator//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",`UID:${s}`,`DTSTAMP:${c}`];if(a&&l)f.push(`DTSTART:${He(r,a)}`),f.push(`DTEND:${He(r,l)}`);else if(a){f.push(`DTSTART:${He(r,a)}`);const[u,h]=a.split(":").map(Number),g=`${((u+2)%24).toString().padStart(2,"0")}:${h.toString().padStart(2,"0")}`;f.push(`DTEND:${He(r,g)}`)}else{f.push(`DTSTART;VALUE=DATE:${He(r)}`);const u=new Date(r+"T00:00:00");u.setDate(u.getDate()+1);const h=u.toISOString().split("T")[0];f.push(`DTEND;VALUE=DATE:${He(h)}`)}return f.push(`SUMMARY:${qr(n)}`),f.push(`DESCRIPTION:${qr(o)}`),i&&f.push(`LOCATION:${qr(i)}`),f.push("END:VEVENT"),f.push("END:VCALENDAR"),f.join(`\r
`)}function yl(){return/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)}function wl(t){const{date:r,title:n,description:o,location:i,startTime:a,endTime:l}=t;let s;if(a&&l){const f=`${r.replace(/-/g,"")}T${a.replace(":","")}00`,u=`${r.replace(/-/g,"")}T${l.replace(":","")}00`;s=`${f}/${u}`}else if(a){const[f,u]=a.split(":").map(Number),p=`${((f+2)%24).toString().padStart(2,"0")}${u.toString().padStart(2,"0")}00`,g=`${r.replace(/-/g,"")}T${a.replace(":","")}00`,m=`${r.replace(/-/g,"")}T${p}`;s=`${g}/${m}`}else{const f=r.replace(/-/g,""),u=new Date(r+"T00:00:00");u.setDate(u.getDate()+1);const h=u.toISOString().split("T")[0].replace(/-/g,"");s=`${f}/${h}`}const d="https://calendar.google.com/calendar/render",c=new URLSearchParams({action:"TEMPLATE",text:n,dates:s,details:o});return i&&c.set("location",i),`${d}?${c.toString()}`}function kl(t,r){if(yl()){const n=wl(t);window.open(n,"_blank")}else{const n=bl(t),o=new Blob([n],{type:"text/calendar;charset=utf-8"}),i=URL.createObjectURL(o),a=document.createElement("a");a.href=i,a.download=`tennis-${t.date}.ics`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}}function _l(t){const{date:r,matchType:n,players:o,groupName:i,location:a,notes:l}=t,d=`${n.includes("doubles")?"Doubles":n.includes("singles")?"Singles":"Tennis"} - ${i}`;let c=`Players: ${o.map(p=>p.name).join(", ")}`;l&&(c+=`

Notes: ${l}`);let f,u;const h=o.filter(p=>p.timeRange);if(h.length>0){const p=h.map(m=>m.timeRange.start).sort(),g=h.map(m=>m.timeRange.end).sort();f=p[p.length-1],u=g[0],f>=u&&(f=h[0].timeRange.start,u=h[0].timeRange.end)}return{date:r,title:d,description:c,location:a,startTime:f,endTime:u}}const qt=v(null),Se=v(null),Pe=v(!1),Kt=v(!1),Be=v(new Set),It=v(!1);function Cl(){const t=_.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}typeof document<"u"&&document.addEventListener("click",t=>{const r=t.target;qt.value&&!r.closest(".share-dropdown")&&!r.closest("[data-share-button]")&&(qt.value=null),Pe.value&&!r.closest(".member-picker-dropdown")&&!r.closest("[data-member-picker-button]")&&(Pe.value=!1)});function Mt(t){return t.toLowerCase().replace(/\s+/g,"")}const Sl=it(()=>{const t=Se.value||k.value;if(!t)return[];const r=Mt(t),n=[],o=new Date;o.setHours(0,0,0,0);const i=Object.keys(J.value).sort();for(const a of i){if(new Date(a+"T00:00:00")<o)continue;const s=J.value[a]||[];if(s.length===0)continue;const d={},c=q.value||{};for(const[u,h]of Object.entries(c))h&&typeof h=="object"&&(d[Mt(u)]={include:h.include||[],exclude:h.exclude||[]});const f=Lr(s,d);for(const u of f.matches)if(u.players.map(p=>Mt(p.name)).includes(r)){const p=u.type==="doubles-forming"||u.type==="singles-forming";n.push({date:a,type:u.type,matchNumber:u.number||1,players:u.players.map(g=>({name:g.name,timeRange:g.timeRange})),isForming:p,needed:u.needed})}}return n});function wn(t){switch(t){case"doubles":case"doubles-forming":return"Doubles";case"singles":case"singles-forming":return"Singles";case"rotation":case"singles-or-practice":return"Rotation";default:return t}}function zl(t){const n=new Date(t.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),o=t.players.map(l=>l.name).join(" & "),i=_.value,a=`${window.location.origin}${window.location.pathname}#${i}`;if(t.type==="doubles-forming"){const l=t.needed||4-t.players.length;let d=`🎾 ${l===1?"1 more player needed":`${l} more players needed`} for doubles!
`;return d+=`📅 ${n}
`,d+=`👥 ${o} ${t.players.length===1?"is":"are"} in

`,d+=`Can you make it? ${a}`,d}else if(t.type==="singles-forming"){const l=t.players[0];let s=`🎾 1 more player needed for singles!
`;return s+=`📅 ${n}
`,s+=`👤 ${l.name} is in`,l.timeRange&&(s+=` (${se(l.timeRange.start,l.timeRange.end)})`),s+=`

Can you make it? ${a}`,s}return""}function Kr(t,r){const n=zl(t);if(r==="whatsapp"){const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")}else if(r==="sms"){const o=encodeURIComponent(n);window.open(`sms:?body=${o}`,"_blank")}else r==="copy"&&navigator.clipboard.writeText(n).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});qt.value=null}function no(t){Kt.value||(E.value=t,ce.value="checkin")}function $l(t){const r=`${t.type.replace("-forming","")}-${t.matchNumber}`,n=H.value[r]||"",o=_l({date:t.date,matchType:t.type,players:t.players,groupName:K.value||"Tennis",location:M.value.location?.name,notes:n});kl(o),w("Calendar event downloaded","success")}function Il(t){const r=new Set(Be.value);r.has(t)?r.delete(t):r.add(t),Be.value=r}function Ml(){Kt.value=!1,Be.value=new Set,It.value=!1}function Dl(t,r){const n=_.value,o=`${window.location.origin}${window.location.pathname}#${n}`,i=t.filter((d,c)=>{const f=`mygames-${d.date}-${d.type}-${c}`;return r.has(f)});if(i.length===0)return"";const a=i.filter(d=>!d.isForming),l=i.filter(d=>d.isForming);let s=`🎾 Tennis Update

`;if(a.length>0){s+=`✅ Ready to Play:
`;for(const d of a){const f=new Date(d.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),u=wn(d.type),h=d.players.map(p=>p.name).join(", ");s+=`• ${f} - ${u}
  ${h}
`}s+=`
`}if(l.length>0){s+=`🟡 Need Players:
`;for(const d of l){const f=new Date(d.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),u=wn(d.type),h=d.needed||1,p=d.players.map(g=>g.name).join(", ");s+=`• ${f} - ${u} needs ${h}
  ${p}
`}s+=`
`}return s+=`Check in: ${o}`,s}function or(t,r){const n=Dl(r,Be.value);if(!n){w("No games selected","error");return}if(t==="native"&&navigator.share)navigator.share({title:"Tennis Update",text:n}).catch(()=>{navigator.clipboard.writeText(n).then(()=>{w("Copied to clipboard","success")})});else if(t==="whatsapp"){const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")}else if(t==="sms"){const o=encodeURIComponent(n);window.open(`sms:?body=${o}`,"_blank")}else navigator.clipboard.writeText(n).then(()=>{w("Copied to clipboard","success")}).catch(()=>{w("Failed to copy","error")});It.value=!1,Kt.value=!1,Be.value=new Set}function El(){Di();const t=Sl.value,r=Cl(),n=Se.value||k.value,o=Se.value&&Se.value!==k.value,i=Be.value.size,a=Kt.value;return e("div",{style:"padding: 16px 0;",children:[a&&e("div",{style:{position:"fixed",bottom:"70px",left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:"400px",background:"white",borderRadius:"16px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",zIndex:100,boxShadow:"0 4px 16px rgba(0,0,0,0.15)"},children:[e("button",{onClick:Ml,style:{background:"#f5f5f5",border:"1px solid #ddd",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",cursor:"pointer",color:"#666"},children:"Cancel"}),e("span",{style:{fontSize:"14px",color:"#666"},children:[i," selected"]}),e("div",{style:{position:"relative"},children:[e("button",{onClick:()=>{It.value=!It.value},disabled:i===0,style:{background:i>0?"var(--color-primary, #2C6E49)":"#ccc",border:"none",borderRadius:"20px",padding:"8px 16px",fontSize:"14px",fontWeight:"600",cursor:i>0?"pointer":"default",color:"white",display:"flex",alignItems:"center",gap:"6px"},children:["Share",e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})})]}),It.value&&i>0&&e("div",{style:{position:"absolute",bottom:"100%",right:"0",marginBottom:"8px",background:"white",borderRadius:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",overflow:"hidden",minWidth:"160px"},children:[typeof navigator.share=="function"&&e("button",{onClick:()=>or("native",t),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#333"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})}),"Share..."]}),e("button",{onClick:()=>or("whatsapp",t),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#25D366",borderTop:typeof navigator.share=="function"?"1px solid #f0f0f0":"none"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:()=>or("sms",t),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#2196F3",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:()=>or("copy",t),style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#666",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy text"]})]})]})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;",children:[e("h2",{style:"margin: 0; font-size: 20px;",children:o?`${Se.value}'s Games`:"My Upcoming Games"}),e("div",{style:"display: flex; gap: 8px; align-items: center;",children:[o&&e("button",{onClick:()=>{Se.value=null},style:{background:"#f5f5f5",border:"1px solid #ddd",borderRadius:"16px",padding:"4px 12px",fontSize:"12px",cursor:"pointer",color:"#666"},children:"Back to mine"}),!o&&t.length>0&&!a&&e("button",{onClick:()=>{Kt.value=!0},style:{background:"#f5f5f5",border:"1px solid #ddd",borderRadius:"16px",padding:"6px 12px",fontSize:"13px",cursor:"pointer",color:"#666",display:"flex",alignItems:"center",gap:"6px"},children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",children:e("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"})}),"Share"]})]})]}),r&&!o&&e("div",{style:{background:"var(--color-gray-lightest, #f5f5f5)",borderRadius:"var(--radius-lg, 8px)",padding:"var(--spacing-xl, 12px)",marginBottom:"var(--spacing-2xl, 16px)",position:"relative"},children:[e("label",{style:{display:"block",fontSize:"var(--font-size-sm, 13px)",color:"var(--color-gray-base, #666)",marginBottom:"var(--spacing-sm, 6px)",fontWeight:"500"},children:"View another member's games"}),e("button",{"data-member-picker-button":!0,onClick:l=>{l.stopPropagation(),Pe.value=!Pe.value},style:{width:"100%",padding:"10px 12px",background:"white",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-md, 6px)",fontSize:"var(--font-size-base, 14px)",color:"var(--color-text-secondary, #666)",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e("span",{children:"Select a member..."}),e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor",style:{transform:Pe.value?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),Pe.value&&e("div",{class:"member-picker-dropdown",style:{position:"absolute",top:"100%",left:"var(--spacing-xl, 12px)",right:"var(--spacing-xl, 12px)",marginTop:"var(--spacing-xs, 4px)",background:"white",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",boxShadow:"var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))",zIndex:100,maxHeight:"300px",overflowY:"auto"},children:W.value.filter(l=>l!==k.value).sort((l,s)=>l.localeCompare(s)).map(l=>e("button",{onClick:()=>{Se.value=l,Pe.value=!1},style:{width:"100%",padding:"12px 16px",background:"white",border:"none",borderBottom:"1px solid var(--color-border, #e0e0e0)",textAlign:"left",fontSize:"var(--font-size-base, 14px)",color:"var(--color-text-primary, #333)",cursor:"pointer",transition:"background 0.15s"},onMouseOver:s=>{s.currentTarget.style.background="var(--color-bg-subtle, #f9f9f9)"},onMouseOut:s=>{s.currentTarget.style.background="white"},children:l},l))})]}),t.length===0?e("div",{style:"text-align: center; padding: 48px 24px; background: #f9f9f9; border-radius: 12px;",children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:"📅"}),e("p",{style:"font-size: 18px; margin: 0 0 8px 0; color: #333;",children:"No upcoming games"}),e("p",{style:"font-size: 14px; color: #666; margin: 0;",children:o?`${Se.value} has no upcoming games.`:"Check in for a date to get matched with other players!"})]}):e("div",{style:"display: flex; flex-direction: column; gap: 12px;",children:t.map((l,s)=>{const d=l.players.filter(p=>Mt(p.name)!==Mt(n)),c=`mygames-${l.date}-${l.type}-${s}`,f=qt.value===c,u=l.needed||1,h=Be.value.has(c);return e("div",{onClick:()=>{a&&Il(c)},style:{padding:"16px",background:l.isForming?"#FFF8E1":"#E8F5E9",borderRadius:"12px",border:a&&h?"2px solid var(--color-primary, #2C6E49)":l.isForming?"1px solid #FFE082":"1px solid #A5D6A7",cursor:a?"pointer":"default",position:"relative"},children:[a&&e("div",{style:{position:"absolute",top:"12px",right:"12px",width:"24px",height:"24px",borderRadius:"6px",border:h?"none":"2px solid #ccc",background:h?"var(--color-primary, #2C6E49)":"white",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"16px",fontWeight:"bold"},children:h&&"✓"}),e("div",{onClick:p=>{a||(p.stopPropagation(),no(l.date))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",cursor:"pointer",paddingRight:a?"32px":"0"},children:[e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[e("span",{style:"font-weight: 600; color: #333; font-size: 16px;",children:Y(l.date)}),e("span",{style:{fontSize:"12px",padding:"2px 8px",borderRadius:"10px",background:"#f0f0f0",color:"#666",fontWeight:"500"},children:wn(l.type)})]}),e("div",{style:"display: flex; align-items: center; gap: 8px;",children:[l.isForming?e("span",{style:"display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})}),"Need ",u]}):e("span",{style:"display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 12px; font-weight: 600;",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",children:e("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})}),"Ready"]}),!a&&l.isForming&&e("div",{style:"position: relative;",children:[e("button",{"data-share-button":!0,onClick:p=>{p.stopPropagation(),qt.value=f?null:c},title:"Invite players",style:{background:f?"#e65100":"#ff9800",border:"none",borderRadius:"12px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"white",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(255, 152, 0, 0.3)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",style:{transform:f?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),f&&e("div",{class:"share-dropdown",style:{position:"absolute",top:"100%",right:"0",marginTop:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:p=>{p.stopPropagation(),Kr(l,"whatsapp")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#25D366"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:p=>{p.stopPropagation(),Kr(l,"sms")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#2196F3",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:p=>{p.stopPropagation(),Kr(l,"copy")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#666",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]}),!a&&e("button",{onClick:p=>{p.stopPropagation(),$l(l)},title:"Add to Calendar",style:{background:"transparent",border:"none",padding:"4px",cursor:"pointer",color:"#888",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px",transition:"color 0.2s"},onMouseOver:p=>{p.currentTarget.style.color="var(--color-primary, #2C6E49)"},onMouseOut:p=>{p.currentTarget.style.color="#888"},children:e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"})})})]})]}),e("div",{onClick:p=>{a||(p.stopPropagation(),no(l.date))},style:{fontSize:"15px",color:"#555",cursor:"pointer",paddingRight:a?"32px":"0"},children:d.length>0?e(R,{children:[e("span",{style:"color: #888;",children:"Playing with "}),e("span",{style:"font-weight: 500;",children:d.map(p=>p.name).join(", ")})]}):e("span",{style:"color: #888; font-style: italic;",children:["Waiting for ",u," more player",u>1?"s":""]})}),(()=>{const p=`${l.type.replace("-forming","")}-${l.matchNumber}`,g=dn.value[l.date]?.[p];return g?e("div",{style:{marginTop:"8px",padding:"8px 10px",background:(l.isForming,"rgba(255,255,255,0.6)"),borderRadius:"6px",fontSize:"13px",color:"#666",display:"flex",alignItems:"flex-start",gap:"6px"},children:[e("span",{style:{color:"#999",flexShrink:0},children:"📝"}),e("span",{children:g})]}):null})()]},s)})}),t.length>0&&e("p",{style:"font-size: 13px; color: #888; text-align: center; margin-top: 16px;",children:"Tap a game to view that day's details"})]})}const ir=v(!1),Jr=v(!1),Xe=v(!1),Ze=v(!1),ne=v([]),Jt=v(null);function ri(t){return t.toLowerCase().replace(/\s+/g,"")}typeof document<"u"&&document.addEventListener("click",t=>{if(Jt.value){const r=t.target;!r.closest(".invite-dropdown")&&!r.closest("[data-invite-button]")&&(Jt.value=null)}});function Al(t,r){const o=new Date(t+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),i=_.value,a=`${window.location.origin}${window.location.pathname}#${i}`,l=K.value||"Tennis";if(r==="Doubles"){let s=`🎾 Need players for doubles!
`;return s+=`📅 ${o}
`,s+=`🏟️ ${l}

`,s+=`A match just opened up. Can you make it?

`,s+=`Check in: ${a}`,s}else{let s=`🎾 Need 1 more player for singles!
`;return s+=`📅 ${o}
`,s+=`🏟️ ${l}

`,s+=`A singles spot opened up. Can you make it?

`,s+=`Check in: ${a}`,s}}function Qr(t,r,n){const o=Al(t,r);if(n==="whatsapp"){const i=encodeURIComponent(o);window.open(`https://wa.me/?text=${i}`,"_blank")}else if(n==="sms"){const i=encodeURIComponent(o);window.open(`sms:?body=${i}`,"_blank")}else n==="copy"&&navigator.clipboard.writeText(o).then(()=>{w("Message copied!","success")}).catch(()=>{w("Failed to copy","error")});Jt.value=null}async function Rl(){const t=_.value,r=k.value;if(!(!t||!r))try{const a=(await T().ref(`groups/${t}/userNotifications/${ri(r)}/preferences`).once("value")).val()||{};Xe.value=a.activityAlerts===!0,Ze.value=a.matchConfirmations!==!1,ne.value=a.unwatchedMembers||a.mutedMembers||[]}catch(n){console.error("Error loading notification prefs from Firebase:",n)}}async function Qt(){const t=_.value,r=k.value;if(!t||!r)return;const n={activityAlerts:Xe.value,matchConfirmations:Ze.value,unwatchedMembers:ne.value};try{await T().ref(`groups/${t}/userNotifications/${ri(r)}/preferences`).set(n),w("Preferences saved","success")}catch(o){console.error("Error saving notification prefs:",o),w("Failed to save preferences","error")}}function Tl(t){ne.value.includes(t)?ne.value=ne.value.filter(r=>r!==t):ne.value=[...ne.value,t],Qt()}function Pl(){ne.value=[],Qt()}function Nl(){ne.value=W.value.filter(t=>t!==k.value),Qt()}function Ll(t){return!ne.value.includes(t)}function Fl(t){t.read||Hi(t.id),t.date&&(E.value=t.date,ce.value="checkin")}function Bl(t){const r=new Date(t),o=new Date().getTime()-t;return o<6e4?"Just now":o<36e5?`${Math.floor(o/6e4)}m ago`:o<864e5?`${Math.floor(o/36e5)}h ago`:r.toLocaleDateString([],{month:"short",day:"numeric"})}function jl(){const t=Br.value,r=t.filter(n=>!n.read).length;return L(()=>{Rl()},[]),e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[Jr.value&&e("div",{style:"position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1002;",children:e("div",{style:"background: var(--color-bg-card, white); padding: var(--spacing-3xl, 20px); border-radius: var(--radius-xl, 12px); max-width: 350px; width: 90%;",children:[e("h3",{style:"margin-top: 0; margin-bottom: var(--spacing-md, 8px); color: var(--color-text-primary, #333);",children:"Followed Members"}),e("p",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666);",children:"Get activity alerts for these members"}),e("div",{style:"display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);",children:[e("button",{onClick:Pl,style:"flex: 1; padding: var(--spacing-md, 8px); background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Select All"}),e("button",{onClick:Nl,style:"flex: 1; padding: var(--spacing-md, 8px); background: var(--color-bg-muted, #f5f5f5); color: var(--color-text-secondary, #666); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Deselect All"})]}),e("div",{style:"max-height: 300px; overflow-y: auto;",children:W.value.filter(n=>n!==k.value).map(n=>{const o=Ll(n);return e("button",{onClick:()=>Tl(n),style:{display:"flex",alignItems:"center",gap:"var(--spacing-lg, 10px)",width:"100%",textAlign:"left",padding:"var(--spacing-xl, 12px)",marginBottom:"var(--spacing-xs, 4px)",border:o?"1px solid var(--color-primary-lighter, #A5D6A7)":"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",background:o?"var(--color-primary-light, #E8F5E9)":"var(--color-bg-card, white)",color:"var(--color-text-primary, #333)",cursor:"pointer",fontSize:"var(--font-size-base, 14px)",fontWeight:"normal"},children:[e("span",{style:{width:"20px",height:"20px",borderRadius:"var(--radius-sm, 4px)",border:o?"none":"2px solid #ccc",background:o?"var(--color-primary, #2C6E49)":"var(--color-bg-card, white)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-inverse, white)",fontSize:"var(--font-size-base, 14px)",flexShrink:0},children:o&&"✓"}),n]},n)})}),e("button",{onClick:()=>{Jr.value=!1},style:"width: 100%; margin-top: var(--spacing-xl, 12px); background: var(--color-primary, #2C6E49); color: var(--color-text-inverse, white);",children:"Done"})]})}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);",children:[e("h2",{style:"margin: 0; font-size: var(--font-size-2xl, 20px);",children:["Notifications",r>0&&e("span",{style:"margin-left: var(--spacing-md, 8px); font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); font-weight: 400;",children:["(",r," unread)"]})]}),r>0&&e("button",{onClick:Gi,style:{background:"none",border:"none",color:"var(--color-primary, #2C6E49)",fontSize:"var(--font-size-base, 14px)",cursor:"pointer",padding:"var(--spacing-xs, 4px) var(--spacing-md, 8px)"},children:"Mark all read"})]}),e("div",{style:"margin-bottom: var(--spacing-2xl, 16px); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-xl, 12px); overflow: hidden;",children:[e("button",{onClick:()=>{ir.value=!ir.value},style:"width: 100%; padding: 14px var(--spacing-2xl, 16px); background: var(--color-bg-subtle, #f9f9f9); border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: var(--font-size-md, 15px); font-weight: 500;",children:[e("span",{style:"display: flex; align-items: center; gap: var(--spacing-md, 8px); color: var(--color-text-primary, #333);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M19.14,12.94c0.04-0.31,0.06-0.63,0.06-0.94c0-0.31-0.02-0.63-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.37,4.82,11.69,4.82,12s0.02,0.63,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})}),"Alert Settings"]}),e("span",{style:{color:"var(--color-text-muted, #999)",transform:ir.value?"rotate(180deg)":"none",transition:"transform 0.2s"},children:"▼"})]}),ir.value&&e("div",{style:"padding: var(--spacing-2xl, 16px); background: var(--color-bg-card, #fff); border-top: 1px solid var(--color-border, #e0e0e0);",children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Game confirmations"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:"When placed in or removed from a confirmed game"})]}),e("label",{style:"position: relative; display: inline-block; width: 48px; height: 26px;",children:[e("input",{type:"checkbox",checked:Ze.value,onChange:n=>{Ze.value=n.target.checked,Qt()},style:"opacity: 0; width: 0; height: 0;"}),e("span",{style:{position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:Ze.value?"var(--color-primary, #2C6E49)":"#ccc",transition:"0.3s",borderRadius:"26px"},children:e("span",{style:{position:"absolute",height:"20px",width:"20px",left:Ze.value?"25px":"3px",bottom:"3px",backgroundColor:"white",transition:"0.3s",borderRadius:"50%"}})})]})]}),e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Activity alerts"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:"Check-ins, removals, notes"})]}),e("label",{style:"position: relative; display: inline-block; width: 48px; height: 26px;",children:[e("input",{type:"checkbox",checked:Xe.value,onChange:n=>{Xe.value=n.target.checked,Qt()},style:"opacity: 0; width: 0; height: 0;"}),e("span",{style:{position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:Xe.value?"var(--color-primary, #2C6E49)":"#ccc",transition:"0.3s",borderRadius:"26px"},children:e("span",{style:{position:"absolute",height:"20px",width:"20px",left:Xe.value?"25px":"3px",bottom:"3px",backgroundColor:"white",transition:"0.3s",borderRadius:"50%"}})})]})]}),e("div",{style:"padding-top: var(--spacing-xl, 12px); border-top: 1px solid var(--color-border, #e0e0e0);",children:e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg, 10px);",children:[e("div",{children:[e("div",{style:"font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);",children:"Followed members"}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);",children:(()=>{const n=W.value.filter(i=>i!==k.value);return`Following ${n.length-ne.value.length} of ${n.length} members`})()})]}),e("button",{onClick:()=>{Jr.value=!0},style:"background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); padding: var(--spacing-sm, 6px) var(--spacing-xl, 12px); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;",children:"Edit"})]})})]})]}),t.length===0?e("div",{style:"text-align: center; padding: 48px var(--spacing-4xl, 24px); background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-xl, 12px);",children:[e("div",{style:"font-size: 48px; margin-bottom: var(--spacing-2xl, 16px);",children:"🔔"}),e("p",{style:"font-size: var(--font-size-xl, 18px); margin: 0 0 var(--spacing-md, 8px) 0; color: var(--color-text-primary, #333);",children:"No notifications"}),e("p",{style:"font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); margin: 0;",children:"You'll see updates about matches and check-ins here"})]}):e("div",{style:"display: flex; flex-direction: column; gap: var(--spacing-md, 8px);",children:t.map(n=>{const o=Jt.value===n.id,i=n.type==="match_dissolved";return e("div",{onClick:()=>Fl(n),style:{padding:"14px var(--spacing-2xl, 16px)",background:n.read?"var(--color-bg-subtle, #f9f9f9)":"var(--color-primary-light, #E8F5E9)",borderRadius:"var(--radius-lg, 10px)",cursor:n.date?"pointer":"default",border:n.read?"1px solid var(--color-border, #e0e0e0)":"1px solid var(--color-primary-lighter, #A5D6A7)",position:"relative"},children:e("div",{style:"display: flex; justify-content: space-between; align-items: flex-start;",children:[e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-md, 15px); color: var(--color-text-primary, #333); margin-bottom: var(--spacing-sm, 6px);",children:[!n.read&&e("span",{style:"display: inline-block; width: 8px; height: 8px; background: var(--color-primary, #2C6E49); border-radius: var(--radius-full, 50%); margin-right: var(--spacing-md, 8px);"}),n.message]}),e("div",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #888); display: flex; align-items: center; gap: var(--spacing-md, 8px); flex-wrap: wrap;",children:[e("span",{children:Bl(n.timestamp)}),n.date&&e("span",{style:"color: var(--color-primary, #2C6E49); font-weight: 500; display: flex; align-items: center; gap: 2px;",children:[Y(n.date)," →"]})]}),i&&n.date&&n.matchType&&e("div",{style:"margin-top: var(--spacing-xl, 12px); position: relative;",children:[e("button",{"data-invite-button":!0,onClick:a=>{a.stopPropagation(),Jt.value=o?null:n.id},style:{background:o?"#e65100":"#ff9800",border:"none",borderRadius:"16px",padding:"6px 14px",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",color:"white",transition:"all 0.2s",boxShadow:"0 2px 6px rgba(255, 152, 0, 0.4)"},children:[e("span",{children:"Invite"}),e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",style:{transform:o?"rotate(180deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M7 10l5 5 5-5z"})})]}),o&&e("div",{class:"invite-dropdown",style:{position:"absolute",bottom:"100%",left:"0",marginBottom:"4px",background:"white",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:100,overflow:"hidden",minWidth:"140px"},children:[e("button",{onClick:a=>{a.stopPropagation(),Qr(n.date,n.matchType,"whatsapp")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#25D366"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("button",{onClick:a=>{a.stopPropagation(),Qr(n.date,n.matchType,"sms")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#2196F3",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"})}),"SMS"]}),e("button",{onClick:a=>{a.stopPropagation(),Qr(n.date,n.matchType,"copy")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",width:"100%",border:"none",background:"white",cursor:"pointer",fontSize:"14px",color:"#666",borderTop:"1px solid #f0f0f0"},children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:e("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})}),"Copy"]})]})]})]}),e("button",{onClick:a=>{a.stopPropagation(),Vi(n.id)},style:{background:"none",border:"none",color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-xl, 18px)",cursor:"pointer",padding:"0 var(--spacing-xs, 4px)",marginLeft:"var(--spacing-md, 8px)"},children:"×"})]})},n.id)})})]})}function oo(){const t=_.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function Ol(t){const r=J.value;if(!r)return null;const n=new Date;n.setHours(0,0,0,0);let o=null,i="";const a=[];if(Object.keys(r).forEach(l=>{const s=r[l];if(!s||!Array.isArray(s))return;const[d,c,f]=l.split("-").map(Number),u=new Date(d,c-1,f);u.setHours(0,0,0,0),u<=n&&s.some(p=>p&&p.name===t)&&a.push(l)}),a.sort((l,s)=>s.localeCompare(l)),a.length>0){i=a[0];const[l,s,d]=i.split("-").map(Number);o=new Date(l,s-1,d)}return o}function Ul(t){const r=new Date;r.setHours(0,0,0,0);const n=new Date(t);n.setHours(0,0,0,0);const o=r.getTime()-n.getTime(),i=Math.floor(o/(1e3*60*60*24));return i===0?"Today":i===1?"Yesterday":i<7?`${i} days ago`:i<30?`${Math.floor(i/7)} weeks ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Hl(){const[t,r]=we(oo()),[n,o]=we("");return L(()=>{const i=setInterval(()=>{r(oo())},1e3);return()=>clearInterval(i)},[]),e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[e("h2",{style:"margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);",children:"Team Directory"}),e("div",{style:{marginBottom:"var(--spacing-2xl, 16px)"},children:e("input",{type:"text",value:n,onInput:i=>o(i.target.value),placeholder:"🔍 Search members...",style:{width:"100%",padding:"var(--spacing-xl, 12px) var(--spacing-2xl, 16px)",border:"1px solid var(--color-border-light, #ddd)",borderRadius:"var(--radius-xl, 12px)",fontSize:"var(--font-size-md, 15px)",boxSizing:"border-box",background:"var(--color-bg-card, #fff)"}})}),e("button",{onClick:()=>{Ua()},style:{width:"100%",padding:"var(--spacing-xl, 14px)",background:"var(--color-primary, #2C6E49)",color:"white",border:"none",borderRadius:"var(--radius-xl, 12px)",fontSize:"var(--font-size-md, 15px)",fontWeight:"500",cursor:"pointer",marginBottom:"var(--spacing-2xl, 16px)",display:"flex",alignItems:"center",justifyContent:"center",gap:"var(--spacing-md, 8px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"white",children:e("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})}),"Add New Member"]}),e("div",{style:{display:"flex",flexDirection:"column",gap:"var(--spacing-xl, 12px)"},children:(()=>{const a=(W.value||[]).filter(l=>l.toLowerCase().includes(n.toLowerCase())).sort((l,s)=>l.localeCompare(s));return a.length===0?e("div",{style:{background:"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",padding:"40px 20px",textAlign:"center",border:"1px solid var(--color-border, #e0e0e0)"},children:[e("svg",{viewBox:"0 0 24 24",width:"48",height:"48",fill:"var(--color-border-light, #ddd)",style:{marginBottom:"var(--spacing-xl, 12px)"},children:e("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})}),e("p",{style:{color:"var(--color-text-muted, #999)",fontSize:"var(--font-size-md, 15px)",margin:0},children:n?"No members found":"No members in team yet"})]}):a.map(l=>{const s=q.value?.[l],d=Ol(l),f=s?.shareContactInDirectory===!0&&(s?.phone||s?.email),h=s?.shareNotesInDirectory===!0&&s?.notes,p=k.value&&l===k.value;return e("div",{style:{background:p?"var(--color-primary-light, #e8f5e9)":"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:p?"2px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #e0e0e0)"},children:e("div",{style:{display:"flex",alignItems:"start",justifyContent:"space-between",gap:"var(--spacing-xl, 12px)"},children:[e("div",{style:{flex:1,minWidth:0},children:[e("div",{style:{fontWeight:600,fontSize:"var(--font-size-lg, 16px)",color:"var(--color-text-primary, #333)",marginBottom:"var(--spacing-md, 8px)"},children:[l,p&&e("span",{style:{marginLeft:"var(--spacing-md, 8px)",fontSize:"var(--font-size-sm, 12px)",color:"var(--color-primary, #2C6E49)",fontWeight:"500"},children:"(You)"})]}),d&&e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm, 6px)",fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)",marginBottom:"var(--spacing-md, 8px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"var(--color-text-muted, #888)",children:e("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"})}),"Last played: ",Ul(d)]}),!d&&e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-muted, #999)",marginBottom:"var(--spacing-md, 8px)"},children:"No recent games"}),s?.addedBy&&e("div",{style:{fontSize:"var(--font-size-sm, 12px)",color:"var(--color-text-muted, #999)",marginBottom:"var(--spacing-md, 8px)"},children:["Added by ",s.addedBy,s.addedDate&&` • ${new Date(s.addedDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`]}),f&&e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md, 8px)",marginTop:"var(--spacing-md, 8px)",flexWrap:"wrap"},children:[s.phone&&e(R,{children:[e("a",{href:`https://wa.me/${s.phone.replace(/\D/g,"")}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"#25D366",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500",transition:"opacity 0.2s"},title:"Message on WhatsApp",onMouseOver:g=>g.currentTarget.style.opacity="0.9",onMouseOut:g=>g.currentTarget.style.opacity="1",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp"]}),e("a",{href:`sms:${s.phone}`,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"var(--color-info, #2196F3)",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500",transition:"opacity 0.2s"},title:"Send SMS",onMouseOver:g=>g.currentTarget.style.opacity="0.9",onMouseOut:g=>g.currentTarget.style.opacity="1",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"})}),"SMS"]})]}),s.email&&e("a",{href:`mailto:${s.email}`,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xs, 4px)",padding:"var(--spacing-xs, 6px) var(--spacing-sm, 10px)",background:"var(--color-text-secondary, #666)",color:"white",borderRadius:"var(--radius-md, 6px)",textDecoration:"none",fontSize:"var(--font-size-sm, 13px)",fontWeight:"500",transition:"opacity 0.2s"},title:"Send email",onMouseOver:g=>g.currentTarget.style.opacity="0.9",onMouseOut:g=>g.currentTarget.style.opacity="1",children:[e("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"white",children:e("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})}),"Email"]})]}),h&&e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)",marginTop:"var(--spacing-md, 8px)",padding:"var(--spacing-md, 8px)",background:"var(--color-bg-subtle, #f9f9f9)",borderRadius:"var(--radius-md, 6px)",fontStyle:"italic"},children:['"',s.notes,'"']})]}),(p||t)&&e("button",{onClick:()=>Ko(l),style:{background:p?"var(--color-primary, #2C6E49)":"var(--color-bg-muted, #f5f5f5)",color:p?"white":"var(--color-text-secondary, #666)",border:p?"none":"1px solid var(--color-border, #e0e0e0)",padding:"var(--spacing-md, 8px) var(--spacing-xl, 12px)",cursor:"pointer",borderRadius:"var(--radius-lg, 8px)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"var(--font-size-base, 14px)",fontWeight:"500",whiteSpace:"nowrap"},title:p?"Edit your profile":"Edit member",children:[e("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:p?"white":"var(--color-text-secondary, #666)",style:{marginRight:"var(--spacing-xs, 4px)"},children:e("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})}),"Edit"]})]})},l)})})()}),W.value.length>0&&!n&&e("div",{style:{marginTop:"var(--spacing-2xl, 16px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",borderRadius:"var(--radius-xl, 12px)",border:"1px solid var(--color-border, #e0e0e0)",textAlign:"center"},children:e("div",{style:{fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-secondary, #666)"},children:[e("span",{style:{fontWeight:"600",color:"var(--color-text-primary, #333)"},children:W.value.length})," ",W.value.length===1?"member":"members"," in team"]})})]})}function Xr(t){return t.toLowerCase().replace(/\s+/g,"")}const Wl=it(()=>{const t=J.value,r=new Date;r.setHours(0,0,0,0);const n=new Date(r);n.setDate(n.getDate()-30);const o=new Date(r);o.setDate(o.getDate()-7);let i=0,a=0,l=0,s=0,d=0,c=0;const f={},u={0:0,1:0,2:0,3:0,4:0,5:0,6:0},h={};let p=0,g=0;const m=Object.keys(t).sort();for(const S of m){const z=t[S]||[];if(z.length===0)continue;const A=new Date(S+"T00:00:00");if(!(A<r))continue;p++,g+=z.length;const ge=A>=n,ve=A>=o,ie=A.getDay(),G=new Date(A);G.setDate(G.getDate()-G.getDay());const me=G.toISOString().split("T")[0],{matches:ni}=Lr(z);for(const ae of ni)if(!(ae.type==="waiting"||ae.type==="doubles-forming"||ae.type==="singles-forming")){i++,u[ie]++,h[me]=(h[me]||0)+1,ge&&d++,ve&&c++,ae.type==="doubles"?a++:ae.type==="singles"?l++:ae.type==="singles-or-practice"&&s++;for(const pt of ae.players){const Oe=Xr(pt.name);f[Oe]||(f[Oe]={gamesPlayed:0,checkIns:0,lastPlayed:S,doublesPlayed:0,singlesPlayed:0}),f[Oe].gamesPlayed++,f[Oe].lastPlayed=S,ae.type==="doubles"?f[Oe].doublesPlayed++:f[Oe].singlesPlayed++}}for(const ae of z){const pt=Xr(ae.name);f[pt]||(f[pt]={gamesPlayed:0,checkIns:0,lastPlayed:"",doublesPlayed:0,singlesPlayed:0}),f[pt].checkIns++}}const b=Object.entries(f).map(([S,z])=>({name:W.value.find(Q=>Xr(Q)===S)||S,...z,participationRate:z.checkIns>0?Math.round(z.gamesPlayed/z.checkIns*100):0})).sort((S,z)=>z.gamesPlayed-S.gamesPlayed).slice(0,10),x=Object.entries(u).sort((S,z)=>z[1]-S[1])[0],y=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],C=Object.entries(h).sort((S,z)=>z[0].localeCompare(S[0])).slice(0,8).reverse();return{totalGames:i,doublesGames:a,singlesGames:l,rotationGames:s,last30DaysGames:d,last7DaysGames:c,activeDays:p,totalCheckIns:g,averagePlayersPerDay:p>0?(g/p).toFixed(1):"0",topPlayers:b,mostPopularDay:x?y[parseInt(x[0])]:"N/A",mostPopularDayCount:x?x[1]:0,dayOfWeekCounts:u,recentWeeks:C,totalMembers:W.value.length,activeMembersLast30Days:Object.values(f).filter(S=>S.lastPlayed?new Date(S.lastPlayed+"T00:00:00")>=n:!1).length}});function Zr({label:t,value:r,subtext:n}){return e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",textAlign:"center",flex:"1",minWidth:"100px"},children:[e("div",{style:{fontSize:"24px",fontWeight:"700",color:"var(--color-primary, #2C6E49)"},children:r}),e("div",{style:{fontSize:"12px",color:"#666",marginTop:"4px"},children:t}),n&&e("div",{style:{fontSize:"11px",color:"#888",marginTop:"2px"},children:n})]})}function en({value:t,max:r,color:n="var(--color-primary, #2C6E49)"}){const o=r>0?t/r*100:0;return e("div",{style:{background:"#e0e0e0",borderRadius:"4px",height:"8px",flex:"1",overflow:"hidden"},children:e("div",{style:{background:n,height:"100%",width:`${o}%`,borderRadius:"4px",transition:"width 0.3s ease"}})})}function Vl(){const t=Wl.value,r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=Math.max(...Object.values(t.dayOfWeekCounts));return e("div",{style:"padding: 16px;",children:[e("h3",{style:"margin: 0 0 16px 0; font-size: 18px; color: #333;",children:"Group Insights"}),e("div",{style:{display:"flex",gap:"12px",marginBottom:"20px",flexWrap:"wrap"},children:[e(Zr,{label:"Total Games",value:t.totalGames,subtext:"all time"}),e(Zr,{label:"Last 30 Days",value:t.last30DaysGames}),e(Zr,{label:"Last 7 Days",value:t.last7DaysGames})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Game Types"}),e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Doubles"}),e(en,{value:t.doublesGames,max:t.totalGames,color:"var(--color-primary, #2C6E49)"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.doublesGames})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Singles"}),e(en,{value:t.singlesGames,max:t.totalGames,color:"#2196F3"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.singlesGames})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e("span",{style:{width:"70px",fontSize:"14px"},children:"Rotation"}),e(en,{value:t.rotationGames,max:t.totalGames,color:"#FF9800"}),e("span",{style:{width:"40px",textAlign:"right",fontSize:"14px",fontWeight:"600"},children:t.rotationGames})]})]})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Activity by Day"}),e("div",{style:{display:"flex",gap:"4px",alignItems:"flex-end",height:"80px"},children:r.map((o,i)=>{const a=t.dayOfWeekCounts[i],l=n>0?a/n*60:0;return e("div",{style:{flex:"1",textAlign:"center"},children:[e("div",{style:{background:i===Number(Object.entries(t.dayOfWeekCounts).sort((s,d)=>d[1]-s[1])[0]?.[0])?"var(--color-primary, #2C6E49)":"#c8e6c9",height:`${Math.max(l,4)}px`,borderRadius:"4px 4px 0 0",marginBottom:"4px",transition:"height 0.3s ease"}}),e("span",{style:{fontSize:"10px",color:"#666"},children:o})]},o)})}),e("p",{style:{fontSize:"13px",color:"#666",margin:"12px 0 0 0",textAlign:"center"},children:["Most popular: ",e("strong",{children:t.mostPopularDay})," (",t.mostPopularDayCount," games)"]})]}),t.recentWeeks.length>0&&e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Weekly Trend"}),e("div",{style:{display:"flex",gap:"4px",alignItems:"flex-end",height:"60px"},children:t.recentWeeks.map(([o,i])=>{const a=Math.max(...t.recentWeeks.map(c=>c[1])),l=a>0?i/a*50:0,s=new Date(o+"T00:00:00"),d=`${s.getMonth()+1}/${s.getDate()}`;return e("div",{style:{flex:"1",textAlign:"center"},children:[e("div",{style:{background:"var(--color-primary, #2C6E49)",height:`${Math.max(l,4)}px`,borderRadius:"4px 4px 0 0",marginBottom:"4px"}}),e("span",{style:{fontSize:"9px",color:"#666"},children:d})]},o)})})]}),e("div",{style:{background:"#f9f9f9",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Most Active Players"}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#888",marginBottom:"8px",padding:"0 4px"},children:[e("span",{children:"Player"}),e("span",{children:"Games"})]}),t.topPlayers.length===0?e("p",{style:{fontSize:"14px",color:"#666",textAlign:"center",margin:"16px 0"},children:"No game data yet"}):e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:t.topPlayers.map((o,i)=>e("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px",background:i<3?"#E8F5E9":"white",borderRadius:"8px"},children:[e("span",{style:{width:"20px",height:"20px",borderRadius:"50%",background:i===0?"#FFD700":i===1?"#C0C0C0":i===2?"#CD7F32":"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"600",color:i<3?"#333":"#666"},children:i+1}),e("span",{style:{flex:"1",fontSize:"14px"},children:o.name}),e("span",{style:{fontSize:"14px",fontWeight:"600",color:"var(--color-primary, #2C6E49)"},children:o.gamesPlayed})]},o.name))})]}),e("div",{style:{background:"#E3F2FD",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[e("h3",{style:"margin: 0 0 12px 0; font-size: 16px;",children:"Group Health"}),e("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Total members"}),e("span",{style:{fontWeight:"600"},children:t.totalMembers})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Active last 30 days"}),e("span",{style:{fontWeight:"600"},children:t.activeMembersLast30Days})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Avg players/day"}),e("span",{style:{fontWeight:"600"},children:t.averagePlayersPerDay})]}),e("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px"},children:[e("span",{style:{color:"#666"},children:"Days with activity"}),e("span",{style:{fontWeight:"600"},children:t.activeDays})]})]})]}),e("p",{style:"font-size: 13px; color: #888; text-align: center; margin-top: 16px;",children:"Stats are based on completed games from past dates"})]})}function Gl(){const t=M.value.groupDescription,r=M.value.groupRules,n=t||r,o=[{title:"Getting Started",icon:"🎾",content:["When you first open the app, you'll be asked to select your name from the member list.","Use the date selector to pick the day you want to play.","Check in by selecting your game preference and optionally setting your available times."]},{title:"Check-in Options",icon:"✅",content:["Doubles - You want to play doubles games (4 players).","Singles - You want to play singles games (2 players).","Both - You're flexible and happy to play either format.","Rotation - Enable this option to join 3-player rotation games where players take turns.","Time Range - Set your earliest and latest available times to help coordinate."]},{title:"Game Types",icon:"👥",content:["Doubles (green) - A confirmed 4-player doubles game.","Singles (green) - A confirmed 2-player singles game.","Rotation (green) - A confirmed 3-player game with rotating play.","Forming (yellow) - A game that needs more players to be complete."]},{title:"My Games",icon:"📅",content:["View all your upcoming games across all dates at a glance.","Tap any game card to jump directly to that day's check-in page.","Yellow background indicates the game is still forming and needs more players.","Green background means the game is confirmed and ready to play."]},{title:"Alerts",icon:"🔔",content:["Get notified when games are formed or when players join/leave.","Unread alerts show a red badge with the count on the tab.","Tap a notification to mark it as read.","Access notification settings to configure your preferences."]},{title:"Profile",icon:"👤",content:["Access your profile by tapping your name badge in the top-right corner.","Edit your display name, phone number, and email address.","Change your user session to switch to a different account.","Admin login is available for group administrators."]},{title:"Tips",icon:"💡",content:["Check in early to get matched with your preferred players.",`Select "Both" if you're flexible - it increases your chances of getting a game.`,"Set your time preferences to help organizers coordinate scheduling.","Enable rotation if you're open to 3-player games."]},{title:"Admin Features",icon:"⚙️",content:["Access admin mode via Admin Login in your Profile page.","Manage Members - Add, edit, or remove group members.","Group Settings - Configure group name, PINs, weather location, story, and rules.","Activity History - View all check-ins and changes with option to delete test data.","Group Insights - View game stats, player activity trends, and analytics."]}],i=r?r.split(`
`).filter(a=>a.trim()):[];return e("div",{style:"padding: 16px 0;",children:[n&&e("div",{style:{marginBottom:"24px"},children:[e("h2",{style:"margin: 0 0 16px 0; font-size: 20px;",children:["About ",K.value]}),t&&e("div",{style:{background:"var(--color-primary-light, #E8F5E9)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid var(--color-primary-lighter, #C8E6C9)",marginBottom:"var(--spacing-xl, 12px)"},children:[e("h3",{style:"margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px); color: var(--color-primary, #2E7D32); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"})}),"Our Story"]}),e("p",{style:"margin: 0; color: var(--color-text-primary, #333); font-size: var(--font-size-base, 14px); line-height: 1.6; white-space: pre-wrap;",children:t})]}),i.length>0&&e("div",{style:{background:"var(--color-warning-light, #FFF8E1)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid #FFECB3"},children:[e("h3",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-md, 15px); color: var(--color-warning, #F57C00); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"#FF9800",children:e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"})}),"Rules & Tips"]}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-text-primary, #333); font-size: var(--font-size-base, 14px); line-height: 1.6;",children:i.map((a,l)=>e("li",{style:"margin-bottom: var(--spacing-sm, 6px);",children:a},l))})]})]}),e("h2",{style:"margin: 0 0 16px 0; font-size: 20px;",children:"User Guide"}),e("div",{style:"display: flex; flex-direction: column; gap: 16px;",children:o.map((a,l)=>e("div",{style:{background:"var(--color-bg-subtle, #f9f9f9)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)",border:"1px solid var(--color-border, #e0e0e0)"},children:[e("h3",{style:"margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-lg, 16px); display: flex; align-items: center; gap: var(--spacing-md, 8px);",children:[e("span",{children:a.icon}),e("span",{children:a.title})]}),e("ul",{style:"margin: 0; padding-left: 20px; color: var(--color-text-secondary, #555); font-size: var(--font-size-base, 14px); line-height: 1.6;",children:a.content.map((s,d)=>e("li",{style:"margin-bottom: var(--spacing-xs, 4px);",children:s},d))})]},l))}),e("p",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888); text-align: center; margin-top: var(--spacing-3xl, 20px);",children:"Need more help? Contact your group administrator."})]})}const Yl=[{id:"default",name:"Classic Green",description:"Default theme"},{id:"wimbledon",name:"Wimbledon",description:"Grass court elegance"},{id:"roland-garros",name:"Roland-Garros",description:"Clay court warmth"},{id:"australian-open",name:"Australian Open",description:"Melbourne blue"},{id:"us-open",name:"US Open",description:"Flushing Meadows blue"}];function io(){const t=_.value;return t?sessionStorage.getItem(`adminAuth_${t}`)==="true":!1}function ql(){const[t,r]=we(io()),[n,o]=we(!1),[i,a]=we(!1);L(()=>{const c=setInterval(()=>{r(io())},1e3);return()=>clearInterval(c)},[]);const l=k.value&&q.value?q.value[k.value]:null,s=()=>{if(confirm("Change user? This will clear your current session.")){const c=_.value;c&&localStorage.removeItem(`sessionUser_${c}`),k.value="",w("Please select your name","info"),Vt.value=!0}},d=()=>{const c=_.value;c&&(sessionStorage.removeItem(`adminAuth_${c}`),r(!1),w("Logged out of admin mode","info"))};return e("div",{style:"padding: var(--spacing-2xl, 16px) 0;",children:[e("h2",{style:"margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);",children:"Profile"}),e("button",{onClick:()=>k.value&&Ko(k.value),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left",marginBottom:"var(--spacing-2xl, 16px)"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:k.value||"Not set"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:l?.phone||l?.email?[l?.phone,l?.email].filter(Boolean).join(" • "):"Tap to add contact info"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("div",{style:"display: flex; flex-direction: column; gap: var(--spacing-md, 8px);",children:[t&&e(R,{children:[e("div",{style:{background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",padding:"var(--spacing-2xl, 16px)"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md, 8px)",marginBottom:"var(--spacing-xl, 12px)"},children:[e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"})}),e("span",{style:{fontWeight:500,color:"var(--color-text-primary, #333)",fontSize:"var(--font-size-lg, 16px)"},children:"Theme"})]}),e("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"var(--spacing-md, 8px)"},children:Yl.map(c=>{const u=(M.value?.theme||"default")===c.id;return e("button",{onClick:async()=>{In(c.id==="default"?void 0:c.id);const h=_.value;if(h)try{await T().ref(`groups/${h}/settings/theme`).set(c.id==="default"?null:c.id),M.value={...M.value,theme:c.id==="default"?void 0:c.id},w(`Theme: ${c.name}`,"success")}catch(p){console.error("Error saving theme:",p)}},style:{padding:"var(--spacing-lg, 10px) var(--spacing-md, 8px)",background:u?"var(--color-primary-light, #e8f5e9)":"var(--color-bg-card, white)",border:u?"2px solid var(--color-primary, #2C6E49)":"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-lg, 8px)",cursor:"pointer",textAlign:"left",transition:"all 0.2s"},children:[e("div",{style:{fontWeight:500,fontSize:"var(--font-size-sm, 13px)",color:"var(--color-text-primary, #333)"},children:c.name}),e("div",{style:{fontSize:"var(--font-size-2xs, 10px)",color:"var(--color-text-secondary, #666)"},children:c.description})]},c.id)})})]}),e("button",{onClick:()=>{at.value=!0},style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Group Settings"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Name, PIN, location, and other settings"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>{wt.value=!0},style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Activity History"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"View recent check-ins and changes"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>o(!n),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:n?"var(--color-info-light, #E3F2FD)":"var(--color-bg-card, #fff)",border:n?"1px solid var(--color-info-border, #90CAF9)":"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Group Insights"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Game stats, player activity, and trends"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",style:{transform:n?"rotate(90deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),n&&e("div",{style:{background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",overflow:"hidden"},children:e(Vl,{})}),e("button",{onClick:d,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-warning-light, #FFF3E0)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-warning, #FF9800)",children:e("path",{d:"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-warning, #FF9800);",children:"Exit Admin Mode"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Return to regular user view"})]})]})]}),!t&&e("button",{onClick:()=>{at.value=!0},style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-warning-light, #FFF3E0)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-warning, #FF9800)",children:e("path",{d:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Admin Login"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Access group settings and member management"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),e("button",{onClick:()=>a(!i),style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:i?"var(--color-info-light, #E3F2FD)":"var(--color-bg-card, #fff)",border:i?"1px solid var(--color-info-border, #90CAF9)":"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-primary-light, #E8F5E9)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-primary, #2C6E49)",children:e("path",{d:"M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Help & Support"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"How to use the app and get support"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",style:{transform:i?"rotate(90deg)":"none",transition:"transform 0.2s"},children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]}),i&&e("div",{style:{background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",overflow:"hidden"},children:e(Gl,{})}),e("button",{onClick:s,style:{display:"flex",alignItems:"center",gap:"var(--spacing-xl, 12px)",padding:"var(--spacing-2xl, 16px)",background:"var(--color-bg-card, #fff)",border:"1px solid var(--color-border, #e0e0e0)",borderRadius:"var(--radius-xl, 12px)",cursor:"pointer",width:"100%",textAlign:"left",marginTop:t?"var(--spacing-md, 8px)":"0"},children:[e("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full, 50%)",background:"var(--color-bg-muted, #f5f5f5)",display:"flex",alignItems:"center",justifyContent:"center"},children:e("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"var(--color-text-secondary, #666)",children:e("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"})})}),e("div",{style:"flex: 1;",children:[e("div",{style:"font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);",children:"Change User"}),e("div",{style:"font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);",children:"Switch to a different account"})]}),e("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"var(--color-text-disabled, #ccc)",children:e("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]}),e("p",{style:"font-size: var(--font-size-sm, 12px); color: var(--color-text-disabled, #aaa); text-align: center; margin-top: var(--spacing-4xl, 32px);",children:"Tennis Coordinator v0.9.0"})]})}const Er=v(!1),Ar=v(""),B=v("both");v(!1);v(!1);const qe=v(""),mt=v(""),br=v(""),yr=v(""),wr=v(""),Kl=v(""),be=v(!0),O=v(""),U=v("");v(!0);const We=v(!1),ue=v(!1),he=v(null);function Jl(){$i(),Ii(),Mi(),Wi(),L(()=>{const n=_.value;if(n){if(sessionStorage.getItem("siteAdminAuth")==="true"){We.value=!0;return}const i=`pinAuth_${n}`,a=sessionStorage.getItem(i)==="true";We.value=a}},[_.value]),L(()=>{E.value=Ci()},[]),L(()=>{const n=_.value;if(n){const o=localStorage.getItem(`sessionUser_${n}`);o?k.value=o:We.value&&(Vt.value=!0)}},[_.value,We.value]);const t=()=>{const n=_.value;n&&sessionStorage.setItem(`pinAuth_${n}`,"true"),We.value=!0,window.scrollTo(0,0),k.value||(Vt.value=!0)},r=!We.value&&!!M.value.groupPin;return e(R,{children:[e(Zi,{isOpen:r,groupName:K.value,correctPin:M.value.groupPin,onSuccess:t}),e(Ia,{}),e(oa,{}),e(fa,{}),e(Sa,{}),e(ba,{}),e("div",{class:"container",id:"appContainer",style:r?"filter: blur(5px); pointer-events: none;":"",children:[e(Xi,{}),e("div",{style:"padding-bottom: 80px;",children:[ce.value==="checkin"&&e(ml,{}),ce.value==="matches"&&e(El,{}),ce.value==="notifications"&&e(jl,{}),ce.value==="directory"&&e(Hl,{}),ce.value==="profile"&&e(ql,{})]})]}),e(Na,{}),e(Ki,{}),e(Fa,{}),e(ja,{}),e(Oa,{}),e(Va,{})]})}const ar=v(!1),X=v({}),ao=v(!0),tn=v(null),Me=v(null),lr=v(null),ft=v(""),Ve=v(!1),Ce=v(null),sr=v("");function Ql(){L(()=>{t()},[]);async function t(){try{const g=(await T().ref("siteSettings").once("value")).val();tn.value=g?.siteAdminPin||null,sessionStorage.getItem("siteAdminAuth")==="true"&&(ar.value=!0,await r())}catch(h){console.error("Error initializing admin page:",h),w("Failed to initialize","error")}finally{ao.value=!1}}async function r(){try{const p=await T().ref("groups").once("value");X.value=p.val()||{}}catch(h){console.error("Error loading groups:",h),w("Failed to load groups","error")}}function n(h){h.preventDefault(),Me.value=null;const g=h.target.querySelector("input"),m=g.value.trim();if(!m){Me.value="Please enter a PIN";return}if(!tn.value){Me.value="Site admin PIN not configured. Please set siteAdminPin in siteSettings in Firebase.";return}m===tn.value?(sessionStorage.setItem("siteAdminAuth","true"),ar.value=!0,Me.value=null,r()):(Me.value="Incorrect PIN. Please try again.",g.value="",g.focus())}function o(){sessionStorage.removeItem("siteAdminAuth"),ar.value=!1,X.value={}}function i(){window.location.hash="",window.location.reload()}function a(h){lr.value===h?lr.value=null:(lr.value=h,ft.value="")}async function l(h){const p=ft.value.trim();if(!p){w("Please enter a member name","error");return}Ve.value=!0;try{const g=T(),m=X.value[h],b=m?.settings?.members||[];if(b.some(y=>y.toLowerCase()===p.toLowerCase())){w("Member already exists","error"),Ve.value=!1;return}const x=[...b,p];await g.ref(`groups/${h}/settings/members`).set(x),X.value={...X.value,[h]:{...m,settings:{...m?.settings,members:x}}},ft.value="",w(`Added ${p} to the group`,"success")}catch(g){console.error("Error adding member:",g),w("Failed to add member","error")}finally{Ve.value=!1}}async function s(h,p){if(confirm(`Remove ${p} from this group?`))try{const g=T(),m=X.value[h],x=(m?.settings?.members||[]).filter(y=>y!==p);await g.ref(`groups/${h}/settings/members`).set(x),X.value={...X.value,[h]:{...m,settings:{...m?.settings,members:x}}},w(`Removed ${p}`,"success")}catch(g){console.error("Error removing member:",g),w("Failed to remove member","error")}}function d(h,p){Ce.value={groupId:h,originalName:p},sr.value=p}async function c(){const h=Ce.value;if(!h)return;const p=sr.value.trim();if(!p){w("Name cannot be empty","error");return}if(p===h.originalName){Ce.value=null;return}const g=X.value[h.groupId],m=g?.settings?.members||[];if(m.some(b=>b.toLowerCase()===p.toLowerCase()&&b!==h.originalName)){w("A member with this name already exists","error");return}try{const b=T(),x=m.map(z=>z===h.originalName?p:z);await b.ref(`groups/${h.groupId}/settings/members`).set(x);const y=g?.settings?.memberDetails||{};if(y[h.originalName]){const z=y[h.originalName];await b.ref(`groups/${h.groupId}/settings/memberDetails/${h.originalName}`).remove(),await b.ref(`groups/${h.groupId}/settings/memberDetails/${p}`).set(z);const A={...y};A[p]=z,delete A[h.originalName],X.value={...X.value,[h.groupId]:{...g,settings:{...g?.settings,members:x,memberDetails:A}}}}else X.value={...X.value,[h.groupId]:{...g,settings:{...g?.settings,members:x}}};const S=(await b.ref(`groups/${h.groupId}/checkins`).once("value")).val()||{};for(const[z,A]of Object.entries(S))if(A&&typeof A=="object"){const Q=Object.values(A);let ge=!1;const ve=Q.map(ie=>ie&&ie.name===h.originalName?(ge=!0,{...ie,name:p}):ie);ge&&await b.ref(`groups/${h.groupId}/checkins/${z}`).set(ve)}Ce.value=null,w(`Renamed ${h.originalName} to ${p}`,"success")}catch(b){console.error("Error renaming member:",b),w("Failed to rename member","error")}}if(ao.value)return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-container",children:e("div",{class:"site-admin-loading",children:[e("div",{class:"loading-spinner-icon"}),e("p",{children:"Loading..."})]})})});if(!ar.value)return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-container",children:e("div",{class:"site-admin-login-card",children:[e("div",{class:"site-admin-header",children:[e("span",{class:"site-admin-icon",children:"🔐"}),e("h1",{children:"Site Administration"}),e("p",{class:"site-admin-subtitle",children:"Tennis Coordinator Platform"})]}),e("form",{onSubmit:n,class:"site-admin-form",children:[e("div",{class:"form-group",children:[e("label",{for:"admin-pin",children:"Administrator PIN"}),e("input",{id:"admin-pin",type:"password",placeholder:"Enter your PIN",class:"site-admin-input",autoFocus:!0})]}),Me.value&&e("div",{class:"site-admin-error",children:[e("span",{class:"error-icon",children:"⚠️"}),Me.value]}),e("button",{type:"submit",class:"site-admin-submit",children:"Sign In"})]}),e("div",{class:"site-admin-footer",children:e("button",{onClick:i,class:"back-to-home",children:"← Back to Home"})})]})})});const f=Object.entries(X.value),u=f.reduce((h,[,p])=>h+(p.settings?.members?.length||0),0);return e("div",{class:"site-admin-page",children:e("div",{class:"site-admin-dashboard",children:[e("header",{class:"site-admin-dashboard-header",children:[e("div",{class:"header-left",children:[e("h1",{children:"🎾 Site Administration"}),e("p",{class:"header-subtitle",children:"Tennis Coordinator Platform"})]}),e("button",{onClick:o,class:"logout-button",children:"Sign Out"})]}),e("div",{class:"site-admin-stats",children:[e("div",{class:"stat-card",children:[e("span",{class:"stat-value",children:f.length}),e("span",{class:"stat-label",children:"Tennis Groups"})]}),e("div",{class:"stat-card",children:[e("span",{class:"stat-value",children:u}),e("span",{class:"stat-label",children:"Total Members"})]})]}),e("section",{class:"site-admin-section",children:[e("h2",{children:"All Tennis Groups"}),f.length===0?e("div",{class:"empty-state",children:e("p",{children:"No tennis groups have been created yet."})}):e("div",{class:"groups-grid",children:f.map(([h,p])=>{const g=p.settings?.members||[],m=lr.value===h;return e("div",{class:`group-card ${m?"expanded":""}`,children:[e("div",{class:"group-card-header",children:[e("h3",{children:p.settings?.groupName||h}),e("span",{class:"group-id",children:["#",h]})]}),e("div",{class:"group-card-body",children:[e("div",{class:"group-stat",children:[e("span",{class:"group-stat-icon",children:"👥"}),e("span",{children:[g.length," members"]})]}),p.settings?.location?.name&&e("div",{class:"group-stat",children:[e("span",{class:"group-stat-icon",children:"📍"}),e("span",{children:p.settings.location.name})]})]}),m&&e("div",{class:"group-members-section",children:[e("div",{class:"members-header",children:e("h4",{children:"Members"})}),e("div",{class:"add-member-form",children:[e("input",{type:"text",placeholder:"Enter member name",value:ft.value,onInput:b=>{ft.value=b.target.value},onKeyDown:b=>{b.key==="Enter"&&(b.preventDefault(),l(h))},class:"member-input",disabled:Ve.value}),e("button",{onClick:()=>l(h),class:"add-member-btn",disabled:Ve.value,children:Ve.value?"...":"Add"})]}),e("div",{class:"members-list",children:g.length===0?e("p",{class:"no-members",children:"No members yet. Add the first member above."}):g.map(b=>{const x=Ce.value?.groupId===h&&Ce.value?.originalName===b;return e("div",{class:"member-item",children:x?e(R,{children:[e("input",{type:"text",value:sr.value,onInput:y=>{sr.value=y.target.value},onKeyDown:y=>{y.key==="Enter"?(y.preventDefault(),c()):y.key==="Escape"&&(Ce.value=null)},class:"edit-member-input",autoFocus:!0}),e("button",{onClick:c,class:"save-member-btn",title:"Save",children:"✓"}),e("button",{onClick:()=>{Ce.value=null},class:"cancel-edit-btn",title:"Cancel",children:"✕"})]}):e(R,{children:[e("span",{class:"member-name",children:b}),e("button",{onClick:()=>d(h,b),class:"edit-member-btn",title:"Edit name",children:"✎"}),e("button",{onClick:()=>s(h,b),class:"remove-member-btn",title:"Remove member",children:"×"})]})},b)})})]}),e("div",{class:"group-card-footer",children:[e("button",{onClick:()=>a(h),class:"manage-members-btn",children:m?"Hide Members":"Manage Members"}),e("a",{href:`#${h}`,class:"view-group-link",onClick:b=>{b.preventDefault(),window.location.hash=h,window.location.reload()},children:"View Group →"})]})]},h)})})]})]})})}function Xl({message:t,type:r}){const n=()=>{switch(r){case"success":return"✓";case"error":return"✕";default:return"ℹ"}};return e("div",{class:`toast toast-${r}`,children:[e("span",{class:"toast-icon",children:n()}),e("span",{class:"toast-message",children:t})]})}const _=v(null),K=v(""),E=v(null),k=v(""),lo=v(!0),xt=v([]),J=v({}),W=v([]),q=v({}),Zl=it(()=>E.value?J.value[E.value]||[]:[]);let es=0;function w(t,r="info"){const n=++es;xt.value=[...xt.value,{id:n,message:t,type:r}],setTimeout(()=>{xt.value=xt.value.filter(o=>o.id!==n)},3e3)}async function cr(t){try{const o=(await T().ref("groups").once("value")).val()||{};for(const[i,a]of Object.entries(o))if(a.settings&&a.settings.shortCode===t)return console.log(`[resolveShortCode] Resolved "${t}" to group ID: ${i}`),i;return console.log(`[resolveShortCode] No match found for "${t}", using as-is`),null}catch(r){return console.error("[resolveShortCode] Error:",r),null}}async function ts(){const t=sessionStorage.getItem("redirect");if(t){sessionStorage.removeItem("redirect");const s=t.replace(/^\/+|\/+$/g,"");if(s==="admin")return history.replaceState(null,"",t),"admin";if(s&&s!=="index.html"&&s!=="app.html")return history.replaceState(null,"",t),await cr(s)||s}const r=window.location.hash.replace(/^#\/?/,"");if(r&&r!=="admin")return await cr(r)||r;if(r==="admin")return"admin";const o=new URLSearchParams(window.location.search).get("group");if(o)return await cr(o)||o;const a=window.location.pathname.replace(/^\/+|\/+$/g,"");return a==="admin"?"admin":!a||a==="index.html"||a==="app.html"?null:await cr(a)||a}function rs(){return L(()=>{async function t(){try{No();const r=await ts();if(_.value=r,r&&r!=="admin"){const n=localStorage.getItem(`sessionUser_${r}`);n&&(k.value=n)}}catch(r){console.error("Initialization error:",r),w("Failed to initialize app","error")}finally{lo.value=!1}}t()},[]),lo.value?e(ol,{text:"Loading..."}):e(R,{children:[_.value===null&&e(_i,{}),_.value==="admin"&&e(Ql,{}),_.value&&_.value!=="admin"&&e(Jl,{}),e("div",{class:"toast-container",children:xt.value.map(t=>e(Xl,{message:t.message,type:t.type},t.id))})]})}di(e(rs,{}),document.getElementById("app"));
