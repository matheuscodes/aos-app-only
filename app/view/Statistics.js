Ext.define('AOS.view.Statistics', {
	extend: 'Ext.tab.Panel',
	requires: [
		'Ext.TitleBar',
		'Ext.Video',
		'AOS.view.statistics.CompletionGraph',
		'AOS.view.statistics.DedicationGraph',
		'AOS.view.statistics.ProductivityGraph',
		'AOS.view.statistics.FocusGraph',
		'AOS.view.button.Logout',
		'AOS.view.button.MainMenu'],
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
				scrollable: true,

				items: []
			},
			{
				title: 'Completion',
				iconCls: 'aos-icon-completion',
				layout: 'fit',
				items: [
					{xtype:'aos-completion-graph'}
				]
			},
			{
				title: 'Dedication',
				iconCls: 'aos-icon-dedication',
				layout: 'fit',
				items: [
					{xtype:'aos-dedication-graph'}
				]
			},
			{
				title: 'Productivity',
				iconCls: 'aos-icon-productivity',
				layout: 'fit',
				items: [
					{xtype:'aos-productivity-graph'}
				]
			},
			{
				title: 'Focus',
				iconCls: 'aos-icon-focus',
				layout: 'fit',
				items: [
					{xtype:'aos-focus-graph'}
				]
			}
		],
		listeners: {
		    show: function() {
		       this.initialize();
		    }
		}
	},
	initialize: function(){
		this.callParent(arguments);
		var me = this;
		Ext.Ajax.request({
			url: 'statistics',
			method: 'GET',
			success: function (response) {
				var stats = Ext.JSON.decode(response.responseText);
				var html = '';
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

				me.down('#overview').setHtml(html);
				me.down('#overview').setScrollable(true);
			},
			failure: function (response) {
				Ext.Msg.alert('Error','Statistics could not be read from the server.');
			}
		});
	}
});
