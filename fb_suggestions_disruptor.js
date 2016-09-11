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

// Is one more effective than another? No idea.
var REASONS_FOR_REMOVAL = {
   "I don't care about this":1, 
   "I keep seeing this":2, 
   "It's offensive or inappropriate":3, 
   "Other":4, 
   "I want to see something else":5
}

function current_style(element) {
   return element.currentStyle ? element.currentStyle : getComputedStyle(element, null);
}

Element.prototype.is_visible = function() {
   var node = this;
   while(node.tagName != 'BODY') {
      var node_style = current_style(node);
      if(node_style.display == "none" || node_style.visibility == "hidden") {
         return false;
      }
      node = node.parentNode;
   }
   return true;
}

function find_visible(elements) {
   var visible_elements = []
   elements.forEach(
      function(el) { if (el.is_visible()) { visible_elements.push(el); } }
   );
   return visible_elements;
}

function find_all_visible_from_selector(selector) {
   var all_found = document.querySelectorAll(selector);
   all_found = Array.prototype.slice.call(all_found,0);
   return find_visible(all_found);
}

function all_trending() {
   return find_all_visible_from_selector('[aria-label="Hide Trending Item"]');
}
function all_suggestions() {
   return find_all_visible_from_selector('[title="Remove"], [data-tooltip-content="Remove Suggestion"]');
}

/*
* Marks all trending news items as offensive, as the option seemingly most 
* likely(???) to eliminate future categories of news from showing up.
*/
function disrupt_trending_news() {
   var REASON = REASONS_FOR_REMOVAL["It's offensive or inappropriate"];
   
   function remove_trending_news() {
      var to_remove = all_trending();

      if (to_remove.length > 0) {
         to_remove.forEach(
            function(element) { element.click(); }
         );

         var rdio_nodes = document.querySelectorAll('[name="trending_hide_reason"]'); 
         rdios = Array.prototype.slice.call(rdio_nodes,0);
         rdios.forEach(
            function(rdio) { if (rdio.value == REASON) { rdio.click(); } }
         );
         
         setTimeout(remove_trending_news, 100); // TODO: improve this?
      }
   }

   // Extra trending news may be hidden, so first we click to unhide it
   // and wait for the result.
   var original_num_trending = all_trending().length;
   function trending_expanded_check() {
      if (all_trending().length == original_num_trending) {
         setTimeout(trending_expanded_check, 100);
      }
      else {
         remove_trending_news();
      }
   }
   
   var seemore = document.querySelector('[data-position="seemore"]');
   if (seemore && seemore.is_visible()) {
      seemore.click();
      trending_expanded_check();
   } else {
      remove_trending_news();
   }
}


/*
* Removes page and people suggestions
*/
function disrupt_suggestions() {
   var suggestion_removers = all_suggestions();
   if (suggestion_removers.length > 0) {
      suggestion_removers.forEach(
         function(element) { element.click(); }
      );
      setTimeout(disrupt_suggestions, 100);
   }
}

/******************* main **********************/

disrupt_trending_news();
disrupt_suggestions();
