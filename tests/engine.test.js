import test from 'node:test';import assert from 'node:assert/strict';import {calcDay,calcPeriod} from '../scripts/core/engine.js';
const S={hab:10,min:false,idaj:12,maxAmp:14,panDeb:'11:45',panFin:'14:15',nuitDeb:'21:00',nuitFin:'06:00',nuitMaj:0,cp:420,rc:420,base:35,pl:16};
const no=()=>false;
test('journée',()=>{const r=calcDay('2026-09-07',{t:'T',deb:'08:00',fin:'20:00',p:[{d:'12:00',f:'12:30',ty:'ENT'}]},S,no);assert.equal(r.amp,730);assert.equal(r.tte,690);assert.equal(r.pz,30)});
test('min TTE',()=>{const r=calcDay('2026-09-07',{t:'T',deb:'08:00',fin:'11:00',p:[]},{...S,min:true},no);assert.equal(r.tte,270)});
test('passage minuit',()=>{const r=calcDay('2026-09-07',{t:'T',deb:'22:00',fin:'02:00',p:[]},S,no);assert.equal(r.tte,240)});
test('quatorzaine',()=>{const d={};for(let i=0;i<10;i++)d['2026-09-'+String(i+1).padStart(2,'0')]={t:'T',deb:'08:00',fin:'17:00',p:[]};const r=calcPeriod('2026-09-01',1,d,S,no);assert.ok(r.G.h25>0);assert.ok(r.G.trav===10)});
