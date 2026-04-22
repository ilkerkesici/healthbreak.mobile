export default {
  title: 'Contenu Français',
  common: {
    home: 'Accueil',
    video: 'Vidéo',
    discover: 'Découvrir',
    play: 'Jouer',
    menu: 'Menu',
    n_min: '{{min}} min',
    continue: 'Continuer',
    email: 'E-mail',
    enter: 'Entrer',
    search: 'Rechercher',
    see_all: 'Voir tout',
    close: 'Fermer',
    loading: 'Chargement',
    not_now: 'Pas maintenant',
    share: 'Partager',
    tasks: 'Quotidien',
    analyzing: 'Analyse en cours...',
  },
  exercise: {
    default_title: 'Exercice',
    ready: {
      start: 'Je suis prêt, démarrer',
    },
    progress: {
      running: 'En cours…',
      paused: 'En pause',
    },
    a11y: {
      play: 'Lire',
      pause: 'Mettre en pause',
    },
  },
  welcome: {
    title_1: "Dans ce monde où l'IA est partout,",
    title_2: 'les exercices Health Break',
    title_3: 'sont préparés par de vrais professionnels de santé !',
    subtitle: 'Des micro-exercices courts, sûrs et adaptés au quotidien.',
    get_started: 'Commencer',
    expert_approved: 'CONTENU VALIDÉ PAR DES EXPERTS',
  },
  onboarding_next: 'Continuer',
  onboarding_questions: {
    habits: {
      stepLabel: 'ÉTAPE 1 : HABITUDES',
      question:
        "En moyenne, combien d'heures par jour passez-vous devant l'ordinateur ?",
      subtitle:
        'Nous avons besoin de comprendre votre routine pour personnaliser vos objectifs santé.',
      footerText: 'Vous pouvez modifier vos réponses à tout moment.',
      options: { '2-4': '2-4 h', '4-6': '4-6 h', '6-8': '6-8 h', '8+': '8+ h' },
    },
    sitting: {
      stepLabel: 'ÉTAPE 2',
      question: 'En général, combien de temps restez-vous assis sans pause ?',
      subtitle: 'Aidez-nous à préparer le programme de pauses idéal pour vous.',
      footerText:
        'Vos informations restent confidentielles et servent à la personnalisation.',
      options: {
        'under-30': 'Moins de 30 min',
        '30-60': '30-60 min',
        '1-2': '1-2 h',
        '2+': 'Plus de 2 h',
      },
    },
    areas: {
      stepLabel: 'ÉTAPE 3',
      question:
        'Quelles zones vous posent le plus de difficultés actuellement ?',
      subtitle:
        "Vous pouvez en choisir plusieurs. Ces informations nous aident à créer votre plan d'exercices.",
      footerText: 'Vous pouvez modifier vos réponses à tout moment.',
      options: {
        eyes: 'Yeux',
        neck: 'Cou',
        'lower-back': 'Bas du dos',
        'upper-back': 'Haut du dos',
        wrist: 'Main / Poignet',
        none: "Aucun problème pour l'instant",
      },
    },
    work_hours: {
      stepLabel: 'ÉTAPE 4',
      question: 'À quelles heures travaillez-vous en général ?',
      subtitle: "Cela nous aide à planifier vos rappels d'exercices.",
      footerText:
        'Vous pouvez choisir plusieurs créneaux. Personnalisons le programme.',
      options: {
        morning: 'Matin 08:00 - 10:00',
        noon: 'Midi 12:00 - 17:00',
        evening: 'Soir 17:00 - 20:00',
      },
    },
  },
  onboarding: {
    title: 'Bienvenue sur Better Me AI',
    description:
      'Better Me AI est une plateforme qui vous aide à bien paraître et à vous sentir bien.',
    get_started: 'Commencer',
    profile_title: 'Créez votre profil',
    profile_description: 'Apprenons à mieux vous connaître',
    name: 'Nom',
    enter_name: 'Entrez votre nom',
    gender: 'Genre',
    male: 'Masculin',
    female: 'Féminin',
    enter_gender: 'Entrez votre genre',
    age: 'Âge',
    enter_age: 'Entrez votre âge',
    create_profile: 'Créer le Profil',
  },
  login: {
    title: 'Se Connecter',
    title_2: 'Se connecter ou créer un compte',
    title_3: 'Se connecter à votre compte',
    login: 'Se connecter',
    not_now: 'Pas maintenant',
    password: 'Mot de passe',
  },
  register: {
    title: "S'inscrire",
    title_2: 'Créer un Compte',
    create_account: 'Créer un Compte',
    create_password: 'Créer un mot de passe*',
    confirm_password: 'Confirmer le mot de passe*',
    password_dont_match: 'Les mots de passe ne correspondent pas.',
  },
  home: {
    title: 'Accueil',
    next_exercise: {
      next_break: 'PROCHAIN PAUSE',
      min_later: 'Dans {{min}} min',
      hours_min_later: 'Dans {{hours}} h {{min}} min',
      now: "C'est le moment de faire une pause",
      target: 'ZONE CIBLÉE',
      duration: 'DURÉE',
      duration_1_min: '1 minute',
      take_break_now: 'Prendre une pause maintenant',
    },
  },
  permission: {
    camera_alert_title: 'Permission Caméra',
    camera_alert_subtitle:
      "Nous avons besoin d'accéder à votre caméra pour scanner votre visage",
    gallery_alert_title: 'Permission Galerie',
    gallery_alert_subtitle:
      "Nous avons besoin d'accéder à votre galerie pour télécharger votre visage",
  },
  paywall: {
    title: 'MONTEZ DE NIVEAU !',
    get_your_ratings: 'Obtenez vos Notes',
    ie_plus: "Plans d'Abonnement IE+",
    pay: 'Payer',
    advantages: {
      face_scan: 'Scannez votre visage',
      skin_tips: 'Apprenez à prendre soin de votre peau',
      daily_reminders: 'Rappels quotidiens pour améliorer votre apparence',
      you: 'Apprenez vos notes ? / 100',
    },
    popular_app: '# App la Plus Populaire',
    most_popular_desc: '🏆',
    get_your_results: 'Obtenez vos Résultats',
    cancel_when_you_want: 'Annulez quand vous voulez',
    weekly_access: 'Accès Hebdomadaire',
    weekly_price: 'Hebdomadaire {{price}}',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: "Conditions d'Utilisation",
    and: 'et',
    eula: 'EULA',
    new: {
      headline: 'Plus de\npauses saines',
      subtitle:
        'Reste énergique pendant ton travail de bureau et offre à ton corps l\'attention qu\'il mérite.',
      info_card:
        'Des programmes d\'exercices conçus par des professionnels pour te protéger des risques pour la santé.',
      benefits: {
        unlimited_exercises: {
          title: 'Exercices illimités',
          subtitle: 'Des centaines de vidéos et de routines différentes.',
        },
        personalized_reminders: {
          title: 'Rappels personnalisés',
          subtitle: 'Notifications adaptées à tes heures de travail.',
        },
        progress_insights: {
          title: 'Suivi détaillé des progrès',
          subtitle: 'Suis tes habitudes et ta progression.',
        },
      },
      cancel_anytime: 'Annule à tout moment.',
      restore: 'Restaurer',
      cta: 'Passer à Premium',
    },
  },
  packages: {
    '1week':
      'Ce package est un package hebdomadaire. Prix : {{price}} {{currency}}. Il sera automatiquement renouvelé sauf si vous annulez. Vous pouvez annuler dans Google Play Store ou AppStore.',
    '1month':
      'Ce package est un package mensuel. Prix : {{price}} {{currency}}. Il sera automatiquement renouvelé sauf si vous annulez. Vous pouvez annuler dans Google Play Store ou AppStore.',
    '3months':
      'Ce package est un package de 3 mois. Prix : {{price}} {{currency}}. Il sera automatiquement renouvelé sauf si vous annulez. Vous pouvez annuler dans Google Play Store ou AppStore.',
    '1year':
      'Ce package est un package annuel. Prix : {{price}} {{currency}}. Il sera automatiquement renouvelé sauf si vous annulez. Vous pouvez annuler dans Google Play Store ou AppStore.',
  },
  menu: {
    privacy_policy: 'Politique de Confidentialité',
    terms_of_use: "Conditions d'Utilisation",
    eula: 'EULA',
    promo_code: 'Code Promo',
    title: 'Bienvenue sur Better Me AI',
    description:
      'Better Me AI est une plateforme qui vous aide à bien paraître et à vous sentir bien. Complétez vos tâches quotidiennes pour améliorer votre apparence.',
    delete_account: 'Supprimer le Compte',
    delete_account_error: 'Erreur de Suppression de Compte',
    delete_account_error_description: "Il n'y a pas de compte à supprimer.",
    delete_account_button: 'Supprimer le Compte',
    delete_account_description:
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action ne peut pas être annulée.',
    language: 'Langue',
    cancel: 'Annuler',
    contact: 'Contact',
    contact_message: 'Contact - Better Me AI\n\nMon token de compte: {{token}}',
  },
  language: {
    title: 'Langue',
    description: "Changez la langue de l'application.",
    language: 'Langue',
    cancel: 'Annuler',
    english: 'English',
    german: 'Deutsch',
    spanish: 'Español',
    french: 'Français',
    greek: 'Ελληνικά',
    italian: 'Italiano',
    polish: 'Polski',
    portuguese: 'Português',
    turkish: 'Türkçe',
    hungarian: 'Magyar',
    indonesian: 'Bahasa Indonesia',
    chinese: '中文',
    romanian: 'Română',
    japanese: '日本語',
  },
  feedback: {
    vote: 'Puan Ver',
  },
};
