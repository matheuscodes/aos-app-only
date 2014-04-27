Ext.define('AOS.view.Worklog', {
    extend: 'Ext.Container',
    requires: [	'AOS.store.Worklog',
				'AOS.model.Work',
				'Ext.dataview.List',
				'AOS.view.bar.TopToolbar'],
    config: {
        layout: 'fit',
        items: [
			{
				docked: 'top',
				title: 'Worklog',
				xtype:'aos-toolbar-toptoolbar'
			},
			{
		        xtype: 'list',
		        store: 'Worklog',
				itemId: 'list-display',
		        itemTpl: ' <table width="100%"><tr><td class="aos-title" width="100%">{start} {goal_title}<br/>{task_name}</td><td class="aos-goal-status"><b>Spent</b><br/>{time_spent} hours</td></tr></table>',
				listeners: {
					select: function() {
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
						itemId: 'goal-details',
						text: 'Details',
						iconCls: 'aos-icon-details',
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								if(!grandfather.overlay){
									grandfather.overlay = Ext.Viewport.add(Ext.create('AOS.view.goals.GoalDisplay'));
								}
								grandfather.overlay.popUp(selected[0]);
							}
						}
					},
					{
						disabled: true,
						itemId: 'goal-remove',
						text: 'Remove',
						iconCls: 'aos-icon-remove',
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								Ext.getStore('Goals').remove(selected[0]);
								selected[0].erase();
								grandfather.disableActions();
							}
						}
					},
					{
						disabled: true,
						itemId: 'goal-tasks',
						text: 'New Task',
						iconCls: 'aos-icon-tasks',
						align: 'left',
						handler: function(){
							var grandfather = this.parent.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								AOS.Helper.fireEvent('switching','AOS.form.Task',{ type: 'slide', direction: 'left' });
								Ext.Viewport.getActiveItem().setGoal(selected[0].get('id'),selected[0].get('title'));
							}
						}
					},
					{
						itemId: 'new-goal',
						text: 'New Goal',
						iconCls: 'aos-icon-new',
						handler: function(){
							AOS.Helper.fireEvent('switching','AOS.form.Goal',{ type: 'slide', direction: 'left' });
						}
					}
				]
			}
		]/*,
		listeners: {
		    show: function() {
		       Ext.getStore('Worklog').load();
		    }
		}*/
    },
	enableActions: function(){
		/*this.down('#goal-details').enable();
		this.down('#goal-remove').enable();
		this.down('#goal-tasks').enable();*/
	},
	disableActions: function(){
		/*this.down('#goal-details').disable();
		this.down('#goal-remove').disable();
		this.down('#goal-tasks').enable();*/
	}
});