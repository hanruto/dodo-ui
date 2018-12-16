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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var tool_1 = require("../utils/tool");
var icon_1 = require("../icon");
var lodash_1 = require("lodash");
var noop = function () { };
var MusicList = function (props) {
    var musics = props.musics, onToggle = props.onToggle, current = props.current;
    return (React.createElement("div", { className: "main-music-player-list" },
        React.createElement("h3", null,
            "\u64AD\u653E\u5217\u8868 ",
            React.createElement("span", { className: "sub" },
                "\u5171",
                musics.length,
                "\u9996")),
        React.createElement("div", { className: "main-music-player-list-wrapper" }, musics.map(function (music, index) { return (React.createElement("div", { key: music.id, className: classnames_1.default("main-music-player-list-item", current === index && 'active'), onClick: function () { return onToggle(index); } },
            React.createElement("span", { className: "main-music-player-list-item-name" }, music.name),
            React.createElement("span", { className: "main-music-player-list-item-singer" }, music.singer))); }))));
};
var MusicPlayer = /** @class */ (function (_super) {
    __extends(MusicPlayer, _super);
    function MusicPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$audio = React.createRef();
        _this.currentIndex = 0;
        _this.state = {
            currentIndex: 0,
            loop: false,
            currentTime: null,
            duration: null,
            random: false,
            open: false,
            showList: false,
        };
        _this.timer = null;
        _this.playTimer = null;
        _this.playPromise = null;
        _this.historyRoute = '/music/list';
        _this.handlePlay = function () { return __awaiter(_this, void 0, void 0, function () {
            var audio, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        audio = this.$audio.current;
                        if (!this.playPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.playPromise];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _a = this;
                        return [4 /*yield*/, audio.play(audio.currentTime)
                                .catch(function (err) {
                                console.log(err);
                                clearTimeout(_this.playTimer);
                                _this.playTimer = setTimeout(function () { return _this.handlePlay(); }, 1000);
                            })
                                .then(function () {
                                clearInterval(_this.timer);
                                _this.timer = setInterval(function () {
                                    var currentTime = audio.currentTime, duration = audio.duration;
                                    _this.setState({ currentTime: currentTime, duration: duration });
                                }, 200);
                            })];
                    case 3:
                        _a.playPromise = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.handlePause = function () {
            _this.$audio.current && _this.$audio.current.pause();
            _this.handleClear();
        };
        _this.handleClear = function () {
            _this.timer && clearInterval(_this.timer);
            _this.playTimer && clearTimeout(_this.playTimer);
        };
        _this.handlePlayFrom = function (e) {
            var audio = _this.$audio.current;
            var _a = e.currentTarget.getBoundingClientRect(), left = _a.left, width = _a.width;
            var clickPos = (e.clientX - left) / width;
            var currentTime = audio.duration * clickPos;
            audio.currentTime = currentTime;
            _this.setState({ currentTime: currentTime });
        };
        _this.handleNext = function () {
            var _a = _this.state, random = _a.random, currentIndex = _a.currentIndex;
            var musics = _this.props.musics;
            var nextIndex = 0;
            if (random) {
                var currentId_1 = musics[currentIndex].id;
                var randomIndex = _this.randomList.findIndex(function (item) { return item.id === currentId_1; });
                var nextId_1 = _this.randomList[randomIndex + 1 > _this.randomList.length ? 0 : randomIndex + 1].id;
                nextIndex = musics.findIndex(function (item) { return item.id === nextId_1; });
            }
            else {
                nextIndex = _this.state.currentIndex + 1;
                if (nextIndex >= musics.length)
                    nextIndex = 0;
            }
            _this.setState({ currentIndex: nextIndex }, function () { return _this.handleChangeIndex(nextIndex); });
        };
        _this.handlePrev = function () {
            var _a = _this.state, random = _a.random, currentIndex = _a.currentIndex;
            var musics = _this.props.musics;
            var nextIndex = currentIndex;
            if (random) {
                var currentId_2 = musics[currentIndex].id;
                var randomIndex = _this.randomList.findIndex(function (item) { return item.id === currentId_2; });
                var nextId_2 = _this.randomList[randomIndex - 1 < 0 ? _this.randomList.length - 1 : randomIndex - 1].id;
                nextIndex = musics.findIndex(function (item) { return item.id === nextId_2; });
            }
            else {
                nextIndex = currentIndex - 1;
                if (nextIndex < 0)
                    nextIndex = musics.length - 1;
            }
            _this.setState({ currentIndex: nextIndex }, function () { return _this.handleChangeIndex(nextIndex); });
        };
        _this.handleToggle = function (currentIndex) {
            _this.setState({ currentIndex: currentIndex }, function () { return _this.handleChangeIndex(currentIndex); });
        };
        _this.handleChangeIndex = function (nextIndex) {
            var _a = _this.props, paused = _a.paused, musics = _a.musics;
            if (!paused)
                _this.handlePlay();
            _this.props.onChange && _this.props.onChange(musics[nextIndex], nextIndex);
        };
        _this.handleToggleOpen = function () {
            var open = !_this.state.open;
            _this.setState({ open: open });
            localStorage.setItem('open-music-player', open ? '1' : '0');
        };
        _this.handleToggleList = function () {
            _this.setState({ showList: !_this.state.showList });
        };
        _this.handleToggleLoop = function () {
            var loop = !_this.state.loop;
            var audio = _this.$audio.current;
            loop ? audio.removeEventListener('ended', _this.handleNext) : audio.addEventListener('ended', _this.handleNext);
            _this.setState({ loop: loop });
        };
        _this.handleRandom = function () {
            _this.setState({ random: !_this.state.random });
        };
        return _this;
    }
    Object.defineProperty(MusicPlayer.prototype, "randomList", {
        get: function () {
            return lodash_1.default.shuffle(this.props.musics);
        },
        enumerable: true,
        configurable: true
    });
    MusicPlayer.prototype.componentDidMount = function () {
        var _this = this;
        var audio = this.$audio.current;
        this.setState({ open: window.localStorage.getItem('open-music-player') === '1' });
        audio.addEventListener('ended', this.handleNext);
        audio.addEventListener('play', this.handlePlay);
        audio.addEventListener('pause', this.handlePause);
        audio.addEventListener('canplay', function () {
            var currentTime = audio.currentTime, duration = audio.duration;
            _this.setState({ currentTime: currentTime, duration: duration });
        });
        audio.addEventListener('error', function () { return setTimeout(_this.handleNext, 500); });
        this.props.getAudio && this.props.getAudio(audio);
    };
    MusicPlayer.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (prevProps.paused !== this.props.paused) {
            var paused = this.props.paused;
            paused ? this.handlePause() : this.handlePlay();
        }
        if (prevProps.listId !== this.props.listId) {
            this.setState({ currentIndex: 0 });
            !this.props.paused && this.handleToggle(0);
        }
        if (prevProps.musicId !== this.props.musicId) {
            var musics = this.props.musics;
            var currentIndex = musics.findIndex(function (item) { return item.id === _this.props.musicId; });
            if (currentIndex !== -1) {
                this.setState({ currentIndex: currentIndex });
                !this.props.paused && this.handleToggle(currentIndex);
            }
        }
    };
    MusicPlayer.prototype.componentWillUnmount = function () {
        this.handleClear();
    };
    MusicPlayer.prototype.render = function () {
        var _a = this.state, open = _a.open, duration = _a.duration, currentTime = _a.currentTime, loop = _a.loop, showList = _a.showList, currentIndex = _a.currentIndex, random = _a.random;
        var _b = this.props, _c = _b.audioConfig, audioConfig = _c === void 0 ? { position: 'bottom' } : _c, _d = _b.musics, musics = _d === void 0 ? [] : _d, paused = _b.paused, _e = _b.onPlay, onPlay = _e === void 0 ? noop : _e, _f = _b.onPause, onPause = _f === void 0 ? noop : _f;
        var _g = musics[currentIndex], pic = _g.pic, name = _g.name, singer = _g.singer, url = _g.url;
        return (React.createElement("div", { className: classnames_1.default("main-music-player", open ? 'open' : 'close', showList && 'main-music-player-show-list', audioConfig.position === 'bottom' ? 'main-music-player-in-bottom' : 'main-music-player-small', paused ? 'pause' : 'play') },
            React.createElement("audio", { src: url, ref: this.$audio, loop: loop }),
            React.createElement("div", { className: "main-music-player-wrapper" },
                React.createElement("div", { className: "main-music-player-pic", onClick: paused ? function () { return onPlay(); } : function () { return onPause(); } },
                    React.createElement("img", { src: pic, alt: name }),
                    React.createElement("div", { className: classnames_1.default("music-player-play-btn") },
                        React.createElement(icon_1.default, { type: paused ? 'pause' : 'play' }))),
                React.createElement("div", { className: "main-music-player-info" },
                    React.createElement("div", { className: "main-music-player-progress-bar", onClick: this.handlePlayFrom },
                        React.createElement("div", { className: "main-music-player-progress-bar-inner", style: { width: currentTime / duration * 100 + "%" } }),
                        React.createElement("span", { className: "main-music-player-progress-bar-timer" }, duration ? tool_1.secondToMunite(currentTime) + " / " + tool_1.secondToMunite(duration) : '加载中...')),
                    React.createElement("div", { className: "main-music-player-desc" },
                        React.createElement("div", { className: "main-music-player-name text-overflow-ellipsis" }, name),
                        React.createElement("div", { className: "main-music-player-author" }, singer)),
                    React.createElement("div", { className: "main-music-player-control" },
                        React.createElement(icon_1.default, { type: 'random', antd: true, active: random, onClick: this.handleRandom }),
                        React.createElement(icon_1.default, { type: 'loop', antd: true, active: loop, onClick: this.handleToggleLoop }),
                        React.createElement(icon_1.default, { type: 'menu', active: showList, onClick: this.handleToggleList }),
                        React.createElement(icon_1.default, { type: 'left-arrow', onClick: this.handlePrev }),
                        React.createElement(icon_1.default, { type: 'right-arrow', onClick: this.handleNext }))),
                React.createElement("div", { className: classnames_1.default("main-music-player-toggle", open ? 'open' : 'close'), onClick: this.handleToggleOpen },
                    React.createElement(icon_1.default, { type: open ? 'left-arrow' : 'right-arrow' }))),
            React.createElement(MusicList, { onToggle: this.handleToggle, musics: musics, current: currentIndex })));
    };
    return MusicPlayer;
}(React.Component));
exports.default = MusicPlayer;
