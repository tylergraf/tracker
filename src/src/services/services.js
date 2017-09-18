(()=>{
  const trackerService = {};
  const trackService = {};

  trackerService.getAll = ()=>{
    return fetchData(`${API_BASE}/trackers`);
  };
  trackerService.get = (id)=>{
    return fetchData(`${API_BASE}/tracker/${id}`);
  };
  // router.post('/tracker', verifyAuth, findOrCreateUser, tracker.create);
  // router.put('/tracker/:id', verifyAuth, findOrCreateUser, tracker.update);
  // router.delete('/tracker/:id', verifyAuth, findOrCreateUser, tracker.remove);
  // router.get('/tracker/:id', verifyAuth, findOrCreateUser, tracker.get);
  // router.get('/trackers', verifyAuth, findOrCreateUser, tracker.list);


  // router.post('/track', verifyAuth, findOrCreateUser, track.create);
  // router.put('/track/:id', verifyAuth, findOrCreateUser, track.update);
  // router.delete('/track/:id', verifyAuth, findOrCreateUser, track.remove);
  // router.get('/track/:id', verifyAuth, findOrCreateUser, track.get);
  // router.get('/tracks/:trackerId', verifyAuth, findOrCreateUser, track.list);


  const fetchData = function(url, config){
    const currentUser = firebase.auth().currentUser;
    if(!currentUser){
      return Promise.reject(401);
    }

    config = config || {};
    const defaults = {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    config = Object.assign(defaults, config);

    return currentUser.getIdToken()
      .then(idToken=>{
        config.headers.authorization = 'Bearer '+idToken;
        return fetch(url,config)
      })
      .then(res=>{
        if(res.status < 400){
          return res.json();
        }

        throw new Error(res.status);
      });
  }

  window.services = {
    trackerService,
    trackService
  };

})();
