var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarGraphForm = function (_React$Component) {
    _inherits(BarGraphForm, _React$Component);

    function BarGraphForm(props) {
        _classCallCheck(this, BarGraphForm);

        var _this = _possibleConstructorReturn(this, (BarGraphForm.__proto__ || Object.getPrototypeOf(BarGraphForm)).call(this, props));

        _this.state = {
            orientation: "vertical",
            numberOfBars: 0,
            barNames: [],
            barColors: []
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.generateColorFields = _this.generateColorFields.bind(_this);
        return _this;
    }

    _createClass(BarGraphForm, [{
        key: "handleChange",
        value: function handleChange(event) {
            var target = event.target;
            var value = target.value;
            var name = target.name;

            if (target.type === "color") {
                if (this.state.barColors.indexOf(target.id) == -1) {
                    var item = this.state.barColors.indexOf(target.id);
                    this.state.barColors.splice(item, item + 1);
                    this.setState({ barColors: [this.state.barColors, [target.id, value]] });
                } else {
                    this.setState({ barColors: [this.state.barColors, [target.id, value]] });
                }
            } else {
                this.setState(_defineProperty({}, name, value));
            }
            console.log(_defineProperty({}, name, value));
        }
    }, {
        key: "generateColorFields",
        value: function generateColorFields(event) {
            this.setState({ numberOfBars: event.target.value });
            var numColors = [];
            var input = event.target.value;
            for (var i = 1; i <= input; i++) {
                numColors.push(i);
            }

            var colorsContainer = document.querySelector("#colors");
            ReactDOM.render(React.createElement(ColorFields, { numColors: numColors, value: this.state.barColors, onInput: this.handleChange }), colorsContainer);
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
                    "label",
                    { className: "category-title" },
                    "Graph orientation"
                ),
                React.createElement(
                    "div",
                    { className: "category", onChange: this.handleChange },
                    React.createElement(
                        "label",
                        { "for": "vertical" },
                        " Vertical: "
                    ),
                    React.createElement("input", { type: "radio", id: "vertical", name: "orientation", required: true, defaultChecked: true, value: "vertical" }),
                    React.createElement(
                        "label",
                        { "for": "horizontal" },
                        " Horizontal: "
                    ),
                    React.createElement("input", { type: "radio", id: "horizontal", name: "orientation", required: true, value: "horizontal" })
                ),
                React.createElement(
                    "div",
                    { className: "category" },
                    React.createElement(
                        "label",
                        { "for": "number-of-bars" },
                        " Number of Bars: "
                    ),
                    React.createElement("input", { type: "number", id: "number-of-bars", name: "number-of-bars", min: "1", value: this.state.numberOfBars, onChange: this.generateColorFields }),
                    React.createElement("div", { id: "colors" })
                )
            );
        }
    }]);

    return BarGraphForm;
}(React.Component);

function ColorInput(props) {
    return React.createElement("input", { type: "color", name: "barColors", value: props.value, id: props.id, onInput: props.onInput });
}

function ColorFields(props) {
    var numColors = props.numColors;

    console.log(numColors);
    return numColors.map(function (number, index) {
        return React.createElement(ColorInput, { id: "barcolor_" + index.toString(), key: "barcolor_" + index.toString(), onInput: props.onInput });
    });
}

var domContainer = document.querySelector("#settings-form-react");
ReactDOM.render(React.createElement(BarGraphForm, null), domContainer);