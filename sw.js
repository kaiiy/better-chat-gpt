if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const l=e=>n(e,c),t={module:{uri:c},exports:o,require:l};i[c]=Promise.all(s.map((e=>t[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/cl100k_base-6bc6573e.js",revision:null},{url:"assets/index-28241c85.js",revision:null},{url:"assets/index-70b74ae9.css",revision:null},{url:"assets/katex.min-d3697179.css",revision:null},{url:"index.html",revision:"9718973f7598dd6a1115324cc4b406b8"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"apple-touch-icon.png",revision:"e3a3296390c67a9b6035ae73b86421e3"},{url:"./icon-192x192.png",revision:"5230678567bcfe1cd9c1e2e5e032dc84"},{url:"./icon-256x256.png",revision:"e23f22ac411c7e19e7e50e0d1ca8e4ec"},{url:"./icon-384x384.png",revision:"22c66963a0eb1cc53efb5c76a71f08e3"},{url:"./icon-512x512.png",revision:"506a17ab8ff856cfca634c05bd1bfd52"},{url:"manifest.webmanifest",revision:"020fe53f5bcd87572042608f12249f96"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
