//Homework 15 Interactive Visualizations

// fetch(".\samples.json")
    // .then(response => response.json())
    // .then(json => console.log(json));
// var bbData = JSON.parse(samples);
//console.log(bbData);

//Setting path to json
const url = "../samples.json";

//Getting values for pop down menu
d3.json(url).then(function(data) {
    var bbNames = data.names;//extracting test subject ID
    selectPopMenu(bbNames); //call routine to populate drop down
});

// event handler to sense when test subject ID is selected
d3.selectAll("#selDataset").on("change", updatePage); 


// Fetch the JSON data and console log it
function updatePage() {
d3.json(url).then(function(data) {
  //console.log(data);
    var bbMetaData = data.metadata;
    //console.log("MetaData");
    //console.log(bbMetaData);
    //console.log("bbNames");
    var bbNames = data.names;
    //console.log(bbNames);
    //console.log("bbSamples");
    var bbSamples = data.samples;
    //console.log(bbSamples);

    //Getting Test Subject ID number
    var dropdownMenu = d3.select("#selDataset");
    var subject = +dropdownMenu.property("value");

    //var subject = 955;
    var dataMeta = bbMetaData.filter(data =>parseInt(data.id) === subject);
    console.log(dataMeta);

    //Getting data from json
    var dataSamples = bbSamples.filter(data =>parseInt(data.id) === subject);
    //console.log(dataSamples);
    //console.log(dataSamples[0].otu_ids);

    

    //Populating demographic information
    var demogKeys = Object.keys(dataMeta[0]);
    //console.log(demogKeys);
    var demogVal = Object.values(dataMeta[0]);

    var demog = d3.select("#sample-metadata").selectAll("p").remove(); 
    
    var demogPanel = d3.select("#sample-metadata");
    for (i=0; i<demogKeys.length; i++) {
      var para = demogPanel.append("p");
      para.text(`${(demogKeys[i])} = ${demogVal[i]}`)
    };
    
    // Slicing data for horizontal bar plot
    var otuIds = dataSamples[0].otu_ids.slice(0, 10);
    var otuIdsString = otuIds.map(number => number.toString());
    //console.log(otuIds);
    //console.log(otuIdsString);
    var sampleValues = dataSamples[0].sample_values.slice(0, 10);
    //console.log(sampleValues);
    var otuLabels = dataSamples[0].otu_labels.slice(0, 10);
    //console.log(otuLabels);

    //***********Plotting Horizontal Bar Chart ***********/
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

  //********* Creating Bubble Chart ********************/

  colors = (dataSamples[0].otu_ids).map(data=>(data/3000*255));

  var trace1 = {
    x: dataSamples[0].otu_ids,
    y: dataSamples[0].sample_values,
    mode: 'markers',
    marker: {
      colorscale:[
        ['0','rgb(0,0,255)'],
        ['0.5','rgb(0,255,0)'],
        ['1','rgb(255,0,0)']
          
          ],
      color: colors,
      size: dataSamples[0].sample_values
    },
    text: dataSamples[0].otu_labels
    
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'otu Counts versus otu ID',
    xaxis: {title:"otu ID"},
    yaxis: {title:"otu Counts in Sample"},
    showlegend: false,
    height: 600,
    width: 800
  };
  
  Plotly.newPlot('bubble', data, layout);

});


// Promise Pending
const bbData = d3.json(url); 
console.log("Belly Button Data: ", bbData);
};

//Function  - populate shape pull down
function selectPopMenu(arrayList) {

  //select the "select" callout in html
  var selectMenu = d3.select("select");
  //append option under select
  var row = selectMenu.append("option");
  //filling text field for option
  row.text("-None-");
  for (i = 0; i<arrayList.length; i++) {
    var row = selectMenu.append("option");
    //populate list value for select menue from arrayList passed to function
    row.text(arrayList[i]);
        };
 };