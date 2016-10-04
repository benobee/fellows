import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';

class Fellow extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Fellow';
    }
    showModal(){
        const target = document.querySelectorAll(".app-module.modal .js-target");
        
        ReactDOM.render(<Modal item={this.props.item} />, target[0]);
    }
    render() {
        const divStyle = {
            backgroundImage: 'url(' + this.props.item.image + ')'
        }

        return (
            <div className="item fellow" 
            
                onClick={this.showModal.bind(this)} 
                data-url={this.props.item.fullUrl} 
                data-class={this.props.item.tag} 
                data-region={this.props.item.category}>

                <div className="item-content">  
                    <div className="item-thumbnail-wrapper">
                        <div className="image" style={divStyle}></div>
                    </div>
                    <div className="location">{this.props.item.location}</div>
                </div>
                <div className="header">
                    <div className="name">{this.props.item.name}</div>
                    <div className="class">{this.props.item.category}</div>
                </div>
            </div> 
        )
    }
}

export default Fellow;