/*
Code Pattern: Adding a new UI panel to the right sidebar

Step 1: Add tab in HTML (#rptabs section)
  <div class="rptab" id="tab-yourtab" onclick="rpSwitch('yourtab')">Icon Label</div>

Step 2: Add view panel in HTML (after other rpview divs)
  <div class="rpview" id="rpview-yourtab">
    <div style="padding:10px 12px">
      <h3>Your Panel Title</h3>
      <div id="your-content"></div>
    </div>
  </div>

Step 3: Hook into rpSwitch() in JS
  if(tab==='yourtab') yourLoadFunction();

Step 4: Write your load function
*/

// async function yourLoadFunction() {
//   const d = await fetch('/api/yourfeature').then(r=>r.json()).catch(()=>({}));
//   const el = document.getElementById('your-content');
//   el.innerHTML = '';
//   // ... render your data ...
// }

/*
Code Pattern: Adding a modal dialog

HTML (add near other modals):
  <div class="modal" id="yourmod">
    <div class="mbox">
      <h3>Title</h3>
      <label>Field<input id="ym-field" placeholder="..."></label>
      <div class="mbr">
        <button class="tb" onclick="closeYourMod()">Cancel</button>
        <button class="tb" style="border-color:var(--magenta);color:var(--magenta)" onclick="saveYourMod()">Save</button>
      </div>
    </div>
  </div>

JS:
  function openYourMod() { document.getElementById('yourmod').classList.add('open'); }
  function closeYourMod() { document.getElementById('yourmod').classList.remove('open'); }
*/

/*
Code Pattern: Adding a button to the input toolbar

Location: Find #itb in HTML (~line 2417)
  <button class="tb" onclick="yourFunction()">Icon Label<span class="tb-tip">Tooltip text</span></button>
*/

/*
Code Pattern: Toast notification
  showToast('Agent Name', 'Message text here');
*/

/*
Code Pattern: Browser notification (when tab not focused)
  notify('Title', 'Body text');
*/
