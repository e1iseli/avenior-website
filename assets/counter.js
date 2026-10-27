(function(){
  const production=location.hostname==='avenior.co'||location.hostname==='www.avenior.co';
  document.querySelectorAll('[data-counter-key]').forEach(async element=>{
    const key=element.dataset.counterKey;
    const listOnly=element.dataset.counterReadonly==='true';
    const sessionKey=`avenior-viewed-${key}`;
    const alreadyViewed=sessionStorage.getItem(sessionKey)==='1';
    const readOnly=!production||listOnly||alreadyViewed;
    const endpoint=`https://abacus.jasoncameron.dev/${readOnly?'get':'hit'}/avenior-co/${encodeURIComponent(key)}`;
    try{
      const response=await fetch(endpoint,{cache:'no-store'});
      if(response.status===404&&readOnly){element.textContent='0 total views';return;}
      if(!response.ok)throw new Error('Counter unavailable');
      const data=await response.json();
      const value=Number(data.value);
      if(!Number.isFinite(value))throw new Error('Invalid count');
      element.textContent=`${value.toLocaleString()} total ${value===1?'view':'views'}`;
      if(production&&!listOnly&&!alreadyViewed)sessionStorage.setItem(sessionKey,'1');
    }catch(error){element.textContent='Views updating';}
  });
})();
