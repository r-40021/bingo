caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
        if (key.indexOf("bi-") !== -1) {
            return caches.delete(key);
        }
    }));
})