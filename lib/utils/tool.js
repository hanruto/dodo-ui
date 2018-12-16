"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatTimeNumber(number) {
    return (number + 100).toString().substr(1, 2);
}
exports.formatTimeNumber = formatTimeNumber;
function getDay(date, split) {
    split = split || '/';
    date = new Date(date);
    return date.getFullYear() + split + formatTimeNumber((date.getMonth() + 1)) + split + formatTimeNumber(date.getDate());
}
exports.getDay = getDay;
function getHour(date) {
    date = new Date(date);
    return date.getHours() + ' : ' + formatTimeNumber(date.getMinutes());
}
exports.getHour = getHour;
function dateFormater(originDate, isShowHour, opt) {
    if (opt === void 0) { opt = {}; }
    var daySplit = opt.daySplit || '/';
    var formatDate = getDay(originDate, daySplit);
    if (isShowHour) {
        var formatHour = getHour(originDate);
        formatDate = formatDate + ' - ' + formatHour;
    }
    return formatDate;
}
exports.dateFormater = dateFormater;
function formatLyric(lyric) {
    if (!lyric)
        return false;
    var lyricRows = lyric.split('\n');
    var lyrics = [];
    lyricRows.forEach(function (row) {
        var matched = row.match(/\[(.*)\](.*)/) || {};
        var time = matched[1];
        var lyric = matched[2];
        if (time && lyric) {
            var _a = time.split(':'), m = _a[0], s = _a[1];
            time = Number(m) * 60 + Number(s);
            lyrics.push({ time: time, lyric: lyric });
        }
    });
    return lyrics;
}
exports.formatLyric = formatLyric;
function secondToMunite(time) {
    if (!time)
        return '00:00';
    var seconds = parseInt(time);
    return formatTimeNumber(parseInt((seconds / 60).toString())) + ':' + formatTimeNumber(seconds % 60);
}
exports.secondToMunite = secondToMunite;
function getLocationQuery(location) {
    if (!location.search) {
        return {};
    }
    return location.search.split('?')[1].split('&').reduce(function (pre, queryItem) {
        pre[queryItem.split('=')[0]] = queryItem.split('=')[1];
        return pre;
    }, {});
}
exports.getLocationQuery = getLocationQuery;
function pageScrollTo(height, offset) {
    var currentTop = window.pageYOffset;
    var goalTop;
    if (typeof height === 'number') {
        goalTop = height;
    }
    else {
        goalTop = height.getBoundingClientRect().top;
    }
    if (offset) {
        goalTop = goalTop + offset;
    }
    var interval = 600;
    var frameRate = 60;
    var frameInterval = 1000 / frameRate;
    var totalFrame = interval / frameInterval;
    var animateFn = function (t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b; };
    var currentFrame = 0;
    var scroll = function () {
        currentFrame++;
        if (currentFrame > totalFrame) {
            return false;
        }
        var y = animateFn(currentFrame, currentTop, goalTop - currentTop, totalFrame);
        window.scrollTo(0, y);
        setTimeout(function () {
            scroll();
        }, frameInterval);
    };
    scroll();
}
exports.pageScrollTo = pageScrollTo;
function loadSound(url) {
    return new Promise(function (resolve) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        // 一旦获取完成，对音频进行进一步操作，比如解码
        request.onload = function () {
            var arraybuffer = request.response;
            resolve(arraybuffer);
        };
        request.send();
    });
}
exports.loadSound = loadSound;
function rn(s, e) {
    if (s === void 0) { s = 0; }
    if (e === void 0) { e = 255; }
    var i = e - s;
    var color = parseInt((s + Math.random() * i).toString());
    return color;
}
exports.rn = rn;
function rc(opacity) {
    var op = opacity ? opacity : 1;
    return 'rgba(' + rn() + ',' + rn() + ',' + rn() + ',' + op + ')';
}
exports.rc = rc;
function getDOMById(id) {
    var el = document.getElementById(id);
    if (!el) {
        el = document.createElement('div');
        el.id = id;
        document.body.appendChild(el);
    }
    return el;
}
exports.getDOMById = getDOMById;
function downloadFile(src) {
    var downloader = document.createElement('a');
    downloader.setAttribute('href', src);
    downloader.setAttribute('target', '_blank');
    document.body.appendChild(downloader);
    downloader.click();
    document.body.removeChild(downloader);
}
exports.downloadFile = downloadFile;
