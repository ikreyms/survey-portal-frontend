<template>
  <q-card class="q-pa-md bg-white" style="min-width: 400px; max-width: 500px;">
    <q-card-section class="column items-center">
      <div class="text-h5 text-center q-mb-md">Logo</div>
      <form>
        <q-btn outline no-caps size="md" text-color="grey-9">
          <div class="row items-center q-gutter-md">
            <q-img
              src="../assets/google-icon.svg" alt="google-logo"
              style="width: 18px; height: 18px;" fit="contain"
            />
            <span>Login with Google</span>
          </div>
        </q-btn>
      </form>
    </q-card-section>
  </q-card>
</template>
