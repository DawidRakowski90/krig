import AddNewClient from "./addNewClient.vue"
import ManageCars from "./manageCars.vue"
export default {
    props: {
        customers: Array,
        cars: Array
    },
    components: {
        AddNewClient,
        ManageCars
    },
    data: () => {
        return {
            editCarsDialog: false,
            selectedClient: null,
            search: null,
            
            headers: [
                {
                    text: "Imie", value: 'name'
                },
                {
                    text: "Nazwisko", value: "surname"
                },
                {
                    text: "Pseudonim", value: "nick"
                },
                {
                    text: "Adres", value: "adress"
                },
                {
                    text: 'Akcje', value: 'actions', align:'end' 
                }
            ]
            
        }
    },
    methods:{
        async deleteCustomer(customer){
            await window.electronAPI.deleteCustomer(customer);
            console.log('usunalem')
            this.$emit('customerDeleted')
        }
    }
}