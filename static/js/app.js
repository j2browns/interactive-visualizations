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
    console.log("MetaData");
    console.log(bbMetaData);
    console.log("bbNames");
    var bbNames = data.names;
    console.log(bbNames);
    console.log("bbSamples");
    var bbSamples = data.samples;
    console.log(bbSamples);

    var subject = 955;
    var dataMeta = bbMetaData.filter(data =>parseInt(data.id) === subject);
    console.log(dataMeta);

    var dataSamples = bbSamples.filter(data =>parseInt(data.id) === subject);
    console.log(dataSamples);
    console.log(dataSamples[0].otu_ids);
});


// Promise Pending
const bbData = d3.json(url); 
console.log("Belly Button Data: ", bbData);


