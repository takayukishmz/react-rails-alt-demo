var DoughnutChart = React.createClass({
  componentDidMount: function () {
    var data = [
      {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      }
    ];
    var el = this.refs.doughnutchart.getDOMNode();
    var ctx = el.getContext("2d");
    var DoughnutChart = new Chart(ctx).Doughnut(data, {});
  },
  render: function () {
    return (
      React.DOM.canvas({className: 'media-object', ref:'doughnutchart', style: {width: '50%'}})
    );
  }
});
