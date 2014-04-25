Ext.define("AOS.store.Tasks", {
		extend: 'Ext.data.Store',
		requires: ['AOS.model.Task','Ext.data.proxy.Ajax'],
		alias: 'store.Tasks',
		config: {
		    sorters: {
				property: 'id',
				direction: 'ASC'
			},
			grouper: function(record) {
		        return record.get('goal_title');
		    },
			autoLoad: true,
			model: 'AOS.model.Task'	
		}
	});
