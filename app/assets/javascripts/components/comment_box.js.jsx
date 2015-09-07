var CommentBox = React.createClass({
  calcWorkingHours: function () {
    return (this.state.setting.end_time - this.state.setting.start_time - this.state.setting.rest);
  },
  calcEstimatedWorkingHours: function () {
    var estimated_working_hours = 0;
    for (var i = 0; i < this.state.data.length; i++) {
      estimated_working_hours += this.state.data[i].estimated_time;
    }
    return estimated_working_hours;
  },
  calcActualWorkingHours: function () {
    var actual_working_hours = 0;
    for (var i = 0; i < this.state.data.length; i++) {
      actual_working_hours += this.state.data[i].actual_time;
    }
    return actual_working_hours;
  },
  getInitialState: function () {
    return TodoStore.getState();
  },
  componentDidMount: function() {
    TodoStore.listen(this.onchange.bind(this));
    TodoActions.fetchAll();
  },
  componentWillUnmount: function() {
    TodoStore.unlisten(this.onchange.bind(this));
  },
  onchange: function(state) {
    this.setState(state);
  },
  render: function() {
    return (
      <div className="col-md-12">
        <h1>WorkLess</h1>
        <TimeSetting setting={this.state.setting} />
        <TaskList
          data={this.state.data}
          edittingId={this.state.edittingId} />
        <div className='row'>
          <BarCharts
            working_hours={this.calcWorkingHours()}
            estimated_working_hours={this.calcEstimatedWorkingHours()}
            actual_working_hours={this.calcActualWorkingHours()}/>
          <TaskReportBox data={this.state.data} />
        </div>
      </div>
    );
  }
});
