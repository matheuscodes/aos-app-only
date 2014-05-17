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
 * View for visualizing statistics
 */
Ext.define('AOS.view.Statistics', {
	extend: 'Ext.tab.Panel',
	requires: [
		'Ext.TitleBar',
		'AOS.view.statistics.CompletionGraph',
		'AOS.view.statistics.DedicationGraph',
		'AOS.view.statistics.ProductivityGraph',
		'AOS.view.statistics.FocusGraph',
		'AOS.view.button.Logout',
		'AOS.view.button.MainMenu',
		'AOS.Helper'
	],
	config: {
		tabBarPosition: 'bottom',
		scrollable: 'horizontal',
		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Statistics',
				items: [
					{
						xtype: 'aos-button-logout',
						iconCls: 'aos-icon-logout',
						align: 'right'
					},
					{
						xtype: 'aos-button-mainmenu',
						iconCls: 'aos-icon-mainmenu',
						align: 'left'
					}
				]
			},
			{
				title: 'Overview',
				iconCls: 'aos-icon-overview',
				itemId: 'overview',
				styleHtmlContent: true,
				items: []
			},
			{
				title: 'Completion',
				iconCls: 'aos-icon-completion',
				layout: 'fit',
				items: [
					{
						xtype:'aos-completion-graph',
						itemId: 'completion'
					}
				]
			},
			{
				title: 'Dedication',
				iconCls: 'aos-icon-dedication',
				layout: 'fit',
				items: [
					{
						xtype:'aos-dedication-graph',
						itemId: 'dedication'
					}
				]
			},
			{
				title: 'Productivity',
				iconCls: 'aos-icon-productivity',
				layout: 'fit',
				items: [
					{
						xtype:'aos-productivity-graph',
						itemId: 'productivity'
					}
				]
			},
			{
				title: 'Focus',
				iconCls: 'aos-icon-focus',
				layout: 'fit',
				items: [
					{
						xtype:'aos-focus-graph',
						itemId: 'focus'
					}
				]
			}
		],
		listeners: {
			show: function() {
				if(AOS.Helper.hasDataChanged()){
					this.redoData();

					completion = this.down('#completion').parent;
					dedication = this.down('#dedication').parent;
					productivity = this.down('#productivity').parent;
					focus = this.down('#focus').parent;

					completion.removeAll(true,true);
					dedication.removeAll(true,true);
					productivity.removeAll(true,true);
					focus.removeAll(true,true);

					completion.add(Ext.create('AOS.view.statistics.CompletionGraph',{itemId:'completion'}));
					dedication.add(Ext.create('AOS.view.statistics.DedicationGraph',{itemId:'dedication'}));
					productivity.add(Ext.create('AOS.view.statistics.ProductivityGraph',{itemId:'productivity'}));
					focus.add(Ext.create('AOS.view.statistics.FocusGraph',{itemId:'focus'}));

					AOS.Helper.clearDataChanged();
				}
			}
		}
	},

	/**
	 * Downloads and writes the HTML statistical report.
	 */
	redoData: function(){
		var me = this;
		me.down('#overview').setHtml('<p style="text-align:center">Statistics will be loaded.</p>');
		Ext.Ajax.request({
			url: 'statistics',
			method: 'GET',
			success: function (response) {
				var stats = Ext.JSON.decode(response.responseText,true);
				var html = '';
				if(stats && stats['statistics']){
					html = '';
					html += '<p><b>Planned Time:</b> '+stats['statistics']['planned_time']+' hours.</p>';
					html += '<p><b>Used Time:</b> '+stats['statistics']['used_time']+' hours.</p>';
					html += '<p><b>Expected Used Time:</b> '+stats['statistics']['expected_used_time']+' hours.</p>';
					html += '<p><b>Surplus/Deficit:</b> '+stats['statistics']['surplus_time']+' hours.</p>';
					html += '<p><b>Expected Completion:</b> '+stats['statistics']['expected_completion']+'%</p>';

					html += '<table style="text-align:center">';

					html += '<tr><td colspan="3"><b>Completion</b></td></tr>';
					html += '<tr><td>Max</td><td>Average</td><td>Min</td></tr>';
					html += '<tr>';
					html += '<td>'+stats['statistics']['completion']['max']+'%</td>';
					html += '<td>'+stats['statistics']['completion']['avg']+'%</td>';
					html += '<td>'+stats['statistics']['completion']['min']+'%</td>';
					html += '</tr>';

					html += '<tr><td colspan="3"><br/><b>Dedication</b></td></tr>';
					html += '<tr><td>Max</td><td>Average</td><td>Min</td></tr>';
					html += '<tr>';
					html += '<td>'+stats['statistics']['dedication']['max']+'%</td>';
					html += '<td>'+stats['statistics']['dedication']['avg']+'%</td>';
					html += '<td>'+stats['statistics']['dedication']['min']+'%</td>';
					html += '</tr>';

					html += '<tr><td colspan="3"><br/><b>Productivity</b></td></tr>';
					html += '<tr><td>Max</td><td>Average</td><td>Min</td></tr>';
					html += '<tr>';
					html += '<td>'+stats['statistics']['productivity']['max']+'</td>';
					html += '<td>'+stats['statistics']['productivity']['avg']+'</td>';
					html += '<td>'+stats['statistics']['productivity']['min']+'</td>';
					html += '</tr>';

					html += '</table>';

				}
				else if(!stats){
					html = '<p style="text-align:center">There was a problem loading statistics.</p>';
					Ext.Msg.alert('Error','Statistics could not be parsed.');
				}
				me.down('#overview').setHtml(html);
				me.down('#overview').setScrollable(true);
			},
			failure: function (response) {
				Ext.Msg.alert('Error','Statistics could not be read from the server.');
			}
		});
	}
});
