export default (function() {
  let charactersArray;

  function bind(arr) {
    charactersArray = arr;

    return `
      <section class="characters">
        ${charactersHeadHtml()}
        ${charactersBodyHtml()}
      </section>`;
  }

  function charactersHeadHtml() {
    return `
      <header class="characters-header">
        <h3 class="characters-title _25">Personagem</h3>
        <h3 class="characters-title _25">Séries</h3>
        <h3 class="characters-title _50">Eventos</h3>
      </header>
    `;
  }

  function charactersBodyHtml() {
    let charactersBody = charactersArray
      .map(function(character) {
        return `
        <a href="#/personagens/${
  character.name
  }/${character.id}" class="characters-row" id="${character.id}">
          ${characterInfo(character)}
          ${seriesInfo(character)}
          ${eventsInfo(character)}
        </a>
      `;
      })
      .join('');

    return `
      <div>
        ${charactersBody}
      </div>
    `;
  }

  function characterInfo(character) {
    return `
      <div class="characters-person _25">
        <img src="${character.thumbnail.path}/standard_medium.${
    character.thumbnail.extension
  }" alt="${
    character.name
  }" width="58px" height="58px" class="characters-person-img"/>
        <h4 class="characters-person-name text">${character.name}</h4>
      </div>
    `;
  }

  function seriesInfo(character) {
    if (!character.series.available) {
      return `
        <div class="characters-series _25">
          <p>Séries não disponíveis</p>
        </div>
      `;
    }

    let series = '';

    for (let p = 0; character.series.items[p] && p < 3; p++) {
      series += `<p>${character.series.items[p].name}</p>`;
    }

    return `
      <div class="characters-series _25">
        ${series}
      </div>
    `;
  }

  function eventsInfo(character) {
    if (!character.events.available) {
      return `
        <div class="characters-events _50">
          <p>Eventos não disponíveis</p>
        </div>
      `;
    }

    let events = '';

    for (let p = 0; character.events.items[p] && p < 3; p++) {
      events += `<p>${character.events.items[p].name}</p>`;
    }

    return `
      <div class="characters-events _50">
        ${events}
      </div>
    `;
  }

  return {
    create: bind,
  };
})();
