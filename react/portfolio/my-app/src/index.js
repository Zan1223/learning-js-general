import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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
	const selected = props.data.filter((item, index)=>item.checked);
	//console.log('selected++++', selected);
	return (
		<div className="display">
			<ul>
			{selected.map((item,index)=><li key={index}>{item.text}</li>)}
			</ul>
			<Button text='edit' onClick={props.showEditSwitch}/>
		</div>
	)
}

function EditorySection(props){
	return (
		<div>
			{props.data.map((item, index) => <CheckBox 
				value={item.id} 
				text={item.text} 
				checked={item.checked} 
				key={index} 
				statusChange={props.updateCheckBox} 
				index={index} />
			)}
			<Button text='Save' onClick={props.saveFn} />
			<Button text='Clear' onClick={props.clearFn} />
			<Button text='Cancel' onClick={props.cancelFn} />
			{/*showDisplay && <Display data={data}/>*/}
		</div>
	)	
}


function MultiSelectApp(props) {
	const initData = [{ id:'checkbox1', text: 'CheckBox 1', checked: false  }, { id:'checkbox2', text: 'CheckBox 2', checked: false  }, { id:'checkbox3', text: 'CheckBox 3', checked: false  }];
	let savedData = [{ id:'checkbox1', text: 'CheckBox 1', checked: false  }, { id:'checkbox2', text: 'CheckBox 2', checked: false  }, { id:'checkbox3', text: 'CheckBox 3', checked: false  }];
	const [data, setData] = useState(initData);
	const [showEditMode, setShowEditMode] = useState(false);
	console.log('fdsafdafda', savedData)
	const save = () => {
		setShowEditMode(false);
		savedData = [...data];
		console.log(savedData);
	}
	const clear = (event) => {
		data.forEach((item)=>item.checked = false);
		setData([...data]);
	}
	const cancel = () => {
		console.log('savedData', savedData)
		setData(savedData);
	}

	const edit = () =>{
		setShowEditMode(true);
	}

	const updateCheckBox = (event) => {
		const dataIndex = event.target.getAttribute('dataindex');
		data.forEach((item,index)=>{
			if(index === parseInt(dataIndex)){
				item.checked = !item.checked
			}
		});

		setData([...data]);
	}

	return (
		<div>
			<Display data={data} showEditSwitch={edit}/>
			{showEditMode && <EditorySection data={data} updateCheckBox={updateCheckBox} saveFn={save} clearFn={clear} cancelFn={cancel}/>}
		</div>
	)
}


ReactDOM.render(<MultiSelectApp/>, document.getElementById('root'));