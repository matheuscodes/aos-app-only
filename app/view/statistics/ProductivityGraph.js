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

/**
 * Graph for displaying productivity over time.
 */
Ext.define('AOS.view.statistics.ProductivityGraph', {
	extend: 'Ext.chart.CartesianChart',
	xtype: 'aos-productivity-graph',
	requires: [
		'Ext.chart.series.Bar',
		'Ext.chart.interactions.PanZoom',
		'Ext.chart.axis.Numeric',
		'Ext.chart.axis.Category',
		'Ext.data.Store',
		'Ext.MessageBox',
		'Ext.Ajax',
		'Ext.JSON',
		'AOS.Helper'
	],
	config: {
		animate: true,
		xtype: 'chart',
		store: {},
		interactions:[
			{
				type: 'panzoom',
				axes:{
					'left':{
						allowPan:false,
						allowZoom: false
					},
					'bottom':{
						allowPan:true,
						allowZoom: false
					}
				}
			}
		],
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
				visibleRange: [0.5, 1],
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
	initialize: function(){
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

				/* Reason for the warning TODO: refactor*/
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
				var newseries = [];
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
				Ext.Msg.alert('Graph not loaded','Productivity graph could not be loaded.');
			}
		});
	}
});