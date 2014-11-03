AllmyLib
========

Allmystery-API JavaScript-Library.
jQuery > 1.9 is needed.
This library works asynchronous. 
Use it like:

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
        alert("Logged in!");
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
    return TestingViewModel;
})();

