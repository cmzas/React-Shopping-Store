import React, { Component } from 'react'
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from 'react-redux';
import { fetchProducts } from "../action/productAction";

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null
        }
    }
    componentDidMount() {
        this.props.fetchProducts();
    }
    openModal = (product) => {
        this.setState({ product });
    }
    closeModal = () => {
        this.setState({ product: null })
    }
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    {!this.props.products ? (
                        <div>Loading</div>
                    ) : (
                        <ul className="products">
                            {this.props.products.map((product) => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                            <img src={product.image} alt={product.title}></img>

                                            <p>{product.title}</p>
                                        </a>
                                        <div className="product-price">
                                            <div>${product.price}</div>
                                            <button onClick={() => this.props.addToCart(product)}>Add to Cart</button>
                                        </div>
                                    </div>

                                </li>
                            ))}

                        </ul>
                    )

                    }

                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>x</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <div className="product-details-description">
                                    <strong><p>{product.title}</p></strong>
                                    <p>{product.description}</p>
                                    <p>Available Sizes {" "}
                                        {product.availableSizes.map((x) =>
                                            <span key={x}>
                                                {" "}
                                                <button className="available-sizes">{x}</button>
                                            </span>
                                        )

                                        }
                                    </p>
                                    <div className="product-price">
                                        <div>
                                            ${product.price}{" "}
                                            <button className="button primary" onClick={() => {
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}>
                                                Add to Cart

                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )

                }
            </div>
        )
    }
}
export default connect(
    (state) => ({ products: state.products.filteredItems }),
    {
      fetchProducts,
    }
  )(Products);