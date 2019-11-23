import React, { Component } from "react";
import { connect } from "react-redux";

class Recipe extends Component {
  state = {
    name: "",
    address: ""
  };

  nameChange = event => {
    this.setState({ name: event.target.value });
  };
  addressChange = event => {
    this.setState({ address: event.target.value });
  };
  handleSubmit = event => {
    fetch("http://127.0.0.1:5000/ ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        address: this.state.address,
        amount: this.props.total,
        products: this.props.addedItems
      })
    });

    fetch("http://127.0.0.1:3001/pay ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    this.props.clearCart();
    this.setState({
      name: "",
      address: ""
    });
    event.preventDefault();
  };

  render() {
    return (
      <div className="container center-align">
        <div className="collection">
          <li className="collection-item">
            <b>Total: {this.props.total} $</b>
          </li>
        </div>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={this.state.name}
              onChange={this.nameChange}
            />
          </label>
        </form>
        <form>
          <label>
            Address:
            <input
              type="text"
              value={this.state.address}
              onChange={this.addressChange}
            />
          </label>
        </form>
        <br />
        <div className="checkout">
          <button
            className="waves-effect waves-light btn"
            onClick={this.handleSubmit}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedItems: state.addedItems,
    total: state.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => {
      dispatch({ type: "CLEAR_CART" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
