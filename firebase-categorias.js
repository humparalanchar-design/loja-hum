
// Firebase/Firestore - Integração Categorias (vitrine + admin)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getFirestore, collection, onSnapshot, setDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwrAEGSlJL_y6UgLVUAjseT4Os4fZ1Olc",
  authDomain: "minha-loja-hum.firebaseapp.com",
  projectId: "minha-loja-hum",
  storageBucket: "minha-loja-hum.firebasestorage.app",
  messagingSenderId: "66659292101",
  appId: "1:66659292101:web:e061665eff8b32d3d2f1ac",
  measurementId: "G-JFDK9CVV4E"
};

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch (e) { /* analytics opcional */ }
const db = getFirestore(app);

function safeRenderAll() {
  try { if (typeof renderStoreNavigation === 'function') renderStoreNavigation(); } catch(e){}
  try { if (typeof renderStoreCategories === 'function') renderStoreCategories(); } catch(e){}
  try { if (typeof renderAdminCategories === 'function') renderAdminCategories(); } catch(e){}
  try { if (typeof updateCategoriesSummary === 'function') updateCategoriesSummary(); } catch(e){}
  try { if (typeof saveData === 'function') saveData(); } catch(e){}
}

const colRef = collection(db, 'categorias');

onSnapshot(colRef, (snapshot) => {
  const fresh = {};
  snapshot.forEach(d => {
    const data = d.data() || {};
    fresh[d.id] = {
      id: data.id || d.id,
      name: data.name || d.id,
      description: data.description || '',
      icon: data.icon || 'fas fa-tag',
      emoji: data.emoji || ''
    };
  });
  if (typeof window.categories === 'object' && window.categories !== null) {
    Object.keys(window.categories).forEach(k => delete window.categories[k]);
    Object.assign(window.categories, fresh);
  } else {
    window.categories = fresh;
  }
  safeRenderAll();
}, (err) => console.error('Firestore categorias onSnapshot error:', err));

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('category-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      try {
        const name = document.getElementById('categoryName')?.value?.trim();
        const description = document.getElementById('categoryDescription')?.value?.trim() || '';
        const icon = document.getElementById('categoryIcon')?.value?.trim() || 'fas fa-tag';
        const emoji = document.getElementById('categoryEmoji')?.value?.trim() || '';

        const id = (window.currentEditingCategory && window.categories?.[window.currentEditingCategory])
          ? window.currentEditingCategory
          : (name || '').toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

        if (!id) return;

        await setDoc(doc(db, 'categorias', id), { id, name, description, icon, emoji });
      } catch (err) {
        console.error('Erro ao salvar categoria no Firestore:', err);
      }
    }, { capture: true });
  }

  if (typeof window.deleteCategory === 'function') {
    const __origDelete = window.deleteCategory;
    window.deleteCategory = function(categoryId) {
      try { __origDelete(categoryId); } catch(e){ console.warn(e); }
      deleteDoc(doc(db, 'categorias', categoryId)).catch(err => {
        console.error('Erro ao excluir categoria no Firestore:', err);
      });
    };
  }
});
