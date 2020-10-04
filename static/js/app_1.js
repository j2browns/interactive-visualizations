//***********************************************/
//   This additional code is to present summary data
//  using full data set for the following:
//  1. Bacteria count versus wash frequency
//  2. Bacteria count versus gender
//************************************************/
//************ Connecting to JSON ****************/
//Setting path to json
const url =  "data/samples.json";

//getting data to generate new plots
d3.json(url).then(function(data) {
    var bbMetaData = data.metadata; //contains demographic information
    var bbSamples = data.samples; //array containing sample data
    
    //*************creating plot of wash frequency **********************************/
    //code below gets data for wash frequency and total bacteria count
    //code below finds selected patient meta (demographic) data using filtering
    var bbWash = bbMetaData.map(data =>parseInt(data.wfreq));
    
    var totalBacteria = bbSamples.map(data => d3.sum(data.sample_values)); //using d3 to get the sum
    
    //getting rid of NaN from wash frequency data
    // since Boolean(bbWash) is false for zero too need to check for zeros
    for (var i = 0; i<bbWash.length; i++){
        if(bbWash[i] != 0) {
            if (!(Boolean(bbWash[i]))){ //removes NaN and other false data
                bbWash.splice(i,1); //use of splice keeps remainder intact
                totalBacteria.splice(i,1);
                i-=1; //have to decrement i since shifted data by one point
            }
        }
    };

//set up trace with type of box plot
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
//Even though get total counts above the data is filtered by NaN which may not be 
//valid in this dataset

var bbGender = bbMetaData.map(data =>(data.gender));//getting gender
var totalBactGend = bbSamples.map(data => d3.sum(data.sample_values)); // getting counts


 //getting rid of NaN from gender data
 for (var i = 0; i<bbGender.length; i++){
    if(bbGender[i] != 0) {
        if (!(Boolean(bbGender[i]))){
            bbGender.splice(i,1);
            totalBactGend.splice(i,1);
            i-=1;
        }
    }
 };

 bbGender = bbGender.map(data=>data.toUpperCase()); //some gender reported caps, some lower, make all upper

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



