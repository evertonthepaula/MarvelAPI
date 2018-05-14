import gif from '../../../img/load.gif';

export default (function(){

  function bind()
  {
    return `
      <div class="searching">
        <img src="${gif}" class="searching-img"/>
        <p class="searching-text">Connecting to S.H.I.E.L.D Server...</p>
      </div>
    `;
  }

  return {
    create: bind,
  };

})();
