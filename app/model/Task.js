Ext.define('AOS.model.Task', {
		extend: 'Ext.data.Model',
		requires: ['Ext.data.proxy.Rest'],
		config: {
		    fields: [
				'id','goal_id','name','initial','current','total_time_spent','completion','goal_title','target'
			],
			proxy:{
				type: 'rest',
				url:'tasks',
				reader:{
					type:'json',
					rootProperty:'tasks'
				}
			}
		}
	});
