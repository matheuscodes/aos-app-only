Ext.define('AOS.view.Tasks', {
    extend: 'Ext.Container',
    requires: [	'AOS.store.Tasks',
				'AOS.model.Task',
				'AOS.form.Task',
				'Ext.dataview.List',
				'AOS.Helper',
				'AOS.view.bar.TopToolbar',
				'AOS.view.overlay.TaskOverlay'],
    config: {
        layout: 'fit',
        items: [
			{
				docked: 'top',
				title: 'Tasks',
				xtype:'aos-toolbar-toptoolbar'
			},
			{
		        xtype: 'list',
		        store: 'Tasks',
				itemId: 'list-display',
		        itemTpl:	'<table width="100%"><tr>'+
							'<td class="aos-title" width="100%">{name}</td>'+
							'<td class="aos-goal-status"><b>Initial</b><br/>{initial}</td>'+
							'<td class="aos-goal-status"><b>Current</b><br/>{current}</td>'+
							'<td class="aos-goal-status"><b>Target</b><br/>{target}</td>'+
							'<td class="aos-goal-status"><b>Progress</b><br/>{completion}%</td>'+
							'</tr></table>',
				grouped: true,
				listeners: {
					select: function(){
						this.parent.enableActions();
					}
				}
		    },
			{
				xtype: 'toolbar',
				ui: 'neutral',
				docked: 'bottom',
				scrollable: null,
				layout: {pack:'center'},
				items:[
					{
						disabled: true,
						itemId: 'task-edit',
						text: 'Edit',
						iconCls: 'aos-icon-details',
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								AOS.Helper.fireEvent('switching','AOS.form.Task',{ type: 'slide', direction: 'left' });
								Ext.Viewport.getActiveItem().setRecord(selected[0]);
							}
						}
					},
					{
						disabled: true,
						itemId: 'task-remove',
						text: 'Remove',
						iconCls: 'aos-icon-remove',
						disabled: true,
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								Ext.getStore('Tasks').remove(selected[0]);
								selected[0].erase();
								grandfather.disableActions();
							}
						}
					},
					{
						itemId: 'task-worklog',
						text: 'Log work',
						iconCls: 'aos-icon-worklog'
					}
				]
			}
		]/* too much network usage,
		listeners: {
		    show: function() {
		       Ext.getStore('Tasks').load();
		    }
		}*/
    },
	enableActions: function(){
		this.down('#task-edit').enable();
		this.down('#task-remove').enable();
	},
	disableActions: function(){
		this.down('#task-edit').disable();
		this.down('#task-remove').disable();
	}
});
