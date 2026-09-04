# Gestión Humana — Taller Evaluativo #1

Sitio web educativo sobre los procesos de la Gestión Humana, desarrollado para el
Taller Evaluativo #1 — *Conociendo los procesos de la Gestión Humana* del curso
**Fundamento Campo de Aplicación Organizacional**, Programa de Psicología,
**Universidad Autónoma de Bucaramanga (UNAB) — EXT UNISANGIL**.

Construido en **HTML5, CSS3 y JavaScript vanilla** (sin frameworks ni dependencias
de compilación), para que cualquier integrante del equipo pueda abrirlo, entenderlo
y modificarlo sin instalar nada.

## Estructura del proyecto

```text
UNAB-Unisangil/
├── index.html                 # Página de inicio
├── competencias.html          # Proceso 1
├── organizar-personas.html    # Proceso 2
├── integrar-personas.html     # Proceso 3
├── recompensar-personas.html  # Proceso 4
├── desarrollar-personas.html  # Proceso 5
├── retener-personas.html      # Proceso 6
├── auditar-personas.html      # Proceso 7
├── clima-laboral.html         # Proceso 8
├── css/
│   └── style.css              # Sistema de diseño completo (variables, componentes)
├── js/
│   └── main.js                # Navbar, footer, menú móvil, acordeones, tabs, etc.
├── img/
│   ├── logo-unisangil.png
│   └── logo-unab.jpeg
└── README.md
```

No requiere `npm install` ni proceso de build: es HTML estático puro.

## Cómo ejecutarlo localmente

**Opción 1 — abrir directamente:**
Haz doble clic en `index.html` y ábrelo con tu navegador. El sitio funciona por
completo sin servidor, incluida la navegación y el menú móvil.

**Opción 2 — con un servidor local (recomendado para desarrollo):**

```bash
# Con Python instalado
cd UNAB-Unisangil
python3 -m http.server 5500
# Abrir http://localhost:5500

# O con la extensión "Live Server" de VS Code
# clic derecho sobre index.html → "Open with Live Server"
```

## Cómo editar el contenido

- Cada proceso vive en su propio archivo `.html`, con la misma estructura:
  Hero → Definición → Objetivos → Características → Subprocesos →
  Recursos multimedia → Referencias.
- Los bloques marcados como `[AGREGAR ...]` son espacios reservados para
  contenido que el documento del taller no desarrolla por completo
  (definiciones teóricas adicionales, referencias APA, videos, documentos).
  Complétalos con las fuentes que consulte cada equipo.
- Las tarjetas de **Recursos multimedia** (`resource-card`) están preparadas
  para reemplazar el `<span class="placeholder-tag">Placeholder</span>` por
  un enlace real (`<a class="resource-link" href="...">Ver recurso →</a>`)
  cuando el equipo tenga el video, PDF, formulario o infografía definitivos.
- Los estilos compartidos están en `css/style.css`, organizados por
  componente (navbar, hero, cards, acordeón, tabs, tabla comparativa, etc.).
  Los colores y tipografías se controlan desde las variables `:root` al
  inicio del archivo.
- El comportamiento interactivo (menú móvil, acordeones, pestañas, scroll
  reveal, botón "volver arriba", barra de progreso y el envío demostrativo
  de la encuesta de clima laboral) está centralizado en `js/main.js`.

## Despliegue

### Vercel

1. Sube la carpeta `UNAB-Unisangil` a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com) → **Add New Project** → importa el repositorio.
3. Framework Preset: **Other** (sitio estático). No se requiere *build command*
   ni *output directory* especial: Vercel sirve los archivos tal cual.
4. Clic en **Deploy**.

### Render

1. Sube el proyecto a GitHub.
2. En [render.com](https://render.com) → **New** → **Static Site**.
3. Conecta el repositorio.
4. *Build Command*: dejar vacío. *Publish directory*: `.` (raíz del proyecto).
5. Clic en **Create Static Site**.

### GitHub Pages

1. Sube el proyecto a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En *Source*, selecciona la rama principal (`main`) y la carpeta raíz (`/`).
4. Guarda; GitHub Pages publicará el sitio en unos minutos.

## Créditos

Universidad Autónoma de Bucaramanga — EXT UNISANGIL · Programa de Psicología
Fundamento Campo de Aplicación Organizacional · Taller Evaluativo #1

Equipo responsable por proceso: ver sección **Nuestro equipo** en `index.html`.
