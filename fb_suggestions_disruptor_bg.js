/*
* Facebook suggestions disruptor.
* Copyright © 2016 Avi Kelman <patcherton.fixesthings@gmail.com>
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

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
