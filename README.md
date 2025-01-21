# OP.GG clone desktop app
## Developping
1. Install Rust
2. `npm install`
3. Create `.env` file and paste your riot api key as `RIOT_API_KEY`
4. `npm run tauri dev`

## TODOs
- Fallback icon for summoner icon or champion icon not found instead of alt text
- Fallback icon for item icon not found (should be clear that its a fallback icon)
- champion name on icon hover
- champion level in team.svelte
- rune icons in match.svelte
- get and display queue type in match.svelte
- maybe not display weird queue type matches with temporary items (buggy icons maybe?)
- cs per minute in team.svelte
- link to summoner page for each particpant in team.svelte

## Ideas
- display top recently played champion for a summoner
- display most mastery champion for summoner
- undo/redo to go back pages like on the web
