<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import axiosClient from '../axios.js'

const router = useRouter()
const form = ref({
  name: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
  // terms: false,
})

const error = ref('')
const loading = ref(false)

const passwordsMatch = computed(
  () => !form.password_confirmation.value || form.password.value === form.password_confirmation.value
)

async function handleRegister() {
  error.value = ''

  if (!form.terms) {
    error.value = "Tu dois accepter les conditions d'utilisation."
    return
  }
  if (form.password !== form.password_confirmation) {
    error.value = "Les mots de passe ne correspondent pas."
    return
  }

  loading.value = true
  try {
    axiosClient.get('/sanctum/csrf-cookie').then(() => {
      axiosClient.post('/register', form.value)
        .then((response) => {
          console.log('Register successful:', response)
          router.push('/dashboard')
        })
        .catch((error) => {
          error.value = "Une erreur est survenue. Réessaie."
        })
        .finally(() => {
          loading.value = false
        })
    })
    // TODO: remplacer par l'appel réel à ton API Laravel
    // const { data } = await api.post('/register', form)
    // stocker le token Sanctum, puis rediriger vers le paiement ou le dashboard
    // router.push('/dashboard')
  } catch (e) {
    error.value = "Une erreur est survenue. Réessaie."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout form-panel-class="p-8 py-14">
    <template #brand>
      <p class="font-serif text-3xl leading-snug mb-4">Rejoins les candidats qui s'entraînent avec les mêmes conditions
        que le jour J.</p>
      <div class="flex items-center gap-4 mt-6 text-sm text-paper/60">
        <span class="font-mono text-gold text-lg">1000 FCFA</span>
        <span>accès illimité, paiement unique</span>
      </div>
    </template>

    <h1 class="font-serif text-3xl mb-2">Crée ton compte</h1>
    <p class="text-ink/60 text-sm mb-8">Quelques secondes pour commencer à t'entraîner.</p>

    <form class="space-y-5" @submit.prevent="handleRegister">
      <div>
        <label for="name" class="block text-sm font-medium mb-1.5">Nom complet</label>
        <input id="name" v-model="form.name" type="text" name="name" autocomplete="name" required
          class="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/40 focus:border-indigo"
          placeholder="Aïssatou Diop">
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium mb-1.5">Téléphone</label>
        <input id="phone" v-model="form.phone" type="tel" name="phone" autocomplete="tel" required
          class="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/40 focus:border-indigo"
          placeholder="77 123 45 67">
      </div>

      <div>
        <label for="email" class="block text-sm font-medium mb-1.5">Email</label>
        <input id="email" v-model="form.email" type="tel" name="email" autocomplete="email" required
          class="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/40 focus:border-indigo"
          placeholder="77 123 45 67">
      </div>

      <div>
        <label for="password" class="block text-sm font-medium mb-1.5">Mot de passe</label>
        <input id="password" v-model="form.password" type="password" name="password" autocomplete="new-password"
          required minlength="8"
          class="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/40 focus:border-indigo"
          placeholder="8 caractères minimum">
      </div>

      <div>
        <label for="password_confirmation" class="block text-sm font-medium mb-1.5">Confirmer le mot de passe</label>
        <input id="password_confirmation" v-model="form.password_confirmation" type="password"
          name="password_confirmation" autocomplete="new-password" required
          class="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white"
          :class="passwordsMatch ? 'border-ink/15 focus:ring-indigo/40 focus:border-indigo' : 'border-danger focus:ring-danger/30'"
          placeholder="••••••••">
      </div>

      <label class="flex items-start gap-2.5 text-sm text-ink/60">
        <input v-model="form.terms" type="checkbox" name="terms"
          class="mt-0.5 rounded border-ink/30 text-indigo focus:ring-indigo/40">
        <span>J'accepte les <a href="#" class="text-indigo hover:underline">conditions d'utilisation</a></span>
      </label>

      <p v-if="error" class="text-sm text-danger bg-danger/5 border border-danger/20 rounded-lg px-3 py-2">
        {{ error }}
      </p>

      <button type="submit" :disabled="loading"
        class="w-full rounded-full bg-ink text-paper font-medium py-3.5 hover:bg-indigo-700 transition-colors disabled:opacity-50">
        {{ loading ? 'Création…' : 'Créer mon compte' }}
      </button>
    </form>

    <p class="text-sm text-ink/60 mt-8 text-center">
      Déjà inscrit ?
      <RouterLink to="/connexion" class="text-indigo font-medium hover:underline">Se connecter</RouterLink>
    </p>
  </AuthLayout>
</template>