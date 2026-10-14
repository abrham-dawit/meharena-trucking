const form = document.getElementById('quoteForm');
const result = document.getElementById('quoteResult');
const error = document.getElementById('formError');

form.addEventListener('submit', e=>{
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form).entries());
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '');
  if(!d.name?.trim() || !emailOk || !d.pickup?.trim() || !d.dropoff?.trim()){
    error.hidden = false;
    result.hidden = true;
    return;
  }
  error.hidden = true;
  const ref = 'MT-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random()*9000));
  const row = (k,v)=> v && String(v).trim() ? `<dt>${k}</dt><dd>${escapeHtml(String(v).trim())}</dd>` : '';
  result.innerHTML =
    `<h3>Request received — reference ${ref}</h3>
     <p>Thanks, ${escapeHtml(d.name.split(' ')[0])}. Here's the load you just described. In the live version this summary goes straight to dispatch; keep the reference number for your call.</p>
     <dl>
       ${row('Name', d.name)}${row('Company', d.company)}${row('Email', d.email)}${row('Phone', d.phone)}
       ${row('Route', d.pickup + ' → ' + d.dropoff)}${row('Pickup date', d.date)}
       ${row('Weight', d.weight ? d.weight + ' lbs' : '')}${row('Freight', d.freight)}
     </dl>`;
  result.hidden = false;
  result.scrollIntoView({behavior:'smooth', block:'center'});
});
function escapeHtml(s){
  return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
