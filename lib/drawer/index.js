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
var tool_1 = require("../utils/tool");
var drawerRootId = 'do-drawer-root';
var DrawerInner = /** @class */ (function (_super) {
    __extends(DrawerInner, _super);
    function DrawerInner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false
        };
        _this.handleToggle = function () {
            var open = !_this.state.open;
            _this.setState({ open: open });
            var app = document.getElementById('__next');
            app.style.transition = 'all ease .6s';
            if (window.innerWidth > 720) {
                app.style.width = open ? 'calc(100% - 340px)' : '100%';
            }
        };
        return _this;
    }
    DrawerInner.prototype.componentWillUnmount = function () {
        var app = document.getElementById('__next');
        app.style.width = '100%';
    };
    DrawerInner.prototype.render = function () {
        var open = this.state.open;
        var children = this.props.children;
        return (React.createElement("div", { className: classnames_1.default('do-drawer', open ? 'open' : 'close') },
            React.createElement("div", { className: "do-drawer-container" },
                React.createElement("div", { className: classnames_1.default('do-drawer-toggle', open ? 'close' : 'open'), onClick: this.handleToggle },
                    React.createElement("span", { className: "do-drawer-toggle-bar" }),
                    React.createElement("span", { className: "do-drawer-toggle-bar" }),
                    React.createElement("span", { className: "do-drawer-toggle-bar" })),
                React.createElement("div", { className: classnames_1.default('do-drawer-inner-toggle', open ? 'close' : 'open'), onClick: this.handleToggle },
                    React.createElement("span", { className: "do-drawer-toggle-bar" }),
                    React.createElement("span", { className: "do-drawer-toggle-bar" }),
                    React.createElement("span", { className: "do-drawer-toggle-bar" })),
                children),
            React.createElement("div", { className: "do-drawer-mask" })));
    };
    return DrawerInner;
}(React.Component));
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Drawer.prototype.componentDidMount = function () {
        ReactDOM.render(React.createElement(DrawerInner, __assign({}, this.props)), tool_1.getDOMById(drawerRootId));
    };
    Drawer.prototype.componentDidUpdate = function () {
        ReactDOM.render(React.createElement(DrawerInner, __assign({}, this.props)), tool_1.getDOMById(drawerRootId));
    };
    Drawer.prototype.componentWillUnmount = function () {
        ReactDOM.unmountComponentAtNode(tool_1.getDOMById(drawerRootId));
        document.body.removeChild(tool_1.getDOMById(drawerRootId));
    };
    Drawer.prototype.render = function () {
        return null;
    };
    return Drawer;
}(React.Component));
exports.default = Drawer;
