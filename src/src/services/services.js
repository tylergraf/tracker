(()=>{
  const trackerService = {};
  const trackService = {};

  trackerService.getAll = ()=>{
    return fetchData(`${API_BASE}/trackers`);
  };
  trackerService.get = (id)=>{
    return fetchData(`${API_BASE}/tracker/${id}`);
  };
  trackerService.create = (tracker)=>{
    return fetchData(`${API_BASE}/tracker`, {method: 'post', body: JSON.stringify(tracker)});
  };
  trackerService.remove = (id)=>{
    return fetchData(`${API_BASE}/tracker/${id}`, {method: 'delete'});
  };
  trackerService.update = (tracker)=>{
    return fetchData(`${API_BASE}/tracker/${tracker._id}`, {method: 'put', body: JSON.stringify(tracker)});
  };

  trackService.getAll = (trackerId)=>{
    return fetchData(`${API_BASE}/tracks/${trackerId}`);
  };
  trackService.get = (id)=>{
    return fetchData(`${API_BASE}/track/${id}`);
  };
  trackService.create = (track)=>{
    return fetchData(`${API_BASE}/track`, {method: 'post', body: JSON.stringify(track)});
  };
  trackService.remove = (id)=>{
    return fetchData(`${API_BASE}/track/${id}`, {method: 'delete'});
  };
  trackService.update = (track)=>{
    return fetchData(`${API_BASE}/track/${track._id}`, {method: 'put', body: JSON.stringify(track)});
  };

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
        config.headers.authorization = `Bearer ${idToken}`;
        return fetch(url,config)
      })
      .then(res=>{
        if(res.status === 204){
          return;
        }
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
