/*   Name: Yusuf Yildiz
     Email: GUI I
     Date: November 20, 2016
     Assignment No. 8
     This webpage allows the user to create a dynamic multiplication table.
     Also added
     */

$(document).ready(function(){
    $("#tabs").tabs();
    var count = 0;
    $("#inputs").validate({
        rules: {
            // Make sure that the first input isn't bigger than the second
            firstInput: {
                required: true,
                number: true,
                range: [-12, 12]
            },
            // Make sure that the second input is bigger than the first
            secondInput: {
                required: true,
                number: true,
                range: [-12, 12]
            },
            // Make sure that the third input isn't bigger than the fourth
            thirdInput: {
                required: true,
                number: true,
                range: [-12,12]
            },
            // Make sure that the fourth input is bigger than the third
            fourthInput: {
                required: true,
                number: true,
                range: [-12, 12]

            }
        }
    });


    // Select the sliders and give them their mins and maxs
    // Also give them the value of each of the inputs
    // and set the slide functions to update the values of the inputs.
    $("#first").slider({
        min: -12,
        max: 12,
        value: parseInt($("#firstInput").val()),
        slide: function(e, ui) {
            $("#firstInput").val(ui.value);
        }
    });
    $("#second").slider({
        min: -12,
        max: 12,
        value: parseInt($("#secondInput").val()),
        slide: function(e, ui) {
            $("#secondInput").val(ui.value);
        }
    });
    $("#third").slider({
        min: -12,
        max: 12,
        value: parseInt($("#thirdInput").val()),
        slide: function(e, ui) {
            $("#thirdInput").val(ui.value);
        }
    });
    $("#fourth").slider({
        min: -12,
        max: 12,
        value: parseInt($("#fourthInput").val()),
        slide: function(e, ui) {
            $("#fourthInput").val(ui.value);
        }
    });

    // When the save button is clicked, we create the table
    // using the createTable function.
    $("#inputs .btn").click(function(e) {
        e.preventDefault();
        createTable();
        $("#tabs").tabs({
            "active": -1
        });
    });

    // On user keyup we want to update the value of the slider
    // so that it is all consistent.
    $("#firstInput").on("keyup", function() {
        $("#first").slider("value", parseInt($("#firstInput").val()))
    });
    $("#secondInput").on("keyup", function() {
        $("#second").slider("value", parseInt($("#secondInput").val()))
    });
    $("#thirdInput").on("keyup", function() {
        $("#third").slider("value", parseInt($("#thirdInput").val()))
    });
    $("#fourthInput").on("keyup", function() {
        $("#fourth").slider("value", parseInt($("#fourthInput").val()))
    });

    // Had to do document.on(click) here because
    // I had trouble finding dynamically created elements.
    // This part deletes the clicked on tabs table
    // and also the tab itself.
    $(document).on("click", ".deleteBtn", function(){
        var tab = $(this).data("tab");
        $("div#" + tab).remove();
        $("[data-checkbox=" + tab + "]").remove();
        $(this).closest("li").remove();
        // Set the current active tab to the last tab
        $("#tabs").tabs({
            "active": -1
        });
        // if there are no tables then
        // this code hides the delete multiple
        // section that has the checkboxes
        if($(".checkbox").length > 0) {
            $(".deleteMultiple").show();
        } else {
            $(".deleteMultiple").hide();
            count = 0;
        }

    });
    // This section deletes multiple Tables
    $("#deleteTables").on("click", function(e) {
        e.preventDefault();
        // This is used to find all of the checkboxes that are checked
        var tabs = $("input:checked");
        // I store the tab id of each table and its corresponding tab
        // when I create them and I use this to delete them in this section.
        tabs.each(function() {
            var tab = $(this).attr("data-checkbox");
            $("div#" + tab).remove();
            $("[data-checkbox=" + tab + "]").remove();
            $("[data-tab=" + tab + "]").closest("li").remove();
            $("#tabs").tabs({
                "active": -1
            });
        })

        if($(".checkbox").length > 0) {
            $(".deleteMultiple").show();
        } else {
            $(".deleteMultiple").hide();
            count = 0;
        }
    });
    // Wanted to make sure that we weren't displaying the
    // delete Multiple section if there were no elements
    if($(".checkbox").length > 0) {
        $(".deleteMultiple").show();
    } else {
        $(".deleteMultiple").hide();
    }
    // Function to create the table
    function createTable(saveTab) {
        // increment the count of tabs
        count++;

        // check if the input is valid
        if(!($("#inputs").valid())) {
            return;
        }
        // create a tab element
        var list_item = $("<li></li>");
        // create a delete button that is found at the top of
        // each tab element
        var delete_btn = $("<div>");
        delete_btn.attr("class", "deleteBtn");
        delete_btn.attr("data-tab", "tab-" + count);
        delete_btn.text("X");

        list_item.append(delete_btn);

        var href=$("<a></a>");
        href.attr("href", "#tab-" + count);
        href.text("Tab " + count);
        list_item.append(href);
        $("#tabs ul").append(list_item);
        $("#tabs").append($("#table-" + count));

        // get the values of each inputs
        var first = parseInt($("#firstInput").val());
        var second = parseInt($("#secondInput").val());
        var third = parseInt($("#thirdInput").val());
        var fourth = parseInt($("#fourthInput").val());


        // Create our table
        var tableContainer = $("<div>");
        tableContainer.attr("id", "tab-" + count);
        tableContainer.append("<table>");
        var table = tableContainer.find("table");

        // if one of the numbers is larger than the other
        // then I just reverse their order.
        if(first > second) {
            var temp = first;
            first = second;
            second = temp;
        }
        if(third > fourth) {
            var temp = third;
            third = fourth;
            fourth = temp;
        }

        for(i = first-1; i <= second; i++) {
            // Create the rows each iteration
            var tr = $("<tr>");
            for(j = third-1; j <= fourth; j++) {
                var td = "<td>" + i*j + "</td>"
                // If it's the first block, leave it blank
                if(i == first-1 && j == third-1) {
                    var td = "<td></td>";
                }
                // if we're creating a row, fill that td with j
                else if(i == first -1) {
                    var td = "<th>" + j + "</th>"
                }
                //if were creating a column, fill that td with i
                else if(j == third -1) {
                    var td = "<td>" + i + "</td>"
                }
                tr.append(td);
            }
            table.append(tr);
        }

        // Creating a checkbox element within a div
        var checkbox = $("<div>");
        checkbox.attr("class", "checkbox");
        // used for deleting tables when doing multiple delete
        checkbox.attr("data-checkbox", "tab-" + count);
        // creating a label
        var label = $("<label>");
        label.text("Tab " + count);

        checkbox.append(label);
        var input = $("<input type='checkbox'>");
        input.attr("data-checkbox", "tab-" + count);
        checkbox.append(input);
        var checkboxes = $(".checkboxes");
        checkboxes.append(checkbox);
        // if there aren't any tables then don't show this section
        if($(".checkbox").length > 0) {
            $(".deleteMultiple").show();
        } else {
            $(".deleteMultiple").hide();
        }
        // append the table to the tab
        $("#tabs").append(tableContainer);
        // we need to refresh the tabs so that they aren't out of date.
        $("#tabs").tabs("refresh");
    }

});
