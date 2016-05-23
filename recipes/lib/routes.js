//we need to add a isClient statemenet here to make sure the login/logout routing works
//we can put the code inside he client folder but it makes more sense to have
//all the routing in the routes file.
if(Meteor.isClient){
  //check for redirects on login and logout
  Accounts.onLogin(function() {
    FlowRouter.go('recipe-book');
  });

  Accounts.onLogout(function() {
    FlowRouter.go('home');
  });
}

//add trigger for when no one is logged in get redirected to home pageview
FlowRouter.triggers.enter([function(context, redirect) {
  if(!Meteor.userId()) {
    FlowRouter.go('home');
  }
}]);

//this is a simple way to route between layouts in meteor
FlowRouter.route('/', {
  name: 'home',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('recipe-book');
    }
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout');
  }
});

//another way to simple route but passing in a specific template (line 13)
FlowRouter.route('/recipe-book', {
  name: 'recipe-book',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Recipes'});
  }
});

//we can also specify the id of an item to go to.
FlowRouter.route('/recipe/:id', {
  name: 'recipe',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'RecipeSingle'});
  }
});

//we can also specify the id of an item to go to.
FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Menu'});
  }
});

FlowRouter.route('/shopping-list', {
  name: 'shopping-list',
  action() {
    BlazeLayout.render('MainLayout', {main: 'ShoppingList'});
  }
});
