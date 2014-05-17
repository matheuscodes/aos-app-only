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
 * Model for a Work entry from API /worklog/*
 */
Ext.define('AOS.model.Work', {
	extend: 'Ext.data.Model',
	requires: ['Ext.data.proxy.Rest'],
	config: {
		fields: [
			'id',
			'goal_title',
			'result',
			'comment',
			'task_id',
			'task_name',
			'time_spent',
			'start',
			'contribution'
		],
		proxy:{
			type: 'rest',
			url:'worklog',
			reader:{
				type:'json',
				rootProperty:'worklog'
			}
		}
	}
});
