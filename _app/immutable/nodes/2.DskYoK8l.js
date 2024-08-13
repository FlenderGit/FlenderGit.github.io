import{s as M,n as G,x as Y,i as dt,q as mt,u as gt,v as pt,w as vt}from"../chunks/scheduler.Cu_nLO_j.js";import{S as R,i as S,e as v,t as A,c as _,a as x,b as H,d as m,o as d,g as C,h as p,j as L,s as E,u as I,y as B,f as P,v as D,w as T,n as j,l as y,x as k,z as _t,A as W,q as st,m as nt,p as $t}from"../chunks/index.gFKgLsBz.js";function F(i){return(i==null?void 0:i.length)!==void 0?i:Array.from(i)}function bt(i){let t,s,e;return{c(){t=v("button"),s=A(i[0]),this.h()},l(n){t=_(n,"BUTTON",{class:!0,"data-aos":!0});var a=x(t);s=H(a,i[0]),a.forEach(m),this.h()},h(){d(t,"class","font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-opacity-80 hover:text-opacity-80 rounded-full "+i[2]+" "+i[3]),d(t,"data-aos",e=i[1]?"flip-up":null)},m(n,a){C(n,t,a),p(t,s)},p(n,[a]){a&1&&L(s,n[0]),a&2&&e!==(e=n[1]?"flip-up":null)&&d(t,"data-aos",e)},i:G,o:G,d(n){n&&m(t)}}}function xt(i,t,s){let{text:e}=t,{inverted:n=!1}=t,{flip:a=!1}=t;const r=n?"bg-white":"bg-purple",o=n?"text-purple":"text-white";return i.$$set=l=>{"text"in l&&s(0,e=l.text),"inverted"in l&&s(4,n=l.inverted),"flip"in l&&s(1,a=l.flip)},[e,a,r,o,n]}class O extends R{constructor(t){super(),S(this,t,xt,bt,M,{text:0,inverted:4,flip:1})}}function wt(i){let t,s,e,n="Hello, I'm Tristan DELOEIL",a,r,o='I&#39;m a <span class="text-purple">Fullstack developper</span> based at Reims',l,u,h,c,b,f;return h=new O({props:{text:"Contact me"}}),b=new O({props:{text:"Resume",inverted:!0}}),{c(){t=v("div"),s=v("div"),e=v("p"),e.textContent=n,a=E(),r=v("p"),r.innerHTML=o,l=E(),u=v("div"),I(h.$$.fragment),c=E(),I(b.$$.fragment),this.h()},l(g){t=_(g,"DIV",{id:!0,class:!0});var w=x(t);s=_(w,"DIV",{class:!0});var $=x(s);e=_($,"P",{class:!0,"data-aos":!0,"data-aos-duration":!0,"data-svelte-h":!0}),B(e)!=="svelte-u4deg3"&&(e.textContent=n),a=P($),r=_($,"P",{class:!0,"data-svelte-h":!0}),B(r)!=="svelte-w38zat"&&(r.innerHTML=o),l=P($),u=_($,"DIV",{class:!0,"data-aos":!0,"data-aos-duration":!0});var V=x(u);D(h.$$.fragment,V),c=P(V),D(b.$$.fragment,V),V.forEach(m),$.forEach(m),w.forEach(m),this.h()},h(){d(e,"class","text-purple text-3xl"),d(e,"data-aos","fade-left"),d(e,"data-aos-duration","800"),d(r,"class","font-extrabold md:text-7xl sm:text-5xl text-3xl md:max-w-xl"),d(u,"class","flex flex-row gap-4"),d(u,"data-aos","fade-right"),d(u,"data-aos-duration","700"),d(s,"class","flex flex-col gap-4 justify-center md:ml-24 sm:mx-12 mx-8"),d(t,"id","hero"),d(t,"class","h-screen w-screen overflow-hidden bg-bubble flex flex-col justify-center relative svelte-1kdgvd6")},m(g,w){C(g,t,w),p(t,s),p(s,e),p(s,a),p(s,r),p(s,l),p(s,u),T(h,u,null),p(u,c),T(b,u,null),f=!0},p:G,i(g){f||(j(h.$$.fragment,g),j(b.$$.fragment,g),f=!0)},o(g){y(h.$$.fragment,g),y(b.$$.fragment,g),f=!1},d(g){g&&m(t),k(h),k(b)}}}class jt extends R{constructor(t){super(),S(this,t,null,wt,M,{})}}function yt(i){let t,s,e,n,a;return{c(){t=v("button"),s=v("img"),this.h()},l(r){t=_(r,"BUTTON",{class:!0});var o=x(t);s=_(o,"IMG",{src:!0,title:!0,class:!0,alt:!0}),o.forEach(m),this.h()},h(){Y(s.src,e=i[1])||d(s,"src",e),d(s,"title",i[0]),d(s,"class","max-h-full"),d(s,"alt",i[0]),d(t,"class","p-2 bg-grey rounded-lg md:h-20 md:w-20 h-16 w-16 flex items-center justify-center cursor-pointer hover:bg-neutral-700 transition-colors duration-300")},m(r,o){C(r,t,o),p(t,s),n||(a=_t(t,"click",function(){dt(i[2])&&i[2].apply(this,arguments)}),n=!0)},p(r,[o]){i=r,o&2&&!Y(s.src,e=i[1])&&d(s,"src",e),o&1&&d(s,"title",i[0]),o&1&&d(s,"alt",i[0])},i:G,o:G,d(r){r&&m(t),n=!1,a()}}}function Ct(i,t,s){let{title:e}=t,{src:n}=t,{active:a=!1}=t,{onClick:r}=t;return i.$$set=o=>{"title"in o&&s(0,e=o.title),"src"in o&&s(1,n=o.src),"active"in o&&s(3,a=o.active),"onClick"in o&&s(2,r=o.onClick)},[e,n,r,a]}class Et extends R{constructor(t){super(),S(this,t,Ct,yt,M,{title:0,src:1,active:3,onClick:2})}}function q(i,t,s){const e=i.slice();return e[1]=t[s],e}function z(i){let t,s=i[0].date+"",e;return{c(){t=v("p"),e=A(s)},l(n){t=_(n,"P",{});var a=x(t);e=H(a,s),a.forEach(m)},m(n,a){C(n,t,a),p(t,e)},p(n,a){a&1&&s!==(s=n[0].date+"")&&L(e,s)},d(n){n&&m(t)}}}function K(i){let t,s,e=i[1].title+"",n,a;return{c(){t=v("div"),s=v("p"),n=A(e),a=E(),this.h()},l(r){t=_(r,"DIV",{});var o=x(t);s=_(o,"P",{class:!0});var l=x(s);n=H(l,e),l.forEach(m),a=P(o),o.forEach(m),this.h()},h(){d(s,"class","uppercase")},m(r,o){C(r,t,o),p(t,s),p(s,n),p(t,a)},p(r,o){o&1&&e!==(e=r[1].title+"")&&L(n,e)},d(r){r&&m(t)}}}function Pt(i){let t,s,e,n=i[0].name+"",a,r,o,l=i[0].date&&z(i),u=F(i[0].technologies),h=[];for(let c=0;c<u.length;c+=1)h[c]=K(q(i,u,c));return{c(){t=v("div"),l&&l.c(),s=E(),e=v("p"),a=A(n),r=E(),o=v("div");for(let c=0;c<h.length;c+=1)h[c].c();this.h()},l(c){t=_(c,"DIV",{class:!0});var b=x(t);l&&l.l(b),s=P(b),e=_(b,"P",{});var f=x(e);a=H(f,n),f.forEach(m),r=P(b),o=_(b,"DIV",{class:!0});var g=x(o);for(let w=0;w<h.length;w+=1)h[w].l(g);g.forEach(m),b.forEach(m),this.h()},h(){d(o,"class","flex gap-3"),d(t,"class","rounded border-neutral-500 border-2 px-3 py-2 w-full")},m(c,b){C(c,t,b),l&&l.m(t,null),p(t,s),p(t,e),p(e,a),p(t,r),p(t,o);for(let f=0;f<h.length;f+=1)h[f]&&h[f].m(o,null)},p(c,[b]){if(c[0].date?l?l.p(c,b):(l=z(c),l.c(),l.m(t,s)):l&&(l.d(1),l=null),b&1&&n!==(n=c[0].name+"")&&L(a,n),b&1){u=F(c[0].technologies);let f;for(f=0;f<u.length;f+=1){const g=q(c,u,f);h[f]?h[f].p(g,b):(h[f]=K(g),h[f].c(),h[f].m(o,null))}for(;f<h.length;f+=1)h[f].d(1);h.length=u.length}},i:G,o:G,d(c){c&&m(t),l&&l.d(),W(h,c)}}}function It(i,t,s){let{project:e}=t;return i.$$set=n=>{"project"in n&&s(0,e=n.project)},[e]}class Dt extends R{constructor(t){super(),S(this,t,It,Pt,M,{project:0})}}function X(i,t,s){const e=i.slice();return e[1]=t[s],e}function Z(i){let t,s;return t=new Dt({props:{project:i[1]}}),{c(){I(t.$$.fragment)},l(e){D(t.$$.fragment,e)},m(e,n){T(t,e,n),s=!0},p(e,n){const a={};n&1&&(a.project=e[1]),t.$set(a)},i(e){s||(j(t.$$.fragment,e),s=!0)},o(e){y(t.$$.fragment,e),s=!1},d(e){k(t,e)}}}function Tt(i){let t,s,e=F(i[0]),n=[];for(let r=0;r<e.length;r+=1)n[r]=Z(X(i,e,r));const a=r=>y(n[r],1,1,()=>{n[r]=null});return{c(){t=v("div");for(let r=0;r<n.length;r+=1)n[r].c();this.h()},l(r){t=_(r,"DIV",{class:!0});var o=x(t);for(let l=0;l<n.length;l+=1)n[l].l(o);o.forEach(m),this.h()},h(){d(t,"class","bg-neutral-700 gap-2 max-w-96 w-full")},m(r,o){C(r,t,o);for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(t,null);s=!0},p(r,[o]){if(o&1){e=F(r[0]);let l;for(l=0;l<e.length;l+=1){const u=X(r,e,l);n[l]?(n[l].p(u,o),j(n[l],1)):(n[l]=Z(u),n[l].c(),j(n[l],1),n[l].m(t,null))}for(st(),l=e.length;l<n.length;l+=1)a(l);nt()}},i(r){if(!s){for(let o=0;o<e.length;o+=1)j(n[o]);s=!0}},o(r){n=n.filter(Boolean);for(let o=0;o<n.length;o+=1)y(n[o]);s=!1},d(r){r&&m(t),W(n,r)}}}function kt(i,t,s){let{projects:e}=t;return i.$$set=n=>{"projects"in n&&s(0,e=n.projects)},[e]}class Vt extends R{constructor(t){super(),S(this,t,kt,Tt,M,{projects:0})}}const J={title:"Rust",src:"rust.svg"},lt={title:"WebAssembly",src:"wasm.svg"},N={title:"C++",src:"cpp.svg"},rt={title:"Go",src:"go.svg"},U={title:"PHP",src:"php.svg"},at={title:"C",src:"c.svg"},Gt={title:"C#",src:"csharp.svg"},it={title:"Java",src:"java.svg"},ot={title:"Python",src:"python.svg"},ct={title:"Godot",src:"godot.svg"},ut={title:"React",src:"react.svg"},ft={title:"Svelte",src:"svelte.svg"},Mt={title:"Elm",src:"elm.svg"},Rt={title:"JavaScript",src:"js.svg"},St={title:"Docker",src:"docker.svg"},At=[J,lt,N,rt,U,at,it,ot,ct,ut,ft,Gt,Mt,Rt,St],ht=[{name:"Braille translator",description:"Tiny library in Rust that translates text to Braille. Exemple with WebAssembly.",url:"https://example.com/project1",github:"https://github.com/FlenderGit/rust-braille-translate",technologies:[J,lt]},{name:"Minecraft server",description:"TCP server write in C++ that allows to communicate with Minecraft clients.",url:"https://example.com/project2",github:"https://github.com/FlenderGit/cpp-minecraft-server",technologies:[N]},{name:"Recipe API",description:"REST API in Golang to manage recipes. Use JWT for authentication.",url:"https://example.com/project3",github:"https://github.com/FlenderGit/go-cooking-web-app",technologies:[rt]},{name:"Zoln",description:"My own prohramming language.",url:"https://example.com/project4",github:"https://github.com/FlenderGit/cpp-zoln",technologies:[N]},{name:"GB emulator",description:"Gameboy emulator write in Rust.",url:"https://example.com/project5",github:"https://github.com/FlenderGit/rust-gb-emulator",technologies:[J]},{name:"PHPRouter",description:"Simple router for PHP.",url:"https://example.com/project6",github:"https://github.com/FlenderGit/php-PHPRouter",technologies:[U]},{name:"Math parser",description:"Math parser write in C.",url:"https://example.com/project7",github:"https://github.com/FlenderGit/c-mathparser",technologies:[at]},{name:"VNBot",description:"Discord bot for visual novels fans using VNDB TCP api.",url:"https://example.com/project8",youtube:"https://youtu.be/Xjl8JCm1m4g",technologies:[ot]},{name:"Project Fynix",description:"Simple raycaster in Java. Implemente Y-shearing & texture.",url:"https://example.com/project9",youtube:"https://youtu.be/GisriFsBNn8",technologies:[it]},{name:"The Awakening Realms",description:"Godot games created during my studies.",youtube:"https://youtu.be/rURYuC9du9M",technologies:[ct]},{name:"AOC",description:"Web application to the board game AOC.",youtube:"https://youtu.be/W_yVNAKgtXo",technologies:[U,ut]},{name:"This portfolio",description:"My portfolio created with Svelte.",technologies:[ft]}];function Q(i,t,s){const e=i.slice();return e[4]=t[s],e}function tt(i){let t,s;return t=new Et({props:{src:"/languages/"+i[4].src,title:i[4].title,onClick:i[3](i[4]),active:i[4]===i[0]}}),{c(){I(t.$$.fragment)},l(e){D(t.$$.fragment,e)},m(e,n){T(t,e,n),s=!0},p(e,n){const a={};n&1&&(a.active=e[4]===e[0]),t.$set(a)},i(e){s||(j(t.$$.fragment,e),s=!0)},o(e){y(t.$$.fragment,e),s=!1},d(e){k(t,e)}}}function Ht(i){let t,s,e,n='<p class="font-extrabold text-3xl">Technologies</p> <p class="max-w-96 font-bold text-neutral-300">I&#39;m a very curious guy. Dusty or modern languages, I&#39;m keen on new things.</p>',a,r,o,l,u,h=F(i[2]),c=[];for(let f=0;f<h.length;f+=1)c[f]=tt(Q(i,h,f));const b=f=>y(c[f],1,1,()=>{c[f]=null});return l=new Vt({props:{projects:i[1]}}),{c(){t=v("div"),s=v("div"),e=v("div"),e.innerHTML=n,a=E(),r=v("div");for(let f=0;f<c.length;f+=1)c[f].c();o=E(),I(l.$$.fragment),this.h()},l(f){t=_(f,"DIV",{class:!0});var g=x(t);s=_(g,"DIV",{class:!0});var w=x(s);e=_(w,"DIV",{"data-aos":!0,"data-aos-duration":!0,class:!0,"data-svelte-h":!0}),B(e)!=="svelte-7wyghu"&&(e.innerHTML=n),a=P(w),r=_(w,"DIV",{class:!0,"data-aos":!0,"data-aos-duration":!0});var $=x(r);for(let V=0;V<c.length;V+=1)c[V].l($);$.forEach(m),w.forEach(m),o=P(g),D(l.$$.fragment,g),g.forEach(m),this.h()},h(){d(e,"data-aos","fade-right"),d(e,"data-aos-duration","1000"),d(e,"class","md:ml-0 ml-24"),d(r,"class","grid grid-cols-4 gap-3 icons"),d(r,"data-aos","fade-left"),d(r,"data-aos-duration","1000"),d(s,"class","flex md:flex-row flex-col items-center justify-center gap-2 mx-4"),d(t,"class","flex flex-col gap-6 items-center")},m(f,g){C(f,t,g),p(t,s),p(s,e),p(s,a),p(s,r);for(let w=0;w<c.length;w+=1)c[w]&&c[w].m(r,null);p(t,o),T(l,t,null),u=!0},p(f,[g]){if(g&13){h=F(f[2]);let $;for($=0;$<h.length;$+=1){const V=Q(f,h,$);c[$]?(c[$].p(V,g),j(c[$],1)):(c[$]=tt(V),c[$].c(),j(c[$],1),c[$].m(r,null))}for(st(),$=h.length;$<c.length;$+=1)b($);nt()}const w={};g&2&&(w.projects=f[1]),l.$set(w)},i(f){if(!u){for(let g=0;g<h.length;g+=1)j(c[g]);j(l.$$.fragment,f),u=!0}},o(f){c=c.filter(Boolean);for(let g=0;g<c.length;g+=1)y(c[g]);y(l.$$.fragment,f),u=!1},d(f){f&&m(t),W(c,f),k(l)}}}function Lt(i,t,s){const e=At;let n=null,a=[];const r=o=>()=>{s(0,n=n===o?null:o)};return i.$$.update=()=>{i.$$.dirty&1&&s(1,a=n!==null?ht.filter(o=>{var l;return(l=o.technologies)==null?void 0:l.includes(n)}):[])},[n,a,e,r]}class Ft extends R{constructor(t){super(),S(this,t,Lt,Ht,M,{})}}function Bt(i){let t,s,e,n,a,r;return{c(){t=v("div"),s=v("p"),e=A(i[0]),n=E(),a=v("p"),r=A(i[1]),this.h()},l(o){t=_(o,"DIV",{class:!0,"data-aos":!0});var l=x(t);s=_(l,"P",{class:!0});var u=x(s);e=H(u,i[0]),u.forEach(m),n=P(l),a=_(l,"P",{class:!0});var h=x(a);r=H(h,i[1]),h.forEach(m),l.forEach(m),this.h()},h(){d(s,"class","text-3xl font-extrabold text-purple"),d(a,"class","text-lg font-medium text-neutral-300"),d(t,"class","w-60 bg-neutral-700 rounded-md p-3 text-center"),d(t,"data-aos","zoom-in")},m(o,l){C(o,t,l),p(t,s),p(s,e),p(t,n),p(t,a),p(a,r)},p(o,[l]){l&1&&L(e,o[0]),l&2&&L(r,o[1])},i:G,o:G,d(o){o&&m(t)}}}function Ot(i,t,s){let{title:e}=t,{subtitle:n}=t;return i.$$set=a=>{"title"in a&&s(0,e=a.title),"subtitle"in a&&s(1,n=a.subtitle)},[e,n]}class et extends R{constructor(t){super(),S(this,t,Ot,Bt,M,{title:0,subtitle:1})}}function Jt(i){let t,s;const e=i[1].default,n=mt(e,i,i[0],null);return{c(){t=v("div"),n&&n.c(),this.h()},l(a){t=_(a,"DIV",{class:!0,style:!0});var r=x(t);n&&n.l(r),r.forEach(m),this.h()},h(){d(t,"class","bg-space w-screen flex flex-col items-center justify-center h-96 bg-cover"),$t(t,"background-position","10% 5%")},m(a,r){C(a,t,r),n&&n.m(t,null),s=!0},p(a,[r]){n&&n.p&&(!s||r&1)&&gt(n,e,a,a[0],s?vt(e,a[0],r,null):pt(a[0]),null)},i(a){s||(j(n,a),s=!0)},o(a){y(n,a),s=!1},d(a){a&&m(t),n&&n.d(a)}}}function Nt(i,t,s){let{$$slots:e={},$$scope:n}=t;return i.$$set=a=>{"$$scope"in a&&s(0,n=a.$$scope)},[n,e]}class Ut extends R{constructor(t){super(),S(this,t,Nt,Jt,M,{})}}function Wt(i){let t,s='I&#39;m looking for a <span class="text-purple">intership</span> ',e,n="I'm looking for a intership to continue my studies",a,r,o;return r=new O({props:{text:"Get my resume",flip:!0}}),{c(){t=v("p"),t.innerHTML=s,e=v("p"),e.textContent=n,a=E(),I(r.$$.fragment),this.h()},l(l){t=_(l,"P",{class:!0,"data-svelte-h":!0}),B(t)!=="svelte-o1gggx"&&(t.innerHTML=s),e=_(l,"P",{class:!0,"data-svelte-h":!0}),B(e)!=="svelte-ro961"&&(e.textContent=n),a=P(l),D(r.$$.fragment,l),this.h()},h(){d(t,"class","font-bold text-4xl"),d(e,"class","px-2 text-second mb-2")},m(l,u){C(l,t,u),C(l,e,u),C(l,a,u),T(r,l,u),o=!0},p:G,i(l){o||(j(r.$$.fragment,l),o=!0)},o(l){y(r.$$.fragment,l),o=!1},d(l){l&&(m(t),m(e),m(a)),k(r,l)}}}function Yt(i){let t,s,e,n,a,r,o,l;return e=new et({props:{title:String(i[0]),subtitle:"Projects"}}),a=new et({props:{title:i[1]+"+",subtitle:"Years of experiences"}}),o=new Ut({props:{$$slots:{default:[Wt]},$$scope:{ctx:i}}}),{c(){t=v("div"),s=v("div"),I(e.$$.fragment),n=E(),I(a.$$.fragment),r=E(),I(o.$$.fragment),this.h()},l(u){t=_(u,"DIV",{class:!0});var h=x(t);s=_(h,"DIV",{class:!0});var c=x(s);D(e.$$.fragment,c),n=P(c),D(a.$$.fragment,c),c.forEach(m),r=P(h),D(o.$$.fragment,h),h.forEach(m),this.h()},h(){d(s,"class","absolute flex flex-row w-screen justify-center gap-6 top-[-2rem]"),d(t,"class","relative mt-20")},m(u,h){C(u,t,h),p(t,s),T(e,s,null),p(s,n),T(a,s,null),p(t,r),T(o,t,null),l=!0},p(u,[h]){const c={};h&4&&(c.$$scope={dirty:h,ctx:u}),o.$set(c)},i(u){l||(j(e.$$.fragment,u),j(a.$$.fragment,u),j(o.$$.fragment,u),l=!0)},o(u){y(e.$$.fragment,u),y(a.$$.fragment,u),y(o.$$.fragment,u),l=!1},d(u){u&&m(t),k(e),k(a),k(o)}}}const qt=2016;function zt(i){const t=ht.length,s=new Date().getFullYear()-qt;return[t,s]}class Kt extends R{constructor(t){super(),S(this,t,zt,Yt,M,{})}}function Xt(i){let t,s,e,n,a,r,o;return s=new jt({}),n=new Ft({}),r=new Kt({}),{c(){t=v("div"),I(s.$$.fragment),e=E(),I(n.$$.fragment),a=E(),I(r.$$.fragment),this.h()},l(l){t=_(l,"DIV",{class:!0});var u=x(t);D(s.$$.fragment,u),e=P(u),D(n.$$.fragment,u),a=P(u),D(r.$$.fragment,u),u.forEach(m),this.h()},h(){d(t,"class","flex flex-col gap-6 overflow-x-hidden")},m(l,u){C(l,t,u),T(s,t,null),p(t,e),T(n,t,null),p(t,a),T(r,t,null),o=!0},p:G,i(l){o||(j(s.$$.fragment,l),j(n.$$.fragment,l),j(r.$$.fragment,l),o=!0)},o(l){y(s.$$.fragment,l),y(n.$$.fragment,l),y(r.$$.fragment,l),o=!1},d(l){l&&m(t),k(s),k(n),k(r)}}}class te extends R{constructor(t){super(),S(this,t,null,Xt,M,{})}}export{te as component};