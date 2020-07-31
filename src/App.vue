<template>
  <v-app>
    <v-app-bar
            app
            elevate-on-scroll
            color="teal lighten-3"
            dark
            hide-on-scroll
            scroll-target="#scrolling-techniques-4"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Chatbot Manager</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container class="mt-15 align-self-center">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style></style>