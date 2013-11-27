# Custom Styles for [Marked 2](http://marked2app.com)

Please feel free to fork and submit new styles! If you're not a Github user and you'd like to contribute, just [drop me a line](http://brettterpstra.com/contact/).

Please customize and include the contents of `header.css` in any submitted styles.

```css
/*
   This document has been created with Marked.app <http://marked2app.com>
   Please leave this notice in place, along with any additional credits below.
   ---------------------------------------------------------------
   Title: Your Style Title
   Author: Your Name <http://yoursite.com>
   Description: Short description
*/
```

## Screenshots

### Grump

![Grump Screenshot](http://ckyp.us/tRPi+)

*By Brett Terpstra*

### Using a Style

Just save the CSS file to your disk. You can open any Style in the list and then hit the "Raw" button to get a file ready for "Save to...". I suggest saving to `~/Library/Application Support/Marked/Custom CSS`, as in the near future Marked will read from that folder automatically. 

Then, open up the Style Preferences in Marked and click the "+" button under the Custom Styles list. Locate the file and select it. Now it will appear in your Styles dropdown selection and you can optionally make it the default window style.

Custom Styles are added to the keyboard menu under Command-Opt-#, where # is 1-9 in the order they're added.

### Creating a Style

I've been creating my styles with [Compass and Sass](http://compass-style.org/), with a document containing a full range of markup elements for testing. I just turn on `compass watch` and point Marked's Style to the output CSS file. Turn on "Track CSS Changes" under the Style list in Marked, and every time Compass compiles, Marked will update without refreshing the page (LiveReload-style injection). You can use whatever you like, including directly editing plain CSS.

The document markup hasn't changed between v1 and v2 of Marked, so the [original style guide](http://support.markedapp.com/kb/how-to-tips-and-tricks/writing-custom-css-for-marked) still applies. There are just a few things to worry about for full compatibility. Inverted styles, poetry mode and print settings. However, submissions that lack any of these are still accepted, as people can add their own if they need to.

The one thing your Style does need (aside from looking great in Marked), is the [header.css](https://github.com/ttscoff/MarkedCustomStyles/blob/master/header.css) information, customized to your Style. Just stick it at the top.

I prefer to Base 64 encode any custom fonts in order to make the Stylesheet a single-file download with no online requirements. If you can make it work other ways, I'm open to folder downloads, etc. Eventually I plan to create a bundle format for them.

Thanks, and I hope you'll consider sharing the custom styles you create, even if they're revisions and evolutions of existing styles!
