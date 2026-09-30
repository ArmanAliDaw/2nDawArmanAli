// ==========================================
// DADES GLOBALS DE CONFIGURACIÓ I ESTAT
// ==========================================
var currentBooking = {
    id: "RES-2026-8942",
    hotelName: "Grand Palace Resort",
    checkIn: "2026-09-18",
    checkOut: "2026-09-15", // BUG 1.0: Sortida anterior a l'entrada (útil per provar validacions)
    pricePerNight: 120.50,
    lat: 41.38879,
    lng: 2.15899
};

var syncInterval = null;

/**
 * Funció auxiliar per mostrar feedback a l'HTML
 * TODO per l'alumne: assegurar-se que escriu a l'element #apiFeedback
 */
function showApiFeedback(message, type = "info") {
    var feedbackEl = document.querySelector("#apiFeedback");
    if (feedbackEl) {
        feedbackEl.innerHTML = "<small class='feedback-" + type + "'>" + message + "</small>";
    } else {
        console.log("[" + type.toUpperCase() + "]: " + message);
    }
}


// ==========================================
// BLOC 1: DATES, TIMEZONE I FORMATS (DEFECTUÓS)
// ==========================================

function calculateStay(checkInStr, checkOutStr) {
    // BUG 1.1.1: Comparació alfabètica de cadenes, no temporal
    if (checkInStr >= checkOutStr) {
        console.log("Error en dates: La sortida sembla anterior a l'entrada (avaluació alfabètica)");
    }

    // BUG 1.1.2: Resta directa de cadenes de text (retorna NaN)
    var nights = checkOutStr - checkInStr;

    return nights;
}

function formatBookingDate(dateString) {
    var d = new Date(dateString);
    // BUG 1.2.1: getMonth() va de 0 a 11 (setembre torna 8) + concatenació manual no regional
    var formatted = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    return formatted;
}

function formatPrice(amount) {
    // BUG 1.2.2: No respecta la moneda triada ni la configuració regional (Intl)
    return amount + " €";
}


// ==========================================
// BLOC 2: PERSISTÈNCIA I WEB STORAGE (DEFECTUÓS)
// ==========================================

function savePreferences(preferences) {
    // BUG 2.1.1: Guarda l'objecte directament sense JSON.stringify -> Guarda "[object Object]"
    localStorage.setItem("user_preferences", preferences);
}

function loadPreferences() {
    // BUG 2.1.2: Intenta accedir a una propietat d'una cadena no parsejada (retorna undefined)
    var prefs = localStorage.getItem("user_preferences");
    if (prefs) {
        return prefs.theme; 
    }
    return null;
}

// BUG 2.1.3: : TODO Crear funció applyTheme(theme) per afegir/treure la classe 'dark-theme' al body


// ==========================================
// BLOC 3: APIS NATIVES DEL NAVEGADOR (DEFECTUÓS)
// ==========================================

function copyBookingCode() {
    // BUG 3.1.1: Ús d'execCommand obsolet i sense gestió d'errors
    document.execCommand("copy");
    showApiFeedback("Codi copiat (execCommand)", "info");
}

function shareBooking() {
    // BUG 3.1.2: Crida directa sense Feature Detection (falla/petarà en escriptori)
    navigator.share({
        title: 'La meva reserva',
        text: 'Reserva a ' + currentBooking.hotelName,
        url: window.location.href
    });
}

function sendProximityNotification() {
    // BUG 3.2: Envia notificació sense sol·licitar permís prèviament a l'usuari
    new Notification("Reserva propera!", {
        body: "La teva estada a " + currentBooking.hotelName + " comença aviat."
    });
}

function findNearbyHotels() {
    // BUG 3.3: Sense callback d'error si l'usuari denega la geolocalització
    navigator.geolocation.getCurrentPosition(function(position) {
        showApiFeedback("Ubicació obtinguda: Lat " + position.coords.latitude, "success");
    });
}

function startLiveUpdates() {
    // BUG 3.4: Temporitzador que no es pausa quan la pestanya es fa invisible (Page Visibility)
    syncInterval = setInterval(function() {
        console.log("Comprovant estat de la reserva amb el servidor...");
    }, 3000);
}


// ==========================================
// CONTROLADOR I ENLLAÇ AMB EL DOM (HTML)
// ==========================================

function handleCalculateStay() {
    var checkInVal = document.querySelector("#checkInInput").value;
    var checkOutVal = document.querySelector("#checkOutInput").value;

    // Crida a la funció defectuosa
    var nights = calculateStay(checkInVal, checkOutVal);

    var pricePerNight = currentBooking.pricePerNight;
    var totalPrice = nights * pricePerNight; // Generarà NaN * 120.50 = NaN

    // Renderitzat amb bugs de visualització
    document.querySelector("#checkInDisplay").textContent = formatBookingDate(checkInVal);
    document.querySelector("#checkOutDisplay").textContent = formatBookingDate(checkOutVal);
    document.querySelector("#stayNightsDisplay").textContent = nights; // Mostrarà NaN
    document.querySelector("#pricePerNightDisplay").textContent = formatPrice(pricePerNight);
    document.querySelector("#totalPriceDisplay").textContent = formatPrice(totalPrice); // Mostrarà "NaN €"
}

// Vinculació d'esdeveniments DOM
document.addEventListener("DOMContentLoaded", function() {

    // TODO: Carregar preferències de localStorage a l'inici i aplicar el tema visual

    // TODO: Escoltar esdeveniment 'change' a #themeSelect per canviar el tema a l'instant

    // TODO: Escoltar esdeveniment 'storage' a window per sincronitzar pestanyes

    // Botó Càlcul
    var btnCalculate = document.querySelector("#btnCalculateStay");
    if (btnCalculate) {
        btnCalculate.addEventListener("click", handleCalculateStay);
    }

    // Botó Preferències
    var btnSave = document.querySelector("#btnSavePreferences");
    if (btnSave) {
        btnSave.addEventListener("click", function() {
            var theme = document.querySelector("#themeSelect").value;
            var lang = document.querySelector("#langSelect").value;
            var currency = document.querySelector("#currencySelect").value;

            // Envia un objecte a savePreferences
            savePreferences({ theme: theme, lang: lang, currency: currency });
            showApiFeedback("S'ha intentat desar les preferències!", "info");
        });
    }

    // Botons d'APIs Natives
    var btnCopy = document.querySelector("#btnCopyCode");
    if (btnCopy) {
        btnCopy.addEventListener("click", () => copyBookingCode(currentBooking.id));
    }

    var btnShare = document.querySelector("#btnShareBooking");
    if (btnShare) {
        btnShare.addEventListener("click", shareBooking);
    }

    var btnNotify = document.querySelector("#btnNotify");
    if (btnNotify) {
        btnNotify.addEventListener("click", () => {
        sendProximityNotification(currentBooking);
    });
    }

    var btnGPS = document.querySelector("#btnNearbyHotels");
    if (btnGPS) {
        btnGPS.addEventListener("click", findNearbyHotels);
    }

    // TODO: Escoltar 'visibilitychange' per aturar/activar el temporitzador

    // Execució inicial del temporitzador en segon pla
    startLiveUpdates();
});