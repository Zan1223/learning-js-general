import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const initData = [{ checkbox1: { text: 'CheckBox 1', checked: false } }, { checkbox2: { text: 'CheckBox 2', checked: false } }, { checkbox3: { text: 'CheckBox 3', checked: false } }, { checkbox4: { text: 'CheckBox 4', checked: false } }];

function CheckBox(props) {
	return (
		<div>
			<label>
				<input type='checkbox' value={props.value} checked={props.checked} onChange={props.statusChange} dataindex={props.index} />
				{props.text}
			</label>
		</div>
	)
}

function Button(props) {
	return (
		<button onClick={props.onClick}>{props.text}</button>
	)
}

function Display(props){
	const selected = props.data.filter((item, index)=>props.data[index][Object.keys(item)].checked)
	//console.log('selected++++', selected);
	return (
		<div className="display">
			<ul>
			{selected.map((item,index)=><li key={index}>{selected[index][Object.keys(item)].text}</li>)}
			</ul>
		</div>
	)
}


function CheckBoxContainer(props) {
	const [data, setData] = useState(props.initCheckBox);
//	const [cleared, setCleared] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);
	const save = () => {
		console.log('saved data +++', data);
		setShowDisplay(true);
	}
	const clear = (event) => {
		// setData(initialData);
		data.map((item,index)=>data[index][Object.keys(item)].checked = false);
		// console.log(data);
		setData(data.slice(0))
	}
	const cancel = () => {
		// console.log('ffdafdafd');
	}

	const updateCheckBox = (event) => {
		const index = event.target.getAttribute('dataindex');
		const value = event.target.value;
		data[index][value].checked = !data[index][value].checked;
		setData(data.slice(0));
	}

	return (
		<div>
			{data.map((item, index) => <CheckBox 
				value={Object.keys(item)} 
				text={data[index][Object.keys(item)].text} 
				checked={data[index][Object.keys(item)].checked} 
				key={index} statusChange={updateCheckBox} 
				index={index} />
			)}
			<Button text='Save' onClick={save} />
			<Button text='Clear' onClick={clear} />
			<Button text='Cancel' onClick={cancel} />
			{showDisplay && <Display data={data}/>}
		</div>
	)
}





ReactDOM.render(<CheckBoxContainer initCheckBox={initData} />, document.getElementById('root'));