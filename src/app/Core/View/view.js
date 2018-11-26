import middleware from '../Midleware/middleware';

export default (function() {
  function setMidlewares(arr) {
    arr.forEach(name => middleware.set(name));
  }

  function useView(name, params = {}) {
    if (!middleware.test()) {
      return false;
    }

    load(name, params);
  }

  function load(name, params = {}) {
    return require(`../../structures/views/${name}`).default.create(params);
  }

  return {
    middlewares: setMidlewares,
    use: useView,
    load: load,
  };
})();
