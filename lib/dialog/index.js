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
var mask_1 = require("../mask");
var tool_1 = require("../utils/tool");
var dialogRootId = 'do-dialog-root';
var defaulAnimationDuration = 300;
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dialog.prototype.render = function () {
        var _a = this.props, children = _a.children, title = _a.title, visible = _a.visible, onCancel = _a.onCancel, onOk = _a.onOk, _b = _a.animationDuration, animationDuration = _b === void 0 ? defaulAnimationDuration : _b;
        return (React.createElement("div", { style: { animationDuration: animationDuration / 1000 + 's' }, className: classnames_1.default('do-dialog', visible ? 'do-dialog-animate-in' : 'do-dialog-animate-out') },
            React.createElement("div", { className: "do-dialog-head" },
                React.createElement("div", { className: "do-dialog-title" }, title),
                React.createElement("div", { className: "do-dialog-cancel-btn", onClick: onCancel }, "+")),
            React.createElement("div", { className: "do-dialog-content" }, children),
            React.createElement("div", { className: "do-dialog-footer" },
                React.createElement(button_1.default, { onClick: onCancel }, "\u53D6\u6D88"),
                React.createElement(button_1.default, { type: "primary", onClick: onOk }, "\u786E\u5B9A"))));
    };
    return Dialog;
}(React.Component));
var create = function (option) {
    var props = __assign({}, option);
    props.children = option.content;
    var close = function () {
        ReactDOM.render(React.createElement(Dialog, __assign({}, props, { visible: false, onCancel: close })), tool_1.getDOMById(dialogRootId));
        mask_1.default.hidden();
        setTimeout(function () {
            ReactDOM.unmountComponentAtNode(tool_1.getDOMById(dialogRootId));
        }, defaulAnimationDuration + 50);
    };
    var show = function () {
        return new Promise(function (resolve) {
            mask_1.default.show();
            ReactDOM.render(React.createElement(Dialog, __assign({}, props, { visible: true, onCancel: close, onOk: function () { return resolve(); } })), tool_1.getDOMById(dialogRootId));
        });
    };
    return { show: show, close: close };
};
exports.default = {
    create: create
};
