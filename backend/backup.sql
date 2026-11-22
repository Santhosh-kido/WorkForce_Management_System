--
-- PostgreSQL database dump
--

\restrict mLAncExhCGHwDojii5BPIskzGDlLw6brFj6LoYzWO7aMGX6OAXxpI07SoYssjua

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: employee; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.employee (
    emp_id integer NOT NULL,
    emp_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    department character varying(255),
    salary double precision,
    joining_date date
);


--
-- Name: employee_details_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.employee_details_emp_id_seq
    START WITH 1001
    INCREMENT BY 1
    MINVALUE 1001
    NO MAXVALUE
    CACHE 1;


--
-- Name: employee_details_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.employee_details_emp_id_seq OWNED BY public.employee.emp_id;


--
-- Name: employee_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.employee_emp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: employee_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.employee_emp_id_seq OWNED BY public.employee.emp_id;


--
-- Name: employee emp_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee ALTER COLUMN emp_id SET DEFAULT nextval('public.employee_details_emp_id_seq'::regclass);


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.employee (emp_id, emp_name, email, department, salary, joining_date) FROM stdin;
2	Priya Sharma	priya.sharma@example.com	HR	48000	2022-07-01
3	Karthik Raj	karthik.raj@example.com	Finance	55000	2021-11-20
4	Divya Lakshmi	divya.lakshmi@example.com	Engineering	72000	2020-03-10
5	Mohammed Rafi	mohammed.rafi@example.com	Sales	45000	2023-06-05
6	Sneha Reddy	sneha.reddy@example.com	Marketing	50000	2022-02-14
8	Anitha Selvam	anitha.selvam@example.com	Support	38000	2024-01-08
9	Rahul Verma	rahul.verma@example.com	Finance	60000	2021-05-30
10	Meena Krishnan	meena.krishnan@example.com	HR	52000	2020-12-01
1001	Suresh Babu	suresh.babu@example.com	Engineering	68000	2023-03-12
1002	Lakshmi Narayan	lakshmi.narayan@example.com	HR	47000	2022-08-22
1003	Harish Kumar	harish.kumar@example.com	Finance	58000	2021-01-18
1004	Nandhini Devi	nandhini.devi@example.com	Marketing	51000	2023-03-27
1005	Pradeep Raj	pradeep.raj@example.com	Sales	43000	2024-02-05
1007	Gokul Krishnan	gokul.krishnan@example.com	Support	36000	2024-07-01
1008	Swathi Menon	swathi.menon@example.com	Finance	62000	2019-11-09
1009	Naveen Prasad	naveen.prasad@example.com	Engineering	85000	2018-04-30
1010	Keerthana Raj	keerthana.raj@example.com	HR	49000	2022-12-14
1011	Manoj Selvan	manoj.selvan@example.com	Sales	46000	2021-09-20
1012	Deepika Rao	deepika.rao@example.com	Marketing	54000	2020-10-03
1013	Ashwin Kumar	ashwin.kumar@example.com	Engineering	71000	2023-05-19
1014	Bhavana Shetty	bhavana.shetty@example.com	Support	39000	2025-01-13
1015	Sathish Murugan	sathish.murugan@example.com	Finance	57000	2022-03-08
1016	Pooja Agarwal	pooja.agarwal@example.com	HR	50000	2021-06-25
1017	Vijay Anand	vijay.anand@example.com	Engineering	90000	2017-08-11
1018	Janani Subramani	janani.subramani@example.com	Marketing	53000	2024-03-21
1019	Imran Khan	imran.khan@example.com	Sales	44000	2023-10-02
1020	Tamilselvi Arjun	tamilselvi.arjun@example.com	Support	41000	2025-02-17
1022	santhosh	santhosh@gmail.com	HR	50000	2026-11-17
1006	Revathi Iyer	revathi.iyer@example.com	Sales	76000	2020-06-15
1025	Siva	siva123@example.com	Engineering	100000	2026-11-17
1026	vijay	vijay@example.com	HR	200000	2026-11-17
\.


--
-- Name: employee_details_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.employee_details_emp_id_seq', 1026, true);


--
-- Name: employee_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.employee_emp_id_seq', 10, true);


--
-- Name: employee employee_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_email_key UNIQUE (email);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (emp_id);


--
-- PostgreSQL database dump complete
--

\unrestrict mLAncExhCGHwDojii5BPIskzGDlLw6brFj6LoYzWO7aMGX6OAXxpI07SoYssjua

