Ext.define('AOS.Helper', {
		extend: 'Ext.Component',
		xtype: 'aos-helper',
		singleton: true,
		viewCache: [],
		given_colors: {},
		color_count: 0,
		colors:[
			'rgba(200,0,0',
			'rgba(0,200,0',
			'rgba(0,0,200',
			'rgba(0,150,150',
			'rgba(150,0,150',
			'rgba(150,150,0',
			'rgba(200,75,0',
			'rgba(200,250,0',
			'rgba(0,250,200',
			'rgba(200,0,200',
			'rgba(150,250,150',
			'rgba(250,250,150',
			'rgba(100,0,0',
			'rgba(0,100,0',
			'rgba(0,0,100',
			'rgba(0,100,100',
			'rgba(100,0,100',
			'rgba(100,100,0',
			'rgba(0,0,0',
			'rgba(150,150,150'
		],
		getKeyColor: function(key,transparency){
			var t = ',1.0)';
			if(transparency){
				t = ','+transparency+')';
			}
			if(!this.given_colors[key]){
				this.given_colors[key] = this.colors[this.color_count++];
				if(this.color_count >= this.colors.length){
					this.color_count = 0;
				}
			}
			return this.given_colors[key]+t;
		},
		moveToSelection: function(list){
			if(list.getSelection()[0]){
				var store = list.getStore();
				selected = list.getSelection()[0];
				idx = store.indexOf(selected);
				els = list.getViewItems();

				if(idx > 1){
					el = els[idx-1];
					offset = Ext.get(el.getId()).dom.offsetTop;
					list.getScrollable().getScroller().scrollTo(0, offset);
				}
			}
		},
		switchTo: function(item,animation) {
			var view = AOS.Helper.createCachedView(item);
			Ext.Viewport.add(view);
			Ext.Viewport.animateActiveItem(view, animation);
		},
		createCachedView: function (item) {
			var name = item;
			var cache = this.viewCache;
			var cache_size = cache.length;
			/* Never more than 20 views created */
			var cache_limit = 20;
			var view, i, j, oldView;

			for (i = 0; i < cache_size; i++) {
				if (cache[i].viewName === name) {
					return cache[i];
				}
			}

			if (cache_size >= cache_limit) {
				for (i = 0, j = 0; i < cache_size; i++) {
					oldView = cache[i];
					if (!oldView.isPainted()) {
						oldView.destroy();
					} else {
						cache[j++] = oldView;
					}
				}
				cache.length = j;
			}

			view = Ext.create(name);
			view.viewName = name;
			cache.push(view);
			this.viewCache = cache;
			return view;
		},
		logOut: function(){
			var me = this;
			Ext.getStore('Goals').removeAll();
			Ext.getStore('Tasks').removeAll();
			Ext.getStore('Worklog').removeAll();
			Ext.Ajax.request({
				url: 'logout',
				method: 'post',
				success: function (response) {
					AOS.Helper.switchTo('AOS.view.Login',{ type: 'pop' });
				},
				failure: function (response) {
					Ext.Msg.alert('Error: '+response.status, 'Oops, something went wrong.', Ext.emptyFn);
					AOS.Helper.switchTo('AOS.view.Login',{ type: 'pop' });
				}
			});
		},
		purgeStore: function(store){
			Ext.getStore(store).removeAll();
			Ext.getStore(store).load();
		},
		refreshStore: function(store){
			Ext.getStore(store).load();
		},
		remove: function(what,where){
			what.erase({
				failure: function(){
					Ext.Msg.alert('Error', 'There was a problem with the removal.');
				},
				success: function(){
					Ext.getStore(where).remove(what);
				}
			});
		}
	});
