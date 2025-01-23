<template>
  <v-card>
    <v-card-title class="d-flex align-center justify-space-between">
      <div>
        Zarządzanie samochodami
        <span style="color: teal; margin-left: 10px">{{ client.nick }}</span>
      </div>
      <v-btn class="success" @click="addNewCarDialog = true">Dodaj nowy</v-btn>
    </v-card-title>
    <v-card-subtitle> {{ client.name }} {{ client.surname }} </v-card-subtitle>
    <v-card-text>
      <v-data-table
        :items="cars"
        :headers="headers"
        no-data-text="Brak samochoów do wyświetlenia"
      >
        <template #[`item.actions`]="{ item }">
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                
                small
                icon
                @click="removeCar(item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="error"> mdi-delete </v-icon>
              </v-btn>
            </template>
            <span>Usuń</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="addNewCarDialog" width="40%">
        <v-card>
            <v-card-title>
                Dodaj nowy samochód
            </v-card-title>
          <v-card-text>
            <v-text-field label="Marka *" v-model="carObj.car" clearable></v-text-field>
            <v-text-field label="Model *" v-model="carObj.model" clearable></v-text-field>
            <v-text-field label="Rok produkcji *" v-model="carObj.year" clearable></v-text-field>
            <v-text-field label="VIN (Opcjonalnie)" v-model="carObj.vin" clearable></v-text-field>

            <v-textarea label="Uwagi" v-model="carObj.comment" clearable outlined></v-textarea>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-space-between">
            Pola z * są wymagane
            <v-btn :disabled="!carObj.car || !carObj.model || !carObj.year" @click="save()" class="success">Zapisz</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-card>
</template>
<script src="./manageCars.js"></script>