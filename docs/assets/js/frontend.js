const PCM_DPC_URL = "https://raw.githubusercontent.com/ma7555/Egypt-Covid19/master/EG-COVID-19.json"
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
      chart.canvas.parentNode.style.width = '80vw';
    },
    title: {
      display: true,
      text: 'Covid-19 Italian data'
    },
    tooltips: {
      mode: 'index',
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
    }
  }
};
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function toggleDisplay() {
  var x = document.getElementsByClassName("lds-ring");
  var y = document.getElementsByClassName("chart-container")
  for (let index = 0; index < x.length; index++) {
      x[index].style.display = "none";
  }
  for (let index = 0; index < y.length; index++) {
      y[index].style.display = "block";
  }
}

// function show_section(sec_name){
//   //hide all sections
//   document.getElementById("cum-container").style.display = "none";
//   document.getElementById("daily-container").style.display = "none";
//   document.getElementById("stats-container").style.display = "none";
//   // show only passed one one
//   document.getElementById(sec_name).style.display = "block";
//   console.log("section : "+ sec_name + " show now be visible");
// }
// function show_all_sections(){
//   document.getElementById("cum-container").style.display = "block";
//   document.getElementById("daily-container").style.display = "block";
//   document.getElementById("stats-container").style.display = "block";
// }
var cached_data = null;

function plotter(covid_data){

  days = [];
  CumConfirmed_array = [];
  CumDeaths_array = [];
  CumRecovered_array = [];
  CumActive_array = [];

  NewConfirmed_array = [];
  NewDeaths_array = [];
  NewRecovered_array = [];

  DiffYesterday_array = [];
  MortalityRateInfection_array = [];
  MortalityRateClosed_array = [];

  for(var k in covid_data) {
    var myDate = new Date(covid_data[k].date);
    var parsed_date = myDate.getDate()+" "+(monthNames[myDate.getMonth()]);
    days.push(parsed_date);
    CumConfirmed_array.push(covid_data[k].CumConfirmed);
    CumDeaths_array.push(covid_data[k].CumDeaths);
    CumRecovered_array.push(covid_data[k].CumRecovered);
    NewConfirmed_array.push(covid_data[k].NewConfirmed);
    NewDeaths_array.push(covid_data[k].NewDeaths);
    NewRecovered_array.push(covid_data[k].NewRecovered);
    CumActive_array.push(covid_data[k].CumActive);
    DiffYesterday_array.push(covid_data[k].DiffYesterday);
    MortalityRateInfection_array.push(covid_data[k].MortalityRateInfection);
    MortalityRateClosed_array.push(covid_data[k].MortalityRateClosed);
}
  var CumConfirmed_ctx = document.getElementById('chart-cum-confirmed').getContext('2d');
  var CumActive_ctx  = document.getElementById('chart-cum-active').getContext('2d');
  var CumDeaths_ctx = document.getElementById('chart-cum-death').getContext('2d');
  var CumRecovered_ctx = document.getElementById('chart-cum-recovered').getContext('2d');
  
  var NewConfirmed_ctx = document.getElementById('chart-new-confirmed').getContext('2d');
  var NewDeaths_ctx = document.getElementById('chart-new-deaths').getContext('2d');    
  var NewRecovered_ctx = document.getElementById('chart-new-recoveries').getContext('2d');
  
  var DiffYesterday_ctx = document.getElementById('chart-DiffYesterday').getContext('2d');
  var MortalityRateInfection_ctx = document.getElementById('chart-MortalityRateInfection').getContext('2d');
  var MortalityRateClosed_ctx = document.getElementById('chart-MortalityRateClosed').getContext('2d');
  

  var CumConfirmed_cfg = $.extend( true, {}, display_config );
  var CumActive_cfg = $.extend( true, {}, display_config );
  var CumDeaths_cfg = $.extend( true, {}, display_config );
  var CumRecovered_cfg = $.extend( true, {}, display_config );
  
  var NewConfirmed_cfg = $.extend( true, {}, display_config );
  var NewDeaths_cfg = $.extend( true, {}, display_config );
  var NewRecovered_cfg = $.extend( true, {}, display_config );

  var DiffYesterday_cfg = $.extend( true, {}, display_config );
  var MortalityRateInfection_cfg = $.extend( true, {}, display_config );
  var MortalityRateClosed_cfg = $.extend( true, {}, display_config );

  DiffYesterday_cfg.data.labels = days;
  DiffYesterday_cfg.data.datasets[0].data=DiffYesterday_array;
  DiffYesterday_cfg.data.datasets[0].backgroundColor = "#00bfbf";
  DiffYesterday_cfg.data.datasets[0].borderColor = "#00bfbf";
  DiffYesterday_cfg.data.datasets[0].label="Diff Yesterday";
  DiffYesterday_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
  DiffYesterday_cfg.options.title.text = "Diff Yesterday";

  MortalityRateInfection_cfg.data.labels = days;
  MortalityRateInfection_cfg.data.datasets[0].data=MortalityRateInfection_array;
  MortalityRateInfection_cfg.data.datasets[0].backgroundColor = "#00bfbf";
  MortalityRateInfection_cfg.data.datasets[0].borderColor = "#00bfbf";
  MortalityRateInfection_cfg.data.datasets[0].label="Mortality Rate infection";
  MortalityRateInfection_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
  MortalityRateInfection_cfg.options.title.text = "Mortality Rate infection";

  MortalityRateClosed_cfg.data.labels = days;
  MortalityRateClosed_cfg.data.datasets[0].data=MortalityRateClosed_array;
  MortalityRateClosed_cfg.data.datasets[0].backgroundColor = "#00bfbf";
  MortalityRateClosed_cfg.data.datasets[0].borderColor = "#00bfbf";
  MortalityRateClosed_cfg.data.datasets[0].label="Mortality Rate Closed";
  MortalityRateClosed_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
  MortalityRateClosed_cfg.options.title.text = "Mortality Rate Closed";

  CumConfirmed_cfg.data.labels = days;
  CumConfirmed_cfg.data.datasets[0].data=CumConfirmed_array;
  CumConfirmed_cfg.data.datasets[0].backgroundColor = "#00bfbf";
  CumConfirmed_cfg.data.datasets[0].borderColor = "#00bfbf";
  CumConfirmed_cfg.data.datasets[0].label="Cumulative Confirmed Cases";
  CumConfirmed_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
  CumConfirmed_cfg.options.title.text = "Cumulative Confirmed Cases";

  CumActive_cfg.data.labels = days;
  CumActive_cfg.data.datasets[0].data=CumActive_array;
  CumActive_cfg.data.datasets[0].backgroundColor = "#0000ff";
  CumActive_cfg.data.datasets[0].borderColor = "#0000ff";
  CumActive_cfg.data.datasets[0].label="Cumulative Active Cases";
  CumActive_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
  CumActive_cfg.options.title.text = "Cumulative Active Cases";
  
  CumDeaths_cfg.data.labels = days;
  CumDeaths_cfg.data.datasets[0].data=CumDeaths_array;
  CumDeaths_cfg.data.datasets[0].backgroundColor = "#ff0000";
  CumDeaths_cfg.data.datasets[0].borderColor = "#ff0000";
  CumDeaths_cfg.data.datasets[0].label="Cumulative Death Cases";
  CumDeaths_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Deaths";
  CumDeaths_cfg.options.title.text = "Cumulative Death Cases";

  CumRecovered_cfg.data.labels = days;
  CumRecovered_cfg.data.datasets[0].data=CumRecovered_array;
  CumRecovered_cfg.data.datasets[0].backgroundColor = "#008000";
  CumRecovered_cfg.data.datasets[0].borderColor = "#008000";
  CumRecovered_cfg.data.datasets[0].label="Cumulative Recovered Cases";
  CumRecovered_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Recoveries";
  CumRecovered_cfg.options.title.text = "Cumulative Recovered Cases";

  NewConfirmed_cfg.data.labels = days;
  NewConfirmed_cfg.data.datasets[0].data=NewConfirmed_array;
  NewConfirmed_cfg.data.datasets[0].backgroundColor = "#008000";
  NewConfirmed_cfg.data.datasets[0].borderColor = "#008000";
  NewConfirmed_cfg.data.datasets[0].label="Daily Confirmed Cases";
  NewConfirmed_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Cases";
  NewConfirmed_cfg.options.title.text = "Daily Confirmed Cases";;

  NewDeaths_cfg.data.labels = days;
  NewDeaths_cfg.data.datasets[0].data=NewDeaths_array;
  NewDeaths_cfg.data.datasets[0].backgroundColor = "#008000";
  NewDeaths_cfg.data.datasets[0].borderColor = "#008000";
  NewDeaths_cfg.data.datasets[0].label="Daily Death Cases";
  NewDeaths_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Deaths";
  NewDeaths_cfg.options.title.text = "Daily Death Cases";

  NewRecovered_cfg.data.labels = days;
  NewRecovered_cfg.data.datasets[0].data=NewRecovered_array;
  NewRecovered_cfg.data.datasets[0].backgroundColor = "#008000";
  NewRecovered_cfg.data.datasets[0].borderColor = "#008000";
  NewRecovered_cfg.data.datasets[0].label="Daily Recovered Cases";
  NewRecovered_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Recoveries"
  NewRecovered_cfg.options.title.text = "Daily Recovered Cases";



  // lethality_cfg.data.labels = days;
  // lethality_cfg.data.datasets[0].data=leth;
  // lethality_cfg.data.datasets[0].backgroundColor = "#000000";
  // lethality_cfg.data.datasets[0].borderColor = "#000000";
  // lethality_cfg.data.datasets[0].label="Lethality on tested cases";
  // lethality_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Percentage"
  // lethality_cfg.options.scales.yAxes[0].ticks =  {
  //   callback: function(tick) {
  //     return tick.toString() + '%';
  //   }
  // }
  // var new_dataset = {
  //   data: leth_on_pos,
  //   backgroundColor: "#800000",
  //   borderColor : "#800000",
  //   fill : false,
  //   label : "Lethality on Positives only"
  // }
  // lethality_cfg.data.datasets.push(new_dataset);
  // lethality_cfg.options.title.text = "Lethality"

  // cases_percentage_cfg.data.labels = days;
  // cases_percentage_cfg.data.datasets[0].data=cases_percentage;
  // cases_percentage_cfg.data.datasets[0].backgroundColor = "#000080";
  // cases_percentage_cfg.data.datasets[0].borderColor = "#000080";
  // cases_percentage_cfg.data.datasets[0].label="Percentage";
  // cases_percentage_cfg.options.scales.yAxes[0].scaleLabel.labelString = "Variation percentage of positive cases "
  // cases_percentage_cfg.options.title.text = "Variation percentage"
  // cases_percentage_cfg.options.scales.yAxes[0].ticks =  {
  //   callback: function(tick) {
  //     return tick.toString() + '%';
  //   }
  // }

  var CumConfirmed_chart = new Chart(CumConfirmed_ctx, CumConfirmed_cfg);
  var CumActive_chart = new Chart(CumActive_ctx, CumActive_cfg);
  var CumDeaths_chart = new Chart(CumDeaths_ctx, CumDeaths_cfg);
  var CumRecovered_chart = new Chart(CumRecovered_ctx, CumRecovered_cfg);

  var NewConfirmed_chart = new Chart(NewConfirmed_ctx,NewConfirmed_cfg);
  var NewDeaths_chart = new Chart(NewDeaths_ctx,NewDeaths_cfg);
  var NewRecovered_chart = new Chart(NewRecovered_ctx,NewRecovered_cfg);

  var DiffYesterday_chart = new Chart(DiffYesterday_ctx,DiffYesterday_cfg);
  var MortalityRateInfection_chart = new Chart(MortalityRateInfection_ctx,MortalityRateInfection_cfg);
  var MortalityRateClosed_chart =new Chart(MortalityRateClosed_ctx,MortalityRateClosed_cfg)
}


var xhr = new XMLHttpRequest(); // a new request
xhr.open("GET",PCM_DPC_URL,true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      toggleDisplay();
      cached_data = JSON.parse(xhr.responseText);
      plotter(cached_data);
    } else {
      console.error(xhr.statusText);
      console.info("Github seems down, moving to cached data")
      toggleDisplay();
      plotter(latest_data);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);
console.info("waiting for request ...");
$(document).ready(function(){
  $("#cum-container").on("show.bs.collapse", function(){
    plotter(cached_data);
  });
  $("#daily-container").on("show.bs.collapse", function(){
    plotter(cached_data);
  });
  $("#stats-container").on("show.bs.collapse", function(){
    plotter(cached_data);
  });
  $(document).on('click','#cum-filter',function(e) {
    $("#home-container").collapse("hide");
    $("#daily-container").collapse("hide");
    $("#stats-container").collapse("hide");
    $("#cum-container").collapse("show");
    $("#daily-filter").removeClass("active");
    $("#stats-filter").removeClass("active");
    $("#home-filter").removeClass("active");
    e.addClass("active");

  });
  $(document).on('click','#daily-filter',function(e) {
    $("#home-container").collapse("hide");
    $("#stats-container").collapse("hide");
    $("#cum-container").collapse("hide");
    $("#daily-container").collapse("show");
    $("#cum-filter").removeClass("active");
    $("#stats-filter").removeClass("active");
    $("#home-filter").removeClass("active");
    e.addClass("active");
  });
  $(document).on('click','#stats-filter',function(e) {
    $("#home-container").collapse("hide");
    $("#daily-container").collapse("hide");
    $("#cum-container").collapse("hide");
    $("#stats-container").collapse("show");
    $("#daily-filter").removeClass("active");
    $("#cum-filter").removeClass("active");
    $("#home-filter").removeClass("active");
    e.addClass("active");
  });
  $(document).on('click','#home-filter',function(e) {
    $("#daily-container").collapse("hide");
    $("#stats-container").collapse("hide");
    $("#cum-container").collapse("hide");
    $("#home-container").collapse("show");
    $("#daily-filter").removeClass("active");
    $("#cum-filter").removeClass("active");
    $("#stats-filter").removeClass("active");
    e.addClass("active");
  });

});