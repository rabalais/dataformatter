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
        _this2.generateColorFields = _this2.generateColorFields.bind(_this2);
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
                if (typeof this.state.barColors_[id] === "undefined") {
                    console.log("pushed new value");
                    this.state.barColors_[id] = value;
                    this.setState({ barColors_: this.state.barColors_ });
                } else {
                    var newValue = this.state.barColors_[id] = value;
                    this.state.barColors_.splice(id, newValue);
                    this.setState({ barColors_: this.state.barColors_ });
                    console.log("changed old value");
                }
            } else {
                this.setState(_defineProperty({}, name, value));
            }
            console.log(_defineProperty({}, target.id, value));
        }
    }, {
        key: "generateColorFields",
        value: function generateColorFields(event) {
            this.setState({ numberOfBars: event.target.value });
            var numColors = [];
            var input = event.target.value;
            for (var i = 1; i <= input; i++) {
                numColors.push(i);
                this.state.barColors_[i - 1] = "#000000";
                this.setState({ barColors_: this.state.barColors_ });
            }
            var colorsContainer = document.querySelector("#colors");
            ReactDOM.render(React.createElement(MapColorFields, { numColors: numColors, onChange: this.handleChange, name: "barColors_" }), colorsContainer);
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            alert("place holder for do stuff to canvas");
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
                    React.createElement("input", { type: "number", id: "number-of-bars", name: "number-of-bars", min: "1", value: this.state.numberOfBars, onChange: this.generateColorFields })
                ),
                React.createElement(
                    "div",
                    { className: "category" },
                    React.createElement(
                        "label",
                        { "for": "colors" },
                        " Colors:  "
                    ),
                    React.createElement("div", { id: "colors" })
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
    var numColors = props.numColors;

    console.log(numColors);
    return numColors.map(function (number, index) {
        return React.createElement(ColorInput, { name: props.name + index.toString(), id: index.toString(), key: props.name + index.toString(), defaultValue: "#000000", onChange: props.onChange });
    });
}

function LabelInput(props) {
    return React.createElement("input", { type: "text", name: "LabelInput" });
}

var domContainer = document.querySelector("#graph-select");
ReactDOM.render(React.createElement(GraphType, null), domContainer);