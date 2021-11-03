// npx babel --watch src --out-dir . --presets react-app/prod

class GraphType extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });


        const target = event.target;
        console.log(target);
        const container = document.querySelector("#settings-form-react");
        switch (target.value) {
            case "bargraph":
                ReactDOM.render(<BarGraphForm />, container);
                console.log("Loaded bar graph");
                break;
            case "piechart":
                console.log("Loaded pie chart");
                break;
        }
    }

    render() {
        return (
            <form id="settings-form">
                <h4>Select a graph to get started</h4>
                <label for="graph-type">Graph Type: </label>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option disabled hidden value=""></option>
                    <option value="bargraph">Bar Graph</option>
                </select>
            </form>

        );
    }
}

class BarGraphForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: "vertical",
            numberOfBars: 0,
            barNames: [],
            barColors_: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateColorFields = this.generateColorFields.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const id = target.id;

        if (target.type === "color") {
            if (typeof this.state.barColors_[id] === "undefined") {
                console.log("pushed new value");
                this.state.barColors_[id] = value;
                this.setState({ barColors_: this.state.barColors_ });
            } else {
                let newValue = (this.state.barColors_[id] = value);
                this.state.barColors_.splice(id, newValue);
                this.setState({ barColors_: this.state.barColors_ });
                console.log("changed old value");
            }
        } else {
            this.setState({ [name]: value });
        }
        console.log({ [target.id]: value });
    }

    generateColorFields(event) {
        this.setState({ numberOfBars: event.target.value });
        const numColors = [];
        const input = event.target.value;
        for (let i = 1; i <= input; i++) {
            numColors.push(i);
            this.state.barColors_[i-1] = "#000000";
            this.setState({ barColors_: this.state.barColors_ });
        }
        const colorsContainer = document.querySelector("#colors");
        ReactDOM.render(<MapColorFields numColors={numColors} onChange={this.handleChange} name="barColors_" />, colorsContainer);
    }

    handleSubmit(event) {
        alert("place holder for do stuff to canvas");
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h4 className="category-title">Graph orientation</h4>
                <div className="category">
                    <GraphOrientation onChange={this.handleChange} />
                </div>
                <h4 className="category-title">Bar settings</h4>
                <div className="category">
                    <label for="number-of-bars"> Number of Bars:&nbsp;</label>
                    <input type="number" id="number-of-bars" name="number-of-bars" min="1" value={this.state.numberOfBars} onChange={this.generateColorFields} />
                </div>
                <div className="category">
                    <label for="colors"> Colors:  </label>
                    <div id="colors"></div>
                </div>
            </form>
        );
    }
}

function GraphOrientation(props) {
    return (
        <div onChange={props.onChange}>
            <label for="vertical"> Vertical:&nbsp;</label>
            <input type="radio" id="vertical" name="orientation" required defaultChecked value="vertical" />
            <label for="horizontal"> Horizontal:&nbsp;</label>
            <input type="radio" id="horizontal" name="orientation" required value="horizontal" />
        </div>
    )
}

function ColorInput(props) {
    return <input type="color" name={props.value} value={props.value} id={props.id} onChange={props.onChange} />
}

function MapColorFields(props) {
    const numColors = props.numColors;

    console.log(numColors)
    return numColors.map((number, index) =>
        <ColorInput name={props.name + index.toString()} id={index.toString()} key={props.name + index.toString()} defaultValue={"#000000"} onChange={props.onChange} />
    );
}

function LabelInput(props) {
    return <input type="text" name="LabelInput" />
}


const domContainer = document.querySelector("#graph-select");
ReactDOM.render(<GraphType />, domContainer);