import sessionStorage from '../../Core/Storages/session';

export default (function(){

  let pagination;
  const config = {
    total: 0,
    maxPerPage: 0,
    maxNavs: 0,
    maxPages(){
      return config.total/config.maxPerPage;
    },
    nextCallback(){},
    prevCallback(){},
    pageCallback(){},
  };

  function bind()
  {
    eventsHandler();
    return template();
  }

  function template()
  {
    let current;
    let init;
    let end;

    (!(current = sessionStorage.getStorage('currentPage')))? current = 1 : current = parseInt(current);
    (!(init = sessionStorage.getStorage('paginationInit')))? init = 1 : init = parseInt(init);

    end = init + config.maxNavs;
  
    return `
      <div class="page_nav" id="paginationBox">
        <span id="paginationPrev" class="page_nav-prev" data-prev="${init - config.maxNavs}"></span>  
          <ol id="paginationList" class="page_nav-list">
            ${navIntens(current,init,end)}
          </ol>
        <span id="paginationNext" class="page_nav-next" data-next="${end}"></span>
      </div>
    `;
  }

  function navIntens(current,init,end)
  { 
    let page_nav = '';

    for(let x = init; x < end; x++){
      page_nav +=  `
        <li class="page_nav-item ${(x === current)? 'active':''}">${x}</li>
      `;
    }

    return page_nav;
  }

  function eventsHandler()
  {
    const target = document.querySelector('#mainContent');
    const observer = new MutationObserver(observed);
    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    };
    
    function observed()
    {
      let el;
      
      if((el = target.querySelector('#paginationBox'))){
        events(el);
        observer.disconnect();
      }  
    }

    observer.observe(target, config);    
  }

  function events(paginationBox)
  {
    pagination = {
      next : paginationBox.querySelector('#paginationNext'),
      prev : paginationBox.querySelector('#paginationPrev'),
      list : paginationBox.querySelector('#paginationList'),
      itens : paginationBox.querySelector('#paginationList').querySelectorAll('li'),
    };  

    pageClick();
    nextClick();
    prevClick();
  }
  
  function pageClick()
  {
    pagination.list.addEventListener('click', function (e){
      e.preventDefault();

      let session = {};

      if(!e.target.classList.contains('page_nav-item')){
        return false;
      }

      pagination.list.querySelector('.active').classList.remove('active');
      e.target.classList.add('active');

      session.currentPage = e.target.innerText;
      session.offset = offsetcalc(session.currentPage);
      
      storages(session);

      config.pageCallback(config.maxPerPage, session.offset);

    }, false);
  }

  function nextClick()
  {
    pagination.next.addEventListener('click', function(e){
      e.preventDefault();

      let session = {};
      let nextText = this.dataset.next;

      if(nextText >= config.maxPages()){
        return false;
      }

      session.paginationInit = nextText;
      pagination.prev.dataset.prev = pagination.itens[0].innerText;

      pagination.itens.forEach(function(current,index){
        current.innerText = nextText++;
      });

      this.dataset.next = nextText;
      
      session.currentPage = pagination.list.querySelector('.active').innerText;
      session.offset = offsetcalc(session.currentPage);

      storages(session);

      config.nextCallback(config.maxPerPage, session.offset);

    }, false);
  }

  function prevClick()
  {
    pagination.prev.addEventListener('click', function(e){
      let session = {};
      let prevText = pagination.prev.dataset.prev;

      if(prevText < 0){
        return false;
      }

      pagination.itens.forEach(function(current,index){
        current.innerText = prevText++;
      });

      pagination.next.dataset.next = prevText;
      pagination.prev.dataset.prev = pagination.itens[0].innerText - config.maxNavs;      
      
      session.paginationInit = pagination.itens[0].innerText;
      session.currentPage =  pagination.list.querySelector('.active').innerText;
      session.offset = offsetcalc(session.currentPage);

      storages(session);

      config.prevCallback(config.maxPerPage, session.offset);
    
    }, false);
  }

  function offsetcalc(page)
  {
    if(page <= 0){
      return 0;
    }

    return --page * config.maxPerPage;
  }

  function storages(session = {})
  {
    sessionStorage.setStorage('currentPage', session.currentPage);
    sessionStorage.setStorage('currentOffset', session.offset);
    
    if (session.paginationInit) {
      sessionStorage.setStorage('paginationInit', session.paginationInit);
    }
  }

  return {
    create: bind,
    config,
  };

})();
