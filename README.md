# OP.GG clone desktop app
## Developping
1. Install Rust
2. `npm install`
3. Create `.env` file and paste your riot api key as `RIOT_API_KEY`
4. `npm run tauri dev`

## TODOs
### Style
- have a darker theme
- Fallback icon for summoner icon or champion icon not found instead of alt text
- Fallback icon for item icon not found (should be clear that its a fallback icon)
- matches lost/win appear in red/blue

### Logic
- make match fetching async in main.rs 1
- champion name on icon hover
- champion level in team.svelte
- rune icons in match.svelte
- get and display queue type in match.svelte
- maybe not display weird queue type matches with temporary items (buggy icons maybe?)
- cs per minute in team.svelte 2
- link to summoner page for each particpant in team.svelte

## Upgrades
### Easy
- instead of getter function in match.svelte just fetch the summoner participant object once and access it DONE
- componentize differently top players in home page and participants in team component in summoner page 

### Harder
- scuttle.rs function should maybe all return a serde_json::Value object
- main.rs function could return the value returned by scuttle plus a success boolean field
- propagate error message from scuttle to web console? If messages are too precise it could be a risk for security (API key divulgation)

## Ideas
- display top recently played champion for a summoner
- display most mastery champion for summoner
- undo/redo to go back pages like on the web
