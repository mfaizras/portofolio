import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.WFquGv8Z.js";import{c as a}from"./createLucideIcon.H8DUYhgo.js";import{G as v}from"./graduation-cap.DO-kGcjz.js";import{M as b}from"./mail.DtOJkuEb.js";import{A as k}from"./index.BET3G0sV.js";import{m as h}from"./proxy.B8_jWm_p.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],w=a("briefcase",g);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],j=a("code",M);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],_=a("file-text",N);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],E=a("folder",A);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],z=a("house",H);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],I=a("trophy",S);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],V=a("user",T),p=[{name:"About",href:"#about",icon:V},{name:"Experience",href:"#experience",icon:w},{name:"Skills",href:"#skills",icon:j},{name:"Projects",href:"#projects",icon:E},{name:"Achievements",href:"#achievements",icon:I},{name:"Education",href:"#education",icon:v},{name:"Blog",href:"#blog",icon:_},{name:"Contact",href:"#contact",icon:b}];function O(){const[m,f]=i.useState(!1),[u,x]=i.useState("");i.useEffect(()=>{const t={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},o=n=>{n.forEach(s=>{s.isIntersecting&&x(s.target.id)})},c=new IntersectionObserver(o,t);p.forEach(n=>{const s=n.href.substring(1),d=document.getElementById(s);d&&c.observe(d)});let r=!1;const l=()=>{r||(window.requestAnimationFrame(()=>{const n=document.getElementById("about");if(n){const s=n.offsetTop-100;f(window.scrollY>s)}r=!1}),r=!0)};return window.addEventListener("scroll",l,{passive:!0}),()=>{c.disconnect(),window.removeEventListener("scroll",l)}},[]);const y=t=>{const o=document.querySelector(t);o&&o.scrollIntoView({behavior:"smooth"})};return e.jsx(k,{children:m&&e.jsx(h.div,{initial:{y:-100,opacity:0,x:"-50%"},animate:{y:0,opacity:1,x:"-50%"},exit:{y:-100,opacity:0,x:"-50%"},transition:{duration:.3},className:"fixed top-6 left-1/2 z-50 pointer-events-none",children:e.jsxs("nav",{className:"flex items-center gap-1 bg-bgSecondary/80 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5 shadow-2xl pointer-events-auto",children:[e.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"p-2.5 rounded-full text-secondary hover:text-primary hover:bg-white/5 transition-all",title:"Back to Top",children:e.jsx(z,{size:18})}),e.jsx("div",{className:"w-px h-6 bg-white/10 mx-1"}),p.map(t=>{const o=u===t.href.substring(1);return e.jsxs("button",{onClick:()=>y(t.href),className:`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${o?"text-bg bg-primary":"text-text hover:text-primary hover:bg-white/5"}
                  `,children:[o&&e.jsx(h.span,{layoutId:"activeTab",className:"absolute inset-0 bg-primary rounded-full -z-10",transition:{type:"spring",bounce:.2,duration:.6}}),e.jsx(t.icon,{size:16,className:o?"text-bg":""}),e.jsx("span",{className:"hidden md:block",children:t.name})]},t.name)})]})})})}export{O as default};
