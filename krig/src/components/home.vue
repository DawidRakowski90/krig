<template>
  <div>
    <v-app-bar dense flat class="">
      <v-toolbar-title> KRIG POLSKA </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">mdi-menu</v-icon>
        </template>
        <v-list style="width: 300px">
          <v-list-item class="menuItem">
            <v-list-item-title @click="manageCustomersDialog = true"
              >Klienci</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-card>
      <v-card-text>
        <v-data-table
          dense
          :headers="headers"
          no-data-text="Tu jeszcze nic nie ma, wez sie do roboty"
          :items="invoices"
          :search="search"
        >
          <template v-slot:top>
            <div
              class="d-flex align-center justify-space-between"
              style="width: 100%"
            >
              <v-text-field
                v-model="search"
                label="Szukaj faktur"
                class="mx-4"
                dense
                clearable
              ></v-text-field>
              <v-btn class="success" @click="addInvoiceDialog = true, selectedInvoice = null">
                Wystaw fakturę
              </v-btn>
            </div>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small icon @click="openInvoice(item)" v-bind="attrs" v-on="on" class="primary--text">
              <v-icon> mdi-eye </v-icon>
            </v-btn>
              </template>
              <span>Podgląd</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small icon @click="editInvoice(item)" v-bind="attrs" v-on="on" class="primary--text">
              <v-icon color="success"> mdi-pencil </v-icon>
            </v-btn>
              </template>
              <span>Edytuj</span>
            </v-tooltip>
          </template>
          
          <template #[`item.creation_date`]="{ item }">
            {{ moment(item.creation_date * 1000).format("DD/MM/YYYY") }}
          </template>
          <template #[`item.buyer`]="{ item }">
            {{ resolveJSON(item.buyer).name }}
            {{ resolveJSON(item.buyer).surname }},
            {{ resolveJSON(item.buyer).adress }}
          </template>
          <template #[`item.car`]="{ item }">
            {{ resolveJSON(item.car).car }} {{ resolveJSON(item.car).model }},
            {{ resolveJSON(item.car).year }}
          </template>
          <template #[`item.price`]="{ item }">
            {{ getFullPrice(item.products) }} zł
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="addInvoiceDialog" width="80%" class="pa-0 mx-0">
      <AddInvoice
        @addClient="addClientDialog = true"
        @deleteCar="deleteCar"
        @close="(addInvoiceDialog = false), fetchInvoices()"
        :customers="customers"
        :selectedInvoice="selectedInvoice"
      />
    </v-dialog>
    <v-dialog v-model="addClientDialog" width="50%" class="pa-0 mx-0">
      <AddClient @close="addClientDialog = false" @save="addCustomer" />
    </v-dialog>
    <v-dialog v-model="manageCustomersDialog" fullscreen persistent>
      <MnageCustomers
        @customerDeleted="fetchCustomers()"
        @close="manageCustomersDialog = false"
        @addClient="addClientDialog = true"
        :customers="customers"
        :cars="cars"
      />
    </v-dialog>
    <v-dialog v-model="showSelectedInvoice" width="60%">
        <v-card class="mb-12 " color="">
            <div class="">
                <Fv ref="printableContent" :buyer="buyer" :car="car" :items="items" :invoice="invoice" @mounted="fvRendered = true" :edit="true"/>
            </div>
          </v-card>
    </v-dialog>
  </div>
</template>
<script src="./home.js" />
<style scoped>
.menuItem {
  color: teal;
  cursor: pointer;
}
</style>