class BarGraphForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert("place holder for do stuff to canvas");
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Graph orientation
                    <div style="border: solid; border-width: 1px;">
                        <label for="vertical"> Vertical: </label>
                        <input type="radio" id="vertical" name="orientation" value="vertical" />
                        <label for="horizontal"> Horizontal: </label>
                        <input type="radio" id="horizontal" name="orientation" value="horizontal" />
                    </div>
                </label>
            </form>
        );
    }
}

const domContainer = document.querySelector("#settings-form-react");
ReactDOM.render(<BarGraphForm />, domContainer);