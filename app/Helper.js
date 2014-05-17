/**
	Copyright (C) 2014  Matheus Borges Teixeira

	This is a part of Arkanos Organizer Suite (AOS) app.
	AOS is a web application for organizing personal goals.

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation, either version 3 of the
	License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

/**
 * Singleton Class for helping on basic repetitive operations.
 */
Ext.define('AOS.Helper', {
	extend: 'Ext.Component',
	xtype: 'aos-helper',
	singleton: true,

	/**
	 * Color Key
	 * This takes care of giving colors based on a key
	 */
	
	/* Object with the keys/colors already generated */
	given_colors: {},
	/* Count of key/color pairs */
	color_count: 0,
	/* Color table to loop into */
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
	/**
	 * Associates a colour to a key, or retrieve one already associated.
	 * 
	 * @param {String} Selected key
	 * @param {Number} Transparency level t from 0 to 1 (opaque)
	 * @return {String} Color in the format rgba(x,x,x,t)
	 */
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

	/**
	 * View Cache
	 * This manages the application views, limiting and reusing views.
	 * Current amount of views in the app is very low.
	 * This is just a safety net.
	 */

	/* Cache of views */
	viewCache: [],

	/**
	 * Move to another view using a given animation.
	 * 
	 * @param {String} View name to be created/used.
	 * @param {Object/Ext.fx.layout.Card} Selected animation.
	 */
	switchTo: function(item,animation) {
		var view = AOS.Helper.createCachedView(item);
		Ext.Viewport.add(view);
		Ext.Viewport.animateActiveItem(view, animation);
	},

	/**
	 * Search for the view inside the cache.
	 * It create if not found.
	 * 
	 * @param {String} Name of the view.
	 * @return {Object} View created or found.
	 */
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
					/* Garbage collection */
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

	/**
	 * Scrolls a list to the item it has selected.
	 * 
	 * @param {Object/Ext.dataview.List}
	 */
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

	/**
	 * Empties all stores and user authentication.
	 */
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

	/**
	 * Store Operations
	 * Some of the basic different actions to store.
	 * Maintains a reference for statistical update.
	 */

	/* Boolean indicating possibility of change */
	data_changed: false,
	
	/**
	 * Removes all elements of a store and loads them back.
	 * Marks possibility of change.
	 * 
	 * @param {String} Store name
	 */
	purgeStore: function(store){
		this.data_changed = true;
		Ext.getStore(store).removeAll();
		Ext.getStore(store).load();
	},

	/**
	 * Simply reloads a store.
	 * Marks possibility of change.
	 * 
	 * @param {String} Store name
	 */
	refreshStore: function(store){
		this.data_changed = true;
		Ext.getStore(store).load();
	},

	/**
	 * Removes an entry from a store.
	 * Marks possibility of change.
	 *
	 * @param {Object/Ext.data.Record} Object to be removed.
	 * @param {String} Store from where it needs to be removed.
	 */
	remove: function(what,where){
		var me = this;
		what.erase({
			failure: function(){
				Ext.Msg.alert('Error', 'There was a problem with the removal.');
			},, with additional things
			success: function(){
				me.data_changed = true;
				Ext.getStore(where).remove(what);
			}
		});
	},

	/**
	 * Encapsulates the change reference.
	 */
	hasDataChanged: function(){
		return this.data_changed;
	},

	/**
	 * Encapsulates the change reference.
	 */
	clearDataChanged: function(){
		this.data_changed = false;
	},

	/**
	 * Simple HTML printer for getting a string along with a given icon.
	 * This is used to save code on the instructions.
	 *
	 * Important: this uses brute-force to overwrite Sencha CSSs
	 * EXTREME VOLATILE.
	 */
	wrapInIcon: function(icon,what){
		var result =	'<div class="x-tab" style="z-index: inherit;overflow: inherit;background-color: inherit;border: inherit;min-width: inherit;">'+
						what+ '<span class="x-button-icon '+icon+'" '+
						'style="top: inherit;right: inherit;bottom: inherit;left: 0.5em;text-align: inherit;position: inherit; font-size: inherit;">'+
						'</span></div>';
		return result
	}
});
