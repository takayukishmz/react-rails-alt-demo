
var TimeSetting = React.createClass({
  render: function() {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    return (
      <div className="panel">
        <div className='panel-heading'>
        {year}/{month}/{day} Start:{this.props.setting.start_time} End:{this.props.setting.end_time} rest:{this.props.setting.rest} h work:{this.props.setting.end_time - this.props.setting.start_time - this.props.setting.rest} h
        </div>
      </div>
    );
  }
});
