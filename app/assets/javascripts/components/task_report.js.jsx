var TaskReport = React.createClass({
  render: function() {
    return (
      <div>- [{this.props.task.completed ? "x" : " " }] {this.props.task.title}  [{this.props.task.estimated_time}h:{this.props.task.actual_time}h]</div>
    );
  }
});
