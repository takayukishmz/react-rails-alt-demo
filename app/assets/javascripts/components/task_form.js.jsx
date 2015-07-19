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
        <form action="#" className="task-form" onSubmit={this.handleSubmit}>
          <div className='task-form-group'>
            <div className="form-group task-form-title">
              <input
                type="text"
                className='form-control task-form-group__input'
                placeholder='new todo'
                ref='title'/>
            </div>

            <div className="form-group">
              <input
                type="text"
                className='form-control task-form-group__input'
                placeholder='estimate time'
                ref='estimated_time' />
            </div>
            <div className="form-group">
              <input
                type="text"
                className='form-control task-form-group__input'
                placeholder='actual time'
                ref='actual_time' />
            </div>
          </div>
          <div>
            <input type="submit" value="Post" className="btn btn-info" />
          </div>
        </form>
      </li>
    );
  }
});
