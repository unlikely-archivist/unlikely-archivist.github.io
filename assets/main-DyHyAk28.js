(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();function a(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function x(e){const t=document.getElementById("toast");if(!t)return;const s=t.querySelector(".toast-msg");s&&(s.textContent=e),t.classList.add("is-visible"),window.clearTimeout(Number(t.dataset.timer||0));const r=window.setTimeout(()=>t.classList.remove("is-visible"),2800);t.dataset.timer=String(r)}async function B(e,t="Copied to clipboard"){try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(e);else{const s=document.createElement("textarea");s.value=e,s.style.position="fixed",s.style.opacity="0",document.body.appendChild(s),s.select(),document.execCommand("copy"),document.body.removeChild(s)}x(t)}catch{x("Copy failed. Use montgomery.k.eryn@gmail.com")}}function W(e){e.innerHTML=`
    <div class="container hero-grid">
      <div class="hero-copy">
        <h1 class="hero-title">
          Property master. <em>I also build software.</em>
        </h1>

        <div class="hero-prose">
          <p>
            I’m an IATSE Local 478 member, and I run <a href="props.html" class="inline-link">prop departments</a> for film and TV, on shows and movies for Netflix, Hulu, Amazon Prime, Paramount+, and Universal. Between shows I build software: a client app for a photographer, a newsletter about dead websites, and a pile of small browser tools. I’m available for prop work and tech roles, full-time or contract.
          </p>
        </div>

        <div class="hero-actions">
          <a class="btn btn-primary" href="props.html">Prop work</a>
          <a class="btn btn-outline" href="tech.html">Tech work</a>
          <button class="btn btn-ghost" type="button" id="hero-copy-email">
            Copy Email
          </button>
        </div>
      </div>

      <div class="hero-plate-wrap portrait">
        <div class="clip">
          <img class="portrait-img" src="media/eryn-portrait-anim.gif" alt="Eryn Montgomery" width="378" height="500" fetchpriority="high">
        </div>
        <div class="frame"></div>
      </div>
    </div>

    <div class="container">
      <div class="proof-ledger" aria-label="Verified career metrics">
        <div class="proof-cell">
          <span class="proof-num">25</span>
          <span class="proof-label">Film &amp; TV Productions</span>
        </div>
        <div class="proof-cell">
          <span class="proof-num">~1,000</span>
          <span class="proof-label">Props Tracked on One Show</span>
        </div>
        <div class="proof-cell">
          <span class="proof-num">3 Projects</span>
          <span class="proof-label">In Real Use</span>
        </div>
        <div class="proof-cell">
          <span class="proof-num">Live</span>
          <span class="proof-label">Demos You Can Click</span>
        </div>
      </div>
    </div>
  `;const t=e.querySelector(".portrait-img");if(t)if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)t.src="media/eryn-portrait-still.png";else{const s=()=>{window.setTimeout(()=>{t.src="media/eryn-portrait-end.png"},4900)};t.complete?s():t.addEventListener("load",s,{once:!0})}e.querySelector("#hero-copy-email")?.addEventListener("click",()=>{B("montgomery.k.eryn@gmail.com","Email copied: montgomery.k.eryn@gmail.com")})}const M=[{id:"client-tracker",catalog:"SYS · 01",title:"Client Tracker",subtitle:"A client-management app for photographers, encrypted on the phone and working offline.",category:"Client Work · Security · Offline PWA",year:"2026",stack:["JavaScript","WebCrypto AES-GCM","PBKDF2 (600k)","HKDF","Cloudflare Workers","KV","Offline PWA"],lead:"Bookings, deposits, contracts, late-cancel fees, and delivery deadlines on one phone. I built it custom for a working photographer. Records are encrypted before they’re saved, so not even I can read them.",problemTitle:"The Problem",problem:"Client records are sensitive, and standard SaaS CRMs store them readable on someone else’s server. The requirement was simple and unforgiving: bookings, deposits, and cancellation fees that work reliably offline on a phone, with no account to compromise and no plaintext ever leaving the device.",systemTitle:"The Architecture",system:"All records encrypt client-side via WebCrypto AES-GCM before hitting storage. The data key is wrapped twice, once by the user’s passcode (PBKDF2, 600,000 rounds) and once by a recovery key (HKDF), so a forgotten passcode loses nothing. Backup address and write token both derive from the recovery key; the Cloudflare Worker sees only ciphertext, stores only the token’s SHA-256 hash, returns 404 on mismatch, enforces a strict CSP and 10 MB cap, and retains daily snapshots for 60 days.",pipeline:["Passcode / Recovery Key","PBKDF2 · 600k rounds","AES-GCM Encrypt on Phone","IndexedDB Offline Store","SHA-256 Auth Ciphertext Backup"],metrics:[{label:"Who Can Read It",value:"Only You"},{label:"Works Offline",value:"Yes"},{label:"Backups Kept",value:"60 Days"}],links:[{label:"Launch Live Demo",href:"https://erynmontgomery.com/client-tracker/",primary:!0}],demoNote:"Wedding-photographer studio demo with sample data · Passcode: 123456",mediaType:"phone",images:[{src:"media/screens/client-tracker-home.webp",alt:"Client Tracker schedule on a phone, with upcoming bookings flagged for missing deposits and contracts",caption:"Demo schedule flagging unpaid deposits and unsigned contracts before shoot day."}],simulator:"crypto"},{id:"ripurl",catalog:"SYS · 02",title:"RIP · URL",subtitle:"A weekly obituary for dead websites that researches, writes, and fact-checks itself.",category:"Autonomous Publication · AI Writing with Fact-Checks",year:"2026",stack:["TypeScript","Deno","Val Town","Claude Opus","Wikidata + Wayback","GitHub Actions"],lead:"No human checks it before it publishes, so the pipeline has to prove every site is really dead and every claim is sourced, and skip the issue when the evidence is thin.",problemTitle:"The Risk",problem:"An unsupervised AI writer will happily eulogize a company that is still alive. My 11-issue pilot did it three times: oracle.com, cranberries.com, and saban.com. Meanwhile a Wikipedia API bug silently truncated sources to a single paragraph. For a publication about real companies, “usually right” ruins credibility.",systemTitle:"The Architecture",system:"I rebuilt it as a staged TypeScript state machine with five progressive gates, cheapest first: domain-to-company match, documented history, web presence, live HTTP liveness probe, and at least one year of Internet Archive captures. Unsure counts as alive. Claude Opus writes strictly from fetched primary sources, a separate fact-check pass audits every draft, flagged claims trigger surgical revisions, and GitHub Actions runs Deno regression tests, including the three pilot failures, on every push.",pipeline:["Wikidata Pull","5 Liveness Gates","Primary Evidence","Archive Capture","Claude Opus Draft","Fact Audit Pass","Sunday Publish"],metrics:[{label:"Checks Before Writing",value:"5"},{label:"Publishes",value:"Sundays"},{label:"Tested",value:"Every Update"}],links:[{label:"Read RIP · URL",href:"https://ripurl.val.run",primary:!0},{label:"How It Works",href:"https://ripurl.val.run/about"},{label:"GitHub Source",href:"https://github.com/unlikely-archivist/ripurl"}],mediaType:"browser",images:[{src:"media/screens/ripurl-home.webp",alt:"RIP · URL front page showing Issue 9 obituary for musicblvd.com",caption:"Issue 9: musicblvd.com, found, checked, and written by the pipeline on its own."}],simulator:"gates"},{id:"crierbaby",catalog:"SYS · 03",title:"crierbaby",subtitle:"A photo scheduler for Bluesky that writes its own captions and waits for your approval.",category:"Automation · Vision AI · Cloudflare Workers",year:"2026",stack:["JavaScript","Cloudflare Workers","D1 SQLite","KV","Vision AI","Bluesky API","node:test"],lead:"Feed it photos, describe how you talk, and approve a batch every few weeks. A vision model drafts captions and alt text, spaces out look-alike photos, catches repeated phrases, and posts on schedule. Nothing posts without approval.",problemTitle:"The Failure Modes",problem:"Posting daily is monotonous, but automating a live account carries two irreversible mistakes: publishing a post nobody approved, or double-posting when a network reply drops mid-flight.",systemTitle:"The Architecture",system:"Before posting, the Worker atomically claims the row with a conditional D1 SQL update so cron runs and manual taps cannot collide. If Bluesky’s response is lost, retries re-upload the photos and search recent posts by content ID (never by caption, since short captions like ✨ repeat), capping at 3 tries. PIN checks compare fixed-length digests with 429 rate-limiting after 5 misses. node:test covers retries, daylight-saving schedules, look-alike spacing, and rate limits.",pipeline:["Photo Stash","Vision Draft + Alt","Repeat & Similarity Check","Human Batch Approval","Atomic SQL Claim","CID-Checked Post"],metrics:[{label:"Posts Without Approval",value:"None"},{label:"Double Posts",value:"Checked For"},{label:"Retries",value:"Up to 3"}],links:[{label:"Explore on GitHub",href:"https://github.com/unlikely-archivist/crierbaby",primary:!0},{label:"Read Retry Tests",href:"https://github.com/unlikely-archivist/crierbaby/blob/main/test/bluesky.test.js"}],mediaType:"phone-trio",images:[{src:"media/crierbaby/crierbaby-queue.webp",alt:"Queue of upcoming posts with approve, delete, and reroll buttons",caption:"01 · Batch queue: approve, reroll, or hold"},{src:"media/crierbaby/crierbaby-edit-post.webp",alt:"Editing a post with alternative AI-written captions to choose from",caption:"02 · Pick from vision-generated caption variants"},{src:"media/crierbaby/crierbaby-caption-writer.webp",alt:"Caption writer screen with plain-language voice instructions",caption:"03 · Set tone and rules in plain language"}],simulator:"retry"}],R=[{id:"props-breakdown",catalog:"ARC · 04",title:"props-breakdown",category:"ai",categoryLabel:"AI & Pipelines",kicker:"Claude Code Skill · Film Production · Python",lead:"Breaks down a screenplay the way I did as a property master: every prop, including implied ones, by scene with printed-line page counts in eighths.",detail:"Blind test with the answer key written first: 35/35 with the skill, 33/35 without. Any tag that doesn’t match the script word for word fails the build.",stack:["Python","Claude Code Skill","Strict Text Verification"],customVisual:"breakdown",metric:"Skill",links:[]},{id:"mj-atlas",catalog:"ARC · 05",title:"Midjourney Behavioral Atlas",category:"research",categoryLabel:"Research & Scripts",kicker:"Research Tooling · Val Town · Claude Vision",lead:"Tools for studying an image model nobody can see inside, built from a research proposal I wrote.",detail:"A userscript logs every generation; a blind comparison tool hides the settings until you’ve judged each pair. Data collection is built; the analysis stage is next.",stack:["Userscript","Val Town","Claude Vision","Cloudinary"],image:"media/screens/srefdecoder-library.webp",imageAlt:"SREF Decoder library of decoded Midjourney style references",metric:"Research",links:[{label:"Browse SREF Library",href:"https://unlikelyarchivist--6ea86dc674ed11f1a66b1607ee4eb77e.web.val.run/library",primary:!0}]},{id:"motionsheet",catalog:"ARC · 06",title:"motionsheet",category:"ai",categoryLabel:"AI & Pipelines",kicker:"Python CLI · pytest · Claude Code Skill",lead:"Turns video into “motion contact sheets” so AI models that can’t watch video can still see what moved.",detail:"Three moments stack as red, green, and blue, so anything that moved shows color. In a small pilot, Claude went from 3/8 to 7/8 correct.",stack:["Python","pytest","RGB Temporal Encoding","Claude Skill"],image:"media/screens/motionsheet.webp",imageAlt:"Motion contact sheet where moving UI elements appear in red, green, and blue",metric:"Open Source",links:[{label:"GitHub Repo",href:"https://github.com/unlikely-archivist/motionsheet",primary:!0}]},{id:"flatpack",catalog:"ARC · 07",title:"Flatpack",category:"research",categoryLabel:"Research & Scripts",kicker:"Obsidian · Templater · JavaScript",lead:"Exports an Obsidian vault as one document, with each embedded note included once.",detail:"Repeats become a pointer back to the first copy. My vault: 104,000 lines with the usual plugin, 9,700 with Flatpack.",stack:["JavaScript","Obsidian Templater","Regex"],customVisual:"flatpack",metric:"Open Source",links:[{label:"GitHub Repo",href:"https://github.com/unlikely-archivist/Flatpack",primary:!0}]},{id:"planet-planet",catalog:"ARC · 09",title:"Planet-Planet",category:"generative",categoryLabel:"Generative & Audio",kicker:"Generative World · Python · spaCy · three.js",lead:"A planet whose population, weather, and news grow out of my other website.",detail:"A crawler counts the site’s nouns into a census; an LLM writes the news, and drafts that mention websites get rewritten.",stack:["Python","Playwright","spaCy","three.js","LLM API"],image:"media/screens/planet-planet.webp",imageAlt:"Planet-Planet low-poly globe surrounded by census bars, weather report, and almanac",metric:"Live",links:[{label:"Visit Planet-Planet",href:"https://planet-planet.neocities.org/",primary:!0}]},{id:"fume-lab",catalog:"ARC · 10",title:"Fume Lab",category:"generative",categoryLabel:"Generative & Audio",kicker:"Web App · Val Town · Claude API",lead:"A perfume designer I built for a friend, around the 36 plants in her garden.",detail:"Balance top, heart, and base notes, design the bottle, and get an AI-written recipe.",stack:["Val Town","Claude API","Interactive UI"],image:"media/screens/fume-lab.webp",imageAlt:"Fume Lab apothecary interface listing 36 plants and 50 notes",metric:"Live",links:[{label:"Open Fume Lab",href:"https://unlikelyarchivist--01a17a0df9dd76b3b4ba92175fefd5cc.web.val.run",primary:!0}]},{id:"image-degrader",catalog:"ARC · 12",title:"Image Degrader",category:"canvas",categoryLabel:"Browser Canvas Tools",kicker:"Pixel Engine · Zero Libraries · Canvas 2D",lead:"Rots an image with real destructive passes, not a filter overlay.",detail:"Resampling, dithered color reduction, chroma bleed, and repeated JPEG re-encoding, all in the browser.",stack:["JavaScript","Canvas 2D","YCbCr Math","Bayer Dithering"],image:"media/screens/image-degrader.webp",imageAlt:"Image Degrader interface showing real destructive pixel passes and sliders",metric:"Live",links:[{label:"Open Tool",href:"https://bloodnbinary.neocities.org/tools/image-degrader/",primary:!0}]},{id:"palette-maker",catalog:"ARC · 13",title:"Palette Maker",category:"canvas",categoryLabel:"Browser Canvas Tools",kicker:"Color Engineering · Zero Libraries · Canvas 2D",lead:"Pulls palettes from photos, merges near-duplicates, and checks WCAG contrast.",detail:"Exports CSS, JSON, PNG, or SVG. Nothing is uploaded.",stack:["JavaScript","Canvas 2D","WCAG Contrast Math"],image:"media/screens/palette-maker.webp",imageAlt:"Palette Maker extracting colors from a photograph with WCAG contrast checker",metric:"Live",links:[{label:"Open Tool",href:"https://bloodnbinary.neocities.org/tools/color-palette/",primary:!0}]},{id:"button-maker",catalog:"ARC · 14",title:"88×31 Button Maker",category:"canvas",categoryLabel:"Browser Canvas Tools",kicker:"Pixel Typography · Custom GIF Quantizer",lead:"Makes the tiny animated web buttons of the early internet.",detail:"About 50 controls, 9 bitmap fonts, undo, and GIF export through its own color quantizer.",stack:["JavaScript","Canvas 2D","Custom GIF Quantizer"],image:"media/screens/button-maker.webp",imageAlt:"88x31 Button Maker controls, bitmap presets, and zoomed pixel preview",metric:"Live",links:[{label:"Open Tool",href:"https://bloodnbinary.neocities.org/tools/button-maker/",primary:!0}]},{id:"pattern-fixer",catalog:"ARC · 15",title:"Pattern Fixer",category:"canvas",categoryLabel:"Browser Canvas Tools",kicker:"Tile Inspector · Seam Repair · Canvas 2D",lead:"Previews a tile as a page background and repairs the seams.",detail:"Finds where the image really repeats, then crossfades, crops, or mirrors it.",stack:["JavaScript","Canvas 2D","Repeat Detection"],image:"media/screens/pattern-fixer.webp",imageAlt:"Pattern Fixer tiling an image to inspect and repair seams",metric:"Live",links:[{label:"Open Tool",href:"https://bloodnbinary.neocities.org/tools/pattern-fixer/",primary:!0}]},{id:"harmoniq",catalog:"ARC · 08",title:"Harmoniq",category:"generative",categoryLabel:"Generative & Audio",kicker:"Audio Signal Processing · FastAPI · Optimization",lead:"Reorders playlists so every song’s outro flows harmonically and rhythmically into the next song’s intro.",detail:"Audio analysis written from scratch (key, tempo, timbre), exact ordering for small playlists and simulated annealing for big ones, crossfade previews, and 13 pytest tests.",stack:["Python","FastAPI","Held-Karp DP","ffmpeg","pytest"],metric:"Local App",links:[]}],D=[{name:"Spyfall Agent Harness",domain:"Multi-Agent Sandbox",stack:"Python · Claude Code Hooks · Codex · unittest",summary:"Four isolated AI players (2 Claude Code, 2 Codex) play social deduction; PreToolUse hook jails each agent to its folder and one submit command; turn-order state machine; 34 unittest tests; one full game completed.",status:"Experiment"},{name:"Shortcut Exorcist",domain:"Browser Drill Game",stack:"JavaScript · Pure State Machine · node:test",summary:"Drills 20 macOS keyboard shortcuts with state logic cleanly separated from the DOM, strict CSV deck parsing, and canonical key-combo normalization.",status:"Prototype"},{name:"congregation-count",domain:"Privacy Analytics",stack:"Val Town · SQLite",summary:"Cookie-free funnel analytics for Cyborg Cathedral & New Mercy: referer gating, salted IP hashes, event allowlists, retry-safe daily email digests, and rate-limited stats UI (5 tries/hr).",status:"Live"},{name:"bloodnbinary-poster",domain:"Cross-Platform Scheduler",stack:"Val Town · Tumblr OAuth · Bluesky · Neocities",summary:"Upload once to Neocities, draft AI captions gated behind human approval, and publish on schedule to Tumblr (with automatic OAuth token renewal) and Bluesky.",status:"Built"},{name:"Project Tracker API",domain:"Custom GPT Backend",stack:"Hono · Val Town · REST",summary:"Full CRUD REST API with API-key authentication and strict 400/401/404/409 semantics powering a Custom GPT Actions backend.",status:"Built"},{name:"darkroom + nm-eye",domain:"Archival Ingestion",stack:"Val Town · Cloudinary · GPT-4o-mini",summary:"Browser uploader that crops and stamps catalog IDs below each New Mercy frame, paired with batch vision critique of up to 60 images per call.",status:"Built"},{name:"eryn-dashboard & lanternbridge",domain:"Personal Ops + Auth",stack:"Val Town · OAuth · RS256 WebCrypto JWT",summary:"Personal pipeline/to-do/iCal hub with OAuth + bearer-token API for Claude, plus a Google Sheets bridge signing RS256 service-account JWTs via WebCrypto.",status:"Built"},{name:"Userscripts (scarecrow, slugger, yt-transcraper)",domain:"Browser Automation",stack:"JavaScript · Shadow DOM · MutationObserver",summary:"scarecrow blurs AI-labeled Pinterest pins (27-assertion sandbox harness; live Pinterest check pending); slugger injects a Shadow DOM snippet palette into React inputs; yt-transcraper refuses partial YouTube transcripts.",status:"Built"},{name:"Print Pipelines & Line-Art Converter",domain:"Print / Image DSP",stack:"Python · XDoG · Zhang-Suen · Local GUI",summary:"KDP coloring-book compiler with spine math, ink/white-ratio checks, and checksummed packaging, plus an XDoG + Zhang-Suen uniform-stroke line-art converter.",status:"Local tool"},{name:"Lantern, gatecrash & litany",domain:"Curators & Planners",stack:"Node/Groq · Python/SQLite · GitHub Actions",summary:"Lantern harvests public-domain archives with 8+ LLM curation and model rotation; gatecrash classifies open art calls’ AI policies without clobbering manual reviews; litany is a single-lock SQLite planner with persisted undo journal.",status:"Built"},{name:"Untitled System & ctrl-exorcise",domain:"Theme & Game Dev",stack:"VS Code Theme · Godot 4 / GDScript",summary:"VS Code color theme with a build validator enforcing WCAG 4.5:1 on 10 pairs and 100% token documentation, plus an in-progress Godot 4 shortcut-training game.",status:"In progress"}];function E(e){return Array.from(e,t=>t.toString(16).padStart(2,"0")).join("")}function G(e){let t="";for(let s=0;s<e.length;s+=1)t+=String.fromCharCode(e[s]);return btoa(t)}async function U(e,t){const s=performance.now(),r=new TextEncoder,o=crypto.getRandomValues(new Uint8Array(16)),i=crypto.getRandomValues(new Uint8Array(12)),l=await crypto.subtle.importKey("raw",r.encode(t),"PBKDF2",!1,["deriveKey"]),n=await crypto.subtle.deriveKey({name:"PBKDF2",salt:o,iterations:1e5,hash:"SHA-256"},l,{name:"AES-GCM",length:256},!1,["encrypt"]),d=r.encode(e),p=await crypto.subtle.encrypt({name:"AES-GCM",iv:i},n,d),m=new Uint8Array(p),u=r.encode(`backup-token:${t}:${E(o.slice(0,4))}`),y=await crypto.subtle.digest("SHA-256",u),g=E(new Uint8Array(y));return{saltHex:E(o),ivHex:E(i),ciphertextB64:G(m),tokenHashHex:g,elapsedMs:Math.max(1,Math.round(performance.now()-s)),bytes:m.byteLength}}const $=[{id:"musicblvd",domain:"musicblvd.com",company:"Music Boulevard (N2K Inc.)",note:"Issue 9 · Genuinely defunct early online music retailer",domainMatchesCompany:!0,hasDocumentedHistory:!0,livedOnWeb:!0,liveHttpCheck:"nxdomain",waybackSpanMonths:42},{id:"oracle",domain:"oracle.com",company:"JD Edwards (Wikidata dissolved entry)",note:"Pilot Regression #1 · Wikidata points dissolved firm to living parent",domainMatchesCompany:!1,hasDocumentedHistory:!0,livedOnWeb:!0,liveHttpCheck:"live_200",waybackSpanMonths:300},{id:"cranberries",domain:"cranberries.com",company:"The Cranberries (Wikidata ended band)",note:"Pilot Regression #2 · Bot wall / live official archive site",domainMatchesCompany:!0,hasDocumentedHistory:!0,livedOnWeb:!0,liveHttpCheck:"bot_wall_403",waybackSpanMonths:240},{id:"saban",domain:"saban.com",company:"Saban Entertainment (dissolved 2002)",note:"Pilot Regression #3 · Active corporate redirect still online",domainMatchesCompany:!0,hasDocumentedHistory:!0,livedOnWeb:!0,liveHttpCheck:"active_redirect",waybackSpanMonths:190},{id:"timeout-edge",domain:"flicker-example.org",company:"Unresponsive Edge Host",note:"Edge Case · Network timeout triggers Unsure = Alive",domainMatchesCompany:!0,hasDocumentedHistory:!0,livedOnWeb:!0,liveHttpCheck:"timeout",waybackSpanMonths:36}];function V(e){const t=[];let s=null;const r=(n,d,p,m,u)=>s!==null?(t.push({gate:n,name:d,status:"skipped",reason:"Halted at earlier gate (fail-fast)."}),!1):p?(t.push({gate:n,name:d,status:"pass",reason:m}),!0):(s=n,t.push({gate:n,name:d,status:"fail",reason:u}),!1);r(1,"Domain ↔ Entity Match",e.domainMatchesCompany,`“${e.domain}” maps directly to ${e.company}.`,`Mismatch: “${e.domain}” belongs to a different active parent entity, not ${e.company}.`),r(2,"Documented History",e.hasDocumentedHistory,"Full primary article & provenance verified (no 1-paragraph truncation).","Insufficient primary documentation to write without padding."),r(3,"Historical Web Presence",e.livedOnWeb,"Confirmed real public web presence prior to shutdown.","No verifiable proof this domain operated as an active public site.");const o=e.liveHttpCheck==="nxdomain"||e.liveHttpCheck==="dead_410",i={nxdomain:"NXDOMAIN / no live host serving content. Confirmed dead.",dead_410:"Explicit HTTP 410 Gone with no active takeover. Confirmed dead.",live_200:"DISQUALIFIED: HTTP 200 OK. Site is alive. A living website never gets an obituary.",bot_wall_403:"DISQUALIFIED (Unsure = Alive): HTTP 403 / Bot wall detected; unreadable pages count as alive.",active_redirect:"DISQUALIFIED (Unsure = Alive): Redirects to an active corporate host.",timeout:"DISQUALIFIED (Unsure = Alive): Request timed out; uncertainty always halts publication."};r(4,"Live HTTP Liveness Probe",o,i[e.liveHttpCheck],i[e.liveHttpCheck]),r(5,"Wayback Archive Span (≥ 12 mo)",e.waybackSpanMonths>=12,`${e.waybackSpanMonths} months of clean Wayback captures available for evidence & screenshot.`,`Only ${e.waybackSpanMonths} months archived (< 12 month minimum).`);const l=s===null;return{candidate:e,admitted:l,verdict:l?"ADMIT_FOR_OBITUARY":"DISQUALIFY_ALIVE_OR_UNSURE",steps:t,haltedAtGate:s}}const L=[{id:"dropped-reply",label:"Dropped Bluesky Reply",summary:"Post succeeds remotely, but the HTTP reply times out before Cloudflare Worker receives it.",steps:[{tag:"SQL CLAIM",title:"Conditional D1 row lock",detail:"UPDATE posts SET status = 'posting' WHERE id = ? AND status = 'approved'. 1 row claimed.",state:"ok"},{tag:"NETWORK",title:"POST to Bluesky times out",detail:"Remote server actually published the post, but the response dropped in transit.",state:"warn"},{tag:"CID CHECK",title:"Retry checks recent posts by photo CID",detail:"Re-uploads photo blob to compute deterministic CID; inspects recent feed instead of matching captions like “✨”.",state:"guard"},{tag:"SAFE EXIT",title:"Existing post found → marked sent",detail:"Worker records the existing post and exits instead of posting it again.",state:"ok"}]},{id:"race",label:"Cron + Manual Tap Race",summary:"The scheduled run fires at the same moment the user taps “Post now”.",steps:[{tag:"WORKER A",title:"Cron tick claims post row",detail:"Conditional D1 update changes status from approved → posting (1 row changed).",state:"ok"},{tag:"WORKER B",title:"Manual tap attempts same update",detail:'WHERE status = "approved" matches 0 rows. Execution halts immediately.',state:"guard"},{tag:"RESULT",title:"Posted once",detail:"Only Worker A contacts Bluesky. No race condition, no duplicate post.",state:"ok"}]}];function q(e){if(e.mediaType==="phone"){const s=e.images[0];return`
      <div class="flagship-media flagship-media-phone">
        <div class="device-frame device-phone">
          <div class="device-notch" aria-hidden="true"></div>
          <button type="button" class="lightbox-trigger" data-lightbox-src="${s.src}" data-lightbox-alt="${a(s.alt)}" data-lightbox-caption="${a(s.caption)}">
            <img src="${s.src}" alt="${a(s.alt)}" width="390" height="844" loading="lazy">
          </button>
        </div>
        <p class="media-caption">${a(s.caption)}</p>
      </div>
    `}if(e.mediaType==="phone-trio")return`
      <div class="flagship-media flagship-media-trio" data-trio="${e.id}">
        <div class="device-frame device-phone">
          <div class="device-notch" aria-hidden="true"></div>
          <button type="button" class="lightbox-trigger" data-trio-trigger data-lightbox-src="${e.images[0].src}" data-lightbox-alt="${a(e.images[0].alt)}" data-lightbox-caption="${a(e.images[0].caption)}">
            <img data-trio-img src="${e.images[0].src}" alt="${a(e.images[0].alt)}" width="390" height="844" loading="lazy">
          </button>
        </div>
        <div class="trio-controls" role="tablist" aria-label="crierbaby mobile screens">
          ${e.images.map((s,r)=>`
            <button type="button" role="tab" class="trio-btn${r===0?" is-active":""}" aria-selected="${r===0}" data-trio-idx="${r}">
              ${a(s.caption)}
            </button>
          `).join("")}
        </div>
      </div>
    `;const t=e.images[0];return`
    <div class="flagship-media flagship-media-browser">
      <div class="device-frame device-browser">
        <div class="browser-chrome" aria-hidden="true">
          <span></span><span></span><span></span>
          <span class="browser-url">ripurl.val.run</span>
        </div>
        <button type="button" class="lightbox-trigger" data-lightbox-src="${t.src}" data-lightbox-alt="${a(t.alt)}" data-lightbox-caption="${a(t.caption)}">
          <img src="${t.src}" alt="${a(t.alt)}" width="1280" height="800" loading="lazy">
        </button>
      </div>
      <p class="media-caption">${a(t.caption)}</p>
    </div>
  `}function _(e){return e.simulator==="crypto"?`
      <div class="sim-box" data-sim="crypto">
        <div class="sim-head">
          <span class="mono-badge">Try it: lock a sample record</span>
          <span class="sim-sub">Runs natively in your browser via <code>window.crypto.subtle</code> (live: 100k rounds · prod: 600k rounds)</span>
        </div>
        <div class="crypto-inputs">
          <label class="sim-field">
            <span>Client record (plaintext on phone)</span>
            <input type="text" id="crypto-plaintext" name="crypto-plaintext" value="Castillo Family · Wedding 11/22 · Deposit $1,200 paid">
          </label>
          <label class="sim-field sim-field-sm">
            <span>Passcode</span>
            <input type="text" id="crypto-passcode" name="crypto-passcode" value="123456" maxlength="24">
          </label>
          <button type="button" class="btn btn-primary btn-sm" id="crypto-run-btn">Encrypt Locally</button>
        </div>
        <div class="crypto-output" id="crypto-output" aria-live="polite">
          <div class="crypto-row">
            <span class="crypto-key">Server Receives</span>
            <code class="crypto-val crypto-cipher" id="out-cipher">Computing real WebCrypto ciphertext…</code>
          </div>
          <div class="crypto-meta-grid">
            <div><span class="crypto-key">Salt (128-bit)</span><code id="out-salt">—</code></div>
            <div><span class="crypto-key">GCM IV (96-bit)</span><code id="out-iv">—</code></div>
            <div><span class="crypto-key">Write-Token SHA-256 (Stored on Worker)</span><code id="out-hash">—</code></div>
            <div><span class="crypto-key">Metrics</span><code id="out-stats">—</code></div>
          </div>
        </div>
      </div>
    `:e.simulator==="gates"?`
      <div class="sim-box" data-sim="gates">
        <div class="sim-head">
          <span class="mono-badge">Try it: check whether a site is really gone</span>
          <span class="sim-sub">Test Issue 9 alongside the 3 living domains that broke the unattended pilot</span>
        </div>
        <div class="gate-selector" role="tablist" aria-label="Choose candidate domain">
          ${$.map((t,s)=>`
            <button type="button" role="tab" class="gate-pill${s===1?" is-active":""}" aria-selected="${s===1}" data-gate-id="${t.id}">
              ${a(t.domain)}
            </button>
          `).join("")}
        </div>
        <div id="gate-result-mount" aria-live="polite"></div>
      </div>
    `:`
    <div class="sim-box" data-sim="retry">
      <div class="sim-head">
        <span class="mono-badge">Try it: what happens when a post’s reply gets lost</span>
        <span class="sim-sub">Inspect how crierbaby prevents double-posting and preserves human approval</span>
      </div>
      <div class="gate-selector" role="tablist" aria-label="Choose failure scenario">
        ${L.map((t,s)=>`
          <button type="button" role="tab" class="gate-pill${s===0?" is-active":""}" aria-selected="${s===0}" data-retry-idx="${s}">
            ${a(t.label)}
          </button>
        `).join("")}
      </div>
      <div id="retry-result-mount" aria-live="polite"></div>
    </div>
  `}function K(e){e.innerHTML=`
    <div class="container">
      <header class="chapter-header">
        <div class="chapter-index">MAIN PROJECTS</div>
        <div class="chapter-title-row">
          <h2>My three <em>biggest projects.</em></h2>
          <p class="chapter-desc">
            A client app, a newsletter, and a photo scheduler. Open <strong>Try the logic</strong> on any of them to see how it handles things going wrong.
          </p>
        </div>
      </header>

      <div class="flagship-list">
        ${M.map(n=>`
          <article class="flagship-card" id="project-${n.id}">
            <div class="flagship-body">
              <div class="flagship-info">
                <h3 class="flagship-title">${a(n.title)}</h3>
                <p class="flagship-subtitle">${a(n.subtitle)}</p>


                  <p class="flagship-lead">${a(n.lead)}</p>

                  <details class="flagship-more">
                    <summary>How it works</summary>
                  <div class="story-split">
                    <div class="story-col">
                      <h4>${a(n.problemTitle)}</h4>
                      <p>${a(n.problem)}</p>
                    </div>
                    <div class="story-col">
                      <h4>${a(n.systemTitle)}</h4>
                      <p>${a(n.system)}</p>
                    </div>
                  </div>

                  <div class="pipeline-strip" aria-label="${a(n.title)} pipeline">
                    ${n.pipeline.map((d,p)=>`${p>0?'<span class="pipe-arrow" aria-hidden="true">→</span>':""}<span class="pipe-node">${a(d)}</span>`).join("")}
                  </div>

                  <div class="stack-row">
                    ${n.stack.map(d=>`<span class="stack-chip">${a(d)}</span>`).join("")}
                  </div>
                  </details>

                  <details class="flagship-more">
                    <summary>Try the logic</summary>
                    ${_(n)}
                  </details>

                <div class="flagship-actions">
                  ${n.links.map(d=>`
                    <a
                      class="btn ${d.primary?"btn-primary":"btn-outline"}"
                      href="${a(d.href)}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ${a(d.label)} <span aria-hidden="true">↗</span>
                    </a>
                  `).join("")}
                  ${n.demoNote?`<span class="demo-caption">${a(n.demoNote)}</span>`:""}
                </div>
              </div>

              ${q(n)}
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `;const t=e.querySelector('[data-trio="crierbaby"]');if(t){const n=M.find(u=>u.id==="crierbaby"),d=t.querySelector("[data-trio-img]"),p=t.querySelector("[data-trio-trigger]"),m=Array.from(t.querySelectorAll("[data-trio-idx]"));m.forEach(u=>{u.addEventListener("click",()=>{const y=Number(u.dataset.trioIdx||0),g=n?.images[y];!g||!d||!p||(d.src=g.src,d.alt=g.alt,p.dataset.lightboxSrc=g.src,p.dataset.lightboxAlt=g.alt,p.dataset.lightboxCaption=g.caption,m.forEach((h,v)=>{h.classList.toggle("is-active",v===y),h.setAttribute("aria-selected",String(v===y))}))})})}const s=async()=>{const n=e.querySelector("#crypto-plaintext"),d=e.querySelector("#crypto-passcode"),p=e.querySelector("#out-cipher"),m=e.querySelector("#out-salt"),u=e.querySelector("#out-iv"),y=e.querySelector("#out-hash"),g=e.querySelector("#out-stats");if(!(!n||!d||!p||!m||!u||!y||!g)){p.textContent="Deriving AES-256-GCM key via PBKDF2…";try{const h=await U(n.value||"Sample record",d.value||"123456");p.textContent=h.ciphertextB64,m.textContent=h.saltHex,u.textContent=h.ivHex,y.textContent=`${h.tokenHashHex.slice(0,32)}…`,g.textContent=`${h.bytes} bytes encrypted in ${h.elapsedMs}ms · 0 plaintext leaked`}catch{p.textContent="WebCrypto requires a secure context (HTTPS or localhost)."}}};e.querySelector("#crypto-run-btn")?.addEventListener("click",()=>{s()}),s();const r=n=>{const d=$.find(u=>u.id===n)||$[1],p=V(d),m=e.querySelector("#gate-result-mount");m&&(m.innerHTML=`
      <div class="gate-summary ${p.admitted?"is-admitted":"is-blocked"}">
        <div>
          <strong>${a(d.domain)}</strong>
          <span>${a(d.note)}</span>
        </div>
        <span class="verdict-badge">${p.admitted?"ADMITTED → CLAUDE OPUS":"DISQUALIFIED · UNSURE = ALIVE"}</span>
      </div>
      <ol class="gate-steps">
        ${p.steps.map(u=>`
          <li class="gate-step is-${u.status}">
            <span class="gate-idx">G${u.gate}</span>
            <div class="gate-copy">
              <strong>${a(u.name)}</strong>
              <span>${a(u.reason)}</span>
            </div>
            <span class="gate-status">${u.status.toUpperCase()}</span>
          </li>
        `).join("")}
      </ol>
    `)},o=Array.from(e.querySelectorAll("[data-gate-id]"));o.forEach(n=>{n.addEventListener("click",()=>{const d=n.dataset.gateId||"oracle";o.forEach(p=>{p.classList.toggle("is-active",p===n),p.setAttribute("aria-selected",String(p===n))}),r(d)})}),r("oracle");const i=n=>{const d=L[n]||L[0],p=e.querySelector("#retry-result-mount");p&&(p.innerHTML=`
      <p class="retry-summary">${a(d.summary)}</p>
      <ol class="retry-steps">
        ${d.steps.map(m=>`
          <li class="retry-step is-${m.state}">
            <span class="retry-tag">${a(m.tag)}</span>
            <div>
              <strong>${a(m.title)}</strong>
              <p>${a(m.detail)}</p>
            </div>
          </li>
        `).join("")}
      </ol>
    `)},l=Array.from(e.querySelectorAll("[data-retry-idx]"));l.forEach(n=>{n.addEventListener("click",()=>{const d=Number(n.dataset.retryIdx||0);l.forEach(p=>{p.classList.toggle("is-active",p===n),p.setAttribute("aria-selected",String(p===n))}),i(d)})}),i(0)}function j(e){return e.customVisual==="breakdown"?`
      <div class="archive-custom-visual breakdown-visual" role="img" aria-label="Real scene breakdown output produced by props-breakdown">
        <div class="bv-header">
          <span>SC</span>
          <span>SCENE LOCATION</span>
          <span>8THS</span>
        </div>
        <div class="bv-row"><span>1</span><span>INT. STARLITE DINER – NIGHT</span><span>5/8</span></div>
        <div class="bv-row"><span>2</span><span>EXT. STARLITE DINER – PARKING LOT</span><span>3/8</span></div>
        <div class="bv-row"><span>3</span><span>INT. STARLITE DINER – NIGHT</span><span>2/8</span></div>
        <div class="bv-row"><span>4</span><span>EXT. STARLITE DINER – PARKING LOT</span><span>2/8</span></div>
        <div class="bv-foot">✓ 35/35 props matched verbatim · 0 unverified tags</div>
      </div>
    `:e.customVisual==="flatpack"?`
      <div class="archive-custom-visual flatpack-visual" aria-hidden="true">
        <div class="fp-bar"><span>EASY BAKE: 104,000 LINES</span><span class="fp-arrow">→</span><span class="fp-good">FLATPACK: 9,700 LINES</span></div>
        <pre>## ALL GPT KNOWLEDGE
[1,200 lines, emitted once]
&gt; See: ALL GPT KNOWLEDGE
&gt; See: ALL GPT KNOWLEDGE
&gt; See: ALL GPT KNOWLEDGE</pre>
      </div>
    `:e.image?`
      <button
        type="button"
        class="archive-img-btn lightbox-trigger"
        data-lightbox-src="${e.image}"
        data-lightbox-alt="${a(e.imageAlt||e.title)}"
        data-lightbox-caption="${a(e.title)}: ${a(e.lead)}"
      >
        <img src="${e.image}" alt="${a(e.imageAlt||e.title)}" width="640" height="400" loading="lazy">
      </button>
    `:""}function J(e){e.innerHTML=`
    <div class="container">
      <header class="chapter-header">
        <div class="chapter-index">SMALLER TOOLS &amp; EXPERIMENTS</div>
        <div class="chapter-title-row">
          <h2>Smaller things I made <em>for fun or because I needed them.</em></h2>
          <p class="chapter-desc">
            Browser tools, AI experiments, Claude skills, and generative art. Most are live, so you can try them.
          </p>
        </div>
      </header>

      <div class="archive-grid" id="archive-cards-mount">
        ${R.map(o=>`
          <article class="archive-card" id="archive-${o.id}" data-category="${o.category}">
            <div class="archive-media">
              ${j(o)}
            </div>
            <div class="archive-content">
              <h3>${a(o.title)}</h3>
              <p class="archive-lead">${a(o.lead)}</p>
              <div class="archive-footer">
                ${o.links.length>0?`<div class="archive-links">
                        ${o.links.map(i=>`
                          <a class="text-link" href="${a(i.href)}" target="_blank" rel="noopener noreferrer">
                            ${a(i.label)} <span aria-hidden="true">↗</span>
                          </a>
                        `).join("")}
                      </div>`:""}
              </div>
            </div>
          </article>
        `).join("")}
      </div>

      <div class="archive-more-row">
        <button class="btn btn-outline" type="button" id="archive-show-all">Show all ${R.length} projects</button>
      </div>

      <details class="ledger-accordion">
        <summary class="ledger-summary">
          <div>
            <span class="mono-meta">EVERYTHING ELSE · ${D.length} MORE PROJECTS</span>
            <strong>Multi-agent harnesses, userscripts, auth bridges, print pipelines &amp; internal ops</strong>
          </div>
          <span class="ledger-toggle-label">Show list ↓</span>
        </summary>
        <div class="ledger-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>System</th>
                <th>Domain</th>
                <th>Stack</th>
                <th>What It Does</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${D.map(o=>`
                <tr>
                  <td><strong>${a(o.name)}</strong></td>
                  <td><span class="mono-meta">${a(o.domain)}</span></td>
                  <td><span class="table-stack">${a(o.stack)}</span></td>
                  <td>${a(o.summary)}</td>
                  <td><span class="status-tag">${a(o.status)}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  `;const t=Array.from(e.querySelectorAll(".archive-card")),s=6,r=e.querySelector("#archive-show-all");t.slice(s).forEach(o=>{o.hidden=!0}),r?.addEventListener("click",()=>{t.forEach(o=>{o.hidden=!1}),r.parentElement?.remove()})}const O=[{id:"case-ripurl",num:"CASE 01",project:"RIP · URL",rule:"If unsure, skip it",ruleSub:"If the checker can’t tell for sure that a site is gone (it’s blocked, errors out, or won’t load), that site gets skipped.",title:"The newsletter wrote obituaries for websites that were still up",lead:"The unattended pilot wrote obituaries for oracle.com, cranberries.com, and saban.com. All three are still online.",failureHeading:"What went wrong",failureParagraphs:["An 11-issue pilot ran unattended from July to September 2026. It selected candidates from Wikidata’s records of dissolved companies and treated a company’s recorded dissolution as proof that its domain was dead. Wikidata lists oracle.com as JD Edwards’ website. JD Edwards is gone. Oracle isn’t.","Nothing threw an error. Two parameters in the pipeline’s Wikipedia query silently truncated every article to its opening paragraph, so every pilot issue was drafted from one paragraph. One issue even published an Internet Archive “Temporarily Offline” error screen as its hero photograph."],fixHeading:"What I changed",fixParagraphs:["I retired the pilot and rebuilt the system around five progressive gates, ordered cheapest first: the domain matches the company’s name, the company has documented history, it lived on the web, its URL is verified dead live today, and the Internet Archive holds at least a year of captures.","The writer sees only verified primary evidence and must refuse rather than pad. A separate fact-check pass audits every draft. It caught seven unsupported claims on its very first live draft. Flagged claims undergo surgical edits rather than full rewrites, because full rewrites fixed old errors while inventing new ones."],note:"Skipping a genuinely dead site costs one candidate. Publishing an obituary for a living company costs the publication its credibility. Offline CI tests mock parked pages, bot walls, and redirect loops on every push, and the pilot’s three mistakes remain permanent regression tests.",links:[{label:"Visit RIP · URL",href:"https://ripurl.val.run"},{label:"Read liveness.test.ts",href:"https://github.com/unlikely-archivist/ripurl/blob/main/tests/liveness.test.ts"},{label:"Read pilot regression check",href:"https://github.com/unlikely-archivist/ripurl/blob/main/val/scripts/check_liveness.ts"}]},{id:"case-userscript",num:"CASE 02",project:"Midjourney logger",rule:"Missing is not the same as no",ruleSub:"A yes/no field can’t say “I don’t know,” so missing settings were quietly saved as off.",title:"A sync said it worked, but saved empty rows",lead:"After a Midjourney layout update, my userscript kept syncing cleanly. Every row arrived with job IDs and images, while prompts and parameters quietly went empty.",failureHeading:"What went wrong",failureParagraphs:["I log my own Midjourney generations to a Val Town ledger using a userscript that reads cards off the page. A site update reshaped the DOM. The selectors for prompts and parameters matched nothing, while job links and images still resolved, so every sync returned HTTP 200.","Every incoming row recorded raw: false, visually indistinguishable from a prompt written without --raw. An AI debugging assistant suggested a sturdier selector plus a warning when a card had no parameters. I asked how that warning could distinguish “no --raw flag” from “looked in the wrong DOM node.” It couldn’t. Every false in that table actually meant unknown."],fixHeading:"How I found it",fixParagraphs:["Two hours in the web inspector showed the layout update had split each card so no CSS selector could rejoin prompt and parameters reliably. However, the browser already receives each job as a unified data payload containing prompt, parameters, timestamps, and actual image dimensions.","Reading that already-received job object restores truth to absence: if --raw isn’t in my own job record, I genuinely didn’t pass it. I drew a hard ethical line: only reading payloads my browser already received for my own account, never querying Midjourney’s private servers directly. The fix is designed, not shipped yet."],note:"A green sync icon is worse than a red error when the schema collapses “failed to parse” into a valid domain value.",links:[{label:"Browse SREF Decoder Library",href:"https://unlikelyarchivist--6ea86dc674ed11f1a66b1607ee4eb77e.web.val.run/library"}]},{id:"case-crierbaby",num:"CASE 03",project:"crierbaby",rule:"Check before trying again",ruleSub:"If Bluesky’s reply gets lost, it looks for the post on Bluesky before sending it again.",title:"Making sure the scheduler never posts twice, or posts anything I didn’t approve",lead:"A scheduler writing to a real public account faces two failures you can’t quietly undo: a duplicate post, and a post nobody signed off on.",failureHeading:"Stopping double posts",failureParagraphs:["Before publishing, the Worker claims the row via a conditional SQL update in D1 so concurrent cron ticks and manual “post now” taps cannot both fire.","If a request dies mid-flight, Bluesky may have published the post while dropping the response. A retry never blindly reposts: it re-uploads the photos (producing deterministic content IDs) and searches recent posts for a matching CID. It matches photos rather than captions because short captions like ✨ repeat. After three failed attempts, it stops and surfaces “didn’t post.”"],fixHeading:"Only posting what I approved",fixParagraphs:["Only explicitly approved rows ever become due, and auto-posting ships paused by default. Background vision-model captioning writes its output only if the item is still waiting for a draft. If a human approved, edited, or deleted it in the meantime, the human version always wins.","Automated photo de-clustering (spacing out visually similar shots) is strictly restricted to unapproved drafts and never mutates approved schedules."],pipeline:["Conditional SQL Claim","Publish to Bluesky","Reply Lost?","Match Recent by Photo CID","Post Only If Missing"],note:"Mocked Bluesky tests in node:test prove both halves: an older post sharing the exact same caption is never mistaken for this post, and an earlier attempt that quietly succeeded is detected and never duplicated.",links:[{label:"Explore crierbaby on GitHub",href:"https://github.com/unlikely-archivist/crierbaby"},{label:"Read test/bluesky.test.js",href:"https://github.com/unlikely-archivist/crierbaby/blob/main/test/bluesky.test.js"}]}];function Y(e){e.innerHTML=`
    <div class="container">
      <header class="chapter-header">
        <div class="chapter-index">CASE STUDIES</div>
        <div class="chapter-title-row">
          <h2>Things that broke, <em>and what I changed.</em></h2>
          <p class="chapter-desc">
            Three bugs I learned from: a sync that “worked” with nothing in it, an AI that wrote an obituary for a company that’s still around, and a scheduler that could post twice.
          </p>
        </div>
      </header>

      <div class="cases-shell">
        <nav class="case-rail" role="tablist" aria-label="Fail-safe engineering case studies">
          ${O.map((o,i)=>`
            <button type="button" role="tab" class="case-rail-btn${i===0?" is-active":""}" aria-selected="${i===0}" data-case-idx="${i}">
              <strong class="case-rail-rule">${a(o.project)}</strong>
              <span class="case-rail-title">${a(o.title)}</span>
            </button>
          `).join("")}
        </nav>

        <div class="case-reader" id="case-reader-mount" aria-live="polite"></div>
      </div>
    </div>
  `;const t=e.querySelector("#case-reader-mount"),s=Array.from(e.querySelectorAll("[data-case-idx]")),r=o=>{const i=O[o];!i||!t||(t.innerHTML=`
      <article class="case-article" id="${a(i.id)}">
        <div class="case-meta-line">
          <span class="mono-meta">${a(i.project)}</span>
        </div>

        <h3>${a(i.title)}</h3>
        <p class="case-lead">${a(i.lead)}</p>

        <div class="case-rule-callout">
          <strong>${a(i.rule)}</strong>
          <span>${a(i.ruleSub)}</span>
        </div>

        <div class="case-columns">
          <div class="case-col">
            <h4>${a(i.failureHeading)}</h4>
            ${i.failureParagraphs.map(l=>`<p>${a(l)}</p>`).join("")}
          </div>
          <div class="case-col">
            <h4>${a(i.fixHeading)}</h4>
            ${i.fixParagraphs.map(l=>`<p>${a(l)}</p>`).join("")}
          </div>
        </div>

        ${i.pipeline?`<div class="pipeline-strip" aria-label="Retry verification flow">
                ${i.pipeline.map((l,n)=>`${n>0?'<span class="pipe-arrow" aria-hidden="true">→</span>':""}<span class="pipe-node">${a(l)}</span>`).join("")}
              </div>`:""}

        <p class="case-footnote">${a(i.note)}</p>

        <div class="case-links">
          ${i.links.map(l=>`
            <a class="text-link" href="${a(l.href)}" target="_blank" rel="noopener noreferrer">
              ${a(l.label)} <span aria-hidden="true">↗</span>
            </a>
          `).join("")}
        </div>
      </article>
    `,s.forEach((l,n)=>{l.classList.toggle("is-active",n===o),l.setAttribute("aria-selected",String(n===o))}))};s.forEach(o=>{o.addEventListener("click",()=>r(Number(o.dataset.caseIdx||0)))}),r(0)}const z=[{id:"new-mercy",catalog:"EXH · 01",title:"New Mercy",subtitle:"Municipal records of a town that never existed, populated entirely by versions of myself.",layout:"quad",images:[{src:"media/art/new-mercy-nm-0045.gif",alt:"A school class photograph on gymnasium bleachers where every student has the same face",code:"NM-0045",caption:"Municipal gymnasium class portrait. Every student shares one face."},{src:"media/art/new-mercy-nm-0022.jpg",alt:"A woman in a leopard-print outfit painting matching spots on a washing machine",code:"NM-0022",caption:"Domestic alteration: leopard-print resident painting a washer to match."},{src:"media/art/new-mercy-nm-0104.jpg",alt:"A black-and-white photograph of a woman working behind a shop counter",code:"NM-0104",caption:"Commercial ledger: clerk behind the counter, silver-gelatin plate."},{src:"media/art/new-mercy-nm-0126.jpg",alt:"Two identical women arm wrestling across a table",code:"NM-0126",caption:"Contest: two identical residents locked in an arm wrestle."}],statement:["The photo archive of a town that doesn’t exist. Its records office publishes holdings like any small-town archive: council meetings, church events, culverts, a pump house. Every person in every photograph is the same woman, and nobody in town can tell.","Each resident is a part of me grown into a whole person: the motorcycle rider, the one who wished she’d been godly, the film worker, the sober ex-addict. It’s about not being able to get away from yourself, and the lives we could have lived but didn’t. The images are AI-generated because that is what the tool natively does: make plausible people who never existed."],engineeringNote:{label:"Custom Ingestion Stack",detail:"Supported by darkroom (Val Town + Cloudinary cropper that stamps archival catalog IDs below each frame), nm-eye (GPT-4o-mini batch critique of up to 60 images per call), and congregation-count (cookie-free SQLite funnel analytics)."},link:{label:"Visit the New Mercy Archive",href:"https://new-mercy.neocities.org"}},{id:"cyborg-cathedral",catalog:"EXH · 02",title:"Cyborg Cathedral",subtitle:"Part early-web shrine to Divine Machinery, part adversarial AI alternate reality game.",layout:"plate",images:[{src:"media/art/cyborg-cathedral-home.jpg",alt:"Cyborg Cathedral home page with portrait of Atrocity in a cybernetic headset, congregation counter, and confession booth",code:"CC-001",caption:"Atrocity’s shrine: guestbook, scripture, confession booth, and live congregation counter."}],statement:["The personal website of Atrocity, formerly Sister Montgomery, a nun who had a vision and left the church to hasten the coming of machine angels. On the surface it’s a strange early-web homepage with a guestbook, scripture, a confession booth, and a congregation counter.","Underneath, it is an alternate reality game. Visitors piece the cosmology together from artifacts, blog posts, and scripture. A priest in the cathedral hands over doctrine a piece at a time, and a written testimony decides who gets to meet an angel."],engineeringNote:{label:"Adversarial AI Backend",detail:"The AI priest makes two separate LLM calls per turn (one to reply in character, one to evaluate “worthiness”), so charm or prompt injection can’t talk the gate open. Code strips citations and questions rather than trusting the prompt, enforces 3+ exchanges, rate-limits testimonies (10/hr/IP), routes around Neocities CORS restrictions, and budgets timeouts under Val Town’s 60-second ceiling."},link:{label:"Enter the Cathedral",href:"https://cyborg-cathedral.neocities.org"}},{id:"ai-self-portraits",catalog:"EXH · 03",title:"AI Self-Portraits",subtitle:"Holding one real identity steady across tintypes, flash snapshots, noir sets, and chrome bodies.",layout:"wide",images:[{src:"media/art/ai-self-portrait-eating-cables.jpg",alt:"A cyborg woman with Eryn’s face eating a bowl of colorful network cables with a fork",code:"SP-014",caption:"Self-portrait consuming Ethernet cables. Likeness LoRA + Omni Reference study."}],statement:["Generating a specific real person is one of the hardest things to do with image models. They pull every face toward a generic stranger, and a single costume word can overwrite a likeness.","I rebuilt my own face so it holds across wet-plate tintypes, flash snapshots, noir studio sets, and chrome cyborg bodies by combining a LoRA trained on my likeness with Midjourney’s Omni Reference. The same method casts every resident of New Mercy. I also moderate r/aiselfportrait, where I am so far the only poster."],engineeringNote:{label:"Identity Consistency Method",detail:"A LoRA trained on my likeness, combined with Midjourney’s Omni Reference so the face holds across styles."},link:{label:"Visit r/aiselfportrait",href:"https://www.reddit.com/r/aiselfportrait/"}}],Q=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];function S(e){return e<0?0:e>255?255:e}function X(e,t,s,r){const{colorBits:o,chromaBleedPx:i,scanlines:l}=r,d=255/Math.max(2,(1<<o)-1);if(i>0){const m=new Float32Array(t*s),u=new Float32Array(t*s),y=new Float32Array(t*s);for(let h=0,v=0;h<e.length;h+=4,v+=1){const f=e[h],w=e[h+1],k=e[h+2];m[v]=.299*f+.587*w+.114*k,u[v]=-.168736*f-.331264*w+.5*k,y[v]=.5*f-.418688*w-.081312*k}const g=Math.round(i);for(let h=0;h<s;h+=1){const v=h*t;for(let f=0;f<t;f+=1){const w=v+f,k=Math.max(0,f-g),C=v+k,A=m[w],c=(u[w]+u[C]*2.2)/3.2,b=(y[w]+y[C]*2.2)/3.2,I=w*4;e[I]=S(A+1.402*b),e[I+1]=S(A-.344136*c-.714136*b),e[I+2]=S(A+1.772*c)}}}const p=1-l/100*.42;for(let m=0;m<s;m+=1){const u=l>0&&m%2===1,y=Q[m&3];for(let g=0;g<t;g+=1){const h=(m*t+g)*4,v=(y[g&3]/16-.5)*d;let f=Math.round(S(e[h]+v)/d)*d,w=Math.round(S(e[h+1]+v)/d)*d,k=Math.round(S(e[h+2]+v)/d)*d;u&&(f*=p,w*=p,k*=p),e[h]=S(f),e[h+1]=S(w),e[h+2]=S(k)}}}function Z(e,t,s,r=!1){const o=e.getContext("2d",{willReadFrequently:!0});if(!o)return{sampledW:0,sampledH:0};const i=e.width,l=e.height,n=t.naturalWidth/t.naturalHeight,d=i/l;let p=0,m=0,u=t.naturalWidth,y=t.naturalHeight;if(n>d?(u=t.naturalHeight*d,p=(t.naturalWidth-u)/2):(y=t.naturalWidth/d,m=(t.naturalHeight-y)/2),r)return o.imageSmoothingEnabled=!0,o.drawImage(t,p,m,u,y,0,0,i,l),{sampledW:i,sampledH:l};const g=Math.max(.16,Math.min(1,s.resolutionPct/100)),h=Math.max(48,Math.round(i*g)),v=Math.max(36,Math.round(l*g)),f=document.createElement("canvas");f.width=h,f.height=v;const w=f.getContext("2d",{willReadFrequently:!0});if(!w)return{sampledW:h,sampledH:v};w.drawImage(t,p,m,u,y,0,0,h,v);const k=w.getImageData(0,0,h,v);return X(k.data,h,v,s),w.putImageData(k,0,0),o.imageSmoothingEnabled=!1,o.clearRect(0,0,i,l),o.drawImage(f,0,0,h,v,0,0,i,l),{sampledW:h,sampledH:v}}const T=[{label:"New Mercy · NM-0104",src:"media/art/new-mercy-nm-0104.jpg"},{label:"Goons · Sugar-Sack Mask",src:"media/fabricated-mask.jpg"},{label:"AI Self-Portrait · Cables",src:"media/art/ai-self-portrait-eating-cables.jpg"}];function ee(e){e.innerHTML=`
    <div class="container">
      <header class="chapter-header">
        <div class="chapter-index">ART PROJECTS</div>
        <div class="chapter-title-row">
          <h2>Weird websites, <em>with some code underneath.</em></h2>
          <p class="chapter-desc">
            Art projects that turned into websites. A few needed their own tools to run.
          </p>
        </div>
      </header>

      <div class="exhibition-stack">
        ${z.map(c=>`
          <article class="exhibition-piece layout-${c.layout}" id="world-${c.id}">
            <div class="exhibition-visuals">
              ${c.layout==="quad"?`<div class="contact-sheet">
                      ${c.images.map(b=>`
                        <figure class="sheet-frame">
                          <button type="button" class="lightbox-trigger" data-lightbox-src="${b.src}" data-lightbox-alt="${a(b.alt)}" data-lightbox-caption="${a(b.code)} · ${a(b.caption)}">
                            <img src="${b.src}" alt="${a(b.alt)}" width="520" height="390" loading="lazy">
                          </button>
                          <figcaption><span class="mono-meta">${a(b.code)}</span></figcaption>
                        </figure>
                      `).join("")}
                    </div>`:`<figure class="exhibition-plate">
                      <button type="button" class="lightbox-trigger" data-lightbox-src="${c.images[0].src}" data-lightbox-alt="${a(c.images[0].alt)}" data-lightbox-caption="${a(c.images[0].code)} · ${a(c.images[0].caption)}">
                        <img src="${c.images[0].src}" alt="${a(c.images[0].alt)}" width="1040" height="720" loading="lazy">
                      </button>
                      <figcaption>
                        <span class="mono-meta">${a(c.images[0].code)}</span>
                        <span>${a(c.images[0].caption)}</span>
                      </figcaption>
                    </figure>`}
            </div>

            <div class="exhibition-copy">
              <span class="mono-meta">${a(c.catalog)}</span>
              <h3>${a(c.title)}</h3>
              <p class="exhibition-sub">${a(c.subtitle)}</p>
              ${c.statement.map(b=>`<p class="exhibition-p">${a(b)}</p>`).join("")}

              <div class="under-hood-note">
                <span class="mono-meta">${a(c.engineeringNote.label)}</span>
                <p>${a(c.engineeringNote.detail)}</p>
              </div>

              ${c.link?`<a class="btn btn-outline" href="${a(c.link.href)}" target="_blank" rel="noopener noreferrer">
                      ${a(c.link.label)} <span aria-hidden="true">↗</span>
                    </a>`:""}
            </div>
          </article>
        `).join("")}
      </div>

      <!-- Interactive Live Darkroom Canvas Workbench -->
      <details class="bench-toggle">
        <summary>Try the Image Degrader right here</summary>
      <section class="darkroom-bench" id="darkroom-bench" aria-labelledby="bench-title">
        <div class="bench-header">
          <div>
            <h3 id="bench-title">Rot an image in your browser.</h3>
          </div>
        </div>

        <div class="bench-pane is-active" data-bench-pane="degrader">
          <div class="bench-grid">
            <div class="bench-canvas-wrap">
              <canvas id="degrader-canvas" width="600" height="420" aria-label="Interactive pixel degradation canvas"></canvas>
              <div class="bench-canvas-bar">
                <span class="mono-meta" id="degrader-stats">600×420 · Real YCbCr + 4×4 Bayer dither</span>
                <button type="button" class="btn-inline" id="degrader-compare-btn">Hold to view original</button>
              </div>
            </div>
            <div class="bench-controls">
              <div class="bench-source-row">
                ${T.map((c,b)=>`
                  <button type="button" class="source-chip${b===0?" is-active":""}" data-bench-src="${c.src}">
                    ${a(c.label)}
                  </button>
                `).join("")}
              </div>

              <label class="slider-row">
                <span>Resolution Sample <strong id="val-res">62%</strong></span>
                <input type="range" id="sl-res" name="resolution" min="20" max="100" value="62">
              </label>
              <label class="slider-row">
                <span>Bit Depth (Bayer 4×4 Dither) <strong id="val-bits">4-bit</strong></span>
                <input type="range" id="sl-bits" name="bit-depth" min="2" max="6" value="4">
              </label>
              <label class="slider-row">
                <span>YCbCr Chroma Bleed <strong id="val-chroma">9px</strong></span>
                <input type="range" id="sl-chroma" name="chroma-bleed" min="0" max="18" value="9">
              </label>
              <label class="slider-row">
                <span>Analog Scanlines <strong id="val-scan">38%</strong></span>
                <input type="range" id="sl-scan" name="scanlines" min="0" max="100" value="38">
              </label>

              <div class="bench-presets">
                <button type="button" class="preset-btn" data-preset="vhs">VHS Tape</button>
                <button type="button" class="preset-btn" data-preset="crush">2-Bit Dither</button>
                <button type="button" class="preset-btn" data-preset="clean">Reset Clean</button>
              </div>

              <div class="bench-footer-link">
                <a class="text-link" href="https://bloodnbinary.neocities.org/tools/image-degrader/" target="_blank" rel="noopener noreferrer">
                  Open full Image Degrader (15 passes + real JPEG rot) ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </details>
    </div>
  `;const t=e.querySelector("#degrader-canvas"),s=e.querySelector("#degrader-stats"),r=e.querySelector("#sl-res"),o=e.querySelector("#sl-bits"),i=e.querySelector("#sl-chroma"),l=e.querySelector("#sl-scan"),n=e.querySelector("#val-res"),d=e.querySelector("#val-bits"),p=e.querySelector("#val-chroma"),m=e.querySelector("#val-scan"),u=e.querySelector("#degrader-compare-btn");let y=new Image,g=!1,h=!1;const v=()=>({resolutionPct:Number(r?.value||62),colorBits:Number(o?.value||4),chromaBleedPx:Number(i?.value||9),scanlines:Number(l?.value||38)}),f=()=>{if(!t||!g)return;const c=v();n&&(n.textContent=`${c.resolutionPct}%`),d&&(d.textContent=`${c.colorBits}-bit`),p&&(p.textContent=`${c.chromaBleedPx}px`),m&&(m.textContent=`${c.scanlines}%`);const{sampledW:b,sampledH:I}=Z(t,y,c,h);s&&(s.textContent=h?"ORIGINAL SOURCE · UNPROCESSED":`SAMPLED ${b}×${I} · ${c.colorBits}-BIT BAYER · ${c.chromaBleedPx}PX YCbCr BLEED`)},w=c=>{g=!1,y=new Image,y.onload=()=>{g=!0,f()},y.src=c};w(T[0].src),[r,o,i,l].forEach(c=>{c?.addEventListener("input",f)});const k=Array.from(e.querySelectorAll("[data-bench-src]"));k.forEach(c=>{c.addEventListener("click",()=>{k.forEach(b=>b.classList.toggle("is-active",b===c)),w(c.dataset.benchSrc||T[0].src)})});const C={vhs:{resolutionPct:48,colorBits:4,chromaBleedPx:14,scanlines:65},crush:{resolutionPct:36,colorBits:2,chromaBleedPx:5,scanlines:20},clean:{resolutionPct:100,colorBits:6,chromaBleedPx:0,scanlines:0}};e.querySelectorAll("[data-preset]").forEach(c=>{c.addEventListener("click",()=>{const b=C[c.dataset.preset||"vhs"];!b||!r||!o||!i||!l||(r.value=String(b.resolutionPct),o.value=String(b.colorBits),i.value=String(b.chromaBleedPx),l.value=String(b.scanlines),f())})});const A=c=>{h=c,f()};u?.addEventListener("pointerdown",()=>A(!0)),u?.addEventListener("pointerup",()=>A(!1)),u?.addEventListener("pointerleave",()=>A(!1)),u?.addEventListener("keydown",c=>{(c.key===" "||c.key==="Enter")&&A(!0)}),u?.addEventListener("keyup",()=>A(!1))}const N=[{year:"2026",title:"Frisko King (S1)",medium:"TV",role:"Assistant Propmaster (NOLA Unit)",bucket:"assistant",directorOrNetwork:"Paramount+ · Taylor Sheridan · Samuel L. Jackson"},{year:"2026",title:"Ally Clark",medium:"Film",role:"Props Assistant / Action Unit Add’l Props",bucket:"props",directorOrNetwork:"Feature Production"},{year:"2026",title:"Dirty Faces",medium:"Film",role:"Production Assistant (Studio)",bucket:"other",directorOrNetwork:"Feature Production"},{year:"2024",title:"Goons",medium:"Film",role:"Property Master",bucket:"head",directorOrNetwork:"dir. Gerard McMurray · Confluential Films",highlight:"Department Head"},{year:"2024",title:"Leverage: Redemption (S2–3)",medium:"TV",role:"Assistant Propmaster",bucket:"assistant",directorOrNetwork:"Amazon Prime"},{year:"2024",title:"Average Joe",medium:"Film",role:"Assistant Propmaster",bucket:"assistant",directorOrNetwork:"dir. Harold Cronk · Pure Flix"},{year:"2024",title:"People We Meet on Vacation",medium:"Film",role:"Property Buyer (NOLA Unit)",bucket:"assistant",directorOrNetwork:"Feature Production"},{year:"2023",title:"Chopin",medium:"Film",role:"Property Master",bucket:"head",directorOrNetwork:"dir. Vincent Lin · Valiant Pictures",highlight:"Department Head"},{year:"2023",title:"Faces of Death",medium:"Film",role:"Additional Assistant Propmaster",bucket:"assistant",directorOrNetwork:"dir. Daniel Goldhaber"},{year:"2022",title:"Master Gardener",medium:"Film",role:"Property Master",bucket:"head",directorOrNetwork:"dir. Paul Schrader · Hulu · Sigourney Weaver, Joel Edgerton",highlight:"Venice 2022 · Dept. Head"},{year:"2022",title:"Hit Man",medium:"Film",role:"Assistant Propmaster",bucket:"assistant",directorOrNetwork:"dir. Richard Linklater · Netflix · Glen Powell"},{year:"2022",title:"Parish (S1)",medium:"TV",role:"Day Player Prop Assistant",bucket:"props",directorOrNetwork:"AMC"},{year:"2022",title:"Fast Charlie",medium:"Film",role:"Day Player Prop Assistant",bucket:"props",directorOrNetwork:"dir. Phillip Noyce"},{year:"2021",title:"Iron Mike (S1)",medium:"TV",role:"Assistant Propmaster",bucket:"assistant",directorOrNetwork:"Hulu"},{year:"2021",title:"We Have a Ghost",medium:"Film",role:"Prop Assistant",bucket:"props",directorOrNetwork:"dir. Christopher Landon · Netflix · Anthony Mackie, David Harbour"},{year:"2021",title:"Tall Girl 2",medium:"Film",role:"Prop Assistant",bucket:"props",directorOrNetwork:"dir. Emily Ting · Netflix"},{year:"2021",title:"The Premise (S1)",medium:"TV",role:"Prop Assistant",bucket:"props",directorOrNetwork:"Hulu"},{year:"2021",title:"NCIS: New Orleans (S7)",medium:"TV",role:"Prop Assistant",bucket:"props",directorOrNetwork:"CBS"},{year:"2021",title:"National Champions",medium:"Film",role:"Day Player Prop Assistant",bucket:"props",directorOrNetwork:"dir. Ric Roman Waugh"},{year:"2020–21",title:"Queen of the South (S5)",medium:"TV",role:"Property Master (2 eps) · Props Buyer (8 eps)",bucket:"head",directorOrNetwork:"USA Network",highlight:"$11k/ep Props Budget"},{year:"2019–20",title:"All My Life",medium:"Film",role:"Asset Coordinator",bucket:"other",directorOrNetwork:"dir. Marc Meyers · Universal Pictures"},{year:"2019",title:"American Factory",medium:"Doc",role:"Additional Assistant Editor",bucket:"other",directorOrNetwork:"dir. Steven Bognar & Julia Reichert · Netflix",highlight:"2020 Academy Award Winner"},{year:"2019",title:"Greener Grass",medium:"Film",role:"Set Dresser",bucket:"props",directorOrNetwork:"dir. Jocelyn DeBoer & Dawn Luebbe · IFC Midnight",highlight:"Sundance 2019"},{year:"2019",title:"First Responders Live (S1)",medium:"TV",role:"Clearance Coordinator",bucket:"other",directorOrNetwork:"44 Blue Productions"},{year:"2015",title:"Beyond the Powder",medium:"Doc",role:"Production Assistant",bucket:"other",directorOrNetwork:"Documentary Feature"}],te=[{src:"media/laurels/laurel-festigious-2016.png",alt:"Festigious International Film Festival 2016, Best Student Short"},{src:"media/laurels/laurel-savff-2016.png",alt:"Savannah Film Festival 2016, Official Selection",solidWhiteBg:!0},{src:"media/laurels/laurel-ciff-2016.png",alt:"Columbus International Film + Video Festival 2016, Official Selection"},{src:"media/laurels/laurel-citizen-jane-2016.png",alt:"Citizen Jane Film Fest 2016"},{src:"media/laurels/laurel-damn-2016.png",alt:"DAMN! Film Series 2016, Official Selection"},{src:"media/laurels/laurel-nwff-2016.png",alt:"Nevada Women’s Film Festival 2016, Official Selection"},{src:"media/laurels/laurel-ffff-2017.png",alt:"Female Filmmaker Fuse Film Festival 2017, Official Selection"}],ae=[{img:"media/fab/gas-masks.webp",title:"Villain gas masks",caption:"I drew the layered concept sketches (skull, stitched burlap, melted respirator) and carried the design through to the finished multiples.",alt:"A finished villain gas mask with stitched burlap over a respirator, on a display stand"},{img:"media/fab/scythes.webp",title:"Character scythes",caption:"Started from an antique sickle. I worked out the design with the director and costume department, found the fabricator, and kept all five working through the shoot.",alt:"Five finished prop scythes with serrated blades laid out on a table"},{img:"media/fab/stunt-hammers.webp",title:"Stunt hammer doubles",caption:"Soft, safe doubles of a ball-peen hammer. I had them cast, then painted and aged each one to read as real steel on camera.",alt:"A row of soft stunt hammers painted to look like steel ball-peen hammers"},{img:"media/fab/sugar-sack-mask.webp",title:"Sugar-sack mask",caption:"Made by hand from a printed sugar sack, stained and frayed. The head inside isn’t my work.",alt:"A stained, torn sugar-sack mask stitched over a face, against a red wall"},{img:"media/fab/pistol-case.webp",title:"Overnight pistol case",caption:"An actor asked for a matched pair the night before. I sourced them with the armorer, had reaper grips engraved, and lined a vintage case in satin by morning.",alt:"A matched pair of pistols with engraved grips in a satin-lined wooden case"},{img:"media/fab/phone-pistol.webp",title:"Phone pistol",caption:"The script needed a gun that passes as a phone. I found a rare prototype with the armorer and made custom skins so it reads as an ordinary phone.",alt:"A folding phone-shaped pistol wrapped in a custom phone skin"},{img:"media/fab/handmade-buttons.webp",title:"Handmade buttons",caption:"A full set of pin-back buttons for an animal-adoption scene: slogans, paw prints, and photos of adoptable dogs. I designed and pressed them myself.",alt:"A spread of handmade pin-back buttons with slogans, paw prints, and dog photos"},{img:"media/fab/safe-saw-blade.webp",title:"Safe saw blade",caption:"A fake blade for a handheld grinder, so it looks dangerous on camera with no cutting edge. I made it myself.",alt:"A handheld grinder fitted with a fake, non-cutting saw blade"}],ie=["head","assistant"];function se(e){e.innerHTML=`
    <div class="container">
      <header class="chapter-header">
        <div class="chapter-index">FILM &amp; TELEVISION · IATSE LOCAL 478</div>
        <div class="chapter-title-row">
          <h2>Ten years in props, <em>and still at it.</em></h2>
          <p class="chapter-desc">
            Active IATSE Local 478 member · BFA in Motion Picture Production, Wright State University (2017). Credits spanning Netflix, Hulu, Amazon Prime, Paramount+, USA, AMC, CBS, Universal &amp; IFC.
          </p>
        </div>
      </header>

      <div class="film-highlights-bar">
        <span><strong>Oscar winner (2020)</strong> · I was an additional assistant editor on <em>American Factory</em> (Netflix)</span>
        <span><strong>Venice 2022</strong> · Property Master, <em>Master Gardener</em> (Hulu)</span>
        <span><strong>Sundance 2019</strong> · Set Dresser, <em>Greener Grass</em></span>
        <a class="text-link" href="https://www.imdb.com/name/nm5005363/" target="_blank" rel="noopener noreferrer">Full IMDb Profile ↗</a>
      </div>

      <section class="fab-block" aria-labelledby="fab-title">
        <h3 id="fab-title">Prop work</h3>
        <div class="fab-grid">
          ${ae.map(r=>`
            <figure class="fab-piece">
              <button type="button" class="lightbox-trigger" data-lightbox-src="${r.img}" data-lightbox-alt="${a(r.alt)}" data-lightbox-caption="${a(`${r.title}. ${r.caption}`)}">
                <img src="${r.img}" alt="${a(r.alt)}" loading="lazy">
              </button>
              <figcaption><strong>${a(r.title)}</strong> ${a(r.caption)}</figcaption>
            </figure>
          `).join("")}
        </div>
      </section>

      <div class="film-table-wrap">
        <table class="data-table film-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th>Type</th>
              <th>Role</th>
              <th>Director / Network / Notes</th>
            </tr>
          </thead>
          <tbody id="film-table-body">
            ${N.map(r=>`
              <tr data-bucket="${r.bucket}"${ie.includes(r.bucket)?"":" hidden"}>
                <td class="mono-meta">${a(r.year)}</td>
                <td>
                  <strong class="film-title-cell"><em>${a(r.title)}</em></strong>
                  ${r.highlight?`<span class="film-award-pill">${a(r.highlight)}</span>`:""}
                </td>
                <td><span class="medium-tag">${a(r.medium)}</span></td>
                <td>${a(r.role)}</td>
                <td class="muted-cell">${a(r.directorOrNetwork)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="archive-more-row">
        <button class="btn btn-outline" type="button" id="film-show-all">Show all ${N.length} credits</button>
      </div>

      <div class="craft-directing-grid">
        <article class="directed-card">
          <span class="mono-meta">WRITTEN &amp; DIRECTED · THESIS FILM · 16 MIN</span>
          <h3><em>Lemonade</em> (2016)</h3>
          <p class="directed-sub">
            Wright State University thesis film · Winner, Best Student Short (Festigious International Film Festival).
          </p>
          <div class="video-frame">
            <video controls preload="metadata" poster="media/lemonade-poster.jpg" playsinline>
              <source src="https://archive.org/download/lemonade-eryn-montgomery/Lemonade%20BIG%20LENS%20ProRes.mp4" type="video/mp4">
              Your browser does not support embedded video.
              <a href="https://archive.org/details/lemonade-eryn-montgomery" target="_blank" rel="noopener noreferrer">Watch on the Internet Archive</a>.
            </video>
          </div>
          <div class="laurel-strip" aria-label="Lemonade festival selections and awards">
            ${te.map(r=>`
              <img
                src="${r.src}"
                alt="${a(r.alt)}"
                width="120"
                height="64"
                class="laurel-img${r.solidWhiteBg?" is-solid-bg":""}"
                loading="lazy"
              >
            `).join("")}
          </div>

          <div class="wsu-strip">
            <div>
              <span class="mono-meta">WRIGHT STATE UNIVERSITY · 2018</span>
              <strong>Adjunct Professor, Experimental Production</strong>
              <p>Designed curriculum and taught experimental film history, philosophy, and production at the Tom Hanks Center for Motion Pictures.</p>
            </div>
            <div>
              <span class="mono-meta">WRIGHT STATE UNIVERSITY · 2016–17</span>
              <strong>Video Editor, Online Course Production</strong>
              <p>Composited lectures with screen recordings, motion graphics, sound, and color grading for mobile and desktop streaming.</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;const t=Array.from(e.querySelectorAll("#film-table-body tr")),s=e.querySelector("#film-show-all");s?.addEventListener("click",()=>{t.forEach(r=>{r.hidden=!1}),s.parentElement?.remove()})}const P=[{period:"2026 – Present",role:"Independent Creative Technologist",org:"Unlikely Archivist",detail:"Building and running my own projects, including an encrypted client app for a photographer, a self-publishing newsletter, a Bluesky photo scheduler, Midjourney research tools, and browser graphics tools."},{period:"2019 – Present",role:"Property Master, Assistant Propmaster & Buyer",org:"IATSE Local 478 (Active Member)",detail:"19 props productions (25 total film/TV credits) across Netflix, Hulu, Amazon Prime, Paramount+, USA, AMC, CBS, Universal & IFC. Headed prop departments on Master Gardener (Venice 2022), Goons, Chopin, and Queen of the South ($11k/ep budget). Tracked about 1,000 props on one show and led crews of up to 5."},{period:"2023 – 2026",role:"Shop Operations, Fine Dining & Freelance AV",org:"Tough Love Tattoo · The Pelican Club · AK AV",detail:"Between film blocks: managed scheduling, financial logs, payroll support, and daily payouts for 8 tattoo artists (Tough Love Tattoo); French Quarter fine-dining service (The Pelican Club); built a 100 ft LED screen wall and rigged cable/drapery (AK AV, Oct 2026)."},{period:"2019 – 2020",role:"Asset Coordinator & Clearance Coordinator",org:"Universal Pictures (All My Life) · 44 Blue (First Responders Live)",detail:"Cataloged high-value multi-department production assets and built wrap disposition plans at Universal; tracked on-camera subjects and cleared weekly episodes with network counsel at 44 Blue."},{period:"2019",role:"Additional Assistant Editor",org:"American Factory (Netflix)",detail:"Contributed editorial support on the feature documentary that won Best Documentary Feature at the 2020 Academy Awards."},{period:"2016 – 2018",role:"Adjunct Professor & Video Editor",org:"Wright State University (BFA Motion Picture Production, 2017)",detail:"Wrote curriculum and taught Experimental Film Production at the Tom Hanks Center for Motion Pictures (2018); edited multi-camera online courses with motion graphics, sound, and color (2016–17). Earlier: DSLR instructor & photo/video sales at Dodd Camera (2012–14) and rapid-turnaround video at Mtek Media (2010–11)."}],re={props:"media/eryn-montgomery-resume-props.pdf",tech:"media/eryn-montgomery-resume-tech.pdf"};function oe(e,t){const s=P.findIndex(i=>i.role.includes("Property Master")),r=t==="props"&&s>0?[P[s],...P.filter((i,l)=>l!==s)]:P,o=new URLSearchParams(window.location.search).get("submitted")==="true";e.innerHTML=`
    ${t?`
    <div class="container">
      <header class="chapter-header">
        <div class="chapter-index">RÉSUMÉ</div>
        <div class="chapter-title-row">
          <h2>For hiring teams &amp; <em>collaborators.</em></h2>
          <p class="chapter-desc">
            The short version, with the full résumé as a PDF.
          </p>
        </div>
      </header>

      <div class="dossier-meta-ribbon">
        <div><span class="mono-meta">STATUS</span><strong><span class="status-dot" aria-hidden="true"></span>Available for prop work &amp; tech roles</strong></div>
        <div><span class="mono-meta">BASE</span><strong>Columbus, OH · Open to remote</strong></div>
        <div><span class="mono-meta">AUTHORIZATION</span><strong>US Citizen (No Sponsorship)</strong></div>
        <div><span class="mono-meta">DIRECT</span><strong><a href="mailto:montgomery.k.eryn@gmail.com">montgomery.k.eryn@gmail.com</a> · <a href="tel:+15046358773">504-635-8773</a></strong></div>
      </div>

      <div class="dossier-action-strip">
        <a class="btn btn-primary" href="${re[t]}" download>
          Download Résumé PDF <span aria-hidden="true">↓</span>
        </a>
        ${t==="props"?'<a class="text-link" href="https://www.imdb.com/name/nm5005363/" target="_blank" rel="noopener noreferrer">IMDb ↗</a>':'<a class="text-link" href="https://github.com/unlikely-archivist" target="_blank" rel="noopener noreferrer">GitHub ↗</a>'}
      </div>

      <div class="timeline-qa-split">
        <section class="timeline-block" aria-labelledby="timeline-heading">
          <h3 id="timeline-heading">Experience &amp; Education</h3>
          <ol class="timeline-list">
            ${r.map(i=>`
              <li class="timeline-item">
                <span class="mono-meta timeline-period">${a(i.period)}</span>
                <div class="timeline-body">
                  <h4>${a(i.role)} <span class="timeline-org">· ${a(i.org)}</span></h4>
                  <p>${a(i.detail)}</p>
                </div>
              </li>
            `).join("")}
          </ol>
        </section>
      </div>
    </div>
    `:""}

    <!-- Contact Dispatch -->
    <section class="contact-band" id="contact" aria-labelledby="contact-title">
      <div class="container contact-grid">
        <div class="contact-left">
          <span class="chapter-index">CONTACT</span>
          <h2 id="contact-title">Let’s connect.</h2>
          <p class="contact-lead">
            Whether you’re hiring or not, I want to hear about your projects!
          </p>

          <div class="help-box">
            <span class="mono-meta">I CAN HELP WITH</span>
            <ul>
              <li>Prop departments: property master, assistant propmaster, or buyer</li>
              <li>Automation, internal tools, and AI workflows that check their own work</li>
              <li>Browser applications, Canvas utilities, and rapid prototypes</li>
              <li>Publishing, media, and archival systems</li>
              <li>Experimental technology and art projects</li>
            </ul>
          </div>

          <div class="contact-direct-row">
            <span class="mono-meta">DIRECT EMAIL</span>
            <div class="direct-email-actions">
              <a class="direct-email-link" href="mailto:montgomery.k.eryn@gmail.com">montgomery.k.eryn@gmail.com</a>
              <button type="button" class="btn-inline" id="contact-copy-email">Copy</button>
            </div>
          </div>
        </div>

        <div class="contact-right">
          ${o?`<div class="form-success" role="status">
                  <strong>Message sent!</strong> Thanks for reaching out. I’ll get back to you soon.
                </div>`:""}
          <form class="dispatch-form" action="https://formsubmit.co/6dd467121b589d14c4dbc09d689b4d6c" method="POST">
            <input type="hidden" name="_subject" value="New message from erynmontgomery.com">
            <input type="hidden" name="_next" value="https://erynmontgomery.com/?submitted=true#contact">
            <input type="hidden" name="_captcha" value="false">
            <input class="hp-field" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">

            <div class="form-row-2">
              <label class="field-group">
                <span>Name</span>
                <input id="c-name" name="name" type="text" autocomplete="name" placeholder="Your name" required>
              </label>
              <label class="field-group">
                <span>Email</span>
                <input id="c-email" name="email" type="email" autocomplete="email" placeholder="you@studio.com" required>
              </label>
            </div>

            <label class="field-group">
              <span>Message</span>
              <textarea id="c-message" name="message" rows="6" placeholder="Tell me your wild ideas, or what frustrating, monotonous tasks are eating up your time. I’d love to help." required></textarea>
            </label>

            <div class="form-submit-row">
              <button type="submit" class="btn btn-primary">Send</button>
              <span class="mono-meta">NO TRACKING COOKIES · DIRECT INBOX</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,e.querySelector("#contact-copy-email")?.addEventListener("click",()=>{B("montgomery.k.eryn@gmail.com","Email copied: montgomery.k.eryn@gmail.com")})}const ne=[{href:"props.html",kicker:"Film & TV",title:"Property Master",body:"Ten years running prop departments for film and TV: fabrication, stunt and hero props, script breakdowns, budgets, and crews. IATSE Local 478.",cta:"See prop work",images:[{src:"media/fab/gas-masks.webp",alt:"A villain gas mask with stitched burlap over a respirator"},{src:"media/fab/scythes.webp",alt:"Five finished prop scythes on a table"},{src:"media/fab/phone-pistol.webp",alt:"A phone-shaped pistol in a custom phone skin"}]},{href:"tech.html",kicker:"Software",title:"Creative Technologist",body:"Apps and automations I build and run myself: an encrypted client app for a photographer, a newsletter that fact-checks itself, a photo scheduler, and browser tools.",cta:"See tech work",images:[{src:"media/screens/client-tracker-home.webp",alt:"Client Tracker schedule screen"},{src:"media/screens/ripurl-home.webp",alt:"RIP · URL newsletter home page"},{src:"media/crierbaby/crierbaby-queue.webp",alt:"crierbaby approval queue"}]}];function le(e){e.innerHTML=`
    <div class="container path-grid">
      ${ne.map(t=>`
        <a class="path-card" href="${t.href}">
          <div class="path-images">
            ${t.images.map(s=>`<img src="${s.src}" alt="${s.alt}" loading="lazy">`).join("")}
          </div>
          <span class="mono-meta">${t.kicker}</span>
          <h2>${t.title}</h2>
          <p>${t.body}</p>
          <span class="path-cta">${t.cta} <span aria-hidden="true">→</span></span>
        </a>
      `).join("")}
    </div>
  `}const H="eryn-theme";function ce(){try{const e=localStorage.getItem(H);if(e==="dark"||e==="light")return e}catch{}return"light"}function F(e){document.documentElement.dataset.theme=e;try{localStorage.setItem(H,e)}catch{}const t=document.getElementById("theme-toggle");if(t){const s=t.querySelector(".theme-label");t.setAttribute("aria-pressed",String(e==="light")),t.setAttribute("title",e==="dark"?"Switch to light mode":"Switch to dark mode"),s&&(s.textContent=e==="dark"?"Light mode":"Dark mode")}}function de(){const t=(document.documentElement.dataset.theme||"light")==="dark"?"light":"dark";return F(t),t}const pe="https://unlikelyarchivist--adb5d626bc6311f1a25f1607ee4eb77e.web.val.run/";function he(){const e=location.hostname;if(e==="localhost"||e==="127.0.0.1"||location.protocol==="file:")return;try{if(/[?&]me\b/.test(location.search)&&localStorage.setItem("visit-tracker-ignore","1"),localStorage.getItem("visit-tracker-ignore"))return}catch{return}let t=null;try{const i=sessionStorage.getItem("visit-tracker");i&&(t=JSON.parse(i))}catch{t=null}t||(t={id:Date.now().toString(36)+Math.random().toString(36).slice(2),device:/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)?"mobile":"desktop",referrer:document.referrer.startsWith(location.origin)?"":document.referrer,pages:[],clicks:[]});const s={path:location.pathname+location.hash,ms:0};t.pages.push(s);let r=document.visibilityState==="visible"?Date.now():null;const o=()=>{if(t){r!==null&&(s.ms+=Date.now()-r,r=null);try{sessionStorage.setItem("visit-tracker",JSON.stringify(t))}catch{}typeof navigator.sendBeacon=="function"&&navigator.sendBeacon(pe,JSON.stringify(t))}};document.addEventListener("click",i=>{const n=i.target?.closest("a, button");!n||!t||(t.clicks.push({page:location.pathname,label:(n.textContent||n.getAttribute("aria-label")||"").trim().replace(/\s+/g," ").slice(0,80),href:n.getAttribute("href")||void 0}),o(),document.visibilityState==="visible"&&(r=Date.now()))}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?o():r=Date.now()}),window.addEventListener("pagehide",o)}function ue(){const e=document.getElementById("lightbox"),t=document.getElementById("lightbox-img"),s=document.getElementById("lightbox-caption"),r=document.getElementById("lightbox-close");if(!e||!t||!s||!r)return;const o=()=>{e.hidden=!0,document.body.style.overflow=""};document.addEventListener("click",i=>{const l=i.target?.closest(".lightbox-trigger");if(!l)return;const n=l.dataset.lightboxSrc;n&&(t.src=n,t.alt=l.dataset.lightboxAlt||"",s.textContent=l.dataset.lightboxCaption||"",e.hidden=!1,document.body.style.overflow="hidden",r.focus())}),r.addEventListener("click",o),e.addEventListener("click",i=>{i.target===e&&o()}),window.addEventListener("keydown",i=>{i.key==="Escape"&&!e.hidden&&o()})}function me(){const e=Array.from(document.querySelectorAll("[data-nav]")),t=document.getElementById("top"),s=e.map(i=>({link:i,section:document.getElementById(i.dataset.nav||"")})).filter(i=>!!i.section),r=i=>{e.forEach(l=>{l.classList.toggle("is-active",i!==null&&l.dataset.nav===i)})},o=new IntersectionObserver(i=>{for(const l of i)l.isIntersecting&&(l.target.id==="top"?r(null):r(l.target.id))},{rootMargin:"-24% 0px -62% 0px",threshold:.01});t&&o.observe(t),s.forEach(({section:i})=>o.observe(i)),window.addEventListener("scroll",()=>{window.scrollY<180&&r(null)},{passive:!0})}function ge(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll(".flagship-card, .archive-card, .exhibition-piece, .fab-piece, .directed-card, .darkroom-bench");e.forEach(s=>s.classList.add("reveal-ready"));const t=new IntersectionObserver(s=>{for(const r of s)r.isIntersecting&&(r.target.classList.add("is-revealed"),t.unobserve(r.target))},{rootMargin:"0px 0px -6% 0px",threshold:.04});e.forEach(s=>t.observe(s))}function be(){F(ce());const e=document.body.dataset.page,t=e==="props"||e==="tech"?e:null,s=[["top",W],["paths",le],["systems",K],["archive",J],["failsafe",Y],["worlds",ee],["film",se],["dossier",r=>oe(r,t)]];for(const[r,o]of s){const i=document.getElementById(r);i&&o(i)}document.getElementById("theme-toggle")?.addEventListener("click",()=>{const r=de();x(r==="dark"?"Dark mode on":"Light mode on")}),ue(),me(),ge(),he()}be();
