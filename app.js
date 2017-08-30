// create variables that hold data information and respond to user interaction
const ProductList = React.createClass({
	getInitialState: function () {
		return {
			products: [],
		};
	},
	componentDidMount: function () {
		this.updateState();
	},
	// auto re render site based on vote info
	updateState: function () {
		const products = Data.sort((a, b) => {
			return b.votes - a.votes;
		});
		this.setState({ products: products });
	},
	handleProductUpVote: function (productId) {
		Data.forEach((el) => {
			if (el.id === productId) {
				el.votes = el.votes + 1;
				return;
			}
		});
		this.updateState();
		console.log(productId + " was upvoted.");
	},
	render: function () {
		// created variable for data pulled from database
		const products = this.state.products.map((product) => {
			return (
				<Product 
					key={'product-' + product.id}
					id={product.id}
     				title={product.title}
      				description={product.description}
     				url={product.url}
     				votes={product.votes}
      				submitter_avatar_url={product.submitter_avatar_url}
     				product_image_url={product.product_image_url}
     				onVote={this.handleProductUpVote}
     			/>
			);
		});
/
// return div with app
		return (
			<div className='ui items'>
				{products}
			</div>
		);	
	},
});
/
const Product = React.createClass({
	// class that holds upvote count
	handleUpVote: function () {
		this.props.onVote(this.props.id);
	},
	render: function () {
		// users profile and votes
		return (
			<div className='item'>
				<div className='image'>
					<img src={this.props.product_image_url} />
				</div>
				<div className='middle aligned content'>
					<div className='header'>
						<a onClick={this.handleUpVote}>
							<i className='large caret up icon'></i>
						</a>
						{this.props.votes}
					</div>
					<div className='description'>
						<a href={this.props.url}> 
							{this.props.title}
						</a>
					</div>
					<div className='extra'>
						<span>Submitted by:</span>
						<img
							className='ui avatar image'
							src={this.props.submitter_avatar_url}
						/>
					</div>
				</div>
			</div>
		);
	},
});
// data renders to content ID
ReactDOM.render(
	<ProductList />,
	document.getElementById('content')
);