# OP.GG clone desktop app
## Developping
1. Install Rust
2. `npm install`
3. Create `.env` file and paste your riot api key as `RIOT_API_KEY`
4. `npm run tauri dev`

## TODOs
- different KDA text color if >2 >3 >4 etc.
- double kill pastille
- display vicory or loss
- display team name and victory/loss
- too many icons arent found
- make match fetching async in main.rs
- champion name on icon hover
- champion level in team.svelte
- get and display queue type in match.svelte
- maybe not display weird queue type matches with temporary items (buggy icons maybe?)
- link to summoner page for each particpant in team.svelte BUG

## Ideas
- display top recently played champion for a summoner
- display most mastery champion for summoner
- undo/redo to go back pages like on the web
