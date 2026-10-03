const API_URL = "http://127.0.0.1:8000/api/validate";

let currentValidation = JSON.parse(localStorage.getItem("fm_current")) || {
  idea: "AI Career Roadmap Agent",
  target_customer: "College students and fresh graduates",
  business_model: "Freemium",
  validation_readiness: "78/100",
  summary: "An AI platform that creates personalized career roadmaps by analyzing degree, skills, interests and career goals.",
  problem: {problem:"Students often struggle to decide which skills, projects and certifications to prioritize for their target career."},
  customer: {primary_segment:"College students and fresh graduates"},
  competitors: {potential_gap:"Personalization and guided action planning can differentiate the product.", competitors:[
    {name:"LinkedIn Learning",strength:"Large learning ecosystem",gap:"Less personalized roadmap generation"},
    {name:"Coursera",strength:"Large course catalog",gap:"Not focused on end-to-end career planning"},
    {name:"Career coaching",strength:"Human guidance",gap:"Can be expensive or difficult to scale"}
  ]},
  risks:{risks:[
    {risk:"Customers may not be willing to pay",test:"Interview at least 20 potential customers"},
    {risk:"Strong competition",test:"Analyze at least 5 competitors"},
    {risk:"MVP may become too complicated",test:"Start with only core features"}
  ]},
  mvp:{features:["User registration","AI career matching","Personalized roadmaps","Basic analytics"],defer:["Mobile app","Advanced analytics","Mentorship integration"]},
  market:{signals:["Growing interest in personalized AI products","Large student and graduate audience","Digital products can scale globally"]},
  business:{model_hypotheses:["Freemium","Premium subscription","Institutional plan"],pricing_experiments:["Free","₹199/month","₹499/month"]},
  next_steps:["Define target customer","Interview 20 potential customers","Research 5 competitors","Build MVP","Find first 10 users"]
};

const sampleIdeas = [
  {title:"AI Career Roadmap Agent",sector:"Education",desc:"Personalized skills, projects and learning roadmap for students.",model:"Freemium"},
  {title:"AI Campus Food Planner",sector:"Food",desc:"Budget-friendly meal recommendations around college campuses.",model:"Subscription"},
  {title:"AI Farmer Market Assistant",sector:"AgriTech",desc:"Helps farmers plan crop and market decisions using local information.",model:"B2B / Freemium"},
  {title:"AI Resume Interview Coach",sector:"Career",desc:"Resume feedback and personalized interview preparation for freshers.",model:"Freemium"},
  {title:"AI Local Business Copilot",sector:"SMB",desc:"Customer support, marketing and daily task automation for small businesses.",model:"SaaS"}
];

function saveCurrent(){localStorage.setItem("fm_current",JSON.stringify(currentValidation));}
function getHistory(){return JSON.parse(localStorage.getItem("fm_history")||"[]");}
function saveHistory(){
  const h=getHistory();
  const item={...currentValidation,id:Date.now(),date:new Date().toLocaleString()};
  h.unshift(item);
  localStorage.setItem("fm_history",JSON.stringify(h.slice(0,30)));
  showToast("Validation saved to History");
}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400);}
function go(page){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.querySelector(`#page-${page}`).classList.add("active");document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.page===page));renderPage(page);}
document.querySelectorAll(".nav-item").forEach(n=>n.addEventListener("click",()=>go(n.dataset.page)));

function renderDashboard(){
  const c=currentValidation;
  document.getElementById("page-dashboard").innerHTML=`
    <div class="page-title">
      <div><h2>Welcome back, Founder!</h2><p>Your startup idea has been analyzed. Here's your validation overview and next steps.</p></div>
      <div class="actions">
        <button class="primary" onclick="exportReport()">⇩ Export Report</button>
        <button class="secondary" onclick="saveHistory()">◴ Save to History</button>
        <button class="secondary" onclick="go('validate')">↻ Revalidate Idea</button>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="hero-card">
        <span class="tag">Education</span><button class="secondary small" style="float:right" onclick="go('validate')">✎ Edit Idea</button>
        <h2>${esc(c.idea)}</h2><p>${esc(c.summary)}</p>
        <div class="meta-row">
          <div><span class="label">Target Customer</span><strong>${esc(c.target_customer||c.customer?.primary_segment)}</strong></div>
          <div><span class="label">Business Model</span><strong>${esc(c.business_model||"Freemium")}</strong></div>
          <div><span class="label">Created</span><strong>${new Date().toLocaleDateString()}</strong></div>
        </div>
      </div>
      <div class="card score-card"><div class="score-ring"><div><strong>${esc(c.validation_readiness||"78/100").split("/")[0]}</strong><span>Validation Readiness</span></div></div></div>
    </div>

    <div class="grid grid-4" style="margin-top:13px">
      ${metric("Problem Fit",82)}${metric("Customer Fit",76)}${metric("Market Opportunity",68)}${metric("Business Potential",74)}
    </div>

    <div class="grid grid-3" style="margin-top:13px">
      <div class="card insight"><h3>✦ AI Founder Insight</h3><p>${esc(c.summary)} Focus on customer interviews, differentiation and willingness-to-pay tests before investing heavily in development.</p><button class="primary small" onclick="go('action')">View Action Plan →</button></div>
      <div class="card"><h3>⌘ Competitor Analysis <span class="badge yellow" style="float:right">Medium Competition</span></h3>${(c.competitors?.competitors||[]).map(x=>`<div class="list-row"><div><strong>${esc(x.name)}</strong><br><span>${esc(x.gap)}</span></div><span class="badge">${esc(x.strength)}</span></div>`).join("")}</div>
      <div class="card"><h3>♢ Risk Radar</h3>${(c.risks?.risks||[]).map((x,i)=>`<div class="list-row"><strong>${esc(x.risk)}</strong><span class="badge ${i===0?'red':i===1?'yellow':'green'}">${i===0?'High':i===1?'Medium':'Low'}</span></div>`).join("")}</div>
    </div>

    <div class="grid grid-3" style="margin-top:13px">
      <div class="card"><h3>🏛 Government Funding Opportunities <span class="badge yellow" style="float:right">Check Eligibility</span></h3>
        <div class="list-row"><div><strong>Startup India Seed Fund Scheme</strong><br><span>Potentially relevant early-stage support; verify current criteria and permitted use.</span></div><button class="secondary small" onclick="go('funding')">View →</button></div>
        <p class="tiny muted" style="margin-top:10px">Demo data only. Always verify current scheme details on official government portals.</p>
      </div>
      <div class="card"><h3>🛠 MVP Builder</h3>${(c.mvp?.features||[]).slice(0,4).map(x=>`<div class="list-row"><strong>✓ ${esc(x)}</strong><span class="badge green">Must Build</span></div>`).join("")}<button class="secondary small" style="margin-top:9px" onclick="go('action')">Open Roadmap →</button></div>
      <div class="card"><h3>💰 Funding Planner</h3><p class="tiny muted">Create a planning budget for any funding amount. This is a planning aid, not a statement of government-approved expenditure.</p><button class="primary small" onclick="go('planner')">Open Planner →</button></div>
    </div>
  `;
}
function metric(name,val){return `<div class="card metric"><div class="metric-top"><span>${name}</span><strong>${val}/100</strong></div><div class="bar"><span style="width:${val}%"></span></div></div>`}

function renderValidate(){
  document.getElementById("page-validate").innerHTML=`
    <div class="page-title"><div><h2>Validate a Startup Idea</h2><p>Send your idea to the FounderMind validation engine.</p></div></div>
    <div class="card form-card">
      <div class="form-group"><label>STARTUP IDEA</label><textarea id="vIdea" placeholder="Describe your startup idea...">${esc(currentValidation.idea||"")}</textarea></div>
      <div class="form-group"><label>TARGET CUSTOMER</label><input id="vCustomer" value="${esc(currentValidation.target_customer||"")}"></div>
      <div class="form-group"><label>BUSINESS MODEL</label><input id="vModel" value="${esc(currentValidation.business_model||"")}"></div>
      <button class="primary" id="validateBtn" onclick="validateIdea()">✦ Analyze My Idea</button>
      <div id="validateStatus" class="tiny muted" style="margin-top:10px"></div>
    </div>
  `;
}
async function validateIdea(){
  const idea=document.getElementById("vIdea").value.trim(), customer=document.getElementById("vCustomer").value.trim(), model=document.getElementById("vModel").value.trim();
  if(!idea){showToast("Enter a startup idea first");return}
  document.getElementById("validateStatus").textContent="Analyzing idea...";
  try{
    const r=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({idea,target_customer:customer,business_model:model})});
    if(!r.ok) throw new Error("API error");
    currentValidation={...await r.json(),target_customer:customer,business_model:model};
    saveCurrent(); saveHistory(); renderDashboard(); go("dashboard"); showToast("Idea analyzed successfully");
  }catch(e){
    document.getElementById("validateStatus").textContent="Backend not reachable. Start FastAPI and try again.";
    showToast("Could not connect to FounderMind API");
  }
}

function renderIdeas(){
  document.getElementById("page-ideas").innerHTML=`
    <div class="page-title"><div><h2>New Startup Ideas</h2><p>Explore ideas and send one directly into validation.</p></div><button class="primary" onclick="generateIdeas()">✦ Generate More Ideas</button></div>
    <div id="ideaGrid" class="idea-grid">${ideaCards(sampleIdeas)}</div>
  `;
}
function ideaCards(items){return items.map(x=>`<div class="idea-card"><span class="tag">${esc(x.sector)}</span><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p><div class="chips"><span class="chip">${esc(x.model)}</span><span class="chip">AI</span></div><button class="secondary small" onclick="useIdea('${esc(x.title)}','${esc(x.desc)}','${esc(x.model)}')">Validate This Idea →</button></div>`).join("")}
function generateIdeas(){
  const more=[
    {title:"AI Scholarship Match",sector:"EdTech",desc:"Matches students with scholarships based on education, location and eligibility.",model:"Freemium"},
    {title:"AI SME Finance Assistant",sector:"FinTech",desc:"Helps small businesses organize cash flow and prepare finance insights.",model:"SaaS"},
    {title:"AI Event Operations Agent",sector:"Events",desc:"Plans vendors, budgets, schedules and attendee communication.",model:"Subscription"}
  ];
  document.getElementById("ideaGrid").innerHTML=ideaCards(more);
  showToast("New ideas generated");
}
function useIdea(title,desc,model){currentValidation={...currentValidation,idea:`${title}: ${desc}`,target_customer:"Define your first target customer",business_model:model};saveCurrent();go("validate");}

function renderMarket(){
  const comps=currentValidation.competitors?.competitors||[];
  document.getElementById("page-market").innerHTML=`
    <div class="page-title"><div><h2>Market & Competition</h2><p>Use this page as a structured place for competitor and market hypotheses.</p></div></div>
    <div class="grid grid-3">
      <div class="card"><h3>Market Signals</h3>${(currentValidation.market?.signals||[]).map(x=>`<div class="list-row"><strong>${esc(x)}</strong><span>Signal</span></div>`).join("")}</div>
      <div class="card"><h3>Opportunity Score</h3><div class="stat">68/100</div><div class="bar"><span style="width:68%"></span></div><p class="tiny muted">Treat this as a prototype indicator until supported by real market research.</p></div>
      <div class="card"><h3>Differentiation</h3><p class="tiny muted">${esc(currentValidation.competitors?.potential_gap||"Identify a clear gap in existing solutions.")}</p></div>
    </div>
    <div class="card" style="margin-top:13px"><h3>Competitor Matrix</h3><table class="table"><thead><tr><th>Competitor</th><th>Strength</th><th>Gap / Opportunity</th></tr></thead><tbody>${comps.map(x=>`<tr><td>${esc(x.name)}</td><td>${esc(x.strength)}</td><td>${esc(x.gap)}</td></tr>`).join("")}</tbody></table></div>
  `;
}

function renderFunding(){
  document.getElementById("page-funding").innerHTML=`
    <div class="page-title"><div><h2>Funding Navigator</h2><p>Explore potentially relevant government support and verify current eligibility before applying.</p></div></div>
    <div class="card">
      <h3>🏛 Startup India Seed Fund Scheme</h3>
      <span class="badge yellow">Potentially Relevant — Verify Eligibility</span>
      <div class="grid grid-3" style="margin-top:14px">
        <div><span class="label">What FounderMind does</span><p class="tiny">Matches your startup profile against scheme information stored in the app.</p></div>
        <div><span class="label">What you should check</span><p class="tiny">Current eligibility, recognition/status requirements, application route and permitted use of funds.</p></div>
        <div><span class="label">Source</span><p class="tiny">Use official Startup India / Government portals for current details.</p></div>
      </div>
      <div class="actions" style="margin-top:12px"><button class="primary" onclick="openOfficial()">Open Official Portal</button><button class="secondary" onclick="showToast('Add more verified schemes to your scheme database')">Add Scheme</button></div>
    </div>
    <div class="grid grid-3" style="margin-top:13px">
      ${["MSME support schemes","State startup / innovation support","Sector-specific programs"].map((x,i)=>`<div class="card"><h3>${x}</h3><span class="badge">${i===0?'Explore':'Verify current availability'}</span><p class="tiny muted">Connect this card to a verified government data source before using it in a live jury demo.</p></div>`).join("")}
    </div>
  `;
}
function openOfficial(){window.open("https://www.startupindia.gov.in/content/sih/en/government-schemes.html","_blank")}

function renderPlanner(){
  document.getElementById("page-planner").innerHTML=`
    <div class="page-title"><div><h2>Funding Planner</h2><p>Create a startup budget based on the amount you enter. This is a planning tool, not a funding eligibility decision.</p></div></div>
    <div class="grid grid-2">
      <div class="card">
        <h3>Enter Funding Amount</h3>
        <div class="form-group"><label>AMOUNT (₹)</label><input id="fundAmount" type="number" value="1000000" oninput="updatePlanner()"></div>
        <div class="list">${budgetRows()}</div>
      </div>
      <div class="card"><h3>Suggested Allocation</h3><div id="budgetVisual"></div><p class="tiny muted">Before spending any grant or support, check the applicable scheme's approved purpose and conditions.</p></div>
    </div>
  `;
  updatePlanner();
}
function budgetRows(){
  return [["Product / MVP",30],["Technology & AI",20],["Marketing",15],["Team / Freelancers",15],["Research & Customers",5],["Legal / Compliance",5],["Reserve",10]].map(([n,p])=>`<div class="list-row"><strong>${n}</strong><span>${p}%</span></div>`).join("");
}
function updatePlanner(){
  const el=document.getElementById("budgetVisual"); if(!el)return;
  const amount=Number(document.getElementById("fundAmount").value||0);
  const parts=[["Product / MVP",30],["Technology & AI",20],["Marketing",15],["Team / Freelancers",15],["Research & Customers",5],["Legal / Compliance",5],["Reserve",10]];
  el.innerHTML=parts.map(([n,p])=>`<div class="progress-item"><div class="row"><span>${n}</span><strong>₹${Math.round(amount*p/100).toLocaleString("en-IN")}</strong></div><div class="bar"><span style="width:${p}%"></span></div></div>`).join("");
}

function renderAction(){
  document.getElementById("page-action").innerHTML=`
    <div class="page-title"><div><h2>90-Day Founder Action Plan</h2><p>Turn the validation report into concrete experiments and milestones.</p></div></div>
    <div class="grid grid-2">
      <div class="card"><h3>Startup Journey</h3><div class="timeline">
        ${[
          ["Week 1","Define target customer and interview 20 potential users."],
          ["Week 2–4","Build a small MVP and test the core value proposition."],
          ["Month 2","Get the first 10 users and measure feedback."],
          ["Month 3","Test pricing, improve retention and prepare for launch."]
        ].map(x=>`<div class="timeline-item"><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join("")}
      </div></div>
      <div class="card"><h3>Next Steps</h3>${(currentValidation.next_steps||[]).map((x,i)=>`<div class="list-row"><strong>${i<2?'✓':'○'} ${esc(x)}</strong><span class="badge ${i<2?'green':''}">${i<2?'Done':'Next'}</span></div>`).join("")}</div>
    </div>
  `;
}

function renderHistory(){
  const h=getHistory();
  document.getElementById("page-history").innerHTML=`
    <div class="page-title"><div><h2>Validation History</h2><p>Your previous startup analyses are stored locally in this browser.</p></div><button class="secondary" onclick="clearHistory()">Clear History</button></div>
    ${h.length?`<div class="card"><table class="table"><thead><tr><th>Idea</th><th>Score</th><th>Customer</th><th>Date</th><th></th></tr></thead><tbody>${h.map(x=>`<tr><td>${esc(x.idea)}</td><td><span class="badge green">${esc(x.validation_readiness)}</span></td><td>${esc(x.target_customer||"—")}</td><td>${esc(x.date)}</td><td><button class="secondary small" onclick="loadHistory(${x.id})">Open</button></td></tr>`).join("")}</tbody></table></div>`:`<div class="empty">No saved validations yet. Run a validation and click “Save to History”.</div>`}
  `;
}
function loadHistory(id){const x=getHistory().find(a=>a.id===id);if(x){currentValidation=x;saveCurrent();go("dashboard");showToast("Historical report loaded")}}
function clearHistory(){localStorage.removeItem("fm_history");renderHistory();showToast("History cleared")}

function renderReports(){
  document.getElementById("page-reports").innerHTML=`
    <div class="page-title"><div><h2>Reports</h2><p>Export your current validation as a structured report.</p></div><button class="primary" onclick="exportReport()">⇩ Export JSON Report</button></div>
    <div class="card"><h3>${esc(currentValidation.idea)}</h3><p class="tiny muted">${esc(currentValidation.summary)}</p>
      <div class="grid grid-3" style="margin-top:15px"><div class="card"><span class="label">Readiness</span><div class="stat">${esc(currentValidation.validation_readiness)}</div></div><div class="card"><span class="label">Customer</span><div class="tiny" style="margin-top:8px">${esc(currentValidation.target_customer||"—")}</div></div><div class="card"><span class="label">Business Model</span><div class="tiny" style="margin-top:8px">${esc(currentValidation.business_model||"—")}</div></div></div>
    </div>
  `;
}
function exportReport(){
  const blob=new Blob([JSON.stringify({...currentValidation,exported_at:new Date().toISOString()},null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="FounderMind-Validation-Report.json";a.click();URL.revokeObjectURL(a.href);showToast("Report exported");
}

function renderGuide(){
  document.getElementById("page-guide").innerHTML=`
    <div class="page-title"><div><h2>Founder Guide</h2><p>A simple path from idea to startup.</p></div></div>
    <div class="card"><div class="timeline">${[
      ["01 — Idea","Clearly describe the customer problem and proposed solution."],
      ["02 — Validate","Interview customers and test your assumptions."],
      ["03 — Prototype","Build the smallest useful version."],
      ["04 — Market","Measure usage, feedback and willingness to pay."],
      ["05 — Funding","Explore relevant official support and funding options."],
      ["06 — Launch","Acquire early users and improve based on evidence."]
    ].map(x=>`<div class="timeline-item"><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join("")}</div></div>
  `;
}
function renderSettings(){
  document.getElementById("page-settings").innerHTML=`
    <div class="page-title"><div><h2>Settings</h2><p>Prototype settings for your local FounderMind dashboard.</p></div></div>
    <div class="card"><h3>Data</h3><p class="tiny muted">History is stored in your browser using localStorage.</p><button class="secondary" onclick="localStorage.clear();location.reload()">Reset Local Demo Data</button></div>
  `;
}
function renderPage(page){
  const fn={dashboard:renderDashboard,validate:renderValidate,ideas:renderIdeas,market:renderMarket,funding:renderFunding,planner:renderPlanner,action:renderAction,history:renderHistory,reports:renderReports,guide:renderGuide,settings:renderSettings}[page];
  if(fn)fn();
}
renderDashboard();
renderPage("dashboard");
