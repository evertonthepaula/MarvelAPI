export default (function() {
  const imgNFound =
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  function bind(arr) {
    return arr
      .map(function(detail) {
        return `
        <div class="character_details">
          <img src="${
  detail.thumbnail
    ? detail.thumbnail.path + '.' + detail.thumbnail.extension
    : imgNFound
  }" alt="${detail.title} cover" class="character_details-img"/>
          <h1 class="title">${detail.title}</h1>
          <p class="character_details-desc">${
  detail.description ? detail.description : 'Descrição não disponível'
  }</p>
        </div>
      `;
      })
      .join('')
      .trim();
  }

  return {
    create: bind,
  };
})();
