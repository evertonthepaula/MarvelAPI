import imgNick from '../../../img/nick-calm.jpg';

export default (function(){
  const appContainer = document.getElementById('mainContent');

  function bind()
  {
    template();
  }
  
  function template()
  {
    appContainer.innerHTML = htmlView();
  }

  function htmlView()
  {
    return `
      <div class="offline">
        <h1 class="title">VOCÊ ESTÁ OFFLINE!</h1>
        <p>Alguns recursos podem não estar disponíveis. Mas não se preocupe fera! É só testar sua conexão e tentar de novo.</p>
        <div class="offline-image">
          <img src="${imgNick}"/>
        </div>
      </div>
    `;
  }

  return {
    create: bind,
  };

})();