import sessionStorage from '../../storages/session';

export default (function(){
  const appContainer = document.getElementById('mainContent');

  function bind()
  {
    template();
    events();
  }
  
  function template()
  {
    appContainer.innerHTML = htmlView();
  }

  function htmlView()
  {
    return `
      <div class="offline">
        <h1 class="title">VOCÊ NÃO TEM CREDENCIAIS VÁLIDAS PARA ACESSAR OS RECURSOS DA API MARVEL</h1>
          
        <br />
        <p>Você não tem credenciais válidas para acessar os recursos da API Marvel.</p>
        <p>Por favor preencha os campos abaixo com suas chaves para que possamos credenciar seu acesso.</p>
        <br />
        
        <form id="credentialsForm">
          <label for="public-key" class="label-text">Chave Pública</label>
          <input id="public-key" name="public-key" type="text" value="chave publica">

          <label for="private-key" class="label-text">Chave Privada</label>
          <input id="private-key" name="private-key" type="text" value="chave privada">
        
          <button>Validar chaves</button>
        </form>
        
        <p>
          <small>* Não se preocupe, suas chaves ficarão disponíveis apenas para o seu navegador atual e apenas durante seu acesso.</small>
        </p>

        <br />
        <p>Se você não sabe sobre o que se trata esta página, por favor acesse: <a onclick="https://developer.marvel.com/documentation/getting_started" class="link">marvel.com</a></p>


      </div>
    `;
  }


  function events()
  {
    formHandler();
  } 

  function formHandler()
  {
    const form = document.getElementById('credentialsForm');
    var formData = new FormData(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      console.log(e);
      console.log(formData.get('private-key'));
      console.log(formData.get('public-key'));

      const privateKey = formData.get('public-key');
      const publicKey = formData.get('private-key');

      if (!(privateKey || publicKey)) {
        return false;
      }

      sessionStorage.setStorage('PRIVATE_KEY', privateKey);
      sessionStorage.setStorage('PUBLIC_KEY', publicKey); 

      location.reload(); 

    });
  }


  return {
    create: bind,
  };

})();