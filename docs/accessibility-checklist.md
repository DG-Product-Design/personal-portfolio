# Manual accessibility validation

Run `yarn validate` first. Automated checks cannot determine whether the site is understandable, efficient, or comfortable to use, so complete this manual pass before each public release that changes navigation, layout, color, motion, or interactive behavior.

## Routes and viewports

Test the homepage, About page, Creative Studio, at least one other case study, and the 404 page at:

- 320 CSS pixels wide
- 400% browser zoom
- A desktop viewport
- Light and dark system color schemes where supported
- Reduced-motion mode

## Keyboard

- Start at the address bar and use only Tab, Shift+Tab, Enter, Space, and arrow keys.
- Confirm the skip link appears on focus and moves focus to the main content.
- Confirm focus order follows the visual and reading order without traps or unexpected jumps.
- Confirm every control in the Creative Studio demo can be reached and operated.
- Confirm focus indicators remain visible against every background.

## Screen reader

Test with VoiceOver on macOS and iOS; add NVDA with Firefox or Chrome when Windows is available.

- Navigate by landmarks and headings; confirm the page structure is concise and correctly nested.
- Navigate by links and controls; confirm every accessible name makes sense out of context.
- Confirm decorative images are skipped and meaningful images have useful alternatives.
- Operate the Creative Studio demo and confirm updates are announced once, at the right time, without reading decorative animation.
- Confirm the 404 page identifies the error and provides a clear route back to the work.

## Reflow and text

- At 400% zoom, confirm content reflows without horizontal scrolling except where a two-dimensional visual genuinely requires it.
- Increase text spacing and confirm content does not overlap, clip, or disappear.
- Check that headings, body copy, metadata, and controls remain legible over imagery.

## Motion, color, and media

- Confirm reduced-motion mode removes nonessential animation and does not hide information.
- Verify text, focus indicators, controls, and meaningful graphics meet WCAG AA contrast.
- Confirm information is never communicated by color alone.
- Check the embedded video title and keyboard access; verify captions on the source video.

## Release record

Record the date, browser and assistive-technology versions, routes tested, issues found, and follow-up owner in the release notes or pull request.
