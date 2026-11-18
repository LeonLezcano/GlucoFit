/**
 * MetabolicGuard.js — Centinela Clínico y Semáforo Glucémico para Diabetes Tipo 2
 * Estándares basados en consensos de la American Diabetes Association (ADA) y EASD
 * para ejercicio de fuerza y translocación de GLUT4.
 */

export const GLUCOSE_ZONES = {
  HYPOGLYCEMIA: 'HYPOGLYCEMIA',      // < 70 mg/dL
  PRECAUTION_LOW: 'PRECAUTION_LOW',  // 70 - 99 mg/dL
  OPTIMAL: 'OPTIMAL',                // 100 - 180 mg/dL
  ELEVATED: 'ELEVATED',              // 181 - 250 mg/dL
  HIGH_RISK: 'HIGH_RISK'             // > 250 mg/dL
};

export const MetabolicGuard = {
  /**
   * Sanitiza y valida el valor numérico de glucemia
   * @param {number|string} val 
   * @returns {number|null} Valor numérico en mg/dL o null si es inválido
   */
  parseGlucose(val) {
    if (val === null || val === undefined || val === '') return null;
    const num = Number(val);
    if (Number.isNaN(num) || !Number.isFinite(num)) return null;
    if (num < 20 || num > 600) return null; // Límites fisiológicos razonables
    return Math.round(num);
  },

  /**
   * Evalúa la glucemia previa al entrenamiento de sobrecarga
   * @param {number|string} rawValue 
   * @returns {object} Evaluación con estado, semáforo, pautas clínicas y si puede entrenar
   */
  evaluatePreWorkout(rawValue) {
    const val = this.parseGlucose(rawValue);
    if (val === null) {
      return {
        valid: false,
        value: null,
        zone: null,
        color: 'gray',
        badge: 'Sin dato',
        canTrain: false,
        needsCarbs: false,
        title: 'Valor de glucemia inválido',
        message: 'Por favor ingresa un número de glucemia válido entre 20 y 600 mg/dL registrado en tu glucómetro o sensor.'
      };
    }

    if (val < 70) {
      return {
        valid: true,
        value: val,
        zone: GLUCOSE_ZONES.HYPOGLYCEMIA,
        color: 'red',
        badge: 'Hipoglucemia (< 70)',
        canTrain: false,
        needsCarbs: true,
        title: '⚠️ Alerta de Hipoglucemia — No entrenes todavía',
        message: 'Tu glucosa está muy baja para iniciar el esfuerzo físico. Aplica la Regla de los 15: consume 15g de carbohidratos rápidos (medio vaso de jugo, 3 caramelos masticables o 1 sobre de azúcar). Siéntate a descansar 15 minutos y vuelve a medirte antes de tocar cualquier máquina.'
      };
    }

    if (val >= 70 && val < 100) {
      return {
        valid: true,
        value: val,
        zone: GLUCOSE_ZONES.PRECAUTION_LOW,
        color: 'amber',
        badge: 'Zona Precaución (70-99)',
        canTrain: true,
        needsCarbs: true,
        title: '🍌 Glucemia Baja para Fuerza — Colación recomendada',
        message: 'El entrenamiento de pesas consume glucógeno rápidamente. Ingiere una pequeña colación de 15-20g de carbohidratos (medio plátano, 2 galletas o 1 manzana pequeña) y ten tu botella de agua a mano para evitar un bajón durante las series.'
      };
    }

    if (val >= 100 && val <= 180) {
      return {
        valid: true,
        value: val,
        zone: GLUCOSE_ZONES.OPTIMAL,
        color: 'emerald',
        badge: 'Zona Óptima Verde (100-180)',
        canTrain: true,
        needsCarbs: false,
        title: '✅ Nivel Ideal para Entrenar Fuerza y Activar GLUT4',
        message: 'Tu glucosa está en el rango óptimo fisiológico. La contracción muscular de hoy estimulará la translocación de transportadores GLUT4 a la membrana celular, absorbiendo la glucosa de la sangre sin necesitar insulina adicional.'
      };
    }

    if (val > 180 && val <= 250) {
      return {
        valid: true,
        value: val,
        zone: GLUCOSE_ZONES.ELEVATED,
        color: 'amber',
        badge: 'Zona Elevada (181-250)',
        canTrain: true,
        needsCarbs: false,
        title: '💧 Glucemia Elevada — Entrenamiento moderado e hidratación',
        message: 'Puedes entrenar tu rutina con normalidad. Mantén descansos completos (75 a 90 segundos), bebe sorbos constantes de agua en cada pausa y evita aguantar la respiración (maniobra de Valsalva) para no disparar la presión ni el cortisol.'
      };
    }

    // val > 250
    return {
      valid: true,
      value: val,
      zone: GLUCOSE_ZONES.HIGH_RISK,
      color: 'red',
      badge: 'Zona Roja (> 250 mg/dL)',
      canTrain: false,
      needsCarbs: false,
      title: '🛑 Glucemia Muy Elevada (> 250 mg/dL)',
      message: 'Cuando la glucemia supera los 250 mg/dL, el esfuerzo de alta intensidad puede provocar una liberación paradójica de glucosa hepática por estrés. Se recomienda no levantar cargas pesadas hoy: bebe abundante agua y opta por una caminata suave en cinta o bicicleta de 15 a 20 minutos para comprobar si comienza a descender.'
    };
  },

  /**
   * Evalúa el impacto metabólico comparando la glucemia pre y post sesión
   * @param {number|string} rawPre 
   * @param {number|string} rawPost 
   * @returns {object}
   */
  evaluatePostWorkout(rawPre, rawPost) {
    const pre = this.parseGlucose(rawPre);
    const post = this.parseGlucose(rawPost);

    if (post === null) {
      return {
        valid: false,
        postValue: null,
        delta: null,
        summary: 'Sin registro post-entrenamiento válido.'
      };
    }

    if (pre === null) {
      return {
        valid: true,
        postValue: post,
        delta: null,
        title: 'Glucemia Final Registrada',
        summary: `Finalizaste la sesión con ${post} mg/dL. Mantén una buena hidratación en las próximas horas.`
      };
    }

    const delta = pre - post; // positivo significa que bajó la glucemia
    const percent = Math.round((delta / pre) * 100);

    if (delta > 0) {
      return {
        valid: true,
        preValue: pre,
        postValue: post,
        delta: delta,
        percent: percent,
        status: 'DESCENT',
        color: 'emerald',
        title: '🎉 ¡Efecto GLUT4 Logrado!',
        summary: `Tu glucosa bajó ${delta} mg/dL (un -${percent}%). Tus músculos absorbieron el excedente de azúcar en sangre gracias al trabajo de fuerza de hoy.`
      };
    } else if (delta === 0) {
      return {
        valid: true,
        preValue: pre,
        postValue: post,
        delta: 0,
        percent: 0,
        status: 'STABLE',
        color: 'blue',
        title: '⚖️ Glucemia Estable',
        summary: `Tu glucosa se mantuvo en equilibrio (${post} mg/dL). El efecto de aumento en la sensibilidad a la insulina continuará activo durante las próximas 24 a 48 horas.`
      };
    } else {
      // Subió levemente (delta < 0)
      const increase = Math.abs(delta);
      return {
        valid: true,
        preValue: pre,
        postValue: post,
        delta: delta,
        percent: percent,
        status: 'SLIGHT_INCREASE',
        color: 'amber',
        title: 'ℹ️ Respuesta de Esfuerzo Normal',
        summary: `Tu glucosa aumentó temporalmente ${increase} mg/dL. Es una respuesta normal de las catecolaminas (adrenalina) durante esfuerzos nuevos. A medida que tu cuerpo se recupere e hidrate, tus reservas musculares captarán esa glucosa.`
      };
    }
  }
};
