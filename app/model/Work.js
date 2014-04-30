Ext.define('AOS.model.Work', {
		extend: 'Ext.data.Model',
		requires: ['Ext.data.proxy.Rest'],
		config: {
		    fields: [
				'id','goal_title','result','comment','task_id','task_name','time_spent','start','contribution'
			],
			proxy:{
				type: 'rest',
				url:'worklog',
				reader:{
					type:'json',
					rootProperty:'worklog'
				}
			}
		}
	});
