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
    // const currentUser = firebase.auth().currentUser;
    // if(!currentUser){
    //   return Promise.reject(401);
    // }

    config = config || {};
    const defaults = {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    config = Object.assign(defaults, config);

    // return currentUser.getIdToken()
    //   .then(idToken=>{
        config.headers.authorization = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0NWM3MTI4Y2JhMTBlMjUxYjlmZTcxMmFlZDUyNjEzMzg4YTY2OTkifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHJhY2tlci0zYjQwYiIsIm5hbWUiOiJUeWxlciBHcmFmIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tT09WbUJfNkdjdVkvQUFBQUFBQUFBQUkvQUFBQUFBQUFBWEEvTlQteW9uODVVUHMvcGhvdG8uanBnIiwiYXVkIjoidHJhY2tlci0zYjQwYiIsImF1dGhfdGltZSI6MTUwNTc5NDMxOSwidXNlcl9pZCI6IjNPb0g1VEtubHVVNjJ6NlVuQ25kcE01V1d2WTIiLCJzdWIiOiIzT29INVRLbmx1VTYyejZVbkNuZHBNNVdXdlkyIiwiaWF0IjoxNTA1ODA0NTYzLCJleHAiOjE1MDU4MDgxNjMsImVtYWlsIjoidHlsZXJncmFmQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEzNjM4NDkzMjIwNDY3MDE4NDIxIl0sImVtYWlsIjpbInR5bGVyZ3JhZkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.BNBa-Vc7DHXeLZrh5qqMTMFRjPo6DiAXP_sXUUfU_OE9L6JwUUtpGv8kG8RWkz3Q_0WXbqhe51YSA-hyhyJmkBhWzDoq72WGBBw6YF50fqNCLgAKz7p4Oqzu1D77h_J_nlFjKu3hdKxsAn25LZdn5jksLir0vIF9Np37j0FVnKytI4TK05Yj8soe-nqw5TtQ0_YT6m-rVGcOopqKLGqhf88UtIthf59WKWP8y8JAZ-q1Gdu4dSg5mSN6ZLbuFDpVZUZM3cuOwiFAzl8WQ-j-aVuRG3DM3sQnXy2uMrHneZV4ArxJ8ktfd9JAGur5Bjamv54MaKCJ8u6gejRfKoJ0eA';
        return fetch(url,config)
      // })
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
