Ext.define('AOS.view.statistics.FocusGraph', {
	extend: 'Ext.chart.CartesianChart',
	xtype: 'aos-focus-graph',
	requires: ['Ext.chart.series.Bar','Ext.Ajax','Ext.JSON','Ext.chart.axis.Numeric','Ext.chart.axis.Category','Ext.data.Store','AOS.Helper'],
	config: {
		animate: true,
		store: {},
		axes: [
			{
				type: 'numeric',
				position: 'left',
				title: {
					text: 'Focus'
				},
				grid: true,
				minimum: 0
			},
			{
				type: 'category',
				position: 'bottom'
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
			url: 'statistics/focus',
			method: 'GET',
			params: {
				periodicity: "monthly"
			},
			success: function (response) {
				var stats = Ext.JSON.decode(response.responseText);
				me.setStore(Ext.create('Ext.data.Store',{
					fields: stats['fields'],
					data: stats['focuses']
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
					stacked: true,
					xField: 'period',
					yField: fields,
					title: titles,
					style: {
						stroke: 'rgb(50,50,50)',
						shadowColor: 'rgb(25,25,25)',
						shadowOffsetX: 3,
						shadowOffsetY: 3,
						minBarWidth: 10
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