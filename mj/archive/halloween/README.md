# Halloween (archived November 2026)

Not used by the site any more. Kept so it can come back next October.

- `costume.png`: Molly's costume (792 px wide, drawn at x 154, y -288 from her top-left corner).
- `spooky.jpg`: the night scene her room turned into while she wore it.

How it worked: tapping the pumpkin in her room toggled the costume on and off. While it was on,
the room background switched to `spooky.jpg`, the closet and photos were hidden, and she and the
pumpkin dropped to the bottom edge of the scene. The choice was saved in localStorage as `molly-costume`.

The full working version of the page is in git at commit `15e46eb`:

    git show 15e46eb:mj/index.html

To bring it back, restore that page's costume code and move these two files back to `mj/assets/`.
Now the pumpkin opens the feast game (`feast.html`) instead.
