
var TaskReportBox = React.createClass({
  render: function() {
    var taskNodes = this.props.tasks.map(function (task) {
      return (
        <TaskReport task={task} />
      );
    });
    return (
      <div className='col-sm-6'>
        <div className='panel'>
          <header className='panel-heading'>Report</header>
          <div className='panel-body'>
            {taskNodes}
          </div>
        </div>
      </div>
    );
  }
});
