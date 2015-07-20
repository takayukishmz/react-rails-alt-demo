var CommentBox = React.createClass({
  handleTaskSubmit: function(task) {
    console.log(task);
    if (task.id) {
      this.updateTask(task);
    } else {
      this.addTask(task);
    }
  },
  addTask: function (task) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: "POST",
      data: task,
      success: function(data) {
        this.setState({data: this.state.data.concat([data])});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  updateTask: function (task) {
    $.ajax({
      url: this.props.url+"/"+task.id,
      dataType: 'json',
      type: 'PATCH',
      data: task,
      success: function(res) {
        this.setState({data:res.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTaskDelete: function (task) {
    $.ajax({
      url: this.props.url+"/"+task.id,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
        this.setState({data: this.state.data.filter(function (data) {
          return data.id != task.id;
        })});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCheckBox: function (task) {
    $.ajax({
      url: this.props.url+"/"+task.id+"/toggle_completed",
      dataType: 'json',
      type: 'PUT',
      success: function(res) {
        this.setState({data:res.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
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
    return {
      data: [],
      setting: {
        start_time: 10,
        end_time: 24,
        rest: 3
      }
    };
  },
  loadCommentFromServer: function () {
    $.ajax({
      url: this.props.url,
      datetype: 'json',
      success: function(result) {
        this.setState({data: result.data});
      }.bind(this),
      error: function (xhr, status, error) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function () {
    this.loadCommentFromServer();
    // setInterval(this.loadCommentFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="col-md-12">
        <h1>WorkLess</h1>
        <TimeSetting setting={this.state.setting} />
        <TaskList
          data={this.state.data}
          handleTaskDelete={this.handleTaskDelete}
          handleTaskSubmit={this.handleTaskSubmit}
          handleCheckBox={this.handleCheckBox} />
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
