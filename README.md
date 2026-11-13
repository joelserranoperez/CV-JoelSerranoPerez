# CV-JoelSerranoPerez

Portfolio personal de **Joel Serrano Pérez**, desarrollador backend Java (Spring Boot · microservicios · REST/SOAP).
Web estática en HTML, CSS y JavaScript, sin dependencias ni compilación. GitHub Pages la publica desde la carpeta `docs/`.

🌐 https://joelserranoperez.github.io/CV-JoelSerranoPerez/

## Publicar en GitHub Pages (una sola vez)

1. En GitHub: **Settings → Pages**.
2. *Source*: **Deploy from a branch**. *Branch*: `main`, carpeta **`/docs`**. Guardar.
3. En uno o dos minutos la web está en la dirección de arriba.

## Cómo editar el contenido

Todo el texto, en español e inglés, está en **`docs/assets/js/content.js`**. Cada texto puede ser:

- `"Igual en los dos idiomas"`
- `{ es: "En español", en: "In English" }`

| Quiero… | Dónde |
|---|---|
| Añadir un trabajo | `experience`: copia un bloque `{ … }` y ponlo el primero |
| Añadir un proyecto | `projects`: copia uno y cambia su `slug`. Sus imágenes van en `docs/assets/img/projects/`. Añade su URL a `docs/sitemap.xml` |
| Cambiar tecnologías | `stack` (capas) y `hero.belt` (cinta de la portada) |
| Cambiar el CV | Sustituye `docs/assets/cv/CV_Joel_Serrano_Perez.pdf` o cambia la ruta en `profile.cv`. Para un CV en inglés, rellena `profile.cv.en` |
| Cambiar email o redes | `profile` |
| Cambiar colores | `docs/assets/css/styles.css`: variables `--primary`, `--primary-2` y `--grad` (bloques claro y oscuro) |
| Ver un idioma o tema concreto | Añade `?lang=en` o `?theme=dark` a la URL |

> Si la web se queda en blanco después de editar, casi siempre es una coma o unas comillas que faltan en `content.js`.

## Probar en local

```bash
cd docs
python -m http.server 8765
# abre http://127.0.0.1:8765
```

## Estructura

```
docs/index.html              portada con todas las secciones
docs/proyecto.html           detalle de cada proyecto (?p=<slug>)
docs/assets/js/content.js    todo el contenido ES/EN  ← editar aquí
docs/assets/js/main.js       idioma, tema, animaciones y pintado de secciones
docs/assets/css/styles.css   diseño (modo claro y oscuro)
docs/assets/cv/              CV en PDF
docs/assets/img/             foto, imagen para redes (og.jpg), favicon y capturas
docs/robots.txt, sitemap.xml SEO
```

## Detalles

- **Idioma:** botón ES/EN, o `?lang=en`. Si no se indica, se usa la última elección o el idioma del navegador.
- **Tema:** sigue al del sistema hasta que se pulsa el botón; desde entonces recuerda la elección.
- **Accesibilidad:** navegación por teclado, «saltar al contenido», botón para pausar animaciones y respeto a «reducir movimiento».
- **Perfil como API:** en «Sobre mí» hay una consola que simula `GET /api/joel/...` con los datos de `content.js`.
