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
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Table.prototype, "data", {
        get: function () {
            var _a = this.props, columns = _a.columns, data = _a.data;
            return data.map(function (item) {
                var row = { key: item.key, data: [] };
                columns.forEach(function (_a) {
                    var key = _a.key;
                    return row.data.push(item[key] || '');
                });
                return row;
            });
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.render = function () {
        var _a = this.props, columns = _a.columns, type = _a.type;
        return (React.createElement("table", { className: classnames_1.default('ze-table', 'ze-table-' + type) },
            React.createElement("thead", null,
                React.createElement("tr", null, columns.map(function (column) { return React.createElement("th", { key: column.key }, column.label); }))),
            React.createElement("tbody", null, this.data.map(function (row) {
                return (React.createElement("tr", { key: row.key }, row.data.map(function (item, index) { return React.createElement("td", { key: index }, item); })));
            }))));
    };
    return Table;
}(React.Component));
exports.default = Table;
