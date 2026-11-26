# 🚀 Kanban Pro - Gestor de Proyectos

Aplicación web de gestión de tareas tipo Kanban. Esta versión evoluciona la práctica base (AC6) integrando funcionalidades profesionales de alertas , edicion, fechalimite y guia usaurio.

🔗 **Enlace del Kanban Pro** https://armanalidaw.github.io/Exercici_M0612_U1_PF/

---

## Funcionalidades

### 🛠️ Funcionalidad 1: Edicion de tareas y asignacion de Fechas
Esta funcionalidad usa la librería **Day.js** junto con **SweetAlert2**, permitiendo al usuario gestionar titulo , descripcion , fechas de inicio, fechas límite y estado de tarea dando click a la tarea apareciendo un menu.

### 🛠️ Funcionalidad 2: DRAG & DROP
Esta funcionalidad usa la libreria **SortableJS**, permitiendo el usuario cambiar el estado rapido solo cogiendo la tarjeta y pasando a otras columnas.Est es una forma mas facil y rapido para cambiar el estado de una tarea.

### 🛠️ Funcionalidad 3: Notificacion y Confirmacion de Tareas
Esta funcionalidad usa la libreria **SweetAlert2**, se usa para notificar el usuario cuando una tarea esta creada , eliminada, modificada o si la fecha de limite esta vencido. Ademas al eliminar un tarea pide confirmacion para evitar eliminacion por accidente.Y cuando una tarea cambia su estado a completado sale un pantalla de felicidades.

### 🛠️ Funcionalidad 4: Tutorial Interactivo de Ayuda
Esta funcionalidad usa la libreria **Driver.js**, se ha usado para implementar una guia (tour) de la aplicacion para entender la funcionalidades de la aplicacion.
Este tour contiene 6 pasos, explicando cada apartado de la aplicacion y se habilita con el boton de `❓ Ajuda` en la cabercera.

#### 1. ¿Por qué he elegido?
Estas Funcionlidades son estandard de una **Aplicacion Kanban**. He cogido porque se usa para facilitar a los usuarios dando una experiencia muy fluida y interactiva. Ademas las fecha limites son importentes para tener cuenta sobre el limite de plazo.

#### 2. ¿Qué funciones y objetos se utilizan?
Se usaron 4 librerias:
**SweetAlert2**: Para mostrar todas las Notifiacions y Modificacion de Tareas.
**Day.js**: Para gestionar y comparar fechas de las tareas como fecha limite.
**SortableJS**: Para mover las tarea entre columnas para cambiar su estado (Per Fer, En process , Completat).
**Driver.js**: Para la guia de la apliacion explicando sobre todas las funcionalidades de la aplicacion.

#### 3. ¿Cómo se integra en la aplicación previa?
- **En el estado (`state`)**: Se han añadido `startDate` y `dueDate` a cada tarea. Al crear una tarea, `startDate` se rellena automáticamente con el día de hoy usando `dayjs().format('YYYY-MM-DD')`.
- **En el renderizado (`createTaskCard`)**: Antes de pintar la tarjeta, se evalúa `dayjs(task.dueDate).isBefore(...)`. Si la condición se cumple y la tarea no está completada, se le añade la clase CSS `.overdue` y un aviso visual en la descripción y se la la fecha de limite es mismo dia le pone `Vence hoy : la fecha`
- **En la edición (`openTaskDetails`)**: Al hacer clic en tarjeta, se abre un menu generado con SweetAlert2. Con este menu se puede modificar el título, descripción, estado y ambas fechas. Al guardar, se actualiza el objeto original en el array `state` y se vuelve a renderizar el DOM, aplicando automáticamente los nuevos estilos si la fecha ha cambiado.
---
