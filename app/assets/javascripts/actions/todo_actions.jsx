(function () {
  var url = '/api/v1/tasks';
  class TodoActions {
    fetchAll() {
      $.ajax({
        url: url,
        datetype: 'json',
        success: function(res) {
          this.dispatch(res.data);
        }.bind(this),
        error: function (xhr, status, error) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

    addTask(task) {
      $.ajax({
        url: url,
        dataType: 'json',
        type: "POST",
        data: task,
        success: function(task) {
          this.dispatch(task);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

    updateTask(task) {
      $.ajax({
        url: url+"/"+task.id,
        dataType: 'json',
        type: 'PATCH',
        data: task,
        success: function(res) {
          this.dispatch(res.data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

    deleteTask (task) {
      $.ajax({
        url: url+"/"+task.id,
        dataType: 'json',
        type: 'DELETE',
        success: function(task) {
          this.dispatch(task);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

    toggleCheckBox (task) {
      $.ajax({
        url: url+"/"+task.id+"/toggle_completed",
        dataType: 'json',
        type: 'PUT',
        success: function(res) {
          this.dispatch(res.data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

    setEdittingId (taskId) {
      this.dispatch(taskId);
    }
  }
  this.TodoActions = alt.createActions(TodoActions);
})();
