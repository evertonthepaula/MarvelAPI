import view from '../services/View/view';
const crossroads = require('crossroads');
const hasher = require('hasher');

export default (function(){

  crossroads.addRoute('/', () => {
    view('home');
  });

  crossroads.addRoute('/personagens/{name}/{id}', (name,id) => {
    view('character', id);
  });

  crossroads.addRoute(':rest*:', () => {
    view('404');
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
