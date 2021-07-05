import React from "react";
// import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import {Provider} from "react-redux";

//feature-1
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // products: data.products,
      cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
      // size: "",
      // sort: ""
    }
  }
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
    console.log(order.cartItems);
  };
  //remove item
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };
  addToCart = (product) => {
    // clone of cartItems
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }     
    });
    if(!alreadyInCart){
      cartItems.push({...product, count: 1})
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  };
  // size sorting
  // filterProducts = (e) => {
  //   const size = e.target.value
  //   console.log(e.target.value);
  //   if (size === "") {
  //     this.setState({
  //       size: size,
  //       products: data.products
  //     })
  //   } else {
  //     this.setState({
  //       size: size,
  //       products: data.products.filter((product) => product.availableSizes.indexOf(size) >= 0),
  //     })
  //   }

  // }
  // price sorting
  // sortProducts = (e) => {
  //   console.log(e.target.value);
  //   const sort = e.target.value;
  //   this.setState((state) => ({
  //     sort: sort,
  //     products: this.state.products.slice()
  //       .sort((a, b) =>
  //         sort === "lowest" ?
  //           a.price > b.price
  //             ? 1
  //             : -1
  //           : sort === "highest" ?
  //             a.price < b.price
  //               ? 1
  //               : -1
  //             : a._id > b._id ? 1
  //               : -1
  //       ),
  //   }));
  // }
  render() {
    return (
      <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
            <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
             <Cart cartItems={this.state.cartItems}
             removeFromCart={this.removeFromCart}
             createOrder={this.createOrder}
             ></Cart>
            </div>
          </div>
        </main>
        <footer>
          All right Reserved
        </footer>
      </div>
      </Provider>
    );
  }
}

export default App;
