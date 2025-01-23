<template>
  <v-card>
    <v-card-title class="d-flex align-center justify-space-between">
      Zarządzanie klientami
      <v-btn @click="$emit('close')" class="error">Zamknij</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :search="search" :items="customers" :headers="headers">
        <template v-slot:top>
          <div
            class="d-flex align-center justify-space-between"
            style="width: 100%"
          >
            <v-text-field
              v-model="search"
              label="Szukaj klienta"
              class="mx-4"
              dense
              clearable
            ></v-text-field>
            <v-btn class="success" @click="$emit('addClient')">
              Dodaj nowego klienta
            </v-btn>
          </div>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                
                small
                icon
                @click="selectedClient=item, editCarsDialog = true"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="green"> mdi-car </v-icon>
              </v-btn>
            </template>
            <span>Samochody</span>
          </v-tooltip>

          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                
                small
                icon
                @click="openItem(item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="warning"> mdi-cog </v-icon>
              </v-btn>
            </template>
            <span>Edytuj dane</span>
          </v-tooltip> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                
                small
                icon
                @click="deleteCustomer(item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="error"> mdi-delete </v-icon>
              </v-btn>
            </template>
            <span>Usuń</span>
          </v-tooltip>
        </template>
        <template #[`item.adress`]="{ item }">
          <div class="text-truncate" style="max-width: 300px">
            {{ item.adress }}
          </div>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions> </v-card-actions>
    <v-dialog v-model="editCarsDialog" width="50%">
        <ManageCars :cars="cars" :client="selectedClient" @close="editCarsDialog = false" />
    </v-dialog>
  </v-card>
</template>
<script src="./manageCustomers.js" />