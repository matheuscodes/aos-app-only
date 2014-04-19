Ext.define('AOS.view.button.Logout', {
		extend: 'Ext.Button',
		xtype: 'aos-logout',
		alias: 'widget.principal',
		requires: ['Ext.Ajax'],
		config: {
			text: 'Log Off',
			handler: function(){
				var me = this;
				Ext.Ajax.request({
					url: 'logout',
					method: 'post',
					success: function (response) {
						me.fireEvent('switching','AOS.view.Login',{ type: 'pop' });
					},
					failure: function (response) {
						me.fireEvent('switching','AOS.view.Login',{ type: 'pop' });
					}
				});
			}
		}
	});
