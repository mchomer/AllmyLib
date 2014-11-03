/**
 * Created by mchomer
 * Version: 0.5 - BETA
 * Description: LittleLibrary to work with Allmystery-API.
 */
var AllmyLib = (function() {
    /**
     * Constructor.
     */
    function AllmyLib()
    {
        this.StartTopics = "0";
        this.BaseAddress = "https://api.allmystery.de";
        this.doneCallback = null;
    }
    /**
     * Builds Auth-Token from document.cookie.
     * @returns token {string}
     */
    AllmyLib.prototype.Token = function()
    {
        var value = "";
        try {
            var mycookie = document.cookie;
            value = mycookie.substr(mycookie.indexOf("=") + 1);
        } catch(e) {
            console.log(e);
        }
        return value;
    }
    /**
     * Tries to login and to get Auth-Token. If successful auth token will be set
     * to document.cookie.
     * @param username  Username.
     * @param password  Password.
     */
    AllmyLib.prototype.login = function(username,password)
    {
        this.Username = encodeURI(username);
        username = encodeURI(username);
        password = encodeURI(password);
        doneCallback = this.doneCallback;
        $.post(this.BaseAddress + "/login/",
            {
                username: username,
                password: password
            },
            this.loginDone
        ).onerror(function() { console.log("Login was not possible! Error in: AllmyLib.login().")});
    }
    /**
     * Must be called after AllmyLib.login(). Can not be called without AllmyLib.login().
     * @param response  Result of AllmyLib.login().
     */
    AllmyLib.prototype.loginDone = function(response)
    {
        try {
            if (response !== undefined && response.success === true) {
                document.cookie = "token=" + response.token;
                doneCallback();
            } else {
                console.log(response.error);
            }
        } catch(e) {
            console.log(e);
        }
        doneCallback = null;
    }
    /**
     * Must be called after any get or post-request.
     * @param response  Result of request.
     */
    AllmyLib.prototype.requestDone = function(response)
    {
        try {
            if (response !== undefined) {
                doneCallback(response);
            } else {
                console.log("Request was not successfully. Response = " + response);
            }
        } catch(e) {
            console.log(e);
        }
        doneCallback = null;
    }
    AllmyLib.prototype.getCategories = function()
    {
        var category = "";
        switch (this.StartTopics) {
            case "0":
                category = "/category/list";
                break;
            case "1":
                category = "/category/list?sort=desc";
                break;
            case "2":
                category = "/category/list_my";
                break;
            default:
                category = "/category/list";
                break;
        }
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + category,
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not get Categories. Error in: AllmyLib.getCategories().");
            });
    }
    AllmyLib.prototype.getThreads = function(category,offset)
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/category/" + category + "?offset=" + offset,
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not get Threads. Error in: AllmyLib.getThreads().");
            });
    }
    AllmyLib.prototype.searchThreads = function(searchstring,offset)
    {
        doneCallback = this.doneCallback;
        searchstring = encodeURI(searchstring);
        $.get(this.BaseAddress + "/category/search?query=" + searchstring + "&offset=" + offset,
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not search for Threads. Error in: AllmyLib.searchThreads().");
            });
    }
    AllmyLib.prototype.getFriends = function()
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/friends/",
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not get Friends. Error in: AllmyLib.getFriends().");
            });
    }
    AllmyLib.prototype.getConversations = function()
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/conversations/",
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not get Conversations. Error in: AllmyLib.getConversations().");
            });
    }
    AllmyLib.prototype.getSingleConversation = function(userid,offset)
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/conversation/" + userid + "?offset=" + offset,
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not get Single Conversation. Error in: AllmyLib.getSingleConversation().");
            });
    }
    AllmyLib.prototype.addFriend = function(userid)
    {
        doneCallback = this.doneCallback;
        $.post(this.BaseAddress + "/friends/",
            {
                add_friend: userid
            },
            this.requestDone
            ).onerror(function() {
                console.log("Can not add friend. Error in: AllmyLib.addFriend().");
            });
    }
    AllmyLib.prototype.removeFriend = function(userid)
    {
        doneCallback = this.doneCallback;
        $.post(this.BaseAddress + "/friends/",
            {
                remove_friend: userid
            },
            this.requestDone
            ).onerror(function() {
                console.log("Can not remove friend. Error in: AllmyLib.removeFriend().");
            });
    }
    AllmyLib.prototype.postMessage = function(userid,message)
    {
        doneCallback = this.doneCallback;
        message = encodeURI(message);
        $.post(this.BaseAddress + "/conversation/" + userid,
            {
                message: message
            },
            this.requestDone
            ).onerror(function() {
                console.log("Can not post Message. Error in: AllmyLib.postMessage().");
            });
    }
    AllmyLib.prototype.getSingleThread = function(threadid,offset)
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/thread/" + threadid + "?offset=" + offset,
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not get single Thread. Error in: AllmyLib.getSingleThread().");
            });
    }
    AllmyLib.prototype.createNewPost = function(threadid,text)
    {
        doneCallback = this.doneCallback;
        text = encodeURI(text);
        $.post(this.BaseAddress + "/thread/" + threadid,
            {
                text: text
            },
            this.requestDone
            ).onerror(function() {
                console.log("Can not create a new post. Error in: AllmyLib.createNewPost().");
            });
    }
    AllmyLib.prototype.createNewThread = function(category,title,text)
    {
        title = encodeURI(title);
        text = encodeURI(text);
        doneCallback = this.doneCallback;
        $.post(this.BaseAddress + "/thread/1",
            {
                cat: category,
                title: title,
                text: text
            },
            this.requestDone
            ).onerror(function() {
                console.log("Can not create a new thread. Error in: AllmyLib.createNewThread().");
            });
    }
    AllmyLib.prototype.getBookmarks = function(offset)
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/category/bookmarks?offset=" + offset,
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not get bookmarks. Error in: AllmyLib.getBookmarks().");
            });
    }
    AllmyLib.prototype.addBookmark = function(threadid)
    {
        doneCallback = this.doneCallback;
        $.post(this.BaseAddress + "/category/bookmarks",
            {
                add_thread: threadid
            },
            this.requestDone
            ).onerror(function() {
                console.log("Can not add a bookmark. Error in: AllmyLib.addBookmark().");
            });
    }
    AllmyLib.prototype.removeBookmark = function(threadid)
    {
        doneCallback = this.doneCallback;
        $.post(this.BaseAddress + "/category/bookmarks",
            {
                remove_thread: threadid
            },
            this.requestDone
            ).onerror(function() {
                console.log("Can not remove bookmark. Error in: AllmyLib.removeBookmark().");
            });
    }
    AllmyLib.prototype.getOnlineUsers = function()
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/online_users/",
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not get all online users. Error in: AllmyLib.getOnlineUsers().");
            });
    }
    AllmyLib.prototype.searchUsers = function(username)
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/search_users/" + username,
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not search for users. Error in: AllmyLib.searchUsers().");
            });
    }
    AllmyLib.prototype.logout = function()
    {
        doneCallback = this.doneCallback;
        $.get(this.BaseAddress + "/logout/",
            { token: this.Token() },
            this.requestDone).onerror(function() {
                console.log("Can not logout. Error in: AllmyLib.logout().");
            });
    }
    return AllmyLib;
})();
var doneCallback = null;
