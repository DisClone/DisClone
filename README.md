# Disclone



OVERVIEW

Disclone is a Discord clone.  The dev team built Disclone to learn React, Redux, and Web Sockets. All the while strengthening skills in SQL, Express, Node, CSS, and HTML5.

Disclone allows users to engage in private chats with friends, or in group chats through personal chat channels.

MAIN TECHNOLOGIES

<ul>
  <li>React</li>
  <li>Redux</li>
  <li>Web Sockets</li>
  <li>PostgreSQL</li>
</ul>

## SITE STRUCTURE

Disclone was created using React components. We also used redux to make data management cleaner.  Below you can see the different components outlined from a site screenshot.  

<img src='/public/img/components.png' />

## LOG IN / LOG OUT

Disclone has built in login/logout functionality.  It remembers if you are logged in even after closing the browser!  The login we created can be seen below.

<img src='/public/img/discord_landing.png'/>

## Friends List

Users all get a friends list, where they can select a friend and start a private chat with them.  Individual conversations are all saved to a database so chats can be pulled up at any time.  The chat features of the site were built using websockets.   

<img src='/public/img/FriendsList.png'/>

## Private Chat

An example of what a private chat looks like.

<img src='/public/img/privatechat.png'/>

## Group Chat

Disclone also has built in groups each with their own chat channels.  Everyone who is a member of a group can view and post in it's channels.  

<img src='/public/img/groupchat.png'/>

## DATABASE

The workhorse of Disclone is it's backend.  In addition to keeping track of user, channel, and group information it also:

<ul>
  <li>Deterimines which messages belong to each chat channel</li>
  <li>Stores all messages from all chats on the site</li>
  <li>Figures out who belongs on each users friends list</li>
</ul>

## DISCLAIMER

Disclone is a non-commercial student project meant to mimic some of Discord's features and look.  Disclone is not affiliated with Discord and claims no rights or ownership of any of Discord's trademarks or copyrighted works.

Discord's offical site can be found here: <a href='https://discordapp.com/'>Discord</a>
