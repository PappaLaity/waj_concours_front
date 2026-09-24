<script setup>
import { RouterLink } from 'vue-router'
import useUSerStore from '../store/user.js'

const userStore = useUSerStore()

// Les 3 cartes de catégories étaient dupliquées en dur dans le HTML.
// On les transforme en données + v-for : plus facile à maintenir,
// et prêt à être remplacé par un appel API plus tard.
const categories = [
  {
    id: 'numerique',
    title: 'Séries numériques',
    description: 'Repérer une logique dans une suite de nombres, sous la pression du chronomètre.',
    icon: 'M4 17l4-6 4 3 4-8 4 5',
  },
  {
    id: 'spatial',
    title: 'Raisonnement spatial',
    description: 'Rotations, pliages et matrices visuelles — visualiser une figure sous un autre angle.',
    icon: null, // icône composée de 2 formes, gardée en dur dans le template ci-dessous
  },
  {
    id: 'verbal',
    title: 'Analogies verbales',
    description: 'Relier deux idées par leur structure logique, au-delà du simple vocabulaire.',
    icon: null,
  },
]
</script>

<template>
  <div class="bg-paper text-ink font-sans antialiased">

    <!-- Nav -->
    <header class="border-b border-ink/10">
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <RouterLink to="/" class="font-serif text-2xl tracking-tight">Épreuve<span class="text-gold">.</span>
        </RouterLink>
        <nav class="hidden md:flex items-center gap-10 text-[15px] text-ink/70">
          <a href="#categories" class="hover:text-ink transition-colors">Exercices</a>
          <a href="#tarif" class="hover:text-ink transition-colors">Tarif</a>
          <RouterLink v-if="!userStore.user" :to="{ name: 'Login' }" class="hover:text-ink transition-colors">Connexion</RouterLink>
        </nav>
        <!-- Bouton header conditionnel -->
        <template v-if="userStore.user">
          <RouterLink :to="{ name: 'Dashboard' }"
            class="inline-flex items-center rounded-full bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-indigo-700 transition-colors">
            Dashboard
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink :to="{ name: 'Register' }"
            class="inline-flex items-center rounded-full bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-indigo-700 transition-colors">
            Commencer
          </RouterLink>
        </template>
      </div>
    </header>

    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <p class="hero-rise hero-rise-1 text-sm font-medium text-indigo tracking-wide">Préparation au concours ENA</p>
        <h1 class="hero-rise hero-rise-2 font-serif text-[2.75rem] leading-[1.08] mt-4 mb-6">
          Entraîne ton raisonnement, pas seulement ta mémoire.
        </h1>
        <p class="hero-rise hero-rise-3 text-lg text-ink/70 max-w-md leading-relaxed">
          Des centaines d'exercices psychotechniques chronométrés — séries numériques, raisonnement spatial, analogies
          verbales — corrigés et expliqués, pour arriver le jour J avec des réflexes déjà rodés.
        </p>
        <!-- Boutons hero conditionnels -->
        <template v-if="userStore.user">
          <div class="hero-rise hero-rise-3 flex flex-wrap items-center gap-4 mt-9">
            <RouterLink :to="{ name: 'Dashboard' }"
              class="inline-flex items-center rounded-full bg-indigo text-paper font-medium px-6 py-3.5 hover:bg-indigo-700 transition-colors">
              Aller au Dashboard
            </RouterLink>
            <a href="#categories"
              class="inline-flex items-center text-ink font-medium px-2 py-3.5 border-b border-ink/30 hover:border-ink transition-colors">
              Voir les catégories
            </a>
          </div>
        </template>
        <template v-else>
          <div class="hero-rise hero-rise-3 flex flex-wrap items-center gap-4 mt-9">
            <RouterLink to="/inscription"
              class="inline-flex items-center rounded-full bg-indigo text-paper font-medium px-6 py-3.5 hover:bg-indigo-700 transition-colors">
              Commencer — 1000 FCFA
            </RouterLink>
            <a href="#categories"
              class="inline-flex items-center text-ink font-medium px-2 py-3.5 border-b border-ink/30 hover:border-ink transition-colors">
              Essayer un exercice gratuit
            </a>
          </div>
        </template>
      </div>

      <!-- Aperçu d'exercice — reste statique pour la démo, à connecter à un vrai exercice plus tard -->
      <div class="relative">
        <div class="bg-ink text-paper rounded-2xl p-7 shadow-xl shadow-ink/15 max-w-sm ml-auto">
          <div class="flex items-center justify-between mb-6">
            <span class="text-xs font-medium text-paper/50">Séries numériques · Question 4/10</span>
            <span class="font-mono text-lg text-gold">00:47</span>
          </div>
          <p class="font-serif text-xl leading-snug mb-6">Quel nombre complète la suite ?</p>
          <p class="font-mono text-2xl tracking-wide mb-7">3, 7, 15, 31, …</p>
          <div class="grid grid-cols-2 gap-3">
            <div class="border border-paper/20 rounded-lg py-2.5 text-center font-mono text-sm">47</div>
            <div class="border border-gold rounded-lg py-2.5 text-center font-mono text-sm bg-gold/10 text-gold">63
            </div>
            <div class="border border-paper/20 rounded-lg py-2.5 text-center font-mono text-sm">55</div>
            <div class="border border-paper/20 rounded-lg py-2.5 text-center font-mono text-sm">71</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section id="categories" class="max-w-6xl mx-auto px-6 pb-24">
      <div class="max-w-lg mb-12">
        <h2 class="font-serif text-3xl mb-3">Trois types de raisonnement, un même entraînement.</h2>
        <p class="text-ink/65 leading-relaxed">Chaque catégorie reproduit fidèlement le format et le chronométrage des
          épreuves du concours.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="category in categories" :key="category.id" class="border border-ink/10 rounded-xl p-7 bg-white/40">
          <svg v-if="category.icon" class="w-8 h-8 mb-5 text-indigo" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.6">
            <path :d="category.icon" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-else-if="category.id === 'spatial'" class="w-8 h-8 mb-5 text-indigo" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.6">
            <rect x="4" y="4" width="9" height="9" rx="1" />
            <rect x="13" y="13" width="7" height="7" rx="1" transform="rotate(20 16.5 16.5)" />
          </svg>
          <svg v-else class="w-8 h-8 mb-5 text-indigo" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.6">
            <path d="M5 6h6M5 10h9M5 14h5" stroke-linecap="round" />
            <path d="M16 15l3 3 3-3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h3 class="font-serif text-lg mb-2">{{ category.title }}</h3>
          <p class="text-sm text-ink/60 leading-relaxed">{{ category.description }}</p>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-indigo/5 border-y border-ink/10">
      <div class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        <div>
          <span class="font-serif text-3xl text-gold">1</span>
          <h3 class="font-medium mt-3 mb-2">Choisis une catégorie</h3>
          <p class="text-sm text-ink/60 leading-relaxed">Commence par tes points faibles ou suis un parcours complet.
          </p>
        </div>
        <div>
          <span class="font-serif text-3xl text-gold">2</span>
          <h3 class="font-medium mt-3 mb-2">Réponds sous chrono</h3>
          <p class="text-sm text-ink/60 leading-relaxed">Chaque exercice reproduit les conditions réelles de l'épreuve.
          </p>
        </div>
        <div>
          <span class="font-serif text-3xl text-gold">3</span>
          <h3 class="font-medium mt-3 mb-2">Suis ta progression</h3>
          <p class="text-sm text-ink/60 leading-relaxed">Identifie où tu perds du temps et où tu te trompes le plus.</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="tarif" class="max-w-6xl mx-auto px-6 py-24">
      <div class="max-w-md mx-auto border border-ink/15 rounded-2xl p-9 text-center">
        <p class="text-sm text-ink/60 mb-2">Accès complet</p>
        <p class="font-serif text-5xl mb-1">1 000 <span class="text-2xl">FCFA</span></p>
        <p class="text-sm text-ink/50 mb-8">Paiement unique</p>
        <ul class="text-left space-y-3 text-sm text-ink/75 mb-9">
          <li class="flex gap-3"><span class="text-success">✓</span> Accès illimité à toutes les catégories</li>
          <li class="flex gap-3"><span class="text-success">✓</span> Corrections détaillées après chaque exercice</li>
          <li class="flex gap-3"><span class="text-success">✓</span> Suivi de progression par catégorie</li>
          <li class="flex gap-3"><span class="text-success">✓</span> Paiement par Orange Money ou Wave</li>
        </ul>
        <RouterLink to="/inscription"
          class="block w-full rounded-full bg-ink text-paper font-medium py-3.5 hover:bg-indigo-700 transition-colors">
          Créer mon compte
        </RouterLink>
      </div>
    </section>

    <footer class="border-t border-ink/10">
      <div
        class="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink/50">
        <span>© 2026 Épreuve. Plateforme indépendante de préparation au concours.</span>
        <div class="flex gap-6">
          <a href="#" class="hover:text-ink/80">Contact</a>
          <a href="#" class="hover:text-ink/80">Conditions</a>
        </div>
      </div>
    </footer>

  </div>
</template>