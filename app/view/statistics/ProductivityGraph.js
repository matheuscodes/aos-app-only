Ext.define('AOS.view.statistics.ProductivityGraph', {
	extend: 'Ext.chart.CartesianChart',
	xtype: 'aos-productivity-graph',
	requires: ['Ext.chart.series.Bar','Ext.Ajax','Ext.JSON','Ext.chart.axis.Numeric','Ext.chart.axis.Category','Ext.data.Store','AOS.Helper'],
	config: {
		animate: true,
		xtype: 'chart',
		store: {},
		axes: [
			{
				type: 'numeric',
				position: 'left',
				title: {
					text: 'Productivity',
					fontSize: 15
				},
				grid: true,
				minimum: 0
			},
			{
				type: 'category',
				position: 'bottom',
				title: {
					text: 'Month',
					fontSize: 15
				}
			}
		],
		series: [],
		legend:{
			position:'top'
		}
	},
	initialize: function(){ //Change back to constructor or modularize
		this.callParent(arguments);
		var me = this;
		Ext.Ajax.request({
			url: 'statistics/productivity',
			method: 'GET',
			params: {
				periodicity: "monthly"
			},
			success: function (response) {
				var stats = Ext.JSON.decode(response.responseText);
				me.setStore(Ext.create('Ext.data.Store',{
					fields: stats['fields'],
					data: stats['productivities']
				}))

				var titles = [];
				var fields = [];
				var colors = [];
				for(var i = 1; i < stats['fields'].length; i++){
					fields.push(stats['fields'][i])
					titles.push(stats['titles'][stats['fields'][i]]);
					colors.push(AOS.Helper.getKeyColor(stats['fields'][i]))
				}
				var newseries = me.getSeries();
				var newone = {
					type: 'bar',
					colors: colors,
					stacked: false,
					xField: 'period',
					yField: fields,
					title: titles,
					style: {
						stroke: 'rgb(0,0,0)',
						shadowColor: 'rgb(25,25,25)',
						shadowOffsetX: 2,
						shadowOffsetY: 2
					}
				};
				newseries.push(newone);
				me.setSeries(newseries);
			},
			failure: function (response) {
				//TODO alert
			}
		});
	}
});