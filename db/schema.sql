SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ulid; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ulid WITH SCHEMA public;


--
-- Name: EXTENSION ulid; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION ulid IS 'ulid type and methods';


--
-- Name: ship_component_class; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ship_component_class AS ENUM (
    'CIVILIAN',
    'COMPETITION',
    'INDUSTRIAL',
    'MILITARY',
    'STEALTH'
);


--
-- Name: ship_component_grade; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ship_component_grade AS ENUM (
    'A',
    'B',
    'C',
    'D'
);


--
-- Name: ship_component_size; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ship_component_size AS ENUM (
    'S0',
    'S1',
    'S2',
    'S3',
    'S4'
);


--
-- Name: ship_component_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ship_component_type AS ENUM (
    'COOLER',
    'POWER_PLANT',
    'QUANTUM_DRIVE',
    'SHIELD'
);


--
-- Name: user_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_role AS ENUM (
    'ADMIN',
    'USER'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.schema_migrations IS '@omit create,read,update,delete,all,many';


--
-- Name: ship_components; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ship_components (
    id public.ulid DEFAULT public.gen_ulid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    type public.ship_component_type NOT NULL,
    size public.ship_component_size NOT NULL,
    class public.ship_component_class NOT NULL,
    grade public.ship_component_grade NOT NULL
);


--
-- Name: TABLE ship_components; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.ship_components IS '@omit create,update,delete';


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id public.ulid DEFAULT public.gen_ulid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public.user_role DEFAULT 'USER'::public.user_role NOT NULL
);


--
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.users IS '@omit create,update,delete';


--
-- Name: COLUMN users.password; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.users.password IS '@omit create,read,update,delete,all,many';


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: ship_components ship_components_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ship_components
    ADD CONSTRAINT ship_components_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_ship_components_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_ship_components_name ON public.ship_components USING btree (name);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (email);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20250519181127'),
    ('20250519181137'),
    ('20250519181147');
