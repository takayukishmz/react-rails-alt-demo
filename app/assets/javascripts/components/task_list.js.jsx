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
