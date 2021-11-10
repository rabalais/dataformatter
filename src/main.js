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
            <form className="flex-item">
                <label for="graph-type">Graph Type: </label>
                <select className="custom-select" value={this.state.value} onChange={this.handleChange}>
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
            numberOfBars: "",
            barNames: [],
            barColors_: [],
            barValues: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateBarFields = this.generateBarFields.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const id = target.id;
        const t_id = getID(id);

        switch (true) {
            case id.includes("barColors"):
                console.log("barColors")
                if (typeof this.state.barColors_[t_id]) {
                    let newValue = (this.state.barColors_[t_id] = value);
                    this.state.barColors_.splice(t_id, 1, newValue);
                    this.setState({ barColors_: this.state.barColors_ });
                }
                break;
            case id.includes("barNames"):
                console.log("barNames")
                if (typeof this.state.barNames[t_id]) {
                    let input = target.value;
                    let newValue = (this.state.barNames[t_id] = input);
                    this.state.barNames.splice(t_id, 1, newValue);
                    this.setState({ barNames: this.state.barNames });
                }
                break;
            case id.includes("barValues"):
                console.log("id: " + id);
                console.log("barNames")
                if (typeof this.state.barValues[t_id]) {
                    let input = target.value;
                    let newValue = (this.state.barValues[t_id] = input);
                    this.state.barValues.splice(t_id, 1, newValue);
                    this.setState({ barValues: this.state.barValues });
                    break;
                }
            default:
                console.log("default")
                this.setState({ [name]: value });
                console.log({ [name]: value });
        }
    }

    generateBarFields(event) {
        this.setState({ numberOfBars: event.target.value });
        const numBars = [];
        const input = event.target.value;

        //reset states
        this.setState({ barColors_: [] });
        this.setState({ barNames: [] });
        this.setState({ barValues: [] });
        for (let i = 1; i <= input; i++) {
            numBars.push(i);
            this.state.barColors_[i - 1] = "#000000";
            this.state.barNames[i - 1] = ("barNames_" + (i - 1).toString());
            this.state.barValues[i - 1] = 0;
            this.setState({ barColors_: this.state.barColors_ });
            this.setState({ barNames: this.state.barNames });
            this.setState({ barValues: this.state.barValues });
        }

        const groupsContainer = document.querySelector("#group-container");
        const settingsElements = document.querySelectorAll(".settings-element");

        //node clean up
        ReactDOM.unmountComponentAtNode(groupsContainer);
        settingsElements.forEach(function (item) {
            ReactDOM.unmountComponentAtNode(item);
        })

        //render new elements
        ReactDOM.render(<MapGroupInputs numBars={numBars} name="group-container_" />, groupsContainer);
        for (let i = 0; i <= input; i++) {
            ReactDOM.render(<label>Bar {(i + 1).toString()}</label>, document.querySelector("#label_" + (i).toString()));
            ReactDOM.render(<ColorInput name={"barColors_" + i.toString()} id={"barColors_" + i.toString()} key={"barColors_" + i.toString()} defaultValue={"#000000"} onChange={this.handleChange} />, document.querySelector("#colors_" + (i).toString()));
            ReactDOM.render(<NameInput name={"barNames_" + i.toString()} id={"barNames_" + i.toString()} key={"barNames_" + i.toString()} placeholder={"Name"} onChange={this.handleChange} />, document.querySelector("#bar-names_" + (i).toString()));
            ReactDOM.render(<NumberInput name={"barValues_" + i.toString()} id={"barValues_" + i.toString()} key={"barValues_" + i.toString()} placeholder={0} onChange={this.handleChange} />, document.querySelector("#bar-values_" + (i).toString()));
        }
    }


    handleSubmit(event) {
        const stateArray = Object.values(this.state.barValues.toString());
        alert(stateArray);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="flex-container">
                    <div className="flex-item">
                        <h4 className="category-title">Orientation</h4>
                        <div className="category">
                            <GraphOrientation onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="flex-item">
                        <h4 className="category-title">Settings</h4>
                        <div className="category">
                            <div>
                                <label for="number-of-bars"> Number of Bars:&nbsp;</label>
                                <input type="number" className="custom-number-input" id="number-of-bars" name="number-of-bars" min="1" placeholder="0" value={this.state.numberOfBars} onChange={this.generateBarFields} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="category justify-center" id="group-container"></div>
                <div className="clearfix">
                    <input type="submit" id="submit" value="Apply" onSubmit={this.handleSubmit} />
                    <button type="button" id="save-to-pdf">Save to PDF</button>
                </div>
            </form>
        );
    }
}

function GraphOrientation(props) {
    return (
        <div className="flex-container" onChange={props.onChange}>
            <div className="container">
                <label className="radio-label" for="vertical">Vertical</label>
                <input type="radio" id="vertical" name="orientation" required defaultChecked value="vertical" />
                <span className="checkmark"></span>
            </div>
            <div className="container" >
                <label className="radio-label" for="horizontal">Horizontal</label>
                <input type="radio" id="horizontal" name="orientation" required value="horizontal" />
                <span className="checkmark"></span>
            </div>
        </div>
    )
}

function ColorInput(props) {
    return <input type="color" className="settings-element" name={props.name} id={props.id} onChange={props.onChange} />
}

function NameInput(props) {
    return <input type="text" className="settings-element" name={props.name} value={props.value} placeholder={props.placeholder} id={props.id} onChange={props.onChange} />
}

function NumberInput(props) {
    return <input type="number" className="settings-element" name={props.name} id={props.id} placeholder={props.placeholder} onChange={props.onChange} />
}

function GroupInputs(props) {
    return (
        <div className={props.className} id={props.id} name={props.name}>
            <div className="settings-element" id={props.labelId}></div>
            <div className="settings-element" id={props.nameId}></div>
            <div className="settings-element" id={props.numId}></div>
            <div className="settings-element" id={props.colorId}></div>
        </div>
    );
}

function MapGroupInputs(props) {
    let numInputs = props.numBars;

    return numInputs.map((number, index) =>
        <GroupInputs className={"bar-group"} id={"barGroup_" + index.toString()} key={"barGroup_" + index.toString()} labelId={"label_" + index.toString()} nameId={"bar-names_" + index.toString()} colorId={"colors_" + index.toString()} numId={"bar-values_" + index.toString()} />
    );
}

function getID(id) {
    return id.split("_")[1];
}


const domContainer = document.querySelector("#graph-select");
ReactDOM.render(<GraphType />, domContainer);