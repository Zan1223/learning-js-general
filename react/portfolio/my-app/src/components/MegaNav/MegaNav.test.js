import React from 'react';
import ReactDOM from 'react-dom';
import MegaNav from './MegaNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MegaNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});
