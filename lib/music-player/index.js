"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var classnames_1 = require("classnames");
function formatTimeNumber(number) {
    return (number + 100).toString().substr(1, 2);
}
function formatLyric(lyric) {
    var lyricRows = lyric.split('\n');
    var lyrics = [];
    lyricRows.forEach(function (row) {
        var matched = row.match(/\[(.*)\](.*)/) || {};
        var time = matched[1];
        var lyric = matched[2];
        if (time && !lyric) {
            lyrics.push({ time: 0, lyric: time });
        }
        if (time && lyric) {
            var _a = time.split(':'), m = _a[0], s = _a[1];
            time = Number(m) * 60 + Number(s);
            lyrics.push({ time: time, lyric: lyric });
        }
    });
    return lyrics;
}
function secondToMunite(time) {
    if (!time)
        return '--:--';
    var seconds = parseInt(time);
    return formatTimeNumber(parseInt((seconds / 60).toString())) + ':' + formatTimeNumber(seconds % 60);
}
var MusicPlayer = /** @class */ (function (_super) {
    __extends(MusicPlayer, _super);
    function MusicPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$audio = react_1.default.createRef();
        _this.$list = react_1.default.createRef();
        _this.$listInner = react_1.default.createRef();
        _this.currentIndex = 0;
        _this.lyricStr = '';
        _this.timer = null;
        _this.state = {
            currentIndex: 0,
            paused: true,
            currentTime: null,
            duration: null,
            open: false,
            showList: false,
            hiddenInBottom: false,
        };
        _this.handleLoadLrc = function () {
            var request = new XMLHttpRequest();
            var url = _this.props.musics[_this.state.currentIndex].lrc;
            request.open('GET', url, true);
            request.onload = function () {
                _this.lyricStr = request.response;
            };
            request.send();
        };
        _this.handlePlay = function () {
            var music = _this.props.musics[_this.state.currentIndex];
            var audio = _this.$audio.current;
            _this.handleLoadLrc();
            _this.props.onPlay && _this.props.onPlay(music);
            _this.setState({ paused: false });
            window.localStorage.setItem('current-music-id', music.id);
            audio.play(audio.currentTime);
            _this.timer = setInterval(function () {
                var currentTime = audio.currentTime, duration = audio.duration;
                _this.setState({ currentTime: currentTime, duration: duration });
            }, 100);
        };
        _this.handlePause = function () {
            _this.setState({ paused: true });
            _this.$audio.current && _this.$audio.current.pause();
            _this.timer && clearInterval(_this.timer);
        };
        _this.handlePlayFrom = function (e) {
            var audio = _this.$audio.current;
            var _a = e.target.getBoundingClientRect(), left = _a.left, width = _a.width;
            var clickPos = (e.clientX - left) / width;
            var time = audio.duration * clickPos;
            if (!time)
                return false;
            audio.currentTime = time;
        };
        _this.handleNext = function () {
            var currentIndex = _this.state.currentIndex + 1;
            if (currentIndex >= _this.props.musics.length) {
                currentIndex = 0;
            }
            _this.setState({ currentIndex: currentIndex }, _this.handlePlay);
        };
        _this.handlePrev = function () {
            var currentIndex = _this.state.currentIndex - 1;
            if (currentIndex < 0) {
                currentIndex = _this.props.musics.length - 1;
            }
            _this.setState({ currentIndex: currentIndex }, _this.handlePlay);
        };
        _this.handleToggle = function (currentIndex) {
            _this.setState({ currentIndex: currentIndex }, _this.handlePlay);
        };
        // ui 样式功能， 开关列表和播放器 open hiddenInBottom showList
        _this.handleToggleOpen = function () {
            var open = !_this.state.open;
            _this.setState({ open: open });
            localStorage.setItem('open-music-player', open ? '1' : '0');
        };
        _this.handleToggleList = function () {
            var showList = !_this.state.showList;
            var list = _this.$list.current;
            var listInnerWrapper = _this.$listInner.current;
            list.style.height = showList ? listInnerWrapper.offsetHeight + 'px' : 0 + 'px';
            _this.setState({ showList: showList });
        };
        _this.handleTogglePanel = function () {
            var hiddenInBottom = !_this.state.hiddenInBottom;
            _this.setState({ hiddenInBottom: hiddenInBottom });
        };
        return _this;
    }
    MusicPlayer.prototype.componentDidMount = function () {
        var musics = this.props.musics;
        var audio = this.$audio.current;
        var currentIndex = musics && musics.findIndex(function (item) { return item.id === window.localStorage.getItem('current-music-id'); });
        this.setState({
            open: window.localStorage.getItem('open-music-player') === '1',
            currentIndex: currentIndex !== -1 ? currentIndex : 0,
        });
        if (audio) {
            audio.addEventListener('play', this.handlePlay);
            audio.addEventListener('pause', this.handlePause);
            this.props.getAudio && this.props.getAudio(audio);
        }
    };
    MusicPlayer.prototype.componentDidUpdate = function (nextProps) {
        // 切换歌单
        if (nextProps.musics !== this.props.musics) {
            this.setState({ currentIndex: 0 }, this.handlePlay);
        }
    };
    MusicPlayer.prototype.componentWillUnmount = function () {
        this.timer && clearInterval(this.timer);
    };
    Object.defineProperty(MusicPlayer.prototype, "lyric", {
        get: function () {
            if (!this.lyricStr)
                return false;
            var lyricsInfo = formatLyric(this.lyricStr);
            var audio = this.$audio.current || {};
            var currentLyric = '';
            lyricsInfo && lyricsInfo.forEach(function (item, index) {
                var isLast = lyricsInfo.length === index + 1;
                var musicTime = audio.currentTime;
                if (isLast && musicTime > item.time - 0.02) {
                    currentLyric = item.lyric;
                }
                else {
                    if (musicTime > item.time - 0.02 && musicTime < lyricsInfo[index + 1].time - 0.02) {
                        currentLyric = item.lyric;
                    }
                }
            });
            return currentLyric;
        },
        enumerable: true,
        configurable: true
    });
    MusicPlayer.prototype.render = function () {
        var _this = this;
        var _a = this.state, open = _a.open, duration = _a.duration, currentTime = _a.currentTime, hiddenInBottom = _a.hiddenInBottom, showList = _a.showList, paused = _a.paused, currentIndex = _a.currentIndex;
        var _b = this.props, _c = _b.audioConfig, audioConfig = _c === void 0 ? { position: 'bottom', size: 'large' } : _c, musics = _b.musics;
        if (!musics || !musics.length)
            return false;
        var _d = musics[currentIndex], pic = _d.pic, name = _d.name, singer = _d.singer, url = _d.url;
        var audio = this.$audio.current || {};
        return (react_1.default.createElement("div", { className: classnames_1.default("main-music-player", open ? 'open' : 'close', hiddenInBottom ? 'hidden' : 'show', showList && 'main-music-player-show-list', audioConfig.position === 'bottom' && 'main-music-player-in-bottom', audioConfig.size === 'large' && 'main-music-player-large', paused ? 'pause' : 'play') },
            react_1.default.createElement("audio", { src: url, ref: this.$audio, onEnded: this.handleNext }),
            react_1.default.createElement("div", { className: "main-music-player-wrapper" },
                react_1.default.createElement("div", { className: "main-music-player-pic", onClick: paused ? this.handlePlay : this.handlePause },
                    react_1.default.createElement("img", { src: pic }),
                    react_1.default.createElement("div", { className: classnames_1.default("music-player-play-btn", paused ? 'pause' : 'play') },
                        react_1.default.createElement("svg", { width: 30, height: 30 },
                            react_1.default.createElement("path", { className: "svg-play-btn", stroke: "#fff", strokeWidth: 3, strokeLinecap: "butt", fill: "none" })))),
                react_1.default.createElement("div", { className: "main-music-player-info" },
                    react_1.default.createElement("div", { style: { width: '100%' } },
                        react_1.default.createElement("div", { className: "main-music-player-name text-overflow-ellipsis", style: { width: 'calc(100% - 80px)' } }, name),
                        react_1.default.createElement("div", { className: "main-music-player-author" }, singer)),
                    react_1.default.createElement("div", { className: "main-music-player-control" },
                        react_1.default.createElement("svg", { width: 25, height: 30, onClick: this.handlePrev },
                            react_1.default.createElement("path", { className: "svg-play-btn", stroke: "#999", strokeWidth: 3, strokeLinecap: "round", fill: "none", d: "M18 3 5 15 18 27" })),
                        react_1.default.createElement("svg", { width: 25, height: 30, onClick: this.handleNext },
                            react_1.default.createElement("path", { className: "svg-paly-btn", stroke: "#999", strokeWidth: 3, strokeLinecap: "round", fill: "none", d: "M3 3 18 15 3 27" }))),
                    currentTime
                        ? react_1.default.createElement("div", { className: "main-music-player-progress-bar", onClick: this.handlePlayFrom },
                            react_1.default.createElement("div", { className: "main-music-player-progress-bar-inner", style: { width: currentTime / duration * 100 + "%" } }),
                            react_1.default.createElement("span", { className: "main-music-player-progress-bar-timer" },
                                secondToMunite(audio.currentTime),
                                " / ",
                                secondToMunite(audio.duration)),
                            this.lyric
                                ? react_1.default.createElement("span", { className: "main-music-player-progress-bar-lyric text-overflow-ellipsis", style: { width: 'calc(100% - 80px)' } }, this.lyric)
                                : null)
                        : null),
                react_1.default.createElement("div", { className: classnames_1.default("main-music-player-toggle", open ? 'open' : 'close'), onClick: this.handleToggleOpen },
                    react_1.default.createElement("svg", { width: 10, height: 30 },
                        react_1.default.createElement("path", { className: "svg-btn", stroke: "#fff", strokeWidth: 2, strokeLinecap: "butt", fill: "none" })))),
            react_1.default.createElement("div", { className: "main-music-player-sider" },
                react_1.default.createElement("div", { className: "main-music-player-sider-ball", onClick: this.handleToggleList }, "\u5217\u8868"),
                react_1.default.createElement("div", { className: "main-music-player-sider-ball", onClick: this.handleTogglePanel }, "\u6536\u8D77")),
            react_1.default.createElement("div", { className: "main-music-player-list", ref: this.$list },
                react_1.default.createElement("div", { className: "main-music-player-list-inner", ref: this.$listInner },
                    react_1.default.createElement("h3", null,
                        "\u64AD\u653E\u5217\u8868 ",
                        react_1.default.createElement("span", { className: "sub" },
                            "\u5171",
                            musics.length,
                            "\u9996")),
                    react_1.default.createElement("div", { className: "main-music-player-list-wrapper" }, musics.map(function (music, index) { return (react_1.default.createElement("div", { key: music.id, className: "main-music-player-list-item", onClick: function () { return _this.handleToggle(index); } },
                        react_1.default.createElement("span", { className: "main-music-player-list-item-name" }, music.name),
                        react_1.default.createElement("span", { className: "main-music-player-list-item-singer" }, music.singer))); }))))));
    };
    return MusicPlayer;
}(react_1.default.Component));
exports.default = MusicPlayer;
