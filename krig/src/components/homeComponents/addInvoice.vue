<template>
  <v-sheet>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Dane osobowe
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"> Produkty </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Podsumowanie </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row class="ma-0 pa-0" style="width: 100%">
            <v-col cols="7">
              <v-card>
                <v-divider />
                <v-card-subtitle> Dane osobowe </v-card-subtitle>
                <v-card-text class="d-flex flex-column">
                  <div style="width: 100%; gap: 10px" class="d-flex">
                    <v-text-field
                      label="Imie"
                      v-model="buyer.name"
                      clearable
                    ></v-text-field>
                    <v-text-field
                      label="Nazwisko"
                      v-model="buyer.surname"
                      clearable
                    ></v-text-field>
                  </div>

                  <div style="width: 100%; gap: 10px" class="d-flex">
                    <!-- <v-text-field
                label="Pseudonim"
                v-model="nick"
                clearable
              ></v-text-field> -->
                    <v-text-field
                      label="Address"
                      v-model="buyer.adress"
                      clearable
                    ></v-text-field>
                  </div>
                </v-card-text>
                <v-divider />
                <v-card-subtitle
                  class="d-flex align-center justify-space-between"
                  style="height: 52px"
                >
                  Dane samochodu
                  <v-btn
                    v-if="cars.length > 1"
                    class="green ma-0"
                    small
                    @click="openSelectCarDialog = true"
                    >Wybierz inny</v-btn
                  >
                </v-card-subtitle>
                <v-card-text class="d-flex flex-column">
                  <div style="width: 100%; gap: 10px" class="d-flex">
                    <v-text-field
                      label="Marka"
                      v-model="car.car"
                      clearable
                    ></v-text-field>
                    <v-text-field
                      label="Model"
                      v-model="car.model"
                      clearable
                    ></v-text-field>
                  </div>

                  <div style="width: 100%; gap: 10px" class="d-flex">
                    <v-text-field
                      label="Rok prod."
                      v-model="car.year"
                      clearable
                    ></v-text-field>
                    <v-text-field
                      label="VIN"
                      v-model="car.vin"
                      clearable
                    ></v-text-field>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="">
              <v-card>
                <v-card-title class="d-flex align-center justify-space-between">
                  <span>Klient</span>
                  <v-btn
                    small
                    class="success"
                    fab
                    @click="openAddClientdialog()"
                    ><v-icon>mdi-plus</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-subtitle>
                  Wybierz z listy lub dodaj nowego klienta
                </v-card-subtitle>
                <v-card-text>
                  <v-text-field
                    label="Szukaj"
                    prepend-inner-icon="mdi-magnify"
                    v-model="search"
                    clearable
                  />
                  <div class="" style="width: 100%">
                    <div
                      class="mb-1 d-flex align-center justify-space-between pa-2 teal client"
                      v-for="client of filteredClients"
                      :key="client.id"
                      style="width: 100%; border-radius: 20px; cursor: pointer; color:white"
                      @click="loadClient(client)"
                    >
                      <div>
                        <h2>{{ client.nick }}</h2>
                      </div>
                      <div>{{ client.name }} {{ client.surname }}</div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <div class="d-flex justify-space-between">
            <v-btn text color="error" @click="$emit('close')"> Anuluj </v-btn>
            <v-btn color="primary" @click="e1 = 2"> Przejdź dalej </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12"  height="400px">
            <div class="d-flex align-center justify-end pa-3">
                Dodaj produkt<v-btn icon class="ml-3 success" @click="addProcuctDialog=true"><v-icon>mdi-plus</v-icon></v-btn>
            </div>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Nazwa</th>
                    <th class="text-left">Ilość</th>
                    <th class="text-end">Cena brutto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td><v-btn icon class="error--text" @click="removeEl(item)"><v-icon>mdi-delete</v-icon></v-btn> {{ item.name }}</td>
                    <td>{{ item.qty }}</td>
                    <td class="text-end">{{ item.price }} zł</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td class="text-end">Razem:</td>
                    <td class="text-end"> {{ items.map(el => el.price).reduce((a,b) => parseInt(a) + parseInt(b), 0) }} zł</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>

          <div class="d-flex justify-space-between">
            <v-btn text color="error" @click="e1 = 1"> Confnij </v-btn>
            <v-btn color="primary" @click="e1 = 3"> Przejdź do podsumowania </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12 " color="">
            <div class="">
                <Fv ref="printableContent" :buyer="buyer" :car="car" :items="items" :invoice="invoice" :edit="selectedInvoice ? true : false"/>
            </div>
          </v-card>

          <div class="d-flex justify-space-between">
            <v-btn text color="error" @click="e1 = 2"> Confnij </v-btn>
            <v-btn color="primary" @click="saveAndPrint()"> Zapisz i drukuj </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-dialog v-model="openSelectCarDialog" width="30%">
      <v-card>
        <v-card-title> Wybierz auto z listy </v-card-title>
        <v-card-text>
          <div
            class="car"
            v-for="car of cars"
            :key="car.id"
            @click="selectCar(car)"
          >
            <div style="">{{ car.car }} {{ car.model }} {{ car.year }}</div>

            <div class="d-flex align-center">
              <div v-if="car.vin">vin:{{ car.vin }}</div>

              <v-tooltip bottom v-if="cars.length > 1">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    class="error--text white"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="deleteCar(car)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </template>
                <span> usuń</span>
              </v-tooltip>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addProcuctDialog" width="30%">
      <v-card>
        <v-card-title> Dodaj produkt </v-card-title>
        <v-card-text>
            <v-text-field id="productName" v-model="productObj.name" label="Nazwa"></v-text-field>
            <v-text-field v-model="productObj.qty" label="Ilość"></v-text-field>
            <v-text-field  prefix="zł" v-model="productObj.price" label="Cena" @keypress.enter="addProduct()"></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex align-center justify-space-around">
            <v-btn class="error" @click="addProcuctDialog = false">Zakończ</v-btn>
            <v-btn :disabled="!checkProduct" class="success" @click="addProduct()">Zapisz</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script src="./addInvoice.js" />
<style scoped>
.client {
  background-color: rgb(0, 166, 166);
}
.client:hover {
  background-color: rgb(0, 169, 169) !important;
}
.car {
  border-radius: 50px;
  background-color: teal;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px;
  cursor: pointer;
}

.car:hover {
  background-color: rgb(0, 161, 161) !important;
}

@media print {
  .printable {
    display: block;
  }
  body *:not(.printable) {
    display: none !important;
  }
}
</style>