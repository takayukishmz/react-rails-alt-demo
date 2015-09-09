var CommentBox = React.createClass({
  calcWorkingHours: function () {
    return (this.state.setting.end_time - this.state.setting.start_time - this.state.setting.rest);
  },
  calcEstimatedWorkingHours: function () {
    var estimated_working_hours = 0;
    for (var i = 0; i < this.state.tasks.length; i++) {
      estimated_working_hours += this.state.tasks[i].estimated_time;
    }
    return estimated_working_hours;
  },
  calcActualWorkingHours: function () {
    var actual_working_hours = 0;
    for (var i = 0; i < this.state.tasks.length; i++) {
      actual_working_hours += this.state.tasks[i].actual_time;
    }
    return actual_working_hours;
  },
  getInitialState: function () {
    return TaskStore.getState();
  },
  componentDidMount: function() {
    TaskStore.listen(this.onchange.bind(this));
    TaskActions.fetchAll();
  },
  componentWillUnmount: function() {
    TaskStore.unlisten(this.onchange.bind(this));
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
          tasks={this.state.tasks}
          edittingId={this.state.edittingId} />
        <div className='row'>
          <BarCharts
            working_hours={this.calcWorkingHours()}
            estimated_working_hours={this.calcEstimatedWorkingHours()}
            actual_working_hours={this.calcActualWorkingHours()}/>
          <TaskReportBox tasks={this.state.tasks} />
        </div>
      </div>
    );
  }
});
