(function (document, undefined) {
    this.nest = {};
    /* stolen from _ */
    nest.has = function (obj, key) {
        return obj != null && ({}).hasOwnProperty.call(obj, key);
    };

    function extendDOM(el) {
        el.addClass = function (dot) {
            if (el.classList)
                el.classList.add(dot);
            else
                el.classList += (el.classList.indexOf(dot) != -1 ? dot : '');
            return el;
        }
        el.removeClass = function (dot) {
            if (el.classList)
                el.classList.remove(dot);
            else
                el.className = el.className.replace(dot, '');
            return el;
        }
    };

    nest.key = function (keydir, context) {

        keydir = keydir || 'keydown';
        context = context || window;

        var mod;

        var upon = function (key) {
            return {
                upon: function (fn) {
                    context.addEventListener(keydir, function (e) {
                        if (e[mod]) {
                            if (String.fromCharCode(e.which) === key.toUpperCase()) {
                                e.preventDefault();
                                fn();
                            }
                        }
                    });
                }
            };
        };

        return {
            ctrl: function (key) {
                mod = 'ctrlKey';
                return upon(key);
            },
            alt: function(key) {
                mod = 'altKey';
                return upon(key);
            },
            shift: function(key) {
                mod = 'shiftKey';
                return upon(key);
            }
        };

    };
    
        EventTarget.prototype.key = function(keydir) {
            return nest.key(keydir, this)   
        }

    nest.qs = function (sel, cb) {
        if (cb == undefined) {
            var elem = [].slice.call(document.querySelectorAll(sel));
            elem.map(extendDOM);
            return elem.length === 1 ? elem[0] : elem;
        }
        var t = ('' + cb).match(/\([a-z]+\)/)[0].replace(/[\(\)]/g, '');
        [].forEach.call(document.querySelectorAll(sel), function (el) {
            el.addEventListener(t, cb);
        });
    };

    EventTarget.prototype.listen = function (evt, lst, cpt) {
        var self = this;
        [].map.call(''.split.call(evt, ','), function (e) {
            self.addEventListener(e, lst, cpt);
        });
    };

    EventTarget.prototype.delegate = function (evt, sel, lst) {
        this.listen(evt, function (e) {
            if (e.target && e.target.nodeName === sel.toUpperCase())
                lst.call(e.target, e);
        });
    };

})(document)

function r(method, file, data, fn, header) {
    if (typeof data === 'function') fn = data;
    var req = new XMLHttpRequest();
    req.open(method.toUpperCase(), file, true);
    header = ({
        json: 'application/json',
        urlencoded: 'application/x-www-form-urlencoded',
        formdata: 'multipart/formdata'
    })[header] || 'text/plain';
    req.setRequestHeader('Content-Type', header + ';charset=utf-8');
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            fn && fn.call(req);
        }
    }
    if (fn) {
        req.send(data);
    } else {
        req.send();
    }
}