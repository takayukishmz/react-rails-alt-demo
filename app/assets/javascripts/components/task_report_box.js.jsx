
var TaskReportBox = React.createClass({
  render: function() {
    var taskNodes = this.props.data.map(function (task) {
      return (
        <TaskReport task={task} />
      );
    });
    return (
      <div className='col-sm-6'>
        <div className='panel'>
          <header className='panel-heading'>レポート</header>
          <div className='panel-body'>
            <p>【今日やったこと】</p>
            <div>
              {taskNodes}
            </div><br/>
            <p>【意識項目】</p>
            <p>【明日やること】</p>
          </div>
        </div>
      </div>
    );
  }
});
