// setupPolyfills.js

// Importa los polyfills necesarios para Node.js en el navegador
import { Buffer } from 'buffer';
import process from 'process';

// Asignar al objeto global para que esté disponible en todo el proyecto
window.Buffer = Buffer;
window.process = process;

