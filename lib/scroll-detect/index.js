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
var ScrollDetect = /** @class */ (function (_super) {
    __extends(ScrollDetect, _super);
    function ScrollDetect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.el = React.createRef();
        _this.handleDetect = function () {
            var show = 100;
            var _a = _this.el.current.getBoundingClientRect(), top = _a.top, bottom = _a.bottom;
            if ((top > show && top < (window.innerHeight - show)) || (bottom > show && bottom < (window.innerHeight - show))) {
                _this.props.onScrollInto && _this.props.onScrollInto();
            }
            else {
                _this.props.onScrollOut && _this.props.onScrollOut();
            }
        };
        return _this;
    }
    ScrollDetect.prototype.componentDidMount = function () {
        var _this = this;
        this.handleDetect();
        var scrollEl = document.querySelector('.main-content');
        scrollEl.addEventListener('scroll', function () {
            _this.handleDetect();
        });
    };
    ScrollDetect.prototype.render = function () {
        return (React.createElement("div", { className: "ze-scroll-detect", ref: this.el }, this.props.children));
    };
    return ScrollDetect;
}(React.Component));
exports.default = ScrollDetect;
