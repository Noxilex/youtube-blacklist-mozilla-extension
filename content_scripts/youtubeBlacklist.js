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

function removeItemFromList(userdiv) {
    let listItems = userdiv.closest("#items");
    if (listItems == null) {
        listItems = userdiv.closest("#contents");
    }
    let itemTagNames = new Set();
    listItems.childNodes.forEach(node => {
        itemTagNames.add(node.tagName);
    });
    itemTagNames.forEach(tagName => {
        let item = userdiv.closest(tagName);
        if (item != null) {
            console.log("Removed:", item)
            listItems.removeChild(item);
        }
    })
}

function removeBlackListedUsers(blacklist) {
    let users = getAllUsersOnPage();
    console.log(users)
    let usernames = Object.keys(users);

    usernames.forEach(username => {
        if (blacklist.includes(username)) {
            let divs = users[username];
            divs.forEach(div => {
                removeItemFromList(div);
            });
        }
    })
}

let blacklistedusers = ['EthosLab', 'The Infographics Show', 'Sardoche']

removeBlackListedUsers(blacklistedusers)