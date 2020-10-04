# interactive-visualizations

Jeff Brown
Homework 15

In this assignment we are to read data from a json file (provided) related to the bacteria contained in different peoples belly buttons.  The data set contains a subject ID list, 
metadata for each subject, and then a dataset for each patient (identified bacteria, bacteria count, bacteria label).  

On the page drop down is provided that allows the user to select the subject ID.  A series of plots are then generated:
1. A horizontal bar chart of the top ten bacteria counts (associated with the OTU label).
2. A bubble chart that shows all the bacteria found and counts.  The bubble size is scaled to the value.
3. A table of the demographic information is updated.
4. An indicator or gauge chart showing the belly button washing frequency for the subject (this is a bonus).


In addition to the above, I also thought it would be interesting to look at some additional plots for all the data (not subject specific).  I therefore added a button to the index
page that takes the user to a full analysis page.  On this page two plots are shown:

1. Box plots showing the bacteria counts versus belly button washing frequency.
2. Box plot showing the bacteria counts versus gender.

On this page is also a home button that returns to the home page.  In this additional work it turned out a large amount of data for belly button wash and gender were not valid
(NaN), and text was both upper and lower case.  Therefore the data had to be cleaned first before plots could be generated.  Searching found and interesting property in javascript: `Boolean(data)` returns true if the data is valid and false if invalid.  Care must be taken because 0 for string data is treated as invalid.  Therefore you must first check if the value is 0 before checking (if zero then don't check).
