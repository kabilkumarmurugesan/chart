$(document).ready(function(){
$("#container_EqualizerBar").data("function",EqualizerBar);
	$("#container_EqualizerBar").data("title","Equalizer Bar");
	if ($("#container_EqualizerBar").parent().attr("thumb_type") != "none") {	
		var chart_EqualizerBar = new cfx.Chart();
		EqualizerBar(chart_EqualizerBar);		
		chart_EqualizerBar.create(document.getElementById("container_EqualizerBar"));
		if ($("#container_EqualizerBar").parent().attr("thumb_type") == "crop") {
			Positioning(chart_EqualizerBar,"447","137",$("#container_EqualizerBar"),"chart_container");
		}
		else {
			fix_thumb(chart_EqualizerBar, "chart");	
		}	
	}	
});

function EqualizerBar(chart1)
{
	// RELEVANT CODE
var equalizer = new cfx.equalizer.EqualizerBar();
var topItems = equalizer.getTopItems();
topItems.clear();
var eqItem;
eqItem = new cfx.equalizer.EqualizerItem();
eqItem.setCount(2);
topItems.add(eqItem);
eqItem = new cfx.equalizer.EqualizerItem();
eqItem.setCount(1);
topItems.add(eqItem);
chart1.setGalleryAttributes(equalizer);
// END RELEVANT CODE
PopulateProductSales_Red(chart1);
chart1.getLegendBox().setVisible(false);
var titles = chart1.getTitles();
var title = new cfx.TitleDockable();
title.setText("Red Wine Sales by Month");
titles.add(title);
chart1.getAxisY().getLabelsFormat().setFormat(cfx.AxisFormat.Currency);
chart1.getAxisY().getGrids().getMajor().setVisible(false);
}

function PopulateProductSales_Red(chart1) {
        var items = [{
            "Month": "Jan",
            "White": 12560,
            "Red": 23400,
            "Sparkling": 34500
        }, {
            "Month": "Feb",
            "White": 13400,
            "Red": 21000,
            "Sparkling": 38900
        }, {
            "Month": "Mar",
            "White": 16700,
            "Red": 17000,
            "Sparkling": 42100
        }, {
            "Month": "Apr",
            "White": 12000,
            "Red": 19020,
            "Sparkling": 43800
        }, {
            "Month": "May",
            "White": 15800,
            "Red": 26500,
            "Sparkling": 37540
        }, {
            "Month": "Jun",
            "White": 9800,
            "Red": 27800,
            "Sparkling": 32580
        }, {
            "Month": "Jul",
            "White": 17800,
            "Red": 29820,
            "Sparkling": 34000
        }, {
            "Month": "Aug",
            "White": 19800,
            "Red": 17800,
            "Sparkling": 38000
        }, {
            "Month": "Sep",
            "White": 23200,
            "Red": 32000,
            "Sparkling": 41300
        }, {
            "Month": "Oct",
            "White": 16700,
            "Red": 26500,
            "Sparkling": 46590
        }, {
            "Month": "Nov",
            "White": 11800,
            "Red": 23000,
            "Sparkling": 48700
        }, {
            "Month": "Dec",
            "White": 13400,
            "Red": 15400,
            "Sparkling": 49100
        }];
        // Since not all the fields in the DataSource are required, we must perform the corresponding bindings
        var fields = chart1.getDataSourceSettings().getFields();
        var fieldRed = new cfx.FieldMap();
        fieldRed.setName("Red");
        fieldRed.setUsage(cfx.FieldUsage.Value);
        fields.add(fieldRed);
        var MonthField = new cfx.FieldMap();
        MonthField.setName("Month");
        MonthField.setUsage(cfx.FieldUsage.Label);
        fields.add(MonthField);
        chart1.setDataSource(items);
    }