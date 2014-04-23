Ext.define('AOS.view.Login', {
		extend: 'Ext.Panel',
		alias: 'widget.principal',
		requires: [	'Ext.form.FieldSet', 
					'Ext.field.Password', 
					'Ext.Label', 
					'Ext.Img', 
					'Ext.util.DelayedTask', 
					'Ext.Ajax', 
					'AOS.view.button.Logout'],
		config: {
			title: 'Login',
			items: [
				{
					xtype: 'titlebar',
					title: 'Login',
					docked: 'top'
				},
				{
					xtype: 'image',
					src: 'resources/images/AOSLogo.png',
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
						var password = me.down('#passwordTextField').getValue()
						//TODO make a hash.
						var hashed_password = password;
						if(user_name && password){
							Ext.Ajax.request({
								url: 'login',
								method: 'post',
								params: {
									user_name: user_name,
									hashed_password: hashed_password
								},
								success: function (response) {
									me.down('#loginErrorMessage').setHtml('');
									me.fireEvent('switching','AOS.view.Statistics',{ type: 'pop' });
								},
								failure: function (response) {
									me.fireEvent('error',"Login failed! "+response.statusText,me.down('#loginErrorMessage'));
								}
							});
						}
						else{
							me.fireEvent('error',"Username and password are required!",me.down('#loginErrorMessage'));
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
						this.parent.fireEvent('switching','AOS.view.Signup',{ type: 'slide', direction: 'left' });
					}
				},
				{
					xtype: 'button',
					itemId: 'forgotButton',
					ui: 'small',
					margin: '2%',
					text: 'Forgot password?',
					handler: function () {
						this.parent.fireEvent('switching','AOS.view.Forgot',{ type: 'slide', direction: 'left' });
					}
				}
			]
		}
	});
