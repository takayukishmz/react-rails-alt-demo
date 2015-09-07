(function() {
  class TodoStore {
    constructor() {
        this.data = [];
        this.edittingId = null;
        this.setting = {
          start_time: 10,
          end_time: 24,
          rest: 3
        };
        this.bindActions(TodoActions);
    }
    fetchAll(tasks) {
      this.setState({data: tasks});
    }
    addTask(task) {
      this.setState({data: this.data.concat([task])});
    }
    updateTask(tasks) {
      this.setState({data: tasks});
    }
    deleteTask(task) {
      this.setState({data: this.data.filter(function (data) {
        return data.id != task.id;
      })});
    }
    toggleCheckBox(tasks) {
      this.setState({data: tasks});
    }
    setEdittingId(taskId) {
      this.setState({edittingId: taskId});
    }
  }
  this.TodoStore = alt.createStore(TodoStore, 'TodoStore');
})();
