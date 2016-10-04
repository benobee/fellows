import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import { FellowsList } from './imports/components/index';
 
const css = require("./main.less");

//create module from app build init 
//which automatically renders to DOM 
class Module {
  constructor(Component) {
        this.Component = Component;
        this.element = Component.props.target;

        //React render to DOM method
        this.renderToDOM(Component);
  }
  renderToDOM(Component) {
    if (Component.props.target.length > 0) {
        render(
            Component, Component.props.target[0]
        );
    };
  }
}

//Compile the app build from imports or
//other various methods 
class App_Build {
    constructor() {
        const target = $("#fellows-render-target");
        const request = this.getPageData("https://dona-lubecki.squarespace.com/dalai-lama-fellows");

        $.when(request).done((data) => {
            const fellowsList = new Module(
                <FellowsList data={data} target={target}/>
            );
        });

        console.log(this);
    }
    getPageData(url){
        return $.ajax({
            url: url,
            data: {
                format: "json"
            },
            dataType: "jsonp",
            success: (result) => {
                return result;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
};

//wait for the window to load before constructing
$(window).on("load", () => {
    const App = new App_Build();
    window._App = App;  
});



