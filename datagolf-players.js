const http = require("http");
const https = require("https");

const API_KEY = "d813063c6e49c7f250bab0beef40";
const PORT = 3000;

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

var HTML_PARTS = [];
HTML_PARTS.push('<!DOCTYPE html><html lang="en"><head>');
HTML_PARTS.push('<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>');
HTML_PARTS.push('<title>propgeekzeke - The Players Championship</title>');
HTML_PARTS.push('<style>');
HTML_PARTS.push('*{box-sizing:border-box;margin:0;padding:0}');
HTML_PARTS.push('body{background:#0a0f0d;color:#e8ede9;font-family:Georgia,serif;min-height:100vh}');
HTML_PARTS.push('header{background:linear-gradient(135deg,#0d1f15,#0a0f0d);border-bottom:1px solid #1e3d25;padding:24px 32px}');
HTML_PARTS.push('h1{font-size:24px;font-weight:normal;color:#c8e6cb;margin-bottom:4px}');
HTML_PARTS.push('.subtitle{font-size:12px;color:#4a7a52;font-style:italic}');
HTML_PARTS.push('.lbl{font-size:9px;color:#4a7a52;letter-spacing:.15em;text-transform:uppercase;font-family:monospace;margin-bottom:4px}');
HTML_PARTS.push('.controls{display:flex;align-items:flex-end;gap:16px;margin-top:16px;flex-wrap:wrap}');
HTML_PARTS.push('.ctrl{display:flex;flex-direction:column}');
HTML_PARTS.push('.stat-bar{display:flex;gap:28px;margin-top:16px;flex-wrap:wrap}');
HTML_PARTS.push('.stat-val{font-size:17px;color:#a5d6a7;font-family:monospace;margin-top:2px}');
HTML_PARTS.push('input[type=number],input[type=text]{background:#0d1f15;border:1px solid #1e3d25;color:#c8e6cb;font-family:monospace;border-radius:4px;outline:none;padding:6px 10px}');
HTML_PARTS.push('input[type=number]{width:80px;font-size:14px;text-align:center}');
HTML_PARTS.push('input[type=text]{width:200px;font-size:12px}');
HTML_PARTS.push('select{background:#0d1f15;border:1px solid #1e3d25;color:#c8e6cb;font-family:monospace;border-radius:4px;outline:none;padding:6px 10px;font-size:12px}');
HTML_PARTS.push('button{padding:8px 18px;background:#2d6a3f;color:#c8e6cb;border:1px solid #2d6a3f;border-radius:4px;cursor:pointer;font-size:11px;font-family:monospace;letter-spacing:.1em}');
HTML_PARTS.push('button:disabled{background:#1e3d25;color:#5a9e6a;cursor:not-allowed}');
HTML_PARTS.push('.btn-sec{background:#0d1f15;color:#4a7a52;border-color:#1e3d25;font-size:10px;padding:6px 12px}');
HTML_PARTS.push('main{padding:20px 32px}');
HTML_PARTS.push('.formula-box{font-size:11px;color:#3d7a45;font-family:monospace;background:#0b1a0e;border:1px solid #1a3020;border-radius:4px;padding:10px 16px;margin-bottom:14px;line-height:1.6}');
HTML_PARTS.push('.toolbar{display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap}');
HTML_PARTS.push('.count{font-size:11px;color:#4a7a52;font-family:monospace}');
HTML_PARTS.push('.err{background:#1a0a0a;border:1px solid #5c2020;border-radius:6px;padding:16px;margin-bottom:16px;color:#ef9a9a;font-family:monospace;font-size:12px;white-space:pre-wrap}');
HTML_PARTS.push('.loading{text-align:center;padding:80px 0;color:#4a7a52;font-family:monospace;letter-spacing:.2em}');
HTML_PARTS.push('.wrap{overflow-x:auto}');
HTML_PARTS.push('table{width:100%;border-collapse:collapse;font-size:12px}');
HTML_PARTS.push('thead th{padding:9px 10px;font-family:monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;font-weight:normal;color:#4a7a52;border-bottom:1px solid #1e3d25;cursor:pointer;white-space:nowrap;user-select:none}');
HTML_PARTS.push('thead th:hover{color:#a5d6a7}thead th.active{color:#a5d6a7}');
HTML_PARTS.push('thead th.left{text-align:left}thead th.right{text-align:right}');
HTML_PARTS.push('tbody tr{border-bottom:1px solid #0f1f14}');
HTML_PARTS.push('tbody tr:hover{background:rgba(45,106,63,.14)!important}');
HTML_PARTS.push('tbody tr.top3{background:rgba(45,106,63,.08)}');
HTML_PARTS.push('td{padding:8px 10px}');
HTML_PARTS.push('.tr{text-align:right;font-family:monospace}');
HTML_PARTS.push('.tn{text-align:right;font-family:monospace;font-size:10px;color:#4a7a52}');
HTML_PARTS.push('.pos{color:#66bb6a}.neg{color:#ef9a9a}.dim{color:#7a9e82}');
HTML_PARTS.push('.sg{color:#66bb6a;font-weight:bold}.so{color:#a5d6a7;font-weight:bold}.sn{color:#e8ede9;font-weight:bold}.sb{color:#ef9a9a;font-weight:bold}');
HTML_PARTS.push('</style></head><body>');
HTML_PARTS.push('<header>');
HTML_PARTS.push('<div class="lbl" style="margin-bottom:8px">propgeekzeke &middot; Projected Scores</div>');
HTML_PARTS.push('<h1 id="event-name">Loading...</h1>');
HTML_PARTS.push('<div class="subtitle" id="course-name"></div>');
HTML_PARTS.push('<div class="controls">');
HTML_PARTS.push('<div class="ctrl"><div class="lbl">Course Par</div><input type="number" id="par-input" value="72" min="63" max="73"/></div>');
HTML_PARTS.push('<div class="ctrl"><div class="lbl">Round</div><select id="round-select"><option value="1">Round 1</option><option value="2">Round 2</option><option value="3">Round 3</option><option value="4">Round 4</option></select></div>');
HTML_PARTS.push('<div class="ctrl"><div class="lbl">Field Scoring Avg (vs par)</div><input type="number" id="scoring-avg" value="1.0" step="0.1" style="width:90px"/></div>');
HTML_PARTS.push('<div class="ctrl"><div class="lbl">&nbsp;</div><button id="load-btn" onclick="loadData()">&#8635; Load Data</button></div>');
HTML_PARTS.push('<div class="ctrl"><div class="lbl">&nbsp;</div><button class="btn-sec" onclick="window.open(\'/api/debug\',\'_blank\')">&#128269; Debug Raw API</button></div>');
HTML_PARTS.push('</div>');
HTML_PARTS.push('<div class="stat-bar" id="stat-bar" style="display:none">');
HTML_PARTS.push('<div><div class="lbl">Field Size</div><div class="stat-val" id="s-field">-</div></div>');
HTML_PARTS.push('<div><div class="lbl">Field Avg SG</div><div class="stat-val" id="s-sg">-</div></div>');
HTML_PARTS.push('<div><div class="lbl">Scoring Avg Used</div><div class="stat-val" id="s-score">-</div></div>');
HTML_PARTS.push('<div><div class="lbl">Par</div><div class="stat-val" id="s-par">-</div></div>');
HTML_PARTS.push('<div><div class="lbl">Round</div><div class="stat-val" id="s-round">-</div></div>');
HTML_PARTS.push('<div><div class="lbl">Updated</div><div class="stat-val" id="s-updated">-</div></div>');
HTML_PARTS.push('</div>');
HTML_PARTS.push('</header>');
HTML_PARTS.push('<main>');
HTML_PARTS.push('<div id="err-box" class="err" style="display:none"></div>');
HTML_PARTS.push('<div id="loading" class="loading">FETCHING DATAGOLF DATA...<br><br>&#9971;</div>');
HTML_PARTS.push('<div id="table-section" style="display:none">');
HTML_PARTS.push('<div class="formula-box" id="formula-label"></div>');
HTML_PARTS.push('<div class="toolbar"><input type="text" id="search" placeholder="Search player..." oninput="renderTable()"/><span class="count" id="count"></span></div>');
HTML_PARTS.push('<div class="wrap"><table><thead id="thead"></thead><tbody id="tbody"></tbody></table></div>');
HTML_PARTS.push('</div></main>');
HTML_PARTS.push('<script>');
HTML_PARTS.push('var allPlayers=[],sortCol="projScore",sortDir="asc";');
HTML_PARTS.push('var _par=72,_fsa=1.0,_fieldAvgSG=0,_round=1;');
HTML_PARTS.push('var _dd=null,_fd=null;');
HTML_PARTS.push('var cols=[');
HTML_PARTS.push('  {key:null,label:"#",align:"right"},');
HTML_PARTS.push('  {key:"name",label:"Player",align:"left"},');
HTML_PARTS.push('  {key:"projScore",label:"Proj Score",align:"right"},');
HTML_PARTS.push('  {key:"playerSG",label:"SG Total",align:"right"},');
HTML_PARTS.push('  {key:"sgVsField",label:"SG vs Field",align:"right"},');
HTML_PARTS.push('  {key:"sg_ott",label:"OTT",align:"right"},');
HTML_PARTS.push('  {key:"sg_app",label:"APP",align:"right"},');
HTML_PARTS.push('  {key:"sg_arg",label:"ARG",align:"right"},');
HTML_PARTS.push('  {key:"sg_putt",label:"PUTT",align:"right"},');
HTML_PARTS.push('  {key:"dkPts",label:"DK Pts",align:"right"}');
HTML_PARTS.push('];');
HTML_PARTS.push('function showErr(msg){');
HTML_PARTS.push('  document.getElementById("loading").style.display="none";');
HTML_PARTS.push('  var b=document.getElementById("err-box");b.style.display="block";b.textContent=msg;');
HTML_PARTS.push('  var btn=document.getElementById("load-btn");btn.disabled=false;btn.textContent="Retry";');
HTML_PARTS.push('}');
HTML_PARTS.push('function xhrGet(url,cb){');
HTML_PARTS.push('  var x=new XMLHttpRequest();');
HTML_PARTS.push('  x.open("GET",url);x.timeout=15000;');
HTML_PARTS.push('  x.onload=function(){');
HTML_PARTS.push('    if(x.status===200){try{cb(null,JSON.parse(x.responseText));}catch(e){cb("JSON:"+e.message,null);}}');
HTML_PARTS.push('    else{cb("HTTP:"+x.status,null);}');
HTML_PARTS.push('  };');
HTML_PARTS.push('  x.onerror=function(){cb("NetworkError",null);};');
HTML_PARTS.push('  x.ontimeout=function(){cb("Timeout",null);};');
HTML_PARTS.push('  x.send();');
HTML_PARTS.push('}');
HTML_PARTS.push('function processData(){');
HTML_PARTS.push('  if(!_dd||!_fd)return;');
HTML_PARTS.push('  try{');
HTML_PARTS.push('    document.getElementById("event-name").textContent=_fd.event_name||_dd.event_name||"The Players Championship";');
HTML_PARTS.push('    document.getElementById("course-name").textContent=_fd.course||_dd.course||"TPC Sawgrass";');
HTML_PARTS.push('    var fl={};');
HTML_PARTS.push('    var pl=_fd.projections||[];');
HTML_PARTS.push('    for(var i=0;i<pl.length;i++){');
HTML_PARTS.push('      var fp=pl[i];');
HTML_PARTS.push('      var dk=fp.proj_points_total!=null?fp.proj_points_total:fp.proj_points!=null?fp.proj_points:fp.dk_points!=null?fp.dk_points:null;');
HTML_PARTS.push('      fl[fp.dg_id]=dk;');
HTML_PARTS.push('    }');
HTML_PARTS.push('    var dp=_dd.players||[];');
HTML_PARTS.push('    var sgSum=0,sgCnt=0;');
HTML_PARTS.push('    for(var i=0;i<dp.length;i++){');
HTML_PARTS.push('      var r=dp[i];');
HTML_PARTS.push('      var sg=r.final_pred!=null?r.final_pred:r.sg_total!=null?r.sg_total:r.baseline!=null?r.baseline:null;');
HTML_PARTS.push('      if(sg!=null&&!isNaN(Number(sg))){sgSum+=Number(sg);sgCnt++;}');
HTML_PARTS.push('    }');
HTML_PARTS.push('    _fieldAvgSG=sgCnt>0?sgSum/sgCnt:0;');
HTML_PARTS.push('    allPlayers=[];');
HTML_PARTS.push('    for(var i=0;i<dp.length;i++){');
HTML_PARTS.push('      var r=dp[i];');
HTML_PARTS.push('      var sg=r.final_pred!=null?r.final_pred:r.sg_total!=null?r.sg_total:r.baseline!=null?r.baseline:null;');
HTML_PARTS.push('      if(sg==null||isNaN(Number(sg)))continue;');
HTML_PARTS.push('      sg=Number(sg);');
HTML_PARTS.push('      allPlayers.push({');
HTML_PARTS.push('        name:String(r.player_name||"Unknown"),');
HTML_PARTS.push('        playerSG:sg,');
HTML_PARTS.push('        sgVsField:sg-_fieldAvgSG,');
HTML_PARTS.push('        projScore:(_par+_fsa)-(sg-_fieldAvgSG),');
HTML_PARTS.push('        dkPts:fl[r.dg_id]!=null?Number(fl[r.dg_id]):null,');
HTML_PARTS.push('        sg_putt:r.sg_putt!=null?Number(r.sg_putt):null,');
HTML_PARTS.push('        sg_arg:r.sg_arg!=null?Number(r.sg_arg):null,');
HTML_PARTS.push('        sg_app:r.sg_app!=null?Number(r.sg_app):null,');
HTML_PARTS.push('        sg_ott:r.sg_ott!=null?Number(r.sg_ott):null');
HTML_PARTS.push('      });');
HTML_PARTS.push('    }');
HTML_PARTS.push('    if(allPlayers.length===0){');
HTML_PARTS.push('      var keys=dp.length>0?Object.keys(dp[0]).join(", "):"none";');
HTML_PARTS.push('      showErr("No players found.\\nDecomp fields: "+keys);return;');
HTML_PARTS.push('    }');
HTML_PARTS.push('    document.getElementById("s-field").textContent=allPlayers.length;');
HTML_PARTS.push('    document.getElementById("s-sg").textContent=fmtN(_fieldAvgSG,3);');
HTML_PARTS.push('    document.getElementById("s-score").textContent=(_fsa>=0?"+":"")+_fsa.toFixed(1);');
HTML_PARTS.push('    document.getElementById("s-par").textContent=_par;');
HTML_PARTS.push('    document.getElementById("s-round").textContent="R"+_round;');
HTML_PARTS.push('    document.getElementById("s-updated").textContent=new Date().toLocaleTimeString();');
HTML_PARTS.push('    document.getElementById("stat-bar").style.display="flex";');
HTML_PARTS.push('    buildHeader();renderTable();');
HTML_PARTS.push('    document.getElementById("loading").style.display="none";');
HTML_PARTS.push('    document.getElementById("table-section").style.display="block";');
HTML_PARTS.push('    var btn=document.getElementById("load-btn");btn.disabled=false;btn.textContent="Refresh";');
HTML_PARTS.push('  }catch(err){showErr("Render error: "+err.message);}');
HTML_PARTS.push('}');
HTML_PARTS.push('function loadData(){');
HTML_PARTS.push('  var btn=document.getElementById("load-btn");btn.disabled=true;btn.textContent="Loading...";');
HTML_PARTS.push('  document.getElementById("loading").style.display="block";');
HTML_PARTS.push('  document.getElementById("table-section").style.display="none";');
HTML_PARTS.push('  document.getElementById("err-box").style.display="none";');
HTML_PARTS.push('  document.getElementById("stat-bar").style.display="none";');
HTML_PARTS.push('  _par=parseInt(document.getElementById("par-input").value)||72;');
HTML_PARTS.push('  _fsa=parseFloat(document.getElementById("scoring-avg").value)||0;');
HTML_PARTS.push('  _round=parseInt(document.getElementById("round-select").value)||1;');
HTML_PARTS.push('  _dd=null;_fd=null;');
HTML_PARTS.push('  xhrGet("/api/decompositions",function(err,data){');
HTML_PARTS.push('    if(err){showErr("Decomp error: "+err);return;}');
HTML_PARTS.push('    _dd=data;processData();');
HTML_PARTS.push('  });');
HTML_PARTS.push('  xhrGet("/api/fantasy?round="+_round,function(err,data){');
HTML_PARTS.push('    if(err){showErr("Fantasy error: "+err);return;}');
HTML_PARTS.push('    _fd=data;processData();');
HTML_PARTS.push('  });');
HTML_PARTS.push('}');
HTML_PARTS.push('function fmtN(v,d){');
HTML_PARTS.push('  if(d===undefined)d=2;');
HTML_PARTS.push('  if(v==null||isNaN(v))return"-";');
HTML_PARTS.push('  return(Number(v)>=0?"+":"")+Number(v).toFixed(d);');
HTML_PARTS.push('}');
HTML_PARTS.push('function fmtScore(v){');
HTML_PARTS.push('  if(v==null)return"-";');
HTML_PARTS.push('  var rel=v-_par;');
HTML_PARTS.push('  return v.toFixed(1)+" ("+(rel>=0?"+":"")+rel.toFixed(1)+")";');
HTML_PARTS.push('}');
HTML_PARTS.push('function scoreCls(v){');
HTML_PARTS.push('  var r=v-_par;');
HTML_PARTS.push('  if(r<-3)return"sg";if(r<0)return"so";if(r<2)return"sn";return"sb";');
HTML_PARTS.push('}');
HTML_PARTS.push('function doSort(col){');
HTML_PARTS.push('  if(sortCol===col){sortDir=sortDir==="asc"?"desc":"asc";}');
HTML_PARTS.push('  else{sortCol=col;sortDir=col==="projScore"?"asc":"desc";}');
HTML_PARTS.push('  buildHeader();renderTable();');
HTML_PARTS.push('}');
HTML_PARTS.push('function buildHeader(){');
HTML_PARTS.push('  var thead=document.getElementById("thead");');
HTML_PARTS.push('  thead.innerHTML="";');
HTML_PARTS.push('  var tr=document.createElement("tr");');
HTML_PARTS.push('  for(var i=0;i<cols.length;i++){');
HTML_PARTS.push('    var c=cols[i];');
HTML_PARTS.push('    var active=c.key===sortCol;');
HTML_PARTS.push('    var th=document.createElement("th");');
HTML_PARTS.push('    th.className=c.align+(active?" active":"");');
HTML_PARTS.push('    if(c.key){(function(k){th.onclick=function(){doSort(k);};})(c.key);}');
HTML_PARTS.push('    var sp=document.createElement("span");');
HTML_PARTS.push('    if(c.key){sp.textContent=active?(sortDir==="asc"?" ▲":" ▼"):" ▲";}');
HTML_PARTS.push('    if(c.key&&!active)sp.style.opacity="0.2";');
HTML_PARTS.push('    th.textContent=c.label;');
HTML_PARTS.push('    th.appendChild(sp);');
HTML_PARTS.push('    tr.appendChild(th);');
HTML_PARTS.push('  }');
HTML_PARTS.push('  thead.appendChild(tr);');
HTML_PARTS.push('}');
HTML_PARTS.push('function renderTable(){');
HTML_PARTS.push('  var q=document.getElementById("search").value.toLowerCase();');
HTML_PARTS.push('  document.getElementById("formula-label").innerHTML=');
HTML_PARTS.push('    "Formula: Proj Score = (Par + Field Scoring Avg) &minus; (Player SG &minus; Field Avg SG)<br>"');
HTML_PARTS.push('    +"= ("+_par+" + "+(_fsa>=0?"+":"")+_fsa.toFixed(1)+") &minus; (Player SG &minus; "+_fieldAvgSG.toFixed(3)+")";');
HTML_PARTS.push('  var rows=[];');
HTML_PARTS.push('  for(var i=0;i<allPlayers.length;i++){');
HTML_PARTS.push('    if(allPlayers[i].name.toLowerCase().indexOf(q)!==-1)rows.push(allPlayers[i]);');
HTML_PARTS.push('  }');
HTML_PARTS.push('  rows.sort(function(a,b){');
HTML_PARTS.push('    var av=a[sortCol]!=null?a[sortCol]:0;');
HTML_PARTS.push('    var bv=b[sortCol]!=null?b[sortCol]:0;');
HTML_PARTS.push('    return sortDir==="asc"?av-bv:bv-av;');
HTML_PARTS.push('  });');
HTML_PARTS.push('  document.getElementById("count").textContent=rows.length+" players";');
HTML_PARTS.push('  var tbody=document.getElementById("tbody");');
HTML_PARTS.push('  tbody.innerHTML="";');
HTML_PARTS.push('  for(var i=0;i<rows.length;i++){');
HTML_PARTS.push('    var p=rows[i];');
HTML_PARTS.push('    var tr=document.createElement("tr");');
HTML_PARTS.push('    if(i<3)tr.className="top3";');
HTML_PARTS.push('    function mkTd(cls,txt,color){');
HTML_PARTS.push('      var td=document.createElement("td");');
HTML_PARTS.push('      if(cls)td.className=cls;');
HTML_PARTS.push('      if(color)td.style.color=color;');
HTML_PARTS.push('      td.textContent=txt;');
HTML_PARTS.push('      return td;');
HTML_PARTS.push('    }');
HTML_PARTS.push('    tr.appendChild(mkTd("tn",i+1));');
HTML_PARTS.push('    var ntd=mkTd("",p.name);');
HTML_PARTS.push('    ntd.style.color=i<3?"#a5d6a7":"#c8e6cb";');
HTML_PARTS.push('    ntd.style.fontWeight=i<3?"bold":"normal";');
HTML_PARTS.push('    tr.appendChild(ntd);');
HTML_PARTS.push('    tr.appendChild(mkTd("tr "+scoreCls(p.projScore),fmtScore(p.projScore)));');
HTML_PARTS.push('    tr.appendChild(mkTd("tr "+(p.playerSG>=0?"pos":"neg"),fmtN(p.playerSG)));');
HTML_PARTS.push('    tr.appendChild(mkTd("tr "+(p.sgVsField>=0?"pos":"neg"),fmtN(p.sgVsField)));');
HTML_PARTS.push('    tr.appendChild(mkTd("tr dim",fmtN(p.sg_ott)));');
HTML_PARTS.push('    tr.appendChild(mkTd("tr dim",fmtN(p.sg_app)));');
HTML_PARTS.push('    tr.appendChild(mkTd("tr dim",fmtN(p.sg_arg)));');
HTML_PARTS.push('    tr.appendChild(mkTd("tr dim",fmtN(p.sg_putt)));');
HTML_PARTS.push('    tr.appendChild(mkTd("tr",p.dkPts!=null?p.dkPts.toFixed(1):"-","#5a9e6a"));');
HTML_PARTS.push('    tbody.appendChild(tr);');
HTML_PARTS.push('  }');
HTML_PARTS.push('}');
HTML_PARTS.push('loadData();');
HTML_PARTS.push('</script></body></html>');

var HTML = HTML_PARTS.join("");

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

server.listen(PORT, function() {
  console.log("DataGolf Players Championship running at http://localhost:" + PORT);
});
