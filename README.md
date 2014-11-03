AllmyLib<br />
========<br />

Allmystery-API JavaScript-Library.
jQuery > 1.9 is needed.
This library works asynchronous. 
Use it like:<br />
<br />
var TestingViewModel = (function() {<br />
    function TestingViewModel()<br />
    {<br />
        this.lib = new AllmyLib();<br />
    }<br />
    TestingViewModel.prototype.doLogin = function()<br />
    {<br />
        var username = $("#usernametextbox").val();<br />
        var password = $("#passwordtextbox").val();<br />
        this.lib.doneCallback = this.loggedIn;<br />
        this.lib.login(username,password);<br />
    }<br />
    TestingViewModel.prototype.loggedIn = function()<br />
    {<br />
        alert("Logged in!");<br />
    }<br />
    TestingViewModel.prototype.getThreads = function()<br />
    {<br />
        this.lib.doneCallback = this.gotThreads;<br />
        this.lib.getThreads("mg",0);<br />
    }<br />
    TestingViewModel.prototype.gotThreads = function(response)<br />
    {<br />
        var test = response;<br />
        alert(test.threads.length);<br />
    }<br />
    return TestingViewModel;<br />
})();<br />

