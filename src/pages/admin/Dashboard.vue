<script setup>
import { RouterLink } from 'vue-router'

// TODO: remplacer ces données statiques par un appel API
// (ex: GET /api/dashboard au montage du composant, via onMounted)

const stats = [
  { id: 'completed', label: 'Exercices complétés', value: '127', mono: false, colorClass: '' },
  { id: 'success', label: 'Taux de réussite', value: '74', suffix: '%', mono: false, colorClass: 'text-success' },
  { id: 'time', label: 'Temps moyen / question', value: '0:38', mono: true, colorClass: '' },
]

const categoriesProgress = [
  { id: 'numerique', label: 'Séries numériques', done: 48, total: 60, barClass: 'bg-indigo' },
  { id: 'spatial', label: 'Raisonnement spatial', done: 31, total: 60, barClass: 'bg-indigo' },
  { id: 'verbal', label: 'Analogies verbales', done: 48, total: 50, barClass: 'bg-gold' },
]

const recentAttempts = [
  { id: 1, title: 'Suite logique #48', category: 'Séries numériques', correct: true },
  { id: 2, title: 'Matrice visuelle #12', category: 'Raisonnement spatial', correct: false },
  { id: 3, title: 'Analogie #33', category: 'Analogies verbales', correct: true },
]

// const user = JSON.parse(localStorage.getItem('user'))

// console.log(user)


function progressPercent(item) {
  return Math.round((item.done / item.total) * 100)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1 class="font-serif text-3xl mb-1">Bon retour, Aïssatou</h1>
        <p class="text-ink/55 text-sm">Voici où tu en es dans ta préparation.</p>
      </div>
      <RouterLink to="/dashboard/exercices" class="hidden sm:inline-flex items-center rounded-full bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-indigo-700 transition-colors">
        Reprendre l'entraînement
      </RouterLink>
    </div>

    <!-- Stats -->
    <div class="grid sm:grid-cols-3 gap-5 mb-10">
      <div v-for="stat in stats" :key="stat.id" class="border border-ink/10 rounded-xl p-6">
        <p class="text-sm text-ink/55 mb-2">{{ stat.label }}</p>
        <p class="text-4xl" :class="[stat.mono ? 'font-mono' : 'font-serif', stat.colorClass]">
          {{ stat.value }}<span v-if="stat.suffix" class="text-2xl">{{ stat.suffix }}</span>
        </p>
      </div>
    </div>

    <div class="grid lg:grid-cols-[1.3fr_1fr] gap-8">

      <!-- Progress by category -->
      <div>
        <h2 class="font-serif text-xl mb-4">Progression par catégorie</h2>
        <div class="space-y-4">
          <div v-for="cat in categoriesProgress" :key="cat.id" class="border border-ink/10 rounded-xl p-5">
            <div class="flex items-center justify-between mb-2.5">
              <span class="font-medium text-sm">{{ cat.label }}</span>
              <span class="text-sm text-ink/55">{{ cat.done }} / {{ cat.total }}</span>
            </div>
            <div class="h-1.5 bg-ink/10 rounded-full overflow-hidden">
              <div class="h-full rounded-full" :class="cat.barClass" :style="{ width: progressPercent(cat) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent activity -->
      <div>
        <h2 class="font-serif text-xl mb-4">Activité récente</h2>
        <div class="border border-ink/10 rounded-xl divide-y divide-ink/8">
          <div v-for="attempt in recentAttempts" :key="attempt.id" class="flex items-center justify-between px-5 py-4">
            <div>
              <p class="text-sm font-medium">{{ attempt.title }}</p>
              <p class="text-xs text-ink/50 mt-0.5">{{ attempt.category }}</p>
            </div>
            <span
              class="text-xs font-medium rounded-full px-2.5 py-1"
              :class="attempt.correct ? 'text-success bg-success/10' : 'text-danger bg-danger/10'"
            >
              {{ attempt.correct ? 'Correct' : 'Incorrect' }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>