import { Platform } from "react-native";

export const PAYMENT_URL = 'https://voa-driving.ru/stranica-oplaty/';

export const AUTO_AMO_URL = 'https://amo-auto.humanistic.tech';

export const AUTO_AMO_DEV_URL = Platform.OS === "ios" ? 'http://localhost:8180' : "http://10.0.2.2:8180";



