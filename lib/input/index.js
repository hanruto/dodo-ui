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
var classnames_1 = require("classnames");
function checkIsValid(value) {
    if (value)
        return true;
    if (value === 0)
        return true;
    if (value === '')
        return false;
    if (typeof value === 'object' && !value)
        return false;
    if (value === undefined)
        return false;
}
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focus: false,
            dirty: false,
            hasValue: checkIsValid(_this.props.value || _this.props.defaultValue)
        };
        _this.$input = React.createRef();
        _this.handleFocus = function (e) {
            _this.setState({ focus: true });
            _this.props.onFocus && _this.props.onFocus(e);
        };
        _this.handleBlur = function (e) {
            _this.setState({ focus: false, dirty: true });
            _this.props.onFocus && _this.props.onFocus(e);
        };
        _this.handleChange = function (e) {
            _this.props.onChange && _this.props.onChange(e);
            _this.setState({ hasValue: checkIsValid(e.target.value) });
        };
        _this.setFocus = function () {
            _this.$input.current.focus();
        };
        return _this;
    }
    Input.prototype.render = function () {
        var _this = this;
        var _a = this.props, error = _a.error, label = _a.label, message = _a.message, classname = _a.classname, required = _a.required, disabled = _a.disabled, fullWidth = _a.fullWidth, width = _a.width, rest = __rest(_a, ["error", "label", "message", "classname", "required", "disabled", "fullWidth", "width"]);
        var _b = this.state, focus = _b.focus, hasValue = _b.hasValue;
        return (React.createElement("div", { onClick: function () { return _this.setFocus(); }, style: { width: width }, className: classnames_1.default('ze-input-container', fullWidth && 'ze-input-container-full', label && 'ze-input-container-has-label', classname) },
            React.createElement("div", { className: 'ze-input-wrapper'
                    + (hasValue ? ' ze-has-value' : '')
                    + (focus ? ' ze-focus' : '')
                    + (error ? ' ze-error' : '')
                    + (required ? ' ze-required' : '')
                    + (disabled ? ' ze-disabled' : '') },
                label && React.createElement("label", { className: "ze-input-label" }, label),
                React.createElement("input", __assign({}, rest, { ref: this.$input, disabled: disabled, className: "ze-input", onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.handleChange }))),
            message && React.createElement("div", { className: "ze-input-message" }, message)));
    };
    return Input;
}(React.Component));
exports.default = Input;
