import _ from 'lodash';
import printMe from './print';
import './style.scss';
import mountainImage from './mountain.png';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  // const myImage = new Image();
  // myImage.src = mountainImage;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());