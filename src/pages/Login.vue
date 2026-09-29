<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import axiosClient from '../axios.js'

const router = useRouter()
const form = ref({
    email: '',
    password: '',
})

const error = ref('')
const errors = ref({})
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
    error.value = ''
    loading.value = true
    try {
        // console.log('Attempting login with:', form)
        axiosClient.get('/sanctum/csrf-cookie').then(() => {
            axiosClient.post('/login', form.value)
                .then((response) => {
                    // console.log('Login successful:', response)

                    router.push('/dashboard')
                })
                .catch((e) => {
                    errorMessage.value = e.response?.data?.message || "Identifiants incorrects. Réessaie."
                    // errors.value = e.response?.data?.errors || {}
                    // console.log('Login error: ', e.response)
                })
                .finally(() => {
                    loading.value = false
                })
        })
    } catch (err) {
        console.error('Login error:', err)
        error.value = "Identifiants incorrects. Réessaie."
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <AuthLayout>
        <template #brand>
            <p class="font-serif text-3xl leading-snug mb-4">« Ce qu'on répète sous pression devient un réflexe le jour
                de l'épreuve. »</p>
            <p class="text-paper/50 text-sm">Reprends là où tu t'es arrêté.</p>
        </template>

        <h1 class="font-serif text-3xl mb-2">Content de te revoir</h1>
        <p class="text-ink/60 text-sm mb-8">Connecte-toi pour continuer ta préparation.</p>

        <form class="space-y-5" @submit.prevent="handleLogin">
            <div>
                <label for="email" class="block text-sm font-medium mb-1.5">Téléphone ou email</label>
                <input id="email" v-model="form.email" type="text" name="email" autocomplete="username"
                    class="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/40 focus:border-indigo"
                    placeholder="77 123 45 67">
            </div>
            <!-- <p v-if="errors['email']"
                class="text-sm text-danger bg-danger/5 border border-danger/20 rounded-lg px-3 py-2">
                {{ errors['email'][0] }}
            </p> -->

            <div>
                <div class="flex items-center justify-between mb-1.5">
                    <label for="password" class="block text-sm font-medium">Mot de passe</label>
                    <a href="#" class="text-xs text-indigo hover:underline">Oublié ?</a>
                </div>
                <input id="password" v-model="form.password" type="password" name="password"
                    autocomplete="current-password"
                    class="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/40 focus:border-indigo"
                    placeholder="••••••••">
            </div>
            <!-- <p v-if="errors['password']"
                class="text-sm text-danger bg-danger/5 border border-danger/20 rounded-lg px-3 py-2">
                {{ errors['password'][0] }}
            </p> -->

            <p v-if="errorMessage" class="text-sm text-danger bg-danger/5 border border-danger/20 rounded-lg px-3 py-2">
                {{ errorMessage }}
            </p>

            <button type="submit" :disabled="loading"
                class="w-full rounded-full bg-ink text-paper font-medium py-3.5 hover:bg-indigo-700 transition-colors disabled:opacity-50">
                {{ loading ? 'Connexion…' : 'Se connecter' }}
            </button>
        </form>

        <p class="text-sm text-ink/60 mt-8 text-center">
            Pas encore de compte ?
            <RouterLink to="/register" class="text-indigo font-medium hover:underline">Créer un compte</RouterLink>
        </p>
    </AuthLayout>
</template>