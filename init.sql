CREATE TABLE IF NOT EXISTS Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    vetMatricula VARCHAR(255)
);

INSERT INTO Usuarios (nombre, apellido, email, password, role, vetMatricula) VALUES
('Ismael', 'Beseler', 'admin@example.com', '123456', 'veterinario', '21096933022');
