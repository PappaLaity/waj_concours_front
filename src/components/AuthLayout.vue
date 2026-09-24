<script setup>
defineProps({
    // Permet à Register.vue de garder son padding vertical un peu plus généreux
    formPanelClass: {
        type: String,
        default: 'p-8',
    },
})
</script>

<template>
    <div class="min-h-screen grid md:grid-cols-2 bg-paper text-ink font-sans antialiased">

        <!-- Panneau de marque, partagé -->
        <div class="hidden md:flex flex-col justify-between bg-ink text-paper p-12">
            <RouterLink to="/" class="font-serif text-2xl">Épreuve<span class="text-gold">.</span></RouterLink>
            <div class="max-w-sm">
                <!-- Chaque page fournit sa propre accroche via ce slot -->
                <slot name="brand"></slot>
            </div>
            <p class="text-paper/40 text-xs">© 2026 Épreuve</p>
        </div>

        <!-- Panneau de formulaire, propre à chaque page -->
        <div class="flex items-center justify-center" :class="formPanelClass">
            <div class="w-full max-w-sm">
                <RouterLink to="/" class="md:hidden font-serif text-2xl block mb-10">Épreuve<span
                        class="text-gold">.</span></RouterLink>
                <slot></slot>
            </div>
        </div>

    </div>
</template>