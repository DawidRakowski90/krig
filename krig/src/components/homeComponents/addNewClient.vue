<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Klient
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Samochód
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card>
          <v-card-text>
            <v-text-field label="Imię" v-model="name" clearable></v-text-field>
            <v-text-field label="Nazwisko" v-model="surname" clearable></v-text-field>
            <v-text-field label="Pseudonim *" v-model="nick" clearable></v-text-field>
            <v-text-field label="Adres" v-model="adress" clearable></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-space-between">
            <v-btn @click="cancel()" class="error">Anuluj</v-btn>
            Pola z * są wymagane
            <v-btn :disabled="!nick" @click="e1 = 2" class="success">Kontynuuj</v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card>
          <v-card-text>
            <v-text-field label="Marka *" v-model="car" clearable></v-text-field>
            <v-text-field label="Model *" v-model="model" clearable></v-text-field>
            <v-text-field label="Rok produkcji *" v-model="year" clearable></v-text-field>
            <v-text-field label="VIN (Opcjonalnie)" v-model="vin" clearable></v-text-field>

            <v-textarea label="Uwagi" v-model="comment" clearable outlined></v-textarea>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-space-between">
            <v-btn @click="e1 = 1" class="error">Wstecz</v-btn>
            Pola z * są wymagane
            <v-btn :disabled="!car || !model || !year" @click="save()" class="success">Zapisz</v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script src="./addNewClient.js" />