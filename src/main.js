class BarGraphForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            orientation: "vertical",
            numberOfBars: 0,
            barNames: [],
            barColors: []
         };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateColorFields = this.generateColorFields.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === "barColors"){
            barColors.push(this.setState({"barColors": value}));
            console.log(barColors);
        } else {
            this.setState({ [name]: value });
        }
        console.log({[name]: value})
    }

    generateColorFields(event) {
        this.setState({ numberOfBars: event.target.value });
        const numColors = [];
        const input = event.target.value;
        for (let i = 1; i <= input; i++) {
            numColors.push(i);
        }

        const colorsContainer = document.querySelector("#colors");
        ReactDOM.render(<ColorFields numColors={numColors} value={this.state.changed} onChange={this.handleChange}/>, colorsContainer);
    }

    handleSubmit(event) {
        alert("place holder for do stuff to canvas");
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label className="category-title">Graph orientation</label>
                <div className="category" onChange={this.handleChange}>
                    <label for="vertical"> Vertical: </label>
                    <input type="radio" id="vertical" name="orientation" required defaultChecked value="vertical"/>
                    <label for="horizontal"> Horizontal: </label>
                    <input type="radio" id="horizontal" name="orientation" required value="horizontal"/>
                </div>
                <div className="category">
                    <label for="number-of-bars"> Number of Bars: </label>
                    <input type="number" id="number-of-bars" name="number-of-bars" min="1" value={this.state.numberOfBars} onChange={this.generateColorFields} />
                    <div id="colors"></div>
                </div>
            </form>
        );
    }
}

function ColorInput(props) {
    return <input type="color" name="barColors"/>
}

function ColorFields(props, value, changed) {
    const numColors = props.numColors;

    console.log(numColors)
    return numColors.map((number, index) =>
        <ColorInput id={"barcolor_" + index.toString()} key={"barcolor_" + index.toString()} value={value} onChange={() => {changed}}/>
    );
}


const domContainer = document.querySelector("#settings-form-react");
ReactDOM.render(<BarGraphForm />, domContainer);