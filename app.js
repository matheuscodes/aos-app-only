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
 * Sencha Application
 */
Ext.application({
	name: 'AOS',

	requires: [
		'Ext.MessageBox','Ext.Ajax','Ext.Menu','Ext.Button','AOS.Helper'
	],

	views: [
		'Login','Forgot','Signup','Statistics','Goals','Tasks','Worklog'
	],

	stores: [
		'Goals','Tasks','Worklog'
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

	/**
	 * Application launch.
	 */
	launch: function() {
		/* Destroy the #appLoadingIndicator element */
		Ext.fly('appLoadingIndicator').destroy();

		/* Initialize the main menu */
		Ext.Viewport.setMenu(this.buildMainMenu(),{side:'top',cover:true});

		/* Try to login and initialize the main view */
		Ext.Ajax.request({
			url: 'login',
			method: 'POST',
			success: function (response) {
				if(response.status == 200){
					AOS.Helper.purgeStore('Worklog');
					AOS.Helper.purgeStore('Tasks');
					AOS.Helper.purgeStore('Goals');
					Ext.Viewport.add(Ext.create('AOS.view.Statistics'));
				}
				else{
					Ext.Viewport.add(Ext.create('AOS.view.Login'));
				}
			},
			failure: function (response) {
				Ext.Viewport.add(Ext.create('AOS.view.Login'));
			}
		});
		
	},
	
	/**
	 * Application update pop up.
	 */
	onUpdated: function() {
		Ext.Msg.confirm(
			"New AOS available",
			"AOS has just successfully been updated to the latest version. Reload now?",
			function(buttonId) {
				if (buttonId === 'yes') {
					window.location.reload();
				}
			}
		);
	},

	/**
	 * Modularized function for building the top menu.
	 */
	buildMainMenu: function(){
		var menu = Ext.create('Ext.Menu');
		menu.add([
			{
				xtype: 'button',
				text: 'Statistics',
				iconCls: 'aos-icon-statistics',
				handler: function(){
					AOS.Helper.switchTo('AOS.view.Statistics',{ type: 'slide', direction: 'up' });
					Ext.Viewport.toggleMenu('top');
				}
			},
			{
				xtype: 'button',
				text: 'Goals',
				iconCls: 'aos-icon-goals',
				handler: function(){
					AOS.Helper.switchTo('AOS.view.Goals',{ type: 'slide', direction: 'up' });
					Ext.Viewport.toggleMenu('top');
				}
			},
			{
				xtype: 'button',
				text: 'Tasks',
				iconCls: 'aos-icon-tasks',
				handler: function(){
					AOS.Helper.switchTo('AOS.view.Tasks',{ type: 'slide', direction: 'up' });
					Ext.Viewport.toggleMenu('top');
				}
			},
			{
				xtype: 'button',
				text: 'Worklog',
				iconCls: 'aos-icon-worklog',
				handler: function(){
					AOS.Helper.switchTo('AOS.view.Worklog',{ type: 'slide', direction: 'up' });
					Ext.Viewport.toggleMenu('top');
				}
			},
			{
				xtype: 'button',
				text: 'Log Out',
				iconCls: 'aos-icon-logout',
				handler: function(){
					AOS.Helper.logOut();
					Ext.Viewport.toggleMenu('top');
				}
			}
		]);
		return menu;
	}
});
