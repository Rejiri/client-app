import React from 'react';
import ProductService from '../services/product.service.js';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            code: '',
            name: '',
            type: '',
            count: 0,
            unitPrice: 0,
            totalPrice: 0
        }

        this.onSave = this.onSave.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);
        this.onChangeUnitPrice = this.onChangeUnitPrice.bind(this);
        this.onChangeTotalPrice = this.onChangeTotalPrice.bind(this);
    }

    onSave(event) {
        let product = {
            code: this.state.code,
            name: this.state.name,
            type: this.state.type,
            count: this.state.count,
            unitPrice: this.state.unitPrice,
            totalPrice: this.state.totalPrice
        };

        if (this.state.id == '-1')
            ProductService.create(product)
            .then(() => {
                this.props.history.push('/products');
            })
            .catch((error) => console.log(error));
        else
            ProductService.update(this.state.id, product)
            .then(() => {
                this.props.history.push('/products');
            })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        if (this.state.id == '-1')
            return;

        ProductService.getById(this.state.id)
            .then(res => {
                this.setState({
                    id: res.data._id,
                    code: res.data.code,
                    name: res.data.name,
                    type: res.data.type,
                    count: res.data.count,
                    unitPrice: res.data.unitPrice,
                    totalPrice: res.data.totalPrice
                });
            })
            .catch(error => console.log(error.message));
    }

    onChangeCode(event) {
        this.setState({
            code: event.target.value
        });
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeType(event) {
        this.setState({
            type: event.target.value
        });
    }

    onChangeCount(event) {
        this.setState({
            count: event.target.value
        });
    }

    onChangeUnitPrice(event) {
        this.setState({
            unitPrice: event.target.value
        });
    }

    onChangeTotalPrice(event) {
        this.setState({
            totalPrice: event.target.value
        });
    }

    render() {
        return (
            <div className="container card">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h2 className="text-center">Add/Update Product</h2>
                        <br />
                        <div>
                        	<div className="form-group">
				              <label htmlFor="code">Code</label>
				              <input type="text" name="code" id="code" className="form-control" value={this.state.code} onChange={this.onChangeCode} required />
				            </div>
				            <div className="form-group">
				              <label htmlFor="name">Name</label>
				              <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.onChangeName} required />
				            </div>
				            <div className="form-group">
				              <label htmlFor="type">Type</label>
				              <select className="form-control" value={this.state.type} onChange={this.onChangeType}>
				              	<option value=""></option>
				              	<option value="Type 1">Type 1</option>
				              	<option value="Type 2">Type 2</option>
				              	<option value="Type 3">Type 3</option>
				              </select>
				            </div>
				            <div className="form-group">
				              <label htmlFor="count">Count</label>
				              <input type="number" name="count" id="count" className="form-control" value={this.state.count} onChange={this.onChangeCount} />
				            </div>
				            <div className="form-group">
				              <label htmlFor="unitPrice">Unit Price</label>
				              <input type="number" name="unitPrice" id="unitPrice" className="form-control" value={this.state.unitPrice} onChange={this.onChangeUnitPrice} />
				            </div>
				            <div className="form-group">
				              <label htmlFor="totalPrice">Total Price</label>
				              <input type="number" name="totalPrice" id="totalPrice" className="form-control" value={this.state.totalPrice} onChange={this.onChangeTotalPrice} />
				            </div>
				            <div className="text-center">
				            	<button className="btn btn-success" onClick={this.onSave}>Save</button>
				            </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default AddProduct;