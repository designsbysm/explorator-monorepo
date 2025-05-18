-- migrate:up
CREATE EXTENSION IF NOT EXISTS ulid;

COMMENT ON TABLE schema_migrations IS E'@omit create,read,update,delete,all,many';

-- migrate:down
