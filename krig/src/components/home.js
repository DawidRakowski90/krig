
import AddInvoice from './homeComponents/addInvoice.vue'
import AddClient from './homeComponents/addNewClient.vue'
import MnageCustomers from './homeComponents/manageCustomers.vue';
import moment from 'moment';
import Fv from './homeComponents/fv.vue'
// import { print } from './homeComponents/print.js'
export default {
    components: {
        AddInvoice, AddClient, MnageCustomers, Fv
    },
    data() {
        return {
            name: '',
            age: '',
            search: null,
            addClientDialog: false,
            addInvoiceDialog: false,
            manageCustomersDialog: false,
            customers: [],
            cars: [],
            moment,
            invoices: [

            ],
            filteredInvoices: [],
            headers: [
                {
                    text: "Numer", value: 'number'
                },
                {
                    text: "Data", value: "creation_date"
                },
                {
                    text: "Klient", value: "buyer"
                },
                {
                    text: "Samochod", value: "car"
                },
                {
                    text: "Kwota", value: "price"
                },
                {
                    text: 'Akcje', value: 'actions'
                }

            ],
            showSelectedInvoice: false,
            invoice: {
                number: "",
                issueDate: "",
            },
            buyer: {
                name: null,
                surname: null,
                nick: null,
                adress: null,
            },
            car: {
                id: null,
                car: null,
                model: null,
                year: null,
                vin: null,
            },
            items: [],
            fvRendered: false,
            selectedInvoice: null
        };
    },
    methods: {
        editInvoice(invoice){
            this.selectedInvoice = invoice
            this.addInvoiceDialog = true
        },
        async openInvoice(invoice) {

            this.buyer = JSON.parse(invoice.buyer)
            this.car = JSON.parse(invoice.car)
            this.items = JSON.parse(invoice.products)
            this.invoice = { number: invoice.number, issueDate: moment(invoice.creation_date * 1000).format("DD-MM-YYYY") }
            this.showSelectedInvoice = true
            let n = 0
            // while (this.fvRendered !== true){
            //     n++
            // }
            console.log(n)
           
        },


        getFullPrice(data) {
            let products = JSON.parse(data)
            return products.map(el => el.price).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
        },
        resolveJSON(data) {
            return JSON.parse(data)
        },
        async deleteCar(payload) {
            await window.electronAPI.deleteCar(payload);
        },
        async addCustomer(payload) {
            let [customer, car] = payload
            console.log(JSON.stringify(customer))
            const newCustomer = await window.electronAPI.addCustomer(customer);
            console.log(newCustomer)
            const newCar = await window.electronAPI.addCar({ ...car, parent_id: newCustomer.id });
            this.customers.push(newCustomer);
            this.cars.push(newCar)
        },
        async fetchCustomers() {
            this.customers = await window.electronAPI.getCustomers();
        },
        async addUser() {
            const user = { name: this.name, age: parseInt(this.age) };
            const newUser = await window.electronAPI.addUser(user);
            this.users.push(newUser);
            this.name = '';
            this.age = '';
        },
        async fetchUsers() {

            console.log(window, window.electronAPI)
            this.users = await window.electronAPI.getUsers();
        },
        async fetchInvoices() {
            this.invoices = await window.electronAPI.getInvoices();
            console.log(this.invoices)
        }
    },
    mounted() {
        this.fetchUsers();
        this.fetchCustomers();
        this.fetchInvoices();
    },
};
