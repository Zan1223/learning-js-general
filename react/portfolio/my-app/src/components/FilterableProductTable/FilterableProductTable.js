import React from 'react';
import './FilterableProductTable.css';
// const PRODUCTS = [
//     {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
//     {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
//     {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
//     {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
//     {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
//     {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
//   ];

class FilterableProductTable extends React.Component {
        // constructor(props) {
        //     super(props);
        //     this.state = {jason: this.props.prodList}
        // }
        searchBar = () =>{
            return (
                <form>
                    <input type="text" placeholder="Search..." />
                    <p>
                    <input type="checkbox" />
                    {' '/*fpr adding the space before text below*/}
                    Only show products in stock
                    </p>
                </form>
            )
        }
        productRow = (product) =>{
            return (
                <tr>
                    <td className={`stocked-${product.stocked}`}>{product.name}</td>
                    <td>{product.price}</td>
                </tr>
            )
        }
        productCategoryRow = (category) =>{
            return (
                <tr>
                    <th>
                        {category}
                    </th>
                </tr>
            )
        }

        productTable = (props) =>{
            const rows = [];
            let lastCategory = null;
            props.forEach((product)=>{
                if(product.category !== lastCategory){
                   rows.push(this.productCategoryRow(product.category));
                }
                rows.push(this.productRow(product))
                lastCategory = product.category;
            });
            console.log('+++++ rows', rows);
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