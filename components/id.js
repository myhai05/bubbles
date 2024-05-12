

// Fonction pour générer un identifiant unique pour chaque bulle
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };

  export default generateUniqueId;