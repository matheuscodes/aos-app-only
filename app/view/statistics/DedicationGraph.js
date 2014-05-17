/**
	Copyright (C) 2014  Matheus Borges Teixeira

	This is a part of Arkanos Organizer Suite (AOS) app.
	AOS is a web application for organizing personal goals.

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation, either version 3 of the
	License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

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
		}
	},
	initialize: function(){
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

				var newseries = [];
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