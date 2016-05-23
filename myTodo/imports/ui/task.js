import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';

//define helper to check ownership of task
Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

//event listener for the delete/done task template
Template.task.events({

	//call method to check completion of tasks	
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);

  },
  //call method to delete task
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },

  //call method to set tasks private
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});