'use strict';
(function(B,T){
 const rand=B.rng(1418),v=new T.Vector3(),q=new T.Quaternion(),s=new T.Vector3(),m=new T.Matrix4();
 B.createWorld=function(scene){
  const world={colliders:[],mapBoxes:[],pickups:[],relays:[],water:null,staticCount:0,meshes:[]};
  const mats={},batches=new Map(),geo={box:new T.BoxGeometry(1,1,1),cylinder:new T.CylinderGeometry(1,1,1,12),cone:new T.ConeGeometry(1,1,8),sphere:new T.IcosahedronGeometry(1,1)};
  function texture(type){let c=document.createElement('canvas');c.width=c.height=256;let x=c.getContext('2d');x.fillStyle=type==='paving'?'#b0b7af':type==='metal'?'#838e8d':'#d0c3a9';x.fillRect(0,0,256,256);for(let i=0;i<5000;i++){let n=Math.floor(rand()*90);x.fillStyle=`rgba(${n},${n},${n},${rand()*.1})`;x.fillRect(rand()*256,rand()*256,rand()*3+1,rand()*2+1)}if(type==='paving'){x.strokeStyle='#6b77713f';x.lineWidth=2;for(let i=0;i<256;i+=64){x.beginPath();x.moveTo(0,i);x.lineTo(256,i);x.stroke();for(let j=(i%128?32:0);j<256;j+=64){x.beginPath();x.moveTo(j,i);x.lineTo(j,i+64);x.stroke()}}}let t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;return t}
  const stucco=texture('stucco'),paving=texture('paving'),metaltex=texture('metal');paving.repeat.set(26,26);
  const palette={sand:0xcdbd9d,white:0xe1dbc7,navy:0x293f48,teal:0x547e7d,dark:0x263840,metal:0x778b8b,wood:0x8e7252,red:0x98614d,brick:0xb49175,leaf:0x59744d,leaf2:0x6d8858,flower:0xc1787f,amber:0xd4aa61,black:0x233039};
  for(let [k,c] of Object.entries(palette))mats[k]=new T.MeshStandardMaterial({color:c,roughness:k==='metal'?.42:.88,metalness:k==='metal'?.6:0,map:['sand','white','brick'].includes(k)?stucco:k==='metal'?metaltex:null});
  mats.lamp=new T.MeshStandardMaterial({color:0xffe6b3,emissive:0xffce77,emissiveIntensity:.9,roughness:.4});
  mats.glass=new T.MeshStandardMaterial({color:0x507780,roughness:.16,metalness:.65});
  function add(shape,mat,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0){let key=shape+':'+mat;if(!batches.has(key))batches.set(key,[]);q.setFromEuler(new T.Euler(rx,ry,rz));m.compose(v.set(x,y,z),q,s.set(sx,sy,sz));batches.get(key).push(m.clone());world.staticCount++}
  const box=(mat,x,y,z,sx,sy,sz,ry=0)=>add('box',mat,x,y,z,sx,sy,sz,0,ry,0);
  const cyl=(mat,x,y,z,r,h,rx=0,rz=0)=>add('cylinder',mat,x,y,z,r,h,r,rx,0,rz);
  const sphere=(mat,x,y,z,sx,sy,sz)=>add('sphere',mat,x,y,z,sx,sy,sz);
  function solid(mat,x,y,z,sx,sy,sz){box(mat,x,y,z,sx,sy,sz);world.colliders.push({minX:x-sx/2,maxX:x+sx/2,minZ:z-sz/2,maxZ:z+sz/2,minY:y-sy/2,maxY:y+sy/2});if(sy>1)world.mapBoxes.push({x,z,w:sx,d:sz})}
  function sign(text,x,y,z,w=3,h=1,ry=0,bg='#263e47',fg='#ece1c7'){let c=document.createElement('canvas');c.width=512;c.height=Math.max(128,Math.round(512*h/w));let ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle=fg+'55';ctx.lineWidth=3;ctx.strokeRect(12,12,c.width-24,c.height-24);ctx.fillStyle=fg;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`bold ${Math.min(c.height*.48,92)}px Arial`;ctx.fillText(text,256,c.height/2,470);let tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;let mesh=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map:tex,roughness:.8,polygonOffset:true,polygonOffsetFactor:-1}));mesh.position.set(x,y,z);mesh.rotation.y=ry;scene.add(mesh);world.meshes.push(mesh);return mesh}
  function crate(x,z,w=2,h=2,d=2,mat='teal'){solid(mat,x,h/2,z,w,h,d);box('dark',x,.12,z,w+.1,.15,d+.1);box('metal',x,h-.1,z,w+.05,.1,d+.05);for(let dx of [-w*.38,w*.38]){box('metal',x+dx,h/2,z+d*.505,.09,h,.06);box('metal',x+dx,h/2,z-d*.505,.09,h,.06)}for(let yy of [.2,h-.2])box('dark',x,yy,z+d*.51,w,.06,.04);box('amber',x+w*.3,h*.7,z+d*.52,.2,.3,.025)}
  function building(x,z,w,d,h,mat='sand',num='07'){
   solid(mat,x,h/2,z,w,h,d);box('white',x,.3,z,w+.3,.6,d+.3);box('white',x,h+.12,z,w+.55,.25,d+.55);box('dark',x,h+.3,z,w,.12,d);box('white',x,h+.6,z-d/2,w+.2,.5,.3);box('white',x-w/2,h+.6,z,.3,.5,d);box('white',x+w/2,h+.6,z,.3,.5,d);
   for(let xx=x-w/2+2;xx<x+w/2-1;xx+=3.3){box('navy',xx,h*.62,z+d/2+.05,2.15,2,.15);box('glass',xx,h*.62,z+d/2+.14,1.9,1.75,.03);box('white',xx,h*.62,z+d/2+.19,.07,1.8,.08);box('white',xx,h*.62,z+d/2+.19,2,.07,.08);box('sand',xx,h*.62-1.13,z+d/2+.18,2.5,.14,.4);box('glass',xx,h*.62,z-d/2-.05,1.9,1.7,.05)}
   for(let zz=z-d/2+2;zz<z+d/2-1;zz+=4){box('navy',x+w/2+.04,h*.58,zz,.1,1.8,2.1);box('glass',x+w/2+.11,h*.58,zz,.05,1.55,1.8);box('white',x+w/2+.12,h*.58,zz,.1,1.6,.06);box('sand',x+w/2+.14,h*.58-.95,zz,.4,.14,2.3)}
   box('navy',x,1.9,z+d/2+.08,2.7,3.8,.17);box('teal',x,1.75,z+d/2+.19,2.2,3.3,.08);box('metal',x+.65,1.7,z+d/2+.27,.1,.4,.08);box('white',x,3.85,z+d/2+.28,3.3,.18,.55);sign(num,x-w*.33,2.8,z+d/2+.13,1.3,1.1);
   for(let i=0;i<3;i++){let xx=x-w*.3+i*w*.3;box('metal',xx,h+.7,z,1.9,1.1,1.5);for(let j=0;j<5;j++)box('dark',xx-.7+j*.35,h+.8,z+.76,.13,.6,.03);cyl('metal',xx,h+1.6,z,.35,.8);box('metal',xx,h+2,z,.9,.1,.9)}
   // Drainpipe, brackets and exterior utilities.
   cyl('metal',x+w/2-.4,h/2,z+d/2+.22,.085,h);for(let yy=1;yy<h;yy+=2)box('dark',x+w/2-.4,yy,z+d/2+.23,.3,.1,.2);
   box('metal',x-w/2+.8,1.2,z+d/2+.2,.8,1,.25);sign('SERVICE',x,2.5,z-d/2-.08,2,.55,Math.PI);
  }
  function planter(x,z,w=3){solid('white',x,.45,z,w,.9,1.4);box('wood',x,.92,z,w-.25,.05,1.15);for(let i=0;i<5;i++)sphere(i%2?'leaf2':'leaf',x+(rand()-.5)*(w-.4),1.1+rand()*.4,z+(rand()-.5)*.6,.65,.5,.55)}
  function palm(x,z,h=7){cyl('wood',x,h/2,z,.21,h);for(let i=0;i<8;i++){let a=i*Math.PI/4;add('cone','leaf',x+Math.sin(a)*1.25,h+.2,z+Math.cos(a)*1.25,.42,3,.3,Math.cos(a)*1.2,0,-Math.sin(a)*1.2)}world.colliders.push({minX:x-.3,maxX:x+.3,minZ:z-.3,maxZ:z+.3,minY:0,maxY:h})}
  function streetlight(x,z){cyl('dark',x,3.4,z,.08,6.8);box('dark',x+.6,6.8,z,1.3,.1,.12);box('lamp',x+1.1,6.72,z,.7,.08,.4);cyl('metal',x,.2,z,.2,.4)}
  // Sunlit sky with a pale maritime horizon.
  let sky=new T.Mesh(new T.SphereGeometry(300,24,16),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{top:{value:new T.Color(0x7cb5d2)},bottom:{value:new T.Color(0xe7e6cf)}},vertexShader:'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 p;uniform vec3 top;uniform vec3 bottom;void main(){float h=pow(max(normalize(p).y,0.),.55);gl_FragColor=vec4(mix(bottom,top,h),1.);}' }));scene.add(sky);
  scene.fog=new T.Fog(0xc7d7d4,58,165);scene.background=new T.Color(0xb8d1d8);
  const hemi=new T.HemisphereLight(0xcce8fb,0x8c8065,2.1);scene.add(hemi);
  const sun=new T.DirectionalLight(0xffe8c4,3.2);sun.position.set(-35,65,30);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-58;sun.shadow.camera.right=58;sun.shadow.camera.top=58;sun.shadow.camera.bottom=-58;sun.shadow.camera.far=160;sun.shadow.bias=-.0005;sun.shadow.normalBias=.035;scene.add(sun);world.sun=sun;
  const floor=new T.Mesh(new T.BoxGeometry(100,.4,100),new T.MeshStandardMaterial({map:paving,color:0xe2ded0,roughness:.95}));floor.position.y=-.2;floor.receiveShadow=true;scene.add(floor);
  // Fine road markings, gutters, expansion joints and inset drainage grilles.
  for(let z=-42;z<=42;z+=6){box('white',-12,.011,z,.12,.018,2.7);box('white',12,.011,z,.12,.018,2.7)}
  for(let x of [-14,14])for(let z=-40;z<40;z+=10){box('dark',x,.015,z,.45,.025,1.1);for(let i=0;i<7;i++)box('metal',x,.032,z-.45+i*.15,.4,.018,.04)}
  for(let z of [-28,28])box('white',0,.018,z,24,.025,.13);
  // Three routes around warehouse / laboratory volumes.
  building(-28,2,20,26,8.5,'sand','A1');building(27,-4,20,24,10,'white','B2');building(-28,31,22,15,7,'brick','03');building(29,30,18,16,6.5,'sand','04');building(0,-41,35,12,11,'white','HQ');
  // Outer walls leave the quay visible without allowing the player to fall into water.
  solid('sand',-45,2,0,1,4,92);solid('sand',45,1,0,1,2,92);solid('white',0,2,46,90,4,1);solid('white',0,2,-48,90,4,1);
  for(let z=-42;z<43;z+=7){box('white',-44.8,2.3,z,.7,4.7,.65);cyl('metal',44.6,1.8,z,.06,1.6)}
  box('metal',44.6,2.45,0,.06,.06,88);box('metal',44.6,1.8,0,.06,.06,88);
  // B site: reactor cradle, etched panels and rotating core.
  solid('navy',6,.55,-20,6,1.1,6);box('metal',6,1.15,-20,6.2,.15,6.2);for(let x of [3.5,8.5])for(let z of [-22.5,-17.5])cyl('metal',x,2.1,z,.12,2.1);
  cyl('dark',6,1.6,-20,1.8,.8);cyl('teal',6,2.8,-20,1.35,2);cyl('metal',6,3.8,-20,1.7,.18);cyl('metal',6,1.8,-20,1.7,.18);for(let i=0;i<8;i++){let a=i*Math.PI/4;box('amber',6+Math.sin(a)*1.37,2.8,-20+Math.cos(a)*1.37,.13,1.5,.13)}
  sign('REACTOR  /  B',6,1.1,-16.95,4,.65);world.colliders.push({minX:4.2,maxX:7.8,minZ:-21.8,maxZ:-18.2,minY:1,maxY:4});
  // Courtyard A: raised canopy, work benches, crates and overhead pipes.
  for(let x of [-11,-5])for(let z of [-27,-33]){cyl('metal',x,2.1,z,.11,4.2)}box('teal',-8,4.25,-30,7,.16,7);for(let x=-11;x<-4;x+=.6)box('metal',x,4.38,-30,.05,.05,7.1);solid('sand',-8,.4,-30,6,.8,5);sign('A / CONTROL',-8,3.4,-26.8,4,.75);
  crate(-10,8,3,1.6,3);crate(11,1,3,1.7,4);crate(-8,-10,4,2.2,3);crate(-6,-10,1.9,3.4,2);crate(20,13,3,2.1,3,'red');crate(34,-22,3,1.5,5);crate(-34,-25,3,2.3,3,'red');crate(-37,18,3,1.5,4);crate(12,26,3,1.2,3);crate(-14,29,2,2.4,3);crate(21,-28,4,1.8,3,'red');
  for(let i=0;i<7;i++){let z=-10+i*2.4;cyl('metal',-38,1,z,.7,2);cyl('dark',-38,1.8,z,.71,.08);cyl('amber',-38,.3,z,.72,.12)}
  // Industrial pipe bridge spans the center lane overhead.
  cyl('metal',-15,3.9,-7,.35,7.8);cyl('metal',15,3.9,-7,.35,7.8);cyl('metal',0,7.8,-7,.35,30,0,Math.PI/2);for(let x=-14;x<=14;x+=3){cyl('dark',x,7.8,-7,.41,.12,0,Math.PI/2)}box('dark',0,7.2,-7,30,.12,.12);sign('HARBOR RESEARCH',0,6.2,-6.8,8,.8);
  // Cable runs, pipework, wall-mounted AC and warning plates.
  for(let z=-7;z<=11;z+=6){box('metal',-17.8,3.8,z,.4,.8,1.4);for(let i=0;i<5;i++)box('dark',-17.55,3.8,z-.5+i*.23,.03,.55,.06)}
  for(let z=-15;z<5;z+=4){cyl('metal',16.8,1.7,z,.16,3.4);box('metal',16.6,3.4,z,.7,.15,.3)}
  // Mediterranean street details.
  planter(-14,19,4);planter(15,19,4);planter(14,-32,3);planter(-39,38,4);planter(39,38,4);
  for(let [x,z] of [[-13,39],[15,39],[39,17],[-39,-36]])palm(x,z,6+rand()*2);
  for(let [x,z] of [[-14,23],[15,13],[-14,-20],[39,-31]])streetlight(x,z);
  for(let z=22;z<35;z+=3){sphere('flower',-17.6,5.5+rand()*2,z,.5,.8,.9);sphere('leaf',-17.5,5.3+rand(),z,.7,.5,.8)}
  for(let [x,z,ry] of [[-16,20,0],[16,22,0],[38,8,Math.PI/2]]){box('wood',x,.65,z,3,.15,.65,ry);box('wood',x,1.1,z-.3,3,.6,.12,ry);for(let dx of [-1,1])box('metal',x+dx,.32,z,.12,.6,.4,ry)}
  // Baked atmospheric dust, fallen leaves and ground wear.
  for(let i=0;i<75;i++){let x=(rand()-.5)*85,z=(rand()-.5)*85;box(i%3?'wood':'leaf',x,.025,z,.05+rand()*.1,.02,.1+rand()*.15,rand()*Math.PI)}
  // Raised directional paint, safety stripes and service-yard clutter.
  for(let z of [32,25,1,-14]){box('white',0,.025,z,.14,.018,2.2);box('white',-.36,.027,z-.75,.12,.018,1,.65);box('white',.36,.027,z-.75,.12,.018,1,-.65)}
  for(let x of [-12.5,12.5])for(let z=30;z<40;z+=1.8){box('amber',x,.028,z,.35,.02,.65,.6)}
  for(let [x,z] of [[-15,17],[15,16],[-13,-24],[14,-26]]){cyl('metal',x,.6,z,.14,1.2);cyl('amber',x,.85,z,.145,.23);cyl('dark',x,.25,z,.16,.15)}
  for(let [x,z] of [[-37,27],[38,-6]]){cyl('wood',x,.65,z,.65,1.2,0,Math.PI/2);cyl('wood',x-.65,.65,z,.95,.12,0,Math.PI/2);cyl('wood',x+.65,.65,z,.95,.12,0,Math.PI/2);cyl('dark',x,.65,z,.57,1.1,0,Math.PI/2)}
  // Canopies and roof solar collectors break the warehouse silhouette.
  for(let [x,z,h,w] of [[-28,15.7,4.1,4.2],[27,8.8,4.2,4.8],[29,38.8,3.9,4]]){box('teal',x,h,z,w,.12,1.7);for(let dx of [-w/2,w/2]){add('box','metal',x+dx,h-.45,z+.1,.06,1.2,.06,.55,0,0)}}
  for(let i=0;i<5;i++){let x=20+i*2.8;add('box','navy',x,11,-5,2.3,.12,3.1,.22,0,0);for(let j=0;j<4;j++)add('box','metal',x-1+j*.67,11.05,-5,.025,.02,3.1,.22,0,0)}
  // Sagging power lines, insulated supports and a gantry hoist.
  for(let dz of [0,.22,.44]){let points=[];for(let i=0;i<=16;i++){let x=-16+i*2;points.push(new T.Vector3(x,9.2-Math.sin(i/16*Math.PI)*1.1,-5+dz))}let cable=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),20,.023,4,false),mats.dark);scene.add(cable)}
  box('amber',0,7.05,-7,1.3,.3,.8);cyl('dark',0,5.8,-7,.035,2.2);box('metal',0,4.65,-7,.2,.3,.15);
    // Distant cliffside town and port cranes.
  for(let i=0;i<40;i++){let x=-85+rand()*170,z=-72-rand()*55,h=4+rand()*16;box(i%3?'sand':'white',x,h/2-3,z,6+rand()*10,h,7+rand()*8);box('red',x,h-2.6,z,7,1,8)}
  for(let i=0;i<14;i++){let x=-150+rand()*300,z=-140-rand()*35;add('sphere',i%2?'leaf':'teal',x,-4,z,28+rand()*24,18+rand()*17,24+rand()*15)}
  for(let z of [-40,20]){box('metal',69,8,z,1,16,1);box('metal',66,16,z,18,.8,.8);cyl('dark',73,11,z,.08,10)}
  // Sea with subtle animated wave normals.
  const water=new T.Mesh(new T.PlaneGeometry(400,400),new T.ShaderMaterial({uniforms:{time:{value:0}},vertexShader:'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 p;uniform float time;void main(){float w=sin(p.x*.55+time*.7)*sin(p.y*.4-time*.45);float f=pow(max(0.,sin(p.x*1.2+p.y*.7+time)),18.);vec3 c=mix(vec3(.12,.32,.36),vec3(.25,.48,.49),w*.5+.5)+vec3(f*.06);gl_FragColor=vec4(c,1.);}'}));water.rotation.x=-Math.PI/2;water.position.set(210,-1,0);scene.add(water);world.water=water;
  sign('07  /  HARBOR',0,3.2,45.45,9,1.2,Math.PI);sign('TRAINING  →',-16,2.1,16,3,.75,Math.PI/2);sign('B   →',16.85,2.1,10,2.5,.9,-Math.PI/2);sign('A   ←',-16.85,2.1,-16,2.5,.9,Math.PI/2);
  // Relay control stations: capture by standing nearby.
  for(let [x,z,label] of [[-8,-25,'A'],[11,-20,'B'],[36,0,'C']]){let g=new T.Group();let body=new T.Mesh(new T.BoxGeometry(.8,1.4,.6),mats.navy);body.position.y=.7;g.add(body);let screen=new T.Mesh(new T.BoxGeometry(.65,.43,.03),new T.MeshStandardMaterial({color:0xf3b16e,emissive:0xe2a059,emissiveIntensity:.5}));screen.position.set(0,1.1,.32);g.add(screen);let ring=new T.Mesh(new T.TorusGeometry(1.6,.035,5,40),new T.MeshBasicMaterial({color:0xf1b779,transparent:true,opacity:.7}));ring.rotation.x=-Math.PI/2;ring.position.y=.07;g.add(ring);g.position.set(x,0,z);scene.add(g);world.relays.push({group:g,x,z,label,screen,ring,capture:0,done:false});sign(label,x,2,z,.6,.6)}
  // Healing stations with rotating collectible cores.
  for(let [x,z] of [[-13,21],[14,-29],[-39,-16],[38,22]]){let g=new T.Group();let base=new T.Mesh(new T.CylinderGeometry(.65,.85,.22,12),mats.white);base.position.y=.12;g.add(base);let core=new T.Mesh(new T.OctahedronGeometry(.28),new T.MeshStandardMaterial({color:0xb7e1c2,emissive:0x70aa8f,emissiveIntensity:.6,metalness:.3,roughness:.3}));core.position.y=.9;g.add(core);g.position.set(x,0,z);scene.add(g);world.pickups.push({group:g,core,x,z,cooldown:0})}
  for(let [key,transforms] of batches){let [shape,mat]=key.split(':'),inst=new T.InstancedMesh(geo[shape],mats[mat],transforms.length);for(let i=0;i<transforms.length;i++)inst.setMatrixAt(i,transforms[i]);inst.castShadow=true;inst.receiveShadow=true;inst.computeBoundingSphere();scene.add(inst);world.meshes.push(inst)}
  world.sign=sign;
  world.blocked=function(x,z,r=.42,y=0){return this.colliders.some(c=>y<c.maxY-.12&&y+1.7>c.minY+.1&&x+r>c.minX&&x-r<c.maxX&&z+r>c.minZ&&z-r<c.maxZ)};
  world.raycast=function(origin,dir,max=180){let best=max;for(const c of this.colliders){let lo=0,hi=best;for(let [axis,a,b] of [['x','minX','maxX'],['y','minY','maxY'],['z','minZ','maxZ']]){if(Math.abs(dir[axis])<1e-7){if(origin[axis]<c[a]||origin[axis]>c[b]){lo=Infinity;break}}else{let t1=(c[a]-origin[axis])/dir[axis],t2=(c[b]-origin[axis])/dir[axis];lo=Math.max(lo,Math.min(t1,t2));hi=Math.min(hi,Math.max(t1,t2));if(lo>hi)break}}if(lo<=hi&&lo>=0&&lo<best)best=lo}if(dir.y<-.00001){let ground=-origin.y/dir.y;if(ground>=0)best=Math.min(best,ground)}return best};
  world.support=function(x,z,feet){let h=0;for(let c of this.colliders)if(c.maxY<=feet+.25&&c.maxY>h&&x+.28>c.minX&&x-.28<c.maxX&&z+.28>c.minZ&&z-.28<c.maxZ)h=c.maxY;return h};
  world.nav={size:43,step:2,offset:42,blocked:new Uint8Array(43*43),distance:new Int16Array(43*43)};
  let nav=world.nav;for(let z=0;z<nav.size;z++)for(let x=0;x<nav.size;x++)nav.blocked[z*nav.size+x]=world.blocked(x*2-42,z*2-42,.65,0)?1:0;
  world.updateFlow=function(px,pz){let n=this.nav;n.distance.fill(32767);let sx=B.clamp(Math.round((px+42)/2),0,42),sz=B.clamp(Math.round((pz+42)/2),0,42),start=sz*43+sx;const queue=[start];n.distance[start]=0;for(let qi=0;qi<queue.length;qi++){let id=queue[qi],x=id%43,z=Math.floor(id/43);for(let [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){let xx=x+dx,zz=z+dz;if(xx<0||xx>=43||zz<0||zz>=43)continue;let next=zz*43+xx;if(n.blocked[next]||n.distance[next]!==32767)continue;n.distance[next]=n.distance[id]+1;queue.push(next)}}};
  world.navDirection=function(x,z){let n=this.nav,gx=B.clamp(Math.round((x+42)/2),0,42),gz=B.clamp(Math.round((z+42)/2),0,42),best=n.distance[gz*43+gx],tx=x,tz=z;for(let [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){let xx=gx+dx,zz=gz+dz;if(xx<0||xx>42||zz<0||zz>42)continue;let d=n.distance[zz*43+xx];if(!n.blocked[zz*43+xx]&&d<best){best=d;tx=xx*2-42;tz=zz*2-42}}return {x:tx-x,z:tz-z}};
  return world;
 };
})(BARO,THREE);
