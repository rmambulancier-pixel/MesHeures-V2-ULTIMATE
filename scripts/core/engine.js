export function P(s){if(!s||!/^\d{1,2}:\d{2}/.test(s))return null;const[h,m]=s.split(':').map(Number);return h*60+m}
export function F(m){if(m==null)return'—';const g=m<0;m=Math.abs(Math.round(m));return(g?'-':'')+Math.floor(m/60)+'h'+String(m%60).padStart(2,'0')}
export function addD(s,n){const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
export function nDays(a,b){return Math.round((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/864e5)}
export function dowN(s){return new Date(s+'T12:00:00').getDay()}
export function calcDay(k,d,S,isFerie){
 const r={amp:0,tte:0,seuil:0,idaj:0,ir:0,iru:0,rc:0,fer:0,dim:0,trav:0,pz:0,nuit:0,al:[],deb:null,fin:null,t:d?d.t:null};
 if(!d)return r; const isDim=dowN(k)===0;
 const night=(a,b)=>{const nd=P(S.nuitDeb),nf=P(S.nuitFin);if(nd==null||nf==null||!S.nuitMaj)return 0;let x=0;for(let t=a;t<b;t++)if(t>=nd||t<nf)x++;return x};
 if(d.t==='T'){
  const a=P(d.deb),b0=P(d.fin);if(a==null||b0==null){r.al.push({lvl:'b',m:'Horaires incomplets'});return r}
  const b=b0<=a?b0+1440:b0,br=b-a,pd=P(S.panDeb),pf=P(S.panFin),panOK=a<=pd&&b>=pf;
  for(const p of d.p||[]){const x=P(p.d);let y=P(p.f);if(x!=null&&y!=null){if(y<x)y+=1440;r.pz+=y-x}}
  if(d.panier==='ENT')r.iru=1;else if(d.panier==='EXT')r.ir=1;else if(d.panier!=='NON'){if((d.p||[]).length){for(const p of d.p||[])if(panOK){if(p.ty==='EXT')r.ir++;else r.iru++}}else if(panOK)r.ir=1}
  r.amp=br+S.hab;r.tte=br-r.pz;if(S.min&&r.tte<270)r.tte=270;r.seuil=r.tte;r.trav=1;r.deb=a;r.fin=b;
  r.idaj=Math.max(0,r.amp-S.idaj*60);if(d.fer)r.fer=r.tte;if(isDim)r.dim=1;r.nuit=night(a,b);
  if(r.amp>S.maxAmp*60)r.al.push({lvl:'b',m:'Amplitude '+F(r.amp)+' > '+S.maxAmp+'h réglementaires'});
  if(r.pz===0&&r.tte>=360)r.al.push({lvl:'w',m:'Heures travaillées sans pause'});
  if(isFerie(k)&&!d.fer)r.al.push({lvl:'w',m:'Jour férié travaillé majoration non cochée'});
  if(r.tte>660)r.al.push({lvl:'w',m:'TTE élevé journée exceptionnellement longue'});
 }else if(d.t==='CP')r.seuil=S.cp;
 else if(d.t==='RC')r.rc=S.rc;
 else if(d.t==='NUIT'){const a=P(d.deb),b0=P(d.fin);if(a!=null&&b0!=null){const b=b0<=a?b0+1440:b0,br=b-a;for(const p of d.p||[]){const x=P(p.d);let y=P(p.f);if(x!=null&&y!=null){if(y<x)y+=1440;r.pz+=y-x}}r.amp=br+S.hab;r.tte=br-r.pz;r.seuil=r.tte;r.trav=1;r.deb=a;r.fin=b;r.nuit=night(a,b)}}
 return r;
}
export function calcPeriod(start,nb,days,S,isFerie){
 const Q=[],AL=[],G={amp:0,tte:0,seuil:0,trav:0,idaj:0,ir:0,iru:0,rc:0,fer:0,dim:0,nuit:0,nor:0,h25:0,h50:0,hab:0,ferJ:[],dimJ:[]};let pk=null,pe=null;
 for(let q=0;q<nb;q++){const o={start:addD(start,q*14),w:[],amp:0,tte:0,seuil:0,trav:0,h25:0,h50:0,nor:0};for(let w=0;w<2;w++){const s={start:addD(start,q*14+w*7),amp:0,tte:0,trav:0};for(let i=0;i<7;i++){const k=addD(start,q*14+w*7+i),r=calcDay(k,days[k],S,isFerie);s.amp+=r.amp;s.tte+=r.tte;s.trav+=r.trav;o.seuil+=r.seuil;G.idaj+=r.idaj;G.ir+=r.ir;G.iru+=r.iru;G.rc+=r.rc;G.fer+=r.fer;G.nuit+=r.nuit;if(r.fer)G.ferJ.push(k);if(r.dim&&days[k]?.t==='T'){G.dim++;G.dimJ.push(k)}r.al.forEach(a=>AL.push({k,...a}));if(r.deb!=null){if(pe!=null&&pk&&nDays(pk,k)===1){const gap=1440+r.deb-pe;if(gap>0&&gap<660)AL.push({k,lvl:'w',m:'Repos quotidien de '+F(gap)+' seulement'})}pk=k;pe=r.fin}}if(s.tte>2880)AL.push({k:s.start,lvl:'b',m:'Semaine dépassant le plafond légal'});o.w.push(s);o.amp+=s.amp;o.tte+=s.tte;o.trav+=s.trav}const N=S.base*120;o.nor=Math.min(o.seuil,N);o.h25=Math.min(Math.max(o.seuil-N,0),S.pl*60);o.h50=Math.max(o.seuil-N-S.pl*60,0);for(const x of ['amp','tte','seuil','trav','nor','h25','h50'])G[x]+=o[x];Q.push(o)}G.hab=G.trav*S.hab;return{Q,AL,G};
}
