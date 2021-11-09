var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// npx babel --watch src --out-dir . --presets react-app/prod

var GraphType = function (_React$Component) {
    _inherits(GraphType, _React$Component);

    function GraphType(props) {
        _classCallCheck(this, GraphType);

        var _this = _possibleConstructorReturn(this, (GraphType.__proto__ || Object.getPrototypeOf(GraphType)).call(this, props));

        _this.state = { value: "" };

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(GraphType, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.setState({ value: event.target.value });

            var target = event.target;
            console.log(target);
            var container = document.querySelector("#settings-form-react");
            switch (target.value) {
                case "bargraph":
                    ReactDOM.render(React.createElement(BarGraphForm, null), container);
                    console.log("Loaded bar graph");
                    break;
                case "piechart":
                    console.log("Loaded pie chart");
                    break;
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { id: "settings-form" },
                React.createElement(
                    "h4",
                    null,
                    "Select a graph to get started"
                ),
                React.createElement(
                    "label",
                    { "for": "graph-type" },
                    "Graph Type: "
                ),
                React.createElement(
                    "select",
                    { value: this.state.value, onChange: this.handleChange },
                    React.createElement("option", { disabled: true, hidden: true, value: "" }),
                    React.createElement(
                        "option",
                        { value: "bargraph" },
                        "Bar Graph"
                    )
                )
            );
        }
    }]);

    return GraphType;
}(React.Component);

var BarGraphForm = function (_React$Component2) {
    _inherits(BarGraphForm, _React$Component2);

    function BarGraphForm(props) {
        _classCallCheck(this, BarGraphForm);

        var _this2 = _possibleConstructorReturn(this, (BarGraphForm.__proto__ || Object.getPrototypeOf(BarGraphForm)).call(this, props));

        _this2.state = {
            orientation: "vertical",
            numberOfBars: 0,
            barNames: [],
            barColors_: []
        };

        _this2.handleChange = _this2.handleChange.bind(_this2);
        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        _this2.generateBarFields = _this2.generateBarFields.bind(_this2);
        return _this2;
    }

    _createClass(BarGraphForm, [{
        key: "handleChange",
        value: function handleChange(event) {
            var target = event.target;
            var value = target.value;
            var name = target.name;
            var id = target.id;

            if (target.type === "color") {
                var _id = target.id.slice(-1);
                if (_typeof(this.state.barColors_[_id])) {
                    var newValue = this.state.barColors_[_id] = value;
                    this.state.barColors_.splice(_id, newValue);
                    this.setState({ barColors_: this.state.barColors_ });
                    console.log("changed old value");
                }
            } else if (target.type === "text") {
                var _id2 = target.id.slice(-1);
                if (_typeof(this.state.barNames[_id2])) {
                    var _newValue = this.state.barNames[_id2] = value;
                    this.state.barNames.splice(_id2, _newValue);
                    this.setState({ barNames: this.state.barNames });
                }
            } else {
                this.setState(_defineProperty({}, name, value));
            }
        }
    }, {
        key: "generateBarFields",
        value: function generateBarFields(event) {
            this.setState({ numberOfBars: event.target.value });
            var numBars = [];
            var input = event.target.value;
            for (var i = 1; i <= input; i++) {
                numBars.push(i);
                this.state.barColors_[i - 1] = "#000000";
                this.state.barNames[i - 1] = "barNames_" + (i - 1).toString();
                this.setState({ barColors_: this.state.barColors_ });
                this.setState({ barNames: this.state.barNames });
            }
            var colorsContainer = document.querySelector("#colors");
            var namesContainer = document.querySelector("#bar-names");
            ReactDOM.render(React.createElement(MapNameInputs, { numBars: numBars, onChange: this.handleChange, name: "barNames_" }), namesContainer);
            ReactDOM.render(React.createElement(MapColorFields, { numBars: numBars, onChange: this.handleChange, name: "barColors_" }), colorsContainer);
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            var stateArray = Object.values(this.state);
            alert(stateArray);
            event.preventDefault();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement(
                    "h4",
                    { className: "category-title" },
                    "Graph orientation"
                ),
                React.createElement(
                    "div",
                    { className: "category" },
                    React.createElement(GraphOrientation, { onChange: this.handleChange })
                ),
                React.createElement(
                    "h4",
                    { className: "category-title" },
                    "Bar settings"
                ),
                React.createElement(
                    "div",
                    { className: "category" },
                    React.createElement(
                        "label",
                        { "for": "number-of-bars" },
                        " Number of Bars:\xA0"
                    ),
                    React.createElement("input", { type: "number", id: "number-of-bars", name: "number-of-bars", min: "1", value: this.state.numberOfBars, onChange: this.generateBarFields })
                ),
                React.createElement(
                    "div",
                    { className: "category" },
                    React.createElement(
                        "label",
                        { "for": "colors" },
                        " Colors:\xA0"
                    ),
                    React.createElement("div", { id: "colors" })
                ),
                React.createElement(
                    "div",
                    { className: "category" },
                    React.createElement(
                        "label",
                        { "for": "bar-names" },
                        " Bar Names:\xA0"
                    ),
                    React.createElement("div", { id: "bar-names" })
                ),
                React.createElement(
                    "div",
                    { "class": "clearfix" },
                    React.createElement("input", { type: "submit", id: "submit", value: "Apply", onSubmit: this.handleSubmit }),
                    React.createElement(
                        "button",
                        { type: "button", id: "save-to-pdf" },
                        "Save to PDF"
                    )
                )
            );
        }
    }]);

    return BarGraphForm;
}(React.Component);

function GraphOrientation(props) {
    return React.createElement(
        "div",
        { onChange: props.onChange },
        React.createElement(
            "label",
            { "for": "vertical" },
            " Vertical:\xA0"
        ),
        React.createElement("input", { type: "radio", id: "vertical", name: "orientation", required: true, defaultChecked: true, value: "vertical" }),
        React.createElement(
            "label",
            { "for": "horizontal" },
            " Horizontal:\xA0"
        ),
        React.createElement("input", { type: "radio", id: "horizontal", name: "orientation", required: true, value: "horizontal" })
    );
}

function ColorInput(props) {
    return React.createElement("input", { type: "color", name: props.value, value: props.value, id: props.id, onChange: props.onChange });
}

function MapColorFields(props) {
    var numColors = props.numBars;

    console.log(numColors);
    return numColors.map(function (number, index) {
        return React.createElement(ColorInput, { name: props.name + index.toString(), id: props.name + index.toString(), key: props.name + index.toString(), defaultValue: "#000000", onChange: props.onChange });
    });
}

function NameInput(props) {
    return React.createElement("input", { type: "text", name: props.value, value: props.value, id: props.id, onChange: props.onChange });
}

function MapNameInputs(props) {
    var numInputs = props.numBars;

    console.log(numInputs);
    return numInputs.map(function (number, index) {
        return React.createElement(NameInput, { name: props.name + index.toString(), id: props.name + index.toString(), key: props.name + index.toString(), defaultValue: props.name + index.toString(), onChange: props.onChange });
    });
}

var domContainer = document.querySelector("#graph-select");
ReactDOM.render(React.createElement(GraphType, null), domContainer);