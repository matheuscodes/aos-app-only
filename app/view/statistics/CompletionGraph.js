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
 * Graph for displaying completion over time.
 */
Ext.define('AOS.view.statistics.CompletionGraph', {
	extend: 'Ext.chart.CartesianChart',
	xtype: 'aos-completion-graph',
	requires: [
		'Ext.draw.sprite.Path',
		'Ext.chart.series.Line',
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
		store: {},
		axes: [
			{
				type: 'numeric',
				position: 'left',
				title: {
					text: 'Completion'
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
			url: 'statistics/completion',
			method: 'GET',
			params: {
				periodicity: "monthly"
			},
			success: function (response) {
				var stats = Ext.JSON.decode(response.responseText);
				
				/* Reason for the warning TODO: refactor*/
				me.setStore(Ext.create('Ext.data.Store',{
					fields: stats['fields'],
					data: stats['completions']
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
							type: 'path',
							path: ['M', -6, 0, 0, 6, 6, 0, 0, -6, 'Z'],
							stroke: AOS.Helper.getKeyColor(stats['fields'][i]),
							lineWidth: 0
						}
					};
					newseries.push(newone);
				}
				if(newseries.length > 0){
					me.setSeries(newseries);
				}
			},
			failure: function (response) {
				Ext.Msg.alert('Graph not loaded','Completion graph could not be loaded.');
			}
		});
	}
});