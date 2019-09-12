import React from 'react';

class MegaNav extends React.Component {
        // constructor(props) {
        //     super(props);
        // }
        generateListItem = (arr) => {
            return arr.map((item) => <li key={item.replace(/''/g, '-').toLowerCase()}> {item} </li>)
            }

        render() {
            return(
                    <div className = "meganav">
                        <ul> {this.generateListItem(this.props.list)} </ul> 
                    </div>
                )
            }
        }

export default MegaNav;