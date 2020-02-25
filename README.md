# Custom Styles for [Marked 2](http://marked2app.com)

Want a quick look at some of the current styles in this repository? [Browse the Examples page.](http://ttscoff.github.io/MarkedCustomStyles/generate_examples/index.html)

Please feel free to fork and submit new styles! If you're not a Github user and you'd like to contribute, just [drop me a line](http://brettterpstra.com/contact/).

Please customize and include the contents of `Header.css` in any submitted styles. The portion between the `---` borders should be in YAML format.

```css
/*
This document has been created with Marked.app <http://marked2app.com>
Content is property of the document author
Please leave this notice in place, along with any additional credits below.
---------------------------------------------------------------
Title: Your style title
Author: Your Name
URL: <your url>
Description: Description of theme
Fonts: (optional) [Rockwell, Rokkit, etc.]
Note: (optional) Additional notes, where to get custom fonts, etc.
---
*/
```

### Using a Style

Just save the CSS file to your disk. You can open any Style in the list and then hit the "Raw" button to get a file ready for "Save to...". I suggest saving to `~/Library/Application Support/Marked 2/Custom CSS`, as in the near future Marked will read from that folder automatically. 

Then, open up the Style Preferences in Marked and click the "+" button under the Custom Styles list. Locate the file and select it. Now it will appear in your Styles dropdown selection and you can optionally make it the default window style.

Custom Styles are added to the keyboard menu under Command-Opt-#, where # is 1-9 in the order they're added.

### Creating a Style

I've been creating my styles with [Compass and Sass](http://compass-style.org/), with a [document containing a full range of markup elements](https://raw.github.com/ttscoff/MarkedCustomStyles/master/test_markup.md) for testing. I just turn on `compass watch` and point Marked's Style to the output CSS file. Turn on "Track CSS Changes" under the Style list in Marked, and every time Compass compiles, Marked will update without refreshing the page (LiveReload-style injection). You can use whatever you like, including directly editing plain CSS.

The document markup hasn't changed between v1 and v2 of Marked, so the [original style guide](https://marked2app.com/help/Writing_Custom_CSS.html) still applies. There are just a few things to worry about for full compatibility. Inverted styles, poetry mode and print settings. However, submissions that lack any of these are still accepted, as people can add their own if they need to.

The one thing your Style does need (aside from looking great in Marked), is the [Header.css](https://github.com/ttscoff/MarkedCustomStyles/blob/master/Header.css) information, customized to your Style. Just stick it at the top.

I prefer to Base 64 encode any custom fonts in order to make the Stylesheet a single-file download with no online requirements. If you can make it work other ways, I'm open to folder downloads, etc. Eventually I plan to create a bundle format for them.

Thanks, and I hope you'll consider sharing the custom styles you create, even if they're revisions and evolutions of existing styles!
