'use strict';

class TestButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <button className="btn btn-primary" onClick={() => this.setState({ liked: true }) }>
        Like
      </button>
    );
  }
}

let domContainer = document.querySelector('#test_button_container');
ReactDOM.render(<TestButton />, domContainer);