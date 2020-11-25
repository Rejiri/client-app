import React from 'react';
import ProductService from '../services/product.service.js';

class ProductsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            searchTerm: ''
        }

        this.refreshList = this.refreshList.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        ProductService.getAll().then(res => {
            this.setState({ products: res.data });
        }).catch(error => console.log(error));
    }

    onChangeSearchTerm(event) {
        this.setState({ searchTerm: event.target.value });
    }

    onSearch() {
        ProductService.getByName(this.state.searchTerm).then(res => {
            this.setState({ products: res.data });
        }).catch(error => console.log(error));
    }

    onAdd() {
        this.props.history.push('/products/-1');
    }

    onEdit(id) {
        this.props.history.push(`/products/${id}`);
    }

    onDelete(id) {
        ProductService.delete(id)
            .then(res => {
                const list = this.state.products.filter(item => item._id != id);
                this.setState({
                    products: list
                })
            })
            .catch(error => console.log(error));
    }

    getList() {
    	return this.state.products.map(product => (
            <tr key={product._id}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.count}</td>
                <td>{product.unitPrice}</td>
                <td>{product.totalPrice}</td>
                <td>
                    <button className="btn btn-info" onClick={ () => this.onEdit(product._id)}>View / Update</button>
                    <button className="btn btn-danger ml-2" onClick={ () => this.onDelete(product._id)}>Delete</button>
                </td>
            </tr>
        ));
    }

    render() {
    	return (
    		<div>
    			<div className="jumbotron">
	                <h3 className="text-center">Products</h3>
					<div className="col-md-6 offset-md-3">
						<div className="input-group">
							<input type="text" className="form-control" placeholder="Search by name" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} />
							<div className="input-group-append">
								<button type="button" className="btn btn-outline-secondary" onClick={this.onSearch}>Search</button>
							</div>
						</div>
					</div>
				</div>
                <br />
                <div className="row">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Count</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        	{ this.getList() }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                	<button className="btn btn-primary" onClick={this.onAdd}>Add Product</button>
                </div>
            </div>
    		);
    }
}

export default ProductsList;
