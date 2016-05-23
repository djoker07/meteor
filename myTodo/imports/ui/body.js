import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import {Tasks} from '../api/tasks.js';

import './body.html';
import './task.js';

/*
a Reactive dict is an object but with built in reactivity
allowing to react depending on user input
*/
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

//create helper methods 
Template.body.helpers({
  
  
  tasks() {

  	//create helper code for the hide-completed checkbox
  	const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }

  	//else return all tasks
  	return Tasks.find({}, { sort: { createdAt: -1 } });
  },

  //return count of incompleted tasks
  incompleteCount() {
  	return Tasks.find({ checked: { $ne: true } }).count();
  },

});

//create event listener for the form
Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Meteor.call('tasks.insert', text);
 
    // Clear form
    target.text.value = '';
  },

  //event handler for the reactive dict
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

});
