/* LIWA's Wardrobe — shared site logic (header, footer, bag, wishlist, search, checkout) */
(function(){
const S=SETTINGS;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const rs=v=>'Rs '+Math.round(v).toLocaleString('en-PK');
const get=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??d}catch(e){return d}};
const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const byId=id=>PRODUCTS.find(p=>p.id===id);
const pct=p=>p.o?Math.round((1-p.p/p.o)*100):0;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const wa=t=>'https://wa.me/'+S.whatsapp+'?text='+encodeURIComponent(t);
const who=p=>p.w==='L'?'Ladies':'Gents';
const pieceLabel=p=>p.w==='L'?p.pc+'-Piece':p.pc+' m suit';
const I={
 search:'<svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 heart:'<svg class="ic" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/></svg>',
 bag:'<svg class="ic" viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
 menu:'<svg class="ic" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
 x:'<svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 wa:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>',
 fb:'<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z"/></svg>',
 ig:'<svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>'
};

/* ---------- fabric art (used until real photos are added) ---------- */
function motif(cv,pr,view){
  const x=cv.getContext('2d'),w=cv.width,h=cv.height,pal=pr.pal||['#f3e6d3','#b8863b','#151311'],[bg,a,b]=pal;
  const k=w/320; view=view||'a';
  x.setTransform(1,0,0,1,0,0);x.fillStyle=bg;x.fillRect(0,0,w,h);
  const plain=pr.m==='weave'||pr.m==='twill';
  if(plain){
    const z=view==='b'?2.4:view==='c'?4:1, st=3*z*k;
    x.globalAlpha=.5;x.strokeStyle=a;x.lineWidth=Math.max(1,z*k*.8);
    if(pr.m==='weave'){for(let i=0;i<w;i+=st){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke();}x.globalAlpha=.22;for(let j=0;j<h;j+=st*1.3){x.beginPath();x.moveTo(0,j);x.lineTo(w,j);x.stroke();}}
    else{for(let i=-h;i<w;i+=st*1.7){x.beginPath();x.moveTo(i,0);x.lineTo(i+h,h);x.stroke();}}
    x.globalAlpha=1;
    const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'rgba(255,255,255,.22)');g.addColorStop(.55,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(0,0,0,.22)');x.fillStyle=g;x.fillRect(0,0,w,h);
    if(view==='a'||view==='d'){const n=view==='d'?6:4;for(let i=1;i<n;i++){const y=h*i/n;x.fillStyle='rgba(0,0,0,.14)';x.fillRect(0,y,w,2*k);x.fillStyle='rgba(255,255,255,.25)';x.fillRect(0,y+2*k,w,2*k);}}
    return;
  }
  const z=view==='b'?2.3:view==='c'?.8:1, sc=k*z, s=(pr.m==='jaal'?54:44)*sc;
  const sparse=view==='c';
  for(let r=-1;r<h/s+1;r++)for(let c=-1;c<w/s+1;c++){
    if(sparse&&(r+c)%3)continue;
    const cx=c*s+(r%2?s/2:0),cy=r*s;x.setTransform(sc,0,0,sc,cx,cy);
    if(pr.m==='flower'||pr.m==='lotus'){const n=pr.m==='lotus'?8:5;for(let i=0;i<n;i++){x.rotate(Math.PI*2/n);x.fillStyle=a;x.beginPath();x.ellipse(0,-9,4.5,9,0,0,7);x.fill();}x.fillStyle=b;x.beginPath();x.arc(0,0,3.5,0,7);x.fill();}
    else if(pr.m==='dots'){x.fillStyle=a;x.beginPath();x.arc(0,0,6,0,7);x.fill();x.fillStyle=b;x.beginPath();x.arc(22,22,3,0,7);x.fill();}
    else if(pr.m==='block'){x.strokeStyle=a;x.lineWidth=3;x.strokeRect(-12,-12,24,24);x.fillStyle=b;x.beginPath();x.moveTo(0,-8);x.lineTo(8,0);x.lineTo(0,8);x.lineTo(-8,0);x.fill();}
    else if(pr.m==='leaf'){x.rotate(.6);x.fillStyle=a;x.beginPath();x.ellipse(0,0,5,13,0,0,7);x.fill();x.strokeStyle=b;x.lineWidth=1.5;x.beginPath();x.moveTo(0,-12);x.lineTo(0,12);x.stroke();}
    else if(pr.m==='jaal'){x.strokeStyle=a;x.lineWidth=1.6;x.beginPath();x.moveTo(0,-27);x.quadraticCurveTo(18,0,0,27);x.quadraticCurveTo(-18,0,0,-27);x.stroke();x.fillStyle=b;x.beginPath();x.arc(0,0,3,0,7);x.fill();}
  }
  x.setTransform(1,0,0,1,0,0);
  const border=(y,flip)=>{const bh=26*k;x.fillStyle=a;x.fillRect(0,y,w,bh*.55);x.fillStyle=b||bg;for(let i=0;i<w;i+=14*k)x.fillRect(i,y+(flip?bh*.3:bh*.15),7*k,6*k);};
  if(view==='a')border(h-36*k);
  if(view==='c'){border(10*k,1);border(h-26*k);}
  if(view==='d'){for(let i=1;i<5;i++){const y=h*i/5;x.fillStyle='rgba(0,0,0,.16)';x.fillRect(0,y,w,3*k);x.fillStyle='rgba(255,255,255,.28)';x.fillRect(0,y+3*k,w,2*k);}}
}
function art(p,view,W,H,cls){
  const imgs=p.img||[], idx={a:0,b:1,c:2,d:3}[view||'a'];
  if(imgs[idx]) return `<img ${cls?`class="${cls}"`:''} src="${esc(imgs[idx])}" alt="${esc(p.n)} ${esc(p.f)}" loading="lazy">`;
  return `<canvas ${cls?`class="${cls}"`:''} width="${W||360}" height="${H||480}" data-art="${p.id}" data-v="${view||'a'}" role="img" aria-label="${esc(p.n)} ${esc(p.f)} fabric"></canvas>`;
}
function paint(root){$$('canvas[data-art]',root||document).forEach(c=>{if(c.dataset.done)return;const p=byId(c.dataset.art)||{pal:JSON.parse(c.dataset.pal||'null')||undefined,m:c.dataset.m};motif(c,p,c.dataset.v);c.dataset.done=1;});}

/* ---------- product card ---------- */
function card(p,i){
  const on=wish.includes(p.id),out=p.stock===false;
  return `<article class="card" style="animation-delay:${(i||0)*35}ms">
    <div class="phw"><a class="ph" href="product.html?id=${p.id}" aria-label="${esc(p.n)}">${art(p,'a',360,480,'a')}${art(p,'b',360,480,'b')}</a>
    <div class="badges">${out?'<span class="bd x">Sold out</span>':''}${p.t==='sale'?`<span class="bd s">-${pct(p)}%</span>`:''}${p.t==='new'?'<span class="bd n">New</span>':''}</div>
    <button class="heart" type="button" data-wish="${p.id}" aria-pressed="${on}" aria-label="Save ${esc(p.n)} to wishlist"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/></svg></button>
    ${out?'':`<button class="btn sm qa" type="button" data-quick="${p.id}">Quick Add · ${pieceLabel(p)}</button>`}</div>
    <div class="meta">${who(p)} · ${esc(p.f)} · ${pieceLabel(p)}</div>
    <h3><a href="product.html?id=${p.id}">${esc(p.n)} — ${esc(p.work||p.f)}</a></h3>
    <div class="price"><b>${rs(p.p)}</b>${p.o?`<s>${rs(p.o)}</s><span class="off">Save ${pct(p)}%</span>`:''}</div>
    <div class="sw">${(p.pal||[]).map(c=>`<i style="background:${c}"></i>`).join('')}</div>
  </article>`;
}

/* ---------- state ---------- */
let bag=get('liwa-bag',[]).filter(l=>byId(l.id)), wish=get('liwa-wish',[]).filter(byId);
const saveBag=()=>put('liwa-bag',bag), saveWish=()=>put('liwa-wish',wish);
function addToBag(id,opt,qty){
  const p=byId(id);if(!p||p.stock===false)return;
  const o=opt||pieceLabel(p), price=optPrice(p,o);
  const l=bag.find(x=>x.id===id&&x.o===o); l?l.q+=qty||1:bag.push({id,o,p:price,q:qty||1});
  saveBag();drawBag();toast(`${p.n} added to bag`);
}
function options(p){
  if(p.w==='L') return p.pc===3?[['3-Piece',0],['2-Piece (without dupatta)',-700]]:[['2-Piece',0]];
  return [[p.pc+' m suit',0],[(p.pc+0.5)+' m (tall / broad build)',Math.round(p.p/p.pc*0.5/50)*50]];
}
function optPrice(p,o){const f=options(p).find(x=>x[0]===o);return p.p+(f?f[1]:0);}

/* ---------- chrome (header/footer/drawers) ---------- */
function chrome(){
  const page=document.body.dataset.page;
  const cur=h=>page===h?' aria-current="page"':'';
  const ladiesF=[...new Set(PRODUCTS.filter(p=>p.w==='L').map(p=>p.f))], gentsF=[...new Set(PRODUCTS.filter(p=>p.w==='G').map(p=>p.f))];
  const head=`
  <a class="sr" href="#main">Skip to content</a>
  <div class="top" id="topbar" aria-live="polite">
    <span>Cash on Delivery <b>all over Pakistan</b></span>
    <span style="opacity:0;transform:translateY(100%)">Free delivery on orders above <b>${rs(S.freeDeliveryAbove)}</b></span>
    <span style="opacity:0;transform:translateY(100%)">Pay in advance and save <b>${S.advanceDiscount}%</b></span>
    <span style="opacity:0;transform:translateY(100%)">Easy <b>${S.exchangeDays}-day</b> exchange</span>
  </div>
  <header class="site"><div class="wrap">
    <div class="hbar">
      <div class="hl"><button class="ib burger" data-open="mnav" type="button" aria-label="Open menu">${I.menu}</button><button class="ib sb" data-open="search" type="button" aria-label="Search">${I.search}</button></div>
      <a class="brand" href="index.html" aria-label="${esc(S.brand)} home"><b>LIWA<i>'s</i></b><small>WARDROBE</small></a>
      <div class="hr"><button class="ib" data-open="search" type="button" aria-label="Search" style="display:none"></button>
        <a class="ib" href="shop.html?c=wishlist" aria-label="Wishlist">${I.heart}<span class="n" id="wishN">0</span></a>
        <button class="ib" data-open="bag" type="button" aria-label="Shopping bag">${I.bag}<span class="n" id="bagN">0</span></button></div>
    </div>
    <nav class="menu" aria-label="Main">
      <div><a href="shop.html?c=new"${cur('new')}>New In</a></div>
      <div><a href="shop.html?c=ladies">Ladies</a><div class="mega"><div><h4>By fabric</h4>${ladiesF.map(f=>`<a href="shop.html?c=ladies&f=${encodeURIComponent(f)}">${f}</a>`).join('')}</div><div><h4>By pieces</h4><a href="shop.html?c=ladies&pc=3">3-Piece</a><a href="shop.html?c=ladies&pc=2">2-Piece</a></div><div><h4>By season</h4><a href="shop.html?c=ladies&s=summer">Summer</a><a href="shop.html?c=ladies&s=winter">Winter</a><a href="shop.html?c=ladies&s=all">Festive</a></div></div></div>
      <div><a href="shop.html?c=gents">Gents</a><div class="mega"><div><h4>By fabric</h4>${gentsF.map(f=>`<a href="shop.html?c=gents&f=${encodeURIComponent(f)}">${f}</a>`).join('')}</div><div><h4>By season</h4><a href="shop.html?c=gents&s=summer">Summer</a><a href="shop.html?c=gents&s=winter">Winter</a><a href="shop.html?c=gents&s=all">All season</a></div><div><h4>Help</h4><a href="fabric-guide.html#meter">How many metres?</a><a href="fabric-guide.html">Fabric guide</a></div></div></div>
      <div><a href="shop.html?c=season">Seasonal</a></div>
      <div><a href="shop.html?c=sale" class="sale">Special Offers</a></div>
      <div><a href="fabric-guide.html"${cur('guide')}>Fabric Guide</a></div>
      <div><a href="about.html"${cur('about')}>About</a></div>
    </nav>
  </div></header>`;
  const foot=`
  <footer class="foot"><div class="wrap">
    <div class="fcols">
      <div><a class="brand" href="index.html" style="text-align:left;margin-bottom:14px"><b>LIWA<i>'s</i></b><small>WARDROBE</small></a>
        <p>Ladies & Gents Unstitched Collection. Carefully selected fabrics at fair prices, delivered all over Pakistan.</p>
        <div class="soc"><a href="${esc(S.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a><a href="${esc(S.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a><a href="${wa("Assalam o Alaikum LIWA's Wardrobe!")}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a></div>
        <div class="pay"><span>COD</span><span>Easypaisa</span><span>Bank Transfer</span></div></div>
      <div><h4>Shop</h4><a href="shop.html?c=ladies">Ladies Unstitched</a><a href="shop.html?c=gents">Gents Unstitched</a><a href="shop.html?c=new">New Arrivals</a><a href="shop.html?c=season">Seasonal Collection</a><a href="shop.html?c=sale">Special Offers</a></div>
      <div><h4>Help</h4><a href="policies.html#shipping">Shipping & Delivery</a><a href="policies.html#exchange">Exchange & Return</a><a href="policies.html#payment">Payment</a><a href="contact.html#faq">FAQs</a><a href="fabric-guide.html">Fabric Guide</a></div>
      <div><h4>Contact</h4><p>WhatsApp: ${esc(S.whatsappDisplay)}</p><p>Email: ${esc(S.email)}</p><p>Instagram: ${esc(S.instagramHandle)}</p><p>${esc(S.city)}</p><a class="link" href="contact.html">All contact options</a></div>
    </div>
    <div class="copy"><span class="script">${esc(S.tagline)}</span><span>© ${new Date().getFullYear()} ${esc(S.brand)}. All rights reserved.</span></div>
  </div></footer>
  <a class="waf" id="waf" href="${wa("Assalam o Alaikum LIWA's Wardrobe! Mujhe new collection ke baare mein maloomat chahiye.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${I.wa}</a>
  <div class="scrim" id="scrim"></div>
  <aside class="drawer left" id="mnav" aria-label="Menu"><div class="dh"><h3>Menu</h3><button class="ib" data-close type="button" aria-label="Close menu">${I.x}</button></div>
    <div class="dscroll mnav"><a href="shop.html?c=new">New In</a><a href="shop.html?c=ladies">Ladies Unstitched</a><a href="shop.html?c=gents">Gents Unstitched</a><a href="shop.html?c=season">Seasonal Collection</a><a href="shop.html?c=sale" style="color:var(--sale)">Special Offers</a><a href="fabric-guide.html">Fabric Guide</a><a href="about.html">About Us</a><a href="contact.html">Contact</a><a href="policies.html">Policies</a><small>WhatsApp: ${esc(S.whatsappDisplay)}</small></div></aside>
  <aside class="drawer" id="bag" aria-label="Shopping bag"><div class="dh"><h3 id="bagTitle">Your Bag</h3><button class="ib" data-close type="button" aria-label="Close bag">${I.x}</button></div><div class="dscroll" id="bagBody"></div></aside>
  <div class="search" id="search" role="dialog" aria-label="Search"><div class="wrap" style="padding:0"><div style="display:flex;gap:10px;align-items:center"><input id="q" placeholder="Search lawn, boski, khaddar…" aria-label="Search products"><button class="ib" data-close type="button" aria-label="Close search">${I.x}</button></div><div class="sres" id="sres"></div></div></div>
  <div class="toast" id="toast" role="status"></div>`;
  $('#head').outerHTML=head; $('#foot').outerHTML=foot;
}

/* ---------- bag + checkout ---------- */
let step='bag';
function totals(){
  const sub=bag.reduce((a,l)=>a+l.p*l.q,0), del=!sub||sub>=S.freeDeliveryAbove?0:S.deliveryCharge;
  const adv=$('input[name=pay]:checked')?.value==='adv'||get('liwa-pay','cod')==='adv';
  const dis=adv?Math.round(sub*S.advanceDiscount/100):0;
  return {sub,del,dis,tot:sub+del-dis,adv,n:bag.reduce((a,l)=>a+l.q,0)};
}
function drawBag(){
  const t=totals();
  $('#bagN').textContent=t.n; $('#bagTitle').textContent=`Your Bag (${t.n})`;
  const body=$('#bagBody'); if(!body)return;
  if(!bag.length){body.innerHTML=`<div class="done"><b>Your bag is empty</b><p style="color:var(--muted)">Browse the collection and add your favourite suits.</p><a class="btn" href="shop.html">Start shopping</a></div>`;return;}
  const left=S.freeDeliveryAbove-t.sub;
  const lines=bag.map((l,i)=>{const p=byId(l.id);return `<div class="ln">${art(p,'a',124,164)}<div><b>${esc(p.n)} — ${esc(p.f)}</b><small>${esc(l.o)} · ${p.id}</small><div class="qty" style="margin-top:6px"><button type="button" data-dec="${i}" aria-label="Decrease">−</button><span>${l.q}</span><button type="button" data-inc="${i}" aria-label="Increase">+</button></div></div><div style="text-align:right"><b>${rs(l.p*l.q)}</b><button class="rm" type="button" data-rm="${i}">Remove</button></div></div>`}).join('');
  const f=get('liwa-cust',{});
  body.innerHTML=`${lines}
   <div class="freebar">${left>0?`Add <b>${rs(left)}</b> more for free delivery`:'You have <b>free delivery</b>'}<i><b style="width:${Math.min(100,t.sub/S.freeDeliveryAbove*100)}%"></b></i></div>
   <form class="co" id="co" novalidate>
     <div class="kick" style="margin-top:4px">Delivery details</div>
     <input id="cName" placeholder="Full name" aria-label="Full name" autocomplete="name" value="${esc(f.name||'')}">
     <input id="cPhone" placeholder="Phone (03XX XXXXXXX)" aria-label="Phone number" inputmode="tel" autocomplete="tel" value="${esc(f.phone||'')}">
     <input id="cCity" placeholder="City" aria-label="City" autocomplete="address-level2" value="${esc(f.city||'')}" list="cities">
     <datalist id="cities">${['Attock','Islamabad','Rawalpindi','Lahore','Karachi','Peshawar','Faisalabad','Multan','Gujranwala','Sialkot','Hyderabad','Quetta','Abbottabad','Wah Cantt','Taxila','Sargodha','Bahawalpur','Mardan'].map(c=>`<option value="${c}">`).join('')}</datalist>
     <textarea id="cAddr" placeholder="Complete address (house, street, area, landmark)" aria-label="Complete address" autocomplete="street-address">${esc(f.addr||'')}</textarea>
     <div class="kick" style="margin-top:6px">Payment</div>
     <div class="paym">
       <label><input type="radio" name="pay" value="cod" ${t.adv?'':'checked'}><span>Cash on Delivery<small>Pay the rider when your parcel arrives.</small></span></label>
       <label><input type="radio" name="pay" value="adv" ${t.adv?'checked':''}><span>Advance payment · save ${S.advanceDiscount}%<small>${esc(S.paymentAccounts)}. Send the screenshot on WhatsApp.</small></span></label>
     </div>
     <div class="sum"><div><span>Subtotal</span><span>${rs(t.sub)}</span></div><div><span>Delivery</span><span>${t.del?rs(t.del):'Free'}</span></div>${t.dis?`<div class="dis"><span>Advance discount (${S.advanceDiscount}%)</span><span>− ${rs(t.dis)}</span></div>`:''}<div class="t"><span>Total</span><span>${rs(t.tot)}</span></div></div>
     <a class="btn wa" id="place" href="#" target="_blank" rel="noopener">${I.wa.replace('<svg','<svg width="18" height="18" fill="#fff"')} Place order on WhatsApp</a>
     <p class="hint">We confirm every order on WhatsApp before dispatch. Delivery ${eta(f.city)}.</p>
   </form>`;
  paint(body);
}
function eta(city){
  const big=/lahore|karachi|islamabad|rawalpindi|attock|wah|taxila|faisalabad|multan|peshawar|gujranwala|sialkot/i.test(city||'');
  const add=(n)=>{const d=new Date();let k=0;while(k<n){d.setDate(d.getDate()+1);if(d.getDay()!==0)k++;}return d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});};
  return big?`by ${add(2)} – ${add(3)}`:`by ${add(3)} – ${add(5)}`;
}
function orderId(){const d=new Date();return 'LW-'+String(d.getFullYear()).slice(2)+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')+'-'+Math.floor(100+Math.random()*900);}
function placeOrder(e){
  const v=id=>$('#'+id).value.trim(), fields={cName:v('cName').length>=3,cPhone:/^(\+?92|0)3\d{9}$/.test(v('cPhone').replace(/[\s-]/g,'')),cCity:v('cCity').length>=3,cAddr:v('cAddr').length>=10};
  let ok=true;for(const k in fields){$('#'+k).classList.toggle('err',!fields[k]);if(!fields[k])ok=false;}
  if(!ok){e.preventDefault();toast('Please check the highlighted fields');const bad=Object.keys(fields).find(k=>!fields[k]);$('#'+bad).focus();return;}
  const t=totals(),id=orderId();
  let m=`Assalam o Alaikum LIWA's Wardrobe!\nNew order: *${id}*\n\n`;
  bag.forEach((l,i)=>{const p=byId(l.id);m+=`${i+1}. ${p.n} — ${p.f} (${p.id})\n   ${l.o} × ${l.q} = Rs ${l.p*l.q}\n`;});
  m+=`\nSubtotal: Rs ${t.sub}\nDelivery: ${t.del?'Rs '+t.del:'Free'}\n${t.dis?`Advance discount: -Rs ${t.dis}\n`:''}*Total: Rs ${t.tot}*\nPayment: ${t.adv?'Advance (screenshot bhej raha/rahi hoon)':'Cash on Delivery'}\n\nName: ${v('cName')}\nPhone: ${v('cPhone')}\nCity: ${v('cCity')}\nAddress: ${v('cAddr')}`;
  e.currentTarget.href=wa(m);
  setTimeout(()=>{bag=[];saveBag();$('#bagN').textContent=0;$('#bagBody').innerHTML=`<div class="done"><b>Order ${id} sent</b><p style="color:var(--muted)">Your order opened in WhatsApp. Please press send there. We will confirm your order shortly.</p><a class="btn ghost" href="shop.html">Continue shopping</a></div>`;},400);
}
document.addEventListener('input',e=>{if(e.target.closest('#co')){put('liwa-cust',{name:$('#cName').value,phone:$('#cPhone').value,city:$('#cCity').value,addr:$('#cAddr').value});e.target.classList.remove('err');}});
document.addEventListener('change',e=>{if(e.target.name==='pay'){put('liwa-pay',e.target.value);drawBag();}});
document.addEventListener('click',e=>{
  const t=e.target.closest('button,a');if(!t)return;
  if(t.id==='place')return placeOrder(e);
  if(t.dataset.inc!==undefined){bag[+t.dataset.inc].q++;saveBag();drawBag();}
  else if(t.dataset.dec!==undefined){const l=bag[+t.dataset.dec];l.q>1?l.q--:bag.splice(+t.dataset.dec,1);saveBag();drawBag();}
  else if(t.dataset.rm!==undefined){bag.splice(+t.dataset.rm,1);saveBag();drawBag();}
  else if(t.dataset.quick){addToBag(t.dataset.quick);open('bag');}
  else if(t.dataset.wish){const id=t.dataset.wish;wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];saveWish();drawWish();toast(wish.includes(id)?'Saved to wishlist':'Removed from wishlist');}
  else if(t.dataset.open){open(t.dataset.open);}
  else if(t.hasAttribute('data-close')){closeAll();}
});
function drawWish(){$('#wishN').textContent=wish.length;$$('[data-wish]').forEach(h=>h.setAttribute('aria-pressed',wish.includes(h.dataset.wish)));}

/* ---------- overlays ---------- */
function open(id){closeAll();const el=$('#'+id);el.classList.add('on');if(id!=='search')$('#scrim').classList.add('on');if(id==='search'){$('#q').focus();srch();}if(id==='bag')drawBag();}
function closeAll(){$$('.drawer,.search,.scrim').forEach(x=>x.classList.remove('on'));}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll();});
document.addEventListener('click',e=>{if(e.target.id==='scrim')closeAll();});
function srch(){const q=$('#q').value.trim().toLowerCase();const list=PRODUCTS.filter(p=>!q||[p.n,p.f,p.id,p.work,who(p),p.w==='L'?'women ladies':'men gents'].join(' ').toLowerCase().includes(q));
  $('#sres').innerHTML=list.length?list.map(p=>`<a href="product.html?id=${p.id}">${art(p,'a',88,116)}<span>${esc(p.n)} — ${esc(p.f)}<br><small style="color:var(--muted)">${who(p)} · ${rs(p.p)}</small></span></a>`).join(''):'<p style="color:var(--muted)">No results. Try "lawn", "boski" or "khaddar".</p>';paint($('#sres'));}
document.addEventListener('input',e=>{if(e.target.id==='q')srch();});
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2000);}

/* ---------- top bar rotation ---------- */
function topbar(){const sp=$$('#topbar span');let i=0;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;setInterval(()=>{const a=sp[i];i=(i+1)%sp.length;const b=sp[i];a.style.cssText='opacity:0;transform:translateY(-100%)';b.style.cssText='opacity:1;transform:none';setTimeout(()=>a.style.cssText='opacity:0;transform:translateY(100%)',500);},3800);}

/* ---------- recently viewed ---------- */
const seen=()=>get('liwa-seen',[]).filter(byId);
function markSeen(id){put('liwa-seen',[id,...seen().filter(x=>x!==id)].slice(0,8));}

window.LW={$,$$,rs,esc,wa,who,pct,byId,card,art,paint,motif,addToBag,options,optPrice,pieceLabel,eta,toast,open,markSeen,seen,get wish(){return wish}};
chrome();drawBag();drawWish();topbar();paint();
})();
