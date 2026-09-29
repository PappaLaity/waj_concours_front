<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import axiosClient from '../axios.js'
import useUserStore from '../store/user.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const loadingUser = ref(false)

// Partagé par toutes les pages du dashboard
const navItems = [
    { to: '/dashboard', label: 'Tableau de bord', icon: 'grid' },
    // { to: '/dashboard/exercices', label: 'Exercices', icon: 'list' },
    // { to: '/dashboard/progression', label: 'Progression', icon: 'bars' },
    // { to: '/dashboard/abonnement', label: 'Abonnement', icon: 'card' },
]


const userName = computed(() => userStore.user?.name || 'Utilisateur')
const userInitials = computed(() => {
    // return 'U'
    if (!userStore.user?.name) return 'U'
    return userStore.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
})

// Gérer la déconnexion
const handleLogout = async () => {
    try {
        axiosClient.post('/logout').then(() => {
            // console.log('Logout successful')
            router.push({ name: 'Login' })
        });
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
    } finally {
        // Nettoyer l'état côté frontend même si la requête échoue
        // authStore.logout()

        // Rediriger vers la page de login
        // router.push({name: 'Login'})
        // router.push('/')
    }
}

</script>

<template>
    <div class="min-h-screen md:grid md:grid-cols-[240px_1fr] bg-paper text-ink font-sans antialiased">

        <!-- Sidebar, partagée par toutes les pages du dashboard -->
        <aside class="bg-ink text-paper p-6 flex md:flex-col justify-between md:min-h-screen">
            <div>
                <RouterLink to="/" class="font-serif text-xl block mb-10">Épreuve<span class="text-gold">.</span>
                </RouterLink>
                <nav class="hidden md:flex flex-col gap-1 text-sm">
                    <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
                        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="route.path === item.to
                            ? 'bg-white/10 text-paper font-medium'
                            : 'text-paper/60 hover:text-paper hover:bg-white/5'">
                        <svg v-if="item.icon === 'grid'" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.8">
                            <rect x="3" y="3" width="8" height="8" rx="1.5" />
                            <rect x="13" y="3" width="8" height="5" rx="1.5" />
                            <rect x="13" y="11" width="8" height="10" rx="1.5" />
                            <rect x="3" y="14" width="8" height="7" rx="1.5" />
                        </svg>
                        <svg v-else-if="item.icon === 'list'" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.8">
                            <path d="M4 6h16M4 12h16M4 18h10" stroke-linecap="round" />
                        </svg>
                        <svg v-else-if="item.icon === 'bars'" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.8">
                            <path d="M4 19V5M10 19V9M16 19v-6M22 19H2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.8">
                            <rect x="3" y="6" width="18" height="13" rx="2" />
                            <path d="M3 10h18" stroke-linecap="round" />
                        </svg>
                        {{ item.label }}
                    </RouterLink>
                </nav>
            </div>
            <div class="hidden md:flex items-center gap-3 pt-6 border-t border-white/10">
                <div
                    class="w-9 h-9 rounded-full bg-gold/20 text-gold font-medium flex items-center justify-center text-sm">
                    {{ userInitials }}
                </div>
                <div class="text-sm flex-1">
                    <p class="font-medium truncate">{{ userName }}</p>
                    <button @click="handleLogout" class="text-paper/50 text-xs hover:text-paper/80 transition-colors">
                        Déconnexion
                    </button>
                </div>
            </div>
        </aside>

        <!-- Vue Router injecte ici le composant de la route enfant active -->
        <main class="p-6 md:p-10">
            <router-view />
        </main>

    </div>
</template>