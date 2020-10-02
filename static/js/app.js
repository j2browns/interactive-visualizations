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

    var otuIds = dataSamples[0].otu_ids.slice(0, 10);
    var otuIdsString = otuIds.map(number => number.toString());
    console.log(otuIds);
    console.log(otuIdsString);
    var sampleValues = dataSamples[0].sample_values.slice(0, 10);
    console.log(sampleValues);
    var otuLabels = dataSamples[0].otu_labels.slice(0, 10);
    console.log(otuLabels);

    var trace1 = {
      x: sampleValues.reverse(),
      y: otuIdsString.reverse(),
      type: "bar",
      orientation: "h",
      text: otuLabels
    };

    var data = [trace1];
  
  var layout = {
    title: `Plot of Counts vs otu_id for ${subject}`,
        xaxis: {title: "otu_id"},
    yaxis: {title: "counts of otu" , type:"category", gridwidth: 2},
    bargap:0.05
  };

  Plotly.newPlot("bar", data, layout);

  //********* creating bubble chart */
  var trace1 = {
    x: dataSamples[0].otu_ids,
    y: dataSamples[0].sample_values,
    mode: 'markers',
    marker: {
      
      color: (dataSamples[0].otu_ids),
      size: dataSamples[0].sample_values
    },
    text: dataSamples[0].otu_labels
    
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'otu Counts versus otu ID',
    showlegend: false,
    height: 600,
    width: 1000
  };
  
  Plotly.newPlot('bubble', data, layout);

});


// Promise Pending
const bbData = d3.json(url); 
console.log("Belly Button Data: ", bbData);


