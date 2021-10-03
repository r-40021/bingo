caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
        if ("bi-".indexOf(key) !== -1) {
            return caches.delete(key);
        }
    }));
})