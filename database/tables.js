class Tables{
    init(conection){
        this.conection = conection
        this.createPetCare()
    }

    createPetCare(){
        const sqlCreateTable = 
            `CREATE TABLE IF NOT EXISTS Petcare
                (
                id int NOT NULL AUTO_INCREMENT,
                customer varchar(50) NOT NULL,
                pet varchar(20) NOT NULL,
                service varchar(20) NOT NULL,
                consult_status varchar(20) NOT NULL,
                observations text,
                consult_date datetime NOT NULL,
                date_created datetime DEFAULT NOW(), 
                PRIMARY KEY(id)
                )`

        this.conection.query(sqlCreateTable, err => {
            if (err) {
                err ? 
                    console.log('Tabelas ja criadas') :
                    console.log(err)
            } else {
                console.log('Table petcare created successfully!')
            }
        })
    }
}


module.exports = new Tables