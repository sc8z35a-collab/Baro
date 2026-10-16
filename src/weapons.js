'use strict';
(function(B,T){
 B.makeWeapon=function(w){
  let root=new T.Group(),metal=new T.MeshStandardMaterial({color:w.skin,metalness:.72,roughness:.28}),dark=new T.MeshStandardMaterial({color:0x192832,metalness:.65,roughness:.4}),steel=new T.MeshStandardMaterial({color:0x9daaaa,metalness:.88,roughness:.24}),rubber=new T.MeshStandardMaterial({color:0x242c2c,roughness:.93}),accent=new T.MeshStandardMaterial({color:w.color,emissive:w.color,emissiveIntensity:.38,metalness:.5,roughness:.24}),hands=new T.MeshStandardMaterial({color:0x36484b,roughness:.9});
  const add=(geom,mat,x,y,z,parent=root)=>{let mesh=new T.Mesh(geom,mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh};
  const box=(mat,x,y,z,a,b,c,parent)=>{if(Math.min(a,b,c)<.04)return add(new T.BoxGeometry(a,b,c),mat,x,y,z,parent);let r=Math.min(.018,a*.14,b*.14,c*.14),shape=new T.Shape(),hx=a/2-r,hy=b/2-r;shape.moveTo(-hx,-hy);shape.lineTo(hx,-hy);shape.lineTo(hx,hy);shape.lineTo(-hx,hy);shape.closePath();let g=new T.ExtrudeGeometry(shape,{depth:c-2*r,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:r,bevelThickness:r});g.translate(0,0,-c/2+r);return add(g,mat,x,y,z,parent)};
  const cyl=(mat,x,y,z,r,l,parent,segments=12)=>{let o=add(new T.CylinderGeometry(r,r,l,segments),mat,x,y,z,parent);o.rotation.x=Math.PI/2;return o};
  const ring=(x,y,z,r,mat=accent,parent=root)=>add(new T.TorusGeometry(r,.013,6,32),mat,x,y,z,parent);
  let length=w.kind==='sniper'?1.16:w.kind==='pistol'?.45:w.kind==='launcher'?.91:w.kind==='smg'?.66:.85;
  let moving=new T.Group();root.add(moving);root.userData.moving=moving;
  let receiver=box(metal,0,0,-.24,.22,.23,.52);box(dark,0,.13,-.24,.18,.055,.55);
  // Skeleton stock, grip and mechanical trigger guard.
  if(w.kind!=='pistol'&&w.kind!=='launcher'){box(dark,0,-.015,.15,.13,.14,.3);box(metal,0,-.02,.3,.15,.23,.12);box(rubber,0,-.02,.365,.155,.24,.04);box(steel,0,.04,.12,.08,.035,.23)}
  let grip=box(rubber,0,-.2,-.02,.135,.27,.16);grip.rotation.x=-.25;box(steel,0,-.2,-.2,.12,.025,.22);box(steel,0,-.12,-.3,.025,.18,.025);box(steel,-.045,-.14,-.15,.02,.09,.04);
  let magazine=box(dark,0,-.3,-.32,.15,w.kind==='pistol'?.2:.33,.2);magazine.rotation.x=.13;root.userData.magazine=magazine;
  if(w.kind==='heavy'){magazine.scale.set(1.9,1.2,1.55);for(let i=0;i<9;i++)cyl(accent,.16,-.2,-.5+i*.036,.014,.07)}
  if(w.kind==='pistol'){receiver.scale.z=.7;receiver.position.z=-.15;box(steel,0,.1,-.23,.19,.06,.36);magazine.visible=false}
  if(w.kind==='launcher'){receiver.visible=false;magazine.visible=false;cyl(metal,0,.03,-.35,.19,.91);cyl(steel,0,.03,-.82,.22,.07);cyl(dark,0,.03,-.865,.17,.02);cyl(accent,0,.03,-.878,.115,.025);for(let i=0;i<6;i++){let a=i*Math.PI/3;box(steel,Math.cos(a)*.19,.03+Math.sin(a)*.19,-.42,.03,.035,.65)}box(dark,0,.25,-.15,.12,.15,.3);box(accent,0,.32,-.25,.08,.05,.12)}
  else {
   let front=w.kind==='pistol'?-.36:-.52;
   cyl(dark,0,.015,(front-length)/2,.048,length+front);cyl(steel,0,.015,-length,.068,.1);
   if(w.name==='SPECTRAL'){cyl(metal,0,.015,-length-.12,.09,.32);length+=.3}
   if(w.kind==='shotgun'){cyl(metal,0,-.08,-.65,.045,.55);box(rubber,0,-.045,-.58,.2,.19,.28,moving);for(let i=0;i<6;i++)box(steel,.103,-.045,-.68+i*.04,.01,.1,.013,moving)}
   else if(w.kind!=='pistol'){box(metal,0,.025,-.55,.18,.17,.3);for(let i=0;i<5;i++){box(dark,.097,.035,-.65+i*.05,.012,.07,.025);box(steel,0,.135,-.62+i*.06,.19,.025,.025)}}
   if(w.name==='TEMPEST'){let rotary=new T.Group();rotary.position.set(0,.01,-.62);root.add(rotary);root.userData.rotary=rotary;for(let i=0;i<6;i++){let a=i*Math.PI/3;cyl(steel,Math.cos(a)*.1,Math.sin(a)*.1,-.12,.028,.5,rotary);cyl(dark,Math.cos(a)*.1,Math.sin(a)*.1,-.38,.019,.025,rotary)}ring(0,0,-.21,.13,metal,rotary);ring(0,0,.08,.13,metal,rotary);length=1.04}
   if(w.kind==='sniper'){box(dark,0,.19,-.24,.1,.11,.3);cyl(metal,0,.27,-.24,.075,.36);cyl(dark,0,.27,-.045,.07,.025);cyl(accent,0,.27,-.028,.053,.01);cyl(steel,0,.27,-.44,.09,.08);box(steel,.075,.27,-.23,.05,.05,.1)}
   else {box(dark,0,.18,-.09,.11,.1,.05);box(accent,0,.21,-.09,.028,.025,.012);box(dark,0,.16,-.58,.05,.1,.025)}
  }
  // Individual side panel silhouette, screws, vents, serial markings.
  box(accent,-.114,.025,-.2,.012,.045,.27);box(steel,-.118,-.035,-.21,.01,.015,.29);for(let i=0;i<4;i++)box(dark,-.12,.065,-.36+i*.055,.015,.035,.027);box(steel,-.14,-.03,-.06,.045,.035,.05);box(accent,.114,.025,-.2,.012,.045,.27);box(steel,.118,-.035,-.21,.01,.015,.29);for(let z of [-.4,-.09]){let screw=add(new T.CylinderGeometry(.012,.012,.013,6),steel,.12,.067,z);screw.rotation.z=Math.PI/2}
  box(dark,.12,.02,-.04,.02,.08,.1);box(steel,.145,.02,-.04,.04,.025,.035);
  let c=document.createElement('canvas');c.width=256;c.height=64;let ctx=c.getContext('2d');ctx.fillStyle='#1c2a30';ctx.fillRect(0,0,256,64);ctx.fillStyle='#d9d4bc';ctx.font='bold 24px monospace';ctx.fillText('BΛRO / '+w.name,10,40);let tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;let label=add(new T.PlaneGeometry(.34,.085),new T.MeshStandardMaterial({map:tex,roughness:.7}),-.123,0,-.25);label.rotation.y=-Math.PI/2;
  let rings=new T.Group();root.add(rings);root.userData.rings=rings;
  if(['orbit','void','prism','electric','plasma','ice','water'].includes(w.effect)){for(let i=0;i<3;i++){let r=ring(0,.02,-length+.18+i*.09,.09+i*.012,accent,rings);if(w.kind==='launcher')r.scale.setScalar(2.1)}if(w.effect==='ice')for(let i=0;i<7;i++){let shard=add(new T.OctahedronGeometry(.05),accent,(i%2?.12:-.12),.07,-.3-i*.055);shard.scale.y=2}}
  if(w.effect==='prism')for(let i=0;i<5;i++){let mat=new T.MeshStandardMaterial({color:new T.Color().setHSL(i/5,.7,.7),emissive:new T.Color().setHSL(i/5,.7,.4),emissiveIntensity:.4,metalness:.7,roughness:.2});box(mat,.12,.06,-.1-i*.07,.02,.035,.045)}
  // Hands and forearms stay attached to the weapon rig.
  let right=box(hands,.025,-.26,.015,.18,.18,.22);right.rotation.x=-.15;box(rubber,.055,-.36,.15,.2,.15,.33);box(metal,.06,-.365,.23,.21,.16,.08);
  let left=new T.Group();left.position.set(-.03,-.14,-.53);root.add(left);box(hands,-.04,-.06,0,.22,.15,.23,left);box(rubber,-.15,-.19,.16,.18,.15,.36,left).rotation.z=-.3;box(metal,-.18,-.23,.21,.18,.16,.07,left);root.userData.leftHand=left;
  for(let i=0;i<4;i++)box(rubber,-.125,-.04,-.09+i*.045,.045,.07,.03,left);
  const muzzle=new T.Group();muzzle.position.set(0,w.kind==='launcher'?.03:.015,-length-.075);root.add(muzzle);root.userData.muzzle=muzzle;
  let flashMat=new T.MeshBasicMaterial({color:w.color,transparent:true,opacity:.9,blending:T.AdditiveBlending,depthWrite:false});let flash=new T.Mesh(new T.ConeGeometry(.12,.45,7),flashMat);flash.rotation.x=-Math.PI/2;flash.position.z=-.18;muzzle.add(flash);let center=new T.Mesh(new T.SphereGeometry(.085,8,6),new T.MeshBasicMaterial({color:0xfff7dc}));muzzle.add(center);muzzle.visible=false;
  root.userData.w=w;return root;
 };
 B.createFX=function(scene){
  let particles=[],cursor=0,max=600,mat=new T.MeshBasicMaterial({vertexColors:false,transparent:true,opacity:.9,blending:T.AdditiveBlending,depthWrite:false});let mesh=new T.InstancedMesh(new T.IcosahedronGeometry(1,0),mat,max);mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(mesh);let M=new T.Matrix4(),Q=new T.Quaternion(),P=new T.Vector3(),S=new T.Vector3();
  for(let i=0;i<max;i++){particles.push({life:0});M.makeScale(0,0,0);mesh.setMatrixAt(i,M);mesh.setColorAt(i,new T.Color(0xffffff))}
  let beams=[],bi=0,bmax=110,beamMesh=new T.InstancedMesh(new T.CylinderGeometry(1,1,1,5),new T.MeshBasicMaterial({transparent:true,opacity:.82,blending:T.AdditiveBlending,depthWrite:false}),bmax);beamMesh.frustumCulled=false;beamMesh.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(beamMesh);for(let i=0;i<bmax;i++){beams.push({life:0});M.makeScale(0,0,0);beamMesh.setMatrixAt(i,M);beamMesh.setColorAt(i,new T.Color(0xffffff))}
  let rings=[],ringGeo=new T.TorusGeometry(1,.028,5,32);for(let i=0;i<22;i++){let r=new T.Mesh(ringGeo,new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,blending:T.AdditiveBlending}));r.visible=false;scene.add(r);rings.push({mesh:r,life:0,max:1,size:1})}let ri=0;
  let fx={
   particle(pos,vel,color,size=.05,life=.45,gravity=4){let i=cursor++%max,p=particles[i];Object.assign(p,{x:pos.x,y:pos.y,z:pos.z,vx:vel.x,vy:vel.y,vz:vel.z,size,life,max:life,gravity});mesh.setColorAt(i,new T.Color(color))},
   burst(pos,color,count=18,force=4,effect='spark'){for(let i=0;i<count;i++){let cc=effect==='prism'?new T.Color().setHSL(Math.random(),.85,.7):color;this.particle(pos,{x:(Math.random()-.5)*force,y:(Math.random()-.25)*force,z:(Math.random()-.5)*force},cc,.025+Math.random()*.055,.25+Math.random()*.65,effect==='void'?-1:effect==='ice'?7:4)}},
   beam(a,b,color,width=.015,life=.1){let i=bi++%bmax,beam=beams[i];beam.life=beam.max=life;beam.width=width;beam.a=a.clone();beam.b=b.clone();beamMesh.setColorAt(i,new T.Color(color));},
   ring(pos,color,size=1,life=.4,horizontal=false){let r=rings[ri++%rings.length];r.life=r.max=life;r.size=size;r.mesh.position.copy(pos);r.mesh.rotation.set(horizontal?-Math.PI/2:Math.random()*Math.PI,Math.random()*Math.PI,0);if(horizontal)r.mesh.rotation.set(-Math.PI/2,0,0);r.mesh.material.color.set(color);r.mesh.visible=true},
   impact(pos,w,normal){this.burst(pos,w.color,w.splash?40:12,w.splash?9:3.5,w.effect);if(['water','orbit','void','gold','wind','plasma','electric','prism','petal'].includes(w.effect))this.ring(pos,w.color,w.splash?4:.55,w.splash?.75:.32);if(w.effect==='ice')this.ring(pos,w.color,.5,.4,true)},
   explosion(pos,w){this.burst(pos,w.color,65,13,w.effect);for(let i=0;i<3;i++)this.ring(pos,w.color,w.splash*(.55+i*.2),.55+i*.12,i===0);this.burst(pos,0xfff5d5,22,8,'spark')},
   update(dt){let any=false;for(let i=0;i<max;i++){let p=particles[i];if(p.life>0){p.life-=dt;p.vy-=p.gravity*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;let scale=Math.max(0,p.life/p.max)*p.size;M.compose(P.set(p.x,p.y,p.z),Q.identity(),S.set(scale,scale,scale));mesh.setMatrixAt(i,M);any=true}}if(any)mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;let changed=false;for(let i=0;i<bmax;i++){let b=beams[i];if(b.life>0){b.life-=dt;let dir=new T.Vector3().subVectors(b.b,b.a),len=dir.length();Q.setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize());M.compose(P.copy(b.a).add(b.b).multiplyScalar(.5),Q,S.set(b.life>0?b.width:0,len,b.life>0?b.width:0));beamMesh.setMatrixAt(i,M);changed=true}}if(changed)beamMesh.instanceMatrix.needsUpdate=true;beamMesh.instanceColor.needsUpdate=true;for(let r of rings){if(r.life<=0)continue;r.life-=dt;r.mesh.visible=r.life>0;let p=1-r.life/r.max;r.mesh.scale.setScalar(Math.max(.001,r.size*(.2+p*.8)));r.mesh.material.opacity=Math.max(0,1-p)*.8}},
   clear(){for(let p of particles)p.life=0;for(let b of beams)b.life=0;for(let i=0;i<max;i++){M.makeScale(0,0,0);mesh.setMatrixAt(i,M)}for(let i=0;i<bmax;i++)beamMesh.setMatrixAt(i,M);mesh.instanceMatrix.needsUpdate=true;beamMesh.instanceMatrix.needsUpdate=true;for(let r of rings){r.life=0;r.mesh.visible=false}}
  };return fx;
 };
 B.Audio=class{
  constructor(){this.ctx=null;this.volume=.5;this.master=null;this.noise=null}
  init(){try{if(!this.ctx){let A=window.AudioContext||window.webkitAudioContext;this.ctx=new A();this.master=this.ctx.createGain();this.master.gain.value=this.volume*.35;this.master.connect(this.ctx.destination);let len=this.ctx.sampleRate;this.noise=this.ctx.createBuffer(1,len,this.ctx.sampleRate);let d=this.noise.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1}this.ctx.resume().catch(()=>{})}catch(e){}}
  tone(freq,duration=.1,type='sine',vol=.1,end=0){if(!this.ctx)return;let c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,c.currentTime);if(end)o.frequency.exponentialRampToValueAtTime(Math.max(10,end),c.currentTime+duration);g.gain.setValueAtTime(vol,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);o.connect(g);g.connect(this.master);o.start();o.stop(c.currentTime+duration)}
  shot(w){if(!this.ctx)return;let c=this.ctx,n=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();n.buffer=this.noise;f.type='lowpass';f.frequency.value=w.kind==='sniper'?1600:w.kind==='pistol'?2600:2200;let dur=w.kind==='launcher'?.45:w.kind==='sniper'?.25:.11;g.gain.setValueAtTime(w.effect==='void'?.15:.45,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);n.connect(f);f.connect(g);g.connect(this.master);n.start(0,Math.random()*.5,dur);this.tone(w.kind==='launcher'?95:180,dur,'triangle',.5,35);if(['electric','prism','orbit','plasma','ice'].includes(w.effect))this.tone(600+Math.random()*700,.14,'sine',.18,100)}
  hit(head){this.tone(head?1650:900,.065,'triangle',.2,head?2100:650)}
  kill(){this.tone(750,.16,'sine',.13,1400);this.tone(1125,.2,'sine',.1)}
  reload(){this.tone(350,.07,'square',.05,170)}
  explosion(){if(!this.ctx)return;this.shot({kind:'launcher',effect:'rocket'});this.tone(70,.5,'sawtooth',.2,20)}
 };
})(BARO,THREE);
