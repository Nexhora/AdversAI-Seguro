# Instrucciones para Subir tu Código a GitHub

Hola. Sigue estos pasos uno por uno en la terminal que tienes abierta abajo. Así no tendrás que salir de esta pantalla.

---

### Paso 1: Copia la URL de tu Repositorio

Ve a la página de tu repositorio en GitHub (la que creaste hace unos minutos). Busca un botón azul que dice "Code". Haz clic en él, asegúrate de que la pestaña "HTTPS" esté seleccionada y copia la URL.

Se verá así: `https://github.com/tu-usuario/nombre-del-repositorio.git`

Tu URL correcta es la siguiente. La he pegado aquí para que la tengas a mano.

Mi URL de GitHub:
`https://github.com/Nexhora/AdversAI.git`

---

### Paso 2: Ejecuta estos comandos en la Terminal

Abre la terminal abajo (si no está abierta, ve al menú de arriba "Ver" > "Terminal").

Copia y pega los siguientes comandos UNO POR UNO y presiona la tecla "Enter" después de cada uno.

1.  **Inicializa Git (prepara la "caja" para tu código):**
    ```bash
    git init -b main
    ```

2.  **Añade todos tus archivos a la "caja":**
    ```bash
    git add .
    ```

3.  **Ponle una etiqueta a la "caja" (guarda los cambios):**
    ```bash
    git commit -m "Mi primer commit"
    ```

4.  **Dile a Git cuál es la "dirección de envío" (¡He pegado tu URL aquí!):**
    ```bash
    git remote add origin https://github.com/Nexhora/AdversAI.git
    ```

5.  **Envía tu código a GitHub:**
    ```bash
    git push -u origin main
    ```
    *En este paso, es posible que se abra una ventana del navegador pidiéndote que inicies sesión en GitHub para dar permiso. Si es así, hazlo.*

---

### Paso 3: Verifica y Continúa en Firebase

- **Verifica:** Vuelve a la página de tu repositorio en GitHub y recárgala. Ahora deberías ver todos los archivos de tu proyecto.

- **Continúa:** Una vez que veas tus archivos en GitHub, regresa a la página de Firebase Hosting. Actualízala y ahora sí podrás conectar tu repositorio.

---

Tómate el tiempo que necesites. Si algo no funciona o tienes una duda, avísame en el chat. Estoy aquí para ayudarte.
