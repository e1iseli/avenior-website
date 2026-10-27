(function(){
  const canonical=document.querySelector('link[rel="canonical"]')?.href||location.href;
  const title=document.querySelector('h1')?.textContent.trim()||document.title;
  document.querySelectorAll('[data-share]').forEach(control=>{
    const kind=control.dataset.share;
    if(kind==='copy'){
      control.addEventListener('click',async()=>{
        try{await navigator.clipboard.writeText(canonical);document.querySelector('.share-status').textContent='Link copied.'}
        catch(error){document.querySelector('.share-status').textContent='Copy failed — use your browser address bar.'}
      });
      return;
    }
    const urls={
      linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`,
      x:`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonical)}&text=${encodeURIComponent(title)}`,
      facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`,
      email:`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(canonical)}`
    };
    control.href=urls[kind];
    if(kind!=='email')control.addEventListener('click',event=>{event.preventDefault();window.open(control.href,'share','width=720,height=560,noopener,noreferrer')});
  });
})();
