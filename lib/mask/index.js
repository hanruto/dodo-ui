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
var ReactDOM = require("react-dom");
var tool_1 = require("../utils/tool");
var classnames_1 = require("classnames");
var maskId = 'do-mask-root';
var transitionDuration = 600;
var Mask = /** @class */ (function (_super) {
    __extends(Mask, _super);
    function Mask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mask.prototype.render = function () {
        var _a = this.props.show, show = _a === void 0 ? true : _a;
        return (React.createElement("div", { className: classnames_1.default("do-mask", show ? 'animate-fade-in' : 'animate-fade-out') }));
    };
    return Mask;
}(React.Component));
var show = function () {
    ReactDOM.render(React.createElement(Mask, { show: true }), tool_1.getDOMById(maskId));
};
var hidden = function () {
    ReactDOM.render(React.createElement(Mask, { show: false }), tool_1.getDOMById(maskId));
    setTimeout(function () { return ReactDOM.unmountComponentAtNode(tool_1.getDOMById(maskId)); }, transitionDuration + 50);
};
var maskManager = {
    show: show, hidden: hidden
};
exports.default = maskManager;
