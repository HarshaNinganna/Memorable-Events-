// --- Mobile Menu Toggle ---
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('navbar');
menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menu.setAttribute('aria-hidden', !isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('#navbar a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden','true');
      menuToggle.setAttribute('aria-expanded','false');
    }
  });
});
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && !e.target.closest('.site-nav')) {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden','true');
    menuToggle.setAttribute('aria-expanded','false');
  }
});
window.addEventListener('resize', () => {
  if(window.innerWidth>768){
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden','false');
    menuToggle.setAttribute('aria-expanded','false');
  }
});

// --- Gallery Pagination ---
const galleries = {
  basic: { 
  id: "basicGallery", 
  pageNum: "basicPageNum", 
  images: [
    "images/basic/Basic1.jpg",
    "images/basic/Basic2.jpg",
    "images/basic/Basic3.jpg",
    "images/basic/Basic4.jpg",
    "images/basic/Basic5.jpg",
    "images/basic/Basic6.jpg",
    "images/basic/Basic7.jpg",
    "images/basic/Basic8.jpg",
    "images/basic/Basic9.jpg"
  ], 
  currentPage: 1, 
  perPage: 3 
},
  theme: {
  id: "themeGallery",
  pageNum: "themePageNum",
  images: [
    "images/Theme/Theme1.jpg",
    "images/Theme/Theme2.jpg",
    "images/Theme/Theme3.jpg",
    "images/Theme/Theme4.jpg",
    "images/Theme/Theme5.jpg",
    "images/Theme/Theme6.jpg",
    "images/Theme/Theme7.jpg",
    "images/Theme/Theme8.jpg",
    "images/Theme/Theme9.jpg"
  ],
  currentPage: 1,
  perPage: 3
}
  standard: {
  id: "standardGallery",
  pageNum: "standardPageNum",
  images: [
    "images/Standard/standard1.jpg",
    "images/Standard/standard2.jpg",
    "images/Standard/standard3.jpg",
    "images/Standard/standard4.jpg",
    "images/Standard/standard5.jpg",
    "images/Standard/standard6.jpg",
    "images/Standard/standard7.jpg",
    "images/Standard/standard8.jpg",
    "images/Standard/standard9.jpg"
  ],
  currentPage: 1,
  perPage: 3
}

};
function renderGallery(type){
  const gallery=galleries[type];
  const container=document.getElementById(gallery.id);
  const pageNum=document.getElementById(gallery.pageNum);
  const start=(gallery.currentPage-1)*gallery.perPage;
  const end=start+gallery.perPage;
  const imagesToShow=gallery.images.slice(start,end);
  container.innerHTML=imagesToShow.map(img=>`<img src="${img}" alt="">`).join("");
  pageNum.textContent=`${gallery.currentPage} / ${Math.ceil(gallery.images.length/gallery.perPage)}`;
}
function prevPage(type){ if(galleries[type].currentPage>1){ galleries[type].currentPage--; renderGallery(type); } }
function nextPage(type){ const totalPages=Math.ceil(galleries[type].images.length/galleries[type].perPage); if(galleries[type].currentPage<totalPages){ galleries[type].currentPage++; renderGallery(type); } }
Object.keys(galleries).forEach(renderGallery);

// --- WhatsApp Form ---
function sendToWhatsApp(event){
  event.preventDefault();
  let name=document.getElementById("name").value.trim();
  let eventType=document.getElementById("eventType").value;
  let mobile=document.getElementById("mobile").value.trim();
  let altMobile=document.getElementById("altMobile").value.trim();
  let theme=document.getElementById("theme").value;
  let venue=document.getElementById("venue").value.trim();
  let date=document.getElementById("date").value;
  if(!/^[0-9]{10}$/.test(mobile)){ alert("Enter valid 10-digit mobile."); return; }
  if(altMobile && !/^[0-9]{10}$/.test(altMobile)){ alert("Enter valid 10-digit alternate mobile."); return; }
  let phoneNumber="917483463766";
  let message=`New Event Booking Request:\nName: ${name}\nEvent Type: ${eventType}\nMobile: ${mobile}\nAlt Mobile: ${altMobile||"N/A"}\nTheme: ${theme}\nVenue: ${venue}\nDate: ${date}`;
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,"_blank");
}

// --- Instagram Feed ---
const accessToken="YOUR_ACCESS_TOKEN_HERE";
const apiURL=`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&limit=5&access_token=${accessToken}`;
fetch(apiURL)
.then(res=>res.json())
.then(data=>{
  const feed=document.getElementById("insta-feed");
  feed.innerHTML="";
  data.data.forEach(post=>{
    const link=document.createElement("a");
    link.href=post.permalink; link.target="_blank";
    const img=document.createElement("img");
    img.src=post.media_url; img.alt=post.caption||"Instagram Post";
    link.appendChild(img); feed.appendChild(link);
  });
})
.catch(err=>{
  console.error("Instagram fetch error:",err);
  document.getElementById("insta-feed").innerText="Unable to load posts.";
});





