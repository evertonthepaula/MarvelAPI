export default (function(){
  
  const params = {
    inputCallback(){},
  };

  function bind()
  {
    eventsHandler();   
    return tempalte();
  }

  function tempalte()
  {
    return `
      <div id="searchBox">
        <label for="search-character" class="label-text">Nome do Personagem</label>
        <input id="search-character" type="text">
      </div>
    `;
  }

  function eventsHandler()
  {

    const target = document.querySelector('#mainContent');
    const observer = new MutationObserver(observed);
    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    };
    
    function observed()
    {
      let el;
      
      if((el = target.querySelector('#searchBox'))){
        events(el);
        observer.disconnect();
      }
    }

    observer.observe(target, config);    
  }

  function events(searchBox)
  {
    searchBox.addEventListener('input', function (e){
      e.preventDefault();
      params.inputCallback(e.target.value);
    });
  }

  return {
    create: bind,
    params,
  };

})();
