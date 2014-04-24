Ext.define('AOS.view.Goals', {
    extend: 'Ext.Container',
    requires: [	'AOS.store.Goals',
				'AOS.model.Goal',
				'Ext.dataview.List',
				'AOS.view.bar.TopToolbar',
				'AOS.view.goals.GoalDisplay'],
    config: {
        layout: 'fit',
        items: [
			{
				docked: 'top',
				title: 'Goals',
				xtype:'aos-toolbar-toptoolbar'
			},
			{
		        xtype: 'list',
		        store: 'Goals',
				itemId: 'list-display',
		        itemTpl: ' <table width="100%"><tr><td class="aos-title" width="100%">{title}</td><td class="aos-goal-status"><b>Completed</b><br/>{completion}%</td><td class="aos-goal-status"><b>Spent</b><br/>{total_time_spent} hours</td><td class="aos-goal-status"><b>Dedication</b><br/>{dedication}%</td></tr></table>',
				listeners: {
					select: function() {
						var father = this.parent;
						father.down('#goal-details').enable();
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
						itemId: 'goal-tasks',
						iconCls: 'aos-icon-tasks'
					},
					{
						disabled: true,
						itemId: 'goal-remove',
						iconCls: 'aos-icon-remove'
					},
					{
						itemId: 'new-goal',
						iconCls: 'aos-icon-new'
					}
				]
			}
		],
		listeners: {
		    show: function() {
		       Ext.getStore('Goals').load();
		    }
		}
    }
});
