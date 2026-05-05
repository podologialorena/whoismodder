# Referencia de funnel: MediaMetas aplicado a whoismodder

Fuente estudiada: https://www.mediametas.com/ai-clipping-method-2-0-lander

## Que se puede tomar

### 1. Hero con mecanismo claro

MediaMetas no arranca con una descripcion tecnica. Arranca con una transformacion y enseguida baja a un mecanismo simple.

Adaptacion para whoismodder:

```text
El algoritmo opera. Tus cuentas copian.

Una orden entra. Mod Menu MNQ decide que grupo la recibe, que cuenta queda fuera y que riesgo se aplica.
```

La landing tiene que hacer entender en segundos:

- hay un algoritmo que da la orden;
- hay una capa intermedia llamada Mod Menu MNQ;
- esa capa no copia a ciegas;
- los grupos y cuentas tienen control propio.

### 2. Repetir el mecanismo sin repetir relleno

La referencia repite CTA y mecanismo varias veces, pero cada repeticion cambia de angulo: promesa, como funciona, prueba, objecion, producto.

Adaptacion:

- Hero: la idea en una frase.
- Problema: muchas cuentas sin estructura no sirven.
- Mecanismo: orden, filtro, copia, control.
- Demo: vista viva en `/`.
- Caminos: acceso limitado, Builder, Blueprint.

### 3. Secciones largas, pero con lectura rapida

MediaMetas usa una pagina larga con titulares fuertes, bloques cortos y CTA repetidos.

Adaptacion:

- Titulares cortos.
- Poco texto por bloque.
- Mas sensacion de sistema que explicacion academica.
- CTAs sobrios, sin gritar venta.

### 4. Producto como starter pack / sistema

La referencia vende un paquete completo, no una pieza aislada.

Adaptacion:

- `Mod Menu MNQ v1`: infraestructura / acceso limitado.
- `Mod Menu MNQ Builder`: aprender a construir el sistema.
- `Blueprint`: entender modelo, logica y criterios.

El funnel no deberia mandar directo a Whop sin separar intencion.

### 5. Objeciones integradas

La referencia responde objeciones dentro de la pagina.

Adaptacion posible:

- "No vendo ordenes sueltas."
- "No todas las cuentas copian lo mismo."
- "No todas usan el mismo riesgo."
- "No es promesa de resultado, es infraestructura y criterio operativo."

## Que no conviene copiar

- Promesas de dinero.
- Claims tipo "en 7 dias" o resultados garantizados.
- Screenshots de ganancias.
- Urgencia agresiva.
- Testimonios inventados o no verificables.
- Texto demasiado largo sobre una historia personal si todavia no hay autoridad publica suficiente.

## Arquitectura propuesta para whoismodder.com.ar

```text
/
  Hero
    El algoritmo opera. Tus cuentas copian.
    CTA bloqueado: acceso limitado
    CTA secundario: ver como funciona

  El problema
    Muchas cuentas sin estructura terminan copiando todo igual.

  El mecanismo
    Orden -> filtro -> copia -> control

  Elegir camino
    Conectar mis cuentas -> / / acceso limitado
    Construir mi sistema -> Builder
    Entender la base -> Blueprint

/
  Demo visual de la capa operativa:
    Algoritmo -> Mod Menu MNQ -> grupos
    Cuentas activas / pausadas
    Riesgo por cuenta
    Logs y estado
```

## Copy base para seguir puliendo

```text
No se trata de operar mas cuentas.
Se trata de que cada cuenta copie solo cuando corresponde.
```

```text
La orden es una.
La ejecucion depende del grupo, la cuenta y el riesgo.
```

```text
Si todas tus cuentas reciben lo mismo, no tenes estructura.
Tenes repeticion.
```

## Siguiente version de la landing

La raiz ya no deberia ser una demo tecnica completa. Tiene que ser el filtro comercial:

1. Entender rapido que es.
2. Sentir que hay sistema.
3. Elegir camino.
4. Mostrar el flujo operativo directo en la home.
5. Mandar a Builder o Blueprint cuando existan los links de Whop.
