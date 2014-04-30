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
		        itemTpl:	' <table width="100%">'+
							'<tr><td class="aos-date" width="100%">{start}</td>'+
							'<td class="aos-goal-status" rowspan="3"><b>Spent</b><br/>{time_spent} hours</td></tr>'+
							'<tr><td class="aos-normal" width="100%">{task_name}</td></tr>'+
							'<tr><td class="aos-small" width="100%">{goal_title}</td></tr>'+
							'</table>',
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
						itemId: 'work-details',
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
						itemId: 'work-remove',
						text: 'Remove',
						iconCls: 'aos-icon-remove',
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								Ext.getStore('Worklog').remove(selected[0]);
								selected[0].erase();
								Ext.getStore('Tasks').load();
								Ext.getStore('Goals').load();
								grandfather.disableActions();
							}
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
		this.down('#work-details').enable();
		this.down('#work-remove').enable();
	},
	disableActions: function(){
		this.down('#work-details').disable();
		this.down('#work-remove').disable();
	}
});
