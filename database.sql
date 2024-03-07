CREATE TABLE patients (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    DOB DATE NOT NULL,
    address VARCHAR NOT NULL,
    ethnicity VARCHAR NOT NULL,
    bloodType VARCHAR NOT NULL,
    conditions text[] NOT NULL,
    medication text[] NOT NULL
);