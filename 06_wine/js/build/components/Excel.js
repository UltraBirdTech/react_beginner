"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headers = ["タイトル", "著者", "言語", "出版年", "売り上げ部数"];

var data = [["The Load of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 milion"], ["Le Petit Prince (The Little Prince)", "Antoine de Saint-exupery", "French", "1943", "140 milion"], ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 milion"], ["And Then There Were None", "Agatha Christie", "English", "1939", "100 milion"], ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 milion"]];

var Excel = _react2.default.createClass({
  displayName: 'Excel',
  propTypes: {
    headers: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
    initialData: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string))
  },

  getInitialState: function getInitialState() {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      search: false
    };
  },

  _showEditor: function _showEditor(e) {
    this.setState({ edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
      } });
  },

  _save: function _save(e) {
    e.preventDefault();
    var input = e.target.firstChild;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data: data
    });
  },

  _renderSearch: function _renderSearch() {
    if (!this.state.search) {
      return null;
    }
    return _react2.default.createElement(
      "tr",
      { onChange: this._search },
      this.props.headers.map(function (_ignore, idx) {
        return _react2.default.createElement(
          "td",
          { key: idx },
          _react2.default.createElement("input", { type: "text", "data-idx": idx })
        );
      })
    );
  },

  _preSearchData: null,

  _toggleSearch: function _toggleSearch() {
    if (this.state.search) {
      this.setState({
        data: this._preSearchData,
        search: false
      });
      this._preSerachData = null;
    } else {
      this._preSearchData = this.state.data;
      this.setState({
        search: true
      });
    }
  },

  _search: function _search(e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({ data: this._preSearchData });
      return;
    }
    var idx = e.target.dataset.idx;
    var searchdata = this._preSearchData.filter(function (row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.setState({ data: searchdata });
  },

  _sort: function _sort(e) {
    var column = e.target.cellIndex;
    var data = this.state.data.slice();
    var descending = this.state.sortby === column && !this.state.descending;
    data.sort(function (a, b) {
      return descending ? a[column] < b[column] ? 1 : -1 : a[column] > b[column] ? 1 : -1;
    });
    this.setState({
      data: data,
      sortby: column,
      descending: descending
    });
  },

  _download: function _download(format, ev) {
    var contents = format === 'json' ? JSON.stringify(this.state.data) : this.state.data.reduce(function (result, row) {
      return result + row.reduce(function (rowresult, cell, idx) {
        return rowresult + '"' + cell.replace(/"/g, '""') + '"' + (idx < row.length - 1 ? ',' : '');
      }, '') + "\n";
    }, '');
    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], { type: 'text/' + format });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  },

  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "Excel" },
      this._renderToolbar(),
      this._renderTable()
    );
  },

  _renderToolbar: function _renderToolbar() {
    return _react2.default.createElement(
      "div",
      { className: "toolbar" },
      _react2.default.createElement(
        "button",
        { onClick: this._toggleSearch },
        "Search"
      ),
      _react2.default.createElement(
        "a",
        { onClick: this._download.bind(this, 'json'), href: "data.json" },
        "Export JSON"
      ),
      _react2.default.createElement(
        "a",
        { onClick: this._download.bind(this, 'csv'), href: "data.csv" },
        "Export CSV"
      )
    );
  },
  _renderTable: function _renderTable() {
    return _react2.default.createElement(
      "table",
      null,
      _react2.default.createElement(
        "thead",
        { onClick: this._sort },
        _react2.default.createElement(
          "tr",
          null,
          this.props.headers.map(function (title, idx) {
            if (this.state.sortby === idx) {
              title += this.state.descending ? " \u2191" : " \u2193";
            }
            return _react2.default.createElement(
              "th",
              { key: idx },
              title
            );
          }, this)
        )
      ),
      _react2.default.createElement(
        "tbody",
        { onDoubleClick: this._showEditor },
        this._renderSearch(),
        this.state.data.map(function (row, rowidx) {
          return _react2.default.createElement(
            "tr",
            { key: rowidx },
            row.map(function (cell, idx) {
              var content = cell;
              var edit = this.state.edit;
              if (edit && edit.row === rowidx && edit.cell === idx) {
                content = _react2.default.createElement(
                  "form",
                  { onSubmit: this._save },
                  _react2.default.createElement("input", { type: "text", defaultValue: cell })
                );
              }
              return _react2.default.createElement(
                "td",
                { key: idx, "data-row": rowidx },
                content
              );
            }, this)
          );
        }, this)
      )
    );
  }
});

exports.default = Excel;


ReactDOM.render(_react2.default.createElement(Excel, {
  headers: headers,
  initialData: data
}), document.getElementById("app"));