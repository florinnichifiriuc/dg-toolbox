// ==UserScript==
// @name         DarkGalaxy Toolbox
// @version      2.0.0
// @namespace    dg-toolbox
// @homepage     https://github.com/vberezan/dg-toolbox
// @supportURL   https://github.com/vberezan/dg-toolbox
// @downloadURL  https://raw.githubusercontent.com/vberezan/dg-toolbox/development/install/dg-toolbox-development.user.js
// @updateURL    https://raw.githubusercontent.com/vberezan/dg-toolbox/development/install/dg-toolbox-development.user.js
// @description  Revamp DarkGalaxy UI and some additional crafts. All of this to combine the classical DG experience with the modern web experience. This toolbox is supported only by modern browsers.
// @match        https://*.darkgalaxy.com
// @match        https://*.darkgalaxy.com/*
// @author       Vlad Berezan
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function loadResource(element) {
    let node = document.createElement(element.tagName);

    if (element.href) {
        node.href = element.href;
    }

    if (element.src) {
        node.src = element.src;
    }

    node.rel = element.rel;
    document.head.append(node);

    return node;
}

function getVersion() {
    if (localStorage.getItem('js-version')) {
        return JSON.parse(localStorage.getItem('js-version')).value;
    } else {
        return 'v2.0.0';
    }
}

function loadSetups(windowURL) {
    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/install/parts/dgt-toolbox-setup-dgt-placeholders.12.js',
        rel: 'text/javascript'
    }).onload = function () {
        setupPlaceHolders(windowURL);
    }
}

function loadCustomStyling(windowURL) {
    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/install/parts/dg-toolbox-custom-styling.60.js',
        rel: 'text/javascript'
    }).onload = function () {
        applyCustomStyling(windowURL);

        loadResource({
            tagName: 'script',
            src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/install/parts/dg-toolbox-replace-icons-with-fa-icons.10.js',
            rel: 'text/javascript'
        }).onload = function () {
            replaceIconsWithFAIcons();
        }

        loadResource({
            tagName: 'script',
            src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/install/parts/dg-toolbox-replace-icons-with-images.31.js',
            rel: 'text/javascript'
        }).onload = function () {
            replaceIconsWithImages();
        }

        loadResource({
            tagName: 'script',
            src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/install/parts/dg-toolbox-replace-planets-images.6.js',
            rel: 'text/javascript'
        }).onload = function () {
            replacePlanetsImages();
        }

        loadResource({
            tagName: 'script',
            src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/install/parts/dg-toolbox-replace-structures-images.8.js',
            rel: 'text/javascript'
        }).onload = function () {
            replaceStructuresImages(window.location.origin);
        }

        loadResource({
            tagName: 'script',
            src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/install/parts/dg-toolbox-replace-ships-images.17.js',
            rel: 'text/javascript'
        }).onload = function () {
            replaceShipsImages();
        }
    }
}

function loadAngular() {
    let angular = [{
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/runtime.926d433ed3f5f1cc.js',
        rel: 'module'
    }, {
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/polyfills.8e8b88e65f8eb80f.js',
        rel: 'module'
    }, {
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/main.a0b1c9b9db647ee7.js',
        rel: 'module'
    }];

    loadResource(angular[0]).onload = function () {
        console.log("%cDGT%c - setting up runtime", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
        loadResource(angular[1]).onload = function () {
            console.log("%cDGT%c - preparing polyfills", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            loadResource(angular[2]).onload = function () {
                console.log("%cDGT%c - booting application modules", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            }
        }
    }
}

function loadGlobalAngularStyling() {
    let angular = [{
        tagName: 'link',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/styles.fc905aefbcf68087.css',
        rel: 'stylesheet'
    }];

    angular.forEach((ang) => {
        loadResource(ang);
    });
}

(function () {
    document.addEventListener("DOMContentLoaded", function (event) {
        localStorage.setItem('dev-mode', true);
        if (localStorage.getItem('hotfix') !== '2.0.0' ) {
            if (!localStorage.getItem('post-install-fetch-metadata')) {
                localStorage.clear();
            }
            localStorage.setItem('hotfix', '2.0.0');
        }


        let windowURL = window.location.pathname.split(/\//g);

        console.log("%cDarkGalaxy Toolbox - DGT", "font-size: 16px; font-weight: bold;");

        loadGlobalAngularStyling();

        loadResource({
            tagName: 'script',
            src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/install/parts/dg-toolbox-utils.4.js',
            rel: 'text/javascript'
        }).onload = function () {
            if (document.getElementById('playerBox')) {
                document.getElementById('playerBox').append(document.createElement('dgt-authentication'));

                console.log("%cDGT%c - assembling platform environment", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadSetups(windowURL);
                console.log("%cDGT%c - injecting additional components", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadAngular();
                console.log("%cDGT%c - applying custom theme", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadCustomStyling(windowURL);
                setTimeout(() => {
                    document.body.style.visibility = 'visible';
                }, 0);
            } else {
                setTimeout(() => {
                    document.body.style.visibility = 'visible';
                }, 0);
            }
        }

        if (!localStorage.getItem('local-metadata')) {
            localStorage.setItem('local-metadata', '{"ttl":0,"expiry":0,"value":"{\\"dgtVersion\\":\\"' + getVersion() + '\\",\\"allianceMembersTurn\\":{\\"version\\":0,\\"turn\\":0},\\"playersRankingsTurn\\":{\\"version\\":0,\\"turn\\":0},\\"planetsTurn\\":{\\"version\\":0,\\"turn\\":0}}"}');
        }

        localStorage.setItem('game-endpoint', '{"ttl":0,"expiry":0,"value":"\\"' + window.location.origin + '\\""}');
    });

    window.unload = function() {
        document.body.style.visibility = 'hidden';
    };
})();
