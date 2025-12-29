# 📋 Guía Completa: Configuración del Formulario

## 🎯 Valores que Necesitas Obtener

Para que el formulario funcione correctamente necesitas 3 cosas:

1. **URL del Web App de Google Sheets** (para guardar las respuestas)
2. **Credenciales de EmailJS** (para enviar notificaciones por email)
3. **Correo del novio** (para recibir las notificaciones)

---

## 1️⃣ CONFIGURAR GOOGLE SHEETS

### Paso 1: Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala: **"Confirmaciones Boda Vivian & Diter"**
4. En la primera fila, agrega estos encabezados:

```
| Fecha y Hora | Nombre | Email | Teléfono | Asistirá | Invitados | Canción | Mensaje |
```

### Paso 2: Crear el Script de Apps Script

1. En tu hoja de cálculo, ve a **Extensiones** > **Apps Script**
2. **Borra** todo el código que aparece
3. **Copia y pega** este código:

```javascript
function doPost(e) {
  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos recibidos
    var data = JSON.parse(e.postData.contents);
    
    // Agregar fila con los datos
    sheet.appendRow([
      data.timestamp || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.attending === 'yes' ? 'Sí' : 'No',
      data.guests || 'N/A',
      data.song || '',
      data.message || ''
    ]);
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({result: 'success', message: 'Datos guardados correctamente'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({result: 'error', error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. **Guarda** el proyecto (Ctrl+S o el ícono de disco)
5. Ponle nombre: **"Script Formulario Boda"**

### Paso 3: Implementar como Web App

1. Haz clic en **Implementar** (arriba a la derecha) > **Nueva implementación**
2. Haz clic en el ícono de engranaje ⚙️ junto a "Seleccionar tipo"
3. Selecciona **"Aplicación web"**
4. Configura:
   - **Descripción**: "API para formulario de boda"
   - **Ejecutar como**: **Yo** (tu cuenta de Google)
   - **Quién tiene acceso**: **Cualquier persona**
5. Haz clic en **Implementar**
6. Aparecerá un aviso de autorización:
   - Haz clic en **Autorizar acceso**
   - Selecciona tu cuenta de Google
   - Haz clic en **Avanzado**
   - Haz clic en **Ir a [nombre del proyecto] (no seguro)**
   - Haz clic en **Permitir**

### Paso 4: Copiar la URL del Web App

1. Después de implementar, aparecerá una ventana con **"URL de la aplicación web"**
2. **COPIA ESTA URL COMPLETA** - se ve algo así:
   ```
   https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```
3. **IMPORTANTE**: La URL debe terminar en `/exec` (no `/edit`)

### Paso 5: Actualizar el Código

1. Abre el archivo `src/App.jsx`
2. Busca la línea 186 que dice:
   ```javascript
   const SHEET_URL = 'https://docs.google.com/spreadsheets/...';
   ```
3. Reemplaza toda esa URL con la que copiaste:
   ```javascript
   const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';
   ```

---

## 2️⃣ CONFIGURAR EMAILJS

### Paso 1: Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"** (Registrarse)
3. Completa el registro con tu email
4. Verifica tu email

### Paso 2: Agregar un Servicio de Email

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email:
   - **Gmail** (recomendado)
   - Outlook
   - Yahoo
   - Otro
4. Para Gmail:
   - Haz clic en **"Connect Account"**
   - Inicia sesión con la cuenta de Gmail del novio
   - Autoriza el acceso
5. Dale un nombre al servicio: **"Notificaciones Boda"**
6. **COPIA el "Service ID"** que aparece (ejemplo: `service_abc123`)
7. Haz clic en **"Create Service"**

### Paso 3: Crear la Plantilla de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura la plantilla:

**Subject (Asunto):**
```
Nueva confirmación de {{from_name}} para la boda
```

**Content (Contenido):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #D4AF37, #8B7355); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
    .label { font-weight: bold; color: #8B7355; }
    .highlight { color: #D4AF37; font-size: 18px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💍 Nueva Confirmación de Asistencia 💍</h1>
    </div>
    <div class="content">
      <div class="info-row">
        <span class="label">👤 Nombre:</span> {{from_name}}
      </div>
      <div class="info-row">
        <span class="label">📧 Email:</span> {{from_email}}
      </div>
      <div class="info-row">
        <span class="label">📱 Teléfono:</span> {{phone}}
      </div>
      <div class="info-row">
        <span class="label">✅ Asistencia:</span> <span class="highlight">{{attending}}</span>
      </div>
      <div class="info-row">
        <span class="label">👥 Número de Invitados:</span> {{guests}}
      </div>
      <div class="info-row">
        <span class="label">🎵 Canción Sugerida:</span> {{song}}
      </div>
      <div class="info-row">
        <span class="label">💌 Mensaje:</span><br>
        {{message}}
      </div>
      <p style="text-align: center; margin-top: 30px; color: #888; font-size: 14px;">
        Este email fue generado automáticamente desde tu landing page de boda
      </p>
    </div>
  </div>
</body>
</html>
```

4. Configura el destinatario:
   - **To Email**: `{{to_email}}`
5. Guarda la plantilla
6. **COPIA el "Template ID"** que aparece (ejemplo: `template_xyz789`)

### Paso 4: Obtener la Public Key

1. Ve a **"Account"** en el menú
2. Busca la sección **"API Keys"**
3. **COPIA tu "Public Key"** (ejemplo: `AbCdEfGhIjKlMnOp`)

### Paso 5: Actualizar el Código

Abre `src/App.jsx` y busca las líneas 210-218:

```javascript
await emailjs.send(
  'TU_SERVICE_ID',              // ← Reemplaza con tu Service ID
  'TU_TEMPLATE_ID',              // ← Reemplaza con tu Template ID
  {
    to_email: 'correo_del_novio@ejemplo.com',  // ← Email del novio
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    attending: formData.attending === 'yes' ? 'Sí asistirá' : 'No asistirá',
    guests: formData.attending === 'yes' ? formData.guests : 'N/A',
    song: formData.song || 'No especificó canción',
    message: formData.message || 'Sin mensaje adicional'
  },
  'TU_PUBLIC_KEY'                // ← Reemplaza con tu Public Key
);
```

**Ejemplo de código completado:**
```javascript
await emailjs.send(
  'service_abc123',
  'template_xyz789',
  {
    to_email: 'diter@gmail.com',
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    attending: formData.attending === 'yes' ? 'Sí asistirá' : 'No asistirá',
    guests: formData.attending === 'yes' ? formData.guests : 'N/A',
    song: formData.song || 'No especificó canción',
    message: formData.message || 'Sin mensaje adicional'
  },
  'AbCdEfGhIjKlMnOp'
);
```

---

## 3️⃣ CONFIGURAR EL CORREO DEL NOVIO

En la línea 213 de `src/App.jsx`, reemplaza:
```javascript
to_email: 'correo_del_novio@ejemplo.com',
```

Con el email real donde quieres recibir las notificaciones:
```javascript
to_email: 'diter@gmail.com',  // ← Tu email real
```

---

## ✅ RESUMEN DE VALORES A REEMPLAZAR

Abre `src/App.jsx` y reemplaza estos 4 valores:

| Línea | Buscar | Reemplazar con |
|-------|--------|----------------|
| 186 | `'https://docs.google.com/...'` | URL del Web App de Google Sheets |
| 210 | `'TU_SERVICE_ID'` | Service ID de EmailJS |
| 211 | `'TU_TEMPLATE_ID'` | Template ID de EmailJS |
| 213 | `'correo_del_novio@ejemplo.com'` | Email del novio |
| 221 | `'TU_PUBLIC_KEY'` | Public Key de EmailJS |

---

## 🧪 PROBAR EL FORMULARIO

1. Guarda todos los cambios en `src/App.jsx`
2. El servidor de desarrollo se recargará automáticamente
3. Ve al formulario en tu navegador
4. Llena el formulario con datos de prueba
5. Haz clic en "Confirmar Asistencia"

**Si todo está bien configurado:**
- ✅ Verás el mensaje: "¡Gracias! Tu confirmación ha sido enviada correctamente."
- ✅ Los datos aparecerán en tu hoja de Google Sheets
- ✅ Recibirás un email de notificación

**Si hay errores:**
- Abre la consola del navegador (F12)
- Revisa los errores en rojo
- Verifica que copiaste correctamente todos los valores

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "No se puede enviar a Google Sheets"
- Verifica que la URL termine en `/exec`
- Asegúrate de haber autorizado el script correctamente
- Revisa que el script esté implementado como "Cualquier persona"

### Error: "EmailJS no funciona"
- Verifica que los IDs estén entre comillas: `'service_abc123'`
- Asegúrate de estar conectado a internet
- Revisa que la Public Key sea correcta

### No llegan los emails
- Revisa la carpeta de spam
- Verifica que el email del novio sea correcto
- Asegúrate de que el servicio de Gmail esté conectado en EmailJS

---

## 📞 CONTACTO

Si tienes problemas con la configuración, revisa:
1. La consola del navegador (F12) para ver errores específicos
2. Los permisos de Google Apps Script
3. La configuración del servicio en EmailJS

¡Buena suerte con tu boda! 💍✨
