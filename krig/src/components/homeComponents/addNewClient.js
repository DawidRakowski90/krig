
import moment from 'moment'

export default {
    data: () => {
        return {
            name: null,
            surname: null,
            nick: null,
            adress: null,
            cars: [],
            e1: 1,
            car: null,
            model: null,
            year: null,
            vin: null,
            comment: null
        }
    },

    methods: {
        checkClientData() {

        },
        save() {
            this.$emit('save', [{ name: this.name, surname: this.surname, nick: this.nick, adress: this.adress, creation_date: moment().unix() },
            { car: this.car, model: this.model, year: this.year, vin: this.vin, creation_date: moment().unix(), comment: this.comment }
            ])
            this.name = null,
                this.surname = null,
                this.nick = null,
                this.adress = null
            this.$emit('close')
        },
        cancel() {
            console.log('cancel')
            this.$emit('close')
        }
    }

}