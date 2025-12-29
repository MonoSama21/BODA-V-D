# Landing Page para Boda - Vivian & Diter

## 🎊 Descripción
Landing page moderna y elegante para la boda del 13 de febrero de 2027, con contador regresivo, reproductor de música y formulario de confirmación integrado con Google Sheets y notificaciones por email.

## ✨ Características

- ✅ Diseño moderno y responsive con React + Vite
- ✅ Contador regresivo en tiempo real con diseño mejorado
- ✅ 🎵 Reproductor de música integrado con controles de volumen
- ✅ Formulario de confirmación de asistencia
- ✅ Integración con Google Sheets para almacenar respuestas
- ✅ Notificaciones por email al novio usando EmailJS
- ✅ Estilos elegantes con Tailwind CSS y gradientes
- ✅ Fuentes personalizadas de Google Fonts
- ✅ Animaciones suaves y efectos visuales elegantes
- ✅ Corazones flotantes y efectos de fondo

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. **Agregar tu canción de boda:**
   - Coloca tu archivo MP3 en la carpeta `public/`
   - Nombra el archivo como `wedding-song.mp3`
   - Tamaño recomendado: Menos de 10MB

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador: `http://localhost:5173`

## ⚙️ Configuración

### 1. Reproductor de Música 🎵

El reproductor está listo para usar. Solo necesitas:

1. Conseguir el archivo MP3 de tu canción favorita
2. Guardarlo como `public/wedding-song.mp3`
3. La música se reproducirá en loop con controles de volumen

**Formatos soportados:** MP3, WAV, OGG

### 2. Google Sheets Integration

Para que el formulario envíe datos a una hoja de cálculo de Google:

1. Crear una hoja de cálculo en Google Sheets
2. Ir a **Extensiones** > **Apps Script**
3. Pegar este código:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Agregar fila con los datos
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.attending,
      data.guests,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Hacer clic en **Implementar** > **Nueva implementación**
5. Seleccionar tipo: **Aplicación web**
6. Configurar:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
7. Copiar la URL de la aplicación web
8. En `src/App.jsx`, reemplazar `TU_WEB_APP_URL_DE_GOOGLE_SHEETS` con la URL copiada

### 3. EmailJS Configuration

Para recibir notificaciones por email:

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar un servicio de email (Gmail, Outlook, etc.)
3. Crear una plantilla de email con estas variables:
   - `{{to_email}}` - Email del destinatario
   - `{{from_name}}` - Nombre del invitado
   - `{{from_email}}` - Email del invitado
   - `{{phone}}` - Teléfono
   - `{{attending}}` - Confirmación de asistencia
   - `{{guests}}` - Número de invitados
   - `{{message}}` - Mensaje adicional

4. En `src/App.jsx`, reemplazar:
   - `TU_SERVICE_ID` con tu Service ID
   - `TU_TEMPLATE_ID` con tu Template ID
   - `TU_PUBLIC_KEY` con tu Public Key
   - `correo_del_novio@ejemplo.com` con el email real del novio

## 📝 Personalización

### Cambiar información de la boda

En `src/App.jsx`:
- **Nombres**: Cambiar "Vivian & Diter"
- **Fecha**: Modificar `weddingDate = '2027-02-13T16:00:00'`
- **Ubicaciones**: Actualizar direcciones en la sección "Event Details"
- **Colores**: Modificar en `tailwind.config.js` la sección `wedding`
- **Música**: Reemplazar `public/wedding-song.mp3` con tu canción

### Modificar estilos

Los estilos se configuran en:
- `tailwind.config.js` - Colores y fuentes del tema
- `src/index.css` - Estilos globales
- `src/App.jsx` - Estilos de componentes

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` listos para desplegar.

## 🌐 Despliegue

Puedes desplegar en:
- **Vercel**: `vercel deploy`
- **Netlify**: Conectar repositorio o arrastrar carpeta `dist/`
- **GitHub Pages**: Usar GitHub Actions
- **Firebase Hosting**: `firebase deploy`

## 📱 Secciones de la Landing Page

1. **Hero** - Portada con nombres y fecha
2. **Contador Regresivo** - Días, horas, minutos y segundos
3. **Detalles del Evento** - Información de ceremonia y recepción
4. **Código de Vestimenta** - Sugerencias de vestimenta
5. **Formulario RSVP** - Confirmación de asistencia
6. **Footer** - Información adicional

## 🎨 Tecnologías Utilizadas

- React 18
- Vite
- Tailwind CSS
- EmailJS
- Lucide React (íconos)
- Google Sheets API

## 📞 Soporte

Para cualquier duda o personalización adicional, contacta al desarrollador.

---

**¡Que tengan una boda maravillosa! 💕**
