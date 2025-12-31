# 🍽️ Application de Gestion de Recettes – Laravel + Inertia + React

Cette application permet la consultation et l’administration de recettes de cuisine.  
Elle a été développée avec **Laravel**, **Inertia.js**, et **React JSX** en respectant la maquette fournie.  

---

## ✨ Fonctionnalités

### Front Office
- Affichage des recettes en blog
- Recherche/filtres par catégorie
- Page de détail d’une recette
- Navigation responsive

### Back Office (Admin)
- Authentification
- Tableau de bord
- CRUD complet : Ajouter / Modifier / Supprimer
- Gestion des catégories, sections & ingrédients

---

## 🧱 Technologies utilisées

| Côté | Stack |
|------|------|
| Backend | Laravel 12, MySQL |
| Frontend | React + Inertia.js + Vite |
| Outils | Node.js, Composer, Docker (optionnel) |

---

## 📂 Structure du projet

```

app/
├─ Http/Controllers/
│   ├─ Auth/
│   └─ Admin/
|   └─ HomeController.php
routes/
├─ web.php
└─ auth.php
resources/
└─ js/Pages/
├─ Front/
└─ Admin/

````

---

## 🛠️ Installation & Exécution (Sans Docker)

📌 Clone & installation des dépendances

```bash
git clone https://github.com/ton-projet/gestion-recettes.git
cd gestion-recettes
composer install
npm install
````

📌 Config `.env` + clé application

```bash
cp .env.example .env
php artisan key:generate
```

📌 Base de données à configurer dans `.env` :

```
DB_DATABASE=gestion_recette
DB_USERNAME=root
DB_PASSWORD=
```

📌 Migration + Seeders

```bash
php artisan migrate --seed
```

📌 Lancer l’application

```bash
npm run dev
php artisan serve
```

➡️ Disponible sur : [http://localhost:8000](http://localhost:8000)

---

## 🔑 Accès Admin pour tester

| Rôle  | Email                                           | Mot de passe |
| ----- | ----------------------------------------------- | ------------ |
| Admin | [admin@example.com](mailto:admin@example.com)   | 1234567890   |
| User  | [user@example.com](mailto:user@example.com)     | 1234567890   |

📍 Dashboard Admin :
👉 [http://localhost:8000/admin/dashboard](http://localhost:8000/admin/dashboard)

---

## 🐳 Exécution avec Docker (Optionnel)

### Lancer les services

```bash
docker-compose up -d --build
```

### Initialisation Laravel

```bash
docker exec -it laravel_app composer install
docker exec -it laravel_app php artisan key:generate
docker exec -it laravel_app php artisan migrate --seed
```

📌 Serveur accessible ➜ [http://localhost:8000](http://localhost:8000)

---

## 🧪 Test rapide des fonctionnalités

| Écran           | Test à réaliser                  |
| --------------- | -------------------------------- |
| Accueil         | Afficher & filtrer les recettes  |
| Détail recette  | Vérifier affichage complet       |
| Admin Dashboard | Connexion + Ajout recette        |
| CRUD            | Modifier / Supprimer une recette |
| Responsive      | Tester sur mobile                |

---

## Autres précisions Techniques

Commande d’extraction auto des couleurs dominantes des catégories :

```bash
php artisan categories:compute-colors
```


Merci 🧡 Merci !!!
