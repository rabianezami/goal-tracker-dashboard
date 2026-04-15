import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English 
import enCommon from "./locales/en/common.json"
import enNavigation from "./locales/en/navigation.json"
import enDashboard from "./locales/en/dashboard.json"
import enCreateGoal from "./locales/en/createGoal.json"
import enGoalList from "./locales/en/goalList.json"
import enDelete from "./locales/en/deleteConfirm.json"
import engoalcontrol from "./locales/en/goalcontrol.json"
import enGoalDetails from "./locales/en/goalDetails.json"
import enCategories from "./locales/en/categories.json"
import enSettings from "./locales/en/settings.json"
import enNotFound from "./locales/en/notfound.json"
import enSampleGoal from "./locales/en/sampleGoal.json"
import enSignup from "./locales/en/signup.json";

// Farsi 
import faCommon from "./locales/fa/common.json"
import faNavigation from "./locales/fa/navigation.json"
import faDashboard from "./locales/fa/dashboard.json"
import faCreateGoal from "./locales/fa/createGoal.json"
import faGoalList from "./locales/fa/goalList.json"
import faDelete from "./locales/fa/deleteConfirm.json"
import fagoalcontrol from "./locales/fa/goalcontrol.json"
import faGoalDetails from "./locales/fa/goalDetails.json"
import faCategories from "./locales/fa/categories.json"
import faSettings from "./locales/fa/settings.json"
import faNotFound from "./locales/fa/notfound.json"
import faSampleGoal from "./locales/fa/sampleGoal.json"
import faSignup from "./locales/fa/signup.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enSampleGoal,
      common: enCommon,
      navigation: enNavigation,
      dashboard: enDashboard,
      createGoal: enCreateGoal,
      goalList: enGoalList,
      deleteConfirm: enDelete,
      goalcontrol: engoalcontrol,
      goalDetails: enGoalDetails,
      categories: enCategories,
      settings: enSettings,
      notfound: enNotFound,
      archive: enArchive,
    },
    fa: {
      translation: faSampleGoal,
      common: faCommon,
      navigation: faNavigation,
      dashboard: faDashboard,
      createGoal: faCreateGoal,
      goalList: faGoalList,
      deleteConfirm: faDelete,
      goalcontrol: fagoalcontrol,
      goalDetails: faGoalDetails,
      categories: faCategories,
      settings: faSettings,
      notfound: faNotFound,
      archive: faArchive,
    },
  },
  lng: localStorage.getItem("appLanguage") || "fa",
  fallbackLng: "fa",
  interpolation: { escapeValue: false },
});


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enSampleGoal,
                common: enCommon,
                navigation: enNavigation,
                dashboard: enDashboard,
                createGoal: enCreateGoal,
                goalList: enGoalList,
                deleteConfirm: enDelete,
                goalcontrol : engoalcontrol,
                goalDetails: enGoalDetails,
                categories: enCategories,
                settings: enSettings,
                notfound: enNotFound,
                signup: enSignup
            },
            fa: {
                translation: faSampleGoal,
                common: faCommon,
                navigation: faNavigation,
                dashboard: faDashboard,
                createGoal: faCreateGoal,
                goalList: faGoalList,
                deleteConfirm: faDelete,
                goalcontrol: fagoalcontrol,
                goalDetails: faGoalDetails,
                categories: faCategories,
                settings: faSettings,
                notfound: faNotFound,
                signup: faSignup
            }
        },
        lng: localStorage.getItem("appLanguage") || "fa",
        fallbackLng: "fa",
        interpolation: { escapeValue: false }
    })

export default i18n
