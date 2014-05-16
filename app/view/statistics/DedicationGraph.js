Ext.define('AOS.view.statistics.DedicationGraph', {
	extend: 'Ext.chart.CartesianChart',
	xtype: 'aos-dedication-graph',
	requires: ['Ext.chart.series.Line','Ext.Ajax','Ext.JSON','Ext.chart.axis.Numeric','Ext.chart.axis.Category','Ext.data.Store','AOS.Helper'],
	config: {
		animate: true,
		store: {},
		axes: [
			{
				type: 'numeric',
				position: 'left',
				title: {
					text: 'Dedication'
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
		},
		listeners: {
			show: function() {
				if(AOS.Helper.hasDataChanged()){
					this.initialize();
				}
			}
		}
	},
	initialize: function(){ //Change back to constructor or modularize
		this.callParent(arguments);
		var me = this;
		Ext.Ajax.request({
			url: 'statistics/dedication',
			method: 'GET',
			params: {
				periodicity: "monthly"
			},
			success: function (response) {
				var stats = Ext.JSON.decode(response.responseText);

				/* Reason for the warning TODO: refactor*/
				me.setStore(Ext.create('Ext.data.Store',{
					fields: stats['fields'],
					data: stats['dedications']
				}))

				var newseries = me.getSeries();
				for(var i = 1; i < stats['fields'].length; i++){
					var newone = {
						type: 'line',
						style: {
							stroke: AOS.Helper.getKeyColor(stats['fields'][i]),
							lineWidth: 2,
							smooth:true
						},
						xField: 'period',
						yField: stats['fields'][i],
						title: stats['titles'][stats['fields'][i]],
						marker: {
							type: 'circle',
							stroke: AOS.Helper.getKeyColor(stats['fields'][i]),
							radius: 4,
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