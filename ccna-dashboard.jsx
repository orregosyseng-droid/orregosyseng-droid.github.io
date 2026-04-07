import { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  Target,
  AlertTriangle,
  Lightbulb,
  Clock,
  BookOpen,
  Beaker,
  ExternalLink,
  Trophy,
  Flame,
  Network,
  Layers,
  Zap,
  Calendar,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

// ============================================================
// DATA: 14-week CCNA 200-301 study plan
// ============================================================

const PHASES = [
  { id: 1, name: "Fundamentos", weeks: [1, 2], color: "emerald" },
  { id: 2, name: "Direccionamiento IP", weeks: [3, 4], color: "cyan" },
  { id: 3, name: "Switching", weeks: [5, 6], color: "violet" },
  { id: 4, name: "Routing", weeks: [7, 8, 9], color: "amber" },
  { id: 5, name: "Servicios y Seguridad", weeks: [10, 11], color: "rose" },
  { id: 6, name: "Wireless y Cierre", weeks: [12, 13, 14], color: "fuchsia" },
];

const PLAYLIST = "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ";

const PLAN = [
  {
    week: 1,
    phaseId: 1,
    title: "Fundamentos de redes y modelo OSI",
    bigGoal:
      "Entender qué es una red, dominar OSI / TCP-IP y la encapsulación. Tu cimiento para todo lo que viene.",
    objectives: [
      "Diferenciar LAN, WAN, WLAN, MAN con ejemplos reales",
      "Recitar las 7 capas OSI: número, función y PDU",
      "Mapear OSI ↔ TCP/IP sin dudarlo",
      "Explicar encapsulación / desencapsulación paso a paso",
      "Identificar tipos de cable UTP y fibra y cuándo usar cada uno",
    ],
    days: [
      {
        label: "Lunes",
        topic: "¿Qué es una red? Componentes y topologías",
        hours: 2,
        theory: [
          "Propósito real de una red: compartir recursos",
          "End devices vs intermediary devices vs media vs protocolos",
          "Tipos: LAN, WAN, WLAN, MAN, PAN, SAN",
          "Topología física vs lógica (estrella, malla, bus, anillo)",
        ],
        markers: [
          {
            type: "warning",
            text: "Trampa: 'host' en CCNA = end device con IP. Un switch L2 puro no es host.",
          },
          {
            type: "tip",
            text: "LAN vs WAN no es solo geografía: es propiedad y control.",
          },
        ],
        lab: "Dibuja la topología de tu red doméstica con todos los dispositivos. Identifica end vs intermediary devices.",
        resources: [
          { label: "Jeremy's IT Lab — Day 1: Network Devices", url: PLAYLIST },
        ],
      },
      {
        label: "Martes",
        topic: "Modelo OSI — las 7 capas",
        hours: 3,
        theory: [
          "Por qué existe OSI: estandarizar y separar responsabilidades",
          "Capa 1 Física, 2 Enlace, 3 Red, 4 Transporte, 5 Sesión, 6 Presentación, 7 Aplicación",
          "Función específica y PDU de cada capa (Bits, Frames, Packets, Segments, Data)",
          "Mnemotecnia: 'Please Do Not Throw Sausage Pizza Away'",
          "Dispositivos por capa: hub L1, switch L2, router L3, firewall L3-L7",
        ],
        markers: [
          {
            type: "target",
            text: "Pregunta clásica: identifica en qué capa opera un dispositivo o protocolo.",
          },
          {
            type: "warning",
            text: "Un switch L3 (multilayer) opera en L2 y L3 simultáneamente.",
          },
        ],
        lab: "Crea tu propia tabla OSI completa de memoria, sin mirar. Repítelo hasta hacerlo en menos de 2 minutos.",
        resources: [
          { label: "Jeremy's IT Lab — OSI Model", url: PLAYLIST },
        ],
      },
      {
        label: "Miércoles",
        topic: "TCP/IP, encapsulación y PDUs",
        hours: 2.5,
        theory: [
          "Modelo TCP/IP de 4 capas (Link, Internet, Transport, Application) y de 5 capas",
          "Mapeo OSI ↔ TCP/IP",
          "Encapsulación: cómo se construye un frame desde la app hasta los bits",
          "Desencapsulación: cómo lo deshace el receptor",
          "Headers que se agregan en cada capa",
        ],
        markers: [
          {
            type: "target",
            text: "Memoriza qué header pertenece a qué capa: muy preguntado.",
          },
          {
            type: "tip",
            text: "Cuando dudes en una pregunta, dibuja la pila y anota qué pasa en cada capa.",
          },
        ],
        lab: "Dibuja paso a paso la encapsulación de un ping desde una PC hasta otra PC en otra red.",
        resources: [
          { label: "Jeremy's IT Lab — TCP/IP Suite", url: PLAYLIST },
        ],
      },
      {
        label: "Jueves",
        topic: "Medios físicos: cobre, fibra y conectores",
        hours: 2.5,
        theory: [
          "UTP categorías: Cat5e, Cat6, Cat6a, Cat7 — anchos de banda y distancias",
          "Straight-through vs crossover vs rollover (auto-MDIX hoy día)",
          "Fibra: single-mode (largas distancias, láser) vs multi-mode (cortas, LED)",
          "Conectores: RJ-45, LC, SC, ST",
          "Wireless básico: 2.4 GHz vs 5 GHz, alcance vs velocidad",
        ],
        markers: [
          {
            type: "warning",
            text: "Crossover ya casi no se usa por auto-MDIX, pero CCNA aún pregunta cuándo se requeriría.",
          },
        ],
        lab: "Tabla comparativa de cables: tipo, distancia máxima, velocidad, uso típico.",
        resources: [
          { label: "Jeremy's IT Lab — Network Media", url: PLAYLIST },
        ],
      },
      {
        label: "Viernes",
        topic: "Lab integrador + Quiz semanal",
        hours: 3,
        theory: [
          "Repaso rápido de los 4 días",
          "Conexión de conceptos: cómo se relacionan OSI, encapsulación y medios",
        ],
        markers: [
          {
            type: "tip",
            text: "Si fallas más de 3 preguntas del quiz, repasa el tema antes de avanzar.",
          },
        ],
        lab: "Packet Tracer: conecta 4 PCs a un switch, configura IPs estáticas, haz ping entre todas. Captura simulación de un ping y observa la encapsulación capa por capa.",
        resources: [
          { label: "Cisco Packet Tracer (descarga oficial)", url: "https://www.netacad.com/cisco-packet-tracer" },
        ],
      },
    ],
  },
  {
    week: 2,
    phaseId: 1,
    title: "Ethernet, MAC, ARP y switch básico",
    bigGoal:
      "Entender cómo funciona realmente Ethernet, qué hace un switch por dentro, y cómo ARP conecta L2 con L3.",
    objectives: [
      "Describir el frame Ethernet y cada uno de sus campos",
      "Explicar cómo un switch construye su MAC address table",
      "Diferenciar dominios de colisión y broadcast",
      "Explicar el proceso ARP completo",
      "Navegar el CLI de Cisco IOS con confianza",
    ],
    days: [
      {
        label: "Lunes",
        topic: "Ethernet y direcciones MAC",
        hours: 2.5,
        theory: [
          "Frame Ethernet: preamble, MAC dest, MAC src, type/length, payload, FCS",
          "Estructura MAC: OUI + NIC specific, formato hexadecimal",
          "Unicast, multicast y broadcast a nivel MAC",
          "CSMA/CD (histórico) y por qué ya no importa con switches full-duplex",
        ],
        markers: [
          { type: "target", text: "Reconocer una MAC broadcast: FF:FF:FF:FF:FF:FF" },
        ],
        lab: "Identifica la MAC de tu propia tarjeta. Decodifica su OUI buscando el fabricante.",
        resources: [{ label: "Jeremy's IT Lab — Ethernet LAN Switching", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "Cómo funciona un switch L2",
        hours: 2.5,
        theory: [
          "MAC address table: cómo se llena (learning)",
          "Forwarding: known unicast vs unknown unicast (flooding)",
          "Broadcast siempre se inunda",
          "Aging time, full-duplex, micro-segmentación",
          "Dominio de colisión por puerto, dominio de broadcast por VLAN",
        ],
        markers: [
          {
            type: "target",
            text: "Pregunta clásica: '¿qué hace el switch al recibir un frame con MAC destino desconocida?'",
          },
        ],
        lab: "En Packet Tracer: 4 PCs + 1 switch. Haz ping entre A y B, luego revisa 'show mac address-table'. Observa cómo se llena.",
        resources: [{ label: "Jeremy's IT Lab — Switch Operation", url: PLAYLIST }],
      },
      {
        label: "Miércoles",
        topic: "ARP — el puente entre L2 y L3",
        hours: 2,
        theory: [
          "Por qué existe ARP: para enviar L2 necesito MAC destino",
          "ARP request (broadcast) y ARP reply (unicast)",
          "Tabla ARP, aging",
          "Gratuitous ARP y proxy ARP (concepto)",
        ],
        markers: [
          {
            type: "warning",
            text: "ARP solo dentro de la misma subred. Para destinos fuera, ARP por la MAC del default gateway.",
          },
        ],
        lab: "En PT: borra la tabla ARP, captura un ping en simulación, observa el ARP request/reply ANTES del ICMP.",
        resources: [{ label: "Jeremy's IT Lab — ARP", url: PLAYLIST }],
      },
      {
        label: "Jueves",
        topic: "Cisco IOS CLI básico",
        hours: 3,
        theory: [
          "Modos: user EXEC (>), privileged EXEC (#), global config, interface config, line config",
          "Comandos: enable, configure terminal, hostname, interface, exit, end",
          "Configurar contraseñas: enable secret, line console, line vty",
          "Banner motd, no ip domain-lookup, logging synchronous",
          "Guardar config: copy running-config startup-config (write memory)",
          "Show comandos: show running-config, show ip interface brief, show version",
        ],
        markers: [
          {
            type: "target",
            text: "Saber los modos y cómo navegar entre ellos es base para TODO el examen.",
          },
          {
            type: "tip",
            text: "Tab autocompleta, ? muestra opciones, flecha arriba reusa comandos.",
          },
        ],
        lab: "En PT: configura un switch nuevo: hostname, banner, contraseñas, gateway, IP de gestión en VLAN 1.",
        resources: [{ label: "Jeremy's IT Lab — Cisco IOS CLI", url: PLAYLIST }],
      },
      {
        label: "Viernes",
        topic: "Lab integrador + Quiz semana 2",
        hours: 3,
        theory: ["Repaso de Ethernet, switching y CLI"],
        markers: [],
        lab: "Topología: 2 switches conectados, 2 PCs en cada uno. Configura todo, verifica conectividad, revisa MAC tables y ARP en cada PC. Documenta los comandos usados.",
        resources: [],
      },
    ],
  },
  {
    week: 3,
    phaseId: 2,
    title: "IPv4 y subnetting básico",
    bigGoal:
      "Dominar el direccionamiento IPv4 y empezar a hacer subnetting con confianza. Esta es zona caliente del examen.",
    objectives: [
      "Descomponer un header IPv4 campo por campo",
      "Diferenciar direcciones públicas, privadas (RFC1918) y especiales",
      "Calcular network ID, broadcast y rango de hosts para cualquier /N",
      "Hacer subnetting básico de /24 a /30 sin calculadora",
    ],
    days: [
      {
        label: "Lunes",
        topic: "Header IPv4 y tipos de direcciones",
        hours: 2.5,
        theory: [
          "Campos del header IPv4: version, IHL, TTL, protocol, src, dst, etc.",
          "Clases A, B, C, D, E (histórico, pero pregunta posible)",
          "Direcciones privadas RFC1918: 10/8, 172.16/12, 192.168/16",
          "Especiales: 127.0.0.0/8 loopback, 169.254/16 APIPA, 0.0.0.0",
        ],
        markers: [
          { type: "target", text: "Reconocer rangos privados al instante." },
        ],
        lab: "Lista 10 IPs y clasifica cada una: pública, privada, loopback, APIPA, multicast.",
        resources: [{ label: "Jeremy's IT Lab — IPv4 Addressing", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "Máscara de subred y notación CIDR",
        hours: 2.5,
        theory: [
          "Qué hace realmente la máscara: separa network de host",
          "Notación decimal vs CIDR (/24 = 255.255.255.0)",
          "Bits de red vs bits de host: la fórmula 2^h - 2",
          "Cómo identificar a qué red pertenece una IP",
        ],
        markers: [
          {
            type: "warning",
            text: "Una IP por sí sola no significa nada. Siempre necesitas la máscara.",
          },
        ],
        lab: "Para 10 pares (IP, máscara), calcula network ID y broadcast a mano.",
        resources: [{ label: "Jeremy's IT Lab — Subnet Mask", url: PLAYLIST }],
      },
      {
        label: "Miércoles",
        topic: "Subnetting práctico parte 1",
        hours: 3,
        theory: [
          "Cómo 'pedir prestados' bits para crear subredes",
          "Tabla mental de magic number para /24, /25, /26, /27, /28, /29, /30",
          "Calcular network, primer host, último host, broadcast",
          "Cuántas subredes y cuántos hosts por subred",
        ],
        markers: [
          {
            type: "target",
            text: "Esta habilidad debe volverse automática. Practica diario hasta el examen.",
          },
        ],
        lab: "Resuelve 20 ejercicios: dada una IP/máscara, encuentra network, broadcast y rango.",
        resources: [
          { label: "subnettingpractice.com", url: "https://subnettingpractice.com" },
        ],
      },
      {
        label: "Jueves",
        topic: "Subnetting práctico parte 2 + diseño",
        hours: 3,
        theory: [
          "Diseño top-down: cuántas subredes necesito y de qué tamaño",
          "Asignación de subredes a departamentos / sucursales",
          "Determinar la máscara mínima para X hosts",
        ],
        markers: [
          {
            type: "warning",
            text: "Recuerda restar 2 hosts: network ID y broadcast no son asignables.",
          },
        ],
        lab: "Diseña el direccionamiento de una empresa con 4 sucursales (50, 25, 10, 5 hosts) usando 192.168.10.0/24.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Mega-práctica de subnetting + Quiz",
        hours: 3,
        theory: ["Repaso a velocidad de examen"],
        markers: [
          { type: "tip", text: "Meta: resolver una pregunta de subnetting en menos de 45 segundos." },
        ],
        lab: "30 ejercicios cronometrados. Si fallas más de 5, repite el bloque entero.",
        resources: [{ label: "subnetting.org practice", url: "https://www.subnetting.org" }],
      },
    ],
  },
  {
    week: 4,
    phaseId: 2,
    title: "VLSM, summarization e IPv6",
    bigGoal:
      "Cerrar el direccionamiento con VLSM, ruta-summary e IPv6 a un nivel funcional para CCNA.",
    objectives: [
      "Aplicar VLSM correctamente a un escenario empresarial",
      "Resumir múltiples redes en una ruta agregada",
      "Comprimir y expandir direcciones IPv6",
      "Configurar IPv6 estático en una interfaz",
      "Explicar SLAAC, EUI-64 y NDP a alto nivel",
    ],
    days: [
      {
        label: "Lunes",
        topic: "VLSM (Variable Length Subnet Mask)",
        hours: 3,
        theory: [
          "Por qué VLSM: eficiencia de direcciones",
          "Estrategia: ordenar de mayor a menor requerimiento de hosts",
          "Asignar el bloque más grande primero, luego los siguientes",
        ],
        markers: [
          { type: "target", text: "Aparece en sims y en preguntas de diseño." },
        ],
        lab: "Diseña con VLSM: 192.168.1.0/24 para 100, 50, 25 y 2 (enlace WAN) hosts.",
        resources: [{ label: "Jeremy's IT Lab — VLSM", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "Route summarization (supernetting)",
        hours: 2,
        theory: [
          "Qué es y para qué sirve (reducir tabla de enrutamiento)",
          "Encontrar el prefijo común a varias subredes",
          "Cuándo NO resumir (puede crear black holes)",
        ],
        markers: [
          {
            type: "warning",
            text: "Resumen mal hecho puede atraer tráfico que no debes responder.",
          },
        ],
        lab: "Resume estas 4 redes en una sola: 172.16.0.0/24, 172.16.1.0/24, 172.16.2.0/24, 172.16.3.0/24.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Introducción a IPv6",
        hours: 2.5,
        theory: [
          "Por qué IPv6: agotamiento IPv4, NAT no es solución permanente",
          "Formato: 128 bits, 8 grupos de 4 hex",
          "Reglas de compresión: ceros a la izquierda y :: una sola vez",
          "Header IPv6 vs IPv4 (más simple, sin checksum)",
        ],
        markers: [
          { type: "target", text: "Pregunta segura: comprimir/expandir una IPv6." },
        ],
        lab: "Comprime 10 direcciones IPv6 a su forma más corta. Luego expándelas.",
        resources: [{ label: "Jeremy's IT Lab — IPv6", url: PLAYLIST }],
      },
      {
        label: "Jueves",
        topic: "Tipos de IPv6 + SLAAC",
        hours: 2.5,
        theory: [
          "Global unicast (2000::/3), Link-local (FE80::/10), ULA (FC00::/7)",
          "Multicast (FF00::/8) — no hay broadcast en IPv6",
          "EUI-64: cómo se forma a partir de la MAC",
          "SLAAC: el host se autoconfigura usando RA del router",
          "NDP: el ARP de IPv6 (NS / NA)",
        ],
        markers: [
          {
            type: "warning",
            text: "Cada interfaz IPv6 tiene SIEMPRE una link-local automática.",
          },
        ],
        lab: "En PT: configura IPv6 estática en 2 routers conectados, verifica con 'show ipv6 interface brief'.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Lab IPv6 dual-stack + Quiz Fase 2",
        hours: 3,
        theory: ["Dual stack: IPv4 e IPv6 conviviendo en la misma interfaz"],
        markers: [
          { type: "tip", text: "Dual stack es la estrategia de transición más común." },
        ],
        lab: "Topología dual-stack: 2 routers, 2 PCs. Configura ambos protocolos, verifica ping IPv4 e IPv6 end-to-end.",
        resources: [],
      },
    ],
  },
  {
    week: 5,
    phaseId: 3,
    title: "VLANs, trunking e Inter-VLAN routing",
    bigGoal:
      "Segmentar redes con VLANs, transportarlas por trunks y rutearlas entre sí. Tema central de switching.",
    objectives: [
      "Crear y asignar VLANs a puertos de acceso",
      "Configurar trunks 802.1Q y entender la native VLAN",
      "Implementar router-on-a-stick",
      "Configurar SVIs en un switch L3",
    ],
    days: [
      {
        label: "Lunes",
        topic: "¿Qué es una VLAN y por qué existe?",
        hours: 2.5,
        theory: [
          "Problema que resuelve: dominios de broadcast separados sin más switches físicos",
          "VLAN ID 1-4094 (1 default, 1002-1005 reservadas, 1006-4094 extended)",
          "Puerto de acceso vs puerto trunk",
          "VLAN database vs running-config",
        ],
        markers: [
          { type: "target", text: "VLAN = dominio de broadcast." },
        ],
        lab: "Crea VLAN 10 (Ventas) y VLAN 20 (IT) en un switch. Asigna puertos a cada VLAN.",
        resources: [{ label: "Jeremy's IT Lab — VLANs", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "Trunking 802.1Q y native VLAN",
        hours: 2.5,
        theory: [
          "Por qué un trunk: mover múltiples VLANs por un solo cable",
          "Etiquetado 802.1Q: tag de 4 bytes en el frame",
          "Native VLAN: la única que NO se etiqueta (default 1)",
          "Importancia de que coincida en ambos extremos",
          "DTP: existe pero hay que apagarlo (switchport nonegotiate)",
        ],
        markers: [
          {
            type: "warning",
            text: "Native VLAN mismatch es pregunta clásica. Causa errores de seguridad y de tráfico.",
          },
        ],
        lab: "Configura trunk entre 2 switches, cambia native VLAN a 99, restringe VLANs permitidas.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Inter-VLAN routing — router-on-a-stick",
        hours: 3,
        theory: [
          "Por qué necesitas un L3 device para mover tráfico entre VLANs",
          "Sub-interfaces en el router: encapsulation dot1Q VLAN",
          "Cada sub-interfaz es el gateway de su VLAN",
          "Asignar IPs y verificar con ping inter-VLAN",
        ],
        markers: [
          { type: "target", text: "Configuración 100% probable en sims." },
        ],
        lab: "Topología ROAS: 1 router, 1 switch, 2 PCs en VLANs distintas. Configura todo, ping cruzado funcional.",
        resources: [{ label: "Jeremy's IT Lab — Router on a Stick", url: PLAYLIST }],
      },
      {
        label: "Jueves",
        topic: "Inter-VLAN con L3 switch (SVI)",
        hours: 2.5,
        theory: [
          "Switch multilayer: tiene capacidad de routing",
          "SVI = Switched Virtual Interface = interface vlan X",
          "ip routing global, dar IP a cada SVI",
          "Mucho más eficiente que ROAS para entornos LAN reales",
        ],
        markers: [
          {
            type: "tip",
            text: "ROAS es para CCNA/labs. SVI es lo que se usa en producción.",
          },
        ],
        lab: "Repite la topología anterior pero usando un switch L3 con SVIs en lugar del router.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Lab integral VLANs + Quiz",
        hours: 3,
        theory: ["Repaso completo de la semana"],
        markers: [],
        lab: "3 switches, 6 PCs en 3 VLANs (10, 20, 30), trunks entre switches, L3 switch como gateway. Todo debe pingear.",
        resources: [],
      },
    ],
  },
  {
    week: 6,
    phaseId: 3,
    title: "STP, RSTP y EtherChannel",
    bigGoal:
      "Entender por qué los loops L2 son catastróficos y cómo STP los previene. Agregar enlaces con EtherChannel.",
    objectives: [
      "Explicar la elección de root bridge y root ports",
      "Identificar estados y roles de puerto STP",
      "Diferenciar STP, PVST+ y RSTP",
      "Configurar PortFast, BPDU Guard y EtherChannel",
    ],
    days: [
      {
        label: "Lunes",
        topic: "El problema del loop L2 y nacimiento de STP",
        hours: 2.5,
        theory: [
          "Qué pasa con un broadcast en un loop: tormenta y caída total",
          "MAC table inestable, CPU al 100%",
          "STP: bloquear puertos redundantes hasta que se necesiten",
          "BPDU: el lenguaje de los switches para hablar STP",
        ],
        markers: [
          { type: "target", text: "Saber QUÉ rompe sin STP es tan importante como saber STP." },
        ],
        lab: "En PT: conecta 3 switches en triángulo SIN STP (apágalo). Genera broadcast. Observa el desastre.",
        resources: [{ label: "Jeremy's IT Lab — STP", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "Elección de root bridge y puertos",
        hours: 3,
        theory: [
          "Bridge ID = priority + MAC. Menor gana.",
          "Priority por defecto 32768 + VLAN ID (PVST+)",
          "Root port: el puerto con menor cost al root, uno por switch no-root",
          "Designated port: uno por segmento",
          "Costos: 100M=19, 1G=4, 10G=2",
        ],
        markers: [
          {
            type: "warning",
            text: "El primer criterio de desempate después del cost es Sender Bridge ID, NO Port ID.",
          },
        ],
        lab: "Identifica root bridge y rol de cada puerto en una topología de 4 switches dada.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Estados STP, RSTP y mejoras",
        hours: 2.5,
        theory: [
          "Estados STP: Disabled, Blocking, Listening, Learning, Forwarding",
          "RSTP estados: Discarding, Learning, Forwarding (más rápido)",
          "Tiempos de convergencia: STP ~50s, RSTP segundos",
          "PVST+ y Rapid PVST+",
        ],
        markers: [
          { type: "target", text: "RSTP es el default moderno. STP clásico es histórico." },
        ],
        lab: "Configura priority manual para forzar a un switch específico a ser root.",
        resources: [],
      },
      {
        label: "Jueves",
        topic: "PortFast, BPDU Guard, Root Guard y EtherChannel",
        hours: 3,
        theory: [
          "PortFast: salta listening/learning en puertos de acceso a hosts",
          "BPDU Guard: apaga el puerto si recibe BPDU (protección anti-loop accidental)",
          "Root Guard: previene que un switch externo se vuelva root",
          "EtherChannel: agregar 2-8 enlaces como uno solo",
          "PAgP (Cisco) vs LACP (estándar) vs estático",
          "Modos: auto/desirable, active/passive, on",
        ],
        markers: [
          {
            type: "warning",
            text: "PortFast SOLO en puertos de acceso, NUNCA en trunks entre switches.",
          },
          {
            type: "target",
            text: "Tabla de combinaciones LACP/PAgP/on. Memoriza qué combinaciones forman channel.",
          },
        ],
        lab: "Configura PortFast + BPDU Guard en puertos de acceso. Crea EtherChannel LACP entre 2 switches con 2 enlaces.",
        resources: [{ label: "Jeremy's IT Lab — EtherChannel", url: PLAYLIST }],
      },
      {
        label: "Viernes",
        topic: "Lab integral switching + Quiz Fase 3",
        hours: 3,
        theory: ["Repaso de VLANs + STP + EtherChannel"],
        markers: [],
        lab: "Topología empresarial: 3 switches con VLANs, trunks, EtherChannel entre core, STP optimizado, PortFast en accesos.",
        resources: [],
      },
    ],
  },
  {
    week: 7,
    phaseId: 4,
    title: "Routing fundamentals + rutas estáticas",
    bigGoal:
      "Entender de verdad cómo decide un router por dónde mandar un paquete. Dominar rutas estáticas.",
    objectives: [
      "Describir el proceso de routing paquete a paquete",
      "Aplicar longest prefix match en escenarios",
      "Configurar rutas estáticas, default y floating static",
      "Diferenciar AD y métrica",
    ],
    days: [
      {
        label: "Lunes",
        topic: "Cómo enruta un router",
        hours: 2.5,
        theory: [
          "Tabla de enrutamiento: source, prefix, AD, metric, next-hop, interface",
          "Longest prefix match: gana la ruta más específica",
          "Administrative Distance: confiabilidad por origen (Connected 0, Static 1, OSPF 110, etc.)",
          "Metric: dentro del mismo protocolo, la mejor",
        ],
        markers: [
          { type: "target", text: "Pregunta segura: 3 rutas a la misma red, ¿cuál se usa?" },
        ],
        lab: "Dada una tabla de routing, di por dónde va el tráfico a 5 destinos diferentes.",
        resources: [{ label: "Jeremy's IT Lab — Routing Fundamentals", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "Rutas estáticas: next-hop vs exit-interface",
        hours: 2.5,
        theory: [
          "Sintaxis: ip route <red> <máscara> <next-hop o interface>",
          "Next-hop: requiere lookup recursivo",
          "Exit-interface: directo, pero solo válido en P2P",
          "Default route: ip route 0.0.0.0 0.0.0.0",
        ],
        markers: [
          {
            type: "warning",
            text: "Exit-interface en LAN broadcast genera ARP por cada destino: ineficiente.",
          },
        ],
        lab: "3 routers en línea, configura rutas estáticas para conectividad end-to-end.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Floating static y rutas de respaldo",
        hours: 2,
        theory: [
          "Floating static: ruta estática con AD aumentada (ej: 200)",
          "Sirve como backup si la ruta principal cae",
          "Combinación con un protocolo dinámico",
        ],
        markers: [
          { type: "tip", text: "Concepto muy usado en WAN con un enlace primario y uno secundario." },
        ],
        lab: "Topología con 2 caminos al destino. Configura el secundario como floating static. Apaga el primario y verifica failover.",
        resources: [],
      },
      {
        label: "Jueves",
        topic: "Rutas estáticas IPv6",
        hours: 2,
        theory: [
          "ipv6 unicast-routing (debe estar habilitado)",
          "Sintaxis: ipv6 route <prefix>/<len> <next-hop o interface>",
          "Default IPv6: ipv6 route ::/0",
        ],
        markers: [],
        lab: "Repite la topología del lunes pero con IPv6 estático.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Lab routing estático integral + Quiz",
        hours: 3,
        theory: ["Repaso completo"],
        markers: [],
        lab: "5 routers, 3 LANs, dual stack. Solo rutas estáticas. Todo debe pingear y traceroute debe mostrar el camino esperado.",
        resources: [],
      },
    ],
  },
  {
    week: 8,
    phaseId: 4,
    title: "OSPF parte 1 — Conceptos y configuración básica",
    bigGoal:
      "Entender OSPF a nivel arquitectónico y configurarlo en single-area sin dudar.",
    objectives: [
      "Explicar el proceso de formación de vecinos OSPF",
      "Configurar OSPFv2 single-area",
      "Identificar tipos de red OSPF",
      "Forzar elección DR/BDR",
    ],
    days: [
      {
        label: "Lunes",
        topic: "Routing dinámico: por qué y cómo",
        hours: 2,
        theory: [
          "IGP vs EGP (BGP solo se menciona)",
          "Distance vector vs link state vs path vector",
          "OSPF: link state, métrica = cost (basada en bandwidth)",
          "Áreas OSPF: jerarquía, área 0 backbone",
        ],
        markers: [],
        lab: "Tabla comparativa: estático vs RIP vs OSPF (ventajas y desventajas).",
        resources: [{ label: "Jeremy's IT Lab — OSPF Intro", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "OSPF — Hello, vecinos y adyacencia",
        hours: 3,
        theory: [
          "Mensajes Hello cada 10s (broadcast/p2p), dead 40s",
          "Estados: Down, Init, 2-Way, ExStart, Exchange, Loading, Full",
          "Requisitos para vecindad: área igual, subnet igual, hello/dead igual, auth igual, MTU igual",
          "Router ID: highest loopback > highest active interface > manual",
        ],
        markers: [
          {
            type: "target",
            text: "Memoriza los requisitos para que se forme adyacencia.",
          },
          {
            type: "warning",
            text: "Si dos routers no forman vecindad, el problema casi siempre está en esta lista.",
          },
        ],
        lab: "Configura 2 routers OSPF, observa 'show ip ospf neighbor' en cada estado.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Configuración OSPFv2 single-area",
        hours: 3,
        theory: [
          "router ospf <process-id>",
          "network <ip> <wildcard> area <X>",
          "router-id <ip>",
          "passive-interface <int> (en interfaces de usuario)",
          "show ip protocols, show ip ospf interface, show ip route ospf",
        ],
        markers: [
          {
            type: "target",
            text: "Wildcard mask es lo opuesto a subnet mask: 0 = match exacto.",
          },
        ],
        lab: "3 routers en triángulo, todos en área 0. Verifica full mesh de neighbors y rutas aprendidas.",
        resources: [{ label: "Jeremy's IT Lab — OSPF Configuration", url: PLAYLIST }],
      },
      {
        label: "Jueves",
        topic: "DR/BDR y network types",
        hours: 2.5,
        theory: [
          "Network types: broadcast, point-to-point, NBMA",
          "Broadcast: elige DR y BDR para reducir adyacencias",
          "DR election: highest priority > highest router ID. Priority 0 = nunca DR",
          "P2P no elige DR",
        ],
        markers: [
          {
            type: "warning",
            text: "DR election no es preemptive. El que llegó primero gana hasta que muera.",
          },
        ],
        lab: "Topología broadcast con 4 routers. Manipula priority para forzar quién es DR/BDR.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Lab OSPF single-area + Quiz",
        hours: 3,
        theory: ["Repaso semanal"],
        markers: [],
        lab: "4 routers, varias LANs, OSPF single-area, passive-interfaces correctas, rutas verificadas.",
        resources: [],
      },
    ],
  },
  {
    week: 9,
    phaseId: 4,
    title: "OSPF parte 2 + troubleshooting routing",
    bigGoal:
      "Profundizar en métricas OSPF, multi-area conceptual y dominar troubleshooting de routing.",
    objectives: [
      "Calcular cost OSPF correctamente",
      "Configurar autenticación OSPF",
      "Identificar problemas comunes de routing y resolverlos",
      "Entender multi-area a nivel conceptual",
    ],
    days: [
      {
        label: "Lunes",
        topic: "Métrica OSPF y reference bandwidth",
        hours: 2.5,
        theory: [
          "Cost = reference-bandwidth / interface bandwidth",
          "Default reference: 100 Mbps. Esto rompe en links Gig+",
          "auto-cost reference-bandwidth 1000 (cambiarlo en TODOS los routers)",
          "Cómo se suman costs end-to-end",
        ],
        markers: [
          {
            type: "warning",
            text: "Si solo un router tiene reference-bandwidth distinto, las decisiones serán inconsistentes.",
          },
        ],
        lab: "Calcula cost desde R1 a 192.168.5.0/24 en una topología dada.",
        resources: [],
      },
      {
        label: "Martes",
        topic: "Autenticación OSPF y timers",
        hours: 2,
        theory: [
          "Autenticación clear-text (débil) y MD5 (fuerte)",
          "Configuración por interfaz",
          "Timers: hello-interval, dead-interval (deben coincidir)",
        ],
        markers: [],
        lab: "Configura MD5 auth en una adyacencia OSPF.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Multi-area OSPF a nivel conceptual",
        hours: 2.5,
        theory: [
          "Por qué áreas: escalabilidad, contención de SPF",
          "ABR conecta áreas, todas conectan a área 0",
          "Stub areas (mención)",
          "LSA types básicos: 1, 2, 3, 5 (concepto)",
        ],
        markers: [
          { type: "tip", text: "CCNA pide reconocer multi-area, no diseñarla en profundidad." },
        ],
        lab: "Lee y dibuja la jerarquía de un escenario multi-area dado.",
        resources: [],
      },
      {
        label: "Jueves",
        topic: "Troubleshooting routing — el método",
        hours: 3,
        theory: [
          "show ip route, show ip protocols, show ip ospf neighbor",
          "ping y traceroute como herramientas de localización",
          "Debug ip ospf adj (con cuidado en producción)",
          "Lista de causas comunes: subnet mismatch, área mismatch, MTU mismatch, passive-interface mal puesto, ACL bloqueando",
        ],
        markers: [
          {
            type: "target",
            text: "Trouble tickets son frecuentes en CCNA. Practica el método.",
          },
        ],
        lab: "PT: te doy una topología rota (la armas tú con errores intencionales). Encuentra y arregla 3 problemas.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Lab OSPF avanzado + Quiz Fase 4",
        hours: 3,
        theory: ["Repaso de toda la fase routing"],
        markers: [],
        lab: "Topología compleja: rutas estáticas + OSPF, redistribución no requerida pero entendiendo límites. Verifica todas las rutas.",
        resources: [],
      },
    ],
  },
  {
    week: 10,
    phaseId: 5,
    title: "Servicios IP — DHCP, DNS, NAT, NTP, Syslog",
    bigGoal:
      "Configurar los servicios que toda red real necesita y entender su rol.",
    objectives: [
      "Configurar un router como DHCP server y como relay",
      "Configurar NAT estático, dinámico y PAT",
      "Explicar DNS, NTP, Syslog y SNMP",
    ],
    days: [
      {
        label: "Lunes",
        topic: "DHCP server y DHCP relay",
        hours: 2.5,
        theory: [
          "Proceso DORA: Discover, Offer, Request, Ack",
          "ip dhcp pool, network, default-router, dns-server, lease",
          "ip dhcp excluded-address",
          "DHCP relay: ip helper-address en la SVI/sub-interfaz cuando el server está en otra subred",
        ],
        markers: [
          {
            type: "target",
            text: "Sin ip helper-address, DHCP no cruza routers (el discover es broadcast).",
          },
        ],
        lab: "Configura router como DHCP server para 2 VLANs. Verifica que las PCs reciban IP.",
        resources: [{ label: "Jeremy's IT Lab — DHCP", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "DNS, NTP, Syslog, SNMP",
        hours: 2,
        theory: [
          "DNS: resolver de nombres, ip name-server, ip domain-lookup",
          "NTP: sincronización de hora, ntp server <ip>, stratum",
          "Syslog: niveles 0-7, logging host <ip>",
          "SNMP v2c (community) vs v3 (auth + encrypt)",
        ],
        markers: [
          { type: "tip", text: "Syslog severity: menor número = más crítico (0=emergency, 7=debug)." },
        ],
        lab: "Configura NTP client en un router. Configura Syslog enviando a un servidor en PT.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "NAT — estático, dinámico, PAT",
        hours: 3,
        theory: [
          "Por qué NAT: agotamiento IPv4, también seguridad básica",
          "Inside local, inside global, outside local, outside global (tabla mental clave)",
          "Static NAT: 1 a 1, ip nat inside source static",
          "Dynamic NAT: pool, ACL para definir qué traduce",
          "PAT (overload): 1 IP pública para todos, port multiplexing",
          "ip nat inside / outside en interfaces (clave o no funciona)",
        ],
        markers: [
          {
            type: "warning",
            text: "Olvidar 'ip nat inside' u 'outside' en las interfaces es el bug #1 de NAT.",
          },
          {
            type: "target",
            text: "PAT es lo más probable que aparezca en el examen.",
          },
        ],
        lab: "Configura PAT en un router de borde. Verifica con 'show ip nat translations' al hacer ping desde dentro a 8.8.8.8.",
        resources: [{ label: "Jeremy's IT Lab — NAT", url: PLAYLIST }],
      },
      {
        label: "Jueves",
        topic: "NAT troubleshooting + escenario completo",
        hours: 2.5,
        theory: [
          "Comandos: show ip nat translations, show ip nat statistics, debug ip nat",
          "Errores comunes: interfaces mal marcadas, ACL incorrecta, pool agotado",
        ],
        markers: [],
        lab: "Topología completa: LAN privada + router con PAT a 'internet' simulado. Diagnostica un escenario que te daré roto.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Lab integral servicios + Quiz",
        hours: 3,
        theory: ["Repaso de DHCP, NAT y servicios"],
        markers: [],
        lab: "Empresa pequeña: 2 VLANs con DHCP, NAT/PAT al exterior, NTP sincronizado, logging activo.",
        resources: [],
      },
    ],
  },
  {
    week: 11,
    phaseId: 5,
    title: "ACLs, Port Security y fundamentos de seguridad",
    bigGoal:
      "Filtrar tráfico con ACLs, proteger puertos de switch y conocer los pilares de seguridad de red.",
    objectives: [
      "Escribir ACLs estándar y extendidas correctamente",
      "Decidir dónde aplicar cada tipo de ACL",
      "Configurar port security con violaciones",
      "Explicar AAA, RADIUS, TACACS+ a alto nivel",
    ],
    days: [
      {
        label: "Lunes",
        topic: "ACLs estándar",
        hours: 2.5,
        theory: [
          "Estándar: filtra solo por src IP. Numeradas 1-99 y 1300-1999",
          "Wildcard mask: como en OSPF, 0 = exacto",
          "Implicit deny al final SIEMPRE",
          "Aplicar lo más cerca del DESTINO posible",
          "access-list, access-group in/out, show access-lists",
        ],
        markers: [
          {
            type: "target",
            text: "Ubicación: estándar cerca del destino, extendida cerca del origen.",
          },
        ],
        lab: "Bloquea que VLAN 20 acceda a VLAN 10 usando ACL estándar.",
        resources: [{ label: "Jeremy's IT Lab — ACLs", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "ACLs extendidas y named ACLs",
        hours: 3,
        theory: [
          "Extendida: src, dst, protocolo, puerto. Numeradas 100-199 y 2000-2699",
          "permit/deny <protocol> <src> <wildcard> <dst> <wildcard> eq/lt/gt <port>",
          "Named ACLs: ip access-list extended NAME — más limpio",
          "Numeración de líneas, edición, ip access-list resequence",
        ],
        markers: [
          {
            type: "warning",
            text: "Orden de las reglas importa: la primera que matchea gana.",
          },
        ],
        lab: "Permite solo HTTP/HTTPS desde una VLAN al servidor web. Bloquea todo lo demás. Verifica.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Port Security",
        hours: 2.5,
        theory: [
          "switchport port-security",
          "maximum, mac-address (sticky)",
          "Violation modes: protect, restrict, shutdown",
          "err-disable y cómo recuperar (errdisable recovery)",
        ],
        markers: [
          { type: "target", text: "Sticky MAC + shutdown es la combinación más preguntada." },
        ],
        lab: "Configura port-security con max 1 MAC sticky, violation shutdown. Conecta otro PC y verifica el err-disable.",
        resources: [],
      },
      {
        label: "Jueves",
        topic: "AAA, RADIUS, TACACS+, fundamentos seguridad",
        hours: 2.5,
        theory: [
          "AAA: Authentication, Authorization, Accounting",
          "RADIUS: UDP, encripta solo password. Estándar abierto. Para usuarios.",
          "TACACS+: TCP, encripta todo. Cisco. Para device administration.",
          "Seguridad: confidentiality, integrity, availability (CIA)",
          "Tipos de amenazas: malware, spoofing, MITM, DoS, social engineering",
          "DHCP snooping y DAI (concepto)",
        ],
        markers: [
          {
            type: "target",
            text: "Diferencias RADIUS vs TACACS+: tabla casi obligatoria de memorizar.",
          },
        ],
        lab: "Configura AAA local en un router (aaa new-model, login local, line vty con login authentication).",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Lab seguridad integral + Quiz Fase 5",
        hours: 3,
        theory: ["Repaso ACLs + port security + AAA"],
        markers: [],
        lab: "Topología corporativa: ACLs aplicadas correctamente, port-security en accesos, AAA local en routers, NAT con ACL para PAT.",
        resources: [],
      },
    ],
  },
  {
    week: 12,
    phaseId: 6,
    title: "Wireless — fundamentos y WLC",
    bigGoal:
      "Entender cómo funciona Wi-Fi, sus arquitecturas y configurar una WLAN básica desde un WLC.",
    objectives: [
      "Diferenciar bandas, canales y estándares 802.11",
      "Comparar arquitecturas autonomous, lightweight y cloud",
      "Crear una WLAN en un WLC simulado",
      "Comparar WPA2 y WPA3, PSK vs 802.1X",
    ],
    days: [
      {
        label: "Lunes",
        topic: "RF básico, canales y estándares",
        hours: 2.5,
        theory: [
          "Bandas: 2.4 GHz (alcance, interferencia) vs 5 GHz (velocidad, menos alcance) vs 6 GHz (Wi-Fi 6E)",
          "Canales no solapados en 2.4: 1, 6, 11",
          "802.11 a/b/g/n/ac/ax y velocidades aproximadas",
          "SSID, BSSID, ESSID",
        ],
        markers: [],
        lab: "Lista los APs visibles desde tu casa, anota canal y banda. Identifica el menos congestionado.",
        resources: [{ label: "Jeremy's IT Lab — Wireless Fundamentals", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "Arquitecturas wireless",
        hours: 2,
        theory: [
          "Autonomous AP: cada AP es independiente, gestión one-by-one",
          "Lightweight + WLC: APs delgados controlados centralmente vía CAPWAP",
          "Cloud-managed (Meraki): controlador en la nube",
          "Split-MAC: qué hace el AP y qué hace el WLC",
        ],
        markers: [
          { type: "target", text: "Saber qué procesa el AP vs el WLC en split-MAC es preguntado." },
        ],
        lab: "Diagrama comparativo de las 3 arquitecturas con sus pros y contras.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Configuración de WLAN en WLC (GUI)",
        hours: 3,
        theory: [
          "Crear interface dinámica para una VLAN",
          "Crear WLAN: SSID, broadcast, security",
          "Asignar interface a la WLAN",
          "Habilitar / deshabilitar",
        ],
        markers: [
          {
            type: "tip",
            text: "Esta sección es 100% GUI. Familiarízate con la navegación del WLC en PT.",
          },
        ],
        lab: "En PT: WLC + 2 LAPs + clientes wireless. Crea una WLAN abierta y otra con WPA2-PSK.",
        resources: [],
      },
      {
        label: "Jueves",
        topic: "Wireless security y troubleshooting",
        hours: 2.5,
        theory: [
          "WEP (obsoleto), WPA, WPA2 (AES-CCMP), WPA3 (SAE)",
          "PSK vs 802.1X (Enterprise) con RADIUS",
          "Roaming básico",
          "Problemas comunes: SNR bajo, interferencia, mismatch de seguridad",
        ],
        markers: [],
        lab: "Configura WPA2-Enterprise apuntando a un servidor RADIUS simulado.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Lab wireless + Quiz",
        hours: 2.5,
        theory: ["Repaso wireless completo"],
        markers: [],
        lab: "Topología corporativa con WLC, 2 SSIDs (corporativo WPA2-Ent y guest abierta con vlan separada).",
        resources: [],
      },
    ],
  },
  {
    week: 13,
    phaseId: 6,
    title: "Automatización, programabilidad, QoS y SDN",
    bigGoal:
      "Cerrar los temas modernos del blueprint: automatización, APIs, controladores y QoS básico.",
    objectives: [
      "Explicar planos de red: data, control, management",
      "Diferenciar SDN tradicional vs controller-based",
      "Reconocer JSON, REST APIs y métodos HTTP",
      "Identificar Ansible, Puppet y Chef a alto nivel",
      "Explicar QoS básico: marking, queuing, shaping",
    ],
    days: [
      {
        label: "Lunes",
        topic: "QoS básico",
        hours: 2.5,
        theory: [
          "Por qué QoS: voz y video sensibles a delay/jitter/loss",
          "Clasificación y marking (CoS, DSCP)",
          "Queuing (LLQ, CBWFQ — solo concepto)",
          "Shaping vs policing",
          "Trust boundary",
        ],
        markers: [
          { type: "target", text: "DSCP EF (46) para voz es un valor a recordar." },
        ],
        lab: "Identifica en una topología dónde pondrías el trust boundary.",
        resources: [{ label: "Jeremy's IT Lab — QoS", url: PLAYLIST }],
      },
      {
        label: "Martes",
        topic: "SDN, controladores y planos",
        hours: 2.5,
        theory: [
          "Data plane (forwarding), control plane (decisiones), management plane (config)",
          "SDN: separa el control plane del hardware",
          "Cisco DNA Center, SD-Access, SD-WAN (alto nivel)",
          "Northbound (apps ↔ controlador) y Southbound (controlador ↔ devices) APIs",
        ],
        markers: [
          { type: "target", text: "Identificar qué plano hace qué cosa es pregunta común." },
        ],
        lab: "Diagrama de los 3 planos con ejemplos de cada uno.",
        resources: [{ label: "Jeremy's IT Lab — SDN", url: PLAYLIST }],
      },
      {
        label: "Miércoles",
        topic: "REST APIs y JSON",
        hours: 2.5,
        theory: [
          "HTTP methods: GET, POST, PUT, PATCH, DELETE",
          "Status codes: 2xx success, 4xx client error, 5xx server error",
          "JSON: pares clave-valor, arrays, objetos anidados",
          "Autenticación básica y tokens",
        ],
        markers: [
          { type: "tip", text: "Saber leer un JSON y un response HTTP basta para CCNA." },
        ],
        lab: "Lee 3 ejemplos de JSON y di qué representan. Identifica los métodos HTTP en ejemplos.",
        resources: [],
      },
      {
        label: "Jueves",
        topic: "Ansible, Puppet, Chef",
        hours: 2,
        theory: [
          "Ansible: agentless, push, YAML playbooks",
          "Puppet: agent-based, pull, manifests Ruby",
          "Chef: agent-based, pull, recipes Ruby",
          "Idempotencia: aplicar muchas veces = mismo resultado",
        ],
        markers: [
          {
            type: "target",
            text: "Tabla comparativa: agent vs agentless, push vs pull, lenguaje. Memoriza.",
          },
        ],
        lab: "Crea tu tabla comparativa de las 3 herramientas.",
        resources: [{ label: "Jeremy's IT Lab — Network Automation", url: PLAYLIST }],
      },
      {
        label: "Viernes",
        topic: "Quiz Fase 6 + repaso global",
        hours: 3,
        theory: ["Mapa mental de TODO el blueprint"],
        markers: [
          { type: "tip", text: "Crea una página por dominio con los 5 conceptos más críticos." },
        ],
        lab: "Hoja de repaso (cheat sheet) personal con tus comandos y conceptos críticos.",
        resources: [],
      },
    ],
  },
  {
    week: 14,
    phaseId: 6,
    title: "Repaso final y simulacros",
    bigGoal:
      "Consolidar, identificar puntos débiles, y llegar al examen con confianza real.",
    objectives: [
      "Hacer 3 simulacros completos cronometrados",
      "Identificar y reforzar tus 3 áreas más débiles",
      "Repasar comandos críticos hasta automatismo",
      "Agendar el examen",
    ],
    days: [
      {
        label: "Lunes",
        topic: "Simulacro 1 + análisis profundo",
        hours: 4,
        theory: [
          "Hazlo en condiciones de examen: cronómetro, sin pausas, sin material",
          "Después: analiza CADA pregunta fallada, no solo las que erraste por azar",
        ],
        markers: [
          {
            type: "tip",
            text: "Recursos gratis: Alpha Preparation, ExamCompass, ITExams (con criterio).",
          },
        ],
        lab: "Simulacro completo. Anota tus 5 temas más débiles.",
        resources: [{ label: "ExamCompass CCNA", url: "https://www.examcompass.com" }],
      },
      {
        label: "Martes",
        topic: "Refuerzo dirigido a tus puntos débiles",
        hours: 4,
        theory: ["Reaprende con foco quirúrgico los temas que fallaste"],
        markers: [],
        lab: "Re-haz los labs de los temas débiles. Si fallaste subnetting, 50 ejercicios. Si fallaste OSPF, lab nuevo.",
        resources: [],
      },
      {
        label: "Miércoles",
        topic: "Simulacro 2 + análisis",
        hours: 4,
        theory: ["Compara con el simulacro 1: ¿mejoraron tus temas débiles?"],
        markers: [],
        lab: "Simulacro completo. Nuevo análisis de gaps.",
        resources: [],
      },
      {
        label: "Jueves",
        topic: "Repaso general + command sheet final",
        hours: 3,
        theory: [
          "Pasa por todo el blueprint marcado: confirma que todo lo cubriste",
          "Crea tu hoja de comandos definitiva",
        ],
        markers: [
          { type: "tip", text: "Si llegaste hasta aquí: agenda tu examen YA. No esperes a sentirte 100%, no va a pasar." },
        ],
        lab: "Hoja de comandos final, 1 página, los comandos que SIEMPRE confundes.",
        resources: [],
      },
      {
        label: "Viernes",
        topic: "Simulacro 3 + descanso mental",
        hours: 3,
        theory: [
          "Último simulacro como diagnóstico",
          "Día anterior al examen: descansa, no estudies temas nuevos",
          "Mentalidad: confía en el trabajo de 14 semanas",
        ],
        markers: [
          {
            type: "tip",
            text: "El examen es 90-120 min, ~100 preguntas, tipo multi choice + drag-drop + sims. No avance hasta estar seguro: no se puede regresar.",
          },
        ],
        lab: "Simulacro final. Descansa.",
        resources: [],
      },
    ],
  },
];

// ============================================================
// COMPONENTS
// ============================================================

const PHASE_COLORS = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/30", dot: "bg-emerald-400" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/30", dot: "bg-cyan-400" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-300", border: "border-violet-500/30", dot: "bg-violet-400" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/30", dot: "bg-amber-400" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-300", border: "border-rose-500/30", dot: "bg-rose-400" },
  fuchsia: { bg: "bg-fuchsia-500/10", text: "text-fuchsia-300", border: "border-fuchsia-500/30", dot: "bg-fuchsia-400" },
};

function getPhase(phaseId) {
  return PHASES.find((p) => p.id === phaseId);
}

function MarkerBadge({ type, text }) {
  const styles = {
    target: { icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", label: "EXAMEN" },
    warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", label: "OJO" },
    tip: { icon: Lightbulb, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", label: "TIP" },
  };
  const s = styles[type];
  const Icon = s.icon;
  return (
    <div className={`flex gap-3 p-3 rounded-lg border ${s.bg} ${s.border}`}>
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.color}`} />
      <div className="flex-1">
        <div className={`text-[10px] font-mono tracking-widest mb-1 ${s.color}`}>{s.label}</div>
        <div className="text-sm text-zinc-300 leading-relaxed">{text}</div>
      </div>
    </div>
  );
}

function DayCard({ weekNum, dayIdx, day, completed, onToggle }) {
  const [open, setOpen] = useState(false);
  const dayId = `w${weekNum}d${dayIdx}`;
  const isDone = completed.has(dayId);

  return (
    <div className={`rounded-xl border transition-all ${isDone ? "bg-zinc-900/40 border-zinc-800" : "bg-zinc-900/80 border-zinc-700/60"}`}>
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(dayId);
          }}
          className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110"
          aria-label="Toggle complete"
        >
          {isDone ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          ) : (
            <Circle className="w-6 h-6 text-zinc-600 hover:text-zinc-400" />
          )}
        </button>

        <button onClick={() => setOpen(!open)} className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{day.label}</span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
              <Clock className="w-3 h-3" />
              {day.hours}h
            </div>
          </div>
          <div className={`text-base font-medium leading-snug ${isDone ? "text-zinc-500 line-through" : "text-zinc-100"}`}>
            {day.topic}
          </div>
        </button>

        <button onClick={() => setOpen(!open)} className="mt-1 text-zinc-500 hover:text-zinc-300">
          <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="px-4 pb-5 pt-1 border-t border-zinc-800/60 space-y-5">
          <section>
            <div className="flex items-center gap-2 mb-3 mt-4">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Teoría a dominar</h4>
            </div>
            <ul className="space-y-2">
              {day.theory.map((t, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="text-emerald-500 mt-1.5 text-[8px]">●</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {day.markers && day.markers.length > 0 && (
            <section className="space-y-2">
              {day.markers.map((m, i) => (
                <MarkerBadge key={i} type={m.type} text={m.text} />
              ))}
            </section>
          )}

          {day.lab && (
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Beaker className="w-4 h-4 text-violet-400" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Lab práctico</h4>
              </div>
              <div className="text-sm text-zinc-300 leading-relaxed bg-violet-500/5 border border-violet-500/20 rounded-lg p-3">
                {day.lab}
              </div>
            </section>
          )}

          {day.resources && day.resources.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Recursos</h4>
              </div>
              <div className="space-y-1.5">
                {day.resources.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {r.label}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function WeekSidebarItem({ week, isActive, completedCount, onClick }) {
  const phase = getPhase(week.phaseId);
  const colors = PHASE_COLORS[phase.color];
  const totalDays = week.days.length;
  const isComplete = completedCount === totalDays;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all ${
        isActive
          ? `${colors.bg} ${colors.border} ring-1 ring-inset ${colors.border}`
          : "bg-transparent border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Semana {week.week}
          </span>
        </div>
        {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
      </div>
      <div className={`text-sm leading-snug ${isActive ? "text-zinc-100" : "text-zinc-400"}`}>
        {week.title}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.dot} transition-all`}
            style={{ width: `${(completedCount / totalDays) * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          {completedCount}/{totalDays}
        </span>
      </div>
    </button>
  );
}

export default function CCNADashboard() {
  const [completed, setCompleted] = useState(new Set());
  const [activeWeek, setActiveWeek] = useState(1);
  const [loading, setLoading] = useState(true);

  // Load progress from persistent storage
  useEffect(() => {
    async function load() {
      try {
        const result = await window.storage.get("ccna-progress-v1");
        if (result && result.value) {
          const data = JSON.parse(result.value);
          setCompleted(new Set(data.completed || []));
          setActiveWeek(data.activeWeek || 1);
        }
      } catch (e) {
        // No previous data
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (loading) return;
    async function save() {
      try {
        await window.storage.set(
          "ccna-progress-v1",
          JSON.stringify({
            completed: Array.from(completed),
            activeWeek,
            updatedAt: new Date().toISOString(),
          })
        );
      } catch (e) {
        console.error("Save failed", e);
      }
    }
    save();
  }, [completed, activeWeek, loading]);

  function toggleDay(dayId) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(dayId)) next.delete(dayId);
      else next.add(dayId);
      return next;
    });
  }

  function resetProgress() {
    if (confirm("¿Borrar todo tu progreso? Esto no se puede deshacer.")) {
      setCompleted(new Set());
      setActiveWeek(1);
    }
  }

  // Stats
  const stats = useMemo(() => {
    const totalDays = PLAN.reduce((acc, w) => acc + w.days.length, 0);
    const doneDays = completed.size;
    const totalHours = PLAN.reduce(
      (acc, w) => acc + w.days.reduce((a, d) => a + d.hours, 0),
      0
    );
    const doneHours = PLAN.reduce(
      (acc, w) =>
        acc +
        w.days.reduce(
          (a, d, i) => a + (completed.has(`w${w.week}d${i}`) ? d.hours : 0),
          0
        ),
      0
    );
    const pct = totalDays > 0 ? Math.round((doneDays / totalDays) * 100) : 0;
    return { totalDays, doneDays, totalHours, doneHours, pct };
  }, [completed]);

  // Find next pending day
  const nextDay = useMemo(() => {
    for (const w of PLAN) {
      for (let i = 0; i < w.days.length; i++) {
        if (!completed.has(`w${w.week}d${i}`)) {
          return { week: w.week, dayIdx: i, day: w.days[i] };
        }
      }
    }
    return null;
  }, [completed]);

  function jumpToNext() {
    if (nextDay) setActiveWeek(nextDay.week);
  }

  const currentWeek = PLAN.find((w) => w.week === activeWeek);
  const currentPhase = getPhase(currentWeek.phaseId);
  const phaseColors = PHASE_COLORS[currentPhase.color];
  const weekCompletedCount = currentWeek.days.filter((_, i) =>
    completed.has(`w${activeWeek}d${i}`)
  ).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* HEADER */}
      <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Network className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Plan de estudio
              </div>
              <h1 className="text-lg font-medium text-zinc-100 leading-tight">
                CCNA 200-301 · 14 semanas
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {nextDay && (
              <button
                onClick={jumpToNext}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors text-sm"
              >
                <Flame className="w-4 h-4" />
                Continuar: Sem {nextDay.week} · {nextDay.day.label}
              </button>
            )}
            <button
              onClick={resetProgress}
              className="p-2 rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-colors"
              title="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* STATS BAR */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-[1400px] mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
              Progreso global
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-medium text-emerald-400 tabular-nums">{stats.pct}</span>
              <span className="text-sm text-zinc-500">%</span>
            </div>
            <div className="mt-2 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${stats.pct}%` }}
              />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
              Días completados
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-medium text-zinc-100 tabular-nums">{stats.doneDays}</span>
              <span className="text-sm text-zinc-500">/ {stats.totalDays}</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
              Horas invertidas
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-medium text-zinc-100 tabular-nums">{stats.doneHours}</span>
              <span className="text-sm text-zinc-500">/ {stats.totalHours}h</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
              Fase actual
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${phaseColors.dot}`} />
              <span className={`text-sm font-medium ${phaseColors.text}`}>
                {currentPhase.id}. {currentPhase.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* SIDEBAR */}
        <aside className="space-y-2 lg:sticky lg:top-[88px] lg:self-start lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3 px-1">
            14 semanas · 6 fases
          </div>
          {PLAN.map((w) => {
            const count = w.days.filter((_, i) => completed.has(`w${w.week}d${i}`)).length;
            return (
              <WeekSidebarItem
                key={w.week}
                week={w}
                isActive={w.week === activeWeek}
                completedCount={count}
                onClick={() => setActiveWeek(w.week)}
              />
            );
          })}
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0">
          {/* Week header */}
          <div className={`rounded-2xl border ${phaseColors.border} ${phaseColors.bg} p-6 mb-6`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${phaseColors.text}`}>
                Fase {currentPhase.id} · {currentPhase.name}
              </span>
              <span className="text-zinc-700">·</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Semana {currentWeek.week}
              </span>
            </div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-3">{currentWeek.title}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5">{currentWeek.bigGoal}</p>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-2">
                <Target className="w-3 h-3" />
                Objetivos al cerrar la semana
              </div>
              <ul className="space-y-1.5">
                {currentWeek.objectives.map((o, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                    <span className={`mt-1.5 text-[8px] ${phaseColors.text}`}>●</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentWeek.days.length} días
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {currentWeek.days.reduce((a, d) => a + d.hours, 0)}h totales
                </div>
              </div>
              <div className="font-mono">
                {weekCompletedCount}/{currentWeek.days.length} completados
              </div>
            </div>
          </div>

          {/* Days */}
          <div className="space-y-3">
            {currentWeek.days.map((day, i) => (
              <DayCard
                key={i}
                weekNum={activeWeek}
                dayIdx={i}
                day={day}
                completed={completed}
                onToggle={toggleDay}
              />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-10 p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-zinc-400 leading-relaxed">
                <span className="text-zinc-200 font-medium">Cómo trabajamos juntos: </span>
                este dashboard es tu mapa. Cada vez que llegues a un día, ábrelo, lee la teoría, mira los recursos, haz el lab. Cuando tengas dudas, vuelve al chat y pídeme: "explícame X de la semana N día M" o "revísame este lab" o "hazme un quiz del tema Y". Yo profundizo según lo necesites. Marca los días al completar y tu progreso se guarda automáticamente.
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-zinc-600 px-1">
            <div className="font-mono">CCNA 200-301 · v1.1</div>
            <div>Tu progreso se guarda automáticamente</div>
          </div>
        </main>
      </div>
    </div>
  );
}
