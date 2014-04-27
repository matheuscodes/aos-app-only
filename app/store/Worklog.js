Ext.define("AOS.store.Worklog", {
		extend: 'Ext.data.Store',
		requires: ['AOS.model.Work','Ext.data.proxy.Ajax'],
		alias: 'store.Worklog',
		config: {
		    sorters: {
				property: 'start',
				direction: 'DESC'
			},
			autoLoad: true,
			model: 'AOS.model.Work'			
		}
	});
