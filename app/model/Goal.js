Ext.define('AOS.model.Goal', {
		extend: 'Ext.data.Model',
		requires: ['Ext.data.proxy.Rest'],
		config: {
		    fields: [
				'id','title','time_planned','description','completion','dedication','total_time_spent'
			],
			proxy:{
				type: 'rest',
				url:'goals',
				reader:{
					type:'json',
					rootProperty:'goals'
				}
			}
		}
	});
