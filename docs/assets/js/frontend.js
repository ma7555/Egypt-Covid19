function parse_data(raw_data){
  var parsed_data = {
    "days": [],
    "CumConfirmed": [],
    "CumDeaths": [],
    "CumRecovered": [],
    "CumActive": [],
    "NewConfirmed": [],
    "NewDeaths": [],
    "NewRecovered": [],
    "DiffYesterday": [],
    "MortalityRateInfection": [],
    "MortalityRateClosed": [],
  }

  for(var k in raw_data) {
    parsed_data.days.push(new Date(raw_data[k].date));
    parsed_data.CumConfirmed.push(raw_data[k].CumConfirmed);
    parsed_data.CumDeaths.push(raw_data[k].CumDeaths);
    parsed_data.CumRecovered.push(raw_data[k].CumRecovered);
    parsed_data.NewConfirmed.push(raw_data[k].NewConfirmed);
    parsed_data.NewDeaths.push(raw_data[k].NewDeaths);
    parsed_data.NewRecovered.push(raw_data[k].NewRecovered);
    parsed_data.CumActive.push(raw_data[k].CumActive);
    parsed_data.DiffYesterday.push(raw_data[k].DiffYesterday);
    parsed_data.MortalityRateInfection.push(raw_data[k].MortalityRateInfection);
    parsed_data.MortalityRateClosed.push(raw_data[k].MortalityRateClosed);
  }
  return parsed_data;
}
function displayCharts() {
  var loading_rings = document.getElementsByClassName("lds-ring");
  var charts = document.getElementsByClassName("chart-container")
  for (let index = 0; index < loading_rings.length; index++) {
      loading_rings[index].style.display = "none";
  }
  for (let index = 0; index < charts.length; index++) {
      charts[index].style.display = "block";
  }
}

function counter_run(covid_data){
  var today_date = covid_data.days.slice(-1)[0].getDate()+" "+ (monthNames[covid_data.days.slice(-1)[0].getMonth()])+" "+ covid_data.days.slice(-1)[0].getFullYear();
  document.getElementById("today-date").innerHTML = today_date;
  var cases_counter_cfg = $.extend( true, {}, counter_defaults_cfg );
  var deaths_counter_cfg = $.extend( true, {}, counter_defaults_cfg );
  var recovered_counter_cfg = $.extend( true, {}, counter_defaults_cfg );
  
  cases_counter_cfg.selector = "#daily-cases-counter";
  cases_counter_cfg.end = covid_data.NewConfirmed.slice(-1)[0];
  
  deaths_counter_cfg.selector = "#daily-deaths-counter";
  deaths_counter_cfg.end = covid_data.NewDeaths.slice(-1)[0];
  
  recovered_counter_cfg.selector = "#daily-recoveries-counter";
  recovered_counter_cfg.end = covid_data.NewRecovered.slice(-1)[0];

  var cases_counter = new counterUp(cases_counter_cfg);
  var deaths_counter = new counterUp(deaths_counter_cfg);
  var recovered_counter = new counterUp(recovered_counter_cfg);
  cases_counter.start();
  deaths_counter.start();
  recovered_counter.start();
}

function destroy_charts(drownCharts){
  Object.keys(drownCharts).forEach(function (item) {
    if (drownCharts[item] != null){
      drownCharts[item].destroy();
    }
  });
}

function plot_charts(drownCharts,chartsCfg,chartsCtx,covid_data){
  // extract date
  var noYearDate = []
  for (let index = 0; index < covid_data.days.length; index++) {
    noYearDate.push(covid_data.days[index].getDate()+" "+ (monthNames[covid_data.days[index].getMonth()])) 
  }
  // append date to all arrays 
  Object.keys(chartsCfg).forEach(function (key) {
    chartsCfg[key].data.labels = noYearDate;
  });
  
  Object.keys(covid_data).forEach(function (key) {
    if( key != "days"){
      chartsCfg[key].data.datasets[0].data = covid_data[key];
    }
  });

  Object.keys(drownCharts).forEach(function (item) {
    drownCharts[item] = new Chart(chartsCtx[item], chartsCfg[item])
  });
  $("#zoom-container").collapse("show");
}

var cached_data = null; //parsed json data goes here
var drownCharts = {
  "CumConfirmed": null,
  "CumActive" : null, 
  "CumDeaths" : null, 
  "CumRecovered" : null, 
  "NewConfirmed" : null, 
  "NewDeaths" : null, 
  "NewRecovered" : null, 
  "DiffYesterday" : null, 
  "MortalityRateInfection" : null, 
  "MortalityRateClosed" : null,
};

var chartsCtx = {
  "CumConfirmed":  document.getElementById('chart-cum-confirmed').getContext('2d'),
  "CumActive" :   document.getElementById('chart-cum-active').getContext('2d'), 
  "CumDeaths" :   document.getElementById('chart-cum-death').getContext('2d'), 
  "CumRecovered" :   document.getElementById('chart-cum-recovered').getContext('2d'), 
  "NewConfirmed" :   document.getElementById('chart-new-confirmed').getContext('2d'), 
  "NewDeaths" :   document.getElementById('chart-new-deaths').getContext('2d'), 
  "NewRecovered" :   document.getElementById('chart-new-recoveries').getContext('2d'), 
  "DiffYesterday" :   document.getElementById('chart-DiffYesterday').getContext('2d'), 
  "MortalityRateInfection" :   document.getElementById('chart-MortalityRateInfection').getContext('2d'), 
  "MortalityRateClosed" :   document.getElementById('chart-MortalityRateClosed').getContext('2d'),
};
var xhr = new XMLHttpRequest(); // a new request
xhr.open("GET",PCM_DPC_URL,true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      displayCharts();
      cached_data = parse_data(JSON.parse(xhr.responseText));
      counter_run(cached_data);
    } else {
      console.error(xhr.statusText);
      console.info("Github seems down, moving to cached data")
      displayCharts();
      cached_data = parse_data(latest_data)
      counter_run(cached_data);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);

console.info("waiting for request ...");
$(document).ready(function(){
  $("#cum-container").on("shown.bs.collapse", function(){
    destroy_charts(drownCharts);
    plot_charts(drownCharts,chartsCfg,chartsCtx,cached_data);
  });
  $("#daily-container").on("shown.bs.collapse", function(){
    destroy_charts(drownCharts);
    plot_charts(drownCharts,chartsCfg,chartsCtx,cached_data);
  });
  $("#stats-container").on("shown.bs.collapse", function(){
    destroy_charts(drownCharts);
    plot_charts(drownCharts,chartsCfg,chartsCtx,cached_data);
  });
  $("#home-container").on("shown.bs.collapse", function(){
    counter_run(cached_data);
  });
  $(document).on('click','#cum-filter',function(e) {
    //hide menu on mobile device when item selected
    $("#navbarNavAltMarkup").collapse("hide");    
    $("#home-container").collapse("hide");
    $("#daily-container").collapse("hide");
    $("#stats-container").collapse("hide");
    $("#cum-container").collapse("show");
    $("#daily-filter").removeClass("active");
    $("#stats-filter").removeClass("active");
    $("#home-filter").removeClass("active");
    $("#all-filter").removeClass("active");
    $("#cum-filter").addClass("active");

  });
  $(document).on('click','#daily-filter',function(e) {
    //hide menu on mobile device when item selected
    $("#navbarNavAltMarkup").collapse("hide");   
    $("#home-container").collapse("hide");
    $("#stats-container").collapse("hide");
    $("#cum-container").collapse("hide");
    $("#daily-container").collapse("show");
    $("#cum-filter").removeClass("active");
    $("#stats-filter").removeClass("active");
    $("#home-filter").removeClass("active");
    $("#all-filter").removeClass("active");
    $("#daily-filter").addClass("active");
  });
  $(document).on('click','#stats-filter',function(e) {
    //hide menu on mobile device when item selected
    $("#navbarNavAltMarkup").collapse("hide");
    $("#home-container").collapse("hide");
    $("#daily-container").collapse("hide");
    $("#cum-container").collapse("hide");
    $("#stats-container").collapse("show");
    $("#daily-filter").removeClass("active");
    $("#cum-filter").removeClass("active");
    $("#home-filter").removeClass("active");
    $("#all-filter").removeClass("active");
    $("#stats-filter").addClass("active");
  });
  $(document).on('click','#home-filter',function(e) {
    //hide menu on mobile device when item selected
    $("#navbarNavAltMarkup").collapse("hide");
    $("#daily-container").collapse("hide");
    $("#stats-container").collapse("hide");
    $("#cum-container").collapse("hide");
    $("#zoom-container").collapse("hide");
    $("#home-container").collapse("show");
    $("#daily-filter").removeClass("active");
    $("#cum-filter").removeClass("active");
    $("#stats-filter").removeClass("active");
    $("#all-filter").removeClass("active");
    $("#home-filter").addClass("active");
  });
  $(document).on('click','#all-filter',function(e) {
    //hide menu on mobile device when item selected
    $("#navbarNavAltMarkup").collapse("hide");
    
    $("#home-container").collapse("hide");

    $("#cum-container").collapse("show");    
    $("#daily-container").collapse("show");
    $("#stats-container").collapse("show");

    $("#daily-filter").removeClass("active");
    $("#cum-filter").removeClass("active");
    $("#stats-filter").removeClass("active");
    $("#home-filter").removeClass("active");
    $("#all-filter").addClass("active");
  });

});