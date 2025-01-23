<template>
    <v-card class="d-flex align-center justify-center" style="width: 50vh; height: 50vh;">
        <v-card-text>
            Jestes pewien?
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around">
            <v-btn color="error" @click="$emit('cancel')">Anuluj</v-btn>
            <v-btn color="success" @click="$emit('confirm')">Potwierdz</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script src="./areyousure.js" />