//Homework 15 Interactive Visualizations

//************************************************/
//************ Connecting to JSON ****************/
//Setting path to json
const url = "data/samples.json";

//Getting values for pop down menu from JSON Data
d3.json(url).then(function(data) {
    var bbNames = data.names;//extracting test subject ID list
    selectPopMenu(bbNames); //call Function to populate drop down
});

// event handler to sense when test subject ID is selected
// when selected calls function to draw graphs
d3.selectAll("#selDataset").on("change", updatePage); 



// *****************************************************************************/
// ********** Function that plots graphs and updates demographic info**********/
//************function called when any value selected from drop down **********/

function updatePage() {
d3.json(url).then(function(data) {
    var bbMetaData = data.metadata; //contains demographic information
    var bbSamples = data.samples; //array containing sample data
    console.log(bbSamples); //included for trouble shooting and validating data
    //Getting Test Subject ID number
    var dropdownMenu = d3.select("#selDataset");
    var subject = +dropdownMenu.property("value");//will contain the test subject ID

    //code below finds selected subject meta (demographic) data using filtering
    var dataMeta = bbMetaData.filter(data =>parseInt(data.id) === subject);
    console.log(dataMeta); //included to validate data and troubleshoot

    //code below finds selected Subject data using filtering
    var dataSamples = bbSamples.filter(data =>parseInt(data.id) === subject);
    
    //*************Populating Demographic Panel********************* */
    //getting demographic key data
    var demogKeys = Object.keys(dataMeta[0]);
    //getting data for values of matching keys
    var demogVal = Object.values(dataMeta[0]);

    //remove all paragraph fields from section of html (ie clear prior data)
    var demog = d3.select("#sample-metadata").selectAll("p").remove(); 
    
    //select region where demographic 
    var demogPanel = d3.select("#sample-metadata");
    for (i=0; i<demogKeys.length; i++) {
      var para = demogPanel.append("p");
      para.text(`${(demogKeys[i])} = ${demogVal[i]}`)
    };
    

    //****************************************************/
    //***********Plotting Horizontal Bar Chart ***********/
    // Slicing data for horizontal bar plot
    var otuIds = dataSamples[0].otu_ids.slice(0, 10);//getting otuIds
    var otuIdsString = otuIds.map(number => number.toString());//converting otu's to string
    
    var sampleValues = dataSamples[0].sample_values.slice(0, 10); //getting data counts top 10
    
    var otuLabels = dataSamples[0].otu_labels.slice(0, 10); //getting labels for OTU's
    
    //Setting trace data
    var trace1 = {
      x: sampleValues.reverse(),
      y: otuIdsString.reverse(),
      type: "bar",
      orientation: "h",
      text: otuLabels
    };

    var data = [trace1];
  
    var layout = {
      title: `Plot of Counts vs OTU_id for ${subject}`,
      xaxis: {title: "counts of OTU"},
      yaxis: {title: "OTU_id" , type:"category", gridwidth: 2},
      bargap:0.05
    };

    Plotly.newPlot("bar", data, layout);

  //*******************creating gauge chart**********************/
  var data = [
    {
      domain: {x:[0,1], y:[0,1]},
      type: "indicator",
      value: +dataMeta[0].wfreq,
      gauge: { axis: { visible: true, range: [0, 10] } ,
              steps:[ {range: [0,2], color: "red"},
                      {range: [2,4], color: "orange"},
                      {range:[4,7], color: "yellow" },
                      {range:[7,10], color: "lightgreen"}
                    ]
             },
    }
    ];

    var layout = {
      width: 500,
      height: 350,
      margin: { t: 50, b: 50, l: 50, r: 50 },
      template:
      {
        data: 
        {
          indicator:
          [
            {
              title: {text: "Belly Button<br>Wash Frequency"},
              mode: "number+gauge"
            }
          ]
        }
      }
    };

    Plotly.newPlot('gauge', data, layout);//located at div for gauge

  //********* Creating Bubble Chart ********************/

  // in color data need to set range of values and colors in rgb.  number (like 0.5) is decimal percent
  // of full scale.

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
    title: 'OTU Counts versus ID Number',
    xaxis: {title:"OTU ID"},
    yaxis: {title:"OTU Counts in Sample"},
    showlegend: false,
    height: 600,
    width: 800
  };
  var config = {responsive: true}

  Plotly.newPlot('bubble', data, layout, config);

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