import middleware from '../Midleware/middleware';

export default (function(){

  function setMidlewares(arr)
  {
    arr.forEach((name) => middleware.set(name));
  }

  function loadView(name, params = {} )
  {
    if (!middleware.test()) {
      return false;
    }

    let view = require(`../../structures/views/${name}`).default;
    
    view.create(params);
  }

  return {
    middlewares: setMidlewares,
    use: loadView,
  };

})();
