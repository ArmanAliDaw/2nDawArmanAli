# Dashboard del alquiler en Barcelona

Aplicación web interactiva desarrollada con **Flask**, **Jinja**, **Matplotlib** y datos abiertos del Ayuntamiento de Barcelona.

El proyecto muestra la evolución del precio medio mensual del alquiler de viviendas y permite consultar, filtrar y comparar territorios por nivel administrativo.

🌐 **Web publicada:** https://armanali143.pythonanywhere.com/

## Funcionalidades

### Dashboard principal

- Filtrado por nivel territorial:
  - Catalunya
  - Àmbit metropolità
  - Ciutat
  - Districte
  - Barrio
- Búsqueda: nombre de territorio.
- Ordenación: nombre, alquiler o variación %.
- Dirección: ascendente o descendente.
- Tres modos de presentación:
  - Tarjetas
  - Gráficos
  - Ambos
- Cálculo de insights:
  - Territorio más caro
  - Territorio más barato
  - Diferencia entre ambos

### Página de detalle

- Consulta de todos los años disponibles de un territorio.
- Ordenación por año, alquiler o cambio porcentual.
- Comparación con el año anterior.
- Año más caro y año más barato.
- Diferencia máxima observada.
- Gráfico de evolución histórica.

## Tecnologías

- Python
- Flask
- Jinja2
- Matplotlib
- HTML y CSS
- CSV

## Estructura del proyecto

```text
Exercici_MPROPI_U1_PF/
├── app.py
├── Exercici_MPROPI_U1_PF.pdf
├── README.md
├── data/
│   ├── Taula_estadistica_actualizado.csv
│   ├── Taula_estadistica.csv
│   └── Metadata.txt
├── services/
│   ├── data_service.py
│   └── graph_service.py
├── static/
│   ├── styles.css
│   ├── grafica.png
│   └── grafica_anos.png
└── templates/
    ├── dashboard.html
    └── detail.html
```

### Responsabilidades

- `app.py`: define las rutas y prepara las variables que reciben las plantillas.
- `services/data_service.py`: carga y normaliza el CSV, clasifica territorios, filtra, ordena y calcula indicadores.
- `services/graph_service.py`: genera las gráficas con Matplotlib.
- `templates/`: contiene las vistas HTML dinámicas Jinja.
- `static/styles.css`: contiene los estilos de la interfaz.
- `static/grafica*.png`: imágenes PNG generadas por Matplotlib.

## Requisitos

- Python 3.10 o superior recomendado.
- Flask
- Matplotlib

La aplicación no utiliza una base de datos: lee los datos directamente desde el archivo CSV incluido en el proyecto.


## Datos y metodología

### Fuente

Los datos proceden del **Portal de Datos Abiertos del Ayuntamiento de Barcelona**:

- Dataset: [Preu mitjà (€) del lloguer d'habitatges](https://portaldades.ajuntament.barcelona.cat/ca/estadistiques/b37xv8wcjh)
- Unidad: precio medio mensual en euros
- Licencia: **CC BY 4.0**
- Archivo utilizado: `data/Taula_estadistica_actualizado.csv`
- Número de territorios: 86
- Período incluido en el CSV: 2000-2026

### Comparación principal

Las tarjetas comparan:

- Año base: 2014
- Año actual: 2025

Solo se incluyen territorios que contienen datos válidos en ambos años. Por este motivo, el número de tarjetas puede ser distinto al número total de filas del CSV.

La variación porcentual se calcula como:

```text
(valor 2025 - valor 2014) / valor 2014 * 100
```

También se muestran la diferencia absoluta y el alquiler de 2014 al expandir cada tarjeta.

### Tratamiento del CSV

- El separador de columnas es `;`.
- Los decimales utilizan `,`.
- Los valores `-` representan datos no disponibles y no se interpretan como cero.
- El CSV se lee con codificación `latin-1` por la presencia de caracteres dañados o mal codificados en el archivo original.
- La aplicación normaliza el formato decimal sustituyendo `,` por `.` antes de realizar cálculos.

El archivo original contiene nombres con caracteres dañados, por ejemplo `G�tic` o `Fam�lia`. Para evitar problemas de carga se utiliza una copia corregida a nivel técnico llamada `Taula_estadistica_actualizado.csv`; aun así, algunos nombres pueden conservar caracteres incorrectos heredados del archivo fuente.

## Gráficos

### Comparación entre territorios

Cuando se selecciona un nivel y la vista gráfica, Matplotlib genera un gráfico de barras horizontales con los 10 territorios más caros de ese nivel en 2025.

El archivo generado es:

```text
static/grafica.png
```

### Evolución histórica

En la página de detalle se genera un gráfico de líneas con los años disponibles de un territorio.

El archivo generado es:

```text
static/grafica_anos.png
```

Las imágenes se sobrescriben cada vez que se solicita un gráfico nuevo.