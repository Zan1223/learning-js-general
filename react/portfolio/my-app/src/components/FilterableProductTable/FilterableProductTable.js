import React from 'react';
import './FilterableProductTable.css';

class FilterableProductTable extends React.Component {
        constructor(props) {
            super(props);
            this.state = {jason: this.props.prodList, onlyStocked: false, searchString: ''}
        }
        showOnlyStocked = (el) =>{
            this.setState({onlyStocked: !this.state.onlyStocked});
        }

        searchProduct = (el) =>{
            const searchTerm = el.target.value;
            this.setState({searchString: searchTerm});
        }

        searchBar = () =>{
            return (
                <form>
                    <input type="text" placeholder="Search..." onChange={this.searchProduct}/>
                    <p>
                    <input type="checkbox" onChange={this.showOnlyStocked}/>
                    {' '/*fpr adding the space before text below*/}
                    Only show products in stock
                    </p>
                </form>
            )
        }
        productRow = (product) =>{
            return (
                <tr key={product.name}>
                    <td className={`stocked-${product.stocked}`}>{product.name}</td>
                    <td>{product.price}</td>
                </tr>
            )
        }
        productCategoryRow = (category) =>{
            return (
                <tr key={category}>
                    <th>
                        {category}
                    </th>
                </tr>
            )
        }

        productTable = (props) =>{
            const rows = [];
            const fitlerTerm = this.state.searchString.toLowerCase();
            const stockFlag = this.state.onlyStocked;
            let lastCategory = null;
            props.forEach((product)=>{
                if(stockFlag && !product.stocked){
                    return;
                }
                if(product.name.toLowerCase().indexOf(fitlerTerm) === -1){
                    return;
                }
                if(product.category !== lastCategory){
                    rows.push(this.productCategoryRow(product.category));
                 }

                rows.push(this.productRow(product))

                lastCategory = product.category;
            });
            return(
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            );
        }
        
    
        render() {
            return(
                    <div>
                        {this.searchBar()}
                        {this.productTable(this.props.productList)}
                    </div>
                )
            }
        }

export default FilterableProductTable;