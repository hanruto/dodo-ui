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
var classnames_1 = require("classnames");
var InputArea = /** @class */ (function (_super) {
    __extends(InputArea, _super);
    function InputArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focus: false,
            dirty: false,
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
        };
        _this.setFocus = function () {
            _this.$input.current.focus();
        };
        return _this;
    }
    InputArea.prototype.render = function () {
        var _this = this;
        var _a = this.props, label = _a.label, rows = _a.rows, fullWidth = _a.fullWidth, width = _a.width, placeholder = _a.placeholder;
        var focus = this.state.focus;
        return (React.createElement("div", { onClick: function () { return _this.setFocus(); }, style: { width: width }, className: classnames_1.default(fullWidth && 'ze-input-area-full', label && 'ze-input-area-has-label', 'ze-input-area') },
            React.createElement("div", { className: 'ze-input-wrapper' + (focus ? ' ze-focus' : '') },
                label && React.createElement("label", { className: "ze-input-label" }, label),
                React.createElement("textarea", { placeholder: placeholder, rows: rows, ref: this.$input, className: "ze-input", onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.handleChange }))));
    };
    return InputArea;
}(React.Component));
exports.default = InputArea;
