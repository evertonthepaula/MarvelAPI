export default (function() {
  const middlewares = [];

  const set = name => middlewares.push(load(name));

  const load = name => require(`../../modules/middlewares/${name}`);

  const use = middleware => (!middleware.default() ? false : true);

  const test = () => middlewares.every(curent => use(curent));

  return {
    set: set,
    load: load,
    use: use,
    test: test,
  };
})();
