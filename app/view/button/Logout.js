Ext.define('AOS.view.button.Logout', {
		extend: 'Ext.Button',
		xtype: 'aos-button-logout',
		alias: 'widget.principal',
		requires: ['Ext.Ajax'],
		config: {
			ui: 'round',
			handler: function(){
				this.fireEvent('logout');
			}
		}
	});
