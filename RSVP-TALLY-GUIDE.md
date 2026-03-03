# Wedding RSVP Form — Tally.so Setup Guide

**Wedding:** Thea Spigarelli & Patrick Beal  
**Date:** April 29, 2026  
**Venue:** The Orion, Lindon, Utah

This guide is for creating the wedding RSVP form in [Tally.so](https://tally.so) and styling it to match the wedding website.

---

## Overview

We have **three events** with different RSVP requirements:

| Event | Who Can Attend | RSVP Required |
|-------|----------------|---------------|
| **Temple Sealing** (10:00 AM, Orem Utah Temple) | Invite only | Yes |
| **Family Luncheon** (1:00–3:00 PM, The Orion) | Invite only | Yes |
| **Evening Reception** (6:00–8:00 PM, The Orion) | All welcome | Yes (headcount) |

**Approach:** One Tally form with conditional logic. Invite-only guests enter a code (printed on their formal invitation) to see sealing and luncheon questions. Everyone sees the reception questions.

**Data needed:**
- **Sealing & Luncheon:** Full names of all attendees (required for temple and caterer)
- **Reception:** Headcount only — no names needed

---

## Color Guidelines

Match the wedding site’s palette so the RSVP form feels consistent.

### Light Mode (primary)

| Token | Hex | Use |
|-------|-----|-----|
| Background | `#F4C6CF` | Page/form background |
| Primary text | `#242241` | Body text, headings |
| Secondary text | `#4A1F3A` | Labels, muted text |
| Accent / Buttons | `#B0185C` | Buttons, links, CTAs |
| Constellation line | `#4A1F3A` | Borders, dividers |
| Constellation dot | `#E63A6E` | Dots, highlights |
| Star / Bright accent | `#FFFFFF` | Focus states, icons |

### Dark Mode (optional)

| Token | Hex | Use |
|-------|-----|-----|
| Background | `#242241` | Page background |
| Primary text | `#F4C6CF` | Body text |
| Secondary text | `#C16FA7` | Labels, muted text |
| Accent / Buttons | `#E63A6E` | Buttons, CTAs |
| Star accent | `#E6B65C` | Highlights |

### Tally Customization Notes

- Tally Pro allows **Custom CSS** and **remove branding** for closer matching.
- On the free plan, choose theme colors that are closest to the hex values above (e.g., accent `#B0185C`).
- For embeds: use **transparent background** so the form inherits the wedding site’s background.

### Fonts (reference)

- **Script/display:** Nickainley  
- **Body/serif:** Catchy Mager (or Georgia)

Tally’s free tier uses built-in fonts; Pro allows custom CSS for font overrides. Matching the palette is the main visual alignment.

---

## Form Structure

### Page 1: Invite Code

**Question type:** Short text (optional)

**Label:**
> Do you have an invitation code from your sealing or luncheon invitation?  
> *(Leave blank if you’re only attending the evening reception.)*

**Logic:**
- **If** answer **equals** `TheaPatrick2026` (or chosen code) → **Jump to page** → Page 2 (Sealing/Luncheon)
- **If** answer is **empty** or does **not equal** the code → **Jump to page** → Page 3 (Reception only)

Create two conditional logic blocks (or a single block with two conditions) so both paths are covered.

---

### Page 2: Sealing & Luncheon (invite-only)

**Question 1 — Sealing**
- Type: Multiple choice
- Label: *Will you be attending the temple sealing? (10:00 AM, Orem Utah Temple)*
- Options: `Yes` / `No`
- Required: Yes

**Question 2 — Luncheon**
- Type: Multiple choice
- Label: *Will you be attending the family luncheon? (1:00–3:00 PM, The Orion)*
- Options: `Yes` / `No`
- Required: Yes

**Question 3 — Names (for sealing/luncheon attendees)**
- Type: Long text
- Label: *Please list the full names of everyone in your party attending the sealing and/or luncheon*
- Required: Yes
- Captures all names for temple and caterer coordination

**Button:** Next → goes to Page 3 (Reception)

---

### Page 3: Reception (everyone)

**Question 1 — Attendance**
- Type: Multiple choice
- Label: *Will you be attending the evening reception? (6:00–8:00 PM, The Orion)*
- Options: `Yes` / `No`
- Required: Yes

**Question 2 — Party size** (show when "Yes")
- Type: Number
- Label: *How many people in your party will attend?*
- Required: Yes (when shown)
- Logic: Show only when reception answer = `Yes`
- No names needed—headcount only

**Question 3 — Email**
- Type: Email (optional)
- Label: *Email address*
- Helps with follow-up and confirmations

**Question 4 — Dietary / Notes** (optional)
- Type: Long text
- Label: *Dietary restrictions or other notes (optional)*

**Button:** Submit

---

### Page 4: Thank You

**Message:**
> Thank you! We’re so excited to celebrate with you. If you have any questions, reach out to us directly.

**Option A — Tally's built-in thank you:** Use the message above in a Thank you block.

**Option B — Redirect to thank-you page (recommended):** The wedding site includes `thank-you.html`. In Tally **Settings** → **Redirect**, set the URL to your full thank-you page (e.g. `https://yoursite.com/thank-you.html`). Guests will land on a branded thank-you page with a link back to the wedding site.

---

## Logic Flow Summary

```
Page 1: Invite code (optional)
    ↓
    ├─ Code correct → Page 2 (Sealing + Luncheon) → Page 3 (Reception) → Submit
    └─ Code blank/wrong → Page 3 (Reception only) → Submit
```

---

## Step-by-Step in Tally

### 1. Create the form
- Go to [tally.so](https://tally.so) and sign in
- Click **New form** → start blank or use the **Wedding RSVP** template
- Use `/page` to add new pages

### 2. Add Page 1
- Add a **Short text** block (`/short`)
- Make it optional (toggle off Required)
- Add **Logic** (`/logic` or Cmd/Ctrl + Shift + L):
  - Condition: answer equals `TheaPatrick2026`
  - Action: Jump to page → Page 2
- Add a second logic block:
  - Condition: answer is empty OR does not equal code
  - Action: Jump to page → Page 3

### 3. Add Page 2
- Sealing: multiple choice, Yes/No
- Luncheon: multiple choice, Yes/No
- **Names:** long text, required — *Please list the full names of everyone in your party attending the sealing and/or luncheon*
- Add **Next** button → Page 3

### 4. Add Page 3
- Reception: multiple choice, Yes/No
- Party size: number (show when reception = Yes) — headcount only, no names
- Email: email, optional
- Dietary/notes: long text, optional
- Add **Submit** button

### 5. Add Thank You
- **Option A:** Add Tally’s Thank you block with the message above
- **Option B:** In form **Settings** → **Redirect**, set the redirect URL to your thank-you page (e.g. `https://yoursite.com/thank-you.html`) so guests land on the wedding site’s thank-you page after submitting

### 6. Apply styling
- In form **Settings** → **Theme** / **Customize**
- Set colors to match the palette (see Color Guidelines above)
- If using Pro: add Custom CSS and/or remove Tally branding

### 7. Publish
- Click **Publish**
- Copy form URL and embed code
- Share embed code with the website owner for integration

---

## Thank You Page

A dedicated thank-you page (`thank-you.html`) is included in the wedding site. It displays a confirmation message and a link back to the main site. Configure Tally to redirect guests to this page after they submit their RSVP (use the full URL, e.g. `https://yoursite.com/thank-you.html`).

---

## Embedding on the Wedding Site

The RSVP section in `index.html` has a placeholder. Replace it with the Tally embed:

1. In Tally: **Share** → **Embed**
2. Choose **Standard embed** or **Popup**
3. Options to consider:
   - Transparent background
   - Dynamic height
   - Hide Tally branding (Pro)

4. Copy the embed snippet, which will look similar to:
```html
<script async src="https://tally.so/widgets/embed.js"></script>
<iframe data-tally-embed="https://tally.so/embed/XXXXXX" ...></iframe>
```

5. Replace the `zola-placeholder` div content in the RSVP section with this snippet.

---

## Invite Code

- **Suggested code:** `TheaPatrick2026` (or another easy-to-remember phrase)
- Print this code on the formal sealing/luncheon invitations
- Reception-only visitors leave the field blank and go straight to reception questions

---

## Checklist Before Launch

- [ ] Test with correct code → sees sealing, luncheon, and reception
- [ ] Test with wrong/blank code → sees only reception
- [ ] Confirm required fields behave correctly
- [ ] Colors align with wedding site palette
- [ ] Thank-you message and redirect (if used) are set
- [ ] Embed tested on the live wedding site
- [ ] Responses can be exported (Google Sheets, CSV, etc.) for headcount

---

## Questions?

Contact the couple (Thea & Patrick) for decisions on:
- Exact invite code
- Thank-you message wording
- Redirect behavior
- Any extra questions (e.g., meal choice for luncheon)
