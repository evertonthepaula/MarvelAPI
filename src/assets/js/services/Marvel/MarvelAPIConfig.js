import {Md5} from 'ts-md5/dist/md5';

export default (function(){
  const privateKey = process.env.PRIVATE_KEY;
  const publicKey = process.env.PUBLIC_KEY;
  
  let timestamp = Number(new Date());
  let hash = Md5.hashStr(timestamp + privateKey + publicKey);

  return {
    publicKey: publicKey,
    timestamp: timestamp,
    hash: hash,
  };

})();