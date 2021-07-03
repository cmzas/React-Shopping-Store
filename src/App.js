import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

//feature-1
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    }
  }
  // size sorting
  filterProducts = (e) => {
    const size=e.target.value
    console.log(e.target.value);
    if (size === "") {
      this.setState({
        size:size,
        products: data.products
      })
    }else{
      this.setState({
        size:size,
        products: data.products.filter((product) => product.availableSizes.indexOf(size) >= 0),
      })
    }
   
  }
// price sorting
  sortProducts = (e) => {
    console.log(e.target.value);
    const sort = e.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice()
        .sort((a, b) =>
          sort === "lowest" ?
            a.price > b.price
              ? 1
              : -1
            : sort === "highest" ?
              a.price < b.price
                ? 1
                : -1
              : a._id > b._id ? 1
                : -1
        ),
    }));
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">
              cart
            </div>
          </div>
        </main>
        <footer>
          All right Reserved
        </footer>
      </div>
    );
  }
}

export default App;
