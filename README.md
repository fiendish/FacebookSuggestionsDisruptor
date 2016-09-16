# FacebookSuggestionsDisruptor
Functions for making Facebook slightly less obnoxious to look at.

This does not hide elements from the DOM.
It tries to interact with remove buttons to indicate offense or dislike for all suggestions.
This is definitely the long way around, but the goal here is signaling to the system instead 
of just hiding things with the hope that it sends you fewer suggestions in the future.

This is also a bit of an experiment, and after a while it gets kind of tough to test because once it starts working you get fewer and fewer opportunities for it to do anything (because Facebook stops showing trending news and page suggestions).

To make up for that there's also a manual trigger:`Ctrl+Shift+D (D for Disrupt!)`
