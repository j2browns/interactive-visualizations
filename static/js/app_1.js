//***********************************************/
//   This additional code is to present summary data
//  using full data set for the following:
//  1. Bacteria count versus wash frequency
//  2. Bacteria count versus gender
//************************************************/
//************ Connecting to JSON ****************/
//Setting path to json
const url = "../samples.json";


d3.json(url).then(function(data) {
    var bbMetaData = data.metadata; //contains demographic information
    var bbSamples = data.samples; //array containing sample data
    console.log(bbSamples);
    console.log(bbSamples[3].sample_values);
    console.log(d3.sum(bbSamples[3].sample_values));

    //*************creating plot of wash frequency **********************************/
    //code below gets data for wash frequency and total bacteria count
    //code below finds selected patient meta (demographic) data using filtering
    var bbWash = bbMetaData.map(data =>parseInt(data.wfreq));
    console.log("original bbwash array");
    console.log(bbWash);
    var totalBacteria = bbSamples.map(data => d3.sum(data.sample_values));
    console.log("original sum bacteria array");
    console.log(totalBacteria);
    console.log(bbWash[7]);
    console.log( Boolean(bbWash[7]));

    //getting rid of NaN from wash frequency data
    for (var i = 0; i<bbWash.length; i++){
        if(bbWash[i] != 0) {
            if (!(Boolean(bbWash[i]))){
                bbWash.splice(i,1);
                totalBacteria.splice(i,1);
                i-=1;
            }
        }
    };
    console.log("filtered bbwash array");
    console.log(bbWash);
    console.log("filtered sum bacteria array");
    console.log(totalBacteria);

var trace1 = {
    x:bbWash,
    y:totalBacteria,
    type: "box",
    
};

var data = [trace1];

var layout = {
    title: "Bacteria Count vs Wash Frequency",
    xaxis: {title: "Washes per Week", dtick:1},
    yaxis: {title: "Total Bacteria Count"}
}
Plotly.newPlot("wash", data, layout);



//***************Creating plot of M versus F bacteria count*****************/
 //code below gets data for M and F total bacteria count

 //code below finds selected patient meta (demographic) data using mapping
 //also gets the total bacteria count

var bbGender = bbMetaData.map(data =>(data.gender));
var totalBactGend = bbSamples.map(data => d3.sum(data.sample_values));


 //getting rid of NaN from wash frequency data
 for (var i = 0; i<bbGender.length; i++){
    if(bbGender[i] != 0) {
        if (!(Boolean(bbGender[i]))){
            bbGender.splice(i,1);
            totalBactGend.splice(i,1);
            i-=1;
        }
    }
 };

 bbGender = bbGender.map(data=>data.toUpperCase());

 var trace1 = {
    x:bbGender,
    y:totalBactGend,
    type: "box",
    
};

var data = [trace1];

var layout = {
    title: "Bacteria Count vs Gender",
    xaxis: {title: "Test Subject Gender"},
    yaxis: {title: "Total Bacteria Count"}
};

Plotly.newPlot("gender", data, layout);









    // Promise Pending
const bbData = d3.json(url); 
console.log("Belly Button Data: ", bbData);


});



