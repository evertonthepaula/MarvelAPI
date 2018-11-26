import view from '../../Core/View/view';

export default (function() {
  if (navigator.onLine) {
    return true;
  }

  view.load('offline');

  return false;
});
