export default (function(){

  let pagination;
  const params = {
    total: 0,
    maxPerPage: 0,
    maxNavs: 0,
    pagesTotal(){
      return Math.ceil( params.total / params.maxPerPage);
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
    return `
      <div class="page_nav" id="paginationBox">
        <span id="paginationPrev" class="page_nav-prev" data-prev="-1" data-text="-1"></span>  
          <ol id="paginationList" class="page_nav-list" data-final="${params.pagesTotal()}">
            ${navIntens()}
          </ol>
        <span id="paginationNext" class="page_nav-next" data-next="60" data-text="7"></span>
      </div>
    `;
  }

  function navIntens()
  { 
    let page_nav = '';

    for( let x = 0; x < params.maxNavs;){
      page_nav +=  `
        <li class="page_nav-item ${(x === 0)? 'active':''}" data-page="${x * params.maxPerPage}">${++x}</li>
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
      totalpages : paginationBox.querySelector('#paginationList').dataset.final,
    };  

    pageClick();
    nextClick();
    prevClick();
  }
  
  function pageClick()
  {
    pagination.list.addEventListener('click', function (e){
      e.preventDefault();

      if(!e.target.classList.contains('page_nav-item')){
        return false;
      }

      let offset = e.target.dataset.page;

      pagination.list.querySelector('.active').classList.remove('active');
      e.target.classList.add('active');
      
      params.pageCallback(params.maxPerPage, offset);

    }, false);
  }

  function nextClick()
  {
    pagination.next.addEventListener('click', function(e){
      e.preventDefault();

      let nextRange = parseInt(this.dataset.next);
      let nextText = this.dataset.text;

      if(nextRange >= pagination.totalpages){
        return false;
      }

      pagination.prev.dataset.prev = pagination.itens[0].dataset.page;
      pagination.prev.dataset.text = pagination.itens[0].innerText;

      pagination.itens.forEach(function(current,index){
        current.dataset.page = nextRange;
        current.innerText = nextText;

        nextRange = nextRange + params.maxPerPage;
        nextText++;
      });

      this.dataset.text = nextText;
      this.dataset.next = nextRange;
      
      let offset = pagination.list.querySelector('.active').dataset.page;
      
      params.nextCallback(params.maxPerPage, offset);

    }, false);
  }

  function prevClick()
  {
    pagination.prev.addEventListener('click', function(e){

      let prevRange = parseInt(pagination.prev.dataset.prev);
      let prevText = pagination.prev.dataset.text;

      if(prevText < 0){
        return false;
      }

      pagination.itens.forEach(function(current,index){
        current.dataset.page = prevRange;
        current.innerText = prevText;

        prevRange = prevRange + params.maxPerPage;
        prevText++;
      });

      pagination.next.dataset.text = prevText;
      pagination.next.dataset.next = prevRange;

      pagination.prev.dataset.prev = pagination.itens[0].dataset.page - (params.maxPerPage * params.maxNavs);
      pagination.prev.dataset.text = pagination.itens[0].innerText - params.maxNavs;      

      let offset = pagination.list.querySelector('.active').dataset.page;
      
      params.prevCallback(params.maxPerPage, offset);
    
    }, false);
  }

  return {
    create: bind,
    params,
  };

})();
