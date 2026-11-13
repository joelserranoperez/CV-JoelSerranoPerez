/* =====================================================================
   CONTENIDO DEL PORTFOLIO DE JOEL  ·  el único archivo que hay que editar
   ---------------------------------------------------------------------
   - Cualquier texto puede ser:
       "Igual en los dos idiomas"
       { es: "Texto en español", en: "Text in English" }
   - Fechas en formato "AAAA-MM". end: null  →  "Actualidad / Present".
   - Para añadir algo, copia un bloque { ... } y cámbialo. ¡Ojo con las comas!
   ===================================================================== */

window.CONTENT = {
  /* ---------- Datos personales ---------- */
  profile: {
    name: "Joel Serrano Pérez",
    firstName: "Joel",
    lastName: "Serrano Pérez",
    initials: "JS",
    location: "Rubí (Barcelona)",
    country: { es: "España", en: "Spain" },
    email: "joelserranoperez@gmail.com",
    linkedin: "https://www.linkedin.com/in/joel-serrano-perez",
    github: "https://github.com/joelserranoperez",
    photo: "assets/img/joel.jpg",
    // CV por idioma. Si uno vale null se ofrece el otro.
    cv: {
      es: "assets/cv/CV_Joel_Serrano_Perez.pdf",
      en: null,
    },
  },

  /* ---------- Portada ---------- */
  hero: {
    status: { es: "Disponible · incorporación inmediata", en: "Available · can start right away" },
    tagline: {
      es: "Desarrollador backend Java con más de 5 años construyendo microservicios con Spring Boot e integraciones REST/SOAP para el sector público y bancario.",
      en: "Java backend developer with 5+ years building Spring Boot microservices and REST/SOAP integrations for the public and banking sectors.",
    },
    years: { value: "5+", text: { es: "años en backend Java", en: "years of Java backend" } },
    // Roles que se escriben solos en la portada
    roles: [
      "Backend Developer Java",
      "Spring Boot & Microservices",
      { es: "APIs REST y SOAP", en: "REST & SOAP APIs" },
      { es: "Full stack con Angular", en: "Full stack with Angular" },
    ],
    // Cifras (solo datos reales del CV)
    stats: [
      { value: 5, suffix: "+", label: { es: "años de experiencia", en: "years of experience" } },
      { value: 40, suffix: "+", label: { es: "aplicaciones mantenidas en el Ministerio", en: "applications maintained at the Ministry" } },
      { value: 6, suffix: "", label: { es: "sistemas externos integrados en NVSIC", en: "external systems integrated in NVSIC" } },
    ],
    // Cinta de tecnologías bajo la portada (los nombres deben existir en LOGOS de main.js)
    belt: ["Java", "Spring Boot", "Angular", "TypeScript", "Oracle", "PostgreSQL", "Hibernate", "Maven", "Docker", "Azure DevOps", "Git", "JUnit", "Tomcat", "Jira", "Python"],
  },

  /* ---------- Sobre mí ---------- */
  about: {
    paragraphs: [
      {
        es: "Desarrollo backend en Java con Spring Boot: microservicios, APIs y las integraciones que hacen que sistemas distintos trabajen juntos.",
        en: "I build Java backends with Spring Boot: microservices, APIs and the integrations that make different systems work together.",
      },
      {
        es: "He trabajado para el Servei Català de Trànsit, el Ministerio para la Transición Ecológica y CaixaBank, siempre en equipos Scrum y en contacto directo con el cliente. También me muevo en frontend con Angular y en bases de datos Oracle y PostgreSQL.",
        en: "I've worked for the Catalan Traffic Service, Spain's Ministry for the Ecological Transition and CaixaBank, always in Scrum teams working directly with the client. I'm also comfortable on the frontend with Angular and with Oracle and PostgreSQL databases.",
      },
    ],
    // Mi recorrido (de lo más reciente a lo más antiguo). now: true = se marca en color
    journey: [
      { now: true, years: "2025 – 2026", title: { es: "Analista Programador Full Stack Java", en: "Full Stack Java Analyst Developer" }, text: "Global Rosetta (Getronics) · Servei Català de Trànsit" },
      { years: "2023 – 2024", title: { es: "Analista Programador", en: "Analyst Developer" }, text: { es: "ALTEN · Ministerio para la Transición Ecológica", en: "ALTEN · Ministry for the Ecological Transition" } },
      { years: "2023", title: { es: "Analista y Desarrollador .NET", en: ".NET Analyst & Developer" }, text: "Soportex (Zixom Business Management)" },
      { years: "2020 – 2023", title: { es: "Desarrollador Junior", en: "Junior Developer" }, text: "DXC Technology · CaixaBank" },
      { years: "2017 – 2020", title: { es: "Soporte IT", en: "IT support" }, text: "DXC Technology · Adecco · NewHome PC" },
    ],
  },

  /* ---------- Experiencia (la más reciente primero) ---------- */
  experience: [
    {
      role: { es: "Analista Programador Full Stack Java", en: "Full Stack Java Analyst Developer" },
      company: "Global Rosetta (Getronics)",
      client: "Servei Català de Trànsit",
      start: "2025-04",
      end: "2026-08",
      points: [
        { es: "Desarrollo evolutivo de módulos del sistema NVSIC para perfiles de administrador, supervisor, coordinador y operador.", en: "Evolutionary development of NVSIC system modules for administrator, supervisor, coordinator and operator profiles." },
        { es: "Control de acceso por roles en frontend (Angular 17) y backend (Java/Spring).", en: "Role-based access control on the frontend (Angular 17) and backend (Java/Spring)." },
        { es: "Integración con sistemas externos SOAP/REST (ATEX, IMES, EUCARIS, OCR, PSN, MIP) y Web Services para recepción de infracciones y exportación de datos.", en: "Integration with external SOAP/REST systems (ATEX, IMES, EUCARIS, OCR, PSN, MIP) and Web Services for receiving offences and exporting data." },
        { es: "Refactorización de procesos NV_SIC (rendimiento y mantenibilidad), despliegues en PRE, soporte a producción y documentación técnica.", en: "Refactoring of NV_SIC processes (performance and maintainability), PRE deployments, production support and technical documentation." },
      ],
      tech: ["Java", "Spring", "Angular 17", "SOAP", "REST", "Oracle"],
    },
    {
      role: { es: "Analista Programador", en: "Analyst Developer" },
      company: "ALTEN Spain",
      client: { es: "Ministerio para la Transición Ecológica", en: "Ministry for the Ecological Transition" },
      start: "2023-09",
      end: "2024-06",
      points: [
        { es: "Mantenimiento y desarrollo de más de 40 aplicaciones del Ministerio.", en: "Maintenance and development of more than 40 Ministry applications." },
        { es: "Diseño de microservicios con Spring Boot y Spring Security (Java 18, Hibernate, PostgreSQL/PostGIS).", en: "Designed microservices with Spring Boot and Spring Security (Java 18, Hibernate, PostgreSQL/PostGIS)." },
        { es: "Lideré la optimización de rendimiento y coordiné perfiles junior.", en: "Led performance optimisation and coordinated junior developers." },
        { es: "Integración continua con Azure DevOps en entorno Agile, en contacto directo con el cliente.", en: "Continuous integration with Azure DevOps in an Agile setting, working directly with the client." },
      ],
      tech: ["Java 18", "Spring Boot", "Spring Security", "Hibernate", "PostgreSQL", "Azure DevOps"],
    },
    {
      role: { es: "Analista y Desarrollador .NET", en: ".NET Analyst & Developer" },
      company: "Soportex",
      client: null,
      note: { es: "Zixom Business Management · remoto, a tiempo parcial", en: "Zixom Business Management · remote, part-time" },
      start: "2023-03",
      end: "2023-09",
      points: [
        { es: "Desarrollo del ERP interno de gestión de campañas y espacios publicitarios.", en: "Built the internal ERP for managing advertising campaigns and ad space." },
        { es: "VB.Net, C#, Python y DevExpress, con Azure Blob Storage y SQL Server.", en: "VB.Net, C#, Python and DevExpress, with Azure Blob Storage and SQL Server." },
      ],
      tech: ["C#", "VB.Net", "Python", "DevExpress", "SQL Server", "Azure"],
    },
    {
      role: { es: "Desarrollador Junior", en: "Junior Developer" },
      company: "DXC Technology",
      client: "CaixaBank",
      note: { es: "En la compañía desde nov 2019 como IT Helpdesk", en: "With the company since Nov 2019 as IT Helpdesk" },
      start: "2020-02",
      end: "2023-07",
      points: [
        { es: "Desarrollo de microservicios backend con Java y Spring Boot para proyectos del sector bancario.", en: "Built backend microservices with Java and Spring Boot for banking projects." },
        { es: "Automatización de procesos con Python e integración con la API de Jira.", en: "Process automation with Python and Jira API integration." },
        { es: "Proyectos Salesforce (integración y ticketing).", en: "Salesforce projects (integration and ticketing)." },
        { es: "Bases de datos MariaDB, arquitectura MVC y equipos multidisciplinares bajo Scrum.", en: "MariaDB databases, MVC architecture and cross-functional Scrum teams." },
      ],
      tech: ["Java", "Spring Boot", "Python", "MariaDB", "Jira", "Salesforce"],
    },
  ],

  /* ---------- Formación ---------- */
  education: [
    {
      title: { es: "Formación autodidacta en inteligencia artificial y proyectos personales", en: "Self-directed training in artificial intelligence and personal projects" },
      place: { es: "Autodidacta", en: "Self-taught" },
      start: "2024-07",
      end: "2025-03",
    },
    {
      title: { es: "Curso de especialización en Inteligencia Artificial y Big Data", en: "Specialisation course in Artificial Intelligence and Big Data" },
      place: "IES La Puebla (Almería)",
      start: "2022",
      end: "2023",
    },
    {
      title: { es: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)", en: "Higher VET diploma in Multiplatform Application Development (DAM)" },
      place: "INS Estatut (Rubí)",
      start: "2020",
      end: "2021",
    },
    {
      title: { es: "CFGM Sistemas Microinformáticos y Redes (SMX)", en: "VET diploma in Microcomputer Systems and Networks (SMX)" },
      place: "INS Estatut (Rubí)",
      start: "2018",
      end: "2020",
    },
  ],

  /* ---------- Idiomas y otros datos ---------- */
  languages: [
    { name: { es: "Castellano", en: "Spanish" }, level: { es: "Nativo", en: "Native" }, pct: 100 },
    { name: { es: "Catalán", en: "Catalan" }, level: { es: "Nativo", en: "Native" }, pct: 100 },
    { name: { es: "Inglés", en: "English" }, level: { es: "B1 (certificado)", en: "B1 (certified)" }, pct: 50 },
  ],
  extras: [
    { es: "Carnet de conducir y vehículo propio", en: "Driving licence and own vehicle" },
    { es: "Incorporación inmediata", en: "Can start right away" },
  ],

  /* ---------- Proyectos ----------
     Cada proyecto tiene su página: proyecto.html?p=<slug>
     repo / demo: URL o null.
     cover: imagen (ruta relativa a assets/img/projects/) o { flow: [[icono, texto], ...] }
            para un esquema dibujado. Iconos: ws, server, db, screen, cart, store. */
  projectImages: "assets/img/projects/",
  projects: [
    {
      slug: "planificador-visitas",
      short: { es: "Planificador de visitas", en: "Visit planner" },
      type: { es: "Prueba técnica", en: "Technical assessment" },
      title: { es: "Planificador de visitas de técnicos a obras", en: "Site-visit planner for field technicians" },
      subtitle: { es: "Sin solapes, con desplazamientos y dentro de la jornada", en: "No overlaps, travel time included, within working hours" },
      description: {
        es: "Aplicación web que evita solapes entre visitas, exige 30 minutos de desplazamiento entre obras y respeta el horario laboral. Las reglas se validan en el servidor y también las garantiza PostgreSQL.",
        en: "Web app that prevents overlapping visits, enforces 30 minutes of travel time between sites and respects working hours. Rules are validated on the server and also guaranteed by PostgreSQL.",
      },
      cover: "jesolver/programar-visita.png",
      info: {
        status: { es: "Publicado", en: "Live" },
        kind: "Full stack",
        year: "2026",
        team: { es: "Individual", en: "Solo" },
      },
      intro: [
        {
          es: "Aplicación para planificar las visitas de los técnicos a las obras sin que se solapen, con tiempo de desplazamiento entre obras y dentro de la jornada laboral (08:00 a 17:00).",
          en: "An app to schedule technicians' site visits without overlaps, with travel time between sites and within the working day (08:00 to 17:00).",
        },
        {
          es: "Las reglas viven en dos capas: funciones puras en TypeScript, testeadas con Vitest y reutilizadas en el navegador para avisar antes de guardar, y restricciones en PostgreSQL (EXCLUDE con rangos de tiempo y CHECK) que las garantizan aunque dos personas guarden a la vez.",
          en: "The rules live in two layers: pure TypeScript functions, tested with Vitest and reused in the browser to warn before saving, and PostgreSQL constraints (EXCLUDE on time ranges and CHECK) that enforce them even when two people save at once.",
        },
      ],
      features: [
        { es: "Programar visitas indicando obra, técnico, fecha, hora y duración", en: "Schedule visits by site, technician, date, time and duration" },
        { es: "Mensajes que indican qué regla no se cumple y con qué visita choca", en: "Messages that say which rule fails and which visit it clashes with" },
        { es: "Cancelación sin borrado: la visita queda visible y libera el hueco", en: "Cancelling without deleting: the visit stays visible and frees the slot" },
        { es: "Listado ordenado y filtrable por técnico, fecha y estado", en: "List sorted and filterable by technician, date and status" },
        { es: "Agenda visual del técnico con aviso en tiempo real antes de guardar", en: "Visual technician schedule with a live warning before saving" },
        { es: "API con códigos HTTP claros: 400, 422 y 409", en: "API with clear HTTP status codes: 400, 422 and 409" },
      ],
      results: [
        { es: "17 tests de las reglas de planificación", en: "17 tests covering the scheduling rules" },
        { es: "Probado con 10 peticiones simultáneas al mismo hueco: se crea una y las otras 9 reciben un 422", en: "Tested with 10 simultaneous requests for the same slot: one is created and the other 9 get a 422" },
        { es: "Publicado en Vercel con base de datos en Neon", en: "Deployed on Vercel with a Neon database" },
      ],
      challenges: [
        { es: "Concurrencia: bloqueo de la fila del técnico (SELECT … FOR UPDATE) para procesar en serie las peticiones del mismo técnico", en: "Concurrency: locking the technician's row (SELECT … FOR UPDATE) so requests for the same technician run one at a time" },
        { es: "Fechas sin zona horaria para que un servidor en UTC no cambie el día", en: "Time-zone-free dates so a UTC server doesn't shift the day" },
        { es: "Contrastar el código generado con IA con la documentación de Next.js 16", en: "Checking AI-generated code against the Next.js 16 documentation" },
      ],
      gallery: [
        { src: "jesolver/programar-visita.png", caption: { es: "Programar una visita", en: "Scheduling a visit" } },
        { src: "jesolver/listado.png", caption: { es: "Listado de visitas", en: "Visit list" } },
      ],
      tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Zod", "Vitest"],
      repo: "https://github.com/joelserranoperez/jesolver",
      demo: "https://planificador-visitas-gamma.vercel.app",
    },
    {
      slug: "nvsic",
      short: "NVSIC",
      type: { es: "Caso profesional", en: "Professional case" },
      title: { es: "NVSIC · gestión de infracciones de tráfico", en: "NVSIC · traffic-offence management" },
      subtitle: { es: "Global Rosetta (Getronics) · cliente Servei Català de Trànsit", en: "Global Rosetta (Getronics) · client Servei Català de Trànsit" },
      description: {
        es: "Evolutivos del sistema NVSIC con Java/Spring y Angular 17: control de acceso por roles e integración con seis sistemas externos por SOAP/REST para recibir infracciones y exportar datos.",
        en: "Enhancements to the NVSIC system with Java/Spring and Angular 17: role-based access control and integration with six external systems over SOAP/REST to receive offences and export data.",
      },
      cover: { flow: [["ws", "SOAP / REST"], ["server", "Java · Spring"], ["db", "Oracle"], ["screen", "Angular 17"]] },
      info: {
        status: { es: "Finalizado", en: "Completed" },
        kind: "Full stack Java",
        year: "2025 – 2026",
        team: { es: "Equipo de Getronics", en: "Getronics team" },
      },
      intro: [
        {
          es: "Desarrollo evolutivo de módulos del sistema NVSIC para los perfiles de administrador, supervisor, coordinador y operador.",
          en: "Evolutionary development of NVSIC modules for the administrator, supervisor, coordinator and operator profiles.",
        },
        {
          es: "El sistema recibe infracciones y exporta datos mediante integraciones SOAP/REST con ATEX, IMES, EUCARIS, OCR, PSN y MIP.",
          en: "The system receives offences and exports data through SOAP/REST integrations with ATEX, IMES, EUCARIS, OCR, PSN and MIP.",
        },
      ],
      featuresTitle: "tasks",
      features: [
        { es: "Control de acceso por roles en frontend (Angular 17) y backend (Java/Spring)", en: "Role-based access control on the frontend (Angular 17) and backend (Java/Spring)" },
        { es: "Integraciones SOAP/REST con ATEX, IMES, EUCARIS, OCR, PSN y MIP", en: "SOAP/REST integrations with ATEX, IMES, EUCARIS, OCR, PSN and MIP" },
        { es: "Web Services para recepción de infracciones y exportación de datos", en: "Web Services for receiving offences and exporting data" },
        { es: "Refactorización de procesos NV_SIC para mejorar rendimiento y mantenibilidad", en: "Refactoring NV_SIC processes for performance and maintainability" },
        { es: "Despliegues en PRE, soporte a producción y documentación técnica", en: "PRE deployments, production support and technical documentation" },
      ],
      results: [],
      challenges: [],
      gallery: [],
      tech: ["Java", "Spring", "Angular 17", "SOAP", "REST", "Oracle"],
      repo: null,
      demo: null,
      note: { es: "Código privado del cliente", en: "Client's private code" },
    },
    {
      slug: "click-collect",
      short: "Click & Collect",
      type: { es: "Proyecto para un negocio real", en: "Built for a real business" },
      title: { es: "Click & Collect para Alba Xarcuterías", en: "Click & Collect for Alba Xarcuterías" },
      subtitle: { es: "Pedidos online con recogida en tienda", en: "Online orders with in-store pickup" },
      description: {
        es: "Web de pedidos online con recogida en tienda, desarrollada para una charcutería real.",
        en: "Online ordering site with in-store pickup, built for a real delicatessen.",
      },
      cover: { flow: [["cart", { es: "Pedido", en: "Order" }], ["server", "API"], ["db", { es: "Datos", en: "Data" }], ["store", { es: "Recogida", en: "Pickup" }]] },
      info: {
        kind: { es: "Desarrollo web", en: "Web development" },
        team: { es: "Individual", en: "Solo" },
      },
      intro: [
        {
          es: "Web de pedidos online con recogida en tienda desarrollada para Alba Xarcuterías, una charcutería real: el cliente prepara su pedido desde la web y lo recoge en el local.",
          en: "Online ordering site with in-store pickup built for Alba Xarcuterías, a real delicatessen: customers place their order on the web and collect it at the shop.",
        },
      ],
      features: [],
      results: [],
      challenges: [],
      gallery: [],
      tech: [],
      repo: null,
      demo: null,
      note: { es: "Repositorio no público", en: "Repository not public" },
    },
  ],

  /* ---------- Stack: ordenado como las capas de una aplicación ---------- */
  stack: [
    { code: "API", group: { es: "APIs e integración", en: "APIs & integration" }, items: ["REST", "SOAP", "Web Services"] },
    { code: "SRV", group: { es: "Servicios", en: "Services" }, items: ["Java 11/18", "Spring Boot", "Spring Security", "Spring/Canigó", "Hibernate", "jBPM", "Drools"] },
    { code: "UI", group: "Frontend", items: ["Angular 17", "TypeScript"] },
    { code: "DB", group: { es: "Datos", en: "Data" }, items: ["Oracle SQL", "PostgreSQL/PostGIS", "MariaDB", "SQL Server"] },
    { code: "OPS", group: { es: "DevOps y herramientas", en: "DevOps & tools" }, items: ["Git", "Maven", "Docker", "Azure DevOps", "Tomcat", "JUnit", "Jira"] },
    { code: "+", group: { es: "Otros", en: "Other" }, items: ["Python", ".NET/C#", "Scrum / Agile"] },
  ],

  /* ---------- Textos de la interfaz ---------- */
  ui: {
    meta: {
      title: { es: "Joel Serrano Pérez · Desarrollador Backend Java", en: "Joel Serrano Pérez · Java Backend Developer" },
      description: {
        es: "Desarrollador backend Java con más de 5 años de experiencia en Spring Boot, microservicios e integraciones REST/SOAP. Rubí (Barcelona). Incorporación inmediata.",
        en: "Java backend developer with 5+ years of experience in Spring Boot, microservices and REST/SOAP integrations. Based in Rubí (Barcelona). Available now.",
      },
    },
    nav: {
      home: { es: "Inicio", en: "Home" },
      about: { es: "Sobre mí", en: "About" },
      experience: { es: "Experiencia", en: "Experience" },
      projects: { es: "Proyectos", en: "Projects" },
      stack: { es: "Habilidades", en: "Skills" },
      education: { es: "Formación", en: "Education" },
      contact: { es: "Contacto", en: "Contact" },
    },
    sections: {
      about: { kicker: { es: "Sobre mí", en: "About" }, title: { es: "Backend Java para sistemas que no pueden fallar", en: "Java backend for systems that can't fail" } },
      experience: { kicker: { es: "Experiencia", en: "Experience" }, title: { es: "Dónde he trabajado", en: "Where I've worked" } },
      projects: { kicker: { es: "Proyectos", en: "Projects" }, title: { es: "Trabajo destacado", en: "Featured work" } },
      stack: { kicker: { es: "Habilidades", en: "Skills" }, title: { es: "Tecnologías que uso", en: "Technologies I use" } },
      education: { kicker: { es: "Formación", en: "Education" }, title: { es: "Estudios e idiomas", en: "Studies & languages" } },
      contact: { kicker: { es: "Contacto", en: "Contact" }, title: { es: "Hablemos", en: "Let's talk" } },
    },
    skip: { es: "Saltar al contenido", en: "Skip to content" },
    ctaProjects: { es: "Ver proyectos", en: "View projects" },
    ctaCv: { es: "Descargar CV", en: "Download CV" },
    ctaEmail: { es: "Enviar un email", en: "Send an email" },
    cvOther: { es: "", en: "(Spanish)" },
    present: { es: "Actualidad", en: "Present" },
    now: { es: "hoy", en: "now" },
    client: { es: "Cliente", en: "Client" },
    journey: { es: "Mi recorrido", en: "My path" },
    stackTitle: { es: "Stack principal", en: "Core stack" },
    stackNote: { es: "Ordenado como las capas de una aplicación, de la API a la infraestructura.", en: "Ordered like the layers of an application, from the API down to infrastructure." },
    eduDone: { es: "Completado", en: "Completed" },
    languages: { es: "Idiomas", en: "Languages" },
    api: {
      title: { es: "Mi perfil, como una API", en: "My profile, as an API" },
      lead: { es: "Soy backend, así que también puedes consultarme por endpoints. Elige uno y envía la petición.", en: "I'm a backend developer, so you can query me by endpoint too. Pick one and send the request." },
      send: { es: "Enviar", en: "Send" },
      note: { es: "Respuesta simulada en tu navegador con los datos de esta web.", en: "Response simulated in your browser from this site's data." },
    },
    contactText: {
      es: "Busco un nuevo reto como desarrollador backend Java, en Barcelona, en híbrido o en remoto. Puedo incorporarme de inmediato. La forma más rápida de contactarme es por email o LinkedIn.",
      en: "I'm looking for a new Java backend role in Barcelona, hybrid or remote, and can start right away. The quickest way to reach me is by email or LinkedIn.",
    },
    cardRole: { es: "Backend Developer · Java", en: "Backend Developer · Java" },
    copy: { es: "Copiar email", en: "Copy email" },
    copied: { es: "Copiado", en: "Copied" },
    themeToLight: { es: "Cambiar a modo claro", en: "Switch to light mode" },
    themeToDark: { es: "Cambiar a modo oscuro", en: "Switch to dark mode" },
    langSwitch: { es: "Switch to English", en: "Cambiar a español" },
    menu: { es: "Menú", en: "Menu" },
    navMain: { es: "Principal", en: "Main" },
    navMobile: { es: "Menú móvil", en: "Mobile menu" },
    newTab: { es: "se abre en una pestaña nueva", en: "opens in a new tab" },
    pause: { es: "Pausar animaciones", en: "Pause animations" },
    footerTag: { es: "Desarrollador backend Java en Barcelona. Spring Boot, microservicios y APIs REST/SOAP.", en: "Java backend developer in Barcelona. Spring Boot, microservices and REST/SOAP APIs." },
    footerCols: { sections: { es: "Secciones", en: "Sections" }, projects: { es: "Proyectos", en: "Projects" } },
    footer: { es: "Hecho a mano con HTML, CSS y JavaScript.", en: "Handmade with HTML, CSS and JavaScript." },
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    backTop: { es: "Volver arriba", en: "Back to top" },
    project: {
      view: { es: "Ver proyecto", en: "View project" },
      back: { es: "Todos los proyectos", en: "All projects" },
      overview: { es: "Descripción", en: "Overview" },
      features: { es: "Qué hace", en: "What it does" },
      tasks: { es: "Mi trabajo", en: "My work" },
      results: { es: "Resultados", en: "Results" },
      challenges: { es: "Retos y soluciones", en: "Challenges" },
      gallery: { es: "Galería", en: "Gallery" },
      details: { es: "Ficha", en: "Details" },
      status: { es: "Estado", en: "Status" },
      kind: { es: "Tipo", en: "Type" },
      year: { es: "Año", en: "Year" },
      team: { es: "Equipo", en: "Team" },
      repo: { es: "Ver código en GitHub", en: "View code on GitHub" },
      demo: { es: "Abrir demo", en: "Open demo" },
      more: { es: "Otros proyectos", en: "More projects" },
      prev: { es: "Anterior", en: "Previous" },
      next: { es: "Siguiente", en: "Next" },
      close: { es: "Cerrar", en: "Close" },
      open: { es: "Ampliar imagen", en: "Enlarge image" },
      cta: { es: "¿Hablamos?", en: "Let's talk" },
      ctaText: { es: "Si buscas un perfil backend con Java y Spring Boot, escríbeme.", en: "If you're looking for a Java and Spring Boot backend developer, get in touch." },
      flowCaption: { es: "Flujo simplificado del sistema.", en: "Simplified system flow." },
      notFound: { es: "Proyecto no encontrado.", en: "Project not found." },
    },
  },
};
