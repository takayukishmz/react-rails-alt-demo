var Task = React.createClass({
  onClickDelete: function (e) {
    e.preventDefault();
    this.props.handleDelete(this.props);
  },
  onClick: function (e) {
    this.props.handleClick(this.props.id);
  },
  render: function() {
    return (
      <li className='tasklist__cell' key={this.props.id}>
        <table>
          <tbody>
            <tr>
              <td>□</td>
              <td className="tasklist__cell__content">

                <div className='tasklist__cell__title'  onClick={this.onClick}>{this.props.title}</div>
                <div className="tasklist__cell__delete"><span onClick={this.onClickDelete}> X </span></div>
                <div className="tasklist__cell__actual">{this.props.actual_time || '- '}h</div>
                <div className="tasklist__cell__estimated">{this.props.estimated_time}h</div>
              </td>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
      </li>
    );
  }
});
