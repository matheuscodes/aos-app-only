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
				style: 'width:100%; height:33%; margin:2%;'
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
					var me = this.parent;
					var user_name = me.down('#userNameTextField').getValue();
					var password = me.down('#passwordTextField').getValue();
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
							},
							failure: function (response) {
								Ext.Msg.alert('Login failed!',response.status+': '+response.statusText);
							}
						});
					}
					else{
						Ext.Msg.alert('Error','Username and password are required!');
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
				text: 'Forgot password?',
				disabled: true,
				handler: function () {
					AOS.Helper.switchTo('AOS.view.Forgot',{ type: 'slide', direction: 'left' });
				}
			}
		]
	}
});
