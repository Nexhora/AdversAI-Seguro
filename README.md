# ¡CASI LISTO! Pega tus claves de API aquí

¡Hola! Para que esta aplicación funcione completamente, necesita conectarse a dos servicios de Google: **Google AI** (para la inteligencia artificial) y **Firebase** (para la autenticación de usuarios).

**MIRA EL EXPLORADOR DE ARCHIVOS A LA IZQUIERDA.**

Verás una lista de archivos. Uno de ellos se llama `.env`. Este es tu archivo de secretos.

**Instrucciones:**

1.  En el panel de la izquierda, **haz clic en el archivo que se llama `.env`**.
2.  Verás que tiene varias líneas que empiezan con `TU_..._VA_AQUI`.
3.  **Para la clave de Google AI (`GOOGLE_API_KEY`):**
    *   Ve a [Google AI Studio](https://aistudio.google.com/app/apikey) y obtén tu clave de API.
    *   Pégala en el archivo `.env` reemplazando `TU_API_KEY_DE_GOOGLE_VA_AQUI`.
4.  **Para las credenciales de Firebase:**
    *   Ve a la [Consola de Firebase](https://console.firebase.google.com/) y selecciona tu proyecto.
    *   Haz clic en el ícono de engranaje (⚙️) y ve a **Configuración del proyecto**.
    *   En la pestaña **General**, busca la sección **Tus apps**.
    *   Selecciona tu aplicación web y en **SDK de Firebase**, elige la opción **Configuración**.
    *   Verás un objeto de configuración (`firebaseConfig`). Copia los valores de `apiKey`, `authDomain`, `projectId`, etc., y pégalos en las líneas correspondientes del archivo `.env`.
5.  Asegúrate de que no haya espacios ni comillas al principio o al final de las claves.
6.  ¡Guarda el archivo y listo!

Una vez que todas las claves estén en su lugar, la aplicación tendrá todo lo que necesita para funcionar.
