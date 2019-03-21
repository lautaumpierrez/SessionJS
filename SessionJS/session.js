// Dont send private data from session
class Session {
  constructor({createSession,data, expirationML, sessionName}){
    if(createSession)
      this.createSession({createSession,data, expirationML, sessionName});
  }
  createSession({createSession,data, expirationML, sessionName}){
    this.session = {
      data,
      sessionName,
      expiration: `${Date.now() + expirationML}`,
    };
    window.sessionStorage.setItem(sessionName, JSON.stringify(this.session));
  }
  verifySession({name}){
    const thisObj = this;
    return new Promise((resolve,reject)=>{
      if(thisObj.session !== null){
        if(window.sessionStorage.getItem(this.session.sessionName)){
          this.expirationVerify(window.sessionStorage.getItem(thisObj.session.sessionName))
          .then(session=>resolve(session)).catch(err=>reject(err))
        }
      }else{
        if(window.sessionStorage.getItem(name)){
          if(window.sessionStorage.getItem(name)){
            this.expirationVerify(window.sessionStorage.getItem(name)).then((session)=>resolve(session))
            .catch(err=>reject(err));
          }
        }
      }
    });
  }
  expirationVerify(sessionString){
    var session = JSON.parse(sessionString);
    if(session !== null){
      return new Promise((resolve,reject)=>{
        if(parseInt(session.expiration) > Date.now()){
          resolve(session)
        }else{
          reject({msg: 'Expired', expired: true});
        }
      });
    }
  }
}
