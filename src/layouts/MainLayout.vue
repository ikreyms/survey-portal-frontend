<template>
  <q-layout view="hhh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="isDrawerOpen = !isDrawerOpen" />

        <q-toolbar-title>
          <div class="text-h6 font-sm">
            {{ appName }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="isDrawerOpen" side="left" bordered>
      <q-list class="q-mt-sm">
        <nav-drawer-item to="staff/dashboard" icon-name="dashboard" label="Dashboard" />
        <nav-drawer-item to="plates" icon-name="tag" label="Plates" />
        <nav-drawer-item to="staff/plate-requests" icon-name="book" label="Plate Requests" />
        <nav-drawer-item to="staff/csr-submissions" icon-name="menu_book" label="CSR Submissions" />
        <nav-drawer-item to="staff/lrs-submissions" icon-name="menu_book" label="LRS Submissions" />
        <nav-drawer-item to="insights" icon-name="analytics" label="Insight Reports" />
      </q-list>
      <q-list class="q-mt-sm">
        <nav-drawer-item to="surveyor/dashboard" icon-name="dashboard" label="Dashboard" />
        <nav-drawer-item to="surveyor/plate-requests" icon-name="book" label="Plate Requests" />
        <nav-drawer-item to="surveyor/csr-submissions" icon-name="menu_book" label="CSR Submissions" />
        <nav-drawer-item to="surveyor/lrs-submissions" icon-name="menu_book" label="LRS Submissions" />
      </q-list>
      <q-list class="q-mt-sm">
        <nav-drawer-item to="admin/dashboard" icon-name="dashboard" label="Dashboard" />
        <nav-drawer-item to="roles" icon-name="shield" label="Roles" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-h6">{{ appName }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import NavDrawerItem from 'src/components/NavDrawerItem.vue';
import { ref } from 'vue';

const isDrawerOpen = ref(false);
const appName = import.meta.env.VITE_APP_NAME
</script>
