Ext.define('AOS.view.Tasks', {
    extend: 'Ext.Container',
    requires: [	'AOS.store.Tasks',
				'AOS.model.Task',
				'Ext.dataview.List',
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
							'<td class="aos-title" width="100%">{title}</td>'+
							'<td class="aos-goal-status"><b>Initial</b><br/>{initial}</td>'+
							'<td class="aos-goal-status"><b>Current</b><br/>{current}</td>'+
							'<td class="aos-goal-status"><b>Target</b><br/>{target}</td>'+
							'<td class="aos-goal-status"><b>Progress</b><br/>{completion}%</td>'+
							'</tr></table>',
				grouped: true,
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
									grandfather.overlay = Ext.Viewport.add(Ext.create('AOS.view.overlay.TaskOverlay'));
								}
								grandfather.overlay.popUp(selected[0]);
							}
						}
					},
					{
						disabled: true,
						itemId: 'goal-tasks',
						iconCls: 'aos-icon-tasks',
						text: 'New'
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
		       Ext.getStore('Tasks').load();
		    }
		}
    }
});
