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
var MusicCanvas = /** @class */ (function (_super) {
    __extends(MusicCanvas, _super);
    function MusicCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: false
        };
        _this.$canvas = React.createRef();
        _this.hash = 0;
        _this.audioNode = null;
        _this.bufferArray = null;
        _this.audioCtx = null;
        _this.audioStart = false;
        _this.handleInit = function () { return __awaiter(_this, void 0, void 0, function () {
            var audio;
            return __generator(this, function (_a) {
                audio = this.props.audio;
                if (!audio)
                    return [2 /*return*/, false];
                if (!audio.paused)
                    this.handleStart();
                audio.addEventListener('play', this.handleStart);
                audio.addEventListener('pause', this.handlePause);
                audio.addEventListener('seeked', this.handleStart);
                audio.addEventListener('load');
                return [2 /*return*/];
            });
        }); };
        _this.handleStart = function () {
            // 创建audioNode和audioCtx
            _this.handlePause();
            _this.hash = _this.hash + 1;
            _this.setState({ loading: true });
            var audio = _this.props.audio;
            var audioCtx = new window.AudioContext();
            var audioNode = audioCtx.createBufferSource();
            _this.audioNode = audioNode;
            _this.audioCtx = audioCtx;
            // 加载声音
            audio.volume = 1;
            var currentHash = _this.hash;
            loadSound(audio.src)
                .then(function (bufferArray) { return _this.handleDecode(bufferArray, currentHash); })
                .then(function (_a) {
                var analyser = _a.analyser, hash = _a.hash;
                if (hash !== _this.hash) {
                    return false;
                }
                if (!_this.audioNode) {
                    return false;
                }
                audio.volume = 0;
                _this.audioNode.start(0, audio.currentTime);
                _this.audioStart = true;
                _this.setState({ loading: false });
                _this.handleDraw(analyser);
            })
                .catch(function (error) { return console.log(error); });
        };
        _this.handlePause = function () {
            _this.audioStart && _this.audioNode.stop();
            _this.audioStart = false;
            _this.audioCtx = null;
            _this.audioNode = null;
        };
        _this.handleDecode = function (bufferArray, hash) {
            if (hash !== _this.hash)
                return false;
            return new Promise(function (resolve) {
                return _this.audioCtx.decodeAudioData(bufferArray, function (buffer) {
                    var audioCtx = new window.AudioContext();
                    var audioNode = audioCtx.createBufferSource();
                    _this.audioNode = audioNode;
                    _this.audioCtx = audioCtx;
                    _this.audioNode.buffer = buffer;
                    if (!_this.audioNode)
                        return false;
                    _this.audioNode.connect(_this.audioCtx.destination);
                    var analyser = _this.audioCtx.createAnalyser();
                    _this.audioNode.connect(analyser);
                    analyser.connect(_this.audioCtx.destination);
                    resolve({ analyser: analyser, hash: hash });
                });
            });
        };
        _this.handleDraw = function (analyser) {
            var canvas = _this.$canvas.current;
            var cwidth = canvas.width, cheight = canvas.height - 2, meterWidth = 10, gap = 2, capHeight = 2, capStyle = '#39f', meterNum = 800 / (10 + 2), capYPositionArray = [], ctx = canvas.getContext('2d'), gradient = ctx.createLinearGradient(0, 0, 0, 280);
            gradient.addColorStop(1, '#39f');
            gradient.addColorStop(0.9, '#0cf');
            gradient.addColorStop(0.76, '#08f');
            gradient.addColorStop(0.3, '#14f');
            var drawMeter = function () {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var step = Math.round(array.length / meterNum);
                ctx.clearRect(0, 0, cwidth, cheight);
                for (var i = 0; i < meterNum; i++) {
                    var value = array[i * step];
                    if (capYPositionArray.length < Math.round(meterNum)) {
                        capYPositionArray.push(value);
                    }
                    ctx.fillStyle = capStyle;
                    if (value < capYPositionArray[i]) {
                        ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                    }
                    else {
                        ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                        capYPositionArray[i] = value;
                    }
                    ctx.fillStyle = gradient;
                    ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
                }
                requestAnimationFrame(drawMeter);
            };
            requestAnimationFrame(drawMeter);
        };
        return _this;
    }
    MusicCanvas.prototype.componentDidMount = function () {
        // 创建音频上下文
        window.AudioContext = window.AudioContext
            || window.webkitAudioContext
            || window.mozAudioContext
            || window.msAudioContext;
        this.handleInit();
    };
    MusicCanvas.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.audio !== prevProps.audio) {
            this.handleInit();
        }
        if (this.props.url !== prevProps.url) {
            this.handlePause();
        }
    };
    MusicCanvas.prototype.componentWillUnmount = function () {
        this.handlePause();
        var audio = this.props.audio;
        audio && (audio.volume = 1);
        audio.removeEventListener('play', this.handleStart);
        audio.removeEventListener('pause', this.handlePause);
    };
    MusicCanvas.prototype.render = function () {
        if (this.state.loading)
            return React.createElement("div", { className: "music-canvas-loading" }, "\u52A0\u8F7D\u8FD9\u4E2A\u5F88\u6162\u7684\uFF0C\u6700\u591A\u7B4920\u79D2\u5C31\u597D\u4E86...");
        return (React.createElement("canvas", { width: 720, height: 280, ref: this.$canvas }));
    };
    return MusicCanvas;
}(React.Component));
exports.default = MusicCanvas;
