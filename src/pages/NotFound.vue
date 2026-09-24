<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="bg-paper text-ink font-sans antialiased min-h-screen flex flex-col">
    
    <!-- Nav -->
    <header class="border-b border-ink/10">
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <RouterLink to="/" class="font-serif text-2xl tracking-tight">Épreuve<span class="text-gold">.</span></RouterLink>
      </div>
    </header>

    <!-- 404 Content -->
    <section class="flex-1 max-w-6xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center gap-8">
      
      <!-- Illustation textuelle -->
      <div class="relative">
        <div class="font-serif text-9xl font-bold text-gold/20 leading-none">404</div>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-32 h-32 text-indigo/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <!-- Message -->
      <div class="max-w-md">
        <h1 class="font-serif text-4xl mb-4">
          Oups ! Cette page n'existe pas.
        </h1>
        <p class="text-lg text-ink/65 leading-relaxed mb-2">
          C'est comme une série numérique sans logique — tu ne trouveras rien ici.
        </p>
        <p class="text-sm text-ink/50">
          Retourne à l'accueil ou continue ton entraînement.
        </p>
      </div>

      <!-- Boutons -->
      <div class="flex flex-wrap items-center justify-center gap-4 mt-8">
        <RouterLink to="/"
          class="inline-flex items-center rounded-full bg-ink text-paper font-medium px-6 py-3.5 hover:bg-indigo-700 transition-colors">
          ← Retour à l'accueil
        </RouterLink>
        <RouterLink :to="{ name: 'Dashboard' }"
          class="inline-flex items-center rounded-full border-2 border-ink text-ink font-medium px-6 py-3.5 hover:bg-ink/5 transition-colors">
          Aller au Dashboard
        </RouterLink>
      </div>

      <!-- Suggestions rapides -->
      <div class="mt-12 pt-8 border-t border-ink/10 max-w-lg">
        <p class="text-sm text-ink/60 mb-6">Tu cherchais peut-être une de ces pages ?</p>
        <nav class="flex flex-wrap items-center justify-center gap-6 text-sm">
          <RouterLink :to="{ name: 'Home' }" class="text-indigo hover:text-indigo-700 font-medium transition-colors">Accueil</RouterLink>
          <RouterLink :to="{ name: 'Login' }" class="text-indigo hover:text-indigo-700 font-medium transition-colors">Connexion</RouterLink>
          <RouterLink :to="{ name: 'Register' }" class="text-indigo hover:text-indigo-700 font-medium transition-colors">S'inscrire</RouterLink>
          <a href="#" class="text-indigo hover:text-indigo-700 font-medium transition-colors">Contact</a>
        </nav>
      </div>

    </section>

    <!-- Footer -->
    <footer class="border-t border-ink/10 mt-auto">
      <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink/50">
        <span>© 2026 Épreuve. Plateforme indépendante de préparation au concours.</span>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* Animation subtile pour l'emoji */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

svg {
  animation: float 3s ease-in-out infinite;
}
</style>