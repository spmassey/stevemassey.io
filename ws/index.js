var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({server: server, port: 4080});

wss.on('connection', function connection(ws) {
    //var location = url.parse(ws.upgradeReq.url, true);
    ws.on('message', function incoming(message) {
        var payload = JSON.parse(message);
        var path = payload.path || '',
            action = payload.action || '';
        switch (path.replace(/^\/+/, '').replace(/\/+$/, '')) {
            case('users'):
                switch (action) {
                    // GET all users
                    default:
                        UsersApi.get()
                            .then(function (users) {
                                ws.send(JSON.stringify({
                                    path: path,
                                    action: action,
                                    result: users
                                }));
                            }, function (err) {
                                // TODO: write me
                            });
                }
                break;
            case('user'):
                switch (action) {
                    case('add'):
                        UserApi.add(payload.data)
                            .then(function (newId) {
                                ws.send(JSON.stringify({
                                    path: path,
                                    action: action,
                                    result: newId
                                }));
                            }, function (err) {
                                // TODO: write me
                            });
                        break;
                    case('remove'):
                        UserApi.remove(payload.id)
                            .then(function () {
                                ws.send(JSON.stringify({
                                    path: path,
                                    action: action,
                                    result: payload.id
                                }));
                            }, function (err) {
                                // TODO: write me
                            });
                        break;
                    case('update'):
                        UserApi.save(payload.data.id, payload.data)
                            .then(function () {
                                ws.send(JSON.stringify({
                                    path: path,
                                    action: action,
                                    result: { uid: payload.id }
                                }));
                            }, function (err) {
                                // TODO: write me
                            });
                        break;
                    default:
                    // TODO: write me
                }
                break;
            default:
                ws.send(JSON.stringify({message: 'Hello!', time: Date.now()}));
        }

    });
});