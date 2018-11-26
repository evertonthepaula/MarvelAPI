import { Md5 } from 'ts-md5/dist/md5';
import apiKeys from '../../storages/apiKeys';

export default (function() {
  const privateKey = apiKeys.getPrivateKey();
  const publicKey = apiKeys.getPublicKey();

  let timestamp = Number(new Date());
  let hash = Md5.hashStr(timestamp + privateKey + publicKey);

  return {
    publicKey: publicKey,
    timestamp: timestamp,
    hash: hash,
  };
})();
