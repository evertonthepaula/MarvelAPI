function view(name, params = [] )
{
  let view = require(`../../structures/views/${name}`).default;
  view.create(params);
}

export default view;
