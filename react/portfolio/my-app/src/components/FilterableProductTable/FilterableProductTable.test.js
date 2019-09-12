import React from 'react';
import ReactDOM from 'react-dom';
import FilterableProductTable from './FilterableFilterableProductTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterableProductTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
