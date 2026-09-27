/* Fabric Finder — 3 sawal, sahi kapra */
(function(){
  const root=document.getElementById('finder');if(!root)return;
  const st={who:'L',when:'summer',use:'daily'};
  const REC={
    L:{summer:{daily:['Lawn','Cotton'],office:['Cotton','Linen'],event:['Chiffon','Organza']},
       winter:{daily:['Khaddar','Marina'],office:['Khaddar','Karandi'],event:['Karandi','Chiffon']}},
    G:{summer:{daily:['Wash & Wear','Cotton'],office:['Wash & Wear','Linen'],event:['Boski','Cotton']},
       winter:{daily:['Khaddar','Wash & Wear'],office:['Karandi','Wash & Wear'],event:['Boski','Karandi']}}
  };
  const WHY={Lawn:'light and breathable for hot days',Cotton:'soft, cool and easy to wash',Linen:'airy with a smart textured look',Chiffon:'flowing and elegant for events',Organza:'crisp and festive',Khaddar:'thick and warm for daily winter wear',Marina:'soft, light and warm',Karandi:'rich and warm for winter outings','Wash & Wear':'wrinkle resistant and easy care',Boski:'silky sheen for Eid and weddings'};
  function draw(){
    root.querySelectorAll('.pill').forEach(b=>b.setAttribute('aria-pressed',st[b.dataset.k]===b.dataset.v));
    const fabs=REC[st.who][st.when][st.use], c=st.who==='L'?'ladies':'gents';
    const avail=fabs.filter(f=>PRODUCTS.some(p=>p.f===f&&p.w===st.who));
    root.querySelector('.result').innerHTML=`<div class="kick">Your match</div><h4>${fabs.join(' or ')}</h4>
      <p>${fabs.map(f=>`<b>${f}</b> is ${WHY[f]||'a great choice'}`).join('. ')}.</p>
      <div class="chips">${avail.map(f=>`<a class="chip" href="shop.html?c=${c}&f=${encodeURIComponent(f)}">Shop ${f} →</a>`).join('')||`<a class="chip" href="shop.html?c=${c}">Browse ${c} collection →</a>`}</div>`;
  }
  root.addEventListener('click',e=>{const b=e.target.closest('.pill');if(!b)return;st[b.dataset.k]=b.dataset.v;draw();});
  draw();
})();
