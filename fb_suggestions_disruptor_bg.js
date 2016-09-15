function do_disrupt() {
    // tabs.executeScript only runs on *.facebook.com/ because of manifest permissions
    chrome.tabs.executeScript(null,{file:"fb_suggestions_disruptor.js"});
}

/* Facebook loads content with AJAX so you need this to re-run on clicking the Home link */
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    do_disrupt();
});

/* manual */
chrome.commands.onCommand.addListener(function(command) {
    if (command == "fb-suggestions-disrupt") {
      do_disrupt();
   }
});
