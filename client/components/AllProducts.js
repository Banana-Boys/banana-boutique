import react from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/product';

class AllProducts extends react.Component {
  render() {
    return 'hello world';
  }
}

const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
