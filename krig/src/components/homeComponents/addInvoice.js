import Fv from './fv.vue'
import moment from 'moment'
export default {
    components: {
        Fv
    },
    props: {
        customers: Array,
        selectedInvoice: Object,
        
    },
    watch: {
        selectedInvoice(){
            if(this.selectedInvoice){
                this.loadData()
                console.log(this.selectedInvoice)
            }else{
                this.e1 = 1
                this.buyer = {
                    name: null,
                    surname: null,
                    nick: null,
                    adress: null,
                },
                this.car = {
                    id: null,
                    car: null,
                    model: null,
                    year: null,
                    vin: null,
                },
                this.items = []
                window.electronAPI.getMaxInvoiceId().then((maxId) => {
                    if (!maxId) maxId = 1
                    console.log(maxId)
                    this.invoice.number = `${parseInt(maxId) + 1}/${moment().format('MM/YYYY')}`
                })
                
            }
          
        }
    },
    data: () => {
        return {
            e1: 1,
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
            productObj: {
                id: null,
                name: null,
                qty: null,
                price: null,

            },
            date: null,
            invoice: {
                number: null,
                issueDate: moment().format('DD-MM-YYYY'),
            },
            search: null,
            cars: [],
            openSelectCarDialog: false,
        
            items: [],
            addProcuctDialog: false,
            
            
        }
    },
    async mounted() {
        let maxId = await window.electronAPI.getMaxInvoiceId()
        if (!maxId) maxId = 1
        if(this.selectedInvoice){
            this.loadData()
        }else{
            this.buyer = {
                name: null,
                surname: null,
                nick: null,
                adress: null,
            },
            this.car = {
                id: null,
                car: null,
                model: null,
                year: null,
                vin: null,
            },
            this.items = []
            this.invoice.number = `${parseInt(maxId) + 1}/${moment().format('MM/YYYY')}`
        }
        
    },
    methods: {
        async getMaxId() {

        },
        loadData(){
            if(this.selectedInvoice) {
                this.buyer = JSON.parse(this.selectedInvoice.buyer)
                this.car = JSON.parse(this.selectedInvoice.car)
                this.invoice.number = this.selectedInvoice.number
                this.invoice.issueDate = moment().format('DD-MM-YYYY')
                this.items = JSON.parse(this.selectedInvoice.products)
                this.e1 = 1
            }
        },
        async print() {
            const printContent = this.$refs.printableContent;

            // Tworzymy iframe
            const iframe = document.createElement("iframe");
            iframe.style.position = "absolute";
            iframe.style.top = "-9999px";
            document.body.appendChild(iframe);

            // Wstawiamy zawartość do iframe
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(`
    <html>
      <head>
        <title>Drukowanie</title>
        <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
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
.upperSection {
    display: flex;
    justify-content: space-between;
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
      </head>
      <body>${printContent.$refs.printableContent.innerHTML}</body>
    </html>
  `);
            doc.close();

            // Wywołujemy drukowanie
            iframe.contentWindow.print();

            // Usuwamy iframe po drukowaniu
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        },
        removeEl(item) {
            this.items = this.items.filter(el => el.id !== item.id)
        },
        async saveAndPrint() {
            let maxId = await window.electronAPI.getMaxInvoiceId()
            if (!maxId) maxId = 1
            if(!this.invoice.number) this.invoice.number = `${parseInt(maxId) + 1}/${moment().format('MM/YYYY')}`
            else this.invoice.number = `${this.invoice.number}`
            let invoiceObj = {
                number: this.invoice.number ? `${this.invoice.number}` :`${maxId}/${moment().format('MM/YYYY')}`,
                buyer: JSON.stringify(this.buyer),
                car: JSON.stringify(this.car),
                products: JSON.stringify(this.items),
                creation_date: moment().unix()
            }
            console.log(invoiceObj)
            if(!this.selectedInvoice )await window.electronAPI.addInvoice(invoiceObj);
            else await window.electronAPI.updateInvoice({...invoiceObj, id: this.selectedInvoice.id});
            this.print()
            this.e1= 1,
            this.buyer= {
                name: null,
                surname: null,
                nick: null,
                adress: null,
            },
            this.car= {
                id: null,
                car: null,
                model: null,
                year: null,
                vin: null,
            },
            this.productObj= {
                id: null,
                name: null,
                qty: null,
                price: null,

            },
            this.date= null,
            this.invoice= {
                number: "",
                issueDate: moment().format('DD-MM-YYYY'),
            }
            this.$emit('close')

        },
        addProduct() {
            let id = Math.random()
            this.items.push(
                { ...this.productObj, id }
            )
            this.productObj = {
                id: null,
                name: null,
                qty: null,
                price: null,

            }
            document.getElementById('productName').focus()
        },
        async deleteCar(car) {
            console.log('delete car')
            await window.electronAPI.deleteCar(car);
            this.cars = this.cars.filter(el => el.id !== car.id)

        },
        selectCar(car) {
            this.car = {
                id: car.id,
                car: car.car,
                model: car.model,
                year: car.year,
                vin: car.vin,
            }


            this.openSelectCarDialog = false
        },
        openAddClientdialog() {
            console.log('add client')
            this.$emit('addClient')
        },
        async loadClient(obj) {
            this.buyer = {
                id: obj.id,
                name: obj.name,
                surname: obj.surname,
                nick: obj.nick,
                adress: obj.adress
            }

            this.cars = await window.electronAPI.getCars(obj);
            if (this.cars.length > 0) {
                this.car = {
                    id: this.cars[0].id,
                    car: this.cars[0].car,
                    model: this.cars[0].model,
                    year: this.cars[0].year,
                    vin: this.cars[0].vin,
                }
            } else {
                this.car = {
                    id: null,
                    car: null,
                    model: null,
                    year: null,
                    vin: null,
                }
            }


            console.log(this.cars)
        }
    },
    computed: {
        filteredClients() {
            console.log(this.search, this.customers)
            if (this.search) {
                return this.customers.filter(el => el.nick.includes(this.search))
            } else return this.customers
        },
        checkProduct() {
            console.log(this.productObj.name && this.productObj.qty && this.productObj.price)
            return !!(this.productObj.name && this.productObj.qty && this.productObj.price)
        }

    }
}