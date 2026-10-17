export function initializeDemo(){
const P=(x,y,z)=>[420+(x-y)*.87,350+(x+y)*.43-z];
function building(floors=5,dark=false){
 const point=p=>P(...p).map(n=>n.toFixed(1)).join(',');
 const face=(p,fill,stroke='none',sw=1)=>`<polygon points="${p.map(point).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
 let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 620" aria-hidden="true"><defs><pattern id="grid" width="42" height="21" patternUnits="userSpaceOnUse"><path d="M0 10.5L21 0L42 10.5L21 21Z" fill="none" stroke="#ffffff" stroke-opacity=".15" stroke-width=".5"/></pattern></defs><path d="M40 300L420 115L820 320L440 530Z" fill="url(#grid)"/>';
 s+=face([[-185,-110,-6],[210,-110,-6],[210,170,-6],[-185,170,-6]],'#b8c9d4');
 s+=face([[-185,170,-6],[210,170,-6],[210,170,-15],[-185,170,-15]],'#91acbd');
 const block=(x,y,w,d,n)=>{let h=n*36;const light=dark?'#637580':'#f0eee4',side=dark?'#3a5062':'#b6c6cc';
 s+=face([[x,y+d,0],[x+w,y+d,0],[x+w,y+d,h],[x,y+d,h]],light);
 s+=face([[x+w,y,0],[x+w,y+d,0],[x+w,y+d,h],[x+w,y,h]],side);
 for(let k=0;k<n;k++){
  for(let i=0;i<Math.floor(w/26);i++){let a=x+8+i*26,z=8+k*36;s+=face([[a,y+d+.1,z],[a+14,y+d+.1,z],[a+14,y+d+.1,z+23],[a,y+d+.1,z+23]],'#36586d');s+=face([[a+1,y+d+.3,z+1],[a+6,y+d+.3,z+1],[a+6,y+d+.3,z+22],[a+1,y+d+.3,z+22]],'#86a7b7');}
  for(let i=0;i<Math.floor(d/25);i++){let a=y+7+i*25,z=8+k*36;s+=face([[x+w+.1,a,z],[x+w+.1,a+13,z],[x+w+.1,a+13,z+23],[x+w+.1,a,z+23]],'#3a6177');}
  s+=face([[x-3,y+d+3,k*36+1],[x+w+3,y+d+3,k*36+1],[x+w+3,y+d+3,k*36+4],[x-3,y+d+3,k*36+4]],dark?'#84919b':'#fffdf1');
  s+=face([[x+w+3,y-3,k*36+1],[x+w+3,y+d+3,k*36+1],[x+w+3,y+d+3,k*36+4],[x+w+3,y-3,k*36+4]],'#9bafb8');
 }
 s+=face([[x-4,y-4,h+3],[x+w+4,y-4,h+3],[x+w+4,y+d+4,h+3],[x-4,y+d+4,h+3]],'#f9f6ea');s+=face([[x+7,y+7,h+3.2],[x+w-7,y+7,h+3.2],[x+w-7,y+d-7,h+3.2],[x+7,y+d-7,h+3.2]],dark?'#6d7f8b':'#c6d1d4');};
 block(-145,-75,285,85,floors);block(-145,10,100,120,Math.max(2,floors-1));
 for(const [x,y] of [[170,130],[175,-60],[-160,125]]){let [a,b]=P(x,y,0);s+=`<ellipse cx="${a}" cy="${b}" rx="19" ry="8" fill="#7899a055"/><path d="M${a} ${b}v-31" stroke="#6b7c74" stroke-width="3"/><ellipse cx="${a}" cy="${b-33}" rx="15" ry="23" fill="#71948d"/><ellipse cx="${a-5}" cy="${b-38}" rx="10" ry="17" fill="#8cac9c"/>`;}
 s+='<g stroke="#e5f2fb" fill="none" opacity=".65"><path d="M100 500L420 650M100 490v20M750 370v20M750 380L455 530" stroke-width="1"/></g></svg>';return s;
}
document.querySelector('.hero-art').innerHTML=building(7);document.querySelector('.mini-model').innerHTML=building(4);
let floors=5,dark=false;const model=document.getElementById('model'),status=document.getElementById('model-status'),messages=document.getElementById('messages');
function render(){model.innerHTML=building(floors,dark);status.textContent=`${floors} ${floors<5?'этажа':'этажей'} · ${dark?'тёмный':'светлый'} фасад`;model.setAttribute('aria-label',status.textContent)}render();
function bubble(text,kind){let e=document.createElement('div');e.className='bubble '+kind;e.textContent=text;messages.append(e);messages.scrollTop=messages.scrollHeight}
function apply(text){if(!text.trim())return;bubble(text,'user');let t=text.toLowerCase(),changed=false;if(/этаж/.test(t)){let match=t.match(/\b([2-8])\b/);if(match){floors=+match[1];changed=true}else if(/добав|увелич|ещ[её]|выше/.test(t)){floors=Math.min(8,floors+1);changed=true}else if(/убер|уменьш|ниже|удал/.test(t)){floors=Math.max(2,floors-1);changed=true}}if(/темн|тёмн/.test(t)){dark=true;changed=true}if(/светл|бел/.test(t)){dark=false;changed=true}render();bubble(changed?`Обновил учебную модель: ${status.textContent}. Проверьте объём на экране.`:'В демо можно менять этажность от 2 до 8 и цвет фасада. Попробуйте «Сделай 6 этажей» или «Сделай фасад темнее».','assistant')}
document.getElementById('chat-form').addEventListener('submit',e=>{e.preventDefault();let input=document.getElementById('command');apply(input.value);input.value=''});document.querySelectorAll('[data-command]').forEach(b=>b.addEventListener('click',()=>apply(b.dataset.command)));document.getElementById('reset').addEventListener('click',()=>{floors=5;dark=false;render();messages.innerHTML='<div class="bubble user">Создай объём жилого дома: 5 этажей, плоская кровля, светлый фасад.</div><div class="bubble assistant">Базовый объём готов. Что изменим?</div>'});

}
