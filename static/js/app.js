//Homework 15 Interactive Visualizations

// fetch(".\samples.json")
    // .then(response => response.json())
    // .then(json => console.log(json));
// var bbData = JSON.parse(samples);
//console.log(bbData);


const url = "../samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  //console.log(data);
    var bbMetaData = data.metadata;
    //console.log(bbMetaData);
    var bbNames = data.names;
    //console.log(bbNames);
    var bbSamples = data.samples;
    console.log(bbSamples);
});


// Promise Pending
const bbData = d3.json(url); 
console.log("Belly Button Data: ", bbData);


