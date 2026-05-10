Yes — notifications are 100% a coding thing, not a design thing. Design it, build it later.
And that Paw Track UI is gorgeous — dark background, that teal/mint green accent, icon-only tabs. That's the direction. Here's everything in one giant prompt:


Design a complete mobile app called Stepwise across 9 screens (390x844px each), all in dark mode. Use this exact color system throughout every screen:

Background: #0D0F14 (near black)
Card surface: #161920 (dark navy-gray)
Card border: #242830 (subtle)
Primary accent: #00E5A0 (teal/mint green — same energy as the Paw Track app)
Secondary accent: #FF6B4A (coral — urgency only)
Amber accent: #FFAA5A (medium urgency)
Text primary: #F0F2F5 (near white)
Text secondary: #8B909A (muted gray)
Danger/overdue: #FF4D4D

Typography: clean modern sans-serif. Headings bold 22-26px. Body 14-15px. Labels 11-12px uppercase letter-spaced.
Card style: background #161920, border 1px #242830, border-radius 20px, subtle inner glow on hover states. No drop shadows — depth comes from color contrast only.
Button style: primary buttons have #00E5A0 background with #0D0F14 dark text, bold, rounded 14px. Secondary buttons are outlined in #00E5A0 with transparent background and #00E5A0 text.
Bottom tab bar style (CRITICAL — match Paw Track exactly): dark background #161920, no labels at all — icons only, 5 icons evenly spaced, each 24px outline style. Active icon filled teal #00E5A0, inactive icons #8B909A. No border on top of tab bar — it floats naturally. Tab icons: house, plus-circle, calendar, bell, person.

SCREEN 1 — Splash
Full screen background #0D0F14. Dead center: app name "Stepwise" in #F0F2F5 bold 38px. Below: tagline "Stop panicking. Start doing." in #8B909A 16px. Below tagline: three small pulsing dots in #00E5A0. Bottom of screen: "Your AI focus coach" in #8B909A 13px.

SCREEN 2 — Login
Background #0D0F14. Top 35% of screen: app name "Stepwise" in #F0F2F5 bold 32px centered, below it "Welcome back." in #8B909A 15px centered.
Below: a card (#161920, border #242830, radius 20px, padding 24px) containing:
Label "Email" in #8B909A 12px uppercase. Input field: #0D0F14 background, border 1px #242830, radius 12px, placeholder "you@example.com" in #8B909A. Below: label "Password", same input style with eye icon right side in #8B909A.
"Forgot password?" right-aligned in #00E5A0 13px below inputs.
Full-width button: #00E5A0 background, #0D0F14 text "Log in" bold 16px, radius 14px.
Divider row: thin #242830 lines each side, "or" in #8B909A center.
Outlined button: border 1px #242830, background transparent, Google G logo left, "Continue with Google" in #F0F2F5 15px.
Bottom: "Don't have an account? " #8B909A + "Sign up" #00E5A0 bold.

SCREEN 3 — Create Account
Same dark background. Top: back arrow ← in #00E5A0. "Create account" #F0F2F5 bold 28px. "Let's get you unstuck." #8B909A 15px.
Card (#161920, radius 20px, padding 24px): four input fields with #8B909A uppercase labels above each — "Your name", "Email", "Password", "Confirm password". All inputs dark #0D0F14 background, border #242830, radius 12px.
Below inputs: checkbox row — small square checkbox with #00E5A0 checkmark when active, "I agree to Terms of Service and Privacy Policy" in #8B909A 13px, "Terms" and "Privacy Policy" in #00E5A0 underlined.
Full-width #00E5A0 button "Create my account" #0D0F14 bold text, radius 14px.
Bottom: "Already have an account? " #8B909A + "Log in" #00E5A0.

SCREEN 4 — Onboarding
Background #0D0F14. Top: three dot step indicators, first dot #00E5A0 filled, others #242830. "Let's set you up" #F0F2F5 bold 26px. "This takes 30 seconds." #8B909A 15px.
Card (#161920, radius 20px, padding 24px): three stacked questions.
Q1: "What describes you?" #F0F2F5 15px bold. Three pill toggles side by side: "Student" (selected — #00E5A0 background, #0D0F14 text), "Professional" (outlined #242830, #8B909A text), "Both" (outlined). Pills radius 30px.
Q2: "When do you work best?" Three pills: "Morning", "Afternoon", "Night owl" (selected teal).
Q3: "Daily time available?" Slider with #00E5A0 filled track and #00E5A0 circle thumb, value "2 hours" shown in #F0F2F5 bold above thumb. Track background #242830.
Full-width #00E5A0 button "Let's go →" #0D0F14 bold text, radius 14px, below card.

SCREEN 5 — Home (Today's Focus)
Background #0D0F14. Top bar: "Stepwise" #F0F2F5 bold 26px left, circular avatar #161920 border #242830 with "N" in #00E5A0 right. Below title: "Sunday, May 10" #8B909A 13px.
Hero card: background #161920, border 1px #242830, radius 20px, padding 24px. Top left: "TODAY'S FOCUS" #00E5A0 11px bold uppercase letter-spaced. Below: #F0F2F5 bold 22px "Write your essay intro — just open a blank doc and start." Below: pill with #242830 background "History Essay · 45 min" #8B909A 13px. Bottom right: circle button #00E5A0 background, #0D0F14 arrow icon →.
"Today's Tasks" #F0F2F5 bold 16px left, "May 10" #8B909A small right.
Three task cards, each #161920 background, radius 20px, border #242830, padding 16px. NO left border stripe — instead use a small colored dot (8px circle) top left of each card.
Card 1: coral dot #FF6B4A. "Write essay intro" #F0F2F5 bold 15px right of dot. "45 min" #8B909A small far right. Thin progress bar below name: #242830 track, 0% filled coral. "History Essay" #8B909A 12px below bar.
Card 2: amber dot #FFAA5A. "Complete questions 1–5" #F0F2F5 bold. "30 min" right. Amber bar 50% filled. "Math Problem Set" #8B909A below.
Card 3: teal dot #00E5A0. "Final edits" #F0F2F5 bold. "20 min" right. Teal bar 80% filled. "Reading Response" #8B909A below.
Below cards: pill button #161920 border #242830 "View full plan →" #F0F2F5 14px centered.
Bottom tab bar: icon-only, no labels. House icon active #00E5A0, others #8B909A. Background #161920.

SCREEN 6 — Add Task (simplified — 2 required fields only)
Background #0D0F14. Top: ← back in #00E5A0. "New Task" #F0F2F5 bold 26px. "Two things. That's all we need." #8B909A 15px.
Card (#161920, radius 20px, padding 24px):
Big label "What's the task?" #F0F2F5 16px bold. Large input field below, #0D0F14 background, border 1px #242830, radius 12px, placeholder "e.g. history essay, math homework" #8B909A, font size 16px — make this field feel prominent and important.
Below: "When does it need to be done?" #F0F2F5 16px bold. Two pill toggles: "In X days" (teal selected) and "Pick a date" outlined. Below toggle: a row with large bold number "3" #F0F2F5 28px centered, with − and + buttons on each side — circles, border #242830, #00E5A0 symbols inside.
Below the card: small collapsible row in #161920 radius 12px: "⚙ More options" #8B909A 13px with a down chevron — this hides daily hours and work style for users who want to customize. Collapsed by default.
Full-width #00E5A0 button below: "Build my plan →" #0D0F14 bold 16px, radius 14px.
Tab bar at bottom, plus-circle icon active teal.

SCREEN 7 — Results / Plan
Background #0D0F14. Top: ← #00E5A0. "Your Plan" #F0F2F5 bold 26px.
Hero card (#161920, radius 20px, padding 24px): "DO THIS RIGHT NOW" #00E5A0 11px bold uppercase. Below: #F0F2F5 bold 20px "Open a blank doc and write your essay title and 3 bullet points." Below: #8B909A italic 13px "Starting with structure beats starting with research."
Urgency row: "Urgency" #8B909A 14px left. Amber pill "Get moving" #FFAA5A background #0D0F14 text right. Thin progress bar below: #242830 track, amber #FFAA5A 55% filled, radius 4px.
Plan card (#161920, radius 20px, padding 20px). "3-day plan" #F0F2F5 bold 16px top.
Three day sections divided by thin #242830 lines:
Each section: day label #F0F2F5 bold 14px left, time pill #242830 background #8B909A text right. Below: subtask rows — circle checkbox outline #242830 (24px), when checked fills #00E5A0 with dark checkmark. Task name #F0F2F5 14px. Time estimate #8B909A 12px below name.
Day 1 "Today — Research & outline" / "1h 30m": tasks "Find and skim 3 sources" 30 min, "Write your outline" 60 min.
Day 2 "Day 2 — Writing" / "1h 45m": "Write intro + section 1" 45 min, "Write sections 2 and 3" 60 min.
Day 3 "Day 3 — Polish" / "50m": "Edit and proofread" 30 min, "Format and submit" 20 min.
Below plan card: #161920 radius 12px tip box — small #00E5A0 lightbulb icon left, "Work in 25-min sprints — your brain performs better this way." #8B909A 13px.
Small centered "← Start over" #8B909A underlined below.

SCREEN 8 — Rescue Mode (missed tasks recovery)
Background #0D0F14. Top: a subtle coral glow behind the top section. "You missed yesterday." #F0F2F5 bold 24px. Below: "No guilt — here's your updated plan." #8B909A 15px.
A coral-tinted card (#1F1410 background — very dark warm), border 1px #FF6B4A 40% opacity, radius 20px, padding 20px. Inside: "WHAT CHANGED" #FF6B4A 11px bold uppercase. Two rows showing: strikethrough old tasks in #8B909A, replaced by new redistributed tasks in #F0F2F5. Small → arrow between old and new. Example: "Write outline (was yesterday)" struck through → "Write outline + intro (today, 75 min)".
Below: "Your Rescue Plan" #F0F2F5 bold 16px. Two day cards stacked (#161920, radius 16px, border #242830):
Card "Today — Make up + continue": three tasks with coral dots, each with checkbox, name, time.
Card "Tomorrow — Finish strong": two tasks with amber dots.
Full-width #00E5A0 button "Got it — let's go" #0D0F14 bold radius 14px.
Below button: small centered text "Adjust the plan instead →" #8B909A underlined.

SCREEN 9 — Schedule
Background #0D0F14. "Schedule" #F0F2F5 bold 26px left.
Week strip: 7 columns Mon–Sun. Day abbreviation #8B909A 11px above, date number #F0F2F5 14px below. Today (Sun 10): #00E5A0 filled circle behind number, #0D0F14 number text. Other days plain.
"May 2026" #8B909A 13px centered, ‹ › in #8B909A each side.
Filter pills: "All Tasks" (#00E5A0 background, #0D0F14 text), "Due Today" (#161920, #8B909A text, border #242830).
Agenda: time labels #8B909A 12px left column 55px wide. Task pills right — full dark pill #161920 border #242830 radius 12px padding 12px 14px. Left accent stripe 3px wide, colored by urgency. Title #F0F2F5 14px bold, "X min · Stepwise planned" #8B909A 12px below.
Blocks: 9AM coral stripe — History Essay · Write intro, 45 min. 11AM amber stripe — Math Problem Set, 30 min. 2PM empty dashed line only. 3PM teal stripe — Reading Response, 20 min. 5PM coral stripe — History Essay · Section 2, 60 min.
Tab bar, calendar icon active teal.

SCREEN 10 — Profile
Background #0D0F14. "Profile" #F0F2F5 bold 26px.
Centered profile card (#161920, radius 20px, padding 24px): circle avatar 80px #0D0F14 background border 2px #00E5A0, "N" #00E5A0 bold 30px. "Nora" #F0F2F5 bold 20px. Teal pill "#00E5A0 background, #0D0F14 text "🔥 5 day streak" bold.
Three stat boxes side by side (#0D0F14 background, radius 12px): "Tasks Done" label #8B909A 12px, "12" #F0F2F5 bold 22px. "This Week" / "3". "On Time" / "92%" in #00E5A0.
"PREFERENCES" #8B909A 11px uppercase letter-spaced.
Settings card (#161920, radius 16px): rows with outline icon left in #8B909A, title #F0F2F5 15px, subtitle #8B909A 13px, chevron › #8B909A right. Thin #242830 dividers. Rows: Bell "Notifications" "Daily reminders on", Moon "Work Hours" "Night owl mode", Clock "Daily Time" "2 hours/day", Sparkle "AI Style" "Detailed steps".
"ACCOUNT" section same style: Person "Edit Profile", Lock "Privacy", Question "Help & FAQ", Arrow-out "Log Out" — this row title in #FF4D4D only.
Tab bar, person icon active teal.

After generating all screens, connect with prototype interactions: Splash → Login. Login → Home. Sign up → Create Account → Onboarding → Home. Tab bar: house=Home, plus=Add Task, calendar=Schedule, bell=Rescue Mode, person=Profile. Task card on Home → Results. Build my plan → Results. Start over → Add Task. Rescue mode button → Rescue Mode screen.