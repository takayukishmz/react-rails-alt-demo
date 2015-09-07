var TaskList = React.createClass({
  setEdittingId: function (id) {
    TodoStore.setEdittingId(id);
  },
  render: function() {
    var taskNodes = this.props.data.map(function (task) {
      if (task.id == this.props.edittingId) {
        return ( <TaskFrom
          id={task.id}
          title={task.title}
          estimated_time={task.estimated_time}
          actual_time={task.actual_time}
          /> );
      } else {
        return ( <Task
          id={task.id}
          title={task.title}
          estimated_time={task.estimated_time}
          actual_time={task.actual_time}
          completed={task.completed} />
        );
      }
    }.bind(this));
    return (
      <div className='panel tasklist'>
        <header className='panel-heading'>Todo List</header>
        <ul className="tasklist panel-body">
          {taskNodes}
          <TaskFrom />
        </ul>
      </div>
    );
  }
});
