/* =====================================================================
   CONFIGURAÇÕES — EDITE AQUI
   ===================================================================== */
// WhatsApp com DDI+DDD+número, só dígitos. Ex.: "5512999999999"
const whatsappNumber = "5512978140996";
// Link do Instagram (perfil informado: @fhaelbarbeiro)
const instagramUrl = "https://instagram.com/fhaelbarbeiro";
// Link do Google Maps (ideal: link de compartilhamento do endereço completo, com cidade/UF)
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Rua+Paul+Harris%2C+51+-+Jardim+S%C3%A3o+Jos%C3%A9";
// Link ÚNICO de agendamento — usado por todos os botões "Agendar"
const bookingUrl = "https://chat.inbarberapp.com/?id=967b9bb0-d8ca-4a24-88f5-ca2f37b2717c";
/* ===================================================================== */

const configured = /^\d{10,15}$/.test(whatsappNumber);
const $ = (s) => document.querySelector(s);

// Links de redes / mapa
document.querySelectorAll(".js-whatsapp").forEach(a => a.href = configured ? `https://wa.me/${whatsappNumber}` : "#inicio");
document.querySelectorAll(".js-instagram").forEach(a => a.href = instagramUrl);
document.querySelectorAll(".js-maps").forEach(a => a.href = mapsUrl);

// Planos: botões abrem o WhatsApp (mesmo número acima) com a mensagem do plano (data-whatsapp-msg)
document.querySelectorAll(".js-plano-whatsapp").forEach(a => {
  a.href = configured
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(a.dataset.whatsappMsg || "")}`
    : "#inicio";
});

// Mostra o número no texto de contato, somente se esse elemento existir na página
const whatsText = $("#whatsText");
if (configured && whatsText) whatsText.textContent = whatsappNumber;

// Agendamento: todos os botões/links levam ao mesmo endereço
document.querySelectorAll(".js-agendar").forEach(a => {
  a.href = bookingUrl;
  a.target = "_blank";
  a.rel = "noopener";
});

// Menu hamburger
const nav = $("#mainNav"), toggle = $("#menuToggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false);
}));

// Animação ao rolar
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
