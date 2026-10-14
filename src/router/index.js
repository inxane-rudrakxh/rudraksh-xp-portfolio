import { createRouter, createWebHistory } from 'vue-router'
import Loader from '../views/Loader.vue'
import Office from '../views/Office.vue'

const siteName = 'Rudraksh Kottalwar | Full-Stack Developer'
const description = 'Computer Science student and full-stack developer building modern web applications, Android apps, and AI-powered products.'
const siteUrl = 'https://rudrakshkottalwar.is-a.dev/'

const metaTags = (pageTitle, canonical) => [
  { rel: 'canonical', href: canonical },
  { name: 'title', content: pageTitle },
  { name: 'description', content: description },
  { name: 'keywords', content: 'Rudraksh Kottalwar, full-stack developer, web development, Android, AI, portfolio' },
  { name: 'author', content: 'Rudraksh Kottalwar' },
  { name: 'robots', content: 'index, follow' },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: pageTitle },
  { property: 'og:description', content: description },
  { property: 'og:url', content: canonical },
  { property: 'og:image', content: `${siteUrl}images/bmkou79jbtm2gocccyl1noizdou.png` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: pageTitle },
  { name: 'twitter:description', content: description }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Loader, meta: { title: siteName, metaTags: metaTags(siteName, siteUrl) } },
    { path: '/office', name: 'office', component: Office, meta: { title: `Desktop | ${siteName}`, metaTags: metaTags(`Desktop | ${siteName}`, `${siteUrl}office`) } }
  ]
})
