<template >
  <div>
    <v-btn v-if="edit" style="margin-left: 5%; margin-top: 5%;" title="Drukuj" fab @click="print()"><v-icon>mdi-printer-outline</v-icon></v-btn>
    <div ref="printableContent" class="invoice">
    <div class="invoice-header">
      <h1>Rachunek</h1>
      <p>Nr: {{ invoice.number }}</p>
      <p>Data wystawienia: {{ invoice.issueDate }}</p>
    </div>
    <br>
    <br>
    <div class="upperSection">
      <div class="section">
        <h3>Dane Sprzedawcy</h3>
        <p>
          KRIG Polska<br />
          Żołędowo, ul.Koronowska 16<br />
          NIP:
        </p>
      </div>

      <div class="section" style="width: 30%">
        <h3>Dane Nabywcy</h3>
        <p>
          {{ buyer.name }} {{ buyer.surname }}<br />
          {{ buyer.adress }}<br />
        </p>
      </div>
    </div>

    <div class="section">
      <h3>Dane Pojazdu</h3>
      <p>
        {{ car.car }} {{ car.model }} {{ car.year }} VIN: {{ car.vin }}<br />
      </p>
    </div>
    <div class="section">
      <table class="table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Nazwa towaru/usługi</th>
            <th>Ilość</th>
            <th>Cena brutto</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.price }} PLN</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="summary">
      <p>
        <strong>Razem brutto:</strong>
        {{
          items
            .map((el) => el.price)
            .reduce((a, b) => parseInt(a) + parseInt(b), 0)
        }}
        PLN
      </p>
    </div>
  </div>
  </div>
</template>
  
  <script src="./fv.js">
</script>
  
  <style>
.upperSection {
    display: flex;
    justify-content: space-between;
}
.invoice {
  background: white;
  font-family: Arial, sans-serif;
  color: #000;
  margin: 20px;
  line-height: 1.6;
  padding: 10px;
}
.invoice-header {
  text-align: center;
  margin-bottom: 20px;
}
.section {
  margin-bottom: 20px;
}
.section h3 {
  margin: 0 0 10px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  border: 1px solid #000;
  padding: 10px;
  text-align: left;
}
.table th {
  background-color: #f2f2f2;
}
.summary {
  text-align: right;
  margin-top: 20px;
}
</style>
  