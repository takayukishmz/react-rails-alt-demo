(function() {
  class TaskStore {
    constructor() {
        this.tasks = [];
        this.edittingId = null;
        this.setting = {
          start_time: 10,
          end_time: 24,
          rest: 3
        };
        this.bindActions(TaskActions);
    }
    fetchAll(tasks) {
      this.setState({tasks: tasks});
    }
    addTask(task) {
      this.setState({tasks: this.tasks.concat([task])});
    }
    updateTask(tasks) {
      this.setState({tasks: tasks});
    }
    deleteTask(task) {
      this.setState({tasks: this.tasks.filter(function (tasks) {
        return tasks.id != task.id;
      })});
    }
    toggleCheckBox(tasks) {
      this.setState({tasks: tasks});
    }
    setEdittingId(taskId) {
      this.setState({edittingId: taskId});
    }
  }
  this.TaskStore = alt.createStore(TaskStore, 'TaskStore');
})();
