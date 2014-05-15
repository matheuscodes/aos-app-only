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
							'<td class="aos-goal-status" rowspan="4"><b>Spent</b><br/>{time_spent} hours</td></tr>'+
							'<tr><td class="aos-normal" width="100%">{task_name}</td></tr>'+
							'<tr><td class="aos-small" width="100%">{comment}</td></tr>'+
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
						itemId: 'work-remove',
						ui: 'small',
						text: 'Remove',
						iconCls: 'aos-icon-remove',
						handler: function(){
							var grandfather = this.parent.parent;
							var list = grandfather.down('#list-display');
							var selected = list.getSelection();
							if(selected && selected.length > 0){
								var before = list.getScrollable().getScroller().position.y;
								AOS.Helper.remove(selected[0],'Worklog');
								AOS.Helper.refreshStore('Tasks');
								AOS.Helper.refreshStore('Goals');
								list.getScrollable().getScroller().scrollTo(0, before);
								grandfather.disableActions();
							}
						}
					}
				]
			}
		]
    },
	enableActions: function(){
		this.down('#work-remove').enable();
	},
	disableActions: function(){
		this.down('#work-remove').disable();
	}
});
