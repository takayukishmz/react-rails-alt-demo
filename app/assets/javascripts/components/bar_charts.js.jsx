var BarCharts = React.createClass({
  render: function() {
    return (
      <div className='col-sm-6'>
        <div className='panel'>
          <header className='panel-heading'>working hours</header>
          <div className='panel-body'>
            <h5>Daily</h5>
            <div className=''>
              <div className='pull-left'>
                <DoughnutChart/>
              </div>
              <div className=''>
                estimate: {this.props.estimated_working_hours} h / {this.props.working_hours} h
                <br/>
                Actual: {this.props.actual_working_hours} h / {this.props.working_hours} h
                <br/><br/>
              </div>
            </div>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              <h5>Weekly</h5>
              <BarChart
                estimated={this.props.estimated_working_hours}  actual={this.props.actual_working_hours}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
