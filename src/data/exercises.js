/**
 * Catálogo Curado de Ejercicios Biomecánicos para Gimnasio Comercial
 * Adaptado con enfoque en Diabetes Tipo 2 (Activación GLUT4 y Prevención de Lesiones/Valsalva)
 * Fuentes de referencia: RepDB y Hasan Emir Yıldırım Dataset.
 */

export const EXERCISES = [
  // ===================== PIERNAS: CUÁDRICEPS & CADENA ANTERIOR =====================
  {
    id: 'prensa-45',
    name: 'Prensa de Piernas a 45°',
    englishName: 'Leg Press 45',
    category: 'piernas',
    targetMuscle: 'Cuádriceps',
    secondaryMuscles: ['Glúteos', 'Isquiosurales'],
    equipment: 'Máquina guiada',
    glut4Score: 5,
    setup: 'Siéntate con la espalda y la zona lumbar totalmente apoyadas en el respaldo. Apoya los pies en la plataforma al ancho de hombros con las puntas ligeramente hacia afuera.',
    execution: 'Desbloquea los seguros laterales. Baja la plataforma de forma lenta y controlada flexionando las rodillas hasta formar un ángulo de 90°. Empuja con toda la planta del pie (especialmente los talones) hasta extender las piernas sin bloquear las rodillas.',
    postureChecklist: [
      'Espalda baja y glúteos firmemente pegados al respaldo durante todo el recorrido.',
      'Rodillas alineadas en la misma dirección de las puntas de los pies (no juntar rodillas hacia adentro).',
      'Mantener los pies planos sobre la plataforma sin despegar los talones.'
    ],
    commonMistakes: [
      'Bloquear o hiperextender bruscamente las rodillas al llegar arriba (riesgo ligamentario alto).',
      'Bajar tanto que la pelvis se despegue del asiento y se curve la zona lumbar (retroversión pélvica).',
      'Empujar apoyando las manos sobre las rodillas en lugar de sujetar las manijas laterales.'
    ],
    breathingTip: 'Inhala profundamente al bajar la plataforma; exhala de manera continua al empujar. Nunca aguantes el aire (evita Valsalva).'
  },
  {
    id: 'extension-cuadriceps',
    name: 'Extensión de Cuádriceps en Máquina',
    englishName: 'Leg Extension',
    category: 'piernas',
    targetMuscle: 'Cuádriceps',
    secondaryMuscles: [],
    equipment: 'Máquina guiada',
    glut4Score: 4,
    setup: 'Ajusta el respaldo para que la parte trasera de las rodillas quede al borde del asiento. El rodillo acolchado debe quedar apoyado justo por encima de los tobillos (empeines libres).',
    execution: 'Sujeta las agarraderas laterales. Extiende las piernas contrayendo los cuádriceps hasta quedar paralelas al suelo. Haz una pausa de 1 segundo arriba y desciende en 2 a 3 segundos de manera controlada.',
    postureChecklist: [
      'Mantener el torso vertical y pegado al respaldo sin impulsarse con el pecho hacia adelante.',
      'Pies mirando hacia adelante en ángulo neutro.',
      'Sujetar firmemente las manijas para que los glúteos no se despeguen del asiento.'
    ],
    commonMistakes: [
      'Usar peso excesivo y pegar un "latigazo" o impulso al inicio del movimiento.',
      'Dejar caer el peso en el retorno sin controlar la fase excéntrica (bajada).',
      'Despegar las caderas o la cintura del asiento durante el esfuerzo.'
    ],
    breathingTip: 'Exhala al levantar el rodillo (extensión); inhala lentamente mientras bajas las piernas.'
  },
  {
    id: 'sentadilla-goblet',
    name: 'Sentadilla Goblet con Mancuerna',
    englishName: 'Goblet Squat',
    category: 'piernas',
    targetMuscle: 'Cuádriceps',
    secondaryMuscles: ['Glúteos', 'Core', 'Aductores'],
    equipment: 'Mancuernas',
    glut4Score: 5,
    setup: 'Párate con los pies un poco más anchos que el ancho de hombros, puntas abiertas unos 15-20°. Sostén una mancuerna verticalmente pegada al pecho con ambas manos por debajo de la cabeza superior.',
    execution: 'Inicia el movimiento empujando la cadera hacia atrás y flexionando las rodillas, como si fueras a sentarte en una silla. Desciende manteniendo el torso erguido hasta que los codos toquen la cara interna de las rodillas. Empuja el piso con los talones para volver a la posición de pie.',
    postureChecklist: [
      'Pecho erguido y mirada al frente o ligeramente hacia abajo (cuello neutro).',
      'Talones pegados al suelo en todo momento; peso distribuido en el mediopié y talón.',
      'Las rodillas deben abrirse hacia afuera siguiendo la línea de los dedos de los pies.'
    ],
    commonMistakes: [
      'Curvar la espalda hacia adelante o permitir que el pecho colapse.',
      'Despegar los talones del suelo al descender (indica falta de movilidad de tobillo).',
      'Meter las rodillas hacia adentro (valgo de rodilla) al subir.'
    ],
    breathingTip: 'Inhala al descender llenando el abdomen; exhala suavemente mientras te incorporas.'
  },
  {
    id: 'prensa-horizontal',
    name: 'Prensa Horizontal Sentada',
    englishName: 'Seated Leg Press',
    category: 'piernas',
    targetMuscle: 'Cuádriceps',
    secondaryMuscles: ['Glúteos', 'Pantorrillas'],
    equipment: 'Máquina guiada',
    glut4Score: 5,
    setup: 'Ajusta el asiento para que al apoyar los pies al ancho de cadera, las rodillas queden flexionadas a 90°. Apoya la espalda completa en el respaldo.',
    execution: 'Empuja la plataforma con toda la planta del pie alejando el asiento hasta casi extender las piernas (sin trabar las rodillas). Regresa despacio sintiendo el trabajo en los muslos.',
    postureChecklist: [
      'Zona lumbar apoyada firmemente contra el cojín.',
      'Presión constante en talones y base de los dedos.',
      'Movimiento suave y rítmico sin tirones.'
    ],
    commonMistakes: [
      'Despegar la espalda baja para ganar empuje.',
      'Empujar solo con la punta de los pies cargando las rodillas.',
      'Bloqueo articular brusco al extender.'
    ],
    breathingTip: 'Exhala al empujar; inhala durante el retorno controlado.'
  },

  // ===================== PIERNAS: ISQUIOSURALES & GLÚTEOS =====================
  {
    id: 'curl-femoral-tumbado',
    name: 'Curl Femoral Acostado (Máquina)',
    englishName: 'Lying Leg Curl',
    category: 'piernas',
    targetMuscle: 'Isquiosurales',
    secondaryMuscles: ['Glúteos', 'Gemelos'],
    equipment: 'Máquina guiada',
    glut4Score: 4,
    setup: 'Acuéstate boca abajo en la máquina. Coloca el rodillo de apoyo en la parte trasera de los tobillos, justo debajo de los gemelos. Agarra firmemente las manijas frontales.',
    execution: 'Flexiona las piernas tirando de los talones hacia los glúteos de manera controlada. Aprieta los isquiosurales 1 segundo arriba y regresa frenando la caída en 3 segundos.',
    postureChecklist: [
      'Cadera pegada a la colchoneta sin levantar la pelvis al flexionar.',
      'Pies relajados o en flexión dorsal (talones apuntando hacia atrás).',
      'Cuello alineado con la columna, sin hiperextender la cabeza.'
    ],
    commonMistakes: [
      'Arquear la zona lumbar y despegar la pelvis de la camilla para poder mover el peso.',
      'Mover la carga a los tirones con balanceo corporal.',
      'Bajar el peso de golpe sin resistencia muscular.'
    ],
    breathingTip: 'Exhala mientras flexionas las rodillas llevando los talones hacia ti; inhala al extender.'
  },
  {
    id: 'curl-femoral-sentado',
    name: 'Curl Femoral Sentado',
    englishName: 'Seated Leg Curl',
    category: 'piernas',
    targetMuscle: 'Isquiosurales',
    secondaryMuscles: ['Glúteos'],
    equipment: 'Máquina guiada',
    glut4Score: 4,
    setup: 'Ajusta el respaldo para que la articulación de la rodilla coincida con el eje de giro de la máquina. El rodillo superior debe fijar los muslos y el rodillo inferior quedar detrás de los tobillos.',
    execution: 'Empuja el rodillo hacia abajo y hacia atrás flexionando las rodillas al máximo rango. Regresa lentamente resistiendo la subida hasta estirar casi por completo los isquiotibiales.',
    postureChecklist: [
      'Almohadilla superior bien ajustada sobre los muslos para evitar que las piernas se levanten.',
      'Tronco derecho con los glúteos en contacto con la base.',
      'Puntas de los pies orientadas al frente.'
    ],
    commonMistakes: [
      'Dejar el rodillo superior flojo permitiendo que el cuerpo se mueva.',
      'Subir a gran velocidad perdiendo tensión en la fase excéntrica.',
      'Encoger los hombros o tensionar el cuello.'
    ],
    breathingTip: 'Exhala al flexionar hacia abajo; inhala mientras dejas subir el rodillo despacio.'
  },
  {
    id: 'peso-muerto-rumano-mancuernas',
    name: 'Peso Muerto Rumano con Mancuernas',
    englishName: 'Dumbbell Romanian Deadlift',
    category: 'piernas',
    targetMuscle: 'Isquiosurales',
    secondaryMuscles: ['Glúteos', 'Espalda Baja', 'Trapecio'],
    equipment: 'Mancuernas',
    glut4Score: 5,
    setup: 'Párate erguido con los pies al ancho de cadera, sosteniendo una mancuerna en cada mano pegadas al frente de los muslos. Rodillas con una microflexión de 15° que se mantiene fija.',
    execution: 'Lleva la cadera hacia atrás como si quisieras tocar la pared con los glúteos. Deja que las mancuernas desciendan pegadas a las piernas hasta la altura de las espinillas, sintiendo un estiramiento marcado en la parte posterior de los muslos. Aprieta los glúteos para volver arriba.',
    postureChecklist: [
      'Espalda totalmente recta, pecho orgulloso y escápulas conectadas atrás.',
      'Mancuernas viajando pegadas a las piernas (acariciando los muslos y espinillas).',
      'El movimiento nace de empujar la cadera atrás, no de agacharse doblando las rodillas.'
    ],
    commonMistakes: [
      'Encorvar la espalda o curvar la columna dorsal y lumbar (gran riesgo de lesión discal).',
      'Alejar las mancuernas del cuerpo durante el trayecto.',
      'Flexionar las rodillas como si fuera una sentadilla convencional.'
    ],
    breathingTip: 'Inhala mientras bajas la cadera atrás; exhala al extender la cadera para colocarte de pie.'
  },
  {
    id: 'hip-thrust-maquina',
    name: 'Hip Thrust / Empuje de Cadera en Máquina',
    englishName: 'Machine Hip Thrust',
    category: 'piernas',
    targetMuscle: 'Glúteos',
    secondaryMuscles: ['Isquiosurales', 'Core'],
    equipment: 'Máquina guiada',
    glut4Score: 5,
    setup: 'Siéntate en la máquina con el cojín acolchado o cinturón asegurado sobre la pelvis (huesos ilíacos). Apoya la espalda media en el respaldo y los pies planos al ancho de hombros.',
    execution: 'Empuja a través de los talones elevando la pelvis hasta que el torso y los muslos queden en línea recta horizontal (rodillas en ángulo de 90°). Mantén 1 segundo la contracción de glúteos arriba y desciende en forma controlada.',
    postureChecklist: [
      'Mirada siempre hacia adelante (mentón recogido), no mires hacia el techo.',
      'Presión firme desde los talones.',
      'Mantener las costillas abajo sin hiperarquear la columna lumbar arriba.'
    ],
    commonMistakes: [
      'Arquear la cintura al final del recorrido en lugar de bloquear con los glúteos.',
      'Colocar los pies demasiado adelante o demasiado atrás desalineando el ángulo de rodilla.',
      'Realizar movimientos rápidos sin pausa isométrica de contracción arriba.'
    ],
    breathingTip: 'Exhala al elevar la cadera apretando los glúteos; inhala al descender.'
  },

  // ===================== ESPALDA: DORSALES, ROMBOIDES & TRAPECIO =====================
  {
    id: 'jalon-al-pecho-polea',
    name: 'Jalón al Pecho en Polea Alta',
    englishName: 'Lat Pulldown',
    category: 'espalda',
    targetMuscle: 'Dorsal Ancho',
    secondaryMuscles: ['Bíceps', 'Romboides', 'Braquial'],
    equipment: 'Polea',
    glut4Score: 5,
    setup: 'Siéntate y ajusta los rodillos para que sujeten firmemente tus muslos. Agarra la barra ancha con las palmas mirando al frente (pronación), un poco más ancho que tus hombros.',
    execution: 'Con el pecho alto y una inclinación sutil del torso hacia atrás (10°), tira de la barra hacia la parte superior del pecho (clavícula), llevando los codos hacia abajo y hacia las costillas. Vuelve estirando los brazos de manera lenta hasta sentir el estiramiento dorsal.',
    postureChecklist: [
      'Sacar pecho y juntar las escápulas (omóplatos) al iniciar la tracción.',
      'Los codos deben bajar en línea vertical apuntando al suelo y ligeramente hacia adentro.',
      'Torso firme y estable, sin balancearse hacia atrás y adelante para mover el peso.'
    ],
    commonMistakes: [
      'Tirar la barra detrás de la nuca (muy lesivo para hombros y vértebras cervicales).',
      'Balancear el cuerpo hacia atrás usando el impulso del peso corporal.',
      'Llevar la barra hasta el ombligo doblando las muñecas.'
    ],
    breathingTip: 'Exhala mientras tiras de la barra hacia el pecho; inhala mientras la barra sube suavemente.'
  },
  {
    id: 'remo-polea-baja-sentado',
    name: 'Remo Sentado en Polea Baja (Agarre V)',
    englishName: 'Seated Cable Row',
    category: 'espalda',
    targetMuscle: 'Espalda Media / Dorsales',
    secondaryMuscles: ['Bíceps', 'Deltoides Posterior', 'Trapecio'],
    equipment: 'Polea',
    glut4Score: 5,
    setup: 'Siéntate en la banca y apoya los pies en los topes con una leve flexión en las rodillas. Toma el agarre triangular estrecho con los brazos extendidos y el torso recto.',
    execution: 'Manteniendo la espalda neutra y el pecho abierto, tira del agarre hacia la zona del ombligo o parte baja del abdomen. Aprieta las escápulas atrás 1 segundo y regresa controlando el peso hasta estirar los brazos.',
    postureChecklist: [
      'Espalda recta durante todo el ejercicio, hombros alejados de las orejas.',
      'Codos pegados a los costados del cuerpo durante la tracción.',
      'Mantener la flexión natural de las rodillas sin bloquearlas.'
    ],
    commonMistakes: [
      'Encorvar la espalda hacia adelante en el inicio y arquearla violentamente hacia atrás al tirar.',
      'Elevar los hombros hacia el cuello por usar exceso de carga.',
      'Hacer tirones con los bíceps sin contraer la espalda.'
    ],
    breathingTip: 'Exhala mientras llevas el agarre hacia tu abdomen; inhala cuando extiendas los brazos al frente.'
  },
  {
    id: 'remo-maquina-apoyo-pecho',
    name: 'Remo en Máquina con Apoyo al Pecho',
    englishName: 'Chest Supported Machine Row',
    category: 'espalda',
    targetMuscle: 'Dorsales & Espalda Alta',
    secondaryMuscles: ['Bíceps', 'Romboides'],
    equipment: 'Máquina guiada',
    glut4Score: 4,
    setup: 'Regula la altura del asiento para que las agarraderas queden a la altura de la parte media del pecho. El cojín frontal debe apoyar firmemente el esternón.',
    execution: 'Toma los manerales con agarre neutro o prono. Tira hacia atrás liderando con los codos y juntando las escápulas al final. Regresa de forma controlada sintiendo el estiramiento en la espalda.',
    postureChecklist: [
      'Mantener el pecho en contacto continuo con el cojín de apoyo (cero carga lumbar).',
      'Hombros relajados hacia abajo, lejos del cuello.',
      'Tracción fluida sin despegues del asiento.'
    ],
    commonMistakes: [
      'Despegar el pecho de la almohadilla para impulsar la carga.',
      'Llevar los codos excesivamente abiertos en ángulo de 90° respecto al tronco.',
      'Soltar las placas de golpe en el final de la repetición.'
    ],
    breathingTip: 'Exhala al traccionar; inhala al retornar al punto de partida.'
  },
  {
    id: 'remo-unilateral-mancuerna',
    name: 'Remo Unilateral con Mancuerna en Banco',
    englishName: 'Single Arm Dumbbell Row',
    category: 'espalda',
    targetMuscle: 'Dorsal Ancho',
    secondaryMuscles: ['Bíceps', 'Deltoides Posterior'],
    equipment: 'Mancuernas',
    glut4Score: 4,
    setup: 'Apoya la rodilla izquierda y la mano izquierda en un banco plano. La pierna derecha queda firme en el suelo. Sostén la mancuerna con la mano derecha con el brazo extendido hacia abajo.',
    execution: 'Con la espalda paralela al banco y recta, tira de la mancuerna hacia la cadera derecha (como si quisieras meterla en tu bolsillo). El codo sube pegado al costado. Baja la mancuerna controladamente.',
    postureChecklist: [
      'Columna neutra y horizontal respecto al suelo.',
      'Evitar rotar el torso hacia el lado que levanta la mancuerna.',
      'Tracción orientada a la cadera, no al pecho.'
    ],
    commonMistakes: [
      'Rotar bruscamente el tronco y el cuello para compensar el peso.',
      'Tirar la mancuerna hacia el hombro cargando exclusivamente el bíceps.',
      'Dejar caer la mancuerna perdiendo el control escapular.'
    ],
    breathingTip: 'Exhala al subir la mancuerna hacia tu cadera; inhala mientras desciende.'
  },

  // ===================== PECHO: PECTORAL MAYOR & TRÍCEPS =====================
  {
    id: 'press-pecho-maquina-sentado',
    name: 'Press de Pecho en Máquina Sentado',
    englishName: 'Seated Chest Press Machine',
    category: 'pecho',
    targetMuscle: 'Pectoral Mayor',
    secondaryMuscles: ['Tríceps', 'Deltoides Anterior'],
    equipment: 'Máquina guiada',
    glut4Score: 5,
    setup: 'Ajusta la altura del asiento para que las empuñaduras queden alineadas con el centro de tu pecho (a la altura de los pezones). Apoya firmemente la cabeza, la espalda alta y los glúteos.',
    execution: 'Empuja las agarraderas hacia adelante hasta extender los brazos casi por completo (sin trabar los codos). Regresa despacio en 2 a 3 segundos abriendo los brazos hasta que las manos queden justo al lado del pecho.',
    postureChecklist: [
      'Mantener los hombros abajo y las escápulas retraídas contra el respaldo.',
      'Codos viajando a unos 45° a 60° respecto al cuerpo (no abrirlos a 90° en cruz).',
      'Pies firmes y planos en el suelo para dar estabilidad.'
    ],
    commonMistakes: [
      'Adelantar los hombros al empujar despegando las escápulas del respaldo.',
      'Rebotar el peso en las placas al final de la bajada.',
      'Abrir los codos en línea con las orejas (presión excesiva en el manguito rotador).'
    ],
    breathingTip: 'Exhala al empujar alejando las empuñaduras; inhala mientras vuelves al inicio.'
  },
  {
    id: 'press-banca-plana-mancuernas',
    name: 'Press de Pecho Plano con Mancuernas',
    englishName: 'Flat Dumbbell Bench Press',
    category: 'pecho',
    targetMuscle: 'Pectoral Mayor',
    secondaryMuscles: ['Tríceps', 'Deltoides Anterior'],
    equipment: 'Mancuernas',
    glut4Score: 5,
    setup: 'Acuéstate sobre un banco plano sosteniendo una mancuerna en cada mano sobre el pecho con los brazos extendidos. Pies apoyados firmes en el suelo.',
    execution: 'Baja las mancuernas de manera controlada abriendo los codos a 45° hasta que las mancuernas queden a los lados del pecho. Empuja con fuerza juntando las mancuernas arriba suavemente sin chocarlas.',
    postureChecklist: [
      'Muñecas rectas y firmes, directamente debajo de los codos.',
      'Mantener un arco lumbar natural sin levantar los glúteos del banco.',
      'Movimiento simétrico en ambos brazos.'
    ],
    commonMistakes: [
      'Chocar violentamente las mancuernas arriba perdiendo la tensión muscular.',
      'Bajar en exceso comprometiendo la articulación anterior del hombro.',
      'Despegar los pies del suelo o cruzar las piernas en el aire.'
    ],
    breathingTip: 'Inhala mientras bajas las mancuernas abriendo el pecho; exhala con fuerza al empujar hacia arriba.'
  },
  {
    id: 'aperturas-peck-deck',
    name: 'Aperturas en Máquina Peck-Deck (Contractor)',
    englishName: 'Pec Deck Fly Machine',
    category: 'pecho',
    targetMuscle: 'Pectoral Mayor (Aislamiento)',
    secondaryMuscles: ['Deltoides Anterior'],
    equipment: 'Máquina guiada',
    glut4Score: 3,
    setup: 'Regula el asiento para que los codos y las manos queden ligeramente por debajo del nivel de los hombros. Apoya la espalda completa en el respaldo.',
    execution: 'Con los codos ligeramente flexionados de manera fija, junta los brazos al frente hasta que las manos casi se toquen, apretando el pecho 1 segundo. Abre los brazos despacio sintiendo el estiramiento pectoral.',
    postureChecklist: [
      'Mantener la ligera flexión de los codos constante durante todo el recorrido.',
      'Hombros deprimidos y pegados al respaldo.',
      'Pecho hacia afuera y mirada al frente.'
    ],
    commonMistakes: [
      'Abrir demasiado los brazos sobrecargando la cápsula articular del hombro.',
      'Modificar la flexión del codo convirtiendo las aperturas en un press.',
      'Adelantar la cabeza hacia adelante al juntar los brazos.'
    ],
    breathingTip: 'Exhala al cerrar los brazos al frente; inhala al abrirlos de forma pausada.'
  },

  // ===================== HOMBROS: DELTOIDES =====================
  {
    id: 'press-hombros-maquina',
    name: 'Press de Hombros en Máquina Sentado',
    englishName: 'Machine Shoulder Press',
    category: 'hombros',
    targetMuscle: 'Deltoides Anterior y Lateral',
    secondaryMuscles: ['Tríceps', 'Trapecio Superior'],
    equipment: 'Máquina guiada',
    glut4Score: 4,
    setup: 'Ajusta el asiento para que las manijas queden a la altura de tus orejas/hombros. Apoya la espalda alta y la cadera en el respaldo.',
    execution: 'Empuja las empuñaduras hacia el techo de forma vertical hasta extender casi por completo los brazos. Desciende en 2 segundos hasta la altura de las orejas.',
    postureChecklist: [
      'Codos orientados ligeramente hacia adelante (en el plano escapular, a 30°), no abiertos en cruz.',
      'Espalda apoyada y zona lumbar estable (no arquear en exceso la espalda baja).',
      'Cabeza neutra apoyada o en línea con la columna.'
    ],
    commonMistakes: [
      'Arquear excesivamente la cintura despegando los glúteos para transformar el ejercicio en un press inclinado.',
      'Bloquear los codos con fuerza arriba.',
      'Bajar poco (hacer medias repeticiones) o bajar tanto que choque la máquina bruscamente.'
    ],
    breathingTip: 'Exhala al empujar hacia arriba; inhala mientras bajas despacio las agarraderas.'
  },
  {
    id: 'elevaciones-laterales-mancuernas',
    name: 'Elevaciones Laterales con Mancuernas',
    englishName: 'Dumbbell Lateral Raise',
    category: 'hombros',
    targetMuscle: 'Deltoides Lateral',
    secondaryMuscles: ['Trapecio'],
    equipment: 'Mancuernas',
    glut4Score: 3,
    setup: 'Párate con los pies al ancho de hombros, sosteniendo una mancuerna ligera en cada mano a los lados de los muslos. Inclina el torso unos 5° hacia adelante con rodillas semiflexionadas.',
    execution: 'Eleva los brazos hacia los lados liderando con los codos hasta que queden a la altura de los hombros (paralelos al suelo). Haz una pausa breve y desciende lentamente resistiendo el peso.',
    postureChecklist: [
      'Codos con una microflexión constante (como si abrazaras un barril grande).',
      'Levantar los brazos en el plano escapular (ligeramente adelantados unos 15° respecto al lateral puro).',
      'Hombros relajados, evitando encogerse de hombros hacia las orejas.'
    ],
    commonMistakes: [
      'Usar mancuernas demasiado pesadas y balancear el cuerpo hacia atrás con impulso.',
      'Elevar las manos por encima de la altura de los codos (rota internamente el hombro).',
      'Dejar caer los brazos sin control al bajar.'
    ],
    breathingTip: 'Exhala al elevar los brazos lateralmente; inhala al descender despacio.'
  },
  {
    id: 'face-pull-polea',
    name: 'Face Pull en Polea Alta con Cuerda',
    englishName: 'Cable Face Pull',
    category: 'hombros',
    targetMuscle: 'Deltoides Posterior & Manguito Rotador',
    secondaryMuscles: ['Trapecio Medio', 'Romboides'],
    equipment: 'Polea',
    glut4Score: 3,
    setup: 'Coloca la polea a la altura de la frente o barbilla con el accesorio de cuerda doble. Toma los extremos de la cuerda con los pulgares apuntando hacia atrás.',
    execution: 'Da un paso atrás para tensar el cable. Tira de la cuerda directamente hacia la cara (hacia la nariz/ojos) abriendo los extremos de la cuerda y rotando los hombros hacia atrás. Mantén 1 segundo y regresa suave.',
    postureChecklist: [
      'Codos altos, por encima o al mismo nivel de los hombros durante el tirón.',
      'Rotación externa de hombros al final del movimiento (manos al lado de las orejas).',
      'Pecho alto y core firme para no inclinarse hacia adelante.'
    ],
    commonMistakes: [
      'Colocar la polea muy baja o tirar hacia el pecho en lugar de la cara.',
      'Llevar los codos hacia abajo convirtiéndolo en un remo común.',
      'Balancear el torso hacia atrás para desplazar el peso.'
    ],
    breathingTip: 'Exhala al traccionar la cuerda hacia la cara; inhala al regresar.'
  },

  // ===================== BRAZOS: BÍCEPS & TRÍCEPS =====================
  {
    id: 'curl-biceps-mancuernas-banco',
    name: 'Curl de Bíceps con Mancuernas (De Pie o Sentado)',
    englishName: 'Dumbbell Bicep Curl',
    category: 'brazos',
    targetMuscle: 'Bíceps Braquial',
    secondaryMuscles: ['Braquial Anterior', 'Antebrazos'],
    equipment: 'Mancuernas',
    glut4Score: 3,
    setup: 'Siéntate o párate erguido con una mancuerna en cada mano, brazos extendidos a los lados con las palmas mirando hacia adentro (agarre neutro).',
    execution: 'Flexiona los codos subiendo las mancuernas mientras rotas las muñecas para que las palmas miren hacia arriba (supinación) a mitad de camino. Aprieta el bíceps arriba y desciende en 3 segundos.',
    postureChecklist: [
      'Codos pegados a los costados del cuerpo sin adelantarse hacia adelante.',
      'Muñecas firmes y rectas durante la subida, sin doblarlas hacia el antebrazo.',
      'Espalda totalmente quieta sin oscilación lumbar.'
    ],
    commonMistakes: [
      'Balancear la espalda hacia atrás para impulsar las mancuernas.',
      'Adelantar los codos para que la mancuerna descanse sobre el hombro.',
      'Dejar caer los brazos rápidamente sin frenar la bajada.'
    ],
    breathingTip: 'Exhala mientras flexionas los brazos; inhala mientras bajas las mancuernas.'
  },
  {
    id: 'extension-triceps-polea-cuerda',
    name: 'Extensión de Tríceps en Polea Alta con Cuerda',
    englishName: 'Triceps Rope Pushdown',
    category: 'brazos',
    targetMuscle: 'Tríceps (Las 3 cabezas)',
    secondaryMuscles: [],
    equipment: 'Polea',
    glut4Score: 3,
    setup: 'Coloca la polea arriba de todo con el accesorio de cuerda. Sujeta la cuerda cerca de los topes con las palmas enfrentadas. Inclina el torso 10° hacia adelante con los codos pegados al cuerpo.',
    execution: 'Extiende los antebrazos hacia abajo hasta que los brazos queden rectos, separando sutilmente los extremos de la cuerda al final para máxima contracción. Vuelve flexionando los codos hasta que los antebrazos queden paralelos al suelo.',
    postureChecklist: [
      'Codos inmóviles pegados a las costillas durante todo el ejercicio.',
      'Torso firme y estable sin acompañar el movimiento hacia arriba y abajo.',
      'Separar la cuerda al final para activar la cabeza lateral del tríceps.'
    ],
    commonMistakes: [
      'Permitir que los codos se muevan hacia adelante y atrás como péndulos.',
      'Usar peso excesivo e inclinarse encima de la cuerda empujando con el peso del cuerpo.',
      'No completar la extensión de los codos abajo.'
    ],
    breathingTip: 'Exhala al empujar la cuerda hacia abajo extendiendo los brazos; inhala al subir.'
  },

  // ===================== CORE & ESTABILIDAD METABÓLICA =====================
  {
    id: 'plancha-isometrica-banco',
    name: 'Plancha Abdominal en Banco o Suelo',
    englishName: 'Plank on Bench or Floor',
    category: 'core',
    targetMuscle: 'Transverso Abdominal & Recto Abdominal',
    secondaryMuscles: ['Glúteos', 'Hombros', 'Cuádriceps'],
    equipment: 'Peso corporal',
    glut4Score: 4,
    setup: 'Para principiantes, apoya los antebrazos en un banco plano o colchoneta con los codos justo debajo de los hombros. Extiende las piernas apoyando las puntas de los pies.',
    execution: 'Contrae el abdomen, aprieta los glúteos y mantén el cuerpo formando una línea recta desde la cabeza hasta los talones. Sostén la posición respirando de manera fluida durante 20 a 45 segundos.',
    postureChecklist: [
      'Cuerpo en línea recta: evitar que la cadera caiga hacia el suelo o se eleve en forma de pirámide.',
      'Empujar el suelo con los antebrazos para no hundirse entre los hombros.',
      'Mirada entre los antebrazos para mantener el cuello en posición neutra.'
    ],
    commonMistakes: [
      'Dejar caer la cintura arqueando la zona lumbar (causa dolor de espalda baja).',
      'Contener la respiración durante la plancha (peligroso en hipertensión/diabetes).',
      'Juntar las manos o cruzar los dedos tensionando los hombros.'
    ],
    breathingTip: 'Respira rítmica y constantemente (inhalaciones nasales suaves y exhalaciones lentas). Prohibido aguantar el aire.'
  },
  {
    id: 'press-pallof-polea',
    name: 'Press Pallof Antirrotación en Polea',
    englishName: 'Pallof Press',
    category: 'core',
    targetMuscle: 'Oblicuos y Core Profundo',
    secondaryMuscles: ['Deltoides', 'Glúteos'],
    equipment: 'Polea',
    glut4Score: 3,
    setup: 'Ajusta la polea a la altura del pecho. Párate de costado a la torre con los pies al ancho de hombros y rodillas ligeramente flexionadas. Sujeta el asa con ambas manos pegadas al esternón.',
    execution: 'Empuja el asa hacia adelante extendiendo los brazos frente a tu pecho, resistiendo la fuerza del cable que intenta rotar tu torso hacia la torre. Mantén 2 segundos al frente y regresa las manos al pecho.',
    postureChecklist: [
      'Tronco y caderas perfectamente estables mirando hacia adelante.',
      'Hombros abajo y core activo para evitar la torsión.',
      'Pies firmes como raíces en el suelo.'
    ],
    commonMistakes: [
      'Permitir que la polea rote los hombros hacia la torre.',
      'Cargar peso desmedido que impida mantener la verticalidad.',
      'Mover las caderas durante la extensión.'
    ],
    breathingTip: 'Exhala al extender los brazos frente al pecho; inhala al regresar las manos.'
  },
  {
    id: 'paseo-del-granjero',
    name: 'Paseo del Granjero con Mancuernas',
    englishName: 'Farmers Walk',
    category: 'core',
    targetMuscle: 'Core, Trapecios & Agarre',
    secondaryMuscles: ['Antebrazos', 'Pantorrillas', 'Glúteos'],
    equipment: 'Mancuernas',
    glut4Score: 5,
    setup: 'Toma dos mancuernas de peso moderado a los costados del cuerpo. Párate bien erguido con el pecho alto, hombros hacia atrás y abajo.',
    execution: 'Camina en línea recta con pasos cortos, seguros y firmes durante 30 a 45 segundos, manteniendo el torso inmóvil y sin oscilaciones laterales. Apoya toda la planta del pie en cada paso.',
    postureChecklist: [
      'Postura de orgullo: espalda recta, mirada al horizonte.',
      'Mancuernas separadas unos centímetros de los muslos sin rebotar contra las piernas.',
      'Paso controlado y rítmico.'
    ],
    commonMistakes: [
      'Encorvar los hombros hacia adelante dejando caer el pecho.',
      'Balancear el cuerpo de lado a lado como un péndulo.',
      'Caminar a las apuradas perdiendo el control postural.'
    ],
    breathingTip: 'Mantén una respiración profunda y constante mientras avanzas con pasos firmes.'
  }
];

/**
 * Obtiene un ejercicio por su ID
 * @param {string} id 
 * @returns {object|null}
 */
export function getExerciseById(id) {
  return EXERCISES.find(ex => ex.id === id) || null;
}

/**
 * Filtra ejercicios por categoría muscular
 * @param {string} category 
 * @returns {Array}
 */
export function getExercisesByCategory(category) {
  if (!category || category === 'todos') return EXERCISES;
  return EXERCISES.filter(ex => ex.category === category);
}

/**
 * Busca ejercicios por nombre o músculo
 * @param {string} query 
 * @returns {Array}
 */
export function searchExercises(query) {
  if (!query) return EXERCISES;
  const q = query.toLowerCase().trim();
  return EXERCISES.filter(ex => 
    ex.name.toLowerCase().includes(q) ||
    ex.targetMuscle.toLowerCase().includes(q) ||
    ex.equipment.toLowerCase().includes(q) ||
    ex.secondaryMuscles.some(m => m.toLowerCase().includes(q))
  );
}
