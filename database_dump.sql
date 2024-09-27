--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Clubs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Clubs" (
    id integer NOT NULL,
    "timestamp" character varying(255),
    email_address character varying(255),
    club_exists character varying(255),
    club_name character varying(255) NOT NULL,
    leaders character varying(255),
    advisor_name character varying(255),
    advisor_email character varying(255),
    type character varying(255) NOT NULL,
    goals text,
    actions text,
    committed_students text,
    meeting_info text,
    other_info text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Clubs" OWNER TO postgres;

--
-- Name: Clubs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Clubs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Clubs_id_seq" OWNER TO postgres;

--
-- Name: Clubs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Clubs_id_seq" OWNED BY public."Clubs".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Clubs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clubs" ALTER COLUMN id SET DEFAULT nextval('public."Clubs_id_seq"'::regclass);


--
-- Data for Name: Clubs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Clubs" (id, "timestamp", email_address, club_exists, club_name, leaders, advisor_name, advisor_email, type, goals, actions, committed_students, meeting_info, other_info, "createdAt", "updatedAt") FROM stdin;
1	Chess Club	Student Interestsdf	\N	Chess Club	asdfsdf	asdfasdf	asdfasdf	Student Interest	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	asdfasdf	asdfasdf	\N	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2024-09-24 22:36:39.525-04	2024-09-24 22:36:39.525-04
2	Visual Arts Club	Student Interest	\N	Visual Arts Club	adsf	asdfasdf	asdfasdf	Student Interest	asdfasdf	asdfasdf	asdfasdf	\N	asdfasdf	2024-09-24 22:36:39.525-04	2024-09-24 22:36:39.525-04
3	AASA	Affinity Group	\N	AASA	sdfsdf	asdfasdf	asdfasdf	Affinity Group	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	asdfasdf	asdfasdf	\N	asdfasdf	2024-09-24 22:36:39.525-04	2024-09-24 22:36:39.525-04
4	Penguin 	Student Service	\N	Penguin 	sdfsfdfds	asfdasdf	asdfasdf	Student Service	asdfasdfasdfasd fasdfasdfasdfasdfasd fasdfasdfasdfasdfasdfasdfasdfasdfa sdfasdfasdfasdfasdfasdfasdfasdfasdfasdf asdfasdfasdf asdfasdfasdfa sdfasdfasdfasdfas dfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf	asdfasdf	asdfasdf	\N	asdfasdf	2024-09-24 22:36:39.534-04	2024-09-24 22:36:39.534-04
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20240925014202-create-clubs-table.js
\.


--
-- Name: Clubs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Clubs_id_seq"', 4, true);


--
-- Name: Clubs Clubs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clubs"
    ADD CONSTRAINT "Clubs_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- PostgreSQL database dump complete
--

