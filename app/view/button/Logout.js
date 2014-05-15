Ext.define('AOS.view.button.Logout', {
		extend: 'Ext.Button',
		xtype: 'aos-button-logout',
		requires: ['Ext.Ajax'],
		config: {
			ui: 'round',
			handler: function(){
				AOS.Helper.logOut();
			}
		}
	});
