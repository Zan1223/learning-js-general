import React from 'react';
import Clock from '../Clock/Clock';
import MegaNav from '../MegaNav/MegaNav';
import FilterableProductTable from '../FilterableProductTable/FilterableProductTable';

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
const MyContext = React.createContext('testClass');
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <MegaNav list={['About me', 'my work', 'fun facts']}/>
        <MyContext.Provider value={'testClassOne'}>
          <FilterableProductTable productList={PRODUCTS}/>
        </MyContext.Provider>
      </header>
    </div>
  );
}

export default App;
