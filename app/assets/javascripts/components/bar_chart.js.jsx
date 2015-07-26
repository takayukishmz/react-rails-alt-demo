var BarChart = React.createClass({
  getInitialState: function() {
    return {
      chart: '',
      estimated: 0,
      actual: 0
    };
  },
  componentDidMount: function () {
    // var Chart = require('chart.js');
    console.log(this.state);
    var data = {
      labels: ["7/21", "7/22", "7/23", "7/24", "7/25", "7/26", "today"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [11, 9, 10.5, 11, 11, 10, 11]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: [9.5, 8, 12, 10.5, 10, 8.5, 5.5]
        }
      ]
    };
    var el = this.refs.chart.getDOMNode();
    var ctx = el.getContext("2d");
    console.log(el);
    var chart = new Chart(ctx).Bar(data, {});
    this.state.chart = chart;
  },

  render: function() {
    return (
      React.DOM.canvas({ref:'chart', style: {width: '100%'}})
    );
  }
});
