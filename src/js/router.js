var router = (function () {
    "use strict";

    var routes = [];
    var authService = null;

    function setAuthService(service) {
        authService = service;
    }

    function checkAuth() {
        return authService && authService.token;
    }

    function addRoute(route, handler) {
        routes.push({
            parts: route.split('/'), 
            handler: handler,
            requiresAuth: route !== 'login' && route !== 'register'
        });
    }

    function load(route) {
        window.location.hash = route;
    }

    function parseRoute() {
        var path = window.location.hash.substring(1) || '',
            parts = path.split('/'),
            partsLength = parts.length;

        // Allow access to auth routes without token
        if (path === 'login' || path === 'register') {
            handleRoute(path, parts, partsLength);
            return;
        }

        // Check authentication for other routes
        if (!checkAuth()) {
            load('login');
            return;
        }

        handleRoute(path, parts, partsLength);
    }

    function handleRoute(path, parts, partsLength) {
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route.parts.length === partsLength) {
                var params = [];
                for (var j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                    route.handler.apply(undefined, params);
                    return;
                }
            }
        }
    }

    window.addEventListener('hashchange', parseRoute);

    return {
        addRoute: addRoute,
        load: load,
        parseRoute: parseRoute,
        setAuthService: setAuthService
    };

}());

export default router;