const http = require("http");
const https = require("https");

const API_KEY = "d813063c6e49c7f250bab0beef40";
const PORT = process.env.PORT || 3000;

function fetchDataGolf(endpoint) {
  return new Promise(function(resolve, reject) {
    var url = "https://feeds.datagolf.com/" + endpoint + "&key=" + API_KEY + "&file_format=json";
    console.log("Fetching:", url);
    var req = https.get(url, function(res) {
      console.log("Status:", res.statusCode);
      var data = "";
      res.on("data", function(c) { data += c; });
      res.on("end", function() {
        console.log("Done, bytes:", data.length);
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error("Parse error: " + e.message)); }
      });
    });
    req.on("error", function(e) { reject(new Error("Network: " + e.message)); });
    req.setTimeout(15000, function() { req.destroy(); reject(new Error("Timeout")); });
  });
}

var P = [];
P.push('<!DOCTYPE html><html lang="en"><head>');
P.push('<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>');
P.push('<title>propgeekzeke - The Players Championship</title>');
P.push('<style>');
P.push('*{box-sizing:border-box;margin:0;padding:0}');
P.push('body{background:#0a0f0d;color:#e8ede9;font-family:Georgia,serif;min-height:100vh}');
P.push('header{background:linear-gradient(135deg,#0d1f15,#0a0f0d);border-bottom:1px solid #1e3d25;padding:24px 32px}');
P.push('h1{font-size:24px;font-weight:normal;color:#c8e6cb;margin-bottom:4px}');
P.push('.subtitle{font-size:12px;color:#4a7a52;font-style:italic}');
P.push('.lbl{font-size:9px;color:#4a7a52;letter-spacing:.15em;text-transform:uppercase;font-family:monospace;margin-bottom:4px}');
P.push('.controls{display:flex;align-items:flex-end;gap:16px;margin-top:16px;flex-wrap:wrap}');
P.push('.ctrl{display:flex;flex-direction:column}');
P.push('.stat-bar{display:flex;gap:28px;margin-top:16px;flex-wrap:wrap}');
P.push('.stat-val{font-size:17px;color:#a5d6a7;font-family:monospace;margin-top:2px}');
P.push('input[type=number],input[type=text]{background:#0d1f15;border:1px solid #1e3d25;color:#c8e6cb;font-family:monospace;border-radius:4px;outline:none;padding:6px 10px}');
P.push('input[type=number]{width:80px;font-size:14px;text-align:center}');
P.push('input[type=text]{width:200px;font-size:12px}');
P.push('select{background:#0d1f15;border:1px solid #1e3d25;color:#c8e6cb;font-family:monospace;border-radius:4px;outline:none;padding:6px 10px;font-size:12px}');
P.push('button{padding:8px 18px;background:#2d6a3f;color:#c8e6cb;border:1px solid #2d6a3f;border-radius:4px;cursor:pointer;font-size:11px;font-family:monospace;letter-spacing:.1em}');
P.push('button:disabled{background:#1e3d25;color:#5a9e6a;cursor:not-allowed}');
P.push('.btn-sec{background:#0d1f15;color:#4a7a52;border-color:#1e3d25;font-size:10px;padding:6px 12px}');
P.push('main{padding:20px 32px}');
P.push('.formula-box{font-size:11px;color:#3d7a45;font-family:monospace;background:#0b1a0e;border:1px solid #1a3020;border-radius:4px;padding:10px 16px;margin-bottom:14px;line-height:1.8}');
P.push('.toolbar{display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap}');
P.push('.count{font-size:11px;color:#4a7a52;font-family:monospace}');
P.push('.err{background:#1a0a0a;border:1px solid #5c2020;border-radius:6px;padding:16px;margin-bottom:16px;color:#ef9a9a;font-family:monospace;font-size:12px;white-space:pre-wrap}');
P.push('.loading{text-align:center;padding:80px 0;color:#4a7a52;font-family:monospace;letter-spacing:.2em}');
P.push('.wrap{overflow-x:auto}');
P.push('table{width:100%;border-collapse:collapse;font-size:12px}');
P.push('thead th{padding:9px 10px;font-family:monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;font-weight:normal;color:#4a7a52;border-bottom:1px solid #1e3d25;cursor:pointer;white-space:nowrap;user-select:none}');
P.push('thead th:hover{color:#a5d6a7}thead th.active{color:#a5d6a7}');
P.push('thead th.left{text-align:left}thead th.right{text-align:right}thead th.center{text-align:center}');
P.push('tbody tr{border-bottom:1px solid #0f1f14}');
P.push('tbody tr:hover{background:rgba(45,106,63,.14)!important}');
P.push('tbody tr.top3{background:rgba(45,106,63,.08)}');
P.push('td{padding:8px 10px}');
P.push('.tr{text-align:right;font-family:monospace}');
P.push('.tc{text-align:center;font-family:monospace}');
P.push('.tn{text-align:right;font-family:monospace;font-size:10px;color:#4a7a52}');
P.push('.pos{color:#66bb6a}.neg{color:#ef9a9a}.dim{color:#7a9e82}');
P.push('.sg{color:#66bb6a;font-weight:bold}.so{color:#a5d6a7;font-weight:bold}.sn{color:#e8ede9;font-weight:bold}.sb{color:#ef9a9a;font-weight:bold}');
P.push('.hit-high{color:#66bb6a;font-weight:bold}.hit-med{color:#e8ede9}.hit-low{color:#ef9a9a}');
P.push('.over-badge{background:#1a3a1a;color:#66bb6a;border:1px solid #2d6a3f;border-radius:3px;padding:2px 6px;font-size:10px;font-family:monospace;font-weight:bold}');
P.push('.under-badge{background:#1a1a3a;color:#7986cb;border:1px solid #3949ab;border-radius:3px;padding:2px 6px;font-size:10px;font-family:monospace;font-weight:bold}');
P.push('.prop-input{width:65px;background:#0d1f15;border:1px solid #1e3d25;color:#c8e6cb;font-family:monospace;font-size:12px;text-align:center;border-radius:3px;padding:3px 6px}');
P.push('.prop-input:focus{border-color:#2d6a3f;outline:none}');
P.push('.diff-pos{color:#66bb6a;font-weight:bold}.diff-neg{color:#ef9a9a;font-weight:bold}.diff-zero{color:#7a9e82}');
P.push('</style></head><body>');
P.push('<header>');
P.push('<div class="lbl" style="margin-bottom:8px">propgeekzeke &middot; Projected Scores</div>');
P.push('<h1 id="event-name">Loading...</h1>');
P.push('<div class="subtitle" id="course-name"></div>');
P.push('<div class="controls">');
P.push('<div class="ctrl"><div class="lbl">Course Par</div><input type="number" id="par-input" value="72" min="63" max="73"/></div>');
P.push('<div class="ctrl"><div class="lbl">Round</div><select id="round-select"><option value="1">Round 1</option><option value="2">Round 2</option><option value="3">Round 3</option><option value="4">Round 4</option></select></div>');
P.push('<div class="ctrl"><div class="lbl">Field Scoring Avg (vs par)</div><input type="number" id="scoring-avg" value="1.0" step="0.1" style="width:90px"/></div>');
P.push('<div class="ctrl"><div class="lbl">&nbsp;</div><button id="load-btn" onclick="loadData()">&#8635; Load Data</button></div>');
P.push('<div class="ctrl"><div class="lbl">&nbsp;</div><button class="btn-sec" onclick="window.open(\'/api/debug\',\'_blank\')">&#128269; Debug Raw API</button></div>');
P.push('</div>');
P.push('<div class="stat-bar" id="stat-bar" style="display:none">');
P.push('<div><div class="lbl">Field Size</div><div class="stat-val" id="s-field">-</div></div>');
P.push('<div><div class="lbl">Field Avg SG</div><div class="stat-val" id="s-sg">-</div></div>');
P.push('<div><div class="lbl">Scoring Avg Used</div><div class="stat-val" id="s-score">-</div></div>');
P.push('<div><div class="lbl">Par</div><div class="stat-val" id="s-par">-</div></div>');
P.push('<div><div class="lbl">Round</div><div class="stat-val" id="s-round">-</div></div>');
P.push('<div><div class="lbl">Updated</div><div class="stat-val" id="s-updated">-</div></div>');
P.push('</div>');
P.push('</header>');
P.push('<main>');
P.push('<div id="err-box" class="err" style="display:none"></div>');
P.push('<div id="loading" class="loading">FETCHING DATAGOLF DATA...<br><br>&#9971;</div>');
P.push('<div id="table-section" style="display:none">');
P.push('<div class="formula-box">');
P.push('  &#9650; Proj Score = (Par + Field Scoring Avg) &minus; SG vs Field<br>');
P.push('  &#9654; Hit Rate = 50% + |Proj &minus; Prop| &times; 10%<br>');
P.push('  &#9654; Diff = Proj &minus; Prop &nbsp; (green = proj lower than prop = UNDER edge)');
P.push('</div>');
P.push('<div class="toolbar"><input type="text" id="search" placeholder="Search player..." oninput="filterTable()"/><span class="count" id="count"></span></div>');
P.push('<div class="wrap"><table><thead id="thead"></thead><tbody id="tbody"></tbody></table></div>');
P.push('</div></main>');
P.push('<script>');
P.push('var allPlayers=[],sortCol="projScore",sortDir="asc";');
P.push('var _par=72,_fsa=1.0,_fieldAvgSG=0,_round=1;');
P.push('var _dd=null,_fd=null;');
P.push('var propVals={};');
P.push('var cols=[');
P.push('  {key:null,         label:"#",           align:"right"},');
P.push('  {key:"name",       label:"Player",       align:"left"},');
P.push('  {key:"projScore",  label:"Proj Score",   align:"right"},');
P.push('  {key:"playerSG",   label:"SG Total",     align:"right"},');
P.push('  {key:"sgVsField",  label:"SG vs Field",  align:"right"},');
P.push('  {key:null,         label:"Prop Line",    align:"right"},');
P.push('  {key:"hitRate",    label:"Hit Rate",     align:"right"},');
P.push('  {key:"ou",         label:"Over/Under",   align:"center"},');
P.push('  {key:"diff",       label:"Diff",         align:"right"}');
P.push('];');
P.push('function showErr(msg){');
P.push('  document.getElementById("loading").style.display="none";');
P.push('  var b=document.getElementById("err-box");b.style.display="block";b.textContent=msg;');
P.push('  var btn=document.getElementById("load-btn");btn.disabled=false;btn.textContent="Retry";');
P.push('}');
P.push('function xhrGet(url,cb){');
P.push('  var x=new XMLHttpRequest();x.open("GET",url);x.timeout=15000;');
P.push('  x.onload=function(){if(x.status===200){try{cb(null,JSON.parse(x.responseText));}catch(e){cb("JSON:"+e.message,null);}}else{cb("HTTP:"+x.status,null);}};');
P.push('  x.onerror=function(){cb("NetworkError",null);};');
P.push('  x.ontimeout=function(){cb("Timeout",null);};');
P.push('  x.send();');
P.push('}');
P.push('function calcHitRate(proj,prop){');
P.push('  var rate=50+Math.abs(proj-prop)*10;');
P.push('  return Math.min(99,Math.max(1,rate));');
P.push('}');
P.push('function updateRowCells(pid){');
P.push('  var prop=propVals[pid];');
P.push('  var player=null;');
P.push('  for(var i=0;i<allPlayers.length;i++){if(allPlayers[i].id===pid){player=allPlayers[i];break;}}');
P.push('  if(!player)return;');
P.push('  var hrEl=document.getElementById("hr-"+pid);');
P.push('  var ouEl=document.getElementById("ou-"+pid);');
P.push('  var dfEl=document.getElementById("df-"+pid);');
P.push('  if(!hrEl||!ouEl||!dfEl)return;');
P.push('  if(prop==null||isNaN(prop)){');
P.push('    hrEl.className="tr dim";hrEl.textContent="--";');
P.push('    ouEl.innerHTML="<span style=\'color:#2d4a35\'>--</span>";');
P.push('    dfEl.className="tr diff-zero";dfEl.textContent="-";');
P.push('    return;');
P.push('  }');
P.push('  var hr=calcHitRate(player.projScore,prop);');
P.push('  hrEl.className="tr "+(hr>=60?"hit-high":hr>=50?"hit-med":"hit-low");');
P.push('  hrEl.textContent=hr.toFixed(1)+"%";');
P.push('  var ou=player.projScore<prop?"UNDER":"OVER";');
P.push('  ouEl.innerHTML=ou==="UNDER"?"<span class=\'under-badge\'>UNDER</span>":"<span class=\'over-badge\'>OVER</span>";');
P.push('  var diff=player.projScore-prop;');
P.push('  dfEl.className="tr "+(diff<0?"diff-pos":diff>0?"diff-neg":"diff-zero");');
P.push('  dfEl.textContent=(diff>0?"+":"")+diff.toFixed(1);');
P.push('}');
P.push('function onPropInput(pid,val){');
P.push('  var n=parseFloat(val);');
P.push('  if(val===""||val===null){delete propVals[pid];}');
P.push('  else if(!isNaN(n)){propVals[pid]=n;}');
P.push('  else{delete propVals[pid];}');
P.push('  updateRowCells(pid);');
P.push('}');
P.push('function processData(){');
P.push('  if(!_dd||!_fd)return;');
P.push('  try{');
P.push('    document.getElementById("event-name").textContent=_fd.event_name||_dd.event_name||"The Players Championship";');
P.push('    document.getElementById("course-name").textContent=_fd.course||_dd.course||"TPC Sawgrass";');
P.push('    var dp=_dd.players||[];');
P.push('    var sgSum=0,sgCnt=0;');
P.push('    for(var i=0;i<dp.length;i++){');
P.push('      var r=dp[i];');
P.push('      var sg=r.final_pred!=null?r.final_pred:r.sg_total!=null?r.sg_total:r.baseline!=null?r.baseline:null;');
P.push('      if(sg!=null&&!isNaN(Number(sg))){sgSum+=Number(sg);sgCnt++;}');
P.push('    }');
P.push('    _fieldAvgSG=sgCnt>0?sgSum/sgCnt:0;');
P.push('    allPlayers=[];');
P.push('    for(var i=0;i<dp.length;i++){');
P.push('      var r=dp[i];');
P.push('      var sg=r.final_pred!=null?r.final_pred:r.sg_total!=null?r.sg_total:r.baseline!=null?r.baseline:null;');
P.push('      if(sg==null||isNaN(Number(sg)))continue;');
P.push('      sg=Number(sg);');
P.push('      var svf=sg-_fieldAvgSG;');
P.push('      allPlayers.push({id:String(r.dg_id||i),name:String(r.player_name||"Unknown"),playerSG:sg,sgVsField:svf,projScore:(_par+_fsa)-svf});');
P.push('    }');
P.push('    if(allPlayers.length===0){var keys=dp.length>0?Object.keys(dp[0]).join(", "):"none";showErr("No players.\\nFields: "+keys);return;}');
P.push('    document.getElementById("s-field").textContent=allPlayers.length;');
P.push('    document.getElementById("s-sg").textContent=fmtN(_fieldAvgSG,3);');
P.push('    document.getElementById("s-score").textContent=(_fsa>=0?"+":"")+_fsa.toFixed(1);');
P.push('    document.getElementById("s-par").textContent=_par;');
P.push('    document.getElementById("s-round").textContent="R"+_round;');
P.push('    document.getElementById("s-updated").textContent=new Date().toLocaleTimeString();');
P.push('    document.getElementById("stat-bar").style.display="flex";');
P.push('    buildHeader();renderTable();');
P.push('    document.getElementById("loading").style.display="none";');
P.push('    document.getElementById("table-section").style.display="block";');
P.push('    var btn=document.getElementById("load-btn");btn.disabled=false;btn.textContent="Refresh";');
P.push('  }catch(err){showErr("Render error: "+err.message);}');
P.push('}');
P.push('function loadData(){');
P.push('  var btn=document.getElementById("load-btn");btn.disabled=true;btn.textContent="Loading...";');
P.push('  document.getElementById("loading").style.display="block";');
P.push('  document.getElementById("table-section").style.display="none";');
P.push('  document.getElementById("err-box").style.display="none";');
P.push('  document.getElementById("stat-bar").style.display="none";');
P.push('  _par=parseInt(document.getElementById("par-input").value)||72;');
P.push('  _fsa=parseFloat(document.getElementById("scoring-avg").value)||0;');
P.push('  _round=parseInt(document.getElementById("round-select").value)||1;');
P.push('  _dd=null;_fd=null;');
P.push('  xhrGet("/api/decompositions",function(err,data){if(err){showErr("Decomp: "+err);return;}_dd=data;processData();});');
P.push('  xhrGet("/api/fantasy?round="+_round,function(err,data){if(err){showErr("Fantasy: "+err);return;}_fd=data;processData();});');
P.push('}');
P.push('function fmtN(v,d){if(d===undefined)d=2;if(v==null||isNaN(v))return"-";return(Number(v)>=0?"+":"")+Number(v).toFixed(d);}');
P.push('function fmtScore(v){if(v==null)return"-";var rel=v-_par;return v.toFixed(1)+" ("+(rel>=0?"+":"")+rel.toFixed(1)+")";}');
P.push('function scoreCls(v){var r=v-_par;if(r<-3)return"sg";if(r<0)return"so";if(r<2)return"sn";return"sb";}');
P.push('function doSort(col){');
P.push('  if(sortCol===col){sortDir=sortDir==="asc"?"desc":"asc";}');
P.push('  else{sortCol=col;sortDir=(col==="projScore"||col==="diff")?"asc":"desc";}');
P.push('  buildHeader();renderTable();');
P.push('}');
P.push('function buildHeader(){');
P.push('  var thead=document.getElementById("thead");thead.innerHTML="";');
P.push('  var tr=document.createElement("tr");');
P.push('  for(var i=0;i<cols.length;i++){');
P.push('    var c=cols[i],active=c.key===sortCol;');
P.push('    var th=document.createElement("th");');
P.push('    th.className=c.align+(active?" active":"");');
P.push('    if(c.key){(function(k){th.onclick=function(){doSort(k);};})(c.key);}');
P.push('    var sp=document.createElement("span");');
P.push('    if(c.key){sp.textContent=active?(sortDir==="asc"?" ▲":" ▼"):" ▲";}');
P.push('    if(c.key&&!active)sp.style.opacity="0.2";');
P.push('    th.textContent=c.label;th.appendChild(sp);tr.appendChild(th);');
P.push('  }');
P.push('  thead.appendChild(tr);');
P.push('}');
P.push('function filterTable(){renderTable();}');
P.push('function renderTable(){');
P.push('  var q=document.getElementById("search").value.toLowerCase();');
P.push('  var rows=[];');
P.push('  for(var i=0;i<allPlayers.length;i++){');
P.push('    var p=allPlayers[i];');
P.push('    if(p.name.toLowerCase().indexOf(q)===-1)continue;');
P.push('    var prop=propVals[p.id]!=null?propVals[p.id]:null;');
P.push('    var hitRate=prop!=null?calcHitRate(p.projScore,prop):null;');
P.push('    var ou=prop!=null?(p.projScore<prop?"UNDER":"OVER"):null;');
P.push('    var diff=prop!=null?p.projScore-prop:null;');
P.push('    rows.push({id:p.id,name:p.name,playerSG:p.playerSG,sgVsField:p.sgVsField,projScore:p.projScore,prop:prop,hitRate:hitRate,ou:ou,diff:diff});');
P.push('  }');
P.push('  rows.sort(function(a,b){');
P.push('    if(sortCol==="hitRate"){var av=a.hitRate!=null?a.hitRate:-1,bv=b.hitRate!=null?b.hitRate:-1;return sortDir==="asc"?av-bv:bv-av;}');
P.push('    if(sortCol==="diff"){var av=a.diff!=null?Math.abs(a.diff):-999,bv=b.diff!=null?Math.abs(b.diff):-999;return bv-av;}');
P.push('    if(sortCol==="ou"){return sortDir==="asc"?(a.ou||"").localeCompare(b.ou||""):(b.ou||"").localeCompare(a.ou||"");}');
P.push('    var av=a[sortCol]!=null?a[sortCol]:0,bv=b[sortCol]!=null?b[sortCol]:0;');
P.push('    return sortDir==="asc"?av-bv:bv-av;');
P.push('  });');
P.push('  document.getElementById("count").textContent=rows.length+" players";');
P.push('  var tbody=document.getElementById("tbody");tbody.innerHTML="";');
P.push('  for(var i=0;i<rows.length;i++){');
P.push('    var p=rows[i];');
P.push('    var tr=document.createElement("tr");');
P.push('    if(i<3)tr.className="top3";');
P.push('    function mkTd(cls,txt,color){var td=document.createElement("td");if(cls)td.className=cls;if(color)td.style.color=color;td.textContent=txt;return td;}');
// rank
P.push('    tr.appendChild(mkTd("tn",i+1));');
// name
P.push('    var ntd=mkTd("");ntd.style.color=i<3?"#a5d6a7":"#c8e6cb";ntd.style.fontWeight=i<3?"bold":"normal";ntd.textContent=p.name;tr.appendChild(ntd);');
// proj score
P.push('    tr.appendChild(mkTd("tr "+scoreCls(p.projScore),fmtScore(p.projScore)));');
// sg total
P.push('    tr.appendChild(mkTd("tr "+(p.playerSG>=0?"pos":"neg"),fmtN(p.playerSG)));');
// sg vs field
P.push('    tr.appendChild(mkTd("tr "+(p.sgVsField>=0?"pos":"neg"),fmtN(p.sgVsField)));');
// prop input — does NOT call renderTable, only updates cells in place
P.push('    var ptd=document.createElement("td");ptd.className="tr";');
P.push('    var pinp=document.createElement("input");');
P.push('    pinp.type="number";pinp.step="0.5";');
P.push('    pinp.className="prop-input";');
P.push('    pinp.setAttribute("data-pid",p.id);');
P.push('    pinp.placeholder="--";');
P.push('    if(p.prop!=null)pinp.value=p.prop;');
P.push('    (function(pid){pinp.oninput=function(){onPropInput(pid,this.value);};  })(p.id);');
P.push('    ptd.appendChild(pinp);tr.appendChild(ptd);');
// hit rate (updatable by id)
P.push('    var hrtd=document.createElement("td");');
P.push('    hrtd.id="hr-"+p.id;');
P.push('    if(p.hitRate!=null){hrtd.className="tr "+(p.hitRate>=60?"hit-high":p.hitRate>=50?"hit-med":"hit-low");hrtd.textContent=p.hitRate.toFixed(1)+"%";}');
P.push('    else{hrtd.className="tr dim";hrtd.textContent="--";}');
P.push('    tr.appendChild(hrtd);');
// over/under (updatable by id)
P.push('    var outd=document.createElement("td");outd.className="tc";outd.id="ou-"+p.id;');
P.push('    if(p.ou){var badge=document.createElement("span");badge.className=p.ou==="UNDER"?"under-badge":"over-badge";badge.textContent=p.ou;outd.appendChild(badge);}');
P.push('    else{outd.innerHTML="<span style=\'color:#2d4a35\'>--</span>";}');
P.push('    tr.appendChild(outd);');
// diff (updatable by id)
P.push('    var dftd=document.createElement("td");dftd.id="df-"+p.id;');
P.push('    if(p.diff!=null){dftd.className="tr "+(p.diff<0?"diff-pos":p.diff>0?"diff-neg":"diff-zero");dftd.textContent=(p.diff>0?"+":"")+p.diff.toFixed(1);}');
P.push('    else{dftd.className="tr diff-zero";dftd.textContent="-";}');
P.push('    tr.appendChild(dftd);');
P.push('    tbody.appendChild(tr);');
P.push('  }');
P.push('}');
P.push('loadData();');
P.push('</script></body></html>');

var HTML = P.join("");

const server = http.createServer(function(req, res) {
  var url = new URL(req.url, "http://localhost");

  if (url.pathname === "/api/decompositions") {
    fetchDataGolf("preds/player-decompositions?tour=pga")
      .then(function(data) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      }).catch(function(e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      });

  } else if (url.pathname === "/api/fantasy") {
    var round = url.searchParams.get("round") || "1";
    var slate = (round === "3" || round === "4") ? "weekend" : "showdown";
    fetchDataGolf("preds/fantasy-projection-defaults?tour=pga&site=draftkings&slate=" + slate)
      .then(function(data) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      }).catch(function(e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      });

  } else if (url.pathname === "/api/debug") {
    Promise.all([
      fetchDataGolf("preds/player-decompositions?tour=pga"),
      fetchDataGolf("preds/fantasy-projection-defaults?tour=pga&site=draftkings&slate=showdown")
    ]).then(function(results) {
      var decomp = results[0];
      var fantasy = results[1];
      var firstD = (decomp.players || [])[0] || {};
      var firstF = (fantasy.projections || [])[0] || {};
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        event: fantasy.event_name || decomp.event_name,
        course: fantasy.course || decomp.course,
        decomp_player_fields: Object.keys(firstD),
        fantasy_player_fields: Object.keys(firstF),
        decomp_sample: firstD,
        fantasy_sample: firstF,
        decomp_count: (decomp.players || []).length,
        fantasy_count: (fantasy.projections || []).length
      }, null, 2));
    }).catch(function(e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    });

  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(HTML);
  }
});

server.listen(PORT, "0.0.0.0", function() {
  console.log("propgeekzeke Players Championship running at http://localhost:" + PORT);
});
