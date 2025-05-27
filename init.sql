CREATE TABLE IF NOT EXISTS "Usuarios" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    "vetMatricula" VARCHAR(255),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO "Usuarios" (nombre, apellido, email, password, role, "vetMatricula", "createdAt", "updatedAt") VALUES
('Ismael', 'Beseler', 'admin@example.com', '$2b$10$yjwI5kVykurqH7ttqTz3aON//5Yib53Vug4n6njsP0V1AMwQOzaJ6', 'veterinario', '21096933022', NOW(), NOW());
