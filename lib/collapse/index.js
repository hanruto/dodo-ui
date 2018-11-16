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
var Collapse = /** @class */ (function (_super) {
    __extends(Collapse, _super);
    function Collapse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = 300;
        _this.panelWrapper = react_1.default.createRef();
        _this.panel = react_1.default.createRef();
        _this.panelHeight = 0;
        _this.state = {
            isShow: _this.props.isShow,
            status: _this.props.isShow ? 2 : 0 // 三种状态 0 收起, 1 展开中, 2 展开完毕
        };
        _this.handleCollapse = function () {
            var _a = _this.state, isShow = _a.isShow, status = _a.status;
            var _handleToggle = function (isShow) {
                if (_this.props.onChange) {
                    _this.props.onChange(isShow);
                }
            };
            var _handleBeforeToggle = function (isShow) {
                if (_this.props.beforeChange) {
                    _this.props.beforeChange(isShow);
                }
            };
            if (status === 1)
                return false;
            if (isShow) {
                _handleBeforeToggle(false);
                _this.setState({
                    isShow: false,
                    status: 1
                });
                setTimeout(function () { return _this.setState({ status: 0 }, function () { return _handleToggle(false); }); }, _this.duration);
            }
            else {
                _handleBeforeToggle(true);
                _this.setState({
                    isShow: true,
                    status: 1
                });
                setTimeout(function () { return _this.setState({ status: 2 }, function () { return _handleToggle(true); }); }, _this.duration);
            }
        };
        return _this;
    }
    Collapse.prototype.componentDidMount = function () {
        var panelHeight = this.panel.current.offsetHeight;
        this.panelHeight = panelHeight;
        // 在默认情况下我们使用'auto'的height作为展开的高度，但是他是没有动画效果的，为此我们将高度提前转化为px
        if (this.state.isShow) {
            this.panelWrapper.current.style.height = panelHeight + 'px';
        }
    };
    Collapse.prototype.render = function () {
        var _a = this.props, head = _a.head, style = _a.style, children = _a.children, className = _a.className;
        var _b = this.state, isShow = _b.isShow, status = _b.status;
        return (react_1.default.createElement("div", { className: 'ze-collapse' + (className ? ' ' + className : ''), style: style },
            head && react_1.default.createElement("div", { className: 'ze-collapse-head ze-clickable', onClick: this.handleCollapse }, head),
            react_1.default.createElement("div", { ref: this.panelWrapper, className: 'ze-collapse-body' + (status === 0 ? ' collapsed' : ''), style: {
                    height: isShow ? (this.panelHeight || 'auto') : 0,
                    transitionDuration: this.duration / 1000 + 's',
                    transitionTimingFunction: 'ease'
                } },
                react_1.default.createElement("div", { className: "ze-collapse-body-content", ref: this.panel }, children))));
    };
    return Collapse;
}(react_1.Component));
exports.default = Collapse;
