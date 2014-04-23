Ext.define("AOS.store.Goals", {
		extend: 'Ext.data.Store',
		requires: ['AOS.model.Goal','Ext.data.proxy.Ajax'],
		alias: 'store.Goals',
		config: {
		    sorters: {
				property: 'completion',
				direction: 'ASC'
			},
			autoLoad: true,
			model: 'AOS.model.Goal'			
		}
	});
