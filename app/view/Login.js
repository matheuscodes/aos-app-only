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
 * First view of the system.
 */
Ext.define('AOS.view.Login', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Password',
		'Ext.Img',
		'Ext.Ajax',
		'AOS.Helper'
	],
	config: {
		title: 'Login',
		scrollable: 'vertical',
		items: [
			{
				xtype: 'titlebar',
				title: 'Login',
				docked: 'top',
				items:[
					{
						xtype:'button',
						ui: 'round',
						iconCls: 'aos-icon-information',
						align: 'right',
						handler: function(){
							AOS.Helper.switchTo('AOS.view.Information',{ type: 'slide', direction: 'left' });
						}
					}
				]
			},
			{
				xtype: 'image',
				src: 'resources/images/AOSLogo.png',
				style: 'width:100%; height:33%; margin:2%; min-width:300px; min-height:200px'
			},
			{
				xtype:'fieldset',
				items:[
					{
						xtype: 'textfield',
						placeHolder: 'Username',
						itemId: 'userNameTextField',
						maxLength: 13,
						required: true
					},
					{
						xtype: 'passwordfield',
						placeHolder: 'Password',
						itemId: 'passwordTextField',
						required: true
					}
				]
			},
			{
				xtype: 'button',
				itemId: 'logInButton',
				ui: 'action',
				margin: '1%',
				text: 'Log In',
				handler: function () {
					var me = this;
					me.setDisabled(true);
					var who = me.parent;
					var user_name = who.down('#userNameTextField').getValue();
					var password = who.down('#passwordTextField').getValue();
					var hashed_password = ""+CryptoJS.MD5(password);
					if(user_name && password){
						Ext.Ajax.request({
							url: 'login',
							method: 'post',
							params: {
								user_name: user_name,
								hashed_password: hashed_password
							},
							success: function (response) {
								AOS.Helper.purgeStore('Worklog');
								AOS.Helper.purgeStore('Tasks');
								AOS.Helper.purgeStore('Goals');
								AOS.Helper.switchTo('AOS.view.Statistics',{ type: 'pop' });
								me.setDisabled(false);
								
							},
							failure: function (response) {
								Ext.Msg.alert('Login failed!',response.status+': '+response.statusText);
								me.setDisabled(false);
							}
						});
					}
					else{
						Ext.Msg.alert('Error','Username and password are required!');
						me.setDisabled(false);
					}
				}
			},
			{
				xtype: 'button',
				itemId: 'signUpButton',
				ui: 'normal',
				margin: '1%',
				text: 'Sign Up',
				handler: function () {
					AOS.Helper.switchTo('AOS.view.Signup',{ type: 'slide', direction: 'left' });
				}
			},
			{
				xtype: 'button',
				itemId: 'forgotButton',
				ui: 'small',
				margin: '2%',
				text: 'Reset Password',
				disabled: false,
				handler: function () {
					var me = this;
					me.setDisabled(true);
					var who = me.parent;
					var user_name = who.down('#userNameTextField').getValue();
					if(user_name){
						Ext.Ajax.request({
							url: 'reset',
							method: 'post',
							params: {
								user_name: user_name
							},
							success: function (response) {
								Ext.Msg.alert('Success!','Check your email for the reset link!');
							},
							failure: function (response) {
								Ext.Msg.alert('Failed!',response.status+': '+response.statusText);
								me.setDisabled(false);
							}
						});
					}
					else{
						Ext.Msg.alert('Error','Please inform your username!');
						me.setDisabled(false);
					}
				}
			}
		]
	}
});
