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
          <div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                type="text"
                className='mdl-textfield__input'
                ref='title'
                id='task-title' />
              <label className="mdl-textfield__label" for="task-title">New Todo</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield">
              <input
                type="text"
                className='mdl-textfield__input'
                ref='estimated_time'
                id="task-estimated-time" />
              <label className="mdl-textfield__label" for="task-estimated-time">estimated time</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                type="text"
                className='mdl-textfield__input'
                ref='actual_time'
                id="task-actual-time" />
              <label className="mdl-textfield__label" for="task-actual-time">actual time</label>
            </div>
          </div>
          <div>
            <input type="submit" value="Post" className="mdl-button mdl-js-button mdl-button--raised" />
          </div>
        </form>
      </li>
    );
  }
});
