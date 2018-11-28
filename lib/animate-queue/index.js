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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var defaultSpeed = 600;
var defaultInterval = 200;
var Animate = /** @class */ (function (_super) {
    __extends(Animate, _super);
    function Animate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animate.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.animate, animate = _b === void 0 ? true : _b, _c = _a.speed, speed = _c === void 0 ? defaultSpeed : _c, from = _a.from, to = _a.to;
        var additionAnimate = (animate ? to : from) || {};
        return React.Children.map(children, function (item) { return React.cloneElement(item, {
            style: __assign({
                transform: "translateY(" + (animate ? 0 : 40) + "px)",
                transition: "all ease " + speed / 1000 + "s",
                opacity: animate ? 1 : 0
            }, additionAnimate)
        }); });
    };
    return Animate;
}(React.Component));
exports.Animate = Animate;
var AnimateQueue = /** @class */ (function (_super) {
    __extends(AnimateQueue, _super);
    function AnimateQueue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = null;
        _this.state = {
            current: 0
        };
        _this.handleAnimate = function (animate) {
            var _a = _this.props, _b = _a.interval, interval = _b === void 0 ? defaultInterval : _b, children = _a.children;
            var max = children ? children.length : 0;
            clearTimeout(_this.timer);
            var loop = function () {
                var current = _this.state.current;
                if (!animate && current <= 0) {
                    _this.setState({ current: 0 });
                    _this.props.onAnimateEnd && _this.props.onAnimateEnd();
                    return false;
                }
                else if (animate && current >= max) {
                    _this.setState({ current: max });
                    _this.props.onAnimateEnd && _this.props.onAnimateEnd();
                    return false;
                }
                else {
                    current = current + (animate ? 1 : -1);
                }
                _this.setState({ current: current });
                _this.timer = setTimeout(loop, interval);
            };
            loop();
        };
        return _this;
    }
    AnimateQueue.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () { return _this.handleAnimate(_this.props.animate); });
    };
    AnimateQueue.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.animate !== this.props.animate) {
            this.handleAnimate(this.props.animate);
        }
        if (prevProps.children.length !== this.props.children.length) {
            this.handleAnimate(this.props.animate);
        }
    };
    AnimateQueue.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    AnimateQueue.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.speed, speed = _b === void 0 ? 400 : _b, animate = _a.animate, rest = __rest(_a, ["children", "speed", "animate"]);
        var current = this.state.current;
        return React.Children.map(children, function (item, index) {
            return React.createElement(Animate, __assign({ animate: index < current, speed: speed }, rest), item);
        });
    };
    return AnimateQueue;
}(React.Component));
exports.AnimateQueue = AnimateQueue;
var AnimateQueueGroup = /** @class */ (function (_super) {
    __extends(AnimateQueueGroup, _super);
    function AnimateQueueGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            current: 0
        };
        _this.animate = _this.props.animate;
        _this.handleNextAnimate = function () {
            var current = _this.state.current;
            var children = _this.props.children;
            var max = children ? children.length : 0;
            if (_this.animate && current >= max) {
                current = max;
            }
            else if (!_this.animate && current <= 0) {
                current = 0;
            }
            else {
                _this.animate ? (current = current + 1) : (current = current - 1);
            }
            _this.setState({ current: current });
        };
        return _this;
    }
    AnimateQueueGroup.prototype.componentDidMount = function () {
        this.handleNextAnimate();
    };
    AnimateQueueGroup.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.animate !== this.props.animate) {
            this.animate = nextProps.animate;
            this.handleNextAnimate();
        }
    };
    AnimateQueueGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, _b = _a.speed, speed = _b === void 0 ? 400 : _b, animate = _a.animate, rest = __rest(_a, ["children", "speed", "animate"]);
        var current = this.state.current;
        return React.Children.map(children, function (item, index) {
            return (React.createElement("div", { className: "ze-animate-group-wrapper" }, React.cloneElement(item, __assign({ animate: index < current }, rest, { onAnimateEnd: _this.handleNextAnimate }))));
        });
    };
    return AnimateQueueGroup;
}(React.Component));
exports.AnimateQueueGroup = AnimateQueueGroup;
