


export default {
    props: {
        buyer: Object,
        items: Array,
        car: Object,
        invoice: Object,
        edit:Boolean
    },
    
    data() {
      return {
       
        //notes: "Płatność przelewem na konto: 00 0000 0000 0000 0000 0000 0000",
      };
    },
    methods: {
        async print() {
            console.log(this.$refs.printableContent)
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
      <body>${printContent.innerHTML}</body>
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
    },
    mounted(){
        this.$emit('mounted')
    }
  };