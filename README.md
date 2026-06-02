# Tapakila UI

Frontend Next.js 15 de la plateforme Tapakila - interface publique de navigation et réservation d'événements.

> Développé en solo en complément de [tapakila-api](https://github.com/Williest-Andry/tapakila-api). Stack moderne avec typage de bout en bout depuis le contrat OpenAPI.
> 
> [ancien Tapakila](https://github.com/Williest-Andry/Tapakila.git) en groupe - 2025

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript |
| UI | Chakra UI v3 |
| État global | Zustand |
| Fetching & cache | TanStack Query v5 |
| Client API | openapi-fetch |
| Types API | openapi-typescript (générés depuis le contrat OpenAPI) |
| Validation formulaires | Zod |

---

## Architecture

```
.
├── app/
│   ├── (auth)/             # Routes authentification (login, register)
│   ├── (public)/           # Routes publiques (accueil, événements)
│   ├── event/              # Détail d'un événement
│   ├── components/         # Composants locaux aux routes
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── features/           # Composants métier (EventCard, BookingForm...)
│   ├── layout/             # Navbar, Footer
│   └── ui/                 # Composants Chakra UI réutilisables
├── lib/
│   ├── api/                # Client openapi-fetch + queries
│   └── theme.ts            # Thème Chakra UI personnalisé
├── schema/
│   ├── auth.schema.ts      # Schémas Zod pour les formulaires auth
│   └── booking.schema.ts   # Schémas Zod pour la réservation
├── store/
│   ├── auth.store.ts       # Store Zustand — session utilisateur
│   └── userStore.ts        # Store Zustand — données utilisateur
├── types/
│   └── api.types.ts        # Types extraits du contrat OpenAPI
├── middleware.ts            # Middleware Next.js (protection des routes)
└── openapi.yaml            # Contrat OpenAPI consommé par le frontend
```

---

## Fonctionnalités

- **Navigation des événements** avec filtres combinables : recherche, lieu, catégorie, plage de dates, prix, tri
- **Authentification** avec persistance du token et refresh automatique transparent
- **Panier de réservation** géré en Zustand avec sélection de type de billet
- **Typage bout en bout** : les types des appels API sont extraits directement du contrat OpenAPI — aucun type manuel
- **Chargement progressif** avec skeleton loaders sur toutes les listes

---

## Décisions techniques notables

### Typage depuis OpenAPI
Les types des réponses API sont extraits directement via `openapi-typescript` :
```typescript
type Event = paths["/events"]["get"]["responses"][200]["content"]["application/json"][0];
```
Zéro duplication, zéro désynchronisation possible entre le contrat et le frontend.

### Refresh token transparent
Un intercepteur `openapi-fetch` intercepte les 401, rafraîchit le token en arrière-plan et relance la requête originale — sans que l'utilisateur ne le remarque.

### Délégation Server → Client
Les composants Server Components récupèrent les données initiales, les composants Client prennent le relais pour l'interactivité (filtres, état de réservation).

---

## Lancer le projet en local

### Prérequis

- Node.js 18+
- [tapakila-api](https://github.com/Williest-Andry/tapakila-api) lancé localement

### Installation

```bash
git clone https://github.com/Williest-Andry/tapakila-ui.git
cd tapakila-ui
npm install
```

### Configuration

Crée un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Démarrage

```bash
npm run dev
```

L'application est disponible sur `http://localhost:3001`

---

## Auteur

**Williest ANDRY NY AINA**
[GitHub](https://github.com/Williest-Andry) · [LinkedIn](https://www.linkedin.com/in/williest-andry-ny-aina-2798a5337/)
