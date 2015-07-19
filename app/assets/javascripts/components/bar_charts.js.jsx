var BarCharts = React.createClass({
  render: function() {
    return (
      <div className='col-sm-6'>
        <div className='panel'>
          <header className='panel-heading'>working hours</header>
          <div className='panel-body'>
            estimate: {this.props.estimated_working_hours} h / {this.props.working_hours} h
            <br/>
            Actual: {this.props.actual_working_hours} h / {this.props.working_hours} h
            <br/><br/>
          </div>
        </div>
      </div>
    );
  }
});
