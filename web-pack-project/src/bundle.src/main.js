import './main.scss';
import indexComp from '../index-comp';
import Button from '../components/button/button';
import Text from '../components/text/text';

document.addEventListener('DOMContentLoaded', function(){
  document.body.appendChild(indexComp());
  Button();
  Text();
})