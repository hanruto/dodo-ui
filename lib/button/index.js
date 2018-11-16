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
var ripple_1 = require("../ripple");
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = 1;
        _this.ripple = React.createRef();
        _this.handleClick = function (e) {
            var _a = _this.props, clickProtectDuration = _a.clickProtectDuration, disabled = _a.disabled;
            if (!_this.status || disabled)
                return false;
            if (clickProtectDuration > 0) {
                _this.status = 0;
                setTimeout(function () { return _this.status = 1; }, clickProtectDuration);
            }
            _this.props.onClick && _this.props.onClick(e);
        };
        _this.handleMouseDown = function (e) {
            if (_this.props.disabled) {
                return false;
            }
            _this.createRipple(e);
            _this.props.onMouseDown && _this.props.onMouseDown(e);
        };
        _this.createRipple = function (e) {
            if (!_this.status)
                return false;
            _this.ripple.current.createRipple(e);
        };
        return _this;
    }
    Button.prototype.render = function () {
        var _a = this.props, size = _a.size, _b = _a.fullWidth, fullWidth = _b === void 0 ? false : _b, type = _a.type, className = _a.className, shadow = _a.shadow, style = _a.style, disabled = _a.disabled;
        return (React.createElement("button", { style: Object.assign({}, style), onClick: this.handleClick, className: 'ze-clickable ze-btn'
                + (className ? (' ' + className) : '')
                + ((type && type !== 'defaut') ? (' ' + 'ze-btn-' + type) : '')
                + ((size) ? (' ' + 'ze-btn-' + size) : '')
                + (fullWidth ? (' ' + 'ze-btn-full') : '')
                + (shadow ? (' ' + 'ze-btn-shadow') : '')
                + (disabled ? (' ' + 'ze-btn-disabled') : ''), onMouseDown: this.handleMouseDown },
            this.props.children,
            React.createElement(ripple_1.default, { ref: this.ripple })));
    };
    return Button;
}(React.Component));
exports.default = Button;
