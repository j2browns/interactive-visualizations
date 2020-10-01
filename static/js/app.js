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

    var subject = 1258;
    var dataMeta = bbMetaData.filter(data =>parseInt(data.id) === subject);
    console.log(dataMeta);

    var dataSamples = bbSamples.filter(data =>parseInt(data.id) === subject);
    console.log(dataSamples);
    console.log(dataSamples[0].otu_ids);

    var otuIds = dataSamples[0].otu_ids.slice(0, 10);
    console.log(otuIds);
    var sampleValues = dataSamples[0].sample_values.slice(0, 10);
    console.log(sampleValues);
    var otuLabels = dataSamples[0].otu_labels.slice(0, 10);
    console.log(otuLabels);


});


// Promise Pending
const bbData = d3.json(url); 
console.log("Belly Button Data: ", bbData);


