const fs = require('fs');
const path = 'C:\\Users\\midor\\Documents\\EnginePlugins-Wiki\\index.html';

let html = fs.readFileSync(path, 'utf8');

// Replace ChatEngine section
const chatengineNew = `      <!-- APARTADO 3: CHATENGINE -->
      <div id="tab-chatengine" class="tab-content">
        <div class="plugin-header">
          <img src="chatengine.png" alt="ChatEngine">
          <div class="plugin-header-info">
            <h1>ChatEngine</h1>
            <div class="subtitle" data-i18n="chat_sub">Gestor de chat con canales, menciones y moderación (v1.3.0).</div>
          </div>
        </div>

        <a href="https://modrinth.com/plugin/chatengine" target="_blank" rel="noopener noreferrer" class="download-link-btn">
          <span data-i18n="dl_chatengine">Descargar ChatEngine en Modrinth</span> <span>↗</span>
        </a>

        <h2 data-i18n="features">Características</h2>
        <ul>
          <li data-i18n="chat_f1"><strong>Canales:</strong> Soporte de ámbitos <code>GLOBAL</code>, <code>WORLD</code> o personalizados en <code>channels.yml</code>.</li>
          <li data-i18n="chat_f2"><strong>Menciones:</strong> Etiqueta jugadores con <code>@Nombre</code>, aplicando resaltado y alerta de sonido.</li>
          <li data-i18n="chat_f3"><strong>Filtros:</strong> Detección de enlaces, palabras restringidas y control de repetición.</li>
          <li data-i18n="chat_f4"><strong>LuckPerms:</strong> Consulta prefijos, sufijos y grupos primarios en tiempo real.</li>
          <li><strong>Java 25 Nativo:</strong> Arquitectura asíncrona compatible con Minecraft 1.21.x hasta 26.2.</li>
        </ul>

        <h2>Configuración Principal (config.yml)</h2>
        <p>Archivo de configuración generado automáticamente en <code>plugins/ChatEngine/config.yml</code>:</p>
        <pre><code># ==========================================
# ChatEngine - Configuración Principal (config.yml)
# ==========================================

chat:
  # Canal por defecto al que se conectan los jugadores al entrar
  default-channel: global

  # Cancela el chat vanilla de Bukkit para procesarlo mediante ChatEngine
  cancel-vanilla-chat: true

  # Formatos de chat (Prioridad: by-group > by-world > default)
  formats:
    # Formato general por defecto
    default: "{prefix}{player}{suffix}&7: &f{message}"

    # Formatos específicos por mundo (usa el nombre interno de la carpeta del mundo)
    by-world:
      world: "&7[&aSurvival&7] {prefix}{player}{suffix}&7: &f{message}"
      world_nether: "&7[&cNether&7] {prefix}{player}{suffix}&7: &f{message}"
      world_the_end: "&7[&dTheEnd&7] {prefix}{player}{suffix}&7: &f{message}"

    # Formatos por grupo de LuckPerms (usa el primary group del jugador)
    by-group:
      default: "&7[&fUsuario&7] {prefix}{player}{suffix}&7: &f{message}"
      vip: "&7[&aVIP&7] <gradient:#00FFAA:#00A2FF>{player}</gradient>{suffix}&7: &f{message}"
      admin: "&7[&cAdmin&7] <gradient:#FF5555:#FFAA00>{player}</gradient>{suffix}&7: &f{message}"

  # Control de permisos para colores en el chat
  colors:
    use-permissions: true      # Si es false, cualquiera puede usar colores
    allow-magic: false         # Desactiva &k para evitar abusos visuales

    legacy:
      enabled: true
      permission: "chatcolor.color.legacy" # &0-&f

    hex:
      enabled: true
      permission: "chatcolor.color.hex"    # &#RRGGBB o <#RRGGBB>

    formats:
      bold:
        enabled: true
        permission: "chatcolor.format.bold"      # &l
      italic:
        enabled: true
        permission: "chatcolor.format.italic"    # &o
      underline:
        enabled: true
        permission: "chatcolor.format.underline" # &n
      strikethrough:
        enabled: true
        permission: "chatcolor.format.strike"    # &m
      magic:
        enabled: false
        permission: "chatcolor.format.magic"     # &k

# Módulo de protección Anti-Spam
spam:
  enabled: true
  cooldown-seconds: 2          # Segundos mínimos entre cada mensaje
  repeat-window-seconds: 5     # Ventana para bloquear el envío del mismo mensaje

  bypass-permissions:
    cooldown: "chatengine.bypass.cooldown"
    repeat: "chatengine.bypass.repeat"</code></pre>

        <h2>Configuración de Canales (channels.yml)</h2>
        <p>Permite definir canales de chat independientes en <code>plugins/ChatEngine/channels.yml</code>:</p>
        <pre><code># ==========================================
# ChatEngine - Canales (channels.yml)
# ==========================================

channels:
  global:
    # Ámbito: GLOBAL (todo el servidor) o WORLD (solo jugadores en el mismo mundo)
    scope: GLOBAL
    permission-speak: "chatengine.channel.global.speak"
    permission-view: "chatengine.channel.global.view"
    format: "&7[&aGlobal&7] {prefix}{player}{suffix}&7: &f{message}"

  world:
    scope: WORLD
    permission-speak: "chatengine.channel.world.speak"
    permission-view: "chatengine.channel.world.view"
    format: "&7[&b{world}&7] {prefix}{player}{suffix}&7: &f{message}"

  staff:
    scope: GLOBAL
    permission-speak: "chatengine.channel.staff.speak"
    permission-view: "chatengine.channel.staff.view"
    format: "&c[StaffChat] &f{player}&7: &e{message}"</code></pre>

        <h2 data-i18n="commands">Comandos</h2>
        <table>
          <thead>
            <tr>
              <th data-i18n="th_cmd">Comando</th>
              <th data-i18n="th_perm">Permiso</th>
              <th data-i18n="th_desc">Función</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>/chatengine reload</code> (o <code>/ce reload</code>)</td>
              <td><code>chatengine.admin.reload</code></td>
              <td data-i18n="chat_cmd_reload">Recarga las configuraciones y canales.</td>
            </tr>
            <tr>
              <td><code>/chatengine clearchat</code></td>
              <td><code>chatengine.admin.clearchat</code></td>
              <td data-i18n="chat_cmd_clear">Limpia el chat del servidor para todos los jugadores.</td>
            </tr>
            <tr>
              <td><code>/chatengine mutechat</code></td>
              <td><code>chatengine.admin.mutechat</code></td>
              <td data-i18n="chat_cmd_mute">Mutea o desmutea el chat global.</td>
            </tr>
            <tr>
              <td><code>/channel [canal] [mensaje]</code> (o <code>/ch</code>)</td>
              <td>Variable por canal</td>
              <td data-i18n="chat_cmd_ch">Cambia de canal activo o envía un mensaje rápido.</td>
            </tr>
          </tbody>
        </table>

        <h2>Lista Completa de Permisos</h2>
        <table>
          <thead>
            <tr>
              <th>Permiso</th>
              <th>Por Defecto</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>chatengine.admin</code></td>
              <td>OP</td>
              <td>Acceso total a todos los comandos de ChatEngine.</td>
            </tr>
            <tr>
              <td><code>chatengine.admin.reload</code></td>
              <td>OP</td>
              <td>Permite recargar archivos de configuración.</td>
            </tr>
            <tr>
              <td><code>chatengine.admin.clearchat</code></td>
              <td>OP</td>
              <td>Permite limpiar el chat global.</td>
            </tr>
            <tr>
              <td><code>chatengine.admin.mutechat</code></td>
              <td>OP</td>
              <td>Permite silenciar o habilitar el chat global.</td>
            </tr>
            <tr>
              <td><code>chatengine.bypass.cooldown</code></td>
              <td>OP</td>
              <td>Omite el tiempo de espera entre mensajes.</td>
            </tr>
            <tr>
              <td><code>chatengine.bypass.repeat</code></td>
              <td>OP</td>
              <td>Omite el bloqueo de mensajes repetidos.</td>
            </tr>
            <tr>
              <td><code>chatengine.bypass.moderation</code></td>
              <td>OP</td>
              <td>Omite los filtros de palabras y enlaces prohibidos.</td>
            </tr>
            <tr>
              <td><code>chatengine.mentions</code></td>
              <td>true</td>
              <td>Permite mencionar a otros usuarios con @Jugador.</td>
            </tr>
            <tr>
              <td><code>chatcolor.color.legacy</code></td>
              <td>OP</td>
              <td>Permite usar códigos clásicos (&0-&f).</td>
            </tr>
            <tr>
              <td><code>chatcolor.color.hex</code></td>
              <td>OP</td>
              <td>Permite usar colores hexadecimales (&#RRGGBB).</td>
            </tr>
          </tbody>
        </table>

        <h2>Placeholders Soportados</h2>
        <table>
          <thead>
            <tr>
              <th>Placeholder</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{player}</code></td>
              <td>Nombre del jugador que envía el mensaje.</td>
            </tr>
            <tr>
              <td><code>{prefix}</code></td>
              <td>Prefijo del jugador obtenido de LuckPerms o Vault.</td>
            </tr>
            <tr>
              <td><code>{suffix}</code></td>
              <td>Sufijo del jugador obtenido de LuckPerms o Vault.</td>
            </tr>
            <tr>
              <td><code>{world}</code></td>
              <td>Nombre del mundo en el que se encuentra el jugador.</td>
            </tr>
            <tr>
              <td><code>{message}</code></td>
              <td>Contenido del mensaje enviado.</td>
            </tr>
            <tr>
              <td><code>PlaceholderAPI</code></td>
              <td>Soporte total para cualquier placeholder de PAPI (ej. <code>%vault_eco_balance%</code>).</td>
            </tr>
          </tbody>
        </table>

        <h2 data-i18n="changelog_title">Registro de Cambios (Logs)</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 100px;" data-i18n="th_version">Versión</th>
              <th data-i18n="th_changes">Detalles del Cambio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>1.3.0</code></td>
              <td data-i18n="ce_log_130">Compilado y optimizado para Java 25 (bytecode 69) y Minecraft 1.21.x-26.2. Pipeline de procesamiento asíncrono y sistema de menciones @player con alertas sonoras.</td>
            </tr>
            <tr>
              <td><code>1.2.1</code></td>
              <td data-i18n="ce_log_121">Integración nativa con LuckPerms y PlaceholderAPI. Soporte para formato MiniMessage y gradientes hexadecimales RGB.</td>
            </tr>
            <tr>
              <td><code>1.1.0</code></td>
              <td data-i18n="ce_log_110">Soporte multicanal personalizable mediante channels.yml y rangos de chat por mundo.</td>
            </tr>
            <tr>
              <td><code>1.0.0</code></td>
              <td data-i18n="ce_log_100">Versión inicial con moderación (/clearchat, /mutechat) y filtro anti-spam.</td>
            </tr>
          </tbody>
        </table>
      </div>`;

// Replace GUIEngine section
const guiengineNew = `      <!-- APARTADO GUIENGINE -->
      <div id="tab-guiengine" class="tab-content">
        <div class="plugin-header">
          <img src="guiengine.png" alt="GUIEngine">
          <div class="plugin-header-info">
            <h1>GUIEngine</h1>
            <div class="subtitle" data-i18n="gui_sub">Framework de interfaces de inventario y menús interactivos.</div>
          </div>
        </div>

        <a href="https://modrinth.com/plugin/gui-engine" target="_blank" rel="noopener noreferrer" class="download-link-btn">
          <span data-i18n="dl_guiengine">Descargar GUIEngine en Modrinth</span> <span>↗</span>
        </a>

        <h2 data-i18n="features">Características</h2>
        <ul>
          <li data-i18n="gui_f1"><strong>Motor de Menús Seguro:</strong> Previene la extracción, duplicación o movimiento indebido de ítems en interfaces.</li>
          <li data-i18n="gui_f2"><strong>Renderizado de Componentes:</strong> Soporte directo de texto Adventure y MiniMessage en nombres y descripciones.</li>
          <li data-i18n="gui_f3"><strong>Modular:</strong> Diseñado para servir como base para sistemas de tiendas, selección de modalidad y votaciones.</li>
          <li><strong>Gestión de Eventos Automática:</strong> Cancelación de eventos no deseados en clics rápidos o atajos de teclado (números del hotbar, drop, shift-click).</li>
        </ul>

        <h2>Seguridad y Protección Antidupe</h2>
        <p>GUIEngine implementa una capa estricta de validación sobre el ciclo de vida de los inventarios de Spigot/Paper:</p>
        <ul>
          <li><strong>Cancelación Obligatoria:</strong> <code>InventoryClickEvent</code> y <code>InventoryDragEvent</code> están blindados para evitar que los jugadores saquen ítems decorativos.</li>
          <li><strong>Control de Cierre:</strong> Manejo seguro con <code>InventoryCloseEvent</code> para limpieza de memoria y eliminación de listeners temporales.</li>
          <li><strong>Prevención de Clicks Fantasma:</strong> Verificación de identificadores únicos (UUID) por sesión de menú.</li>
        </ul>

        <h2>Ejemplo de Integración (API para Desarrolladores)</h2>
        <p>Ejemplo de creación de un menú interactivo protegido con callbacks usando la API de GUIEngine:</p>
        <pre><code>// Creación de un menú de 27 slots (3 filas)
GUIEngineMenu menu = new GUIEngineMenu("Menú Principal", 27);

// Configuración de un botón interactivo
ItemStack item = new ItemBuilder(Material.COMPASS)
    .name("&a&lSelector de Modalidades")
    .lore("&7Haz clic para abrir el menú de servidores.")
    .build();

menu.setItem(13, item, (player, clickType) -> {
    player.sendMessage("§aAbriendo servidor Survival...");
    player.closeInventory();
});

// Relleno estético de bordes
menu.fillBorders(Material.BLACK_STAINED_GLASS_PANE);

// Apertura segura para el jugador
menu.open(player);</code></pre>

        <h2 data-i18n="changelog_title">Registro de Cambios (Logs)</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 100px;" data-i18n="th_version">Versión</th>
              <th data-i18n="th_changes">Detalles del Cambio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>1.0.0</code></td>
              <td data-i18n="ge_log_100">Lanzamiento del motor central. Protección contra robo de ítems en GUI, compatibilidad con Adventure API y callbacks asíncronos para clics en inventarios.</td>
            </tr>
          </tbody>
        </table>
      </div>`;

// Replace PollEngine section
const pollengineNew = `      <!-- APARTADO 4: POLLENGINE -->
      <div id="tab-pollengine" class="tab-content">
        <div class="plugin-header">
          <img src="pollengine.png" alt="PollEngine">
          <div class="plugin-header-info">
            <h1>PollEngine</h1>
            <div class="subtitle" data-i18n="poll_sub">Sistema de encuestas interactivas con interfaz gráfica (v2.0.0).</div>
          </div>
        </div>

        <a href="https://modrinth.com/plugin/pollengine" target="_blank" rel="noopener noreferrer" class="download-link-btn">
          <span data-i18n="dl_pollengine">Descargar PollEngine en Modrinth</span> <span>↗</span>
        </a>

        <h2 data-i18n="features">Características</h2>
        <ul>
          <li><strong>Interfaz GUI Interactiva:</strong> Los usuarios votan haciendo clic en el menú sin tener que escribir comandos complejos.</li>
          <li><strong>Temporizador y Anuncio Automático:</strong> Cuenta atrás configurable con anuncio en el chat y pantalla al terminar.</li>
          <li><strong>Cambio de Voto Flexible:</strong> Opción para permitir a los jugadores rectificar su elección mientras la encuesta siga activa.</li>
          <li><strong>Recuento en Vivo:</strong> Consulta los porcentajes y votos totales en cualquier momento con <code>/poll results</code>.</li>
        </ul>

        <h2>Configuración Principal (config.yml)</h2>
        <p>Configuración completa con soporte de sonidos, mensajes y temporizador en <code>plugins/PollEngine/config.yml</code>:</p>
        <pre><code># ==========================================
# PollEngine - Configuración Principal (config.yml)
# ==========================================

settings:
  # Título que se muestra en la interfaz gráfica del menú de votación
  # Admite etiquetas MiniMessage (<gradient>, <bold>, etc.)
  gui-title: "<gradient:#FFAA00:#FF5500><bold>PollEngine</bold></gradient> <dark_gray>| <gray>Votación"
  
  # Duración predeterminada de la encuesta en segundos al crearla sin especificar tiempo
  # (0 = duración ilimitada, se cierra manualmente con /poll end)
  default-duration-seconds: 120
  
  # Si es true, los jugadores pueden cambiar su voto mientras la votación siga abierta
  allow-change-vote: true
  
  # Efectos de sonido en acciones (nombres de sonidos de Bukkit, dejar vacío para desactivar)
  sounds:
    open-menu: "BLOCK_CHEST_OPEN"
    vote-success: "ENTITY_PLAYER_LEVELUP"
    vote-already: "ENTITY_VILLAGER_NO"
    poll-start: "ENTITY_EXPERIENCE_ORB_PICKUP"
    poll-end: "UI_TOAST_CHALLENGE_COMPLETE"

# Mensajes del sistema
messages:
  prefix: "<gradient:#FFAA00:#FF5500><bold>PollEngine</bold></gradient> <dark_gray>| <gray>"
  no-permission: "<red>No tienes permiso para ejecutar este comando."
  no-active-poll: "<yellow>No hay ninguna encuesta activa en este momento."
  already-voted: "<yellow>Ya has votado por: <white>{option}<yellow>."
  vote-changed: "<green>Tu voto ha sido actualizado a: <white>{option}<green>."
  vote-registered: "<green>¡Gracias por votar! Tu opción: <white>{option}<green>."
  poll-created: "<green>¡Una nueva encuesta ha comenzado!<newline><gray>Pregunta: <yellow>{question}<newline><gray>Usa <gold>/poll<gray> para votar."
  poll-ended-broadcast: "<gold><bold>¡Encuesta Finalizada!</bold><newline><gray>Pregunta: <yellow>{question}<newline><gray>Ganador: <green>{winner} <dark_gray>({winner_votes} votos)"
  poll-results-header: "<gradient:#FFAA00:#FF5500><bold>--- Resultados de la Encuesta ---</bold></gradient><newline><gray>Pregunta: <yellow>{question}<newline><gray>Total de votos: <white>{total_votes}"
  poll-results-entry: "<gray>  <white>{option}: <gold>{votes} votos <dark_gray>({percent}%)"
  config-reloaded: "<green>Configuración de PollEngine recargada correctamente."</code></pre>

        <h2 data-i18n="poll_h2_create">Creación de Encuestas</h2>
        <p>Sintaxis del comando para administradores:</p>
        <pre><code>/poll start &lt;Pregunta&gt; | &lt;Opción 1&gt; | &lt;Opción 2&gt; ... [segundos]

# Ejemplo con 2 opciones y 60 segundos:
/poll start ¿Reiniciar el mundo Nether? | Sí | No 60

# Ejemplo con 3 opciones y 120 segundos:
/poll start ¿Qué evento prefieres el sábado? | PvP Arena | Parkour | Spleef 120</code></pre>

        <h2 data-i18n="commands">Comandos</h2>
        <table>
          <thead>
            <tr>
              <th data-i18n="th_cmd">Comando</th>
              <th data-i18n="th_perm">Permiso</th>
              <th data-i18n="th_desc">Función</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>/poll</code> (o <code>/poll vote</code>)</td>
              <td><code>pollengine.vote</code></td>
              <td data-i18n="poll_cmd_vote">Abre el menú interactivo para votar.</td>
            </tr>
            <tr>
              <td><code>/poll results</code></td>
              <td>Todos</td>
              <td data-i18n="poll_cmd_res">Muestra el recuento de la encuesta actual o previa.</td>
            </tr>
            <tr>
              <td><code>/poll start &lt;...&gt;</code></td>
              <td><code>pollengine.admin.start</code></td>
              <td data-i18n="poll_cmd_start">Inicia una votación con temporizador.</td>
            </tr>
            <tr>
              <td><code>/poll end</code></td>
              <td><code>pollengine.admin.end</code></td>
              <td data-i18n="poll_cmd_end">Cierra la encuesta y anuncia al ganador.</td>
            </tr>
            <tr>
              <td><code>/poll reload</code></td>
              <td><code>pollengine.admin.reload</code></td>
              <td data-i18n="poll_cmd_reload">Recarga el archivo config.yml.</td>
            </tr>
          </tbody>
        </table>

        <h2>Permisos</h2>
        <table>
          <thead>
            <tr>
              <th>Permiso</th>
              <th>Por Defecto</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>pollengine.vote</code></td>
              <td>true (todos)</td>
              <td>Permite abrir el menú y emitir un voto en encuestas activas.</td>
            </tr>
            <tr>
              <td><code>pollengine.admin</code></td>
              <td>OP</td>
              <td>Acceso administrativo completo a PollEngine.</td>
            </tr>
            <tr>
              <td><code>pollengine.admin.start</code></td>
              <td>OP</td>
              <td>Permite iniciar nuevas encuestas.</td>
            </tr>
            <tr>
              <td><code>pollengine.admin.end</code></td>
              <td>OP</td>
              <td>Permite finalizar manualmente una encuesta activa.</td>
            </tr>
            <tr>
              <td><code>pollengine.admin.reload</code></td>
              <td>OP</td>
              <td>Permite recargar la configuración del plugin.</td>
            </tr>
          </tbody>
        </table>

        <h2 data-i18n="changelog_title">Registro de Cambios (Logs)</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 100px;" data-i18n="th_version">Versión</th>
              <th data-i18n="th_changes">Detalles del Cambio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>2.0.0</code></td>
              <td data-i18n="pe_log_200">Reescritura completa para Java 25 y Paper 26.2. Menú de votación en GUI con recuento en tiempo real, soporte de cambio de voto y anuncio de resultados automatizado.</td>
            </tr>
            <tr>
              <td><code>1.0.0</code></td>
              <td data-i18n="pe_log_100">Versión inicial de encuestas por chat con temporizador básico.</td>
            </tr>
          </tbody>
        </table>
      </div>`;

// Replace MotdEngine section
const motdengineNew = `      <!-- APARTADO 5: MOTDENGINE -->
      <div id="tab-motdengine" class="tab-content">
        <div class="plugin-header">
          <img src="motdengine.png" alt="MotdEngine">
          <div class="plugin-header-info">
            <h1>MotdEngine</h1>
            <div class="subtitle" data-i18n="motd_sub">Personalizador de servidor, lista de jugadores y mantenimiento (v2.0.0).</div>
          </div>
        </div>

        <a href="https://modrinth.com/plugin/motdengine" target="_blank" rel="noopener noreferrer" class="download-link-btn">
          <span data-i18n="dl_motdengine">Descargar MotdEngine en Modrinth</span> <span>↗</span>
        </a>

        <h2 data-i18n="motd_h2_modes">Modos de Operación</h2>
        <ul>
          <li data-i18n="motd_m1"><strong>ROTATING:</strong> Rotación periódica asíncrona cada X segundos.</li>
          <li data-i18n="motd_m2"><strong>RANDOM:</strong> Selecciona un mensaje al azar en cada ping.</li>
          <li data-i18n="motd_m3"><strong>STATIC:</strong> Muestra un único mensaje fijo.</li>
        </ul>

        <h2>Configuración Principal (config.yml)</h2>
        <p>Configuración completa para MOTD, hover de jugadores y mantenimiento en <code>plugins/MotdEngine/config.yml</code>:</p>
        <pre><code># ==========================================
# MotdEngine - Configuración Principal (config.yml)
# ==========================================

# Configuración del mensaje en la lista de servidores
motd:
  # Modos disponibles:
  # - "ROTATING": Rota cíclicamente los mensajes cada X segundos
  # - "RANDOM": Elige un mensaje al azar en cada ping de un jugador
  # - "STATIC": Muestra siempre el primer mensaje de la lista
  mode: "ROTATING"

  # Intervalo de rotación en segundos cuando el modo es ROTATING
  rotation-interval-seconds: 15

  # Lista de mensajes MOTD (Usa \\n o <newline> para separar línea 1 y línea 2)
  # Soporta MiniMessage (<gradient>, <rainbow>, <bold>) y códigos clásicos (&a-&f)
  messages:
    - "<gradient:#00FFAA:#00A2FF><bold>¡Bienvenido a Nuestro Servidor!</bold></gradient>\\n<gray>Survival Custom, Minijuegos & Creativo <dark_gray>• <yellow>¡Únete ya!"
    - "<gradient:#FFAA00:#FF5500><bold>La Mejor Experiencia Minecraft</bold></gradient>\\n<gray>Eventos especiales de fin de semana activos <dark_gray>• <green>Juega con amigos"
    - "<gradient:#FF55FF:#AA00AA><bold>Actualizado a la última versión 26.2</bold></gradient>\\n<gray>Rendimiento óptimo sin lag <dark_gray>• <aqua>¡Te esperamos!"

# Personalización del recuento de jugadores y slots
player-count:
  # Si es true, sobrescribe el límite de jugadores del server.properties
  override-max-players: false
  # Límite estático de jugadores (si override-max-players es true y dynamic-max es false)
  max-players: 100
  # Si es true, el máximo siempre será (jugadores_conectados + dynamic-addition)
  dynamic-max: true
  dynamic-addition: 1

# Menú emergente al pasar el ratón sobre el recuento de jugadores
player-hover:
  enabled: true
  lines:
    - "<gradient:#00FFAA:#00A2FF><bold>--- INFORMACIÓN DEL SERVIDOR ---</bold></gradient>"
    - "<gray>Jugadores en línea: <yellow>{online} <dark_gray>/ <yellow>{max}"
    - "<gray>Comunidad Discord: <aqua>discord.gg/tuservidor"
    - "<gray>Tienda Oficial: <gold>tienda.tuservidor.net"
    - "<green>¡Que disfrutes de tu estancia!"

# Sistema de Modo Mantenimiento
maintenance:
  enabled: false
  # MOTD mostrado cuando el mantenimiento está activo
  motd: "<gradient:#FF0000:#FF5555><bold>SERVIDOR EN MANTENIMIENTO</bold></gradient>\\n<gray>Volveremos en breve. Consulta nuestro Discord para más noticias."
  # Mensaje de desconexión al intentar entrar sin permiso de bypass
  kick-message: "<red><bold>¡El servidor se encuentra actualmente en mantenimiento!</bold></red><newline><gray>Por favor, inténtalo más tarde o visita nuestro Discord."
  # Texto que reemplaza el número de versión en el cliente de Minecraft
  custom-version-text: "<red>Mantenimiento"

# Mensajes del plugin
messages:
  prefix: "<gradient:#00FFAA:#00A2FF><bold>MotdEngine</bold></gradient> <dark_gray>| <gray>"
  no-permission: "<red>No tienes permiso para ejecutar este comando."
  config-reloaded: "<green>¡Configuración de MotdEngine recargada correctamente!"
  maintenance-toggled: "<yellow>El modo mantenimiento ahora está: {status}"
  maintenance-on: "<red><bold>ACTIVADO</bold></red>"
  maintenance-off: "<green><bold>DESACTIVADO</bold></green>"
  motd-set: "<green>MOTD estático establecido: <white>{motd}"</code></pre>

        <h2 data-i18n="commands">Comandos</h2>
        <table>
          <thead>
            <tr>
              <th data-i18n="th_cmd">Comando</th>
              <th data-i18n="th_perm">Permiso</th>
              <th data-i18n="th_desc">Función</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>/motd maintenance [on|off]</code></td>
              <td><code>motdengine.admin</code></td>
              <td data-i18n="motd_cmd_maint">Activa o desactiva el mantenimiento.</td>
            </tr>
            <tr>
              <td><code>/motd preview</code></td>
              <td><code>motdengine.admin</code></td>
              <td data-i18n="motd_cmd_prev">Muestra en el chat el MOTD activo.</td>
            </tr>
            <tr>
              <td><code>/motd set &lt;mensaje&gt;</code></td>
              <td><code>motdengine.admin</code></td>
              <td data-i18n="motd_cmd_set">Configura un mensaje estático directo.</td>
            </tr>
            <tr>
              <td><code>/motd reload</code></td>
              <td><code>motdengine.admin</code></td>
              <td data-i18n="motd_cmd_rel">Recarga configuraciones y mensajes.</td>
            </tr>
          </tbody>
        </table>

        <h2>Permisos</h2>
        <table>
          <thead>
            <tr>
              <th>Permiso</th>
              <th>Por Defecto</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>motdengine.admin</code></td>
              <td>OP</td>
              <td>Permite usar todos los comandos administrativos de /motd.</td>
            </tr>
            <tr>
              <td><code>motdengine.maintenance.bypass</code></td>
              <td>OP</td>
              <td>Permite conectarse y jugar en el servidor mientras el modo mantenimiento esté activado.</td>
            </tr>
          </tbody>
        </table>

        <h2 data-i18n="changelog_title">Registro de Cambios (Logs)</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 100px;" data-i18n="th_version">Versión</th>
              <th data-i18n="th_changes">Detalles del Cambio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>2.0.0</code></td>
              <td data-i18n="me_log_200">Adaptación completa a Java 25 y Paper Profile API (ServerListPingEvent). Modos ROTATING, RANDOM y STATIC. Modo de mantenimiento con bypass para administradores y hover personalizado.</td>
            </tr>
            <tr>
              <td><code>1.0.0</code></td>
              <td data-i18n="me_log_100">Lanzamiento inicial de gestor de mensajes MOTD para la lista de servidores.</td>
            </tr>
          </tbody>
        </table>
      </div>`;

// Regex matching each section
const reChat = /<!-- APARTADO 3: CHATENGINE -->[\s\S]*?<\/div>\s*(?=<!-- APARTADO GUIENGINE -->)/;
const reGui = /<!-- APARTADO GUIENGINE -->[\s\S]*?<\/div>\s*(?=<!-- APARTADO 4: POLLENGINE -->)/;
const rePoll = /<!-- APARTADO 4: POLLENGINE -->[\s\S]*?<\/div>\s*(?=<!-- APARTADO 5: MOTDENGINE -->)/;
const reMotd = /<!-- APARTADO 5: MOTDENGINE -->[\s\S]*?<\/div>\s*(?=<!-- APARTADO 6: FORMATOS -->)/;

html = html.replace(reChat, chatengineNew + '\n\n      ');
html = html.replace(reGui, guiengineNew + '\n\n      ');
html = html.replace(rePoll, pollengineNew + '\n\n      ');
html = html.replace(reMotd, motdengineNew + '\n\n      ');

fs.writeFileSync(path, html, 'utf8');
console.log('Update complete. New file length:', html.length);
