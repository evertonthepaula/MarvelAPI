import searching from '../templates/searching';

export default (function() {
  const appContainer = document.getElementById('mainContent');

  function bind() {
    template();
  }

  function template() {
    appContainer.innerHTML = htmlView();
  }

  function htmlView() {
    return `
      <div class="404">
        <h1 class="title">Estamos procurando o que você está buscando mas não estamos encontrando!</h1>
        <p>Por favor teste outra url ou tente <a onclick="window.history.back();" class="link">retornar</a></p>
        ${searching.create()}
      </div>
    `;
  }

  return {
    create: bind,
  };
})();
