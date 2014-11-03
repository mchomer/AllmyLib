/**
 * Created by mchomer on 03.11.14.
 */
var TestingViewModel = (function() {
    function TestingViewModel()
    {
        this.lib = new AllmyLib();
    }
    TestingViewModel.prototype.doLogin = function()
    {
        var username = $("#usernametextbox").val();
        var password = $("#passwordtextbox").val();
        this.lib.doneCallback = this.loggedIn;
        this.lib.login(username,password);
    }
    TestingViewModel.prototype.loggedIn = function()
    {
        $("#getcategoriesbutton").prop("disabled",false);
        $("#getthreadsbutton").prop("disabled",false);
        $("#searchthreadbutton").prop("disabled",false);
        $("#getfriendsbutton").prop("disabled",false);
    }
    TestingViewModel.prototype.getCategories = function()
    {
        this.lib.doneCallback = this.gotCategories;
        this.lib.getCategories();
    }
    TestingViewModel.prototype.gotCategories = function(response)
    {
        alert(response.categories.length);
    }
    TestingViewModel.prototype.getThreads = function()
    {
        this.lib.doneCallback = this.gotThreads;
        this.lib.getThreads("mg",0);
    }
    TestingViewModel.prototype.gotThreads = function(response)
    {
        var test = response;
        alert(test.threads.length);
    }
    TestingViewModel.prototype.searchThread = function()
    {
        this.lib.doneCallback = this.gotThreads;
        var searchstring = $("#searchtext").val();
        this.lib.searchThreads(searchstring,0);
    }
    TestingViewModel.prototype.getFriends = function()
    {
        this.lib.doneCallback = this.gotFriends;
        alert(this.lib.Token);
        this.lib.getFriends();
    }
    TestingViewModel.prototype.gotFriends = function(response)
    {
        var test = response;
        alert(test.users.length);

    }
    return TestingViewModel;
})();
var testing = new TestingViewModel;


