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
			url: 'statistics/focus',
			method: 'GET',
			params: {
				periodicity: "monthly"
			},
			success: function (response) {
				var stats = Ext.JSON.decode(response.responseText);

				/* Reason for the warning TODO: refactor*/
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