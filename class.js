const {Pool} = require('pg');
const argon2 = require('argon2');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'healthcare',
    password: 'postgres',
    port: 5432,
    max: 50,
});

class Patient {
	constructor(id, name, DOB, address, ethnicity, bloodType, conditions, medication) {
        this.id = id;
		this.name = name;
        this.DOB = DOB;
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

    async updateAddress(address) {
        const client = await pool.connect();
        try {
            try {
                let res = await client.query('UPDATE patients SET address = $1 WHERE id = $2', [address, this.id])
                console.table(res.rows)
                // return res.rows
            } finally {
                client.release();
            }
        } catch (err) {
            console.log('Something unknown went wrong');
            console.log(err.stack);
        }
    }

    async updateConditions(conditions) {
        const client = await pool.connect();
        try {
            try {
                let res = await client.query('UPDATE patients SET conditions = $1 WHERE id = $2', [conditions, this.id])
                console.table(res.rows)
                // return res.rows
            } finally {
                client.release();
            }
        } catch (err) {
            console.log('Something unknown went wrong');
            console.log(err.stack);
        }
    }

    async updateMedication(medication) {
        const client = await pool.connect();
        try {
            try {
                let res = await client.query('UPDATE patients SET conditions = $1 WHERE id = $2', [medication, this.id])
                console.table(res.rows)
                // return res.rows
            } finally {
                client.release();
            }
        } catch (err) {
            console.log('Something unknown went wrong');
            console.log(err.stack);
        }
    }
}

async function createPatient(name, DOB, address, ethnicity, bloodType, conditions, medication) {
    const client = await pool.connect();
    try {
        try {
            await client.query(`INSERT INTO patients (id, name, DOB, address, ethnicity, bloodType, conditions, medication) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`, [name, DOB, address, ethnicity, bloodType, conditions, medication]); // Create record for user with relevant data
        } finally {
            client.release();
        }
    } catch (err) {
        console.log('Something unknown went wrong with the createPatient function');
        console.log(err.stack);
        return 'Something unknown went wrong with the createPatient function';
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
                let res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
                let name = res.rows[0].name;
                let DOB = res.rows[0].DOB;
                let address = res.rows[0].address;
                let ethnicity = res.rows[0].ethnicity;
                let bloodType = res.rows[0].bloodType;
                let conditions = res.rows[0].conditions;
                let medication = res.rows[0].medication;
                res = await client.query('SELECT value FROM value WHERE valueid = $1', [id]);
                let value = res.rows[0].value;
                let user = new User(id, username, password, balance, value, stock, days);
                return user;
            } finally {
                client.release();
            }
        } catch (err) {
            if (err.name == 'TypeError' & err.message == `Cannot read properties of undefined (reading 'username')`) {
                console.log('Invalid id');
                return false;
            } else {
                console.log('Something unknown went wrong with the userbyid function');
                console.log(err.stack);
            }
        }
    } else {
        console.log('Invalid data type for id');
        return false;
    }
}

async function run () {
    const client = await pool.connect();
    try {
        try {
            // let user = await login('tester', 'test1');
            // console.log(user);
        } finally {
            client.release();
        }
    } catch (err) {
        console.log(err.stack)
    }
}


// run()

module.exports = {}
