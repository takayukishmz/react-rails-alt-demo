var Task = React.createClass({
  onClickDelete: function (e) {
    e.preventDefault();
    this.props.handleDelete(this.props);
  },
  onClick: function (e) {
    console.log(e);
    this.props.handleClick(this.props.id);
  },

  render: function() {
    return (
      <li className='tasklist__cell' key={this.props.id}>
        <div className='task__checkbox'>
          <input className='' type='checkbox'/>
        </div>
        <div className='task__content' onClick={this.onClick}>
          <span className='task__title'>{this.props.title}</span>

          <div className='pull-right task__subinfo'>
            <div className="tasklist__cell__estimated">{this.props.estimated_time}h</div>
            <div className="tasklist__cell__actual">{this.props.actual_time || '- '}h</div>
          </div>
        </div>
        <div className="tasklist__cell__delete"><span className='glyphicon glyphicon-remove' onClick={this.onClickDelete}></span></div>
      </li>
    );
  }
});
