Ext.define('AOS.view.button.MainMenu', {
		extend: 'Ext.Button',
		xtype: 'aos-button-mainmenu',
		alias: 'widget.principal',
		requires: ['Ext.Ajax'],
		config: {
			ui: 'round',
			handler: function() {
				Ext.Viewport.toggleMenu('top');
			}
		}
	});
