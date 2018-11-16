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
var React = require("react");
var dur = 400;
var ns = 'http://www.w3.org/2000/svg';
var createSvgEl = function (name, attr) {
    var el = document.createElementNS(ns, name);
    attr = attr || {};
    for (var key in attr) {
        el.setAttribute(key, attr[key]);
    }
    return el;
};
var createRipple = function (x, y, r) {
    var svg = createSvgEl('svg');
    var circle = createSvgEl('circle', {
        cx: x,
        cy: y,
        r: 0,
        fill: 'rgba(255, 255, 255, 0.4)'
    });
    var beignAnimate = createSvgEl('animate', {
        attributeName: 'r',
        to: r,
        dur: dur / 1000 + 's',
        fill: "freeze",
        begin: 'indefinite'
    });
    var endAnimate = createSvgEl('animate', {
        attributeName: 'fill',
        to: 'rgba(255, 255, 255, 0)',
        dur: dur / 1000 + 's',
        fill: "freeze",
        begin: 'indefinite'
    });
    circle.appendChild(beignAnimate);
    circle.appendChild(endAnimate);
    svg.appendChild(circle);
    return { el: svg, beginEl: beignAnimate, endEl: endAnimate };
};
var Ripple = /** @class */ (function (_super) {
    __extends(Ripple, _super);
    function Ripple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ripples = React.createRef();
        _this.createRipple = function (e) {
            var target = e.currentTarget;
            var wrapper = _this.ripples.current;
            var _a = target.getBoundingClientRect(), top = _a.top, left = _a.left, w = _a.width, h = _a.height;
            var x = e.clientX - left;
            var y = e.clientY - top;
            var r = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2))
                + Math.sqrt(Math.pow(w / 2 - x, 2) + Math.pow(h / 2 - y, 2));
            var ripple = createRipple(x, y, r);
            var rippleSvg = ripple.el;
            wrapper.appendChild(rippleSvg);
            ripple.beginEl.beginElement();
            var remove = function () {
                target.removeEventListener('mouseup', remove);
                ripple.endEl.beginElement();
                setTimeout(function () {
                    wrapper.removeChild(rippleSvg);
                }, dur);
            };
            target.addEventListener('mouseup', remove);
        };
        return _this;
    }
    Ripple.prototype.render = function () {
        return (React.createElement("div", { className: "ze-ripples-group", ref: this.ripples }));
    };
    return Ripple;
}(React.Component));
exports.default = Ripple;
