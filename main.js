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
                { className: "flex-item" },
                React.createElement(
                    "label",
                    { "for": "graph-type" },
                    "Graph Type: "
                ),
                React.createElement(
                    "select",
                    { className: "custom-select", value: this.state.value, onChange: this.handleChange },
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
            numberOfBars: "",
            barNames: [],
            barColors_: [],
            barValues: []
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
            var t_id = getID(id);

            switch (true) {
                case id.includes("barColors"):
                    console.log("barColors");
                    if (_typeof(this.state.barColors_[t_id])) {
                        var newValue = this.state.barColors_[t_id] = value;
                        this.state.barColors_.splice(t_id, 1, newValue);
                        this.setState({ barColors_: this.state.barColors_ });
                    }
                    break;
                case id.includes("barNames"):
                    console.log("barNames");
                    if (_typeof(this.state.barNames[t_id])) {
                        var input = target.value;
                        var _newValue = this.state.barNames[t_id] = input;
                        this.state.barNames.splice(t_id, 1, _newValue);
                        this.setState({ barNames: this.state.barNames });
                    }
                    break;
                case id.includes("barValues"):
                    console.log("id: " + id);
                    console.log("barNames");
                    if (_typeof(this.state.barValues[t_id])) {
                        var _input = target.value;
                        var _newValue2 = this.state.barValues[t_id] = _input;
                        this.state.barValues.splice(t_id, 1, _newValue2);
                        this.setState({ barValues: this.state.barValues });
                        break;
                    }
                default:
                    console.log("default");
                    this.setState(_defineProperty({}, name, value));
                    console.log(_defineProperty({}, name, value));
            }
        }
    }, {
        key: "generateBarFields",
        value: function generateBarFields(event) {
            this.setState({ numberOfBars: event.target.value });
            var numBars = [];
            var input = event.target.value;

            //reset states
            this.setState({ barColors_: [] });
            this.setState({ barNames: [] });
            this.setState({ barValues: [] });
            for (var i = 1; i <= input; i++) {
                numBars.push(i);
                this.state.barColors_[i - 1] = "#000000";
                this.state.barNames[i - 1] = "barNames_" + (i - 1).toString();
                this.state.barValues[i - 1] = 0;
                this.setState({ barColors_: this.state.barColors_ });
                this.setState({ barNames: this.state.barNames });
                this.setState({ barValues: this.state.barValues });
            }

            var groupsContainer = document.querySelector("#group-container");
            var settingsElements = document.querySelectorAll(".settings-element");

            //node clean up
            ReactDOM.unmountComponentAtNode(groupsContainer);
            settingsElements.forEach(function (item) {
                ReactDOM.unmountComponentAtNode(item);
            });

            //render new elements
            ReactDOM.render(React.createElement(MapGroupInputs, { numBars: numBars, name: "group-container_" }), groupsContainer);
            for (var _i = 0; _i <= input; _i++) {
                ReactDOM.render(React.createElement(
                    "label",
                    null,
                    "Bar ",
                    (_i + 1).toString()
                ), document.querySelector("#label_" + _i.toString()));
                ReactDOM.render(React.createElement(ColorInput, { name: "barColors_" + _i.toString(), id: "barColors_" + _i.toString(), key: "barColors_" + _i.toString(), defaultValue: "#000000", onChange: this.handleChange }), document.querySelector("#colors_" + _i.toString()));
                ReactDOM.render(React.createElement(NameInput, { name: "barNames_" + _i.toString(), id: "barNames_" + _i.toString(), key: "barNames_" + _i.toString(), placeholder: "Name", onChange: this.handleChange }), document.querySelector("#bar-names_" + _i.toString()));
                ReactDOM.render(React.createElement(NumberInput, { name: "barValues_" + _i.toString(), id: "barValues_" + _i.toString(), key: "barValues_" + _i.toString(), placeholder: 0, onChange: this.handleChange }), document.querySelector("#bar-values_" + _i.toString()));
            }
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            var stateArray = Object.values(this.state.barValues.toString());
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
                    "div",
                    { className: "flex-container" },
                    React.createElement(
                        "div",
                        { className: "flex-item" },
                        React.createElement(
                            "h4",
                            { className: "category-title" },
                            "Orientation"
                        ),
                        React.createElement(
                            "div",
                            { className: "category" },
                            React.createElement(GraphOrientation, { onChange: this.handleChange })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "flex-item" },
                        React.createElement(
                            "h4",
                            { className: "category-title" },
                            "Settings"
                        ),
                        React.createElement(
                            "div",
                            { className: "category" },
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "label",
                                    { "for": "number-of-bars" },
                                    " Number of Bars:\xA0"
                                ),
                                React.createElement("input", { type: "number", className: "custom-number-input", id: "number-of-bars", name: "number-of-bars", min: "1", placeholder: "0", value: this.state.numberOfBars, onChange: this.generateBarFields })
                            )
                        )
                    )
                ),
                React.createElement("div", { className: "category justify-center", id: "group-container" }),
                React.createElement(
                    "div",
                    { className: "clearfix" },
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
        { className: "flex-container", onChange: props.onChange },
        React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "label",
                { className: "radio-label", "for": "vertical" },
                "Vertical"
            ),
            React.createElement("input", { type: "radio", id: "vertical", name: "orientation", required: true, defaultChecked: true, value: "vertical" }),
            React.createElement("span", { className: "checkmark" })
        ),
        React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "label",
                { className: "radio-label", "for": "horizontal" },
                "Horizontal"
            ),
            React.createElement("input", { type: "radio", id: "horizontal", name: "orientation", required: true, value: "horizontal" }),
            React.createElement("span", { className: "checkmark" })
        )
    );
}

function ColorInput(props) {
    return React.createElement("input", { type: "color", className: "settings-element", name: props.name, id: props.id, onChange: props.onChange });
}

function NameInput(props) {
    return React.createElement("input", { type: "text", className: "settings-element", name: props.name, value: props.value, placeholder: props.placeholder, id: props.id, onChange: props.onChange });
}

function NumberInput(props) {
    return React.createElement("input", { type: "number", className: "settings-element", name: props.name, id: props.id, placeholder: props.placeholder, onChange: props.onChange });
}

function GroupInputs(props) {
    return React.createElement(
        "div",
        { className: props.className, id: props.id, name: props.name },
        React.createElement("div", { className: "settings-element", id: props.labelId }),
        React.createElement("div", { className: "settings-element", id: props.nameId }),
        React.createElement("div", { className: "settings-element", id: props.numId }),
        React.createElement("div", { className: "settings-element", id: props.colorId })
    );
}

function MapGroupInputs(props) {
    var numInputs = props.numBars;

    return numInputs.map(function (number, index) {
        return React.createElement(GroupInputs, { className: "bar-group", id: "barGroup_" + index.toString(), key: "barGroup_" + index.toString(), labelId: "label_" + index.toString(), nameId: "bar-names_" + index.toString(), colorId: "colors_" + index.toString(), numId: "bar-values_" + index.toString() });
    });
}

function AxisTitle(props) {
    return React.createElement("input", { type: "text", className: "settings-element", name: props.name, value: props.value, placeholder: props.placeholder, onChange: props.onChange });
}

function getID(id) {
    return id.split("_")[1];
}

var domContainer = document.querySelector("#graph-select");
ReactDOM.render(React.createElement(GraphType, null), domContainer);