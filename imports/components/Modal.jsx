import React from 'react';
import $ from "jquery";

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Modal';
        this.html = {__html: this.props.item.body};
        this.state = {
            open: false
        }
    }
    componentDidUpdate(prevProps, prevState) {
        setTimeout(() => {
            $(".app-module.modal > .container").addClass("is-rendered");
        },0);
        this.closeModalListener();
    }
    componentDidMount() {
        setTimeout(() => {
            $(".app-module.modal > .container").addClass("is-rendered");
        },0);
        this.closeModalListener();
    }
    closeModalListener(){
        $(".app-module.modal .close, .app-module.modal .container").on("click", (e) => {
            $(".app-module.modal > .container").removeClass("is-rendered");
        });

        $(".app-module.modal .content").on("click", (e) => {
            e.stopPropagation();
        });
    }
    render() {
        const html = {__html: this.props.item.body};

        const divStyle = {
            backgroundImage: 'url(' + this.props.item.image + ')'
        }

        const issueArea = {__html: this.props.item.issueArea}

        return (
            <div className="wrapper">
                <div className="header">
                    <div className="item-thumbnail-wrapper">
                        <div className="image" style={divStyle}></div>
                    </div>
                    <div className="info">
                        <div className="name">{this.props.item.name}</div>
                        <div className="class">{this.props.item.category} Fellow</div>
                        <div className="location">{this.props.item.location}</div>
                        <div className="area" dangerouslySetInnerHTML={ issueArea } />
                    </div>
                </div>
                <div className="body">
                    <div dangerouslySetInnerHTML={ html } />
                </div>
            </div>
        );
    }
}

export default Modal;
