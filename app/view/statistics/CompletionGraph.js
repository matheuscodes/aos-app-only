Ext.define('AOS.view.statistics.CompletionGraph', {
	extend: 'Ext.chart.CartesianChart',
	xtype: 'aos-completion-graph',
	requires: ['Ext.chart.series.Line','Ext.Ajax','Ext.JSON','Ext.chart.axis.Numeric','Ext.chart.axis.Category','Ext.data.Store'],
	config: {
		animate: true,
		xtype: 'chart',
		store: {},
		axes: [
			{
				type: 'numeric',
				position: 'left',
				title: {
					text: 'Completion',
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
			position:'left'
		}
	},
	initialize: function(){ //Change back to constructor or modularize
		this.callParent(arguments);
		var me = this;
		Ext.Ajax.request({
			url: 'statistics',
			method: 'GET',
			params: {
				user_name: "arkanos",
				hashed_password: "ne"
			},
			success: function (response) {
				var stats = Ext.JSON.decode(response.responseText);
				//TODO rename to fields not goals
				me.setStore(Ext.create('Ext.data.Store',{
					fields: stats['goals'],
					data: stats['completions']
				}))
				
				var newseries = me.getSeries();
				for(var i = 1; i < stats['goals'].length; i++){
					newone = {
						type: 'line',
						style: {
							stroke: 'rgb(143,203,203)',
							lineWidth: 2,
							smooth:true
						},
						xField: 'period',
						yField: stats['goals'][i],
						title: stats['titles'][stats['goals'][i]],
						marker: {
							type: 'circle',
							stroke: 'rgb(143,203,203)',
							radius: 2,
							lineWidth: 0
						}
					};
					newseries.push(newone);
				}
				me.setSeries(newseries);
			},
			failure: function (response) {
				//TODO alert
			}
		});
	}
});