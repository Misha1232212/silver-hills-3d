(function(){
"use strict";
if(document.getElementById("skh3d-template"))return;
var assetBase=new URL(".",document.currentScript.src).href;
var holder=document.createElement("div");holder.innerHTML="<template id=\"skh3d-template\">\n<div id=\"skh3d-dom5\" class=\"skh3d\">\n  <div class=\"skh3d-stage\">\n    <div class=\"skh3d-top\">\n      <div class=\"skh3d-title\">\n        <b>Дом 5, ЖК «Серебряные холмы»</b>\n        <span>8 этажей, 2 подъезда, сдача во II квартале 2027 года</span>\n      </div>\n      <div class=\"skh3d-ui\">\n        <button type=\"button\" data-view=\"yard\" aria-pressed=\"true\">Со двора</button>\n        <button type=\"button\" data-view=\"entry\" aria-pressed=\"false\">Вход</button>\n        <button type=\"button\" data-view=\"green\" aria-pressed=\"false\">С востока</button>\n        <button type=\"button\" data-view=\"court\" aria-pressed=\"false\">Двор</button>\n        <button type=\"button\" data-view=\"top\" aria-pressed=\"false\">Квартал</button>\n        <button type=\"button\" data-act=\"night\" aria-pressed=\"false\">Вечер</button>\n      </div>\n    </div>\n    <div class=\"skh3d-houses\">\n      <button type=\"button\" data-house=\"5\" aria-pressed=\"true\">Дом 5</button>\n      <button type=\"button\" data-house=\"4\" aria-pressed=\"false\">Дом 4</button>\n      <button type=\"button\" class=\"skh3d-list-toggle\" aria-expanded=\"false\" aria-controls=\"skh3d-list\">Квартиры</button>\n    </div>\n    <div class=\"skh3d-list\" id=\"skh3d-list\" hidden><div class=\"skh3d-list-title\">Свободные квартиры</div><div class=\"skh3d-list-items\"></div></div>\n    <div class=\"skh3d-apt-tip is-off\" role=\"tooltip\"></div>\n    <div class=\"skh3d-touch\" hidden><button type=\"button\">Управлять 3D-моделью</button></div>\n    <button type=\"button\" class=\"skh3d-done\" hidden>Готово</button>\n    <div class=\"skh3d-hint\">Оранжевые зоны — свободные квартиры. Нажмите, чтобы посмотреть.</div>\n    <div class=\"skh3d-load\">Загружаем 3D-модель…</div>\n  </div>\n  <p class=\"skh3d-note\">Модель построена по схеме планировочной организации земельного участка и визуализациям проекта. Носит иллюстративный характер.</p>\n\n  <dialog class=\"skh3d-modal\" aria-labelledby=\"skh3d-apt-title\">\n    <div class=\"skh3d-modal-card\">\n      <button type=\"button\" class=\"skh3d-modal-close\" aria-label=\"Закрыть\" autofocus>×</button>\n      <header class=\"skh3d-modal-head\">\n        <div class=\"skh3d-kicker\">СЕРЕБРЯНЫЕ ХОЛМЫ / КВАРТИРЫ</div>\n        <div class=\"skh3d-status\"><i></i> В продаже <span class=\"skh3d-promo\" hidden>Акция</span></div>\n        <h3 id=\"skh3d-apt-title\"></h3>\n        <div class=\"skh3d-apt-meta\"></div>\n        <div class=\"skh3d-modal-price\"></div>\n      </header>\n      <div class=\"skh3d-modal-media\">\n        <figure><figcaption><span>01</span> Планировка</figcaption><div class=\"skh3d-image-frame\"><img class=\"skh3d-modal-img\" id=\"skh3d-img-plan\" alt=\"Планировка квартиры\" decoding=\"async\"></div></figure>\n        <figure><figcaption><span>02</span> 3D-визуализация</figcaption><div class=\"skh3d-image-frame\"><img class=\"skh3d-modal-img\" id=\"skh3d-img-render\" alt=\"Визуализация интерьера квартиры\" decoding=\"async\"></div></figure>\n      </div>\n      <footer class=\"skh3d-modal-footer\"><div><div class=\"skh3d-area-warning\" hidden></div><span>Визуализация носит иллюстративный характер.</span></div><button type=\"button\" class=\"skh3d-back\">К выбору квартир</button></footer>\n    </div>\n  </dialog>\n</div>\n</template>";document.body.appendChild(holder.firstElementChild);
var style=document.createElement("style");style.id="skh3d-style";style.textContent="\n/* ===== НАСТРОЙКИ ZERO BLOCK =====\n   Класс жёлтого прямоугольника: skh3d-container (без точки).\n   Размеры и позиция задаются в Zero Block, не здесь. */\n.skh3d-mount-host.skh3d-mount-static{position:relative!important}\n.skh3d-mount-host > #skh3d-dom5{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:2;pointer-events:auto}\n#skh3d-dom5,#skh3d-dialog-host{\n  --skh-radius: 20px;\n  --skh-accent: #F16041;\n  --skh-accent-hover: #D94D30;\n  --skh-ink: #252525;\n  color:var(--skh-ink);font-family:inherit;line-height:1.4;box-sizing:border-box;\n}\n#skh3d-dom5{display:flex;flex-direction:column;min-width:0;min-height:0;max-width:none;margin:0;padding:0;overflow:hidden;border-radius:var(--skh-radius);background:#fff;container-type:inline-size;isolation:isolate}\n#skh3d-dialog-host{display:contents}\n:is(#skh3d-dom5,#skh3d-dialog-host) *,:is(#skh3d-dom5,#skh3d-dialog-host) *::before,:is(#skh3d-dom5,#skh3d-dialog-host) *::after{box-sizing:border-box}\n:is(#skh3d-dom5,#skh3d-dialog-host) [hidden]{display:none!important}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-stage{position:relative;isolation:isolate;flex:1 1 0;min-height:0;width:100%;border-radius:var(--skh-radius);overflow:hidden;background:linear-gradient(180deg,#719FD1,#DCE9F2);transition:background .5s}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-stage.is-night{background:linear-gradient(180deg,#0B1424,#33405A)}\n:is(#skh3d-dom5,#skh3d-dialog-host) canvas{display:block;width:100%;height:100%;outline:none}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-top{position:absolute;left:16px;right:16px;top:16px;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;z-index:3;pointer-events:none}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-title{background:rgba(255,255,255,.96);border-radius:14px;padding:12px 16px;pointer-events:auto;box-shadow:0 4px 20px #17202b18}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-title b{display:block;font-size:16px;font-weight:700;line-height:1.25}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-title span{display:block;font-size:12px;color:#575757;margin-top:4px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-ui{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px;pointer-events:auto}\n:is(#skh3d-dom5,#skh3d-dialog-host) button{font:inherit;line-height:1.2;cursor:pointer;-webkit-tap-highlight-color:transparent}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-ui button,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-houses button,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-done,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-touch button,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-back{font-size:13px;font-weight:600;border:0;border-radius:999px;padding:11px 15px;background:var(--skh-accent);color:#201b19;transition:background .2s,box-shadow .2s;white-space:nowrap}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-ui button:hover,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-houses button:hover,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-back:hover,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-done:hover,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-touch button:hover{background:var(--skh-accent-hover);color:#fff}\n:is(#skh3d-dom5,#skh3d-dialog-host) button[aria-pressed=\"true\"],:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list-toggle[aria-expanded=\"true\"]{box-shadow:inset 0 0 0 2px #fff,0 2px 8px #2224}\n:is(#skh3d-dom5,#skh3d-dialog-host) button:focus-visible{outline:3px solid #252525;outline-offset:3px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-hint{position:absolute;left:16px;bottom:14px;z-index:3;font-size:12px;color:#222;background:#fffffff0;padding:8px 12px;border-radius:999px;pointer-events:none}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-load{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;color:#252525;font-size:15px;z-index:1;pointer-events:none}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-touch{position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;background:#20202014;pointer-events:none}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-touch button{pointer-events:auto;padding:14px 22px;box-shadow:0 4px 20px #2224}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-done{position:absolute;right:16px;bottom:14px;z-index:4}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-lbl{position:absolute;left:0;top:0;z-index:2;pointer-events:none;white-space:nowrap;font-size:12px;line-height:1.25;color:#252525;background:#fffffff0;padding:6px 10px 7px;border-radius:9px;box-shadow:0 6px 16px -8px #0006;transition:opacity .2s}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-lbl b{display:block;font-weight:700;font-size:13px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-lbl::after{content:\"\";position:absolute;left:50%;bottom:-4px;width:8px;height:8px;background:inherit;transform:translateX(-50%) rotate(45deg)}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-lbl.is-main{background:var(--skh-accent)}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-lbl.is-off,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-apt-tip.is-off{opacity:0}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-note{flex:0 0 auto;font-size:11px;color:#656565;margin:0;padding:5px 9px;line-height:1.25;background:#fff}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-houses{position:absolute;left:16px;bottom:58px;display:flex;gap:6px;z-index:4}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list{position:absolute;left:16px;bottom:108px;width:min(350px,calc(100% - 32px));max-height:calc(100% - 220px);z-index:6;background:#fff;border-radius:16px;box-shadow:0 12px 40px #0003;display:flex;flex-direction:column;overflow:hidden}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list-title{padding:14px 16px;font-size:14px;font-weight:700;border-bottom:1px solid #eee}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list-items{overflow:auto;overscroll-behavior:contain;padding:5px 10px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list-items button{display:block;text-align:left;width:100%;border:0;border-bottom:1px solid #eee;background:#fff;padding:11px 7px;color:#252525;font-size:13px;border-radius:6px;white-space:normal}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list-items button:hover{background:#fff0eb}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list-items b,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list-items span{display:block}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list-items span{font-size:12px;color:#666;margin-top:3px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-apt-tip{position:absolute;z-index:5;background:#252525;color:#fff;padding:10px 14px;border-radius:10px;font-size:12px;line-height:1.4;pointer-events:none;white-space:nowrap;box-shadow:0 10px 24px -8px #0006;transform:translate(-50%,calc(-100% - 12px));transition:opacity .15s}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-apt-tip b,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-apt-tip .skh3d-apt-price{display:block;color:#ff9b83;font-weight:700;margin:2px 0}\n/* Native dialog: поверх Tilda, даже внутри обрезанного контейнера. */\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal{position:fixed;inset:0;margin:auto;width:min(960px,calc(100% - 36px));max-width:none;max-height:calc(100% - 36px);padding:0;border:0;border-radius:24px;background:#fff;color:var(--skh-ink);overflow:auto;overscroll-behavior:contain;box-shadow:0 24px 100px #0005;font-family:inherit}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal:not([open]){display:none}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal::backdrop{background:rgba(20,23,27,.72);backdrop-filter:blur(5px)}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-card{position:relative;padding:28px 30px 22px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-close{position:absolute;top:20px;right:20px;width:40px;height:40px;border:0;border-radius:50%;background:var(--skh-accent);color:#201b19;font-size:26px;line-height:1;display:grid;place-items:center;z-index:2}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-close:hover{background:var(--skh-accent-hover);color:#fff}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-head{padding-right:42px;margin-bottom:20px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-kicker{font-size:11px;font-weight:700;letter-spacing:.12em;color:#777;margin-bottom:13px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-status{display:flex;align-items:center;gap:7px;font-size:12px;color:#306443;font-weight:600;margin-bottom:7px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-status i{width:7px;height:7px;border-radius:50%;background:#438b5c}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-promo{background:#ffede8;color:#9e371f;border-radius:99px;padding:3px 9px;margin-left:5px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-head h3{font-size:clamp(23px,3vw,33px);font-weight:700;line-height:1.16;letter-spacing:-.025em;margin:0 0 8px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-apt-meta{font-size:13px;color:#656565;line-height:1.5}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-price{font-size:clamp(23px,3vw,32px);font-weight:700;line-height:1.2;margin-top:13px;display:flex;flex-wrap:wrap;align-items:baseline;gap:5px 12px;font-variant-numeric:tabular-nums}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-price small{font-size:13px;color:#656565;font-weight:400}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-media{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-media figure{margin:0;background:#f6f5f3;border:1px solid #eceae6;border-radius:14px;overflow:hidden;min-width:0}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-media figcaption{display:flex;align-items:center;gap:8px;padding:11px 14px;font-size:13px;font-weight:700;background:#fff;border-bottom:1px solid #eceae6}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-media figcaption span{font-size:11px;color:#a3442f;font-weight:700}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-image-frame{height:clamp(235px,43vh,440px);padding:10px;display:grid;place-items:center}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-img{width:100%;height:100%;min-height:0;object-fit:contain;display:block}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-footer{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:18px;font-size:12px;color:#666}\n:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-area-warning{color:#8c432e;margin-bottom:5px}\n@media(max-width:760px){\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-top{flex-direction:column;left:10px;right:10px;top:10px;gap:8px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-title{padding:9px 12px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-title b{font-size:14px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-ui{justify-content:flex-start;gap:5px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-ui button,:is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-houses button{padding:9px 11px;font-size:12px;min-height:36px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-houses{left:10px;bottom:58px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-list{left:10px;bottom:105px;width:calc(100% - 20px);max-height:calc(100% - 250px)}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-hint{display:none}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal{width:calc(100% - 16px);max-height:calc(100% - 16px);border-radius:18px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-card{padding:19px 14px 16px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-close{top:12px;right:12px;width:36px;height:36px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-media{grid-template-columns:1fr;gap:10px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-image-frame{height:clamp(230px,43vh,370px)}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-modal-footer{flex-direction:column;align-items:stretch;gap:10px}\n :is(#skh3d-dom5,#skh3d-dialog-host) .skh3d-back{min-height:44px}\n}\n@media(prefers-reduced-motion:reduce){:is(#skh3d-dom5,#skh3d-dialog-host) *{transition:none!important}}\n\n@container (max-width:760px){\n #skh3d-dom5 .skh3d-top{flex-direction:column;left:10px;right:10px;top:10px;gap:8px}\n #skh3d-dom5 .skh3d-title{padding:9px 12px}\n #skh3d-dom5 .skh3d-title b{font-size:14px}\n #skh3d-dom5 .skh3d-ui{justify-content:flex-start;gap:5px}\n #skh3d-dom5 .skh3d-ui button,#skh3d-dom5 .skh3d-houses button{padding:9px 11px;font-size:12px;min-height:34px}\n #skh3d-dom5 .skh3d-hint{display:none}\n #skh3d-dom5 .skh3d-houses{left:10px;bottom:52px}\n #skh3d-dom5 .skh3d-list{left:10px;bottom:96px;width:calc(100% - 20px);max-height:max(100px,calc(100% - 230px))}\n}\n@container (max-width:340px){\n #skh3d-dom5 .skh3d-ui button,#skh3d-dom5 .skh3d-houses button{padding:7px 9px;font-size:11px}\n #skh3d-dom5 .skh3d-title span{font-size:11px}\n}\n";document.head.appendChild(style);

(function(){
  // HTML-блок — только загрузчик. Ждём появления контейнера Tilda.
  var template=document.getElementById('skh3d-template');
  if(!template||template.dataset.started)return;
  template.dataset.started='1';
  var observer=null,timer=null;
  function tryMount(){
    if(document.getElementById('skh3d-dom5'))return true;
    var target=document.querySelector('.skh3d-container');
    if(!target||!document.body)return false;
    // Tilda может присвоить класс внешнему .tn-elem или внутреннему .tn-atom.
    var host=target.closest('.tn-elem')||target;
    var root=template.content.firstElementChild.cloneNode(true);
    host.classList.add('skh3d-mount-host');
    if(getComputedStyle(host).position==='static')host.classList.add('skh3d-mount-static');
    host.appendChild(root);
    var portal=document.createElement('div');portal.id='skh3d-dialog-host';
    // Карточка вне масштабируемого Zero Block: без обрезки и изменения размера.
    portal.appendChild(root.querySelector('.skh3d-modal'));document.body.appendChild(portal);
    if(observer)observer.disconnect();if(timer)clearTimeout(timer);
    boot(root,portal);return true;
  }
  if(!tryMount()){
    observer=new MutationObserver(function(){if(tryMount())observer.disconnect()});
    observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    timer=setTimeout(function(){observer.disconnect();console.warn('SKH 3D: не найден элемент с CSS-классом skh3d-container. Проверьте настройки Zero Block.');},30000);
  }
  function boot(root,portal){
  var stage=root.querySelector('.skh3d-stage');

  // Каталог и изображения доступны независимо от WebGL.
  var APT_TYPES = {
    '1kk-39.4':{label:'1-комнатная',area:39.4,imgKey:'39.4'},
    '1kk-e2-51.2':{label:'1-комнатная (Евро-2)',area:51.2,imgKey:'51.2'},
    '2kk-65.5':{label:'2-комнатная',area:65.5,imgKey:'65.5'},
    '2kk-70.2':{label:'2-комнатная (акция)',area:70.2,imgKey:'70.2',promo:true}
  };
  var APT_LIST = [
    { h:5, s:2, f:8, p:4, t:'1kk-e2-51.2', price:8294400 },
    { h:5, s:1, f:8, p:1, t:'1kk-39.4', price:5639000 },
    { h:5, s:2, f:8, p:7, t:'1kk-39.4', price:5639000 },
    { h:5, s:1, f:6, p:1, t:'1kk-39.4', price:5639000 },
    { h:5, s:1, f:6, p:7, t:'1kk-39.4', price:5639000 },
    { h:5, s:2, f:6, p:1, t:'1kk-39.4', price:5639000 },
    { h:5, s:2, f:6, p:7, t:'1kk-39.4', price:5639000 },
    { h:5, s:2, f:8, p:2, t:'2kk-65.5', price:9799990 },
    { h:5, s:2, f:8, p:6, t:'2kk-70.2', price:8490000 },
    { h:5, s:1, f:6, p:2, t:'2kk-70.2', price:8490000 },
    { h:5, s:2, f:6, p:6, t:'2kk-70.2', price:8490000 },
    { h:4, s:2, f:8, p:4, t:'1kk-e2-51.2', price:8294400 },
    { h:4, s:2, f:6, p:4, t:'1kk-e2-51.2', price:8294400 },
    { h:4, s:1, f:8, p:7, t:'1kk-39.4', price:5639000 },
    { h:4, s:1, f:6, p:1, t:'1kk-39.4', price:5639000 },
    { h:4, s:2, f:6, p:1, t:'1kk-39.4', price:5639000 },
    { h:4, s:2, f:6, p:7, t:'1kk-39.4', price:5639000 },
    { h:4, s:1, f:8, p:2, t:'2kk-70.2', price:8490000 },
    { h:4, s:1, f:6, p:2, t:'2kk-70.2', price:8490000 }
  ];
  var SKH_IMAGES = {"39.4":{"plan":"https://www.dropbox.com/scl/fi/u3dplt0y7ynz8hxfs1yxx/39-4-plan.webp?rlkey=22mhedumkk7yu8jp52pvgx768&st=1afb2eh4&raw=1","render":"https://www.dropbox.com/scl/fi/utvu9zm04eybmi20qzy3f/39-4-render.webp?rlkey=tew06ylc4k3ia7cq8zpqjuojd&st=1e05h4or&raw=1"},"51.2":{"plan":"https://www.dropbox.com/scl/fi/3fcsidm13qn9g6xx6i4sb/51-2-plan.webp?rlkey=ff8ejlw12bco4aq76d2zd4sug&st=2zz5d5qc&raw=1","render":"https://www.dropbox.com/scl/fi/snwyoiaq4odvp4hvwss93/51-2-render.webp?rlkey=mbpq8xl9y1p6v8705m75tuh5a&st=d87crkh2&raw=1"},"65.5":{"plan":"https://www.dropbox.com/scl/fi/vvnwyg1hj0dlogn6oszgq/65-5-plan.webp?rlkey=b5t9kkiv0dijmx1nfoykfylvk&st=iqcmbxmq&raw=1","render":"https://www.dropbox.com/scl/fi/6lhejs4vh3lsz0q4mhj9c/65-5-render.webp?rlkey=yx3zjh29ufnydydon09j96f5i&st=nsg6l7zw&raw=1"},"70.2":{"plan":"https://www.dropbox.com/scl/fi/nbejm6ae6c6b7lj3ev3sx/70-2-plan.webp?rlkey=4fi3u689rjdf6x3q2r3dex4xo&st=trxp5tth&raw=1","render":"https://www.dropbox.com/scl/fi/exeynoloml580bmz2zb74/70-2-render.webp?rlkey=x7d6vjm9s1yzz08f8oywc3bth&st=ecs6i6fr&raw=1"}};
  Object.keys(SKH_IMAGES).forEach(function(k){Object.keys(SKH_IMAGES[k]).forEach(function(t){SKH_IMAGES[k][t]=new URL(SKH_IMAGES[k][t],assetBase).href;});});
  var activeHouse=5, onHouseChange=null;
  var modalEl=portal.querySelector('.skh3d-modal'), modalHead=modalEl.querySelector('h3'), modalMeta=modalEl.querySelector('.skh3d-apt-meta'), modalPrice=modalEl.querySelector('.skh3d-modal-price');
  var imgPlan=modalEl.querySelector('#skh3d-img-plan'), imgRender=modalEl.querySelector('#skh3d-img-render'), modalClose=modalEl.querySelector('.skh3d-modal-close');
  var list=root.querySelector('.skh3d-list'), listItems=list.querySelector('.skh3d-list-items'), listToggle=root.querySelector('.skh3d-list-toggle'), houseButtons=root.querySelectorAll('[data-house]');
  var priorFocus=null, savedOverflow=null;
  function fmtPrice(v){return v.toLocaleString('ru-RU')+'\u00A0₽'}
  function areaText(t){return t.area.toFixed(1).replace('.',',')+' м²'}
  function setList(open){list.hidden=!open;listToggle.setAttribute('aria-expanded',String(open));}
  function refreshList(){
    listItems.textContent='';var count=0;
    APT_LIST.forEach(function(a,idx){if(a.h!==activeHouse)return;count++;var t=APT_TYPES[a.t],b=document.createElement('button'),title=document.createElement('b'),meta=document.createElement('span');
      b.type='button';b.dataset.aptIndex=String(idx);title.textContent=areaText(t)+' · '+fmtPrice(a.price);meta.textContent=t.label+' · подъезд '+a.s+' · этаж '+a.f+' · поз. '+a.p;b.append(title,meta);listItems.appendChild(b);
      b.addEventListener('click',function(){openModal(idx)});
    });listToggle.textContent='Квартиры ('+count+')';
  }
  function setActiveHouse(h){
    activeHouse=h;houseButtons.forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.house===h))});
    root.querySelector('.skh3d-title b').textContent='Дом '+h+', ЖК «Серебряные холмы»';
    root.querySelector('.skh3d-title span').textContent='8 этажей, 2 подъезда'+(h===5?', сдача во II квартале 2027 года':'');
    refreshList();if(onHouseChange)onHouseChange(h);
  }
  function openModal(idx){
    var a=APT_LIST[idx];if(!a)return;var t=APT_TYPES[a.t],imgs=SKH_IMAGES[t.imgKey];if(!imgs)return;
    modalHead.textContent=t.label.replace(' (акция)','')+' · '+areaText(t);
    modalMeta.textContent='Дом '+a.h+' · Подъезд '+a.s+' · Этаж '+a.f+' · Позиция '+a.p;
    modalPrice.textContent=fmtPrice(a.price);var small=document.createElement('small');small.textContent=Math.round(a.price/t.area).toLocaleString('ru-RU')+' ₽/м²';modalPrice.appendChild(small);
    modalEl.querySelector('.skh3d-promo').hidden=!t.promo;
    var warning=modalEl.querySelector('.skh3d-area-warning');warning.hidden=t.imgKey!=='70.2';warning.textContent=warning.hidden?'':'На исходном чертеже — 70,30 м²; в каталоге — 70,2 м².';
    imgPlan.src=imgs.plan;imgRender.src=imgs.render;
    if(!modalEl.open){priorFocus=document.activeElement;savedOverflow=document.body.style.overflow;modalEl.showModal();document.body.style.overflow='hidden';}
    modalEl.scrollTop=0;modalClose.focus({preventScroll:true});
  }
  function closeModal(){if(modalEl.open)modalEl.close()}
  modalClose.addEventListener('click',closeModal);modalEl.querySelector('.skh3d-back').addEventListener('click',closeModal);
  modalEl.addEventListener('click',function(e){if(e.target===modalEl){var r=modalEl.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal()}});
  modalEl.addEventListener('close',function(){if(modalEl.open)return;document.body.style.overflow=savedOverflow===null?'':savedOverflow;savedOverflow=null;imgPlan.removeAttribute('src');imgRender.removeAttribute('src');if(priorFocus&&priorFocus.isConnected)priorFocus.focus({preventScroll:true});priorFocus=null});
  listToggle.addEventListener('click',function(){setList(list.hidden)});
  houseButtons.forEach(function(b){b.addEventListener('click',function(){setActiveHouse(+b.dataset.house)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modalEl.open&&!list.hidden){setList(false);listToggle.focus()}});
  setActiveHouse(5);
  // Отложенная загрузка только при приближении к блоку. Фиксированная версия Three.js.
  function load(src){return new Promise(function(ok,fail){var el=document.createElement('script'),timer=setTimeout(function(){el.remove();fail(new Error('CDN timeout'))},15000);el.src=src;el.async=true;el.onload=function(){clearTimeout(timer);ok()};el.onerror=function(){clearTimeout(timer);el.remove();fail(new Error('CDN unavailable'))};document.head.appendChild(el)})}
  function start(){
    if(start.done)return;start.done=true;
    var chain=Promise.resolve();
    if(!window.THREE)chain=chain.then(function(){return load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js').catch(function(){return load('https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js')})});
    chain.then(function(){if(!window.THREE||String(THREE.REVISION)!=='128')throw new Error('Требуется Three.js r128');if(!THREE.OrbitControls)return load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js').catch(function(){return load('https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js')})}).then(init).catch(function(e){console.error('SKH 3D:',e);var l=root.querySelector('.skh3d-load');if(l)l.textContent='3D-модель недоступна. Квартиры можно посмотреть через список ниже.'});
  }
  function startWhenSized(){if(!stage.clientWidth||!stage.clientHeight)return false;start();return true}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting&&startWhenSized())io.disconnect()},{rootMargin:'300px'});io.observe(stage)}else if(!startWhenSized()&&'ResizeObserver' in window){var waitSize=new ResizeObserver(function(){if(startWhenSized())waitSize.disconnect()});waitSize.observe(stage)}

  function init(){
  var T=THREE, reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var C=function(h){return new T.Color(h).convertSRGBToLinear()};
  var W=function(){return stage.clientWidth}, H=function(){return stage.clientHeight};

  var mobile=matchMedia('(pointer:coarse)').matches;
  var renderer=new T.WebGLRenderer({antialias:!mobile,alpha:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,mobile?1.25:1.75)); renderer.setSize(W(),H());
  renderer.outputEncoding=T.sRGBEncoding; renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFSoftShadowMap;
  stage.insertBefore(renderer.domElement,stage.firstChild);
  renderer.domElement.setAttribute('aria-label','Интерактивная 3D-модель. Для выбора с клавиатуры используйте список квартир.');
  var ld=root.querySelector('.skh3d-load');

  var scene=new T.Scene();
  scene.fog=new T.Fog(C('#D3E1EA'),80,320);
  var cam=new T.PerspectiveCamera(36,W()/H(),.3,1600);
  var ctr=new T.OrbitControls(cam,renderer.domElement);
  ctr.enableDamping=true; ctr.dampingFactor=.08; ctr.minDistance=8; ctr.maxDistance=380;
  ctr.maxPolarAngle=Math.PI*.5; ctr.enablePan=false; ctr.rotateSpeed=.7;

  var hemi=new T.HemisphereLight(C('#EAF3FF'),C('#7C8A6E'),.78); scene.add(hemi);
  var sun=new T.DirectionalLight(C('#FFF9F0'),1.6); sun.position.set(-110,130,95);
  sun.castShadow=true; sun.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048); sun.shadow.bias=-.0005; sun.shadow.normalBias=.04;
  Object.assign(sun.shadow.camera,{left:-175,right:175,top:175,bottom:-175,near:10,far:520}); scene.add(sun);
  sun.target.position.set(-60,0,-25); scene.add(sun.target);

  var K=.07, f=function(z){return -K*z};
  var S=.231, PW=function(px,py){return [(px-907)*S,(py-646)*S]};
  function local(cx,cy,ang,dx,dz){var a=ang*Math.PI/180, c=PW(cx,cy); return [c[0]+dx*Math.cos(a)-dz*Math.sin(a), c[1]+dx*Math.sin(a)+dz*Math.cos(a)]}

  function M(h,o){var m=new T.MeshStandardMaterial(Object.assign({roughness:.9,metalness:0},o||{}));m.color=C(h);return m}
  function grassTex(base,seed){var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d'),r=rng(seed);
    x.fillStyle=base;x.fillRect(0,0,256,256);
    for(var i=0;i<2600;i++){var px=r()*256,py=r()*256,l=3+r()*7,g=r();
      x.strokeStyle=g<.45?'rgba(46,78,30,.35)':g<.85?'rgba(140,180,90,.32)':'rgba(190,200,120,.28)';x.lineWidth=1;x.beginPath();x.moveTo(px,py);x.lineTo(px+(r()-.5)*3,py-l);x.stroke()}
    for(var j=0;j<40;j++){x.fillStyle='rgba(60,95,40,'+(.05+r()*.08)+')';x.beginPath();x.arc(r()*256,r()*256,10+r()*30,0,7);x.fill()}
    var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=8;return t}
  var mat={lawn:new T.MeshStandardMaterial({map:grassTex('#6A8C47',3),roughness:1}),lawn2:new T.MeshStandardMaterial({map:grassTex('#75984F',7),roughness:1}),pave:M('#CFCBC2'),pave2:M('#B9B4AA'),asph:M('#878C8F',{roughness:.95}),road:M('#6F7477',{roughness:.95}),
    white:M('#F3F2EE'),tile:M('#E5E1D4'),roof:M('#7B7F80'),roof2:M('#8E9293'),rail:M('#C3C7C9',{metalness:.4,roughness:.4}),
    frame:M('#F1F1EF',{metalness:.2,roughness:.4}),soffit:M('#4B4F52'),vent:M('#BDBDB8'),
    glass:new T.MeshStandardMaterial({color:C('#A7C2CD'),transparent:true,opacity:.4,roughness:.06,metalness:.1,depthWrite:false}),
    canopyGlass:new T.MeshStandardMaterial({color:C('#D6E7EE'),transparent:true,opacity:.32,roughness:.05,metalness:.1,depthWrite:false}),
    shop:M('#9FB7C2',{roughness:.15,metalness:.25}),
    slab:M('#E4E2DC'),clay:M('#ECEAE4'),trunk:M('#6E5B4C'),
    leaf:[M('#557F3E'),M('#668F47'),M('#4A7236')],door:M('#3E4448',{roughness:.5}),stripe:M('#F2F2F0'),
    rubber:M('#C9744E'),rubber2:M('#6E9E8C'),rubber3:M('#D7B35A'),sand:M('#E3D2A6'),wood:M('#A97A4F'),metal:M('#5E666B',{metalness:.5,roughness:.4}),
    red:M('#C84B3C'),blue:M('#3E79B5'),yellow:M('#E3BF3A'),green:M('#5FA05A'),fence:new T.MeshStandardMaterial({color:C('#3D4A44'),transparent:true,opacity:.35,depthWrite:false}),
    gravel:M('#B8B0A0'),curb:M('#D9D7D0'),disabled:M('#3E79B5')};
  mat.eco=(function(){var c=document.createElement('canvas');c.width=128;c.height=128;var x=c.getContext('2d');x.fillStyle='#8D9A86';x.fillRect(0,0,128,128);
    for(var yy=0;yy<128;yy+=16)for(var xx=0;xx<128;xx+=16){x.fillStyle=((xx+yy)/16)%2?'#6F8F4E':'#76955A';x.fillRect(xx+3,yy+3,10,10)}
    var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1,1);return new T.MeshStandardMaterial({map:t,roughness:.95})})();
  mat.slabs=(function(){var c=document.createElement('canvas');c.width=128;c.height=128;var x=c.getContext('2d');x.fillStyle='#CFCBC2';x.fillRect(0,0,128,128);x.fillStyle='#B9B5AC';
    for(var i=0;i<128;i+=32){x.fillRect(0,i,128,2);x.fillRect(i,0,2,128)}
    var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.wrapS=t.wrapT=T.RepeatWrapping;return new T.MeshStandardMaterial({map:t,roughness:.95})})();

  var PX=26, NS=.5, FLOORS=8, FH=3.0, BASE=3.6, TOPH=1.2, PL=.6, HTOT=BASE+FLOORS*FH+TOPH;
  var COL={c:['#E5E1D4','#D5D0C2'],w:['#F2F1ED','#DEDCD5'],t:['#8C7F75','#7C7067']};
  function rng(s){return function(){s=(s*16807)%2147483647;return s/2147483647}}
  var R=rng(11);
  function brick(x,y0,w,h,sc){ sc=sc||PX; x.fillStyle='#5B5658'; x.fillRect(0,y0,w,h);
    var bw=.42*sc, bh=.21*sc;
    for(var r=0;r*bh<h;r++)for(var c=-1;c*bw<w;c++){var off=(r%2)*bw/2, v=Math.floor(R()*16)-8;
      x.fillStyle='rgb('+(108+v)+','+(105+v)+','+(106+v)+')'; x.fillRect(c*bw+off+1,y0+r*bh+1,bw-1.5,bh-1.5)}}
  function tiles(x,x0,w,y0,h,t,sc){sc=sc||PX;var c=COL[t]; x.fillStyle=c[0]; x.fillRect(x0,y0,w,h); x.fillStyle=c[1];
    for(var yy=y0+h;yy>y0;yy-=.75*sc) x.fillRect(x0,yy,w,1);
    for(var xx=x0;xx<x0+w;xx+=.9*sc) x.fillRect(xx,y0,1,h)}
  var WIN={s:[1.7,1.85,.75,2],f:[1.75,2.45,.3,2],k:[1.2,1.2,2.1,1]};
  function drawWin(x,n,cx,yTop,type,accent,sc,ns){
    sc=sc||PX; ns=ns||NS;
    var w=WIN[type], ww=w[0]*sc, wh=w[1]*sc, X=cx*sc-ww/2, Y=yTop, fw=Math.max(1,.07*sc);
    if(accent){var a=.14*sc,o=.15*sc; x.fillStyle=accent;
      x.fillRect(X-o-a,Y-o-a,ww+2*(o+a),a); x.fillRect(X-o-a,Y+wh+o,ww+2*(o+a),a); x.fillRect(X-o-a,Y-o,a,wh+2*o); x.fillRect(X+ww+o,Y-o,a,wh+2*o)}
    x.fillStyle='#FAFAF8'; x.fillRect(X,Y,ww,wh);
    var g=x.createLinearGradient(X,Y,X+ww*.6,Y+wh); g.addColorStop(0,'#6E8B9B'); g.addColorStop(.55,'#A2B9C4'); g.addColorStop(1,'#7F9AA8');
    x.fillStyle=g; x.fillRect(X+fw,Y+fw,ww-2*fw,wh-2*fw);
    if(type!=='k'){x.fillStyle='rgba(238,236,228,.88)';var cw=ww*.17;x.fillRect(X+fw,Y+fw,cw,wh-2*fw);x.fillRect(X+ww-fw-cw,Y+fw,cw,wh-2*fw)}
    x.fillStyle='#FAFAF8'; for(var i=1;i<w[3];i++) x.fillRect(X+ww*i/w[3]-fw/2,Y,fw,wh);
    if(type==='s') x.fillRect(X,Y+wh*.28,ww,fw);
    if(type==='f'){x.fillRect(X,Y+wh*.22,ww,fw)}
    var lit=R()<.55; n.fillStyle=lit?(R()<.5?'#FFD18A':'#F2B663'):'#000'; n.fillRect((X+fw)*ns,(Y+fw)*ns,(ww-2*fw)*ns,(wh-2*fw)*ns);
  }
  function facade(sp){
    var cw=Math.round(sp.len*PX), ch=Math.round(HTOT*PX);
    var d=document.createElement('canvas'), nn=document.createElement('canvas'); d.width=cw; d.height=ch; nn.width=Math.round(cw*NS); nn.height=Math.round(ch*NS);
    var x=d.getContext('2d'), n=nn.getContext('2d'); n.fillStyle='#000'; n.fillRect(0,0,nn.width,nn.height);
    var yOf=function(h){return ch-h*PX};
    tiles(x,0,cw,0,ch,'c');
    (sp.zones||[]).forEach(function(z){var h0=z[2]===0?BASE+PL:BASE+z[2]*FH, h1=z[3]>=FLOORS-1?HTOT:BASE+(z[3]+1)*FH;
      tiles(x,z[0]*PX,(z[1]-z[0])*PX,yOf(h1),(h1-h0)*PX,z[4])});
    if(!sp.blank) (sp.axes||[]).forEach(function(a,i){
      for(var k=0;k<FLOORS;k++){
        if(a[1]==='k'&&k===FLOORS-1) continue;
        if(k===0&&(sp.skip0||[]).some(function(r){return a[0]>r[0]&&a[0]<r[1]})) continue;
        var t=a[1], w=WIN[t], sill=BASE+k*FH+w[2];
        if(t==='f'&&k===0&&!a[2]){t='s';w=WIN.s;sill=BASE+k*FH+w[2]}
        drawWin(x,n,a[0],yOf(sill+w[1]),t,sp.acc&&sp.acc[i+','+k]);
      }
    });
    brick(x,yOf(BASE+PL),cw,(BASE+PL)*PX);
    x.fillStyle='#D8D7D2'; x.fillRect(0,0,cw,.14*PX);
    var td=new T.CanvasTexture(d), tn=new T.CanvasTexture(nn);
    [td,tn].forEach(function(t){t.encoding=T.sRGBEncoding;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy())});
    var m=new T.MeshStandardMaterial({map:td,emissiveMap:tn,emissive:new T.Color(0xffffff),emissiveIntensity:0,roughness:.85}); m.userData.sp=sp; return m;
  }
  var YEL='#E2BF2E', TEAL='#1FA6AA';

  var L=32.4, WD=15.6;
  var FOOT=[[0,0],[13.55,0],[13.55,6.44],[15.6,6.44],
    [15.6,7.1],[14.2,7.1],[14.2,9.8],[15.6,9.8],[15.6,10.9],[14.2,10.9],[14.2,13.4],[15.6,13.4],
    [15.6,25.5],[14.3,25.5],[14.3,28.0],[15.6,28.0],[15.6,L],[0,L],
    [0,31.7],[2.0,31.7],[2.0,28.7],[0,28.7],
    [0,21.5],[-.85,21.5],[-.85,10.46],[0,10.46],
    [0,3.3],[1.6,3.3],[1.6,.3],[0,.3]];
  var LOGGIA=[{s:'w',z0:.3,z1:3.3,d:1.6},{s:'w',z0:28.7,z1:31.7,d:2.0},{s:'e',z0:7.1,z1:9.8,d:1.4},{s:'e',z0:10.9,z1:13.4,d:1.4},{s:'e',z0:25.5,z1:28.0,d:1.3}];
  var VEST=[13.64,18.93], NOTCH=25.96;

  var AX_W=[[1.8,'f',1],[5.0,'s'],[8.2,'s'],[12.0,'s'],[16.3,'k'],[20.0,'s'],[23.6,'s'],[27.0,'s'],[30.2,'f',1]];
  var F52W=facade({len:L,zones:[[3.6,6.9,1,5,'t'],[10.46,21.5,0,7,'w'],[22.0,26.0,4,7,'t'],[29.4,L,0,1,'t']],axes:AX_W,ac:[6.6,9.7,25.2,28.0],acc:{'2,1':TEAL,'6,5':YEL},skip0:[[13,19.5]]});
  var F51W=facade({len:L,zones:[[3.6,6.9,0,7,'t'],[10.46,21.5,0,7,'w'],[22.0,26.0,0,1,'t'],[28.6,L,0,7,'t']],axes:AX_W,ac:[6.6,25.2,28.0],acc:{'7,6':TEAL,'1,4':YEL},skip0:[[13,19.5]]});
  var F4W=facade({len:L,zones:[[6.6,9.8,0,7,'t'],[10.46,21.5,0,7,'w'],[25.0,28.4,2,7,'t']],axes:AX_W,ac:[6.6,9.7,25.2],acc:{'6,3':YEL,'2,6':TEAL},skip0:[[13,19.5]]});
  var e=L/33.2;
  var FE=facade({len:L,zones:[[0,3.4,0,1,'t'],[8.0,11.4,4,7,'t'],[12.0,18.4,0,7,'w'],[NOTCH,L,0,7,'w'],[22.6,25.9,0,7,'t']],
    axes:[[1.8*e,'s'],[5.4*e,'f',1],[9.0*e,'s'],[12.6*e,'s'],[16.6*e,'s'],[20.6*e,'f',1],[24.2*e,'s'],[27.8*e,'s'],[31.4*e,'s']],
    ac:[3.3,10.4,14.0,17.9,29.5],acc:{'3,5':YEL,'7,2':TEAL}});
  var FB=facade({len:WD,blank:true});
  var emissives=[F52W,F51W,F4W,FE];

  function sectionGeom(X0,Z0,yb){
    var sh=new T.Shape(); FOOT.forEach(function(p,i){var px=X0+p[0], py=-(Z0+p[1]); i?sh.lineTo(px,py):sh.moveTo(px,py)});
    var g=new T.ExtrudeGeometry(sh,{depth:HTOT,bevelEnabled:false}); g.rotateX(-Math.PI/2); g.translate(0,yb,0);
    if(g.index) g=g.toNonIndexed();
    var p=g.attributes.position, buckets=[[],[],[],[]], a=new T.Vector3(), b=new T.Vector3(), c=new T.Vector3(), nrm=new T.Vector3(), t2=new T.Vector3();
    for(var t=0;t<p.count/3;t++){a.fromBufferAttribute(p,t*3);b.fromBufferAttribute(p,t*3+1);c.fromBufferAttribute(p,t*3+2);
      nrm.subVectors(b,a).cross(t2.subVectors(c,a)).normalize();
      var gi=Math.abs(nrm.y)>.5?0:(nrm.x<-.7?1:(nrm.x>.7?2:3)); buckets[gi].push(a.clone(),b.clone(),c.clone())}
    var pos=[], uv=[], out=new T.BufferGeometry(), start=0;
    buckets.forEach(function(list,gi){list.forEach(function(v){pos.push(v.x,v.y,v.z);
        var u,vv=(v.y-yb)/HTOT;
        if(gi===0){u=v.x/8;vv=v.z/8} else if(gi===1){u=(v.z-Z0)/L} else if(gi===2){u=(Z0+L-v.z)/L} else {u=(v.x-X0)/WD}
        uv.push(u,vv)});
      out.addGroup(start,list.length,gi); start+=list.length});
    out.setAttribute('position',new T.Float32BufferAttribute(pos,3)); out.setAttribute('uv',new T.Float32BufferAttribute(uv,2)); out.computeVertexNormals();
    return out;
  }

  var tmpM=new T.Matrix4(), tmpQ=new T.Quaternion(), tmpS=new T.Vector3(), tmpP=new T.Vector3(), UNIT=new T.BoxGeometry(1,1,1), YAX=new T.Vector3(0,1,0);
  function inst(list,material,geo,shadow){ if(!list.length) return null;
    var m=new T.InstancedMesh(geo||UNIT,material,list.length);
    list.forEach(function(b,i){tmpP.set(b[0],b[1],b[2]);tmpS.set(b[3],b[4],b[5]);tmpQ.setFromAxisAngle(YAX,b[6]||0);tmpM.compose(tmpP,tmpQ,tmpS);m.setMatrixAt(i,tmpM)});
    m.castShadow=shadow!==false; m.receiveShadow=true; scene.add(m); return m}
  function box(x0,x1,y0,y1,z0,z1,material,shadow){var m=new T.Mesh(new T.BoxGeometry(x1-x0,y1-y0,z1-z0),material);m.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2);m.castShadow=shadow!==false;m.receiveShadow=true;scene.add(m);return m}
  var plc=document.createElement('canvas'); plc.width=256; plc.height=64; brick(plc.getContext('2d'),0,256,64,48);
  var plTex=new T.CanvasTexture(plc); plTex.encoding=T.sRGBEncoding; plTex.wrapS=plTex.wrapT=T.RepeatWrapping; plTex.repeat.set(1.2,1.2);
  var plMat=new T.MeshStandardMaterial({map:plTex,roughness:.95});

  var SEC=[{h:4,n:1,X0:-7.5,Z0:-96.8,west:F4W},{h:4,n:2,X0:-7.5,Z0:-64.4,west:F4W},{h:5,n:1,X0:-6.7,Z0:-32.0,west:F51W},{h:5,n:2,X0:-5.9,Z0:.4,west:F52W}];
  var occ=[], ac=[], parapets=[], slabs=[], railPosts=[], railBars=[], frames=[], steps=[], soffits=[], vents=[], caps=[];
  SEC.forEach(function(s){
    var X0=s.X0, Z0=s.Z0, fl=f(Z0+L/2)+1.8, yb=fl-BASE, rt=yb+HTOT; s.fl=fl;
    var mesh=new T.Mesh(sectionGeom(X0,Z0,yb),[mat.roof,s.west,FE,FB]); mesh.castShadow=mesh.receiveShadow=true; scene.add(mesh); occ.push(mesh);
    LOGGIA.forEach(function(l){var xo=l.s==='w'?X0:X0+WD, xi=l.s==='w'?X0+l.d:X0+WD-l.d, z0=Z0+l.z0, z1=Z0+l.z1;
      for(var k=1;k<=FLOORS;k++){var y=fl+k*FH; slabs.push([(xo+xi)/2,y-.1,(z0+z1)/2,Math.abs(xi-xo),.2,z1-z0]);
        if(k<FLOORS) parapets.push([xo+(l.s==='w'?.08:-.08),y+.5,(z0+z1)/2,.16,1.0,z1-z0])}
      parapets.push([xo+(l.s==='w'?.08:-.08),fl+.5,(z0+z1)/2,.16,1.0,z1-z0]);
    });
    s.west.userData.sp.ac.forEach(function(u){var z=Z0+u; for(var k=0;k<FLOORS;k++) ac.push([X0-.24,fl+k*FH+1.7,z,.48,.78,1.0])});
    FE.userData.sp.ac.forEach(function(u){var z=Z0+L-u, xw=u>NOTCH?X0+13.55:X0+WD; for(var k=0;k<FLOORS;k++) ac.push([xw+.24,fl+k*FH+1.7,z,.48,.78,1.0])});
    var pts=FOOT.map(function(p){return [X0+p[0],Z0+p[1]]});
    for(var i=0;i<pts.length;i++){var a=pts[i], b=pts[(i+1)%pts.length], dx=b[0]-a[0], dz=b[1]-a[1], len=Math.hypot(dx,dz); if(len<.5) continue;
      var ang=Math.atan2(-dz,dx); railBars.push([(a[0]+b[0])/2,rt+1.1,(a[1]+b[1])/2,len,.06,.06,ang]); railBars.push([(a[0]+b[0])/2,rt+.55,(a[1]+b[1])/2,len,.035,.035,ang]);
      for(var t=0;t<=len;t+=1.5) railPosts.push([a[0]+dx*t/len,rt+.55,a[1]+dz*t/len,.05,1.1,.05])}
    [[3.5,5],[3.5,26],[11.5,9.5],[11.5,22],[7.5,4],[7.5,29]].forEach(function(v){vents.push([X0+v[0],rt+.6,Z0+v[1],.8,1.2,.8]);caps.push([X0+v[0],rt+1.25,Z0+v[1],1.15,.1,1.15])});
    box(X0+1.2,X0+4.6,rt-.3,rt+2.6,Z0+14.0,Z0+18.6,mat.tile);
    var xw=X0-.85, vz0=Z0+VEST[0], vz1=Z0+VEST[1], ze=(vz0+vz1)/2, lb=fl-.75, vd=1.6, vt=fl+2.1, vw=vz1-vz0;
    box(xw-vd-.3,xw,Math.min(f(ze),lb)-.8,lb,vz0-.2,vz1+.2,mat.pave2);
    box(xw-vd,xw,lb,vt,vz0,vz1,mat.glass,false);
    for(var j=0;j<=4;j++) frames.push([xw-vd,(lb+vt)/2,vz0+vw*j/4,.09,vt-lb,.09]);
    frames.push([xw-vd/2,(lb+vt)/2,vz0,vd,vt-lb,.09]); frames.push([xw-vd/2,(lb+vt)/2,vz1,vd,vt-lb,.09]);
    [lb+.05,lb+2.25,vt].forEach(function(y){frames.push([xw-vd,y,ze,.09,.09,vw])});
    box(xw-vd-.03,xw-vd+.05,lb+.05,lb+2.25,ze-.65,ze+.65,mat.door,false);
    box(xw-vd-.6,xw,vt,vt+.3,vz0-.4,vz1+.4,mat.white);
    for(var sl=0;sl<8;sl++) soffits.push([xw-vd-.45+sl*(vd+.4)/8,vt-.02,ze,.08,.05,vw+.6]);
    var sc=document.createElement('canvas'); sc.width=512; sc.height=64; var sx=sc.getContext('2d');
    sx.fillStyle='#F3F2EE'; sx.fillRect(0,0,512,64); sx.fillStyle='#3A3F42'; sx.font='600 30px Arial, sans-serif'; sx.textAlign='center'; sx.textBaseline='middle'; sx.fillText('Подъезд №'+s.n,256,34);
    var stx=new T.CanvasTexture(sc); stx.encoding=T.sRGBEncoding;
    var smat=new T.MeshStandardMaterial({map:stx,emissiveMap:stx,emissive:new T.Color(0xffffff),emissiveIntensity:0}); emissives.push(smat);
    var sign=new T.Mesh(new T.PlaneGeometry(2.0,.24),smat); sign.position.set(xw-vd-.61,vt+.15,ze); sign.rotation.y=-Math.PI/2; scene.add(sign);
    var lamp=new T.Mesh(new T.PlaneGeometry(1.4,.6),new T.MeshBasicMaterial({color:C('#FFE2A8')})); lamp.rotation.x=Math.PI/2; lamp.position.set(xw-vd/2-.2,vt-.04,ze); lamp.visible=false; scene.add(lamp); s.lamp=lamp;
    var sz0=vz1+.1, sz1=sz0+3.0, drop=Math.max(.3,lb-f(sz1)), nst=Math.max(2,Math.round(drop/.15));
    for(var st=0;st<nst;st++) steps.push([xw-.9,lb-drop*(st+1)/nst+.075,sz0+(sz1-sz0)*(st+.5)/nst,1.6,drop/nst+.02,(sz1-sz0)/nst]);
    box(xw-1.95,xw-1.7,f(sz1)-.3,lb+.9,sz0,sz1,plMat);
    var gc=new T.Mesh(new T.BoxGeometry(2.0,.04,3.0),mat.canopyGlass); gc.position.set(xw-1.0,lb+2.5,(sz0+sz1)/2); gc.rotation.z=-.16; scene.add(gc);
    frames.push([xw-1.95,lb+1.25,sz1-.05,.07,2.4,.07]); frames.push([xw-1.95,lb+2.42,(sz0+sz1)/2,.06,.06,3.0]);
    s.entry=[xw-vd-.3,ze]; s.entryPos=new T.Vector3(xw-vd-.3,vt+1.1,ze);
  });
  var acMesh=inst(ac,(function(){var c=document.createElement('canvas');c.width=64;c.height=64;var x=c.getContext('2d');x.fillStyle='#8D7C71';x.fillRect(0,0,64,64);x.fillStyle='#6F6158';for(var i=6;i<60;i+=6)x.fillRect(5,i,54,2.5);x.strokeStyle='#A49488';x.lineWidth=5;x.strokeRect(2.5,2.5,59,59);var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;return new T.MeshStandardMaterial({map:t,roughness:.7})})());
  inst(slabs,mat.slab); inst(parapets,mat.tile);
  [F52W,F51W,F4W,FE,FB,mat.roof,mat.tile,mat.slab,mat.rail,mat.vent,mat.frame,mat.glass,mat.canopyGlass,mat.white,mat.door,mat.soffit,mat.clay,mat.shop,plMat,acMesh.material].forEach(function(m){m.fog=false});
  inst(railPosts,mat.rail,null,false); inst(railBars,mat.rail,null,false); inst(vents,mat.vent); inst(caps,mat.vent);
  inst(frames,mat.frame,null,false); inst(steps,mat.pave2); inst(soffits,mat.soffit,null,false);

  /* ================= КВАРТИРЫ: КОНФИГ И МАРКЕРЫ ================= */
  var APT_POS_Z = [
    [0.4, 3.6], [3.6, 9.0], [9.0, 13.5],
    [13.5, 19.0], [19.0, 22.5], [22.5, 28.0], [28.0, 31.9]
  ];
  var accent=getComputedStyle(root).getPropertyValue('--skh-accent').trim()||'#F16041';
  var COL_BRASS=C(accent), COL_HOVER=C('#FF947C'), COL_DIM=C('#9A806F');
  var aptGroup=new T.Group(); scene.add(aptGroup);
  var aptMeshes=[];
  function getSection(h,s){for(var i=0;i<SEC.length;i++)if(SEC[i].h===h&&SEC[i].n===s)return SEC[i];return null}
  
  APT_LIST.forEach(function(a,idx){
    var sec=getSection(a.h,a.s); if(!sec)return;
    var pz=APT_POS_Z[a.p-1]; if(!pz)return;
    var w=pz[1]-pz[0], h=Math.max(0.3, FH-0.1), d=0.4;
    var y=sec.fl+(a.f-1)*FH+FH/2;
    var zc=sec.Z0+(pz[0]+pz[1])/2;
    var x=sec.X0-d/2-.04-(pz[0]<21.5&&pz[1]>10.46?.85:0);
    
    var geom = new T.BoxGeometry(d, h, w);
    var mat = new T.MeshBasicMaterial({
      color: COL_BRASS.clone(), transparent: true, opacity: 0.25,
      depthWrite: false, side: T.DoubleSide
    });
    var mesh = new T.Mesh(geom, mat);
    mesh.position.set(x, y, zc);
    
    var edgesGeom = new T.EdgesGeometry(geom);
    var edgesMat = new T.LineBasicMaterial({ color: COL_BRASS, linewidth: 2 });
    var lines = new T.LineSegments(edgesGeom, edgesMat);
    mesh.add(lines);
    
    mesh.userData.aptIdx=idx;
    mesh.userData.house=a.h;
    mesh.userData.aptData=a;
    mesh.userData.pulseSeed=Math.random()*Math.PI*2;
    aptGroup.add(mesh); aptMeshes.push(mesh);
  });

  /* ================= ОБЩЕСТВЕННОЕ ЗДАНИЕ ================= */
  (function(){var pts=[[-5.9,32.8],[8.27,32.8],[9.12,50.6],[-9.30,54.8],[-12.68,41.1],[-5.06,39.3]];
    var cx=0,cz=0; pts.forEach(function(p){cx+=p[0]/pts.length;cz+=p[1]/pts.length});
    function shp(k){var sh=new T.Shape(); pts.forEach(function(p,i){var x=cx+(p[0]-cx)*k, z=cz+(p[1]-cz)*k; i?sh.lineTo(x,-z):sh.moveTo(x,-z)}); return sh}
    var gy=f(41)-1.2, hh=12.2;
    var g=new T.ExtrudeGeometry(shp(.992),{depth:hh,bevelEnabled:false}); g.rotateX(-Math.PI/2);
    var mm=new T.Mesh(g,[mat.roof,mat.clay]); mm.position.y=gy; mm.castShadow=mm.receiveShadow=true; scene.add(mm); occ.push(mm);
    var g2=new T.ExtrudeGeometry(shp(1),{depth:3.0,bevelEnabled:false}); g2.rotateX(-Math.PI/2);
    var gm=new T.Mesh(g2,mat.shop); gm.position.y=gy+.6; scene.add(gm);
  })();

  /* ================= ОСТАЛЬНЫЕ ДОМА ================= */
  var simpleTex=(function(){
    var sc=12, bw=3.6, cw=Math.round(bw*3*sc), hb=HTOT, ch=Math.round(hb*sc), d=document.createElement('canvas'), nn=document.createElement('canvas');
    d.width=cw; d.height=ch; nn.width=cw; nn.height=ch; var x=d.getContext('2d'), n=nn.getContext('2d'); n.fillStyle='#000'; n.fillRect(0,0,cw,ch);
    tiles(x,0,cw,0,ch,'c',sc); tiles(x,2*bw*sc,bw*sc,0,ch-(BASE+PL)*sc,'t',sc);
    for(var b=0;b<3;b++)for(var k=0;k<FLOORS;k++){var y=ch-(BASE+k*FH+.75+1.85)*sc; drawWin(x,n,(b+.5)*bw,y,'s',null,sc,1)}
    brick(x,ch-(BASE+PL)*sc,cw,(BASE+PL)*sc,sc); x.fillStyle='#D8D7D2'; x.fillRect(0,0,cw,2);
    var td=new T.CanvasTexture(d), tn=new T.CanvasTexture(nn); [td,tn].forEach(function(t){t.encoding=T.sRGBEncoding;t.wrapS=T.RepeatWrapping});
    var m=new T.MeshStandardMaterial({map:td,emissiveMap:tn,emissive:new T.Color(0xffffff),emissiveIntensity:0,roughness:.85}); emissives.push(m); return m})();
  var shopMat=mat.shop;
  function boxUV(w,h,d,unit){var g=new T.BoxGeometry(w,h,d), uv=g.attributes.uv;
    var fw=[d,d,w,w,w,w]; for(var fi=0;fi<6;fi++){if(fi===2||fi===3) continue; for(var v=0;v<4;v++){var idx=fi*4+v; uv.setX(idx,uv.getX(idx)*fw[fi]/unit)}}
    return g}
  function simpleHouse(cx,cy,len,dep,ang,opt){opt=opt||{};
    var c=PW(cx,cy), Lm=len*S, Dm=dep*S, fl=f(c[1])+1.8, yb=fl-BASE, a=ang*Math.PI/180;
    if(opt.low){var hh=opt.low, m1=new T.Mesh(new T.BoxGeometry(Lm,hh+2,Dm),[shopMat,shopMat,mat.roof2,mat.roof2,shopMat,shopMat]);
      m1.position.set(c[0],f(c[1])-1+(hh+2)/2,c[1]); m1.rotation.y=-a; m1.castShadow=m1.receiveShadow=true; scene.add(m1); occ.push(m1);
      var cap=new T.Mesh(new T.BoxGeometry(Lm+.2,.5,Dm+.2),mat.clay); cap.position.set(c[0],f(c[1])+hh+1,c[1]); cap.rotation.y=-a; scene.add(cap); return}
    var g=boxUV(Lm,HTOT,Dm,10.8), m=new T.Mesh(g,[simpleTex,simpleTex,mat.roof2,mat.roof2,simpleTex,simpleTex]);
    m.position.set(c[0],yb+HTOT/2,c[1]); m.rotation.y=-a; m.castShadow=m.receiveShadow=true; scene.add(m); occ.push(m);
    var pb=new T.Mesh(new T.BoxGeometry(Lm-.05,4,Dm-.05),plMat); pb.position.set(c[0],yb-2,c[1]); pb.rotation.y=-a; scene.add(pb);
  }
  simpleHouse(469,329,574,60,-16.6); simpleHouse(452,282,574,40,-16.6,{low:4.2});
  simpleHouse(120,412,120,55,-10,{low:4.2});
  simpleHouse(118,497,85,145,-5); simpleHouse(150,635,85,140,-5);
  simpleHouse(284,800,230,70,-12);
  simpleHouse(515,487,85,135,-8); simpleHouse(552,622,90,135,-8);
  simpleHouse(682,447,90,145,-8);
  simpleHouse(672,918,335,65,-8.6);
  simpleHouse(330,985,228,75,-9);

  /* ================= ОКРУЖЕНИЕ ================= */
  (function(){var bg=M('#DCD9D2'), bgR=M('#9A9D9E'), RB=rng(31);
    function blk(x,z,w,d,h,a){var m=new T.Mesh(new T.BoxGeometry(w,h,d),[bg,bg,bgR,bgR,bg,bg]); m.position.set(x,f(z)+h/2-1,z); m.rotation.y=a||0; m.receiveShadow=true; scene.add(m)}
    var mt=PW(-160,1190); blk(mt[0],mt[1],92,76,11,.17);
    for(var i=0;i<14;i++){blk(-150-RB()*170,-200+RB()*330,14+RB()*12,40+RB()*40,9+Math.floor(RB()*7)*3,.2)}
    for(var j=0;j<10;j++){blk(-120+RB()*260,150+RB()*130,40+RB()*40,14+RB()*8,9+Math.floor(RB()*7)*3,.15)}
    for(var k=0;k<10;k++){var q=PW(150+k*95,-40-RB()*60); blk(q[0],q[1]-30-RB()*40,30+RB()*30,14,15+Math.floor(RB()*4)*3,.2)}
  })();

  /* ================= БЛАГОУСТРОЙСТВО ================= */
  function drape(x0,x1,z0,z1,material,lift){
    var g=new T.PlaneGeometry(x1-x0,z1-z0,1,Math.max(1,Math.round((z1-z0)/3)));
    g.rotateX(-Math.PI/2); g.translate((x0+x1)/2,0,(z0+z1)/2);
    var p=g.attributes.position; for(var i=0;i<p.count;i++) p.setY(i,f(p.getZ(i))+(lift||0));
    g.computeVertexNormals(); var m=new T.Mesh(g,material); m.receiveShadow=true; scene.add(m); return m}
  function pad(cx,cy,w,d,ang,material,lift){
    var c=PW(cx,cy), Wm=w*S, Dm=d*S, g=new T.PlaneGeometry(Wm,Dm,Math.max(1,Math.round(Wm/6)),Math.max(1,Math.round(Dm/6)));
    g.rotateX(-Math.PI/2); g.rotateY(-ang*Math.PI/180); g.translate(c[0],0,c[1]);
    var p=g.attributes.position; for(var i=0;i<p.count;i++) p.setY(i,f(p.getZ(i))+(lift||0));
    g.computeVertexNormals(); var m=new T.Mesh(g,material); m.receiveShadow=true; scene.add(m); return m}
  (function(){var m=drape(-420,320,-360,340,mat.lawn,0),uv=m.geometry.attributes.uv;for(var i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*740/4,uv.getY(i)*700/4)})();
  pad(560,132,2600,90,-11.7,mat.road,.05); pad(560,180,2600,14,-11.7,mat.pave,.06); pad(560,84,2600,14,-11.7,mat.pave,.06);
  pad(110,640,28,900,-4,mat.asph,.04); pad(640,880,800,26,-9,mat.asph,.04); pad(470,382,600,24,-16.6,mat.asph,.04);
  pad(640,822,300,58,-12,mat.asph,.045); pad(465,262,520,30,-16.6,mat.asph,.045); pad(170,880,60,140,-6,mat.asph,.045);
  function wdrape(x0,x1,z0,z1,material,lift,tile){var m=drape(x0,x1,z0,z1,material,lift); if(tile){var uv=m.geometry.attributes.uv; for(var i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*(x1-x0)/tile,uv.getY(i)*(z1-z0)/tile)} return m}
  function wpad(x,z,w,d,ang,material,lift,tile){var g=new T.PlaneGeometry(w,d,Math.max(1,Math.round(w/5)),Math.max(1,Math.round(d/5)));
    if(tile){var uv=g.attributes.uv; for(var i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*w/tile,uv.getY(i)*d/tile)}
    g.rotateX(-Math.PI/2); g.rotateY(-ang*Math.PI/180); g.translate(x,0,z); var p=g.attributes.position; for(var j=0;j<p.count;j++) p.setY(j,f(p.getZ(j))+(lift||0));
    g.computeVertexNormals(); var m=new T.Mesh(g,material); m.receiveShadow=true; scene.add(m); return m}
  var curbs=[];
  wdrape(-19.1,-13.8,-121,64,mat.asph,.05);
  for(var cz=-121;cz<64;cz+=4){curbs.push([-13.75,f(cz+2)+.12,cz+2,.18,.18,4]);curbs.push([-19.15,f(cz+2)+.12,cz+2,.18,.18,4])}
  wdrape(-31.6,-19.1,-101,34,mat.eco,.055,2);
  wdrape(-37.8,-31.6,-121,34,mat.asph,.05);
  wdrape(-26.3,-24.5,-101,34,mat.lawn2,.07,4);
  wdrape(-12,10,-106.7,-98.2,mat.eco,.05,2);
  wdrape(-19.1,-13.8,-128,-119,mat.asph,.05);
  wdrape(-14,10.5,32.6,58,mat.slabs,.045,2.4);
  wdrape(-13.6,2,58.8,61.4,mat.eco,.05,2);
  wdrape(13,18.5,-128,72,mat.gravel,.04);
  SEC.forEach(function(s){var X0=s.X0, Z0=s.Z0, ze=Z0+(VEST[0]+VEST[1])/2;
    wdrape(X0-2.2,X0,Z0,Z0+L,mat.slabs,.06,2.4);
    wdrape(X0-5.2,X0-2.2,Z0+11.5,Z0+23.2,mat.slabs,.065,2.4);
    wdrape(-13.8,X0-5.2,ze-1.1,ze+1.1,mat.slabs,.065,2.4);
    wdrape(X0+WD,X0+WD+1.6,Z0,Z0+L,mat.pave2,.06);
  });
  wdrape(-31,-23,-118,-113.5,mat.slabs,.06,2.4);
  [[-29.5],[-27.4],[-25.3]].forEach(function(c){box(c[0]-.8,c[0]+.8,f(-115.8),f(-115.8)+1.4,-116.6,-115,M('#3F6A4E'))});
  box(-31,-23,f(-118),f(-118)+1.8,-118.1,-117.9,M('#8E7B6E')); box(-31.1,-30.9,f(-116),f(-116)+1.8,-118,-113.5,M('#8E7B6E')); box(-23.1,-22.9,f(-116),f(-116)+1.8,-118,-113.5,M('#8E7B6E'));
  wpad(-30,26.5,25,13,-12,mat.eco,.055,2);
  [[469,329,600,90,-16.6],[118,565,120,300,-5],[284,800,260,100,-12],[533,555,130,300,-8],[682,447,120,175,-8],[672,918,365,95,-8.6],[330,985,258,105,-9]]
    .forEach(function(r){pad(r[0],r[1],r[2],r[3],r[4],mat.pave,.035)});
  pad(335,590,225,255,-8,mat.pave,.06);
  var fieldTex=(function(){var c=document.createElement('canvas');c.width=256;c.height=400;var x=c.getContext('2d');x.fillStyle='#B95A41';x.fillRect(0,0,256,400);
    x.strokeStyle='#F4F1EA';x.lineWidth=4;x.strokeRect(14,14,228,372);x.beginPath();x.moveTo(14,200);x.lineTo(242,200);x.stroke();x.beginPath();x.arc(128,200,40,0,7);x.stroke();
    x.strokeRect(68,14,120,56);x.strokeRect(68,330,120,56);var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;return t})();
  pad(335,567,92,148,-8,new T.MeshStandardMaterial({map:fieldTex,roughness:.9}),.09);
  pad(262,590,48,190,-8,mat.rubber2,.08); pad(410,585,48,190,-8,mat.rubber3,.08);
  pad(690,630,118,210,-8,mat.pave,.06); pad(690,600,92,122,-8,mat.rubber,.08); pad(600,720,60,40,-8,mat.rubber2,.08);
  var parts={red:[],blue:[],yellow:[],green:[],wood:[],metal:[],white:[],sand:[]}, cyl=[];
  function P(cx,cy,ang,dx,dz,y0,w,h,d,m,rot){var q=local(cx,cy,ang,dx,dz); parts[m].push([q[0],f(q[1])+y0+h/2,q[1],w,h,d,-ang*Math.PI/180+(rot||0)])}
  [-15.6,15.6].forEach(function(dz){P(335,567,-8,-1.6,dz,0,.1,2,.1,'white');P(335,567,-8,1.6,dz,0,.1,2,.1,'white');P(335,567,-8,0,dz,1.95,3.3,.1,.1,'white')});
  var fp=[]; (function(){var hw=10.6,hd=17.1; for(var t=-hd;t<=hd;t+=2.5){[-hw,hw].forEach(function(dx){var q=local(335,567,-8,dx,t);fp.push([q[0],f(q[1])+1.5,q[1],.07,3,.07])})}
    for(var t2=-hw;t2<=hw;t2+=2.5){[-hd,hd].forEach(function(dz){var q=local(335,567,-8,t2,dz);fp.push([q[0],f(q[1])+1.5,q[1],.07,3,.07])})}
    [[-hw,0,.04,2*hd],[hw,0,.04,2*hd],[0,-hd,2*hw,.04],[0,hd,2*hw,.04]].forEach(function(r){var q=local(335,567,-8,r[0],r[1]);
      var m=new T.Mesh(new T.BoxGeometry(r[2],2.9,r[3]),mat.fence); m.position.set(q[0],f(q[1])+1.5,q[1]); m.rotation.y=8*Math.PI/180; scene.add(m)})})();
  inst(fp,mat.metal,null,false);
  function tower(cx,cy,ang,dx,dz,col){P(cx,cy,ang,dx,dz,0,.12,2.6,.12,'metal');P(cx,cy,ang,dx+1.6,dz,0,.12,2.6,.12,'metal');P(cx,cy,ang,dx,dz+1.6,0,.12,2.6,.12,'metal');P(cx,cy,ang,dx+1.6,dz+1.6,0,.12,2.6,.12,'metal');
    P(cx,cy,ang,dx+.8,dz+.8,1.2,1.8,.12,1.8,'wood'); P(cx,cy,ang,dx+.8,dz+.8,2.6,2.0,.5,2.0,col); P(cx,cy,ang,dx+.8,dz+3.0,.2,.9,.14,2.8,col,0)}
  function swing(cx,cy,ang,dx,dz){[-1.4,1.4].forEach(function(o){P(cx,cy,ang,dx+o,dz,0,.12,2.3,.12,'metal')});P(cx,cy,ang,dx,dz,2.25,3.0,.12,.12,'metal');
    [-.6,.6].forEach(function(o){P(cx,cy,ang,dx+o,dz,.5,.5,.08,.25,'red')})}
  tower(262,590,-8,-2.5,-15,'red'); swing(262,590,-8,0,-4); tower(262,590,-8,-2,4,'blue');
  P(262,590,-8,0,14,0,3.2,.3,3.2,'wood'); P(262,590,-8,0,14,.05,2.8,.2,2.8,'sand');
  [-12,-8,-4].forEach(function(dz,i){P(410,585,-8,-1,dz,0,.1,2.4,.1,'metal');P(410,585,-8,1,dz,0,.1,2.4,.1,'metal');P(410,585,-8,0,dz,2.3-i*.3,2.1,.08,.08,'metal')});
  tower(410,585,-8,-1.5,5,'yellow'); swing(410,585,-8,0,14);
  tower(690,600,-8,-6,-8,'green'); tower(690,600,-8,3,-4,'red'); swing(690,600,-8,-3,7); P(690,600,-8,5,8,0,2.6,.3,2.6,'wood'); P(690,600,-8,5,8,.05,2.2,.2,2.2,'sand');
  [[335,590,-8,-12,-26],[335,590,-8,12,-26],[335,590,-8,-12,26],[335,590,-8,12,26],[690,630,-8,-11,18],[690,630,-8,11,18],[600,720,-8,0,6]].forEach(function(b){P(b[0],b[1],b[2],b[3],b[4],.45,1.8,.08,.5,'wood');P(b[0],b[1],b[2],b[3],b[4],0,1.6,.45,.08,'metal')});
  Object.keys(parts).forEach(function(k){inst(parts[k],k==='wood'?mat.wood:k==='metal'?mat.metal:k==='white'?mat.white:k==='sand'?mat.sand:mat[k])});

  var stripes=[], dis=[]; for(var zz=-100;zz<=33;zz+=2.6){stripes.push([-21.7,f(zz)+.08,zz,5.2,.03,.14]);stripes.push([-29.0,f(zz)+.08,zz,5.2,.03,.14])}
  [-87.0,-84.4,-47.4,-44.8,-6.6,-4.0,14.2,16.8].forEach(function(z){dis.push([-21.7,f(z)+.075,z,5.0,.02,2.4])});
  inst(stripes,mat.curb,null,false); inst(dis,mat.disabled,null,false); inst(curbs,mat.curb,null,false);

  function mergeGeos(gs){var pos=[],nor=[],uv=[],col=[],hasC=gs.every(function(g){return g.attributes.color});
    gs.forEach(function(g){g=g.index?g.toNonIndexed():g; var p=g.attributes.position,n=g.attributes.normal,u=g.attributes.uv,c=g.attributes.color;
      for(var i=0;i<p.count;i++){pos.push(p.getX(i),p.getY(i),p.getZ(i));nor.push(n.getX(i),n.getY(i),n.getZ(i));uv.push(u?u.getX(i):0,u?u.getY(i):0);if(hasC)col.push(c.getX(i),c.getY(i),c.getZ(i))}});
    var o=new T.BufferGeometry(); o.setAttribute('position',new T.Float32BufferAttribute(pos,3)); o.setAttribute('normal',new T.Float32BufferAttribute(nor,3)); o.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
    if(hasC) o.setAttribute('color',new T.Float32BufferAttribute(col,3)); return o}
  function bx(w,h,d,x,y,z){var g=new T.BoxGeometry(w,h,d); g.translate(x,y,z); return g}
  function prof(pts,depth,bev){var sh=new T.Shape(); pts.forEach(function(p,i){i?sh.lineTo(p[0],p[1]):sh.moveTo(p[0],p[1])});
    var g=new T.ExtrudeGeometry(sh,{depth:depth,bevelEnabled:!!bev,bevelSize:bev||0,bevelThickness:bev||0,bevelSegments:2,curveSegments:4}); g.translate(0,0,-depth/2); g.computeVertexNormals(); return g}
  function carTemplate(p){
    var L=p.L, W=p.W, h=L/2, gw=W-.26;
    var lower=prof([[-h+.06,p.bot],[h-.12,p.bot],[h,p.bot+.2],[h-.03,p.hood],[p.gf,p.belt],[p.gr,p.belt+.02],[-h+.08,p.deck],[-h,p.deck-.3],[-h+.03,p.bot+.1]],W-.08,.04);
    var glass=prof([[p.gf,p.belt-.03],[p.rf,p.roof],[p.rr,p.roof],[p.gr,p.belt-.01]],gw,0);
    var roof=bx(p.rf-p.rr+.06,.07,gw+.06,(p.rf+p.rr)/2,p.roof+.03,0);
    var bp=bx(.11,p.roof-p.belt,gw+.03,(p.rf+p.rr)/2-.15,(p.roof+p.belt)/2,0);
    var rails=p.suv?[bx(p.rf-p.rr-.3,.05,.05,(p.rf+p.rr)/2,p.roof+.1,gw/2-.12),bx(p.rf-p.rr-.3,.05,.05,(p.rf+p.rr)/2,p.roof+.1,-gw/2+.12)]:[];
    var dark=[bx(L-.3,.16,W+.02,0,p.bot+.06,0),bx(.05,.16,W*.46,h-.01,p.bot+.26,0),bx(.08,.12,W*.9,h-.04,p.bot+.03,0),bx(.08,.12,W*.9,-h+.04,p.bot+.03,0)];
    var wheels=[], hubs=[];
    [[p.wb,1],[p.wb,-1],[-p.wb,1],[-p.wb,-1]].forEach(function(w){var t=new T.CylinderGeometry(p.wr,p.wr,.24,18); t.rotateX(Math.PI/2); t.translate(w[0],p.wr,w[1]*(W/2-.13)); wheels.push(t);
      var hb=new T.CylinderGeometry(p.wr*.58,p.wr*.58,.25,12); hb.rotateX(Math.PI/2); hb.translate(w[0],p.wr,w[1]*(W/2-.12)); hubs.push(hb)});
    var head=[bx(.06,.11,.34,h-.02,p.hood-.09,W/2-.28),bx(.06,.11,.34,h-.02,p.hood-.09,-W/2+.28)];
    var tail=[bx(.06,.12,.36,-h+.01,p.deck-.12,W/2-.26),bx(.06,.12,.36,-h+.01,p.deck-.12,-W/2+.26)];
    var plates=[bx(.03,.11,.5,h+.01,p.bot+.19,0),bx(.03,.11,.5,-h-.01,p.bot+.28,0)];
    var mirrors=[bx(.14,.1,.16,p.gf-.12,p.belt+.08,W/2+.04),bx(.14,.1,.16,p.gf-.12,p.belt+.08,-W/2-.04)];
    return {paint:mergeGeos([lower,roof,bp].concat(mirrors)),glass:glass,dark:mergeGeos(dark.concat(wheels).concat(rails)),hub:mergeGeos(hubs),head:mergeGeos(head),tail:mergeGeos(tail),plate:mergeGeos(plates)};
  }
  var CARS=[
    carTemplate({L:4.6,W:1.8,bot:.3,hood:.8,belt:.95,deck:.93,gf:.95,gr:-1.55,rf:.22,rr:-.95,roof:1.42,wr:.32,wb:1.38}),
    carTemplate({L:4.15,W:1.78,bot:.3,hood:.8,belt:.96,deck:.99,gf:.9,gr:-1.98,rf:.18,rr:-1.72,roof:1.47,wr:.31,wb:1.25}),
    carTemplate({L:4.65,W:1.88,bot:.4,hood:.98,belt:1.1,deck:1.08,gf:.95,gr:-2.2,rf:.18,rr:-1.98,roof:1.7,wr:.38,wb:1.42,suv:1})
  ];
  var paintCols=['#F2F2F0','#1C1F22','#A9AFB3','#7A2A26','#24456E','#D8D6CF','#5E6366','#2F4F3E','#C7C2B4'];
  var paintMats=paintCols.map(function(c){return M(c,{roughness:.32,metalness:.25})});
  var carMat={glass:M('#2B3A44',{roughness:.08,metalness:.55}),dark:M('#1E2124',{roughness:.7}),hub:M('#B9BEC2',{roughness:.3,metalness:.7}),
    head:new T.MeshStandardMaterial({color:C('#EEF2F4'),emissive:C('#FFF4D6'),emissiveIntensity:0,roughness:.2}),
    tail:new T.MeshStandardMaterial({color:C('#A3201C'),emissive:C('#FF3020'),emissiveIntensity:0,roughness:.3}),plate:M('#F4F4F2',{roughness:.5})};
  emissives.push(carMat.head,carMat.tail);
  var carInst={}, R2=rng(5), tmpE=new T.Matrix4();
  function car(x,z,rot){var ti=R2()<.4?0:R2()<.5?1:2, ci=Math.floor(R2()*paintCols.length);
    tmpQ.setFromAxisAngle(YAX,rot); tmpP.set(x,f(z)+.02,z); tmpS.set(1,1,1); var m=new T.Matrix4().compose(tmpP,tmpQ,tmpS);
    var k=ti+'|'+ci; (carInst[k]=carInst[k]||[]).push(m); (carInst['p'+ti]=carInst['p'+ti]||[]).push(m)}
  for(var zc=-98.7;zc<=32;zc+=2.6){
    if(R2()>.3) car(-21.9+(R2()-.5)*.3,zc+(R2()-.5)*.25,(R2()<.75?Math.PI:0)+(R2()-.5)*.06);
    if(R2()>.3) car(-28.8+(R2()-.5)*.3,zc+(R2()-.5)*.25,(R2()<.75?0:Math.PI)+(R2()-.5)*.06);}
  for(var sp2=-10;sp2<=10;sp2+=2.6){ if(R2()<.3) continue; var a12=-12*Math.PI/180; [-3.2,3.2].forEach(function(o){var x=-30+sp2*Math.cos(a12)-o*Math.sin(a12), z=26.5+sp2*Math.sin(a12)+o*Math.cos(a12); car(x,z,-a12+Math.PI/2+(o>0?Math.PI:0))})}
  [[640,822,300,-12],[465,262,520,-16.6]].forEach(function(p){for(var t=-p[2]/2+8;t<p[2]/2-8;t+=11){if(R2()<.35) continue;var q=local(p[0],p[1],p[3],t*S,0);car(q[0],q[1],-p[3]*Math.PI/180+Math.PI/2+(R2()<.5?Math.PI:0))}});
  function instM(geo,material,mats,shadow){var im=new T.InstancedMesh(geo,material,mats.length); mats.forEach(function(m,i){im.setMatrixAt(i,m)}); im.castShadow=shadow!==false; im.receiveShadow=true; scene.add(im); return im}
  CARS.forEach(function(tp,ti){var all=carInst['p'+ti]; if(!all) return;
    paintCols.forEach(function(c,ci){var l=carInst[ti+'|'+ci]; if(l) instM(tp.paint,paintMats[ci],l)});
    instM(tp.glass,carMat.glass,all,false); instM(tp.dark,carMat.dark,all); instM(tp.hub,carMat.hub,all,false);
    instM(tp.head,carMat.head,all,false); instM(tp.tail,carMat.tail,all,false); instM(tp.plate,carMat.plate,all,false)});
  function carGroup(ti,ci){var tp=CARS[ti], g=new T.Group();
    [[tp.paint,paintMats[ci]],[tp.glass,carMat.glass],[tp.dark,carMat.dark],[tp.hub,carMat.hub],[tp.head,carMat.head],[tp.tail,carMat.tail],[tp.plate,carMat.plate]].forEach(function(q){var m=new T.Mesh(q[0],q[1]);m.castShadow=true;g.add(m)});
    return g}

  /* ================= ДЕРЕВЬЯ ================= */
  var trunks=[], R3=rng(9);
  function nz(x,y,z,s){return Math.sin(x*1.9+s)*Math.sin(y*2.3+s*1.7)*Math.sin(z*2.1+s*.6)+.5*Math.sin(x*4.1+s*2.3)*Math.sin(z*3.7+y*2.9)}
  function blob(r,cx,cy,cz,sx,sy,sz,seed,seg){var g=new T.SphereGeometry(r,seg||9,Math.max(5,Math.round((seg||9)*.7)));
    var p=g.attributes.position; for(var i=0;i<p.count;i++){var x=p.getX(i),y=p.getY(i),z=p.getZ(i),k=1+.16*nz(x/r*1.3,y/r*1.3,z/r*1.3,seed); p.setXYZ(i,x*k*sx+cx,y*k*sy+cy,z*k*sz+cz)}
    g.computeVertexNormals(); return g}
  function paintY(g,cB,cT,y0,y1,jit,seed){var p=g.attributes.position,n=g.attributes.normal,col=[],r=rng(seed),a=C(cB),b=C(cT),c=new T.Color();
    for(var i=0;i<p.count;i++){var t=Math.min(1,Math.max(0,(p.getY(i)-y0)/(y1-y0))), ao=.78+.22*Math.max(0,n.getY(i)); c.copy(a).lerp(b,t).multiplyScalar(ao*(1+(r()-.5)*jit)); col.push(c.r,c.g,c.b)}
    g.setAttribute('color',new T.Float32BufferAttribute(col,3)); return g}
  function limb(r0,r1,len,x,y,z,tilt,yaw){var g=new T.CylinderGeometry(r1,r0,len,6); g.translate(0,len/2,0); g.rotateZ(tilt); g.rotateY(yaw); g.translate(x,y,z); return g}
  function woodCol(g,c){return paintY(g,c,c,0,1,.1,3)}
  var birchTex=(function(){var c=document.createElement('canvas');c.width=64;c.height=256;var x=c.getContext('2d'),r=rng(5);x.fillStyle='#ECEBE5';x.fillRect(0,0,64,256);
    for(var i=0;i<26;i++){x.fillStyle='rgba(30,30,30,'+(.5+r()*.4)+')';x.fillRect(r()*64,r()*256,6+r()*22,2+r()*4)}
    x.fillStyle='rgba(60,55,50,.6)';x.fillRect(0,224,64,32); var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.wrapS=t.wrapT=T.RepeatWrapping;return t})();
  var TPL={};
  (function(){
    [11,23].forEach(function(sd,vi){var r=rng(sd), wood=[limb(.24,.15,3.0,0,0,0,0,0)], leaf=[];
      for(var b=0;b<4;b++){var yaw=b*Math.PI/2+r()*.6; wood.push(limb(.11,.04,2.1,0,2.4+r()*.5,0,.55+r()*.35,yaw))}
      leaf.push(blob(1.9,0,4.9,0,1,.85,1,sd));
      for(var k=0;k<6;k++){var a=k/6*Math.PI*2+r()*.5, d=1.25+r()*.5; leaf.push(blob(1.15+r()*.45,Math.cos(a)*d,3.9+r()*1.5,Math.sin(a)*d,1,.9,1,sd+k))}
      leaf.push(blob(1.1,(r()-.5),6.1,(r()-.5),1,.9,1,sd+9));
      var lg=mergeGeos(leaf.map(function(g){return paintY(g,'#2F5222','#76A04C',2.6,7,.14,sd)}));
      TPL['oak'+vi]={wood:mergeGeos(wood.map(function(g){return woodCol(g,'#5E4E43')})),leaf:lg,rad:3.1,woodMat:'bark'}});
    [5,17].forEach(function(sd,vi){var r=rng(sd), wood=[limb(.11,.08,2.6,0,0,0,0,0)], leaf=[];
      for(var b=0;b<3;b++) wood.push(limb(.05,.02,1.1,0,2.1,0,.5,b*2.1+r()));
      leaf.push(blob(1.15,0,3.6,0,1,1.2,1,sd,10));
      for(var k=0;k<4;k++){var a=k/4*Math.PI*2+r(); leaf.push(blob(.75+r()*.25,Math.cos(a)*.75,3.0+r()*1.3,Math.sin(a)*.75,1,1.1,1,sd+k,9))}
      TPL['street'+vi]={wood:mergeGeos(wood.map(function(g){return woodCol(g,'#5A4A40')})),leaf:mergeGeos(leaf.map(function(g){return paintY(g,'#3A6328','#86AF55',2,5.2,.12,sd)})),rad:1.9,woodMat:'bark'}});
    [7].forEach(function(sd){var r=rng(sd), wood=[limb(.15,.06,7.2,0,0,0,.04,0)], leaf=[];
      for(var b=0;b<5;b++) wood.push(limb(.05,.02,1.6,0,3.2+b*.7,0,.7,b*1.3+r()));
      for(var k=0;k<8;k++){var a=r()*Math.PI*2, d=.4+r()*.9; leaf.push(blob(.7+r()*.35,Math.cos(a)*d+.15,3.8+r()*3.4,Math.sin(a)*d,1,1.35,1,sd+k,8))}
      TPL.birch={wood:mergeGeos(wood.map(function(g){return woodCol(g,'#FFFFFF')})),leaf:mergeGeos(leaf.map(function(g){return paintY(g,'#4C7A2E','#A3C463',3,8,.16,sd)})),rad:1.9,woodMat:'birch'}});
    [3].forEach(function(sd){var wood=[limb(.2,.1,2,0,0,0,0,0)], leaf=[];
      for(var k=0;k<6;k++){var rr=2.1-k*.32, cg=new T.ConeGeometry(rr,2.1,10,2), p=cg.attributes.position;
        for(var i=0;i<p.count;i++){var x=p.getX(i),y=p.getY(i),z=p.getZ(i),q=1+.12*nz(x*2,y*2,z*2,sd+k); p.setXYZ(i,x*q,y+1.05+1.0+k*1.05,z*q)} cg.computeVertexNormals(); leaf.push(cg)}
      TPL.spruce={wood:mergeGeos(wood.map(function(g){return woodCol(g,'#4E3F36')})),leaf:mergeGeos(leaf.map(function(g){return paintY(g,'#1F3B2A','#4A6E46',1.5,9,.12,sd)})),rad:2.3,woodMat:'bark'}});
    [13,19].forEach(function(sd,vi){var r=rng(sd), leaf=[];
      for(var k=0;k<4;k++){var a=k/4*Math.PI*2+r(); leaf.push(blob(.55+r()*.25,Math.cos(a)*.45,.45+r()*.2,Math.sin(a)*.45,1,.8,1,sd+k,8))}
      TPL['bush'+vi]={leaf:mergeGeos(leaf.map(function(g){return paintY(g,'#2F5223','#6E9A47',0,1.1,.14,sd)})),rad:1}});
  })();
  var treeList={}, RT=rng(33);
  function plant(type,x,z,s){var tp=TPL[type]; tmpQ.setFromEuler(new T.Euler((RT()-.5)*.06,RT()*Math.PI*2,(RT()-.5)*.06)); tmpP.set(x,f(z)-.05,z);
    var sv=s*(.92+RT()*.16); tmpS.set(sv,s*(.9+RT()*.2),sv); (treeList[type]=treeList[type]||[]).push(new T.Matrix4().compose(tmpP,tmpQ,tmpS));
    if(tp.wood) trunks.push([x,f(z),z,.24*tp.rad*s/2.6])}
  function tree(x,z,s,kind){var r=RT(), t=kind;
    if(!t){t=r<.55?'oak':r<.83?'birch':'spruce'}
    if(t==='oak'||t==='street') t+=RT()<.5?'0':'1';
    plant(t,x,z,t.indexOf('oak')===0?s*.95:t==='birch'?s*1.05:t==='spruce'?s*1.1:s)}
  function bush(x,z,s){plant(RT()<.5?'bush0':'bush1',x,z,s)}
  SEC.forEach(function(s){[1.2,5.2,9.2,23.6,27.3,31.0].forEach(function(dz){tree(-11.8,s.Z0+dz,1.0+RT()*.12,'street')}); [3,7.5,25.5,29.5].forEach(function(dz){bush(s.X0-3.4,s.Z0+dz,1.1)}); [3,9,17,24,30].forEach(function(dz){bush(s.X0+WD+3,s.Z0+dz,1)})});
  [[-24,14],[-24,18.5],[-24,23],[-16,40],[-16,47]].forEach(function(t){tree(t[0],t[1],1.1,'street')});
  for(var et=-120;et<70;et+=7){tree(11.6,et+RT()*2,.8+RT()*.2,RT()<.6?'birch':'street')}
  for(var i2=0;i2<220;i2++){tree(17+RT()*95,-180+RT()*270,.85+RT()*.6)}
  [[560,170,-11.7,2400],[560,95,-11.7,2400]].forEach(function(r){for(var t=-r[3]/2;t<r[3]/2;t+=40){var q=local(r[0],r[1],r[2],t*S,0);tree(q[0],q[1],1.1,'street')}});
  [[335,590,-8,-26,0,'v',30],[335,590,-8,26,0,'v',30],[690,630,-8,-14,0,'v',24],[690,630,-8,14,0,'v',24]].forEach(function(r){for(var t=-r[6];t<=r[6];t+=6.5){var q=local(r[0],r[1],r[2],r[3],t);tree(q[0],q[1],1.0+RT()*.2,'street')}});
  [[600,560],[640,700],[760,360],[230,700],[440,720],[200,880],[400,880],[540,770],[780,760],[250,430],[700,800],[820,160]].forEach(function(p){var c=PW(p[0],p[1]);tree(c[0],c[1],.8+RT()*.3,'oak');tree(c[0]+4,c[1]+3,.85,'birch')});
  for(var bt=0;bt<70;bt++){tree(-140-RT()*200,-180+RT()*330,.8+RT()*.5)}
  for(var bt2=0;bt2<40;bt2++){tree(-120+RT()*250,95+RT()*150,.8+RT()*.5)}
  var leafMat=new T.MeshStandardMaterial({vertexColors:true,roughness:.95}), barkMat=new T.MeshStandardMaterial({vertexColors:true,color:C('#FFFFFF'),roughness:.95}),
      birchMat=new T.MeshStandardMaterial({map:birchTex,roughness:.85});
  Object.keys(treeList).forEach(function(k){var tp=TPL[k], ms=treeList[k], lm=instM(tp.leaf,leafMat,ms);
    var tc=new T.Color(); ms.forEach(function(m,i){tc.setRGB(.86+RT()*.24,.88+RT()*.2,.82+RT()*.2); lm.setColorAt(i,tc)}); if(lm.instanceColor) lm.instanceColor.needsUpdate=true;
    if(tp.wood) instM(tp.wood,tp.woodMat==='birch'?birchMat:barkMat,ms)});
  var poles=[], heads=[]; for(var lz=-112;lz<=58;lz+=18){poles.push([-13.2,f(lz)+3,lz,.12,6,.12]); heads.push([-13.9,f(lz)+6,lz,1.4,.14,.32])}
  [[335,590,-8,-24,-24],[335,590,-8,24,24],[335,590,-8,-24,24],[335,590,-8,24,-24],[690,630,-8,-12,-22],[690,630,-8,12,22]].forEach(function(p){var q=local(p[0],p[1],p[2],p[3],p[4]);poles.push([q[0],f(q[1])+2.2,q[1],.1,4.4,.1]);heads.push([q[0],f(q[1])+4.4,q[1],.4,.25,.4])});
  (function(){var keepP=[], keepH=[];
    function clear(x,z){return !trunks.some(function(t){var r=2.6*(t[3]/.24)+.6; return Math.hypot(t[0]-x,t[2]-z)<r})}
    poles.forEach(function(p,i){var h=heads[i], ok=false;
      [0,2,-2,3.5,-3.5,5,-5].some(function(dz){ if(clear(p[0],p[2]+dz)&&clear(h[0],h[2]+dz)){p[2]+=dz;h[2]+=dz;p[1]=f(p[2])+p[4]/2;h[1]=f(h[2])+p[4]; ok=true; return true} return false});
      if(ok){keepP.push(p);keepH.push(h)}});
    poles=keepP; heads=keepH})();
  inst(poles,M('#5A6064'),null,false);
  var headMat=new T.MeshStandardMaterial({color:C('#DADADA'),emissive:C('#FFE2A8'),emissiveIntensity:0}); inst(heads,headMat,null,false);

  /* ================= ТРАВА ================= */
  (function(){
    var c=document.createElement('canvas');c.width=128;c.height=128;var x=c.getContext('2d'),r=rng(41);
    for(var i=0;i<46;i++){var bx=10+r()*108,h=50+r()*70,w=3+r()*4,g=r();
      x.fillStyle=g<.5?'#4E7432':g<.85?'#628C41':'#7A9E4E';x.beginPath();x.moveTo(bx-w,128);x.quadraticCurveTo(bx+(r()-.5)*20,128-h*.6,bx+(r()-.5)*26,128-h);x.lineTo(bx+w,128);x.fill()}
    var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;
    var gm=new T.MeshStandardMaterial({map:t,alphaTest:.5,side:T.DoubleSide,roughness:1});
    var g1=new T.PlaneGeometry(1,1),g2=g1.clone(),g3=g1.clone(); g1.translate(0,.5,0); g2.translate(0,.5,0); g2.rotateY(Math.PI/3); g3.translate(0,.5,0); g3.rotateY(-Math.PI/3);
    var tuft=new T.BufferGeometry(); (function(){var pos=[],uv=[],idx=[],o=0;[g1,g2,g3].forEach(function(g){var p=g.attributes.position,u=g.attributes.uv,ix=g.index;
      for(var i=0;i<p.count;i++){pos.push(p.getX(i),p.getY(i),p.getZ(i));uv.push(u.getX(i),u.getY(i))} for(var j=0;j<ix.count;j++) idx.push(ix.getX(j)+o); o+=p.count});
      tuft.setAttribute('position',new T.Float32BufferAttribute(pos,3));tuft.setAttribute('uv',new T.Float32BufferAttribute(uv,2));tuft.setIndex(idx);var nr=[];for(var k=0;k<pos.length/3;k++)nr.push(0,1,0);tuft.setAttribute('normal',new T.Float32BufferAttribute(nr,3))})();
    var list=[], R4=rng(77);
    function strip(x0,x1,z0,z1,n,skip){for(var i=0;i<n;i++){var px=x0+R4()*(x1-x0), pz=z0+R4()*(z1-z0); if(skip&&skip(px,pz)) continue; var s=.28+R4()*.28;
      list.push([px,f(pz)+.04,pz,s*1.3,s,s*1.3,R4()*Math.PI])}}
    SEC.forEach(function(s){var ze=s.Z0+(VEST[0]+VEST[1])/2;
      strip(-13.6,s.X0-2.3,s.Z0,s.Z0+L,520,function(x,z){return Math.abs(z-ze)<1.4||(x>s.X0-5.2&&z>s.Z0+11.4&&z<s.Z0+23.3)});
      strip(s.X0+WD+1.7,12.8,s.Z0,s.Z0+L,260);
    });
    strip(-26.2,-24.6,-100,33,260); strip(19,40,-125,70,900); strip(-12,10,-97.5,-92,120);
    [[335,590,-8,26,30],[690,630,-8,14,24]].forEach(function(r){for(var i=0;i<380;i++){var dx=(R4()<.5?-1:1)*(r[3]-1.5+R4()*3), dz=(R4()-.5)*2*r[4], q=local(r[0],r[1],r[2],dx,dz); list.push([q[0],f(q[1])+.04,q[1],.45,.4,.45,R4()*3])}});
    var m=inst(list,gm,tuft,false); if(m){m.receiveShadow=false;}
  })();

  /* ================= ЛЮДИ И МАШИНЫ В ДВИЖЕНИИ ================= */
  var walkers=[], RP=rng(21);
  var cloth=['#2F4858','#8A3B3B','#3E6E4E','#D1B26F','#5B5F97','#B05A7A','#3C3C3C','#E0DED8','#7A5C46','#4E7FA6'].map(function(c){return M(c,{roughness:.8})});
  var skin=M('#E2B99A'), pants=[M('#2E3440'),M('#4A5560'),M('#7C6A58')], hair=[M('#3A2A20'),M('#7A5A3A'),M('#1E1E1E')];
  var gLeg=new T.BoxGeometry(.15,.82,.17), gTorso=new T.BoxGeometry(.42,.62,.24), gArm=new T.BoxGeometry(.11,.6,.13), gHead=new T.SphereGeometry(.13,10,8), gHair=new T.SphereGeometry(.135,10,8,0,Math.PI*2,0,Math.PI/2);
  gLeg.translate(0,-.41,0); gArm.translate(0,-.3,0);
  function person(path,speed,scale,mode){
    var g=new T.Group(), cm=cloth[Math.floor(RP()*cloth.length)], pm=pants[Math.floor(RP()*3)];
    var lL=new T.Mesh(gLeg,pm), lR=new T.Mesh(gLeg,pm); lL.position.set(-.1,.84,0); lR.position.set(.1,.84,0);
    var tor=new T.Mesh(gTorso,cm); tor.position.y=1.15;
    var aL=new T.Mesh(gArm,cm), aR=new T.Mesh(gArm,cm); aL.position.set(-.27,1.43,0); aR.position.set(.27,1.43,0);
    var hd=new T.Mesh(gHead,skin); hd.position.y=1.6; var hr=new T.Mesh(gHair,hair[Math.floor(RP()*3)]); hr.position.y=1.62;
    [lL,lR,tor,aL,aR,hd,hr].forEach(function(m){m.castShadow=true;g.add(m)});
    g.scale.setScalar(scale||1); scene.add(g);
    var segs=[],tot=0; for(var i=0;i<path.length-1;i++){var a=path[i],b=path[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]);segs.push([a,b,l]);tot+=l}
    walkers.push({g:g,lL:lL,lR:lR,aL:aL,aR:aR,segs:segs,tot:tot,s:RP()*tot,v:speed,dir:RP()<.5?1:-1,mode:mode||'pingpong'});
  }
  function updWalkers(dt){walkers.forEach(function(w){
    w.s+=w.v*dt*w.dir;
    if(w.mode==='loop'){w.s=(w.s%w.tot+w.tot)%w.tot} else {if(w.s>w.tot){w.s=w.tot;w.dir=-1} if(w.s<0){w.s=0;w.dir=1}}
    var s=w.s, i=0; while(i<w.segs.length-1&&s>w.segs[i][2]){s-=w.segs[i][2];i++}
    var sg=w.segs[i], t=sg[2]?s/sg[2]:0, x=sg[0][0]+(sg[1][0]-sg[0][0])*t, z=sg[0][1]+(sg[1][1]-sg[0][1])*t;
    var dx=(sg[1][0]-sg[0][0])*w.dir, dz=(sg[1][1]-sg[0][1])*w.dir;
    w.g.position.set(x,f(z)+.08,z); w.g.rotation.y=Math.atan2(dx,dz);
    var ph=(w.s*2.6), sw=Math.sin(ph)*.55; w.lL.rotation.x=sw; w.lR.rotation.x=-sw; w.aL.rotation.x=-sw*.8; w.aR.rotation.x=sw*.8;
  })}
  function rect(cx,cy,ang,hw,hd){return [local(cx,cy,ang,-hw,-hd),local(cx,cy,ang,hw,-hd),local(cx,cy,ang,hw,hd),local(cx,cy,ang,-hw,hd),local(cx,cy,ang,-hw,-hd)]}
  var walk=[]; SEC.forEach(function(s){var x=s.X0-1.1, Z0=s.Z0; walk.push([x,Z0+.5],[x,Z0+11.8],[s.X0-3.6,Z0+12.6],[s.X0-3.6,Z0+22.8],[x,Z0+23.4],[x,Z0+L-.5])});
  walk.unshift([-9.6,-104]); walk.push([-5,40]);
  for(var pi=0;pi<8;pi++) person(walk,1.1+RP()*.4,1);
  for(var pq=0;pq<3;pq++) person([[-24.9,-98],[-24.9,32]],1.0+RP()*.3,1);
  for(var pj=0;pj<3;pj++) person([[15.7,-120],[15.7,66]],1.1+RP()*.3,1);
  SEC.forEach(function(s){person([[-14.6,s.entry[1]+.4],[s.X0-5.0,s.entry[1]+.4],[s.entry[0]-.3,s.entry[1]]],.9,1)});
  for(var pk=0;pk<5;pk++) person(rect(335,590,-8,24,26),1.0+RP()*.5,1,'loop');
  for(var pl=0;pl<3;pl++) person(rect(690,630,-8,12,20),1.0,1,'loop');
  for(var kd=0;kd<6;kd++) person(rect(kd<3?262:690,kd<3?590:600,-8,3+RP()*2,6+RP()*4),1.4+RP()*.6,.62,'loop');
  for(var fb=0;fb<6;fb++) person(rect(335,567,-8,2+RP()*6,4+RP()*10),2.0+RP()*.8,.75,'loop');
  person([PW(150,180),PW(1000,0)],1.2,1); person([PW(950,95),PW(100,265)],1.3,1);
  var movers=[], rd=PW(200,205), re=PW(900,60), rdir=[re[0]-rd[0],re[1]-rd[1]], rl=Math.hypot(rdir[0],rdir[1]); rdir=[rdir[0]/rl,rdir[1]/rl];
  var rn=[-rdir[1],rdir[0]];
  for(var mc=0;mc<6;mc++){var g;
    g=carGroup(mc%3,(mc*4)%paintCols.length); scene.add(g); movers.push({g:g,t:mc*90,lane:mc%2?1:-1,v:9+mc%3*2})}
  function updCars(dt){movers.forEach(function(m){m.t+=m.v*dt*m.lane; var span=520; if(m.t>span)m.t-=2*span; if(m.t<-span)m.t+=2*span;
    var x=rd[0]+rdir[0]*(m.t+160)+rn[0]*m.lane*3.2, z=rd[1]+rdir[1]*(m.t+160)+rn[1]*m.lane*3.2;
    m.g.position.set(x,f(z)+.06,z); m.g.rotation.y=Math.atan2(-rdir[1]*m.lane,rdir[0]*m.lane)})}

  /* ================= ПОДПИСИ ================= */
  var labels=[];
  function label(html,v,main){var d=document.createElement('div');d.className='skh3d-lbl'+(main?' is-main':'');d.innerHTML=html;stage.appendChild(d);labels.push({el:d,v:v})}
  var s5=SEC[2], s4=SEC[1];
  label('<b>Дом 5</b>8 этажей, 2 подъезда',new T.Vector3(1.5,s5.fl-BASE+HTOT+5,0),true);
  label('<b>Дом 4</b>8 этажей, 2 подъезда',new T.Vector3(0,s4.fl-BASE+HTOT+4,-64.4));
  SEC.forEach(function(s){ label('<b>Подъезд №'+s.n+'</b>',s.entryPos)});
  label('<b>Общественное здание</b>3 этажа',new T.Vector3(-1.5,f(44)+13.5,44));
  var sp=PW(335,567); label('<b>Спортивное ядро</b>',new T.Vector3(sp[0],f(sp[1])+4.5,sp[1]));
  var kp=PW(690,600); label('<b>Детская площадка</b>',new T.Vector3(kp[0],f(kp[1])+5,kp[1]));

  /* ================= РАКУРСЫ ================= */
  var e5=SEC[3].Z0+(VEST[0]+VEST[1])/2;
  var VIEWS={
    yard:{p:[-40,f(44)+1.7,44],t:[-3,f(-6)+12,-6]},
    entry:{p:[-16,f(e5+8)+1.7,e5+8],t:[-6.5,f(e5)+4.0,e5-1.0]},
    green:{p:[88,30,28],t:[4,10,-24]},
    court:{p:(function(){var q=PW(470,770);return [q[0],f(q[1])+42,q[1]]})(),t:(function(){var q=PW(360,585);return [q[0],f(q[1]),q[1]]})()},
    top:{p:[110,190,170],t:(function(){var q=PW(520,600);return [q[0],0,q[1]]})()}
  };
  var fly=null;
  function go(name,instant){var v=VIEWS[name], p=new T.Vector3().fromArray(v.p), t=new T.Vector3().fromArray(v.t);
    if(W()/H()<1&&name!=='entry'){p.sub(t).multiplyScalar(1.45).add(t)}
    if(instant||reduce){cam.position.copy(p);ctr.target.copy(t);ctr.update();return}
    fly={t0time:performance.now(),p0:cam.position.clone(),t0:ctr.target.clone(),p1:p,t1:t}}
  go('yard',true);
  root.querySelectorAll('[data-view]').forEach(function(b){b.addEventListener('click',function(){
    root.querySelectorAll('[data-view]').forEach(function(x){x.setAttribute('aria-pressed',x===b)}); go(b.dataset.view)})});

  /* ================= ВЕЧЕР ================= */
  var night=false, bN=root.querySelector('[data-act="night"]'), pls=[];
  SEC.forEach(function(s){var pl=new T.PointLight(C('#FFD9A0'),0,12,2);pl.position.copy(s.entryPos).add(new T.Vector3(.6,-1.8,0));scene.add(pl);pls.push(pl)});
  bN.addEventListener('click',function(){night=!night;bN.setAttribute('aria-pressed',night);stage.classList.toggle('is-night',night);
    emissives.forEach(function(m){m.emissiveIntensity=night?1.2:0}); headMat.emissiveIntensity=night?2:0;
    mat.shop.emissive=C(night?'#C9A066':'#000000'); mat.shop.emissiveIntensity=night?.6:0;
    SEC.forEach(function(s){s.lamp.visible=night}); pls.forEach(function(l){l.intensity=night?2.4:0});
    hemi.intensity=night?.15:.78; sun.intensity=night?.08:1.6; scene.fog.color=C(night?'#1A2B45':'#D3E1EA')});

  /* ================= СЕНСОРНЫЕ ЭКРАНЫ ================= */
  var touch=matchMedia('(pointer:coarse)').matches, ov=root.querySelector('.skh3d-touch'), done=root.querySelector('.skh3d-done');
  function setActive(on){ctr.enabled=on; renderer.domElement.style.touchAction=on?'none':'pan-y'; ov.hidden=on; done.hidden=!on}
  if(touch){setActive(false); ov.querySelector('button').addEventListener('click',function(){setActive(true)}); done.addEventListener('click',function(){setActive(false)})}
  ctr.addEventListener('start',function(){fly=null});

  /* ================= КВАРТИРЫ: RAYCASTING И UI ================= */
  var aptRay=new T.Raycaster(), aptMouse=new T.Vector2();
  var hoveredApt=null;
  var canvasEl=renderer.domElement;
  var tipEl=root.querySelector('.skh3d-apt-tip');
  function applyAptStyle(mesh,hovered){
    var isActive=mesh.userData.house===activeHouse;
    var mat=mesh.material;
    var line=mesh.children[0].material;
    if(hovered){mat.color.copy(COL_HOVER);mat.opacity=.55;line.color.copy(COL_HOVER);}
    else if(isActive){mat.color.copy(COL_BRASS);mat.opacity=.25;line.color.copy(COL_BRASS);}
    else{mat.color.copy(COL_DIM);mat.opacity=.10;line.color.copy(COL_DIM);}
  }
  function setHover(apt){
    if(hoveredApt&&hoveredApt!==apt) applyAptStyle(hoveredApt,false);
    hoveredApt=apt;
    if(apt){
      applyAptStyle(apt,true);
      var a=apt.userData.aptData, t=APT_TYPES[a.t];
      tipEl.innerHTML=
        '<b>'+t.label+' · '+t.area.toFixed(1).replace('.',',')+' м²</b>'+
        'Дом '+a.h+' · подъезд '+a.s+' · этаж '+a.f+' · поз. '+a.p+
        '<div class="skh3d-apt-price">'+fmtPrice(a.price)+'</div>';
      tipEl.classList.remove('is-off');
    }else tipEl.classList.add('is-off');
  }
  function pickApt(evt){
    var rect=canvasEl.getBoundingClientRect();
    aptMouse.x=((evt.clientX-rect.left)/rect.width)*2-1;
    aptMouse.y=-((evt.clientY-rect.top)/rect.height)*2+1;
    aptRay.setFromCamera(aptMouse,cam);
    var hits=aptRay.intersectObjects(aptMeshes,false);
    if(!hits.length) return null;
    var occHits=aptRay.intersectObjects(occ,false);
    if(occHits.length && occHits[0].distance < hits[0].distance-.04) return null;
    return hits[0].object;
  }
  if(!touch){
    canvasEl.addEventListener('pointermove',function(e){
      var hit=e.buttons?null:pickApt(e); setHover(hit);canvasEl.style.cursor=hit?'pointer':'grab';
      if(hit){var r=canvasEl.getBoundingClientRect();
        var px=(e.clientX-r.left)*W()/r.width,py=(e.clientY-r.top)*H()/r.height;
        var half=tipEl.offsetWidth/2;tipEl.style.left=Math.max(half+5,Math.min(W()-half-5,px))+'px';
        tipEl.style.top=Math.max(tipEl.offsetHeight+18,py)+'px';
      }
    });
    canvasEl.addEventListener('pointerleave',function(){setHover(null)});
  }
  var downP=null, pointers=new Set();
  canvasEl.addEventListener('pointerdown',function(e){pointers.add(e.pointerId);downP=pointers.size===1&&e.button===0&&(!touch||ctr.enabled)?{x:e.clientX,y:e.clientY,id:e.pointerId}:null});
  canvasEl.addEventListener('pointermove',function(e){if(downP&&Math.hypot(e.clientX-downP.x,e.clientY-downP.y)>7)downP=null});
  canvasEl.addEventListener('pointercancel',function(e){pointers.delete(e.pointerId);downP=null});
  canvasEl.addEventListener('pointerup',function(e){
    pointers.delete(e.pointerId);var start=downP;downP=null;
    if(!start||start.id!==e.pointerId||Math.hypot(e.clientX-start.x,e.clientY-start.y)>7)return;
    var hit=pickApt(e);if(hit){if(hit.userData.house!==activeHouse)setActiveHouse(hit.userData.house);setHover(null);openModal(hit.userData.aptIdx)}
  });

  var HOUSE_VIEWS={
    5:{p:[-88,43,28],t:[-3,13,0]},
    4:{p:[-88,47,-35],t:[-3,17,-64.4]}
  };
  onHouseChange=function(h){
    setHover(null);aptMeshes.forEach(function(m){applyAptStyle(m,false)});
    var v=HOUSE_VIEWS[h];VIEWS.yard=v;
    var es=SEC[h===5?3:1],ez=es.Z0+(VEST[0]+VEST[1])/2;
    VIEWS.entry={p:[es.X0-10,f(ez+8)+1.7,ez+8],t:[es.X0,f(ez)+4,ez-1]};
    root.querySelectorAll('[data-view]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.view==='yard'))});
    go('yard',!onHouseChange.initialized);onHouseChange.initialized=true;
  };
  onHouseChange(activeHouse);

  /* ================= ЦИКЛ ================= */
  var v3=new T.Vector3(), dir=new T.Vector3(), ray=new T.Raycaster(), tick=0, visible=true, last=performance.now();
  function frame(){
    var now=performance.now(), dt=Math.min(.1,(now-last)/1000); last=now;
    if(fly){var k=Math.min(1,(now-fly.t0time)/1400),q=1-Math.pow(1-k,3);cam.position.lerpVectors(fly.p0,fly.p1,q);ctr.target.lerpVectors(fly.t0,fly.t1,q);if(k>=1)fly=null}
    if(!reduce){updWalkers(dt);updCars(dt)}

    if(!reduce){
      var pulseT=now*0.0018;
      aptMeshes.forEach(function(m){
        if(m===hoveredApt) return;
        if(m.userData.house!==activeHouse) return;
        var p=.5+.5*Math.sin(pulseT+m.userData.pulseSeed);
        m.material.opacity=0.20+0.10*p;
      });
    }

    ctr.update(); var cd=cam.position.distanceTo(ctr.target); scene.fog.near=cd*.4+15; scene.fog.far=cd*1.5+80;
    renderer.render(scene,cam); tick++;
    var w=W(),h=H();
    labels.forEach(function(l){
      if(tick%8===1){dir.copy(l.v).sub(cam.position);var dist=dir.length();ray.set(cam.position,dir.normalize());ray.far=dist-1.2;l.hid=ray.intersectObjects(occ,false).length>0}
      v3.copy(l.v).project(cam);var off=l.hid||v3.z>1||Math.abs(v3.x)>1.02||Math.abs(v3.y)>1.02;
      l.el.classList.toggle('is-off',off); l.el.style.transform='translate('+((v3.x*.5+.5)*w)+'px,'+((-v3.y*.5+.5)*h)+'px) translate(-50%,-100%) translateY(-6px)'});
  }
  updWalkers(0); updCars(0);
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){visible=es[0].isIntersecting;last=performance.now()}).observe(stage);
  function resize(){if(!W()||!H())return;renderer.setSize(W(),H());cam.aspect=W()/H();cam.updateProjectionMatrix()}
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(stage);else window.addEventListener('resize',resize);
  var raf=0,previous=0;
  function loop(now){if(!root.isConnected){ctr.dispose();renderer.dispose();return}raf=requestAnimationFrame(loop);if(!visible||document.hidden||modalEl.open){last=performance.now();return}if(mobile&&now-previous<30)return;previous=now;frame()}
  if(ld)ld.remove();
  raf=requestAnimationFrame(loop);

  } // init
  } // boot
})();

})();
