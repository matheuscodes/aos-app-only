Ext.define('AOS.view.bar.TopToolbar',{
		extend: 'Ext.TitleBar',
		xtype: 'aos-toolbar-toptoolbar',
		config: {
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
		}
	});
