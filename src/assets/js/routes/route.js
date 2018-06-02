import view from '../Core/View/view';
const crossroads = require('crossroads');
const hasher = require('hasher');

export default (function(){
  
  view.middlewares(['networkMiddleware','apiKeysMiddleware']);

  crossroads.addRoute('/', () => {
    view.use('home');
  });

  crossroads.addRoute('/personagens/{name}/{id}', (name,id) => {
    view.use('character', id);
  });

  crossroads.addRoute(':rest*:', () => {
    view.use('404');
  }, -Infinity);

  //setup hasher
  function parseHash(newHash, oldHash)
  {
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash);
  hasher.changed.add(parseHash);
  hasher.init();

})();
