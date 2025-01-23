import moment from "moment";

export default {
    props: {
        client: Object
    },
    data: () => {
        return {
            carObj: {
                car: null,
                model: null,
                year: null,
                vin: null,
                comment: null
            },
            addNewCarDialog: false,
            cars: [],
            loading: false,
            headers: [
                { text: "Marka", value: 'car' },
                { text: "Model", value: 'model' },
                { text: "Rok prod", value: 'year' },
                { text: "VIN", value: 'vin' },
                { text: "Komentarz", value: 'comment' },
                { text: "Akcje", value: 'actions' },
            ]
        }
    },
    watch: {
        async client() {
            console.log('client change', this.client)

            this.cars = await window.electronAPI.getCars(this.client);
            
            
        }
    },
    async mounted(){
        this.cars = await window.electronAPI.getCars(this.client);
    },  
    methods: {
        async removeCar(car) {
            console.log(car)
            console.log('delete car')
            await window.electronAPI.deleteCar(car);
            this.cars = this.cars.filter(el => el.id !== car.id)
        },
        async save() {
            console.log('save')
            let dbObj = { ...this.carObj, creation_date: moment().unix(), parent_id: this.client.id }
            await window.electronAPI.addCar(dbObj);
            this.cars = await window.electronAPI.getCars(this.client);
            this.carObj = {
                car: null,
                model: null,
                year: null,
                vin: null,
                comment: null
            }

        }
    }

}