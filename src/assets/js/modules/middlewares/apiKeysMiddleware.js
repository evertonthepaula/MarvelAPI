import view from '../../Core/View/view';
import apiKeys from '../../storages/apiKeys';

export default (function(){

  if (apiKeys.getPublicKey() && apiKeys.getPrivateKey()) {
    return true;
  }

  view.load('apiKeys');

  return false;
});
