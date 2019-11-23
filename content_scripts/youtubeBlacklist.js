
/**
 * Returns all nodes containing tag 'ytd-channel-name' in an associative Object:
 * {
 *  username: [...nodes],
 *  ...
 * }
 * @return usernames
 */
function getAllUsersOnPage() {
    let userDivs = document.getElementsByTagName("ytd-channel-name");
    let usernames = {};
    for (let i = 0; i < userDivs.length; i++) {
        let userDiv = userDivs[i];
        let username = userDiv.getElementsByTagName('yt-formatted-string')[0].title;
        if (!usernames.hasOwnProperty(username)) {
            usernames[username] = [];
        }
        usernames[username].push(userDiv)
    }
    return usernames;
}

/**
 * 
 * Look for the node containing the channel name
 * 
 */
function removeItemFromList(userdiv) {
    //Get parent corresponding to those ids (use content if items doesn't give any result)
    let listItems = userdiv.closest("#items");
    if (listItems == null) {
        listItems = userdiv.closest("#contents");
    }

    //Put all tagnames in a set
    let itemTagNames = new Set();
    listItems.childNodes.forEach(node => {
        itemTagNames.add(node.tagName);
    });

    //For each tagName, find the one that corresponds to our childnode
    itemTagNames.forEach(tagName => {
        let item = userdiv.closest(tagName);
        if (item != null) {
            console.log("Removed:", item)
            listItems.removeChild(item);
        }
    })
}

/**
 * Remove all nodes containing names from the blacklist 
 * 
 * @param {Array} blacklist 
 */
function removeBlackListedUsers(blacklist) {
    let users = getAllUsersOnPage();
    console.log(users)
    let usernames = Object.keys(users);

    usernames.forEach(username => {
        if (blacklist.includes(username)) {
            let divs = users[username];
            divs.forEach(div => {
                //Instead of only removing name, remove the node containing the channel name
                removeItemFromList(div);
            });
        }
    })
}

let blacklistedusers = ['EthosLab', 'The Infographics Show', 'Sardoche']

removeBlackListedUsers(blacklistedusers)