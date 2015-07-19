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
        console.log(res);
        this.setState({data:res.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTaskDelete: function (task) {
    console.log(task);
    $.ajax({
      url: this.props.url+"/"+task.id,
      dataType: 'json',
      type: 'DELETE',
      data: {id: task.id},
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
      <div className="">
        <TimeSetting setting={this.state.setting} />
        <h3>Todo</h3>
        <TaskList
          data={this.state.data}
          handleTaskDelete={this.handleTaskDelete}
          handleTaskSubmit={this.handleTaskSubmit} />
        <TaskFrom onTaskSubmit={this.handleTaskSubmit} />
        <BarCharts
          working_hours={this.calcWorkingHours()}
          estimated_working_hours={this.calcEstimatedWorkingHours()}
          actual_working_hours={this.calcActualWorkingHours()}/>
        <TaskReportBox data={this.state.data} />
      </div>
    );
  }
});

var TaskList = React.createClass({
  getInitialState: function() {
    return {
      editting_id: null,
    };
  },
  setEdittingId: function (id) {
    this.setState({editting_id: id});
  },
  render: function() {
    var taskNodes = this.props.data.map(function (task) {
      if (task.id == this.state.editting_id) {
        return ( <TaskFrom onTaskSubmit={this.props.handleTaskSubmit}
          id={task.id}
          title={task.title}
          estimated_time={task.estimated_time}
          actual_time={task.actual_time}
          handleEdittingId={this.setEdittingId}
          /> );
      } else {
        return ( <Task
          id={task.id}
          title={task.title}
          estimated_time={task.estimated_time}
          actual_time={task.actual_time}
          handleDelete={this.props.handleTaskDelete}
          handleClick={this.setEdittingId} />
        );
      }
    }.bind(this));
    return (
      <ul className="tasklist">
        {taskNodes}
      </ul>
    );
  }
});

var TaskFrom = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var estimated_time = React.findDOMNode(this.refs.estimated_time).value.trim();
    var actual_time = React.findDOMNode(this.refs.actual_time).value.trim();
    if (!title || !estimated_time) {
      return;
    }
    if (this.props.handleEdittingId) {
      this.props.handleEdittingId("");
    }
    this.props.onTaskSubmit({id: this.props.id, title: title, estimated_time: estimated_time, actual_time: actual_time});
    React.findDOMNode(this.refs.title).value = "";
    React.findDOMNode(this.refs.estimated_time).value = "";
    React.findDOMNode(this.refs.actual_time).value = "";
    return;
  },
  componentDidMount: function() {
    if (this.props.title) {
      React.findDOMNode(this.refs.title).value = this.props.title;
    }
    if (this.props.estimated_time) {
      React.findDOMNode(this.refs.estimated_time).value = this.props.estimated_time;
    }
    if (this.props.actual_time) {
      React.findDOMNode(this.refs.actual_time).value = this.props.actual_time;
    }

  },
  render: function() {
    return (
      <li className='tasklist__cell'>
        <form action="#" className="commentForm" onSubmit={this.handleSubmit}>
          <div className="mdl-textfield mdl-js-textfield">
            <input type="text" className='mdl-textfield__input' ref='title' id='task-title' />
            <label className="mdl-textfield__label" for="task-title">New Todo</label>
          </div>

          <div className="mdl-textfield mdl-js-textfield">
            <input type="text" className='mdl-textfield__input' ref='estimated_time' if="task-estimated-time" />
            <label className="mdl-textfield__label" for="task-estimated-time">estimated time</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input type="text" className='mdl-textfield__input' ref='actual_time' id="task-actual-time" />
            <label className="mdl-textfield__label" for="task-actual-time">actual time</label>
          </div>
          <input type="submit" value="Post" className="mdl-button mdl-js-button mdl-button--raised" />
        </form>
      </li>
    );
  }
});

var TimeSetting = React.createClass({
  render: function() {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    return (
      <div>
        {year}/{month}/{day} Start:{this.props.setting.start_time} End:{this.props.setting.end_time} rest:{this.props.setting.rest} h work:{this.props.setting.end_time - this.props.setting.start_time - this.props.setting.rest} h
      </div>
    );
  }
});

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

var TaskReportBox = React.createClass({
  render: function() {
    var taskNodes = this.props.data.map(function (task) {
      return (
        <TaskReport task={task} />
      );
    });
    return (
      <div>
        <p>【今日やったこと】</p>
        <div>
          {taskNodes}
        </div><br/>
        <p>【意識項目】</p>
        <p>【明日やること】</p>
      </div>
    );
  }
});

var TaskReport = React.createClass({
  render: function() {
    return (
      <div>- [ ] {this.props.task.title} [{this.props.task.estimated_time}:{this.props.task.actual_time}]</div>
    );
  }
});
