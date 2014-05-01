Ext.define('AOS.view.Statistics', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.principal',
	requires: [
		'Ext.TitleBar',
		'Ext.Video',
		'AOS.view.statistics.CompletionGraph',
		'AOS.view.button.Logout',
		'AOS.view.button.MainMenu'],
	config: {
		tabBarPosition: 'bottom',
		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Welcome to Sencha Touch 2',
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
				title: 'Welcome',
				iconCls: 'aos-icon-home',

				styleHtmlContent: true,
				scrollable: true,

				items: [],

				html: [
					"You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
					"contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
					"and refresh to change what's rendered here."
				].join("")
			},
			{
				title: 'Get Started',
				iconCls: 'aos-icon-calendar',
				layout: 'fit',
				items: [
					{xtype:'aos-completion-graph'}
				]
			}
		]
	}
});
