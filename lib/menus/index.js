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
var react_1 = require("react");
var collapse_1 = require("../collapse");
var ripple_1 = require("../ripple");
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ripple = react_1.default.createRef();
        _this.createRipple = function (e) {
            _this.ripple.current.createRipple(e);
        };
        return _this;
    }
    MenuItem.prototype.render = function () {
        var _a = this.props, children = _a.children, onClick = _a.onClick, active = _a.active, className = _a.className;
        return (react_1.default.createElement("div", { className: 'ze-menu-item ze-clickable'
                + (active ? ' ze-active' : '')
                + (className ? ' ' + className : ''), onClick: onClick, onMouseDown: this.createRipple },
            children,
            react_1.default.createElement(ripple_1.default, { ref: this.ripple })));
    };
    return MenuItem;
}(react_1.Component));
exports.MenuItem = MenuItem;
var SubMenu = /** @class */ (function (_super) {
    __extends(SubMenu, _super);
    function SubMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isShow: false
        };
        _this.handleBeforeToggle = function (isShow) {
            _this.setState({ isShow: isShow });
        };
        return _this;
    }
    SubMenu.prototype.render = function () {
        var _a = this.props, children = _a.children, title = _a.title;
        var isShow = this.state.isShow;
        return (react_1.default.createElement(collapse_1.default, { isShow: false, beforeChange: this.handleBeforeToggle, head: (react_1.default.createElement(MenuItem, null,
                title,
                react_1.default.createElement("span", { className: "ze-pull-right" }, isShow ? '+' : '-'))), className: 'ze-sub-menu-list' }, children && react_1.default.Children.map(children, function (child) { return react_1.default.cloneElement(child, {
            className: 'ze-sub-menu-item'
        }); })));
    };
    return SubMenu;
}(react_1.Component));
exports.SubMenu = SubMenu;
var MenuList = /** @class */ (function (_super) {
    __extends(MenuList, _super);
    function MenuList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.menuCount = 0;
        _this.activeBar = react_1.default.createRef();
        _this.state = {
            activeIndex: 0
        };
        _this.handleMenuChange = function (e, activeIndex) {
            _this.setState({ activeIndex: activeIndex });
            var _a = e.currentTarget, offsetHeight = _a.offsetHeight, offsetTop = _a.offsetTop;
            _this.activeBar.current.style.top = offsetTop + 'px';
            _this.activeBar.current.style.height = offsetHeight + 'px';
        };
        _this.MapMenu = function (children) {
            if (!children)
                return false;
            var activeIndex = _this.state.activeIndex;
            return react_1.default.Children.map(children, function (child) {
                if (child.type && child.type.name === 'SubMenu') {
                    return react_1.default.cloneElement(child, {
                        children: _this.MapMenu(child.props.children),
                    });
                }
                return react_1.default.cloneElement(child, {
                    onClick: function (e) { return _this.handleMenuChange(e, child.props._key); },
                    active: child.props._key.toString() === activeIndex.toString()
                });
            });
        };
        return _this;
    }
    MenuList.prototype.render = function () {
        var children = this.props.children;
        return (react_1.default.createElement("div", { className: "ze-menu-list" },
            this.MapMenu(children),
            react_1.default.createElement("div", { className: "ze-menus-bar", ref: this.activeBar })));
    };
    return MenuList;
}(react_1.Component));
exports.MenuList = MenuList;
