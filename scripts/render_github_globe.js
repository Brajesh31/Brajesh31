import * as THREE from "three";
import ThreeGlobe from "three-globe";

const W=960,H=600,stage=document.querySelector("#stage");
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(1);renderer.setSize(W,H);renderer.setClearColor(0x000000,0);stage.prepend(renderer.domElement);
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(42,W/H,0.1,2000);
camera.position.set(0,0,390);
scene.add(new THREE.AmbientLight(0x9ab7d8,0.42));
const key=new THREE.DirectionalLight(0xffffff,1.6);key.position.set(-220,260,320);scene.add(key);
const violet=new THREE.PointLight(0x6b4bff,1.2,800);violet.position.set(220,-80,200);scene.add(violet);
const cyan=new THREE.PointLight(0x1ab9ff,0.7,800);cyan.position.set(-240,-120,-160);scene.add(cyan);
const globe=new ThreeGlobe({waitForGlobeReady:true,animateIn:false})
 .showGlobe(true).globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
 .showAtmosphere(true).atmosphereColor("#348cff").atmosphereAltitude(0.22)
 .showGraticules(true);
const material=globe.globeMaterial();material.bumpScale=0.7;material.shininess=0.8;
scene.add(globe);
const starGeo=new THREE.BufferGeometry(), starPositions=[];
for(let i=0;i<950;i++){const r=700+Math.random()*400,a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1);starPositions.push(r*Math.sin(b)*Math.cos(a),r*Math.cos(b),r*Math.sin(b)*Math.sin(a));}
starGeo.setAttribute("position",new THREE.Float32BufferAttribute(starPositions,3));
const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x8db8e8,size:1.1,transparent:true,opacity:0.55}));
scene.add(stars);
const glowGeo=new THREE.SphereGeometry(102,64,64);
const glowMat=new THREE.MeshBasicMaterial({color:0x267dff,transparent:true,opacity:0.055,side:THREE.BackSide});
const glow=new THREE.Mesh(glowGeo,glowMat);scene.add(glow);

const data=await (await fetch("/github-contributions.json")).json();
document.querySelector("#stats").textContent=data.totalContributions.toLocaleString()+" contributions";
document.querySelector("#foot").textContent="@"+data.username+"  •  Last 365 days  •  Updated "+new Date(data.updatedAt).toLocaleDateString("en-GB")+"  •  Rotating globe";
const positive=data.days.filter(d=>d.contributionCount>0);
const maximum=Math.max(1,...positive.map(d=>d.contributionCount));
const dots=positive.map((d,i)=>{const dt=new Date(d.date+"T00:00:00Z");const doy=Math.floor((dt-new Date(dt.getUTCFullYear(),0,0))/86400000);const lon=(doy/365)*360-180;const lat=58-dt.getUTCDay()*(116/6);return {lat,lng:lon,count:d.contributionCount};});
globe.pointsData(dots).pointLat("lat").pointLng("lng").pointAltitude(d=>0.012+(d.count/maximum)*0.035)
 .pointRadius(d=>0.12+(d.count/maximum)*0.28)
 .pointColor(d=>d.count/maximum>.68?"#c29aff":d.count/maximum>.34?"#31c8ff":"#38e6a4")
 .pointsMerge(false);
const arcs=[];
for(let i=0;i<dots.length;i+=Math.max(1,Math.floor(dots.length/24))){
 const a=dots[i],b=dots[(i+Math.floor(dots.length/3))%dots.length];
 arcs.push({startLat:a.lat,startLng:a.lng,endLat:b.lat,endLng:b.lng,count:a.count});
}
globe.arcsData(arcs).arcStartLat("startLat").arcStartLng("startLng").arcEndLat("endLat").arcEndLng("endLng")
 .arcColor(d=>d.count/maximum>.5?"#9b7bff":"#32caff").arcAltitude(0.24).arcStroke(0.45)
 .arcDashLength(0.48).arcDashGap(0.55).arcDashAnimateTime(4200).arcsTransitionDuration(0);
globe.rotateY(-Math.PI/2.8);globe.rotation.x=0.12;
const controls={angle:0};
window.renderFrame=(frame,total)=>{globe.rotation.y=-Math.PI/2.8+(frame/total)*Math.PI*2;globe.rotation.x=0.12+Math.sin(frame/total*Math.PI*2)*0.025;stars.rotation.y=frame/total*0.12;renderer.render(scene,camera);return renderer.domElement.toDataURL("image/png");};
for(let i=0;i<36;i++){window.renderFrame(i,36);await new Promise(r=>setTimeout(r,25));}
window.__GLOBE_READY__=true;
