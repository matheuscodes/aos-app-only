Ext.define('AOS.form.Task',{
	extend: 'Ext.form.Panel',
	requires: ['Ext.field.Text','Ext.field.Hidden','Ext.form.FieldSet'],
	config:{
		/*listeners: {
		    '> field': {
		        change: function(field, newValue, oldValue) {
		            var who = this.parent.getRecord();
					if(who){
						who.set(field.getName(), newValue);
						console.log("test");
					}
		        }
		    }
		},*/
		items: [
			{
				xtype: 'hiddenfield',
				name: 'id'
			},
			{
				xtype: 'textfield',
				name: 'title',
				label: 'Title'
			},
			{
				xtype: 'textfield',
				name: 'initial',
				label: 'Initial'
			},
			{
				xtype: 'textfield',
				name: 'current',
				label: 'Current',
				readOnly: true
			},
			{
				xtype: 'textfield',
				name: 'target',
				label: 'Target'
			},
			{
				xtype: 'textfield',
				name: 'total_time_spent',
				label: 'Total Time Spent'
			}
		]
	}
});
