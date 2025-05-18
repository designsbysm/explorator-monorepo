-- migrate:up
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
      CREATE TYPE user_role AS ENUM (
        'ADMIN',
        'USER'
      );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS users (
  id ulid NOT NULL DEFAULT gen_ulid() PRIMARY KEY NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  deleted_at timestamp with time zone,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  role user_role NOT NULL DEFAULT 'USER'
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users USING btree (email);

COMMENT ON TABLE users IS E'@omit create,update,delete';
COMMENT ON COLUMN users.password IS E'@omit create,read,update,delete,all,many';

INSERT INTO users (first_name, last_name, email, password, role)
  VALUES(
    'Scott',
    'Matthews',
    'scott@designsbysm.com',
    '$2a$10$Bj.RPMx44KCwPeARVYjSxe7H7FIvQqISZb6FqadKAmTlljtgszBT6', -- password
    'ADMIN'
  ) ON CONFLICT DO NOTHING;

-- migrate:down
