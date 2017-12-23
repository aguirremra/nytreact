import React from 'react';

class Results extends React.Component {    

	render(){
		return(
      <div className="row">
          <div className="col-sm-12">
              <br/>
              <div className="panel panel-primary">
                  <div className="panel-heading">
                      <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
                  </div>
                  <div className="panel-body" id="well-section">
                  <h2>{this.props.title}</h2>
                  </div>
              </div>
          </div>
      </div>
		);
	}
}

export default Results;