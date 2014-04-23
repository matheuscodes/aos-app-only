/*
	This file is generated and updated by Sencha Cmd. You can edit this file as
	needed for your application, but these edits will have to be merged by
	Sencha Cmd when it performs code generation tasks such as generating new
	models, controllers or views and when running "sencha app upgrade".

	Ideally changes to this file would be limited and most work would be done
	in other places (such as Controllers). If Sencha Cmd cannot merge your
	changes and its generated code, it will produce a "merge conflict" that you
	will need to resolve manually.
*/

Ext.application({
	name: 'AOS',

	requires: [
		'Ext.MessageBox','Ext.Ajax','Ext.Menu','AOS.Helper'
	],

	views: [
		'Login','Forgot','Signup','Statistics','Goals'
	],

	controllers: [
		'Principal'
	],

	stores: [
		'Goals'
	],

	icon: {
		'57': 'resources/icons/Icon.png',
		'72': 'resources/icons/Icon~ipad.png',
		'114': 'resources/icons/Icon@2x.png',
		'144': 'resources/icons/Icon~ipad@2x.png'
	},

	isIconPrecomposed: true,

	startupImage: {
		'320x460': 'resources/startup/320x460.jpg',
		'640x920': 'resources/startup/640x920.png',
		'768x1004': 'resources/startup/768x1004.png',
		'748x1024': 'resources/startup/748x1024.png',
		'1536x2008': 'resources/startup/1536x2008.png',
		'1496x2048': 'resources/startup/1496x2048.png'
	},

	launch: function() {
		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();

		// Initialize the main menu
		Ext.Viewport.setMenu(this.buildMainMenu(),{side:'top',cover:true});
		//AOS.util.Proxy.process('feed.js');			
		// Initialize the main view
		Ext.Ajax.request({
			url: 'login',
			method: 'post',
			success: function (response) {
				if(response.status == 200){
					Ext.Viewport.add(Ext.create('AOS.view.Statistics'));
				}
				else{
					Ext.Viewport.add(Ext.create('AOS.view.Login'));
				}
			},
			failure: function (response) {
				Ext.Viewport.add(Ext.create('AOS.view.Goals'));
			}
		});
		
	},

	onUpdated: function() {
		Ext.Msg.confirm(
			"Application Update",
			"This application has just successfully been updated to the latest version. Reload now?",
			function(buttonId) {
				if (buttonId === 'yes') {
					window.location.reload();
				}
			}
		);
	},

	buildMainMenu: function(){
		var menu = Ext.create('Ext.Menu');
		var helper = Ext.create('AOS.Helper');
		menu.add([
			{
				xtype: 'button',
				text: 'Statistics',
				iconCls: 'aos-icon-statistics',
				handler: function(){
					helper.fireEvent('switching','AOS.view.Statistics',{ type: 'slide', direction: 'up' });
					Ext.Viewport.toggleMenu('top');
				}
			},
			{
				xtype: 'button',
				text: 'Goals',
				iconCls: 'aos-icon-goals',
				handler: function(){
					helper.fireEvent('switching','AOS.view.Goals',{ type: 'slide', direction: 'up' });
					Ext.Viewport.toggleMenu('top');
				}
			},
			{
				xtype: 'button',
				text: 'Log Out',
				iconCls: 'aos-icon-logout',
				handler: function(){
					helper.fireEvent('logout');
					Ext.Viewport.toggleMenu('top');
				}
			}
		]);
		return menu;
	}
});
