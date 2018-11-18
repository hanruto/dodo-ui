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
var react_1 = require("react");
var classnames_1 = require("classnames");
var react_dom_1 = require("react-dom");
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
            // const app = document.getElementById('__next')
            // if (window.innerWidth > 720) {
            //   app.style.width = open ? 'calc(100% - 340px)' : '100%'
            // }
        };
        return _this;
    }
    DrawerInner.prototype.componentWillUnmount = function () {
        // const app = document.getElementById('__next')
        // app.style.width = '100%'
    };
    DrawerInner.prototype.render = function () {
        var open = this.state.open;
        var children = this.props.children;
        return (react_1.default.createElement("div", { className: classnames_1.default('w-drawer', open ? 'open' : 'close') },
            react_1.default.createElement("div", { className: "w-drawer-container" },
                react_1.default.createElement("div", { className: classnames_1.default('w-drawer-toggle', open ? 'close' : 'open'), onClick: this.handleToggle },
                    react_1.default.createElement("span", { className: "w-drawer-toggle-bar" }),
                    react_1.default.createElement("span", { className: "w-drawer-toggle-bar" }),
                    react_1.default.createElement("span", { className: "w-drawer-toggle-bar" })),
                react_1.default.createElement("div", { className: classnames_1.default('w-drawer-inner-toggle', open ? 'close' : 'open'), onClick: this.handleToggle },
                    react_1.default.createElement("span", { className: "w-drawer-toggle-bar" }),
                    react_1.default.createElement("span", { className: "w-drawer-toggle-bar" }),
                    react_1.default.createElement("span", { className: "w-drawer-toggle-bar" })),
                children),
            react_1.default.createElement("div", { className: "w-drawer-mask" })));
    };
    return DrawerInner;
}(react_1.default.Component));
var createDOM = function () {
    var el = document.getElementById('drawer-root');
    if (!el) {
        el = document.createElement('div');
        el.id = 'drawer-root';
        var container = document.createElement('div');
        container.id = 'drawer-container';
        el.appendChild(container);
        document.body.appendChild(el);
    }
    return el;
};
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$drawer = null;
        return _this;
    }
    Drawer.prototype.componentDidMount = function () {
        createDOM();
        this.$drawer = document.querySelector('#drawer-container');
        react_dom_1.default.render(react_1.default.createElement(DrawerInner, __assign({}, this.props)), this.$drawer);
    };
    Drawer.prototype.componentDidUpdate = function () {
        react_dom_1.default.render(react_1.default.createElement(DrawerInner, __assign({}, this.props)), this.$drawer);
    };
    Drawer.prototype.componentWillUnmount = function () {
        react_dom_1.default.unmountComponentAtNode(this.$drawer);
    };
    Drawer.prototype.render = function () {
        return null;
    };
    return Drawer;
}(react_1.default.Component));
exports.default = Drawer;