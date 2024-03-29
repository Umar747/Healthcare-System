const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'healthcare',
    password: 'postgres',
    port: 5432,
    max: 50,
});

class Patient {
	constructor(id, name, dob, address, ethnicity, bloodType, conditions, medication) {
        this.id = id;
		this.name = name;
        this.dob = dob;
        this.address = address;
        this.ethnicity = ethnicity;
        this.bloodType = bloodType;
        this.conditions = conditions;
        this.medication = medication;
    }

    async select() {
        const client = await pool.connect();
        try {
            try {
                let res = await client.query('SELECT * FROM patients where id = $1', [this.id])
                console.table(res.rows)
                return res.rows
            } finally {
                client.release();
            }
        } catch (err) {
            console.log('Something unknown went wrong');
            console.log(err.stack);
        }
    }
}

// dob is in the format 'YYYY/MM/DD'
async function createPatient(name, dob, address, ethnicity, bloodType, conditions, medication) {
    const client = await pool.connect();
    try {
        try {
            await client.query(`INSERT INTO patients (id, name, dob, address, ethnicity, bloodType, conditions, medication) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`, [name, dob, address, ethnicity, bloodType, conditions, medication]); // Create record for user with relevant data
            return true;
        } finally {
            client.release();
        }
    } catch (err) {
        console.log('Something unknown went wrong with the createPatient function');
        console.log(err.stack);
        return false;
    }
}

async function deletePatient(id) {
    const client = await pool.connect();
    try {
        try {
            await client.query(`DELETE FROM patients WHERE id = $1`, [id])
        } finally {
            client.release();
        }
    } catch (err) {
        console.log('Something unknown went wrong with the deletePatient function');
        console.log(err.stack)
    }
}

async function patientbyid (id) {
    if (typeof id == 'number' && isNaN(id) == false){
        const client = await pool.connect();
        try {
            try {
                let res = await client.query('SELECT * FROM patients WHERE id = $1', [id]);
                let name = res.rows[0].name;
                let dob = res.rows[0].dob;
                let address = res.rows[0].address;
                let ethnicity = res.rows[0].ethnicity;
                let bloodType = res.rows[0].bloodtype;
                let conditions = res.rows[0].conditions;
                let medication = res.rows[0].medication;
                let patient = new Patient(id, name, dob, address, ethnicity, bloodType, conditions, medication);
                return patient;
            } finally {
                client.release();
            }
        } catch (err) {
            if (err.name == 'TypeError' & err.message == `Cannot read properties of undefined (reading 'name')`) {
                console.log('Invalid id');
                return false;
            } else {
                console.log('Something unknown went wrong with the patientbyid function');
                console.log(err.stack);
            }
        }
    } else {
        console.log('Invalid data type for id');
        return false;
    }
}

async function allpatients() {
    const client = await pool.connect();
    try {
        try {
            let res = await client.query('SELECT * FROM patients');
            return res.rows;
        } finally {
            client.release();
        }
    } catch (err) {
        if (err.name == 'TypeError' & err.message == `Cannot read properties of undefined (reading 'name')`) {
            console.log('Invalid id');
            return false;
        } else {
            console.log('Something unknown went wrong with the patientbyid function');
            console.log(err.stack);
        }
    }
}

async function run () {
    const client = await pool.connect();
    try {
        try {
        } finally {
            client.release();
        }
    } catch (err) {
        console.log(err.stack)
    }
}


// run()

module.exports = {allpatients, patientbyid, createPatient, deletePatient, Patient}
