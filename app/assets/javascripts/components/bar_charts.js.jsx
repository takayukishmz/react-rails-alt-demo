var BarCharts = React.createClass({
  render: function() {
    return (
      <div>
        <h3>working hours</h3>
        estimate: {this.props.estimated_working_hours} h / {this.props.working_hours} h
        <br/>
        Actual: {this.props.actual_working_hours} h / {this.props.working_hours} h
        <br/><br/>
      </div>
    );
  }
});
