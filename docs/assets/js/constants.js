 const PCM_DPC_URL = "https://raw.githubusercontent.com/ma7555/Egypt-Covid19/master/EG-COVID-19.json"
 const counter_defaults_cfg = {
  duration: 500,				// duration in seconds
  prepend: '',				// string to prepend to the value
  append: '', 				// string to apend to the value
  selector: '#daily-cases-counter',		// selector used to find elements on wich applycountUp
  start: 0,					// default start
  end: 100,					//default end
  intvalues: true,			//should we display integer values only
  interval: 100				//default counting interval
}
 const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

 const display_config = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '',
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [],
      fill: false,
    },]
  },
  options: {
    responsive: true,
    maintainAspectRatio : false,
    onResize : function(chart,new_size){
      chart.canvas.parentNode.style.height = '40vh';
      chart.canvas.parentNode.style.width = '90vw';
    },
    title: {
      display: true,
      text: 'Covid-19 Italian data'
    },
    tooltips: {
      mode: 'nearest',
      position: 'nearest',
      intersect: true,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Day'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: ''
        }
      }]
    },
}
};


var chartsCfg = {
  "CumConfirmed": $.extend( true, {}, display_config ),
  "CumActive" : $.extend( true, {}, display_config ), 
  "CumDeaths" : $.extend( true, {}, display_config ), 
  "CumRecovered" : $.extend( true, {}, display_config ), 
  "NewConfirmed" : $.extend( true, {}, display_config ), 
  "NewDeaths" : $.extend( true, {}, display_config ), 
  "NewRecovered" : $.extend( true, {}, display_config ), 
  "DiffYesterday" : $.extend( true, {}, display_config ), 
  "MortalityRateInfection" : $.extend( true, {}, display_config ), 
  "MortalityRateClosed" : $.extend( true, {}, display_config ),
};

chartsCfg.DiffYesterday.data.datasets[0].backgroundColor = "#666CA5";
chartsCfg.DiffYesterday.data.datasets[0].borderColor = "#666CA5";
chartsCfg.DiffYesterday.data.datasets[0].label="Diff Yesterday";
chartsCfg.DiffYesterday.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
chartsCfg.DiffYesterday.options.title.text = "Diff Yesterday";
chartsCfg.DiffYesterday.options.scales.yAxes[0].ticks =  {
  callback: function(tick) {
    return tick.toString() + '%';
  }
}

chartsCfg.MortalityRateInfection.data.datasets[0].backgroundColor = "#C70039";
chartsCfg.MortalityRateInfection.data.datasets[0].borderColor = "#C70039";
chartsCfg.MortalityRateInfection.data.datasets[0].label="Mortality Rate infection";
chartsCfg.MortalityRateInfection.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
chartsCfg.MortalityRateInfection.options.title.text = "Mortality Rate infection";
chartsCfg.MortalityRateInfection.options.scales.yAxes[0].ticks =  {
  callback: function(tick) {
    return tick.toString() + '%';
  }
}

chartsCfg.MortalityRateClosed.data.datasets[0].backgroundColor = "#FF5733";
chartsCfg.MortalityRateClosed.data.datasets[0].borderColor = "#FF5733";
chartsCfg.MortalityRateClosed.data.datasets[0].label="Mortality Rate Closed";
chartsCfg.MortalityRateClosed.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
chartsCfg.MortalityRateClosed.options.title.text = "Mortality Rate Closed";
chartsCfg.MortalityRateClosed.options.scales.yAxes[0].ticks =  {
  callback: function(tick) {
    return tick.toString() + '%';
  }
}

chartsCfg.CumConfirmed.data.datasets[0].backgroundColor = "#0000ff";
chartsCfg.CumConfirmed.data.datasets[0].borderColor = "#0000ff";
chartsCfg.CumConfirmed.data.datasets[0].label="Cumulative Confirmed Cases";
chartsCfg.CumConfirmed.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
chartsCfg.CumConfirmed.options.title.text = "Cumulative Confirmed Cases";

chartsCfg.CumActive.data.datasets[0].backgroundColor = "#00bfbf";
chartsCfg.CumActive.data.datasets[0].borderColor = "#00bfbf";
chartsCfg.CumActive.data.datasets[0].label="Cumulative Active Cases";
chartsCfg.CumActive.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
chartsCfg.CumActive.options.title.text = "Cumulative Active Cases";

chartsCfg.CumDeaths.data.datasets[0].backgroundColor = "#ff0000";
chartsCfg.CumDeaths.data.datasets[0].borderColor = "#ff0000";
chartsCfg.CumDeaths.data.datasets[0].label="Cumulative Death Cases";
chartsCfg.CumDeaths.options.scales.yAxes[0].scaleLabel.labelString = "Deaths";
chartsCfg.CumDeaths.options.title.text = "Cumulative Death Cases";

chartsCfg.CumRecovered.data.datasets[0].backgroundColor = "#008000";
chartsCfg.CumRecovered.data.datasets[0].borderColor = "#008000";
chartsCfg.CumRecovered.data.datasets[0].label="Cumulative Recovered Cases";
chartsCfg.CumRecovered.options.scales.yAxes[0].scaleLabel.labelString = "Recoveries";
chartsCfg.CumRecovered.options.title.text = "Cumulative Recovered Cases";

chartsCfg.NewConfirmed.data.datasets[0].backgroundColor = "#E200FD";
chartsCfg.NewConfirmed.data.datasets[0].borderColor = "#E200FD";
chartsCfg.NewConfirmed.data.datasets[0].label="Daily Confirmed Cases";
chartsCfg.NewConfirmed.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
chartsCfg.NewConfirmed.options.title.text = "Daily Confirmed Cases";;

chartsCfg.NewDeaths.data.datasets[0].backgroundColor = "#C70039";
chartsCfg.NewDeaths.data.datasets[0].borderColor = "#C70039";
chartsCfg.NewDeaths.data.datasets[0].label="Daily Death Cases";
chartsCfg.NewDeaths.options.scales.yAxes[0].scaleLabel.labelString = "Deaths";
chartsCfg.NewDeaths.options.title.text = "Daily Death Cases";

chartsCfg.NewRecovered.data.datasets[0].backgroundColor = "#619753";
chartsCfg.NewRecovered.data.datasets[0].borderColor = "#619753";
chartsCfg.NewRecovered.data.datasets[0].label="Daily Recovered Cases";
chartsCfg.NewRecovered.options.scales.yAxes[0].scaleLabel.labelString = "Recoveries"
chartsCfg.NewRecovered.options.title.text = "Daily Recovered Cases";
