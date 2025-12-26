// resources/js/bootstrap.js
// Ce fichier configure Axios pour les requêtes HTTP dans une application Laravel avec Inertia.js.

// -------------------------
// Importations
// -------------------------
import axios from 'axios';
// window.axios = axios;

// -------------------------
// Axios Configuration
// -------------------------

// Définit l'URL de base pour toutes les requêtes API
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Inclut automatiquement les cookies pour les requêtes cross-site (important pour Inertia auth)
axios.defaults.withCredentials = true;

// Headers par défaut
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Intercepteur de réponse global pour gérer les erreurs
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Gestion globale des erreurs 401 / 419 / 500 par exemple
      switch (error.response.status) {
        case 401:
          console.error("Non autorisé. Vous devez vous reconnecter.");
          break;
        case 419:
          console.error("Token CSRF expiré. Rechargez la page.");
          break;
        case 500:
          console.error("Erreur serveur.");
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

// -------------------------
// Helpers Globaux (optionnel)
// -------------------------

// Ex: fonction pour formater les dates
// export const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString("fr-FR", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };

// -------------------------
// Export Axios pour l'utiliser partout
// -------------------------
export default axios;
