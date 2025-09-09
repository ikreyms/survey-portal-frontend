<template>
  <q-layout view="hhh lpR lff">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" />

        <q-toolbar-title>
          <div class="text-h6 font-sm">
            {{ appName }}
          </div>
        </q-toolbar-title>


        <!-- <q-btn-dropdown flat icon="person" label="Username" no-caps split align="evenly">
          <div class="q-py-sm">
            <q-list>
              <nav-dropdown-item icon-name="manage_accounts" label="Account Settings" />
              <nav-dropdown-item icon-name="logout" icon-color="negative" label="Logout" label-class="text-negative" />
            </q-list>
          </div>
        </q-btn-dropdown> -->
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="isDrawerOpen" side="left" bordered>
      <q-list class="q-mt-sm">
        <nav-drawer-item to="/staff/dashboard" icon-name="dashboard" label="Dashboard" />
        <nav-drawer-item to="/plates" icon-name="tag" label="Plates" />
        <nav-drawer-item to="/islands" icon-name="grain" label="Islands" />
        <nav-drawer-item to="/staff/plate-requests" icon-name="article" label="Plate Requests" />
        <nav-drawer-item to="/staff/csr-submissions" icon-name="menu_book" label="CSR Submissions" />
        <nav-drawer-item to="/staff/lrs-submissions" icon-name="menu_book" label="LRS Submissions" />
        <nav-drawer-item to="/analytics" icon-name="analytics" label="Analytics" />
        <nav-drawer-item to="/users" icon-name="group" label="Users" />
      </q-list>
      <q-list class="q-mt-sm">
        <nav-drawer-item to="/surveyor/dashboard" icon-name="dashboard" label="Dashboard" />
        <nav-drawer-item to="/surveyor/plate-requests" icon-name="article" label="Plate Requests" />
        <nav-drawer-item to="/surveyor/csr-submissions" icon-name="menu_book" label="CSR Submissions" />
        <nav-drawer-item to="/surveyor/lrs-submissions" icon-name="menu_book" label="LRS Submissions" />
      </q-list>
      <q-list class="q-mt-sm">
        <!-- <nav-drawer-item to="admin/dashboard" icon-name="dashboard" label="Dashboard" /> -->
        <nav-drawer-item to="/roles" icon-name="shield" label="Roles" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import NavDrawerItem from 'src/components/NavDrawerItem.vue';
// import NavDropdownItem from 'src/components/NavDropdownItem.vue';
import { ref } from 'vue';

const isDrawerOpen = ref(true);

const toggleDrawer = () => isDrawerOpen.value = !isDrawerOpen.value
const appName = import.meta.env.VITE_APP_NAME
</script>
