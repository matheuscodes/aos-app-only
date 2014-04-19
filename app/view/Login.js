Ext.define('AOS.view.Login', {
		extend: 'Ext.Panel',
		alias: 'widget.general',
		requires: ['Ext.form.FieldSet', 'Ext.field.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],
		config: {
			title: 'Login',
			items: [
				{
					xtype: 'titlebar',
					title: 'Login',
					docked: 'top',
					items: [
						{
							xtype: 'button',
							text: 'Log Off',
							itemId: 'logOffButton',
							align: 'right'
						}
					]
				},
				{
					xtype: 'image',
					src: '/resources/images/AOSLogo.png',
					style: 'width:100%; height:33%; margin:2%;'
				},
				{
					xtype: 'label',
					id: 'loginErrorMessage',
					html: 'Login failed.',
					style: 'width:100%; text-align:center; color:#D44;',
					hidden: true,
					hideAnimation: 'fadeOut',
					showAnimation: 'fadeIn'
				},
				{	
					xtype:'fieldset',
					items:[
						{
							xtype: 'textfield',
							placeHolder: 'Username',
							itemId: 'userNameTextField',
							name: 'userNameTextField',
							required: true
						},
						{
							xtype: 'passwordfield',
							placeHolder: 'Password',
							itemId: 'passwordTextField',
							name: 'passwordTextField',
							required: true
						}
					]
				},
				{
					xtype: 'button',
					itemId: 'logInButton',
					ui: 'action',
					margin: '1%',
					text: 'Log In'
				},
				{
					xtype: 'button',
					itemId: 'signUpButton',
					ui: 'normal',
					margin: '1%',
					text: 'Sign Up'
				},
				{
					xtype: 'button',
					itemId: 'forgotButton',
					ui: 'small',
					margin: '2%',
					text: 'Forgot password?',
					action: 'forget'
				}
			],
			listeners: [
				{
					delegate: '#logInButton',
					event: 'tap',
					fn: 'onLogInButtonTap'
				},
				{
					delegate: '#signUpButton',
					event: 'tap',
					fn: 'onSignUpButtonTap'
				},
				{
					delegate: '#forgotButton',
					event: 'tap',
					fn: 'onForgotButtonTap'
				}
			]
		},

		onForgotButtonTap: function () {
			this.fireEvent('switching','AOS.view.Forgot',{ type: 'slide', direction: 'left' });
		},

		onSignUpButtonTap: function () {
			this.fireEvent('switching','AOS.view.Signup',{ type: 'slide', direction: 'left' });
		},

		onLogInButtonTap: function () {
			var user_name = this.down('#userNameTextField').getValue();
			var password = this.down('#passwordTextField').getValue()
			//TODO make a hash.
			var hashed_password = password;
			Ext.Ajax.request({
				url: '/signin',
				method: 'post',
				params: {
					user: user_name,
					pwd: hashed_password
				},
				success: function (response) {
					
				},
				failure: function (response) {
					
				}
			});
		}
	});
