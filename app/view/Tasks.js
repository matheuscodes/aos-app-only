Ext.define('AOS.view.Tasks', {
    extend: 'Ext.Container',
    requires: [	'AOS.store.Tasks',
				'AOS.model.Task',
				'AOS.form.Task',
				'AOS.form.Work',
				'Ext.dataview.List',
				'AOS.Helper',
				'AOS.view.bar.TopToolbar'],
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
						itemId: 'task-edit',
						ui: 'small',
						text: 'Edit',
						iconCls: 'aos-icon-details',
						disabled: true,
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
						ui: 'small',
						text: 'Remove',
						iconCls: 'aos-icon-remove',
						disabled: true,
						handler: function(){
							var grandfather = this.parent.parent;
							var list = grandfather.down('#list-display');
							var selected = list.getSelection();
							if(selected && selected.length > 0){
								var before = list.getScrollable().getScroller().position.y;
								Ext.getStore('Tasks').remove(selected[0]);
								selected[0].erase();
								Ext.getStore('Goals').load();
								Ext.getStore('Worklog').load();
								list.getScrollable().getScroller().scrollTo(0, before);
								grandfather.disableActions();
							}
						}
					},
					{
						itemId: 'task-worklog',
						ui: 'small',
						text: 'Log work',
						iconCls: 'aos-icon-worklog',
						disabled: true,
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								AOS.Helper.fireEvent('switching','AOS.form.Work',{ type: 'slide', direction: 'left' });
								Ext.Viewport.getActiveItem().setTask(selected[0].get('id'),selected[0].get('name'));
							}
						}
					}
				]
			}
		],
		listeners: {
			show: function() {
				//Ext.getStore('Tasks').load();
				var list = this.down('#list-display');
				if(list){
					AOS.Helper.moveToSelection(list);
				}
			}
		}
    },
	enableActions: function(){
		this.down('#task-edit').enable();
		this.down('#task-remove').enable();
		this.down('#task-worklog').enable();
	},
	disableActions: function(){
		this.down('#task-edit').disable();
		this.down('#task-remove').disable();
		this.down('#task-worklog').disable();
	}
});
