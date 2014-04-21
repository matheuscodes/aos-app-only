Ext.define('AOS.controller.Principal', {
		extend: 'Ext.app.Controller',
		config: {
			viewCache: [],
			refs: {
				principal: 'principal'
			},
			control: {
				principal: {
					switching: 'showView',
					error: 'printError',
					logout: 'logOut'
				}
			}
		},

		createView: function (item) {
			var name = item;
			var cache = this.getViewCache();
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
			this.setViewCache(cache);
			return view;
		},

		showView: function(item,animation) {
			var view = this.createView(item);

			Ext.Viewport.add(view);
			Ext.Viewport.animateActiveItem(view, animation);			
		},

		printError: function(message,where){
			var error = where;
			error.hide();
			error.setHtml(message);
			error.show();
		},

		logOut: function(){
			var me = this;
			Ext.Ajax.request({
				url: 'logout',
				method: 'post',
				success: function (response) {
					me.showView('AOS.view.Login',{ type: 'pop' });
				},
				failure: function (response) {
					me.showView('AOS.view.Login',{ type: 'pop' });
				}
			});
		}

	});
