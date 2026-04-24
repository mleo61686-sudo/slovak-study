export type Lang = "ua" | "ru" | "en";

export type TDict = {
  title: string;
  subtitle: string;

  accountCard: string;
  subscriptionCard: string;
  securityCard: string;
  sessionCard: string;

  name: string;
  email: string;
  status: string;
  currentPlan: string;
  premium: string;
  free: string;

  editName: string;
  saveName: string;
  savingName: string;
  nameHint: string;
  nameSuccess: string;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  changePassword: string;
  securityHint: string;

  manageSubscription: string;
  getPremium: string;
  logout: string;

  userFallback: string;
  loading: string;
  opening: string;
  saving: string;
  success: string;
  profileBadge: string;
  changeAvatar: string;
  uploadingAvatar: string;
  avatarSuccess: string;
  avatarInvalid: string;
  avatarTooLarge: string;
  avatarGeneric: string;

  errMissing: string;
  errMismatch: string;
  errWeak: string;
  errWrongCurrent: string;
  errSameAsCurrent: string;
  errGeneric: string;

  errNameRequired: string;
  errNameTooShort: string;
  errNameTooLong: string;
  errNameGeneric: string;
};

export const T: Record<Lang, TDict> = {
  ua: {
    title: "Профіль",
    subtitle: "Керуй акаунтом, підпискою та безпекою.",

    accountCard: "Акаунт",
    subscriptionCard: "Підписка",
    securityCard: "Безпека",
    sessionCard: "Сесія",

    name: "Ім’я",
    email: "Email",
    status: "Статус",
    currentPlan: "Поточний план",
    premium: "Premium",
    free: "Free",

    editName: "Змінити ім’я",
    saveName: "Зберегти ім’я →",
    savingName: "Зберігаю ім’я…",
    nameHint: "Ім’я має містити від 2 до 40 символів.",
    nameSuccess: "Ім’я успішно оновлено.",

    currentPassword: "Поточний пароль",
    newPassword: "Новий пароль",
    confirmPassword: "Повтори новий пароль",
    changePassword: "Змінити пароль →",
    securityHint:
      "Новий пароль має містити щонайменше 8 символів, 1 цифру та 1 велику літеру.",

    manageSubscription: "Керувати підпискою →",
    getPremium: "Оформити Premium →",
    logout: "Вийти →",

    userFallback: "Користувач",
    loading: "Завантаження…",
    opening: "Відкриваю…",
    saving: "Зберігаю…",
    success: "Пароль успішно змінено.",
    profileBadge: "Профіль Flunio",
    changeAvatar: "Змінити аватар",
    uploadingAvatar: "Завантажую…",
    avatarSuccess: "Аватар оновлено.",
    avatarInvalid: "Обери JPG, PNG або WebP зображення.",
    avatarTooLarge: "Зображення завелике. Максимум 700 KB.",
    avatarGeneric: "Не вдалося оновити аватар.",

    errMissing: "Заповни всі поля.",
    errMismatch: "Нові паролі не співпадають.",
    errWeak: "Пароль занадто слабкий.",
    errWrongCurrent: "Поточний пароль невірний.",
    errSameAsCurrent: "Новий пароль має відрізнятися від поточного.",
    errGeneric: "Не вдалося змінити пароль.",

    errNameRequired: "Введи ім’я.",
    errNameTooShort: "Ім’я занадто коротке.",
    errNameTooLong: "Ім’я занадто довге.",
    errNameGeneric: "Не вдалося оновити ім’я.",
  },
  ru: {
    title: "Профиль",
    subtitle: "Управляй аккаунтом, подпиской и безопасностью.",

    accountCard: "Аккаунт",
    subscriptionCard: "Подписка",
    securityCard: "Безопасность",
    sessionCard: "Сессия",

    name: "Имя",
    email: "Email",
    status: "Статус",
    currentPlan: "Текущий план",
    premium: "Premium",
    free: "Free",

    editName: "Изменить имя",
    saveName: "Сохранить имя →",
    savingName: "Сохраняю имя…",
    nameHint: "Имя должно содержать от 2 до 40 символов.",
    nameSuccess: "Имя успешно обновлено.",

    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmPassword: "Повтори новый пароль",
    changePassword: "Сменить пароль →",
    securityHint:
      "Новый пароль должен содержать минимум 8 символов, 1 цифру и 1 заглавную букву.",

    manageSubscription: "Управлять подпиской →",
    getPremium: "Оформить Premium →",
    logout: "Выйти →",

    userFallback: "Пользователь",
    loading: "Загрузка…",
    opening: "Открываю…",
    saving: "Сохраняю…",
    success: "Пароль успешно изменён.",
    profileBadge: "Профиль Flunio",
    changeAvatar: "Изменить аватар",
    uploadingAvatar: "Загружаю…",
    avatarSuccess: "Аватар обновлён.",
    avatarInvalid: "Выбери JPG, PNG или WebP изображение.",
    avatarTooLarge: "Изображение слишком большое. Максимум 700 KB.",
    avatarGeneric: "Не удалось обновить аватар.",

    errMissing: "Заполни все поля.",
    errMismatch: "Новые пароли не совпадают.",
    errWeak: "Пароль слишком слабый.",
    errWrongCurrent: "Текущий пароль неверный.",
    errSameAsCurrent: "Новый пароль должен отличаться от текущего.",
    errGeneric: "Не удалось сменить пароль.",

    errNameRequired: "Введите имя.",
    errNameTooShort: "Имя слишком короткое.",
    errNameTooLong: "Имя слишком длинное.",
    errNameGeneric: "Не удалось обновить имя.",
  },
  en: {
    title: "Account",
    subtitle: "Manage your account, subscription, and security.",

    accountCard: "Account",
    subscriptionCard: "Subscription",
    securityCard: "Security",
    sessionCard: "Session",

    name: "Name",
    email: "Email",
    status: "Status",
    currentPlan: "Current plan",
    premium: "Premium",
    free: "Free",

    editName: "Edit name",
    saveName: "Save name →",
    savingName: "Saving name…",
    nameHint: "Your name should contain 2 to 40 characters.",
    nameSuccess: "Name updated successfully.",

    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Repeat new password",
    changePassword: "Change password →",
    securityHint:
      "Your new password must contain at least 8 characters, 1 digit, and 1 uppercase letter.",

    manageSubscription: "Manage subscription →",
    getPremium: "Get Premium →",
    logout: "Log out →",

    userFallback: "User",
    loading: "Loading…",
    opening: "Opening…",
    saving: "Saving…",
    success: "Password changed successfully.",
    profileBadge: "Flunio Profile",
    changeAvatar: "Change avatar",
    uploadingAvatar: "Uploading…",
    avatarSuccess: "Avatar updated.",
    avatarInvalid: "Choose a JPG, PNG, or WebP image.",
    avatarTooLarge: "Image is too large. Maximum size is 700 KB.",
    avatarGeneric: "Could not update avatar.",

    errMissing: "Please fill in all fields.",
    errMismatch: "New passwords do not match.",
    errWeak: "Password is too weak.",
    errWrongCurrent: "Current password is incorrect.",
    errSameAsCurrent: "New password must be different from the current password.",
    errGeneric: "Could not change password.",

    errNameRequired: "Please enter your name.",
    errNameTooShort: "Name is too short.",
    errNameTooLong: "Name is too long.",
    errNameGeneric: "Could not update name.",
  },
};