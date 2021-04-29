import _ from 'lodash';
import printMe from './print';
import something from './something';
import './style.scss';


export default function indexComp() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  console.log(something());

  element.appendChild(btn);

  return element;
}
