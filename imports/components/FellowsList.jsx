import React from 'react';
import $ from 'jquery';
import Fellow from './Fellow.jsx';
import _ from 'underscore';
import { render } from 'react-dom';

class FellowsList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'FellowsList';
        this.filter = {};
        this.state = {
        	array: this.processArray(this.props.data.items),
        	filter: ''
        }
        this.fullArray = this.processArray(this.props.data.items);
    }
    processArray(array){
		return _.map(array, (i) => {
			
				const category = _.first(i.categories);

				const tag = _.first(i.tags);

        		const obj = {
        			name: i.title,
        			image: i.assetUrl,
        			location: i.location.addressCountry,
        			category: category,
        			tag: tag,
        			fullUrl: i.fullUrl,
        			body: i.body,
                    issueArea: i.excerpt
        		}

        		return obj;
       	});
    }
    setFilters() {
        $(".filter select").on("change", (e) => {

        	$('.fellow-list').removeClass("is-rendered");

        	const filter = e.currentTarget.value;
        	const type = $(e.currentTarget).data("type");		

			if (filter == "All"){	
				delete this.filter[type];
			} else {
				this.filter[type] = filter;
			}

        	this.runFilters();
            
        });
    }
    runFilters() {
    	const search = this.filter;
    	const results = _.where(this.fullArray, search);
    	
    	this.setState({array: results});
    }
    componentDidUpdate() {
		setTimeout(() => {
        	$('.fellow-list').addClass("is-rendered");
        }, 400);
    }
    componentDidMount() {
    	setTimeout(() => {
			$('.fellow-list').addClass("is-rendered");

			this.setFilters();

    	}, 400);	
    }
    renderResults(){
    	if(this.state.array.length == 0){
    		return <div><h2>No Results</h2></div>; 
    	}
		return this.state.array.map(( item, index ) => {
			return( 
				<Fellow item={item} key={index} />
			);
		});    	
    }
    renderCategories(){
		return this.props.data.collection.categories.map( (item, index) => {
			return(
				<option key={index} className="category item">{item}</option>
			)
		});    	
    }
    renderTags(){
    	return this.props.data.collection.tags.map( (item, index) => {
			return(
				<option key={index} className="tag item">{item}</option>
			)
		});
    }
    render() {
        return(
        	<div>
				<div className="filters">
				    <div className="categories filter">
				      <div className="header">Class</div>
				      <select className="items" data-type="category">
				      		<option className="category item">All</option>
				        	{this.renderCategories()}
				      </select>
				    </div>
				    
				    <div className="tags filter">
				      <div className="header">Region</div>
				      <select className="items" data-type="tag">
				      		<option className="tag item">All</option>
				        	{this.renderTags()}
				      </select>
				    </div>
				</div>
	        	<section className="fellow-list">
					{this.renderResults()}
				</section>
			</div>
        )
    }
}

export default FellowsList;


