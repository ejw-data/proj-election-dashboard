var svgWidth = 1060;
var svgHeight = 800;

var margin = {
    top: 160,
    right: 80,
    bottom: 120,
    left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Parameters
var chosenXAxis = "acs_medianincome";
var chosenYAxis = "acs_population_adult_white";

// function used for updating x-scale or y-scale var upon click on axis label
function xScale(data, chosenXAxis) {
    // create scales
    console.log(chosenXAxis);
    return d3
        .scaleLinear()
        .domain([
            d3.min(data, d => parseFloat(d[chosenXAxis]) * 0.9),
            d3.max(data, d => parseFloat(d[chosenXAxis]) * 1.0),
        ])
        .range([0, width]);
}



function yScale(data, chosenYAxis) {
    // create scales
    return d3
        .scaleLinear()
        .domain([
            d3.min(data, d => parseFloat(d[chosenYAxis]) * 0.1),
            d3.max(data, d => parseFloat(d[chosenYAxis]) * 1.0),
        ])
        .range([height, 0]);
}




// function used for updating xAxis upon click on axis label
function renderX(newXScale, xAxis) {
    let bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(2000)
        .call(bottomAxis);

    return xAxis;
}



function renderY(newYScale, yAxis) {
    let leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(2000)
        .call(leftAxis);

    return yAxis;
}



// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {


    circlesGroup.transition()
        .duration(3000)
        .attr('cx', data => newXScale(data[chosenXAxis]))
        .attr('cy', data => newYScale(data[chosenYAxis]))


    return circlesGroup;

}



// function used for updating circles group with new tooltip
function updateToolTip(circlesGroup, chosenXAxis, chosenYAxis) {

    if (chosenXAxis === "acs_medianincome") {
        var xLabel = "Median Income ($):";
    }
    else if (chosenXAxis === " qvote_president_republican") {
        xLabel = "Total Number of Votes Cast for Trump";
    }

    else {
        xLabel = "Total Number of Votes for Clinton"
    }

    if (chosenYAxis === "acs_population_adult_white") {
        var yLabel = "Adult White Population (%):";

    }
    else if (chosenYAxis === "acs_bachelordegree_age25plus") {
        xLabel = "BA Degree Age 25+ (%)";
    }

    else {

        yLabel = "Share of Non-College Whites (%)";
    }


    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .html(function (d) {
            return (`District: ${d.district}<br> Rep. ${d.first_name} ${d.last_name} (${d.party[0]})<br> First elected in ${d.first_elected}<br> Results:<br> •District: D: ${d.rvotepercent_house_democrat}% / R: ${d.rvotepercent_house_republican}% <br> •National: D: ${d.votepercent_president2016_democrat}% / R: ${d.votepercent_president2016_republican}%<br> ------------<br>Adult white pop.: ${d.acs_population_adult_white}%<br> BA degree 25+: ${d.acs_bachelordegree_age25plus}%<br>Non-college whites: ${d.noncollege_white_share}%<br> Median income rank: #${d.acs_medianincome_rank} 0f 435 districts<br>Votes for Trump: ${d.qvote_president_republican} of ${d.tvotetotal_president} cast<br>Votes for Clinton: ${d.qvote_president_democrat} of ${d.tvotetotal_president} cast`);
        });

    circlesGroup.call(toolTip);

    // circlesGroup.on("mouseover", function (data) {
    //     toolTip.show(data);
    // })
    //     // onmouseout event
    //     .on("mouseout", function (data) {
    //         toolTip.hide(data);
    //     });
    circlesGroup.on('mouseover', toolTip.show)
        .on('mouseout', toolTip.hide);

    return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function (data) {
    // console.log(data);

// d3.json('../api/all').then(function(data) {
//     console.log(data.data[0])


    // xLinearScale function above csv import
    var xLinearScale = xScale(data, chosenXAxis);
    var yLinearScale = yScale(data, chosenYAxis);

    // Create y scale function
    //   var yLinearScale = d3.scaleLinear()
    //   .domain([100,0])
    //   .range([0, height]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    //   chartGroup.append("g")
    //     .call(leftAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        // .attr("transform", `translate(0, ${height})`)
        .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", "9")
        .attr("stroke", "black")
        .attr("fill", d => {
            var party = d.party
            if (party === "Republican") {
                return "#E9141D";
            } else if (party === "Democratic") {
                return "#00AEF3";
            } else {
                return "green"
            }
        })
        .attr("opacity", ".7");

    // Create group for  3 x- axis labels
    var xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var medianIncomeLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "acs_medianincome") // value to grab for event listener
        .classed("active", true)
        .text("Median Income ($)");

    var votesTrumpLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "qvote_president_republican") // value to grab for event listener
        .classed("inactive", true)
        .text("Total Number of Votes Cast for Trump");

    var votesClintonLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "qvote_president_democrat") // value to grab for event listener
        .classed("inactive", true)
        .text("Total Number of Votes Cast for Clinton");

    // Create group for  3 y- axis labels

    var ylabelsGroup = chartGroup.append('g')
        .attr('transform', `translate(${0 - margin.left / 4}, ${height / 2})`);


    var whitePopLabel = ylabelsGroup.append("text")
        .attr('x', 0)
        .attr('y', 0 - 5)
        .attr("transform", "rotate(-90)")
        .attr("value", "acs_population_adult_white") // value to grab for event listener
        .classed("active", true)
        .text("Adult White Population (%)");

    var baDegreelabel = ylabelsGroup.append("text")
        .attr('x', 0)
        .attr('y', 0 - 25)
        .attr("transform", "rotate(-90)")
        .attr("value", "acs_bachelordegree_age25plus") // value to grab for event listener
        .classed("inactive", true)
        .text("BA Degree Age 25+ (%)");

    var noCollegeLabel = ylabelsGroup.append("text")
        .attr('x', 0)
        .attr('y', 0 - 45)
        .attr("transform", "rotate(-90)")
        .attr("value", "noncollege_white_share") // value to grab for event listener
        .classed("inactive", true)
        .text("Share of Non-College Whites (%)");

    // append y axis
    // chartGroup.append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 0 - margin.left)
    //     .attr("x", 0 - (height / 2))
    //     .attr("dy", "1em")
    //     .classed("axis-text", true)
    //     .text("Adult White Population");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(data, chosenXAxis);

                // updates x axis with transition
                xAxis = renderX(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

                // changes classes to change bold text
                if (chosenXAxis === "qvote_president_republican") {

                    votesTrumpLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    medianIncomeLabel
                        .classed("active", false)
                        .classed("inactive", true)
                    votesClintonLabel
                        .classed("active", false)
                        .classed("inactive", true)
                }
                else if (chosenXAxis === "acs_medianincome") {
                    votesTrumpLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    medianIncomeLabel
                        .classed("active", true)
                        .classed("inactive", false)
                    votesClintonLabel
                        .classed("active", false)
                        .classed("inactive", true)
                }

                else {
                    votesTrumpLabel.classed('active', false).classed('inactive', true);
                    medianIncomeLabel.classed('active', false).classed('inactive', true);
                    votesClintonLabel.classed('active', true).classed('inactive', false);
                }
            }
        });

    // y axis labels event listener
    ylabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {

                // replaces chosenXAxis with value
                chosenYAxis = value;

                // functions here found above csv import
                // updates x scale for new data
                yLinearScale = yScale(data, chosenYAxis);

                // updates x axis with transition
                yAxis = renderY(yLinearScale, yAxis);

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

                // changes classes to change bold text
                if (chosenYAxis === "acs_population_adult_white") {

                    whitePopLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    baDegreelabel
                        .classed("active", false)
                        .classed("inactive", true)
                    noCollegeLabel
                        .classed("active", false)
                        .classed("inactive", true);

                }
                else if (chosenYAxis === "acs_bachelordegree_age25plus") {
                    whitePopLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    baDegreelabel
                        .classed("active", true)
                        .classed("inactive", false)
                    noCollegeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    whitePopLabel.classed('active', false).classed('inactive', true);
                    baDegreelabel.classed('active', false).classed('inactive', true);
                    noCollegeLabel.classed('active', true).classed('inactive', false);
                }


            }
        });



}).catch(function (error) {
    console.log(error);
});
