/* 3D golden hanger with draping fabric (Three.js r128) */
(function(){
  const stage=document.getElementById('stage');
  if(!stage||!window.THREE)return;
  const fb=stage.querySelector('.fallback');
  let r;try{r=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch(e){return;}
  if(fb)fb.remove();
  r.setPixelRatio(Math.min(devicePixelRatio,2));r.outputEncoding=THREE.sRGBEncoding;stage.prepend(r.domElement);
  const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(38,1,.1,100);cam.position.set(0,-1.2,13);
  scene.add(new THREE.AmbientLight(0xfff3dc,.55));
  const k=new THREE.DirectionalLight(0xffffff,1);k.position.set(4,5,7);scene.add(k);
  const p1=new THREE.PointLight(0xffe0a8,1.4,30);p1.position.set(-4,3,5);scene.add(p1);
  const p2=new THREE.PointLight(0xffffff,.8,30);p2.position.set(3,-3,6);scene.add(p2);
  const gold=new THREE.MeshStandardMaterial({color:0xc99746,metalness:.75,roughness:.28,emissive:0x3a2608,emissiveIntensity:.35});
  const H=new THREE.Group();H.position.y=1.8;scene.add(H);
  const V=(x,y)=>new THREE.Vector3(x,y,0);
  H.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(-2.3,-.02),V(-1.6,.3),V(-.8,.7),V(0,1.02),V(.8,.7),V(1.6,.3),V(2.3,-.02)]),80,.085,16,false),gold));
  const bar=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,4.6,16),gold);bar.rotation.z=Math.PI/2;bar.position.y=-.02;H.add(bar);
  [-2.3,2.3].forEach(x=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.1,16,12),gold);e.position.set(x,-.02,0);H.add(e);});
  const hk=[V(0,1.02),V(0,1.2)];for(let a=-90;a<=210;a+=15){const t=a*Math.PI/180;hk.push(V(Math.cos(t)*.42,1.62+Math.sin(t)*.42));}
  H.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hk),60,.06,12,false),gold));
  const cv=document.createElement('canvas');cv.width=512;cv.height=640;LW.motif(cv,{pal:['#5a1c24','#d9b36a','#f3e6d3'],m:'jaal'},'a');
  const tex=new THREE.CanvasTexture(cv);tex.encoding=THREE.sRGBEncoding;
  const W=4.3,HH=5.6,geo=new THREE.PlaneGeometry(W,HH,36,48);geo.translate(0,-HH/2,0);
  const cloth=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:tex,side:THREE.DoubleSide,roughness:.75,metalness:.05}));cloth.position.set(0,-.06,.02);H.add(cloth);
  const base=geo.attributes.position.array.slice();
  const n=120,ps=new Float32Array(n*3);for(let i=0;i<n;i++){ps[i*3]=(Math.random()-.5)*10;ps[i*3+1]=(Math.random()-.5)*10-1;ps[i*3+2]=(Math.random()-.5)*4;}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(ps,3));
  const dust=new THREE.Points(pg,new THREE.PointsMaterial({color:0xc99746,size:.06,transparent:true,opacity:.75}));scene.add(dust);
  let mx=0,my=0;stage.addEventListener('pointermove',e=>{const b=stage.getBoundingClientRect();mx=(e.clientX-b.left)/b.width-.5;my=(e.clientY-b.top)/b.height-.5;});
  function size(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;r.setSize(w,h,false);cam.aspect=w/h;cam.position.z=w/h<.9?15.5:13;cam.updateProjectionMatrix();}
  size();addEventListener('resize',size);
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let vis=true;new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!still)requestAnimationFrame(tick);}).observe(stage);
  function tick(t){t*=.001;const a=geo.attributes.position.array;
    for(let i=0;i<a.length;i+=3){const x=base[i],y=base[i+1],d=-y/HH;a[i+2]=d*(Math.sin(x*1.5+t*1.7)*.4+Math.sin(y*1.2+t*1.2)*.25)+d*d*mx*1.4;a[i]=x+d*Math.sin(t*1.1+y*.8)*.08;}
    geo.attributes.position.needsUpdate=true;geo.computeVertexNormals();
    H.rotation.y+=((Math.sin(t*.5)*.35+mx*.6)-H.rotation.y)*.05;H.rotation.z=Math.sin(t*.8)*.03;H.rotation.x+=(my*.15-H.rotation.x)*.05;
    dust.rotation.y=t*.05;dust.position.y=Math.sin(t*.4)*.2;
    r.render(scene,cam);if(!still&&vis)requestAnimationFrame(tick);}
  requestAnimationFrame(tick);
})();
