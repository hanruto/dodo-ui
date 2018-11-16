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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var classnames_1 = require("classnames");
var button_1 = require("../button");
var defaultAnimationDuration = 400;
function createElementToDialogRoot() {
    var dialogRoot;
    dialogRoot = document.getElementById('ze-dialog-root');
    if (!dialogRoot) {
        dialogRoot = document.createElement('div');
        dialogRoot.setAttribute('id', 'ze-dialog-root');
        var dialogMask = document.createElement('div');
        dialogMask.setAttribute('id', 'ze-dialog-mask');
        document.body.appendChild(dialogRoot);
        dialogRoot.appendChild(dialogMask);
    }
    var el = document.createElement('div');
    dialogRoot.appendChild(el);
    return el;
}
var DialogInner = /** @class */ (function (_super) {
    __extends(DialogInner, _super);
    function DialogInner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogInner.prototype.render = function () {
        var _a = this.props, children = _a.children, title = _a.title, visible = _a.visible, onCancel = _a.onCancel, onOk = _a.onOk, _b = _a.animationDuration, animationDuration = _b === void 0 ? defaultAnimationDuration : _b;
        return (React.createElement("div", { style: { animationDuration: animationDuration / 1000 + 's' }, className: classnames_1.default('ze-dialog', visible ? 'ze-dialog-animate-in' : 'ze-dialog-animate-out') },
            React.createElement("div", { className: "ze-dialog-head" },
                React.createElement("div", { className: "ze-dialog-title" }, title),
                React.createElement("div", { className: "ze-dialog-cancel-btn", onClick: onCancel }, "+")),
            React.createElement("div", { className: "ze-dialog-content" }, children),
            React.createElement("div", { className: "ze-dialog-footer" },
                React.createElement(button_1.default, { onClick: onCancel }, "\u53D6\u6D88"),
                React.createElement(button_1.default, { type: "primary", onClick: onOk }, "\u786E\u5B9A"))));
    };
    return DialogInner;
}(React.Component));
var renderDialog = function (el, props) {
    var dialogRoot = document.getElementById('ze-dialog-root');
    var dialogMask = document.getElementById('ze-dialog-mask');
    dialogMask.style.display = 'block';
    dialogRoot.style.display = 'block';
    ReactDOM.render(React.createElement(DialogInner, __assign({}, props)), el);
};
var unRenderDialog = function (el) {
    var dialogRoot = document.getElementById('ze-dialog-root');
    var dialogMask = document.getElementById('ze-dialog-mask');
    dialogRoot.removeChild(el);
    var hasDilog = dialogRoot.querySelector('.ze-dialog');
    if (!hasDilog) {
        dialogMask.style.display = 'none';
        dialogRoot.style.display = 'none';
    }
};
var open = function (option) {
    var props = __assign({}, option);
    props.visible = true;
    props.children = option.content;
    var el = createElementToDialogRoot();
    var close = function () {
        props.visible = false;
        renderDialog(el, props);
        setTimeout(function () { return unRenderDialog(el); }, props.animationDuration || defaultAnimationDuration);
    };
    props.onOk = function (e) {
        option.onOk ? option.onOk(e, close) : close();
    };
    props.onCancel = function (e) {
        option.ononCancel ? option.ononCancel(e, close) : close();
    };
    renderDialog(el, props);
};
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.el = null;
        return _this;
    }
    Dialog.prototype.componentDidMount = function () {
        this.el = createElementToDialogRoot();
        renderDialog(this.el, this.props);
    };
    Dialog.prototype.componentWillUnmount = function () {
        unRenderDialog(this.el);
    };
    Dialog.prototype.componentDidUpdate = function () {
        var _this = this;
        renderDialog(this.el, this.props);
        if (!this.props.visible) {
            setTimeout(function () { return unRenderDialog(_this.el); }, 400);
        }
    };
    Dialog.prototype.render = function () {
        return null;
    };
    Dialog.open = open;
    return Dialog;
}(React.Component));
exports.default = Dialog;
